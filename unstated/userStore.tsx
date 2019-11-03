import React, { MouseEvent } from "react"

import { useState } from "react"
import { createContainer } from "unstated-next"
import { loginUser, IProduct, ITickerData, regisUser } from "./interfaces"
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
	// const infoValidator = () => {
	// 	if
	// }

	// 1# Login Init
	const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)
	const [login_emailInput, login_setEmailInput] = useState<string>("")
	const [login_passwordInput, login_setPasswordInput] = useState<string>("")

	// Sign In Event Handler
	const handleLogin = async (evt: MouseEvent) => {
		evt.preventDefault()
		postData("http://localhost:8080/api/signin", { email: login_emailInput, password: login_passwordInput }).then(data => {
			if (data.id != undefined) {
				console.log(data)
				const currentUserFromSql: loginUser = {
					Id: data.id,
					isLoggedIn: true,
					username: data.username,
					email: data.email,
					password: data.password,
				}
				console.log(currentUserFromSql)
				setisLoggedIn(true)
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
				console.log(data)
				const currentUserFromSql: regisUser = {
					Id: data.id,
					isRegistered: true,
					username: data.username,
					email: data.email,
					password: data.password,
				}
				console.log(currentUserFromSql)
				setisRegistered(true)
				alert("Registered!")
			} else {
				alert("Email have already an existing user")
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
	}
}

export const StoreContainer = createContainer(UserStore)
