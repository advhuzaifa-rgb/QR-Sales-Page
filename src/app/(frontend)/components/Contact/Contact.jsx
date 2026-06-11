import React from 'react'
import styles from './Contact.module.css'
import SignatureForm from './SignatureForm'

const Contact = () => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Become a<br />
            <span className={styles.script}>Signature</span> Partners
          </h2>
          <p className={styles.desc}>
            Unlock exclusive privileges, preferred commissions, and access to The World of Al Huzaifa. Become a Signature Partner today.
          </p>
        </div>

        <div className={styles.right}>
          <SignatureForm />
        </div>
      </div>
    </section>
  )
}

export default Contact