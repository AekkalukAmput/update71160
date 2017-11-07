import React from 'react'
import { Redirect } from 'react-router'
import { Home, Dtemp, Wtemp, Mtemp, Statebor1, manageUser, updateUser, insertUser, deleteUser } from './components'

const routes = [
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
  },
  {
    'path':'/manageUser',
    'component': manageUser
  },
  {
    'path':'/updateUser',
    'component': updateUser
  },
  {
    'path':'/insertUser',
    'component': insertUser
  },
  {
    'path':'/deleteUser',
    'component': deleteUser
  }
];

export default routes;
