import React from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import Dashboard from "./components/pages/Dashboard"

const App: React.FC = () => {
	return (
		<div className="App">
			<Navbar />
			<Dashboard />
		</div>
	)
}

export default App
