import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { ethers } from 'ethers'
import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import { Nouns } from '../utils/types'
import { AnkrProvider } from '@ethersproject/providers'

const { palette } = ImageData

const url = 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph'
const query = `
    query NounsData {
      auctions(where: {settled: false}) {
        id,
        noun {
          seed {
            head
            glasses
            body
            accessory
            background
          }
        },
        endTime,
        amount,
        bidder {
          id
        }
      },
      proposals (where: {status_in: [PENDING, ACTIVE]}) {
        id,
        startBlock,
        endBlock,
        status,
        # description
      }
    }
  `

const getNounsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the id from the req
  // let id: string = req.params.id;

  let result: AxiosResponse = await axios.post(url, { query: query })
  const data = result.data.data

  const provider = new AnkrProvider()
  const ens = await provider.lookupAddress(data.auctions[0].bidder.id)
  const bidder = ens ? shortENS(ens) : shortAddress(data.auctions[0].bidder.id)

  const { parts, background } = getNounData(data.auctions[0].noun.seed)
  const svgBinary = buildSVG(parts, palette, background)
  const svgBase64 = Buffer.from(svgBinary).toString('base64')
  const image = `data:image/svg+xml;base64,${svgBase64}`

  let nounsData: Nouns = {
    auction: {
      id: data.auctions[0].id,
      currentBid: ethers.utils.formatEther(data.auctions[0].amount),
      bidder: bidder,
      endTime: data.auctions[0].endTime,
      image: image
    }
  }
  return res.status(200).json(nounsData)
}

export default { getNounsData }
