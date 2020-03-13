import {
  jogador,
  maquina,
  bolinha,
  pontos,
  canvas,
  pincel,
} from './infoJogo.js'

export function atualizaTela() {
  function desenhaTela() {
    function escreveTela(x, y, mnsg) {
      pincel.font = '30pt Pong Score'
      pincel.fillStyle = 'rgba(255,255,255,0.5)'
      pincel.fillText(mnsg, x, y)
    }

    pincel.clearRect(10, 10, 580, 340)

    pincel.fillStyle = 'black'
    pincel.fillRect(10, 10, 580, 340)

    pincel.fillStyle = 'rgba(255,255,255,0.7)'
    for (let y = 13; y < canvas.height - 20; y += 20) {
      pincel.fillRect(300, y, 3, 15)
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

  desenhaTela()
  desenhaPaleta(jogador.x, jogador.y)
  desenhaPaleta(maquina.x, maquina.y)
  desenhaCirculo(bolinha.x, bolinha.y)
}

export function desenhaFundo() {
  pincel.fillStyle = 'green'
  pincel.fillRect(0, 0, 600, 360)
}
