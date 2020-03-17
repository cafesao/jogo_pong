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

export function verificaMaquina() {
  if (maquina.y - 60 / 2 > 240) {
    if (maquina.velocidade === -6) {
      return true
    }
    return false
  }
  if (maquina.y - 60 / 2 < 0) {
    if (maquina.velocidade === 6) {
      return true
    }
    return false
  }
  return true
}

export function verificarErro() {
  if (pontos.maquina - pontos.jogador < 4) {
    return 20
  } else if (pontos.maquina - pontos.jogador >= 5) {
    return 40
  } else {
    return 0
  }
}

export function verificarBolinhaPaletas() {
  if (verificaColisao(jogador, 10, 60) || verificaColisao(maquina, 10, 60)) {
    somRaquete.play()
    bolinha.velocidadeX *= -1
  }
}
