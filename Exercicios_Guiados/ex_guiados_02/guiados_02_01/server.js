const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/message") {

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify({
      text: "Olá do servidor!"
    }));
  }

  else {
    res.writeHead(404);
    res.end("Not found");
  }

});

server.listen(3000, () => {
  console.log("Servidor em http://localhost:3000");
});