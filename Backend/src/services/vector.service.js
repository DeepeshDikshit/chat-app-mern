const { Pinecone } = require('@pinecone-database/pinecone')

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const cohortChatGptIndex = pc.index('chat-gpt');

const NAMESPACE = "__default__";

async function createMemory({ vectors, metadata, messageId }) {
    //console.log("🟩 VECTORS LENGTH:", vectors?.length);

    await cohortChatGptIndex.upsert(
        [
            {
                id: messageId.toString(),
                values: vectors,
                metadata: metadata || {}
            }
        ],
        {
            namespace: NAMESPACE
        }
    );
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
    const data = await cohortChatGptIndex.query(
        {
            vector: queryVector,
            topK: limit,
            includeMetadata: true,
            filter: metadata ? metadata : undefined
        },
        {
            namespace: NAMESPACE
        }
    );

    return data.matches;
}

module.exports = { createMemory, queryMemory };
