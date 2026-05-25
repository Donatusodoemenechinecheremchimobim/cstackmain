import { useEffect, useRef, useState } from 'react';

interface InteractiveThreeDSphereProps {
  tilt: { x: number; y: number };
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function InteractiveThreeDSphere({ tilt }: InteractiveThreeDSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Custom manual interactive rotation offset (decaying back over time)
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const dragRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const ambientAngleRef = useRef({ x: 0, y: 0 });

  // Generate 3D Fibonacci sphere nodes & gyroscopic rings once
  const sphereNodesRef = useRef<Point3D[]>([]);
  const ringNodesRef = useRef<Point3D[][]>([]);

  useEffect(() => {
    // 1. Generate Uniform Fibonacci Sphere Nodes
    const nodes: Point3D[] = [];
    const numNodes = 75;
    const baseRadius = 150; // default radius

    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numNodes);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      nodes.push({
        x: baseRadius * Math.sin(phi) * Math.cos(theta),
        y: baseRadius * Math.sin(phi) * Math.sin(theta),
        z: baseRadius * Math.cos(phi)
      });
    }
    sphereNodesRef.current = nodes;

    // 2. Generate gyroscopic orbital rings around sphere
    const rings: Point3D[][] = [];
    const ringRadii = [210, 250];
    const ringTilts = [Math.PI / 5, -Math.PI / 4.5]; // diagonal tilts
    const nodesPerRing = 48;

    ringRadii.forEach((radius, ringIdx) => {
      const ringPoints: Point3D[] = [];
      const tiltAngle = ringTilts[ringIdx];
      const cosT = Math.cos(tiltAngle);
      const sinT = Math.sin(tiltAngle);

      for (let p = 0; p < nodesPerRing; p++) {
        const angle = (p / nodesPerRing) * Math.PI * 2;
        // Flat ring coordinates
        const lx = radius * Math.cos(angle);
        const ly = 0;
        const lz = radius * Math.sin(angle);

        // Rotate about Z-axis for diagonal aesthetic
        const rx = lx * cosT - ly * sinT;
        const ry = lx * sinT + ly * cosT;

        ringPoints.push({ x: rx, y: ry, z: lz });
      }
      rings.push(ringPoints);
    });
    ringNodesRef.current = rings;
  }, []);

  // Handle Resize and Main Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Pixel density responsiveness
        const dpr = window.devicePixelRatio || 1;
        width = parent.clientWidth;
        height = parent.clientHeight || 500;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Rotate point in 3D space
    const rotate3D = (point: Point3D, pitch: number, yaw: number, roll: number): Point3D => {
      // 1. Rotate around X (pitch)
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      let y1 = point.y * cosP - point.z * sinP;
      let z1 = point.y * sinP + point.z * cosP;

      // 2. Rotate around Y (yaw)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      let x2 = point.x * cosY + z1 * sinY;
      let z2 = -point.x * sinY + z1 * cosY;

      // 3. Rotate around Z (roll)
      const cosR = Math.cos(roll);
      const sinR = Math.sin(roll);
      let x3 = x2 * cosR - y1 * sinR;
      let y3 = x2 * sinR + y1 * cosR;

      return { x: x3, y: y3, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuously update auto-rotations
      ambientAngleRef.current.x += 0.003;
      ambientAngleRef.current.y += 0.005;

      // Gradually damp down manual spin velocities
      if (!isDraggingRef.current) {
        dragRotationRef.current.x *= 0.95;
        dragRotationRef.current.y *= 0.95;
      }

      // Final pitch, yaw, and roll modifiers
      const pitch = ambientAngleRef.current.x + dragRotationRef.current.y + (tilt.y * 0.012);
      const yaw = ambientAngleRef.current.y + dragRotationRef.current.x + (tilt.x * 0.012);
      const roll = (tilt.x - tilt.y) * 0.003;

      const centerX = width / 2;
      const centerY = height / 2;
      const perspective = 350; // depth view coefficient

      // Adjust scale coefficient for small screen sizes
      const baseScale = Math.min(width, height) / 500;
      const adaptiveScale = baseScale * 0.95;

      // Temporary arrays to sort elements by Depth (z-index)
      interface RenderElement {
        type: 'node' | 'line' | 'ring-point';
        x: number;
        y: number;
        z: number;
        opacity: number;
        color: string;
        radius?: number;
        targetX?: number;
        targetY?: number;
      }
      
      const elementsToRender: RenderElement[] = [];

      // 1. Process Fibonacci Sphere Nodes
      const projectedSphereNodes = sphereNodesRef.current.map((pt) => {
        // Apply responsiveness
        const scaledPt = {
          x: pt.x * adaptiveScale,
          y: pt.y * adaptiveScale,
          z: pt.z * adaptiveScale
        };
        const rotated = rotate3D(scaledPt, pitch, yaw, roll);
        // Perspective projection
        const scale = perspective / (perspective + rotated.z);
        return {
          original: pt,
          rotated,
          screenX: centerX + rotated.x * scale,
          screenY: centerY + rotated.y * scale,
          scale,
          depth: rotated.z
        };
      });

      // Assemble sphere elements for depth sorting
      projectedSphereNodes.forEach((node) => {
        // Far components have lesser opacity, nearer components have higher opacity
        // rotated.z goes from -baseRadius to +baseRadius
        const depthRange = 150 * adaptiveScale;
        const normalizedZ = (node.depth + depthRange) / (depthRange * 2); // 0 (frontmost/closest) to 1 (backmost/farthest)
        // Correct projection perspective
        const frontRatio = 1 - normalizedZ; // 1 at front, 0 at back
        const opacity = 0.12 + Math.pow(frontRatio, 2) * 0.68;
        const radius = (1.5 + frontRatio * 4.5) * node.scale;

        // Visual Colors blending from premium purple (#5E0ED7) to accent cyan-blue (#007CE7)
        const isPurple = Math.sin(node.original.x + node.original.y) > 0;
        const color = isPurple 
          ? `rgba(94, 14, 215, ${opacity})` 
          : `rgba(0, 124, 231, ${opacity})`;

        elementsToRender.push({
          type: 'node',
          x: node.screenX,
          y: node.screenY,
          z: node.depth,
          opacity,
          color,
          radius
        });
      });

      // Add holographic lattice lines linking close points in 3D
      const numNodes = projectedSphereNodes.length;
      const maxDistance = 72 * adaptiveScale;

      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const ptA = projectedSphereNodes[i].rotated;
          const ptB = projectedSphereNodes[j].rotated;
          
          // Calculate 3D euclidean distance
          const dx = ptA.x - ptB.x;
          const dy = ptA.y - ptB.y;
          const dz = ptA.z - ptB.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const avgDepth = (ptA.z + ptB.z) / 2;
            const threshold = 150 * adaptiveScale;
            const normZ = (avgDepth + threshold) / (threshold * 2);
            const frontRatio = 1 - normZ;
            
            // Render nice glowing connections
            const lineOpacity = (1 - (dist / maxDistance)) * 0.19 * Math.pow(frontRatio, 1.5);
            if (lineOpacity > 0.01) {
              elementsToRender.push({
                type: 'line',
                x: projectedSphereNodes[i].screenX, // start X
                y: projectedSphereNodes[i].screenY, // start Y
                z: avgDepth, // depth for sorting
                opacity: lineOpacity,
                color: `rgba(215, 226, 234, ${lineOpacity})`,
                targetX: projectedSphereNodes[j].screenX,
                targetY: projectedSphereNodes[j].screenY
              });
            }
          }
        }
      }

      // 2. Process Gyroscopic Rings
      ringNodesRef.current.forEach((ringPoints, ringIndex) => {
        ringPoints.forEach((pt, idx) => {
          const scaledPt = {
            x: pt.x * adaptiveScale,
            y: pt.y * adaptiveScale,
            z: pt.z * adaptiveScale
          };
          // Extra slow drift rotation for rings
          const ringPitch = pitch + (ringIndex === 0 ? 0.05 : -0.05);
          const ringYaw = yaw + (ringIndex === 0 ? -0.1 : 0.08);

          const rotated = rotate3D(scaledPt, ringPitch, ringYaw, roll);
          const scale = perspective / (perspective + rotated.z);
          const screenX = centerX + rotated.x * scale;
          const screenY = centerY + rotated.y * scale;

          const depthRange = 260 * adaptiveScale;
          const normalizedZ = (rotated.z + depthRange) / (depthRange * 2);
          const frontRatio = Math.max(0, Math.min(1, 1 - normalizedZ));
          const opacity = 0.08 + Math.pow(frontRatio, 2.2) * 0.45;

          const ringColor = ringIndex === 0 
            ? `rgba(94, 14, 215, ${opacity * 0.7})` 
            : `rgba(0, 124, 231, ${opacity * 0.7})`;

          elementsToRender.push({
            type: 'ring-point',
            x: screenX,
            y: screenY,
            z: rotated.z,
            opacity,
            color: ringColor,
            radius: (1.2 + frontRatio * 2.5) * scale
          });
        });
      });

      // 3. Depth Sorting: Backmost components (positive Z / deep inside) rendered FIRST,
      // Foremost components (negative Z / near user eye) rendered LAST
      elementsToRender.sort((a, b) => b.z - a.z);

      // 4. Render All Sorted Items
      elementsToRender.forEach((el) => {
        if (el.type === 'node' && el.radius) {
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          // Highlight shine / glow effects
          ctx.shadowBlur = el.opacity > 0.4 ? 12 : 0;
          ctx.shadowColor = el.color;
          ctx.fillStyle = el.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else if (el.type === 'ring-point' && el.radius) {
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.fillStyle = el.color;
          ctx.fill();
        } else if (el.type === 'line' && el.targetX !== undefined && el.targetY !== undefined) {
          ctx.beginPath();
          ctx.moveTo(el.x, el.y);
          ctx.lineTo(el.targetX, el.targetY);
          ctx.strokeStyle = el.color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tilt]);

  // Drag-to-spin Event Handlers
  const handleStart = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - lastMousePosRef.current.x;
    const dy = clientY - lastMousePosRef.current.y;

    // Apply incremental spin speed (adjusted for rotation math)
    dragRotationRef.current.x += dx * 0.007;
    dragRotationRef.current.y += dy * 0.007;

    // Update last reference
    lastMousePosRef.current = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div 
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
      id="3d-interactive-canvas-container"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => {
        if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={handleEnd}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full max-w-[500px] max-h-[500px] md:max-w-[580px] md:max-h-[580px] block mx-auto select-none"
      />
    </div>
  );
}
