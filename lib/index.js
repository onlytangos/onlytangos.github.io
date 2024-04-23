var tipos=['milonga','class','show','practice','livemusic','outdoors'];
var diaSem=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
var meses=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

function inicia(){
	var ele=document.createElement('div');
	ele.id='contenido';
	document.body.appendChild(ele);		
	var ele1=document.createElement('div');
	ele1.id='myModal';
	document.body.appendChild(ele1);
	var ele2=document.createElement('div');
	ele2.id='modal-content';
	ele1.appendChild(ele2);
	var ele3=document.createElement('span');
	ele3.id='modalClose';
	ele3.innerHTML='&times;';
	ele2.appendChild(ele3);
	var ele4=document.createElement('img');
	ele4.id='modalImg';
	ele2.appendChild(ele4);	
}
function europe(){
	inicia();
	var ambito='EUROPE';	
	printEurope(ambito+' TANGO EVENTS ');
	initModal();
}
function spain(){
	inicia();
	var ambito='SPAIN';
	printEurope(ambito+' TANGO EVENTS ','Spain');
	initModal();
}
function madrid(){
	inicia();
	let ambito=' MADRID';	
	printNext7d('MILONGAS'+ambito);
	initModal();
}
function initModal(){

  // Get the modal
  let modal = document.getElementById("myModal");
  // Get the button that opens the modal
  let span = document.getElementById("modalClose");

  let eles=document.querySelectorAll('td');
  //console.log('initModal0',eles,eles.length);
  // When the user clicks the button, open the modal 
  for (let ele of eles){
   //console.log('initModal click',ele.attributes.link);
    if (ele.attributes.link!=undefined){
      ele.onmouseover=function (){
        //this.style.backgroundColor='grey';
      }
      ele.onclick = function() {
      modal.style.display = "block";
      let mi=document.getElementById('modalImg');
      mi.src='img/'+this.attributes.link.nodeValue;
      // almacenar la src en tr.href
      // sino hay href no hacer nadas
      // poner src de la img
      // aparce el modal que estaba oculto
    }     
    }
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function pie(){
	let txt='';
	let lib='../lib/img/';
	txt+='<div class="tabpie">';
	txt+='<div>onlytangos@proton.me</div>';		
	txt+='<div><a target="_blank" href="https://www.facebook.com/profile.php?id=61557910653670"><img class="iconoPie" src="'+lib+'fb2.png"></a></div>';
	txt+='<div><a target="_blank" href="https://www.youtube.com/@onlytangos/featured"><img class="iconoPie" src="'+lib+'yt2.png"></a></div>';
	txt+='<div><a target="_blank" href="https://www.instagram.com/onlytangos/"><img class="iconoPie" src="'+lib+'in2.png"></a></div>';

	txt+='</div>';
	return txt;
}

function now(data,dias){
	let res=[];
	let r1=new Date(); 
	// hoy a las 0:0
	r1.setHours(0);
	r1.setMinutes(0);
	let r2=clonaDate(r1);
	sumaDias(r2,dias);
	// adhoc campos
	let t1=3; // fecha inicio
	let h1=4; // hora inicio
	let t2=5; // fecha fin 
	let h2=6; // hora fin
	let rp=7; // repeticiones
	for (let j=0;j<data.length;j++){
		let lin=data[j];
		let cmp=lin.split(';');
		let f1=new Date(cmp[t1]+' '+cmp[h1]);
		let f2=new Date(cmp[t2]+' '+cmp[h2]);
		let nr=Number(cmp[rp]);		
		//console.log('now 2:',lin, r1,r2,f1,nr);
		if (f1>=r1&&f1<=r2){ // evento en rango
			res.push(lin);
		}else{ // si rango verificar repeticion
			if (nr==0||nr==undefined){continue}// sin repeticion next
			// repeticion esta en dias
			// f1 inicio, r1-r2 rango, rp repeticion dias
			let ra=clonaDate(r1);
			resetHMS(ra); // reset por referencia
			let rb=clonaDate(r2);
			sumaDias(rb,1); // +1 dia
			resetHMS(rb); // hasta 0h del dia siguiente
			// recorre fechas desde fecha inicio hasta fin del rango
			for (	let ff=clonaDate(f1);
						ff<=rb;
						sumaDias(ff,nr))
			{
				resetHMS(ff); // reset h:m:s:ms por referencia
				if (ff>=ra){ // fecha dentro del rango
					// cambia al presente
					lin=reemplaza(lin,3,toISO(ff)); // escribe valor en el campo3
					res.push(lin);
					break;
				}
			}	
		}
	}
	//console.log('now:',res);	
	return res
}
function toISO(f){
	return f.getFullYear()+'-'+(f.getMonth()+1)+'-'+f.getDate();
}
function reemplaza(linea,campo,valor){
// reemplaza en campo de linea por valor
	let campos=linea.split(';');
	campos[campo]=valor;
	return campos.join(';');
}
function clonaDate(f){
	let res=new Date(f.getTime());
	return res
}
function sumaDias(fecha,dias){
// suma dias
	fecha.setDate(fecha.getDate()+dias);
}
function resetHMS(f){
	f.setHours(0);
	f.setMilliseconds(0);
	f.setMinutes(0);
	f.setSeconds(0);
}
function get(tabla){
	let res=[];
	for (let j=0;j<data.length;j++){
		let lin=data[j].split(';');
		if (lin[0]==tabla){
			res.push(data[j]);
		}
	}
	//console.log(res);
	//console.log('get:',res);	
	return res
}
function unir(t1,c1,t2,c2){
/*
reemplaza en el t1c1 el encontrado en t2c2
sino existe c1 no hacer nada
sino encuentra c1 en t2 no hacer nada
*/
	let tmp=[];
	for (let j=0;j<t2.length;j++){
		let lin=t2[j].split(';');	
		tmp[lin[1]]=lin[c2];
	}
	let res=[];
	for (let j=0;j<t1.length;j++){
		let rel=t1[j];		
		let lin=rel.split(';');
		let campo=lin[c1];	
		if (campo[0]=='#'&&campo!=''&&campo!=undefined){
			res.push(rel.replace(campo,tmp[campo]));
		}else{
			res.push(rel);
		}
	}
	//console.log('unir:',tmp,res);
	return res;
}
function extract(tabla,campos){
	let res=[];
	for (let j=0;j<tabla.length;j++){
		let lin=tabla[j].split(';');
		let linea='';
		for(let k=0;k<lin.length;k++){
			if (campos.indexOf(k)!=-1){
				linea+=lin[k]+';';
			}
		}
		linea=linea.slice(0,linea.length-1);
		//console.log('x:',linea,linea.length);
		res.push(linea);
	}
	//console.log('extract:',res);
	return res
}
/*
function sort3(data,campo){
// crear un mapa
// ordenarlo
	let res=[];
	let tmp=[];
	for (let j=0;j<data.length;j++){
		let lin=data[j].split(';');
		let key=new Date(lin[campo]+' '+lin[campo+1]);
		let obj={i:(j+key.getTime()),l:data[j]};
		tmp.push(obj);
	}	
	tmp.sort(function(a,b){return a.i>b.i});
	for (const x of tmp){
		res.push(x.l);
	}
	//console.log('sort3:',res);
	return res;
}
*/
function sort2(data,campo){
// ordena por fecha y hora - campo y campo+1
	let map=new Map();
	let res=[];
	for (let j=0;j<data.length;j++){
		let lin=data[j].split(';');
		let key=new Date(lin[campo]+' '+lin[campo+1]);
		map.set(j+key.getTime(),lin);  // salvar lineas mismo tiempo +j
		//console.log('sort2-1',j,map.get(j+key.getTime()));
	}	
	let maps=new Map([...map].sort());
	for (const x of maps.entries()){
		let v=x[1].join(';');
		res.push(v);
	}
	//console.log('sort2:',data,map,maps,res);
	return res;
}
function sort21(data,campo){
// ordena por fecha - campo
// crear un mapa para ordenar data por campo
	let map=new Map();
	let res=[];
	for (let j=0;j<data.length;j++){
		let lin=data[j].split(';');
		let key=new Date(lin[campo]);
		map.set(j+key.getTime(),lin);  // salvar lineas mismo tiempo +j
		//console.log('sort2-1',j,map.get(j+key.getTime()));
	}	
	let maps=new Map([...map].sort());
	for (const x of maps.entries()){
		let v=x[1].join(';');
		res.push(v);
	}
	//console.log('sort21:',data,map,maps,res);
	return res;
}
function toShort(fecha){
	return (fecha.getDate()+' '+meses[fecha.getMonth()])
}
function printNext7d(titulo){
	let ele=document.getElementById('contenido');
	let data; // voy arrastrando y modificando
	let cdias=7; // rango de dias
	// tablas
	let dat1=get('act'); 
	console.log('printNext7d2:',dat1);	
	let dat2=get('loc');
	let dat3=get('href');
	// join con tablas terminales
	data=unir(dat1,3,dat2,2);

	data=unir(data,10,dat3,2);
	console.log('printNext7d1:',data);
	// campos para usar
	data=extract(data,[1,2,3,4,5,6,7,8,9,10,11]); // select campos
	//  expande eventos periodicos desde hoy
	data=sort2(data,3);
	data=now(data,cdias); 
	data=sort2(data,3);	
	//let ele=document.createElement('div');
	//ele.id='contenido';
	let d1=new Date();
	let d2=clonaDate(d1);
	sumaDias(d2,cdias-1);
	let b='&nbsp;';
	let txt=titulo+' - '+toShort(d1)+' to '+toShort(d2);
	let res='<br><div class="h1 titulo1">'+txt+'</div><br><br>';
	res+='<table class="tabla">';	
	let dia=1;
	let sdia=-1;
	console.log('printNext7d3:',data);
	for (let j=0;j<data.length;j++){
		let linea='';
		let [tipo,nombre,rol,fecha,ini,,fin,,,href,cont]=data[j].split(';');
		console.log('printNext7d:',href,cont);
		//res+='<tr href="'+campos[9]+'">';	
		//console.log('printNext7d:',campos);
		let f=new Date(fecha);//3
		let dia=f.getDay();
		if (dia!=sdia){
			sdia=dia;
			let txt=diaSem[dia]+' '+f.getDate();
			res+='<tr><td><div class="h3 titulo2">'+txt+'</div></td></tr>';
		}
		linea+='<td link="'+href+'">'+nombre+'</td>';//1
		linea+='<td>'+ini+' - '+fin+'</td>';//4 6
		let k='et'+tipos.indexOf(tipo);//0
		linea+='<td><div class="'+k+'">'+tipo+'</div></td>';//0
		linea+='<td>'+rol+'</td>';//
		
		if (cont!=''&&cont!=undefined){		
			let img='<a target="_blank" href="'+cont+'"><img id="ws" src="../lib/img/i2.png"></a>';
			linea+='<td>'+img+'</td>';	
		}
		res+='<tr>'+linea+'</tr>';
	}
	res+='</table>';
	ele.innerHTML=res+'<br/>'+pie();
	//con.appendChild(ele);
}
function printEurope(ftitulo,fpais){
	let ele=document.getElementById('contenido');
	let data; // voy arrastrando y modificando
	// tablas
	data=get('act');
	// crear datos standar y ordenar por fecha
	let dat1=[];
	let linea='';
	for (let j=0;j<data.length;j++){	
		//let cp=data[j].split(';');
		let [tabla,tipo,fuente,nombre,ciudad,pais,fini,ffin,img,href]=data[j].split(';');
		let ini=new Date(fini);
		let fin=new Date(ffin);
		let pini='';
		if (!isNaN(ini)){
			pini=printDate(ini);
		}
		let pfin='';
		if (!isNaN(fin)){
			pfin=printDate(fin);
		}
		linea=tabla+';'+tipo+';'+fuente+';'+nombre+';'+ciudad+';'+pais+';'+pini+';'+pfin+';'+img;
		if (ini!=''&&fin!=''){dat1.push(linea)}
	}
	dat1=sort21(dat1,6);
	console.log(dat1);

	// formar impresion de datos
	tabla='<table class="tabla condensed">';	
	let mes=0;
	let primero=-1;
	let year;
	for (let j=0;j<dat1.length;j++){
		linea='';
		let campos=dat1[j].split(';');	
		let [tipo1,tipo2,fuente,nombre,ciudad,pais,fini,ffin,src,href]=data[j].split(';');			
		//let pais=campos[5];
		if (fpais!=undefined&&pais!=fpais){continue}
		//let nombre=campos[3];
		//let ciudad=campos[4];			
		let ini=new Date(fini);
		let fin=new Date(ffin);
		//let src=campos[8];
		year=ini.getFullYear();
		//console.log('printEurope:',mes,ini.getMonth());
		if(mes!=ini.getMonth()){
			mes=ini.getMonth();
			if (primero==-1){primero=mes}
			linea+='<tr><td><div class="h3 titulo2">'+meses[mes]+' '+year+'</div></td></tr>';
		}
		linea+='<tr>';		
		linea+='<td>'+nombre+'</td>';
		linea+='<td>'+pais+' - '+ciudad+'</td>';
		let dias=(fin-ini)/(1000*60*60*24);		
		let pini='';
		if (!isNaN(ini)){
			pini=printDate(ini);
		}
		let pfin='';
		if (!isNaN(fin)){
			pfin=printDate(fin);
		}
		linea+='<td>'+pini+' '+dias+'d</td>';
		if (src!=''&&src!=undefined){
			let txt='img/'+src;			
			let img='<a target="_blank" href="'+txt+'"><img id="ws" src="../lib/img/i2.png"></a>';
			linea+='<td>'+img+'</td>';	
		}
		linea+='</tr>';
		let hoy=new Date();		
		if (ini<hoy||ini==''||fin==''){linea=''}
		tabla+=linea;
	}
	tabla+='</table><br/>';
	//console.log(tabla);
	let b='&nbsp;';
	let txt=b+b+ftitulo+b+year+'-'+meses[primero]+'-'+meses[mes];
	let titulo='<br><div class="h1 titulo1">'+txt+'</div><br><br>';
	ele.innerHTML=titulo+tabla+pie();
}
function printDate(d){
	let a=d.getFullYear().toString();
	let b=(d.getMonth()+1).toString();
	let c=d.getDate().toString();
	if (b.length==1){b='0'+b}
	if (c.length==1){c='0'+c}
	return a+'-'+b+'-'+c
}