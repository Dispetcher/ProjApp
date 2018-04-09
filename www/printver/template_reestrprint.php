<?php
/*
Template Name: Печатная версия карточки организации
*/
get_header();?>
 
<div ng-app="app" ng-controller="table" class="popup print_win">
		
	<table class="table_print">
		<caption class="header_name">{{org_name}}</caption>
		<tr ng-repeat="cd in comp_details">
			<td class="form_col_ext">{{cd.COLNAME}}</td>
			<td class="form_col_hide">{{cd.COLVALUE}}</td>
		</tr>
	</table>
</div>

<?php get_footer();?>