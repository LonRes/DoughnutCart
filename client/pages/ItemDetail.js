import React from 'react'
import RenderProp from 'render-prop'
import {withRouter} from 'react-router'
import Store from '../Store'
import Header from '../components/Header'
import Content from '../components/Content'
import Item from '../components/Item'

class ItemDetailModel extends RenderProp {
  state = {
    id: undefined,
    description: undefined,
    price: undefined,
    quantity: 0
  }
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update)
  }
  didUpdate() {
    const id = this.props.match.params.item
    if (id !== this.state.id) this.update()
  }
  update() {
    const id = this.props.match.params.item
    const {doughnuts, basket} = Store.getState()
    const basketItem = basket.find(item => item.id === id)
    const item = {
      ...doughnuts[id],
      quantity: basketItem ? basketItem.quantity : 0
    }
    this.setState(item)
  }
}

class ItemDetailView extends React.Component {
  render() {
    const {id, name, description, price, media, quantity = 0} = this.props
    return (
      <div>
        <Header title={name} />
        <Content>
          <Item
            id={id}
            description={description}
            price={price}
            media={media}
            quantity={quantity}
          />
        </Content>
      </div>
    )
  }
}

const ItemDetailModelWithRouter = withRouter(ItemDetailModel)

const ItemDetail = () => (
  <ItemDetailModelWithRouter
    render={({id, name, description, price, media, quantity}) => (
      <ItemDetailView
        id={id}
        name={name}
        description={description}
        price={price}
        media={media}
        quantity={quantity}
      />
    )}
  />
)

export default ItemDetail
