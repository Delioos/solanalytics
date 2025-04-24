'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PartnersSection from '@/components/PartnersSection';

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
      const gridColor = 'rgba(0, 0, 0, 0.06)';
      
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

    /*
    // Trail particles array
    const particles: TrailParticle[] = [];

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
        this.size = Math.random() * 12 + 8;
        this.shape = ['square', 'triangle', 'circle'][Math.floor(Math.random() * 3)] as 'square' | 'triangle' | 'circle';
        this.opacity = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.createdAt = Date.now();
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.opacity = Math.max(0, 1 - (Date.now() - this.createdAt) / 3000);
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';

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
    */

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid();

      /*
      // Add new particles continuously
      if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
        // Create multiple particles at once for denser trail
        for (let i = 0; i < 3; i++) {
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
      */

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      // window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden h-screen fixed inset-0">
      <style jsx global>{`
        html, body {
          overflow: hidden;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />
      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto  border-2 border-gray-900 rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-4">Decoding Solana's Future Through Data-Driven Intelligence</h1>
          <p className="mb-8">
            Comprehensive analytics dashboard tracking mass deployment patterns and metrics coming soon
          </p>
          
          <div className="bg-black/5 backdrop-blur-sm rounded-xl p-8 mb-12">
            <div className="mb-6">
              <Image
                src="/MedallionAnalytics.png"
                alt="Medallion Analytics"
                width={300}
                height={100}
                className="mb-6"
                priority
              />
            </div>
            <p className="text-black/80 mb-6">
              We're building the future of Solana analytics. Our mission is to make Solana more attractive 
              through transparency and user-friendly protocols. We're creating tools that bring clarity to complex 
              blockchain data, making it accessible and actionable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/analytics/mass-deployers" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:from-gray-600 hover:to-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                View First Metrics Report
              </Link>
              <Link 
                href="https://medium.com/@MedallionAnalytics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-black/10 text-black font-medium rounded-lg hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Follow on Medium
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PartnersSection />
    </main>
  );
}
