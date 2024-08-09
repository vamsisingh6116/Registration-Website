const express = require("express")
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://vamsisingh2002:Vamsi%40%231@registration-form.baydiz5.mongodb.net/?retryWrites=true&w=majority&appName=Registration-form`);

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded ({ extended: true}));
app.use(bodyParser.json());




app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
})

app.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const registrationData = new Registration({
            name,
            email,
            password
        });
        await registrationData.save();
        res.redirect("/success");

    }
    catch(error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/success", (req,res) => {
    res.sendFile (__dirname + "/pages/success.html");
})

app.get("/error", (req, res) => {
    res.sendFile (__dirname + "/pages/error.html");
})

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
})

