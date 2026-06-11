import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import Logo from './1.png'

const Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.MainContainer}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Image src={Logo} alt="Al Huzaifa Logo" />
          </div>

          <div className={styles.right}>
            <div className={styles.rightone}>
              <h3>Connect</h3>

              <p>
                <a href="tel:+971800888247">
                  +971 800 888 247
                </a>
              </p>

              <p>
                <a href="mailto:info@alhuzaifaproperties.com">
                  info@alhuzaifaproperties.com
                </a>
              </p>
            </div>

            <div className={styles.righttwo}>
              <h3>Social Links</h3>

              <p>
                <a
                  href="https://www.instagram.com/alhuzaifaproperties/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>

              <p>
                <a
                  href="https://www.linkedin.com/company/al-huzaifa-properties/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </p>

              <p>
                <a
                  href="https://www.facebook.com/people/Al-Huzaifa-Properties/61578608086568/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>Copyright © 2026 Al-Huzaifa</p>

          <h4>
            Crafted by{' '}
            <a
              href="https://integramagna.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.ext}>Integra Magna</span>
            </a>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Footer