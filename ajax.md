# AJAX

## 1.AJAX概述

> Web 程序最初的目的就是将信息（数据）放到公共的服务器，让所有网络用户都可以通过浏览器访问。

![](media\a1.png)

​	

```javascript
//1.在此之前，我们可以通过以下几种方式让浏览器发出对服务端的请求，获得服务端的数据：
	地址栏输入地址，回车，刷新
	特定元素的 href 或 src 属性
	表单提交
    a标签
//2.这些方案都是我们无法通过或者很难通过代码的方式进行编程（对服务端发出请求并且接受服务端返回的响应）
//3.如果我们可以通过JavaScript直接发送网络请求，那么Web的可能就会更多，随之能够实现的功能也会更多，至少不再是“单机游戏”。
```

	AJAX（Asynchronous JavaScript and XML），是指使用JavaScript和XML进行**异步刷新局部网页的技术**。不是一种新的编程语言，是基于JavaScript、XML、HTML、CSS新用法。它使我们可以通过 JavaScript 直接获取服务端最新的内容而不必重新加载页面。让Web更能接近桌面应用的用户体验。
	
	说白了，AJAX 就是浏览器提供的一套 API，可以通过 JavaScript 调用，从而实现通过代码控制请求与响应。实现网络编程。

```javascript
//同步(web1.0)：请求1-->等待-->响应1-->请求2-->等待-->响应2…
//异步(web2.0): 请求1-->请求2-->请求3-->响应1-->响应2-->响应3(局部刷新页面)
```

## 2.快速上手

### 2.1 Ajax核心概念

```javascript
//1.JavaScript：更新局部的网页
//2.XML：一般用于请求数据和响应数据的封装(一般现在用JSON多)
//3.XMLHttpRequest对象（浏览器的内置对象）
	(非IE浏览器：XMLHttpRequest)
	(IE7以后XMLHttpRequest   IE7之前:ActiveXObject) 
//4.异步：发送请求后不等返回结果，由回调函数处理结果
```

### 2.2 快速使用

```javascript
//Ajax的常用方法和属性
//1 发送Ajax请求
	open(method,url,async) 与服务器建立连接(请求方式、请求url、是否需要异步)
	send(content)  发送请求,content为请求参数 
	setRequestHeader(header,value)  设置请求头

//2 请求回调
	onreadystatechange：指定回调函数
	readyState:  指XMLHttpRequest的状态信息  
    status：HTTP的状态码   200   403(没有访问权限)   404   500
	responseText：获得响应的文本 
	responseXML：获得响应的XML文档     
```

```php
//案例：使用ajax获取时间
<script type="text/javascript">
    //1.获取Ajax核心对象
    function createAJAX(){
        var xmlhttp;
        //IE7+  Firefox chrome  Opera Safari
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }
        //IE5  IE6
        else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    	return xmlhttp;
    }
     //也可以这样写
     //var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

	//2. 获取一个 XMLHttpRequest 类型的对象 —— 相当于打开了一个浏览器
	var xhr = createAJAX();
    //3. 打开与一个网址之间的连接 —— 相当于在地址栏输入访问地址
    xhr.open('GET', 'http://localhost:3000/getTime')
    //4. 通过连接发送一次请求 —— 相当于回车或者点击访问发送请求
    xhr.send(null)
    //5. 指定 xhr 状态变化事件处理函数 —— 相当于处理网页呈现后的操作
    xhr.onreadystatechange = function () {
    	//6.通过 xhr 的 readyState 判断此次请求的响应是否接收完成
    	if (this.readyState === 4) {
       	 	// 通过 xhr 的 responseText 获取到响应的响应体
        	console.log(this);
   		}
	}	
</script>
    
//server.js 
var express = require('express');
var app = express();
app.get("/getTime",function(req,res){
	 var date = new Date();
	 res.end(date.toLocaleString());
})
```

### 2.3 readyState 状态描述说明

	由于 readystatechange 事件是在 xhr 对象状态变化时触发（不单是在得到响应时），也就意味着这个事件会被触发多次，所以我们有必要了解每一个状态值代表的含义：

![](media\d2.png)


### 2.4. 时间轴

![](media\a2.png)

```php
var xhr = new XMLHttpRequest()
console.log(xhr.readyState)
// => 0
// 初始化 请求代理对象
    
xhr.open('GET', 'http://localhost:3000/getTime')
console.log(xhr.readyState)
// => 1
// open 方法已经调用，建立一个与服务端特定端口的连接
    
xhr.send()
xhr.addEventListener('readystatechange', function () {
	switch (this.readyState) {
        case 2:
            // => 2
            // 已经接受到了响应报文的响应头
            // 可以拿到头
            // console.log(this.getAllResponseHeaders())
            console.log(this.getResponseHeader('server'))
            // 但是还没有拿到体
            console.log(this.responseText)
            break
        case 3:
            // => 3
            // 正在下载响应报文的响应体，有可能响应体为空，也有可能不完整
            // 在这里处理响应体不保险（不可靠）
            console.log(this.responseText)
            break
        case 4:
            // => 4
            // 一切 OK （整个响应报文已经完整下载下来了）
            // 这里处理响应体
            console.log(this.responseText)
            break
        }
	}
)
```

	通过理解每一个状态值的含义得出一个结论：一般我们都是在 readyState 值为 4 时，执行响应的后续逻辑。

