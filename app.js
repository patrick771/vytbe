const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
var cors = require('cors')
const {Client} = require('pg')
// pools will use environment variables
// for connection information
app.use(express.json());
app.use(cors())

const client = new Client({
    connectionString: process.env.CONNECT
})

client.connect();

app.get("/", (req, res) => res.send("Hello from Render!"));

app.get("/npi-result/:npi_string", async (req, res) => {
    const { npi_string } = req.params;

    let npi_record;

    try{
    await client.query(`SELECT * FROM npi_records.npi_records where npi = ${npi_string}`).then(
    data => {
        npi_record = data.rows[0];
    }
)} catch{
    console.log("problem")
}

  return res.json({...npi_record})
})

app.listen(port, () => console.log(`Vytalize db listening on port ${port}!`));
