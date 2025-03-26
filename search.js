const fs = require('fs');

const cameraIdRegex = /^[A-Za-z]+-[A-Za-z]+-\d+/;
const nodeArguments = process.argv.slice(2);
let placeName;
for (let i = 0; i < nodeArguments.length; i++) {
    if (nodeArguments[i] === '--name') {
        if(i + 1 < nodeArguments.length) {
            
            placeName = nodeArguments[i + 1];
        }
    }
}
// Read the file
csvfile = readFileAsLines('cameras-defb.csv');

// Check if data is valid without checking the header
validData = getIfDataIsValid(csvfile.slice(1));

csv = parseCsv(validData);
printCsv(csv);


function readFileAsLines(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
    return lines.filter((line) => line.trim().length > 0);
}

function getIfDataIsValid(lines) {
    let validData = [];
    lines.forEach((line) => {
        const fields = line.split(';');
        if (cameraIdRegex.test(fields[0]) && fields.every(field => field.trim().length > 0)) {
            validData.push(line);
        }
    });
    return validData;
}

function parseCsv(lines, delimiter = ';') {
    return lines.slice(1).map((line) => line.split(delimiter));
}

function printCsv(csv = [], delimiter = ' | ') {
    csv.forEach((line) => {
        let id = "";
        const name = line[0].split('-')[2];
        for (let i = 0; i < name.length; i++) {
            if (!/[0-9]/.test(name[i])) {
                break;
            }
            id += name[i];
        }
        
        line = [id, ...line];

        // Ensure full row matches the place name before printing
        if (!placeName || line.some((field) => field.toLowerCase().includes(placeName.toLowerCase()))) {
            console.log(line.join(delimiter));
        }
    });
}

