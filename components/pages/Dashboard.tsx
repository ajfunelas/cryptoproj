import React, { useState } from "react"
//Pages
import Header from "../Header"
import Search from "../SearchBox"
import CoinCard from "../Card"
import Fave from "./Fave"
//Baseweb Imports
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider, styled } from "baseui"
//Material-UI Imports
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { coinInfo } from "../../unstated/interfaces"
import { StoreContainer } from "../../unstated/userStore"
import { Input, SIZE } from "baseui/input"
import { Button } from "baseui/button"
import ripple from "../../ripple.gif"
import ViewPopUp from "../ViewPopUp"

function Dashboard() {
	const { dash_searchInput, dash_setSearchInput, getReqProducts, reqProducts, useFetchProducts, setReqProducts } = StoreContainer.useContainer()

	let [searchQuery, setSearchQuery] = useState("")
	// get products from api
	const products: coinInfo[] = useFetchProducts(`https://api.pro.coinbase.com/products`).resp

	const displayReqProducts = () => {
		if (reqProducts != null) {
			if (reqProducts.length > 0) {
				return reqProducts.map((product: coinInfo) => <CoinCard key={product.id} coin={product} />)
			} else {
				return <h3>Nothing to Show for "{searchQuery}"</h3>
			}
		} else {
			setReqProducts(products)
			return <img src={require("../../ripple.gif")} alt="loading..." />
		}
	}
	return (
		<div className="Dash">
			<div className="top">
				<h1 className="header-lg">Products</h1>
				{reqProducts && searchQuery != "" && reqProducts.length > 0 ? (
					<h2>
						{reqProducts.length} results for "{searchQuery}"
					</h2>
				) : (
					""
				)}
				<form action="">
					<Input value={dash_searchInput} onChange={e => dash_setSearchInput(e.currentTarget.value)} placeholder="Search.." />
					<Button
						onClick={evt => {
							getReqProducts(evt)
							setSearchQuery(dash_searchInput)
						}}
						size={SIZE.compact}
					>
						Search
					</Button>
				</form>
			</div>
			<div className="bottom">
				<div className="productsGrid">{displayReqProducts()}</div>
			</div>
			<ViewPopUp />
		</div>
	)
}
export default Dashboard
