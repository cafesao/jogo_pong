import { verificaColisao } from './colisao.js'
import {
  tamanhoCanvas,
  jogador,
  maquina,
  bolinha,
  pontos,
  canvas,
} from './infoJogo.js'
import { intervalo, iniciarJogo } from './pong.js'
import { somPonto, somRaquete } from './som.js'

export function verificarMaquina() {
  if (bolinha.y < 50 || bolinha.y > canvas.height - 50) {
    return false
  }
  return true
}

export function verificarBolinhaBorda() {
  function pontuar(quem) {
    pontos[quem] += 1
  }

  function reiniciar() {
    somPonto.play()
    clearInterval(intervalo)
    document.onkeydown = null
    document.onkeyup = null
    iniciarJogo()
  }

  if (
    verificaColisao(tamanhoCanvas.Cima, 600, 10) ||
    verificaColisao(tamanhoCanvas.Baixo, 600, 10)
  ) {
    bolinha.velocidadeY *= -1
  }
  if (verificaColisao(tamanhoCanvas.Esquerda, 10, 360)) {
    pontuar('maquina')
    reiniciar()
  }
  if (verificaColisao(tamanhoCanvas.Direita, 10, 360)) {
    pontuar('jogador')
    reiniciar()
  }
}

export function verificarBolinhaPaletas() {
  if (verificaColisao(jogador, 10, 60) || verificaColisao(maquina, 10, 60)) {
    somRaquete.play()
    bolinha.velocidadeX *= -1
  }
}
