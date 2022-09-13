var xhr;
var xhr1;

window.onload = function() {
	xhr = new XMLHttpRequest;
	xhr1 = new XMLHttpRequest;
}

function processJSCSV() {
	if (xhr != null) {
		xhr.open("GET", "/WEBTest/csv/scoreData.csv", true);
		// 1. 이벤트명 : readystatechange
		// 2. 이벤트핸들러 프라퍼팀ㅇ : onreadystatechange
		// 3. 이벤트 콜백함수 : function() {...}
		xhr.onreadystatechange = function() {			//xhr객체의 상태변화가 있으면 자동적으로 콜백함수를 실행하는 이벤트가 onreadystatechange
			if (xhr.readyState == 4 && xhr.status == 200) {

				for (var i = 0; i < 9; i++) {
					if (i % 3 == 0) {
						document.getElementById("hak" + (i / 3)).innerHTML = xhr.responseText.split(',')[i];
						document.getElementById("eng" + (i / 3)).innerHTML = xhr.responseText.split(',')[i + 1];
						document.getElementById("math" + (i / 3)).innerHTML = xhr.responseText.split(',')[i + 2];
					}
				}
				getCalcJSCSV(xhr.responseText);
			}
		}
		xhr.send();
	}
}

function getCalcJSCSV(responseText) {
	if (xhr1 != null) {
		xhr1.open("GET", "/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText, true);

		xhr1.onreadystatechange = function() {
			if (xhr1.readyState == 4 && xhr1.status == 200) {
				for (var i = 0; i < 3; i++) {
					if (i < 2) { document.getElementById("total" + i).innerHTML = xhr1.responseText.split(',')[i]; }
					document.getElementById("tal" + i).innerHTML = xhr1.responseText.split(',')[i + 2];
					document.getElementById("avg" + i).innerHTML = xhr1.responseText.split(',')[i + 5];
					document.getElementById("grade" + i).innerHTML = xhr1.responseText.split(',')[i + 8];
				}
			}
		}
		xhr1.send();
	}
}

function processJQueryCSV() {
	$.get("/WEBTest/csv/scoreData.csv",	//Post는 데이터를 나눠서 받음
		function(data) {
			for (var i = 0; i < 9; i++) {
				if (i % 3 == 0) {
					$("#hak" + (i / 3)).text(data.split(',')[i]);
					$("#eng" + (i / 3)).text(data.split(',')[i + 1]);
					$("#math" + (i / 3)).text(data.split(',')[i + 2]);
				}
			}
			getCalcJQueryCSV(data);
		});
}

function getCalcJQueryCSV(responseText) {
	$.get("/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText,
		function(data) {
			for (var i = 0; i < 3; i++) {
				if (i < 2) { $("#total" + i).text(data.split(',')[i]); }
				$("#tal" + i).text(data.split(',')[i + 2]);
				$("#avg" + i).text(data.split(',')[i + 5]);
				$("#grade" + i).text(data.split(',')[i + 8]);
			}
		})
}

function processJSJSON() {
	if (xhr != null) {
		xhr.open("GET", "/WEBTest/json/scoreData.json", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				let json = JSON.parse(xhr.responseText);
				var str = "";

				for (i = 0; i < json.length; i++) {
					for (key in json[i]) {
						document.getElementById("hak" + i).innerHTML = key
						document.getElementById("eng" + i).innerHTML = json[i][key][0];
						document.getElementById("math" + i).innerHTML = json[i][key][1];
						str += (key + "," + json[i][key][0] + "," + json[i][key][1] + ",")
					}
				}
				str.slice(0, -1);
				getCalcJSJSON(str);
			}
		}
		xhr.send();
	}
}