```php
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 后续逻辑......
	}
}
```

### 2.5. 遵循 HTTP

	本质上 XMLHttpRequest 就是 JavaScript 在 Web 平台中发送 HTTP 请求的手段，所以我们发送出去的请求仍然是HTTP 请求，同样符合 HTTP 约定的格式：

```php
// 设置请求报文的请求行
xhr.open('GET', 'http://localhost:3000/getTime')
// 设置请求头
xhr.setRequestHeader('Accept', 'text/plain')
// 设置请求体
xhr.send(null)
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 获取响应状态码
		console.log(this.status)
		// 获取响应状态描述
		console.log(this.statusText)
		// 获取响应头信息
		console.log(this.getResponseHeader('content-type')) // 指定响应头
		console.log(this.getAllResponseHeaders()) // 全部响应头
		// 获取响应体
		console.log(this.responseText) // 文本形式
		//console.log(this.responseXML) // XML 形式，了解即可
	}
}
```

参考链接：
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

## 3.具体用法

### 3.1. GET 请求返回用户数据

	通常在一次 GET 请求过程中，参数传递都是通过 URL 地址中的 ? 参数传递。

```javascript
<ul id="list"></ul>

<script>
var listElement = document.getElementById('list')
// 发送请求获取列表数据呈现在页面
// =======================================
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/getdata');
xhr.send();
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return
    var data = JSON.parse(this.responseText)
    // data => 数据
    for (var i = 0; i < data.length; i++) {
        var liElement = document.createElement('li')
        liElement.innerHTML = data[i].name
        liElement.id = data[i].id
        listElement.appendChild(liElement)
        liElement.addEventListener('click', function () {
            // TODO: 通过AJAX操作获取服务端对应数据的信息
            // 如何获取当前被点击元素对应的数据的ID
            // console.log(this.id)
            var xhr1 = new XMLHttpRequest()
            xhr1.open('GET', 'http://localhost:3000/getdata?id=' + this.id)
            xhr1.send()
            xhr1.onreadystatechange = function () {
                if (this.readyState !== 4) return
                var obj = JSON.parse(this.responseText)
                alert(obj.age)
            }
        })
    }
}



//server.js
var express = require('express');
var app = express();
var data = [{id:1,name:"张三",age:18},{id:2,name:"李四",age:20},{id:3,name:"二傻子",age:19},{id:4,name:"三愣子",age:28}];
app.get('/getdata', function(req, res) {
	res.header("Content-Type", "application/json; charset=utf-8");
	var query = req.query;
	if(query.id){
		//console.log(query);
		var id = query.id;
		var find = false;
		data.forEach(function(ele,i){
			if(ele.id == id){
				find = true;
				res.end( JSON.stringify( data[i] ));
			}
		})
		if(find == false){
			res.end( JSON.stringify( data ));
		}
	}
	else{
		res.end( JSON.stringify( data ));
	}
});

app.listen(3000);
console.log('Listening on port 3000...');
```

### 3.2. POST 请求登录案例

	POST 请求过程中，都是采用请求体承载需要提交的数据。

```javascript
//login.html
<style>
#loading {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #555;
    opacity: .5;
    text-align: center;
    line-height: 300px;
}

#loading::after {
    content: '加载中...';
    color : #fff;
}
</style>

<body>
  <div id="loading"></div>
  <table border="1">
    <tr>
      <td>用户名</td>
      <td><input type="text" id="username"></td>
    </tr>
    <tr>
      <td>密码</td>
      <td><input type="password" id="password"></td>
    </tr>
    <tr>
      <td></td>
      <td><button id="btn">登录</button></td>
    </tr>
  </table>
</body>
    
<script>
// 找一个合适的时机，做一件合适的事情
var btn = document.getElementById('btn')
// 1. 获取界面上的元素 value
var txtUsername = document.getElementById('username')
var txtPassword = document.getElementById('password')
var loading = document.getElementById('loading')

btn.onclick = function () {
    loading.style.display = 'block'
    var username = txtUsername.value
    var password = txtPassword.value
    // 2. 通过 XHR 发送一个 POST 请求
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/dologin')
    // 设置请求的content-type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // xhr.send('username=' + username + '&password=' + password)
    xhr.send(`username=${username}&password=${password}`)
    // 3. 根据服务端的反馈 作出界面提示
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return
        console.log(this.responseText)
        loading.style.display = 'none'
    }
}
</script>


//server.js
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('views'));

app.post("/dologin",function(req,res){
	 let data = req.body;
	 console.log(data);
	 if(!data.username || !data.password){
	 	console.log("111");
	 	res.end("请输入用户密码");
	 }
	 else{
	 	console.log("222");
	 	if (data.username === 'admin' && data.password === '123') {
		  res.end('恭喜你');
		}
		console.log("333");
	    res.end('用户名或者密码错误');
	 }
	 
})

app.listen(3000);
console.log('Listening on port 3000...');
```

