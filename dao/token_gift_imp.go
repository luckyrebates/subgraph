package dao

import (
	"context"
	"encoding/json"
	"log"
	"strings"

	"github.com/machinebox/graphql"
)

var client *graphql.Client

func init() {
	//client = graphql.NewClient("https://api.studio.thegraph.com/query/70193/luckytokengifttest/v0.0.5")
	client = graphql.NewClient("https://api.studio.thegraph.com/query/70193/luckytokengifttest/version/latest")
}

// 查询最新的n个红包
//
// model:.0.全查；1.仅查buy model模式的；2.仅查get model模式的
//
//status:0.全查；1.open 2.Close  3.Claimable
func GetTokenGiftList(first int, model int, status int) string {
	whereList := []string{}
	if model != 0 {
		whereList = append(whereList, "model:$modelkey")
	}
	if status != 0 {
		whereList = append(whereList, "status:$statuskey")
	}
	whereStr := strings.Join(whereList, ",")
	query := string(`query ($firstkey: Int!,$modelkey: Int!,$statuskey: Int!) { 
        tokenGifts (first:$firstkey,orderBy:id,orderDirection :desc,where:{` + whereStr + `}){
            id
            ticketToken
            ticketPirce

            status
            model

            allowAddr
            secret
            nonce

            buyTickets
            sendTickets
            injectTickets

            autoClaim
            maxTickets
            maxPrizeNum
            endTime
    
    		startTimestamp
    		endTimestamp
        }
    }`)
	// make a request
	req := graphql.NewRequest(query)

	// set any variables
	req.Var("firstkey", first)
	req.Var("modelkey", model)
	req.Var("statuskey", status)

	// set header fields
	req.Header.Set("Cache-Control", "no-cache")

	// define a Context for the request
	ctx := context.Background()

	// run it and capture the response
	var respData interface{}
	if err := client.Run(ctx, req, &respData); err != nil {
		log.Fatal(err)
	}
	data, err := json.Marshal(respData)
	if err != nil {
		log.Fatal(err)
	}
	return string(data)
}

// 查询某一条红包的详情
func GetTokenGift(id string) string {
	// make a request
	req := graphql.NewRequest(`
    query ($key: String!) {
        tokenGift (id:$key) {
            id
            ticketToken
            ticketPirce

            status
            model

            allowAddr
            secret
            nonce

            buyTickets
            sendTickets
            injectTickets

            autoClaim
            maxTickets
            maxPrizeNum
            endTime
    
    		startTimestamp
    		endTimestamp

            createdEvent{
                blockNumber
                transactionHash
                blockTimestamp
            }
            closedEvent{
                blockNumber
                transactionHash
                blockTimestamp
            }
            claimableEvent{
                blockNumber
                transactionHash
                blockTimestamp
            }
            ticketsInjectList{
                sender
                ticketNumbers
                transactionHash
            }
            ticketsPurchaseList{
                sender
                receiveAddress
                ticketNumbers
                transactionHash
            }
            ticketsGetList{
                sender
                receiveAddress
                ticketNumbers
                transactionHash
            }
            prizeDrawnList{
                winner
                amount
            }
            claimPrizeList{
                winner
                totalAmount
                autoClaim
                transactionHash
            }

        }
    }
`)

	// set any variables
	req.Var("key", id)

	// set header fields
	req.Header.Set("Cache-Control", "no-cache")

	// define a Context for the request
	ctx := context.Background()

	// run it and capture the response
	var respData interface{}
	if err := client.Run(ctx, req, &respData); err != nil {
		log.Fatal(err)
	}
	data, err := json.Marshal(respData)
	if err != nil {
		log.Fatal(err)
	}
	return string(data)
}

// 查询用户的参与历史
// ticketsPurchaseList为该用户的buy记录，TicketsGetList为get记录，prizeDrawnList为中奖记录，claimPrizeList为领奖记录
func GetUserInfo(addr string) string {
	req := graphql.NewRequest(`
    query ($key: String!) {
        userInfo (id:$key) {
            id
            ticketsPurchaseList{
                tokenGift{
                    id
                }
                sender
                receiveAddress
                ticketNumbers
                transactionHash
            }
            ticketsGetList{
                tokenGift{
                    id
                }
                sender
                receiveAddress
                ticketNumbers
                transactionHash
            }
            prizeDrawnList{
                tokenGift{
                    id
                }
                amount
                transactionHash
            }
            claimPrizeList{
                tokenGift{
                    id
                }
                totalAmount
                transactionHash
            }
        }
    }
`)

	// set any variables
	req.Var("key", addr)

	// set header fields
	req.Header.Set("Cache-Control", "no-cache")

	// define a Context for the request
	ctx := context.Background()

	// run it and capture the response
	var respData interface{}
	if err := client.Run(ctx, req, &respData); err != nil {
		log.Fatal(err)
	}
	data, err := json.Marshal(respData)
	if err != nil {
		log.Fatal(err)
	}
	return string(data)
}

func GetUserInfoWithTokenGiftId(addr string, id string) string {
	req := graphql.NewRequest(`
    query ($addr: String!,$id: String!) {
        userInfo (id:$addr) {
            id
            ticketsPurchaseList(orderBy:blockTimestamp,orderDirection :asc,where:{tokenGift:$id}){
                sender
                receiveAddress
                ticketNumbers
                fromIndex
                toIndex
                transactionHash
                blockTimestamp
            }
            ticketsGetList(orderBy:blockTimestamp,orderDirection :asc,where:{tokenGift:$id}){
                sender
                receiveAddress
                ticketNumbers
                fromIndex
                toIndex
                transactionHash
                blockTimestamp
            }
            prizeDrawnList(orderBy:index,orderDirection :asc,where:{tokenGift:$id}){
                amount
                index
                transactionHash
            }
            claimPrizeList(where:{tokenGift:"1"}){
                totalAmount
                autoClaim
                transactionHash
            }
        }
    }
`)

	// set any variables
	req.Var("addr", addr)
	req.Var("id", id)

	// set header fields
	req.Header.Set("Cache-Control", "no-cache")

	// define a Context for the request
	ctx := context.Background()

	// run it and capture the response
	var respData interface{}
	if err := client.Run(ctx, req, &respData); err != nil {
		log.Fatal(err)
	}
	data, err := json.Marshal(respData)
	if err != nil {
		log.Fatal(err)
	}
	return string(data)
}
