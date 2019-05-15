import * as React from "react";
import { scaleOrdinal } from "d3-scale";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter
} from "d3-force";
import { schemeCategory10 } from "d3-scale-chromatic";
import { select, event } from "d3-selection";
import { drag } from "d3-drag";

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;

type LinkObject = {
  id: string;
};

type LinkStroke = {
  value: number;
};

type NodeFillObject = {
  group: string;
};

type source = {
  x: number;
  y: number;
};

type target = {
  x: number;
  y: number;
};

interface TickedObject {
  source: source;
  target: target;
}

type NodePosition = {
  x: number;
  y: number;
};

type DragedPosition = {
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;
};

interface Options {
  width: number;
  height: number;
}

interface Dataset {
  nodes: any;
  links: any;
}

let _wrapper: SVGSVGElement = {} as SVGSVGElement;

export type Props = { dataset: any; options: Options };
export type State = { dataset: Dataset; options: Options };

export default class Graph extends React.Component<Props, State> {
  state = {
    dataset: {} as Dataset,
    options: {} as Options
  };

  componentWillMount() {
    const options = this.props.options;
    const dataset = this.props.dataset;
    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;
    if (
      options &&
      options.hasOwnProperty("width") &&
      options.hasOwnProperty("height")
    ) {
      width = options.width;
      height = options.height;
    }
    this.setState({ dataset, options: { width, height } });
  }

  componentDidMount() {
    const { dataset, options } = this.state;
    this.drawNetwork(dataset, options);
  }

  drawNetwork(dataset: Dataset, options: Options) {
    const svg = _wrapper;
    const color = scaleOrdinal(schemeCategory10);
    const links = dataset.links.map((d: NodeFillObject) => Object.create(d));
    const nodes = dataset.nodes.map((d: NodeFillObject) => Object.create(d));

    //state
    const width = options.width;
    const height = options.height;

    const simulation: any = forceSimulation()
      .force("link", forceLink().id((d: LinkObject) => d.id))
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2));

    const link = select(svg)
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", (d: LinkStroke) => Math.sqrt(d.value));

    const node = select(svg)
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d: NodeFillObject) => color(d.group))
      .call(
        drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    simulation.nodes(nodes).on("tick", () => {
      link
        .attr("x1", (d: TickedObject) => d.source.x)
        .attr("y1", (d: TickedObject) => d.source.y)
        .attr("x2", (d: TickedObject) => d.target.x)
        .attr("y2", (d: TickedObject) => d.target.y);

      node
        .attr("cx", (d: NodePosition) => d.x)
        .attr("cy", (d: NodePosition) => d.y);
    });
    simulation.force("link").links(links);

    function dragstarted(d: DragedPosition) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: DragedPosition) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(d: DragedPosition) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    const { options } = this.state;
    return (
      <svg
        key="react-graphie"
        ref={(svgWrapper: SVGSVGElement) => (_wrapper = svgWrapper)}
        width={options.width}
        height={options.height}
      />
    );
  }
}
