// var assert = require('assert');
import * as index from '../scripts/index'

describe('index', () => {
  it('should return true if array is < 3', () => {
    const result = shouldPlacePoint([1, 2])
    expect(result).toBe(true)
  })
  it('should return false if array is > 3', () => {
    const result = shouldPlacePoint([1, 2, 3, 4, 5])
    expect(result).toBe(false)
  })
})
