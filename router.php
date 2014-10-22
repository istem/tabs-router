<?php
/* 
 * Маршрутизатор вкладок браузера
 * 
 */

$POLL_OPTIONS = array(

	'requestUrl'		=> '/poll', // URL адрес ajax/ws запроса к серверу
	'dataLifetime'		=> 3000, // время жизни инстанции вкладки
	'intervalLifetime'	=> 2500, // время срабатывания интервала
	'lostRequestTime'	=> 7000, // время за которое считать ajax-запрос потерянным
);

$POLL_OPTIONS_JS = json_encode($POLL_OPTIONS);


?><!DOCTYPE html>
<html>
	<head>
		<title></title>
		<script type="text/javascript">
		
		document.domain = window.location.host.split('.').slice(-2).join('.');
		
		var POLL_OPTIONS = <?php echo $POLL_OPTIONS_JS ?>;
		
		<?php 
		if ( true ) {
			// опросчик сервера
			require "lib/caller.js";
			
			// хранилище данных
			require "lib/storage.js";
			
			// маршрутизатор
			require "lib/router.js";
		}
		?>
		
		</script>
	</head>
	<body></body>
</html>
