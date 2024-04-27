import express from 'express';
import bodyParser from 'body-parser';


const CLIENT_ID = "acaeb65eed5644c798b3ae8a3ef7cde2";
const CLIENT_SECRET = "c8668ba1c0744c0c8857089d1d6bf6d2";
let token = 0;

async function postData(url = "", data = {}) {   
    const response = await fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        referrerPolicy: "no-referrer", 
        body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
    });
    return response.json(); 
}
  
postData('https://accounts.spotify.com/api/token').then((data) => {
    console.log(data); 
    token = data.access_token
});

const app = express();

const port = 3000;

app.use(bodyParser.json());

//get info about a user
app.get('/user/:name', (req, res) => {
    let user = {username:"test", scores: [{song: {name: "song1", id:12345}, points: [1,2,3,4]}]}
    res.json(user);
});

//create a new user
app.post('/user', (req, res) => {
    let user = {username:"test", scores: [{song: {name: "song1", id:12345}, points: [1,2,3,4]}]}
    res.json(user);
});

//update a user
app.put('/user/:name', (req, res) => {
    let user = {username:"test", scores: [{song: {name: "song1", id:12345}, points: [1,2,3,4]}]}
    res.json(user);
});

//get a list of artist ids in the form {name: <name>, id:<id>}
app.get('/artist/:name', (req, res) => {
    let artists = [{name: artist1, id:12345}, {name:artist2, id:54321}];
    res.json(artists);
});

//get a list of mp3s for an artist id
app.get('/artist/songs/:id', (req, res) => {
    let links = [{name: "testsong1", link: 'https://p.scdn.co/mp3-preview/0a69f787920bde0a0e1d17af762695ad3cc9d99b?cid=acaeb65eed5644c798b3ae8a3ef7cde2'}];
    res.json(links);
});


app.get('/songs/:id', (req, res) => {
    res.status(500).send("still needs to be implemented");
});

app.listen(port, () => {
    console.log('Running...');
})