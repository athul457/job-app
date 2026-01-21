import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Antigravity = ({ children, className }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

    let engine = Engine.create();
    let world = engine.world;
    engine.world.gravity.y = 0.5; // Mild gravity

    const container = containerRef.current;
    
    // Canvas setup
    let render = Render.create({
      element: container,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
        showSleeping: false
      }
    });

    // Boundaries
    const width = container.clientWidth;
    const height = container.clientHeight;
    // const thick = 50;

    // Walls
    World.add(world, [
      Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } }), // Floor
      Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, render: { visible: false } }), // Ceiling
      Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } }), // Right
      Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } }) // Left
    ]);

    // Create a body for each child element
    // Wait for DOM to render first
    setTimeout(() => {
        const elements = container.querySelectorAll('.gravity-item');
        elements.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const parentRect = container.getBoundingClientRect();
            
            // Calculate relative position centered in the container
            const x = (width / 2) + (Math.random() * 200 - 100);
            const y = (height / 2) + (Math.random() * 200 - 100);

            // Create circular bodies for icons
            const body = Bodies.circle(x, (-500 - (i * 100)), 35, { 
                restitution: 0.6,
                friction: 0.1,
                render: { opacity: 0 } // Invisible physics body
            });

            // Link DOM element to physics body position
            Matter.Events.on(engine, 'afterUpdate', () => {
                if(!el) return;
                const { position, angle } = body;
                // Update DOM element transform
                // Check if position is NaN to prevent layout breaking
                if (!isNaN(position.x) && !isNaN(position.y)) {
                    // Center the element on the body
                    const transX = position.x - (rect.width / 2);
                    const transY = position.y - (rect.height / 2);
                    el.style.transform = `translate(${transX}px, ${transY}px) rotate(${angle}rad)`;
                    el.style.opacity = 1;
                }
            });

            World.add(world, body);
        });
    }, 100);

    // Mouse control
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse; // Keep mouse in sync with render

    // Run
    Render.run(render);
    let runner = Runner.create();
    Runner.run(runner, engine);

    // Resize handling
    const handleResize = () => {
        render.canvas.width = container.clientWidth;
        render.canvas.height = container.clientHeight;
        // Re-position walls if needed (omitted for brevity, ideally would update bounds)
    };
    window.addEventListener('resize', handleResize);

    return () => {
        Render.stop(render);
        Runner.stop(runner);
        window.removeEventListener('resize', handleResize);
        Composite.clear(world);
        Engine.clear(engine);
        render.canvas.remove();
        render.canvas = null;
        render.context = null;
        render.textures = {};
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full h-full ${className}`}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            {children}
        </div>
    </div>
  );
};

export default Antigravity;
