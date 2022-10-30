export interface Proposal {
  title: string
  state: string
  endTime: number
}

export interface Auction {
  id: number
  currentBid: String
  bidder: String
  endTime: number
  image: String
}

export interface Nouns {
  auction: Auction
  proposals?: Proposal[]
}

export interface ProposalSubgraphEntity {
  id: String
  startBlock: string
  endBlock: string
  status: string
  description: string
}
