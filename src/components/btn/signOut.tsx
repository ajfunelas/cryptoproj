import React from "react"
import { StyledNavigationItem } from "baseui/header-navigation"
import { Button, SHAPE, SIZE } from "baseui/button"
import { Link, Route } from "react-router-dom"
import { StoreContainer } from "../../unstated/userStore"
import { Drawer, ANCHOR } from "baseui/drawer"
import { Block } from "baseui/block"
import FvCard from "../FvCard"

interface Props {}

const SignOut: React.FC<Props> = () => {
	const { handleRestart, userFaves, setUserFaves } = StoreContainer.useContainer()
	const [isOpen, setIsOpen] = React.useState(false)
	return (
		<div>
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
							<Button onClick={handleRestart} size={SIZE.compact} shape={SHAPE.pill}>
								Logout
							</Button>
						</Link>
					</Route>
				</StyledNavigationItem>
				<StyledNavigationItem>
					<Button onClick={() => setIsOpen(!isOpen)} size={SIZE.compact} shape={SHAPE.pill}>
						Favourites
					</Button>
				</StyledNavigationItem>
				<Drawer isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)} anchor={ANCHOR.bottom}>
					<div style={{ height: "6rem" }}></div>
					<h2 className="fvTitle">Favourites</h2>
					<div className="fvflex">
						{userFaves ? (
							userFaves.length > 0 ? (
								userFaves.map(Fave => {
									return <FvCard key={Fave.TickerId} favo={Fave} />
								})
							) : (
								<p>No Favourites Listed</p>
							)
						) : (
							<img src={require("../../ripple.gif")} alt="loading..." />
						)}
					</div>
				</Drawer>
			</Block>
		</div>
	)
}

export default SignOut
