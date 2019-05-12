import React, { Component } from "react";
import Graph from "react-graphie";

const dataset = {
  nodes: [
    { id: "Myriel", group: 1 },
    { id: "Napoleon", group: 2 },
    { id: "Mlle.Baptistine", group: 3 },
    { id: "Mme.Magloire", group: 4 }
  ],
  links: [
    { source: "Napoleon", target: "Myriel" },
    { source: "Mlle.Baptistine", target: "Myriel" },
    { source: "Mme.Magloire", target: "Myriel" },
    { source: "Mme.Magloire", target: "Mlle.Baptistine" }
  ]
};

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Graph data={dataset} />
      </div>
    );
  }
}
