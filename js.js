//audios

move = document.createElement("audio")
move.src="move.ogg"

comeu = document.createElement("audio")
comeu.src="move.ogg"

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




peca = {
	
	pos:function(e,x,y){
		e.style.top = y
		e.style.left = x
	},
	sumir:function(){ 
		this.el.style.display='none'
	},
	mostrar:function(){
		return this.el.removeAttribute("style")
	}
}

drag = false
cord = []

tabuleiro.onmousedown = function(e){
	if(checkPeca(e)){
		drag = true
		peca.el = e.target
		cord[0] = getCoordenada(e)
	}
}

tabuleiro.onmouseup = function(e){
	if(checkPeca(e)){
		drag=false
		peca.sumir()
		move.play()
	}
}

tabuleiro.onmouseover=function(e){
	try{
		cord[1] = e.target.id
		moveTo(cord[0],cord[1])	
		peca.mostrar()
	}catch(e){}
}

tabuleiro.onmouseout=function(e){
	try{
		// peca.el.removeAttribute("style")
		// peca.apagar(e)
		peca.mostrar()
	}catch(e){}
}

tabuleiro.onmousemove=function(e){
	if(drag){
		dx = e.clientX-25
		dy = e.clientY-25
		peca.pos(peca.el,dx,dy)
	}
}