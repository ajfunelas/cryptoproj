import React from "react"
import Card from "./Card"
import { useStyletron, styled } from "baseui"
import { Search } from "baseui/icon"
import { Input } from "baseui/input"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { BlockProps } from "baseui/block"

interface Props {}

const SearchBox: React.FC<Props> = () => {
	return (
		<div>
			{/* const [value, setValue] = React.useState("") return{" "}
			<Input value={value} onChange={e => setValue(e.currentTarget.value)} placeholder="Look for crypto..." /> */}
		</div>
	)
}

export default SearchBox
