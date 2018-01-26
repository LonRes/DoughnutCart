import React from 'react'
import RenderProp from 'render-prop'
import Store from '../Store'
import Header from '../components/Header'
import Item from '../components/Item'

class BasketModel extends RenderProp {
  state = {basket: []}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update)
  }
  update() {
    let {basket, doughnuts} = Store.getState()

    const basketAndSink = []
    for (const {id, quantity} in basket) {
      basketAndSink.push({...doughnuts[id], quantity})
    }

    this.setState({basket: basketAndSink})
  }
}

class BasketView extends React.Component {
  render() {
    const {basket} = this.props
    const total = basket.reduce((pv, v) => pv + v, 0)
    return (
      <div>
        <Header title="Basket" />
        <ul>
          {basket.map(({id, name, description, quantity = 0}) => (
            <li>
              <Item
                key={id}
                id={id}
                name={name}
                description={description}
                quantity={quantity}
              />
            </li>
          ))}
        </ul>,
        <span>
          Total: <strong>{total}</strong>
        </span>
      </div>
    )
  }
}

const Basket = () => (
  <BasketModel render={({basket}) => <BasketView basket={basket} />} />
)

export default Basket
