import React from "react"
//Pages
import Header from "../Header"
import Search from "../SearchBox"
import Card from "../Card"
import Fave from "./Fave"
//Baseweb Imports
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider, styled } from "baseui"
//Material-UI Imports
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

const engine = new Styletron()

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
	}),
)

const Dashboard: React.FC = () => {
	const classes = useStyles()
	return (
		<div>
			<Search />
			<Card />
		</div>
	)
}

export default Dashboard
