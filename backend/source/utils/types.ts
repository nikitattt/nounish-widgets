export enum ProposalStatus {
  Pending,
  Active
}

export interface Proposal {
  title: String
  status: ProposalStatus
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
