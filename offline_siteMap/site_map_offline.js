var makeDom = function(data) {
	var _navDom = '',
		_contentDom = '';
	for (var k in data) {
		/*
		var _navName = data[k].navName, //导航名称
					_prototypePath = data[k].path, //原型路径
					_prototypeImgSrc = data[k].imgSrc, //图片路径
					_type = k;
				_navDom += '<li class="nav-item"';
				_navDom += 'data-type=' + _type + '>';
				_navDom += _navName;
				_navDom += '</li>';
				_contentDom += '<li class="sysItem-item" ';
				_contentDom += 'data-type=' + _type + '>';
				_contentDom += '<p> <a href="' + _prototypePath + '" target="_blank" >' + _prototypePath + '</a></p>';
				_contentDom += '<img src="./imgs/' + _prototypeImgSrc + '"></li>'
				data = {
					"offline_seize":{
						"sysName":"拍拍促销平台"
						,"PRUD_URL":""
						,"pages":{
							"offline_seize_index":{
								"pageName":"首页"
								,"imgSrc":""
								,"ui_URL":""
								,"dev_URL":""
							}
						}
					}
				}
		*/
	var _navName = data[k].sysName,//导航名称
		_sysCode = k//系统标识

	}
	return {
		navDom: _navDom,
		contentDom: _contentDom
	}
}
var doms = makeDom(offline_prototypeData);

/*var navDomStr = (function(data){
	var _str ='';
	for(var k in data){
		var _navName = data[k].sysName//导航名称；
		,_sysCode = k;//系统标识；
		_str += '<li class="nav-item"';
		_str += 'data-type=' + _sysCode + '>';
		_str += _navName;
		_str += '</li>';
	}
	return _str
})(window.offline_prototypeData)*/
var  makeSysTabDom = function (sysTabObj) {
	if(!sysTabObj.isCreated){
		var _str = '';


		return _str;
	}
}
var lazy_ShowPages = function(pageCode){
	var dom;
	if(!window.offline_prototypeData[pageCode].isRender){
		var domStr = template('sysPageItem',window.offline_prototypeData[pageCode]);
		var dom = document.createElement('li');
			dom.className="sys-item";
			dom.id = pageCode;
			dom.dataset.pagecode = pageCode;
			dom.innerHTML = domStr;
			document.querySelector("#siteMap_manContent").appendChild(dom);
			window.offline_prototypeData[pageCode].isRender = true;
	}
}
dom.Ready(function() {
	var model_window = (function(){
		var overLay = document.querySelector('#overLay'),
		model_window = document.querySelector('#model_window');
		var innerH = function(html){
			model_window.innerHTML = html;
		}
		overLay.addEventListener('click',function(e){
			e.stopPropagation();
			removeClass(overLay,'show');
			removeClass(model_window,'show');
		},false);
		return {
			show:function(fn){
				fn.call(this,innerH);
				addClass(overLay,'show');
				addClass(model_window,'show');
			}
		}
	})()
	var siteMap_manNav = document.querySelector('#siteMap_manNav'),
		siteMap_manContent_ul = document.querySelector("#siteMap_manContent"),
		displayContent = document.querySelector('#siteMap_manContent');

	siteMap_manNav.innerHTML =template('nav_temp',window);
	// siteMap_manContent_ul.innerHTML = doms.contentDom;
	siteMap_manNav.addEventListener('click', function(e) {
		var _sourceDom = e.target || e.srcelement,
			_sourceDomType = _sourceDom.dataset.type,
			_displayType = displayContent.dataset.displaypageType;
		if (_sourceDomType === _displayType || !_sourceDomType) {
			return
		} else {
			removeClass(siteMap_manNav.querySelector('.cur'),'cur');//去掉导航上的样式
			addClass(_sourceDom,'cur');//导航添加样式
			lazy_ShowPages(_sourceDomType);
			var siteMap_manContent_lis = document.querySelectorAll("#siteMap_manContent .sys-item");//每个系统的tab
			//tab 切换
			[].forEach.call(siteMap_manContent_lis, function(item) {
				var _itemType = item.dataset.pagecode;
				if (_sourceDomType == _itemType) {
					displayContent.dataset.displaypageType = _itemType;
					item.style.display = 'block';
					[].forEach.call(item.querySelectorAll('img'),function(imgItem){
						imgItem.src = imgItem.dataset.src;
					})
				} else {
					item.style.display = 'none';
				}
			})
		}
	});
	// 点击图片出现大图。
	siteMap_manContent_ul.addEventListener('click',function(e){
		var _sourceDom = e.target || e.srcelement;
		e.stopPropagation();
		if(_sourceDom.tagName==='IMG'){
			model_window.show(function(inner){
				var _html = '<img src='+_sourceDom.dataset.src+'>';
				inner(_html);
			});
		}else{
			return false
		}
	},true)
})