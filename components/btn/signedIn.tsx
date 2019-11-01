import React from "react"
import { HeaderNavigation, ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import { Button, SHAPE, SIZE } from "baseui/button"
import { Link, Route } from "react-router-dom"

interface Props {}

const signedIn: React.FC<Props> = () => {
	return (
		<div>
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
		</div>
	)
}

export default signedIn
