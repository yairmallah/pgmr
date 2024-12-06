// Function to fetch and parse the dictionary data from the .txt file
async function loadDictionary(filePath, delimiter = ':\n') {
    try {
        // Fetch the file content
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.statusText}`);
        }

        // Read text content
        const text = await response.text();

        // Process text into a dictionary
        const lines = text.split('\n\n').map(line => line.trim()).filter(line => line);
        const dictionary = {};
		lines.forEach(line => {
			const [key, value] = line.split(delimiter).map(part => part.trim());
			if (key && value !== undefined) {
				// Explicitly define enumerable keys
				Object.defineProperty(dictionary, key, {
					value: value,
					enumerable: true, // Ensure the key is enumerable
					configurable: true,
					writable: true
				});
			}
		});

        console.log('Loaded Dictionary:', dictionary);
        return dictionary;
    } catch (error) {
        console.error('Error loading dictionary:', error.message);
        return {};
    }
}





function reformat(dict){
	for (const key in dict) {
		dict[key] = dict[key].replace("\n", "<br/>");
	}
	return dict
}

let nodeFull = loadDictionary('nodeMessages.txt');
console.log('nodeFull:', JSON.stringify(nodeFull));
console.log('nodeFull0:', nodeFull);
const nodeMessages = reformat(nodeFull);
console.log('nodeMessages:', JSON.stringify(nodeMessages));
console.log('nodeMessages0:', nodeMessages);
console.log("keys: ", Object.keys(nodeMessages));
for (const key in nodeMessages) {
	nodeMessages[key] = console.log(key, nodeMessages[key]);
}