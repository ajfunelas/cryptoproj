import React from "react"
import { IFaves, coinInfo } from "../unstated/interfaces"
import { StoreContainer } from "../unstated/userStore"
import { Button, SIZE, KIND } from "baseui/button"
import { FaHeart, FaRegHeart } from "react-icons/fa"

interface PFave {
	favo: IFaves
}

function FvCard(props: PFave) {
	const { favo } = props
	const { setpopUp, getOneCoin, isFaved, isFavedCoin, tglFaves, initUser } = StoreContainer.useContainer()
	const [oldP, setOldP] = React.useState(props.favo.Price)

	return (
		<div className="coinInfo" key={props.favo.ID}>
			<Button
				size={SIZE.compact}
				kind={KIND.minimal}
				onClick={() => {
					initUser && tglFaves(initUser.Id, props.favo.ID)
				}}
			>
				{isFaved(props.favo) ? <FaHeart color="#ff5b4d" size={30} /> : <FaRegHeart color="#b5a19f" size={30} />}
			</Button>
			<h1 className="card-title">{props.favo.ID}</h1>
			<p className={`card-info text-md ${oldP == props.favo.ID ? "red" : "green"}`}>Price: {props.favo.Price}</p>
			<p className="card-info text-md">Bid: {props.favo.Bid}</p>
			<p className="card-info text-md">Ask: {props.favo.Ask}</p>

			<Button
				onClick={() => {
					setpopUp(true)
					getOneCoin(props.favo.ID)
				}}
				size={SIZE.compact}
			>
				View More
			</Button>
		</div>
	)
}

export default FvCard
