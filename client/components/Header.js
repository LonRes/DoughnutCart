import React from 'react'
import {Link} from 'react-router-dom'
import RenderProp from 'render-prop'
import Store from '../Store'

class HeaderModel extends RenderProp {
  state = {basket: 0}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update, 'basket.length')
  }
  update() {
    const {basket} = Store.getState()
    this.setState({basket: basket.length})
  }
}

class HeaderView extends React.Component {
  render() {
    const {title, basket} = this.props

    return (
      <header>
        {title}
        <Link to="/basket">Basket (${basket})</Link>
      </header>
    )
  }
}

const Header = ({title}) => (
  <HeaderModel
    render={({basket}) => <HeaderView title={title} basket={basket} />}
  />
)

export default Header
