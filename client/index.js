import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {injectGlobal} from 'styled-components'
import loadDoughnuts from './loadDoughnuts'
import Store from './Store'
import Basket from './pages/Basket'
import ItemDetail from './pages/ItemDetail'
import Products from './pages/Products'

injectGlobal`
  body {
    background: #fafafa;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: 'Merriweather', serif;
    font-size: 2rem;
  }

  h2 {
    font-family: 'Merriweather', serif;
    font-size: 1.2rem;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }
`

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

const main = async () => {
  loadDoughnuts()
  ReactDOM.render(<App />, document.getElementById('root'))
}

main()
