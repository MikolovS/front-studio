import Cities from '@/cities/Cities'
import City from '@/cities/city/City'

export default [
  {
    path: 'cities',
    component: Cities,
    meta: {title: 'Города'}
  },
  {
    path:'cities/city/',
    component: City,
    props: true,
    meta: {title: 'Город' }
  }
]
