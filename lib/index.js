var tipos=['milonga','class','show','practice','musicLive','outdoors'];
var diaSem=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
var meses=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
var ambito='MADRID';
window.onload=app;
function app(){
	var ele=document.createElement('div');
	ele.id='contenido';
	document.body.appendChild(ele);
	let b='&nbsp;';
	printNext7d(b+b+'MILONGAS'+b+ambito);
}
function pie(){
	let txt='';
	let lib='../lib/img/';
	txt+='<div class="tabpie">';
	txt+='<div><a target="_blank" href="https://www.facebook.com/profile.php?id=61557910653670"><img class="iconoPie" src="'+lib+'fb.png"></a></div>';
	txt+='<div><a target="_blank" href="https://www.youtube.com/@onlytangos/featured"><img class="iconoPie" src="'+lib+'yt.png"></a></div>';
	txt+='<div>onlytangos@proton.me</div>';	
	txt+='</div>';
	return txt;
}
function now(data,dias){
	let res=[];
	let r1=new Date();
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
		//console.log('now2:',r1,f1,r2,nr);
		if (f1>r1&&f1<r2){ // evento en rango
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
		//console.log('sort2-1',j,map.get(j+key.getTime()));
	}	
	tmp.sort(function(a,b){return a.i>b.i});
	for (const x of tmp){
		res.push(x.l);
	}
	console.log('sort3:',res);
	return res;
}
function sort2(data,campo){
// crear un mapa
// ordenarlo
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
function toShort(fecha){
	return (fecha.getDate()+' '+meses[fecha.getMonth()])
}
function printNext7d(titulo){
	let ele=document.getElementById('contenido');
	let data; // voy arrastrando y modificando
	let cdias=6; // rango de dias
	data=get('act'); // tabla
	data=extract(data,[1,2,3,4,5,6,7,8,9,10]); // select campos
	data=sort2(data,3);
	data=now(data,cdias); // expande eventos periodicos desde hoy
	data=sort2(data,3);	
	//let ele=document.createElement('div');
	//ele.id='contenido';
	let d1=new Date();
	let d2=clonaDate(d1);
	sumaDias(d2,cdias);
	let txt=titulo+' - '+toShort(d1)+' to '+toShort(d2);
	let res='<br><div class="h1 titulo1">'+txt+'</div><br><br>';
	res+='<table class="tabla">';	
	res+='<tr>';
	let dia=1;
	let sdia=-1;
	for (let j=0;j<data.length;j++){
		let campos=data[j].split(';');
		//console.log('printNext7d:',campos);
		let f=new Date(campos[3]);
		let dia=f.getDay();
		if (dia!=sdia){
			sdia=dia;
			let txt=diaSem[dia]+' '+f.getDate();
			res+='<td><div class="h3 titulo2">'+txt+'</div></td></tr><tr>';
		}
		res+='<td>'+campos[1]+'</td>';
		res+='<td>'+campos[4]+' - '+campos[6]+'</td>';
		let k='et'+tipos.indexOf(campos[0]);
		res+='<td><div class='+k+'>'+campos[0]+'</div></td>';
		res+='<td>'+campos[2]+'</td>';
		let href=campos[9];
		if (href!=undefined){
			let img='<a target="_blank" href="'+href+'"><img id="ws" src="../lib/img/i2.png"></a>';
			res+='<td>'+img+'</td>';		
		}	
		ele.innerHTML=res;
		res+='</tr>';
	}
	res+='</table>';
	ele.innerHTML=res+'<br/>'+pie();
	ele.appendChild(ele);
}