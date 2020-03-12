const canvas = document.querySelector('canvas')
const pincel = canvas.getContext('2d')

const pontos = {
  jogador: 0,
  maquina: 0,
}

function reiniciar() {
  const canvasEsquerda = {
    x: 4,
    y: 0,
  }

  const canvasDireita = {
    x: 586,
    y: 0,
  }

  const canvasCima = {
    x: 0,
    y: 5,
  }

  const canvasBaixo = {
    x: 0,
    y: 346,
  }

  const jogador = {
    valociadeJogador: 10,
    x: 36,
    y: 150,
  }

  const maquina = {
    velocidadeMaquina: 5,
    x: 552,
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

  function collideRectCircle(rx, ry, rw, rh, cx, cy, diametro) {
    function dist(...args) {
      return Math.hypot(args[2] - args[0], args[3] - args[1])
    }

    let testX = cx
    let testY = cy

    if (cx < rx) {
      testX = rx
    } else if (cx > rx + rw) {
      testX = rx + rw
    }

    if (cy < ry) {
      testY = ry
    } else if (cy > ry + rh) {
      testY = ry + rh
    }

    if (dist(cx, cy, testX, testY) <= diametro / 2) {
      return true
    }
    return false
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
    if (bolinha.y < 50 || bolinha.y > canvas.height - 50) {
      return false
    }
    return true
  }

  function movimentaMaquina() {
    if (verificarMaquina()) {
      maquina.y = bolinha.y - 60 / 2
    }
  }

  function verificarBolinhaBorda() {
    if (
      verificaColisao(canvasCima, 600, 10) ||
      verificaColisao(canvasBaixo, 600, 10)
    ) {
      bolinha.velocidadeY *= -1
    }
    if (
      verificaColisao(canvasEsquerda, 10, 360) ||
      verificaColisao(canvasDireita, 10, 360)
    ) {
      pontos.maquina += 1
      clearInterval(intervalo)
      document.onkeydown = null
      document.onkeyup = null
      reiniciar()
    }
  }

  function verificarBolinhaPaletas() {
    if (verificaColisao(jogador, 10, 60) || verificaColisao(maquina, 10, 60)) {
      bolinha.velocidadeX *= -1
    }
  }

  function verificaColisao(colidir, largura, altura) {
    return collideRectCircle(
      colidir.x,
      colidir.y,
      largura,
      altura,
      bolinha.x,
      bolinha.y,
      20,
    )
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
