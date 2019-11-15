package main

import (

"github.com/jmoiron/sqlx"
)

type DbDriver struct {
	db *sqlx.DB
}

// type API struct {
// 	dbkey  *DbDriver
// }

type Ticker struct {
	Coin_ID string `json: trade_id"`
	Price string `json: "price"`
	Time    string `json: "size"`
	Bid     string `json: "time"`
	Ask     string `json: "bid"`
	Volume  string `json: "ask"`
	Size    string `json: "volume"`
}
type TickerData struct {
	ID     string	`json: "id"`
	Price  string	`json: "price"`
	Time   string	`json: "time"`
	Bid    string	`json: "bid"`
	Ask    string	`json: "ask"`
	Volume string	`json: "volume"`
	Size   string	`json: "size"`
}

// coins - query data
type Product struct {
	ID             string `json: "id"`
	BaseCurrency   string `json: "base_currency"`
	QuoteCurrency  string `json: "quote_currency"`
	BaseMinSize    string `json: "base_min_size"`
	BaseMaxSize    string `json: "base_max_size"`
	QuoteIncrement string `json: "quote_increment"`
	BaseIncrement  string `json: "base_increment"`
	DisplayName    string `json: "display_name"`
	MinMarketFunds string `json: "min_market_funds"`
	MaxMarketFunds string `json: "max_market_funds"`
	MarginEnabled  bool   `json: "margin_enabled"`
	PostOnly       bool   `json: "post_only"`
	LimitOnly      bool   `json: "limit_only"`
	CancelOnly     bool   `json: "cancel_only"`
	Status         string `json: "status"`
	StatusMessage  string `json: "status_message"`
}

type ShortTicker struct {
	TickerId string
	Price  string
	Time   string
	Bid    string
	Ask    string
	Volume string
	Size   string
}

type UserID struct {
	UID string `json: "user_id"`
}

type UserFave struct {
	ID string `json:"id"`
	UserID string `json:"user_id"`
	CoinID string `json:"coin_id`
}

type SuccessOnly struct {
	Success bool
}

type UserInfo struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

