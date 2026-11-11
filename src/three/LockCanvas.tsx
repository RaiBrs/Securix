import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Group, MathUtils } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

export type LockControls = { pitch: number; yaw: number; dragging: boolean }

function LockModel({ controls }: { controls: RefObject<LockControls> }) {
  const group = useRef<Group>(null)
  const body = useMemo(() => new RoundedBoxGeometry(2.2, 1.65, 0.72, 5, 0.12), [])
  const face = useMemo(() => new RoundedBoxGeometry(1.94, 1.38, 0.08, 4, 0.08), [])

  useEffect(() => () => {
    body.dispose()
    face.dispose()
  }, [body, face])

  useFrame((state, delta) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    const response = controls.current.dragging ? 12 : 3
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -0.12 + controls.current.pitch + Math.sin(time * 0.55) * 0.12, response, delta)
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -0.3 + controls.current.yaw + Math.sin(time * 0.68) * 0.42, response, delta)
    group.current.position.y = Math.sin(time * 0.85) * 0.1
  })

  return (
    <group ref={group} rotation={[-0.12, -0.35, 0]}>
      <group position={[0, 0.53, -0.06]}>
        <mesh>
          <torusGeometry args={[0.78, 0.155, 14, 72, Math.PI]} />
          <meshPhysicalMaterial color="#33313d" metalness={0.88} roughness={0.24} clearcoat={0.32} />
        </mesh>
        {[-0.78, 0.78].map((x) => (
          <mesh key={x} position={[x, -0.42, 0]}>
            <cylinderGeometry args={[0.155, 0.155, 0.86, 20]} />
            <meshPhysicalMaterial color="#35323f" metalness={0.88} roughness={0.24} />
          </mesh>
        ))}
      </group>
      <mesh geometry={body} position={[0, -0.75, 0]} castShadow>
        <meshPhysicalMaterial color="#24222d" metalness={0.82} roughness={0.3} clearcoat={0.28} />
      </mesh>
      <mesh geometry={face} position={[0, -0.75, 0.39]}>
        <meshPhysicalMaterial color="#1a1923" metalness={0.73} roughness={0.34} clearcoat={0.22} />
      </mesh>
      <mesh position={[0, -0.74, 0.445]}>
        <torusGeometry args={[0.235, 0.026, 12, 48]} />
        <meshStandardMaterial color="#8471a8" metalness={0.8} roughness={0.32} />
      </mesh>
      <mesh position={[0, -0.74, 0.448]}>
        <circleGeometry args={[0.204, 48]} />
        <meshStandardMaterial color="#08080d" metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.705, 0.454]}>
        <circleGeometry args={[0.052, 24]} />
        <meshBasicMaterial color="#030306" />
      </mesh>
      <mesh position={[0, -0.795, 0.455]}>
        <boxGeometry args={[0.056, 0.17, 0.012]} />
        <meshBasicMaterial color="#030306" />
      </mesh>
      {[-0.82, 0.82].map((x) => (
        <mesh key={x} position={[x, -0.75, 0.451]}>
          <boxGeometry args={[0.012, 0.92, 0.012]} />
          <meshBasicMaterial color="#655877" />
        </mesh>
      ))}
    </group>
  )
}

export default function LockCanvas({ active, controls }: { active: boolean; controls: RefObject<LockControls> }) {
  return (
    <Canvas
      className="lock-experience__canvas"
      camera={{ position: [0, 0.05, 5.4], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.78} />
      <directionalLight color="#d9d5ed" intensity={2.3} position={[-3, 5, 5]} />
      <pointLight color="#8d67ff" intensity={34} distance={8} position={[3, 1, 3]} />
      <pointLight color="#706a84" intensity={14} distance={7} position={[-3, -2, -2]} />
      <LockModel controls={controls} />
    </Canvas>
  )
}
