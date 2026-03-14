import { Mail, Play } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const emailAutomationTemplates: IN8nTemplate[] = [
  {
    "name": "Auto Archive Promotions",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Auto Archive Promotions",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "c8c1846b-13b0-4c02-9fe5-4d00953318c3",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "auto-archive-promotions"
        },
        "id": "88b8b314-a8a8-4764-a7b2-ae433e56d008",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "8ec45fc1-8df0-49e9-afd6-7feddd280948",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "4980a2e9-1bb5-4754-ad54-427044caa38d",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "pineconeIndex": {
            "__rl": true,
            "value": "auto_archive_promotions",
            "mode": "list",
            "cachedResultName": "auto_archive_promotions"
          }
        },
        "id": "e7ea191b-5779-4f89-8254-1dc72d0d990a",
        "name": "Pinecone Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "pineconeApi": {
            "id": "PINECONE_API",
            "name": "Pinecone account"
          }
        }
      },
      {
        "parameters": {
          "pineconeIndex": {
            "__rl": true,
            "value": "auto_archive_promotions",
            "mode": "list",
            "cachedResultName": "auto_archive_promotions"
          }
        },
        "id": "2692ac89-af93-466e-bffa-81ccc09da686",
        "name": "Pinecone Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "pineconeApi": {
            "id": "PINECONE_API",
            "name": "Pinecone account"
          }
        }
      },
      {
        "parameters": {
          "name": "Pinecone",
          "description": "Vector context"
        },
        "id": "64154d66-1337-4f3a-87b8-f6548cb9b47f",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "eeaa1f48-794b-44d4-98db-18f3b289aa6f",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "6740f1df-ab97-416e-855f-6d521ad89b9e",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Auto Archive Promotions"
          }
        },
        "id": "8d11beaa-7934-4927-9519-d14d2ea885ef",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Auto Archive Promotions"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "fcad99f4-60fd-4c33-b12c-78aa0284651e",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Auto Archive Promotions error: {$json.error.message}"
        },
        "id": "dc986a7b-8dbe-45f0-a73b-6584e5be6821",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Pinecone Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Pinecone Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Pinecone Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Pinecone Insert": {
        "ai_document": [
          []
        ]
      },
      "Pinecone Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Auto Reply to FAQs",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Auto Reply to FAQs",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "9346afca-4798-4807-8f7a-b1298919df74",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "auto-reply-to-faqs"
        },
        "id": "692d46f2-9045-416a-b0cd-8e42fd3230c5",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "83193912-ef89-477a-b6b9-c293b5498153",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "embed-english-v3.0",
          "options": {}
        },
        "id": "1fb02ad8-15e0-49c7-8271-a9af5c511da2",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "cohereApi": {
            "id": "COHERE_API",
            "name": "Cohere"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "pineconeIndex": {
            "__rl": true,
            "value": "auto_reply_to_faqs",
            "mode": "list",
            "cachedResultName": "auto_reply_to_faqs"
          }
        },
        "id": "45600a7a-615a-4733-ae13-a394bd19bfea",
        "name": "Pinecone Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "pineconeApi": {
            "id": "PINECONE_API",
            "name": "Pinecone account"
          }
        }
      },
      {
        "parameters": {
          "pineconeIndex": {
            "__rl": true,
            "value": "auto_reply_to_faqs",
            "mode": "list",
            "cachedResultName": "auto_reply_to_faqs"
          }
        },
        "id": "8620fcf8-2067-4776-8f6a-fb896d765342",
        "name": "Pinecone Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "pineconeApi": {
            "id": "PINECONE_API",
            "name": "Pinecone account"
          }
        }
      },
      {
        "parameters": {
          "name": "Pinecone",
          "description": "Vector context"
        },
        "id": "4f9229e7-bf9d-4de4-b51e-49aa8553dfef",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "d42590ab-e482-416d-9418-9dc595ac9b04",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "9b993db0-8564-4ff1-839f-ce059f1d8545",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Auto Reply to FAQs"
          }
        },
        "id": "2395d437-ac56-4637-b4a6-4c626f217ae7",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Auto Reply to FAQs"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "2bc49ad8-7cc0-4cbc-b72e-3ccaa19fb8e2",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Auto Reply to FAQs error: {$json.error.message}"
        },
        "id": "44f0bf88-3961-4ec3-b965-011224fba8a1",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Pinecone Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Pinecone Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Pinecone Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Pinecone Insert": {
        "ai_document": [
          []
        ]
      },
      "Pinecone Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Daily Email Digest",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Daily Email Digest",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "47d7b2cb-5d44-4625-aeab-33e0b7ce529f",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "daily-email-digest"
        },
        "id": "a079decc-ca6c-4248-b4c9-34deb17c8d26",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "8d196219-7de5-428e-8e88-420abfcc9237",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "8c20a8a3-3002-4d4f-b46f-cf859d229655",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "daily_email_digest"
        },
        "id": "ae6e7c84-9dbb-4ec7-a621-1a1e438941b6",
        "name": "Supabase Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "daily_email_digest"
        },
        "id": "f3ba587a-bd11-418d-9998-395164701bd3",
        "name": "Supabase Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "name": "Supabase",
          "description": "Vector context"
        },
        "id": "eed3ad49-c219-4c4a-b420-eff8b6401981",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "6622f4cb-bdbe-4c76-9ea0-25cf1e2ce2a4",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "edd62db3-4bfd-4ab4-b4e5-0e038b0beec1",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Daily Email Digest"
          }
        },
        "id": "0e624e84-3f49-49d4-b0eb-a3268f6984d0",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Daily Email Digest"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "dbec21d4-50e8-47a6-a920-6da576ebc01d",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Daily Email Digest error: {$json.error.message}"
        },
        "id": "487c7190-b1d5-4770-b503-ec7ce44ad9ba",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Supabase Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Supabase Insert": {
        "ai_document": [
          []
        ]
      },
      "Supabase Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Follow-up Emails",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Follow-up Emails",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "9f233e35-f7da-4e01-9423-5b375143b2b8",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "follow-up-emails"
        },
        "id": "cb84f658-4d92-43b6-ba38-6511ad71ac6d",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "fd9c8817-cd20-4521-a501-ddf62864c092",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "86dbd6f8-2249-41bf-8efc-6b93892ff5b1",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "follow-up_emails"
        },
        "id": "f61052dc-bfaa-4aae-aad7-40fdee0bec99",
        "name": "Weaviate Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "weaviateApi": {
            "id": "WEAVIATE_API",
            "name": "Weaviate account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "follow-up_emails"
        },
        "id": "6c4053cf-94a1-4a38-9f15-5d6b3cddfc0c",
        "name": "Weaviate Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "weaviateApi": {
            "id": "WEAVIATE_API",
            "name": "Weaviate account"
          }
        }
      },
      {
        "parameters": {
          "name": "Weaviate",
          "description": "Vector context"
        },
        "id": "b571563d-fc66-45e6-99f0-d5de332b07ec",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "bce39b85-50bc-4202-9ec4-6e23a06345b3",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "1a8964b2-92c9-4aa2-b56d-3e4c4f5fa4c8",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Follow-up Emails"
          }
        },
        "id": "de0333cc-9bb6-440a-9f09-591436941922",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Follow-up Emails"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "bf20f642-7227-4478-aa9b-4c507ca51c57",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Follow-up Emails error: {$json.error.message}"
        },
        "id": "d7266d35-f67b-48b9-ac50-86b7298d5939",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Weaviate Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Weaviate Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Weaviate Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Weaviate Insert": {
        "ai_document": [
          []
        ]
      },
      "Weaviate Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Forward Attachments",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Forward Attachments",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "15ea4b74-7127-48af-9f59-629bb14a2bd4",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "forward-attachments"
        },
        "id": "8a67f7cf-b9f0-4c6c-9560-e9d746f29c98",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "9bad17f7-55c2-41d5-99dd-ba0fd211777b",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "e135820c-3de0-4731-b76b-1ca54b2f6ed3",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "pineconeIndex": {
            "__rl": true,
            "value": "forward_attachments",
            "mode": "list",
            "cachedResultName": "forward_attachments"
          }
        },
        "id": "dd4b9606-bfb4-44bd-a9f8-fbdce7127924",
        "name": "Pinecone Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "pineconeApi": {
            "id": "PINECONE_API",
            "name": "Pinecone account"
          }
        }
      },
      {
        "parameters": {
          "pineconeIndex": {
            "__rl": true,
            "value": "forward_attachments",
            "mode": "list",
            "cachedResultName": "forward_attachments"
          }
        },
        "id": "fb46a67f-195f-44a8-ae68-383e70e3ca41",
        "name": "Pinecone Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "pineconeApi": {
            "id": "PINECONE_API",
            "name": "Pinecone account"
          }
        }
      },
      {
        "parameters": {
          "name": "Pinecone",
          "description": "Vector context"
        },
        "id": "3ef19169-0bbf-4f8c-a01e-e66d7c8e9c92",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "8a4d7ddf-836b-49b9-8a57-d6bf92b44cdd",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "e208345d-1ccb-43fa-ae90-5f90e8d40d9a",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Forward Attachments"
          }
        },
        "id": "06cce445-64df-4a85-a1d0-e5d3960583b1",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Forward Attachments"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "df7aa3a4-ff0d-4289-bbc1-c06bcd3596b7",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Forward Attachments error: {$json.error.message}"
        },
        "id": "d59d6048-34a9-481e-b729-51bed8088528",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Pinecone Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Pinecone Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Pinecone Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Pinecone Insert": {
        "ai_document": [
          []
        ]
      },
      "Pinecone Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Lead to HubSpot",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Lead to HubSpot",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "056c084c-5b6a-48a6-ba89-9fb86bfb9ece",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "lead-to-hubspot"
        },
        "id": "d53202f1-2095-44db-b12d-450cde7d1dd3",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "1714cebd-2e6e-461c-97ee-adb767be43ea",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "embed-english-v3.0",
          "options": {}
        },
        "id": "831ece73-5cea-4505-abc2-138247802af1",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "cohereApi": {
            "id": "COHERE_API",
            "name": "Cohere"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "lead_to_hubspot"
        },
        "id": "dfc452c0-7fbd-4fdb-8f5c-84efc4681695",
        "name": "Supabase Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "lead_to_hubspot"
        },
        "id": "ce705b14-0b85-4bdb-bcb4-ada69abcd91e",
        "name": "Supabase Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "name": "Supabase",
          "description": "Vector context"
        },
        "id": "2d2a1930-7e4d-4a08-9917-82c2fe049aee",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "20c8dd61-5a12-4ccc-8706-b29e67284644",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "0c222da2-dec8-4ca5-bb96-164cce3678ca",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Lead to HubSpot"
          }
        },
        "id": "e627df3a-42af-4589-8597-bc365d08d2db",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Lead to HubSpot"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "17f41ec2-068e-480e-b897-33528e49ac3f",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Lead to HubSpot error: {$json.error.message}"
        },
        "id": "256bec9e-fb7f-48cb-8811-2a1645af34ef",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Supabase Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Supabase Insert": {
        "ai_document": [
          []
        ]
      },
      "Supabase Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Mailchimp Campaign Tracking",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Mailchimp Campaign Tracking",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "eebc24a2-4ca9-4c7c-8053-42b97cc10da5",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "mailchimp-campaign-tracking"
        },
        "id": "7c08e3ae-6992-45a6-b5a6-574ff186b449",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "ac546136-8d14-4a7d-a2d1-193fe6b7cf1a",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "5c980081-b726-4ac4-9260-8661cf42f865",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "mailchimp_campaign_tracking"
        },
        "id": "61e492b9-447c-409c-b7a2-d2a04d8092f5",
        "name": "Supabase Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "mailchimp_campaign_tracking"
        },
        "id": "177c6403-48a9-46a4-87be-fa747d45a07d",
        "name": "Supabase Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "name": "Supabase",
          "description": "Vector context"
        },
        "id": "a6a5e296-7190-4c5b-8912-231acd71dcb3",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "65fd57be-648d-4bfe-90f6-99ba29a87625",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "20f9ac92-c53e-4391-8115-01e68528cef1",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Mailchimp Campaign Tracking"
          }
        },
        "id": "1eb0cccd-e8f5-4891-a400-e4e3e8f7a6bc",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Mailchimp Campaign Tracking"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "f714ccc1-8d56-469e-ab46-f15c0d2a1a98",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Mailchimp Campaign Tracking error: {$json.error.message}"
        },
        "id": "8d5bc20a-0398-4fb0-b40e-bbf6694f7192",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Supabase Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Supabase Insert": {
        "ai_document": [
          []
        ]
      },
      "Supabase Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Parse Invoice Emails",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Parse Invoice Emails",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "a9239a2a-4213-4217-acfb-cbc104aad31a",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "parse-invoice-emails"
        },
        "id": "dda8050a-0edc-4b73-92bd-686e48e63e1b",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "50b68a75-9985-47db-8686-9477706474b3",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "2f2358b0-a8e3-460f-b5b0-72a194019586",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "parse_invoice_emails"
        },
        "id": "134a8b92-3314-4397-8b77-1a6bca52a7d4",
        "name": "Weaviate Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "weaviateApi": {
            "id": "WEAVIATE_API",
            "name": "Weaviate account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "parse_invoice_emails"
        },
        "id": "ceb03c85-f352-423c-911b-4d30abee397e",
        "name": "Weaviate Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "weaviateApi": {
            "id": "WEAVIATE_API",
            "name": "Weaviate account"
          }
        }
      },
      {
        "parameters": {
          "name": "Weaviate",
          "description": "Vector context"
        },
        "id": "adfd835e-81cd-4afe-ad69-d8e6f78c27af",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "7cdd9592-0400-4ad9-9a11-a26367d7cb4b",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "c0acfc97-9afd-4f56-88de-7c0e2b1cfd1d",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Parse Invoice Emails"
          }
        },
        "id": "d2e31148-f0c1-4164-97f9-670bf929a2ce",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Parse Invoice Emails"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "12711eea-68c0-49f7-809e-26f516e2a96a",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Parse Invoice Emails error: {$json.error.message}"
        },
        "id": "91904d0c-429d-4890-b73b-0e0bb77b8ac7",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Weaviate Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Weaviate Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Weaviate Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Weaviate Insert": {
        "ai_document": [
          []
        ]
      },
      "Weaviate Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "Product Launch Email",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for Product Launch Email",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "61b01104-d0ec-4196-8d4f-a4d07cd749cd",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "product-launch-email"
        },
        "id": "7ad673f2-6e28-4d06-b9c6-663a6fde1726",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "ae25e008-ce10-4ee7-9fb1-11caf5e12e81",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "embed-english-v3.0",
          "options": {}
        },
        "id": "45c0d7d3-f8aa-44cb-9424-e08f4e39fbbd",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "cohereApi": {
            "id": "COHERE_API",
            "name": "Cohere"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "product_launch_email"
        },
        "id": "f5bce02a-2fe7-44f9-8958-a83cc9cc11e3",
        "name": "Supabase Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "product_launch_email"
        },
        "id": "98bbf1d4-b9de-465c-bd80-daf1a95d31e2",
        "name": "Supabase Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "supabaseApi": {
            "id": "SUPABASE_API",
            "name": "Supabase account"
          }
        }
      },
      {
        "parameters": {
          "name": "Supabase",
          "description": "Vector context"
        },
        "id": "7a04f90c-b92f-463c-b680-aababbec2f83",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "92265498-841d-4ba3-a444-250abc4665e7",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "7e5a965d-74d7-4c17-b587-8882ad721511",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for Product Launch Email"
          }
        },
        "id": "ba3f12f2-3db3-46ed-bd42-cabe92f48831",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "Product Launch Email"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "0271fc8f-6af0-4a00-8fe2-4ff50ebedc45",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "Product Launch Email error: {$json.error.message}"
        },
        "id": "c4784deb-12bd-4273-be2c-a7b6e76e28e5",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Supabase Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Supabase Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Supabase Insert": {
        "ai_document": [
          []
        ]
      },
      "Supabase Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
  {
    "name": "SendGrid Bounce Alert",
    "nodes": [
      {
        "parameters": {
          "content": "Placeholder for SendGrid Bounce Alert",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "33c24c3f-fbf8-4461-b748-983270488128",
        "name": "Sticky Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -480,
          -240
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "sendgrid-bounce-alert"
        },
        "id": "a3b0ea8e-7b9b-40d8-b942-857e800281b2",
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -300,
          0
        ]
      },
      {
        "parameters": {
          "chunkSize": 400,
          "chunkOverlap": 40
        },
        "id": "0e37fa2c-1524-46f4-8809-c469faef23bc",
        "name": "Text Splitter",
        "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
        "typeVersion": 1,
        "position": [
          -130,
          0
        ]
      },
      {
        "parameters": {
          "model": "text-embedding-3-small",
          "options": {}
        },
        "id": "bd0a5c1f-6add-4133-9d92-73491a90e45d",
        "name": "Embeddings",
        "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
        "typeVersion": 1,
        "position": [
          70,
          0
        ],
        "credentials": {
          "openAiApi": {
            "id": "OPENAI_API",
            "name": "OpenAI"
          }
        }
      },
      {
        "parameters": {
          "mode": "insert",
          "options": {},
          "indexName": "sendgrid_bounce_alert"
        },
        "id": "f73cb3be-a874-4a02-a997-3953032b3de5",
        "name": "Weaviate Insert",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
        "typeVersion": 1,
        "position": [
          270,
          0
        ],
        "credentials": {
          "weaviateApi": {
            "id": "WEAVIATE_API",
            "name": "Weaviate account"
          }
        }
      },
      {
        "parameters": {
          "indexName": "sendgrid_bounce_alert"
        },
        "id": "b21ab497-8f7d-4420-8584-c1ccf7243d63",
        "name": "Weaviate Query",
        "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
        "typeVersion": 1,
        "position": [
          270,
          -180
        ],
        "credentials": {
          "weaviateApi": {
            "id": "WEAVIATE_API",
            "name": "Weaviate account"
          }
        }
      },
      {
        "parameters": {
          "name": "Weaviate",
          "description": "Vector context"
        },
        "id": "16a0a9d0-3851-46b9-8830-83c3c75a28ac",
        "name": "Vector Tool",
        "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
        "typeVersion": 1,
        "position": [
          450,
          -180
        ]
      },
      {
        "parameters": {},
        "id": "ede2aa4c-94e5-4890-ac9e-41d6c24e1779",
        "name": "Window Memory",
        "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
        "typeVersion": 1.3,
        "position": [
          450,
          -40
        ]
      },
      {
        "parameters": {
          "options": {}
        },
        "id": "79910783-a249-4d46-9fe8-f8d763e030d9",
        "name": "Chat Model",
        "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
        "typeVersion": 1,
        "position": [
          450,
          -340
        ],
        "credentials": {
          "anthropicApi": {
            "id": "ANTHROPIC_API",
            "name": "Anthropic"
          }
        }
      },
      {
        "parameters": {
          "promptType": "define",
          "text": "Handle data",
          "options": {
            "systemMessage": "You are an assistant for SendGrid Bounce Alert"
          }
        },
        "id": "8c19f7ba-df58-44c6-8a70-70d747b0e2b9",
        "name": "RAG Agent",
        "type": "@n8n/n8n-nodes-langchain.agent",
        "typeVersion": 1,
        "position": [
          720,
          -40
        ]
      },
      {
        "parameters": {
          "operation": "append",
          "documentId": {
            "__rl": true,
            "value": "SHEET_ID",
            "mode": "list",
            "cachedResultName": "SendGrid Bounce Alert"
          },
          "sheetName": {
            "__rl": true,
            "value": "Log",
            "mode": "list",
            "cachedResultName": "Log"
          },
          "columns": {
            "mappingMode": "defineBelow",
            "value": "Status",
            "schema": []
          }
        },
        "id": "adc64b6e-f045-4d6c-a38b-41c33af872f2",
        "name": "Append Sheet",
        "type": "n8n-nodes-base.googleSheets",
        "typeVersion": 4,
        "position": [
          930,
          -40
        ],
        "credentials": {
          "googleSheetsOAuth2Api": {
            "id": "SHEETS_API",
            "name": "Google Sheets account"
          }
        }
      },
      {
        "parameters": {
          "channel": "#alerts",
          "text": "SendGrid Bounce Alert error: {$json.error.message}"
        },
        "id": "dce8248e-a281-492c-bac7-fca5243ec8e5",
        "name": "Slack Alert",
        "type": "n8n-nodes-base.slack",
        "typeVersion": 1,
        "position": [
          930,
          120
        ],
        "credentials": {
          "slackApi": {
            "id": "SLACK_API",
            "name": "Slack"
          }
        }
      }
    ],
    "connections": {
      "Webhook Trigger": {
        "main": [
          [
            {
              "node": "Text Splitter",
              "type": "main",
              "index": 0
            },
            {
              "node": "Window Memory",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Text Splitter": {
        "main": [
          [
            {
              "node": "Embeddings",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "ai_textSplitter": [
          [
            {
              "node": "Weaviate Insert",
              "type": "ai_textSplitter",
              "index": 0
            }
          ]
        ]
      },
      "Embeddings": {
        "ai_embedding": [
          [
            {
              "node": "Weaviate Insert",
              "type": "ai_embedding",
              "index": 0
            },
            {
              "node": "Weaviate Query",
              "type": "ai_embedding",
              "index": 0
            }
          ]
        ]
      },
      "Weaviate Insert": {
        "ai_document": [
          []
        ]
      },
      "Weaviate Query": {
        "ai_vectorStore": [
          [
            {
              "node": "Vector Tool",
              "type": "ai_vectorStore",
              "index": 0
            }
          ]
        ]
      },
      "Vector Tool": {
        "ai_tool": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_tool",
              "index": 0
            }
          ]
        ]
      },
      "Window Memory": {
        "ai_memory": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_memory",
              "index": 0
            }
          ]
        ]
      },
      "Chat Model": {
        "ai_languageModel": [
          [
            {
              "node": "RAG Agent",
              "type": "ai_languageModel",
              "index": 0
            }
          ]
        ]
      },
      "RAG Agent": {
        "main": [
          [
            {
              "node": "Append Sheet",
              "type": "main",
              "index": 0
            }
          ]
        ],
        "onError": [
          [
            {
              "node": "Slack Alert",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "settings": {
      "executionOrder": "v1"
    },
    "triggerCount": 1
  },
];

export function EmailCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-600' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md'}`}
    >
      <Mail className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
      Email Automation
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {emailAutomationTemplates.length}
        </span>
      )}
    </button>
  );
}

export function EmailTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {emailAutomationTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">

          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-blue-50/50 dark:group-hover:to-blue-900/10 pointer-events-none transition-colors duration-500" />

          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>

          <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Mail className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>

          <button
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}