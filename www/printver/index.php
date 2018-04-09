<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Реестр организаций</title>
    <link rel="stylesheet" type="text/css" href="app.css">
</head>

<body ng-app="app" ng-controller="table">

	<div class="popup print_win">
		
	<table>
		<caption class="header_name">{{org_name}}</caption>
		<tr ng-repeat="cd in comp_details">
			<td class="form_col_ext">{{cd.COLNAME}}</td>
			<td class="form_col_hide">{{cd.COLVALUE}}</td>
		</tr>
	</table>
	</div>


<script src="angular.js" type="text/javascript"></script>
<script src="app_print.js" type="text/javascript"></script>

</body>
</html>