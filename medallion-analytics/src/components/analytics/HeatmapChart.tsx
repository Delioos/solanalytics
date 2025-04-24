'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BrickWallFire } from "lucide-react";

interface DataPoint {
  creator_address: string;
  tokens_created: number;
  total_profit_sol: number;
  profitable_tokens: number;
  profit_rate_percent: number;
  days_active: number;
  tokens_per_day: number;
}

interface TreeNode extends DataPoint {
  children?: DataPoint[];
}

type HierarchyNode = d3.HierarchyNode<TreeNode> & {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
};

interface Dimensions {
  width: number;
  height: number;
}

const INITIAL_DIMENSIONS: Dimensions = {
  width: 1000,
  height: 600,
};

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

const HeatmapChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>(INITIAL_DIMENSIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Fetch and parse data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/data/stats42topdeployers-2025-04-24T18-46-17.667Z.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await response.text();
        
        // Parse CSV data and sort by total_profit_sol for better visualization
        const parsedData = d3.csvParse(text, (d) => ({
          creator_address: d.creator_address,
          tokens_created: +d.tokens_created,
          total_profit_sol: +d.total_profit_sol,
          profitable_tokens: +d.profitable_tokens,
          profit_rate_percent: +d.profit_rate_percent,
          days_active: +d.days_active,
          tokens_per_day: +d.tokens_per_day
        }));

        // Sort by total profit for better visualization
        parsedData.sort((a, b) => b.total_profit_sol - a.total_profit_sol);
        setData(parsedData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        setDimensions({ width, height: width * 0.6 });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // D3 rendering logic
  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    svg.selectAll('*').remove();

    const width = dimensions.width - MARGIN.left - MARGIN.right;
    const height = dimensions.height - MARGIN.top - MARGIN.bottom;

    // Create the main group element
    const g = svg
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .append('g')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    // Custom color scale using the provided colors
    const customColors = [
      '#7400B8', // purple-hard
      '#6930C3', // purple-soft
      '#5E60CE', // purple-blue
      '#5390D9', // deep-blue
      '#4EA8DE', // blue-blue
      '#48BFE3', // azure-deep
      '#56CFE1', // azure-azure
      '#64DFDF', // azure-green
      '#72EFDD', // green-deep
      '#80FFDB', // green-mint
    ];

    const colorScale = d3.scaleQuantile<string>()
      .domain([0, 100])
      .range(customColors);

    // Create treemap layout
    const treemapLayout = d3.treemap<TreeNode>()
      .size([width, height])
      .padding(1);

    // Create root node with data
    const rootNode: TreeNode = {
      creator_address: 'root',
      tokens_created: 0,
      total_profit_sol: 0,
      profitable_tokens: 0,
      profit_rate_percent: 0,
      days_active: 0,
      tokens_per_day: 0,
      children: data
    };

    // Prepare hierarchical data for treemap
    const root = d3.hierarchy(rootNode)
      .sum(d => d.total_profit_sol)
      .sort((a, b) => b.data.total_profit_sol - a.data.total_profit_sol);

    treemapLayout(root);


    // Create cells
    const cells = g.selectAll<SVGGElement, HierarchyNode>('g')
      .data(root.leaves() as HierarchyNode[])
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    // Add rectangles
    cells.append('rect')
      .attr('width', d => Math.max(0, (d.x1 || 0) - (d.x0 || 0)))
      .attr('height', d => Math.max(0, (d.y1 || 0) - (d.y0 || 0)))
      .attr('fill', d => colorScale(d.data.profit_rate_percent))
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .html(`
            <div style="background: rgba(255, 255, 255, 0.95); padding: 10px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
              <div style="font-weight: bold; margin-bottom: 5px;">${d.data.creator_address.slice(0, 8)}...</div>
              <div>Profit Rate: ${d.data.profit_rate_percent.toFixed(1)}%</div>
              <div>Total Profit: ${d.data.total_profit_sol.toFixed(2)} SOL</div>
              <div>Tokens/Day: ${d.data.tokens_per_day.toFixed(1)}</div>
              <div>Days Active: ${d.data.days_active}</div>
            </div>
          `);
      })
      .on('mousemove', (event) => {
        const [x, y] = d3.pointer(event, containerRef.current);
        tooltip
          .style('left', `${x + 10}px`)
          .style('top', `${y + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Add text labels (only for cells large enough)
    cells.append('text')
      .attr('x', d => ((d.x1 || 0) - (d.x0 || 0)) / 2)
      .attr('y', d => ((d.y1 || 0) - (d.y0 || 0)) / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', 'white')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .text(d => {
        const size = Math.min((d.x1 || 0) - (d.x0 || 0), (d.y1 || 0) - (d.y0 || 0));
        return size > 30 ? `${d.data.profit_rate_percent.toFixed(1)}%` : '';
      });

  }, [data, dimensions]);

  return (
    <Card className="h-full text-black">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-grotesk text-black/80 flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-full border-2 border-black/10 p-4">
            <BrickWallFire className="w-5 h-5 text-black/80" strokeWidth={1.5} fill="none" />
          </div>
          Deployer Performance Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-4">
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: 'auto' }}>
          {isLoading && <div>Loading...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {!isLoading && !error && (
            <>
              <svg ref={svgRef}></svg>
              <div
                ref={tooltipRef}
                style={{
                  position: 'absolute',
                  visibility: 'hidden',
                  backgroundColor: 'white',
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapChart; 