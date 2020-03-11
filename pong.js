const canvas = document.querySelector('canvas')
const pincel = canvas.getContext('2d')

const pontos = {
  jogador: 0,
  maquina: 0,
}

function reiniciar() {
  const jogador = {
    valociadeJogador: 10,
    x: 36,
    y: 150,
  }

  const maquina = {
    velocidadeMaquina: 5,
    x: 554,
    y: 150,
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

    ArrowUp(info) {
      if (info) {
        if (this.Up === false) {
          movimentosAceitos.Up = true
        }
      } else {
        movimentosAceitos.Up = false
      }
    },
    ArrowDown(info) {
      if (info) {
        if (this.Down === false) {
          movimentosAceitos.Down = true
        }
      } else {
        movimentosAceitos.Down = false
      }
    },
    LogArrowUp() {
      if (jogador.y - 20 !== 0) {
        jogador.y -= jogador.valociadeJogador
      }
    },
    LogArrowDown() {
      if (jogador.y + 80 !== canvas.height) {
        jogador.y += jogador.valociadeJogador
      }
    },
  }
  function escreveTela(x, y, mnsg) {
    pincel.font = '25pt Arial'
    pincel.fillStyle = 'rgba(255,255,255,0.40)'
    pincel.fillText(mnsg, x, y)
  }

  function desenhaTela() {
    pincel.clearRect(10, 10, 580, 340)
    pincel.fillStyle = 'black'
    pincel.fillRect(10, 10, 580, 340)
    pincel.fillStyle = 'white'
    for (let y = 13; y < canvas.height - 20; y += 20) {
      pincel.fillRect(300, y, 1, 15)
    }
    escreveTela(140, 75, pontos.jogador)
    escreveTela(440, 75, pontos.maquina)
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
    desenhaTela()
    desenhaPaleta(jogador.x, jogador.y)
    desenhaPaleta(maquina.x, maquina.y)
    desenhaCirculo(bolinha.x, bolinha.y)
  }

  function teclaPressionada(evento) {
    if (movimentosAceitos[evento.key]) {
      movimentosAceitos[evento.key](true) //Abstração
    }
  }

  function teclaSolta(evento) {
    if (movimentosAceitos[evento.key]) {
      movimentosAceitos[evento.key](false) //Abstração
    }
  }

  function movimentaJogador() {
    if (movimentosAceitos.Up) {
      movimentosAceitos.LogArrowUp()
    }
    if (movimentosAceitos.Down) {
      movimentosAceitos.LogArrowDown()
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

  function verificarBolinhaBorda() {
    if (bolinha.x + 24 >= canvas.width) {
      pontos.maquina += 1
      clearInterval(intervalo)
      document.onkeydown = null
      document.onkeyup = null
      reiniciar()
    }
    if (bolinha.x < 30) {
      pontos.jogador += 1
      clearInterval(intervalo)
      document.onkeydown = null
      document.onkeyup = null
      reiniciar()
    }
    if (bolinha.y + 24 >= canvas.height || bolinha.y < 30) {
      bolinha.velocidadeY *= -1
    }
  }

  function verificarBolinhaPaletas() {
    if (verificaBolinhaJogador() || verificarBolinhaMaquina()) {
      bolinha.velocidadeX *= -1
    }
  }

  function verificaBolinhaJogador() {
    if (
      bolinha.x - 10 < jogador.x + 10 &&
      bolinha.y < jogador.y + 60 &&
      bolinha.y > jogador.y
    ) {
      return true
    }
  }

  function verificarBolinhaMaquina() {
    if (
      bolinha.x > maquina.x - 10 &&
      bolinha.y < maquina.y + 60 &&
      bolinha.y > maquina.y
    ) {
      return true
    }
  }

  function movimentaBolinha() {
    bolinha.x += bolinha.velocidadeX
    bolinha.y += bolinha.velocidadeY
    verificarBolinhaBorda()
    verificarBolinhaPaletas()
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
  let intervalo = setInterval(jogo, 16.66)
}
//reiniciar()
