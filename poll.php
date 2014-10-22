<?php
/*
 * Пример ответа сервера на запрос клиента
 */

	// some data
	$data = array(
		'message' => array(
					'new' => mt_rand(0, 10),
					'online' => array(
								mt_rand(10,100),
								time(),
							),
				),
	);
		
	header('Content-Type: application/json; charset=utf-8');
	
	exit( json_encode($data) );
