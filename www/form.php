	<div class="popup" >
		<div>
			<span class="close" ng-click="hide()"></span>
		</div>	
	
	
	<table>
		<caption class="header_name">{{org_name}}</caption>
		<tr ng-repeat="cd in comp_details">
			<td class="form_col_ext">{{cd.COLNAME}}</td>
			<td class="form_col_hide">{{cd.COLVALUE}}</td>
		</tr>
	</table>
	</div>