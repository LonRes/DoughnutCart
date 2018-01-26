import React from 'react'
import Header from '../components/Header'
import Item from '../components/Item'

class ItemDetailView extends React.Component {
  render() {
    const {id, description, price, quantity = 0} = this.props
    return (
      <div>
        <Header title="Item 1" />
        <Item
          id={id}
          description={description}
          price={price}
          quantity={quantity}
        />
      </div>
    )
  }
}

const ItemDetail = ItemDetailView

export default ItemDetail
