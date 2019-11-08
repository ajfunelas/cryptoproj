package main

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)
const (
	host     = "localhost"
	port     = 6432
	user     = "coinbase"
	password = "dev"
	dbname   = "coinbase"
  )
  
  func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	  "password=%s dbname=%s sslmode=disable",
	  host, port, user, password, dbname)
	db, err := sqlx.Open("postgres", psqlInfo)
	if err != nil {
	  panic(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
	  panic(err)
	}
	dbDriver := &DbDriver{db: db}
	go dbDriver.populateTickers()
	fmt.Println(dbDriver.db)
	fmt.Println("Successfully connected!")
	fmt.Println("Server is Running!")
	dbDriver.startRoutes()
  }













