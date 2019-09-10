//audios

move = document.createElement("audio")
move.src="move.mp3"

comeu = document.createElement("audio")
comeu.src="comeu.mp3"

//categoriza peças

function renderPeca(t){
	a = "T t C c B b R r D d P p".split(" ")
	b = "t1 t2 c1 c2 b1 b2 r1 r2 d1 d2 p1 p2".split(" ")
	return b[a.indexOf(t)]
}

//estrutura do tabuleiro

org = "tcbdrbct,pppppppp,xxxxxxxx,xxxxxxxx,xxxxxxxx,xxxxxxxx,PPPPPPPP,TCBRDBCT"

org = org.split(",").join("")

//renderizar tabuleiro

num = 0
val = 'abcdefgh'.split("")
col = 8
tab = []
pecas = []
drag = false

for(i=0;i<8;i++){
	for(j=0;j<8;j++){

		nome_coordenada = val[(j)]+(9-(i+1))
		tab[nome_coordenada] = [ j*50 , i*50 ]
		num = i*8+j

		if(org[num] != 'x'){

			nome_peca = renderPeca(org[num])
			
			color = (nome_peca.match(/2/g)) ? "black" : "white"
			
			div = document.createElement("div")
		
			div.id = val[(j)]+(9-(i+1))
			div.y = i
			div.style.transform = "translate("+j*50+"px,"+i*50+"px)"
			div.setAttribute("class","p "+nome_peca)
			div.setAttribute("cor",color)
		
			tab[nome_coordenada].el = div
			tabuleiro.appendChild(div)
		}
	}	
}

//verifica cor da peca da coordenada

function verifica_cor(cor){
	cor = document.getElementById(cor)
	if(cor != null)
		return cor.getAttribute("cor")
	else
		return false
}

//verifica de quem é a vez da jogada


jogador = {
	vez:'white'
}

//verifica se determinada peça existe na coordenada

function verifica_casa(cord){
	cord = document.getElementById(cord)
	return (cord != null) ? true : false
}

//moveTo('a1','d4') // movimentação das peças

function moveTo(cor_1,cor_2,color){
	try{
		if(verifica_cor(cor_1) == color){
			dx = tab[cor_2][0]
			dy = tab[cor_2][1]

			if(jogador.vez == 'white')
					jogador.vez = 'black'
				else
					jogador.vez = 'white'

			if(cor_1 != cor_2 && verifica_casa(cor_1)){

				if(tab[cor_2].el != undefined  ){
					comeu.play()
				}else{
					move.play()
				}

				apagar = tab[cor_2].el
				tab[cor_1].el.id = cor_2 
				tab[cor_2].el = tab[cor_1].el
				tab[cor_1].el.style.transform = 'translate('+dx+'px, '+dy+'px)'
				tab[cor_1] = tab[cor_1].slice(0,2)
				apagar.remove()

				
			}
		}
		
	}catch(e){}
}

tabuleiro2.onmousedown=function(e){
	p1 = click
}

tabuleiro2.onmouseup=function(e){

	p2 = click
	
	moveTo(p1,p2,jogador.vez)
	
}

tabuleiro2.onmousemove=function(e){

	x = e.layerX
	y = e.layerY

	casaX = parseInt(x/50)
	casaY = parseInt(y/50)
	
	pixelX = casaX*50
	pixelY = casaX*50
	
	click = (val[casaX])+(8-casaY)
}
