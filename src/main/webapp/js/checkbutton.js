/*
	<MVC의 패턴>
	- 프로그래밍 패턴 중의 하나로 Model과 View를 분리하는 Controller로 제어하는 패턴
	- 사용이유 : Model과 View를 분리하고 싶다 => Model의 재사용을 위해서
		ex)하나의 데이터를 PC, Tablet, Mobile에 공통적으로 사용하여 Model은 하나이지만 View는 여러개가 가능)
	- Model의 변경을 Controller가 감지하여 View에 반영
	- View의 변경을 Controller가 감지하여 Model에 반영
*/

/*
	Model : 데이터, 데이터처리를 담당, MVC의 M
*/
// 체크상태, 표시될 레이블을 인자로 하는 모델 생성자
CheckButtonModel = function(checked, label) {
	this.listeners = new Array();
	this.checked = checked;
	this.label = label;
}

CheckButtonModel.prototype = {			//prototype은 상속개념으로 상위클래스에 변수를 선언하여 하위클래스객체에서 언제든지 가져다 쓸 수있음. 하나의 메모리를 선언해서 공유하기 때문에 절약도 가능

	addListener: function(listener) {
		this.listeners[this.listeners.length] = listener;
	},	// addListener

	removeListener: function(listener) {
		if (this.listeners.length == 0) return;

		var newListeners = new Array();
		for (var i = 0; i < this.listeners.length; i++) {
			if (this.listener[i] != listener) {
				newListeners[newListeners.length] = this.listeners[i];
			}
		}
		this.listeners = newListeners;
	},	// removeListener
	
	// 뷰의 변경을 위해서 모델의 변화를 통보
	notify: function() {
		for (var i = 0; i < this.listeners.length; i++) {
			// this는 모델, 리스너들에게 변화를 통보
			this.listenrs[i].changed(this);
		}
	},	// notify
	
	// 체크가 되면 통보한다.
	setChecked: function(checked) {
		this.checked = checked;
		this.notify();
	},	//setChecked
	
	toggle: function() {
		if (this.checked) this.checked = false;
		else this.checked = true;
	},	// toggle

	// 체크되어 있는지를 확인
	isChecked: function() {
		return this.checked;
	},

	// 레이블을 가져옴
	getLabel: function() {
		return this.label;
	}	// getLabel

	//CheckButtonModel.prototype 
}

/*
	Controller : M과 V를 컨트롤하는 MVC의 C
*/

// 컨트롤러 : 모델과 뷰를 인자로 받아서 MVC의 처리를 담당
CheckButton = function(model, ui) {
	this.model = model;
	this.ui = ui;
	this.model.addListener(this);
	this.ui.setCheckButton(this);
	this.ui.render();
}

CheckButton.prototype = {
	// 모델의 체크상태를 설정
	setChecked: function(checked) {this.model.setChecked(checked);},
	// 모델의 토글
	toggle: function() {this.model.toggle();},
	// 모델의 체크상태를 확인
	isChecked: function() {this.model.isChecked();},
	// 모델의 레이블 가져오기
	getLabel: function() {this.model.getLabel();},
	// 뷰 업데이트
	changed: function() {this.ui.update();}
}

/*
	View : Model을 표현하는 역할, MVC의 V
*/

// 컨트롤러 생성자
CheckButtonUI = function(elementId) {
	this.element = document.getElementById(elementId);
	this.checkButton = null;	// 컨트롤러
}

// 뷰 메소드 확장
CheckButtonUI.prototype = {
	
	// 컨트롤러 설정
	setCheckButton: function(checkButton) {
		this.checkButton = checkButton;
	},	// setCheckButton

	// 화면에 렌더링
	render: function() {
		// html 문자열 생성
		var html = "<img src='";
		if (this.checkButton.isChecked()) {
			html += "/WEBTest/images/check_on.gif'>";
		} else {
			html += "/WEBTest/images/check_off.gif'>";
		}
		html += "&nbsp;" + this.checkButton.model.getLabel();
		this.element.style.cursor = 'hand';
		this.element.innerHTML = html;
	
		//이벤트리스너 추가
		ajax.Event.addListener(this.element, "click", ajax.Event.bindAsListener(this.doClick, this));
	}, //render
	
	// 토글행위를 컨트롤러에게 전달
	doClick: function() {
		this.checkButton.toggle();
	}, //	doClick
	
	// 이미지를 변경
	update: function() {
		var img = this.element.getElementsByTagName("img").item(0);
		if (this.checkButton.isChecked()) img.src = "/WEBTest/images/check_on.gif";
		else img.src = "/WEBTest/images/check_off.gif";
	}
}