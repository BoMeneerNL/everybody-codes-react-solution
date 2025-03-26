import express from 'express';
import cors from 'cors';
import { getIfDataIsValid, parseCsv, readFileAsLines } from "./search.js";
const app = express();
app.use(cors())


// Define a route
app.get('/getAllCameras', (req, res) => {
    const csvfile = readFileAsLines('cameras-defb.csv');
    const validData = getIfDataIsValid(csvfile.slice(1));
    const csv = parseCsv(validData).filter((line) => {
        if (line.length == 3) {
            return true;
        }
    });
    
    return res.send(csv.map((line) => {
        let id = "";
        const name = line[0].split('-')[2];
        for (let i = 0; i < name.length; i++) {
            if (!/[0-9]/.test(name[i])) {
                break;
            }
            id += name[i];
        }
        return {
            id: Number(id),
            name: line[0],
            latitude: Number(line[1]),
            longitude: Number(line[2])
        };
    }));

});

// Open port on 3000 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});