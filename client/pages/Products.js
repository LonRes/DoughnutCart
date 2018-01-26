import React from 'react'
import RenderProp from 'render-prop'
import loadDoughnuts from '../loadDoughnuts'
import Store from '../Store'
import Header from '../components/Header'
import Content from '../components/Content'
import Item from '../components/Item'

class ProductsModel extends RenderProp {
  state = {products: []}
  didMount() {
    this.update = this.update.bind(this)
    this.subscribeTo(Store, this.update, [
      'doughnuts.{}.{}',
      'failedToComplete',
      'loading'
    ])
  }
  update() {
    const {doughnuts, failedToComplete, loading} = Store.getState()
    const products = Object.values(doughnuts).sort((a, b) => a.price - b.price)
    this.setState({products, failedToComplete, loading})
  }
}

class ProductsView extends React.Component {
  render() {
    const {products, failedToComplete, loading} = this.props

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
          {loading ? (
            <span>
              Loading more delicious doughnuts...{' '}
              <span role="img" aria-label="a very handsome-looking doughnut">
                🍩
              </span>
            </span>
          ) : failedToComplete ? (
            <div>
              <h2>Failed to load all the doughnuts!</h2>
              <button onClick={() => loadDoughnuts(products.length)}>
                Try again?
              </button>
            </div>
          ) : null}
        </Content>
      </div>
    )
  }
}

const Products = () => (
  <ProductsModel
    render={({products, failedToComplete, loading}) => (
      <ProductsView
        products={products}
        failedToComplete={failedToComplete}
        loading={loading}
      />
    )}
  />
)

export default Products
