
/* 
 * Управление окном обработки данных
 *	: размещается на основной странице
 * @author ml
 */


(function(window, $) {
	

	function pollHandler(window){

		var OPTION_SRC = (window.POLL_OPTIONS&&window.POLL_OPTIONS.requestUrl)||'/router.php'; // URL адрес маршрутизатора

		var flag = false, frame, fw;

		this.router = null;
		this.done = false;
		this.readyFunctions = [];

		try {
			document.domain = window.location.host.split('.').slice(-2).join('.');
			flag = true;
		} catch(e){
			// нет смысла продолжать, но надо...
		}

		OPTION_SRC = window.location.protocol + '//' + document.domain + OPTION_SRC;

		frame = document.createElement('iframe');
		frame.src = OPTION_SRC;

		with( frame.style ) {
			position = 'absolute';
			left = '-9999px';
			top = '-9999px';
		}

		// 
		document.getElementsByTagName('BODY')[0].appendChild( frame );

		try {
			fw = (frame.contentWindow || frame.contentDocument);
			if ( !!!fw.document) fw = fw.defaultView;
			flag = flag&&true;
		} catch(e) { 
			// вообще нет смысла продолжать... но надо...
		}
		
		var _destroy = function( mess ) {
			if ( !!window.console ) window.console.log( mess );
			frame.parentNode.removeChild(frame);
		};
		
		if ( flag ) {
			
			var i = 0, me = this, 
				_f = function(){
					
					try {
						if ( fw && fw.poll_Router ) {
							me.router = fw.poll_Router; 
							me.done = true; 
							me.readyHandler.call(me);
						}
					} catch(e) { /* may be permission denied */ }
					
					if ( !me.done ) {
						if ( i++ < 100 ) {
							setTimeout( _f, 100 );
						} else { 
							_destroy('Sorry, TABS install stop. Take too much time');
						}
					}
				};
			_f();
			
		} else {
			_destroy( 'Sorry, TABS Router is not installed' );
		}
	}
	/**
	 * Подписчики по готовности
	 */
	pollHandler.prototype.readyHandler = function() {
		
		if ( this.router && this.readyFunctions.length ) {
			
			for( var i=0; i<this.readyFunctions.length; i++ ) {
				
				this.readyFunctions[i]();
			}
			this.readyFunctions.length = 0;
		}
	};
	pollHandler.prototype.ready = function( callback ) {
		this.readyFunctions.push( callback );
	};
	/**
	 * Регистрация модуля в маршрутизаторе
	 */
	pollHandler.prototype.addModule = function( moduleName ) {
		
		if ( this.router ) {
			this.router.signUp( moduleName );
		}
		return this;
	};
	/**
	 * Добавить обработчик модуля на события eventHandler (name) = [data, on, off]
	 */
	pollHandler.prototype.addHandler = function( moduleName, eventType, handler ) {

		if ( this.router ) {
			this.router.setHandler( moduleName, eventType, handler );
		}
		return this;
	};
	/**
	 * Добавить обработчик для модуля на событие получение данных (без регистрации модуля)
	 */
	pollHandler.prototype.addDataHandler = function( moduleName, dataHandler ) {

		if ( this.router ) {
			this.router.setDataHandler( moduleName, dataHandler );
		}
		return this;
	};
	/**
	 * Установить самого себя "занятым"
	 */
	pollHandler.prototype.setBusy = function( moduleName ) {

		if ( this.router ) {
			this.router.setBusy( moduleName );
		}
		return this;
	};
	/**
	 * Добавить данные для отправки на сервер
	 */
	pollHandler.prototype.setData = function( moduleName, data ) {

		if ( this.router ) {
			this.router.setData( moduleName, data );
		}
		return this;
	};
	/**
	 * Остановить маршрутизатор (все маршрутизаторы)
	 */
	pollHandler.prototype.stop = function() {

		if ( this.router ) {
			this.router.stopPulse();
		}
		return this;
	};
	/**
	 * Возобновить маршрутизатор (все маршрутизаторы)
	 */
	pollHandler.prototype.start = function() {

		if ( this.router ) {
			this.router.startPulse();
		}
		return this;
	};


	$(function(){ 
		window.poll_Handler = new pollHandler(window);
	});
	
})(window, $);
