const index = require('../scripts/index.js')

describe('A suite', () => {
  it('should change application state', () => {
    console.log(index._setState)
    expect(true).toBe(true)
  })
})

