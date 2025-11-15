// Wipes all data from the 'chat-gpt' index in Pinecone database

node -e "require('dotenv').config(); (async()=>{ const { Pinecone } = require('@pinecone-database/pinecone'); const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY }); const idx = pc.index('chat-gpt'); await idx.deleteAll(); console.log('Pinecone wiped'); })()"
