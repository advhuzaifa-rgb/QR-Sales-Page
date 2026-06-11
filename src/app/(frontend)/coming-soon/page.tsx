'use client'

import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import styles from './page.module.css'

const LANDING_URL = 'https://signaturepartners.alhuzaifa.com'

const page = () => {
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadSvg = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return
    const source = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'al-huzaifa-signaturepartners-qr.svg'
    link.click()
    URL.revokeObjectURL(url)
  }

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
          Our new home goes live shortly — stay close.
        </p>

        <div className={styles.qrCard}>
          <div className={styles.qrFrame} ref={qrRef}>
            <QRCodeSVG value={LANDING_URL} size={220} level="H" marginSize={4} />
          </div>
          <div className={styles.qrText}>
            <p className={styles.qrTitle}>Scan to visit</p>
            <p className={styles.qrHint}>Point your camera here once we launch</p>
          </div>
          <button className={styles.qrButton} onClick={downloadSvg}>
            Download QR (SVG)
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Al-Huzaifa. All rights reserved.</span>
      </footer>
    </main>
  )
}

export default page