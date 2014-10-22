/* 
 * Взаимодействие клиент-сервер
 *	выполнение запросов, получение и обработка данных
 *	
 * @use AJAX
 * @use JSON
 * @author ml
 */


/**
 * AJAX
 *		$ajax.get( String url, [ Object params, [Function handler( String data, Boolean status)] ] );
 *		$ajax.post( String url, [ Object params, [Function handler( String data, Boolean status)] ] );
 *
 *		в функцию обработчик передаётся два аргумента: "data" и булев тип "status", который отражает результат загрузки
 *				true - успешная загрузка
 *				false - ошибка загрузки ("data" содержит код загрузки документа XMLHttpRequest.status )
 *				null - прерывание запроса по таймауту (ошибка загрузки) ("data" содержит код загрузки документа XMLHttpRequest.status на момент срабатывания таймера )
 */
var $ajax = new (function(){

	var par = ({
			timeout: (window.POLL_OPTIONS&&window.POLL_OPTIONS.lostRequestTime)||5000, // время, по истечении которого запрос считается потеряным
			empty: ''
		});


	this.get = function(){ return query( getParams( 'GET',  arguments ) ); };

	this.post = function(){ return query( getParams( 'POST',  arguments ) ); };

	function getParams ( method, arg ) {

		var obj = {
				method: method,
				url: null,
				async: true,
				params: null,
				handler: null
			};

		if ( arg.length ) {
			obj.url = arg[0].toString();

			if ( arg[1] && typeof arg[1] == 'function' ) {
				obj.handler = arg[1];

			} else if ( arg[1] && typeof arg[1] == 'object' ) {

				if ( method == 'GET' ) {
					obj.url += ((obj.url.indexOf('?')<0)? '?':'&' ) + encode(arg[1]);
				} else {
					obj.params = encode(arg[1]);
				}

				if ( arg[2] && typeof arg[2] == 'function' ) obj.handler = arg[2];
			}
		}
		return obj;
	}

	function encode ( obj, keys ) {

		var s = [], nk;
		for(var k in obj) {
			if ( typeof obj[k] != 'object' ) {
				
				if ( !!keys ) {
					
					nk = (keys||[]).slice(0);
					
					s.push( nk.shift() + ( nk.length? '['+nk.join('][')+']':'' ) +'['+ k.toString() +']=' + encodeURIComponent( obj[k] ) );
				} else {
					s.push( k.toString() + "=" + encodeURIComponent( obj[k] ) );
				}
				
			} else {
				nk = (keys||[]).slice(0); 
				nk.push( k.toString() );
				
				s.push( encode( obj[k], nk ) );
			}
		}
		return s.join('&');
	}

	var xhr = window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ?
			function() {
				return new window.XMLHttpRequest();
			} :
			function() {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {}
			};

	function query ( obj ){

		var hr = xhr(), err = false, timer, t;

			hr.open( obj.method, obj.url, obj.async );
			hr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			var complete = function () {
				if ( timer ) clearTimeout( timer );
				obj.handler( hr.responseText, true );
			};

			if ( obj.handler ) {

					var noLeaks = function (){
						if ( hr.readyState == 4 ) {
							if ( !err ) {
								if ( hr.status == 200 )  {
									complete();
								} else {
									obj.handler(hr.status, false);
								}
							}
						} else {
							return false;
						}
					};
					var leaks = function (){
						if ( !noLeaks() ) t = setTimeout( leaks, 10 );
					};


					if ( -[1,] && !document.querySelector ) {
						// memory leaks? ... ie7 and lower ... just in case...
						leaks();
					} else {
						hr.onreadystatechange = noLeaks;
					}

					timer = setTimeout( (function(){

										err=true;
										if ( t ) clearTimeout( t );

										var st = hr.status;
										hr.abort();
										obj.handler( st, null );

									}), par.timeout );
			}

			hr.send( obj.params );

			return hr;
	}

})();


/*

TODO ...Also LONG_POLL socket

*/


