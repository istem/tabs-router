
/**
 *   json2.js
 *   2011-10-19
 *   Public Domain.
 *   NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 *   See http://www.JSON.org/js.html
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('x m;3(!m){m={}}(5(){\'1B 1C\';5 f(n){7 n<10?\'0\'+n:n}3(6 1i.p.y!==\'5\'){1i.p.y=5(h){7 1r(w.15())?w.1A()+\'-\'+f(w.1z()+1)+\'-\'+f(w.1x())+\'T\'+f(w.1y())+\':\'+f(w.1D())+\':\'+f(w.1E())+\'Z\':A};M.p.y=1J.p.y=1I.p.y=5(h){7 w.15()}}x N=/[\\1w\\1c\\1b-\\1a\\18\\19\\17\\14-\\1q\\1o-\\1e\\1s-\\1u\\1t\\1k-\\13]/g,Q=/[\\\\\\"\\1H-\\1F\\1G-\\1K\\1c\\1b-\\1a\\18\\19\\17\\14-\\1q\\1o-\\1e\\1s-\\1u\\1t\\1k-\\13]/g,8,J,1g={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'},l;5 L(o){Q.1m=0;7 Q.12(o)?\'"\'+o.K(Q,5(a){x c=1g[a];7 6 c===\'o\'?c:\'\\\\u\'+(\'1h\'+a.1f(0).11(16)).1j(-4)})+\'"\':\'"\'+o+\'"\'}5 I(h,C){x i,k,v,e,H=8,9,2=C[h];3(2&&6 2===\'B\'&&6 2.y===\'5\'){2=2.y(h)}3(6 l===\'5\'){2=l.O(C,h,2)}1X(6 2){G\'o\':7 L(2);G\'V\':7 1r(2)?M(2):\'A\';G\'1W\':G\'A\':7 M(2);G\'B\':3(!2){7\'A\'}8+=J;9=[];3(Y.p.11.1Y(2)===\'[B 1L]\'){e=2.e;D(i=0;i<e;i+=1){9[i]=I(i,2)||\'A\'}v=9.e===0?\'[]\':8?\'[\\n\'+8+9.P(\',\\n\'+8)+\'\\n\'+H+\']\':\'[\'+9.P(\',\')+\']\';8=H;7 v}3(l&&6 l===\'B\'){e=l.e;D(i=0;i<e;i+=1){3(6 l[i]===\'o\'){k=l[i];v=I(k,2);3(v){9.1d(L(k)+(8?\': \':\':\')+v)}}}}U{D(k 1v 2){3(Y.p.1p.O(2,k)){v=I(k,2);3(v){9.1d(L(k)+(8?\': \':\':\')+v)}}}}v=9.e===0?\'{}\':8?\'{\\n\'+8+9.P(\',\\n\'+8)+\'\\n\'+H+\'}\':\'{\'+9.P(\',\')+\'}\';8=H;7 v}}3(6 m.X!==\'5\'){m.X=5(2,z,E){x i;8=\'\';J=\'\';3(6 E===\'V\'){D(i=0;i<E;i+=1){J+=\' \'}}U 3(6 E===\'o\'){J=E}l=z;3(z&&6 z!==\'5\'&&(6 z!==\'B\'||6 z.e!==\'V\')){1l 1n 1V(\'m.X\')}7 I(\'\',{\'\':2})}}3(6 m.S!==\'5\'){m.S=5(q,W){x j;5 R(C,h){x k,v,2=C[h];3(2&&6 2===\'B\'){D(k 1v 2){3(Y.p.1p.O(2,k)){v=R(2,k);3(v!==1P){2[k]=v}U{1Q 2[k]}}}}7 W.O(C,h,2)}q=M(q);N.1m=0;3(N.12(q)){q=q.K(N,5(a){7\'\\\\u\'+(\'1h\'+a.1f(0).11(16)).1j(-4)})}3(/^[\\],:{}\\s]*$/.12(q.K(/\\\\(?:["\\\\\\/1R]|u[0-1S-1T-F]{4})/g,\'@\').K(/"[^"\\\\\\n\\r]*"|1M|1N|A|-?\\d+(?:\\.\\d*)?(?:[1O][+\\-]?\\d+)?/g,\']\').K(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1Z(\'(\'+q+\')\');7 6 W===\'5\'?R({\'\':j},\'\'):j}1l 1n 1U(\'m.S\')}}}());',62,124,'||value|if||function|typeof|return|gap|partial|||||length|||key||||rep|JSON||string|prototype|text||||||this|var|toJSON|replacer|null|object|holder|for|space||case|mind|str|indent|replace|quote|String|cx|call|join|escapable|walk|parse||else|number|reviver|stringify|Object|||toString|test|uffff|u200c|valueOf||u17b5|u070f|u17b4|u0604|u0600|u00ad|push|u202f|charCodeAt|meta|0000|Date|slice|ufff0|throw|lastIndex|new|u2028|hasOwnProperty|u200f|isFinite|u2060|ufeff|u206f|in|u0000|getUTCDate|getUTCHours|getUTCMonth|getUTCFullYear|use|strict|getUTCMinutes|getUTCSeconds|x1f|x7f|x00|Boolean|Number|x9f|Array|true|false|eE|undefined|delete|bfnrt|9a|fA|SyntaxError|Error|boolean|switch|apply|eval'.split('|'),0,{}))



/**
 * Storager
 * @use JSON
 * @author ml
 */

