import test from 'ava'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {BrowserRouter as Router} from 'react-router-dom'
import React from 'react'
import Basket from './Basket'
import ItemDetail from './ItemDetail'
import Products from './Products'

Enzyme.configure({adapter: new Adapter()})

test('Basket - renders without crashing', t => {
  mount(
    <Router>
      <Basket />
    </Router>
  )
  t.pass()
})

test('ItemDetail - renders without crashing', t => {
  mount(
    <Router>
      <ItemDetail />
    </Router>
  )
  t.pass()
})

test('Products - renders without crashing', t => {
  mount(
    <Router>
      <Products />
    </Router>
  )
  t.pass()
})
