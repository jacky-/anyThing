
#内容提示
### <a href="#function">函数-function</a>
1. 函数概念与创建函数
2. 执行环境及作用域
3. **闭包**
4. 私有变量

###<a href="prototype">原型-prototype</a>
1. 原型对象
2. **利用原型对象实现「继承」**

### <a href="#class">类-class</a>
1. 面向对象（Object-Oriented）
2. 类的概念
3. javascript中「类」的实现

===
<h2 id="function"> 函数的概念</h2>
>函数对于任何语言都是一个核心的概念。通过函数可以**封装任意多条语句，而且可以在任何地方任何时候调用执行**

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

#####创建函数
1. 函数声明
2. 函数表达式

```javascript
var myFN = function(agrs){
	//do sth...
}
```
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