import React from 'react'
import styles from './page.module.css'

const page = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.glow} />

      <header className={styles.topbar}>
        <span className={styles.brandMark}>Al-Huzaifa</span>
      </header>

      <section className={styles.content}>
        <p className={styles.eyebrow}>Launching soon</p>
        <h1 className={styles.wordmark}>Al-Huzaifa</h1>
        <h2 className={styles.headline}>Something refined is on its way</h2>
        <p className={styles.subtext}>
          We are putting the final touches on an experience worth the wait.
          Our new home goes live shortly , stay close.
        </p>

        <div className={styles.qrCard}>
          <div className={styles.qrPlaceholder}>
            <span>QR</span>
          </div>
          <div className={styles.qrText}>
            <p className={styles.qrTitle}>Scan to visit</p>
            <p className={styles.qrHint}>Live the moment we launch</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Al-Huzaifa. All rights reserved.</span>
      </footer>
    </main>
  )
}

export default page