import React from "react"
import { Input } from "baseui/input"

interface Props {}

const SearchBox: React.FC<Props> = () => {
	return (
		<div>
			{/* const [value, setValue] = React.useState("") return{" "}
			<Input value={value} onChange={e => setValue(e.currentTarget.value)} placeholder="Look for crypto..." /> */}
			<Input placeholder="Search..." />
		</div>
	)
}

export default SearchBox
