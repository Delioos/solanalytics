'use client'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface DataPoint {
  month: string
  sales: number
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
  color?: string
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 800,
  height = 400,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  color = '#5E60CE'
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)

    // Create scales
    const x = d3.scalePoint()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sales) || 0])
      .nice()
      .range([height - margin.bottom, margin.top])

    // Create line generator
    const line = d3.line<DataPoint>()
      .x(d => x(d.month) || 0)
      .y(d => y(d.sales))
      .curve(d3.curveMonotoneX)

    // Add the line path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line)

    // Add dots
    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(d.month) || 0)
      .attr('cy', d => y(d.sales))
      .attr('r', 4)
      .attr('fill', color)

    // Add axes
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('stroke-opacity', 0.2)

    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('stroke-opacity', 0.2)

  }, [data, width, height, margin, color])

  return (
    <div className="w-full h-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default LineChart 