/* @Dispetcher Last edited 09.04 
=================================
*/

var app = angular.module("app",[]);

app.controller("table", function($scope, $http){
	
/*********************** Открытие организации из поиска
=================================================================================
************************/
	var lnk = window.location.href;
	if(lnk.indexOf('#id-')!= -1){
		let indx = lnk.indexOf('id-') + 3;
		let cid = parseInt(lnk.slice(indx));
		details(cid);
	}

	function details(id){
		var request = $http({
			method: "post",
			url: "list.php",
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
	};


	/**** Заголовки 
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
});