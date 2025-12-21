const http = require("http")
const server = http.createServer()

server.listen(5173, "0.0.0.0", () => {

  console.log("sucess")
})