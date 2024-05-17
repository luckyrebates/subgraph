import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
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
} from "../generated/LuckyTokenGift/LuckyTokenGift"

export function createClaimPrizeEvent(
  id: BigInt,
  winner: Address,
  totalAmount: BigInt,
  autoClaim: boolean
): ClaimPrize {
  let claimPrizeEvent = changetype<ClaimPrize>(newMockEvent())

  claimPrizeEvent.parameters = new Array()

  claimPrizeEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  claimPrizeEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  claimPrizeEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmount",
      ethereum.Value.fromUnsignedBigInt(totalAmount)
    )
  )
  claimPrizeEvent.parameters.push(
    new ethereum.EventParam("autoClaim", ethereum.Value.fromBoolean(autoClaim))
  )

  return claimPrizeEvent
}

export function createDefaultAutoClaimChangeEvent(
  defaultAutoClaim: boolean
): DefaultAutoClaimChange {
  let defaultAutoClaimChangeEvent = changetype<DefaultAutoClaimChange>(
    newMockEvent()
  )

  defaultAutoClaimChangeEvent.parameters = new Array()

  defaultAutoClaimChangeEvent.parameters.push(
    new ethereum.EventParam(
      "defaultAutoClaim",
      ethereum.Value.fromBoolean(defaultAutoClaim)
    )
  )

  return defaultAutoClaimChangeEvent
}

export function createDefaultTokenChangeEvent(
  defaultTicketToken: Address,
  defaultTicketPirce: BigInt
): DefaultTokenChange {
  let defaultTokenChangeEvent = changetype<DefaultTokenChange>(newMockEvent())

  defaultTokenChangeEvent.parameters = new Array()

  defaultTokenChangeEvent.parameters.push(
    new ethereum.EventParam(
      "defaultTicketToken",
      ethereum.Value.fromAddress(defaultTicketToken)
    )
  )
  defaultTokenChangeEvent.parameters.push(
    new ethereum.EventParam(
      "defaultTicketPirce",
      ethereum.Value.fromUnsignedBigInt(defaultTicketPirce)
    )
  )

  return defaultTokenChangeEvent
}

export function createOperatorAddressEvent(
  operatorAddress: Address,
  opt: boolean
): OperatorAddress {
  let operatorAddressEvent = changetype<OperatorAddress>(newMockEvent())

  operatorAddressEvent.parameters = new Array()

  operatorAddressEvent.parameters.push(
    new ethereum.EventParam(
      "operatorAddress",
      ethereum.Value.fromAddress(operatorAddress)
    )
  )
  operatorAddressEvent.parameters.push(
    new ethereum.EventParam("opt", ethereum.Value.fromBoolean(opt))
  )

  return operatorAddressEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPrizeDrawnEvent(
  id: BigInt,
  winner: Address,
  index: BigInt,
  amount: BigInt,
  autoClaim: boolean
): PrizeDrawn {
  let prizeDrawnEvent = changetype<PrizeDrawn>(newMockEvent())

  prizeDrawnEvent.parameters = new Array()

  prizeDrawnEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  prizeDrawnEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  prizeDrawnEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  prizeDrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  prizeDrawnEvent.parameters.push(
    new ethereum.EventParam("autoClaim", ethereum.Value.fromBoolean(autoClaim))
  )

  return prizeDrawnEvent
}

export function createTicketsGetEvent(
  id: BigInt,
  sender: Address,
  receiveAddress: Address,
  ticketIndex: BigInt,
  ticketNumbers: BigInt
): TicketsGet {
  let ticketsGetEvent = changetype<TicketsGet>(newMockEvent())

  ticketsGetEvent.parameters = new Array()

  ticketsGetEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  ticketsGetEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  ticketsGetEvent.parameters.push(
    new ethereum.EventParam(
      "receiveAddress",
      ethereum.Value.fromAddress(receiveAddress)
    )
  )
  ticketsGetEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIndex",
      ethereum.Value.fromUnsignedBigInt(ticketIndex)
    )
  )
  ticketsGetEvent.parameters.push(
    new ethereum.EventParam(
      "ticketNumbers",
      ethereum.Value.fromUnsignedBigInt(ticketNumbers)
    )
  )

  return ticketsGetEvent
}

