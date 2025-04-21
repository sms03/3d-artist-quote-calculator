import { useEffect } from "react";

const InteractiveSphere = () => {
  useEffect(() => {
    // Copy logic from useCanvasCursor
    class WaveGenerator {
      phase = 0;
      offset = 0;
      frequency = 0.001;
      amplitude = 1;
      constructor(params = {}) {
        this.init(params);
      }
      init(params) {
        this.phase = params.phase || 0;
        this.offset = params.offset || 0;
        this.frequency = params.frequency || 0.001;
        this.amplitude = params.amplitude || 1;
      }
      update() {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      }
      value() {
        return this.offset + Math.sin(this.phase) * this.amplitude;
      }
    }
    class Node {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
    }
    class Line {
      spring = 0;
      friction = 0.5;
      nodes = [];
      constructor(params = {}) {
        this.init(params);
      }
      init(params) {
        this.spring = (params.spring || 0) + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let i = 0; i < E.size; i++) {
          const node = new Node();
          node.x = pos.x;
          node.y = pos.y;
          this.nodes.push(node);
        }
      }
      update() {
        let springFactor = this.spring;
        const firstNode = this.nodes[0];
        firstNode.vx += (pos.x - firstNode.x) * springFactor;
        firstNode.vy += (pos.y - firstNode.y) * springFactor;
        for (let i = 0, len = this.nodes.length; i < len; i++) {
          const currentNode = this.nodes[i];
          if (i > 0) {
            const prevNode = this.nodes[i - 1];
            currentNode.vx += (prevNode.x - currentNode.x) * springFactor;
            currentNode.vy += (prevNode.y - currentNode.y) * springFactor;
            currentNode.vx += prevNode.vx * E.dampening;
            currentNode.vy += prevNode.vy * E.dampening;
          }
          currentNode.vx *= this.friction;
          currentNode.vy *= this.friction;
          currentNode.x += currentNode.vx;
          currentNode.y += currentNode.vy;
          springFactor *= E.tension;
        }
      }
      draw() {
        let curNode, nextNode;
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
          curNode = this.nodes[i];
          nextNode = this.nodes[i + 1];
          x = 0.5 * (curNode.x + nextNode.x);
          y = 0.5 * (curNode.y + nextNode.y);
          ctx.quadraticCurveTo(curNode.x, curNode.y, x, y);
        }
        curNode = this.nodes[this.nodes.length - 2];
        nextNode = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(curNode.x, curNode.y, nextNode.x, nextNode.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    function onMousemove(e) {
      function initLines() {
        lines = [];
        for (let i = 0; i < E.trails; i++) {
          lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
        }
      }
      function handleMouse(e) {
        if ('touches' in e && e.touches) {
          pos.x = e.touches[0].pageX;
          pos.y = e.touches[0].pageY;
        } else if ('clientX' in e) {
          pos.x = e.clientX;
          pos.y = e.clientY;
        }
        e.preventDefault();
      }
      function handleTouchStart(e) {
        if (e.touches.length === 1) {
          pos.x = e.touches[0].pageX;
          pos.y = e.touches[0].pageY;
        }
      }
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.addEventListener('mousemove', handleMouse);
      document.addEventListener('touchmove', handleMouse);
      document.addEventListener('touchstart', handleTouchStart);
      handleMouse(e);
      initLines();
      render();
    }
    function render() {
      if (ctx.running) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = `hsla(${Math.round(wave.update())},50%,50%,0.2)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < E.trails; i++) {
          const line = lines[i];
          line.update();
          line.draw();
        }
        ctx.frame++;
        window.requestAnimationFrame(render);
      }
    }
    function resizeCanvas() {
      if (ctx && ctx.canvas) {
        ctx.canvas.width = window.innerWidth - 20;
        ctx.canvas.height = window.innerHeight;
      }
    }
    let ctx;
    let wave;
    const pos = { x: 0, y: 0 };
    let lines = [];
    const E = {
      debug: false,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };
    const renderCanvas = function () {
      let canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.className = 'pointer-events-none fixed inset-0';
        document.body.appendChild(canvas);
      }
      ctx = (canvas as HTMLCanvasElement).getContext('2d');
      if (!ctx) return;
      ctx.running = true;
      ctx.frame = 1;
      wave = new WaveGenerator({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('touchstart', onMousemove);
      document.body.addEventListener('orientationchange', resizeCanvas);
      window.addEventListener('resize', resizeCanvas);
      const handleFocus = () => {
        if (ctx && !ctx.running) {
          ctx.running = true;
          render();
        }
      };
      const handleBlur = () => {
        if (ctx) ctx.running = true;
      };
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      resizeCanvas();
    };
    renderCanvas();
    return () => {
      if (ctx) ctx.running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', () => {});
      window.removeEventListener('blur', () => {});
    };
  }, []);
  return null;
};

export default InteractiveSphere;
