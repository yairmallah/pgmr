// Function to fetch and parse the dictionary data from the .txt file
function loadDictionary(filePath, delimiter = ':\n') {
    try {
        // Fetch the file content
        const response = fetch(filePath);
		console.log(response);
        //if (!response.ok) {
        //    throw new Error(`Failed to load file: ${response.statusText} | from ${filePath}`);
        //}

        // Read text content
        const text = response.text();

        // Process text into a dictionary
        const lines = text.split('\n\n').map(line => line.trim()).filter(line => line);
        const dictionary = {};
		lines.forEach(line => {
			const [key, value] = line.split(delimiter).map(part => part.trim());
			if (key && value !== undefined) {
				dictionary[key] = value.replaceAll("\n", "<br/>");
			}
		});

        console.log('Loaded Dictionary:', dictionary);
		console.log('Loaded keys:', Object.keys(dictionary));
        return dictionary;
    } catch (error) {
        console.error('Error loading dictionary:', error.message);
        return {};
    }
}

function extractMsgs(dict){
}
function extractClasss(dict){
}
function extractImgs(dict){
}

let fullDict = loadDictionary('/pgmr/nodeMessages.txt');
const nodeMessages = fullDict;

