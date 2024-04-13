import twilio from 'twilio';


export async function sendTextMessage(body) {
  await client.messages.create({
    body: body,
    from: 'whatsapp:',
    to: 'whatsapp:'
  });
}