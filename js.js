//criação do tabuleiro

linha = 8
coluna = 8

val = 'abcdefgh'.split("")

for(i=linha;i>0;i--){
	for(j=0;j<coluna;j++){

		cls = ((j+i)%2==0) ? "light" : "dark"
		casa = val[j]+i		
	
		tabuleiro.innerHTML += "<div id="+casa+" class='"+cls+"'></div>"
		
	}	
}	

//categoriza peças

function renderPeca(t){
	a = "T t C c B b R r D d P p".split(" ")
	b = "t1 t2 c1 c2 b1 b2 r1 r2 d1 d2 p1 p2".split(" ")
	return b[a.indexOf(t)]
}

//organiza peças no tabuleiro

org = "tcbdrbct,pppppppp,xxxxxxxx,xxxxxxxx,xxxxxxxx,xxxxxxxx,PPPPPPPP,TCBDRBCT"
org = org.split(",").join("")

for(i in org){
	if(renderPeca(org[i]) != undefined)
	tabuleiro.children[i].innerHTML = "<div class='p "+renderPeca(org[i])+"'>"
}

//movimentação das peças

function moveTo(coord_1,coord_2){
	try{
		coord_1 = document.getElementById(coord_1)
		coord_2 = document.getElementById(coord_2)
		coord_2.appendChild(coord_1.children[0])	
	}catch(e){}
}

//checa se é uma peça na coordenada

function checkPeca(e){
	if(e.target.classList.value.match(/\bp\b/g))
		return true
	else
		return false
}	

function getCoordenada(e){
	if( e.target.id != "tabuleiro" ){
		if(!e.target.classList.value.match(/p/g))
			return e.target.id
		else
			return e.target.parentElement.id
	}
}

cords = []

// tabuleiro.onclick = function(e){

// 	// if(typeof(getCoordenada(e)) != "undefined")
// 	// 	cords.push(getCoordenada(e))
	
// 	// if(cords.length == 2){
// 	// 	moveTo(cords[0],cords[1])
// 	// 	cords = []
// 	// }
	
// }

segura = 0

tabuleiro.onmousedown=function(e){
	
	k = e.target
	cords.push(getCoordenada(e))	
	e.preventDefault()

	segura = 1
}

// tabuleiro.onmousemove=function(e){
// 	if(segura == 1){
// 		x = e.pageX-25
// 		y = e.pageY-25
		
// 		k.style.top = y
// 		k.style.left = x
// 	}
// }

tabuleiro.onmouseup=function(e){
	segura = 0
	cords.push(getCoordenada(e))
	moveTo(cords[0],cords[1])
	cords = []
	k.removeAttribute("style")
}
