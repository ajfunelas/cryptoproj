import React from "react"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { Button, SIZE } from "baseui/button"
import styled from "styled-components"
import Header from "../Header"
import { useStyletron } from "styletron-react"
import { Block } from "baseui/block"

interface Props {}

const LoginPage: React.FC<Props> = () => {
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
					<Input size={SIZE.compact} />
				</FormControl>
				<FormControl label={() => "Password "}>
					<Input size={SIZE.compact} type="password" />
				</FormControl>
				<Button size={SIZE.compact}>Login</Button>
			</Block>
		</div>
	)
}

export default LoginPage
