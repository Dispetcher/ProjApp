	<div class="popup" >
		<div>
			<span class="close" ng-click="hide()"></span>
		</div>	
		<div class="lnkprint">
			<span><img src="https://www.proekttunnel.ru/wp-content/projapp/img/printer_icon.png" alt="Print Version"><a href="#" target="_blank" id="linkprint">{{printver}}</a></span>
		</div>
		
	<table>
		<caption class="header_name">{{org_name}}</caption>
		<tr ng-repeat="cd in comp_details" on-finish-render="mergecells()">
			<td class="form_col_ext">{{cd.COLNAME}}</td>
			<td class="form_col_hide">{{cd.COLVALUE}}</td>
		</tr>
	</table>
	</div>