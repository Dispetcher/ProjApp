<?php

/* Подключаем БД*/
/*define ("DB_HOST", "u345295.mysql.masterhost.ru");
define ("DB_LOGIN", "u345295");
define ("DB_PASS", "");*/

define ("DB_HOST", "localhost");
define ("DB_LOGIN", "root");
define ("DB_PASS", "");

define ("DB_NAME", "u345295_metrotun");

/*Соединяемся с БД*/
$con = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASS, DB_NAME);

/*Получаем переменную из Ангулара*/
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
$sql_id = $request->id;

if(!$con){
	die("connection failure".mysqli_connect_error());
}

mysqli_set_charset($con, 'utf8');

$sql = "SELECT `MEMBERNAME` FROM `es_proekttunnel_list` WHERE `ID_AGENT`=$sql_id";

/*Делаем запрос в БД*/
$res = mysqli_query($con, $sql);

/*Определяем тип данных*/
$data = array();

/*Добавляем строки к массиву*/
if($res->num_rows > 0){
	while ($row = $res->fetch_assoc()){
		$data[] = $row;
	}
}

/*Вывод данные кодированные в JSON*/
print json_encode($data);

?>