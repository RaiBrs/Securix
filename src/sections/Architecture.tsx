import { useState } from 'react'
import { siteContent } from '../content/site'

const { architecture } = siteContent

export function Architecture() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeLayer = architecture.layers[activeIndex]

  return (
    <section className="chapter architecture" id="arquitetura" aria-labelledby="architecture-title">
      <div className="container architecture__grid">
        <div className="architecture__copy">
          <h2 id="architecture-title" data-reveal>{architecture.title}</h2>
          <p className="section-intro" data-reveal>{architecture.description}</p>
          <div className="layer-selector" role="group" aria-label="Explorar as camadas da abordagem">
            {architecture.layers.map((layer, index) => (
              <button
                className="layer-selector__button"
                type="button"
                key={layer.id}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                <span className="layer-selector__number">0{index + 1}</span>
                {layer.label}
              </button>
            ))}
          </div>
        </div>
        <div className="architecture__frame" data-active={activeIndex} data-reveal>
          <div className="architecture__stack" aria-hidden="true">
            <span className="architecture__slab architecture__slab--back" />
            <span className="architecture__slab architecture__slab--middle" />
            <span className="architecture__slab architecture__slab--front" />
            <span className="architecture__axis" />
          </div>
          <div className="architecture__detail" aria-live="polite">
            <span>{activeLayer.label}</span>
            <h3>{activeLayer.title}</h3>
            <p>{activeLayer.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
