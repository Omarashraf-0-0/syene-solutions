import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export type Background3DMode = 'solid' | 'subtle';

interface MicroParticleData {
  baseX: number;
  baseY: number;
  baseZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  scale: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
  driftFrequency: number;
  driftPhase: number;
}

export const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const glowOverlayRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Hardware/Software WebGL Detection Guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 2. Three.js Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const isLightInitial = themeRef.current === 'light';
    scene.fog = new THREE.FogExp2(
      isLightInitial ? 0xfaf6ee : 0x0a1622,
      isLightInitial ? 0.026 : 0.018
    );

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 90);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLightInitial ? 0.92 : 1.30;

    container.appendChild(renderer.domElement);

    // 3. Programmatic Circular Particle Sprite Texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(250, 246, 238, 1)'); // Warm White #FAF6EE
      gradient.addColorStop(0.25, 'rgba(217, 164, 65, 0.90)'); // Syene Gold #D9A441
      gradient.addColorStop(0.55, 'rgba(20, 60, 90, 0.40)'); // Nile Navy #143C5A
      gradient.addColorStop(1, 'rgba(10, 22, 34, 0)'); // Nile Night #0A1622

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // 4. Starfield Depth Particulate:
    const starCount = isSoftwareGl ? 350 : 850;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xfaf6ee), // Warm White
      new THREE.Color(0xd9a441), // Syene Gold
      new THREE.Color(0x6e87a0), // Steel Blue
      new THREE.Color(0x143c5a), // Nile Navy
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const spreadX = 42;
      const spreadY = 30;
      const spreadZ = 35;

      starPositions[i3] = (Math.random() - 0.5) * spreadX;
      starPositions[i3 + 1] = (Math.random() - 0.5) * spreadY;
      starPositions[i3 + 2] = -14 + (Math.random() - 0.5) * spreadZ;

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i3] = chosenColor.r;
      starColors[i3 + 1] = chosenColor.g;
      starColors[i3 + 2] = chosenColor.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: isLightInitial ? 0.12 : 0.22,
      vertexColors: true,
      transparent: true,
      opacity: isLightInitial ? 0.18 : 0.85,
      map: particleTexture || undefined,
      blending: isLightInitial ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5. Instanced Micro-Geometric Floating Space Shapes:
    // Light mode: subtle, soft transparency (0.22)
    // Dark mode: solid, crisp facets with high opacity (0.95) & obsidian depth
    const crystalCount = isSoftwareGl ? 45 : 75;
    const crystalGeometry = new THREE.OctahedronGeometry(0.2, 0);

    const crystalMaterial = new THREE.MeshStandardMaterial({
      color: isLightInitial ? 0x143c5a : 0xd9a441,
      emissive: isLightInitial ? 0x6e87a0 : 0x143c5a,
      emissiveIntensity: isLightInitial ? 0.08 : 0.32,
      roughness: isLightInitial ? 0.45 : 0.12,
      metalness: isLightInitial ? 0.35 : 0.88,
      transparent: true,
      opacity: isLightInitial ? 0.22 : 0.95,
      wireframe: false,
    });

    const crystalInstanced = new THREE.InstancedMesh(crystalGeometry, crystalMaterial, crystalCount);
    crystalInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(crystalInstanced);

    // Second Shape: Micro-Tetrahedrons in Nile Navy / Steel Blue
    const tetraCount = isSoftwareGl ? 30 : 50;
    const tetraGeometry = new THREE.TetrahedronGeometry(0.22, 0);

    const tetraMaterial = new THREE.MeshStandardMaterial({
      color: isLightInitial ? 0x6e87a0 : 0x143c5a,
      emissive: isLightInitial ? 0x143c5a : 0x0e2336,
      emissiveIntensity: isLightInitial ? 0.06 : 0.28,
      roughness: isLightInitial ? 0.50 : 0.18,
      metalness: isLightInitial ? 0.30 : 0.82,
      transparent: true,
      opacity: isLightInitial ? 0.18 : 0.92,
      wireframe: false,
    });

    const tetraInstanced = new THREE.InstancedMesh(tetraGeometry, tetraMaterial, tetraCount);
    tetraInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(tetraInstanced);

    // Peripheral orbital distribution (keep center text corridor clear)
    const dummy = new THREE.Object3D();

    const initParticleData = (count: number, zBias: number): MicroParticleData[] => {
      const data: MicroParticleData[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distFromCenter = 4.8 + Math.random() * 11;

        const x = Math.cos(angle) * distFromCenter;
        const y = Math.sin(angle) * (distFromCenter * 0.72);
        const z = zBias + (Math.random() - 0.5) * 14;

        data.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          currentX: x,
          currentY: y,
          currentZ: z,
          rotX: Math.random() * Math.PI * 2,
          rotY: Math.random() * Math.PI * 2,
          rotZ: Math.random() * Math.PI * 2,
          rotSpeedX: (Math.random() - 0.5) * 0.22,
          rotSpeedY: (Math.random() - 0.5) * 0.32,
          rotSpeedZ: (Math.random() - 0.5) * 0.18,
          scale: 0.45 + Math.random() * 0.7,
          orbitRadius: 0.3 + Math.random() * 0.9,
          orbitSpeed: 0.08 + Math.random() * 0.16,
          orbitPhase: Math.random() * Math.PI * 2,
          driftFrequency: 0.15 + Math.random() * 0.25,
          driftPhase: Math.random() * Math.PI * 2,
        });
      }
      return data;
    };

    const crystalParticles = initParticleData(crystalCount, -2);
    const tetraParticles = initParticleData(tetraCount, -3.5);

    // 6. Connecting Constellation Filament Lines
    const lineMaxConnections = isSoftwareGl ? 25 : 50;
    const linePositions = new Float32Array(lineMaxConnections * 2 * 3);
    const lineColors = new Float32Array(lineMaxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isLightInitial ? 0.10 : 0.48,
      blending: isLightInitial ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constellationLines);

    // 7. Ambient Space Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      isLightInitial ? 0xf5eaf0 : 0x160107,
      isLightInitial ? 1.4 : 1.2
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc50337, isLightInitial ? 1.6 : 2.5);
    keyLight.position.set(8, 10, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x69001f, isLightInitial ? 1.0 : 1.5);
    fillLight.position.set(-8, -6, 4);
    scene.add(fillLight);

    // Mouse-following subtle point light in Crimson Red
    const mouseFollowLight = new THREE.PointLight(0xc50337, isLightInitial ? 1.0 : 1.8, 14);
    mouseFollowLight.position.set(0, 0, 4);
    scene.add(mouseFollowLight);

    // 8. Interactive Cursor Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetPixelX = width * 0.5;
    let targetPixelY = height * 0.4;
    let currentPixelX = width * 0.5;
    let currentPixelY = height * 0.4;

    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetPixelX = e.clientX;
      targetPixelY = e.clientY;
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 9. Render Loop
    let frameId = 0;
    let isVisible = true;
    const clock = new THREE.Clock();

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) clock.getDelta();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const renderLoop = () => {
      if (!isVisible) {
        frameId = requestAnimationFrame(renderLoop);
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const isLight = themeRef.current === 'light';

      // Dynamic Opacity & Tone:
      // In Light Mode: Always subtle (0.22 crystal, 0.18 tetra, 0.18 star, 0.10 line)
      // In Dark Mode: Solid (0.95 crystal, 0.92 tetra, 0.85 star, 0.48 line)
      const targetCrystalOpacity = isLight ? 0.22 : 0.95;
      const targetTetraOpacity = isLight ? 0.18 : 0.92;
      const targetStarOpacity = isLight ? 0.18 : 0.85;
      const targetLineOpacity = isLight ? 0.10 : 0.48;
      const targetExposure = isLight ? 0.92 : 1.30;

      crystalMaterial.opacity = THREE.MathUtils.damp(crystalMaterial.opacity, targetCrystalOpacity, 4.0, delta);
      tetraMaterial.opacity = THREE.MathUtils.damp(tetraMaterial.opacity, targetTetraOpacity, 4.0, delta);
      starMaterial.opacity = THREE.MathUtils.damp(starMaterial.opacity, targetStarOpacity, 4.0, delta);
      lineMaterial.opacity = THREE.MathUtils.damp(lineMaterial.opacity, targetLineOpacity, 4.0, delta);
      renderer.toneMappingExposure = THREE.MathUtils.damp(renderer.toneMappingExposure, targetExposure, 4.0, delta);

      // Live Theme Smooth Transitions
      const targetFogColor = isLight ? 0xfaf6ee : 0x0a1622;
      if (scene.fog) {
        scene.fog.color.lerp(new THREE.Color(targetFogColor), delta * 4);
      }

      const targetCrystalColor = isLight ? 0x143c5a : 0xd9a441;
      crystalMaterial.color.lerp(new THREE.Color(targetCrystalColor), delta * 4);
      crystalMaterial.emissive.lerp(new THREE.Color(isLight ? 0x6e87a0 : 0x143c5a), delta * 4);
      crystalMaterial.emissiveIntensity = THREE.MathUtils.damp(
        crystalMaterial.emissiveIntensity,
        isLight ? 0.08 : 0.32,
        4.0,
        delta
      );

      const targetTetraColor = isLight ? 0x6e87a0 : 0x143c5a;
      tetraMaterial.color.lerp(new THREE.Color(targetTetraColor), delta * 4);
      tetraMaterial.emissive.lerp(new THREE.Color(isLight ? 0x143c5a : 0x0e2336), delta * 4);
      tetraMaterial.emissiveIntensity = THREE.MathUtils.damp(
        tetraMaterial.emissiveIntensity,
        isLight ? 0.06 : 0.28,
        4.0,
        delta
      );

      // Smooth mouse coordinates
      currentMouseX = THREE.MathUtils.damp(currentMouseX, targetMouseX, 3.2, delta);
      currentMouseY = THREE.MathUtils.damp(currentMouseY, targetMouseY, 3.2, delta);

      currentPixelX = THREE.MathUtils.damp(currentPixelX, targetPixelX, 3.8, delta);
      currentPixelY = THREE.MathUtils.damp(currentPixelY, targetPixelY, 3.8, delta);

      currentScrollY = THREE.MathUtils.damp(currentScrollY, targetScrollY, 3.2, delta);
      const scrollOffset = currentScrollY * 0.0012;

      // Mouse-Following Light Coordinates
      const lightTargetX = currentMouseX * 6.5;
      const lightTargetY = currentMouseY * 4.5;
      mouseFollowLight.position.x = THREE.MathUtils.damp(mouseFollowLight.position.x, lightTargetX, 4.0, delta);
      mouseFollowLight.position.y = THREE.MathUtils.damp(mouseFollowLight.position.y, lightTargetY, 4.0, delta);
      mouseFollowLight.position.z = 3.5 + Math.sin(elapsed * 1.5) * 0.4;
      mouseFollowLight.intensity = isLight ? 0.9 : 1.8;

      // Deep Starfield Drift
      starField.rotation.y = elapsed * 0.008 + currentMouseX * 0.04;
      starField.rotation.x = currentMouseY * 0.03 - scrollOffset * 0.25;
      starField.position.y = -scrollOffset * 0.7;

      // Update Octahedron Crystals InstancedMesh
      const cursor3DX = currentMouseX * 7.0;
      const cursor3DY = currentMouseY * 5.0;

      for (let i = 0; i < crystalCount; i++) {
        const p = crystalParticles[i];

        const orbitAngle = elapsed * p.orbitSpeed + p.orbitPhase;
        const drift = Math.sin(elapsed * p.driftFrequency + p.driftPhase);

        const ox = Math.cos(orbitAngle) * p.orbitRadius;
        const oy = Math.sin(orbitAngle) * (p.orbitRadius * 0.8);
        const oz = drift * (p.orbitRadius * 0.6);

        // Repel from cursor so shapes never block interactions
        const dx = p.baseX + ox - cursor3DX;
        const dy = p.baseY + oy - cursor3DY;
        const distToCursorSq = dx * dx + dy * dy;
        let repelX = 0;
        let repelY = 0;

        if (distToCursorSq < 16) {
          const force = (1 - Math.sqrt(distToCursorSq) / 4) * 0.5;
          repelX = (dx / (Math.sqrt(distToCursorSq) + 0.1)) * force;
          repelY = (dy / (Math.sqrt(distToCursorSq) + 0.1)) * force;
        }

        p.currentX = p.baseX + ox + repelX + currentMouseX * 0.5;
        p.currentY = p.baseY + oy + repelY + currentMouseY * 0.4 - scrollOffset;
        p.currentZ = p.baseZ + oz;

        p.rotX += p.rotSpeedX * delta;
        p.rotY += p.rotSpeedY * delta;
        p.rotZ += p.rotSpeedZ * delta;

        dummy.position.set(p.currentX, p.currentY, p.currentZ);
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();

        crystalInstanced.setMatrixAt(i, dummy.matrix);
      }
      crystalInstanced.instanceMatrix.needsUpdate = true;

      // Update Tetrahedrons InstancedMesh
      for (let i = 0; i < tetraCount; i++) {
        const p = tetraParticles[i];

        const orbitAngle = elapsed * p.orbitSpeed + p.orbitPhase;
        const drift = Math.cos(elapsed * p.driftFrequency + p.driftPhase);

        const ox = Math.sin(orbitAngle) * p.orbitRadius;
        const oy = Math.cos(orbitAngle) * (p.orbitRadius * 0.7);
        const oz = drift * (p.orbitRadius * 0.5);

        p.currentX = p.baseX + ox + currentMouseX * 0.4;
        p.currentY = p.baseY + oy + currentMouseY * 0.35 - scrollOffset * 0.85;
        p.currentZ = p.baseZ + oz;

        p.rotX += p.rotSpeedX * delta;
        p.rotY += p.rotSpeedY * delta;
        p.rotZ += p.rotSpeedZ * delta;

        dummy.position.set(p.currentX, p.currentY, p.currentZ);
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();

        tetraInstanced.setMatrixAt(i, dummy.matrix);
      }
      tetraInstanced.instanceMatrix.needsUpdate = true;

      // Dynamic Constellation Filament Lines
      let lineIndex = 0;
      const positions = lineGeometry.attributes.position.array as Float32Array;
      const colors = lineGeometry.attributes.color.array as Float32Array;

      const sampleStep = isSoftwareGl ? 5 : 3;
      for (let i = 0; i < Math.min(crystalCount, 40); i += sampleStep) {
        if (lineIndex >= lineMaxConnections) break;
        const p1 = crystalParticles[i];

        for (let j = i + 1; j < Math.min(crystalCount, 40); j += sampleStep) {
          if (lineIndex >= lineMaxConnections) break;
          const p2 = crystalParticles[j];

          const ddx = p1.currentX - p2.currentX;
          const ddy = p1.currentY - p2.currentY;
          const ddz = p1.currentZ - p2.currentZ;
          const distSq = ddx * ddx + ddy * ddy + ddz * ddz;

          if (distSq < 13) {
            const idx6 = lineIndex * 6;
            positions[idx6] = p1.currentX;
            positions[idx6 + 1] = p1.currentY;
            positions[idx6 + 2] = p1.currentZ;

            positions[idx6 + 3] = p2.currentX;
            positions[idx6 + 4] = p2.currentY;
            positions[idx6 + 5] = p2.currentZ;

            const alpha = Math.max(0, 1 - Math.sqrt(distSq) / 3.6);
            const lineCol = isLight ? new THREE.Color(0x143c5a) : new THREE.Color(0xd9a441);

            colors[idx6] = lineCol.r * alpha;
            colors[idx6 + 1] = lineCol.g * alpha;
            colors[idx6 + 2] = lineCol.b * alpha;

            colors[idx6 + 3] = lineCol.r * alpha * 0.7;
            colors[idx6 + 4] = lineCol.g * alpha * 0.7;
            colors[idx6 + 5] = lineCol.b * alpha * 0.7;

            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Syene Ambient Glow overlay on DOM
      if (glowOverlayRef.current) {
        if (isLight) {
          glowOverlayRef.current.style.background = `
            radial-gradient(circle 950px at 10% 10%, rgba(20, 60, 90, 0.04) 0%, transparent 70%),
            radial-gradient(circle 850px at 90% 15%, rgba(217, 164, 65, 0.05) 0%, transparent 65%),
            radial-gradient(circle 900px at 85% 85%, rgba(110, 135, 160, 0.04) 0%, transparent 70%)
          `;
        } else {
          glowOverlayRef.current.style.background = `
            radial-gradient(circle 1000px at 10% 10%, rgba(20, 60, 90, 0.24) 0%, rgba(20, 60, 90, 0.06) 45%, transparent 75%),
            radial-gradient(circle 900px at 90% 15%, rgba(217, 164, 65, 0.07) 0%, rgba(217, 164, 65, 0.01) 40%, transparent 70%),
            radial-gradient(circle 850px at 85% 85%, rgba(110, 135, 160, 0.08) 0%, transparent 65%)
          `;
        }
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 10. Window Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 11. Clean Disposal on Unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      starGeometry.dispose();
      starMaterial.dispose();
      if (particleTexture) particleTexture.dispose();

      crystalGeometry.dispose();
      crystalMaterial.dispose();
      crystalInstanced.dispose();

      tetraGeometry.dispose();
      tetraMaterial.dispose();
      tetraInstanced.dispose();

      lineGeometry.dispose();
      lineMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      {/* 3D WebGL Canvas Layer with Center Vignette to protect text contrast */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 transition-opacity duration-700 ${
          isDark ? 'opacity-90' : 'opacity-35'
        }`}
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,1) 85%)',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,1) 85%)',
        }}
      />

      {/* Atmospheric Glow Overlay */}
      <div
        ref={glowOverlayRef}
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 transition-opacity duration-700 ${
          isDark ? 'opacity-85' : 'opacity-20'
        }`}
      />
    </>
  );
};
