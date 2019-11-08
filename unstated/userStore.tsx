import React, { MouseEvent, useEffect } from "react"

import { useState } from "react"
import { createContainer } from "unstated-next"
import { loginUser, coinInfo, regisUser, coinData, IFaves } from "./interfaces"
import { async } from "q"

export const UserStore = () => {
	const postData = async (url: string, body: {}) => {
		try {
			return await fetch(url, {
				method: "post",
				body: JSON.stringify(body),
			})
				.then(res => res.json())
				.then(data => data)
		} catch {}
	}

	// 0# Setup

	// init user
	const [initUser, setInitUser] = useState<loginUser>()

	// Favorite setup
	const [userFaves, setUserFaves] = useState<IFaves[]>([])
	// Fave Method
	const isFaved = (fave: IFaves) => {
		return userFaves.includes(fave)
	}
	const isFavedCoin = (prod: coinInfo) => {
		if (reqProducts) {
			if (userFaves) {
				return userFaves
					.map(f => {
						if (f.ID == prod.id) {
							return prod
						}
					})
					.includes(prod)
			}
		}
	}

	const tglFaves = (userId: string, coinId: string) => {
		if (initUser) {
			postData("http://localhost:8080/api/favourites/toggle", {
				user_ID: userId,
				CoinID: coinId,
			})
				.then(data => {
					// data is a bool
					console.log(data)
					return data
				})
				.then(d => {
					if (d) {
						// api call to get the fave list
						postData("http://localhost:8080/api/favourites/list", { uid: userId }).then(faveList => {
							// sets new fave list
							setUserFaves(faveList ? faveList : [])
							// console.log(faveList)
						})
					}
				})
		}
	}
	const getSetFaves = async (id: string) => {
		await postData("http://localhost:8080/api/favourites/list", { uid: id }).then(data => {
			setUserFaves(data ? data : [])
		})
	}

	//Card PopUp
	const [popUp, setpopUp] = useState<boolean>(false)

	const [onLine, setOnLine] = useState<boolean>(false)

	// This is for displaying card data
	const [getData, setGetData] = useState<coinData>()

	const getOneCoin = async (id: string) => {
		await postData("http://localhost:8080/api/getonecoin", { id: id.toString() }).then(data => {
			setGetData(data)
		})
	}
	// 0.1# Query & Search
	const [dash_searchInput, dash_setSearchInput] = useState<string>("")
	const [apiProducts, setApiProducts] = useState<coinInfo[]>()
	const [reqProducts, setReqProducts] = useState<coinInfo[] | undefined>(apiProducts)

	const getReqProducts = (evt: MouseEvent) => {
		evt.preventDefault()
		apiProducts && setReqProducts(apiProducts.filter(product => product.id.includes(dash_searchInput.toUpperCase())))
	}
	const useFetchProducts = (url: string, options = {}) => {
		const [resp, setResp] = React.useState()
		const [err, setErr] = React.useState()
		React.useEffect(() => {
			const fetchData = async () => {
				try {
					const res = await fetch(url, options)
					const json = await res.json()
					setResp(json)
					setApiProducts(json)
				} catch (err) {
					setErr(err)
				}
			}
			fetchData()
		}, [])
		return { resp, err }
	}
	// 0.2# Exit

	const handleRestart = () => {
		// signOut Method
		setOnLine(false)
		setisLoggedIn(false)
		setInitUser(undefined)
	}

	// 1# Login Init
	const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)
	const [login_emailInput, login_setEmailInput] = useState<string>("")
	const [login_passwordInput, login_setPasswordInput] = useState<string>("")

	// Sign In Event Handler
	const handleLogin = async (evt: MouseEvent) => {
		evt.preventDefault()
		postData("http://localhost:8080/api/signin", { email: login_emailInput, password: login_passwordInput }).then(data => {
			if (data.id != undefined) {
				const currentUserFromSql: loginUser = {
					Id: data.id,
					isLoggedIn: true,
					username: data.username,
					email: data.email,
					password: data.password,
				}
				console.log(currentUserFromSql)
				setInitUser(currentUserFromSql)
				getSetFaves(currentUserFromSql.Id)
				setisLoggedIn(true)
				setOnLine(true)
			} else {
				alert("Username or Password incorrect, please try again")
			}
		})
	}

	// #2 Register Init
	const [isRegistered, setisRegistered] = useState<boolean>(false)
	const [reg_username, reg_setUsername] = useState<string>("")
	const [reg_emailInput, reg_setEmailInput] = useState<string>("")
	const [reg_passwordInput, reg_setPasswordInput] = useState<string>("")

	// Register Event Handler
	const handleReg = async (evt: MouseEvent) => {
		evt.preventDefault()
		postData("http://localhost:8080/api/signup", { username: reg_username, email: reg_emailInput, password: reg_passwordInput }).then(data => {
			if (data != null) {
				const currentUserFromSql: regisUser = {
					Id: data.id,
					isRegistered: true,
					username: data.username,
					email: data.email,
					password: data.password,
				}
				console.log(currentUserFromSql)
				getSetFaves(currentUserFromSql.Id)
				setisRegistered(true)
				setOnLine(true)
				alert("Registered!")
			} else {
				alert("Email already registered!")
			}
		})
	}

	// # unstated
	return {
		/* Login */
		login_emailInput,
		login_passwordInput,
		login_setEmailInput,
		login_setPasswordInput,
		isLoggedIn,
		// Methods
		handleLogin,

		/* Register */
		reg_emailInput,
		reg_passwordInput,
		reg_setEmailInput,
		reg_setPasswordInput,
		reg_username,
		reg_setUsername,
		isRegistered,
		//Methods
		handleReg,

		/* Status */
		onLine,
		setOnLine,
		//Methods
		handleRestart,

		/* Getting coin info */
		getOneCoin,

		dash_searchInput,
		dash_setSearchInput,
		apiProducts,
		setApiProducts,
		reqProducts,
		setReqProducts,

		//Methods
		getReqProducts,
		useFetchProducts,

		// Pop UP
		popUp,
		setpopUp,

		// Get Coin
		getData,
		setGetData,

		// User Favorites
		userFaves,
		setUserFaves,
		//Method
		isFavedCoin,
		isFaved,
		tglFaves,

		//init user
		initUser,
		setInitUser,
	}
}

export const StoreContainer = createContainer(UserStore)
