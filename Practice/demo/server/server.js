import express from "express";;
const server = express()

server.listen(8889, () => {
    console.log("Server is running on http://localhost:8889");
})

server.get("/", (req, res) => {
    // res.setHeader("Content-Type", "text/html")
    res.write('hello world');
    res.end()
})

