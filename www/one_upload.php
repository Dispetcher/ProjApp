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

$sql = "SELECT `COLNAME`, `COLVALUE` FROM `es_proekttunnel_details` WHERE `id_agent` = $sql_id";

/*Делаем запрос в БД*/
$res = mysqli_query($con, $sql);

/*Определяем тип данных*/
$data = array();

$c = 0;
$cn = 9999;

/*Добавляем строки к массиву*/
if($res->num_rows > 0){
	while ($row = $res->fetch_assoc()){
		$data[] = $row;

	/*Добавляем заголовки для группировки*/	
 	if($c == 1){
		$row = array('COLNAME'=>'Сведения, позволяющие идентифицировать члена СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 6){
		$row = array('COLNAME'=>'Адрес', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 8){
		$row = array('COLNAME'=>'Контактная информация', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 12){
		$row = array('COLNAME'=>'Руководитель', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 14){
		$row = array('COLNAME'=>'Сведения о соответствии члена СРО условиям членства в СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 15){
		$row = array('COLNAME'=>'Сведения о внесении взноса в Компенсационный фонд возмещения вреда СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 17){
		$row = array('COLNAME'=>'Сведения о внесении взноса в Компенсационный фонд обеспечения договорных обязательств СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 19){
		$row = array('COLNAME'=>'Сведения о наличии страховки', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 26){
		$row = array('COLNAME'=>'Сведения о наличии у члена саморегулируемой организации права осуществлять подготовку проектной документации по договору подряда на подготовку проектной документации, заключаемым с использованием конкурентных способов заключения договоров', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 28){
		$row = array('COLNAME'=>'по договору подряда на подготовку проектной документации', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 31){
		$row = array('COLNAME'=>'по договору подряда на подготовку проектной документации заключаемого с использованием конкурентных способов заключения договоров', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 34){
		$row = array('COLNAME'=>'Сведения о внесении изменении в свидетельство о праве', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == $cn){
		$row = array('COLNAME'=>'Ранее выданные свидетельства о допуске/праве', 'COLVALUE'=>'');
		$data[] = $row;
	}
	/***    ***/

	/***Добавляем заголовок блоков - Сведения о приостановлении /// Сведения о исключении
	=========
	***/
	if($row['COLNAME'] == 'Порядковый номер' and $n == 1){
		$n = 0;
	}else if($row['COLNAME'] != 'Порядковый номер' and $n == 1){
		
		$row_tmp = $row;
		$el_arr = array_pop($data);

		$row = array('COLNAME'=>'Сведения о приостановлении, о возобновлении, об отказе в возобновлении осуществлять подготовку проектной документации по договору подряда на подготовку проектной документации', 'COLVALUE'=>'');
		$data[] = $row;
		$data[] = $row_tmp;

		$row = array('COLNAME'=>'Сведения о прекращении членства в Ассоциации', 'COLVALUE'=>'');
		$data[] = $row;

		/* Служебный символ - Определяем порядок элемента для следующего заголовка    */
		$cn = $c + 3;
		
		/*  Служебный символ - Для заголовка - Сведения о приостановлении       */
		$n = 0;
	}

	if($row['COLNAME'] == 'Событие, с которым связано внесение изменений'){
		
		/* Служебный символ для заголовка - Сведения о приостановлении  */ 
		$n = 1;
	}
	/***(Окончание) Первый заголовок
	=========
	***/

	/***Исправляем ВИП проверок на ВИД
	=========
	***/
	if($row['COLNAME'] == 'Вип проверки'){
		$row = array('COLNAME'=>'Вид проверки', 'COLVALUE'=>$row['COLVALUE']);
		$el_arr = array_pop($data);
		$data[] = $row;
	}
	/***Окончание исправления
	=========
	***/

	/***Последний заголовок
	=========
	***/

	if($row['COLNAME'] == 'Вид проверки' and $frst == 0){
		$row_tmp = $row;
		$el_arr = array_pop($data);

		$row = array('COLNAME'=>'Сведения о проведенных проверках', 'COLVALUE'=>'');
		$data[] = $row;
		$data[] = $row_tmp;

		$frst = 1;
	}

	/***(окончание) Последний заголовок
	=========
	***/

	/***Исправление названия страховой компании
	=========
	***/
	if($row['COLNAME'] == 'Наименование страховой компании'){
		$row_cname = $row['COLNAME'];

		$row_cval = str_replace('-Не определено-', '', $row['COLVALUE']);

		$el_arr = array_pop($data);
		$row = array('COLNAME'=>$row_cname, 'COLVALUE'=>$row_cval);
		$data[] = $row;
	}
	/***(Окончание)Исправление названия страховой компании
	=========
	***/

        $c += 1;
	}
}

/***Добавляем последни заголовок блока и значения
	=========
***/

$row_name = 'Факты применения мер дисциплинарного воздействия';
$row = array('COLNAME'=>$row_name, 'COLVALUE'=>'');
$data[] = $row;

$row = array('COLNAME'=>'-', 'COLVALUE'=>'-');
$data[] = $row;


/***(окончание) Добавляем последни заголовок блока и значения
	=========
***/

/*Вывод данные кодированные в JSON*/
print json_encode($data);

?>