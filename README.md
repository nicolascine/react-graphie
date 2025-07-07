<div align="center">
  <h1>🎯 React Graphie</h1>
  <p><strong>A modern, lightweight React library for creating beautiful and interactive graph visualizations</strong></p>
  
  <p>
    <img src="https://img.shields.io/npm/v/react-graphie?style=for-the-badge&color=blue" alt="npm version" />
    <img src="https://img.shields.io/npm/dm/react-graphie?style=for-the-badge&color=green" alt="downloads" />
    <img src="https://img.shields.io/github/stars/nicolascine/react-graphie?style=for-the-badge&color=yellow" alt="stars" />
    <img src="https://img.shields.io/bundlephobia/minzip/react-graphie?style=for-the-badge&color=purple" alt="bundle size" />
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react" alt="React 18+" />
    <img src="https://img.shields.io/badge/D3-v7-F7931E?style=for-the-badge&logo=d3.js" alt="D3 v7" />
    <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript 5+" />
    <img src="https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite" alt="Vite 5+" />
  </p>
  
  <p>
    <strong>📊 Born in 2017, Reborn in 2025</strong><br>
    <em>7+ years of evolution in graph visualization</em>
  </p>
</div>

---

## ✨ What Makes React Graphie Special

React Graphie combines the **power of D3.js v7** with the **simplicity of React hooks** to create stunning, interactive graph visualizations that just work. Born from the need for a simple yet powerful graph library, it has evolved over **7+ years** to become the go-to solution for modern React applications.

### 🚀 **Key Features**

- **🎯 Modern React**: Built with React 18+ hooks and functional components
- **🎨 Beautiful by Default**: Stunning visualizations with minimal configuration
- **🔧 Highly Customizable**: From simple graphs to complex interactive networks
- **📱 Responsive**: Works perfectly on mobile, tablet, and desktop
- **⚡ Performance**: Optimized for large datasets with smooth animations
- **🎭 Interactive**: Zoom, pan, drag, click, hover - everything you need
- **🌙 Theme Support**: Light and dark themes out of the box
- **📦 Tiny Bundle**: Tree-shakeable and optimized for production
- **🎪 TypeScript**: Full type safety and excellent developer experience

---

## 🎬 Quick Demo

```tsx
import React from 'react'
import { Graph } from 'react-graphie'

const networkData = {
  nodes: [
    { id: "React", group: 1, size: 20 },
    { id: "D3", group: 2, size: 15 },
    { id: "TypeScript", group: 3, size: 18 },
    { id: "Vite", group: 4, size: 12 }
  ],
  links: [
    { source: "React", target: "D3", weight: 2 },
    { source: "React", target: "TypeScript", weight: 3 },
    { source: "TypeScript", target: "Vite", weight: 1 }
  ]
}

export default function MyApp() {
  return (
    <Graph 
      data={networkData}
      options={{
        width: 800,
        height: 600,
        theme: 'dark',
        animation: true,
        enableZoom: true,
        nodeRadius: (node) => node.size,
        onNodeClick: (node) => console.log('Clicked:', node.id)
      }}
    />
  )
}
```

---

## 📦 Installation

```bash
# npm
npm install react-graphie

# yarn
yarn add react-graphie

# pnpm
pnpm add react-graphie
```

### Requirements

- React 18+
- Modern browser with ES2022 support

---

## 🎯 Use Cases

### 🌐 **Social Networks**
Visualize connections between users, friends, followers, and communities.

### 🧠 **Knowledge Graphs**
Display relationships between concepts, ideas, and data points.

### 📈 **Organizational Charts**
Show company structure, team relationships, and reporting hierarchies.

### 🔗 **Dependency Graphs**
Visualize module dependencies, package relationships, and system architecture.

### 🧬 **Scientific Data**
Display molecular structures, neural networks, and research relationships.

### 🎮 **Game Development**
Create interactive maps, skill trees, and game state visualizations.

---

## 🎨 Advanced Examples

### 🌟 **Interactive Network with Custom Styling**

```tsx
import React, { useState } from 'react'
import { Graph, GraphNode } from 'react-graphie'

const AdvancedNetwork = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  
  const socialNetwork = {
    nodes: [
      { id: "Alice", group: 1, size: 25, label: "Alice (CEO)" },
      { id: "Bob", group: 2, size: 20, label: "Bob (CTO)" },
      { id: "Charlie", group: 2, size: 18, label: "Charlie (Dev)" },
      { id: "Diana", group: 3, size: 22, label: "Diana (Design)" }
    ],
    links: [
      { source: "Alice", target: "Bob", weight: 3 },
      { source: "Bob", target: "Charlie", weight: 2 },
      { source: "Alice", target: "Diana", weight: 2 }
    ]
  }

  return (
    <div>
      <Graph 
        data={socialNetwork}
        options={{
          width: 900,
          height: 600,
          theme: 'light',
          nodeRadius: (node) => node.size,
          chargeStrength: (node) => -node.size * 15,
          linkDistance: 150,
          onNodeClick: (node) => setSelectedNode(node),
          onNodeHover: (node) => {
            if (node) {
              document.body.style.cursor = 'pointer'
            } else {
              document.body.style.cursor = 'default'
            }
          }
        }}
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      />
      
      {selectedNode && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Selected: {selectedNode.label}</h3>
          <p>ID: {selectedNode.id}</p>
          <p>Group: {selectedNode.group}</p>
          <p>Size: {selectedNode.size}</p>
        </div>
      )}
    </div>
  )
}
```

### 🌙 **Dark Mode with Custom Colors**

