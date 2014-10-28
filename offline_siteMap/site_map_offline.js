var lazy_ShowPages = function(pageCode) {
	var dom;
	if (!window.offline_prototypeData[pageCode].isRender) {
		var domStr = template('sysPageItem', window.offline_prototypeData[pageCode]);
		var dom = document.createElement('li');
		dom.className = "sys-item";
		dom.id = pageCode;
		dom.dataset.pagecode = pageCode;
		dom.innerHTML = domStr;
		document.querySelector("#siteMap_manContent").appendChild(dom);
		window.offline_prototypeData[pageCode].isRender = true;
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
			_displayType = displayContent.dataset.displaypageType;
		if (_sourceDomType === _displayType || !_sourceDomType) {
			return
		} else {
			removeClass(siteMap_manNav.querySelector('.cur'), 'cur'); //去掉导航上的样式
			addClass(_sourceDom, 'cur'); //导航添加样式
			lazy_ShowPages(_sourceDomType);
			var siteMap_manContent_lis = document.querySelectorAll("#siteMap_manContent .sys-item"); //每个系统的tab
			//tab 切换
			[].forEach.call(siteMap_manContent_lis, function(item) {
				var _itemType = item.dataset.pagecode;
				if (_sourceDomType == _itemType) {
					displayContent.dataset.displaypageType = _itemType;
					item.style.display = 'block';
					[].forEach.call(item.querySelectorAll('img'), function(imgItem) {
						imgItem.src = imgItem.dataset.src;
					})
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
		} else {
			return false
		}
	}, true)
})
