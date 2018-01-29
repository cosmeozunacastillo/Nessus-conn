let fs    = require('fs'),
	url   = require('url'),
	util  = require('util'),
	zlib  = require('zlib'),
	http  = require('http'),
	https = require('https');

let PROXY_LIST      = false,
	PROXY_FILE_PATH = false;

let REQUEST_TIMEOUT   = false,
	REDIRECTS_MAXIMUM = 5;

const _SELF = this;

const search_agents = [
	'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
	'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
	'Googlebot/2.1 (+http://www.google.com/bot.html)',
	'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
	'Mozilla/5.0 (compatible; bingbot/2.0 +http://www.bing.com/bingbot.htm)',
	'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)',
	'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
	'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)'
]

const mobile_agents = [
	'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/47.0.2526.70 Mobile/13C71 Safari/601.1.46',
	'Mozilla/5.0 (Linux; U; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
	'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)'
]

const desktop_agents = [
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14'
]

function doRequest (options = {}, data = false, dest = false, REDIRECTS_FOLLOWED = 0) {
	const lib = options.url.startsWith('https') ? https : http
  //console.log('ENTRA AL DOREQUEST');
	if ('headers' in options == false) {
		options.headers = {}
	}

	if ('content-type' in options.headers == false) {
		options.headers['content-type'] = 'application/x-www-form-urlencoded';
	}

	if (data) {
    console.log('QUE TRAE EL DOREQUEST -> DATA if ' + data + ' METHOD: '+ options.method );
		options.method  = 'POST'

		if (typeof data != 'string') {
			throw new Error('TypeError: POST data should be string.')
		}

		if ('content-length' in options.headers == false) {
			options.headers['content-length'] = Buffer.byteLength(data)
		}
	}

	if ('proxy' in options) {
		let proxy = options.proxy

		options.host = proxy.host
		options.port = proxy.port
		options.path = options.url
    //console.log('viendo como queda la url: '+ options.host + ' ' + options.port +' ' + options.path);
	} else {
    //console.log('viendo como queda la url despues del ELSE: '+ options.host + ' ' + options.port +' ' + options.path);
		let parsed_url = url.parse(options.url)

		options.host = parsed_url.host
		options.path = parsed_url.path
    //options.port = 8834;
    //options.strictSSL = false;
    options.rejectUnauthorized = false;
    console.log('viendo como queda la url despues del ELSE 2 --- '+ options.host + ' ' + options.port +' ' + options.path + ' '+ options.rejectUnauthorized);
	}

	if (REQUEST_TIMEOUT) {
		options.timeout = REQUEST_TIMEOUT
	}

	return new Promise(function(resolve, reject) {
		let request = lib.request(options, function(response) {
			if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
				if (REDIRECTS_FOLLOWED >= REDIRECTS_MAXIMUM) {
					reject(new Error('Exceeded maximum redirects. Probably stuck in a redirect loop ' +  response.headers.location))

					return false
				}

				let redirect = response.headers.location

				if (url.parse(redirect).hostname == false) {
					let parsed_url = url.parse(options.url)
          //console.log('Como entra la url'+option.url)

					redirect = url.resolve(parsed_url.host, response.headers.location)
          //console.log('como sale' + parsed_url.host + ' '+ response.headers.location);
				}
        //console.log('promise seguimiento 1'+ options.url);
				options.url = redirect

				REDIRECTS_FOLLOWED++

				console.log('#%d Redirect To: %s', REDIRECTS_FOLLOWED,  response.headers.location)

				if ('set-cookie' in response.headers) {
					options.headers.Cookie = response.headers['set-cookie'].join(';')
				}

				doRequest(options, data, dest, REDIRECTS_FOLLOWED).then(function(result) {
					resolve(result)
				}).catch(function(err) {
					reject(err)
				})
			} else {
				let body = [];
        //console.log('este es el PROMISE -> DEST '+ dest);
				if (dest) {
					response.pipe(dest)
				} else {
          console.log('Viendo como es el response : '  + response.statusCode + ' '+ response.statusMessage);
					response.on('data', function(chunk) {
						body.push(chunk)
					});
				}

				response.on('end', function() {
					if (dest) {
						dest.end()
					}

					let result = {
						headers: response.headers,
						rawHeaders: response.rawHeaders,
						statusCode: response.statusCode,
						statusMessage: response.statusMessage,
					}

					let encoding = 'content-encoding' in response.headers ? response.headers['content-encoding'] : false;

					if (options.tryToDecode && encoding) {
						let buffer = Buffer.concat(body);

						if (encoding == 'gzip') {
							zlib.gunzip(buffer, function(err, decoded) {
								if (err) {
									return reject(err)
								}

								result.body = decoded.toString();

								resolve(result)
							});
						} else if (encoding == 'deflate') {
							zlib.inflate(buffer, function(err, decoded) {
								if (err) {
									return reject(err)
								}

								result.body = decoded.toString();

								resolve(result)
							})
						} else {
							reject(new Error('Cant decode response'))
						}
					} else {
						result.body = body.join('')

						resolve(result)
					}
				})
			}
		})

		if (REQUEST_TIMEOUT) {
			request.setTimeout(REQUEST_TIMEOUT, function() {
				request.abort()

				reject(new Error('Timeout'))
			})
		}

		request.on('error', function(err) {
			reject(err)
		})

		if (data) {
			request.write(data)
		}

		request.end()
	})
}

