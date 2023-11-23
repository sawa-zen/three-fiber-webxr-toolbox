/**
 * 指定した幅で折り返すテキストを描画する
 * @param context
 * @param text
 * @param x
 * @param y
 * @param maxWidth
 * @param lineHeight
 */
export const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  // スペースと改行で分割
  let words = text.split(' ');
  let line = '';

  words.forEach((_word, n) => {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  })

  context.fillText(line, x, y);
}

export const drawErrorCard = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  messages: string[]
) => {
  const padding = 24

  // 背景を塗る
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  // 枠線を引く
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 10
  ctx.strokeRect(0, 0, width, height)
  // エラーメッセージを描く
  ctx.fillStyle = 'white'
  ctx.font = '24px serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  messages.forEach((message, index) => {
    wrapText(ctx, message, padding, padding + (index * 24), width - (padding * 2), 24)
  })
}
