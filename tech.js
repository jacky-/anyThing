/**
 * 一个匿名函数
 */
!function(){
	var _myName = 'ctripUED';
	//do sth
	console.log(_myName)
}

/**
 * 一个简单的闭包
 */
var closure1 = function(){
	var _myName = 'ctrip';
	return function(dept){
		_myName = _myName + dept
		console.log(_myName);
	}
}();

// closure1('UED');//'ctripUED'

/**
 * 一个简单闭包实现缓存
 * @return {Object}
 */
var closure_Cache = function(){
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
}();
// closure_Cache.getInfo('UED')
/**
 * 闭包实现对象私有变量的封装
 * @return {Object} get,set方法
 */
var ctripMan = function(){
	var _name;
	return {
		getName:function(){
			return _name||''
		},
		setName:function(name){
			_name = name;
		}
	}
}()
/**
 * 闭包实现类的私有属性封装
 * @param {String} name
 * @param {Int} age
 */
var Person = function(name,age){
	var _name,_age;
	_name = name;
	_age = age;
	this.getName = function(){
		return _name
	};
	this.getAge = function(){
		return _age
	};
	this.setAge = function(ageNum){
		_age = ageNum
	};
}
// var jacky = new Person('jacky',22);
// var lili = new Person('lili',18);
// console.log(jacky.getName(),jacky.getAge());
// console.log(lili.getName(),lili.getAge());
// jacky.setAge(99);
// lili.setAge(30);
// console.log(jacky.getName(),jacky.getAge());
// console.log(lili.getName(),lili.getAge());

/**
 * [Animal 构造函数模式模拟类]
 * @param {[String]} name
 * @param {[String]} sex
 */
var Animal = function(name,sex){
	this.name = name;
	this.sex = sex;
}
Animal.prototype.sleep = function(){
	console.log(this.name+' is sleeping')
}
var cat  = new Animal('cat',0);
// cat.sleep() 'cat is sleeping'
// console.log(cat.toString())
/**
 * 类
 */
/**
 * 工厂模式模拟Person类
 * @param  {String} name
 * @param  {Number} age
 * @return {Object}      返回Person实例
 */
var fac_Person = function(name,age){
	var _o = {};
	_o.name = name;
	_o.age = age;
	_o.say = function(){
		console.log(this.name,this.age);
	};
	return _o;
}
var p1 = fac_Person('p1',10);
var p2 = fac_Person('p2',20);
// p1.say();	//'p1' 18
// p2.say();	//'p2' 90

/**
 * 构造函数模拟Person类
 * @param {String} name
 * @param {String} age
 */
var Person = function(name,age){
	this.name = name;
	this.age = age;
	this.say = function(){
		console.log(this.name,this.age);
	};
}
var p3 = new Person('p3',30);
var p4 = new Person('p4',40);
p3.say();	//'p3' 30
p4.say();	//'p4' 40
console.log(p3.say == p4.say)