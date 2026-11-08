/** Builds an SVG path through orthogonal points, rounding every corner. */
export function roundedPath(points, radius = 8) {
  let path = `M ${points[0][0]} ${points[0][1]}`

  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i - 1]
    const [cx, cy] = points[i]
    const [nx, ny] = points[i + 1]

    const inLength = Math.hypot(cx - px, cy - py)
    const outLength = Math.hypot(nx - cx, ny - cy)
    const r = Math.min(radius, inLength / 2, outLength / 2)
    if (r === 0) continue

    const startX = cx - ((cx - px) / inLength) * r
    const startY = cy - ((cy - py) / inLength) * r
    const endX = cx + ((nx - cx) / outLength) * r
    const endY = cy + ((ny - cy) / outLength) * r

    path += ` L ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`
  }

  const [lastX, lastY] = points[points.length - 1]
  return `${path} L ${lastX} ${lastY}`
}
