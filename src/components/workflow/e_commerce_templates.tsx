import { Play, ShoppingCart } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const eCommerceTemplates: IN8nTemplate[] = [
  {
    name: "Abandoned Cart Email",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Abandoned Cart Email",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "1f91297f-f9dc-49bc-8f96-92814dff32be",
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
                  "path": "abandoned-cart-email"
            },
            "id": "b0c4f170-934e-4434-abbe-6342cd9edc36",
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
            "id": "f706155b-01d6-49fb-940f-bc1d7f858569",
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
            "id": "593f3c9c-58fa-4f29-8a3a-8745c7ff7fbf",
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
                  "indexName": "abandoned_cart_email"
            },
            "id": "a7f02c99-3494-4acd-b70e-cd3cca069599",
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
                  "indexName": "abandoned_cart_email"
            },
            "id": "fb8320a7-7433-4329-b54c-f696059b14b7",
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
            "id": "558a9d97-652b-4e88-bd35-5ed2085625d3",
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
            "id": "8dce5c28-4831-448c-a578-9e970cf68744",
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
            "id": "fba89352-184f-4f77-8b83-958a9c0715f3",
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
                  "text": "Process the following data for task 'Abandoned Cart Email':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Abandoned Cart Email"
                  }
            },
            "id": "6ade5738-8ced-40e6-8a24-501cca90ab49",
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
                        "cachedResultName": "Abandoned Cart Email"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "Log",
                        "mode": "list",
                        "cachedResultName": "Log"
                  },
                  "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                              "Status": "={{$json[\"RAG Agent\"].text}}"
                        },
                        "schema": []
                  }
            },
            "id": "f7cf072c-e32b-4c38-89f0-79584144fd5b",
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
                  "text": "Abandoned Cart Email error: {$json.error.message}"
            },
            "id": "76275d42-14ed-4e55-aaf8-bd1557c263c9",
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
    connections: {
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
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Inventory Slack Alert",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Inventory Slack Alert",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "fd1368bd-bfe5-41c8-956a-7157c20474a6",
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
                  "path": "inventory-slack-alert"
            },
            "id": "d44d9365-6e28-403e-9ead-123bfa06de69",
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
            "id": "075a1773-e19a-4f6d-8898-76b4c9b0db8d",
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
            "id": "f7806342-0e9e-4004-a06d-4f02929951ec",
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
                        "value": "inventory_slack_alert",
                        "mode": "list",
                        "cachedResultName": "inventory_slack_alert"
                  }
            },
            "id": "18b389fd-f2bf-45f4-9042-089f27ecac65",
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
                        "value": "inventory_slack_alert",
                        "mode": "list",
                        "cachedResultName": "inventory_slack_alert"
                  }
            },
            "id": "da362152-0424-43bf-a373-a683f53e4a75",
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
            "id": "23c62312-3faa-4526-9e41-d4a9a9384d3c",
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
            "id": "f1af3590-a114-4b63-897a-8961b4c9f97a",
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
            "id": "03e57d37-e504-4a9b-8a33-6a82c93485cb",
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
                  "text": "Process the following data for task 'Inventory Slack Alert':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Inventory Slack Alert"
                  }
            },
            "id": "5966c068-4e76-4c29-9a7a-7594639ef53a",
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
                        "cachedResultName": "Inventory Slack Alert"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "Log",
                        "mode": "list",
                        "cachedResultName": "Log"
                  },
                  "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                              "Status": "={{$json[\"RAG Agent\"].text}}"
                        },
                        "schema": []
                  }
            },
            "id": "247d117f-7c88-4f0f-8dd3-53aa6b0a84e0",
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
                  "text": "Inventory Slack Alert error: {$json.error.message}"
            },
            "id": "c8395d01-4d77-47bb-a940-f6b4ec9e598f",
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
    connections: {
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
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Shopify Order SMS",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Shopify Order SMS",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "43d4baf6-302b-4141-a67e-df7df86b03e0",
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
                  "path": "shopify-order-sms"
            },
            "id": "65c17543-498e-443e-993c-02af712d566e",
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
            "id": "d091bc86-264b-441f-aca1-21f14aa3022d",
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
            "id": "ae0788c7-71b3-4c14-9260-eb37e7f0a9ff",
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
                        "value": "shopify_order_sms",
                        "mode": "list",
                        "cachedResultName": "shopify_order_sms"
                  }
            },
            "id": "a9decd23-8efc-4c95-b1b0-839196ed3520",
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
                        "value": "shopify_order_sms",
                        "mode": "list",
                        "cachedResultName": "shopify_order_sms"
                  }
            },
            "id": "54495b0b-370e-46a9-b5b5-2d9d0162b40d",
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
            "id": "6a98c770-fb1e-4c32-a97a-725116bafec5",
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
            "id": "cf97460a-684b-4fb9-a722-05a7ff26bb97",
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
            "id": "1d87e1f1-30c0-43e9-9d50-bbf5aa676ae7",
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
                  "text": "Process the following data for task 'Shopify Order SMS':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Shopify Order SMS"
                  }
            },
            "id": "16053bc3-704a-4649-8088-8af634649f2b",
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
                        "cachedResultName": "Shopify Order SMS"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "Log",
                        "mode": "list",
                        "cachedResultName": "Log"
                  },
                  "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                              "Status": "={{$json[\"RAG Agent\"].text}}"
                        },
                        "schema": []
                  }
            },
            "id": "80e6c213-6f3e-4d15-9539-c4999aee3d0e",
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
                  "text": "Shopify Order SMS error: {$json.error.message}"
            },
            "id": "bdcb167e-b59d-4b53-b151-dfe70f2f28ab",
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
    connections: {
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
    settings: {
      "executionOrder": "v1"
},
  },
];

export function ECommerceCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-500/25 border border-green-600' : 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700/50 hover:bg-green-100 dark:hover:bg-green-500/20 hover:border-green-300 dark:hover:border-green-600/50 hover:shadow-md'}`}
    >
      <ShoppingCart className={`w-4 h-4 ${isActive ? 'text-white' : 'text-green-500 dark:text-green-400'}`} />
      E-Commerce
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {eCommerceTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function ECommerceTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {eCommerceTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-green-300 dark:hover:border-green-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-green-50/50 dark:group-hover:to-green-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <ShoppingCart className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-green-600 dark:hover:bg-green-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
