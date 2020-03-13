import { bolinha } from './infoJogo.js'

export function verificaColisao(colidir, largura, altura) {
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
