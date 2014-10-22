/* 
 * Распределитель страниц
 *	определение активной страницы, для взаимодействия клиент-сервер
 *	
 * @use pollStorage
 * @use pollCaller
 * @author ml
 */

// *** Маршрутизатор ***********************************************************

(function(window){
	
	
	function pollRouter() {
		
		var me = this;
		

		this.namespace = 'tabs';
		
		this.storage = new window.pollStorage( this.namespace ); // сами регистрируемся
		this.id = this.storage.getId();
		this.busy = 0; // кто занят сейчас
		this.master = false; // я сейчас главный
		
		this.caller = window.poll_Caller; // модуль получения данных от сервера
		
		this.caller.registerThisArg( this );
		this.caller.registerCallback( this.callback );
		this.caller.registerFallback( this.fallback );
		
		this.dataCache = [];
		this.modules = {}; // {} другие модули (например отслеживание фокуса окна, для отключения сообщений для заблюреных)...
		this.callbacks = {}; // { module_namespace: { 'data': dataCallback, 'enabler': busyHandlerEnabler, 'disabler': busyHandlerDisabler } }
		
		
		this.options = {

			intervalLifeTime: (window.POLL_OPTIONS&&window.POLL_OPTIONS.intervalLifetime)||2500,
			selfBusy: false, // я сейчас занят ещё...
			stoped: false // функционал остановлен
		};
		
		this.setMaskHandler( this.namespace );
		
		var _pulse = function () { me.pulse(); };
		
		
		this.idInterval = setInterval( _pulse, this.options.intervalLifeTime );
	};
	
	/**
	 * Основная функция обработки интервала
	 */
	pollRouter.prototype.pulse = function() {
	
		// сохраняемся
		this.storage.keep();
		
		// нужен параллельный запуск... для проверки "занятостей" у других
			var me = this;
			setTimeout( function(){ me.refreshOtherBusy.call(me); }, 0 );
		
		// если я ещё занят - выходим
		this.options.stoped = this.storage.getStoped();
		if ( this.options.selfBusy || this.options.stoped ) {
			if ( this.options.selfBusy ) {
				
				if ( this.caller.longpoll ) {
					// если есть данные на отправку - то нужно отправить ...
					var data = this.getDataToSend();
					if ( data ) {
						this.call();
					} else {
						this.dataHandler(); // проверяем данные, в случае socket - это актуально
					}
				}
			}
			return;
		}
		
		this.options.selfBusy = true;
		
		// проверяем сначала себя
		this.refreshBusy();
		
		// проверяем условия вызова
		this.options.selfBusy = this.checkBusyHandlers();
	};
	
	/**
	 * Регистрация модуля в маршрутизаторе
	 */
	pollRouter.prototype.signUp = function( moduleNamespace ) {
		
		if ( !!this.modules[moduleNamespace] ) {
			
			if ( !!window.console ) window.console.log('Namespace _'+moduleNamespace+'_ is already registered');
			return null;
		}
		
		this.modules[moduleNamespace] = {
			namespace: moduleNamespace,
			storage: null,
			id: null,
			busy: 0,
			master: null
		};
		
		this.modules[moduleNamespace].storage = new window.pollStorage( moduleNamespace );
		this.modules[moduleNamespace].id = this.modules[moduleNamespace].storage.getId();

		// зарегистрировать функции
		if ( !!!this.callbacks[moduleNamespace] ) {
			this.setMaskHandler(moduleNamespace);
		}

		return this;
	};
	/**
	 * 
	 */
	pollRouter.prototype.setDataHandler = function( moduleNamespace, dataHandler ) {
		
		if ( !this.callbacks[moduleNamespace] ) this.setMaskHandler(moduleNamespace);
		this.callbacks[moduleNamespace].data = dataHandler;
	}
	/**
	 * 
	 */
	pollRouter.prototype.setMaskHandler = function( moduleNamespace ) {
		
		this.callbacks[moduleNamespace] = {
				data: null,  // обработчик полученных от сервера данных
				on: null, // обработчик, когда окно перехватывает процесс "занятости" / если это root - то опроса сервера
				off: null // обработчик, когда окно теряет процесс "занятости" / если это root - то опроса сервера
			};
	};
	/**
	 * Установка обработчиков [data, on, off, enabler, disabler]
	 */
	pollRouter.prototype.setHandler = function( namespace, type, handler ) {
		
		if ( !namespace ) namespace = this.namespace;
		this.callbacks[namespace][type] = handler;
		return this;
	};
	/**
	 * Принудительная установка "занятости" указанного модуля
	 */
	pollRouter.prototype.setBusy = function( namespace ) {
		
		if ( !namespace ) namespace = this.namespace;
		var module = this.modules[namespace];
		
			// сохраняемся (обновляемся)
			module.storage.keep();
			
			module.storage.setBusy();
			module.busy = module.id;
			
			module.master = true;
			this.busyHandler( namespace, 'on' );
	};
	/**
	 * Добавление данных для отправки на сервер
	 */
	pollRouter.prototype.setData = function( namespace, data ) {
		
		this.storage.setDataOut( namespace, data );
	};
	
	/**
	 * Проверка и обновление "занятости" списка подписанных модулей
	 */
	pollRouter.prototype.refreshOtherBusy = function() {
		
		for( var module in this.modules ) {
			
			this.modules[module].storage.keep();
			this.refreshBusy( this.modules[module] );
			this.checkBusyHandlers( this.modules[module] );
		}
	};
	/**
	 * Обновление "занятости" одного модуля.
	 */
	pollRouter.prototype.refreshBusy = function( module ) {
		
		if ( !module ) module = this;
		
		var busyId = module.storage.getBusy();
		if ( !(busyId && module.storage.getId( busyId )) ) busyId = null;
		
		if ( !busyId ) {
			
			// check my id
			// получить из списка минимальный id
			var id = module.storage.getMinId();
			if ( id == module.id ) {
				
				module.storage.setBusy();
				module.busy = module.id;
			}
		} else {
			module.busy = busyId;
		}
	};
	/**
	 * Проверка выполнения обработчиков при изменении занятости
	 */
	pollRouter.prototype.checkBusyHandlers = function( module ) {
		
		if ( !module ) module = this;
		
		var called = false,
			root = (module === this ),
			handlersName = ['on', 'off'];
	
		if ( module.busy == module.id ) {
			if ( module.master === false ) {
				module.master = true;
				// enabler
				this.busyHandler(module.namespace, handlersName[0]);
			}
	
			// caller
			if ( root ) {
				called = true;
				this.call();
			}

		} else {
			if ( module.master === true ) {
				module.master = false;
				// disabler
				this.busyHandler(module.namespace, handlersName[1]);
			}
			// проверяем свежие данные
			if ( root ) {
				this.dataHandler();
			}
		}
		return called;
	};
	/**
	 * Организация запроса к серверу
	 */
	pollRouter.prototype.call = function() {
		
		// нужен универсальный функционал, как для периодического пинга, так и для сокетов
		var me = this,
			_call = function() {
				
				me.caller.request( me.getDataToSend() );
			};
			
		setTimeout( _call, 0 );
	};
	pollRouter.prototype.getDataToSend = function() {
		
		this.dataCache.length = 0;
		var data = this.storage.getDataOut();
				
		if ( data ) {
			this.dataCache.push(data);
			// сбрасываем данные
			this.storage.setDataOut( null );
		}
		return data;
	};
	pollRouter.prototype.restoreDataToSend = function() {
		
		if ( this.dataCache.length ) {
			
			var i=0, moduleName, data = this.storage.getDataOut();
			if ( data ) this.dataCache.push(data);
			
			for( i=0; i<this.dataCache.length; i++ ) {
				for( moduleName in this.dataCache[i] ) {
					this.storage.setDataOut( moduleName, this.dataCache[i][moduleName] );
				}
			}
		}
	};
	
	
	pollRouter.prototype.callback = function(data) {
		
		this.options.selfBusy = false;
		
		//if ( !this.master ) return;
		if ( data ) {
			this.storage.setData(data);

			this.dataListHandler.call(this, data);
		}

	};
	pollRouter.prototype.fallback = function() {
		
		// restore old data by override existing values
		this.restoreDataToSend();
		
		this.options.selfBusy = false;
	};
	
	/**
	 * Обработчик полученных данных
	 */
	pollRouter.prototype.dataHandler = function() {
		
		var data = this.storage.getData();

		if ( !data ) return;
		
		this.dataListHandler(data);
	};
	/**
	 * Обработчик полученных данных по списку модулей
	 */
	pollRouter.prototype.dataListHandler = function( data ) {

		for( var moduleName in data ) {
			if ( !!this.callbacks[moduleName] && !!this.callbacks[moduleName].data ) {
				try {
					this.callbacks[moduleName].data( data[moduleName] );
				} catch(e){
					if ( !!window.console ) window.console.log(e.message + '\n' + e.stacktrace);
				}
			}
		}
		// вызов общего обработчика (если есть)
		if ( !!this.callbacks[ this.namespace ].data ) {
			this.callbacks[ this.namespace ].data( data );
		}
	};
	/**
	 * Вызов функции обработчика по флагу "занятости"
	 */
	pollRouter.prototype.busyHandler = function(namespace, key) {
		
		if ( !namespace ) namespace = this.namespace;
		if ( !!this.callbacks[namespace] && !!this.callbacks[namespace][key] ) {
			try {
				this.callbacks[namespace][key]();
			} catch(e){
				if ( !!window.console ) window.console.log(e.message + '\n' + e.stacktrace);
			}
		}
	};
	
	/**
	 * Возобновить работу маршрутизатора
	 */
	pollRouter.prototype.startPulse = function() {
		this.options.stoped = false;
		this.storage.setStoped(false);
	};
	/**
	 * Остановить работу маршрутизатора
	 */
	pollRouter.prototype.stopPulse = function() {
		this.options.stoped = true;
		this.storage.setStoped(true);
	};
	
	// инициализаруемся...
	window.poll_Router = new pollRouter();
	
})(window);
