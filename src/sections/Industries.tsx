import { siteContent } from '../content/site'

const { industries } = siteContent

export function Industries() {
  return (
    <section className="chapter industries" id="setores" aria-labelledby="industries-title">
      <div className="container">
        <div className="industries__heading">
          <h2 id="industries-title" data-reveal>{industries.title}</h2>
          <p className="section-intro">{industries.introduction}</p>
        </div>
        <div className="industries__grid">
          {industries.items.map((item) => (
            <article className={`industry industry--${item.motif}`} key={item.number} data-reveal>
              <div className="industry__art" aria-hidden="true">
                <span className="industry__shape industry__shape--one" />
                <span className="industry__shape industry__shape--two" />
                <span className="industry__shape industry__shape--three" />
              </div>
              <div className="industry__content">
                <span>{item.number} / 04</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
