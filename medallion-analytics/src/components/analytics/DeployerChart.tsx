'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  new_deployers: number;
  returning_deployers: number;
}

// Updated Color Definitions
const purpleSoft = '#6930C3'; // User provided
const blueBlue = '#72EFDD';   // User provided
const greenDeep = '#4EA8DE';    // User provided
const azurDeep = '#80FFDB';    // User provided

const DeployerChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const csvUrl = '/data/newvsreturning-dune-2025-04-24T10-02-36.141Z.csv';
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const parsedData = d3.csvParse(csvText, (d): DataPoint | undefined | null => {
          const date = d3.timeParse('%Y-%m-%d %H:%M:%S.%L UTC')(d.deployment_date || '');
          const new_deployers = +(d.new_deployers || 0);
          const returning_deployers = +(d.returning_deployers || 0);
          if (date && !isNaN(new_deployers) && !isNaN(returning_deployers)) {
            return { date, new_deployers, returning_deployers };
          }
          return null;
        });
        setData(parsedData.filter(d => d !== null) as DataPoint[]);
      } catch (error) {
        console.error("Failed to fetch or parse data:", error);
      }
    };

    fetchData();
  }, []);

  // Resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        setDimensions({ width, height: width / 2 });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // D3 rendering logic
  useEffect(() => {
    if (!data.length || !svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 50;
    const marginLeft = 60;

    const maxNew = d3.max(data, d => d.new_deployers) || 0;
    const maxReturning = d3.max(data, d => d.returning_deployers) || 0;
    const maxAbsValue = Math.max(maxNew, maxReturning);

    const dataWithRatio = data.map(d => ({
      ...d,
      ratio: d.returning_deployers === 0 ? (d.new_deployers > 0 ? Infinity : 0) : d.new_deployers / d.returning_deployers
    })).filter(d => isFinite(d.ratio));

    // Find max absolute ratio for symmetric axis
    const maxAbsRatio = d3.max(dataWithRatio, d => Math.abs(d.ratio)) || 1; // Default to 1 if no data

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([-maxAbsValue, maxAbsValue])
      .range([height - marginBottom, marginTop])
      .nice();

    // Update yRatio domain to be symmetric
    const yRatio = d3.scaleLinear()
        .domain([-maxAbsRatio, maxAbsRatio])
        .range([height - marginBottom, marginTop])
        .nice();

    const xAxis = d3.axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0)
      .tickFormat(d => d instanceof Date ? d3.timeFormat("%b")(d) : ' ');

    const yAxis = d3.axisLeft(y)
      .ticks(height / 40)
      .tickFormat(d => `${Math.abs(d as number)}`);

    // Update yRatioAxis tickFormat for absolute values
    const yRatioAxis = d3.axisRight(yRatio)
        .ticks(height / 40)
        .tickFormat(d => `${Math.abs(d as number).toFixed(1)}`); // Show absolute & format

    svg.attr('viewBox', [0, 0, width, height])
       .attr('preserveAspectRatio', 'xMidYMid meet')
       .attr('style', `max-width: 100%; height: auto; display: block; font-family: sans-serif;`);

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${y(0)})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke-opacity', 0.2))
      .call(g => g.selectAll('.tick text').attr('fill', 'currentColor').attr('font-size', '12px'));

    // Y Axis (Deployers)
    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`);

    yAxisGroup.call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').clone()
          .attr('x2', width - marginLeft - marginRight)
          .attr('stroke-opacity', 0.1))
      .call(g => g.selectAll('.tick text').attr('font-size', '12px'));

    // Add Y-axis label separately
    yAxisGroup.append('text')
      .attr('y', marginTop)
      .attr('x', marginLeft - 100)
      .attr('dy', '-0.5em')
      .style('text-anchor', 'start')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', 'currentColor')
      .text('Deployers');

    // Y Axis (Ratio)
    svg.append('g')
      .attr('transform', `translate(${width - marginRight},0)`)
      .call(yRatioAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick text').attr('fill', 'currentColor').attr('font-size', '12px'))
      .call(g => g.append('text')
          .attr('x', marginRight-10)
          .attr('y', marginTop - 15)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .attr('font-weight', 'bold')
          .text('Ratio (New/Returning)'));

    const barWidth = Math.max(1, (width - marginLeft - marginRight) / data.length - 1);

    tooltip.style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'rgba(255, 255, 255, 0.95)')
        .style('border', 'solid 1px #ccc')
        .style('border-radius', '4px')
        .style('padding', '8px 12px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('box-shadow', '0 2px 5px rgba(0,0,0,0.1)')
        .style('white-space', 'nowrap');

    // Bars for New Deployers (Green Deep, UP)
    svg.append('g')
      .attr('fill', greenDeep)
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', d => (x(d.date) ?? 0) - barWidth / 2)
        .attr('y', d => y(d.new_deployers))
        .attr('width', barWidth)
        .attr('height', d => Math.max(0, y(0) - y(d.new_deployers)))
        .style('cursor', 'pointer')
        .on('mouseover', (_event, d) => {
            tooltip.style('visibility', 'visible')
                   .html(`<strong>New:</strong> ${d.new_deployers}<br>Date: ${d3.timeFormat('%b %d, %Y')(d.date)}`);
        })
        .on('mousemove', (event) => {
            const [pointerX, pointerY] = d3.pointer(event, containerRef.current);
            tooltip.style('top', (pointerY + 10) + 'px')
                   .style('left', (pointerX + 10) + 'px');
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });

    // Bars for Returning Deployers (Purple Soft, DOWN)
    svg.append('g')
      .attr('fill', purpleSoft)
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', d => (x(d.date) ?? 0) - barWidth / 2)
        .attr('y', y(0))
        .attr('width', barWidth)
        .attr('height', d => Math.max(0, y(-d.returning_deployers) - y(0)))
        .style('cursor', 'pointer')
        .on('mouseover', (_event, d) => {
            tooltip.style('visibility', 'visible')
                   .html(`<strong>Returning:</strong> ${d.returning_deployers}<br>Date: ${d3.timeFormat('%b %d, %Y')(d.date)}`);
        })
        .on('mousemove', (event) => {
            const [pointerX, pointerY] = d3.pointer(event, containerRef.current);
            tooltip.style('top', (pointerY + 10) + 'px')
                   .style('left', (pointerX + 10) + 'px');
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });

    // Ratio Line (Blue Blue line, Azur Deep points)
    const line = d3.line<DataPoint & { ratio: number }>()
        .defined(d => isFinite(d.ratio))
        .x(d => x(d.date)!)
        .y(d => yRatio(d.ratio));

    svg.append('path')
      .datum(dataWithRatio)
      .attr('fill', 'none')
      .attr('stroke', blueBlue)
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('g')
        .selectAll('circle')
        .data(dataWithRatio.filter(d => isFinite(d.ratio)))
        .join('circle')
          .attr('cx', d => x(d.date)!)
          .attr('cy', d => yRatio(d.ratio))
          .attr('r', 3)
          .attr('fill', azurDeep)
          .style('cursor', 'pointer')
          .on('mouseover', (event, d) => {
            tooltip.style('visibility', 'visible')
                   .html(`<strong>Ratio:</strong> ${d.ratio.toFixed(2)}<br>Date: ${d3.timeFormat('%b %d, %Y')(d.date)}`);
            d3.select(event.currentTarget).attr('r', 5);
          })
          .on('mousemove', (event) => {
            const [pointerX, pointerY] = d3.pointer(event, containerRef.current);
            tooltip.style('top', (pointerY + 10) + 'px')
                   .style('left', (pointerX + 10) + 'px');
          })
          .on('mouseout', (event) => {
            tooltip.style('visibility', 'hidden');
            d3.select(event.currentTarget).attr('r', 3);
          });

  }, [data, dimensions]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: 'auto' }}>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef}></div>
    </div>
    );
};

export default DeployerChart; 