window.messages = {};
window.classes = {};
window.images = {};

// Initialization function using Promises
window.initializeAllDicts = function () {
    return loadDictionary('/pgmr/nodeMessages.txt')
        .then(fullDict => {
            window.messages = extractMsgs(fullDict);
			console.log("Messages initialized:", window.messages);
			window.classes = extractClss(fullDict);
			console.log("classes initialized:", window.classes);
			window.images = extractImgs(fullDict);
			console.log("images initialized:", window.images);
        })
        .catch(error => {
            console.error("Error initializing messages:", error.message);
        });
};

// Dictionary loading function using Promises
function loadDictionary(filePath, delimiter = ':\n') {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.statusText} | from ${filePath}`);
            }
            return response.text();
        })
        .then(text => {
            const lines = text.split('\n\n').map(line => line.trim()).filter(line => line);
            const dictionary = {};
            lines.forEach(line => {
                const [key, value] = line.split(delimiter).map(part => part.trim());
                if (key && value !== undefined) {
                    dictionary[key] = value.split("\n###");
                }
            });
			console.log("keys: ", Object.keys(dictionary))
            return dictionary;
        })
        .catch(error => {
            console.error("Error loading dictionary:", error.message);
            return {};
        });
}

// Extraction function for messages
function extractMsgs(dict) {
    let msgdict = {}
	for (let key in dict){
		try {
			msgdict[key] = dict[key][0].replaceAll("\n", "<br/>");
		} catch (error) {
			msgdict[key] = "";
		}
	}
	return msgdict;
}
// Extraction function for classes
function extractClss(dict) {
    let clsdict = {}
	for (let key in dict){
		try {
			clsdict[key] = dict[key][1];
		} catch (error) {
			clsdict[key] = "";
		}
	}
	return clsdict;
}
// Extraction function for images
function extractImgs(dict) {
    let imgdict = {}
	for (let key in dict){
		try {
			let midval = dict[key][2].split("&&");
			var finval = [];
			for (let val in midval){
				try{
					finval.push(midval[val].split("&"));
				} catch (error){
					console.log("erorr during img dictionary load for ", key, ". error=", error.toString());
					break;
				}
			}
			imgdict[key] = finval;
		} catch (error) {
			imgdict[key] = [];
			console.log("erorr during img dictionary load for ", key, ". error=", error.toString());
		}
	}
	return imgdict;
}