### 3.3. 同步与异步

	xhr.open() 方法第三个参数要求传入的是一个 bool 值，其作用就是设置此次请求是否采用异步方式执行，默认为 true ，如果需要同步执行可以通过传递 false 实现：

```php
console.log('before ajax')
var xhr = new XMLHttpRequest()
// 默认第三个参数为 true 意味着采用异步方式执行
xhr.open('GET', 'http://localhost:3000/getTime', true)
xhr.send(null)
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 这里的代码最后执行
		console.log('request done')
	}
}
console.log('after ajax');
```

	如果采用同步方式执行，则代码会卡死在 xhr.send() 这一步：

```php
console.log('before ajax')
var xhr = new XMLHttpRequest()
// 同步方式
xhr.open('GET', 'http://localhost:3000/getTime', false)
// 同步方式 执行需要 先注册事件再调用 send，否则 readystatechange 无法触发
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 这里的代码最后执行
		console.log('request done')
	}
}
xhr.send(null)
console.log('after ajax')
    
//如果是同步请求，一定在发送请求 send() 之前注册 readystatechange 
```


### 3.4. 响应数据格式

	提问：如果希望服务端返回一个复杂数据，该如何处理？
	关心的问题就是服务端发出何种格式的数据，这种格式如何在客户端用 JavaScript 解析。

#### 3.4.1. XML介绍

	XML是一种数据格式，xml文件以xml后缀名结尾。xml文件需要使用xml解析器去解析。浏览器内置了xml解析器。(XML这种数据格式目前使用没有JSON多)
	
	XML的组成：标签、属性、注释、文档声明

```javascript
//1.XML标签
<student>AA</student>  开始标签  标签体内容  结束标签

1）<student/> 或 <student></student> 空标签。没有标签体内容
2）xml标签名称区分大小写。
3）xml标签一定要正确配对。
4）xml标签名中间不能使用空格
5）xml标签名不能以数字开头
6）注意： 在一个xml文档中，有且仅有一个根标签

//2.属性
<student name="eric">student</student>
1）属性值必须以引号包含，可以是单引号也可以双引号，但是不能单双引号混用！！！
2）一个标签内可以有多个属性，但不能出现重复的属性名！！！

//3.注释
  <!--  xml注释 -->

//4.文档声明
<?xml version="1.0" encoding="utf-8"?>
1) version: xml的版本号
2) encoding： 解析xml文件时查询的码表（解码过程时查询的码表）
```

```javascript
//使用xml设计一个通讯录
<?xml version="1.0" encoding="utf-8"?>
<contact>
	<person id="100">
		 <name>张三</name>
		 <age>18</age>
		 <phone>12345678</phone>
		 <email>12453@qq.com</email>
	</person>
	<person id="101">
		 <name>李四</name>
		 <age>20</age>
		 <phone>22345678</phone>
		 <email>34453@qq.com</email>
	</person>
</contact>

```

#### 3.4.2 返回XML

```javascript
<script>
	var xhr = new XMLHttpRequest()
	xhr.open('GET', 'http://localhost:3000/getXML')
	xhr.send()
	xhr.onreadystatechange = function () {
    	if (this.readyState !== 4) return
        // this.responseXML 专门用于获取服务端返回的 XML 数据，操作方式就是通过 DOM 的方式操作
        // 但是需要服务端响应头中的 Content-Type 必须是 application/xml
        console.log(this.responseXML.documentElement.children[0].innerHTML)
        console.log(this.responseXML.documentElement.getElementsByTagName('name')[0])
    }
</script>
  
//server.js
app.get("/getXML",function(req,res){
	 res.header("Content-Type","application/xml");

	 var xml =  '<?xml version="1.1" encoding="utf-8"?>';
	 xml += '<person>';
	 xml += '<name>羊杨</name>';
	 xml += '<age>16</age>';
	 xml += '<gender>男</gender>';
	 xml += '</person>';
    
	 res.end(xml);
})
```

#### 3.4.3.返回JSON

	JSON是一种数据格式，类似于 JavaScript 字面量方式
	服务端采用 JSON 格式返回数据，客户端按照 JSON 格式解析数据。

```javascript
<body>
  <table>
    <tbody id="content"></tbody>
  </table>
  <script>
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:3000/getJson')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      var res = JSON.parse(this.responseText)
      // res => 服务端返回的数据
      var data = res.data
      for (var i = 0; i < data.length; i++) {
        // 先创建行
        // 再创建列
        // 再将列添加到行
        // 再将行添加到tbody
        // console.log(data[i])
        var tr = document.createElement('tr')
        tr.innerHTML = '<td>' + data[i].id + '</td><td></td><td></td><td></td><td></td><td></td>'
      }
    }
  </script>
</body>


//server.js
app.get("/getJson",function(req,res){
	res.header("Content-Type", "application/json; charset=utf-8");
	var data =  {
			"success": true,
			"data": [{
				"0": "7",
				"id": "7",
				"1": "哈哈",
				"author": "哈哈",
				"2": "hh@gmail.com",
				"email": "hh@gmail.com",
			}, {
				"0": "6",
				"id": "6",
				"1": "小右",
				"author": "小右",
				"2": "www@gmail.com",
				"email": "www@gmail.com",
			}, {
				"0": "4",
				"id": "4",
				"1": "汪磊",
				"author": "汪磊",
				"2": "www@gmail.com",
				"email": "www@gmail.com",
			}],
			"total_count": 3
	}
	res.end( JSON.stringify(data));
})

```

