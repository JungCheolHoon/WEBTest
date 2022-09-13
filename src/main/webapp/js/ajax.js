var ajax = {};
ajax.xhr = {};

ajax.xhr.Request = function(url, params, callback, method) {
	this.url = url;
	this.params = params;
	this.callback = callback;
	this.method = method;
	this.send();
}

ajax.xhr.Request.prototype = {
	getXMLHttpRequest: function() {
		return new XMLHttpRequest();
	},	//getXMLHttpRequest

	send: function() {
		// 개별로 사용할 XHR 객체를 획득
		this.req = this.getXMLHttpRequest();
		// HTTP메소드가 있으면 사용하고 없으면 GET
		var httpMethod = this.method ? this.method : "GET";
		if (httpMethod != "GET" && httpMethod != "POST") httpMethod = "GET";
		
		// 요청데이터 설정
		var httpParams = (this.params == null || this.params == '') ? null : this.params;
		
		// URL 설정
		var httpUrl = this.url;
		if (httpMethod == "GET" && httpParams != null) httpUrl = httpUrl + "?" + httpParams;
		
		// open 수행
		this.req.open(httpMethod, httpUrl, true);
		
		// 클라이언트가 보내는 데이터가 인코딩된 폼데이터라고 서버에 알려주는 역할
		this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		// 요청객체가 공유되지 못하도록 지역변수에 저장 , send함수의 지역변수
		var request = this;
		
		// 콜백함수 정의
		this.req.onreadystatechange = function() {
			// send함수의 지역변수인 request를 onStateChange내에서 this로 쓰기위해 call 함수 사용
			// call함수 형식 : 함수명.call(함수내에서 this가 되어야 하는 객체)
			request.onStateChange.call(request);
		}
		this.req.send(httpMethod == "POST" ? httpParams : null);
	},	// send

	onStateChange: function() {
		this.callback(this.req);
	}

}	// ajax.xhr.Request.prototype

// ajax 패키지 내에 이벤트 객체
ajax.Event = {};

// 이벤트 리스너 추가 (이벤트 타겟 객체, 이벤트명, 리스너, useCapture여부)
ajax.Event.addListener = function(element, name, observer, useCapture) {
	useCapture = useCapture || false;
	if (element.addEventListener) {
		element.addEventListener(name, observer, useCapture);
	} else if (element.attachEvent) {
		element.attachEvent('on' + name, observer);
	}
}

ajax.Event.removeListener = function(element, name, observer, useCapture) {
	useCapture = useCapture || false;
	if (element.removeEventListener) {
		element.removeEventListener(name, observer, useCapture);
	} else if (element.detachEvent) {
		element.detachEvent('on' + name, observer);
	}
}

// 이벤트 타겟 획득
ajax.Event.getTarger = function(event) {
	if (event == null) return null;
	if (event.target) return event.target;	// 웹표준 브라우저
	else if (event.srcElement) return event.srcElement;		// IE 5,6 브라우저
	return null;
}


ajax.Event.getMouseXY = function(event) {
	var mouseX = event.clientX;
	var mouseY = event.clientY;

	var dd = document.documentElement;
	var db = document.body;
	if (dd) {
		mouseX += dd.scrollLeft;
		mouseY += dd.scrollTop;
	} else if (db) {
		mouseX += db.scrollLeft;
		mouseY += db.scrollTop;
	}
	return { x: mouseX, y: mouseY };
}
ajax.Event.isLeftButton = function(event) {
	return (event.which) ?
		event.which == 1 && event.button == 0 :
		(event.type == 'click') ? event.button == 0 : event.button == 1;
}

// 오른쪽 마우스가 눌렀는지
ajax.Event.isRightButton = function(event) {
	return event.button == 2;
}

// 이벤트 전달을 중지
ajax.Event.stopPropagation = function(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;		// IE 5,6
	}
}

// 디폴트 이벤트 : 웹브라우저가 기본적으로 가지고 있으면서 발생시키는 이벤트, 사용자정의 이벤트와 구분됌
// 디폴트 이벤트 방지 (예를 들어 a링크 눌러도 이동 안되도록.)
ajax.Event.preventDefault = function(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

// 편의상 이벤트 전달방지와 디폴트 이벤트 방지를 동시에 하기 위한 메소드
ajax.Event.stopEvent = function(event) {
	ajax.Event.stopPropagation(event);
	ajax.Event.preventDefault(event);
}

// 객체에 리스너들을 바인딩(묶음)
// apply 메소드를 사용하여 앞에 있는 func 내에서 this를 정의함
ajax.Event.bindAsListener = function(func, obj) {
	return function() {
		return func.apply(obj, arguments);
	}
}