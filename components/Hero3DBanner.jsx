'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'

/*
 * Animated 3D hero banner. Renders a rotatable phone on the right — free-orbit
 * drag with inertia + idle auto-spin. Ported from the "iPhone Banner 360" design.
 *
 * By default it draws a procedurally-built iPhone (no asset needed). Pass a
 * `modelUrl` pointing to a .glb/.gltf in /public to load a real model instead;
 * if that file is missing or fails to load, it falls back to the procedural one.
 *
 *   <Hero3DBanner modelUrl="/models/iphone.glb" title="iPhone 17 Pro" />
 */

/* Frame a loaded glTF scene: center it at the origin and scale it so its tallest
 * dimension roughly matches the procedural phone (~6.2 units). */
function frameModel(THREE, model, targetSize = 6.2) {
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    model.scale.setScalar(targetSize / maxDim)
}

/* Builds the fallback iPhone entirely in code and adds it to `phone`. */
function buildProceduralPhone(THREE, phone) {
    const w = 3.0, h = 6.15, depth = 0.30, corner = 0.55
    const rr = (s, W2, H2, r) => {
        const x = -W2 / 2, y = -H2 / 2
        s.moveTo(x + r, y)
        s.lineTo(x + W2 - r, y); s.quadraticCurveTo(x + W2, y, x + W2, y + r)
        s.lineTo(x + W2, y + H2 - r); s.quadraticCurveTo(x + W2, y + H2, x + W2 - r, y + H2)
        s.lineTo(x + r, y + H2); s.quadraticCurveTo(x, y + H2, x, y + H2 - r)
        s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y)
    }
    const shape = new THREE.Shape(); rr(shape, w, h, corner)
    const bodyGeo = new THREE.ExtrudeGeometry(shape, {
        depth: depth, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.13, bevelSegments: 8, steps: 1, curveSegments: 48,
    })
    bodyGeo.center(); bodyGeo.computeBoundingBox()
    const bb = bodyGeo.boundingBox
    const frontZ = bb.max.z, backZ = bb.min.z

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a3d52, metalness: 1.0, roughness: 0.28, envMapIntensity: 1.35 })
    phone.add(new THREE.Mesh(bodyGeo, bodyMat))

    // ---- screen (front, self-lit) ----
    const sc = document.createElement('canvas'); sc.width = 560; sc.height = 1180
    const sx = sc.getContext('2d')
    const rpath = (c, x, y, ww, hh, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + ww, y, x + ww, y + hh, r); c.arcTo(x + ww, y + hh, x, y + hh, r); c.arcTo(x, y + hh, x, y, r); c.arcTo(x, y, x + ww, y, r); c.closePath() }
    sx.clearRect(0, 0, sc.width, sc.height)
    rpath(sx, 0, 0, sc.width, sc.height, 96); sx.save(); sx.clip()
    const wg = sx.createLinearGradient(0, 0, sc.width, sc.height)
    wg.addColorStop(0, '#20307e'); wg.addColorStop(0.5, '#3c2c86'); wg.addColorStop(1, '#0d1440')
    sx.fillStyle = wg; sx.fillRect(0, 0, sc.width, sc.height)
    const blob = (cx, cy, r, col) => { const g = sx.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = g; sx.beginPath(); sx.arc(cx, cy, r, 0, 7); sx.fill() }
    blob(140, 760, 340, 'rgba(90,120,255,.55)'); blob(430, 520, 300, 'rgba(180,90,220,.45)'); blob(300, 1050, 360, 'rgba(60,180,230,.4)')
    sx.fillStyle = '#fff'; sx.textAlign = 'center'; sx.font = '300 150px Poppins, sans-serif'
    sx.fillText('9:41', sc.width / 2, 360)
    const dateStr = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    sx.font = '500 34px Poppins, sans-serif'; sx.globalAlpha = 0.9
    sx.fillText(dateStr, sc.width / 2, 420); sx.globalAlpha = 1
    sx.fillStyle = '#000'; rpath(sx, sc.width / 2 - 100, -30, 200, 74, 37); sx.fill()
    sx.restore()
    const screenTex = new THREE.CanvasTexture(sc); screenTex.anisotropy = 4
    if (THREE.SRGBColorSpace !== undefined) screenTex.colorSpace = THREE.SRGBColorSpace
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, transparent: true })
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.34, h - 0.34), screenMat); screen.position.z = frontZ + 0.012; phone.add(screen)
    const glassMat = new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.12, roughness: 0.05, metalness: 0, clearcoat: 1, envMapIntensity: 2.0, color: 0xffffff })
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.2, h - 0.2), glassMat); glass.position.z = frontZ + 0.02; phone.add(glass)

    // ---- back glass ----
    const backMat = new THREE.MeshPhysicalMaterial({ color: 0x223349, metalness: 0.35, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 1.2 })
    const back = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.22, h - 0.22), backMat); back.position.z = backZ - 0.012; back.rotation.y = Math.PI; phone.add(back)
    const lc = document.createElement('canvas'); lc.width = lc.height = 128; const lx = lc.getContext('2d')
    lx.fillStyle = 'rgba(210,225,245,0.85)'; lx.beginPath(); lx.arc(64, 66, 26, 0, 7); lx.fill()
    lx.globalCompositeOperation = 'destination-out'; lx.beginPath(); lx.arc(82, 60, 22, 0, 7); lx.fill()
    lx.globalCompositeOperation = 'source-over'; lx.fillStyle = 'rgba(210,225,245,0.85)'; lx.beginPath(); lx.ellipse(72, 30, 8, 12, 0.6, 0, 7); lx.fill()
    const logoTex = new THREE.CanvasTexture(lc)
    if (THREE.SRGBColorSpace !== undefined) logoTex.colorSpace = THREE.SRGBColorSpace
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, opacity: 0.5 }))
    logo.position.set(0, 0.2, backZ - 0.02); logo.rotation.y = Math.PI; phone.add(logo)

    // ---- camera module (back, top-left) ----
    const camGroup = new THREE.Group()
    const bumpShape = new THREE.Shape(); rr(bumpShape, 1.5, 1.5, 0.38)
    const bumpGeo = new THREE.ExtrudeGeometry(bumpShape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 24 })
    bumpGeo.center()
    const bump = new THREE.Mesh(bumpGeo, new THREE.MeshPhysicalMaterial({ color: 0x2a3b52, metalness: 0.6, roughness: 0.3, clearcoat: 0.8, envMapIntensity: 1.2 }))
    bump.rotation.y = Math.PI; camGroup.add(bump)
    const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x05070c, metalness: 0.9, roughness: 0.08, clearcoat: 1, envMapIntensity: 1.6 })
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x3d4d62, metalness: 1, roughness: 0.35, envMapIntensity: 1.3 })
    const lens = (lx2, ly) => {
        const g = new THREE.Group()
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.2, 40), ringMat)
        ring.rotation.x = Math.PI / 2; g.add(ring)
        const glassL = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.24, 40), lensMat)
        glassL.rotation.x = Math.PI / 2; g.add(glassL)
        const spec = new THREE.Mesh(new THREE.CircleGeometry(0.07, 20), new THREE.MeshBasicMaterial({ color: 0x6fa8ff, transparent: true, opacity: 0.5 }))
        spec.position.set(-0.1, 0.1, -0.14); g.add(spec)
        g.position.set(lx2, ly, -0.16); return g
    }
    camGroup.add(lens(-0.32, 0.34)); camGroup.add(lens(0.32, 0.34)); camGroup.add(lens(0, -0.34))
    const flash = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.16, 24), new THREE.MeshStandardMaterial({ color: 0xf3f0e2, emissive: 0x222018, roughness: 0.3 }))
    flash.rotation.x = Math.PI / 2; flash.position.set(0.34, 0.34, -0.14); camGroup.add(flash)
    const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.16, 24), lensMat)
    lidar.rotation.x = Math.PI / 2; lidar.position.set(-0.32, -0.34, -0.14); camGroup.add(lidar)
    camGroup.position.set(-w / 2 + 1.02, h / 2 - 1.02, backZ - 0.02)
    phone.add(camGroup)

    phone.scale.setScalar(0.98)
}