function parseOptions(options, url = false) {
  //console.log('Parseoption 1er log '+Object.prototype.toString.call(options));
	if (Object.prototype.toString.call(options) != '[object Object]') {
		options = {}
	}

	if ('tryToDecode' in options == false) {
		options.tryToDecode = true;
	}

	if ('proxy' in options) {
		if (options.proxy === false) {
			delete options.proxy
		} else {
			let {'0': host, '1': port} = options.proxy.split(':')

			options.proxy = {host, port}
      //console.log('Entra al if del proxy en el parseOptions'+ options.proxy);
		}
	} else {
		if (PROXY_LIST && PROXY_LIST.length > 0) {
			options.proxy = _SELF.getProxy()
		}
	}

	if ('headers' in options == false) {
		options.headers = {}
	} else {
		options.headers = Object.keys(options.headers).reduce(function(container, key) {
			container[key.toLowerCase()] = options.headers[key];

			return container;
		}, {});
	}

	if ('user-agent' in options.headers) {
		if (options.headers['user-agent'] == false) {
			delete options.headers['user-agent']
		} else {
			let ua_val = options.headers['user-agent'],
				ua_key = 0;

			if (Object.prototype.toString.call(ua_val) == '[object Object]') {
				ua_val = Object.keys(ua_val).shift()
				ua_key = options.headers['user-agent'][ua_val]

				let ua_index = ['desktop', 'mobile', 'search'].indexOf(ua_val)

				if (ua_index !== -1) {
					if (ua_index == 0) {
						options.headers['user-agent'] = desktop_agents[ua_key]
					} else if (ua_index == 1) {
						options.headers['user-agent'] = mobile_agents[ua_key]
					} else if (ua_index == 2) {
						options.headers['user-agent'] = search_agents[ua_key]
					}

					if (options.headers['user-agent'] == undefined) {
						throw new Error('Cant find specified User Agent group index')
					}
				} else {
					throw new Error('Cant find specified User Agent group')
				}
			}
		}
	} else {
		options.headers['user-agent'] = desktop_agents[0]
	}

	if (url) {
		options.url = url
    //console.log('If de la url '+ options.url);
	}

	return options
}

module.exports.get = function(url, options = {}) {
	var options = JSON.parse(JSON.stringify(options));
		options = parseOptions(options, url);
	return doRequest(options)
}

module.exports.post = function(url, data, options = {}) {
	var options = JSON.parse(JSON.stringify(options));
  console.log('como esta el json de options: ' + options + ' URL:  '+url);
		options = parseOptions(options, url)
    console.log('como sale el json de options: ' + options + ' URL: '+url);
	return doRequest(options, data)
}

module.exports.download = function(url, dest, options = {}) {
	var options = JSON.parse(JSON.stringify(options));
		options = parseOptions(options, url)

	dest = fs.createWriteStream(dest)

	return doRequest(options, false, dest)
}

module.exports.useProxy = function(file_path = false) {
	PROXY_FILE_PATH = file_path ? file_path : []

	try {
		fs.accessSync(file_path)

		PROXY_LIST = fs.readFileSync(PROXY_FILE_PATH).toString().split('\n')
		PROXY_LIST = PROXY_LIST.filter(v => v != '')
	} catch (error) {
		throw new Error('Unable to load the proxy')
	}
}

module.exports.getProxy = function() {
	if (PROXY_LIST) {
		if (PROXY_LIST.length == 0) {
			_SELF.useProxy()

			throw new Error('Ran out of proxy')
		}

		let proxy = PROXY_LIST.shift()

		let {'0': host, '1': port} = proxy.split(':')

		return {host, port}
	}

	return false
}

module.exports.setTimeout = function(timeout) {
	REQUEST_TIMEOUT = timeout
}

module.exports.setMaximumRedirects = function(redirects) {
	REDIRECTS_MAXIMUM = redirects
}