// *** Хранители ***************************************************************

	function storageLocalInstance() {
		
		var storage = window.localStorage;
		this.dataLifeTime = (window.POLL_OPTIONS&&window.POLL_OPTIONS.dataLifetime)||3000;
		
		/**
		 * Функция поддержания жизнедеятельности переменной
		 *	Дополнительно производит очистку 
		 * @param {type} name
		 * @param {type} myId
		 * @returns {undefined}
		 */
		this.keep = function(name, myId) {
			
			var now = (new Date).getTime(), 
				list = this.get(name);
		
				if ( !list ) list = {};
				
			list[myId] = now + this.dataLifeTime;
			
			for( var k in list ) {
				if ( list[k] < now ) delete list[k];
			}
			this.set( name, list );
			
		};
		this.getId = function ( name, myId ) {
			
			var list = this.get(name);
			return ( list && !!list[ myId ] )? list[ myId ] : null;
		};
		this.getMinId = function( name, myId ) {
			
			// name[myid + {NUM}]
			var outId = null, 
				_id = 0,
				list = this.get(name);
			
			for( var k in list ) {
				
				_id = (Number)( k.toString().replace(myId, '') );
				if ( !outId ) outId = _id;
				else if ( _id < outId ) outId = _id;
			}
			return outId;
		};
		this.get = function(name) {
			
			var data = storage.getItem( name );
			
			if ( data && (data.substring(0,1) == '{' || data.substring(0,1) == '[') ) { // is JSON?
			
				var obj = null;
				try {
					obj = JSON.parse( data );
				} catch(e){}
				if ( obj ) data = obj;
			}
			return data;
		};
		this.set = function(name, value) {
			
			if ( value && typeof value == 'object' ) value = JSON.stringify(value);
			
			storage.setItem( name, value );
		};
		this.del = function(name) {
			storage.removeItem( name );
		};
	};
	
	
