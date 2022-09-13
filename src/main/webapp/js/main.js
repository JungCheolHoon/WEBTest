//0.페이지로딩함수 적용
//1.xml을 로딩
$(function(){
	$.get("/WEBTest/xml/books.xml",null,function(data, textStatus, xhr){
		//ddocument.write(testStauts);
		alert("");
	});
});


/*window.onload = function() {
	alert("페이지가 열렸습니다!");
}*/

/*$document.ready(function() {		//jQuery 형식
	alert("페이지가 열렸습니다.");	
});*/

$(function(){
//	alert("페이지가 열렸습니다");
});