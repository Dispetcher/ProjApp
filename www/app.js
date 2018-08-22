/* @Dispetcher Last edited 10.04 
=================================
*/

var app = angular.module("app",[]);

app.controller("table", function($scope, $http){
	$http.post("https://www.proekttunnel.ru/wp-content/projapp/php/database.php").then( function(response){
		$scope.companies = response.data;

	/**** Pagination - нумерация 
	======================================
	*****/
		let cl = $scope.companies.length;
		if (cl%30 > 0){
			var len = (cl - cl%30) / 30 + 1;
		}else{
			var len = (cl - cl%30) / 30;
		}
		
		let arr = [];
		for (let i=1; i<=len; i++){
			if(i == len){
				arr.push('...');
			}
			arr.push(i); 
		};
		$scope.row = arr;

		var orgin_arr = [];
		for(let i=0; i<cl; i++){
			var el_arr = $scope.companies[i];
			if(el_arr['AGENTSTATUSE'] == 'Член СРО'){
				orgin_arr.push(el_arr);
			}
		}
		$scope.orgin = orgin_arr.length;
	});
	
	/**** Запуск функций нумерации и скрытия организаций более 30
	=================================== 
	*****/
	window.onload = function(){
		hideorg();
		paginate(1, 0);
	}

	$scope.printver = 'Версия для печати';

	/**** Переход на другую страницу
	=================================== 
	*****/
	$scope.open_more = function(num){
		var pages = angular.element(document.querySelectorAll(".btm_cell"));
		var curr = parseInt(angular.element(document.querySelector('.curr')).html()); 
		var comp_show = angular.element(document.querySelectorAll(".item.body"));

		let lc = comp_show.length;
			if (lc%30 > 0){
				var len_c = (lc - lc%30) / 30 + 1;
			}else{
				var len_c = (lc - lc%30) / 30;
			}


		if(window.innerWidth > 1023){

			if(num == 'prev'){
				if(curr == 1){
					num = curr;
				}else{
					num = curr-1; 
				}
			}else if(num == 'empty'){
				return 1;
			}else if(num == '...'){
				return 1;
			}else if(num == 'next'){
				if(curr == pages.length-6){
					num = curr;
				}else{
					num = curr+1;
				}
			}else if(num == 'max'){
				num = pages.length-6;
			}
		}
		let a = 0 + 30*(num-1);
		let b = 29 + 30*(num-1);

		if(num){
			showmore(a, b);
		}
		paginate(num, len_c);
	}

	function showmore(n_st, n_fin){
		let elm = angular.element(document.querySelectorAll(".main tbody tr"));
		
		for(let j=0; j<=elm.length; j++){
			elm.eq(j).css("display", "none");
		}
		for(let j=n_st; j<=n_fin; j++){
			elm.eq(j).css("display", "table-row");
		}		
	}

	function hideorg(){
		let elm_pages = angular.element(document.querySelectorAll(".btm_cell")).length;
			if(elm_pages > 1){
				showmore(0, 29);
			}
	}

	/************ Скрываем страницы внизу
	===================================
	**************/

	function paginate(n, len_c){
		var pgs = angular.element(document.querySelectorAll(".btm_cell"));
		var len = pgs.length;

		if(n == len-6){
			rmvclass(pgs,len)
			pgs.eq(len-3).addClass('curr');
		}else{
			rmvclass(pgs,len)
			pgs.eq(n+2).addClass('curr');
		}

		if(len_c == 0 || len_c == len-6){
			if(window.innerWidth > 1023){
				if(n == 1){
					showall(pgs);
					hideafter(pgs,n);
					pgs.eq(0).css('display', 'none');
					pgs.eq(1).css('display', 'none');
					pgs.eq(2).css('display', 'none');
				}else if(n == 2){
					showall(pgs);
					hideafter(pgs,n);
					pgs.eq(0).css('display', 'none');
					pgs.eq(2).css('display', 'none');
				}else if(n == len-8){
					showall(pgs);
					hidebefore(pgs,n);
					pgs.eq(len-4).css('display', 'none');
				}else if(n == len-7){
					showall(pgs);
					hidebefore(pgs,n);
					pgs.eq(len-4).css('display', 'none');
					pgs.eq(len-1).css('display', 'none');
				}else if(n == len-6){
					showall(pgs);
					hidebefore(pgs,n);
					pgs.eq(len-4).css('display', 'none');
					pgs.eq(len-2).css('display', 'none');
					pgs.eq(len-1).css('display', 'none');
				}else{
					showall(pgs);
					hidebefore(pgs,n);
					hideafter(pgs,n);
				}
			}else{
				showall(pgs);
				pgs.eq(0).css('display', 'none');
				pgs.eq(1).css('display', 'none');
				pgs.eq(2).css('display', 'none');
				pgs.eq(len-4).css('display', 'none');
				pgs.eq(len-2).css('display', 'none');
				pgs.eq(len-1).css('display', 'none');
			}
		}else{
			showall(pgs);
			pgs.eq(0).css('display', 'none');
			pgs.eq(1).css('display', 'none');
			pgs.eq(2).css('display', 'none');
			pgs.eq(len-4).css('display', 'none');
			pgs.eq(len-2).css('display', 'none');
			pgs.eq(len-1).css('display', 'none');
			for(let i=len_c+3; i<len; i++){
				pgs.eq(i).css('display', 'none');
			}
		}
	}	

	/************ Удаляем класс со всех страниц **************/

	function rmvclass(pgs,len){
		for(i=0; i<len-2; i++){
			pgs.eq(i).removeClass('curr');
		}
	}
	/************ Скрываем стр ДО нажатой страницы **************/

	function showall(pgs){
		for (i=0; i < pgs.length; i++){
			pgs.eq(i).css('display', 'inline-block');
		}
	}
	/************ Скрываем стр ДО нажатой страницы **************/

	function hidebefore(pgs,n){
		for (i=3; i < n+1; i++){
			pgs.eq(i).css('display', 'none');
		}
	}
	/************ Скрываем стр ПОСЛЕ нажатой страницы **************/

	function hideafter(pgs, n){
		for (i=n+4; i < pgs.length - 4; i++){
			pgs.eq(i).css('display', 'none');
		}
	}
	/************(окончание) Скрываем страницы внизу
	===================================
	**************/


	/*********************** (окончание) Переход на другую страницу
	====================================
	*******/

	/**** Скрытие окна, при нажатии рядом с ним
	======================================
	*****/

	$scope.hidefunc = function(){
		angular.element(document.querySelector("#popup_table")).css("display", "none");
	}

/*********************** Открытие организации из поиска
=================================================================================
************************/
	var lnk = window.location.href;
	if(lnk.indexOf('#id-')!= -1){
		let indx = lnk.indexOf('id-') + 3;
		var cid = parseInt(lnk.slice(indx));
		details(cid);
	}

	function details(id){
		var request = $http({
			method: "post",
			url: "https://www.proekttunnel.ru/wp-content/projapp/php/list.php",
			data: {
				'id': id
				},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
		});
		request.then(function(response){
			var orgname = response.data;
			var nm = orgname[0];
			$scope.org_name = nm['MEMBERNAME'];
		});

		/**  Получаем имя в заголовок на всплюывающем окне **/	
		var request = $http({
			method: "post",
			url: "https://www.proekttunnel.ru/wp-content/projapp/php/one_upload.php",
			data: {
				'id': id
				},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
		});
		request.then(function(response){
			$scope.comp_details = response.data;
		});		

		/**** Запуск функции объединения ячеек после отображения инфо о компании 
		======================================
		*****/		
		$scope.$on('ngRepeatFinished', function() {
            mergecells(id);
 		});

		/**** Отслеживание нажатий, установка положения кнопки вверх 
		======================================
		*****/
		
		angular.element(document.querySelector("#popup_table")).css("display", "block");	
		angular.element(document.querySelector(".to_top")).css("right", "60px");	

		/**** Установка положения окна в 0,0 
		======================================
		*****/	
		/*var pos = angular.element(document.querySelectorAll('.popup')).prop('offsetTop');*/
		var w = window.innerWidth;
		if (w < 420){
			window.scrollTo(0, 395);
		}else{
			window.scrollTo(0, 360);
		}
	
	};

	/**** Запрос при нажатии 
	======================================
	*****/
	$scope.func = function(id, name){

		/**  Получаем имя в заголовок на всплюывающем окне **/
		$scope.org_name = name;
		
		var request = $http({
			method: "post",
			url: "https://www.proekttunnel.ru/wp-content/projapp/php/one_upload.php",
			data: {
				'id': id
				},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
		});
		request.then(function(response){
			$scope.comp_details = response.data;
		});
		
		/**** Запуск функции объединения ячеек после отображения инфо о компании 
		======================================
		*****/		
		$scope.$on('ngRepeatFinished', function() {
            mergecells(id);
 		});

		/**** Отслеживание нажатий, установка положения кнопки вверх 
		======================================
		*****/
		
		angular.element(document.querySelector("#popup_table")).css("display", "block");	
		angular.element(document.querySelector(".to_top")).css("right", "60px");	

		/**** Установка положения окна в 0,0 
		======================================
		*****/	
		/*var pos = angular.element(document.querySelectorAll('.popup')).prop('offsetTop');*/
		var w = window.innerWidth;
		if (w < 420){
			window.scrollTo(0, 395);
		}else{
			window.scrollTo(0, 360);
		}
	};
	/****(Окончание) Отслеживание нажатий, установка положения кнопки вверх 
	======================================
	*****/
		
	/**** Отслеживание ввода букв в поля для фильтров 
	======================================
	*****/

	$scope.hide = function(){
		angular.element(document.querySelector("#popup_table")).css("display", "none");
	};

	angular.element(document.querySelectorAll("input")).on("keyup", function(e){
		hidebtmcell();
		hideorg();
	});

	angular.element(document.querySelectorAll("select")).on("change", function(e){
		setTimeout(hidebtmcell, 300);
		setTimeout(hideorg, 300);
	});

	/**** Заголовки во всплывающем окне 
	======================================
	*****/
	function mergecells(id){
		/** List of elements for categorizing **/
		var col_ext = angular.element(document.querySelectorAll(".form_col_ext"));
		var col_hide = angular.element(document.querySelectorAll(".form_col_hide"));

		var arr = [2, 8, 11, 16, 19, 21, 24, 27, 35, 38, 42, 46];

		for(let j = 0; j < col_ext.length; j++){
			if(col_ext.eq(j).html() == 'Сведения о приостановлении, о возобновлении, об отказе в возобновлении права осуществлять строительство, реконструкцию, капитальный ремонт объектов капитального строительства'){
				arr.push(j);
			}else if(col_ext.eq(j).html() == 'Сведения о прекращении членства в Ассоциации'){
				arr.push(j);
			}else if(col_ext.eq(j).html() == 'Ранее выданные свидетельства о допуске/праве'){
				arr.push(j);
			}else if(col_ext.eq(j).html() == 'Сведения о проведенных проверках'){
				arr.push(j);
			}else if(col_ext.eq(j).html() == 'Факты применения мер дисциплинарного воздействия'){
				arr.push(j);
			}
		}
		
		arr.forEach(function(i, array){
			col_ext.eq(i)
			.attr('colspan', '2')
			.css('font-weight','600')
			.addClass('popup_header');
		col_hide.eq(i)
			.css('display', 'none');
		});

		/********************Печатная версия карточки
		=====================
		*********************/
    
        let linkid = 'https://www.proekttunnel.ru/reestr/printver/#id-' + id;
		angular.element(document.querySelectorAll('#linkprint')).attr('href', linkid);

	}

	function hidebtmcell(){
		var comp_show = angular.element(document.querySelectorAll(".item.body"));

			let lc = comp_show.length;
			if (lc%30 > 0){
				var len_c = (lc - lc%30) / 30 + 1;
			}else{
				var len_c = (lc - lc%30) / 30;
			}
			paginate(1, len_c);
	}

	/********************Close a popup window by pressing ESC
		=====================
		*********************/
	window.onkeydown = function(e){
		if(e.keyCode == 27){
			$scope.hide();
		}
	}
});
	/**** Custom filters 
	======================================
	*****/