#### 3.4.4 模板引擎处理响应数据渲染

```javascript
<body>
  <table id="demo"></table>
  <script id="tmpl" type="text/x-art-template">
    {{each comments}}
    <!-- each 内部 $value 拿到的是当前被遍历的那个元素 -->
    <tr>
      <td>{{$value.author}}</td>
      <td>{{$value.content}}</td>
    </tr>
    {{/each}}
  </script>
      
  <script src="template-web.js"></script>
  <script>
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:3000/getJson')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      var res = JSON.parse(this.responseText)

      // 模板所需数据
      var context = { comments: res.data }
      // 借助模板引擎的API 渲染数据
      var html = template('tmpl', context)
      console.log(html)

      document.getElementById('demo').innerHTML = html
    }
  </script>
</body>


//server.js
app.get("/getJson",function(req,res){
	res.header("Content-Type", "application/json; charset=utf-8");
	var data =  {
			"success": true,
			"data": [{
				"0": "7",
				"id": "7",
				"1": "哈哈",
				"author": "哈哈",
				"2": "hh@gmail.com",
				"email": "hh@gmail.com",
			}, {
				"0": "6",
				"id": "6",
				"1": "小右",
				"author": "小右",
				"2": "www@gmail.com",
				"email": "www@gmail.com",
			}, {
				"0": "4",
				"id": "4",
				"1": "汪磊",
				"author": "汪磊",
				"2": "www@gmail.com",
				"email": "www@gmail.com",
			}],
			"total_count": 3
	}
	res.end( JSON.stringify(data));
})

```

#### 3.4.5 发送application/json数据

```javascript
$("#btn4").click(function(){
		$.ajax({
		    url: 'http://localhost:8000/testJSONData',
		    //请求方式
		    type: 'post',
		    //指定向服务器提交的数据是JSON格式的数据
		    contentType: "application/json; charset=utf-8",
		    //向服务器提交的具体数据
        	data: JSON.stringify([{name:"zhangsan"},{name:"lisi "}]),
		    //请求成功的回调
		    success: function (res) {
		       console.log(res);
		    }
		})
	})



//配置bodyParser中间件  解析application/x-www-form-urlencoded 这种post请求方式提交的数据
app.use(bodyParser.urlencoded({ extended: false }))
//配置bodyParser中间件  解析application/json; charset=utf-8 这种post请求方式提交的数据
app.use(bodyParser.json()); 
app.post("/testJSONData",(req,res)=>{
	console.log(req.body); 
	res.send("xxxx");
})
```

## 4.封装

### 4.1 回调函数

	回调函数具体的定义为：函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。
	
	因此callback 不一定用于异步，一般同步(阻塞)的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。

```javascript
//同步回调
var callback = function(arg3) {
    console.log('callback Totle is:' + arg3)
}

function fn(arg1, arg2, cb) {
    var Total = arg1 + arg2;
    cb(Total);
    console.log('mainFunction Totle is:' + Total)
}

fn(2, 2, callback)   

//异步回调
function f2() {
    console.log('f2 finished') 
}

function f1(cb) {
    setTimeout(cb,1000)        //用setTimeout()模拟耗时操作
    console.log('f1 finished')
}

f1(f2);  
```

### 4.2. AJAX 请求封装

```javascript
/**
* 发送一个 AJAX 请求
* @param {String} method 请求方法
* @param {String} url 请求地址
* @param {Object} params 请求参数
* @param {Function} done 请求完成过后需要做的事情（委托/回调）
*/
function ajax (method, url, params, done) {
    method = method.toUpperCase()
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    if (typeof params === 'object') {
        var tempArr = []
        for (var key in params) {
            var value = params[key]
            tempArr.push(key + '=' + value)
        }
        params = tempArr.join('&')
    }
    if (method === 'GET') {
        url += '?' + params
    }
    xhr.open(method, url, true)
    var data = null
    if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        data = params
    }
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return
        // 不应该在封装的函数中主观的处理响应结果
        // console.log(this.responseText)
        // 你说我太主观，那么你告诉我应该做什么
        done(this.responseText)
    }
    xhr.send(data)
}


var onDone = function (res) {
    console.log(res)
    console.log('做完了')
}
ajax('get', 'http://localhost:3000/getTime', {}, onDone)


//time.php
<?php
echo time();
```

### 4.3. jQuery 中的 AJAX

	jQuery 中有一套专门针对 AJAX 的封装，功能十分完善
	参考：
	http://www.jquery123.com/category/ajax/
	http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp

#### 4.3.1. $.ajax

	常用选项参数介绍：

```javascript
url：请求地址
type：请求方法，默认为 get
dataType：服务端响应数据类型
contentType：请求体内容类型，默认 application/x-www-form-urlencoded
data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递
timeout：请求超时时间

beforeSend：请求发起之前触发
success：请求成功之后触发（响应状态码 200）
error：请求失败触发
complete：请求完成触发（不管成功与否）
```

