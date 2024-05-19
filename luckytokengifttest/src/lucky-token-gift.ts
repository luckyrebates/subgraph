import {
  ClaimPrize as ClaimPrizeEvent,
  DefaultAutoClaimChange as DefaultAutoClaimChangeEvent,
  DefaultTokenChange as DefaultTokenChangeEvent,
  OperatorAddress as OperatorAddressEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PrizeDrawn as PrizeDrawnEvent,
  TicketsGet as TicketsGetEvent,
  TicketsInject as TicketsInjectEvent,
  TicketsPurchase as TicketsPurchaseEvent,
  TokenGiftClaimable as TokenGiftClaimableEvent,
  TokenGiftClosed as TokenGiftClosedEvent,
  TokenGiftCreated as TokenGiftCreatedEvent
} from "../generated/LuckyTokenGift/LuckyTokenGift"
import {
  UserInfo,
  TokenGift,
  ClaimPrize,
  DefaultAutoClaimChange,
  DefaultTokenChange,
  OperatorAddress,
  OwnershipTransferred,
  PrizeDrawn,
  TicketsGet,
  TicketsInject,
  TicketsPurchase,
  TokenGiftClaimable,
  TokenGiftClosed,
  TokenGiftCreated
} from "../generated/schema"

import {
  BigInt,
  Bytes,
  Address
}from "@graphprotocol/graph-ts"

export function handleClaimPrize(event: ClaimPrizeEvent): void {
  let entity = new ClaimPrize(
    Bytes.fromUTF8(event.params.id.toString() + event.params.winner.toString())
  )
  
  entity.winner = event.params.winner
  entity.totalAmount = event.params.totalAmount
  entity.autoClaim = event.params.autoClaim

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  

  let id = event.params.id.toString()
  entity.tokenGift = id
  entity.userInfo = event.params.winner

  entity.save()
}

