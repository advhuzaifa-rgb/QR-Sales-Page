'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './Landing.module.css'
import Popup from '../Contact/Popup'
import logo from './logo.png'
import card from './card.webp'

const Landing = () => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const scrollToNext = () => {
    rootRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.main} ref={rootRef}>
      <div className={styles.logoRow}>
        <Image className={styles.logo} src={logo} alt="Al Huzaifa Properties" priority />
      </div>

      <div className={styles.body}>
        <div className={styles.hero}>
          <div className={styles.left}>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>A PRIVILEGED INVITATION</p>
              <h1 className={styles.heading}>
                The <span className={styles.script}>Signature</span> Partners Card
              </h1>
            </div>

            <div className={styles.tail}>
              <p className={styles.desc}>
                Created for our trusted broker and design partners unlocking preferred commissions,
                priority access, and a relationship built on shared standards of excellence.
              </p>
              <button type="button" className={styles.cta} onClick={() => setOpen(true)}>
                Apply now
                <span className={styles.ctaArrow}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.000127569 6.66688L0.000127632 5.17206L8.74285 5.17206L4.73577 1.06132L5.77033 -2.58748e-07L11.5405 5.91947L5.77033 11.8389L4.73577 10.7776L8.74285 6.66688L0.000127569 6.66688Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

        <div className={styles.cardWrap}>
  <Image
    className={styles.card}
    src={card}
    alt="Signature Partners Card"
    priority
    style={{ borderRadius: '10px' }}
  />
</div>
        </div>

        <div className={styles.shaping}>
          <p className={styles.shapingMain}>
            50 years of <span className={styles.script}>Shaping</span>
          </p>
          <p className={styles.shapingSub}>the way you live</p>
        </div>
      </div>

      <div
        className={styles.scroll}
        role="button"
        tabIndex={0}
        onClick={scrollToNext}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            scrollToNext()
          }
        }}
      >
        <svg
          width="18"
          height="25"
          viewBox="0 0 18 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2812 0H6.78125C4.98337 0.00202643 3.25971 0.717128 1.98842 1.98842C0.717128 3.25971 0.00202643 4.98337 0 6.78125V17.2812C0.00202643 19.0791 0.717128 20.8028 1.98842 22.0741C3.25971 23.3454 4.98337 24.0605 6.78125 24.0625H10.2812C12.0791 24.0605 13.8028 23.3454 15.0741 22.0741C16.3454 20.8028 17.0605 19.0791 17.0625 17.2812V6.78125C17.0605 4.98337 16.3454 3.25971 15.0741 1.98842C13.8028 0.717128 12.0791 0.00202643 10.2812 0ZM15.75 17.2812C15.7483 18.7311 15.1715 20.1211 14.1463 21.1463C13.1211 22.1715 11.7311 22.7483 10.2812 22.75H6.78125C5.33138 22.7483 3.94139 22.1715 2.91618 21.1463C1.89096 20.1211 1.31424 18.7311 1.3125 17.2812V6.78125C1.31424 5.33138 1.89096 3.94139 2.91618 2.91618C3.94139 1.89096 5.33138 1.31424 6.78125 1.3125H10.2812C11.7311 1.31424 13.1211 1.89096 14.1463 2.91618C15.1715 3.94139 15.7483 5.33138 15.75 6.78125V17.2812ZM9.1875 6.61609V17.4442L10.6925 15.9403C10.8169 15.8244 10.9814 15.7613 11.1515 15.7643C11.3215 15.7673 11.4837 15.8362 11.6039 15.9564C11.7242 16.0766 11.793 16.2388 11.796 16.4089C11.799 16.5789 11.7359 16.7434 11.62 16.8678L8.995 19.4928C8.87195 19.6157 8.70516 19.6847 8.53125 19.6847C8.35734 19.6847 8.19055 19.6157 8.0675 19.4928L5.4425 16.8678C5.32658 16.7434 5.26347 16.5789 5.26647 16.4089C5.26947 16.2388 5.33835 16.0766 5.45858 15.9564C5.57882 15.8362 5.74103 15.7673 5.91104 15.7643C6.08106 15.7613 6.2456 15.8244 6.37 15.9403L7.875 17.4464V6.61828L6.37 8.12C6.2456 8.23592 6.08106 8.29903 5.91104 8.29603C5.74103 8.29303 5.57882 8.22416 5.45858 8.10392C5.33835 7.98368 5.26947 7.82147 5.26647 7.65146C5.26347 7.48144 5.32658 7.3169 5.4425 7.1925L8.0675 4.5675C8.19055 4.44461 8.35734 4.37558 8.53125 4.37558C8.70516 4.37558 8.87195 4.44461 8.995 4.5675L11.62 7.1925C11.6845 7.25258 11.7362 7.32503 11.7721 7.40553C11.8079 7.48603 11.8272 7.57293 11.8288 7.66104C11.8303 7.74916 11.8141 7.83668 11.7811 7.9184C11.7481 8.00011 11.699 8.07434 11.6367 8.13666C11.5743 8.19897 11.5001 8.2481 11.4184 8.28111C11.3367 8.31411 11.2492 8.33032 11.161 8.32877C11.0729 8.32721 10.986 8.30793 10.9055 8.27206C10.825 8.23619 10.7526 8.18448 10.6925 8.12L9.1875 6.61609Z"
            fill="#414141"
          />
        </svg>
        <span>Scroll To Know More</span>
      </div>

      <Popup open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Landing