// *** Cookie ******************************************************************
	
	function storageCookieInstance() {
		
		this.dataLifeTime = (window.POLL_OPTIONS&&window.POLL_OPTIONS.dataLifetime)||3000;
		
		this.keep = function(name, myId){
			
			var date = new Date(); 
				date.setTime( date.getTime() + this.dataLifeTime ); // options LIFETIME
				
			this._set( name + '_' +myId, 'void', { expires: date }); // without: path, domain 
		};
		this.getId = function ( name, myId ) {
			
			return this._get(name + '_' +myId);
		};
		this.getMinId = function(name, myId) {
			
			var mask = name+'_'+myId,
				cookies, cookie, _cookie,
				_id = 0, outId = null;
			
				cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					cookie = cookies[i].toString().replace(/^\s+|\s+$/gm,'');
					if ( cookie.substring(0, mask.length) == mask ) {
						
						_cookie = cookie.split('=');
						_id = (Number)( _cookie[0].substring(mask.length) );
						
						if ( !outId ) outId = _id;
						else if ( _id < outId ) outId = _id;
					}
				}
			return (Number)(outId);
		};
		this.get = function(name) {
			
			var data = this._get(name);
			
			if ( data && (data.substring(0,1) == '{' || data.substring(0,1) == '[') ) {
				
				var obj = null;
				try {
					obj = JSON.parse( data );
				} catch(e){}
				if ( obj ) data = obj;
			}
			return data;
		};
		this.set = function(name, value) {
			
			if ( value && typeof value == 'object' ) value = JSON.stringify(value);

			this._set(name, value);
		};
		this.del = function(name) {
			
			this._set(name, null);
		};
		
		this._set = function ( name, value, options ) {
		
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString();
			}
			var path = options.path ? '; path=' + (options.path) : '';
			var domain = '; domain='+'.'+document.domain;// options.domain ? '; domain=' + (options.domain) : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		};
		this._get = function ( name ) {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i].toString().replace(/^\s+|\s+$/gm,'');
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;	
		};

	};
	
	
	// *** DEFINE **************************************************************
	
	var storagerInstance = null;
	
	if ( 'undefined' != typeof window['localStorage'] ) {
		
		storagerInstance = new storageLocalInstance();
		
	} else if ( document.cookie ) {
		
		storagerInstance = new storageCookieInstance();
		
	} else { // ugly browser...
		
		// GAG
		window.localStorage = {
			data: {},
			setItem: function(name, value) { this.data[name] = value; },
			getItem: function(name) { return !!this.data[name]? this.data[name] : null; },
			removeItem: function(name) { if ( !!this.data[name] ) delete this.data[name]; }
		};
		storagerInstance = new storageLocalInstance();
	}










// *****************************************************************************



	// определяем хранилище для роутера
	function pollStorage( namespace ) {

		this.storage = storagerInstance;
		
		this.options = {
			key: namespace,
			id: null,
			dataLastTimeStamp: 0

		};
		
		this.id = (Number)( this.storage.get( this.options.key + '_autoincrement') ) + 1;
		if ( this.id > 2147483645 ) this.id = 1;
		this.storage.set( this.options.key + '_autoincrement', this.id);
		
	}
	pollStorage.prototype.keep = function() {
		
		this.storage.keep( this.options.key +'_list', 'id' + this.id );
	};
	pollStorage.prototype.getId = function(id) {
		
		if ( !!id ) {
			return (Number)(this.storage.getId(this.options.key +'_list', 'id' + id) );
		} else {
			return this.id;
		}
	};
	pollStorage.prototype.getMinId = function() {
		
		return this.storage.getMinId( this.options.key +'_list', 'id' );
	};
	pollStorage.prototype.getStoped = function() {
	
		return (Number)( this.storage.get( this.options.key + '_stoped') );
	};
	pollStorage.prototype.setStoped = function( stoped ) {
	
		this.storage.set( this.options.key + '_stoped', !stoped? 0 : this.id);
	};
	pollStorage.prototype.getBusy = function() {
	
		return (Number)( this.storage.get( this.options.key + '_busy') );
	};
	pollStorage.prototype.setBusy = function() {
	
		this.storage.set( this.options.key + '_busy', this.id);
	};
	pollStorage.prototype.getData = function() {
	
		var out = null, 
			dataTime = (Number)(this.storage.get( this.options.key + '_dataId'));
		
		if ( parseInt(this.options.dataLastTimeStamp) <= parseInt(dataTime) ) { // можно на больше-меньше
			
			out = this.storage.get( this.options.key + '_data');

			this.options.dataLastTimeStamp = dataTime;
		}
		return out; // object
	};
	pollStorage.prototype.setDataOut = function(namespace, obj) {
	
		var data = null;
		if ( !!namespace ) {
			
			data = this.storage.get( this.options.key + '_dataOut');
		
			var _copy = function(o){
					var n={};
					for(var k in o) { n[k]=o[k]; }
					return n;
				};
			if ( !data ) data = {};
			
			data[namespace] = obj? _copy( obj ) : null;
			this.storage.set( this.options.key + '_dataOut', data);
		} else {
			this.storage.del( this.options.key + '_dataOut' );
		}
		
		
	};
	pollStorage.prototype.getDataOut = function() {
	
		return this.storage.get( this.options.key + '_dataOut');
	};
	pollStorage.prototype.setData = function(data) {
	
		var dateTime = (new Date).getTime().toString();

		this.storage.set( this.options.key + '_data', data); // string data
		this.storage.set( this.options.key + '_dataId', dateTime);
		
		this.options.dataLastTimeStamp = dateTime;
	};

// *****************************************************************************
