import React from "react"
import ReactDOM from "react-dom"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider, styled } from "baseui"
import LoginPage from "./components/pages/LoginPage"
import Dashboard from "./components/pages/Dashboard"
import Header from "./components/Header"
import * as serviceWorker from "./serviceWorker"
import "./index.css"
import App from "./App"

const engine = new Styletron()

ReactDOM.render(
	<StyletronProvider value={engine}>
		<BaseProvider theme={LightTheme}>
			<App />
		</BaseProvider>
	</StyletronProvider>,
	document.getElementById("root"),
)

serviceWorker.register()
