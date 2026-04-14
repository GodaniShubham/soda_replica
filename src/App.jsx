import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, MoveUpRight, Sparkles, Zap } from 'lucide-react';
import InteractiveCan from './InteractiveCan';

const flavors = [
  {
    name: 'Cola Noir',
    tone: 'Dark cherry cola with chrome heat and midnight swagger.',
    accent: 'var(--cola)',
    glow: 'rgba(255, 74, 110, 0.45)',
    image: '/assets/cola-noir.svg',
  },
  {
    name: 'Voltage Blue',
    tone: 'Ice-charged soda energy with electric club-light vibes.',
    accent: 'var(--blue)',
    glow: 'rgba(72, 179, 255, 0.45)',
    image: '/assets/voltage-blue.svg',
  },
  {
    name: 'Lime Riot',
    tone: 'Sharp citrus fizz with acid-lime attitude and speed.',
    accent: 'var(--lime)',
    glow: 'rgba(186, 255, 83, 0.42)',
    image: '/assets/lime-riot.svg',
  },
  {
    name: 'Solar Mango',
    tone: 'Tropical burst wrapped in sunset gold and festival heat.',
    accent: 'var(--orange)',
    glow: 'rgba(255, 169, 59, 0.42)',
    image: '/assets/solar-mango.svg',
  },
];

const manifesto = [
  'Engineered to hit like a headliner entrance.',
  'Built for people who want brands with pulse, not noise.',
  'Every can is treated like an icon, not a SKU.',
];

function App() {
  const canRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    if (canRef.current) {
      gsap.to(canRef.current, {
        y: -24,
        rotation: 5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div className="page-shell" id="top">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="grain" />

      <header className="hero">
        <nav className="topbar">
          <div className="brand-lockup">
            <span className="brand-mark" />
            <span>NEON FIZZ EMPIRE</span>
          </div>
          <div className="nav-links">
            <a href="#flavors">Flavors</a>
            <a href="#showcase">Signature</a>
            <a href="#anthem">Anthem</a>
          </div>
        </nav>

        <section className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">FUTURE-DRIPPED SODA EXPERIENCE</p>
            <h1>UNCAP THE CITY OF FIZZ.</h1>
            <p className="hero-text">
              A cinematic drink universe where every flavor enters like a
              headline act and every scroll feels like a launch night countdown.
            </p>
            <div className="hero-actions">
              <a href="#showcase" className="button button-primary">
                <span>Enter the Drop</span>
                <ArrowRight size={18} strokeWidth={2.2} />
              </a>
              <a href="#flavors" className="button button-secondary">
                <span>Explore Flavors</span>
                <MoveUpRight size={18} strokeWidth={2.2} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <div className="visual-ring" ref={orbitRef}>
              <span>SPARK</span>
              <span>LOUD</span>
              <span>CHROME</span>
              <span>NOVA</span>
            </div>
            <div className="can-cluster">
              <div className="can can-back can-blue" />
              <div className="can can-main" ref={canRef}>
                <div className="can-shine" />
                <div className="can-label">
                  <span className="can-title">NEON</span>
                  <span className="can-subtitle">COLA NOIR</span>
                </div>
              </div>
              <div className="can can-back can-lime" />
              <div className="hero-badge">
                <strong>04</strong>
                <span>Legendary flavors</span>
              </div>
            </div>
          </motion.div>
        </section>
      </header>

      <main>
        <section className="metrics-panel">
          <div>
            <span>01</span>
            <p>Launch-film energy with editorial spacing and giant type.</p>
          </div>
          <div>
            <span>02</span>
            <p>Flavor worlds built like characters, not plain product cards.</p>
          </div>
          <div>
            <span>03</span>
            <p>Scroll choreography designed to feel premium on desktop and mobile.</p>
          </div>
        </section>

        <section className="flavor-section" id="flavors">
          <div className="flavor-lead">
            <div className="section-heading">
              <p className="eyebrow">FLAVOR UNIVERSE</p>
              <h2>Pick your chaos. Every can owns a different night.</h2>
            </div>

            <div className="flavor-model-panel">
              <div className="model-glow" />
              <div className="hero-can-stage" aria-label="Featured cola can">
                <InteractiveCan />
              </div>
            </div>
          </div>

          <div className="flavor-grid">
            {flavors.map((flavor, index) => (
              <motion.article
                className="flavor-card"
                key={flavor.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                style={{
                  '--accent': flavor.accent,
                  '--glow': flavor.glow,
                }}
              >
                <div className="flavor-card-top">
                  <span className="flavor-index">0{index + 1}</span>
                  <span className="flavor-pill">
                    <Sparkles size={14} strokeWidth={2.1} />
                    LIMITED WAVE
                  </span>
                </div>
                <div className="flavor-can-wrap">
                  <img
                    className="mini-can-image"
                    src={flavor.image}
                    alt={`${flavor.name} soda can`}
                  />
                </div>
                <h3>{flavor.name}</h3>
                <p>{flavor.tone}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="showcase" id="showcase">
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">SIGNATURE DROP</p>
            <h2>The hero can gets its own stage-light mythology.</h2>
          </motion.div>

          <div className="showcase-stage">
            <motion.div
              className="showcase-copy"
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <motion.article
                className="showcase-note"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                <span>01</span>
                <h3>Chrome-lit silhouette</h3>
                <p>
                  A floating hero can framed by radial light, glass streaks,
                  and a dark-stage gradient that makes the product feel iconic.
                </p>
              </motion.article>
              <motion.article
                className="showcase-note"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                <span>02</span>
                <h3>Flavor notes in orbit</h3>
                <p>
                  Cherry smoke, cold fizz, and electric sparks move around the
                  product reveal to sell sensation, not just ingredients.
                </p>
              </motion.article>
              <motion.article
                className="showcase-note"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.19 }}
              >
                <span>03</span>
                <h3>Scroll-tuned drama</h3>
                <p>
                  The sequence stays polished instead of chaotic, with one big
                  cinematic moment rather than ten competing gimmicks.
                </p>
              </motion.article>
            </motion.div>

            <motion.div
              className="showcase-visual"
              initial={{ opacity: 0, x: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="showcase-halo" />
              <div className="showcase-can">
                <div className="can-shine" />
                <div className="can-label">
                  <span className="can-title">NEON</span>
                  <span className="can-subtitle">VOLTAGE</span>
                </div>
              </div>
              <div className="orbit orbit-one">CHERRY STATIC</div>
              <div className="orbit orbit-two">FROST BLAST</div>
              <div className="orbit orbit-three">BASSLINE FIZZ</div>
            </motion.div>
          </div>
        </section>

        <section className="anthem" id="anthem">
          <div className="anthem-panel">
            <p className="eyebrow">BRAND ANTHEM</p>
            <h2>Not made to sit quietly in a fridge.</h2>
            <div className="manifesto-list">
              {manifesto.map((item) => (
                <div className="manifesto-item" key={item}>
                  <span />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="anthem-aside">
            <p className="aside-kicker">DROP 2026</p>
            <h3>Four flavors. One brand world. Maximum recall.</h3>
            <p>
              Built like a digital campaign instead of a safe storefront, with
              color-shifting sections, tactile cards, and stage-ready product
              framing.
            </p>
            <a href="#top" className="button button-primary">
              <span>Launch the Experience</span>
              <Zap size={18} strokeWidth={2.2} />
            </a>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