```javascript
// 1.最基础的调用
$.ajax('http://localhost:3000/getTime', {
    type: 'post', // method 请求方法
    success: function (res) {
        // res => 拿到的只是响应体
        console.log(res)
    }
})


$.ajax({
    url: 'http://localhost:3000/getTime',
    type: 'post',
    // 用于提交到服务端的参数，
    // 如果是 GET 请求就通过 url 传递
    // 如果是 POST 请求就通过请求体传递
    data: { id: 1, name: '张三' },
    success: function (res) {
        console.log(res)
    }
})

//服务端设置content-type
$.ajax({
    url: 'http://localhost:3000/testJson',
    type: 'get',
    success: function (res) {
        // res 会自动根据服务端响应的 content-type 自动转换为对象
        // 这是 jquery 内部实现的
        console.log(res)
    }
})

//服务端不设置content-type，客户端设置dataType
$.ajax({
    url: 'http://localhost:3000/testJson',
    type: 'get',
    // 设置的是请求参数
    data: { id: 1, name: '张三' },
    // 内部会调用JSON.parse()将服务端响应的数据转换为json对象
    dataType: 'json',
    success: function (res) {
        console.log(res)
    }
})


//server.js
app.get("/testJson",function(req,res){
	res.header("Content-Type", "application/json; charset=utf-8");
	var data =  {
			name:"张三",
			age:18
	}
	res.end( JSON.stringify(data));
})
```

```javascript
//关于dataType
//1.通过dataType选项还可以指定其他不同数据处理方式。可以指定 html、json、jsonp、script或者text。

//2.其中，text和xml类型返回的数据不会经过处理。数据仅仅简单的将XMLHttpRequest的responseText或responseXML属性传递给success回调函数，

//3.如果指定为html类型，返回HTML文本，包含的script标签会在插入DOM时执行

//4.如果指定script类型的话，把响应的结果当作JavaScript 执行，并将其当作纯文本返回

//5.如果指定为json类型，则会把获取到的数据作为一个JavaScript对象来解析，并且把构建好的对象作为结果返回。为了实现这个目的，他首先尝试使用JSON.parse()。如果浏览器不支持，则使用一个函数来构建。JSON数据是一种能很方便通过JavaScript解析的结构化数据。

//6.如果获取的数据文件存放在远程服务器上（域名不同，也就是跨域获取数据），则需要使用jsonp类型。会自动在所请求的URL最后添加"?callback=?"。服务器端应当在JSON数据前加上回调函数名，以便完成一个有效的JSONP请求。

'注意：我们必须确保网页服务器报告的MIME类型与我们选择的dataType所匹配。比如说，dataType为XML的话，服务器端就必须声明 text/xml 或者 application/xml 来获得一致的结果'
```

#### 4.3.2. 请求回调

```javascript
$.ajax({
    url: 'http://localhost:3000/testTime',
    type: 'get',
    beforeSend: function (xhr) {
        // 在所有发送请求的操作（open, send）之前执行
        console.log('beforeSend', xhr)
    },
    success: function (res) {
        // 只有请求成功（状态码为200）才会执行这个函数
        console.log(res)
    },
    error: function (xhr) {
        // 隐藏 loading
        // 只有请求不正常（状态码不为200）才会执行
        console.log('error', xhr)
    },
    complete: function (xhr) {
        // 不管是成功还是失败都是完成，都会执行这个 complete 函数
        console.log('complete', xhr)
    }
})
```

#### 4.3.3. 全局事件处理

	http://www.jquery123.com/category/ajax/global-ajax-event-handlers/

```php
.ajaxStart(function(){})
.ajaxStop(function(){})
```

```javascript
<style>
    .loading {
        display: none;
        position: fixed;
    }
</style>

<div class="loading">正在玩命加载中...</div>
<button id="btn">请求</button>
<script src="jquery.js"></script>
<script>
	$(document).ajaxStart(function () {
        // 只要有 ajax 请求发生 就会执行
        $('.loading').fadeIn()
        // 显示加载提示
        console.log('注意即将要开始请求了')
	}).ajaxStop(function () {
        // 只要有 ajax 请求结束 就会执行
        $('.loading').fadeOut()
        // 结束提示
        console.log('请求结束了')
	})
    $('#btn').on('click', function () {
        $.get('http://localhost:3000/getTime')
    })
</script>
```

#### 4.3.4 nprogress的使用

```javascript
<link rel="stylesheet" href="../nprogress.css"> 
<script src="../nprogress.js"></script>
<script src="../jquery.js"></script>

<button id="btn">请求</button>

$(document).ajaxStart(function () {
    NProgress.start()
}).ajaxStop(function () {
    NProgress.done()
})

$("#btn").click(function(){
    $.ajax({
        url: 'http://localhost:8000/getData',
        //请求方式
        type: 'get',
        //请求成功的回调
        success: function (res) {
            console.log(res);
        }
    })
})
```

#### 4.3.5 案例:省市联动

