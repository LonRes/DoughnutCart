import request from './request'
import Store from './Store'

const loadDoughnuts = async startFrom => {
  Store.dispatch({type: 'LOAD_DOUGHNUTS'})
  let page = startFrom || 0
  let failedToComplete = false
  const doughnuts = {}
  while (page != null) {
    const response = await request(`/doughnuts/page/${page}`)
    const {data, next, error = false} = await response.json()

    if (error) {
      failedToComplete = error
      break
    }

    for (const doughnut of data) {
      doughnut.media = '/' + doughnut.url
      delete doughnut.url
      doughnuts[doughnut.id] = doughnut
    }
    page = next
  }
  Store.dispatch({
    type: 'LOAD_DOUGHNUTS_FINISHED',
    payload: {doughnuts, failedToComplete}
  })
  return Object.keys(doughnuts).length
}

export default loadDoughnuts