/* Builds the Three.js scene inside `mount`, wires drag interaction on `stage`,
 * fades out `hint` on first interaction. Returns a cleanup function.
 * opts: { modelUrl, GLTFLoader } — when both set, loads a real model. */
function initPhone(THREE, mount, stage, hint, opts = {}) {
    const W = mount.clientWidth || 730
    const H = mount.clientHeight || 600

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100)
    camera.position.set(0, 0, 15.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    if (THREE.SRGBColorSpace !== undefined) renderer.outputColorSpace = THREE.SRGBColorSpace
    else if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)

    // ---- studio environment for metallic reflections ----
    const envC = document.createElement('canvas'); envC.width = 512; envC.height = 256
    const ex = envC.getContext('2d')
    const eg = ex.createLinearGradient(0, 0, 0, 256)
    eg.addColorStop(0, '#3a4658'); eg.addColorStop(0.45, '#141922'); eg.addColorStop(1, '#05070a')
    ex.fillStyle = eg; ex.fillRect(0, 0, 512, 256)
    ex.globalCompositeOperation = 'lighter'
    const box = (cx, cy, rw, rh, a) => {
        const g = ex.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rw, rh))
        g.addColorStop(0, 'rgba(255,255,255,' + a + ')'); g.addColorStop(1, 'rgba(255,255,255,0)')
        ex.save(); ex.translate(cx, cy); ex.scale(rw / Math.max(rw, rh), rh / Math.max(rw, rh))
        ex.beginPath(); ex.arc(0, 0, Math.max(rw, rh), 0, 7); ex.fill(); ex.restore()
    }
    box(120, 70, 150, 60, 0.9); box(400, 90, 120, 55, 0.7); box(280, 40, 90, 40, 0.5)
    const envTex = new THREE.CanvasTexture(envC); envTex.mapping = THREE.EquirectangularReflectionMapping
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envMap = pmrem.fromEquirectangular(envTex).texture
    scene.environment = envMap

    // ---- lights ----
    scene.add(new THREE.HemisphereLight(0xbcd2ff, 0x0a0d12, 0.6))
    const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(4, 6, 8); scene.add(key)
    const rim = new THREE.DirectionalLight(0x6ea0ff, 2.4); rim.position.set(-6, 2, -5); scene.add(rim)
    const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(-3, -4, 6); scene.add(fill)

    // ---- content: real model (if provided) or procedural fallback ----
    const phone = new THREE.Group()
    scene.add(phone)
    const { modelUrl, GLTFLoader } = opts
    if (modelUrl && GLTFLoader) {
        new GLTFLoader().load(
            modelUrl,
            (gltf) => { frameModel(THREE, gltf.scene); phone.add(gltf.scene) },
            undefined,
            (err) => {
                console.warn('[Hero3DBanner] modelo 3D não carregou (' + modelUrl + '); usando fallback procedural.', err)
                buildProceduralPhone(THREE, phone)
            },
        )
    } else {
        buildProceduralPhone(THREE, phone)
    }

    // ---- interaction: free orbit (any direction) + inertia + idle auto-spin ----
    const TILT_MAX = 1.25
    let angleY = 0.35, angleX = -0.06, velY = 0, velX = 0
    let dragging = false, lastX = 0, lastY = 0, idle = 0, interacted = false

    const onDown = (e) => {
        dragging = true; lastX = e.clientX; lastY = e.clientY; stage.style.cursor = 'grabbing'; idle = 0
        if (!interacted) { interacted = true; if (hint) { hint.style.animation = 'none'; hint.style.opacity = '0' } }
        try { stage.setPointerCapture(e.pointerId) } catch (err) {}
    }
    const onMove = (e) => {
        if (!dragging) return
        const dx = e.clientX - lastX; const dy = e.clientY - lastY
        lastX = e.clientX; lastY = e.clientY
        angleY += dx * 0.01; velY = dx * 0.01
        angleX += dy * 0.01; velX = dy * 0.01
        angleX = Math.max(-TILT_MAX, Math.min(TILT_MAX, angleX))
    }
    const onUp = () => { if (!dragging) return; dragging = false; stage.style.cursor = 'grab'; idle = 0 }
    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('pointerleave', onUp)

    const t0 = performance.now()
    let raf = 0
    const animate = () => {
        const t = (performance.now() - t0) / 1000
        if (!dragging) {
            if (Math.abs(velY) > 0.0004) { angleY += velY; velY *= 0.94; idle = 0 }
            else { idle += 0.016; if (idle > 0.8) angleY += 0.004 }
            if (Math.abs(velX) > 0.0004) {
                angleX += velX; velX *= 0.9
                angleX = Math.max(-TILT_MAX, Math.min(TILT_MAX, angleX))
            } else if (idle > 0.8) {
                angleX += (-0.06 - angleX) * 0.02
            }
        }
        phone.rotation.y = angleY
        phone.rotation.x = angleX + Math.sin(t * 0.6) * 0.02
        phone.position.y = Math.sin(t * 0.9) * 0.16
        renderer.render(scene, camera)
        raf = requestAnimationFrame(animate)
    }
    animate()

    const ro = new ResizeObserver(() => {
        const nw = mount.clientWidth, nh = mount.clientHeight
        if (!nw || !nh) return
        camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh)
    })
    ro.observe(mount)

    // ---- cleanup ----
    return () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        stage.removeEventListener('pointerdown', onDown)
        stage.removeEventListener('pointermove', onMove)
        stage.removeEventListener('pointerup', onUp)
        stage.removeEventListener('pointercancel', onUp)
        stage.removeEventListener('pointerleave', onUp)
        scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose()
            if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
                for (const k in m) { const v = m[k]; if (v && v.isTexture) v.dispose() }
                m.dispose()
            })
        })
        envTex.dispose(); envMap.dispose(); pmrem.dispose()
        renderer.dispose()
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
}

