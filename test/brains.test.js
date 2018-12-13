import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import brains from '../src/brains'

beforeAll(() => {
  configure({ adapter: new Adapter() });
})

test('action updates the state which updates a component', () => {
  const actor = brains(
    { count: 0 },
    { upCount: (state, payload) => ({ count: state.count + 1 }) },
    React
  )

  const Counter = actor(
    ({ count, action }) => (<div id="counter" onClick={action}>{count}</div>),
    state => ({ count: state.count }),
    action => ({ action: () => action({ type: 'upCount', payload: null }) })
  )

  const app = mount(<Counter/>)

  expect(app.find('#counter').text()).toEqual('0')

  app.find('#counter').simulate('click')

  expect(app.find('#counter').text()).toEqual('1')
})

test('action updates the state which updates multiple components', () => {
  const actor = brains(
    { count: 0 },
    { upCount: (state, payload) => ({ count: state.count + 1 }) },
    React
  )

  const Counter = actor(
    ({ count, action }) => (<div id="counter" onClick={action}>{count}</div>),
    state => ({ count: state.count }),
    action => ({ action: () => action({ type: 'upCount', payload: null }) })
  )

  const numberWord = {
    0: 'zero',
    1: 'one'
  }

  const CounterWorded = actor(
    ({ count, action }) => (
      <div id="counter-worded">{numberWord[count]}</div>
    ),
    state => ({ count: state.count })
  )

  const App = () => (
    <div>
      <Counter/>
      <CounterWorded/>
    </div>
  )

  const app = mount(<App/>)

  expect(app.find('#counter').text()).toEqual('0')
  expect(app.find('#counter-worded').text()).toEqual(numberWord[0])

  app.find('#counter').simulate('click')

  expect(app.find('#counter').text()).toEqual('1')
  expect(app.find('#counter-worded').text()).toEqual(numberWord[1])
})

test('component props get propagated through the actor', () => {
  const actor = brains(
    { count: 0 },
    { upCount: (state, payload) => ({ count: state.count + 1 }) },
    React
  )

  const Counter = actor(
    ({ plainCount, action }) => (
      <div id="counter" onClick={action}>{plainCount}</div>
    ),
    state => ({ count: state.count }),
    action => ({ action: () => action({ type: 'upCount', payload: null }) })
  )

  const App = () => (
    <div>
      <Counter plainCount={777}/>
    </div>
  )

  const app = mount(<App/>)

  expect(app.find('#counter').text()).toEqual('777')

  app.find('#counter').simulate('click')

  expect(app.find('#counter').text()).toEqual('777')
})
