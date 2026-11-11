import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { LockVisual } from './LockVisual'
import type { LockControls } from '../three/LockCanvas'

const LockCanvas = lazy(() => import('../three/LockCanvas'))
const motionQuery = '(prefers-reduced-motion: reduce)'

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    context?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(context)
  } catch {
    return false
  }
}

export function LockExperience() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const controls = useRef<LockControls>({ pitch: 0, yaw: 0, dragging: false })
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null)
  const [visible, setVisible] = useState(true)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(motionQuery)
    let cancelPending = () => {}
    const update = () => {
      cancelPending()
      if (media.matches) {
        setEnabled(false)
        return
      }

      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(() => setEnabled(canUseWebGL()), { timeout: 1200 })
        cancelPending = () => window.cancelIdleCallback(id)
      } else {
        const id = globalThis.setTimeout(() => setEnabled(canUseWebGL()), 200)
        cancelPending = () => globalThis.clearTimeout(id)
      }
    }
    update()
    media.addEventListener('change', update)
    return () => {
      cancelPending()
      media.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px',
    })
    observer.observe(scene)
    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) return <LockVisual />

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointer.current?.id !== event.pointerId) return
    pointer.current = null
    controls.current.dragging = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const moveWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = 0.18
    if (event.key === 'ArrowLeft') controls.current.yaw -= step
    else if (event.key === 'ArrowRight') controls.current.yaw += step
    else if (event.key === 'ArrowUp') controls.current.pitch = Math.max(-0.85, controls.current.pitch - step)
    else if (event.key === 'ArrowDown') controls.current.pitch = Math.min(0.85, controls.current.pitch + step)
    else return
    event.preventDefault()
  }

  return (
    <div
      className="lock-experience"
      ref={sceneRef}
      role="group"
      tabIndex={0}
      aria-label="Cadeado 3D interativo. Arraste para girar ou use as setas do teclado."
      onPointerDown={(event) => {
        if (pointer.current || event.button !== 0) return
        pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
        controls.current.dragging = true
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const activePointer = pointer.current
        if (!activePointer || activePointer.id !== event.pointerId) return
        controls.current.yaw += (event.clientX - activePointer.x) * 0.008
        controls.current.pitch = Math.max(-0.85, Math.min(0.85, controls.current.pitch + (event.clientY - activePointer.y) * 0.008))
        activePointer.x = event.clientX
        activePointer.y = event.clientY
      }}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      onKeyDown={moveWithKeyboard}
    >
      <div className="lock-experience__halo" aria-hidden="true" />
      <Suspense fallback={<LockVisual />}>
        <LockCanvas active={visible} controls={controls} />
      </Suspense>
    </div>
  )
}
