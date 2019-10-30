import React from "react"
import { Card, StyledBody, StyledAction } from "baseui/card"
import { Button } from "baseui/button"

export default () => (
	<Card overrides={{ Root: { style: { padding: "0px", margin: "30px" } } }} title="BTC-AUD">
		<StyledBody>Price:$1234567</StyledBody>
		<StyledBody>Bid:$654321</StyledBody>
		<StyledBody>Ask:$6543212</StyledBody>
		<StyledBody>0.06% 1hr</StyledBody>
		<StyledAction>
			<Button overrides={{ BaseButton: { style: { width: "30%" } } }}>View</Button>
		</StyledAction>
	</Card>
)
// overrides={{ Root: { style: { width: "328px" } } }}
