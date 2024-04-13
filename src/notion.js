import { Client } from '@notionhq/client';


const notion_client = new Client({ auth: ''});
const pageID = '';

  export async function createNotionPage(message,description) {
    try {
      const response = await notion_client.pages.create({
        "parent": { "page_id": pageID },
        "properties": {
            "title": {
          "title": [{ "type": "text", "text": { "content": message } }]
            }
        },
        "children": [
        {
          "object": "block",
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ "type": "text", "text": { "content": description } }]
          }
        }
      ]
      });
      console.log("Page created successfully:");
    } catch (error) {
      console.error("Error creating page:",error);
    }  
  }