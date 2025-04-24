'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  new_deployers: number;
  returning_deployers: number;
}

const DeployerChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<DataPoint[]>([]);

  // TODO: Fetch and parse data
  // TODO: D3 rendering logic

  useEffect(() => {
    // Example: Fetch data - replace with actual fetch
    const fetchData = async () => {
      // Assuming the CSV is moved to public/data
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
          return null; // Filter out invalid rows
        });
        setData(parsedData.filter(d => d !== null) as DataPoint[]);
      } catch (error) {
        console.error("Failed to fetch or parse data:", error);
        // Handle error state appropriately
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current); // Use this for tooltips

    svg.selectAll('*').remove(); // Clear previous renders

    const width = 800; // Adjust as needed
    const height = 400; // Adjust as needed
    const marginTop = 30;
    const marginRight = 50; // Space for ratio axis
    const marginBottom = 50;
    const marginLeft = 60;

    // Find max absolute value for symmetric y-axis
    const maxNew = d3.max(data, d => d.new_deployers) || 0;
    const maxReturning = d3.max(data, d => d.returning_deployers) || 0;
    const maxAbsValue = Math.max(maxNew, maxReturning);

    // Calculate ratio and find its extent
    const dataWithRatio = data.map(d => ({
      ...d,
      // Handle returning_deployers being 0 to avoid division by zero
      ratio: d.returning_deployers === 0 ? (d.new_deployers > 0 ? Infinity : 0) : d.new_deployers / d.returning_deployers
    })).filter(d => isFinite(d.ratio)); // Filter out Infinite ratios for scaling

    const ratioExtent = d3.extent(dataWithRatio, d => d.ratio) as [number, number] || [0, 1];
     // Add some padding to ratio extent if min and max are the same
    if (ratioExtent[0] === ratioExtent[1]) {
        ratioExtent[0] = ratioExtent[0] * 0.8;
        ratioExtent[1] = ratioExtent[1] * 1.2 || 1; // Handle case where extent is [0, 0]
    }


    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([-maxAbsValue, maxAbsValue])
      .range([height - marginBottom, marginTop])
      .nice();

    const yRatio = d3.scaleLinear()
        .domain(ratioExtent) // Use calculated extent
        .range([height - marginBottom, marginTop])
        .nice();


    // Axes
    const xAxis = d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).ticks(height / 40);
    const yRatioAxis = d3.axisRight(yRatio).ticks(height / 40);


    svg.attr('viewBox', [0, 0, width, height])
       .attr('width', width)
       .attr('height', height)
       .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${y(0)})`) // Position X axis at y=0
      .call(xAxis)
      .call(g => g.select('.domain').remove()) // Remove the axis line, keep ticks
      .call(g => g.selectAll('.tick line').attr('stroke-opacity', 0.2))
      .call(g => g.selectAll('.tick text').attr('fill', 'currentColor').attr('font-size', '10px'));


    // Y Axis (Deployers)
    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').clone()
          .attr('x2', width - marginLeft - marginRight)
          .attr('stroke-opacity', 0.1)) // Grid lines
      .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .attr('fill', 'currentColor')
          .text('Deployers'));

    // Y Axis (Ratio) - Optional, uncomment if needed
    svg.append('g')
      .attr('transform', `translate(${width - marginRight},0)`)
      .call(yRatioAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick text').attr('fill', 'currentColor').attr('font-size', '10px'))
      .call(g => g.append('text') // Add axis label
          .attr('x', marginRight-10)
          .attr('y', marginTop - 15)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .attr('font-weight', 'bold')
          .text('Ratio (New/Returning)'));


    const barWidth = Math.max(1, (width - marginLeft - marginRight) / data.length - 2); // Calculate bar width dynamically


     // Tooltip setup
    tooltip.style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', 'solid 1px black')
        .style('border-radius', '4px')
        .style('padding', '5px')
        .style('font-size', '12px')
        .style('pointer-events', 'none'); // Important!

    // Bars for Returning Deployers (Blue, Up)
    svg.append('g')
      .attr('fill', '#3b82f6') // Blue color
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', d => (x(d.date) ?? 0) - barWidth / 2)
        .attr('y', d => y(d.returning_deployers))
        .attr('width', barWidth)
        .attr('height', d => Math.max(0, y(0) - y(d.returning_deployers))) // Ensure non-negative height
        .on('mouseover', (event, d) => {
            tooltip.style('visibility', 'visible')
                   .html(`Returning: ${d.returning_deployers}<br>Date: ${d3.timeFormat('%Y-%m-%d')(d.date)}`);
        })
        .on('mousemove', (event) => {
            tooltip.style('top', (event.pageY - 10) + 'px')
                   .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });


    // Bars for New Deployers (Orange, Down)
    svg.append('g')
      .attr('fill', '#f97316') // Orange color
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', d => (x(d.date) ?? 0) - barWidth / 2)
        .attr('y', y(0)) // Start from the zero line
        .attr('width', barWidth)
        .attr('height', d => Math.max(0, y(-d.new_deployers) - y(0))) // Map new deployers to negative domain
        .on('mouseover', (event, d) => {
            tooltip.style('visibility', 'visible')
                   .html(`New: ${d.new_deployers}<br>Date: ${d3.timeFormat('%Y-%m-%d')(d.date)}`);
        })
        .on('mousemove', (event) => {
            tooltip.style('top', (event.pageY - 10) + 'px')
                   .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });


    // Ratio Line (Black)
    const line = d3.line<DataPoint & { ratio: number }>()
        .defined(d => isFinite(d.ratio)) // Don't draw line for infinite ratios
        .x(d => x(d.date)!)
        .y(d => yRatio(d.ratio));


    svg.append('path')
      .datum(dataWithRatio)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', line);

      // Add points to the line for clarity
      svg.append('g')
        .selectAll('circle')
        .data(dataWithRatio.filter(d => isFinite(d.ratio))) // Only plot points for finite ratios
        .join('circle')
          .attr('cx', d => x(d.date)!)
          .attr('cy', d => yRatio(d.ratio))
          .attr('r', 3)
          .attr('fill', 'black')
          .on('mouseover', (event, d) => {
            tooltip.style('visibility', 'visible')
                   .html(`Ratio: ${d.ratio.toFixed(2)}<br>Date: ${d3.timeFormat('%Y-%m-%d')(d.date)}`);
          })
          .on('mousemove', (event) => {
            tooltip.style('top', (event.pageY - 10) + 'px')
                   .style('left', (event.pageX + 10) + 'px');
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
          });


  }, [data]); // Redraw chart if data changes

  return (
    <div style={{ position: 'relative' }}> {/* Container for SVG and tooltip */}
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef}></div> {/* Tooltip element */}
    </div>
    );
};

export default DeployerChart; 