import React from 'react';
import { Play, Cpu } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const iotTemplates: IN8nTemplate[] = [
  {
    name: "BLE Beacon Mapper",
    nodes: [
      {
            "parameters": {
                  "content": "## BLE Beacon Mapper",
                  "height": 520,
                  "width": 1100
            },
            "id": "3c047bdb-1988-40c3-9387-7f3cf850ecbf",
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
                  "path": "ble_beacon_mapper"
            },
            "id": "9521a2f4-988b-4356-a645-f74e96199d91",
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
            "id": "c93b923e-630f-4794-86bc-c6a46dd75448",
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
            "id": "427efd54-920f-4c11-bcb6-e8fc8b2b06e8",
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
                  "indexName": "ble_beacon_mapper"
            },
            "id": "72d8f04d-916a-4968-83ef-c59d3285235a",
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
                  "indexName": "ble_beacon_mapper"
            },
            "id": "ade1889a-c995-4adc-9729-80d02173f265",
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
            "id": "30a123d4-b21d-4078-8a9e-42cb0755f62f",
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
            "id": "690e6a80-9e31-43ee-b9df-a64412709646",
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
            "id": "8defd2b1-fc7d-4c45-a7ac-21535c4c9698",
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
            "id": "3202946a-2f52-4bae-bc6a-c0039a966396",
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
            "id": "b02fb6fe-bf01-46f4-a771-068e91eed04f",
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
    name: "Edge Device Log Compressor",
    nodes: [
      {
            "parameters": {
                  "content": "## Edge Device Log Compressor",
                  "height": 520,
                  "width": 1100
            },
            "id": "21a7ee40-e9a9-4f5d-a642-a4ca0bcd2173",
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
                  "path": "edge_device_log_compressor"
            },
            "id": "71b01e81-30c5-41a2-ade1-17d6f5d801ac",
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
            "id": "fb59524e-9794-4ce5-9344-48f41f93791f",
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
            "id": "6bc51683-3627-43ba-b92d-80f431f18471",
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
                  "indexName": "edge_device_log_compressor"
            },
            "id": "8c1ef0c2-1c1a-4dfb-a108-191146a74718",
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
                  "indexName": "edge_device_log_compressor"
            },
            "id": "0ebd5f21-b97f-4f2e-aefc-8b5bbe80f2b9",
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
            "id": "1fd3ed50-a888-40db-a2f7-1e7f3969ed11",
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
            "id": "dca087fe-c0c8-49d6-a6ba-cac29c1a705b",
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
            "id": "7b812666-e822-4f6e-9096-fe03376736a7",
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
            "id": "160f7edf-c21b-4e16-9ece-288aed8f04f1",
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
            "id": "77e495a4-073e-4594-b624-cedd0cf335e4",
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
    name: "Environmental Data Dashboard",
    nodes: [
      {
            "parameters": {
                  "content": "## Environmental Data Dashboard",
                  "height": 520,
                  "width": 1100
            },
            "id": "3205b068-2be2-41b8-8c68-dd13763c1ae5",
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
                  "path": "environmental_data_dashboard"
            },
            "id": "bc0a6e3d-4271-4dae-90ea-dca965836eea",
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
            "id": "38e51c92-e2e2-44c6-a049-4ac92e5a66e7",
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
            "id": "0077ebd2-9261-4d49-b438-55074c052c7e",
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
                  "indexName": "environmental_data_dashboard"
            },
            "id": "baa7b6a8-8fb1-414a-85a0-e3b37f4f6e61",
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
                  "indexName": "environmental_data_dashboard"
            },
            "id": "5e3a8e25-d4ba-41d3-9395-274cba83266b",
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
            "id": "934c019d-96b9-49f0-b82d-40732f8c2929",
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
            "id": "57841262-7445-43ec-8250-b14bb6ff4f85",
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
            "id": "6984dd15-9475-4307-a4dd-b105226a21c6",
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
            "id": "b33b5784-70d6-4be6-beba-907780cc638a",
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
            "id": "8da77c27-26fb-41af-bf1d-fd90703ebe0c",
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
    name: "Industrial IoT KPI Email",
    nodes: [
      {
            "parameters": {
                  "content": "## Industrial IoT KPI Email",
                  "height": 520,
                  "width": 1100
            },
            "id": "943b1bcf-e3db-4693-b7d6-fcd06a9b1ddc",
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
                  "path": "industrial_iot_kpi_email"
            },
            "id": "ed65e9c1-189a-451a-a353-86ae9e6fa985",
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
            "id": "3bb8b68e-b814-43fc-9236-f2e0615f43a1",
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
            "id": "65454d4a-94d6-4cd5-8b7d-52424158e0e4",
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
                  "indexName": "industrial_iot_kpi_email"
            },
            "id": "8a1213d2-7cce-42c4-9106-3e4838896c7b",
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
                  "indexName": "industrial_iot_kpi_email"
            },
            "id": "67f16894-cde9-4e15-96b2-4305dacb5184",
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
            "id": "96f6af1b-3417-44ee-a761-9b8ea00bed43",
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
            "id": "67cb649b-99d6-45f6-9278-7874202dbb04",
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
            "id": "2d8679dc-3e72-4b30-a3e4-33a991dad6fa",
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
            "id": "d1330858-7779-4352-b088-a8571b2556a4",
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
            "id": "dd69a3fa-4c57-4425-b609-1598a7583db9",
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
    name: "IoT Device Firmware Update Planner",
    nodes: [
      {
            "parameters": {
                  "content": "## IoT Device Firmware Update Planner",
                  "height": 520,
                  "width": 1100
            },
            "id": "f55f7659-b41d-4789-9858-cd6d8d9651d5",
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
                  "path": "iot_device_firmware_update_planner"
            },
            "id": "c39e47c8-e198-41e9-a7f6-108e475c70a9",
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
            "id": "1ecb126a-db25-4f0d-a8f6-fdf1004a6cc4",
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
            "id": "3b65e37b-20e8-4197-aa20-480c8e9fbef9",
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
                  "indexName": "iot_device_firmware_update_planner"
            },
            "id": "a1b9893a-4cc1-42b4-b042-2695d3aeb538",
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
                  "indexName": "iot_device_firmware_update_planner"
            },
            "id": "dfd60aa1-5c21-474d-89e0-79918ce5e7c8",
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
            "id": "4378f4fb-739d-4a63-a6f5-6f7c14d38e56",
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
            "id": "1585288e-aedd-48c1-bca4-5f34ae5b26d6",
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
            "id": "2a969ef6-359e-428c-a6bc-3484cf659355",
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
            "id": "4e224ecc-d3fc-4e5e-a233-a17f2ebd49e6",
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
            "id": "e78fdda8-9964-47cf-a22d-a20cb2731cb6",
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
    name: "MQTT Topic Monitor",
    nodes: [
      {
            "parameters": {
                  "content": "## MQTT Topic Monitor",
                  "height": 520,
                  "width": 1100
            },
            "id": "5491692b-63b3-463e-982f-ac8b2af8888a",
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
                  "path": "mqtt_topic_monitor"
            },
            "id": "67b89ca6-7381-4b63-be6a-a609764f40a8",
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
            "id": "642cab7e-89fd-484b-ba14-5a4955f68bad",
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
            "id": "20d6b7c2-8757-4487-88a2-9192c863320c",
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
                  "indexName": "mqtt_topic_monitor"
            },
            "id": "99a15bd4-8347-4415-9146-763365d9e53d",
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
                  "indexName": "mqtt_topic_monitor"
            },
            "id": "dd310d8e-19b5-46af-8fa4-80e08ba16414",
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
            "id": "ba010ae7-0e63-4b06-970a-838d7dc3b833",
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
            "id": "99da297c-57c7-469e-8c1a-2ef1c8e77464",
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
            "id": "e07b1578-30c7-41ca-9786-302b53b1da34",
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
            "id": "d6ba7bb2-c36d-4087-a1a7-8557ce2cbd57",
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
            "id": "a3b5ecb2-5cdd-495c-bd3f-f8fa00d5c15a",
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
    name: "Predictive Maintenance Alert",
    nodes: [
      {
            "parameters": {
                  "content": "## Predictive Maintenance Alert",
                  "height": 520,
                  "width": 1100
            },
            "id": "2e0e493a-869a-4247-969b-201fc42e19cf",
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
                  "path": "predictive_maintenance_alert"
            },
            "id": "f3fb69e8-a018-443e-9fc9-ab5f54df0198",
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
            "id": "975ab9e6-e924-4225-ad2f-ab71e063b744",
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
            "id": "2f19b9f0-eea2-41d7-af0c-7d40898f7369",
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
                  "indexName": "predictive_maintenance_alert"
            },
            "id": "d64985d8-e50e-4010-9511-534318b2fcb5",
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
                  "indexName": "predictive_maintenance_alert"
            },
            "id": "4bb2206e-2811-4ffd-a7d9-066dcab52bd0",
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
            "id": "fb950c91-9101-40dc-a975-e674cbd6d2f0",
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
            "id": "b7435da7-5ef7-4c2a-a024-6e97d698da8b",
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
            "id": "295cf4fb-3340-410b-879e-2bd1ef0a2233",
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
            "id": "0a77e315-a75c-460e-a902-33367c2983a7",
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
            "id": "f6f6a1fe-b857-45e7-a9f7-b0d9e5edac61",
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
    name: "Sensor Fault Detector",
    nodes: [
      {
            "parameters": {
                  "content": "## Sensor Fault Detector",
                  "height": 520,
                  "width": 1100
            },
            "id": "933fb344-a3db-465a-9180-9f742f470c01",
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
                  "path": "sensor_fault_detector"
            },
            "id": "62b1f78f-c8ce-4766-9164-3895a7d31588",
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
            "id": "ea4be8e1-da41-4042-b288-f27936963d59",
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
            "id": "e733728d-8780-43d1-a2d3-fa2a6362617e",
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
                  "indexName": "sensor_fault_detector"
            },
            "id": "299528ab-7894-4d2b-9f1f-cb820e0f98eb",
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
                  "indexName": "sensor_fault_detector"
            },
            "id": "cb7e2015-bcc4-4da4-80f2-f46b9b1b1775",
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
            "id": "b4a7d93d-22c8-4541-8af2-4ebc7b13c21d",
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
            "id": "d48bc886-eab1-434f-9e2a-6f1355c5624e",
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
            "id": "b6b37d40-7254-4a81-aa96-379f5dcbe314",
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
            "id": "d9dd3f66-e25b-49c4-b8e6-08bccdd8252a",
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
            "id": "1270cb5c-4b3d-4c8c-b55e-dab01d2c13bf",
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
    name: "Smart Home Energy Saver",
    nodes: [
      {
            "parameters": {
                  "content": "## Smart Home Energy Saver",
                  "height": 520,
                  "width": 1100
            },
            "id": "45bd46ac-74e0-4bbb-8325-f773e0dfea25",
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
                  "path": "smart_home_energy_saver"
            },
            "id": "87f961b3-05e1-4ee4-88a6-a144b2557efc",
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
            "id": "42425853-cd36-46a4-a210-d7e28e0e6eef",
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
            "id": "2c71e763-3236-4d24-9c31-e2fc6e5a5418",
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
                  "indexName": "smart_home_energy_saver"
            },
            "id": "1c3ee001-f218-4c0c-a5a5-ff2fae933778",
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
                  "indexName": "smart_home_energy_saver"
            },
            "id": "b7d0bc10-6b09-4a7a-8d16-f092a116f2a1",
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
            "id": "ef6500b2-66aa-4393-ad1a-fe20b5f34f00",
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
            "id": "ce595de2-4059-4bd4-9b3f-1a225cbd453f",
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
            "id": "5cd95ffd-f322-4c3b-b799-e6a9a8012ef1",
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
            "id": "b2e6ba7e-a99e-41d5-9471-b70f36c8080e",
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
            "id": "b7acd595-f3a0-46d7-ab7c-a9d18072e2cf",
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
    name: "Vehicle Telematics Analyzer",
    nodes: [
      {
            "parameters": {
                  "content": "## Vehicle Telematics Analyzer",
                  "height": 520,
                  "width": 1100
            },
            "id": "3a428bea-5b5d-418d-aea3-6702e195eaff",
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
                  "path": "vehicle_telematics_analyzer"
            },
            "id": "cc171ef1-366e-450c-b8c0-1f4be0cc100c",
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
            "id": "236b9d8a-fd92-4525-b6e3-89eceaee9826",
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
            "id": "49a5217e-b9dd-4c9d-a05e-e117cbc2f4a3",
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
                  "indexName": "vehicle_telematics_analyzer"
            },
            "id": "af19e123-7ee5-4628-88da-affa9ea417c9",
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
                  "indexName": "vehicle_telematics_analyzer"
            },
            "id": "d8b469f0-7927-4406-a3d7-c2695db16244",
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
            "id": "22c4c0d5-c147-4c3d-82db-7d48d8238bb1",
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
            "id": "5cd9b107-b5dc-4429-8fed-ef0dbeecd22d",
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
            "id": "17e82f20-81ce-4a16-826f-3021958e3c5b",
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
            "id": "b2493e79-03b0-446b-a21d-f6e80acfe401",
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
            "id": "b0e6955f-7d88-44f3-adae-41b5920328f0",
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

export function IotCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-600' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md'}`}
    >
      <Cpu className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
      IoT
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {iotTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function IotTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {iotTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-blue-50/50 dark:group-hover:to-blue-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-blue-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Cpu className="w-6 h-6" />
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
