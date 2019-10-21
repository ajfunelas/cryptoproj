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
// const Centered = styled("div", {
// 	display: "flex",
// 	justifyContent: "center",
// 	alignItems: "center",
// 	height: "100%",
// })

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
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>
				<Header /> {/* Navbar */}
			</BaseProvider>
		</StyletronProvider>
	)
}

export default Dashboard

// {/* <Grid container direction="row" className={classes.root} spacing={2}>
// <Grid container justify="flex-start" item xs={8}>
// 	{" "}
// 	{/* Cards Grid */}
// 	<div style={{ paddingTop: 20 }} className={classes.root}>
// 		{" "}
// 		{/* First Row */}
// 		<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
// 			<Grid item xs={6}>
// 				<Search />
// 			</Grid>
// 		</Grid>
// 	</div>
// 	<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
// 		{" "}
// 		{/* Second Row */}
// 		<Grid item xs>
// 			<Card />
// 		</Grid>
// 		<Grid item xs>
// 			<Card />
// 		</Grid>
// 		<Grid item xs>
// 			<Card />
// 		</Grid>
// 	</Grid>
// 	<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
// 		{" "}
// 		{/* Third Row */}
// 		<Grid item xs>
// 			<Card />
// 		</Grid>
// 		<Grid item xs>
// 			<Card />
// 		</Grid>
// 		<Grid item xs>
// 			<Card />
// 		</Grid>
// 	</Grid>
// </Grid>
// <Grid container justify="center" item xs={4}>
// 	<Card />
// </Grid>
// </Grid> */}