```javascript
##1 select.html
<div id="container">
    <label>
        省：<select id="province">
        <option>请选择省...</option>
        </select>
    </label>
    <label>
        市：<select id="city">
        <option>请选择市...</option>
        </select>
    </label>
    <label>
        县：<select id="county">
        <option>请选择县...</option>
        </select>
    </label>
</div>

<style type="text/css">
    #container{
        width: 500px;
        min-height: 300px;
        background-color: lightgreen;
        margin: auto;
        text-align: center;
        padding: 10px;
    }
</style>
    
    
//发送请求获取所有省份的数据
$.ajax({
    type:"get",
    url:"http://localhost:8000/getProvinces",
    success:function(res){
        //console.log(res);
        var html = template("provinceTemplate",{provinces:res})
        $("#province").append(html);
    }
})

//该事件是需要点击鼠标之后才会触发的
$("#province").change(function(){
    var selid = $(this).val();
    $.ajax({
        type:"get",
        url:"http://localhost:8000/getCities/"+selid,
        success:function(res){
            //console.log(res);
            $("#city option:not(:first)").remove();
            var html = template("cityTemplate",{cities:res})
            $("#city").append(html);
        }
    })
})


//给city绑定change事件
$("#city").change(function(){
    console.log($(this).val());
    var selid = $(this).val();
    $.ajax({
        type:"get",
        url:"http://localhost:8000/getCountries/"+selid,
        success:function(res){
            console.log(res);
            $("#country option:not(:first)").remove();
            var html = template("countryTemplate",{countries:res})
            $("#country").append(html);
        }
    })
})

##2 server.js
let express = require("express");
let app = express();
let db = require("./views/selectdata");
//let bodyParser = require("body-parser");
app.use(express.static("./views"));

//配置bodyParser中间件  解析application/x-www-form-urlencoded 这种post请求方式提交的数据
//app.use(bodyParser.urlencoded({ extended: false }))
//配置bodyParser中间件  解析application/json; charset=utf-8 这种post请求方式提交的数据
//app.use(bodyParser.json());

//console.log(db.cityJson);
//console.log(db.countyJson);


//返回所有省份的数据
app.get("/getProvinces",(req,res)=>{
	res.header("content-type", "application/json;charset=utf-8");
	res.send(JSON.stringify(db.provinceJson))
})

app.get("/getCities/:id",(req,res)=>{
	res.header("content-type", "application/json;charset=utf-8");
	//获取省份的id信息
	let id = req.params["id"];
	//所有的城市信息
	let cities = db.cityJson;
	//要返回的城市的数组
	let currentCities = []
	for (var i = 0; i < cities.length; i++) {
		//是直辖市
		if (cities[i].id == id) {
			currentCities.push(cities[i]);
			break;
		}
		//不是直辖市
		else if(cities[i].parent == id){
			currentCities.push(cities[i]);
		}
	}
	//将currentCities城市信息返回
	res.send(JSON.stringify(currentCities));
})


app.get("/getCountries/:id",(req,res)=>{
	res.header("content-type", "application/json;charset=utf-8");
	let id = req.params["id"];
	let countries = db.countyJson;
	let currentCountries = []
	for (var i = 0; i < countries.length; i++) {
		if(countries[i].parent == id){
			currentCountries.push(countries[i]);
		}
	}
	res.send(JSON.stringify(currentCountries));
})

app.listen(8000,()=>{
	console.log("running....")
})
##3 selectdata.js见具体文件
```

## 5.跨域

### 5.1. 相关概念

	同源策略是浏览器的一种安全策略，所谓同源是指  **域名，协议，端口完全相同** ，只有同源的地址才可以相互通过AJAX 的方式请求。
	同源或者不同源说的是两个地址之间的关系，不同源地址之间请求我们称之为跨域请求
	
	什么是同源？例如：http://www.example.com/detail.html 与一下地址对比

```
http://api.example.com/detail.html 不同源 域名不同
https://www.example.com/detail.html 不同源 协议不同
http://www.example.com:8080/detail.html 不同源 端口不同
http://api.example.com:8080/detail.html 不同源 域名、端口不同
https://api.example.com/detail.html 不同源 协议、域名不同
https://www.example.com:8080/detail.html 不同源 端口、协议不同
http://www.example.com/other.html 同源 只是目录不同
```

```javascript
<script>
    // 当前页面访问地址：http://day-12.io/11-cross-domain.html
    // 希望被AJAX的地址：http://locally.uieee.com/categories
    // 这两个地址之间 协议相同 端口相同 域名不同 所以是两个不同源的地址
    // 同源策略指的就是：不同源地址之间，默认不能相互发送AJAX请求

    // 不同源地址之间如果需要相互请求，必须服务端和客户端配合才能完成
    $.get('http://locally.uieee.com/categories', function (res) {
  	  console.log(res)
	})
	//No 'Access-Control-Allow-Origin' header is present on the requested resource
</script>
```

### 5.2. 解决方案

	现代化的 Web 应用中肯定会有不同源的现象，所以必然要解决这个问题，从而实现跨域请求。

#### 5.2.1 发送跨域请求的方式

