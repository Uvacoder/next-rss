import type { NextApiRequest, NextApiResponse } from "next/types";
import got from 'got'
import { XMLParser} from 'fast-xml-parser'
import { API } from "../const/api";

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const parser = new XMLParser()
  const { key } = req.query
  console.log('key', key)
  const url = `http://124.223.83.129:1200${API[key]}`
  // const url = `http://124.223.83.129:1200/bilibili/bangumi/media/9192`

  try {
    const { body } = await got(url);
    let feed = parser.parse(body);
    res.status(200).json({ name: 'John Doe', feed  })
  } catch (error) {
    console.log('error', error)
    res.status(200).json({ error })
  }
}