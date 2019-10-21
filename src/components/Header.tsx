import React from "react"
import { HeaderNavigation, ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import { Button, SHAPE, SIZE } from "baseui/button"

export default () => {
	return (
		<HeaderNavigation>
			<StyledNavigationList $align={ALIGN.left}>
				<StyledNavigationItem>Crypto-AJ</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.center} />
			<StyledNavigationList $align={ALIGN.right}>
				<StyledNavigationItem>
					<Button size={SIZE.compact} shape={SHAPE.pill}>
						Login
					</Button>
				</StyledNavigationItem>
				<StyledNavigationItem>
					<Button size={SIZE.compact} shape={SHAPE.pill}>
						Register
					</Button>
				</StyledNavigationItem>
			</StyledNavigationList>
		</HeaderNavigation>
	)
}
