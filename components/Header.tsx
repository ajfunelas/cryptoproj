import React from "react"
import { HeaderNavigation, ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import { Button, SHAPE, SIZE } from "baseui/button"
import { Link, Route } from "react-router-dom"

export default () => {
	return (
		<HeaderNavigation>
			<StyledNavigationList $align={ALIGN.left}>
				<StyledNavigationItem>Crypto-AJ</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.center} />
			<StyledNavigationList $align={ALIGN.right}>
				{/* isSignin?<SingedInBTNs/>:<SignedOutBTNs/>*/}
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
			</StyledNavigationList>
		</HeaderNavigation>
	)
}
