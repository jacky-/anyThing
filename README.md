
#内容提示
### <a href="#function">函数-function</a>
1. 函数概念与创建函数
2. 执行环境及作用域
3. **闭包**
4. 私有变量

###<a href="prototype">原型-prototype</a>
1. 原型对象
2. 原型链 
3. _**利用原型对象实现「继承」**_

### <a href="#class">类-class</a>
1. 面向对象编程（Object Oriented Programming）
2. 类的概念
3. javascript中「类」的实现

****

<h2 id="function"> 函数的概念</h2>
>函数对于任何语言都是一个核心的概念。通过函数可以**封装任意多条语句，而且可以在任何地方任何时候调用执行**

****

###关键字
#####js中的函数声明的关键字是```function```

举个栗子

```javascript
//一个带参数和返回值的funtion
function myFn (agr1){
	console.log(agr1)
	return agr1+'ctripUed'
}
```

#####参数（arguments）
js对参数无类型、个数的限制。

---

再举个栗子

```javascript
function myFn (name,age,jobFn){
	console.log(arguments.length)
	console.log(arguments[0])
	console.log(arguments[1])
	console.log(arguments[2])
}
```

**注意：arguments只是与Array类似，并不是Array的实例**

****

#####创建函数
1. 函数声明
2. 函数表达式

```javascript
var myFN = function(agrs){
	//do sth...
}
```

****

###执行环境
在web浏览器上最顶端的执行环境是```window```,每个函数执行时其环境会被推入一个环境栈中，结束后再被推出。
####scope chain (作用域链)

```javascript
var g_num = 38;
function myFn(){
	var _num = 20;
	console.log(g_num,20);
}
myFn();// 38 20
```

===
####匿名函数
```javascript
/**
 * 一个匿名函数
 */
function(){
	var _myName = 'ctripUED';
	//do sth
	console.log(_myName)
}
```

####闭包（closure）

****

#什么是闭包？

****

1. 闭包是一个**函数**
2. 有权访问另一个函数作用域中的变量

```javascript
/**
 * 一个简单的闭包
 */
var closure1 = (function(){
	var _myName = 'ctrip';
	return function(dept){
		_myName = _myName + dept
		console.log(_myName);
	}
})()
closure1(UED);//'ctripUED'
```

####闭包的用途
1. 用作缓存
2. 实现封装

****

```javascript
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
closure_Cache.getInfo('UED')//Object
```

****

```javascript
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
// console.log(jacky.getName(),jacky.getAge()); 'jacky' 22
// console.log(lili.getName(),lili.getAge());'lili' 18
// jacky.setAge(99);
// lili.setAge(30);
// console.log(jacky.getName(),jacky.getAge()); 'jacky' 99
// console.log(lili.getName(),lili.getAge());'lili' 30
```

****

<h2 id="prototype">原型对象-prototype</h2>
>*js中每个对象都有一个原型对象，但并不意味着每个对象都有一个  prototype 属性（实际上只有函数对象才有）。在创建一个对象时，js会自动将其原型对象（\__proto__）设置为其构造函数 prototype 属性所指的对象*

****

1. 原型是一个对象（ === Object）。
2. 每个对象的原型指向其**构造函数**的原型对象（prototype）。

****

####原型链
JavaScritp引擎在访问对象的属性时，如果在对象本身中没有找到，则会去原型链中查找，如果找到，直接返回值，如果整个链都遍历且没有找到属性，则返回undefined.原型链一般实现为一个链表，这样就可以按照一定的顺序来查找。

****

<h2 id="class">js中的类-class</h2>
#### 面向对象程序设计
>面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构。OOP 的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。OOP 达到了软件工程的三个主要目标：重用性、灵活性和扩展性。为了实现整体运算，每个对象都能够接收信息、处理数据和向其它对象发送信息。

在面向对象编程中，类（class）是对象（object）的模板，定义了同一组对象（又称"实例"）共有的属性和方法。

>Javascript是一种基于对象（object-based）的语言，你遇到的所有东西几乎都是对象。但是，它又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有class（类）。
Javascript语言不支持"类"，但是可以用一些变通的方法，模拟出"类"。

1. 工厂模式
2. 构造函数模式
3. 构造函数、原型混合模式
4. minimalist approach
5. ...

****

####工厂模式
```javascript
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
var p1 = fac_Person('p1',18);
var p2 = fac_Person('p2',90);
p1.say();	//'p1' 18
p2.say();	//'p2' 90
```

****

缺点:

**对象识别问题** `instanceof` 操作符无法判断该对象到底是哪个类的实例

****

####构造函数模式
```javascript
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
```

****

`var p3 = new Person('p3',30);` 实际上做了4件事情

1. 创建一个对象；
2. 将构造函数的作用域赋给新对象；
3. 执行构造函数中的代码；
4. 返回新对象（p3）

****

缺点：

```javascript
this.say = function(){
		console.log(this.name,this.age);
	};
```

每次实例化一个`Person`都会实例化一个`Function`，而这两个`function`实际上不是相等（`==`）的；

****

####原型模式

```javascript
/**
 * 构造函数与原型混合模式模拟Man类
 * @param {String} name
 * @param {String} age
 */
var Man = function(name,age){
	this.name = name;
	this.age = age;
}
Man.prototype.say = function(){
	console.log(this.name,this.age);
};
var m1 = new Man('m1',10);
var m2 = new Man('m2',20);
m1.say();	//'m1' 10
m2.say();	//'m1' 20
```
缺点：

coding很麻烦

****

####minimalist approach

```javascript
var Car = {
	getInstance:function(name){
		var _o = {};
		_o.name = name;
		return _o;
	}
}
var bmw = Car.getInstance('bmw');
var toyota = Car.getInstance('toyota');
console.log(toyota.name);	//'toyota'
console.log(bmw.name);		//'bmw'
```

利用闭包可以很方便的操作一些数据。
继承也很好实现。

##继承

>“继承”是面向对象软件技术当中的一个概念。如果一个类A继承自另一个类B，就把这个A称为"B的子类"，而把B称为"A的父类"。继承可以使得子类具有父类的各种属性和方法，而不需要再次编写相同的代码。在令子类继承父类的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类的原有属性和方法，使其获得与父类不同的功能。另外，为子类追加新的属性和方法也是常见的做法。

####利用原型实现继承
```javascript
/**
 * 对象冒充+原型实现继承
 * @param {String} name super
 * @param {String} sex  super
 * @param {String} color
 */
var  Fish = function(name,sex){
	Animal.call(this,name,sex);
	this.color = 'gold'
}
Fish.prototype = new Animal();
Fish.prototype.constructor = Fish;
var f1 = new Fish('f1',0);
```
