import { baseUrl } from "@/settings.js";

export const createObject = (keys, values) => {
	if (keys.length === values.length) {
		return keys.reduce((obj, key, index) => {
			obj[key] = values[index];
			return obj;
		}, {});
	}
}

export const fetchApi = async (url, body) => {
	return new Promise((resolve) => {
		fetch(`${baseUrl}${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)})
			.then(response => response.json().then(json => resolve({ data: json, status: response.status })));
	});
};
