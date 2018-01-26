import React from 'react'
import RenderProp from 'render-prop'
import {withRouter} from 'react-router'
import Store from '../Store'
import Header from '../components/Header'
import Content from '../components/Content'
import Item from '../components/Item'
import ReloadInterface from '../components/ReloadInterface'

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
  didUpdate(prevProps) {
    const prevId = prevProps.match.params.item
    const id = this.props.match.params.item
    if (id !== prevId) this.update()
  }
  update() {
    const id = this.props.match.params.item
    const {doughnuts, basket} = Store.getState()
    const basketItem = basket.find(item => item.id === id)
    const item = {
      ...doughnuts[id],
      loaded: !!doughnuts[id],
      quantity: basketItem ? basketItem.quantity : 0
    }
    this.setState(item)
  }
}

class ItemDetailView extends React.Component {
  render() {
    const {
      id,
      name,
      description,
      price,
      media,
      quantity = 0,
      loaded
    } = this.props

    const doughnutEmoji = (
      <span role="img" aria-label="a very handsome-looking doughnut">
        🍩
      </span>
    )

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
          <ReloadInterface
            failed={!loaded}
            text={{
              active: <span>Loading... {doughnutEmoji}</span>,
              'active+failed': (
                <span>Giving it another try! ... {doughnutEmoji}</span>
              ),
              failed: "Hmm... we couldn't load the doughnut",
              action: 'Try again?'
            }}
          />
        </Content>
      </div>
    )
  }
}

const ItemDetailModelWithRouter = withRouter(ItemDetailModel)

const ItemDetail = () => (
  <ItemDetailModelWithRouter
    render={({id, name, description, price, media, quantity, loaded}) => (
      <ItemDetailView
        id={id}
        name={name}
        description={description}
        price={price}
        media={media}
        quantity={quantity}
        loaded={loaded}
      />
    )}
  />
)

export {ItemDetailModel, ItemDetailView}
export default ItemDetail
