import type { NextApiRequest, NextApiResponse } from "next/types";
import got from 'got'
import { XMLParser} from 'fast-xml-parser'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const parser = new XMLParser()

  try {
    const url = "https://hacks.mozilla.org/feed/"

    const { body } = await got(url);

    let feed = parser.parse(body);

    res.status(200).json({ name: 'John Doe', feed  })
  } catch (error) {
    console.log('error', error)
    res.status(200).json({ error })
  }
}