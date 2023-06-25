export const createObject = (keys, values) => {
	if (keys.length === values.length) {
		return keys.reduce((obj, key, index) => {
			obj[key] = values[index];
			return obj;
		}, {});
	}
}