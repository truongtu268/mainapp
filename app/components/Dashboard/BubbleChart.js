import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { Chart } from 'styles'

const propTypes = {
  feedback: PropTypes.array.isRequired,
}

function processData(data) {
  const newSet = []
  Object.entries(data).map((item) => newSet.push({
    name: item[0],
    value: item[1],
  }))

  return { children: newSet }
}

class BubbleChart extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    this.renderBubbleChart = this.renderBubbleChart.bind(this)
  }

  componentWillMount() {
    const count = {}
    const categories = this.props.feedback.map((fb) => fb.content[2].content)
    categories.forEach((cateArray) => {
      cateArray.forEach((cate) => { count[cate] = (count[cate] || 0) + 1 })
    })
    this.setState({ data: count })
  }

  componentDidMount() {
    const { data } = this.state
    if (Object.keys(data).length !== 0) {
      this.renderBubbleChart()
    }
  }

  renderBubbleChart() {
    const chart = d3.select('.chart').node().getBoundingClientRect()
    const width = chart.width
    const height = chart.height
    const color = d3.scaleOrdinal(d3.schemeCategory20c)
    const symbol = d3.symbol().size(200).type(d3.symbolSquare)

    const svg = d3.selectAll('.chart svg')
      .attr('width', width)
      .attr('height', height)

    const bubble = d3.pack()
      .size([width, height])
      .padding(10)

    const nodes = d3.hierarchy(processData(this.state.data))
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)

    bubble(nodes)

    const node = svg.selectAll('.node')
      .data(nodes.children)
      .enter()
      .append('g').attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

    node.append('circle')
      .attr('r', (d) => d.r)
      .style('fill', (d) => color(d.data.name))

    node.append('text')
      .style('fill', '#fff')
      .style('font-size', '14px')
      .style('pointer-event', 'none')
      .style('text-anchor', 'middle')
      .attr('dy', '0.3em').text((d) => d.data.value)

    const sidenote = svg.selectAll('.sidenote')
      .attr('transform', 'translate(20, 20)')
      .selectAll('g')
      .data(nodes.children)
      .enter()
      .append('g').attr('transform', (d, i) => `translate(0, ${i * 20})`)

    sidenote.append('path').attr('d', symbol).style('fill', (d) => color(d.data.name))
    sidenote.append('text').attr('transform', 'translate(10, 5)')
      .style('font-size', '12px')
      .text((d) => d.data.name)
  }

  render() {
    return (
      <Chart className="chart">
        <svg>
          <g className="sidenote"></g>
        </svg>
      </Chart>
    )
  }
}

BubbleChart.propTypes = propTypes

export default BubbleChart
