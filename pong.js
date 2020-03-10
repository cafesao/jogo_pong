const canvas = document.querySelector('canvas')
const pincel = canvas.getContext('2d')

const jogador = {
  valociadeJogador: 10,
  y: 20,
}

const maquina = {
  velocidadeMaquina: 4,
  y: 20,
}

const bolinha = {
  velocidadeX: 6,
  velocidadeY: 6,
  x: 300,
  y: 180,
}

const movimentosAceitos = {
  Up: false,
  Down: false,

  ArrowUp() {
    if (jogador.y - 20 !== 0) {
      jogador.y -= jogador.valociadeJogador
    }
  },
  ArrowDown() {
    if (jogador.y + 80 !== canvas.height) {
      jogador.y += jogador.valociadeJogador
    }
  },
}

function limpaTela() {
  pincel.clearRect(10, 10, 580, 340)
  pincel.fillStyle = 'black'
  pincel.fillRect(10, 10, 580, 340)
  pincel.fillStyle = 'white'
  for (let y = 13; y < canvas.height - 20; y += 20) {
    pincel.fillRect(300, y, 1, 15)
  }
}

function desenhaPaleta(x, y) {
  pincel.fillStyle = 'white'
  pincel.fillRect(x, y, 10, 60)
}

function desenhaCirculo(x, y) {
  pincel.fillStyle = 'white'
  pincel.beginPath()
  pincel.arc(x, y, 10, 0, 2 * Math.PI)
  pincel.fill()
}

function atualizaTela() {
  limpaTela()
  desenhaPaleta(40, jogador.y)
  desenhaPaleta(560, maquina.y)
  desenhaCirculo(bolinha.x, bolinha.y)
}

function teclaPressionada(evento) {
  if (evento.key == 'ArrowUp') {
    movimentosAceitos.Up = true
  }
  if (evento.key == 'ArrowDown') {
    movimentosAceitos.Down = true
  }
}

function teclaSolta(evento) {
  if (evento.key == 'ArrowUp') {
    movimentosAceitos.Up = false
  }
  if (evento.key == 'ArrowDown') {
    movimentosAceitos.Down = false
  }
}

function movimentaJogador() {
  if (movimentosAceitos.Up) {
    movimentosAceitos.ArrowUp()
  }
  if (movimentosAceitos.Down) {
    movimentosAceitos.ArrowDown()
  }
}

function verificarMaquina() {
  if (maquina.y - 20 <= 0 || maquina.y > canvas.height - 80) {
    maquina.velocidadeMaquina *= -1
  }
}

function movimentaMaquina() {
  maquina.y += maquina.velocidadeMaquina
  verificarMaquina()
}

function verificarBolinha() {
  if (bolinha.x + 24 >= canvas.width || bolinha.x < 30) {
    bolinha.velocidadeX *= -1
  }
  if (bolinha.y + 24 >= canvas.height || bolinha.y < 30) {
    bolinha.velocidadeY *= -1
  }
}

function movimentaBolinha() {
  bolinha.x += bolinha.velocidadeX
  bolinha.y += bolinha.velocidadeY
  verificarBolinha()
}

function jogo() {
  movimentaJogador()
  movimentaMaquina()
  movimentaBolinha()
  atualizaTela()
}

//Fundo verde
pincel.fillStyle = 'green'
pincel.fillRect(0, 0, 600, 360)

//Cria jogo
atualizaTela()

document.onkeydown = teclaPressionada
document.onkeyup = teclaSolta
//setInterval(jogo, 16.66)
