// Function to fetch and parse the dictionary data from the .txt file
async function loadDictionary(filePath, delimiter = ':') {
    try {
        // Fetch the file content
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.statusText}`);
        }

        // Read text content
        const text = await response.text();

        // Process text into a dictionary
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        const dictionary = {};
        lines.forEach(line => {
            const [key, value] = line.split(delimiter).map(part => part.trim());
            if (key && value !== undefined) {
                dictionary[key] = value;
            }
        });

        console.log('Loaded Dictionary:', dictionary);
        return dictionary;
    } catch (error) {
        console.error('Error loading dictionary:', error.message);
        return {};
    }
}

// Example usage
nodeMessages = loadDictionary('nodeMessages.txt');

