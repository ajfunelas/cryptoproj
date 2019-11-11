package main

import (
	"fmt"
	"net/http"
    "encoding/json"
    "time"
    "database/sql"
    "log"
	// "net/http"
	// "encoding/json"
	
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
    uuid "github.com/gofrs/uuid"
)
func (dbDriver *DbDriver) startRoutes() {
	r := chi.NewRouter()
	cors := cors.New(cors.Options{
		// AllowedOrigins: []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins:   []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	  })
	  r.Use(cors.Handler)

    r.Post("/api/favourites/list", dbDriver.getFaves)
	r.Post("/api/favourites/toggle", dbDriver.tglFave)
	r.Post("/api/signin", dbDriver.signinHandler)
	r.Post("/api/signup", dbDriver.signUpHandler)
	r.Post("/api/getonecoin", dbDriver.getOneCoin)

	
	http.ListenAndServe(":8080", r)
	
}
// Get Products Function
func getProducts() []*Product {
	resp, err := http.Get("https://api.pro.coinbase.com//products")
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	var products []*Product
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&products)
	if err != nil {
		panic(err)
	}
	return products
}

func (dbDriver *DbDriver) getOneCoin(w http.ResponseWriter, r *http.Request) {
	var tickData TickerData
	
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&tickData)
	if err != nil {
		fmt.Println(err)
		return 
	}
	err = dbDriver.db.QueryRow(`SELECT * FROM tickers WHERE id = $1`,
	tickData.ID).Scan(&tickData.ID, &tickData.Price, &tickData.Time, &tickData.Bid,
	&tickData.Ask, &tickData.Volume, &tickData.Size)

	if err != nil {
		fmt.Println(err)
		return
	}
	tickerData := &TickerData{
		ID: tickData.ID, Price:tickData.Price,
		Time: tickData.Time, Bid: tickData.Bid, Ask: tickData.Ask,
		Volume: tickData.Volume, Size: tickData.Size}

	json.NewEncoder(w).Encode(tickerData)
}

// Populate Ticker Table Function
func (dbDriver *DbDriver) populateTickers() {
	// loop through products call get ticker
	n := 0
	for {
		go dbDriver.getTicker(getProducts()[n].ID)

		if n >= len(getProducts())-1 {
			n = 0
		} else {
			n++
		}
		time.Sleep(2 * time.Second)
	}
}

// Grabs ticker data
func (dbDriver *DbDriver) getTicker(id string) {
	resp, err := http.Get("https://api.pro.coinbase.com/products/" + id + "/ticker") // this gets the data from the API
	
	if err != nil {
	}
	defer resp.Body.Close()
	var ticker *Ticker // this variable holds the ticker that was fetched from the API
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&ticker)
	if err != nil {
		panic(err)
	}
	tickerData := &TickerData{ID: id, Price: ticker.Price, Time: ticker.Time, Bid: ticker.Bid, Ask: ticker.Ask, Volume: ticker.Volume, Size: ticker.Size}
	dbDriver.refreshTickers(tickerData, id)
}

// Refreshes the ticker data
func (dbDriver *DbDriver) refreshTickers(tData *TickerData, id string) {
	row := dbDriver.db.QueryRow("select price from tickers where id = $1", id)

	switch err := row.Scan(&tData.ID); err {
	case sql.ErrNoRows:
		//fmt.Println("NO ID")
		_, err = dbDriver.db.Exec(`INSERT INTO tickers (id, price, time, bid, ask, volume, size) VALUES ($1, $2, $3, $4, $5, $6, $7);`, id, tData.Price, tData.Time, tData.Bid, tData.Ask, tData.Volume, tData.Size) // OK
		if err != nil {
			panic(err)

		}
	case nil:
		//fmt.Println()//"ID EXIST"
		_, err = dbDriver.db.Exec(`UPDATE tickers SET price = $2, time = $3, bid = $4, ask = $5, volume = $6, size = $7 WHERE id = $1;`, id, tData.Price, tData.Time, tData.Bid, tData.Ask, tData.Volume, tData.Size) // OK
		//fmt.Println(`INSERT INTO tickers (id, price, time, bid, ask, volume, size) VALUES ($1, $2, $3, $4, $5, $6, $7)`, id, tData.Price, tData.Time, tData.Bid, tData.Ask, tData.Volume, tData.Size)                 // OK

		if err != nil {
			panic(err)

		}
	default:
		panic(err)
	}

}
func (db *DbDriver) getFaves(w http.ResponseWriter, r *http.Request) {
	var (	
        userID     UserID
        tickerList []ShortTicker
        tickerId   string
        price      string
        time       string
        bid        string
        ask        string
        volume     string
        size       string
    )
    decoder := json.NewDecoder(r.Body)
    err := decoder.Decode(&userID)
    // get favourites from db
    rows, err := db.db.Query(`SELECT tickers.id, tickers.price, tickers.time, tickers.bid, tickers.ask, tickers.volume, tickers.size 
                                    FROM tickers 
                                    INNER JOIN user_favourites ON tickers.Id=user_favourites.coin_id
                                    WHERE user_favourites.user_id=$1;`, userID.UID)
if err != nil {
    fmt.Println(err)
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
}

defer rows.Close()
for rows.Next() {
    err := rows.Scan(
        &tickerId, &price, &time, &bid, &ask, &volume, &size,
    )
    if err != nil {
        fmt.Println(err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    t := ShortTicker{TickerId: tickerId, Price: price, Time: time, Bid: bid, Ask: ask, Volume: volume, Size: size}
    fmt.Println(t)
    tickerList = append(tickerList, t)
}
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(tickerList)
}

func getRouter() chi.Router{
	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi Owen")
		
})
return r
}

