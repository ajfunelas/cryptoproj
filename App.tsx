import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginPage from "./components/pages/LoginPage"
import RegisterPage from "./components/pages/RegisterPage"
import Header from "./components/Header"
import Dashboard from "./components/pages/Dashboard"
import "./index.css"
// import bg from "../src/bg2.svg"

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={LoginPage} />
					<Route path="/register" exact component={RegisterPage} />
					<Route path="/dashboard" exact component={Dashboard} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
