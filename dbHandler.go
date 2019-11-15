package main

import (
	"fmt"
	// "log"
)

func (db *DbDriver) findFaves(id string, faveId string) bool {
	var FavesID string
	err := db.db.Get(&FavesID, "SELECT id from user_favourites where user_id = $1 AND coin_id = $2", id, faveId)
	if err == nil {
		return true
	}
	return false
}

func (db *DbDriver) addFave(id string, uid string, cid string) bool {
	sqlStatement := `INSERT INTO user_favourites (id, user_id, coin_id) VALUES (:ID, :uid, :cid)`
	_, err := db.db.NamedExec(sqlStatement, map[string]interface{}{
		"id":  id,
		"user_id": uid,
		"coin_id": cid,
	})
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func (db *DbDriver)  rmFave(uid string, cid string) bool {
	sqlStatement := `DELETE FROM user_favourites WHERE user_id = $1 AND coin_id = $2`
	_, err := db.db.Exec(sqlStatement, uid, cid)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}