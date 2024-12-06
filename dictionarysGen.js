// Function to fetch and parse the dictionary data from the .txt file
async function loadDictionary(filePath, delimiter = ':\n') {
    try {
        // Fetch the file content
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.statusText} | from ${filePath}`);
        }

        // Read text content
        const text = await response.text();

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

// Function to extract messages from the dictionary
function extractMsgs(dict) {
    // Example implementation: Filter keys related to messages
    return Object.entries(dict).filter(([key]) => key.startsWith('msg_')).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}

// Function to extract classes from the dictionary
function extractClasss(dict) {
    // Example implementation: Filter keys related to classes
    return Object.entries(dict).filter(([key]) => key.startsWith('class_')).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}

// Function to extract images from the dictionary
function extractImgs(dict) {
    // Example implementation: Filter keys related to images
    return Object.entries(dict).filter(([key]) => key.startsWith('img_')).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}

// Usage example (ensure this runs in an async context, such as an async IIFE)
(async () => {
    const fullDict = await loadDictionary('/pgmr/nodeMessages.txt');
    const nodeMessages = fullDict;

    // Extract specific sections
    const messages = extractMsgs(nodeMessages);
    const classes = extractClasss(nodeMessages);
    const images = extractImgs(nodeMessages);

    console.log('Messages:', messages);
    console.log('Classes:', classes);
    console.log('Images:', images);
})();