function getCalcJSJSON(responseText) {
	if (xhr1 != null) {
		xhr1.open("GET", "/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText, true);

		xhr1.onreadystatechange = function() {
			if (xhr1.readyState == 4 && xhr1.status == 200) {
				for (var i = 0; i < 3; i++) {
					if (i < 2) { document.getElementById("total" + i).innerHTML = xhr1.responseText.split(',')[i]; }
					document.getElementById("tal" + i).innerHTML = xhr1.responseText.split(',')[i + 2];
					document.getElementById("avg" + i).innerHTML = xhr1.responseText.split(',')[i + 5];
					document.getElementById("grade" + i).innerHTML = xhr1.responseText.split(',')[i + 8];
				}
			}
		}
		xhr1.send();
	}

}

function processJQueryJSON() {
	$.get("/WEBTest/json/scoreData.json",
		function(data) {
			var str = "";
			for (i = 0; i < data.length; i++) {
				for (key in data[i]) {
					$("#hak" + i).text(key);
					$("#eng" + i).text(data[i][key][0]);
					$("#math" + i).text(data[i][key][1]);
					str += (key + "," + data[i][key][0] + "," + data[i][key][1] + ",")
				}
			}
			str = str.slice(0, -1);
			getCalcJQueryJSON(str);
		})
}


function getCalcJQueryJSON(responseText) {
	$.get("/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText,
		function(data) {
			for (var i = 0; i < 3; i++) {
				if (i < 2) { $("#total" + i).text(data.split(',')[i]); }
				$("#tal" + i).text(data.split(',')[i + 2]);
				$("#avg" + i).text(data.split(',')[i + 5]);
				$("#grade" + i).text(data.split(',')[i + 8]);
			}
		})
}

function processJSXML() {
	if (xhr != null) {
		xhr.open("GET", "/WEBTest/xml/scoreData.xml", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var xml = xhr.responseXML;
				var nos = xml.getElementsByTagName("no");
				var engs = xml.getElementsByTagName("eng");
				var maths = xml.getElementsByTagName("math");
				var str = "";

				for (var i = 0; i < 3; i++) {
					document.getElementById("hak" + i).innerHTML = nos[i].childNodes[0].nodeValue;
					document.getElementById("eng" + i).innerHTML = engs[i].childNodes[0].nodeValue;
					document.getElementById("math" + i).innerHTML = maths[i].childNodes[0].nodeValue;
					str += (nos[i].childNodes[0].nodeValue + "," + engs[i].childNodes[0].nodeValue + "," + maths[i].childNodes[0].nodeValue + ",");
				}
				str = str.slice(0, -1);
				getCalcJSXML(str);
			}
		}
		xhr.send();
	}
}

function getCalcJSXML(responseText) {
	if (xhr1 != null) {
		xhr1.open("GET", "/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText, true);

		xhr1.onreadystatechange = function() {
			if (xhr1.readyState == 4 && xhr1.status == 200) {
				for (var i = 0; i < 3; i++) {
					if (i < 2) { document.getElementById("total" + i).innerHTML = xhr1.responseText.split(',')[i]; }
					document.getElementById("tal" + i).innerHTML = xhr1.responseText.split(',')[i + 2];
					document.getElementById("avg" + i).innerHTML = xhr1.responseText.split(',')[i + 5];
					document.getElementById("grade" + i).innerHTML = xhr1.responseText.split(',')[i + 8];
				}
			}
		}
		xhr1.send();
	}
}

function processJQueryXML() {
	$.get("/WEBTest/xml/scoreData.xml",
		function(data) {

			var nos = data.getElementsByTagName("no");
			var engs = data.getElementsByTagName("eng");
			var maths = data.getElementsByTagName("math");
			var str = "";

			for (var i = 0; i < 3; i++) {
				$("#hak" + i).text(nos[i].childNodes[0].nodeValue);
				$("#eng" + i).text(engs[i].childNodes[0].nodeValue);
				$("#math" + i).text(maths[i].childNodes[0].nodeValue);
				str += (nos[i].childNodes[0].nodeValue + "," + engs[i].childNodes[0].nodeValue + "," + maths[i].childNodes[0].nodeValue + ",");
			}
			str = str.slice(0, -1);
			getCalcJQueryXML(str);
		})
}

function getCalcJQueryXML(responseText) {
	$.get("/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText,
		function(data) {
			for (var i = 0; i < 3; i++) {
				if (i < 2) { $("#total" + i).text(data.split(',')[i]); }
				$("#tal" + i).text(data.split(',')[i + 2]);
				$("#avg" + i).text(data.split(',')[i + 5]);
				$("#grade" + i).text(data.split(',')[i + 8]);
			}
		}
	)
}

function processINIT() {
	for (var i = 0; i < 3; i++) {
		if (i < 2) { $("#total" + i).text(""); }
		$("#tal" + i).text("");
		$("#avg" + i).text("");
		$("#grade" + i).text("");
		$("#hak" + i).text("");
		$("#eng" + i).text("");
		$("#math" + i).text("");
	}
}