import React, { MouseEvent } from "react"

import { useState } from "react"
import { createContainer } from "unstated-next"
import { IUser, IProduct, ITickerData } from "./interfaces"

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

	const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)

	const [login_emailInput, login_setEmailInput] = useState<string>("")
	const [login_passwordInput, login_setPasswordInput] = useState<string>("")

	const handleLogin = async (evt: MouseEvent) => {
		evt.preventDefault()

		postData("http://localhost:8080/api/signin", { email: login_emailInput, password: login_passwordInput }).then(data => {
			if (data.id != undefined) {
				console.log(data)
				const currentUserFromSql: IUser = {
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

	return {
		/* Login */
		login_emailInput,
		login_passwordInput,
		login_setEmailInput,
		login_setPasswordInput,
		isLoggedIn,
		// Methods
		handleLogin,
	}
}

export const StoreContainer = createContainer(UserStore)
