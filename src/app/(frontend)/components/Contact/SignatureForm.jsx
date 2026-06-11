'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './SignatureForm.module.css'

const YEARS = ['0-2 Years', '3-5 Years', '5-10 Years', '10+ Years']
const BUSINESS = [
  'Residential Sales',
  'Luxury Residential',
  'Commercial',
  'Off Plan',
  'Secondary Market',
  'Interior Design',
  'Property Investment',
]
const REFERRALS = ['1-5', '6-10', '11-20', '20+']
const REQUIRED = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'designation']

const initialData = {
  firstName: '', lastName: '', email: '', phone: '', companyName: '',
  companyWebsite: '', designation: '', reraNumber: '', instagramProfile: '',
  yearsOfExperience: '', primaryBusiness: '', monthlyClientReferrals: '',
  marketingConsent: false, termsAccepted: false,
}

const Dropdown = ({ placeholder, options, value, onChange, className }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={`${styles.dropdown} ${className || ''}`} ref={ref}>
      <button type="button" className={styles.dropdownTrigger} onClick={() => setOpen((o) => !o)}>
        <span className={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {value || placeholder}
        </span>
        <span className={`${styles.dropdownIcon} ${open ? styles.dropdownIconOpen : ''}`}>
          <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.06201 6.75L12.1242 0H-0.000165939L6.06201 6.75Z" fill="#414141" fillOpacity="0.5" />
          </svg>
        </span>
      </button>
      {open && (
        <ul className={styles.dropdownMenu}>
          {options.map((opt) => (
            <li
              key={opt}
              className={styles.dropdownOption}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const SignatureForm = () => {
  const [data, setData] = useState(initialData)
  const [status, setStatus] = useState('idle')

  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }))

  const handlePhoneChange = (value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 15)
    setField('phone', digitsOnly)
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  const phoneValid = data.phone.length >= 7 && data.phone.length <= 15

  const isValid =
    REQUIRED.every((k) => String(data[k]).trim() !== '') &&
    emailValid &&
    phoneValid &&
    data.termsAccepted

  const handleSubmit = async () => {
    if (!isValid || status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch('/api/signature-partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setData(initialData)
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Apply for Access</h2>

      <div className={styles.fields}>
        <input className={styles.input} placeholder="First name*" maxLength={40}
          value={data.firstName} onChange={(e) => setField('firstName', e.target.value)} />
        <input className={styles.input} placeholder="Last name*" maxLength={40}
          value={data.lastName} onChange={(e) => setField('lastName', e.target.value)} />
        <input className={styles.input} type="email" placeholder="Email address*" maxLength={100}
          value={data.email} onChange={(e) => setField('email', e.target.value)} />
        <input className={styles.input} type="tel" inputMode="numeric" placeholder="Mobile number*"
          maxLength={15} value={data.phone} onChange={(e) => handlePhoneChange(e.target.value)} />
        <input className={`${styles.input} ${styles.fullRow}`} placeholder="Company name*" maxLength={80}
          value={data.companyName} onChange={(e) => setField('companyName', e.target.value)} />
        <input className={styles.input} placeholder="Company website" maxLength={120}
          value={data.companyWebsite} onChange={(e) => setField('companyWebsite', e.target.value)} />
        <input className={styles.input} placeholder="Designation*" maxLength={60}
          value={data.designation} onChange={(e) => setField('designation', e.target.value)} />
        <input className={styles.input} placeholder="Rera number" maxLength={40}
          value={data.reraNumber} onChange={(e) => setField('reraNumber', e.target.value)} />
        <input className={styles.input} placeholder="Instagram profile" maxLength={80}
          value={data.instagramProfile} onChange={(e) => setField('instagramProfile', e.target.value)} />
        <Dropdown placeholder="Years of experience" options={YEARS}
          value={data.yearsOfExperience} onChange={(v) => setField('yearsOfExperience', v)} />
        <Dropdown placeholder="Primary business" options={BUSINESS}
          value={data.primaryBusiness} onChange={(v) => setField('primaryBusiness', v)} />
        <Dropdown className={styles.fullRow} placeholder="Monthly client referrals" options={REFERRALS}
          value={data.monthlyClientReferrals} onChange={(v) => setField('monthlyClientReferrals', v)} />
      </div>

      <div className={styles.consent}>
        <label className={styles.check}>
          <input type="checkbox" className={styles.checkInput}
            checked={data.marketingConsent} onChange={(e) => setField('marketingConsent', e.target.checked)} />
          <span className={styles.checkBox}></span>
          <span className={styles.checkText}>
            I would like to receive updates regarding launches, events, collaborations and partner opportunities.
          </span>
        </label>

        <label className={styles.check}>
          <input type="checkbox" className={styles.checkInput}
            checked={data.termsAccepted} onChange={(e) => setField('termsAccepted', e.target.checked)} />
          <span className={styles.checkBox}></span>
          <span className={styles.checkText}>
            I confirm that all information provided is accurate. <strong>terms &amp; conditions*</strong>
          </span>
        </label>
      </div>

      <div className={styles.submitWrap}>
        <button
          type="button"
          className={`${styles.cta} ${!isValid ? styles.ctaMuted : ''}`}
          onClick={handleSubmit}
          disabled={!isValid || status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : 'Apply for Partnership'}
        </button>

        {status === 'success' && (
          <p className={styles.success}>Thank you! Your application has been submitted successfully.</p>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
        )}
        {status !== 'error' && data.email !== '' && !emailValid && (
          <p className={styles.errorMsg}>Please enter a valid email address.</p>
        )}
        {status !== 'error' && data.phone !== '' && !phoneValid && (
          <p className={styles.errorMsg}>Mobile number must be 7–15 digits.</p>
        )}
      </div>
    </div>
  )
}

export default SignatureForm