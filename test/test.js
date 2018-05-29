import * as index from '../scripts/index'

describe('index.js', () => {
  it('should return true if array is < 3', () => {
    const result = index.shouldPlacePoint([1, 2])
    expect(result).toBe(true)
  })
  it('should return false if array is > 3', () => {
    const result = index.shouldPlacePoint([1, 2, 3, 4, 5])
    expect(result).toBe(false)
  })
  it('should revert and subtract the items of the array', () => {
    const points = [
      {x: 407, y: 236},
      {x: 680, y: 224},
      {x: 713, y: 343}
    ]
    const result = index.revertSubtractItems(points, point => point.x)
    expect(result).toBe(440)
  })
  it('should sum the items of the array', () => {
    const points = [
      {x: 407, y: 236},
      {x: 680, y: 224},
      {x: 713, y: 343}
    ]
    const result = index.sumItems(points, point => point.x)
    expect(result).toBe(1800)
  })
  it('should get the fourth point of the parallelogram', () => {
    const points = [
      {x: 407, y: 236},
      {x: 680, y: 224},
      {x: 713, y: 343}
    ]
    const result = index.getFourthPoint(points)
    expect(String(result)).toBe(String({x: 440, y: 355}))
  })
  it('should calculate the right area using vetorial product', () => {
    const points = [
      {x: 407, y: 236},
      {x: 680, y: 224},
      {x: 713, y: 343},
      {x: 440, y: 355}
    ]
    const result = index.calcArea(points)
    expect(result).toBe(32883)
  })
  it('should calculate the radius of the circle based on the area', () => {
    const area = 32883
    const result = index.calcRadius(area)
    expect(result).toBe(51.154139586600394)
  })
  it('should return an empty array if the none of the circle were clicked', () => {
    const points = [
      {x: 407, y: 236},
      {x: 680, y: 224},
      {x: 713, y: 343},
      {x: 440, y: 355}
    ]
    const result = index.getClickedPoints({ x: 230, y: 236 }, points)
    expect(String(result)).toBe(String([]))
  })
})
