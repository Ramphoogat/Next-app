import React from 'react';
import { Play, Share2 } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const socialMediaTemplates: IN8nTemplate[] = [
  {
    name: "Alert on Instagram Competitor Story",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Alert on Instagram Competitor Story",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "21eb9c4e-1dd8-4912-94c8-ae35a24ccf6a",
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
                  "path": "alert-on-instagram-competitor-story"
            },
            "id": "3e99ee3b-2943-4242-9d10-4ae5f7c050c4",
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
            "id": "2ba926bb-eba1-4cf4-b819-263b3727853a",
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
            "id": "f71bb5cd-2ff0-4822-8464-9b15aaefa469",
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
                  "indexName": "alert_on_instagram_competitor_story"
            },
            "id": "a39340e4-46ef-4539-a281-1c12638eae78",
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
                  "indexName": "alert_on_instagram_competitor_story"
            },
            "id": "8fd13893-fe01-4756-ba4b-82297df9c5ec",
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
            "id": "1a960c00-32d4-4933-987c-d71e5e38a0e9",
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
            "id": "2de7c499-82d8-4a23-b6da-d050c3728ea4",
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
            "id": "1881ee9b-2e5c-474a-9aa5-4800b1bb655b",
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
                        "systemMessage": "You are an assistant for Alert on Instagram Competitor Story"
                  }
            },
            "id": "71ac72c2-63dd-4656-a2e1-6e525e685591",
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
                        "cachedResultName": "Alert on Instagram Competitor Story"
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
            "id": "350be277-eb68-4a51-b1af-a5280d188c1b",
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
                  "text": "Alert on Instagram Competitor Story error: {$json.error.message}"
            },
            "id": "a14c656e-41e1-472c-b191-4bec794ad003",
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
    name: "Auto-DM New Twitter Followers",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Auto-DM New Twitter Followers",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "6c8445ba-33d0-4091-bc77-9206a3e8b3be",
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
                  "path": "auto-dm-new-twitter-followers"
            },
            "id": "f3af4318-25fb-48b3-afcd-b6626ffa4fc3",
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
            "id": "5d8f131d-4f2e-4689-941a-71971000788e",
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
            "id": "c16f0e7d-d77e-4bf0-a9b8-aff545ebac3e",
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
                        "value": "auto-dm_new_twitter_followers",
                        "mode": "list",
                        "cachedResultName": "auto-dm_new_twitter_followers"
                  }
            },
            "id": "66aa91bd-6e08-4905-92b6-ab70a0a0fb57",
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
                        "value": "auto-dm_new_twitter_followers",
                        "mode": "list",
                        "cachedResultName": "auto-dm_new_twitter_followers"
                  }
            },
            "id": "9e705430-71d8-4f8c-badf-693b26ca753a",
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
            "id": "ca01a22f-5dd8-403c-95ea-f56ba2d0e096",
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
            "id": "bab9ab82-93b6-47dd-b15f-8a84bcb46950",
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
            "id": "752644de-7653-4ebb-afe7-9f0afb6d092b",
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
                        "systemMessage": "You are an assistant for Auto-DM New Twitter Followers"
                  }
            },
            "id": "b22befc8-d57c-4fb2-a104-4fd9e9fbf878",
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
                        "cachedResultName": "Auto-DM New Twitter Followers"
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
            "id": "5d5d5e45-7359-4cf9-a630-6592d59cda74",
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
                  "text": "Auto-DM New Twitter Followers error: {$json.error.message}"
            },
            "id": "b9362533-2cf6-4f58-980f-829f3483092c",
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
    name: "Auto-post Blogs to LinkedIn and Twitter",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Auto-post Blogs to LinkedIn and Twitter",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "f6b52b5b-3751-4c22-a6c1-3e5936fb322a",
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
                  "path": "auto-post-blogs-to-linkedin-and-twitter"
            },
            "id": "f5a15148-9af1-409b-a4ef-ad2b0e2e2f06",
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
            "id": "121f362d-ae3a-45c8-894d-12e606dab808",
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
            "id": "6a35e11a-dd03-4d95-bcc3-f4f8c85088d5",
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
                  "indexName": "auto-post_blogs_to_linkedin_and_twitter"
            },
            "id": "401ef38d-6acd-41cd-8ce5-3a50b8545789",
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
                  "indexName": "auto-post_blogs_to_linkedin_and_twitter"
            },
            "id": "04497ee3-b9d0-4296-8d11-c26ea24c5a19",
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
            "id": "cd76d86e-4c30-43bb-a0e2-baaf728f7871",
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
            "id": "9f39a9d1-b9d1-42d9-b199-8256c98ba424",
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
            "id": "8262b5be-0943-4a57-81d3-438502e72dca",
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
                        "systemMessage": "You are an assistant for Auto-post Blogs to LinkedIn and Twitter"
                  }
            },
            "id": "ef4551cd-6b4e-41ae-8688-f3119f289c8f",
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
                        "cachedResultName": "Auto-post Blogs to LinkedIn and Twitter"
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
            "id": "4ab2b12c-2228-4309-b688-e64bd895ffce",
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
                  "text": "Auto-post Blogs to LinkedIn and Twitter error: {$json.error.message}"
            },
            "id": "915205bd-7106-4a5d-9962-82a3d5292349",
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
    name: "Auto-reply to TikTok Comments",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Auto-reply to TikTok Comments",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "62a5ff73-812f-4bd3-b69e-19ccb837438b",
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
                  "path": "auto-reply-to-tiktok-comments"
            },
            "id": "e2d9a151-59e3-42d2-8108-bfb2b4f530f4",
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
            "id": "57baa51e-87e0-4b4f-90b3-44b5282b3d95",
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
            "id": "4c1d12a0-1780-4d26-b17f-59215022b555",
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
                        "value": "auto-reply_to_tiktok_comments",
                        "mode": "list",
                        "cachedResultName": "auto-reply_to_tiktok_comments"
                  }
            },
            "id": "be23eb72-bca1-4e6f-8b8f-00b3c76fef40",
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
                        "value": "auto-reply_to_tiktok_comments",
                        "mode": "list",
                        "cachedResultName": "auto-reply_to_tiktok_comments"
                  }
            },
            "id": "62d1d625-cf70-410e-84d2-eaad7477a7ba",
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
            "id": "197c6860-6a3f-4498-a4ce-e67f77133f0c",
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
            "id": "585b2926-3905-4872-ba01-89e6f5a62fee",
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
            "id": "be683af2-ee65-436a-8233-5553ccc362c4",
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
                        "systemMessage": "You are an assistant for Auto-reply to TikTok Comments"
                  }
            },
            "id": "b2359ea4-9d21-42f9-854b-42bdf4fcc565",
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
                        "cachedResultName": "Auto-reply to TikTok Comments"
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
            "id": "416996cb-2ac9-4074-b6ca-3b259a8a04d7",
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
                  "text": "Auto-reply to TikTok Comments error: {$json.error.message}"
            },
            "id": "553f06df-c97e-4775-b96a-52ad4c16a41b",
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
    name: "Cross-post YouTube Uploads to Facebook",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Cross-post YouTube Uploads to Facebook",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "e227f505-d90e-4cac-b88e-143d55a41313",
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
                  "path": "cross-post-youtube-uploads-to-facebook"
            },
            "id": "f2e1b834-b79c-400a-9016-e001ae3a1f37",
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
            "id": "c2ee666f-2b15-4919-ae35-639428a47410",
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
            "id": "f7b42d81-8b2e-40ba-a7ce-bcdcee98fb28",
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
                        "value": "cross-post_youtube_uploads_to_facebook",
                        "mode": "list",
                        "cachedResultName": "cross-post_youtube_uploads_to_facebook"
                  }
            },
            "id": "e48c8606-0249-495e-b652-bf2973cbf903",
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
                        "value": "cross-post_youtube_uploads_to_facebook",
                        "mode": "list",
                        "cachedResultName": "cross-post_youtube_uploads_to_facebook"
                  }
            },
            "id": "3f87822c-d588-4d43-b96f-9d0a1a0652b5",
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
            "id": "4009c47f-e495-4e55-8b42-271fc7f5c2c0",
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
            "id": "65041fcc-1556-4d14-81f1-4f8983867de8",
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
            "id": "46a928e6-754e-4a16-a699-551cd7c8aca7",
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
                        "systemMessage": "You are an assistant for Cross-post YouTube Uploads to Facebook"
                  }
            },
            "id": "9dc4acf6-b097-4b50-808a-0182edd55309",
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
                        "cachedResultName": "Cross-post YouTube Uploads to Facebook"
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
            "id": "7bdeabaf-dd8c-4615-b9ca-f257ec0b7eb8",
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
                  "text": "Cross-post YouTube Uploads to Facebook error: {$json.error.message}"
            },
            "id": "bb677f3c-bb83-41f1-98f5-90db4c4f765d",
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
    name: "Log Twitter Mentions in Notion",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Log Twitter Mentions in Notion",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "9ada02d4-1b9a-4475-ab74-3fec017290b0",
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
                  "path": "log-twitter-mentions-in-notion"
            },
            "id": "2a319bca-b315-479c-8cc5-00c3e017a652",
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
            "id": "599dd595-9fa8-40de-982f-1897a35e9ec6",
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
            "id": "f9f91a1d-a3fa-41ba-96e8-1a0842ec54ad",
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
                  "indexName": "log_twitter_mentions_in_notion"
            },
            "id": "95a626fd-1907-475a-8297-a088c40f7322",
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
                  "indexName": "log_twitter_mentions_in_notion"
            },
            "id": "4921e12c-f828-40d6-bbe8-4749ef18341e",
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
            "id": "f600c918-24ae-4659-ad01-77c48c2ff50a",
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
            "id": "7eec9928-bb45-49a9-af88-a2f8e0357759",
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
            "id": "5baad51a-c76c-4ba3-b961-31a8f1607b61",
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
                        "systemMessage": "You are an assistant for Log Twitter Mentions in Notion"
                  }
            },
            "id": "bf34ac84-3904-4010-b2f3-e9f6328195df",
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
                        "cachedResultName": "Log Twitter Mentions in Notion"
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
            "id": "460a8b6a-6ed3-44f0-a5df-37b52a34ab74",
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
                  "text": "Log Twitter Mentions in Notion error: {$json.error.message}"
            },
            "id": "04cbe4da-7774-4177-a753-6a01f23a7687",
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
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Monthly Social Media Report",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Monthly Social Media Report",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "5d2f980a-4f7d-4e5f-acd9-29f532634bf3",
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
                  "path": "monthly-social-media-report"
            },
            "id": "2f7e00f6-721f-4f11-8d8e-f6036cb4c4e3",
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
            "id": "f504b256-54f2-4862-8031-60c272844eca",
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
            "id": "16eaa7d4-b566-451d-abaf-f1c74ca7db33",
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
                  "indexName": "monthly_social_media_report"
            },
            "id": "ac30243b-1100-4cf1-a0dd-baf77e2a953e",
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
                  "indexName": "monthly_social_media_report"
            },
            "id": "22db8cd2-d13f-47b4-97f2-ae43ef68f72c",
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
            "id": "12d9cea3-b799-47e7-99cb-b8d6d5cf8b87",
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
            "id": "067fc8cb-6899-4357-a9ed-3c81573af176",
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
            "id": "a54762ba-a09c-477a-abde-1653ce014bf6",
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
                        "systemMessage": "You are an assistant for Monthly Social Media Report"
                  }
            },
            "id": "53259669-6609-4dd1-8de0-50b8bc91b9d5",
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
                        "cachedResultName": "Monthly Social Media Report"
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
            "id": "f3491401-f9e4-4792-bf6d-8225a7fbe226",
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
                  "text": "Monthly Social Media Report error: {$json.error.message}"
            },
            "id": "f6ffdcfe-cc88-4eb3-a8e9-2bc36b0213ba",
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
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Reddit Upvote Alert",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Reddit Upvote Alert",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "65196870-2079-4376-92b9-a2f6d782a0d9",
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
                  "path": "reddit-upvote-alert"
            },
            "id": "78135efe-8906-4437-9908-1e335442f6a2",
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
            "id": "d4d868f6-46e2-42d4-a294-fbd6ac733823",
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
            "id": "88ea99f8-1469-4c03-8fd1-ed1fab8a5516",
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
                  "indexName": "reddit_upvote_alert"
            },
            "id": "466c3a8b-e140-4b17-b4b7-f33415832ef9",
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
                  "indexName": "reddit_upvote_alert"
            },
            "id": "6648eb75-d080-48fd-8fd1-a5d9edf7c6a5",
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
            "id": "36705e61-87ec-4858-87e3-2eb4d1f3219c",
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
            "id": "4fd2d787-235f-4efc-a57f-3d91956b0975",
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
            "id": "669c352a-d72e-4a48-b11d-377736696308",
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
                        "systemMessage": "You are an assistant for Reddit Upvote Alert"
                  }
            },
            "id": "af93f117-fe2b-4e90-b9e7-a0a1d8cecb1b",
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
                        "cachedResultName": "Reddit Upvote Alert"
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
            "id": "8735a4a8-4a50-44b7-b303-597642c7bca0",
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
                  "text": "Reddit Upvote Alert error: {$json.error.message}"
            },
            "id": "b337597e-1efd-43e6-8a88-7822de398548",
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
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "Schedule Instagram Content from Airtable",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Schedule Instagram Content from Airtable",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "7abba269-7e58-480c-8343-0f7dabcb52b8",
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
                  "path": "schedule-instagram-content-from-airtable"
            },
            "id": "baa2150e-b0db-49a7-9ef7-2015ee41cb17",
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
            "id": "b3ccfb17-8668-4b7d-8b87-00806d6fd722",
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
            "id": "d3c7a01c-465a-4d68-a1c3-753fa9d33dfb",
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
                        "value": "schedule_instagram_content_from_airtable",
                        "mode": "list",
                        "cachedResultName": "schedule_instagram_content_from_airtable"
                  }
            },
            "id": "327e4fcd-d941-4c80-90ab-e367aa6bc83b",
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
                        "value": "schedule_instagram_content_from_airtable",
                        "mode": "list",
                        "cachedResultName": "schedule_instagram_content_from_airtable"
                  }
            },
            "id": "fe2adecc-d905-4161-9558-1fb91514db6d",
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
            "id": "e9dd7f92-2cb1-4f98-b033-a5fb89651c6e",
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
            "id": "89345e2d-849e-45eb-849b-0b68b00fb45d",
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
            "id": "6428cdb0-972d-4db8-85e2-ca5e4049ede8",
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
                        "systemMessage": "You are an assistant for Schedule Instagram Content from Airtable"
                  }
            },
            "id": "e2a48f35-4c86-4d8d-bf83-f1f9e8ef98df",
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
                        "cachedResultName": "Schedule Instagram Content from Airtable"
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
            "id": "f026138c-b0be-4734-b87d-71c7d7947cb4",
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
                  "text": "Schedule Instagram Content from Airtable error: {$json.error.message}"
            },
            "id": "5c4e16ac-68ff-4c7d-aa5a-be47b01d5fac",
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
    name: "Video Automation (images only)",
    nodes: [
      {
            "parameters": {
                  "promptType": "=define",
                  "text": "=You are a master at creating short-form viral videos. I want your help in generating historical POV videos, in which the user sees POV-style images of an individual throughout a major breakthrough in science in technology. The channel's name is \"Before it Changed Everything.\"\n\nEach video is 25 seconds long, and contains 5 scenes, 5 seconds each.\n\nEach scene requires one image and one audio voiceover, so the whole story will consist of 5 images and 5 audios. !important\n\nThe entire 25 second video would narrate a short story from that historical era.\n\nThe image prompts have to be such that they help the AI model maintain as much consistency from one image to the next. Since it's a POV video, there are very few details of the person itself that must be maintained aside from arms and feet, and torso and legs if visible.\n\nevery scene should have the POV individual interacting with a new character or setting, so this would also reduce the need for consistency aside from the same historical time period. However, remember to describe each scene with enough references so that each prompt can work individually.\n\nAny visible details of the character (hands feet accessories) must also be referenced in each prompt and described in way that maintains consistency.\n\nFor example, if you're describing the battle of Marathon and your first prompt is about an athenian hoplite surrounded by soldiers\n\nthe next image prompt must also specify that the soldiers are athenian from the battle of marathon\n\nFinally, the script should be such as to give enough details about the event, but not give the actual topic away. The script should always end as - can you guess the discovery - this would be part of the 5th segment, not an addional one\n\nHere are three ideal outputs\n\nScene 1 – Setting the Type\n\nPOV of a young male apprentice working in Johannes Gutenberg’s printing workshop during the creation of the Gutenberg Bible (circa 1454).\nLocation: Mainz, Germany. Time Period: Mid-15th century. Setting: A medieval print shop at dawn, with timber beams, stone walls, and floors stained with ink. The space is lit dimly by hanging tallow candles and an early morning glow through a small window.\nVisible Body Parts: Your light-skinned hands are ink-stained and youthful, gripping a wooden composing stick filled with reversed cast-metal movable type. You’re wearing a cream-colored linen shirt with the sleeves rolled to the elbow and a leather apron over the front. Black ink is smudged along your knuckles and fingers.\nObjects in Scene: Brass typesetting tools, loose metal letter blocks, parchment scraps, candle stubs, wooden tables and shelving lined with ink pots, scrolls, and stacked paper.\nPeople in Scene: Johannes Gutenberg, a bearded middle-aged man in a dark wool robe, stands beside two young apprentices in plain tunics, one with a leather cap. They are discussing a typeset frame.\nAtmosphere: The air smells of wax, metal, and damp parchment. The environment is quiet but intense — the only sounds are soft footsteps, the creak of wood, and the delicate click of metal type.\n\n🎙️ “Master Gutenberg said today would change the world. I still don’t know how, but I believe him.”\n\n⸻\n\nScene 2 – Assembling the Page\n\nPOV of a young male apprentice working in Johannes Gutenberg’s printing workshop during the creation of the Gutenberg Bible (circa 1454).\nLocation: Mainz, Germany. Time Period: Mid-15th century. Setting: The composing room of a medieval print shop during mid-morning. Wooden beams stretch across the ceiling. Light streams in from a narrow window, illuminating workbenches and shelves filled with parchment and metal type.\nVisible Body Parts: Your fair-skinned fingers, stained with black ink and gray lead dust, are delicately arranging tiny reversed metal letters into a composing tray. You wear a loose-fitting white linen shirt with the sleeves pushed up to the elbows. A brown leather apron is partially visible.\nObjects in Scene: A composing stick and tray, several piles of lead type, an open parchment sample of Latin text, ink cloth, wooden drawers filled with type blocks, and brass tweezers.\nPeople in Scene: A young boy in a brown woolen cap leans nearby, watching your work. Another apprentice with curly hair sorts letters into compartments in the background.\nAtmosphere: The room is quiet and focused. Dust floats in the sunlight. The air smells of wax, metal, and ink.\nImage to video: your hands are gently moving across the composing tray\n\n🎙️ “Each letter must be perfect. Backwards, precise, eternal. One mistake, and the whole page is flawed.”\n\n⸻\n\nScene 3 – Engaging the Press\n\nPOV of a young male apprentice operating a wooden printing press in Johannes Gutenberg’s workshop during the creation of the Gutenberg Bible (circa 1454).\nLocation: Mainz, Germany. Time Period: Mid-15th century. Setting: A candlelit central chamber within a medieval print shop, dominated by a large oak screw press. Afternoon light spills through a small window, mixing with flickering candlelight.\nVisible Body Parts: Your hands grip a large wooden press lever, forearms straining under effort. Your rolled-up linen sleeves reveal ink-smudged skin. The tops of your worn leather shoes are barely visible below.\nObjects in Scene: A heavy wooden screw press, a parchment page secured under the press plate, a nearby ink roller covered in thick black ink, rags for cleaning, an oil pot, and drying parchment stacked neatly nearby.\nPeople in Scene: Johannes Gutenberg stands behind the press with folded arms, observing closely. Another apprentice loads a new forme with type in the background.\nAtmosphere: The press groans under pressure. The room smells of ink, oil, and scorched parchment. The moment is tense, mechanical, and filled with focus.\nimage to video: you pull down on the lever\n\n🎙️ “We press it down — firm, not forceful. It creaks like an old tree”\n\n!Important: make sure every script segment is a little shy of 4 seconds, otherwise the video will become black for that much time.\n\nThe theme of this video is {{ $('Google Sheets').item.json.Theme }} and the event I want you to generate a video for is the {{ $('Google Sheets').item.json.Topic }}",
                  "hasOutputParser": true
            },
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "typeVersion": 1.5,
            "position": [
                  80,
                  -360
            ],
            "id": "ad6cf735-ccc1-46ec-9f6b-71dacc534682",
            "name": "Basic LLM Chain"
      },
      {
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1.2,
            "position": [
                  0,
                  -200
            ],
            "id": "e6906ba3-7c93-4771-a0a3-e523a0864541",
            "name": "OpenAI Chat Model",
            "credentials": {
                  "openAiApi": {
                        "id": "ulLOziYE3uIZc6he",
                        "name": "OpenAi account"
                  }
            }
      },
      {
            "parameters": {
                  "jsonSchemaExample": "[\n  {\n    \"scene\": {\n      \"image-prompt\": \"X\",\n      \"image-to-video-prompt\": \"X\",\n      \"voiceover-script\": \"The Master says brush before blade. Every stroke must honor the classics. So I copy each character with care.\"\n    }\n  },\n  {\n    \"scene\": {\n      \"image-prompt\": \"POV of a young male apprentice carving Chinese characters into a wooden block in a Song Dynasty woodblock printing workshop (circa 11th century). Location: Kaifeng, China. Time Period: Northern Song Dynasty. Setting: Mid-morning in a sunlit workshop filled with the scent of sandalwood and ink. Visible Body Parts: Your hands hold a small carving knife, steadying the woodblock with your left hand. Fingernails are stained with ink and sawdust. You're wearing the same indigo scholar robe with a tan hemp sash. Objects in Scene: A rectangular block of pearwood, carving knife set, character sketch, wood shavings, and discarded test blocks. People in Scene: A senior carver leans in, adjusting your grip. Another apprentice carefully sharpens tools beside a table. Atmosphere: Quiet but concentrated, with the soft scraping of blades on wood.\",\n      \"image-to-video-prompt\": \"POV carving reversed Chinese characters into a woodblock using a fine knife. Your ink-stained hands hold the blade with precision. You're wearing wide blue robes and a hemp sash. A master carver leans in to assist. Around you are test blocks, carving tools, and wood shavings. Light streams through a window. The setting is peaceful and disciplined.\",\n      \"voiceover-script\": \"Each cut must be clean. One slip, and the whole block is ruined. My hands shake, but the blade must not.\"\n    }\n  },\n  {\n    \"scene\": {\n      \"image-prompt\": \"POV of a young male apprentice inking a carved woodblock in a Song Dynasty printing workshop preparing to print a Confucian text (circa 11th century). Location: Kaifeng, China. Time Period: Northern Song Dynasty. Setting: A low wooden table set beside an open window with bamboo blinds. Visible Body Parts: Your hands, darkened slightly with dried ink, gently roll a thin cloth pad across the carved woodblock. Sleeves of your wide indigo robe are tied back with a cord to avoid contact. Objects in Scene: Carved woodblock, ink pad, ceramic ink dish, sheets of xuan paper stacked neatly. People in Scene: An assistant waits nearby, holding parchment. The calligrapher watches silently from across the room. Atmosphere: Meditative and rhythmic, with the scent of ink and aged wood.\",\n      \"image-to-video-prompt\": \"POV inking a carved woodblock using a cloth pad. Your hands apply ink in smooth strokes. Sleeves are tied back with a cord. Sunlight glows through bamboo blinds. An assistant stands ready with paper. The carved Chinese characters are clearly visible. Traditional setting, calm mood.\",\n      \"voiceover-script\": \"The ink must reach every groove, but never flood the wood. I press gently, as I was taught.\"\n    }\n  },\n  {\n    \"scene\": {\n      \"image-prompt\": \"POV of a young male apprentice printing a Confucian text by pressing paper onto an inked woodblock in a Song Dynasty workshop (circa 11th century). Location: Kaifeng, China. Time Period: Northern Song Dynasty. Setting: A spacious studio with scrolls drying on racks and large tables covered in paper. Visible Body Parts: Your hands smooth a sheet of xuan paper over the inked woodblock, using a bamboo rubbing tool. The same indigo robe and hemp sash are visible as you lean forward. Objects in Scene: The carved woodblock, fresh paper, bamboo baren (rubbing pad), and drying scrolls clipped above. People in Scene: A younger student observes curiously. A supervisor quietly inspects finished prints behind you. Atmosphere: Serious, focused, with the sound of rubbing and distant birdsong through the open shutters.\",\n      \"image-to-video-prompt\": \"POV printing by pressing paper onto an inked woodblock with a bamboo rubbing pad. Your hands move in circular motions. Robes shift slightly as you lean in. Around you are scroll racks, carved blocks, and parchment. Another student watches your technique. Warm, quiet atmosphere.\",\n      \"voiceover-script\": \"My heart races with each rub. When I lift the paper, it will show if I am worthy of the Master’s trust.\"\n    }\n  },\n  {\n    \"scene\": {\n      \"image-prompt\": \"POV of a young male apprentice hanging a freshly printed Confucian scroll to dry in a Song Dynasty workshop (circa 11th century). Location: Kaifeng, China. Time Period: Northern Song Dynasty. Setting: The drying room of a print shop, with bamboo rods suspended from the ceiling, scrolls clipped neatly in rows. Visible Body Parts: Your hands hold the top of a damp scroll, aligning it with a bamboo line. Fingertips slightly stained. A glimpse of your indigo sleeve and tan sash appear at the edge of the frame. Objects in Scene: Scrolls with bold black characters, wooden pegs, thin cords, incense burner. People in Scene: An elderly scholar passes through behind you, examining the finished work with folded hands. Atmosphere: The room is airy, quiet, and smells of ink, wood, and incense.\",\n      \"image-to-video-prompt\": \"POV hanging a wet printed scroll onto a drying rack made of bamboo. Your hands gently clip the scroll in place. Ink glistens faintly on the parchment. Scholar robes and sash visible at edge of frame. Elder scholar walks past behind you. Warm, ceremonial feeling.\",\n      \"voiceover-script\": \"The ink is still fresh. The words still wet. But soon, this scroll will speak to minds I’ll never meet.\"\n    }\n  },\n  {\n    \"scene\": {\n      \"image-prompt\": \"POV of a young male apprentice presenting the completed printed scroll to a noble scholar in a Song Dynasty library (circa 11th century). Location: Kaifeng, China. Time Period: Northern Song Dynasty. Setting: A private study with polished wooden floors, lattice windows, shelves of bamboo-bound books, and bronze incense holders. Visible Body Parts: Your hands hold the scroll wrapped in silk, extended forward in offering. The blue sleeves of your scholar’s robe drape down, your feet barely visible on a woven mat. Objects in Scene: A lacquered writing table, a brush holder, open scrolls, jade paperweights. People in Scene: An elderly Confucian scholar in dark green robes receives the scroll with a gentle bow. A servant pours tea in the background. Atmosphere: Silent reverence, with the soft aroma of tea and cedar.\",\n      \"image-to-video-prompt\": \"POV offering a silk-wrapped printed scroll to a seated scholar in a Song Dynasty study. Your hands extend the scroll respectfully. Robes and mat beneath you visible. The scholar bows slightly. Teacups, incense, and bamboo books line the room. Serene, scholarly tone.\",\n      \"voiceover-script\": \"He bows to receive it, but I bow deeper. This scroll carries more than ink — it carries my beginning.\"\n    }\n  }\n]"
            },
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "typeVersion": 1.2,
            "position": [
                  340,
                  -200
            ],
            "id": "ccca4759-b87d-40f2-bba8-27c907dfa9f5",
            "name": "Structured Output Parser"
      },
      {
            "parameters": {
                  "fieldToSplitOut": "output",
                  "options": {}
            },
            "type": "n8n-nodes-base.splitOut",
            "typeVersion": 1,
            "position": [
                  480,
                  -360
            ],
            "id": "6cb4b514-bd18-4aa3-aacb-983515b308f6",
            "name": "Split Out"
      },
      {
            "parameters": {
                  "method": "POST",
                  "url": "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization"
                              }
                        ]
                  },
                  "sendBody": true,
                  "specifyBody": "json",
                  "jsonBody": "={\n    \"input\": {\n      \"prompt\": \"{{ $json.scene['image-prompt'] }}\",\n      \"go_fast\": true,\n      \"megapixels\": \"1\",\n      \"num_outputs\": 1,\n      \"aspect_ratio\": \"9:16\",\n      \"output_format\": \"jpg\",\n      \"output_quality\": 80,\n      \"num_inference_steps\": 4\n    }\n  } ",
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  800,
                  -320
            ],
            "id": "864713ce-5191-47cb-a2bf-dffc240a3a7a",
            "name": "HTTP Request"
      },
      {
            "parameters": {
                  "content": "## Generate Images",
                  "height": 320,
                  "width": 1260
            },
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  640,
                  -440
            ],
            "typeVersion": 1,
            "id": "8f93435f-ef35-467c-b64d-56c6f348e410",
            "name": "Sticky Note"
      },
      {
            "parameters": {
                  "amount": 7
            },
            "type": "n8n-nodes-base.wait",
            "typeVersion": 1.1,
            "position": [
                  1160,
                  -320
            ],
            "id": "24c3f9f8-5eed-434a-a7bc-0ed1891ead75",
            "name": "Wait",
            "webhookId": "39ba6c0a-5107-44ad-b812-1616712b4a5b"
      },
      {
            "parameters": {
                  "url": "={{ $json.urls.get }}",
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization"
                              }
                        ]
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  1500,
                  -320
            ],
            "id": "34215c07-8fed-4762-ad8a-9467acedd680",
            "name": "HTTP Request1"
      },
      {
            "parameters": {
                  "method": "POST",
                  "url": "https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17",
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "xi-api-key"
                              }
                        ]
                  },
                  "sendBody": true,
                  "specifyBody": "json",
                  "jsonBody": "={\n  \"text\": \"{{ $('Split Out').item.json.scene['voiceover-script'] }}\",\n  \"model_id\": \"eleven_multilingual_v2\"\n}\n",
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  1200,
                  120
            ],
            "id": "0e3a74cb-0675-4457-a9dd-f4f5dde87c39",
            "name": "HTTP Request2"
      },
      {
            "parameters": {
                  "options": {}
            },
            "type": "n8n-nodes-base.splitInBatches",
            "typeVersion": 3,
            "position": [
                  900,
                  60
            ],
            "id": "14004132-5149-4e43-bca6-ea706ae71ea0",
            "name": "Loop Over Items"
      },
      {
            "parameters": {
                  "content": "## Generate Audio",
                  "height": 340,
                  "width": 1260
            },
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  640,
                  -40
            ],
            "typeVersion": 1,
            "id": "0bbaf443-4638-4616-90bc-a8737a839f87",
            "name": "Sticky Note2"
      },
      {
            "parameters": {
                  "resource": "folder",
                  "name": "POV Videos Audio",
                  "driveId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "My Drive"
                  },
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "root",
                        "cachedResultName": "/ (Root folder)"
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  1140,
                  -660
            ],
            "id": "989d34b0-b765-477c-b2cc-68d16236dcef",
            "name": "Google Drive",
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "w1LozBYF8UijOdoM",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "name": "=audio-{{ $runIndex }}.mp3",
                  "driveId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "My Drive"
                  },
                  "folderId": {
                        "__rl": true,
                        "value": "={{ $('Google Drive').item.json.id }}",
                        "mode": "id"
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  1540,
                  100
            ],
            "id": "26ec1a16-3470-4e10-bed0-5c7fba9098d5",
            "name": "Google Drive1",
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "w1LozBYF8UijOdoM",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "method": "POST",
                  "url": "https://api.creatomate.com/v1/renders",
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization"
                              }
                        ]
                  },
                  "sendBody": true,
                  "specifyBody": "json",
                  "jsonBody": "={\n  \"template_id\": \"2dffc678-70b0-47fb-9449-24d7e0cfd625\",\n  \"modifications\": {\n    \"Image-1.source\": \"{{ $json.output[0][0] }}\",\n    \"Voiceover-1.source\": \"{{ $json.webContentLink[0] }}\",\n    \"Image-2.source\": \"{{ $json.output[0][1] }}\",\n    \"Voiceover-2.source\": \"{{ $json.webContentLink[1] }}\",\n    \"Image-3.source\": \"{{ $json.output[0][2] }}\",\n    \"Voiceover-3.source\": \"{{ $json.webContentLink[2] }}\",\n    \"Image-4.source\": \"{{ $json.output[0][3] }}\",\n    \"Voiceover-4.source\": \"{{ $json.webContentLink[3] }}\",\n    \"Image-5.source\": \"{{ $json.output[0][4] }}\",\n    \"Voiceover-5.source\": \"{{ $json.webContentLink[4] }}\"\n  }\n}",
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  2000,
                  360
            ],
            "id": "8065787a-2ea1-4048-9ab4-d542c1c56769",
            "name": "Generate Videos"
      },
      {
            "parameters": {
                  "mode": "combine",
                  "combineBy": "combineByPosition",
                  "options": {}
            },
            "type": "n8n-nodes-base.merge",
            "typeVersion": 3,
            "position": [
                  2000,
                  -180
            ],
            "id": "365a00d7-a68e-43fe-934d-4d2252ff6643",
            "name": "Merge"
      },
      {
            "parameters": {
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "fieldToAggregate": "output[0]"
                              },
                              {
                                    "fieldToAggregate": "webContentLink"
                              },
                              {
                                    "fieldToAggregate": "Topic"
                              },
                              {
                                    "fieldToAggregate": "output[4].title"
                              },
                              {
                                    "fieldToAggregate": "output[4].description"
                              },
                              {
                                    "fieldToAggregate": "=drive_folder_id"
                              }
                        ]
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.aggregate",
            "typeVersion": 1,
            "position": [
                  1980,
                  100
            ],
            "id": "e5db6e05-618a-4771-95e3-e0cdf9380cfd",
            "name": "Aggregate"
      },
      {
            "parameters": {
                  "resource": "folder",
                  "operation": "share",
                  "folderNoRootId": {
                        "__rl": true,
                        "value": "={{ $json.drive_folder_id }}",
                        "mode": "id"
                  },
                  "permissionsUi": {
                        "permissionsValues": {
                              "role": "writer",
                              "type": "anyone"
                        }
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  1740,
                  -660
            ],
            "id": "e2826f54-ff23-4345-a9f5-211f4830e48d",
            "name": "Google Drive2",
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "w1LozBYF8UijOdoM",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "hours",
                                    "hoursInterval": 12
                              }
                        ]
                  }
            },
            "type": "n8n-nodes-base.scheduleTrigger",
            "typeVersion": 1.2,
            "position": [
                  580,
                  -660
            ],
            "id": "6aa01c7f-7d92-4482-ad15-9fbbd22fceac",
            "name": "Schedule Trigger"
      },
      {
            "parameters": {
                  "documentId": {
                        "__rl": true,
                        "value": "19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY",
                        "mode": "list",
                        "cachedResultName": "Before it changed everything tracker",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY/edit?usp=drivesdk"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "gid=0",
                        "mode": "list",
                        "cachedResultName": "Master",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY/edit#gid=0"
                  },
                  "filtersUI": {
                        "values": [
                              {
                                    "lookupColumn": "Status",
                                    "lookupValue": "Pending"
                              }
                        ]
                  },
                  "options": {
                        "returnFirstMatch": true
                  }
            },
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4.5,
            "position": [
                  840,
                  -660
            ],
            "id": "53ab19fc-085a-4c2a-8b8b-d6e84ab190f0",
            "name": "Google Sheets",
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "1tkwsToZLlEshQfI",
                        "name": "Google Sheets account"
                  }
            }
      },
      {
            "parameters": {
                  "documentId": {
                        "__rl": true,
                        "value": "19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY",
                        "mode": "list",
                        "cachedResultName": "Before it changed everything tracker",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY/edit?usp=drivesdk"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "gid=0",
                        "mode": "list",
                        "cachedResultName": "Master",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY/edit#gid=0"
                  },
                  "filtersUI": {
                        "values": [
                              {
                                    "lookupColumn": "Status",
                                    "lookupValue": "Pending"
                              }
                        ]
                  },
                  "options": {
                        "returnFirstMatch": true
                  }
            },
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4.5,
            "position": [
                  740,
                  320
            ],
            "id": "efb08c46-4abb-4630-a6f6-41808a9b6028",
            "name": "Google Sheets1",
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "1tkwsToZLlEshQfI",
                        "name": "Google Sheets account"
                  }
            }
      },
      {
            "parameters": {
                  "url": "={{ $('Generate Videos').item.json.url }}",
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  1680,
                  320
            ],
            "id": "e4b52f10-fd72-44bc-a58d-318b2daff27c",
            "name": "HTTP Request3"
      },
      {
            "parameters": {
                  "name": "={{ $('Google Sheets1').item.json.Topic }}",
                  "driveId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "My Drive"
                  },
                  "folderId": {
                        "__rl": true,
                        "value": "1Cay44vDNFZ_zELmV9RsdHTv6UFTAszMc",
                        "mode": "list",
                        "cachedResultName": "Before It Changed Everything Videos",
                        "cachedResultUrl": "https://drive.google.com/drive/folders/1Cay44vDNFZ_zELmV9RsdHTv6UFTAszMc"
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  760,
                  620
            ],
            "id": "80239a8c-0f12-403e-98ca-c2c9f43e23bc",
            "name": "Google Drive3",
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "w1LozBYF8UijOdoM",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "unit": "minutes"
            },
            "type": "n8n-nodes-base.wait",
            "typeVersion": 1.1,
            "position": [
                  2300,
                  360
            ],
            "id": "8dae378a-b2cc-4a78-a78f-f5eb08897139",
            "name": "Wait1",
            "webhookId": "576048df-e86b-4196-a1c2-54e5775e24d3"
      },
      {
            "parameters": {
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "f151b3ff-0fa1-406a-974d-8c27fbca1a54",
                                    "name": "drive_folder_id",
                                    "value": "={{ $json.id }}",
                                    "type": "string"
                              }
                        ]
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [
                  1420,
                  -660
            ],
            "id": "36aafa69-2b90-4f9d-b4fb-d41af50e31eb",
            "name": "Edit Fields"
      },
      {
            "parameters": {
                  "resource": "fileFolder",
                  "queryString": "POV Videos Audio",
                  "limit": 1,
                  "filter": {
                        "whatToSearch": "folders"
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  1040,
                  620
            ],
            "id": "1739edb4-89e1-4330-987a-e9ca92ec89ba",
            "name": "Google Drive4",
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "w1LozBYF8UijOdoM",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "resource": "folder",
                  "operation": "deleteFolder",
                  "folderNoRootId": {
                        "__rl": true,
                        "value": "={{ $json.id }}",
                        "mode": "id"
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  1280,
                  620
            ],
            "id": "5af28a5c-a855-4c7c-877d-db89127f1069",
            "name": "Google Drive5",
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "w1LozBYF8UijOdoM",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "value": "gpt-4o",
                        "mode": "list",
                        "cachedResultName": "GPT-4O"
                  },
                  "messages": {
                        "values": [
                              {
                                    "content": "=You are an expert at creating viral YouTube shorts. I am creating a science video series about  {{ $json.Theme }}, and the topic of this video is {{ $json.Topic }}. Please generate a viral title and description for this video. Add the hashtag #shorts at the end of the title, and output as JSON in the following format:\n\ntitle:\ndescription:\n\nThe title and description should not give the topic away, because the purpose of the video is to provide clues and context around the topic and encourage people to take a guess as to what it is."
                              }
                        ]
                  },
                  "jsonOutput": true,
                  "options": {}
            },
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "typeVersion": 1.8,
            "position": [
                  1080,
                  320
            ],
            "id": "7542aa26-df1d-4bc9-8d2f-2986c12c4911",
            "name": "OpenAI",
            "credentials": {
                  "openAiApi": {
                        "id": "ulLOziYE3uIZc6he",
                        "name": "OpenAi account"
                  }
            }
      },
      {
            "parameters": {
                  "operation": "update",
                  "documentId": {
                        "__rl": true,
                        "value": "19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY",
                        "mode": "list",
                        "cachedResultName": "Before it changed everything tracker",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY/edit?usp=drivesdk"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "gid=0",
                        "mode": "list",
                        "cachedResultName": "Master",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19Ctw6aVclYotXYMhHJzZifn5q28-MZSNvLk2zoECrEY/edit#gid=0"
                  },
                  "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                              "Topic": "={{ $('Google Sheets1').item.json.Topic }}",
                              "Title": "={{ $json.message.content.title }}",
                              "Description": "={{ $json.message.content.description }}",
                              "Status": "Generated"
                        },
                        "matchingColumns": [
                              "Topic"
                        ],
                        "schema": [
                              {
                                    "id": "Topic",
                                    "displayName": "Topic",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": false
                              },
                              {
                                    "id": "Theme",
                                    "displayName": "Theme",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Status",
                                    "displayName": "Status",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Title",
                                    "displayName": "Title",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Description",
                                    "displayName": "Description",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Date Posted",
                                    "displayName": "Date Posted",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "displayName": "row_number",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "readOnly": true,
                                    "removed": true
                              }
                        ],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4.5,
            "position": [
                  1440,
                  320
            ],
            "id": "3ef2a4ed-9a80-4938-bd76-6232434ab0ad",
            "name": "Google Sheets2",
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "1tkwsToZLlEshQfI",
                        "name": "Google Sheets account"
                  }
            }
      }
],
    connections: {
      "OpenAI Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Basic LLM Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Structured Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Basic LLM Chain",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Basic LLM Chain": {
            "main": [
                  [
                        {
                              "node": "Split Out",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out": {
            "main": [
                  [
                        {
                              "node": "HTTP Request",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "HTTP Request": {
            "main": [
                  [
                        {
                              "node": "Wait",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wait": {
            "main": [
                  [
                        {
                              "node": "HTTP Request1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "HTTP Request1": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Loop Over Items",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Loop Over Items": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 1
                        }
                  ],
                  [
                        {
                              "node": "HTTP Request2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "HTTP Request2": {
            "main": [
                  [
                        {
                              "node": "Google Drive1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Drive": {
            "main": [
                  [
                        {
                              "node": "Edit Fields",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Drive1": {
            "main": [
                  [
                        {
                              "node": "Loop Over Items",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge": {
            "main": [
                  [
                        {
                              "node": "Aggregate",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Aggregate": {
            "main": [
                  [
                        {
                              "node": "Generate Videos",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Videos": {
            "main": [
                  [
                        {
                              "node": "Wait1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Drive2": {
            "main": [
                  [
                        {
                              "node": "Basic LLM Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Schedule Trigger": {
            "main": [
                  [
                        {
                              "node": "Google Sheets",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets": {
            "main": [
                  [
                        {
                              "node": "Google Drive",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets1": {
            "main": [
                  [
                        {
                              "node": "OpenAI",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "HTTP Request3": {
            "main": [
                  [
                        {
                              "node": "Google Drive3",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Drive3": {
            "main": [
                  [
                        {
                              "node": "Google Drive4",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wait1": {
            "main": [
                  [
                        {
                              "node": "Google Sheets1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Edit Fields": {
            "main": [
                  [
                        {
                              "node": "Google Drive2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Drive4": {
            "main": [
                  [
                        {
                              "node": "Google Drive5",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Drive5": {
            "main": [
                  []
            ]
      },
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Google Sheets2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets2": {
            "main": [
                  [
                        {
                              "node": "HTTP Request3",
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
    name: "YouTube Comment Summarizer",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for YouTube Comment Summarizer",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "2a67ad9a-dcc2-4ef0-abca-f3255d63c2d0",
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
                  "path": "youtube-comment-summarizer"
            },
            "id": "2fde1554-d2d7-49c3-b337-405b6c3136c9",
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
            "id": "82191399-1a68-400c-9bea-0c3a9aa2ac37",
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
            "id": "8a7643de-d014-4377-9055-79ee738b6231",
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
                        "value": "youtube_comment_summarizer",
                        "mode": "list",
                        "cachedResultName": "youtube_comment_summarizer"
                  }
            },
            "id": "841e4571-f1c6-49e0-8520-5d4a244b057f",
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
                        "value": "youtube_comment_summarizer",
                        "mode": "list",
                        "cachedResultName": "youtube_comment_summarizer"
                  }
            },
            "id": "d85e823f-715b-489b-9628-61ce63cb33fe",
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
            "id": "0737745f-be5b-4e98-b85b-45a3412f09e9",
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
            "id": "b8a28d57-b2d0-4ccd-8748-d484099c2bd5",
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
            "id": "93fe9b1d-0b94-4f3a-a864-fda08cd201ce",
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
                        "systemMessage": "You are an assistant for YouTube Comment Summarizer"
                  }
            },
            "id": "a3218023-dcc5-4302-9506-a498a28823b4",
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
                        "cachedResultName": "YouTube Comment Summarizer"
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
            "id": "1d624247-2c74-46c5-89e4-624b0c62bb87",
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
                  "text": "YouTube Comment Summarizer error: {$json.error.message}"
            },
            "id": "361ae790-4e53-4a0c-8684-5a448b2ae5e9",
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

export function SocialMediaCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-600' : 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700/50 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:border-cyan-300 dark:hover:border-cyan-600/50 hover:shadow-md'}`}
    >
      <Share2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-500 dark:text-cyan-400'}`} />
      Social Media
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {socialMediaTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function SocialMediaTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {socialMediaTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-cyan-50/50 dark:group-hover:to-cyan-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-cyan-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Share2 className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-cyan-600 dark:hover:bg-cyan-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
