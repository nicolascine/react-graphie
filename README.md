# (WIP) react-graphie

> React graphs with D3

[![NPM](https://img.shields.io/npm/v/react-graphie.svg)](https://www.npmjs.com/package/react-graphie) [![Build Status](https://travis-ci.com/nicolascine/react-graphie.svg?branch=master)](https://travis-ci.com/nicolascine/react-graphie) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-graphie
```

## Usage

```tsx
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

const options = {
  width: 100,
  height: 100
};

export default class App extends Component {
  render() {
    return <Graph dataset={dataset} options={options} />;
  }
}
```

## License

MIT © [nicolascine](https://github.com/nicolascine)
