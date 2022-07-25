import type { NextApiRequest, NextApiResponse } from "next/types";
import got from 'got'
import { XMLParser} from 'fast-xml-parser'
import puppeteer from 'puppeteer'
// import RSSHub from 'rsshub'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const parser = new XMLParser()

  try {
    // const url = "https://www.reddit.com/.rss"
    // const url = "https://rsshub.app/ahau/cs_news/xxtg"
    // RSSHub.request('/bilibili/bangumi/media/9192')
    // .then((data:any) => {
    //     console.log(data);
    // })
    // .catch((e:any) => {
    //     console.log(e);
    // });
    // const puppeteer = require('puppeteer');

  //  const browser = await puppeteer.launch().then(async (browser: any) => {
  //     const page = await browser.newPage();
  //     await page.goto('https://www.google.com');
  //     // 其他操作...
  //     await browser.close();
  //   });
    const {body} = await got('http://124.223.83.129:1200/douban/movie/playing');
    console.log('text', body)

    // console.log('buffer', buffer)
    let feed = parser.parse(body);
    // console.log('feed', feed)
    res.status(200).json({ name: 'John Doe', feed  })
  } catch (error) {
    console.log('error', error)
    res.status(200).json({ error })
  }
}