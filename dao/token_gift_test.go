package dao

import (
	"log"
	"testing"
)

func TestGetTokenGiftList(t *testing.T) {
	str := GetTokenGiftList(10, 1, 0)
	log.Println(str)
}

func TestGetTokenGift(t *testing.T) {
	str := GetTokenGift("1")
	log.Println(str)
}

func TestUserInfo(t *testing.T) {
	str := GetUserInfo("0x874ba02ec75e3a6ffdde59fb79e993d4e42053ac")
	log.Println(str)
}

func TestGetUserInfoWithTokenGiftId(t *testing.T) {
	str := GetUserInfoWithTokenGiftId("0x874ba02ec75e3a6ffdde59fb79e993d4e42053ac", "1")
	log.Println(str)
}
