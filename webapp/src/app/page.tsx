'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw grid pattern
    const drawGrid = () => {
      if (!ctx) return;
      const gridSize = 40;
      const gridColor = 'rgba(255, 255, 255, 0.03)';
      
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Trail particles array
    const particles: TrailParticle[] = [];
    const maxParticles = 30;

    class TrailParticle {
      x: number;
      y: number;
      size: number;
      shape: 'square' | 'triangle' | 'circle';
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      createdAt: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.shape = ['square', 'triangle', 'circle'][Math.floor(Math.random() * 3)] as 'square' | 'triangle' | 'circle';
        this.opacity = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.createdAt = Date.now();
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.opacity = Math.max(0, 1 - (Date.now() - this.createdAt) / 1000);
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

        switch (this.shape) {
          case 'square':
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -this.size/2);
            ctx.lineTo(this.size/2, this.size/2);
            ctx.lineTo(-this.size/2, this.size/2);
            ctx.closePath();
            ctx.fill();
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.restore();
      }
    }

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid();

      // Add new particles if mouse moved
      if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
        if (particles.length < maxParticles) {
          particles.push(new TrailParticle(mouseX, mouseY));
        }
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Remove faded particles
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />
      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Solana Global Metrics</h1>
          <p className="text-white/80 mb-8">
            Comprehensive analytics dashboard tracking mass deployment patterns and metrics coming soon
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">About Medallion</h2>
            <p className="text-white/80 mb-6">
              Medallion is building the future of Solana analytics. Our mission is to make Solana more attractive 
              through transparency and user-friendly protocols. We're creating tools that bring clarity to complex 
              blockchain data, making it accessible and actionable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/analytics/mass-deployers"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-lg hover:from-gray-600 hover:to-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                View First Metrics Report
              </Link>
              <Link 
                href="https://twitter.com/medallion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Follow on Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
