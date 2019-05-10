import React, { Component, Fragment } from "react";

import Graph from "react-graphie";

export default class App extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json"
    )
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      });
  }
  render() {
    const { data } = this.state;
    return <Fragment>{data && <Graph data={data} />}</Fragment>;
  }
}
