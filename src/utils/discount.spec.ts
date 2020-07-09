import discount from './discount'

describe('#dicount', () => {
  it('should success discount', () => {
    const price = discount(100)
    expect(price).toEqual(80.00)
  })
})
