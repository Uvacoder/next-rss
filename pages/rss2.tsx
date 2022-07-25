import React from 'react'
import Image from 'next/image'

function RssPage({ feed = {} }: any) {
  const { channel = {} } = feed.rss || {}
  console.log('channel', channel)
  return (
    
    <div className='max-w-xl mx-auto bg-green-50'>
      <h1 className='text-3xl bg-fuchsia-500' dangerouslySetInnerHTML={{__html: channel.title }}></h1>
      {channel.item?.map((data: any) => (
        <div key={data.title} className='mt-4'>
          <a href={data.link} target='_blank' rel="noreferrer"><h2 className='font-bold mb-1' dangerouslySetInnerHTML={{__html: data.title }}></h2></a>
          <p className='text-fuchsia-500 text-sm'>{data.pubDate}</p>
          {/* <div>
            <Image src={channel.image.url} width={200} height={100} alt='' />
          </div> */}
          <div className='text-justify' dangerouslySetInnerHTML={{__html: data.description}}></div>
        </div>
      ))} 
    </div>
  )
}

RssPage.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/rss2')
  const { feed } = await res.json()
  return { feed }
}

export default RssPage