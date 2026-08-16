 import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-eyebrow">Diagnose before you buy</div>
            <h1>
              Stop buying hardware that&apos;s <span>wrong for the job.</span>
            </h1>
            <p>
              FitStack matches laptops to what you actually do — CAD, video editing, local AI,
              development, or gaming — so you stop overpaying for power you won&apos;t use, or
              underbuying into thermal throttling and crashed renders.
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
            <div className="eyebrow">Why FitStack</div>
            <h2>The mismatch is the problem, not the price tag</h2>
          </div>
        </div>

        <div className="intent-nav" style={{ marginBottom: 64 }}>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Gaming laptops crash on CAD renders &mdash; no ISV drivers</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Thin ultrabooks throttle under AI training loads</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Non-technical buyers overspend on specs they won&apos;t use</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">Enthusiasts want exact chipsets, not vague &ldquo;gaming&rdquo; tiers</span>
          </div>
          <div className="intent-card">
            <span className="intent-icon"></span>
            <span className="intent-label">FitStack filters by workload first, specs second</span>
          </div>
        </div>
      </section>
    </>
  )
}