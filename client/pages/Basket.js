import React from 'react'
import RenderProp from 'render-prop'
import Store from '../Store'
import Header from '../components/Header'
import Content from '../components/Content'
import Item from '../components/Item'
import ReloadInterface from '../components/ReloadInterface'

class BasketModel extends RenderProp {
  state = {basket: []}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update)
  }
  update() {
    let {basket, doughnuts} = Store.getState()

    let failedToLoad = false
    const basketAndSink = []
    for (const {id, quantity} of basket) {
      if (doughnuts[id]) {
        basketAndSink.push({...doughnuts[id], quantity})
      } else {
        failedToLoad = true
      }
    }

    this.setState({basket: basketAndSink, failedToLoad})
  }
}

class BasketView extends React.Component {
  render() {
    const {basket, failedToLoad} = this.props
    const total = basket.reduce((pv, v) => pv + v.price * v.quantity, 0)
    return (
      <div>
        <Header title="Basket" />
        <Content>
          <ul>
            {basket.map(({id, name, description, quantity = 0}) => (
              <li key={id}>
                <Item
                  id={id}
                  name={name}
                  description={description}
                  quantity={quantity}
                />
              </li>
            ))}
          </ul>
          <ReloadInterface
            failed={failedToLoad}
            text={{
              active: <div>Loading items...</div>,
              failed: 'Failed to load all items in basket',
              action: 'Try again?'
            }}
          />
          <span>
            Total: <strong>£{total.toFixed(2)}</strong>
          </span>
        </Content>
      </div>
    )
  }
}

const Basket = () => (
  <BasketModel
    render={({basket, failedToLoad}) => (
      <BasketView basket={basket} failedToLoad={failedToLoad} />
    )}
  />
)

export default Basket
