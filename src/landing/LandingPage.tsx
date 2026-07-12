import { Link } from 'react-router-dom'
import { Scale, TrendingUp, Briefcase, Gauge, Brain, Database, Zap, Lock } from 'lucide-react'
import { ButtonLink } from '../shared/components'
import buttonStyles from '../shared/components/Button.module.css'
import styles from './LandingPage.module.css'

const modules = [
  {
    icon: Scale,
    title: 'Sanctions Impact',
    text: 'GDP, trade and investment before and after sanctions, with a timeline of key packages.',
  },
  {
    icon: TrendingUp,
    title: 'Inflation Forecast',
    text: 'Historical inflation by country plus a simple forecast with a clear boundary between fact and projection.',
  },
  {
    icon: Briefcase,
    title: 'Unemployment Analysis',
    text: 'Unemployment dynamics by country and year, with several countries compared on one chart.',
  },
  {
    icon: Gauge,
    title: 'Quality of Life Index',
    text: 'A composite index built from open indicators, with a ranking table and a page for every country.',
  },
  {
    icon: Brain,
    title: 'AI Crisis Explainer',
    text: 'Pick a crisis or ask a question. AI explains causes, mechanics and consequences in plain language.',
  },
]

const steps = [
  {
    icon: Database,
    title: 'Open data',
    text: 'Every indicator comes from the World Bank API, free and public.',
  },
  {
    icon: Zap,
    title: 'Fast by design',
    text: 'Responses are cached in Supabase so pages load instantly.',
  },
  {
    icon: Lock,
    title: 'Secure AI',
    text: 'The AI module runs through a server function. Keys never reach your browser.',
  },
]

export default function LandingPage() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.wordmark}>
            MacroScope
          </Link>
          <nav className={styles.nav}>
            <Link to="/signin" className={styles.navLink}>
              Sign in
            </Link>
            <ButtonLink to="/signup" variant="accent">
              Get started
            </ButtonLink>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>The world economy, made legible</h1>
          <p className={styles.heroText}>
            MacroScope turns open World Bank data into clear and fast analytics. Track the impact
            of sanctions, forecast inflation, compare unemployment, rank quality of life and let
            AI explain economic crises in plain language.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink to="/signup" variant="accent">
              Get started
            </ButtonLink>
            <a
              href="#modules"
              className={`${buttonStyles.button} ${buttonStyles.link} ${buttonStyles.secondary}`}
            >
              Explore modules
            </a>
          </div>
        </section>

        <section className={styles.section} id="modules">
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Five modules, one platform</h2>
            <div className={styles.modulesGrid}>
              {modules.map((module) => (
                <article key={module.title} className={styles.moduleCard}>
                  <module.icon className={styles.moduleIcon} size={22} strokeWidth={1.5} />
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                  <p className={styles.moduleText}>{module.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>How it works</h2>
            <div className={styles.stepsGrid}>
              {steps.map((step) => (
                <div key={step.title}>
                  <step.icon size={20} strokeWidth={1.5} />
                  <h3 className={styles.moduleTitle}>{step.title}</h3>
                  <p className={styles.moduleText}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Start exploring the world economy</h2>
            <ButtonLink to="/signup" variant="accent">
              Create free account
            </ButtonLink>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>MacroScope</span>
          <span>Built on open World Bank data</span>
        </div>
      </footer>
    </div>
  )
}