```tsx
const DarkModeGraph = () => {
  const data = {
    nodes: [
      { id: "Core", group: 1, color: "#FF6B6B" },
      { id: "API", group: 2, color: "#4ECDC4" },
      { id: "UI", group: 3, color: "#45B7D1" },
      { id: "Database", group: 4, color: "#F9CA24" }
    ],
    links: [
      { source: "Core", target: "API", color: "#FF6B6B" },
      { source: "API", target: "UI", color: "#4ECDC4" },
      { source: "Core", target: "Database", color: "#F9CA24" }
    ]
  }

  return (
    <Graph 
      data={data}
      options={{
        width: 800,
        height: 500,
        theme: 'dark',
        animation: true,
        enableZoom: true,
        nodeRadius: 15,
        colorScheme: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F9CA24", "#A55EEA"]
      }}
    />
  )
}
```

---

## 🔧 API Reference

### `<Graph>` Component Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `GraphData` | **Required.** The graph data with nodes and links |
| `options` | `GraphOptions` | Configuration options for the graph |
| `className` | `string` | CSS class for the container |
| `style` | `React.CSSProperties` | Inline styles for the container |

### `GraphData` Interface

```typescript
interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

interface GraphNode {
  id: string
  group?: number
  label?: string
  size?: number
  color?: string
  // ... any additional properties
}

interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  weight?: number
  color?: string
  // ... any additional properties
}
```

### `GraphOptions` Interface

```typescript
interface GraphOptions {
  // Dimensions
  width?: number                    // Default: 800
  height?: number                   // Default: 600
  
  // Visual
  nodeRadius?: number | ((node: GraphNode) => number)      // Default: 8
  theme?: 'light' | 'dark'         // Default: 'light'
  colorScheme?: string[]            // Default: D3 category10
  animation?: boolean               // Default: true
  
  // Physics
  linkDistance?: number | ((link: GraphLink) => number)    // Default: 100
  linkStrength?: number | ((link: GraphLink) => number)    // Default: 0.1
  chargeStrength?: number | ((node: GraphNode) => number)  // Default: -300
  centerStrength?: number           // Default: 0.1
  
  // Interaction
  enableZoom?: boolean              // Default: true
  enableDrag?: boolean              // Default: true
  enableTooltip?: boolean           // Default: true
  
  // Events
  onNodeClick?: (node: GraphNode, event: MouseEvent) => void
  onNodeHover?: (node: GraphNode | null, event: MouseEvent) => void
  onLinkClick?: (link: GraphLink, event: MouseEvent) => void
}
```

---

## 🎓 Migration Guide

### From v1.x to v2.x

React Graphie v2 introduces breaking changes for a better developer experience:

**Old API (v1.x)**:
```tsx
<Graph dataset={data} options={options} />
```

**New API (v2.x)**:
```tsx
<Graph data={data} options={options} />
```

**Major Changes**:
- ✅ **Modern React**: Class components → Functional components with hooks
- ✅ **D3 v7**: Updated to latest D3 APIs
- ✅ **Better TypeScript**: Improved type definitions
- ✅ **New Features**: Zoom, custom themes, animations
- ✅ **Better Performance**: Optimized rendering and memory usage

---

## 🤝 Contributing

We welcome contributions! This project has been evolving for **7+ years** and we're excited to see what the community builds.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/nicolascine/react-graphie.git
cd react-graphie

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm run test

# Build library
npm run build

# Run example
npm run example:dev
```

### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 🏆 Inspiration & Ecosystem

### Similar Libraries
- [**react-vis**](https://github.com/uber/react-vis) - Uber's visualization library
- [**visx**](https://github.com/airbnb/visx) - Airbnb's visualization toolkit
- [**recharts**](https://github.com/recharts/recharts) - Popular charting library

### What Makes React Graphie Different
- **🎯 Specialized**: 100% focused on graph/network visualizations
- **🎨 Beautiful**: Stunning visuals with minimal configuration
- **🚀 Modern**: Built with latest React and D3 patterns
- **📦 Lightweight**: Smaller bundle size, better performance
- **🎪 Simple**: Easy to learn, powerful when needed

---

## 📈 Roadmap

### 🚀 **v2.1 (Next)**
- [ ] Storybook documentation
- [ ] More layout algorithms (hierarchical, circular)
- [ ] Enhanced animations and transitions
- [ ] Plugin system for custom layouts

### 🎯 **v2.2 (Future)**
- [ ] WebGL renderer for massive graphs
- [ ] Virtual scrolling for large datasets
- [ ] Export functionality (PNG, SVG, PDF)
- [ ] Advanced clustering algorithms

### 🌟 **v3.0 (Vision)**
- [ ] React Server Components support
- [ ] Web Workers for heavy computations
- [ ] 3D graph visualizations
- [ ] Collaborative editing features

---

## 📜 License

MIT © [Nicolás Silva](https://github.com/nicolascine)

---

## 🎉 Acknowledgments

- **D3.js** team for the incredible visualization library
- **React** team for the amazing framework
- **Open source community** for 7+ years of inspiration
- **All contributors** who helped shape this library

---

<div align="center">
  <h3>🌟 Made with ❤️ by developers, for developers</h3>
  <p>
    <a href="https://github.com/nicolascine/react-graphie/issues">Report Bug</a> •
    <a href="https://github.com/nicolascine/react-graphie/discussions">Request Feature</a> •
    <a href="https://twitter.com/nicolascine">Follow Updates</a>
  </p>
  
  <p><strong>If React Graphie helps you build amazing visualizations, consider giving it a ⭐!</strong></p>
</div>
