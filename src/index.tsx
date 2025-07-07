import { drag } from 'd3-drag'
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from 'd3-force'
import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { select, Selection } from 'd3-selection'
import { zoom } from 'd3-zoom'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

// 🎯 Modern TypeScript interfaces
export interface GraphNode extends SimulationNodeDatum {
  id: string
  group?: number
  label?: string
  size?: number
  color?: string
  [key: string]: any
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string | GraphNode
  target: string | GraphNode
  weight?: number
  color?: string
  [key: string]: any
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export interface GraphOptions {
  width?: number
  height?: number
  nodeRadius?: number | ((node: GraphNode) => number)
  linkDistance?: number | ((link: GraphLink) => number)
  linkStrength?: number | ((link: GraphLink) => number)
  chargeStrength?: number | ((node: GraphNode) => number)
  centerStrength?: number
  enableZoom?: boolean
  enableDrag?: boolean
  enableTooltip?: boolean
  theme?: 'light' | 'dark'
  colorScheme?: string[]
  animation?: boolean
  onNodeClick?: (node: GraphNode, event: MouseEvent) => void
  onNodeHover?: (node: GraphNode | null, event: MouseEvent) => void
  onLinkClick?: (link: GraphLink, event: MouseEvent) => void
}

export interface GraphProps {
  data: GraphData
  options?: GraphOptions
  className?: string
  style?: React.CSSProperties
}

// 🎨 Default configuration
const DEFAULT_OPTIONS: Required<Omit<GraphOptions, 'onNodeClick' | 'onNodeHover' | 'onLinkClick'>> = {
  width: 800,
  height: 600,
  nodeRadius: 8,
  linkDistance: 100,
  linkStrength: 0.1,
  chargeStrength: -300,
  centerStrength: 0.1,
  enableZoom: true,
  enableDrag: true,
  enableTooltip: true,
  theme: 'light',
  colorScheme: [...schemeCategory10],
  animation: true,
}

// 🚀 Modern React Graph Component
const Graph: React.FC<GraphProps> = ({ data, options = {}, className, style }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const simulationRef = useRef<Simulation<GraphNode, GraphLink> | null>(null)
  
  // 🎯 Merge options with defaults
  const config = useMemo(() => ({
    ...DEFAULT_OPTIONS,
    ...options,
  }), [options])

  // 🎨 Color scale setup
  const colorScale = useMemo(() => 
    scaleOrdinal<string>().range(config.colorScheme), 
    [config.colorScheme]
  )

  // 🎮 Event handlers
  const handleNodeClick = useCallback((node: GraphNode, event: MouseEvent) => {
    config.onNodeClick?.(node, event)
  }, [config.onNodeClick])

  const handleNodeHover = useCallback((node: GraphNode | null, event: MouseEvent) => {
    config.onNodeHover?.(node, event)
  }, [config.onNodeHover])

  const handleLinkClick = useCallback((link: GraphLink, event: MouseEvent) => {
    config.onLinkClick?.(link, event)
  }, [config.onLinkClick])

  // 🎭 Drag behavior
  const createDragBehavior = useCallback((simulation: Simulation<GraphNode, GraphLink>) => {
    return drag<SVGCircleElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })
  }, [])

  // 🔍 Zoom behavior
  const createZoomBehavior = useCallback((svg: Selection<SVGSVGElement, unknown, null, undefined>) => {
    return zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        svg.select('g').attr('transform', event.transform)
      })
  }, [])

  // 🎯 Main render function
  const renderGraph = useCallback(() => {
    if (!svgRef.current) return
    const svg = select(svgRef.current)

    // Clear previous render
    svg.selectAll('*').remove()

    // Create container group
    const container = svg.append('g')

    // Setup zoom if enabled
    if (config.enableZoom) {
      const zoomBehavior = createZoomBehavior(svg)
      svg.call(zoomBehavior)
    }

    // Process data
    const nodes = data.nodes.map(d => ({ ...d }))
    const links = data.links.map(d => ({ ...d }))

    // Create force simulation
    const simulation = forceSimulation<GraphNode>(nodes)
      .force('link', forceLink<GraphNode, GraphLink>(links)
        .id(d => d.id)
        .distance(typeof config.linkDistance === 'function' 
          ? config.linkDistance 
          : () => config.linkDistance as number)
        .strength(typeof config.linkStrength === 'function'
          ? config.linkStrength
          : () => config.linkStrength as number)
      )
      .force('charge', forceManyBody()
        .strength(config.chargeStrength as number)
      )
      .force('center', forceCenter(config.width / 2, config.height / 2)
        .strength(config.centerStrength)
      )

    simulationRef.current = simulation

    // Create links
    const linkElements = container
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => d.color || (config.theme === 'dark' ? '#555' : '#999'))
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.weight || 1))
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleLinkClick(d, event))

    // Create nodes
    const nodeElements = container
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', d => {
        if (typeof config.nodeRadius === 'function') {
          return config.nodeRadius(d)
        }
        return d.size || config.nodeRadius
      })
      .attr('fill', d => d.color || colorScale(String(d.group || 0)))
      .attr('stroke', config.theme === 'dark' ? '#000' : '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')

    // Add node interactions
    nodeElements
      .on('click', (event, d) => handleNodeClick(d, event))
      .on('mouseover', (event, d) => {
        handleNodeHover(d, event)
        if (config.enableTooltip) {
          // Simple tooltip implementation
          select('body').append('div')
            .attr('class', 'graph-tooltip')
            .style('position', 'absolute')
            .style('padding', '8px')
            .style('background', config.theme === 'dark' ? '#333' : '#fff')
            .style('border', '1px solid #ccc')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .html(d.label || d.id)
            .transition()
            .duration(200)
            .style('opacity', 1)
        }
      })
      .on('mouseout', (event, _d) => {
        handleNodeHover(null, event)
        if (config.enableTooltip) {
          select('.graph-tooltip').remove()
        }
      })

    // Add drag behavior if enabled
    if (config.enableDrag) {
      const dragBehavior = createDragBehavior(simulation)
      nodeElements.call(dragBehavior)
    }

    // Simulation tick
    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => (d.source as GraphNode).x || 0)
        .attr('y1', d => (d.source as GraphNode).y || 0)
        .attr('x2', d => (d.target as GraphNode).x || 0)
        .attr('y2', d => (d.target as GraphNode).y || 0)

      nodeElements
        .attr('cx', d => d.x || 0)
        .attr('cy', d => d.y || 0)
    })

    // Add entrance animation if enabled
    if (config.animation) {
      nodeElements
        .attr('r', 0)
        .transition()
        .duration(800)
        .attr('r', d => {
          if (typeof config.nodeRadius === 'function') {
            return config.nodeRadius(d)
          }
          return d.size || config.nodeRadius
        })

      linkElements
        .attr('stroke-opacity', 0)
        .transition()
        .duration(800)
        .attr('stroke-opacity', 0.6)
    }

  }, [data, config, colorScale, handleNodeClick, handleNodeHover, handleLinkClick, createDragBehavior, createZoomBehavior])

  // 🎯 Effect to render graph
  useEffect(() => {
    renderGraph()
    
    // Cleanup function
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop()
      }
      select('.graph-tooltip').remove()
    }
  }, [renderGraph])

  // 🎨 Render JSX
  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        backgroundColor: config.theme === 'dark' ? '#1a1a1a' : '#ffffff',
        ...style,
      }}
    >
      <svg
        ref={svgRef}
        width={config.width}
        height={config.height}
        style={{
          border: config.theme === 'dark' 
            ? '1px solid #333' 
            : '1px solid #e0e0e0',
          borderRadius: '8px',
        }}
      />
    </div>
  )
}

export default Graph

// 🎯 Named exports for convenience
export { Graph }

