const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const {Client} = require('pg')
var pgp = require('pg-promise')(/*options*/)
const connectionString = 'postgres://admin1:y2699WmsN8ZfxGDhPpFrUKIfIg9fef2I@oregon-postgres.render.com/vytalize_npi_database?ssl=true';
var db = pgp('postgres://admin2:y2699WmsN8ZfxGDhPpFrUKIfIg9fef2I@oregon-postgres.render.com/vytalize_npi_database')
// pools will use environment variables
// for connection information
const pool = require('./db')
app.use(express.json());

const client = new Client({
    connectionString: connectionString
})

client.connect();

app.get("/", (req, res) => res.send("Hello from Render!"));

app.get("/npi-result/:npi_string", async (req, res) => {
    const { npi_string } = req.params;

    let npi_record;

    try{
    await client.query(`SELECT * FROM npi_records.npi_records where npi = ${npi_string}`).then(
    data => {
        console.log("HERE", data);
        npi_record = data.rows[0];
    }
)} catch{
    console.log("problem")
}

    res.json({...npi_record})
})

app.listen(port, () => console.log(`Vytalize db listening on port ${port}!`));
