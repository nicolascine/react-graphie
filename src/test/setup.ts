import { vi } from 'vitest'

// Mock D3 selections for testing
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0))
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id))

// Mock SVG methods
Object.defineProperty(window, 'SVGElement', {
  writable: true,
  value: class MockSVGElement {
    getBoundingClientRect() {
      return {
        width: 800,
        height: 600,
        top: 0,
        left: 0,
        right: 800,
        bottom: 600,
        x: 0,
        y: 0,
        toJSON: () => {}
      }
    }
  }
}) 