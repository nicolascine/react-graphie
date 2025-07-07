import React, { useMemo, useState } from 'react'
import { Graph, GraphData, GraphNode } from 'react-graphie'
import './App.css'

// 🎯 Sample datasets for different demos
const socialNetworkData: GraphData = {
  nodes: [
    { id: "Alice", group: 1, size: 25, label: "Alice (CEO)", color: "#FF6B6B" },
    { id: "Bob", group: 2, size: 20, label: "Bob (CTO)", color: "#4ECDC4" },
    { id: "Charlie", group: 2, size: 18, label: "Charlie (Developer)", color: "#45B7D1" },
    { id: "Diana", group: 3, size: 22, label: "Diana (Designer)", color: "#F9CA24" },
    { id: "Eve", group: 3, size: 16, label: "Eve (Marketing)", color: "#A55EEA" },
    { id: "Frank", group: 1, size: 19, label: "Frank (Sales)", color: "#26de81" },
    { id: "Grace", group: 2, size: 21, label: "Grace (Product)", color: "#fd79a8" },
    { id: "Henry", group: 3, size: 15, label: "Henry (Support)", color: "#fdcb6e" }
  ],
  links: [
    { source: "Alice", target: "Bob", weight: 3 },
    { source: "Alice", target: "Diana", weight: 2 },
    { source: "Alice", target: "Frank", weight: 2 },
    { source: "Bob", target: "Charlie", weight: 3 },
    { source: "Bob", target: "Grace", weight: 2 },
    { source: "Diana", target: "Eve", weight: 2 },
    { source: "Diana", target: "Henry", weight: 1 },
    { source: "Charlie", target: "Grace", weight: 1 },
    { source: "Eve", target: "Frank", weight: 1 },
    { source: "Grace", target: "Henry", weight: 1 }
  ]
}

const techStackData: GraphData = {
  nodes: [
    { id: "React", group: 1, size: 30, label: "React 18", color: "#61DAFB" },
    { id: "TypeScript", group: 2, size: 25, label: "TypeScript 5", color: "#3178C6" },
    { id: "D3", group: 3, size: 28, label: "D3.js v7", color: "#F7931E" },
    { id: "Vite", group: 4, size: 22, label: "Vite 5", color: "#646CFF" },
    { id: "Components", group: 1, size: 18, label: "Components" },
    { id: "Hooks", group: 1, size: 16, label: "Hooks" },
    { id: "Types", group: 2, size: 14, label: "Types" },
    { id: "Visualization", group: 3, size: 20, label: "Visualization" },
    { id: "Force", group: 3, size: 15, label: "Force Layout" },
    { id: "Build", group: 4, size: 12, label: "Build Tools" }
  ],
  links: [
    { source: "React", target: "Components", weight: 3 },
    { source: "React", target: "Hooks", weight: 3 },
    { source: "TypeScript", target: "Types", weight: 2 },
    { source: "TypeScript", target: "React", weight: 2 },
    { source: "D3", target: "Visualization", weight: 3 },
    { source: "D3", target: "Force", weight: 2 },
    { source: "Vite", target: "Build", weight: 2 },
    { source: "Vite", target: "TypeScript", weight: 1 },
    { source: "Components", target: "Visualization", weight: 2 },
    { source: "Hooks", target: "Force", weight: 1 }
  ]
}

// 🎭 Demo themes
const themes = {
  light: { name: 'Light', bg: '#ffffff', text: '#333333' },
  dark: { name: 'Dark', bg: '#1a1a1a', text: '#ffffff' }
} as const

