import express from 'express';
import bodyParser from 'body-parser';
import {User} from "./User.mjs"

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

async function getData(url = "", data = {}) {   
    const response = await fetch(url, {
        method: "GET", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Authorization": 'Bearer ' + token
        },
        referrerPolicy: "no-referrer",
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

app.get('/users', (req, res) => {
    let user_names = User.users.map((user) => user.getName());
    res.json(user_names);
});

//get info about a user
app.get('/user/:name', (req, res) => {
    let name = req.params.name;
    let user = {};
    if(!User.users.map((user) => user.getName()).includes(name)){
        res.status(404).send("user not found");
        return;
    }
    user = User.users.find((user) => user.getName() === name);
    res.json({username: user.getName(), scores: user.getScores()});
});

//create a new user
app.post('/user', (req, res) => {
    try{
        let user = new User(req.body.username, req.body.scores);
        res.json({username: user.getName(), scores: user.getScores()});
    }
    catch(e) {
        console.log(e);
        res.status(400).send("invalid data");
    }
});

//update a user
app.put('/user/:name', (req, res) => {
    let name = req.params.name;
    let user = {};
    if(!User.users.map((user) => user.getName()).includes(name)){
        res.status(404).send("user not found");
        return;
    }
    let scores = req.body.scores;
    if(!scores) {
        res.status(400).send("scores not found in request body");
        return;
    }
    try {
        user = User.users.find((user) => user.getName() === name);
        user.addScores(scores);
        res.json({username: user.getName(), scores: user.getScores()});
    }
    catch(e) {
        console.log(e);
        res.status(400).send("scores formatted incorrectly");
    }
});

//get a list of artist ids in the form {name: <name>, id:<id>}
app.get('/artist/:name', (req, res) => {
    let name = req.params.name;
    if(!name) {
        res.status(400).send("no name found");
        return;
    }
    name = name.trim();
    getData("https://api.spotify.com/v1/search?q="+ name +"&type=artist").then((data) => {
        let artists = data.artists.items.map((item) => {
           return{name: item.name, id: item.id};
        })
        res.json(artists);
    });
});

//get a list of mp3s for an artist id
app.get('/artist/songs/:id', (req, res) => {
    let id = req.params.id;
    if(!id) {
        res.status(400).send("no id found");
        return;
    }
    getData("https://api.spotify.com/v1/artists/"+id+"/albums").then((data) => {
        if(data.error){
            res.status(404).send("artist with id not found");
            return;
        }
        let links = [];
        let album_ids = data.items.map((item) => item.id);
        album_ids = album_ids.slice(0,20);
        let ids_string = album_ids.join(",");
        getData("https://api.spotify.com/v1/albums?ids="+ ids_string).then((album_data) => {
            album_data.albums.forEach((album) => {
                album.tracks.items.forEach((track) => {
                    links.push({name: track.name, link:track.preview_url});
                })
            }); 
            links = links.filter((link) => link.link !== null);
            res.json(links);
        })
    });
});

app.listen(port, () => {
    console.log('Running...');
})