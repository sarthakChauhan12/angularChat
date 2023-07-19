const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");
require('dotenv').config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_API_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });

const app = express();

app.use(cors({
    origin: ['http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages/:id', async (req, res) => {
    await pusher.trigger("chat"+req.params.id, "message", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
})

console.log('listening to port 8000');
console.log("Hi"+ process.env.PUSHER_APP_KEY);
app.listen(8000)



// GET route
app.get('/api/resource', (req, res) => {
  // Logic to handle GET request

  res.send('GET request received');
});



// POST route
app.post('/api/resource', (req, res) => {
  const requestBody = req.body;
  // Logic to handle POST request

  res.send(JSON.stringify(requestBody));
});

// PUT (Update) route
app.put('/api/resource/:id', (req, res) => {
  const resourceId = req.params.id;
  const requestBody = req.body;
  // Logic to handle PUT request with the specified resource ID

  res.send(`${resourceId} ${JSON.stringify(requestBody)}`);
});

// DELETE route
app.delete('/api/resource/:id', (req, res) => {
  const resourceId = req.params.id;
  // Logic to handle DELETE request with resource ID
  
  res.send(resourceId);
});

// PATCH route
app.patch('/api/resource/:id', (req, res) => {
  const resourceId = req.params.id;
  const requestBody = req.body;

  // Logic to handle PATCH request with resource ID
  res.send(`${resourceId} ${JSON.stringify(requestBody)}`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});