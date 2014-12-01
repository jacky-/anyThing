/**
 * 一个匿名函数
 */
function(){
	var _myName = 'ctripUED';
	//do sth
	console.log(_myName)
}

/**
 * 一个简单的闭包
 */
var closure1 = (function(){
	var _myName = 'ctrip';
	return function(dept){
		_myName = _myName + dept
		console.log(_myName);
	}
})();

closure1(UED);//'ctripUED'

/**
 * 一个简单闭包实现缓存
 * @return {Object}
 */
var closure_Cache = (function(){
	var _cache = {};
	return {
		getInfo:function(name){
			_cache[name] = _cache[name]||{
				comp:'ctrip',
				employees:40
			};
			return _cache[name]
		}
	}
})();
closure_Cache.getInfo('UED')