type ThemeKey = keyof typeof themes

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('light')
  const [currentDataset, setCurrentDataset] = useState<'social' | 'tech'>('social')
  const [showAnimation, setShowAnimation] = useState(true)
  const [showZoom, setShowZoom] = useState(true)
  const [showDrag, setShowDrag] = useState(true)
  const [showTooltip, setShowTooltip] = useState(true)

  const currentData = useMemo(() => 
    currentDataset === 'social' ? socialNetworkData : techStackData,
    [currentDataset]
  )

  const theme = themes[currentTheme]

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node)
  }

  const handleNodeHover = (node: GraphNode | null) => {
    setHoveredNode(node)
  }

  return (
    <div className="app" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className="header">
        <h1>🎯 React Graphie v2.0</h1>
        <p>Modern, Interactive Graph Visualizations for React</p>
        <div className="badges">
          <span className="badge">React 18+</span>
          <span className="badge">D3.js v7</span>
          <span className="badge">TypeScript 5</span>
          <span className="badge">Vite 5</span>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Dataset:</label>
          <select 
            value={currentDataset} 
            onChange={(e) => setCurrentDataset(e.target.value as 'social' | 'tech')}
          >
            <option value="social">🏢 Social Network</option>
            <option value="tech">⚛️ Tech Stack</option>
          </select>
        </div>

        <div className="control-group">
          <label>Theme:</label>
          <select 
            value={currentTheme} 
            onChange={(e) => setCurrentTheme(e.target.value as ThemeKey)}
          >
            {Object.entries(themes).map(([key, theme]) => (
              <option key={key} value={key}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div className="control-group checkboxes">
          <label>
            <input 
              type="checkbox" 
              checked={showAnimation} 
              onChange={(e) => setShowAnimation(e.target.checked)}
            />
            Animation
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showZoom} 
              onChange={(e) => setShowZoom(e.target.checked)}
            />
            Zoom
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showDrag} 
              onChange={(e) => setShowDrag(e.target.checked)}
            />
            Drag
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={showTooltip} 
              onChange={(e) => setShowTooltip(e.target.checked)}
            />
            Tooltip
          </label>
        </div>
      </div>

      <div className="main-content">
        <div className="graph-container">
          <Graph
            data={currentData}
            options={{
              width: 900,
              height: 600,
              theme: currentTheme,
              animation: showAnimation,
              enableZoom: showZoom,
              enableDrag: showDrag,
              enableTooltip: showTooltip,
              nodeRadius: (node) => node.size || 12,
              linkDistance: currentDataset === 'social' ? 120 : 100,
              chargeStrength: (node) => -(node.size || 12) * 15,
              onNodeClick: handleNodeClick,
              onNodeHover: handleNodeHover,
            }}
            style={{
              border: `2px solid ${currentTheme === 'dark' ? '#333' : '#e0e0e0'}`,
              borderRadius: '12px',
              boxShadow: currentTheme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3)' 
                : '0 8px 32px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        <div className="info-panel">
          <div className="info-section">
            <h3>🎮 Interactive Features</h3>
            <ul>
              <li>🖱️ Click nodes to select them</li>
              <li>🔍 Zoom in/out with mouse wheel</li>
              <li>🤏 Pan by dragging empty space</li>
              <li>🎯 Drag nodes to reposition them</li>
              <li>💡 Hover for node information</li>
            </ul>
          </div>

          {selectedNode && (
            <div className="info-section">
              <h3>📊 Selected Node</h3>
              <div className="node-info">
                <p><strong>ID:</strong> {selectedNode.id}</p>
                <p><strong>Label:</strong> {selectedNode.label || 'N/A'}</p>
                <p><strong>Group:</strong> {selectedNode.group || 'N/A'}</p>
                <p><strong>Size:</strong> {selectedNode.size || 'N/A'}</p>
                <p><strong>Color:</strong> {selectedNode.color || 'Auto'}</p>
              </div>
            </div>
          )}

          {hoveredNode && (
            <div className="info-section">
              <h3>🎯 Hovered Node</h3>
              <div className="node-info">
                <p><strong>ID:</strong> {hoveredNode.id}</p>
                <p><strong>Label:</strong> {hoveredNode.label || 'N/A'}</p>
              </div>
            </div>
          )}

          <div className="info-section">
            <h3>📈 Graph Stats</h3>
            <div className="stats">
              <p><strong>Nodes:</strong> {currentData.nodes.length}</p>
              <p><strong>Links:</strong> {currentData.links.length}</p>
              <p><strong>Density:</strong> {(currentData.links.length / (currentData.nodes.length * (currentData.nodes.length - 1)) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>
          <strong>🎯 React Graphie v2.0</strong> - 
          Built with ❤️ by developers, for developers | 
          <a href="https://github.com/nicolascine/react-graphie" target="_blank" rel="noopener noreferrer">
            GitHub
          </a> | 
          <a href="https://www.npmjs.com/package/react-graphie" target="_blank" rel="noopener noreferrer">
            NPM
          </a>
        </p>
        <p>
          <em>📊 Born in 2017, Reborn in 2025 - 7+ years of graph visualization evolution</em>
        </p>
      </div>
    </div>
  )
}

export default App 