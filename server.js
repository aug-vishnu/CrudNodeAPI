var msg = 'Test log & server is starting...';
console.log(msg);

// Initializing Express Module 
const express = require('express');
const app = express();
countries = [
    {"id": 1, "name": "India", "code": "91" },
    {"id": 2, "name": "United States", "code": "1" },
    {"id": 3, "name": "United kingdom", "code": "44" }
]
ERROR_MESSAGE = { "message": "Country Not Found for given ID!" }

// a middleware with no mount path; gets executed for every request to the app
app.use(express.json())
// also we can user app.use(express.json())

// List all countries 
app.get('/', (req, res) => {  
    res.send(countries)
})

// Retreive specific countries 
app.get('/:id', (req, res) => { 
    const country = countries.find(c => c.id == parseInt(req.params.id)) 
    if(!country) res.status(404).send(ERROR_MESSAGE)
    res.send(country)
})

// Create country
app.post('/', (req, res) => { 
    console.log(req.body);
    const country = {
        "id" : countries.length + 1,
        "name": req.body.name, 
        "code": req.body.code ,
    }
    countries.push(country)
    res.send(country)
})

// Update country
app.put('/:id', (req, res) => { 
    const country = countries.find(c => c.id == parseInt(req.params.id)) 
    if(!country) res.status(404).send(ERROR_MESSAGE)
    country.name = req.body.name
    country.code = req.body.code
    res.send(country)
})

// Delete country
app.delete('/:id', (req, res) => { 
    const country = countries.find(c => c.id == parseInt(req.params.id)) 
    if(!country) res.status(404).send(ERROR_MESSAGE)

    const index = countries.indexOf(country)
    countries.splice(index, 1)
    res.send({ "message": "Country sucessfully deleted" })
})

// Initialized server
const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/...`);
})

