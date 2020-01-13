// implement your API here
const Hubs = require('./data/db.js'); 

const express = require('express'); 


server = express(); 

server.use(express.json());


server.get('/', (req, res) => { 
    res.send({hi: "Hello there from web25!!!"})
})

server.get('/api/users/', (req, res) => { 
    Hubs.find()
    .then(hubs => { 
        res.status(200).json(hubs); 
    })
    .catch(error => { 
        console.log(error); 
        res.status(500).json({
            errorMessage: 'The user information could not be retrieved'
        })
    })
})

server.get('/api/users/:id', (req, res) => { 
    Hubs.findById(req.params.id)
    
    .then(hubs => { 
        console.log('hubs by id', hubs); 
        if(hubs === undefined){
            res.status(404).json({
                errorMessage: 'The user with the specified ID does not exist'
            })
        }
        res.status(200).json(hubs);
    })
    .catch(err => { 
        res.status(500).json({
            errorMessage: 'The users information could not be retrieved'
        })
        
    })
})

server.post('/api/users/', (req, res) => { 
    const info = req.body
    if(!info.name || !info.bio){
        res.status(400).json({
            errorMessage: "please provide your name and bio for the user"
        })

    }
    Hubs.insert(info)
    .then(hubs => { 
        res.status(201).json(info)
    })
    .catch(err => { 
        console.log(err); 
        res.status(500).json(
            {errorMessage: 'There was an error saving the user to the database '})
    })
})

server.delete('/api/users/:id', (req, res) => { 
    const ID = req.params.id;
    
    Hubs.remove(ID)
    .then(hubs => {
        console.log(hubs,"??delete")
        if(hubs === 0) {
             
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            })
        }
        res.status(200).json(hubs); 
    })
    .catch(error => { 
        console.log(error); 
        res.status(500).json({
            errorMessage: 'The user could not be removed'
        })
    })
})

server.put('/api/users/:id', (req, res) => { 
    // const ID = req.params.id; 
    const body = req.body; 
    const {id} = req.params;
    if(!body.name || !body.bio){
        res.status(400).json({
            errorMessage: "please provide your name and bio for the user"
        })

    } 
    Hubs.update(id, body)
    .then(hubs =>  {
        console.log(hubs, "??put")
        if(hubs === 0){ 
            res.status(404).json({
                errorMessage: "The user with the specified user id does not exist"
            }); 
        }
        res.status(200).json(hubs); 
    })
    .catch(error => { 
        console.log(error); 
        res.status(500).json({
            errorMessage: "The user information could not be modified"
        })
    }) 
})



const port = 8000; 

server.listen(port, () => console.log(`\n *** api on port ${port} *** `))
