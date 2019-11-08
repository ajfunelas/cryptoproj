export interface loginUser {
	Id: string
	isLoggedIn: boolean
	username: string
	email: string
	password: string
}
export interface regisUser {
	Id: string
	isRegistered: boolean
	username: string
	email: string
	password: string
}

export interface coinInfo {
	id: string
	base_currency: string
	quote_currency: string
	base_min_size: string
	base_max_size: string
	quote_increment: string
	base_increment: string
	display_name: string
	min_market_funds: string
	max_market_funds: string
	margin_enabled: boolean
	post_only: boolean
	limit_only: boolean
	cancel_only: boolean
	status: string
	status_message: string
}

export interface coinData {
	ID: string
	Price: string
	Time: string
	Bid: string
	Ask: string
	Volume: string
}

export interface IFaves {
	ID: string
	Price: string
	Time: string
	Bid: string
	Ask: string
	Volume: string
	Size: string
}