// toggle faves
func (db *DbDriver) tglFave(w http.ResponseWriter, r *http.Request) {
	var (
		faveId string
		success    bool
		tag        string
	)
	var userfave UserFave
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&userfave)
	if err != nil {
		panic(err)
	}
	id, err := uuid.NewV4()

	if err != nil {
		log.Fatalf("UUID create error: %v", err)
	}
	tag = "insert"
	rows, err := db.db.Query("SELECT coin_id from user_favourites where user_id = $1", userfave.UserID)
	if err != nil {
		tag = "insert"
	} else {
		for rows.Next() {
			err := rows.Scan(&faveId)
			if err != nil {
				log.Fatal(err)
			}
			if faveId == userfave.CoinID {
                tag = "delete"
			}

		}
		err = rows.Err()
		if err != nil {
			log.Fatal(err)
		}
	}
	defer rows.Close()
	success = true
	if tag == "insert" {
        fmt.Println("Inserted")
		sqlStatement := `INSERT INTO user_favourites (id, user_id, coin_id) VALUES ($1, $2, $3)`
		_, err = db.db.Exec(sqlStatement, id.String(), userfave.UserID, userfave.CoinID)
		if err != nil {
			fmt.Println(err)
			success = false
		}

	} else {
        fmt.Println("Deleted")
		sqlStatement := `DELETE FROM user_favourites WHERE user_id = $1 AND coin_id = $2`
		_, err = db.db.Exec(sqlStatement, userfave.UserID, userfave.CoinID)
		if err != nil {
			fmt.Println(err)
			success = false
		}
	}
	Success := &SuccessOnly{Success: success}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Success)
}


//Sign In Handler
func (db *DbDriver) signinHandler(w http.ResponseWriter, r *http.Request) {
	var user UserInfo
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}
	err = db.db.QueryRow(`SELECT id, username FROM users WHERE email = $1 AND password = $2`, user.Email, user.Password).Scan(&user.ID, &user.Username)
	if err != nil {
		fmt.Println("Signin Error!")
		json.NewEncoder(w).Encode("You failed!")
		return
	}
	fmt.Println("Signed In!")
	u := UserInfo{ID: user.ID, Username: user.Username, Password: user.Password, Email: user.Email}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

// #Sign Up 
func (db *DbDriver) signUpHandler(w http.ResponseWriter, r *http.Request) {
	var user UserInfo
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}
	err = db.db.QueryRow(`SELECT id FROM users WHERE username = $1 AND email = $2 `, user.Username, user.Email).Scan(&user.ID)
	if err != nil {
		fmt.Println("User does not exist!")
		// json.NewEncoder(w).Encode("User does not exist!")
		uid, err := uuid.NewV4()
		sqlStatement := `INSERT INTO users (id, username, password, email) VALUES($1, $2, $3, $4);`
		_, err = db.db.Exec(sqlStatement, uid.String(), user.Username, user.Password, user.Email)
		if err != nil {
			fmt.Println(err)
			return
		}
	
	}
	fmt.Println("Registered")
	reg := UserInfo{ID: user.ID, Username: user.Username, Email: user.Email, Password: user.Password, }
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reg)
}
