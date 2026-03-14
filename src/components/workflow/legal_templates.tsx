import React from 'react';
import { Play, Scale } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const legalTemplates: IN8nTemplate[] = [
  {
    name: "Case Law Summarizer",
    nodes: [
      {
            "parameters": {
                  "content": "## Case Law Summarizer",
                  "height": 520,
                  "width": 1100
            },
            "id": "006b4ac8-2240-4377-8187-c75ea40decd4",
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
                  "path": "case_law_summarizer"
            },
            "id": "227c2cd5-dac0-4605-ad24-ece826a73ecd",
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
            "id": "0a8ac20a-08b4-42d4-b262-d5ff3c038f00",
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
            "id": "63a3c905-3d2c-4abe-bf0f-495545792f87",
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
                  "indexName": "case_law_summarizer"
            },
            "id": "892173fb-f931-44d9-9e1e-134c71ec790e",
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
                  "indexName": "case_law_summarizer"
            },
            "id": "4f1f0bf3-db65-4714-9f4a-da40a9e379dc",
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
            "id": "d5912b1d-60d5-4b91-851a-915fb49b1ae9",
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
            "id": "b7fd299a-99b0-4ae0-bda0-fc77583f869e",
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
            "id": "16c7cd0f-ad11-4869-940e-13d321d445b5",
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
            "id": "e5198aee-0eeb-40dc-9b5b-113a423049dc",
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
            "id": "fc62655e-9611-4eba-a44e-63f56903c218",
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
    name: "Compliance Checklist Builder",
    nodes: [
      {
            "parameters": {
                  "content": "## Compliance Checklist Builder",
                  "height": 520,
                  "width": 1100
            },
            "id": "ab247f10-1d2f-4ac7-9f3c-f35aa6a45322",
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
                  "path": "compliance_checklist_builder"
            },
            "id": "7ef9aaea-8153-4413-a674-f681a326ffb1",
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
            "id": "4ff381cb-094c-42ce-82a3-8f611f2968d5",
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
            "id": "61a3b700-34fc-48d7-a048-98a0c35a4a62",
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
                  "indexName": "compliance_checklist_builder"
            },
            "id": "2b5fa4fa-460b-4adf-8f51-43d891442d08",
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
                  "indexName": "compliance_checklist_builder"
            },
            "id": "37fe1e14-70a0-48a0-ba7c-eb3187ecd42a",
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
            "id": "e5e90acd-e873-4d68-b864-8854563e2d25",
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
            "id": "43595b29-5265-416c-9c15-c2e3d411dbea",
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
            "id": "89461d4a-bd10-4f14-97f4-182053640dee",
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
            "id": "a14a872e-78ef-43f2-afd1-cad697bf4b53",
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
            "id": "4719e718-aaba-4e5a-9592-e6e3d702af12",
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
    name: "Contract Clause Extractor",
    nodes: [
      {
            "parameters": {
                  "content": "## Contract Clause Extractor",
                  "height": 520,
                  "width": 1100
            },
            "id": "1bda7454-93fe-405b-a456-4586cfb756ed",
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
                  "path": "contract_clause_extractor"
            },
            "id": "566f27e4-26bb-466c-9503-4fadf291f227",
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
            "id": "f1c5db12-a8f8-4d23-b50e-8e4b31142ece",
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
            "id": "78647328-096a-40e6-875d-764a277977a8",
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
                  "indexName": "contract_clause_extractor"
            },
            "id": "3fb26948-57ed-496b-91e3-c65592ea2fd6",
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
                  "indexName": "contract_clause_extractor"
            },
            "id": "828831c5-57b6-4c94-8eb0-4086a2c07f90",
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
            "id": "34820e0b-bb70-4098-9ed0-36ae1a8ac092",
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
            "id": "4032a3d8-27c9-44a4-a0c2-a4be30e15375",
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
            "id": "8533ad0d-28c1-4549-8347-243f4dc1f4e2",
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
            "id": "8326aa20-f9e9-4ac2-8a4e-618d54a8d415",
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
            "id": "96b4b7cd-7fb8-459b-acd4-55f0ebf6a431",
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
    name: "Court Date Reminder",
    nodes: [
      {
            "parameters": {
                  "content": "## Court Date Reminder",
                  "height": 520,
                  "width": 1100
            },
            "id": "75f8bba3-cdac-49f4-958c-091e3f00eff1",
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
                  "path": "court_date_reminder"
            },
            "id": "800a0793-5176-474b-9409-46e9ed2335fd",
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
            "id": "d523e39f-0587-4194-bcbe-73d7fb8c4710",
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
            "id": "e223a14f-cfa8-4596-a461-643f82d535a0",
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
                  "indexName": "court_date_reminder"
            },
            "id": "0eb906db-e355-47b9-a187-23abd759ec4f",
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
                  "indexName": "court_date_reminder"
            },
            "id": "5790086f-eb04-4057-a244-673d5c82b0b1",
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
            "id": "59f47e52-aa3b-4fb2-aeeb-fad955199e01",
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
            "id": "a447e312-fdfb-4dba-ad30-1c769b7bb5f9",
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
            "id": "0a4d9093-4b14-4d71-b2ef-4c77ede6ba67",
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
            "id": "36483213-c958-44c1-bbe8-c6ff0190cdea",
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
            "id": "3ca8afea-ed24-4c79-ab93-2a66559c5c73",
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
    name: "GDPR Violation Alert",
    nodes: [
      {
            "parameters": {
                  "content": "## GDPR Violation Alert",
                  "height": 520,
                  "width": 1100
            },
            "id": "13db2523-d8a9-418a-8fb6-39eb8f9a938c",
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
                  "path": "gdpr_violation_alert"
            },
            "id": "700b2651-7de4-44d3-8edd-1ba1715d75d0",
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
            "id": "162820ba-9f6b-44fd-b643-702de3b24640",
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
            "id": "01048ba2-ede5-441f-8a1a-5ab9b671c55f",
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
                  "indexName": "gdpr_violation_alert"
            },
            "id": "f2328451-15d8-4966-8e9f-e24b3c94281f",
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
                  "indexName": "gdpr_violation_alert"
            },
            "id": "09b39daa-8057-4fc5-8b76-217e606d2821",
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
            "id": "6cf4aad3-8e0c-4198-8770-94ac862b4a63",
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
            "id": "c27394be-9f34-4a0d-84c0-e1b1b3391dfe",
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
            "id": "53ea4a74-a3ad-422a-9e1b-8318187645b4",
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
            "id": "3e48de94-a0c7-46e0-834c-d4b1db1bbb10",
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
            "id": "2b80ceef-994a-48fc-af35-9cf75d38d5d1",
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
    name: "Legal Billing Analyzer",
    nodes: [
      {
            "parameters": {
                  "content": "## Legal Billing Analyzer",
                  "height": 520,
                  "width": 1100
            },
            "id": "164bdbf2-41c3-45eb-bfd1-e9883575056e",
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
                  "path": "legal_billing_analyzer"
            },
            "id": "b38e9cdd-f84d-4437-a795-a121d7068aa4",
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
            "id": "db367606-6d33-40f8-b444-abae8a3ca3b7",
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
            "id": "20005f64-43e7-418c-b554-217fdc33f783",
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
                  "indexName": "legal_billing_analyzer"
            },
            "id": "83ab1232-057a-4364-8701-61de2cadcfb8",
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
                  "indexName": "legal_billing_analyzer"
            },
            "id": "c0ee51c0-13ff-44e1-91de-c8135ba8adf5",
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
            "id": "cdd3e489-ceff-4005-b0d4-0fae7cd7cd9c",
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
            "id": "d8954456-98d8-4689-9f12-d0f106406d93",
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
            "id": "d60d4651-1d00-44cd-ac40-70097cb4dcf9",
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
            "id": "243ea0c7-fbab-4686-8610-7c20d1be90d9",
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
            "id": "b52301e6-4650-4333-a9fd-d73d845f494c",
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
    name: "NDA Risk Detector",
    nodes: [
      {
            "parameters": {
                  "content": "## NDA Risk Detector",
                  "height": 520,
                  "width": 1100
            },
            "id": "623f0f39-6ae9-4fbe-8d0d-b3436dc257e3",
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
                  "path": "nda_risk_detector"
            },
            "id": "e49461a4-0769-4188-9b92-fe21b42df652",
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
            "id": "75634d4b-5829-40eb-b94f-39a3cec62398",
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
            "id": "505940aa-8b4b-4480-9cb8-827413127240",
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
                  "indexName": "nda_risk_detector"
            },
            "id": "f587ee36-1078-43d2-bcc4-8b5cf712ec14",
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
                  "indexName": "nda_risk_detector"
            },
            "id": "bcd0263d-70e7-4448-a03b-5dbf2219334e",
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
            "id": "1e08d4d4-07eb-49c4-ac96-9a218e63e8ea",
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
            "id": "5d54e2b7-2cac-4be6-8f88-0eef2bc8981e",
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
            "id": "61ac3b74-d520-4777-a88c-0e5bea059266",
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
            "id": "d0996ab0-d491-47b1-87b5-9746bd8177e6",
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
            "id": "e32daeb2-39e5-4b1b-bf51-f8995831e076",
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
    name: "Patent Abstract Summarizer",
    nodes: [
      {
            "parameters": {
                  "content": "## Patent Abstract Summarizer",
                  "height": 520,
                  "width": 1100
            },
            "id": "c46b424b-d86e-4c42-a5a7-3655c7402881",
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
                  "path": "patent_abstract_summarizer"
            },
            "id": "c3f0c87c-f25d-48ba-97b0-c8f8d23d4a31",
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
            "id": "eb7d7959-2c75-4bca-aab6-744235f38650",
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
            "id": "978d6786-ee2b-453f-8da7-49ead3bc09b5",
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
                  "indexName": "patent_abstract_summarizer"
            },
            "id": "b81e39e9-dacc-42d8-81ee-aa51b860be8f",
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
                  "indexName": "patent_abstract_summarizer"
            },
            "id": "63f9c0ae-b4d2-4d73-a80a-7585608eec23",
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
            "id": "a2dd0f08-fa8f-4188-96fb-531000f5e12f",
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
            "id": "3815af2a-00a6-4f4a-9736-933be6e8da1c",
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
            "id": "5a852eb7-f25a-454c-8599-8bd711420cc2",
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
            "id": "dcfd6e97-44c3-41af-ada9-effc257a4547",
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
            "id": "607bbfe5-07e3-4ba7-a726-c8115e464868",
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
    name: "Privacy Policy Generator",
    nodes: [
      {
            "parameters": {
                  "content": "## Privacy Policy Generator",
                  "height": 520,
                  "width": 1100
            },
            "id": "31e645b0-8ee3-40e8-a573-1040118a5143",
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
                  "path": "privacy_policy_generator"
            },
            "id": "3e941cdf-4a90-4efa-af28-ec642a8f8a87",
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
            "id": "81a454cd-5ab3-401e-a2b7-cead2a15a4bb",
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
            "id": "b71432b3-21ba-4306-8001-a31e0af001c7",
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
                  "indexName": "privacy_policy_generator"
            },
            "id": "777057ee-9417-482e-99a0-2a776c2f7d8c",
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
                  "indexName": "privacy_policy_generator"
            },
            "id": "8a41fc40-5104-4dc9-8135-e5df98abc240",
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
            "id": "6a80f6a1-9344-4f08-8f21-b3840154a068",
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
            "id": "9c06dcd4-2ae2-4a35-8d5c-c97bcd5fee44",
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
            "id": "40b92744-a890-48d4-bc8d-812a3307b0b9",
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
            "id": "5057fff9-4817-4b2c-81ce-6fa38eb239e5",
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
            "id": "fc4d57c7-5ed2-45ac-85c6-a3ef52307eb6",
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
    name: "Trademark Status Monitor",
    nodes: [
      {
            "parameters": {
                  "content": "## Trademark Status Monitor",
                  "height": 520,
                  "width": 1100
            },
            "id": "998e7582-8d6b-490b-bc4e-d54e4a9c41f5",
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
                  "path": "trademark_status_monitor"
            },
            "id": "864d897b-1356-48d5-88d5-5b92c9665383",
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
            "id": "27b13a4c-dcfc-4994-a7bd-7855d79122df",
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
            "id": "b7b766a7-90f0-4bd7-8d72-8b9e1c16cefd",
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
                  "indexName": "trademark_status_monitor"
            },
            "id": "83fd04e1-05d8-4af0-a3e7-37c317475f44",
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
                  "indexName": "trademark_status_monitor"
            },
            "id": "3a5c2851-baa5-4f08-a9c6-8c2a4f991fb0",
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
            "id": "1695a6cf-a47c-40cb-ab04-3900b9178759",
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
            "id": "98484ada-e60c-4ce9-806f-18033f24a073",
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
            "id": "4a6adf35-41a8-4aa1-b2cc-9e4bec883092",
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
            "id": "355afdb1-5e4f-4a38-a554-ae2196d3336e",
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
            "id": "833c5c4d-7e71-4721-b9a3-2e9cef344d79",
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

export function LegalCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-stone-600 text-white shadow-lg shadow-stone-500/25 border border-stone-600' : 'bg-stone-50 dark:bg-stone-500/10 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-500/20 hover:border-stone-300 dark:hover:border-stone-600/50 hover:shadow-md'}`}
    >
      <Scale className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`} />
      Legal Tech
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {legalTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function LegalTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {legalTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-stone-50/50 dark:group-hover:to-stone-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-stone-500 to-stone-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-stone-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Scale className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-stone-600 dark:hover:bg-stone-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
