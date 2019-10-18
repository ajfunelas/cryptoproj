import React from "react"
import Navbar from "react-bootstrap/Navbar"
import btclogo from "../components/img/btclogo.svg"

export default () => (
	<Navbar bg="dark" variant="dark">
		<Navbar.Brand href="#home">
			<img alt="" src={btclogo} width="30" height="30" className="d-inline-block align-top" />
			{" Crypto-AJ"}
		</Navbar.Brand>
	</Navbar>
)