export function createTicketsInjectEvent(
  id: BigInt,
  sender: Address,
  ticketNumbers: BigInt
): TicketsInject {
  let ticketsInjectEvent = changetype<TicketsInject>(newMockEvent())

  ticketsInjectEvent.parameters = new Array()

  ticketsInjectEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  ticketsInjectEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  ticketsInjectEvent.parameters.push(
    new ethereum.EventParam(
      "ticketNumbers",
      ethereum.Value.fromUnsignedBigInt(ticketNumbers)
    )
  )

  return ticketsInjectEvent
}

export function createTicketsPurchaseEvent(
  id: BigInt,
  sender: Address,
  receiveAddress: Address,
  ticketIndex: BigInt,
  ticketNumbers: BigInt
): TicketsPurchase {
  let ticketsPurchaseEvent = changetype<TicketsPurchase>(newMockEvent())

  ticketsPurchaseEvent.parameters = new Array()

  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam(
      "receiveAddress",
      ethereum.Value.fromAddress(receiveAddress)
    )
  )
  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIndex",
      ethereum.Value.fromUnsignedBigInt(ticketIndex)
    )
  )
  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam(
      "ticketNumbers",
      ethereum.Value.fromUnsignedBigInt(ticketNumbers)
    )
  )

  return ticketsPurchaseEvent
}

export function createTokenGiftClaimableEvent(
  id: BigInt,
  endTime: BigInt
): TokenGiftClaimable {
  let tokenGiftClaimableEvent = changetype<TokenGiftClaimable>(newMockEvent())

  tokenGiftClaimableEvent.parameters = new Array()

  tokenGiftClaimableEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  tokenGiftClaimableEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return tokenGiftClaimableEvent
}

export function createTokenGiftClosedEvent(
  id: BigInt,
  endTime: BigInt,
  buyTickets: BigInt,
  sendTickets: BigInt,
  injectTickets: BigInt
): TokenGiftClosed {
  let tokenGiftClosedEvent = changetype<TokenGiftClosed>(newMockEvent())

  tokenGiftClosedEvent.parameters = new Array()

  tokenGiftClosedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  tokenGiftClosedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  tokenGiftClosedEvent.parameters.push(
    new ethereum.EventParam(
      "buyTickets",
      ethereum.Value.fromUnsignedBigInt(buyTickets)
    )
  )
  tokenGiftClosedEvent.parameters.push(
    new ethereum.EventParam(
      "sendTickets",
      ethereum.Value.fromUnsignedBigInt(sendTickets)
    )
  )
  tokenGiftClosedEvent.parameters.push(
    new ethereum.EventParam(
      "injectTickets",
      ethereum.Value.fromUnsignedBigInt(injectTickets)
    )
  )

  return tokenGiftClosedEvent
}

export function createTokenGiftCreatedEvent(
  id: BigInt,
  model: i32,
  endTime: BigInt,
  maxTickets: BigInt,
  maxPrizeNum: BigInt,
  ticketPirce: BigInt,
  ticketToken: Address,
  allowAddr: Address,
  autoClaim: boolean
): TokenGiftCreated {
  let tokenGiftCreatedEvent = changetype<TokenGiftCreated>(newMockEvent())

  tokenGiftCreatedEvent.parameters = new Array()

  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "model",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(model))
    )
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxTickets",
      ethereum.Value.fromUnsignedBigInt(maxTickets)
    )
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxPrizeNum",
      ethereum.Value.fromUnsignedBigInt(maxPrizeNum)
    )
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketPirce",
      ethereum.Value.fromUnsignedBigInt(ticketPirce)
    )
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketToken",
      ethereum.Value.fromAddress(ticketToken)
    )
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam("allowAddr", ethereum.Value.fromAddress(allowAddr))
  )
  tokenGiftCreatedEvent.parameters.push(
    new ethereum.EventParam("autoClaim", ethereum.Value.fromBoolean(autoClaim))
  )

  return tokenGiftCreatedEvent
}
