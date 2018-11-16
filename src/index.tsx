/**
 * @class ExampleComponent
 */

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
//import { transition } from "d3-transition";

export type Props = { data: any };

interface linkObject {
  id: string;
}
interface linkStroke {
  value: number;
}
interface nodeObject {
  group: number;
}
interface nodeFillObject {
  group: string;
}
interface tickedObject {
  source: {
    x: number;
    y: number;
  };
  target: {
    x: number;
    y: number;
  };
}
interface nodePosition {
  x: number;
  y: number;
}
interface dragedPosition {
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;
}

let _wrapper: any = Object;
const _innerWidth: number = 500;

export default class ExampleComponent extends React.Component<Props> {
  componentDidMount() {
    this.drawNetwork(this.props.data);
  }
  drawNetwork(dataSet: any) {
    const svg = _wrapper;
    const color = scaleOrdinal(schemeCategory10);

    const simulation = forceSimulation()
      .force(
        "link",
        forceLink().id(function(d: linkObject) {
          return d.id;
        })
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(_innerWidth / 2, 520 / 2));

    const link = select(svg)
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(dataSet.links)
      .enter()
      .append("line")
      .attr("stroke-width", function(d: linkStroke) {
        return Math.sqrt(d.value);
      });

    let node = select(svg)
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(dataSet.nodes)
      .enter()
      .append("circle")
      .attr("r", function(d: nodeObject) {
        return d.group === 1 ? 6 : 5;
      })
      .attr("fill", function(d: nodeFillObject) {
        return color(d.group);
      })
      .call(
        drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    simulation.nodes(dataSet.nodes).on("tick", ticked);
    //simulation.force<d3Force.ForceLink>("link").links(dataSet.links);

    function ticked() {
      link
        .attr("x1", function(d: tickedObject) {
          return d.source.x;
        })
        .attr("y1", function(d: tickedObject) {
          return d.source.y;
        })
        .attr("x2", function(d: tickedObject) {
          return d.target.x;
        })
        .attr("y2", function(d: tickedObject) {
          return d.target.y;
        });

      node
        .attr("cx", function(d: nodePosition) {
          return d.x;
        })
        .attr("cy", function(d: nodePosition) {
          return d.y;
        });
    }

    function dragstarted(d: dragedPosition) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: dragedPosition) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(d: dragedPosition) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    //const { data } = this.props;
    return (
      <svg
        className="Network-canvas"
        ref={svgWrapper => (_wrapper = svgWrapper)}
        width={_innerWidth}
        height={520}
      />
    );
    //return <div className={styles.test}>test: {text}</div>;
  }
}
