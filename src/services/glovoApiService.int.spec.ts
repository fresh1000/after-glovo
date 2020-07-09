import axios from 'axios'
import GlovoApiService from './GlovoApiService'
import { CoordinatesData } from '../types/coordinatesData'

const params = [
  {
    type: 'PICKUP',
    lat: 33,
    lon: 22,
    label: 'TEST',
  },
  {
    type: 'DELIVERY',
    lat: 44,
    lon: 55,
    label: 'TEST 2',
  },
] as CoordinatesData[]

describe('#glovo api service', () => {
  it('should return result with price', async () => {
    const spy = jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        total: {
          amount: 590,
          currency: 'EUR',
        },
      },
    })

    const glovoApiService = new GlovoApiService()
    const result = await glovoApiService.getPrice(params)

    expect(result.total.amount).toEqual(590)
    expect(result.total.currency).toEqual('EUR')

    spy.mockRestore()
  })

  it('should throw error', async () => {
    const spy = jest.spyOn(axios, 'post').mockRejectedValue(new Error('Mock error'))

    const glovoApiService = new GlovoApiService()
    await expect(glovoApiService.getPrice(params)).rejects.toThrow(new Error('Cannot get glovo price'))

    spy.mockRestore()
  })
})
