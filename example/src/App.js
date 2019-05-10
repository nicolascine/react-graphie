import React, { Component } from "react";
import Graph from "react-graphie";

const data = {
  nodes: [
    { id: "Myriel", group: 1 },
    { id: "Napoleon", group: 2 },
    { id: "Mlle.Baptistine", group: 3 },
    { id: "Mme.Magloire", group: 4 }
  ],
  links: [
    { source: "Napoleon", target: "Myriel" },
    { source: "Mlle.Baptistine", target: "Mlle.Baptistine" },
    { source: "Mme.Magloire", target: "Mlle.Baptistine" },
    { source: "Mme.Magloire", target: "Mlle.Baptistine" }
  ]
};

export default class App extends Component {
  render() {
    const options = {
      width: 500,
      height: 500
    };

    return (
      <div
        style={{
          border: "1px solid gray",
          width: "500px",
          height: "500px",
          display: "block",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "150px"
        }}
      >
        <Graph data={data} options={options} />
      </div>
    );
  }
}
