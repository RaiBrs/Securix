import { chapters, siteContent } from './content/site'
import { usePageMotion } from './hooks/usePageMotion'
import { Hero } from './sections/Hero'
import { Architecture } from './sections/Architecture'
import { Expertise } from './sections/Expertise'
import { Industries } from './sections/Industries'
import { Confidence } from './sections/Confidence'
import { Invitation } from './sections/Invitation'
import './App.css'
import './styles/chapters.css'
import './styles/expertise.css'

function App() {
  const activeChapter = usePageMotion()

  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <header className="site-header">
        <span className="site-header__progress" aria-hidden="true" />
        <div className="site-header__inner container">
          <a className="brand" href="#inicio" aria-label="Securix — início">
            <svg className="brand__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M10 13V9a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M6.5 13h19v10.5c0 1.2-.7 2.3-1.8 2.9L16 30l-7.7-3.6c-1.1-.6-1.8-1.7-1.8-2.9V13Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <circle cx="16" cy="19" r="1.5" fill="#9D7BFF" />
              <path d="M16 21v3" stroke="#9D7BFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{siteContent.brand}<sup>®</sup></span>
          </a>
          <nav className="site-nav" aria-label="Navegação principal">
            {chapters.map((chapter) => (
              <a
                className="site-nav__link"
                href={`#${chapter.id}`}
                key={chapter.id}
                aria-current={activeChapter === chapter.id ? 'location' : undefined}
              >
                {chapter.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main id="conteudo">
        <Hero />
        <Architecture />
        <Expertise />
        <Industries />
        <Confidence />
        <Invitation />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner container">
          <span className="site-footer__brand">{siteContent.brand}<sup>®</sup></span>
          <p>{siteContent.footer}</p>
          <a className="site-footer__github" href="https://github.com/RaiBrs" target="_blank" rel="noopener noreferrer" aria-label="GitHub de RaiBrs (abre em nova aba)">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
