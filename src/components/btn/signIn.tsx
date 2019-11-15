import React from "react"
import { HeaderNavigation, ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import { Button, SHAPE, SIZE } from "baseui/button"
import { Link, Route } from "react-router-dom"
import { Block } from "baseui/block"

interface Props {}

const SignIn: React.FC<Props> = () => {
	return (
		<Block
			overrides={{
				Block: {
					style: {
						display: "flex",
						textDecoration: "none",
						color: "white",
					},
				},
			}}
		>
			<StyledNavigationItem>
				<Route>
					<Link to="/">
						<Button size={SIZE.compact} shape={SHAPE.pill}>
							Login
						</Button>
					</Link>
				</Route>
			</StyledNavigationItem>
			<StyledNavigationItem>
				<Link to="/register">
					<Button size={SIZE.compact} shape={SHAPE.pill}>
						Register
					</Button>
				</Link>
			</StyledNavigationItem>
		</Block>
	)
}

export default SignIn
