var app_cfg = {
	"delta_px":44, 		//delta di px entro cui � da visualizzare toolbar
	"elements":null 	//principali elementi della pagina
}

$(document).ready(function(){
	init();
});

function init() {
	app_cfg["elements"]={
		"header":	new app_obj(app_getObjID(".header")),
		"container":	new app_obj(app_getObjID(".container-fluid"))
	}
	$(window).on("scroll.app",function(e){ 
		app_toggleScroll(); 
	});
}

function app_toggleScroll() {
	var docTop=Math.round($(document).scrollTop());
	$(app_cfg["elements"]["container"].id).toggleClass("appScrAtTop",(docTop<=app_cfg["delta_px"])).toggleClass("appScrNoTop",(docTop>app_cfg["delta_px"]));
}

function app_getObjID(objClass) {
	if (!objClass)	return "";
	var i="";
	try { i=$(objClass).attr("id"); } catch(e) { i=""; }
	return i;
}

function app_obj(objId) {
	this.id="#"+objId;
	this.hidden=function()		{ return !$(this.id).is(":visible"); }
	this.show=function()		{ $(this.id).show(this.toshow); }
	this.hide=function()		{ $(this.id).hide(this.tohide); }	
}