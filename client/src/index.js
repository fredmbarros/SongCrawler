import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SearchProvider } from "./SearchContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppProvider } from "./AppContext";

ReactDOM.render(
	<Auth0Provider
		domain="fredmbarros.us.auth0.com"
		clientId="nfdpTV8old0asFEC6HyuDjpzomfNHaOn"
		cacheLocation="localstorage"
		redirectUri={window.location.origin}>
		<AppProvider>
			<SearchProvider>
				<App />
			</SearchProvider>
		</AppProvider>
	</Auth0Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
