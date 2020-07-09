import * as request from 'supertest'
import * as dotenv from 'dotenv'
import axios from 'axios'
import geocoder from '../src/configs/geocoder'

dotenv.config({})

const app = require('../src/index').default

describe('#end-to-end', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })
  it('returns 422 error', (done) => {
    expect.assertions(1)
    request(app)
      .post('/delivery-price')
      .then((res) => {
        expect(res.status).toBe(422)
        done()
      })
  })
  it('return success with data', (done) => {
    jest.spyOn(geocoder, 'geocode').mockResolvedValue([{ latitude: 22, longitude: 33 }])
    jest.spyOn(axios, 'post').mockResolvedValue({
      data: {
        total: {
          amount: 590,
          currency: 'EUR',
        },
      },
    })

    expect.assertions(3)
    request(app)
      .post('/delivery-price')
      .send({
        from: 'Vatslava Havela Boulevard 6, Kiev, Kyiv city',
        to: 'Velyka Vasylkivska Street 22, Kiev, Kyiv city',
      })
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.result.total.amount).toBe(472)
        expect(res.body.result.total.currency).toBe('EUR')
        done()
      })
  })
})
