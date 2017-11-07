import React from 'react'
import { Redirect } from 'react-router'
import { Home, Dtemp, Wtemp, Mtemp, Statebor1 } from './components'

const routes2 = [
  {
    'path':'/',
    'component': Home,
    'exact': true
  },
  {
    'path':'/dtemp',
    'component': Dtemp
  },
  {
    'path':'/wtemp',
    'component': Wtemp
  },
  {
    'path':'/mtemp',
    'component': Mtemp
  },
  {
    'path':'/statebor1',
    'component': Statebor1
  }
];

export default routes2;