app.filter('filterByNum', function(){
	return function(items, cond){
		var list = [];
		if(cond == undefined || cond == "") {
			return items;
		}

		if(items.length > 0){
			for (let i = 0; i < items.length; i++){
				var item = items[i];
				if (String(item.REESTR_NUM).indexOf(cond) != -1){
					list.push(item); 
				} 
			}
		}
		return list;	
	}
});
app.filter('filterByStatus', function(){
	return function(items, cond){
		var list = [];
		if(cond == undefined || cond == "") return items;

		if(items.length > 0){
			for (let i = 0; i < items.length; i++){
				var item = items[i];
				if (cond == "Все члены"){
					list.push(item); 
				}else if(item.AGENTSTATUSE.indexOf(cond) != -1){
					list.push(item); 
				} 
			}
		}
		return list;
	}

});
app.filter('filterByName', function(){
	return function(items, cond){
		var list = [];
		if(cond == undefined || cond == "") return items;

		if(items.length > 0){
			for (let i = 0; i < items.length; i++){
				var item = items[i];
				if (item.MEMBERNAME.toLowerCase().indexOf(cond.toLowerCase()) != -1){
					list.push(item); 
				} 
			}
		}
		return list;	
	}
});
app.filter('filterByINN', function(){
	return function(items, cond){
		var list = [];
		if(cond == undefined || cond == "") return items;

		if(items.length > 0){
			for (let i = 0; i < items.length; i++){
				var item = items[i];

				if (item.INN.indexOf(cond) != -1){
					list.push(item); 
				} 
			}

		}
		return list;
		hidebtmcell();
	}
});
app.filter('filterByOGRN', function(){
	return function(items, cond){
		var list = [];
		if(cond == undefined || cond == "") return items;

		if(items.length > 0){
			for (let i = 0; i < items.length; i++){
				var item = items[i];
				if (String(item.OGRN).indexOf(cond) != -1){
					list.push(item); 
				} 
			}
		}
		return list;	
	}
});
app.directive('onFinishRender',['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    if(!!attr.onFinishRender){
                      $parse(attr.onFinishRender)(scope);
                    }
                });
            }
        }
    }
}]);