import React from "react"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { Button, SIZE, SHAPE } from "baseui/button"
import styled from "styled-components"
import Header from "../Header"
import { useStyletron } from "styletron-react"
import { Block } from "baseui/block"
import { Link, Redirect } from "react-router-dom"
import { StoreContainer } from "../../unstated/userStore"

interface Props {}

const RegisterPage: React.FC<Props> = () => {
	const {
		reg_username,
		reg_setUsername,
		reg_emailInput,
		reg_passwordInput,
		handleReg,
		reg_setEmailInput,
		reg_setPasswordInput,
		isRegistered,
	} = StoreContainer.useContainer()

	if (isRegistered) {
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
				<FormControl label={() => "Username"}>
					<Input value={reg_username} onChange={e => reg_setUsername(e.currentTarget.value)} size={SIZE.compact} />
				</FormControl>
				<FormControl label={() => "Email"}>
					<Input value={reg_emailInput} onChange={e => reg_setEmailInput(e.currentTarget.value)} size={SIZE.compact} />
				</FormControl>
				<FormControl label={() => "Password "}>
					<Input value={reg_passwordInput} onChange={e => reg_setPasswordInput(e.currentTarget.value)} size={SIZE.compact} type="password" />
				</FormControl>
				<Button onClick={handleReg} size={SIZE.compact} shape={SHAPE.pill}>
					Register
				</Button>
			</Block>
		</div>
	)
}

export default RegisterPage
