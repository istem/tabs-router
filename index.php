<?php

/*
 * Пример основной страницы сайта
 *
 */

	$POLL_OPTIONS = array(

		'requestUrl'		=> '/poll', // URL адрес серверного обработчика ajax/ws запроса
		'dataLifetime'		=> 3000, // время жизни инстанции вкладки
		'intervalLifetime'	=> 2500, // время срабатывания интервала
		'lostRequestTime'	=> 7000, // время за которое считать ajax-запрос потерянным
	);

	$POLL_OPTIONS_JS = json_encode($POLL_OPTIONS);

?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<style type="text/css">
			html { background: #eee; }
			html, body { margin: 0; padding: 0; }
			body { clear: both; margin: 5% auto; padding: 10px 15px; font-size: 13px; line-height: 17px; font-family: "ProximaNova", "Helvetica Neue", "helvetica", "arial", sans-serif; width: 500px; background: #fff; border-radius: 10px; box-shadow: 0px 0px 6px rgba(0,0,0,0.3); }
			h1 { margin: -10px -15px; padding: 10px 15px; font-size: 17px; line-height: 40px; padding: 0 15px; font-weight: normal; background: #ffc; border-bottom: 1px solid #eee; border-top-left-radius: 10px; border-top-right-radius: 10px; }
			.grey { color: darkgray; }
			a { display: block; float: left; width: 25%; line-height: 26px; text-align: center; text-decoration: none; background: #cff; }
			a:hover { background: #00f; color: #fff; }
			hr { border: 0; border-bottom: 1px solid #eee; clear: both; }
		</style>
		<script type="text/javascript">
			
			// опции для poll_Handler (не обязательно)
			var POLL_OPTIONS = <?php echo $POLL_OPTIONS_JS ?>;
		</script>
		<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		
		<script type="text/javascript">
			
			$(function(){
				
				// set data
				$('#a1').click(function(){
					poll_Handler.setData('message', {news: Math.ceil(Math.random()*1000)});
					return false;
				});
				
				// show info block
				$('#a2').click(function(){
					
					poll_Handler.setBusy('focus');
					return false;
				});
				
				// stop it
				$('#a3').click(function(){
					
					poll_Handler.stop();
					return false;
				});
				
				// start it
				$('#a4').click(function(){
					
					poll_Handler.start();
					return false;
				});


				poll_Handler.ready(function(){
			
					// получаемые от сервера данные { ... "message": data ... } - будут обрабатываться обработчиком dataHandler
					poll_Handler.addDataHandler('message', dataHandler);
			
					// регистрация нового namespace
					poll_Handler.addModule('focus');
					
					// регистрация обработчика "получения фокуса"
					poll_Handler.addHandler('focus', 'on', handlerFocus); // show(block)
					
					// регистрация обработчика "потеря фокуса"
					poll_Handler.addHandler('focus', 'off', handlerBlur); // hide(block)		
				});
				// например также:
				// window.onfocus = function() { window.poll_Handler.setBusy('focus'); }
			});
			
				// обработчик данных от сервера
				function dataHandler( data ) {

					var str = !data? '-nothing-here-' : 'New: '+data.new + '<br/>Online: ' + data.online.join(', ');

					$('#info').html( str );
				}
				// обработчик "получения фокуса"
				function handlerFocus() {
					$('#info').show();
				}
				// обработчик "потери фокуса"
				function handlerBlur() {
					$('#info').hide();
				}

		</script>
	</head>
	<body>
		<h1>window.poll_Handler</h1>
		<pre id="info"><span class="grey">-nothing-here-</span></pre>
		<p>
			<a href="#" id="a1">send data</a>
			<a href="#" id="a2">show info block</a>
			<a href="#" id="a3">stop it</a>
			<a href="#" id="a4">start it</a>
		</p>		
		
		<hr/>
	</body>
</html>
