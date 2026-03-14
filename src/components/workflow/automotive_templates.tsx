import { Play, Car } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const automotiveTemplates: IN8nTemplate[] = [
  {
    name: "ADAS Event Annotator",
    nodes: [
      {
            "parameters": {
                  "content": "## ADAS Event Annotator",
                  "height": 520,
                  "width": 1100
            },
            "id": "d8b2d5dd-eec5-4be6-a731-db7610f15cda",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "adas_event_annotator"
            },
            "id": "b7650538-2b5e-4c0a-b76b-cafbe17c7379",
            "name": "Webhook",
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
            "id": "acf9f8f1-18a7-4252-9bbe-d790944659b7",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "d8155b88-15fa-4d24-8456-f17814229f46",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
            "typeVersion": 1,
            "position": [
                  100,
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
                  "indexName": "adas_event_annotator"
            },
            "id": "3b95c190-406c-4bab-ac90-b44c606862fd",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "adas_event_annotator"
            },
            "id": "6ec5ac90-10ad-437b-b0b6-38185d6e1f53",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Supabase"
            },
            "id": "5e7dffcb-ddb0-4336-8c7d-644c80bc91ac",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "b128a48a-6322-4e10-afd3-6cb388fb2ca6",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "77813cb8-5069-4cba-b329-8f24b3e680ef",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "2e95e6c3-34d2-4144-807e-6afca51a3e13",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "0e18d385-0727-47f8-8cc8-d4729e36782d",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Autonomous Vehicle Log Summarizer",
    nodes: [
      {
            "parameters": {
                  "content": "## Autonomous Vehicle Log Summarizer",
                  "height": 520,
                  "width": 1100
            },
            "id": "f9708b29-a07a-487d-b49a-bac5f4a8e782",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "autonomous_vehicle_log_summarizer"
            },
            "id": "306645e3-f44e-496b-82e3-89528a3cb018",
            "name": "Webhook",
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
            "id": "6ba3dfa0-ab28-4c67-963b-125237338956",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "b0d6400a-7163-41aa-a4da-49b73743afae",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsHuggingFace",
            "typeVersion": 1,
            "position": [
                  100,
                  0
            ],
            "credentials": {
                  "huggingFaceApi": {
                        "id": "HF_API",
                        "name": "HuggingFace"
                  }
            }
      },
      {
            "parameters": {
                  "mode": "insert",
                  "indexName": "autonomous_vehicle_log_summarizer"
            },
            "id": "fab62e3d-60f5-4030-b24f-79048c151155",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "autonomous_vehicle_log_summarizer"
            },
            "id": "21ae647f-f8c0-4836-a929-6288d7d3ea07",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Weaviate"
            },
            "id": "76f513e1-1d3d-4305-b49f-219caeff0bf1",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "8fa64e3e-f5b5-449b-8ff3-8340e32125e7",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "cf5c1179-cbb9-486c-b189-b3e224cda317",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "9c387136-e363-4810-8870-7389b629e889",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "7f29dacd-3994-48f9-923b-f1cdaef9b3c2",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Car Insurance Quote Generator",
    nodes: [
      {
            "parameters": {
                  "content": "## Car Insurance Quote Generator",
                  "height": 520,
                  "width": 1100
            },
            "id": "89ff71d5-b2e7-4a66-8acc-821b7f4ce91e",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "car_insurance_quote_generator"
            },
            "id": "168d9283-faee-4f7e-a134-f3bfc1294cf0",
            "name": "Webhook",
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
            "id": "155ee3a1-a300-46a2-bc8b-0218a56b0498",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "a8bf8d60-8ef2-4cc7-8b05-33f248e49e1f",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsHuggingFace",
            "typeVersion": 1,
            "position": [
                  100,
                  0
            ],
            "credentials": {
                  "huggingFaceApi": {
                        "id": "HF_API",
                        "name": "HuggingFace"
                  }
            }
      },
      {
            "parameters": {
                  "mode": "insert",
                  "indexName": "car_insurance_quote_generator"
            },
            "id": "cd9554af-fc27-42e3-9df0-e6fce15d4f14",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "car_insurance_quote_generator"
            },
            "id": "d87552ca-cc95-45b7-9e8e-4695b9a94dad",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Pinecone"
            },
            "id": "0ca4315b-ba75-4781-9fe4-9f84217a1031",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "5577f119-6005-4dd8-85f9-42ff72058e0c",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "1b8b3b4d-faa8-4150-9d4f-0413299c391d",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "86abc2bc-4caa-44f0-a502-b0ae8524911d",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "25d690be-7683-419e-b615-b4f10fc46518",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Connected Car Alert",
    nodes: [
      {
            "parameters": {
                  "content": "## Connected Car Alert",
                  "height": 520,
                  "width": 1100
            },
            "id": "e508bf37-1d29-46fb-9d2b-09fc09903dec",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "connected_car_alert"
            },
            "id": "5b5062a3-d8a9-41da-a687-2b830fbde108",
            "name": "Webhook",
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
            "id": "1e33aee3-41f1-4292-8498-658fea4f49f2",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "54f0918a-2f89-464b-9471-b54f1ef9a6c1",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "typeVersion": 1,
            "position": [
                  100,
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
                  "indexName": "connected_car_alert"
            },
            "id": "2aa86725-8272-4298-bd3c-33baaee4dd2e",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreRedis",
            "typeVersion": 1,
            "position": [
                  300,
                  0
            ],
            "credentials": {
                  "redisApi": {
                        "id": "REDIS_API",
                        "name": "Redis account"
                  }
            }
      },
      {
            "parameters": {
                  "indexName": "connected_car_alert"
            },
            "id": "1952da2b-e537-4846-bfda-c78a5a9481c9",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreRedis",
            "typeVersion": 1,
            "position": [
                  300,
                  -180
            ],
            "credentials": {
                  "redisApi": {
                        "id": "REDIS_API",
                        "name": "Redis account"
                  }
            }
      },
      {
            "parameters": {
                  "name": "Redis"
            },
            "id": "52207087-2724-4839-8455-1c7ad2f9664d",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "65b228b1-b9f6-4c9a-a2de-8122bf06a511",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "64c10477-4721-4bf3-bbfd-d9ba4d459302",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "50bb6eb4-0753-40b9-9969-8c54311a32a6",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "a7973fd2-bd62-414a-99fd-76f54b95a67b",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Dealer Lead Qualifier",
    nodes: [
      {
            "parameters": {
                  "content": "## Dealer Lead Qualifier",
                  "height": 520,
                  "width": 1100
            },
            "id": "10cea33a-c000-4e24-9f0d-2171b4677fc1",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "dealer_lead_qualifier"
            },
            "id": "6efd10a1-1894-49b8-86db-299fc884d2b0",
            "name": "Webhook",
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
            "id": "c3617701-6658-4f40-8050-b84d2f4b92a6",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "294923f9-1194-4e09-929f-0f65cfc40184",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
            "typeVersion": 1,
            "position": [
                  100,
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
                  "indexName": "dealer_lead_qualifier"
            },
            "id": "0e73daad-2242-453e-af1c-bd6d96acacd5",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "dealer_lead_qualifier"
            },
            "id": "0c18eeed-c8c9-4771-8495-1ad3c1724145",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Pinecone"
            },
            "id": "513fa07f-a331-473a-82d1-a5be5d7deedb",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "caa6f351-58ce-405d-98d8-24a036970942",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "fca8e004-a059-4362-bad5-1497d584cd69",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatHf",
            "typeVersion": 1,
            "position": [
                  480,
                  -340
            ],
            "credentials": {
                  "huggingFaceApi": {
                        "id": "HF_API",
                        "name": "HuggingFace"
                  }
            }
      },
      {
            "parameters": {
                  "promptType": "define",
                  "text": "={{ $json }}"
            },
            "id": "47f4542b-b789-4c81-99b2-3b44d5e19ba5",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "6879e7bb-3330-4068-b9a3-a568447e9a22",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "EV Battery Degradation Report",
    nodes: [
      {
            "parameters": {
                  "content": "## EV Battery Degradation Report",
                  "height": 520,
                  "width": 1100
            },
            "id": "92c42e02-8510-40a7-812a-1e1977b1a0ee",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "ev_battery_degradation_report"
            },
            "id": "3673f4d3-f755-4da3-a989-f73a24d9458c",
            "name": "Webhook",
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
            "id": "237228ff-e1ce-4dd2-810d-26b6a27ebfcb",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "97d79812-1e9e-443b-9f5c-8532436082cc",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
            "typeVersion": 1,
            "position": [
                  100,
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
                  "indexName": "ev_battery_degradation_report"
            },
            "id": "d59c7a2d-af7e-4752-a673-388d42eaaea1",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreRedis",
            "typeVersion": 1,
            "position": [
                  300,
                  0
            ],
            "credentials": {
                  "redisApi": {
                        "id": "REDIS_API",
                        "name": "Redis account"
                  }
            }
      },
      {
            "parameters": {
                  "indexName": "ev_battery_degradation_report"
            },
            "id": "c3337778-91bb-421b-881e-e5c90c6fa26e",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreRedis",
            "typeVersion": 1,
            "position": [
                  300,
                  -180
            ],
            "credentials": {
                  "redisApi": {
                        "id": "REDIS_API",
                        "name": "Redis account"
                  }
            }
      },
      {
            "parameters": {
                  "name": "Redis"
            },
            "id": "a3b3a77f-8cf8-4d08-b18d-685b140576a9",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "ac626ece-e1db-4620-8899-6f0558f4598f",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "a5f1e8ab-5994-436a-a2b6-0ccbf8153786",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "439a0f84-096a-4d10-a8c4-b919f7cedfed",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "c36303da-2313-4660-a78b-1db36ae3ea7e",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Fleet Fuel Efficiency Report",
    nodes: [
      {
            "parameters": {
                  "content": "## Fleet Fuel Efficiency Report",
                  "height": 520,
                  "width": 1100
            },
            "id": "80c93476-5b63-4243-94f3-de3e9edffc44",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "fleet_fuel_efficiency_report"
            },
            "id": "22ccad0a-ae97-4c60-a0c4-514047993d2d",
            "name": "Webhook",
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
            "id": "b9fab98c-4465-45eb-889e-c5b7d9c1f014",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "a777db21-1e21-4aa3-b7a8-3b975eda2f97",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsHuggingFace",
            "typeVersion": 1,
            "position": [
                  100,
                  0
            ],
            "credentials": {
                  "huggingFaceApi": {
                        "id": "HF_API",
                        "name": "HuggingFace"
                  }
            }
      },
      {
            "parameters": {
                  "mode": "insert",
                  "indexName": "fleet_fuel_efficiency_report"
            },
            "id": "870dab94-5dc3-4c03-9552-619966cf2443",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "fleet_fuel_efficiency_report"
            },
            "id": "e45aef9d-9c90-4887-a1c4-b28e5395b1ec",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreWeaviate",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Weaviate"
            },
            "id": "388e876a-5629-47b9-946e-91dfd93c9ba6",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "be428e1d-04e9-4356-a763-793b4b5c45fb",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "a9dc5065-784a-4f54-bc09-c68b9e2907b4",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "7729e1d0-81f6-462b-a34c-7636a61f650b",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "c20e8f05-4f9a-4f02-a0e2-76ca2d48e821",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Recall Notice Tracker",
    nodes: [
      {
            "parameters": {
                  "content": "## Recall Notice Tracker",
                  "height": 520,
                  "width": 1100
            },
            "id": "cabaeeae-138e-4bba-ad66-dc60b7bdcc67",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "recall_notice_tracker"
            },
            "id": "62d1a9b6-18e5-4359-aee8-16265d3e175c",
            "name": "Webhook",
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
            "id": "97ac992c-ece4-47bc-81d4-4e20c51eb129",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "07e8318a-41fc-4bd5-8b9a-42a189dcddff",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "typeVersion": 1,
            "position": [
                  100,
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
                  "indexName": "recall_notice_tracker"
            },
            "id": "38445783-55bd-4f33-aeb5-7d1a0764f213",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "recall_notice_tracker"
            },
            "id": "a71adc9a-d907-4df5-b013-891ba7a48b3c",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Pinecone"
            },
            "id": "a5f1c62f-0571-4c5d-b6f1-6737fb1ced90",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "ad0a4111-4d64-40b5-9c6c-011d3227cfab",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "f620de67-8533-417f-8d5b-875ac5447956",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "4890950f-b7ec-4ff3-85c9-5315e6a21713",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "24428616-20e0-4e79-a4b2-9d0c0e357b88",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Ride‑Share Surge Predictor",
    nodes: [
      {
            "parameters": {
                  "content": "## Ride‑Share Surge Predictor",
                  "height": 520,
                  "width": 1100
            },
            "id": "7222b61f-b1d0-40fb-860e-aeaf26ea912b",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "ride‑share_surge_predictor"
            },
            "id": "4ec2ed88-4a2c-40fa-bc2c-dda08c017360",
            "name": "Webhook",
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
            "id": "abb13c14-b10a-4342-9c04-8056507a00bf",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "02afbd9e-d321-4d50-bb43-d0fa1f1f0703",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsCohere",
            "typeVersion": 1,
            "position": [
                  100,
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
                  "indexName": "ride‑share_surge_predictor"
            },
            "id": "50e25b84-39de-4834-90bf-c53a7a6cff18",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "indexName": "ride‑share_surge_predictor"
            },
            "id": "4e092827-7e60-48ba-bd4f-53d1e7156691",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "typeVersion": 1,
            "position": [
                  300,
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
                  "name": "Supabase"
            },
            "id": "a33b8427-b94a-493e-92ce-0a80c90d71ab",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "120d49c6-3bb8-470c-a774-b70b8a967334",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "958f0356-b4b0-4423-ae38-74eadea35b4d",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "typeVersion": 1,
            "position": [
                  480,
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
                  "text": "={{ $json }}"
            },
            "id": "babe4dc2-d3bd-4101-9dca-fa1525130630",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "eb65c8b5-3bf2-4467-ac01-0238dd992025",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "VIN Decoder",
    nodes: [
      {
            "parameters": {
                  "content": "## VIN Decoder",
                  "height": 520,
                  "width": 1100
            },
            "id": "793bdb20-2ef2-43ac-bcb3-065bc1678e6f",
            "name": "Sticky",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -500,
                  -250
            ]
      },
      {
            "parameters": {
                  "httpMethod": "POST",
                  "path": "vin_decoder"
            },
            "id": "d4dd3e5e-8acb-4442-b5e2-4c4007671b19",
            "name": "Webhook",
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
            "id": "054255a7-df65-4031-b72a-102ea45a911e",
            "name": "Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  -100,
                  0
            ]
      },
      {
            "parameters": {
                  "model": "default"
            },
            "id": "6c43b82a-ec86-4ff3-ad0e-6f4af66c4b48",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsHuggingFace",
            "typeVersion": 1,
            "position": [
                  100,
                  0
            ],
            "credentials": {
                  "huggingFaceApi": {
                        "id": "HF_API",
                        "name": "HuggingFace"
                  }
            }
      },
      {
            "parameters": {
                  "mode": "insert",
                  "indexName": "vin_decoder"
            },
            "id": "562ee6e4-31b9-4f5a-b607-1e980533be6f",
            "name": "Insert",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreRedis",
            "typeVersion": 1,
            "position": [
                  300,
                  0
            ],
            "credentials": {
                  "redisApi": {
                        "id": "REDIS_API",
                        "name": "Redis account"
                  }
            }
      },
      {
            "parameters": {
                  "indexName": "vin_decoder"
            },
            "id": "650713b5-7617-4809-9a9f-f08b29398e68",
            "name": "Query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreRedis",
            "typeVersion": 1,
            "position": [
                  300,
                  -180
            ],
            "credentials": {
                  "redisApi": {
                        "id": "REDIS_API",
                        "name": "Redis account"
                  }
            }
      },
      {
            "parameters": {
                  "name": "Redis"
            },
            "id": "b51f852e-23ba-4e6a-8276-d17170435cff",
            "name": "Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  480,
                  -180
            ]
      },
      {
            "parameters": {},
            "id": "b7b36300-8fa6-4766-a9a3-f7a3c8edb38e",
            "name": "Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  480,
                  -40
            ]
      },
      {
            "parameters": {},
            "id": "0ad2d850-02d1-4adc-a968-b2eaff930334",
            "name": "Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatHf",
            "typeVersion": 1,
            "position": [
                  480,
                  -340
            ],
            "credentials": {
                  "huggingFaceApi": {
                        "id": "HF_API",
                        "name": "HuggingFace"
                  }
            }
      },
      {
            "parameters": {
                  "promptType": "define",
                  "text": "={{ $json }}"
            },
            "id": "3f3fe1b1-c730-466f-82b0-90244506d79f",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1,
            "position": [
                  760,
                  -40
            ]
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": "SHEET_ID",
                  "sheetName": "Log"
            },
            "id": "ed2e5eae-1ece-40ed-9f2a-005dbccd651d",
            "name": "Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4,
            "position": [
                  960,
                  -40
            ],
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "SHEETS_API",
                        "name": "Sheets"
                  }
            }
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Splitter",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Memory",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Splitter": {
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
                              "node": "Insert",
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
                              "node": "Insert",
                              "type": "ai_embedding",
                              "index": 0
                        },
                        {
                              "node": "Query",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Insert": {
            "ai_document": [
                  []
            ]
      },
      "Query": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
];

export function AutomotiveCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25 border border-rose-600' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700/50 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:border-rose-300 dark:hover:border-rose-600/50 hover:shadow-md'}`}
    >
      <Car className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-500 dark:text-rose-400'}`} />
      Automotive
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {automotiveTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function AutomotiveTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {automotiveTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-rose-50/50 dark:group-hover:to-rose-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-rose-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Car className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-rose-600 dark:hover:bg-rose-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
