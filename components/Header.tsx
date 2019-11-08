import React from "react"
import { HeaderNavigation, ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import { StoreContainer } from "../unstated/userStore"
import SignIn from "./btn/signIn"
import SignOut from "./btn/signOut"
import "../App.css"

export default () => {
	const { onLine, setOnLine } = StoreContainer.useContainer()
	return (
		<HeaderNavigation>
			<StyledNavigationList $align={ALIGN.left}>
				<StyledNavigationItem>Crypto-AJ</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.center} />
			<StyledNavigationList $align={ALIGN.right}>
				<div>{onLine ? <SignOut /> : <SignIn />}</div>
			</StyledNavigationList>
		</HeaderNavigation>
	)
}
