<?php
/*
Template Name: Реестр на Angular
*/
get_header();?>
    <div class="content_bg" ng-app="app" ng-controller="table">
		 <div id="popup_table">
             <div ng-include="'/wp-content/angapp/php/form.php'"></div>
              <div class="backgr" ng-click="hidefunc()"></div>
         </div>
		
        <?php get_template_part('includes/breadcrumbs');?>
        <div id="content_section">
            <div class="center_wrap">
                <div class="dt content_dt">
                    <?php get_sidebar();?>
                    <div class="dtc vat page_content_reestr" id="page_content">
                        <div class="page_content">
                            <h1><?php if(get_field('seo_h1')): echo the_field('seo_h1'); else: the_title(''); endif;?></h1>
                            <div class="page_content_orgnumbers">
                               По состоянию на <?php echo date(get_option('date_format')); ?> года количество действующих членов СРО &mdash; <?php echo get_post_meta($post->ID, 'orgnumber', true); ?>
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
												<option value="Все члены">Все члены</option>
                								<option value="Член СРО">Член СРО</option>
               									<option value="Исключен">Исключен</option>
          									</select>
										</td>
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
                                        <td class="name_org">{{c.MEMBERNAME}}</td>
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
							
                        </div><!--/.page_content-->
                        <div class="page_content_underreestr">
                            <p>
                                <strong>СРО А «Объединение подземных строителей»</strong> публикует на своем сайте Реестр членов СРО, специализирующихся на строительстве подземных сооружений, позволяющий потенциальным заказчикам, застройщикам, всем заинтересованным бизнес-субъектам Санкт-Петербурга и других регионов РФ ознакомиться с актуальными данными о  компаниях, имеющих право осуществлять строительные работы.
                            </p>
                            <p>
                                Полный и достоверный Реестр членов СРО строителей дает возможность любому желающему оперативно проверить информацию о любой строительной компании или фирме, с которой планирует сотрудничать. В Реестре членов СРО строителей указываются сведения о размере компенсационных фондов, о наличии права выполнять строительство и о категории объектов, на которых может работать конкретная организация.
                            </p>
                            <p>
                                В Реестре содержатся сведения относительно имущественной ответственности члена Ассоциации, данные о страховщике, а также ранее выданные свидетельства о допуске СРО. Также указаны данные о проведенных проверках и их результатах. Реестр регулярно обновляется, поэтому содержит актуальные данные.
                            </p>
                        </div>
                        <p class="page_date date_reestr">Дата создания страницы: <?php the_time('d.m.Y H:i')?></p>
                        <p class="page_date_modified">Дата изменения страницы: <?php echo date(get_option('date_format'));?> 08:25<?php// the_modified_time('d.m.Y H:i')?></p>
                    </div><!--/#page_content-->
                </div><!--/.dt-->
            </div><!--/.center_wrap-->
        </div><!--/#content_section-->
    </div><!--/.content_bg-->
<?php get_footer();?>