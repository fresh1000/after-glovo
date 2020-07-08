import axios from 'axios'
import * as dayjs from 'dayjs'

class GlovoApiService {
  async getPrice (coordinates) {
    try {
      const data = {
        scheduleTime: dayjs().add(4, 'h').valueOf(),
        description: 'A 30cm by 30cm box',
        addresses: coordinates
      }
      const priceData = await axios.post('https://api.glovoapp.com/b2b/orders/estimate', data, {
        auth: {
          username: process.env.GLOVO_API_KEY,
          password: process.env.GLOVO_API_SECRET,
        }
      })
      return priceData.data
    } catch (err) {
      console.log(err)
      return []
    }
  }
}

export default GlovoApiService
