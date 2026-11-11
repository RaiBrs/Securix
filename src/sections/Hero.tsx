import { LockExperience } from '../components/LockExperience'
import { siteContent } from '../content/site'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__content container">
        <div className="hero__copy">
          <h1 id="hero-title">{siteContent.brand}<sup>®</sup></h1>
          <p>{siteContent.introduction}</p>
          <a className="text-link hero__action" href="#arquitetura">
            {siteContent.explore}
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 15 15 4M6 4h9v9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
        <LockExperience />
      </div>
    </section>
  )
}
