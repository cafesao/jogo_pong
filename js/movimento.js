import {
  verificarBolinhaBorda,
  verificarBolinhaPaletas,
  verificarMaquina,
} from './verificar.js'
import { movimentosAceitos, maquina, bolinha, canvas } from './infoJogo.js'

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

  //Adversario nunca perde :/
  function movimentaMaquina() {
    if (verificarMaquina()) {
      maquina.y = bolinha.y - 60 / 2
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
