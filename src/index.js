import express from "express";

import { createNotionPage } from './notion.js';
import { sendTextMessage } from './twilio.js';
import { generateAiContext } from './gemini.js'



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
async function handleTextMessage(message) {
    console.log("Received text message:", message);
    const description = await generateAiContext(JSON.stringify({message}));
    if (typeof description === 'string') {
        await createNotionPage(message, description.substring(0, 2000));
    }else{
        console.error(`${description} is not a string`);
    }
    sendTextMessage("Rohit Your Page created on notion you check")


}

app.post('/', async (req, res) => {
    const { body } = req;
    if (body.Body) {
      const message = body.Body;
      await handleTextMessage(message);
    }
    res.status(200).send();
  });


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
app.listen(port, () => console.log(`Express app running on port ${port}!`));