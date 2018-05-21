const state = {
  points: [],
  canvas: null,
  context: '2d',
}

const setState = newState => Object.assign(state, newState)

const shouldPlacePoint = (points = []) => points.length < 3

const placePoint = (x, y, ctx, color) => {
  ctx.beginPath()
  ctx.arc(x, y, 11, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()

  return [{ x, y }]
}

const reduceQqrPoha = (items, mapFunc) => items.map(item => mapFunc(item)).reduce((acc, value) => value - acc)


const getFourthPoint = (points) => {
  // Given 3 points, you can have 3 different paralelograms. I choosed one of them.
  // The formula for this calculus its x4 = x1 - (x2 - x3) to get the x
  // y4 = y3 - (y2 - y1) to get the y
  const x = reduceQqrPoha(points, point => point.x)
  const y = reduceQqrPoha(points, point => point.y)
  return ({x, y})
}

const mountParallelogram = (context) => {
  const { points } = state
  const fourthPoint = getFourthPoint(points)
  // debugger
  points.push(fourthPoint)

  context.beginPath()
  context.moveTo(points[0].x, points[0].y)
  context.lineTo(points[1].x, points[1].y)
  context.lineTo(points[2].x, points[2].y)
  context.lineTo(points[3].x, points[3].y)
  context.closePath()
  context.stroke()
  return false
}

const handleEventClick = (e) => {
  const { pageX, pageY } = e
  const { canvas, context, points } = state
  const ctx = canvas.getContext(context)
  const point = shouldPlacePoint(points) ? placePoint(pageX, pageY, ctx, 'red') : mountParallelogram(ctx)
  // point ?
  const newPoints = points.concat(point)

  setState({ points: newPoints })
}

const init = () => {
  const canvas = document.getElementById('canvas-app')
  canvas.addEventListener('click', handleEventClick)

  setState({ canvas })
}

window.onload = function onLoad() {
  init()

}

// state.watch('p', function (id, oldval, newval) {
//   debugger
//   return newval;
// });

//
// export default {
//     _setState: setState
// }