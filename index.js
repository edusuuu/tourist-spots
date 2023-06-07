let express = require("express")
let app = express()
app.use(express.static(`${__dirname}/views`))

app.listen(6969, (err) => console.log(err ? `${err.message}`: "Server listening on port 6969"))
