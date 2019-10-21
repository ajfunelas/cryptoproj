import React from "react"
import { Route } from "react-router-dom"
import LoginPage from "./components/pages/LoginPage"
import RegisterPage from "./components/pages/RegisterPage"
import "./App.css"

const App: React.FC = () => {
	return (
		<div className="App">
			<Route path="/login" exact component={LoginPage} />
			<Route path="/register" exact component={RegisterPage} />
		</div>
	)
}

export default App
