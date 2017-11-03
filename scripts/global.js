// 文档加载完后执行某个函数需要用到addLoadEvent()
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
// insertAfter函数
function insertAfter(newEle, targetEle) {
	var parent = targetEle.parentNode;
	if(parent.lastChild == targetEle) {
		parent.appendChild(newEle);
	}
	else {
		parent.insertBefore(newEle, targetEle.nextSibling);
	}
}
//addClass函数
function addClass(ele, val) {
	if(!ele.className) {
		ele.className = val;
	}
	else {
		newClassName = ele.className;
		newClassName += " ";
		newClassName += val;
		ele.className = newClassName;
	}
}
// 突出显示当前导航链接,为其添加here类
function highlightPage() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementByID) return false;
	var headers = document.getElementsByTagName('header');
	if(headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if(navs.length == 0) return false;
	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	var currenturl = window.location.href;
	for (var i=0; i<links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if(currenturl.indexOf(linkurl) != -1){
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();//根据不同页面给body设置不同的id
			document.body.setAttribute("id", linktext);
		}
	}
}

//moveElement()函数，移动元素到某个位置
function moveElement (elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil((final_x - xpos) / 10);
		xpos = xpos + dist;
	}
	if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x) / 10);
		xpos = xpos-dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil((final_y - ypos) / 10);
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y) / 10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"', "+final_x+","+final_y+", "+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
// 准备index页幻灯片
function prepareSlideshow () {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	//动画，根据鼠标所在链接来移动preview元素即sildeshow图片
    var links = document.getElementsByTagName("a");
    var destination;
    for(var i = 0; i < links.length; i++){
    	links[i].onmouseover = function() {
    		destination = this.getAttribute("href");
    		if(destination.indexOf("index.html") != -1) {
    			moveElement("preview",0,0,5);
    		}
    		if(destination.indexOf("about.html") != -1) {
    			moveElement("preview",-150,0,5);
    		}
    		if(destination.indexOf("photos.html") != -1) {
    			moveElement("preview",-300,0,5);
    		}
    		if(destination.indexOf("live.html") != -1) {
    			moveElement("preview",-450,0,5);
    		}
    		if(destination.indexOf("contact.html") != -1) {
    			moveElement("preview",-600,0,5);
    		}
    	}
    }
}
//showSection()根据指定id显示相应的section,定位到同一页面的不同板块
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i ++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} 
		else {
			sections[i].style.display = "block";
		}
	}
}
//prepareInternalnav()，当nav中的链接被点击时调用showSection()显示相应部分
function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;//自定义属性destination，目的是将局部变量sectionId的值保存
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		};
	}
}
//showPic()将图片显示在placeholder处，简介显示在description处
function showPic(whichpic) {
	if (!document.getElementById) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if (!document.getElementById("description")) return false;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	}
	else {
		var text="";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}
// 创建#description和#placeholder元素
function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    description.style.color = "#eb6";
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
//点击缩略图显示相应的原图和description
function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}
//将表格按奇偶行分别显示不同颜色
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			if(odd == true) {
				addClass(rows[j], "odd");
				odd = false;
			}
			else {
				odd = true;
			}
		}
	}
}
//当鼠标滑过当前行时，当前行高亮
function highlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}
//显示当前缩略词的全写
function displayAbbreviations() {
	if (!document.getElementsByTagName) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	var abbrevistions = document.getElementsByTagName("abbr");
	if (abbrevistions.length < 1) return false;
	var defs = new Array();
	for (var i = 0; i < abbrevistions.length; i++) {
		var current_abbr = abbrevistions[i];
		if (current_abbr.childNodes.length < 1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for (key in defs) {	
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
//确保点击label标签时，鼠标自动聚焦到相关联的表单字段
function focusLabels() {
	if (!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if (!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if (!getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
//当浏览器不支持placeholder的时候，通过resetFields()函数实现placeHolder的功能
function resetFields(whichform) {
	if (Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit") continue;
		var check = element.placeholder || this.getAttibute("placeholder");
		if (!check) continue;
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute("placeholder");
			if (this.value == text) {
				this.ClassName="";
				this.value="";
			}
		}
		element.onblur = function() {
			if (this.value == "") {
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}

// 验证必填字段是不是为空
function isFilled(field) {
	if (field.value.replace(' ', '').length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}
// 验证填写信息是不是邮件
function isEmail(field) {
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
// 验证填写字段的合法性
function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.required == "required") {
			if (!isFilled(element)) {
				alert("Please fill in the " + element.name + "field.");
				return false;
			}
		}
		if (element.type == "email") {
			if (!isEmail(element)) {
				alert("The " + element.name + "field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}
function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function() {
			try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}
			return false;
		}
		return new XMLHttpRequest();
}
//加载loading图片
function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading......");
	element.appendChild(content);
}
// 异步提交表单并处理请求
function submitFormWithAjax(whichform,thetarget) {
	var request = getHTTPObject();
	if (!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts=[];
	var element;
	for (var i = 0; i < whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}	
	var data = dataParts.join("&");
	request.open("POST", whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}
				else {
					thetarget.innerHTML = "<p>Oops,there was an error.Sorry.</p>";
				}
			}
			else {
				thetarget.innerHTML = "<p>"+request.statusText+"</p>";
			}
		}
	}
	request.send();
	return true;
}
// 循环遍历文档中的form对象，将相应form分别传给resetFields()看是否支持placeholder，validateForm()看必填字段和邮件的合法性,表单数据提交处理
function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			// return validateForm(this);
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if (submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);