export default function Hero3DBanner({
    eyebrow = 'From $999',
    title = 'iPhone 12 Pro',
    badge = '3D',
    modelUrl = null,
    primaryCta = { label: 'Buy Now', href: '/shop' },
    secondaryCta = { label: 'Watch Video', href: '#' },
}) {
    const mountRef = useRef(null)
    const stageRef = useRef(null)
    const hintRef = useRef(null)

    useEffect(() => {
        let disposed = false
        let cleanup = () => {}
        ;(async () => {
            const THREE = await import('three')
            // only pull in the (heavier) glTF loader when a model is requested
            let GLTFLoader = null
            if (modelUrl) {
                try { ({ GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')) } catch (e) {}
            }
            if (disposed || !mountRef.current || !stageRef.current) return
            // wait for Poppins so the on-screen clock renders in the right face
            try { await document.fonts.ready } catch (e) {}
            if (disposed || !mountRef.current) return
            cleanup = initPhone(THREE, mountRef.current, stageRef.current, hintRef.current, { modelUrl, GLTFLoader })
        })()
        return () => { disposed = true; cleanup() }
    }, [modelUrl])

    return (
        <section className="bg-[#0F0E17] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                <div className="relative overflow-hidden rounded-[22px] bg-[#111518] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
                    {/* ambient glow behind the product */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute right-[-40px] top-1/2 hidden h-[820px] w-[820px] rounded-full lg:block"
                        style={{
                            background: 'radial-gradient(circle, rgba(50,110,220,.42), rgba(50,110,220,0) 62%)',
                            filter: 'blur(10px)',
                            animation: 'glowPulse 7s ease-in-out infinite',
                        }}
                    />

                    <div className="relative z-[2] grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-2">
                        {/* Left copy */}
                        <div className="text-center lg:text-left" style={{ animation: 'fadeUp 1s cubic-bezier(.2,.8,.2,1) both' }}>
                            {badge && (
                                <span className="mb-4 inline-block rounded-lg bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white">
                                    {badge}
                                </span>
                            )}
                            <p className="text-lg text-white/60">{eyebrow}</p>
                            <h1 className="mt-1.5 text-5xl font-bold leading-[1] tracking-tight sm:text-6xl xl:text-7xl">
                                {title}
                            </h1>
                            <div className="mt-9 flex items-center justify-center gap-7 lg:justify-start">
                                <Link
                                    href={primaryCta.href}
                                    className="rounded-xl bg-[#f4f5f6] px-8 py-4 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(255,255,255,0.35)] active:scale-95"
                                >
                                    {primaryCta.label}
                                </Link>
                                <Link href={secondaryCta.href} className="flex items-center gap-3 text-white/80 transition hover:text-white">
                                    <span className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-white/25">
                                        <Play size={14} fill="currentColor" className="ml-0.5" />
                                    </span>
                                    <span className="font-medium">{secondaryCta.label}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right 3D stage */}
                        <div
                            ref={stageRef}
                            className="relative h-[380px] cursor-grab select-none sm:h-[480px] lg:h-[560px]"
                            style={{ touchAction: 'none' }}
                        >
                            {/* orbit rings */}
                            <div className="pointer-events-none absolute left-1/2 top-[72%] h-[130px] w-[520px] max-w-full -translate-x-1/2 -translate-y-1/2">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(ellipse at center, rgba(60,120,230,.32), rgba(60,120,230,0) 70%)',
                                        animation: 'ringspin 14s linear infinite',
                                    }}
                                />
                                <div
                                    className="absolute inset-6 rounded-full"
                                    style={{
                                        border: '1.5px solid rgba(120,170,255,.22)',
                                        borderTopColor: 'rgba(150,190,255,.55)',
                                        animation: 'ringspin 7s linear infinite',
                                    }}
                                />
                            </div>

                            <div ref={mountRef} className="absolute inset-0" />

                            <div
                                ref={hintRef}
                                className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[13px] font-medium text-white/50 transition-opacity duration-500"
                                style={{ animation: 'hintPulse 2.4s ease-in-out infinite' }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3" />
                                </svg>
                                arraste em qualquer direção
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
