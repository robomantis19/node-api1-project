// implement your API here
const Hubs = require('./data/db.js'); 

const express = require('express'); 


server = express(); 

server.use(express.json());


server.get('/', (req, res) => { 
    res.send({hi: "Hello there from web25!!!"})
})

server.get('/api/hubs/', (req, res) => { 
    Hubs.find()
    .then(hubs => { 
        res.status(200).json(hubs); 
    })
    .catch(error => { 
        console.log(error); 
        res.status(500).json({
            errorMessage: 'sorry , we ran into an error getting the list on hubs.'
        })
    })
})



const port = 8000; 

server.listen(port, () => console.log(`\n *** api on port ${port} *** `))
