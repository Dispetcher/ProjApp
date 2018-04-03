<?php//include('auth.php');?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Реестр организаций</title>
    <link rel="stylesheet" type="text/css" href="app.css">
</head>

<body ng-app="app" ng-controller="table">

<div id="popup_table">
    <div ng-include="'form.php'"></div>
    <div class="backgr"></div>
</div>

<div>
    <h4 class="table_header">Реестр организаций</h4>
    <table class="main">
        <thead>
        <tr class="item head">
            <td class="agent_id" ng-show="agent.show">Agent ID</td>
            <td>№ в реестре</td>
            <td>Статус члена</td>
            <td>Наименование организации</td>
            <td>ИНН</td>
            <td>ОГРН</td>
        </tr>
        <tr class="item">
            <td class="agent_id" ng-show="agent.show"><input type="text" ng-model="agent_id"></td>
            <td><input type="search" ng-model="num_r" class="small num_r"></td>
            <td><select name= "status" ng-model="status">
                <option value="Член СРО">Член СРО</option>
                <option value="Исключен">Исключен</option>
            </select></td>
            <td><input type="search" ng-model="name" class="big"></td>
            <td><input type="search" ng-model="inn" class="small inn"></td>
            <td><input type="search" ng-model="ogrn" class="small ogrn"></td>
        </tr>
        </thead>
        <tbody>
        <tr class="item body" ng-repeat="c in companies | filterByNum: num_r | filterByStatus: status | filterByName: name | filterByINN: inn | filterByOGRN: ogrn | orderBy: 'REESTR_NUM' " ng-click="func(c.ID_AGENT, c.MEMBERNAME)">
            <td class="agent_id" ng-show="agent.show">{{c.ID_AGENT}}</td>
            <td>{{c.REESTR_NUM}}</td>
            <td>{{c.AGENTSTATUSE}}</td>
            <td>{{c.MEMBERNAME}}</td>
            <td>{{c.INN}}</td>
            <td>{{c.OGRN}}</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="bottom_table">
	<div class="btm_cell serv_cells tostart" ng-click="open_more(1)"> в начало </div>
	<div class="btm_cell serv_cells" ng-click="open_more('prev')"> предыдущая </div>
	<div class="btm_cell serv_cells" ng-click="open_more('empty')"> .. </div>
	<div class="btm_cell" ng-repeat="num in row" ng-click="open_more(num)">{{num}}</div>
	<div class="btm_cell serv_cells" ng-click="open_more('next')"> следующая </div>
	<div class="btm_cell serv_cells toend" ng-click="open_more('max')"> в конец </div>
</div>

<script src="angular.js" type="text/javascript"></script>
<script src="app.js" type="text/javascript"></script>

</body>
</html>