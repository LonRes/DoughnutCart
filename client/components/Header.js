import React from 'react'
import {Link} from 'react-router-dom'
import RenderProp from 'render-prop'
import styled from 'styled-components'
import Store from '../Store'

class HeaderModel extends RenderProp {
  state = {basket: 0}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update, 'basket.[].quantity')
  }
  update() {
    const {basket} = Store.getState()
    const itemCount = basket.reduce((pv, v) => pv + v.quantity, 0)
    this.setState({basket: itemCount})
  }
}

// ideally we'd use flex-box here, however the "home" emoji is iledgeable at
// 1rem. increasing the font size disrupts the layout & necessitates absolute
// positioning

const Navigation = styled.nav`
  position: relative;
  height: 1.5rem;
`

const HomeLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  line-height: 2rem;
  position: absolute;
  top: 0;
`

const BasketLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
`

const Title = styled.h1`
  text-align: center;
`

class HeaderView extends React.Component {
  render() {
    const {title, basket} = this.props

    return (
      <header>
        <Navigation>
          <HomeLink to="/">
            <span role="img" aria-label="home">
              🏠
            </span>
          </HomeLink>
          <BasketLink to="/basket">Basket ({basket})</BasketLink>
        </Navigation>
        <Title>{title}</Title>
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
