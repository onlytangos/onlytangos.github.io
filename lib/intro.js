function inicio(){

	const myTimeout = setTimeout(inicio2,4000);
}
function inicio2(){
	window.location.href = "http://onlytangos.github.io/madrid";
}
window.onload=inicio;