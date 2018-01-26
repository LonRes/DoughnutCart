import React from 'react'
import RenderProp from 'render-prop'
import Store from '../Store'
import Header from '../components/Header'
import Content from '../components/Content'
import Item from '../components/Item'
import ReloadInterface from '../components/ReloadInterface'

class ProductsModel extends RenderProp {
  state = {products: []}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update, ['doughnuts.{}.{}'])
  }
  update() {
    const {doughnuts} = Store.getState()
    const products = Object.values(doughnuts).sort((a, b) => a.price - b.price)
    this.setState({products})
  }
}

class ProductsView extends React.Component {
  render() {
    const {products} = this.props

    return (
      <div>
        <Header title="Products" />
        <Content>
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
          <ReloadInterface
            text={{
              active: (
                <span>
                  Loading more delicious doughnuts...{' '}
                  <span
                    role="img"
                    aria-label="a very handsome-looking doughnut"
                  >
                    🍩
                  </span>
                </span>
              ),
              failed: 'Failed to load all the doughnuts!',
              action: 'Try again?'
            }}
          />
        </Content>
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
