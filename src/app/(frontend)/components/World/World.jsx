import React from 'react'
import styles from './World.module.css'

const World = () => {
  return (
    <>
    <div className={styles.main}>
        <div className={styles.MainConatiner}>
            <div className={styles.top}>
                <h3>The <span className={styles.wod}>World</span> of Al Huzaifa</h3>
                <p>For nearly five decades, Al Huzaifa has shaped exceptional living experiences through furniture, interior design, and curated spaces. The Signature Partner Card extends that legacy to a select network of professionals who share our passion for design, quality, and lasting relationships.</p>

            </div>
            <div className={styles.bottom}>
                <div className={styles.one}>
                    <h4>50+ </h4>
                    <p>Years of excellence</p>

                </div>
                 <div className={styles.one}>
                    <h4>8–10%</h4>
                    <p>Partner commission</p>

                </div>
                 <div className={styles.one}>
                    <h4>03 </h4>
                    <p>Worlds to explore</p>

                </div>

            </div>

        </div>

    </div>

    </>
  )
}

export default World