export function handleDefaultAutoClaimChange(
  event: DefaultAutoClaimChangeEvent
): void {
  let entity = new DefaultAutoClaimChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.defaultAutoClaim = event.params.defaultAutoClaim

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDefaultTokenChange(event: DefaultTokenChangeEvent): void {
  let entity = new DefaultTokenChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.defaultTicketToken = event.params.defaultTicketToken
  entity.defaultTicketPirce = event.params.defaultTicketPirce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorAddress(event: OperatorAddressEvent): void {
  let entity = new OperatorAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operatorAddress = event.params.operatorAddress
  entity.opt = event.params.opt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePrizeDrawn(event: PrizeDrawnEvent): void {
  let entity = new PrizeDrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.winner = event.params.winner
  entity.index = event.params.index
  entity.amount = event.params.amount
  entity.autoClaim = event.params.autoClaim

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.tokenGift = event.params.id.toString()
  entity.userInfo = event.params.winner
  entity.claimPrize = Bytes.fromUTF8(event.params.id.toString() + event.params.winner.toString())
  entity.save()
}

export function handleTicketsGet(event: TicketsGetEvent): void {
  let userInfo = UserInfo.load(event.params.receiveAddress)
  if (userInfo == null ){
    userInfo = new UserInfo(event.params.receiveAddress)
    userInfo.save()
  } 

  let entity = new TicketsGet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  
  entity.sender = event.params.sender
  entity.receiveAddress = event.params.receiveAddress
  entity.ticketNumbers = event.params.ticketNumbers
  entity.fromIndex = event.params.ticketIndex
  entity.toIndex = event.params.ticketIndex.plus(event.params.ticketNumbers).minus(new BigInt(1))

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let id = event.params.id.toString()
 
  entity.tokenGift = id
  entity.userInfo = event.params.receiveAddress

  entity.save()

  let tokenGift = TokenGift.load(id)
  if (tokenGift != null){
    tokenGift.sendTickets = tokenGift.sendTickets.plus(event.params.ticketNumbers)
    tokenGift.save()
  }

  entity.save()
}

export function handleTicketsInject(event: TicketsInjectEvent): void {
  let entity = new TicketsInject(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  
  entity.sender = event.params.sender
  entity.ticketNumbers = event.params.ticketNumbers

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  
  let id = event.params.id.toString()
  entity.tokenGift = id

  entity.save()
  
  let tokenGift = TokenGift.load(id)
  if (tokenGift != null){
    tokenGift.injectTickets = tokenGift.injectTickets.plus(event.params.ticketNumbers)
    tokenGift.save()
  }
}

export function handleTicketsPurchase(event: TicketsPurchaseEvent): void {
  let userInfo = UserInfo.load(event.params.receiveAddress)
  if (userInfo == null ){
    userInfo = new UserInfo(event.params.receiveAddress)
    userInfo.save()
  } 

  let entity = new TicketsPurchase(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  
  entity.sender = event.params.sender
  entity.receiveAddress = event.params.receiveAddress
  entity.ticketNumbers = event.params.ticketNumbers
  entity.fromIndex = event.params.ticketIndex
  entity.toIndex = event.params.ticketIndex.plus(event.params.ticketNumbers).minus(new BigInt(1))

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let id = event.params.id.toString()
 
  entity.tokenGift = id
  entity.userInfo = event.params.receiveAddress

  entity.save()

  let tokenGift = TokenGift.load(id)
  if (tokenGift != null){
    tokenGift.buyTickets = tokenGift.buyTickets.plus(event. params.ticketNumbers)
    tokenGift.save()
  }
}

export function handleTokenGiftClaimable(event: TokenGiftClaimableEvent): void {
  let id = event.params.id.toString()
  let entity = new TokenGiftClaimable(
    id
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let tokenGift = TokenGift.load(id)
  if (tokenGift != null){
    tokenGift.status = 3
    tokenGift.nonce = event.params.nonce
    tokenGift.vrfRandom = event.params.vrfRandom
    tokenGift.randomResult = event.params.randomResult

    tokenGift.save()
  }
  entity.tokenGift = id
  entity.save()
}

export function handleTokenGiftClosed(event: TokenGiftClosedEvent): void {
  let id = event.params.id.toString()
  let entity = new TokenGiftClaimable(
    id
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let tokenGift = TokenGift.load(id)
  if (tokenGift != null){
    tokenGift.status = 2
    tokenGift.endTimestamp = event.params.endTime
    tokenGift.buyTickets = event.params.buyTickets
    tokenGift.sendTickets = event.params.sendTickets
    tokenGift.injectTickets = event.params.injectTickets

    tokenGift.save()
  }
  
  entity.tokenGift = id
  entity.save()
}

export function handleTokenGiftCreated(event: TokenGiftCreatedEvent): void {
  let id = event.params.id.toString()
  let tokenGift = new TokenGift(
    id
  )
  tokenGift.status = 1
  tokenGift.model = event.params.model
  tokenGift.buyTickets = new BigInt(0)
  tokenGift.sendTickets = new BigInt(0)
  tokenGift.allowAddr = event.params.allowAddr
  tokenGift.injectTickets = new BigInt(0)
  tokenGift.startTimestamp = event.block.timestamp
  tokenGift.maxTickets = event.params.maxTickets
  tokenGift.maxPrizeNum = event.params.maxPrizeNum
  tokenGift.endTime = event.params.endTime
  tokenGift.secret = event.params.secret

  tokenGift.ticketToken = event.params.ticketToken
  tokenGift.ticketPirce = event.params.ticketPirce
  
  tokenGift.autoClaim = event.params.autoClaim
  tokenGift.save()

  let entity = new TokenGiftCreated(
    id
  )
  entity.model = event.params.model
  entity.startTime = event.block.timestamp
  entity.endTime = event.params.endTime
  entity.maxTickets = event.params.maxTickets
  entity.maxPrizeNum = event.params.maxPrizeNum
  entity.sendAllowAddr = event.params.allowAddr
  entity.ticketPirce = event.params.ticketPirce
  entity.autoClaim = event.params.autoClaim

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.tokenGift = id 

  entity.save()
}
