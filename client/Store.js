import {createStore} from 'redux'

const initialState = Object.assign(
  {
    // by id, each doughnut has .id, .name, .description, .price, .media
    doughnuts: {},
    // .quantity, .id
    basket: [],
    loading: false,
    failedToComplete: false
  },
  JSON.parse(window.sessionStorage.getItem('basket') || '{}')
)

// sensible alternatives include Immutable, custom helpers, and lots of "..."s.
const veryLazyClone = obj => JSON.parse(JSON.stringify(obj))

const doughnutReducer = (state = initialState, action) => {
  state = veryLazyClone(state)
  switch (action.type) {
    case 'LOAD_DOUGHNUTS':
      state.loading = true
      return state
    case 'LOAD_DOUGHNUTS_FINISHED':
      const {doughnuts, failedToComplete} = action.payload
      Object.assign(state.doughnuts, doughnuts)
      state.loading = false
      state.failedToComplete = !!failedToComplete
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
  const {basket} = DoughnutStore.getState()
  const stateToCache = {basket}
  window.sessionStorage.setItem('basket', JSON.stringify(stateToCache))
}

DoughnutStore.subscribe(cacheState)

export default DoughnutStore
