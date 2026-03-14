import React from 'react';
import { Play, Lightbulb } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const energyTemplates: IN8nTemplate[] = [
  {
    name: "Battery Health Monitor",
    nodes: [
      {
            "parameters": {
                  "content": "## Battery Health Monitor",
                  "height": 520,
                  "width": 1100
            },
            "id": "8e490880-8ec5-4833-87b2-675e5774a36e",
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
                  "path": "battery_health_monitor"
            },
            "id": "eae8288b-f1c3-4b83-acf0-733e84ee8f1c",
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
            "id": "9839c629-fadc-4560-9db3-f3d4f3434b98",
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
            "id": "a3f4a4c9-f7f1-41e0-9647-c1f3a98f2aab",
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
                  "indexName": "battery_health_monitor"
            },
            "id": "f712aa1b-a9c2-4cff-a74c-c60a3839c172",
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
                  "indexName": "battery_health_monitor"
            },
            "id": "0211e7eb-acd7-4d06-bf54-d86f8f9d2384",
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
            "id": "f0bb0826-cf8d-4585-ad2f-0fd09e9d7bc7",
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
            "id": "30239060-9fc8-49ba-a0f4-a1b7b06d0bee",
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
            "id": "286ce6ac-cc15-4c15-a5d9-c29d36b79eca",
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
            "id": "983b0f02-ff0a-497b-b0da-9152f7e4d142",
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
            "id": "b549d047-5e96-4c29-8884-1dfad8414857",
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
    name: "Carbon Footprint Estimator",
    nodes: [
      {
            "parameters": {
                  "content": "## Carbon Footprint Estimator",
                  "height": 520,
                  "width": 1100
            },
            "id": "359249c4-cae3-4ea7-8be6-1ca93d1025ce",
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
                  "path": "carbon_footprint_estimator"
            },
            "id": "d82d5ffc-e2ce-429a-a497-ef3efc2dbc65",
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
            "id": "98755918-b327-4da0-b94c-2748cd224b00",
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
            "id": "af35c17c-cef7-4552-9982-9dd4eb6588af",
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
                  "indexName": "carbon_footprint_estimator"
            },
            "id": "793b06f3-d60d-4ac8-bf41-43a6ec9afc9d",
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
                  "indexName": "carbon_footprint_estimator"
            },
            "id": "88900446-1262-4aca-aee2-74a92a01382d",
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
            "id": "46dcb071-d2c2-4ba5-b8ab-22ab7c75eb90",
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
            "id": "dd965359-b1af-45c3-b3d8-c016b381756d",
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
            "id": "d6794330-4dda-4b04-9b11-21ea1af000db",
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
            "id": "1058e490-9641-48a3-9b4b-a9ee9b0b6c79",
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
            "id": "61ac47fc-20af-427c-9db9-ba70c87e527a",
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
    name: "Energy Consumption Anomaly Detector",
    nodes: [
      {
            "parameters": {
                  "content": "## Energy Consumption Anomaly Detector",
                  "height": 520,
                  "width": 1100
            },
            "id": "c18e4640-3b84-4bab-98bc-b70a65723764",
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
                  "path": "energy_consumption_anomaly_detector"
            },
            "id": "a84f44ec-e5cc-4b7b-9dc4-c2bebc16b9f2",
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
            "id": "196995f4-370f-4e85-863b-56e9ef67e1e8",
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
            "id": "f345618c-ec83-448a-90e5-7166941a3f47",
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
                  "indexName": "energy_consumption_anomaly_detector"
            },
            "id": "5236bb9d-9a5f-4f96-8512-860b5019bf90",
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
                  "indexName": "energy_consumption_anomaly_detector"
            },
            "id": "5b4e4dd7-4d72-4134-86ee-ed3309aca576",
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
            "id": "c84c0fd1-c002-48ef-b6ab-24aec0a29b06",
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
            "id": "b9bf45c2-d96c-48ce-b18d-8abfd8cc0c86",
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
            "id": "b1bd3b76-00d8-418c-8d7c-e13bad3e0963",
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
            "id": "9616d716-66ef-4bc2-9274-8312cd5210bd",
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
            "id": "2ac39712-36a7-451e-98ed-682294bada65",
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
    name: "EV Charging Station Locator",
    nodes: [
      {
            "parameters": {
                  "content": "## EV Charging Station Locator",
                  "height": 520,
                  "width": 1100
            },
            "id": "b3d4e2ca-a0ca-48a4-a2a6-54ba5cb6d5f1",
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
                  "path": "ev_charging_station_locator"
            },
            "id": "331111b2-83e7-49e1-ae03-21851b592936",
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
            "id": "9441a6d8-459c-456c-b62f-52bf6595a720",
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
            "id": "f9c8224f-a498-407d-ac3d-cee3816a0f4c",
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
                  "indexName": "ev_charging_station_locator"
            },
            "id": "1b6ee4f1-cf7b-492f-a8ea-fe1b9e084b74",
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
                  "indexName": "ev_charging_station_locator"
            },
            "id": "e0429913-bd7f-44af-ba35-ee3d32a49129",
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
            "id": "6b629abb-0f22-448a-b656-80edf826de4b",
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
            "id": "2f4424ae-ed8a-4346-900c-6f1f690a9652",
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
            "id": "0e420653-fd49-4fd1-9005-911ece7931b8",
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
            "id": "25da7439-d468-436e-806d-2ab825ea64db",
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
            "id": "b88fad4c-d1ca-40e7-93c9-647cf7530eba",
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
    name: "Fuel Price Monitor",
    nodes: [
      {
            "parameters": {
                  "content": "## Fuel Price Monitor",
                  "height": 520,
                  "width": 1100
            },
            "id": "212807c8-eb78-4896-abde-d45490bc8162",
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
                  "path": "fuel_price_monitor"
            },
            "id": "f007a66b-9a09-4015-bd12-c4372f2a09b7",
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
            "id": "f6d6d176-6a82-4a81-ad07-3d8a6f966bd6",
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
            "id": "a659d2db-9e31-4109-870d-18aa02ff430b",
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
                  "indexName": "fuel_price_monitor"
            },
            "id": "8f5a00ab-f203-44a7-a0e7-cda4c826ff4d",
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
                  "indexName": "fuel_price_monitor"
            },
            "id": "302ed335-a570-49eb-a5ce-018d5d278b30",
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
            "id": "c7d97d40-d00b-4728-8d15-09e1b67f8798",
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
            "id": "6e671170-08ee-4230-a79f-180b8127e72c",
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
            "id": "a84861c3-3108-4fcd-91e5-f5299311896e",
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
            "id": "00ca9897-6615-42bc-b95e-eff519ad11bc",
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
            "id": "3ccbfc3c-1b58-4f3d-bf24-5798c423f9d1",
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
    name: "Grid Load Alert",
    nodes: [
      {
            "parameters": {
                  "content": "## Grid Load Alert",
                  "height": 520,
                  "width": 1100
            },
            "id": "e7633ef7-2eb6-47c4-a3e3-366da7a646d1",
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
                  "path": "grid_load_alert"
            },
            "id": "b37be8c1-831f-44f5-8b55-28a9702cc37a",
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
            "id": "571fcb73-1c33-4ee5-aeab-2204465da37e",
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
            "id": "227d83d6-1a6b-4db0-a46b-ced721ae7904",
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
                  "indexName": "grid_load_alert"
            },
            "id": "4ddc60fe-82e9-4b8d-ac82-de244497fba8",
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
                  "indexName": "grid_load_alert"
            },
            "id": "cbef5dd2-7feb-44d4-b205-69146c7d47e7",
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
            "id": "61819858-5fd7-4406-914c-351e3352f360",
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
            "id": "6bd0a1fe-d0c2-4cff-acba-9bed55adc915",
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
            "id": "3a6f67e2-b81c-4aa7-b51e-8c25061dac3a",
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
            "id": "2fcc10dd-5bc4-4c74-bc5f-f00a6435a321",
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
            "id": "8a65e4e9-e2d4-410f-bd42-ac50a8e54c8c",
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
    name: "Power Outage SMS",
    nodes: [
      {
            "parameters": {
                  "content": "## Power Outage SMS",
                  "height": 520,
                  "width": 1100
            },
            "id": "05625788-4196-4761-8f3f-1d225d696bfd",
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
                  "path": "power_outage_sms"
            },
            "id": "9d7f9871-1a5f-49ff-97a3-56e523b40934",
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
            "id": "2e3dd33d-75fe-4c3b-8a3d-685e8ae2dafc",
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
            "id": "d11df096-a57a-4369-bbcc-a3131f204a4f",
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
                  "indexName": "power_outage_sms"
            },
            "id": "64a28761-d24c-4d6d-8e62-d89d283f4c5c",
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
                  "indexName": "power_outage_sms"
            },
            "id": "16248ce3-1009-41f2-a192-54f336f8c5e1",
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
            "id": "4866877c-7200-4d47-93d2-3a63e22a5781",
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
            "id": "e233dea2-2f3c-4f1c-af92-c66076fbcfdf",
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
            "id": "421534dc-7b0a-4f34-97ec-86def7643e00",
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
            "id": "426a8449-96f9-402a-96b1-0737ca4f6673",
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
            "id": "d4be02b3-2423-4009-8d78-982e5821ba13",
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
    name: "Renewable Incentive Tracker",
    nodes: [
      {
            "parameters": {
                  "content": "## Renewable Incentive Tracker",
                  "height": 520,
                  "width": 1100
            },
            "id": "f1933d66-47b0-47ae-97bd-9758c0fc67da",
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
                  "path": "renewable_incentive_tracker"
            },
            "id": "d9b07644-9ed1-4ef6-a1a8-bef841c713df",
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
            "id": "2e3b51db-80b1-423f-a678-77b92f51744d",
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
            "id": "f3262437-ea70-44d2-91d2-82bb3f1317e9",
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
                  "indexName": "renewable_incentive_tracker"
            },
            "id": "6be2eab5-54fb-4e38-941f-e62239677943",
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
                  "indexName": "renewable_incentive_tracker"
            },
            "id": "43557f2e-e085-48ba-9bde-2af079657529",
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
            "id": "6f1095a2-b123-41af-b597-349dee988a2b",
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
            "id": "696d20f9-bb8f-4efe-830b-0d1eec4b47d6",
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
            "id": "c16f6c5a-4cb2-4fdb-a5e8-539b517974af",
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
            "id": "ddea133c-b2ff-4a7b-8483-b1b9c002bedf",
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
            "id": "0085ea5e-4ea5-4f90-b541-3deaa4c2bb2e",
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
    name: "Solar Output Forecaster",
    nodes: [
      {
            "parameters": {
                  "content": "## Solar Output Forecaster",
                  "height": 520,
                  "width": 1100
            },
            "id": "0cc41add-c576-4eb2-a577-ba341538b4aa",
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
                  "path": "solar_output_forecaster"
            },
            "id": "7a6895ad-c973-4829-abb3-52764e18563e",
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
            "id": "4ab8e749-2da3-4702-aa03-92781f013c88",
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
            "id": "2861dfd6-4500-4e90-b346-e67aefc38723",
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
                  "indexName": "solar_output_forecaster"
            },
            "id": "bf0938ce-55ad-4563-b3ec-dbf0a747004f",
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
                  "indexName": "solar_output_forecaster"
            },
            "id": "b3bb38c2-2d38-4938-be90-9a9adfe1918a",
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
            "id": "184775d4-7184-4c41-b8de-cc8c402c57c8",
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
            "id": "ac64a220-22bf-4f5e-a59b-20b19efb0869",
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
            "id": "287861be-36e0-4424-9971-44020897bd2e",
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
            "id": "ea57fd07-1636-4dc0-835e-904f6952caad",
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
            "id": "3d0a2489-f2f0-4787-8548-4f040a5836c6",
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
    name: "Wind Farm Maintenance Scheduler",
    nodes: [
      {
            "parameters": {
                  "content": "## Wind Farm Maintenance Scheduler",
                  "height": 520,
                  "width": 1100
            },
            "id": "9c8f8a11-cc71-43f1-a71b-db88184ff09c",
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
                  "path": "wind_farm_maintenance_scheduler"
            },
            "id": "e2a690b3-9bf8-4e9c-82aa-ee390f53f58d",
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
            "id": "9c9b29ed-2898-4035-b7e1-51e6772de2a3",
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
            "id": "1820f73b-76d4-4597-9ee9-7188a2c45ce7",
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
                  "indexName": "wind_farm_maintenance_scheduler"
            },
            "id": "579a5cc0-4687-4d99-b379-9fd6085db105",
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
                  "indexName": "wind_farm_maintenance_scheduler"
            },
            "id": "1100222d-8cb0-402a-a726-b6a77b6bdbd8",
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
            "id": "d256077f-23e0-4b0a-a15d-c37b724380e4",
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
            "id": "59b38520-1e17-48a4-8a07-d829d76594ef",
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
            "id": "78e9d735-34a8-4562-9173-75df6f9d105d",
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
            "id": "db27c3e8-2164-4105-8900-03356d4bada3",
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
            "id": "d8018a30-fafb-4134-9c5f-fa3dcbe84fab",
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

export function EnergyCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/25 border border-yellow-600' : 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/50 hover:bg-yellow-100 dark:hover:bg-yellow-500/20 hover:border-yellow-300 dark:hover:border-yellow-600/50 hover:shadow-md'}`}
    >
      <Lightbulb className={`w-4 h-4 ${isActive ? 'text-white' : 'text-yellow-500 dark:text-yellow-400'}`} />
      Energy
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {energyTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function EnergyTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {energyTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-yellow-300 dark:hover:border-yellow-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-yellow-50/50 dark:group-hover:to-yellow-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-yellow-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Lightbulb className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-yellow-600 dark:hover:bg-yellow-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
