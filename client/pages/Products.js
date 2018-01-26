import React from 'react'
import RenderProp from 'render-prop'
import Store from '../Store'
import Header from '../components/Header'
import Item from '../components/Item'

class ProductsModel extends RenderProp {
  state = {products: []}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update, 'doughnuts.{}.{}')
  }
  update() {
    const {doughnuts} = Store.getState()
    this.setState({products: doughnuts})
  }
}

class ProductsView extends React.Component {
  render() {
    const {products} = this.props
    return (
      <div>
        <Header title="Products" />
        <ul>
          {products.map(({id, name, description, price}) => (
            <li key={id}>
              <Item
                id={id}
                name={name}
                description={description}
                price={price}
                withLink
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const Products = () => (
  <ProductsModel
    render={({products}) => <ProductsView products={products} />}
  />
)

export default Products
