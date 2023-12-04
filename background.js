var headerModifier = {
	urls: ["*://*.bing.com/*"],
	types: [
		"main_frame",
		"sub_frame",
		"stylesheet",
		"script",
		"image",
		"font",
		"object",
		"xmlhttprequest",
		"ping",
		"csp_report",
		"media",
		"websocket",
		"other",
	],
	async blockingHandler(details) {
		var requestHeaders = details.requestHeaders;
		requestHeaders.push({
			name: "preferanonymous",
			value: "1",
		});
		return { requestHeaders: requestHeaders };
	},
};

browser.webRequest.onBeforeSendHeaders.addListener(
	headerModifier.blockingHandler,
	{ urls: headerModifier.urls, types: headerModifier.types },
	["blocking", "requestHeaders"]
);
