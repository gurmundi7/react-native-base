//----

export const application_x_www_form_urlencoded = 'application/x-www-form-urlencoded';
export const application_json = 'application/json';
export const multipart_form_data = 'multipart/form-data;';

//---

export const request = (method, url, headers, {dontThrowError=false,...params}, callback) => {
	let options = {
		method: method,
		timeout: 8 * 1000
	};

	let body = '';


	if (headers['Content-Type'] == application_x_www_form_urlencoded || method === 'GET' || method === 'DELETE') {
		Object.keys(params).forEach(function (key) {
			if (body.length > 0) {
				body = body + '&';
			}

			let value = params[key];
			body = body + key + '=' + value;
		});
	} else {
		body = JSON.stringify(params);
	}

	options.headers = headers;


	if (method !== 'GET' && method !== 'DELETE') {
		options.body = body;
	} else if (body.length > 0) {
		url = url + '?' + body;
	}

	if (!callback) {
		// console.log('PROMISE');
		return fetch(url, options)
			.then(async (response) => {
				// console.log('//----------', response.status);
				// console.log(url);
				// console.log(options);
				let data = await response.json()
				return {status:response.status,data };
			})
			.then((res) => {
				console.log(url + ' : ',JSON.stringify(res.status))
				let _data = res.data;
				// console.log('----------//');

				if (res.status !== 200) {
					throw _data.data || `Api Error Status : ${res.status}`;
				} else {
					return _data;
				}

				// if (typeof _data.data === 'string' && !dontThrowError) {
					
				// 	throw _data.data;
				// } else {
				// 	return _data;
				// }
			});
	}

	fetch(url, options)
		.then((response) => {
			// console.log(response);
			// console.log('//----1----//');
			return response.json();
		})
		.then((responseJson) => {
			// console.log('//----------');
			// console.log(url);
			// console.log(options);
			// console.log(responseJson);
			// console.log('----------//');
			callback(null, responseJson);
		})
		.catch((error) => {
			// console.log('//----------');
			// console.log(url);
			// console.log(options);
			// console.log(error);
			// console.log('----------//');
			callback(error, null);
		});
};

export const postRequestWithImage = (url, headers, params, imagePath, callback) => {
	var data = new FormData();
	if (imagePath) {
		//alert('imaged added')
		data.append('image', {
			uri: imagePath,
			name: 'image.jpg',
			type: 'image/jpg'
		});
	}

	Object.keys(params).forEach(function (key) {
		let value = params[key];
		data.append(key, value);
	});

	// Create the config object for the POST You typically have an OAuth2 token that
	// you use for authentication
	headers['Accept'] = application_json;
	headers['Content-Type'] = multipart_form_data;

	const config = {
		method: 'POST',
		headers: headers,
		body: data
	};

	fetch(url, config)
		.then((response) => response.json())
		.then((responseJson) => {
			callback(null, responseJson);
		})
		.catch((err) => {
			callback(err, null);
		});
};

export const uploadFile = (url, params, file, callback) => {
	var data = new FormData();

	let keyname = '';
	let filename = '';
	let type = '';
	let uri = file.uri;

	if (file.type == 'image') {
		keyname = 'image';
		filename = 'image.jpg';
		type = 'image/jpg';
	} else if (file.type == 'video') {
		keyname = 'video';
		filename = 'video.mp4';
		type = 'video/quicktime';
	} else if (file.type == 'audio') {
		keyname = 'audio';
		filename = 'audio.aac';
		type = 'audio/aac';
		uri = 'file://' + uri;
	} else if (file.type == 'file') {
		keyname = 'file';
		filename = file.name;
		type = 'multipart/form-data';
	}

	if (file) {
		data.append(keyname, {
			uri: uri,
			name: filename,
			type: type
		});
	}

	//alert(JSON.stringify(data))

	Object.keys(params).forEach(function (key) {
		let value = params[key];
		data.append(key, value);
	});

	// Create the config object for the POST You typically have an OAuth2 token that
	// you use for authentication
	const config = {
		method: 'POST',
		headers: {
			Accept: application_json,
			'Content-Type': multipart_form_data
		},
		body: data
	};

	fetch(url, config)
		.then((response) => response.json())
		.then((responseJson) => {
			callback(responseJson, null);
		})
		.catch((err) => {
			callback(null, err);
		});
};

/**
 * METHODS 
 */

export const getRequest = (url, headers, params) => {
	return request('GET', url, headers, params);
};

export const postRequest = (url, headers, params) => {
	return request('POST', url, headers, params);
};

export const putRequest = (url, headers, params) => {
	return request('PUT', url, headers, params);
};

export const deleteRequest = (url, headers, params) => {
	return request('DELETE', url, headers, params);
};
