import React from "react"
import { IFaves } from "../unstated/interfaces"
import { StoreContainer } from "../unstated/userStore"
import { Button, SIZE, KIND } from "baseui/button"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import "../App.css"

interface PFave {
	favo: IFaves
}

function FvCard(props: PFave) {
	const { favo } = props
	const { setpopUp, getOneCoin, isFaved, tglFaves, initUser } = StoreContainer.useContainer()
	const [oldP, setOldP] = React.useState(favo.Price)
	console.log(props)
	return (
		<div className="coinInfo" key={favo.Price}>
			<div className="fvcardInfo">
				<Button
					size={SIZE.compact}
					kind={KIND.minimal}
					onClick={() => {
						initUser && tglFaves(initUser.Id, favo.TickerId)
					}}
				>
					{isFaved(favo) ? <FaHeart color="#ff5b4d" size={30} /> : <FaRegHeart color="#b5a19f" size={30} />}
				</Button>
				<h2 className="card-info text-md">Name: {favo.TickerId}</h2>
				<p className={`card-info text-md ${oldP == favo.TickerId ? "red" : "green"}`}>Price: {favo.Price}</p>
				<p className="card-info text-md">Bid: {favo.Bid}</p>
				<p className="card-info text-md">Ask: {favo.Ask}</p>{" "}
				<Button
					onClick={() => {
						setpopUp(true)
						getOneCoin(favo.TickerId)
					}}
					size={SIZE.compact}
				>
					View More
				</Button>
			</div>
		</div>
	)
}

export default FvCard
