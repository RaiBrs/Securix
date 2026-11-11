import { useEffect, useState } from 'react'
import { chapters } from '../content/site'

type ChapterId = (typeof chapters)[number]['id']

export function usePageMotion() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('inicio')

  useEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 760px)')
    let observer: IntersectionObserver | null = null
    let frame = 0
    let lastScrollY = window.scrollY
    let direction = 0
    let travelled = 0

    const configureReveals = () => {
      observer?.disconnect()
      root.classList.remove('motion-ready')
      if (reducedMotion.matches || !('IntersectionObserver' in window)) return

      root.classList.add('motion-ready')
      observer = new IntersectionObserver((entries, currentObserver) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })

      document.querySelectorAll('[data-reveal]').forEach((node) => observer?.observe(node))
    }

    const updateScroll = () => {
      frame = 0
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      if (!desktop.matches || scrollY < 120) {
        root.classList.remove('header-hidden')
        direction = 0
        travelled = 0
      } else if (delta !== 0) {
        const nextDirection = Math.sign(delta)
        travelled = nextDirection === direction ? travelled + Math.abs(delta) : Math.abs(delta)
        direction = nextDirection
        if (travelled >= 16) {
          root.classList.toggle('header-hidden', direction > 0)
          travelled = 0
        }
      }

      const distance = Math.max(1, root.scrollHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, scrollY / distance))
      root.style.setProperty('--page-progress', String(progress))

      const current = [...chapters].reverse().find(({ id }) => {
        const section = document.getElementById(id)
        return section && section.getBoundingClientRect().top <= window.innerHeight * 0.42
      })
      if (current) setActiveChapter(current.id)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll)
    }

    configureReveals()
    updateScroll()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', configureReveals)

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', configureReveals)
      root.classList.remove('motion-ready')
      root.classList.remove('header-hidden')
      root.style.removeProperty('--page-progress')
    }
  }, [])

  return activeChapter
}
