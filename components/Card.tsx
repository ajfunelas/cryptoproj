import React from "react"
import { Button, SIZE, KIND } from "baseui/button"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { coinInfo } from "../unstated/interfaces"
import { StoreContainer } from "../unstated/userStore"
import "../App.css"

interface Props {
	coin: coinInfo
}

function CoinCard(props: Props) {
	const { getOneCoin, setpopUp, initUser, tglFaves, isFavedCoin } = StoreContainer.useContainer()

	return (
		<React.Fragment>
			<div className="coinInfo" key={props.coin.id}>
				<Button
					size={SIZE.compact}
					kind={KIND.minimal}
					onClick={() => {
						initUser && tglFaves(initUser.Id, props.coin.id)
					}}
				>
					{isFavedCoin(props.coin) ? <FaHeart color="#red" size={30} /> : <FaRegHeart color="#b5a19f" size={30} />}
					{/* <FaHeart color="#727272" size={30} /> */}
				</Button>
				<h1 className="card-title">{props.coin.display_name}</h1>
				{/* <p className="card-info text-md">{props.coin.display_name}</p> */}
				<Button
					onClick={() => {
						setpopUp(true)
						getOneCoin(props.coin.id)
					}}
					size={SIZE.compact}
				>
					View More
				</Button>
			</div>
		</React.Fragment>
	)
}
export default CoinCard
