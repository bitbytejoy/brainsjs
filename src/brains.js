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
        this.listenId = null
      }

      componentDidMount() {
        this.listenId = listen(() => this.forceUpdate())
        // If the child triggers an action during componentDidMount
        // we need to make sure it gets the updates back
        // Because the parent triggers componentDidMount after the child
        this.forceUpdate()
      }

      componentWillUnmount() {
        ignore(this.listenId)
      }

      render() {
        const props = stateMapping(state)
        return <Component {...stateMapping(state)} {...actionMapping(action)}/>
      }
    }
  )
}

if (window) window.brains = brains
export default brains
