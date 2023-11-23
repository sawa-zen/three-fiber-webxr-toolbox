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

export const drawErrorCard = (ctx: CanvasRenderingContext2D, width: number, height: number, message: string) => {
  const padding = 24
  const gap = 24

  // 背景を塗る
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, width, height)
  // 枠線を引く
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 10
  ctx.strokeRect(0, 0, width, height)
  // タイトルを描く
  ctx.fillStyle = 'white'
  ctx.font = '64px serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillText('Error', width / 2, padding)
  // エラーメッセージを描く
  ctx.fillStyle = 'white'
  ctx.font = '24px serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  wrapText(ctx, message, padding, padding + 64 + gap, width - (padding * 2), 24)
}
