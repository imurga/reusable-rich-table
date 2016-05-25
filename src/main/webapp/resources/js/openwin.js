
$(document).ready(function() {
    document.getElementById('myButtonId').click();
});

window.onunload = function () {
	//closeWindowLoginServlet();
};


function closeWindowLoginServlet(){
   window.location.href='ApplicationLogOutServlet?closeWindow=0';
}

function openFullscreen(url, fococlose){
	 
	 var height = screen.availHeight - 43;
	 var width = screen.availWidth - 20;

	 var left = 0;
	 var top = 0;

	 //set window properties
	 props = "toolbar=no" +
	 ",status=no" +
	 ",resizable=yes" +
	 ",scrollbars=yes" +
	 ",menubar=no" +
	 ",location=no" + ",";

	 dims = "width="+ width +
	 ",height="+ height +
	 ",left="+ left +
	 ",top=" + top;

	 window.open(url, "TestPrueba", props + dims);
	 //window.resizeTo(width, height);
	 //window.location.href = url;
	 window.focus();
	 if(fococlose==1){
		 window.open('', '_parent', '').close();
	 }
	 
}