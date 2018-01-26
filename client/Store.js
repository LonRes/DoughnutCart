import {createStore} from 'redux'

const initialState = Object.assign(
  {
    // by id, each doughnut has .id, .name, .description, .price, .media
    doughnuts: {},
    // .quantity, .id
    basket: []
  },
  JSON.parse(sessionStorage.getItem('doughnuts') || '{}')
)

// sensible alternatives include Immutable, custom helpers, and lots of "..."s.
const veryLazyClone = obj => JSON.parse(JSON.stringify(obj))

const doughnutReducer = (state = initialState, action) => {
  state = veryLazyClone(state)
  switch (action.type) {
    case 'LOAD_DOUGHNUTS':
      state.doughnuts = action.payload
      return state
    case 'UPDATE_QUANTITY':
      const {id, value: quantity} = action.payload

      let exists
      const nextBasket = []
      for (const item of state.basket) {
        // setting item quantity to 0 removes it from the basket
        if (item.id === id && quantity === 0) continue
        // update the matching item
        if (item.id === id) {
          exists = true
          item.quantity = quantity
        }
        nextBasket.push(item)
      }
      // new items appear at bottom of shopping basket
      if (!exists && quantity) nextBasket.push({id, quantity})

      state.basket = nextBasket
      return state
    default:
      return state
  }
}

// Naming this "DoughnutStore" instead of "Store" makes it easier to identify in
// debugging logs. For instance, "Store" could be confused with redux internals.
const DoughnutStore = createStore(doughnutReducer)

// Middleware can add complexity, and it's often worth looking for a simpler way
// to do something first.
const cacheState = () => {
  const state = DoughnutStore.getState()
  sessionStorage.setItem('doughnuts', JSON.stringify(state))
}

DoughnutStore.subscribe(cacheState)

export default DoughnutStore
