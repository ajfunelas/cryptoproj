import React from "react"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { Button, SIZE, SHAPE } from "baseui/button"
import styled from "styled-components"
import Header from "../Header"
import { StoreContainer } from "../../unstated/userStore"
import { useStyletron } from "styletron-react"
import { Block } from "baseui/block"
import { Link, Redirect } from "react-router-dom"
import "../../index.css"

interface Props {}

const LoginPage: React.FC<Props> = () => {
	const { login_emailInput, login_passwordInput, handleLogin, login_setEmailInput, login_setPasswordInput, isLoggedIn } = StoreContainer.useContainer()
	if (isLoggedIn) {
		// store.handleFetchDataList()
		return <Redirect to="/dashboard" />
	}
	return (
		<div>
			<Block
				overrides={{
					Block: {
						style: {
							marginLeft: "25%",
							marginRight: "25%",
						},
					},
				}}
			>
				<FormControl label={() => "Email"}>
					<Input value={login_emailInput} onChange={e => login_setEmailInput(e.currentTarget.value)} size={SIZE.compact} />
				</FormControl>
				<FormControl label={() => "Password "}>
					<Input value={login_passwordInput} onChange={e => login_setPasswordInput(e.currentTarget.value)} size={SIZE.compact} type="password" />
				</FormControl>
				<Button onClick={handleLogin} size={SIZE.compact} shape={SHAPE.pill}>
					Login
				</Button>
			</Block>
		</div>
	)
}

export default LoginPage
