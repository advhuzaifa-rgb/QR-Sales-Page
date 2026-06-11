import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import './globals.css'
import config from '@/payload.config'
import Footer from './components/Footer/Footer'
import TextContainer from './components/TextContainer/TextContainer'
import World from './components/World/World'
import Beyond from './components/Beyond/Beyond'
import Contact from './components/Contact/Contact'
import Privileges from './components/Privileges/Privileges'
import Landing from './components/Landing/Landing'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
   <>
   <Landing />
   <TextContainer />
<Privileges />
   <Beyond />
   
   <World />
   <Contact />
   <div className='space'></div>
   <Footer />
   </>
  )
}
