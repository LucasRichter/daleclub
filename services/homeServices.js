import Axios from 'axios'

export const getCarouselImages = async () => {
  const res = await Axios.get('/api/images', { params: { carousel: true } })
  return res.data
}
