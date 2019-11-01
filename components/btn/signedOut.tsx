import React from "react"
import { HeaderNavigation, ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import { Button, SHAPE, SIZE } from "baseui/button"
import { Link, Route } from "react-router-dom"

interface Props {}

const signedOut: React.FC<Props> = () => {
	return (
		<div>
			<StyledNavigationItem>
				<Route>
					<Link to="/">
						<Button size={SIZE.compact} shape={SHAPE.pill}>
							Logout
						</Button>
					</Link>
				</Route>
			</StyledNavigationItem>
		</div>
	)
}

export default signedOut
