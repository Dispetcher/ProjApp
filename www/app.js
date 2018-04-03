var app = angular.module("app",[]);

app.controller("table", function($scope, $http){
	$http.post("database.php").then( function(response){
		$scope.companies = response.data;

	/**** Pagnation - нумерация 
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
	});
	
	setTimeout(function(){
		hideorg();
		pagnate(1);
	}, 400);

	while ( angular.element(document.querySelectorAll(".main tbody tr")) < 0){
		setTimeout(function(){
		hideorg();
		pagnate(1);
		}, 400);
	}
	if (angular.element(document.querySelectorAll(".main tbody tr")) > 0){
		setTimeout(function(){
		hideorg();
		pagnate(1);
		}, 100);
	}


	/**** Переход на другую страницу
	=================================== 
	*****/
	$scope.open_more = function(num){
		var pages = angular.element(document.querySelectorAll(".btm_cell"));
		var curr = parseInt(angular.element(document.querySelector('.curr')).html()); 

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
		pagnate(num);
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

	function pagnate(n){
		var pgs = angular.element(document.querySelectorAll(".btm_cell"));
		var len = pgs.length;

			if(n == len-6){
				rmvclass(pgs,len)
				pgs.eq(len-3).addClass('curr');
			}else{
				rmvclass(pgs,len)
				pgs.eq(n+2).addClass('curr');
			}

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

	/**** Запрос при нажатии 
	======================================
	*****/
	$scope.func = function(id, name){

		/**  Получаем имя в заголовок на всплюывающем окне **/
		$scope.org_name = name;
		
		var request = $http({
			method: "post",
			url: "one_upload.php",
			data: {
				'id': id
				},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
		});
		request.then(function(response){
			$scope.comp_details = response.data;
		});
		
		setTimeout(mergecells,50);
		setTimeout(mergecells,200);
		setTimeout(mergecells,500);
		setTimeout(mergecells,1000);

		/******* Для медленных соединений **********/
		setTimeout(mergecells,3500);
		setTimeout(mergecells,5000);

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
	function mergecells(){
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
		})

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
				if (item.MEMBERNAME.indexOf(cond) != -1){
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