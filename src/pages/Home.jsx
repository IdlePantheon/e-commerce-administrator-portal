 import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>
              Stop buying hardware that's<span>wrong for the job.</span>
            </h1>
            <p>
              Paying For overpriced Gadgets wasn't your fault. But after finding this site, it just might be. Get the right hardware for your work.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Find my machine
              </Link>
              <Link to="/shop" className="btn btn-secondary">
                Browse by spec
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-head">

          <div>
            <h2>It's not the laptop, it's you.</h2>
          </div>
        </div>

        <div className="intent-nav" style={{ marginBottom: 64 }}>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Gaming laptops crash on CAD renders because of missing ISV drivers</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Thin ultrabooks throttle under AI training loads</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Non-technical buyers overspend on specs they won't use.</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Enthusiasts want exact chipsets, not vague, gaming tiers.</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">We filter by work specifications, Get the right hardware in seconds.</span>
          </div>
        </div>
      </section>
    </>
  )
}