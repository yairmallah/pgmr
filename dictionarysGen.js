function readTxtToDictionary(file, delimiter = ':') {
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;

        // Split the content into lines
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);

        // Convert each line into a key-value pair
        const dictionary = {};
        lines.forEach(line => {
            const [key, value] = line.split(delimiter).map(part => part.trim());
            if (key && value !== undefined) {
                dictionary[key] = value;
            }
        });

        // Display the dictionary
        document.getElementById('output').textContent = JSON.stringify(dictionary, null, 2);
    };

    // Handle file reading errors
    reader.onerror = function () {
        console.error('Error reading file:', reader.error);
    };

    // Read the file as text
	try{
    return reader.readAsText(file);
	}
	catch{
		return file;
	}
}


// Example usage
const filePath = ('nodeMessages.txt'); // Replace with your file path
const nodeMessages = readTxtToDictionary(filePath);

