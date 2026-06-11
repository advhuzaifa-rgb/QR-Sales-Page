import React from 'react'
import styles from './Privileges.module.css'

const CARDS = [
  {
    title: 'Furniture Collections',
    badge: '8-10% Commission',
    desc: "Earn a preferred commission across Al Huzaifa's curated furniture collections. Access timeless designs, signature collections, and premium furnishings trusted by discerning homeowners and designers.",
  },
  {
    title: 'Design Studio Services',
    badge: '5% Commission',
    desc: "Receive a preferred commission on bespoke interior design services and turnkey solutions. Partner with our design experts to deliver exceptional spaces tailored to your clients' lifestyles.",
  },
  {
    title: 'Property Collaborations',
    badge: 'Priority Access',
    desc: 'Enjoy priority access to curated property showcases, private previews, and experience-led presentations. Connect your clients with thoughtfully selected opportunities through a trusted luxury ecosystem.',
  },
]

const Privileges = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Signature Privileges</h2>

      <div className={styles.cards}>
        {CARDS.map((card) => (
          <div className={styles.card} key={card.title}>
            <div className={styles.cardInner}>
              <h3 className={styles.cardHeading}>{card.title}</h3>
              <span className={styles.badge}>{card.badge}</span>
              <span className={styles.line}></span>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Privileges