```javascript
##1. img
// 可以发送不同源地址之间的请求
// 无法拿到响应结果
var img = new Image()
img.src = 'http://locally.uieee.com/categories'

## 2. link
// 可以发送不同源地址之间的请求
// 无法拿到响应结果
var link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'http://locally.uieee.com/categories'
document.body.appendChild(link)

## 3. script
// 可以发送不同源地址之间的请求
// 能够借助js的回调间接拿到结果
var script = document.createElement('script')
script.src = 'http://localhost/time2.php'
document.body.appendChild(script) // 开始发起请求

// 相当于请求的回调
function foo (res) {
    console.log(res)
}

//time2.php
<?php
header('Content-Type: application/javascript');
$json = json_encode(array(
  'time' => time()
));
// 在 JSON 格式的字符串外面包裹了一个函数的调用，
// 返回的结果就变成了一段 JS 代码
echo "foo({$json})";
```

#### 5.2.2 JSONP

	JSON with Padding，是一种借助于 script 标签发送跨域请求的技巧。
	其原理就是在客户端借助 script 标签请求服务端的一个动态网页（php 文件），服务端的这个动态网页返回一段带有函数调用的 JavaScript 全局函数调用的脚本，将原本需要返回给客户端的数据传递进去。
	以后绝大多数情况都是采用 JSONP 的手段完成不同源地址之间的跨域请求

```javascript
//客户端 http://www.zce.me/users-list.html
<script>
	function foo(msg){ console.log(msg) }	
</script>
<script src="http://localhost:3000/testJsonP"></script>

    
## script标签中的async表示异步的意思，但是在使用JSONP的时候不论有没有用异步，都建议将带有回调方法的js写在jsonp的js代码之前，以保证结果回来之后请求的回调函数已经存在。
```

```php
//server 返回的结果
app.get("/testJsonP",function(req,res){
	 res.header("Content-Type", "application/javascript");
	 res.end("foo(['我', '是', '你', '原', '本', '需', '要', '的', '数', '据'])");
})
```

	总结一下：由于 XMLHttpRequest 无法发送不同源地址之间的跨域请求，所以我们必须要另寻他法，script 这种方案就是我们最终选择的方式，我们把这种方式称之为 JSONP。

```javascript
//JSONP存在的问题：
1.JSONP需要服务端配合，服务端按照客户端的要求返回一段JavaScript调用客户端的函数
2.只能发送GET请求

注意：JSONP用的是script标签，和AJAX提供的XMLHttpRequest没有任何关系！！！
```

#### 5.2.3 为每次请求创建一个函数

```javascript
##1.客户端
var funcName = 'haha_' + Date.now() + Math.random().toString().substr(2, 5)
var script = document.createElement('script')
script.src = 'http://localhost:3000/testJsonP?callback=' + funcName
document.body.appendChild(script)

window[funcName] = function (data) {
     console.log('1111', data)
}

##2.服务端  server.js
app.get("/testJsonP",function(req,res){
	 var callback = req.query.callback;
	 var data = "['我', '是', '你', '原', '本', '需', '要', '的', '数', '据']";
	 if (!callback) {
	 	 res.header("Content-Type", "application/json; charset=utf-8");
	 	 res.end(JSON.stringify(data))
	 }
	 console.log(callback);
	 res.header("Content-Type", "application/javascript");
	 res.end(`typeof ${callback} === 'function' && ${callback}(${data})`);;
})
```

#### 5.2.4 JSONP的封装

```javascript
function jsonp (url, params, callback) {
    //随机生成一个方法
    var funcName = 'jsonp_' + Date.now() + Math.random().toString().substr(2, 5)
    
    if (typeof params === 'object') {
        var tempArr = []
        for (var key in params) {
            var value = params[key]
            tempArr.push(key + '=' + value)
        }
        params = tempArr.join('&')
    }

    var script = document.createElement('script')
    script.src = url + '?' + params + '&callback=' + funcName
    document.body.appendChild(script)

    window[funcName] = function (data) {
        callback(data)
        delete window[funcName]
        document.body.removeChild(script)
    }
}

jsonp('http://localhost:3000/testJsonP', { id: 123 }, function (res) {
    console.log(res)
})

jsonp('http://localhost:3000/testJsonP', { id: 123 }, function (res) {
    console.log(res)
})
```

#### 5.2.5 jQuery 中使用 JSONP 就是将 dataType 设置为 jsonp

```javascript
##1.发送ajax请求
<script>
	  $.ajax({
        url: 'http://localhost:3000/finduser',
        dataType: 'jsonp',
        success: function (res) {
            console.log(res)
        }
    })
</script>

##2.server.js
app.get("/finduser",function(req,res){
	 var callback = req.query.callback;
	 var data = '[{name:"张三",gender:"男"},{name:"李四",gender:"女"}]';
	 if (!callback) {
	 	 res.header("Content-Type", "application/json; charset=utf-8");
	 	 res.end(data)
	 }
	 console.log(callback);
	 res.header("Content-Type", "application/javascript");
	 res.end(`typeof ${callback} === 'function' && ${callback}(${data})`);;
})

##3.注意点，jquery中可以自定义等号后的回调函数的名字以及等号前面的参数名字
 1.jsonp:'cb',  jsonp属性的作用就是自定义参数名字（callback=abc 这里的名字指的是等号前面的键，后端根据这个键获取方法名，jquery的默认参数名称是callback）
 2.jsonpCallback:'abc',  这个属性的作用就是自定义回调函数的名字（callback=abc ，这里的名字指的是等号后面的值）
```

