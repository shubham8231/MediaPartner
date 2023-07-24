const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

const {speech} = require("./public/js/tts");
const maleSpeech = speech.synthesizeMaleSpeech;
const femaleSpeech = speech.synthesizeFemaleSpeech;

const folderPath = __dirname + "/outputAudio";

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req,res) => {
    res.render("index");
})

const uploadHandler = multer({
    dest: 'uploadedFiles/',
    limits: {
        fileSize: 1000000
    }
})

let fileName = "";

app.post("/uploadFile", uploadHandler.single('file') ,async (req, res) => {
    const filePath = req.file.path
    fileName = req.file.originalname.slice(0,-4)
    if(req.headers["speech-type"]==="male"){
        await maleSpeech(filePath, fileName)
    }
    if(req.headers["speech-type"]==="female"){
        await femaleSpeech(filePath, fileName);
    }
    res.sendStatus(200)
})

app.get("/downloadFile/:speechType", (req, res) => {
    const sType = req.params.speechType;
    if(sType==="maleSpeech"){
        res.download(`${folderPath}/${fileName}-male.wav`, (err) => {
            console.log(err);
        });
    }else if(sType==="femaleSpeech"){
        res.download(`${folderPath}/${fileName}-female.wav`, (err) => {
            console.log(err);
        });
    }
})

app.listen(port, () => {
    console.log(`Listening To Port ${port}`);
})