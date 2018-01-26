import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Store from './Store'
import Basket from './pages/Basket'
import ItemDetail from './pages/ItemDetail'
import Products from './pages/Products'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/basket" component={Basket} />
          <Route path="/item/:item" component={ItemDetail} />
          <Route component={Products} />
        </Switch>
      </Router>
    )
  }
}

const loadDoughnuts = async () => {
  let next = '0'
  const doughnuts = {}
  while (next != null) {
    const response = await fetch(`/doughnuts/${next}`)
    const doughnut = await response.json()
    doughnut.media = doughnut.url
    delete doughnut.url
    doughnuts[doughnut.id] = doughnut
    next = doughnut.next
  }
  return doughnuts
}

const main = async () => {
  const doughnuts = await loadDoughnuts()
  Store.dispatch({type: 'LOAD_DOUGHNUTS', payload: doughnuts})
  ReactDOM.render(<App />, document.getElementById('root'))
}

main()
