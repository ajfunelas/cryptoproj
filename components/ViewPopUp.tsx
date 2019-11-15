import React from "react"
import { StoreContainer } from "../unstated/userStore"
import { Modal, SIZE, ROLE, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal"

interface Props {}

function ViewPopUp(props: Props) {
	const { getData, setGetData, popUp, setpopUp } = StoreContainer.useContainer()
	return (
		<Modal
			onClose={() => {
				setpopUp(false)
				setGetData(undefined)
			}}
			closeable
			isOpen={popUp}
			size={SIZE.default}
			role={ROLE.dialog}
		>
			<ModalHeader>Pair Info</ModalHeader>
			<ModalBody>
				{getData ? (
					<div>
						<h1>{getData.ID}</h1>
						<ul>
							<li>Name: {getData.ID}</li>
							<li>Ask: {getData.Ask}</li>
							<li>Price: {getData.Price}</li>
							<li>Bid: {getData.Bid}</li>
							<li>Volume: {getData.Volume}</li>
						</ul>
					</div>
				) : (
					<div style={{ marginTop: "66px" }}>
						<img src={require("../ripple.gif")} alt="loading..." />
					</div>
				)}
			</ModalBody>
			<ModalFooter>
				<ModalButton
					onClick={() => {
						setpopUp(false)
						setGetData(undefined)
					}}
				>
					Close
				</ModalButton>
			</ModalFooter>
		</Modal>
	)
}

export default ViewPopUp
