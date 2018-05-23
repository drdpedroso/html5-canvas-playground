// // Application State
// const state = {
//   points: [],
//   canvas: null,
//   context: '2d',
// }
//
// // Receives the new state to be set and the callback
// const setState = (newState, callback = () => {}) => {
//   const returnableState = Object.assign(state, newState)
//   return callback(returnableState)
// }
//
// // Simple Utility function to see what should be placed when a click is made
// const shouldPlacePoint = (points = []) => points.length <= 3
//
// // Receives the items to be reduced and the map function to be used
// const reverseSubtractArray = (items = [], mapFunc = () => {}) => items.map(item => mapFunc(item)).reduce((acc, value) => value - acc)
//
// const getFourthPoint = (points) => {
//   // Given 3 points, you can have 3 different paralelograms. I choosed one of them.
//   // The formula for this calculus its x4 = x1 - (x2 - x3) to get the x
//   // y4 = y3 - (y2 - y1) to get the y
//   const x = reverseSubtractArray(points, point => point.x)
//   const y = reverseSubtractArray(points, point => point.y)
//   return {x, y}
// }
//
// // Responsible for converting the point's coordinates to a more friendly text
// const mapCoordinatesToText = point => `x: ${point.x} y: ${point.y}`
//
// const getShapeType = (points) => points.length < 3 ? 'circle' : 'paralellogram'
//
// // CARE: Impure functions below
// const handleEventClick = (e) => {
//   debugger
//   const { pageX, pageY } = e
//   const { canvas, context, points } = state
//   const ctx = canvas.getContext(context)
//   const point = shouldPlacePoint(points) ? { x: pageX, y: pageY } : getFourthPoint(points)
//   const type = getShapeType(points)
//   const {x, y} = point
//
//   // The functions below use a different lexical scope to avoid side-effects (some are inevitable since we're manipulating dom)
//   function drawCircle(options) {
//     ctx.beginPath()
//     ctx.arc(...options)
//     ctx.stroke()
//     ctx.fillStyle = 'red'
//     ctx.fill()
//     ctx.closePath()
//   }
//
//   function drawParalellogram (points) {
//     debugger
//     const lineTo = ({x, y}, ctx, index) => index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
//
//     function d (points) {
//       ctx.beginPath()
//       points.forEach((point, index) => lineTo(point, ctx, index))
//       ctx.closePath()
//       ctx.stroke()
//     }
//
//     return d(points)
//   }
//
//   // Using concat to preserve the "old" array, returning a new one
//   const newPoints = points.concat([point])
//
//   type === 'circle' ? drawCircle([x, y, 11, 0, 2 * Math.PI], ctx) : drawParalellogram(newPoints, ctx)
//
//   setState({ points: newPoints }, state => showCoordinates(state, point))
// }
//
// // Creates a new DOM Node under <div> declared on the index.html file
// const showCoordinates = (state, point = false) => {
//   const element = document.getElementById('coordinates')
//   const elementToAppend = document.createElement('div')
//   elementToAppend.innerText = point ? mapCoordinatesToText(point) : mapCoordinatesToText(point)
//   element.appendChild(elementToAppend)
// }
//
// const resetBoard = () => {
//   const {canvas, context} = state
//   const ctx = canvas.getContext(context)
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   setState({points: []})
//   canvas.addEventListener('click', handleEventClick)
// }
//
// window.onload = function onLoad() {
//   const canvas = document.getElementById('canvas-app')
//   canvas.addEventListener('click', handleEventClick)
//
//   setState({ canvas })
// }

const state = {
  points: [],
  canvas: null,
  context: '2d',
}

const setState = newState => Object.assign(state, newState)

const shouldPlacePoint = (points = []) => points.length < 3

const reverSubtractArray = (items, mapFunc) => items.map(item => mapFunc(item)).reduce((acc, value) => value - acc)

const getFourthPoint = (points) => {
  // Given 3 points, you can have 3 different paralelograms. I choosed one of them.
  // The formula for this calculus its x4 = x1 - (x2 - x3) to get the x
  // y4 = y3 - (y2 - y1) to get the y
  const x = reverSubtractArray(points, point => point.x)
  const y = reverSubtractArray(points, point => point.y)
  return ({x, y})
}


const handleEventClick = ({pageX, pageY}) => {
  // const { pageX, pageY } = e
  const { canvas, context, points } = state
  const ctx = canvas.getContext(context)

  const mountParallelogram = () => {
    const { points } = state
    const fourthPoint = getFourthPoint(points)
    const newPoints = points.concat([fourthPoint])
    ctx.beginPath()
    newPoints.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y))
    ctx.closePath()
    ctx.stroke()
    return [fourthPoint]
  }

  const placePoint = (x, y, ctx, color) => {
    ctx.beginPath()
    ctx.arc(x, y, 11, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fillStyle = color
    ctx.fill()

    return [{ x, y }]
  }

  const point = shouldPlacePoint(points) ? placePoint(pageX, pageY, ctx, 'red') : mountParallelogram(ctx)
  const newPoints = points.concat(point)

  setState({ points: newPoints })
}

const resetBoard = () => {
  const {canvas, context} = state
  const ctx = canvas.getContext(context)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setState({points: []})
  canvas.addEventListener('click', handleEventClick)
};

const init = () => {
  const canvas = document.getElementById('canvas-app')
  canvas.addEventListener('click', handleEventClick)

  setState({ canvas })
}

window.onload = function onLoad() {
  init()

}
