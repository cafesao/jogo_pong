import {
  verificarBolinhaBorda,
  verificarBolinhaPaletas,
  verificaMaquina,
  verificarErro,
} from './verificar.js'
import { movimentosAceitos, bolinha, maquina } from './infoJogo.js'

export function teclaPressionada(evento) {
  if (movimentosAceitos[evento.key]) {
    movimentosAceitos[evento.key](true) //Abstração
  }
}

export function teclaSolta(evento) {
  if (movimentosAceitos[evento.key]) {
    movimentosAceitos[evento.key](false) //Abstração
  }
}

export function movimentaTudo() {
  function movimentaJogador() {
    if (movimentosAceitos.Up) {
      movimentosAceitos.LogArrowUp()
    }
    if (movimentosAceitos.Down) {
      movimentosAceitos.LogArrowDown()
    }
  }

  function movimentaMaquina() {
    maquina.velocidade = bolinha.y - maquina.y - 60 / 2
    maquina.velocidade += verificarErro()
    if (verificaMaquina()) {
      maquina.y += maquina.velocidade
    }
  }

  function movimentaBolinha() {
    bolinha.x += bolinha.velocidadeX
    bolinha.y += bolinha.velocidadeY
    verificarBolinhaBorda()
    verificarBolinhaPaletas()
  }

  movimentaJogador()
  movimentaMaquina()
  movimentaBolinha()
}