#### 5.2.6 JSONP案例

##### a) 百度搜索词

```javascript
<style>
#container{
    width: 400px;
    min-height: 300px;
    background-color: lightgreen;
    margin: auto;
    text-align: center;
    padding: 10px;
}
#container ul{
	margin: 0;
}
#container li{
    list-style: none;
    background-color: lightGray;
    text-align: left;
    padding-left: 45px;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
}
</style>

<div id="container">
    <input type="text" name="keyword" id="keyword">
    <input type="button" value="搜索" id="query">
    <div id="info"></div>
</div>

$(function(){
    $("#keyword").keyup(function(){
        var kw = $(this).val();
        $.ajax({
            url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
            jsonp:'cb',
            data:{wd:kw},
            dataType:'jsonp',
            success:function(data){
                var sug = data.s;
                var tag = '<ul>';
                $.each(sug,function(i,e){
                    tag += '<li>'+e+'</li>';
                });
                tag += '</ul>';
                $("#info").html(tag);
                $("#info").find('li').hover(function(){
                    $(this).css('backgroundColor','lightblue');
                },function(){
                    $(this).css('backgroundColor','lightgray');
                });
            }
        });
    });
});
```

##### b) 查询天气

```javascript
//这个服务器地址不稳定
<div id="container">
     <select id="city">
         <option value="101010100">北京</option>
         <option value="101020100">上海</option>
         <option value="101280101">广州</option>
         <option value="101280601">深圳</option>
     </select>
     <input type="button" value="查询" id="query">
     <div id="info"></div>
</div>


 <script type="text/javascript" src="./jquery.js"></script>
    <script type="text/javascript" src="./template.js"></script>
    <script type="text/html" id="weather">
        {{if weather}}
            {{each weather as value}}
                <div>
                    <span>日期：{{value.date}}</span>
					
					{{if value.info}}
						<ul>
							<li>白天天气{{value.info.day[1]}}</li>
							<li>白天温度{{value.info.day[2]}}</li>
							<li>白天风向{{value.info.day[3]}}</li>
							<li>白天风速{{value.info.day[4]}}</li>
						</ul>
						<ul>
							<li>夜间天气{{value.info.night[1]}}</li>
							<li>夜间温度{{value.info.night[2]}}</li>
							<li>夜间风向{{value.info.night[3]}}</li>
							<li>夜间风速{{value.info.night[4]}}</li>
						</ul>
                      {{/if}}
                </div>
            {{/each}}
        {{/if}}
    </script>



<script type="text/javascript">
        $(function(){
            $("#query").click(function(){
                var code = $('#city').val();
                $.ajax({
                    url : 'http://tq.360.cn/api/weatherquery/querys',
                    data:{app:'tq360',code:code},
                    jsonp:'_jsonp',
                    dataType:'jsonp',
                    success:function(data){
                        var html = template('weather',data);
                        $('#info').html(html);
                    }
                });
            });
        });
    </script>
```

#### 5.2.7. CORS

	Cross Origin Resource Share，跨域资源共享。这种方案无需客户端作出任何变化（客户端不用改代码），只是在被请求的服务端响应的时候添加一个 Access- Control-Allow-Origin 的响应头，表示这个资源是否允许指定域请求。

```php
//服务端代码	
app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',6000);//预请求缓存10分钟
    next();  
});

//https://blog.csdn.net/superdangbo/article/details/82685694
浏览器的同源策略，就是出于安全考虑，浏览器会限制从脚本发起的跨域HTTP请求（比如异步请求GET, POST, PUT, DELETE, OPTIONS等等），所以浏览器会向所请求的服务器发起两次请求，第一次是浏览器使用OPTIONS方法发起一个预检请求，第二次才是真正的异步请求，第一次的预检请求获知服务器是否允许该跨域请求：如果允许，才发起第二次真实的请求；如果不允许，则拦截第二次请求。
Access-Control-Max-Age用来指定本次预检请求的有效期，单位为秒，，在此期间不用发出另一条预检请求。
例如：
resp.addHeader("Access-Control-Max-Age", "0")，表示每次异步请求都发起预检请求，也就是说，发送两次请求。
resp.addHeader("Access-Control-Max-Age", "1800")，表示隔30分钟才发起预检请求。也就是说，发送两次请求
```

```php
//客户端代码
$.get('http://localhost:3000/testcors', {}, function (res) {
	console.log(res) 
})
```

## 6.XMLHttpRequest 2.0

> 暂作了解，无需着重看待
> 更易用，更强大

### 6.1. onload / onprogress

```php
//onload和onprogress 是html5中规定的
//onload        readyState === 4
//onprogress    readyState === 3
var xhr = new XMLHttpRequest()
xhr.open('GET', './time.php')
xhr.onload = function () {
	console.log(this.readyState)
}
xhr.onprogress = function () {
	console.log(this.readyState)
}
xhr.send(null)
```

### 6.2. FormData

	以前 AJAX 只能提交字符串，现在可以提交 二进制 的数据
