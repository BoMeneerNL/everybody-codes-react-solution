import fs from 'fs';
const cameraIdRegex = /^[A-Za-z]+-[A-Za-z]+-\d+/;

export function readFileAsLines(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
    return lines.filter((line) => line.trim().length > 0);
}

export function getIfDataIsValid(lines) {
    let validData = [];
    lines.forEach((line) => {
        const fields = line.split(';');
        if (cameraIdRegex.test(fields[0]) && fields.every(field => field.trim().length > 0)) {
            validData.push(line);
        }
    });
    return validData;
}

export function parseCsv(lines, delimiter = ';') {
    return lines.slice(1).map((line) => line.split(delimiter));
}

