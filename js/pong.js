import { atualizaTela, desenhaFundo } from './desenha.js'
import { teclaPressionada, teclaSolta, movimentaTudo } from './movimento.js'
import { jogador, maquina, bolinha } from './infoJogo.js'

export let intervalo

export function iniciarJogo() {
  jogador.x = 36
  jogador.y = 150

  maquina.x = 552
  maquina.y = 150

  //Bolinha começa para algum lado, do jogador ou da maquina.
  if (Math.floor(Math.random() * 2)) {
    bolinha.velocidadeX = 6
    bolinha.velocidadeY = 6
  } else {
    bolinha.velocidadeX = -6
    bolinha.velocidadeY = -6
  }

  bolinha.x = 300
  bolinha.y = 180

  function jogo() {
    movimentaTudo()
    atualizaTela()
  }

  //Desenha Tela Jogo
  atualizaTela()
  document.onkeydown = teclaPressionada
  document.onkeyup = teclaSolta

  intervalo = setInterval(jogo, 16.66)
}

//Fundo verde
desenhaFundo()
iniciarJogo()
