import { LockVisual } from '../components/LockVisual'
import { siteContent } from '../content/site'

const { invitation } = siteContent

export function Invitation() {
  return (
    <section className="chapter invitation" id="convite" aria-labelledby="invitation-title">
      <div className="invitation__object" aria-hidden="true"><LockVisual /></div>
      <div className="container invitation__inner">
        <h2 id="invitation-title" data-reveal>{invitation.title}</h2>
        <p>{invitation.description}</p>
        <a className="text-link invitation__action" href="#especialidades">
          {invitation.action}
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 15 15 4M6 4h9v9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
