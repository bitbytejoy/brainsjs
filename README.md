# Brains.js

Brains.js is a simple State manager for React. It was inspired by Redux.js.

# Getting started

    npm install --save brainsjs

There is no simpler application than a click counter application to introduce
the usage of this library.

    import React from 'react'
    import ReactDOM from 'react-dom'
    import brains from 'brainsjs'
    // or
    // const brains = require('brainsjs').default

    // state is an object containing the whole app state
    const state = { count: 0 }

    // actions are functions doing the logic of the app
    // every action receives the state and the payload sent to it
    // every action must return an updated state
    // it is prefered not to modify the state properties
    // instead it is wise to keep the state object immutable
    const actions = {
      count: (state, payload) => ({
        count: state.count + payload.amount
      })
    }

    // brains returns a higher order component actor
    // brains is initialized with the state and actions objects
    // the React dependency needs to be provided also
    const actor = brains(state, actions, React)

    // actor wraps a React component in a higher order component
    // the higher order components subscribes itself to the state changes
    // the actor can receive a state mapping and action mapping
    // a state mapping maps the state to the properties of the component
    // an action mapping maps the action callback to the component properties
    // the default state mapping maps the state to the state property
    // the default action mapping maps the action to the action property

    // explanation
    // the state.count property becomes the count property of the Counter
    const stateMapping = state => ({ count: state.count })

    // action is a function allowing a component to trigger action execution
    // the type property of action is the name of the actions key above
    // the payload of the action is custom data to be sent to the action
    const actionMapping = action => ({
      action: () => action({ type: 'count', payload: { amount: 1 } })
    })

    // now Counter is a reactive component
    // it uses the action to trigger actions of our application
    // these actions update the state
    // after the state update stateMapping and actionMapping get executed
    // the new properties based on the mappings are propagated to the Counter
    const Counter = actor(
      ({ count, action }) => (<div onClick={action}>{count}</div>),
      stateMapping,
      actionMapping
    )

    // parent components do not have to know anything about the state
    // unless they need to update with the state updates
    const App = () => (
      <div>
        <Counter/>
      </div>
    )

    ReactDOM.render(<App/>, document.getElementById('app'))

