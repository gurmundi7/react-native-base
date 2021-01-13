import { postRequest, getRequest, application_json } from "./apiClient";

//-- STAGING & LIVE SERVER URLS
export const serverUrl_dev = '';
export const serverUrl_live = '';

//-- CURRENT API URL. SWITCH THIS TO TOGGALE BETWEEN STAGGING & LIVE
export const apiUrl = serverUrl_live; 

//-- DEFAULT HEADER
const standardHeader = { 
	'Content-Type': application_json
 };

//-- ADD ENDPOINT TO API URL.
const urlWithEndPoint = (api) => apiUrl + api;

//-- GENERATE TOKEN. THESE ARE JUST HELPER METHODS. CHANGE ACCORDING TO YOUR NEED. 
const appToken = (token) => {
	let finalToken = "Bearer " + token
	return finalToken;
}

//--- API INTEGRATIONS
export const login = (params) => {
	let url = urlWithEndPoint('/api/nurse/login');
	return postRequest(url, {...standardHeader, 'Content-Type': 'application/json'}, { ...params });
};

export const logout = (params) => {
	let url = urlWithEndPoint('/api/nurse/logout');
	return getRequest(url, standardHeader, { ...params });
};