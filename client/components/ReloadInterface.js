import React from 'react'
import RenderProp from 'render-prop'
import loadDoughnuts from '../loadDoughnuts'
import Store from '../Store'

class ReloadInterfaceModel extends RenderProp {
  state = {
    page: 0,
    failedToComplete: undefined,
    loading: undefined
  }
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
    const page = Object.keys(doughnuts).length
    this.setState({page, failedToComplete, loading})
  }
}

// it's important for error-related interfaces to have configurable text: a
// light-hearted tone might be appropiate generally but could really frustrate
// users if the error pertains to their money (eg, in the basket)
class ReloadInterfaceView extends React.Component {
  render() {
    const {page, failedToComplete, loading, text} = this.props

    // TODO: this doesn't work in practice bc failedToLoad is always true by the
    // time users see this button, we should instead track whether the button
    // has been clicked before (local instead of global state)
    const loadingText = failedToComplete
      ? text['active+failed'] || text.active
      : text.active

    return loading ? (
      loadingText
    ) : failedToComplete ? (
      <div>
        <h2>{text.failed}</h2>
        <button onClick={() => loadDoughnuts(page)}>Try again?</button>
      </div>
    ) : null
  }
}

// text (all strings) = .active, .failed, .action
// failed (optional bool, by default indicates whether *every* doughnut has loaded)
const ReloadInterface = ({text, failed}) => (
  <ReloadInterfaceModel
    render={({page, failedToComplete, loading}) => (
      <ReloadInterfaceView
        text={text}
        page={page}
        failedToComplete={failed != null ? failed : failedToComplete}
        loading={loading}
      />
    )}
  />
)

export default ReloadInterface
