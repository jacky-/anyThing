var lazy_loadVersions = function(sysCode) {
	var dom;
	if (!window.offline_prototypeData[sysCode].isRender) {
		var domStr = template('sysPageVersion', window.offline_prototypeData[sysCode]);
		var dom = document.createElement('li');
		dom.className = "sys-item";
		dom.id = sysCode;
		dom.dataset.syscode = sysCode;
		dom.innerHTML = domStr;
		document.querySelector("#siteMap_manContent").appendChild(dom);
		window.offline_prototypeData[sysCode].isRender = true;
	}
}
var lazy_loadPages = function (version){
	var dom;
	var sysCode  = document.querySelector('#siteMap_manContent').dataset.displaysystype;
	if (!window.offline_prototypeData[sysCode].pages[version].isRender) {
		var pageData = {
			version:window.offline_prototypeData[sysCode].pages[version]
		}
		var _domStr  = template('sysPageItem',pageData);
		var dom = document.createElement('ul');
		dom.className = 'sys-pages-list';
		dom.id = version;
		dom.dataset.pageversion = version;
		dom.innerHTML = _domStr;
		document.querySelector('#'+sysCode).appendChild(dom);
		window.offline_prototypeData[sysCode].pages[version].isRender = true
	}
}
dom.Ready(function() {
	var model_window = (function() {
		var overLay = document.querySelector('#overLay'),
			model_window = document.querySelector('#model_window');
		var innerH = function(html) {
			model_window.innerHTML = html;
		}
		model_window.addEventListener('click', function(e) {
			e.stopPropagation();
			removeClass(overLay, 'show');
			removeClass(model_window, 'show');
		}, false);
		return {
			show: function(fn) {
				fn.call(this, innerH);
				addClass(overLay, 'show');
				addClass(model_window, 'show');
			}
		}
	})()
	var siteMap_manNav = document.querySelector('#siteMap_manNav'),
		siteMap_manContent_ul = document.querySelector("#siteMap_manContent"),
		displayContent = document.querySelector('#siteMap_manContent');

	siteMap_manNav.innerHTML = template('nav_temp', window);
	// siteMap_manContent_ul.innerHTML = doms.contentDom;
	siteMap_manNav.addEventListener('click', function(e) {
		var _sourceDom = e.target || e.srcelement,
			_sourceDomType = _sourceDom.dataset.type,
			_displayType = displayContent.dataset.displaysystype;
		if (_sourceDomType === _displayType || !_sourceDomType) {
			return
		} else {
			removeClass(siteMap_manNav.querySelector('.cur'), 'cur'); //去掉导航上的样式
			addClass(_sourceDom, 'cur'); //导航添加样式
			lazy_loadVersions(_sourceDomType);
			var siteMap_manContent_lis = document.querySelectorAll("#siteMap_manContent .sys-item"); //每个系统的tab
			//tab 切换
			[].forEach.call(siteMap_manContent_lis, function(item) {
				var _itemType = item.dataset.syscode;
				if (_sourceDomType == _itemType) {
					displayContent.dataset.displaysystype = _itemType;
					item.style.display = 'block';
					// item.querySelector('.version_item h4').click();
				} else {
					item.style.display = 'none';
				}
			})
		}
	});
	// 点击图片出现大图。
	siteMap_manContent_ul.addEventListener('click', function(e) {
		var _sourceDom = e.target || e.srcelement;
		e.stopPropagation();
		if (_sourceDom.tagName === 'IMG') {
			model_window.show(function(inner) {
				var _html = '<img src=' + _sourceDom.dataset.src + '>';
				inner(_html);
			});
		} else if(_sourceDom.tagName === 'H4'){
			var _version = _sourceDom.dataset.pageversion;
			if(displayContent.dataset.pageversion === '_version'||!_version){
				return
			}
			lazy_loadPages(_version);
			var _thisSysItem = displayContent.querySelector('#'+displayContent.dataset.displaysystype)
			var _thisSysVersionsUl = _thisSysItem.querySelectorAll('.sys-pages-list');
			var _versionNave = _thisSysItem.querySelectorAll('.version_item h4')
			addClass(_sourceDom,'active');
			[].forEach.call(_versionNave,function(navItem){
				if(navItem!=_sourceDom){
					removeClass(navItem,'active')
				}
			});
			[].forEach.call(_thisSysVersionsUl,function(item){
				if(item.id == _version){
					item.style.display = 'block';
					[].forEach.call(item.querySelectorAll('img'), function(imgItem) {
						imgItem.src = imgItem.dataset.src;
					})
					displayContent.dataset.pageversion = _version;
				}else{
					item.style.display = 'none'
				}
			});
		}
	}, true)
})
