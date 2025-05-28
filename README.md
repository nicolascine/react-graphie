# React Graphie

> A modern React library for creating beautiful and interactive graph visualizations using D3.js

[![NPM](https://img.shields.io/npm/v/react-graphie.svg)](https://www.npmjs.com/package/react-graphie)
[![Build Status](https://travis-ci.com/nicolascine/react-graphie.svg?branch=master)](https://travis-ci.com/nicolascine/react-graphie)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React Graphie is a lightweight and flexible library for creating interactive graph visualizations in React applications. Built on top of D3.js, it provides a simple and intuitive API for rendering complex network graphs with customizable styling and interactions.

## Features

- 🎯 Simple and intuitive API
- 🎨 Fully customizable styling
- 🔄 Interactive graph manipulation
- 📦 Lightweight and tree-shakeable
- 🎮 Built-in drag and zoom support
- 📱 Responsive design

## Installation

```bash
npm install react-graphie
# or
yarn add react-graphie
```

## Quick Start

```tsx
import React from 'react';
import Graph from 'react-graphie';

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
  width: 800,
  height: 600,
  nodeRadius: 5,
  linkDistance: 100
};

function App() {
  return <Graph dataset={dataset} options={options} />;
}
```

## Documentation

For detailed documentation and examples, please visit our [documentation site](https://github.com/nicolascine/react-graphie/wiki).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Nicolás Silva](https://github.com/nicolascine)

---

*This project was originally created in 2017 and has been modernized to meet current web development standards while maintaining its core functionality.*
