package main

import (
	"fmt"
	// "flag"
	// "log"

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



//   func main() {

// 	// DBHost := flag.String("db-host", "localhost", "DBHost")
// 	// DBPort := flag.Int("db-port", 6432, "DBPort")
// 	// DBUser := flag.String("db-user", "coinbase", "DBUser")
// 	// DBPass := flag.String("db-pass", "dev", "DBPass")
// 	// DBName := flag.String("db-name", "coinbase", "DBName")

// 	// flag.Parse()


// 	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
// 	  "password=%s dbname=%s sslmode=disable",
// 	  host, port, user, password, dbname)
// 	conn, err := sqlx.Open("postgres", psqlInfo)
// 	if err != nil {
// 	  panic(err)
// 	}
// 	_, err =sqlx.Connect("postgres", psqlInfo)
// 	// defer d.Close()
// 	// err = d.Ping()

// 	if err != nil {
// 	  log.Fatalln(err)
// 	}

// 	// defer conn.Close()

// 	d := &DbDriver{db: conn}
	
// 	go d.populateTickers()
// 	fmt.Println("Successfully connected!")
// 	fmt.Println("Server is Running!")
// 	d.startRoutes()
//   }
 












