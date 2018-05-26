const state = {
  points: [],
  canvas: null,
  context: '2d',
  circleArea: null,
  parallelogramArea: null,
  canvasOffsetLeft: null,
  canvasOffsetTop: null,
  draggingIndex: -1
}

// Receives the new state to be set and the callback
const setState = (newState, callback = () => {}) => {
  const returnableState = Object.assign(state, newState)
  return callback(returnableState)
}

const shouldPlacePoint = (points = []) => points.length < 3

// Receives the items and the function used to map (making it more general)
// Returns inverted subtraction of the items as a Number
const revertSubtractItems = (items, mapFunc) => items
  .map(item => mapFunc(item))
  .reduce((acc, value) => value - acc)

// Simply make a sum using map/reduce. Receives a function used to map and the items.
// Returns the sum as a Number
const sumItems = (items, mapFunc) => items.map(item => mapFunc(item)).reduce((acc, value) => value + acc)

// Given 3 points, you can have 3 different paralelograms. I choosed one of them.
// The formula for this calculus its x4 = x1 - (x2 - x3) to get the x
// y4 = y3 - (y2 - y1) to get the y
const getFourthPoint = (points) => {
  const x = revertSubtractItems(points, point => point.x)
  const y = revertSubtractItems(points, point => point.y)
  return ({ x, y })
}

// Calculates the area using Vetorial product as the formula below
// (x1 * y2 - y1 * x2) + (x2 * y3 - y2 * x3) + (x3 * y4 - y3 * x4) + (x4 * y1 - y4 * x1)
const calcArea = (points) => {
  const vProd = points.reduce((sum, point, i, arr) => {
    const { x, y } = arr[(i + 1) % arr.length]
    const res = (point.x * y) - (point.y * x)
    return sum + res
  }, 0)
  return (vProd / 2)
}

// Calculate the radius of a circle based on his area
// Divide the area by Pi and take the results square root will give you the diameter
// Divide it by 2 and you get the radius
const calcRadius = area => (Math.sqrt(area / Math.PI) / 2)

// Gets the points clicked by the user
// Since a canvas is a simple bitmap representation (has no DOM element for a circle, for example), we need to find the
// element by position. This calculates and returns an array of points
const getClickedPoints = ({pageX, pageY}, points, radius = 11) => points
    .filter(({x, y}) => (x <= pageX) && (x + radius * 2 >= pageX) && (y <= pageY) && (y + 11 * 2 >= pageY))


// Care: Inpure functions below
const handleEventClick = ({ pageX, pageY }) => {
  const { canvas, context, points } = state
  const [x, y] = [(pageX - canvas.offsetLeft), (pageY - canvas.offsetTop)]
  const ctx = canvas.getContext(context)

  draw(points, x, y, ctx)
}

// Function responsible for drawnign anything on the screen
// Inside this method we have a couple of others, trying to use the lexical scope to encapsulate any possible side effects related to the canvas
const draw = (points, x, y, ctx) => {
  const mountParallelogram = (color, points) => {
    ctx.beginPath()
    points.forEach((point, index) => (index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)))
    ctx.closePath()
    ctx.strokeStyle = color
    ctx.stroke()
    return points
  }

  const placePoint = (x, y, fillColor, radius = 11, strokeColor) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    if (fillColor) {
      ctx.fillStyle = fillColor
      ctx.fill()
    } else if (strokeColor) {
      ctx.strokeStyle = strokeColor
    }
    ctx.stroke()
    return [{ x, y }]
  }

  const placePoints = (points) => points.forEach(({x, y}) => placePoint(x, y, 'red', 11))

  if (points.length <= 4) {
    const point = points.length === 4 ? placePoints(points) : shouldPlacePoint(points) ? placePoint(x, y, 'red', 11) : getFourthPoint(points)
    const newPoints = point ? points.concat(point) : points
    if (newPoints.length > 3) {
      mountParallelogram('blue', newPoints)
      const centerX = sumItems(newPoints, p => p.x) / 4
      const centerY = sumItems(newPoints, p => p.y) / 4
      const area = calcArea(newPoints)
      const radius = calcRadius(area)
      placePoint(centerX, centerY, null, radius, 'yellow')
    }
    setState({ points: newPoints })
  }
}

const handleEventMouseDown = (e) => {
  e.preventDefault()
  e.stopPropagation()
  const { points } = state
  const draggingIndex = points.length > 3 ? points.indexOf(getClickedPoints(e, points, 11)[0]) : null
  setState({draggingIndex})
}

const mouseMove = function(e) {
  const { draggingIndex, canvas, context, points } = state
  const {pageX, pageY} = e
  const ctx = canvas.getContext(context)
  if (draggingIndex !== -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const [x, y] = [(pageX - canvas.offsetLeft), (pageY - canvas.offsetTop)]
    const newPoints = points.slice()
    newPoints[draggingIndex] = {x, y}

    draw(newPoints, x, y, ctx)
  }
}

const handleEventMouseUp = () => {
  setState({draggingIndex: -1})
}

const resetBoard = () => {
  const { canvas, context } = state
  const ctx = canvas.getContext(context)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  setState({ points: [] })
  canvas.addEventListener('click', handleEventClick)
}

window.onload = function onLoad() {
  const canvas = document.getElementById('canvas-app')
  canvas.addEventListener('click', handleEventClick)
  canvas.addEventListener('mousedown', handleEventMouseDown, true)
  canvas.addEventListener('mousemove', mouseMove, true)
  canvas.addEventListener('mouseup', handleEventMouseUp, true)

  setState({ canvas })
}