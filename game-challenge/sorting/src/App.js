import React, { Component } from "react"

import { ThemeProvider } from "styled-components"
import SortingGame from "./sortingGame"

const theme = {
  gapHeight: 5,
  borderRadius: 15
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SortingGame data={ this.props.data }/>
      </ThemeProvider>
    );
  }
}

export default App;
