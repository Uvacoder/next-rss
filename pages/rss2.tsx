import React from 'react'
import Image from 'next/image'
import { API } from './const/api'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

function RssPage({ feed = {} }: any) {
  const { channel = {} } = feed.rss || {}
  const [ifrSrc, setIfrSrc] = React.useState('')
  const router = useRouter()
  console.log('router', router)
  const isActive = (key: string) => router?.asPath.indexOf(key) > -1
  return (
    
    <div className='flex'>
      <div className='' style={{width: 100 }}>
        {Object.keys(API).map(key => (<Link href={`/rss2?key=${key}`} key={key}><p className={`block px-4 py-2 rounded-md cursor-pointer ${isActive(key) ? 'bg-amber-100 text-amber-700' : ''}`}>{key}</p></Link>))}
        </div>
      <div className='max-w-xl mx-auto'>
        <h1 className='text-3xl bg-amber-600' dangerouslySetInnerHTML={{__html: channel.title }}></h1>
        {channel.item?.map((data: any) => (
          <div key={data.title} className='mt-4'>
            <a onClick={() => setIfrSrc(data.link)} target='_blank' rel="noreferrer"><h2 className='mb-1 font-bold text-red-500 cursor-pointer' dangerouslySetInnerHTML={{__html: data.title }}></h2></a>
            <p className='text-sm'>{data.pubDate}</p>
            {/* <div>
              <Image src={channel.image.url} width={200} height={100} alt='' />
            </div> */}
            {/* <div className='text-justify' dangerouslySetInnerHTML={{__html: data.description}}></div> */}
          </div>
        ))} 
      </div>
      <iframe src={ifrSrc} frameBorder="0" width={600}></iframe>
    </div>
  )
}

RssPage.getInitialProps = async (ctx: { query: any }) => {
  const {query} = ctx;
  console.log('query111', query)
  const res = await fetch(`http://localhost:3000/api/rss2?key=${query.key}`)
  const { feed } = await res.json()
  return { feed }
}


export default RssPage