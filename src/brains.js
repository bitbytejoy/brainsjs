const brains = (s, a, React) => {
  let state = s
  let actions = a 
  const callbacks = []

  const listen = callback => callbacks.push(callback) - 1

  const ignore = i => callbacks.splice(i, 1)

  const action = e => {
    const action = actions[e.type]
    state = action ? action(state, e.payload) : state
    for (let i = 0; i < callbacks.length; i++) callbacks[i](state)
  }

  return (
    Component,
    stateMapping = s => ({ state: s }),
    actionMapping = a => ({ action: a })
  ) => (
    class extends React.Component {
      constructor() {
        super(...arguments)
        this.state = state
        this.listenId = null
      }

      componentDidMount() {
        this.listenId = listen(() => this.setState(state))
      }

      componentWillUnmount() {
        ignore(this.listenId)
      }

      render() {
        const props = stateMapping(state)
        return (
          <Component
            {...this.props}
            {...stateMapping(state)}
            {...actionMapping(action)}
          />
        )
      }
    }
  )
}

if (window) window.brains = brains
export default brains
