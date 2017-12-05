import Cities from '@/modules/cities/Cities'
import City from '@/modules/cities/city/City'

export default [
  {
    path: 'cities',
    component: Cities
  },
  {
    path:'cities/city/:id',
    component: City,
    props: true
  }
]
