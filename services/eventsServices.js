import Axios from 'axios'

export const getEvents = async () => {
  const res = await Axios('/api/events?sort=date&show=true&limit=4')
  return res.data
}
