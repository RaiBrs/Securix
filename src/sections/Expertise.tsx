import { ExpertiseSymbol } from '../components/ExpertiseSymbol'
import { siteContent } from '../content/site'

const { expertise } = siteContent

export function Expertise() {
  return (
    <section className="chapter expertise" id="especialidades" aria-labelledby="expertise-title">
      <div className="container">
        <div className="expertise__heading">
          <h2 id="expertise-title" data-reveal>{expertise.title}</h2>
        </div>
        <div className="expertise__list">
          {expertise.items.map((item) => (
            <article className="expertise__item" id={`especialidade-${item.number}`} key={item.number}>
              <div className="expertise__copy" data-reveal>
                <span className="expertise__number">{item.number} / 04</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="expertise__visual" data-reveal>
                <ExpertiseSymbol motif={item.motif} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
