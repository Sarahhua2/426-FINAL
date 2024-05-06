import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {Node} from './node.mjs';
import { Quote } from './quote.mjs';

const app = express();

const port = 5500;

app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static('public'));

app.get('/nodes', (req, res) => {
    let response = []
    let nodes =  Node.getAllNodes();
    // console.log(nodes[0]);
    for (let node of nodes){
        response.push(node.json())
    }
    res.json(response); 
    // res.status(201).send(nodes);
   
});

app.get('/nodes/:id', (req, res) => {

    let n = Node.findByID(req.params.id);
    if(!n) {
        res.status(404).send("Node not found");
    } 
    else {
        const depth = req.query.depth; 
        
        if (depth == undefined){
            res.json(n.json());
        }
        else{
            if(isNaN(depth)
                || depth < 0){
                    res.status(400).send("Bad request");
                }
                else{
                    res.json(Node.findByIDByDepth(req.params.id, depth));
                }
        }
    }
});

app.get('/quotes', (req, res) => {
    let response = [];
    let quotes =  Quote.getAllQuotes();
    // console.log(nodes[0]);
    for (let quote of quotes){
        response.push(quote.json())
    }
    res.json(response); 
})

app.post('/nodes', (req, res) => {
    let n = null;
    if ((req.body == undefined) && (!req.body instanceof Object)
        || (req.body.headline == undefined)
        || (typeof req.body.headline !== 'string')
        || (req.body.note == undefined)
        || (typeof req.body.note !== 'string')
        || (req.body.children_ids && req.body.children_ids.includes(1))){
            
            res.status(400).send("Invalid request");
        }
        else{
            n = Node.create(req.body);
            if(!n) {
                    res.status(400).send("Bad request");
                    return;
                }
        }
    
    if(n){
        res.status(201).json(n.json());
    }
    
});

app.post('/quotes', (req, res) => {
    console.log("quote api")
    console.log(req.body);

    let q = Quote.create(req.body);
            if(!q) {
                    res.status(400).send("Bad request");
                    return;
                }
            if(q){
                res.status(201).json(q.json());
            }
})

app.put('/nodes/:id', (req, res) => {
    let n = Node.findByID(req.params.id);
    if(!n) {
        res.status(404).send("Node not found");
    }
    

    n.setHeadline(req.body.headline);
    n.setNote(req.body.note);
    n.setChildren(req.body.children_ids);

    res.json(n.json());

});

app.get('/parents/:id', (req, res) => {
    let n = Node.findByID(req.params.id);
    if(!n) {
        res.status(404).send("Node not found");
    }
    res.json(Node.findParents(req.params.id));
});

Node.create({headline: "First task", note: "hi"});



app.listen(port, () => {
    console.log(`Running on ${port}`);
})

app.delete('/nodes/:id', (req, res) => {
    console.log(req.params.id)
    Node.deleteNode(req.params.id);
    // res.status(500).send("Needs to be implemented");
    res.status(201).send("Node deleted");
});

app.delete('/quotes/:id', (req, res) => {
    console.log(req.params.id);
    Quote.deleteQuote(req.params.id);
    res.status(201).send("Quote deleted");
});