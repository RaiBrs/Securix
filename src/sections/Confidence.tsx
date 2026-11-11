import { siteContent } from '../content/site'

const { confidence } = siteContent

export function Confidence() {
  return (
    <section className="chapter confidence" id="confianca" aria-labelledby="confidence-title">
      <div className="container confidence__inner">
        <div className="confidence__statement">
          <h2 id="confidence-title" data-reveal>{confidence.title}</h2>
          <p className="section-intro">{confidence.description}</p>
        </div>
        <div className="confidence__principles">
          {confidence.principles.map((principle, index) => (
            <div className="confidence__principle" key={principle.title} data-reveal>
              <span>0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
