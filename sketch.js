//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 17;
let raio     = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete       = 5;
let yRaquete       = 150;
let raqueteLargura = 5;
let raqueteAltura  = 85;

//variáveis da raquete do oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidaYOponente;
let chanceDeErrar = 0;

//variável de verificação da colisão com a raquete
let colidiu = false;

//variáveis placar
let meusPontos     = 0;
let pontosOponente = 0;

//variáveis sons do jogo
let somRaquetada;
let somPonto;
let somTrilha;

function preload() {
  somRaquetada = loadSound("raquetada.mp3");
  somTrilha    = loadSound("trilha.mp3");
  somPonto     = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop();
}

function draw() { 
  cenario();
  criaBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  criaRaquete(xRaquete, yRaquete);
  criaRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  exibirPlacar();
  marcarPontos()
  
  //verificaColisaoRaquete();
}

function cenario() {
  background(36, 9, 139);
  line(300, 0, 300, 400);
  stroke(255,255,255);
  strokeWeight(4);
  
  let borda = document.getElementById ("defaultCanvas0");
  borda = borda.style="border:5px solid rgb(255, 255, 255);"
}

function criaBolinha() {
  fill(255);
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {      
      velocidadeXBolinha *= -1;     
  }  
    if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYBolinha *= -1;
  }
}

function criaRaquete(x, y) {
  rect(x, y, raqueteLargura, raqueteAltura);
}

function movimentaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 5;
  }
  
  if (keyIsDown(83)) {
    yRaquete += 5;
  }
}

function movimentaRaqueteOponente() {
  //Multiplayer
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 5;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 5;
  }
  
  //Bot
  /*velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteAltura / 2 - 30;
  yRaqueteOponente += velocidadeYOponente; 
  yRaqueteOponente += chanceDeErrar;
  calculaChanceDeErrar();
  
  */
}

/*function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteLargura && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
} */

function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, raqueteLargura, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiu) {
    somRaquetada.play();
    velocidadeXBolinha *= -1;
  }
}

function exibirPlacar() {
  fill(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 110, 0));
  rect(150, 10, 40, 28);
  text(meusPontos, 170, 30);
  fill(color(255, 110, 0));
  rect(450, 10, 40, 28);
  text(pontosOponente, 470, 30);
}

function marcarPontos() {
  if (xBolinha > 590) {
    somPonto.play();
    meusPontos ++;
  }
  
  if (xBolinha < 10) {
    somPonto.play();
    pontosOponente ++;
  }
}

function calculaChanceDeErrar() {
   if (pontosDoOponente >= meusPontos) {
     chanceDeErrar += 1
     if (chanceDeErrar >= 39){
     chanceDeErrar = 40
    }
    } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }  
}






