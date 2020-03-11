var fs = require("fs");
const path = require("path");
const uuid = require("uuid-random")
const filePath = path.resolve(__dirname, "../db/db.json");
module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            if (data) {
                const allNotes = JSON.parse(data)
                res.send(allNotes);
            } else {
                res.send(new Object());
            }

        });
    });

    app.post("/api/notes", function (req, res) {
        const newId = uuid();
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: newId
        };




        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            let allNotes = [];
            if (data) {
                allNotes = JSON.parse(data);
            } 
            allNotes.push(newNote);
            console.log(allNotes);
            fs.writeFile(filePath, JSON.stringify(allNotes, null, 2), err => {
                if (err) throw err;
                res.send(allNotes);
            })

        });
    });
   
    app.delete("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync(filePath, "utf8"));
        let noteID = req.params.id;
        let newID = 0;
        console.log(`Deleting note with ID ${noteID}`);
        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })
        
        for (currNote of savedNotes) {
            currNote.id = newID.toString();
            newID++;
        }
    
        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    })
    
   
};