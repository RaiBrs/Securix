/** Representação decorativa temporária, isolada para futura substituição. */
export function LockVisual() {
  return (
    <div className="lock-scene" aria-hidden="true">
      <div className="lock-scene__glow" />
      <div className="lock-scene__orbit lock-scene__orbit--outer" />
      <div className="lock-scene__orbit lock-scene__orbit--inner" />
      <div className="lock-object">
        <div className="lock-object__shackle" />
        <div className="lock-object__body">
          <div className="lock-object__face">
            <div className="lock-object__core"><span className="lock-object__keyhole" /></div>
          </div>
          <span className="lock-object__seam" />
        </div>
      </div>
      <div className="lock-scene__ground" />
    </div>
  )
}
