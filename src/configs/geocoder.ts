import * as nodeGeocoder from 'node-geocoder'

const geocoder = nodeGeocoder({ provider: 'openstreetmap' })
export default geocoder
