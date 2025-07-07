import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Graph } from './index'

describe('Graph Component', () => {
  const mockData = {
    nodes: [
      { id: 'node1', group: 1 },
      { id: 'node2', group: 2 },
    ],
    links: [
      { source: 'node1', target: 'node2' },
    ],
  }

  it('should render without crashing', () => {
    render(<Graph data={mockData} />)
    const svgElement = screen.getByRole('img', { hidden: true })
    expect(svgElement).toBeDefined()
  })

  it('should apply custom width and height', () => {
    render(
      <Graph 
        data={mockData} 
        options={{ width: 400, height: 300 }} 
      />
    )
    const svgElement = screen.getByRole('img', { hidden: true })
    expect(svgElement).toHaveAttribute('width', '400')
    expect(svgElement).toHaveAttribute('height', '300')
  })

  it('should apply custom className', () => {
    render(
      <Graph 
        data={mockData} 
        className="custom-graph" 
      />
    )
    const container = screen.getByRole('img', { hidden: true }).parentElement
    expect(container).toHaveClass('custom-graph')
  })

  it('should handle empty data gracefully', () => {
    const emptyData = { nodes: [], links: [] }
    render(<Graph data={emptyData} />)
    const svgElement = screen.getByRole('img', { hidden: true })
    expect(svgElement).toBeDefined()
  })
}) 