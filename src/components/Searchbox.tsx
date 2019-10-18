import React from "react"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import magnify from "../components/img/magnify.svg"

export default () => (
	<InputGroup className="mb-3">
		<FormControl placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" />
		<InputGroup.Append>
			<Button variant="outline-secondary">
				<img src={magnify} alt="magnify" />
			</Button>
		</InputGroup.Append>
	</InputGroup>
)
