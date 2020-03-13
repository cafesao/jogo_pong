export const canvas = document.querySelector('canvas')
export const pincel = canvas.getContext('2d')

export const movimentosAceitos = {
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

export const tamanhoCanvas = {
  Esquerda: {
    x: 4,
    y: 0,
  },
  Direita: {
    x: 586,
    y: 0,
  },
  Cima: {
    x: 0,
    y: 5,
  },
  Baixo: {
    x: 0,
    y: 346,
  },
}

export const jogador = {
  valociadeJogador: 10,
  x: 36,
  y: 150,
}

export const maquina = {
  velocidadeMaquina: 5,
  x: 552,
  y: 150,
}

export const bolinha = {
  velocidadeX: 6,
  velocidadeY: 6,
  x: 300,
  y: 180,
}

export const pontos = {
  jogador: 0,
  maquina: 0,
}
