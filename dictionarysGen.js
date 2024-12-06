window.messages = {};

// Initialization function using Promises
window.initializeMessages = function (filePath) {
    return loadDictionary(filePath)
        .then(fullDict => {
            window.messages = extractMsgs(fullDict);
            console.log("Messages initialized:", window.messages);
        })
        .catch(error => {
            console.error("Error initializing messages:", error.message);
        });
};

// Dictionary loading function using Promises
function loadDictionary(filePath, delimiter = ':\\n') {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.statusText} | from ${filePath}`);
            }
            return response.text();
        })
        .then(text => {
            const lines = text.split('\\n\\n').map(line => line.trim()).filter(line => line);
            const dictionary = {};

            lines.forEach(line => {
                const [key, value] = line.split(delimiter).map(part => part.trim());
                if (key && value !== undefined) {
                    dictionary[key] = value.replaceAll("\\n", "<br/>");
                }
            });
			console.log("dictionary", dictionary)
			console.log("keys", Object.keys(dictionary))
            return dictionary;
        })
        .catch(error => {
            console.error("Error loading dictionary:", error.message);
            return {};
        });
}

// Extraction function for messages
function extractMsgs(dict) {
    return Object.entries(dict).filter(([key]) => key.startsWith('msg_')).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}