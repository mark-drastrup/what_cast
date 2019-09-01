import React, { Component } from 'react';
import Wrapper from "./components/Wrapper"
import { Provider } from 'react-redux'
import store from './store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper />
      </Provider>
    )
  }
}