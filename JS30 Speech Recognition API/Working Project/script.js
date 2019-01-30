// set up an express server to simply highlight the project set up in views/html and styled/completed by the files in the public/ folder
const port = 3000;
const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/public`));


app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// listen on the selected port @local host
app.listen(port);
console.log(`Listening on port ${port}`);