(function(window){

	function pollCaller() {
		
		this.options = {
			urlPath: (window.POLL_OPTIONS&&window.POLL_OPTIONS.requestUrl)||'/poll',
			urlSocket: 'ws://'+document.domain,
			urlAjax: window.location.protocol + '//'+document.domain,
			
			lostRequestTime: (window.POLL_OPTIONS&&window.POLL_OPTIONS.lostRequestTime)||7000
		};
		this.options.urlSocket += this.options.urlPath;
		this.options.urlAjax += this.options.urlPath;
		
		this.thisArg = null; // аргумент this для вызовов callback или fallback
		this.callback = null; // обратный вызов в случае удачного запроса
		this.fallback = null; // обратный вызов в случае ошибки
		
		this.longpoll = false; // признак длительного соединения (бесконечный запрос - сокеты или лонгпул)
		
		this.socket = null; // socket instance
		this.socketInit = false;
		this.socketTryOpenCounter = 0;

		this.socketSupport = true; // возможна поддержка сокета (по умолчанию - вкл)
		this.ajaxSupport = null; // инстанция 

	}
	pollCaller.prototype.registerThisArg = function( thisArg ) {
		this.thisArg = thisArg;
	};
	pollCaller.prototype.registerCallback = function( callback ) {
		this.callback = callback;
	};
	pollCaller.prototype.registerFallback = function( fallback ) {
		this.fallback = fallback;
	};
	
	pollCaller.prototype.webSocketInit = function(data) {
		
		if ( !window['WebSocket'] ) return false;
			
			this.socket = new WebSocket( this.options.urlSocket );

		if ( !this.socket ) return false;

			var me = this,
				thisArg = this.thisArg,
				callback = this.callback,
				fallback = this.fallback,
				
				_onopen = function() {
					
					me.socketInit = true;
					me.longpoll = true;
					me.socketSupport = true;
					me.socketTryOpenCounter = 0;
					
					if ( data ) {
						data.toucher = 1;
						if ( typeof data === 'object' ) data = JSON.stringify( data );
						this.socket.send( data );
						data = null;
					}
				},
				_onclose = function(event) {
					if ( !event.wasClean) {
						
						// 1002 - not support
						if ( event.code === 1002 || event.code >= 1004 ) { // 1004 - reserved
							// not support 
							me.socketSupport = false;
						}
					} else {
						// 1000, 1001, 1003
						// try repeat connection after some times
					}
					if ( me.socketTryOpenCounter++ > 3 ) {
						me.socketSupport = false;
					}
					me.socketInit = false;
					me.longpoll = false;
				},
				_onerror = function() {
					// fallback
					me.longpoll = false;
					if ( fallback ) fallback.call(thisArg);
				},
				_onmessage = function(event) {
					// callback(event.data);
					var data = event.data||null;
					if ( !callback ) return;
						if ( data ) {
							var obj;
							try{
								obj = JSON.parse(data);
								data = obj;
							}catch(e){}
						}

						callback.call(thisArg, data);
				};
				
		with ( this.socket ) {
			onopen = _onopen;
			onclose = _onclose;
			onerror = _onerror;
			onmessage = _onmessage;
		}
				
		return true;
	};
	
	pollCaller.prototype.request = function( data ) {

			if ( this.socketSupport ) {
				
				if ( !this.socketInit ) {
					
					if ( !this.webSocketInit(data) ) {
						this.socketSupport = false;
						this.longpoll = false;
						this.ajax( data ); // ajax - это и передача и приём одновременно
					}
				} else {
					if ( data ) {
						if ( typeof data === 'object' ) {
							data.toucher = 1;
							data = JSON.stringify( data );
						}
						this.socket.send( data );
					}
				}
			} else {
				// сокеты не поддерживаются
				this.ajax( data ); // ajax - это и передача и приём одновременно
			}
	};
	pollCaller.prototype.ajax = function( data ) {
		
		// data - данные для отправки на сервер
		
		var thisArg = this.thisArg,
			int = null,
			callback = this.callback,
			fallback = this.fallback,
			xhr = null,
			xhrStatus = null, calledFallback = false;
			myCallback = function( data, status ) {

				clearTimeout( int );
				int = null;
				
				if ( calledFallback ) return;
				
				if ( !status || !xhrStatus ) {
					if ( fallback ) fallback.call(thisArg);
					return;
				}
				if ( !callback ) return;
					
					if ( data ) {
						var obj;
						try{
							obj = JSON.parse(data);
							data = obj;
						}catch(e){}
					}
					
					callback.call(thisArg, data);
			},
			myFallback = function() {
				
				xhrStatus = false;
				if ( !calledFallback ) calledFallback = true;
				try {
					xhr.abort();
				} catch(e){}
				if ( fallback ) fallback.call(thisArg);
			};
		
		int = setTimeout( myFallback, this.options.lostRequestTime );
		
		data = data||{};
		data.toucher = 1;
		
		xhr = $ajax.post( this.options.urlAjax, data, myCallback );
		xhrStatus = true;
	};

	
	window.poll_Caller = new pollCaller();
	
})(window);

