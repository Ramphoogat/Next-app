import React from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const miscTemplates: IN8nTemplate[] = [
  {
    name: "API Monitor Auto Restart",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: API Monitor Auto Restart",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "5a361eec-4cf1-4626-8301-f1d61886385b",
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
                  "path": "api-monitor-auto-restart"
            },
            "id": "4a4d8e8e-ef65-4993-be9b-e5a9667a9ec3",
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
            "id": "a7c202eb-a14d-4c3a-9901-847fb858c828",
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
            "id": "2dc406f3-4a67-4021-80a2-3926b5b55087",
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
                  "indexName": "api_monitor_auto_restart"
            },
            "id": "8781c9ef-fcc4-41cb-9fda-3ece7aaab8c1",
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
                  "indexName": "api_monitor_auto_restart"
            },
            "id": "368141fb-c508-4ef1-a99b-2848db6feb09",
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
            "id": "31889dd8-f57a-4cc2-8ef8-e8666ca9f67e",
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
            "id": "8c45174b-5b62-4222-a33f-ef9085097ffc",
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
            "id": "ad6b30cb-5adf-4c0f-96fa-89a830472d1d",
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
                  "text": "Process the following data for task 'API Monitor Auto Restart':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for API Monitor Auto Restart"
                  }
            },
            "id": "c3bb6442-4dd3-4d62-bbe9-a47a0ff7baff",
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
                        "cachedResultName": "API Monitor Auto Restart"
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
            "id": "e9a91afa-9d08-42a7-a362-2f5eed4db722",
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
                  "text": "API Monitor Auto Restart error: {$json.error.message}"
            },
            "id": "480913f8-b511-4f82-b413-b19bf75ed0d2",
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
    name: "API Stats Chart",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: API Stats Chart",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "d6936124-41be-4586-a3b6-003216c47610",
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
                  "path": "api-stats-chart"
            },
            "id": "03fca675-6256-4e85-928b-785d0b0ae848",
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
            "id": "47ef8ce5-0a2e-4eb9-a127-ce55a886cf1f",
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
            "id": "2f994a01-b92a-45be-8d60-38c6f82e8ffd",
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
                        "value": "api_stats_chart",
                        "mode": "list",
                        "cachedResultName": "api_stats_chart"
                  }
            },
            "id": "1c46d9b8-8847-460f-8bc5-fb4e4072a2f1",
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
                        "value": "api_stats_chart",
                        "mode": "list",
                        "cachedResultName": "api_stats_chart"
                  }
            },
            "id": "4eeb7d21-d2aa-4e25-973c-5ae7e3ae8860",
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
            "id": "d3f2b2e4-729e-44df-ad1c-d7481e4a23af",
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
            "id": "433f4d6b-23a5-44e6-8c5d-1d7f1ed6b8d3",
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
            "id": "b531b066-c595-4ccd-9ba7-a228082bf9cc",
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
                  "text": "Process the following data for task 'API Stats Chart':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for API Stats Chart"
                  }
            },
            "id": "9ed764eb-612c-4802-9932-741f73c2b86c",
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
                        "cachedResultName": "API Stats Chart"
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
            "id": "70b3720c-76bb-42d4-a28e-016be84c295e",
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
                  "text": "API Stats Chart error: {$json.error.message}"
            },
            "id": "e7e520aa-6969-416e-a6f4-8f9a593bac72",
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
    name: "Applicant Feedback Folder",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Applicant Feedback Folder",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "7ce644a8-5c25-474d-ae3a-53c8f74476f1",
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
                  "path": "applicant-feedback-folder"
            },
            "id": "d3b2ddcc-92fb-4696-9bb6-5eb65fedb10f",
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
            "id": "c2d64b36-7adc-4c63-8722-d11bc05edda0",
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
            "id": "a01f57f4-f0aa-41e3-9486-8996eb0fc0a4",
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
                        "value": "applicant_feedback_folder",
                        "mode": "list",
                        "cachedResultName": "applicant_feedback_folder"
                  }
            },
            "id": "98c5ac59-4156-4fbc-8646-49e28b37e12f",
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
                        "value": "applicant_feedback_folder",
                        "mode": "list",
                        "cachedResultName": "applicant_feedback_folder"
                  }
            },
            "id": "31611f38-a320-43f1-9077-9823cac1b27c",
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
            "id": "64c1fda2-5757-4cf6-be12-f9fdfb5d032a",
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
            "id": "fe29c4d9-1fad-4a5e-9eaf-0c2d673c00f5",
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
            "id": "a96f8d68-4a2a-4e91-8131-db38c9f156c8",
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
                  "text": "Process the following data for task 'Applicant Feedback Folder':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Applicant Feedback Folder"
                  }
            },
            "id": "6704c3d5-cdec-4530-9cf3-c936b18621f8",
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
                        "cachedResultName": "Applicant Feedback Folder"
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
            "id": "4c1b7df3-a692-4285-918c-eeb7ea56e954",
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
                  "text": "Applicant Feedback Folder error: {$json.error.message}"
            },
            "id": "8310c244-ab16-4926-a82f-e0043a795a68",
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
    name: "Assignment SMS Reminder",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Assignment SMS Reminder",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "a7910b7c-92e9-415c-8754-fbed9c8c594f",
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
                  "path": "assignment-sms-reminder"
            },
            "id": "cf018e3d-4c4e-4977-abc3-8b30defc78ef",
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
            "id": "a701aa19-bd4f-4380-9271-2054007eade2",
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
            "id": "209bfd2d-d15c-4906-aaa3-9c47c36ab605",
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
                  "indexName": "assignment_sms_reminder"
            },
            "id": "510ebe4d-a02e-40d9-808e-ac83d2299936",
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
                  "indexName": "assignment_sms_reminder"
            },
            "id": "8fa4a854-9cdf-43f0-97c6-06e491066a27",
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
            "id": "c5db775c-afc6-4b76-bacc-d592aed4008e",
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
            "id": "b42a0cf0-8115-4af7-8de8-68168e7399ae",
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
            "id": "abab42b5-179b-4929-a876-4664c2fb3869",
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
                  "text": "Process the following data for task 'Assignment SMS Reminder':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Assignment SMS Reminder"
                  }
            },
            "id": "4773cc72-a7f7-49b5-907b-40c5f726dec9",
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
                        "cachedResultName": "Assignment SMS Reminder"
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
            "id": "b3084b31-648f-4736-8d1b-7ee0de4ebf10",
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
                  "text": "Assignment SMS Reminder error: {$json.error.message}"
            },
            "id": "c1059c41-d2d0-47fa-a146-95481e40850f",
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
    name: "Bank SMS Alert to Telegram",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Bank SMS Alert to Telegram",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "8bba6263-435f-4314-b024-e0ce26abaa4a",
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
                  "path": "bank-sms-alert-to-telegram"
            },
            "id": "4c8fd8cf-fc0d-49ec-a24f-e989e6c5cd15",
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
            "id": "e72f2bc8-8a8e-4028-aabe-8945523aff0a",
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
            "id": "a250943a-b044-465b-9a2d-b79171451ad8",
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
                  "indexName": "bank_sms_alert_to_telegram"
            },
            "id": "369546da-d5ad-41b1-9f16-81e217b88ad5",
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
                  "indexName": "bank_sms_alert_to_telegram"
            },
            "id": "eb743252-44c7-4c6f-bf75-a36f514af2c8",
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
            "id": "e964446c-e500-49b4-b030-237d21bb2715",
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
            "id": "7336deaa-1df6-4202-bd35-547cf9fc026e",
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
            "id": "cf4ef355-50dc-4e41-89b7-a1f7a530dd86",
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
                        "systemMessage": "You are an assistant for Bank SMS Alert to Telegram"
                  }
            },
            "id": "be3ba056-c26e-4cee-9c9b-c15a67669ff0",
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
                        "cachedResultName": "Bank SMS Alert to Telegram"
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
            "id": "9f7c5610-8b55-4d46-b0bf-01cad3358ed2",
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
                  "text": "Bank SMS Alert to Telegram error: {$json.error.message}"
            },
            "id": "1fba4c24-9724-4200-8f05-3f279aae8bea",
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
    name: "Birthday Telegram Reminder",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Birthday Telegram Reminder",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "499bef31-9bfd-4a30-8b81-6c8664e79a0f",
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
                  "path": "birthday-telegram-reminder"
            },
            "id": "c1901bee-2c1b-4cc7-9df1-30a2b8559b50",
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
            "id": "1b0b0e7e-b1d1-47c7-82d2-55cda35941c5",
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
            "id": "a3b9a0de-019d-4540-aaaa-07a250454313",
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
                  "indexName": "birthday_telegram_reminder"
            },
            "id": "579ee9ec-23d2-472a-b157-2258e1b9030e",
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
                  "indexName": "birthday_telegram_reminder"
            },
            "id": "0dc6501b-c6c8-4f87-b0a3-05a772cf7f10",
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
            "id": "031e141d-4e62-484a-8f96-6ee7510ae6e7",
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
            "id": "7cc0a197-a75b-4efe-8a33-386d31a7a4a3",
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
            "id": "03fb1c35-3ea8-42fc-8c16-ed7067118c9e",
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
                  "text": "Process the following data for task 'Birthday Telegram Reminder':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Birthday Telegram Reminder"
                  }
            },
            "id": "0f00acfb-1111-4f06-b757-76e390bbbb77",
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
                        "cachedResultName": "Birthday Telegram Reminder"
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
            "id": "ca627631-889a-4297-be03-a9ebf2bdd0c8",
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
                  "text": "Birthday Telegram Reminder error: {$json.error.message}"
            },
            "id": "d6ec7828-a91c-44d6-9138-5da89be3f90e",
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
    name: "Blog Comment Discord",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Blog Comment Discord",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "82b812ed-5376-4fcb-8aa1-d0aafdacf394",
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
                  "path": "blog-comment-discord"
            },
            "id": "7cd78bc9-6f9c-49ff-b301-20351c194a01",
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
            "id": "931184bd-d737-4ee0-83d3-790fcdffb71c",
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
            "id": "948b5a40-c675-4b22-8d94-06372555e0f8",
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
                  "indexName": "blog_comment_discord"
            },
            "id": "f40be7b1-bbf1-46db-bbc9-37a0b93aecea",
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
                  "indexName": "blog_comment_discord"
            },
            "id": "04c8f2e1-32e5-452e-bf69-a4ff4581978a",
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
            "id": "92293484-e699-431c-9d31-d92d278aee0d",
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
            "id": "3e391481-eb82-4151-a205-98a7c72a250d",
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
            "id": "b2e5956e-1b19-4df8-9753-1fb5f376b150",
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
                  "text": "Process the following data for task 'Blog Comment Discord':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Blog Comment Discord"
                  }
            },
            "id": "c8499c4b-4774-41ea-ad92-6b24a75c8cd1",
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
                        "cachedResultName": "Blog Comment Discord"
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
            "id": "b7800da2-d330-404c-8c1e-0071414ef68a",
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
                  "text": "Blog Comment Discord error: {$json.error.message}"
            },
            "id": "b9f4c51a-59b7-42b7-89d7-6749f1d9503a",
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
    name: "Blood Test Email Alert",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Blood Test Email Alert",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "66fd712a-d30b-4837-9781-1e7f40470a18",
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
                  "path": "blood-test-email-alert"
            },
            "id": "7a588b32-00a1-41a3-a02f-f87eed240446",
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
            "id": "ce617935-770b-4c86-b082-19fecad2e663",
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
            "id": "54f567f9-7d21-432b-8506-61d357a6c11f",
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
                  "indexName": "blood_test_email_alert"
            },
            "id": "d0dea4ec-1cfa-4d38-81e6-dd097248f8c5",
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
                  "indexName": "blood_test_email_alert"
            },
            "id": "2aad603d-1af9-4cce-b541-91ddbd9e3849",
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
            "id": "232c9af2-7f53-4c59-9da7-8199210ad660",
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
            "id": "7813ab2c-625d-4941-924e-61bd1c644510",
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
            "id": "75f668f2-3e48-4b34-9cc7-abe95f61b157",
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
                  "text": "Process the following data for task 'Blood Test Email Alert':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Blood Test Email Alert"
                  }
            },
            "id": "57a825b5-95b8-4f20-bfcf-48a9da28ef9e",
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
                        "cachedResultName": "Blood Test Email Alert"
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
            "id": "243a70eb-4c62-4ca4-a6fc-81c9171caaf7",
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
                  "text": "Blood Test Email Alert error: {$json.error.message}"
            },
            "id": "52782e9d-b356-438b-a575-c4d9c6647a41",
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
    name: "Calendar Event Auto-tag",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Calendar Event Auto-tag",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "d41f0bca-60f2-42f6-8283-6b90cd9da0fb",
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
                  "path": "calendar-event-auto-tag"
            },
            "id": "b9699e56-abbc-4dbd-a302-34778ca57807",
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
            "id": "45e22857-69e5-4910-a8a4-eba26439c991",
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
            "id": "0c75dd00-f3d3-4dbe-9485-4d5b3a584e3f",
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
                  "indexName": "calendar_event_auto-tag"
            },
            "id": "651f51f2-51a6-4507-b3f4-86e2be5be9fc",
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
                  "indexName": "calendar_event_auto-tag"
            },
            "id": "2097dece-c795-48c4-ab4a-e61e2dae9e2d",
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
            "id": "a2f32ba3-0b89-4300-af68-c2676fceec51",
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
            "id": "0e0165a0-b5cf-4c04-b28f-45e646dd6eb8",
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
            "id": "5b28014a-edff-4b54-a156-50ea240a0f3d",
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
                  "text": "Process the following data for task 'Calendar Event Auto-tag':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Calendar Event Auto-tag"
                  }
            },
            "id": "d875843e-628a-4acf-b837-887a1e9b5513",
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
                        "cachedResultName": "Calendar Event Auto-tag"
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
            "id": "9b3cbd85-6d08-4155-841f-b25dc2a8fb20",
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
                  "text": "Calendar Event Auto-tag error: {$json.error.message}"
            },
            "id": "ad91cf83-861e-4574-8c7e-54735fcfe7f3",
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
    name: "Calendar to ClickUp",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Calendar to ClickUp",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "7c2f6c31-cef6-4faa-85d2-1b612ca47738",
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
                  "path": "calendar-to-clickup"
            },
            "id": "616b196a-7236-4a77-85d2-8ce0bea08e1a",
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
            "id": "3069949e-0f7e-4e4c-bb8b-0c47fc2e46c5",
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
            "id": "ea8f8a1f-5338-47b5-afc1-293b76318357",
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
                        "value": "calendar_to_clickup",
                        "mode": "list",
                        "cachedResultName": "calendar_to_clickup"
                  }
            },
            "id": "b341bded-d136-4a8d-9f00-861b8437e4aa",
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
                        "value": "calendar_to_clickup",
                        "mode": "list",
                        "cachedResultName": "calendar_to_clickup"
                  }
            },
            "id": "b7ebe434-8f63-4f1f-b422-b14cea1ea63e",
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
            "id": "4528b267-fcda-42d7-a0e3-de6cda9f5a1a",
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
            "id": "ea1959d2-be0c-4b6f-93f4-962b33e835ed",
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
            "id": "4e2527c8-2303-4265-b3d3-dd3bcdbdfb61",
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
                  "text": "Process the following data for task 'Calendar to ClickUp':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Calendar to ClickUp"
                  }
            },
            "id": "4167d420-b67d-4d8f-9b2a-259d650e3a3f",
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
                        "cachedResultName": "Calendar to ClickUp"
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
            "id": "107584cc-3d6b-4c62-957a-9ef5a3fe4f2a",
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
                  "text": "Calendar to ClickUp error: {$json.error.message}"
            },
            "id": "ba428de4-7fdf-42f7-9214-0f66a7ef77f1",
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
    name: "Course Completion Certificate",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Course Completion Certificate",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "00188eee-a2bc-4d65-bea7-22693ab8d22e",
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
                  "path": "course-completion-certificate"
            },
            "id": "7853e915-bbc6-44ea-9756-b2a0d25ba361",
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
            "id": "c4963bac-745d-4822-bc0d-5b47d4d4eb48",
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
            "id": "eac7a044-6d99-4607-b9b6-ec9e3d2fbb97",
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
                  "indexName": "course_completion_certificate"
            },
            "id": "a11419fc-733e-4ce2-9755-eba3fb7164c1",
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
                  "indexName": "course_completion_certificate"
            },
            "id": "9276d92b-ce2d-4fa3-a028-0d27d17d5d2c",
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
            "id": "6ccce1d0-d448-4e7e-a094-cc720756e668",
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
            "id": "f1db10d2-bf1a-4569-bac3-f44825040634",
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
            "id": "a2f054a8-22d1-4dbb-ab4e-06ba254d97a6",
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
                  "text": "Process the following data for task 'Course Completion Certificate':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Course Completion Certificate"
                  }
            },
            "id": "457880d0-86d1-42e8-b91e-658967a70c21",
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
                        "cachedResultName": "Course Completion Certificate"
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
            "id": "c60c62d0-9301-41c4-8cf6-5dcb6d065950",
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
                  "text": "Course Completion Certificate error: {$json.error.message}"
            },
            "id": "4987eb2b-a7ce-4689-b0b3-b87f9ab983e3",
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
    name: "CRM Patient Intake",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: CRM Patient Intake",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "86b9f13f-62f9-458f-ad1f-551c22acc97c",
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
                  "path": "crm-patient-intake"
            },
            "id": "4b09900a-e4e7-4144-a460-cb44ceca072f",
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
            "id": "c5dacca0-17d6-4413-8ec8-ad721be328d2",
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
            "id": "68a58074-378e-469d-9022-b3c83bf8ee6c",
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
                  "indexName": "crm_patient_intake"
            },
            "id": "9720a931-4c26-45b9-a8c9-31d352d534d8",
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
                  "indexName": "crm_patient_intake"
            },
            "id": "023dbcb5-e494-4c25-a83d-6c4e8f78888b",
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
            "id": "c988cbab-d0da-4d21-a19f-9d499df5376b",
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
            "id": "eeec0d68-4233-4083-aedf-f9f81ead580f",
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
            "id": "9ee23255-eb1c-457b-849b-b5e8b38d447b",
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
                  "text": "Process the following data for task 'CRM Patient Intake':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for CRM Patient Intake"
                  }
            },
            "id": "7852e84c-7f0b-44dd-8843-4c3d74d4b8ce",
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
                        "cachedResultName": "CRM Patient Intake"
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
            "id": "fdb770b5-451d-4b86-b968-6b3101545a94",
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
                  "text": "CRM Patient Intake error: {$json.error.message}"
            },
            "id": "c9724e0b-7606-43a4-9765-2a4dd1d01646",
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
    name: "Cron Success Slack",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Cron Success Slack",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "b03d8e1e-d7b2-442c-9fae-ccf65c4125a7",
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
                  "path": "cron-success-slack"
            },
            "id": "3f1813a6-4c11-437c-a487-fd91b2c0988f",
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
            "id": "51415661-613f-4c39-9abf-6eb052df2251",
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
            "id": "5b064711-d117-44cd-83f4-789be1762c3a",
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
                  "indexName": "cron_success_slack"
            },
            "id": "0d3f05c1-1023-4aa1-897f-87de0ca47a39",
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
                  "indexName": "cron_success_slack"
            },
            "id": "b8778660-dd26-4673-91b7-822e543607ef",
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
            "id": "6855ebd4-1b15-485f-90ab-a9755d50ba60",
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
            "id": "f57b718e-8d0c-4bd4-810d-fbc53fb37133",
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
            "id": "f0e56d0c-773e-4a79-8299-082b5f6ab424",
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
                  "text": "Process the following data for task 'Cron Success Slack':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Cron Success Slack"
                  }
            },
            "id": "20ac9f41-be41-4862-82ce-afbfe3abda1d",
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
                        "cachedResultName": "Cron Success Slack"
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
            "id": "10e0dee3-1d1e-4ad0-b1cf-89699aefb1fd",
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
                  "text": "Cron Success Slack error: {$json.error.message}"
            },
            "id": "b7bfc454-6aaf-46c9-b35c-e88974babc1b",
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
    name: "CSV Attachment to Airtable",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: CSV Attachment to Airtable",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "8301780b-c5bd-48b4-9288-f69b1c8ba012",
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
                  "path": "csv-attachment-to-airtable"
            },
            "id": "f2045b0e-4bf6-4788-afac-442f93a9974d",
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
            "id": "14d8c6a2-cd6e-4a57-af38-3f2a56aec148",
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
            "id": "5ece73c9-1c2c-40b7-a5c3-faebc32150a5",
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
                        "value": "csv_attachment_to_airtable",
                        "mode": "list",
                        "cachedResultName": "csv_attachment_to_airtable"
                  }
            },
            "id": "84e50d79-ac2c-45a3-84d6-4996378952bc",
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
                        "value": "csv_attachment_to_airtable",
                        "mode": "list",
                        "cachedResultName": "csv_attachment_to_airtable"
                  }
            },
            "id": "af1a60d0-bf2b-4cd8-bd36-77eb41d439e4",
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
            "id": "ac062bd5-d5ea-45c8-81e3-f2c25a84691c",
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
            "id": "717a5d25-6283-498d-a866-d827a1b31e5b",
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
            "id": "5f81d9fb-3d8c-4824-9ad8-a7a48a251232",
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
                  "text": "Process the following data for task 'CSV Attachment to Airtable':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for CSV Attachment to Airtable"
                  }
            },
            "id": "9597ffe2-20a8-49df-98bf-bc722d5af74f",
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
                        "cachedResultName": "CSV Attachment to Airtable"
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
            "id": "77736a14-1aff-4736-8345-270bfbc5d262",
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
                  "text": "CSV Attachment to Airtable error: {$json.error.message}"
            },
            "id": "c80995ec-dba6-4418-b275-8b8ccf01112d",
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
    name: "Customer Auto-tagging",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Customer Auto-tagging",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "9f1c238b-8782-4c9d-8f31-70ea9793ffa1",
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
                  "path": "customer-auto-tagging"
            },
            "id": "85f21561-f8cf-4292-96c6-5b73484e95bd",
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
            "id": "2c222980-aa73-4e0b-9a39-b9b15835cfcb",
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
            "id": "040314a3-fbfa-453d-9162-c149ea7ebd25",
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
                        "value": "customer_auto-tagging",
                        "mode": "list",
                        "cachedResultName": "customer_auto-tagging"
                  }
            },
            "id": "cc35e2b3-4495-4dcc-ae87-35e39a99fbdf",
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
                        "value": "customer_auto-tagging",
                        "mode": "list",
                        "cachedResultName": "customer_auto-tagging"
                  }
            },
            "id": "95966bc7-b3d8-4f9c-9af2-baf9ccfd4254",
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
            "id": "fbff62ae-f2ff-441d-927f-5b35a26b4e3f",
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
            "id": "1ccb9845-18a2-43a9-be19-520384e40b13",
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
            "id": "c4667e9a-c357-4d63-94a5-aee983169921",
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
                  "text": "Process the following data for task 'Customer Auto-tagging':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Customer Auto-tagging"
                  }
            },
            "id": "9d38d1cc-9ae6-459d-ab4a-63e57afac794",
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
                        "cachedResultName": "Customer Auto-tagging"
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
            "id": "86e15f12-c9a3-4177-bb69-9dfb9d81c651",
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
                  "text": "Customer Auto-tagging error: {$json.error.message}"
            },
            "id": "95afe2a2-f3f2-4879-b4f1-533c35e6ac0d",
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
    name: "Disaster API SMS",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Disaster API SMS",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "69257a08-9220-4154-99e2-37bb863ffbf1",
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
                  "path": "disaster-api-sms"
            },
            "id": "2d2f47ff-0270-49e9-8eae-b2953001fea5",
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
            "id": "d9372145-e221-48ad-8307-074fb66158c9",
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
            "id": "8af454d1-43d4-4d9b-87b6-8b27ae50fbbe",
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
                  "indexName": "disaster_api_sms"
            },
            "id": "e6468b01-b39b-415b-af3c-739622e715c8",
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
                  "indexName": "disaster_api_sms"
            },
            "id": "d25b5499-42aa-4b97-9051-e11762523d98",
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
            "id": "8c4ffec5-8b34-4d3d-a598-9244e3ef5aaf",
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
            "id": "e0077d9b-ebae-4102-b038-beadcdf71f0b",
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
            "id": "1cde59f5-0cfe-40d6-8652-360c1e2606ca",
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
                  "text": "Process the following data for task 'Disaster API SMS':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Disaster API SMS"
                  }
            },
            "id": "de908410-ed39-485d-b33b-c98ebc6edbd6",
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
                        "cachedResultName": "Disaster API SMS"
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
            "id": "01254f9e-0418-488f-ae6c-8d159c76f4f9",
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
                  "text": "Disaster API SMS error: {$json.error.message}"
            },
            "id": "d2328665-5b92-4bfd-b840-7bddb01c99f3",
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
    name: "Drink Water Reminder",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Drink Water Reminder",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "ed0b6b94-6a94-459d-80d6-b0518159e0ba",
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
                  "path": "drink-water-reminder"
            },
            "id": "201ce50f-f77e-4158-8906-4644e6149164",
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
            "id": "e8c52f63-a4ec-4be6-bdd5-2bc2a9be7f2b",
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
            "id": "a262a182-2e66-403a-adf1-8abac8978048",
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
                  "indexName": "drink_water_reminder"
            },
            "id": "7762e59b-4eee-4678-97b8-8c738d1bbd41",
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
                  "indexName": "drink_water_reminder"
            },
            "id": "51ae1340-fc63-469b-914f-0808a9f06982",
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
            "id": "e969e9b4-2c70-4439-a568-04d7a65dcba7",
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
            "id": "5e929e1e-2299-47c0-88b2-07186e7e36d6",
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
            "id": "bfdde168-99df-4b0a-bf81-c1bb8e1cc03a",
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
                  "text": "Process the following data for task 'Drink Water Reminder':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Drink Water Reminder"
                  }
            },
            "id": "58d6b2d9-dd3b-4875-bb4c-d3be55cd5cd8",
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
                        "cachedResultName": "Drink Water Reminder"
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
            "id": "3b941dbb-1b0d-465b-b2d8-631caeb45aeb",
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
                  "text": "Drink Water Reminder error: {$json.error.message}"
            },
            "id": "a42e5614-ba09-4115-a7a5-bc5c07706df8",
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
    name: "Etsy Review to Slack",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Etsy Review to Slack",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "9ada3f67-3926-4995-8f82-0f8265c7da57",
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
                  "path": "etsy-review-to-slack"
            },
            "id": "51db7f77-5b42-4259-bb85-216d79fcbc01",
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
            "id": "9e891d18-bca7-4422-807c-141de650b33d",
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
            "id": "fbb181b3-49c1-4ace-a94e-a76e5ad7edcf",
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
                  "indexName": "etsy_review_to_slack"
            },
            "id": "0ebef6a8-753a-470e-a984-5a10932fe1b8",
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
                  "indexName": "etsy_review_to_slack"
            },
            "id": "e79e1d34-4dd4-42d0-b35d-bd520abd2103",
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
            "id": "41b356e4-b29e-4b80-950d-53fbb1035a35",
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
            "id": "3e5896c8-c0ae-435a-93ee-048a3cd5f8ef",
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
            "id": "da4d79ca-74f7-4d86-96f4-14f4ecd88a16",
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
                  "text": "Process the following data for task 'Etsy Review to Slack':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Etsy Review to Slack"
                  }
            },
            "id": "218c49e7-8815-4df7-8544-36f413a1eb98",
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
                        "cachedResultName": "Etsy Review to Slack"
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
            "id": "2c838709-3373-44d0-bf31-87d60a1c351b",
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
                  "text": "Etsy Review to Slack error: {$json.error.message}"
            },
            "id": "68cee1a3-f365-4358-a9b3-e374260270be",
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
    name: "Fitness API Weekly Report",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Fitness API Weekly Report",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "fb5b6cc9-a3ca-4c2c-bd10-1545178cd1ed",
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
                  "path": "fitness-api-weekly-report"
            },
            "id": "344206c2-8c8c-4fbb-858a-c0e8eedc2ce0",
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
            "id": "2e12fc58-d1e8-4878-82bc-e22fee023178",
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
            "id": "35886feb-ae64-4aa0-a2e8-547e50be4aa6",
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
                  "indexName": "fitness_api_weekly_report"
            },
            "id": "92ee7d9d-e7c4-4e59-b838-31c9c9a8bd14",
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
                  "indexName": "fitness_api_weekly_report"
            },
            "id": "5b028e05-8481-4805-b63e-725f96511836",
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
            "id": "83a18d4e-1ca4-4d27-b86e-74e2cbfdb959",
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
            "id": "164d5925-32e6-4c0d-82c2-aa41700bef8d",
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
            "id": "da0b3613-27f6-475a-a68b-c2af2c462ac3",
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
                  "text": "Process the following data for task 'Fitness API Weekly Report':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Fitness API Weekly Report"
                  }
            },
            "id": "e037ce6e-8a01-4a60-8560-83151db3c6f0",
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
                        "cachedResultName": "Fitness API Weekly Report"
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
            "id": "7f166559-0c74-4fa3-9958-bc492bb87d08",
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
                  "text": "Fitness API Weekly Report error: {$json.error.message}"
            },
            "id": "bfd4a5fa-28b7-4f39-923a-064ca8d964cf",
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
    name: "GA Report Email",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: GA Report Email",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "4f1aab57-9308-4e86-9152-61fbfa3365a9",
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
                  "path": "ga-report-email"
            },
            "id": "65695649-dfc5-4677-af78-567051da6234",
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
            "id": "22d39ff9-e8dd-4313-acb9-acdcd9f182b5",
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
            "id": "72155732-71f4-430d-bac5-57a8842ddf00",
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
                        "value": "ga_report_email",
                        "mode": "list",
                        "cachedResultName": "ga_report_email"
                  }
            },
            "id": "e8c7d48f-3e97-43fd-84bb-4dcb616db2a2",
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
                        "value": "ga_report_email",
                        "mode": "list",
                        "cachedResultName": "ga_report_email"
                  }
            },
            "id": "7970719b-0019-46eb-a2db-84a2b521bd2c",
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
            "id": "f9dc8e53-1929-4110-af74-421e6cdafd5e",
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
            "id": "a1d434ec-e2cc-4e88-b7c0-e4d697bb6833",
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
            "id": "47f73715-e5ee-4f85-a7ae-99b049c4ad90",
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
                  "text": "Process the following data for task 'GA Report Email':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for GA Report Email"
                  }
            },
            "id": "d90712e6-0d32-4474-9bd5-665e46dab37f",
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
                        "cachedResultName": "GA Report Email"
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
            "id": "97fb2a42-c618-4a3e-b35b-18123b46da9a",
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
                  "text": "GA Report Email error: {$json.error.message}"
            },
            "id": "84e064b7-1ad4-4cbc-97aa-a65eb5a8d6e9",
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
    name: "Grant Application Routing",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Grant Application Routing",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "617b027d-f07d-4f02-991e-e0849d539894",
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
                  "path": "grant-application-routing"
            },
            "id": "dde8f45d-7cd6-4fd7-9f9d-251cd9c77c83",
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
            "id": "b245846a-bd59-42e8-8e2b-dc0a52250848",
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
            "id": "85d8d786-d82d-44aa-baf7-44b2012aedcb",
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
                  "indexName": "grant_application_routing"
            },
            "id": "d8b6b087-21de-4f50-9bfc-e838d9065861",
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
                  "indexName": "grant_application_routing"
            },
            "id": "c5d0fbe8-a21a-4565-a08c-e138c83e498d",
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
            "id": "8e30a670-ca06-4755-9de3-5a7ce685e436",
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
            "id": "429f791a-5173-4481-8962-4ece4084d641",
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
            "id": "3eafa51a-284f-40cd-af6b-267a1901b9d6",
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
                  "text": "Process the following data for task 'Grant Application Routing':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Grant Application Routing"
                  }
            },
            "id": "492a65b2-b17e-41f4-9cb3-a33434ec9b22",
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
                        "cachedResultName": "Grant Application Routing"
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
            "id": "92aa830c-345d-4c2f-9995-def7960bcb61",
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
                  "text": "Grant Application Routing error: {$json.error.message}"
            },
            "id": "bbb4a1df-650b-459b-8306-35a8d6daeb50",
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
    name: "Habit Form Weekly Summary",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Habit Form Weekly Summary",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "7b944cd3-60b2-41b7-b889-5b024ced0c89",
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
                  "path": "habit-form-weekly-summary"
            },
            "id": "ac0c36ba-43c3-489a-9a4c-c86a7d639a1f",
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
            "id": "4fbb3ced-45ca-421b-b317-48d64e758d12",
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
            "id": "42114436-997f-4fb9-beeb-de2ca3488fdb",
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
                  "indexName": "habit_form_weekly_summary"
            },
            "id": "0722c641-3b7a-40ad-8983-5b8ecfa389b2",
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
                  "indexName": "habit_form_weekly_summary"
            },
            "id": "07be59f8-c6ef-4bc2-a526-7b6e9b36c5ec",
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
            "id": "f84a5cf4-06ed-461f-a1ef-d793e742590a",
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
            "id": "032e9fb8-fe54-4280-b0d1-d52f6c90e9e2",
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
            "id": "94ce5622-db58-490e-8f7a-add3e0864617",
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
                  "text": "Process the following data for task 'Habit Form Weekly Summary':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Habit Form Weekly Summary"
                  }
            },
            "id": "4ebafa38-6715-4530-a9d0-346a1cbb2603",
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
                        "cachedResultName": "Habit Form Weekly Summary"
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
            "id": "366ff844-9210-4681-be50-f3022b5dfe48",
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
                  "text": "Habit Form Weekly Summary error: {$json.error.message}"
            },
            "id": "c3009b9c-07ab-48ec-a6fc-f9ced5717941",
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
    name: "Hourly Weather Log",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Hourly Weather Log",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "51aa653a-88c3-4c63-a30e-23e01031d76c",
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
                  "path": "hourly-weather-log"
            },
            "id": "955ca4d7-8066-4712-ad7f-eeab2a629b08",
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
            "id": "f318ebee-206e-4347-9ef6-141b8d3d4e38",
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
            "id": "a911e7f9-4f45-4147-8587-c30df655785d",
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
                        "value": "hourly_weather_log",
                        "mode": "list",
                        "cachedResultName": "hourly_weather_log"
                  }
            },
            "id": "75934585-942c-4b4f-92c1-bda09dc8328e",
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
                        "value": "hourly_weather_log",
                        "mode": "list",
                        "cachedResultName": "hourly_weather_log"
                  }
            },
            "id": "81757525-16d6-4d55-885a-268ba7664b51",
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
            "id": "844830f7-13a2-43af-91ea-5aa08a5f9eaf",
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
            "id": "febe0952-37a0-4da6-a0fb-ddfe003ce96a",
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
            "id": "81d81450-043b-48c2-a451-1dfe378bd650",
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
                  "text": "Process the following data for task 'Hourly Weather Log':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Hourly Weather Log"
                  }
            },
            "id": "913a12fc-d88b-4041-bb4a-25d6f4f7504b",
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
                        "cachedResultName": "Hourly Weather Log"
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
            "id": "7928b2a8-a1c7-480e-8e73-9e5ffd5d2680",
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
                  "text": "Hourly Weather Log error: {$json.error.message}"
            },
            "id": "76b5c2b4-ba2f-4468-b089-71108eb88420",
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
    name: "Idea to IG Carousel",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Idea to IG Carousel",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "54134b2f-ee07-4ee3-8934-091e0cc39c6d",
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
                  "path": "idea-to-ig-carousel"
            },
            "id": "0557fff1-0a8e-4013-b7ec-ac586a69ab59",
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
            "id": "dd6a352a-89f3-4456-b938-f407c2702e16",
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
            "id": "b20d9054-64c5-4e92-9e49-5c7f5808590a",
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
                  "indexName": "idea_to_ig_carousel"
            },
            "id": "1a52a5a3-2ce3-406f-9ad1-98b30266be23",
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
                  "indexName": "idea_to_ig_carousel"
            },
            "id": "72a71b2d-bb5d-4545-9482-a524dda1e1b0",
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
            "id": "64a8d0c4-6d19-4726-a74c-7220105d0ce9",
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
            "id": "fb391d71-831a-4785-a6f8-fcb394893cd3",
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
            "id": "a37dc046-d17e-44b1-b0af-3d40f8a7cd3a",
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
                  "text": "Process the following data for task 'Idea to IG Carousel':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Idea to IG Carousel"
                  }
            },
            "id": "20b5f76e-141a-412b-9b8d-9d2e2ec88641",
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
                        "cachedResultName": "Idea to IG Carousel"
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
            "id": "f4779a50-0a27-4916-889c-b4164139db72",
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
                  "text": "Idea to IG Carousel error: {$json.error.message}"
            },
            "id": "5d1c9252-8f74-40d5-aae1-b1ad869d16d1",
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
    name: "Interview Scheduler",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Interview Scheduler",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "29ebd35b-f428-4229-ae22-5601a2462b42",
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
                  "path": "interview-scheduler"
            },
            "id": "3c628416-38b1-47e0-99f5-96f5bd7ccd4c",
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
            "id": "186c76a5-0685-4d2f-a393-e4ef88ce1aae",
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
            "id": "e79dbc8f-eb89-4738-a95b-778cf9107690",
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
                  "indexName": "interview_scheduler"
            },
            "id": "f76b463b-138b-4e56-9c1c-3f6547ff4131",
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
                  "indexName": "interview_scheduler"
            },
            "id": "f50cecc1-26bf-4069-b176-503943b30cb8",
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
            "id": "8f7b7e77-a500-4e5e-b6be-2055430c83b4",
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
            "id": "d66d9836-2f7b-4637-a0f9-4df46ebd65b8",
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
            "id": "8a4a94a8-d20f-4e25-a391-6b38f9184f0b",
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
                  "text": "Process the following data for task 'Interview Scheduler':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Interview Scheduler"
                  }
            },
            "id": "8eb1e7ec-409f-4aee-a411-c611adb5a09e",
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
                        "cachedResultName": "Interview Scheduler"
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
            "id": "5bd51947-ad76-40ca-b49f-614102d20d75",
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
                  "text": "Interview Scheduler error: {$json.error.message}"
            },
            "id": "7ef1a95a-12b8-4b48-867b-d1ad62f4ceec",
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
    name: "Issue Trello Card",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Issue Trello Card",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "ffde606d-21f9-46d6-b42a-7a7b85966a40",
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
                  "path": "issue-trello-card"
            },
            "id": "2c7406e0-da42-4bfb-8c62-4a249a6f2f77",
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
            "id": "068f1d79-d90c-4f1a-9625-98ccb22a77f0",
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
            "id": "f0266964-6acb-4e74-92d6-41bcce892631",
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
                  "indexName": "issue_trello_card"
            },
            "id": "81d47557-d8b7-4f1e-af5d-132f387df011",
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
                  "indexName": "issue_trello_card"
            },
            "id": "7929908d-f850-4062-8d76-a7ff9dd0f8e3",
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
            "id": "c3245d8a-627e-425b-afc8-f8a024ef95af",
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
            "id": "e1e8ad99-075a-435f-84b8-f6972f232af5",
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
            "id": "7f4e69ff-d8aa-48dd-8383-dbef10749fcf",
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
                  "text": "Process the following data for task 'Issue Trello Card':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Issue Trello Card"
                  }
            },
            "id": "488d5b09-7889-4783-8204-5716d88f86e1",
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
                        "cachedResultName": "Issue Trello Card"
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
            "id": "374e3b87-35e3-4ebf-a097-8b2ddf56e667",
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
                  "text": "Issue Trello Card error: {$json.error.message}"
            },
            "id": "51574494-a67b-4ff6-96ad-a414525a9ea6",
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
    name: "JSON to Sheet",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: JSON to Sheet",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "22ae73af-1660-49c3-97b3-3e896eaab598",
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
                  "path": "json-to-sheet"
            },
            "id": "2b9c6e14-8640-4c28-a593-07c2c7b34dcc",
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
            "id": "a3ffd546-08d9-48cb-9cf1-814f585c244e",
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
            "id": "26b8037e-5205-4e2e-9f84-f45759cdc143",
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
                        "value": "json_to_sheet",
                        "mode": "list",
                        "cachedResultName": "json_to_sheet"
                  }
            },
            "id": "8e87db29-aed5-4470-974b-2d9a7f80c050",
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
                        "value": "json_to_sheet",
                        "mode": "list",
                        "cachedResultName": "json_to_sheet"
                  }
            },
            "id": "1a4f3b0a-2109-4277-82d5-d2f8bad3e1b8",
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
            "id": "d9de9e88-d22b-400e-a6c9-6c33c6a6bf62",
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
            "id": "39699355-6f61-45d7-ac91-739b8ae368ad",
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
            "id": "69b5c1aa-f248-4db2-b35a-f5ac7470b2ce",
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
                  "text": "Process the following data for task 'JSON to Sheet':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for JSON to Sheet"
                  }
            },
            "id": "6fbd4ea9-4762-4904-a2a6-eea9f6d7f629",
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
                        "cachedResultName": "JSON to Sheet"
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
            "id": "3b91edac-b782-4e3b-8b42-a6b45da192c7",
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
                  "text": "JSON to Sheet error: {$json.error.message}"
            },
            "id": "40ba60ac-f1dd-4440-9339-3ec56db3532e",
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
    name: "Keyword Rank Checker",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Keyword Rank Checker",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "d00aa5cd-2981-4071-84fc-e3de476eb2b2",
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
                  "path": "keyword-rank-checker"
            },
            "id": "972f3da6-471e-44eb-a9f5-0466549f6b15",
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
            "id": "f791b601-16df-43af-9143-de71bb580fc3",
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
            "id": "f86574e7-b2df-4d40-8584-22358a65ac1b",
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
                        "value": "keyword_rank_checker",
                        "mode": "list",
                        "cachedResultName": "keyword_rank_checker"
                  }
            },
            "id": "4b633ac2-3e70-4ff3-abc1-98be488a7947",
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
                        "value": "keyword_rank_checker",
                        "mode": "list",
                        "cachedResultName": "keyword_rank_checker"
                  }
            },
            "id": "870105c9-1129-4898-a4bb-3324bd44925e",
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
            "id": "01144960-9194-4d3b-838a-7e173be01ab1",
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
            "id": "7dfa5c62-a11b-45fc-8bce-65501cd3e82e",
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
            "id": "97a934f6-419d-4215-b387-177c5bccfd38",
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
                  "text": "Process the following data for task 'Keyword Rank Checker':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Keyword Rank Checker"
                  }
            },
            "id": "1795a245-6b80-4c82-95b3-06c0401489e1",
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
                        "cachedResultName": "Keyword Rank Checker"
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
            "id": "c8c6865f-915d-4009-8d0a-0905cc78cb55",
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
                  "text": "Keyword Rank Checker error: {$json.error.message}"
            },
            "id": "01d3638c-42b4-4973-aef8-73590c69fa0e",
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
    name: "Low Stock Discord",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Low Stock Discord",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "b8ef13db-322d-4720-aaf3-7721bd8e6e80",
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
                  "path": "low-stock-discord"
            },
            "id": "f991c8e6-2992-48db-81d5-a42231e624c4",
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
            "id": "9cd9834a-143e-41da-b019-cc49c5989d93",
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
            "id": "0966b81f-85e9-4607-859d-62634d769406",
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
                        "value": "low_stock_discord",
                        "mode": "list",
                        "cachedResultName": "low_stock_discord"
                  }
            },
            "id": "8614a99c-b543-4390-ba45-2a96ca1e63c3",
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
                        "value": "low_stock_discord",
                        "mode": "list",
                        "cachedResultName": "low_stock_discord"
                  }
            },
            "id": "53da28ef-3686-439d-938e-39d996c9ba6c",
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
            "id": "56126f8f-464f-4a1c-aed0-6b1e8769d079",
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
            "id": "b74a3d7a-f381-4097-8f4e-f5c8747191f1",
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
            "id": "9cb002e3-f7e7-4a40-a949-6e0c3ce85038",
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
                  "text": "Process the following data for task 'Low Stock Discord':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Low Stock Discord"
                  }
            },
            "id": "b4a5efd2-c5c3-4bc2-a91c-45398ee7fc6c",
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
                        "cachedResultName": "Low Stock Discord"
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
            "id": "2fb9d0e8-6181-40b5-a98b-d4089226c5c7",
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
                  "text": "Low Stock Discord error: {$json.error.message}"
            },
            "id": "9430d717-9c59-41ef-81d1-d148720f9fd0",
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
    name: "Medication SMS Reminder",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Medication SMS Reminder",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "e375f277-fe00-4b84-9ea1-e857a74bbae2",
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
                  "path": "medication-sms-reminder"
            },
            "id": "4c5aa5e0-752e-48f0-ae94-be8888892e7d",
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
            "id": "7cd06a1f-b407-4b53-8061-a53487bbfffa",
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
            "id": "738d34ba-e6b6-4e3a-9248-ef1f4818c3ba",
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
                  "indexName": "medication_sms_reminder"
            },
            "id": "a3f0b3e4-fc10-483f-ba86-f538f8519828",
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
                  "indexName": "medication_sms_reminder"
            },
            "id": "3e00b69e-4134-4228-a940-4007fe485227",
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
            "id": "fcba2e14-0747-4adb-903d-a2965f7279ba",
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
            "id": "c85c12f3-bb6b-4783-bc85-f7b25e195654",
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
            "id": "ae92f4c9-30d7-40c8-858b-3ac32a9e84cb",
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
                  "text": "Process the following data for task 'Medication SMS Reminder':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Medication SMS Reminder"
                  }
            },
            "id": "8d120bef-6619-4313-8b3b-2739626f4d4b",
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
                        "cachedResultName": "Medication SMS Reminder"
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
            "id": "55d8515a-e6d8-4338-82a8-6bc053f4b81a",
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
                  "text": "Medication SMS Reminder error: {$json.error.message}"
            },
            "id": "0c856440-0210-4401-8a19-4e3033cda466",
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
    name: "Notion API Update",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Notion API Update",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "f6eedc53-53fe-45e3-be02-ee32b2bc2548",
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
                  "path": "notion-api-update"
            },
            "id": "97e8e13c-6fe1-4756-83fe-f3106f99b4bd",
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
            "id": "b4faac7a-fac8-49c6-b6e9-105dc0097ef0",
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
            "id": "8bfcea9f-6dee-4038-a2d1-7f2c8b8368b6",
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
                  "indexName": "notion_api_update"
            },
            "id": "4fb1d720-e915-4a9f-8697-3349b879a922",
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
                  "indexName": "notion_api_update"
            },
            "id": "316f1a80-040b-480e-bfbe-c54cfd217db5",
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
            "id": "839a9f23-7777-47ca-acc7-2aab8bec04a5",
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
            "id": "6280048e-4689-4f3b-a73d-2ab89e73f02a",
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
            "id": "46ef3d02-55d4-4733-8b2e-8494a20c30d7",
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
                  "text": "Process the following data for task 'Notion API Update':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Notion API Update"
                  }
            },
            "id": "f2b616b4-b278-49c6-93ed-9cd28ed91d31",
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
                        "cachedResultName": "Notion API Update"
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
            "id": "0d8f0c1f-a667-4b44-befd-36b2b2fd162d",
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
                  "text": "Notion API Update error: {$json.error.message}"
            },
            "id": "ce94609f-2f12-4f5c-8900-6cdca74e0284",
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
    name: "Onboarding Checklist Slack",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Onboarding Checklist Slack",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "47baf67d-8d9c-4ff2-a315-52b5044d77de",
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
                  "path": "onboarding-checklist-slack"
            },
            "id": "a5a701dc-07df-4876-9e7f-2686ed66a383",
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
            "id": "713d5ed4-d517-4823-a61c-9700a342b20a",
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
            "id": "eaa8c182-8035-46fe-a91d-49ffee0a2f0c",
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
                  "indexName": "onboarding_checklist_slack"
            },
            "id": "96bc3a2d-ef03-417a-b967-7c174604b874",
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
                  "indexName": "onboarding_checklist_slack"
            },
            "id": "736e3e0d-6670-4a38-977e-73983e7915e0",
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
            "id": "0b422760-05ca-45e8-9335-3349187c8041",
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
            "id": "e493bfbf-0966-41f4-a49f-19e2496047e0",
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
            "id": "97e21be6-5b77-49da-beda-189f5cd592d4",
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
                  "text": "Process the following data for task 'Onboarding Checklist Slack':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Onboarding Checklist Slack"
                  }
            },
            "id": "b40c8009-ff84-477c-a34d-700d13ffbfe2",
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
                        "cachedResultName": "Onboarding Checklist Slack"
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
            "id": "2d5166e2-784a-4b23-86a9-7b8b61a4ca32",
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
                  "text": "Onboarding Checklist Slack error: {$json.error.message}"
            },
            "id": "e6265a5d-a893-4177-9e00-28566cd1f6ee",
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
    name: "Order Shipped Notification",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Order Shipped Notification",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "102b6df3-b365-4011-bc03-6098a0d8540e",
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
                  "path": "order-shipped-notification"
            },
            "id": "896137be-72ad-4c60-a0cc-b359c2d44c32",
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
            "id": "7d4a82a1-7d85-4fe7-82fd-6e9e4543892f",
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
            "id": "f54b009b-fdd7-4011-9c0f-4fb96cc06f89",
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
                  "indexName": "order_shipped_notification"
            },
            "id": "640b4f5d-ec09-401f-a4f7-35876eaad13a",
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
                  "indexName": "order_shipped_notification"
            },
            "id": "a712e417-fe97-4925-9efd-45b6a1b519e6",
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
            "id": "26933929-0a50-4cd5-8562-17facb37189e",
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
            "id": "7e5737f4-be56-4d49-9633-9a2769557480",
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
            "id": "337be036-25ad-4a52-9fc5-4b903fc20204",
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
                  "text": "Process the following data for task 'Order Shipped Notification':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Order Shipped Notification"
                  }
            },
            "id": "1be7b3f2-baf8-4425-af25-3b678718acfb",
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
                        "cachedResultName": "Order Shipped Notification"
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
            "id": "fed26820-aefe-4c14-8d7d-2e16a103390e",
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
                  "text": "Order Shipped Notification error: {$json.error.message}"
            },
            "id": "f665c2f3-d7ea-4c12-b594-33f39318e5f0",
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
    name: "Podcast Transcribe Publish",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Podcast Transcribe Publish",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "3250caac-c551-4414-b771-045d05335b65",
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
                  "path": "podcast-transcribe-publish"
            },
            "id": "4dc05fc9-9cb6-4a65-ad69-9a0af7f01e02",
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
            "id": "e6f71afd-8a8e-44c7-857d-03ce2f44e66d",
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
            "id": "7d411532-cd9d-4d91-880f-b160c5ef09b2",
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
                        "value": "podcast_transcribe_publish",
                        "mode": "list",
                        "cachedResultName": "podcast_transcribe_publish"
                  }
            },
            "id": "954c0ec8-e81a-4a99-b3f6-f80615cbdc67",
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
                        "value": "podcast_transcribe_publish",
                        "mode": "list",
                        "cachedResultName": "podcast_transcribe_publish"
                  }
            },
            "id": "fa7eda42-a53e-4422-869f-72004b06f591",
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
            "id": "9b9630dc-0c39-4113-95dd-f9a14297a3d4",
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
            "id": "f55acb08-a56c-4bf1-9652-8e71c1b1de6b",
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
            "id": "ce0a13aa-2923-41c8-bf08-ab52781f18af",
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
                  "text": "Process the following data for task 'Podcast Transcribe Publish':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Podcast Transcribe Publish"
                  }
            },
            "id": "d98e5674-0c59-4c03-a132-cec3b31e4021",
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
                        "cachedResultName": "Podcast Transcribe Publish"
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
            "id": "a1695c17-da29-4ab4-bcbf-3fb089bc71b4",
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
                  "text": "Podcast Transcribe Publish error: {$json.error.message}"
            },
            "id": "719f63b1-9c41-4fb5-a0f6-7ad43ed6e3d9",
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
    name: "Price Update Google Sheet",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Price Update Google Sheet",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "f3d6c335-fb6d-4c4a-8ac0-ccb129e29942",
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
                  "path": "price-update-google-sheet"
            },
            "id": "f94f069c-11c3-4281-8363-6143ab7d8337",
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
            "id": "be6adfed-ae72-4bf6-ab77-932134c3c357",
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
            "id": "34dd45c7-5971-4417-922e-861b45772f9e",
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
                  "indexName": "price_update_google_sheet"
            },
            "id": "d9a146d9-c5ff-42b3-a92f-65385c6cb8c4",
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
                  "indexName": "price_update_google_sheet"
            },
            "id": "7e074789-1e7e-4285-9a25-ec3915715115",
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
            "id": "4c5a9833-b4da-47db-825e-27ec760c2ef3",
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
            "id": "3abb71e4-2a79-4072-8bef-64eea7d0718b",
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
            "id": "67055632-9263-459a-acf9-a578009611d6",
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
                  "text": "Process the following data for task 'Price Update Google Sheet':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Price Update Google Sheet"
                  }
            },
            "id": "196fb37e-f887-4265-a5ee-a688df670ce0",
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
                        "cachedResultName": "Price Update Google Sheet"
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
            "id": "2bf8dbc5-1f61-4be9-b422-b422509cf571",
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
                  "text": "Price Update Google Sheet error: {$json.error.message}"
            },
            "id": "bd2a2057-11a1-4297-b119-8926dd9e3716",
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
    name: "PR Merged QA Notify",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: PR Merged QA Notify",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "61da6a3d-ed28-4145-ad22-3a458684706e",
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
                  "path": "pr-merged-qa-notify"
            },
            "id": "a5e13a39-aede-46c1-983d-b1308aa2af8e",
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
            "id": "528f58ea-f2fb-4535-9276-4a3fc9b22234",
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
            "id": "865827a0-826d-42c2-aa29-d671856ac7a5",
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
                        "value": "pr_merged_qa_notify",
                        "mode": "list",
                        "cachedResultName": "pr_merged_qa_notify"
                  }
            },
            "id": "85947f4a-c12f-4762-adcf-14803b295ec7",
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
                        "value": "pr_merged_qa_notify",
                        "mode": "list",
                        "cachedResultName": "pr_merged_qa_notify"
                  }
            },
            "id": "1cc89e6b-684e-400f-af90-21a03d5e655a",
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
            "id": "941e79fa-7702-4da0-9751-87c1f084939e",
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
            "id": "dade008a-5f65-455b-bfea-a753f7660c1c",
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
            "id": "d19a0335-d41f-496d-b2be-def94eba688e",
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
                  "text": "Process the following data for task 'PR Merged QA Notify':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for PR Merged QA Notify"
                  }
            },
            "id": "0d91b02f-3e72-4411-9a78-8edebafc6e89",
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
                        "cachedResultName": "PR Merged QA Notify"
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
            "id": "e890dbeb-aecd-498f-95cf-4a3e50e52986",
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
                  "text": "PR Merged QA Notify error: {$json.error.message}"
            },
            "id": "605ca1e7-fdcb-4af7-88bb-fbab52f29ef9",
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
    name: "Record Crypto Prices",
    nodes: [
      {
            "parameters": {
                  "content": "Placeholder for Record Crypto Prices",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "33fd92b4-df59-448f-995b-42c96db9ab1d",
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
                  "path": "record-crypto-prices"
            },
            "id": "979c1efe-0dfc-4ed9-9490-d7fb951553bd",
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
            "id": "8ed3bce0-7f2c-4675-9f9f-8e15834d4b09",
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
            "id": "8cecb33f-8415-449f-ad0e-0ffbf5c89806",
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
                  "indexName": "record_crypto_prices"
            },
            "id": "0df6f3cb-994a-40cf-bb8e-0f656791676b",
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
                  "indexName": "record_crypto_prices"
            },
            "id": "b77ba910-a3b2-41fb-809a-f8e7019d7386",
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
            "id": "39b77868-e3e7-4e3b-a267-7e7a0cf4861c",
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
            "id": "7563f32a-87c1-496e-9599-c3f1e87c9314",
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
            "id": "852da90d-bfe7-4ce1-aaf8-eb7f7c287906",
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
                        "systemMessage": "You are an assistant for Record Crypto Prices"
                  }
            },
            "id": "362d8fb2-07fb-4ad0-8e85-3a88eab2df6b",
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
                        "cachedResultName": "Record Crypto Prices"
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
            "id": "35819836-2d6e-4e92-9d02-df466443b2ed",
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
                  "text": "Record Crypto Prices error: {$json.error.message}"
            },
            "id": "51450e2f-fc86-497d-a66a-636b5d24fee1",
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
    name: "Return Ticket Assignment",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Return Ticket Assignment",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "cbf21ee8-16ca-407f-a884-b0526e4a2eb1",
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
                  "path": "return-ticket-assignment"
            },
            "id": "7c5bb0f6-8671-4667-836c-1500b9ce84fc",
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
            "id": "0de0f19b-17ba-486a-a671-12112ba4de71",
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
            "id": "ab8bfdd4-5f61-41a9-bed3-ffdf8f5d5db1",
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
                  "indexName": "return_ticket_assignment"
            },
            "id": "368b46e7-74fe-416b-9777-16cf44229b82",
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
                  "indexName": "return_ticket_assignment"
            },
            "id": "a8bd3df3-542b-45cd-b8f0-ec90890e6fec",
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
            "id": "aaacc9b7-0890-45a6-8fed-5536818481e1",
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
            "id": "ec45d993-1d63-4f02-87b6-69463dad4993",
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
            "id": "0a9ff85c-45c7-444d-a5a3-746727f1ca74",
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
                  "text": "Process the following data for task 'Return Ticket Assignment':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Return Ticket Assignment"
                  }
            },
            "id": "f00a1845-2a8f-4e61-859b-dfd99c63fa83",
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
                        "cachedResultName": "Return Ticket Assignment"
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
            "id": "e9883d8f-0e72-4eeb-b27b-e337525028e4",
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
                  "text": "Return Ticket Assignment error: {$json.error.message}"
            },
            "id": "26cf514c-271c-48ca-aa4d-07b5ce29bbdf",
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
    name: "RSS Headlines Slack",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: RSS Headlines Slack",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "eef04ed8-9911-437e-a4de-a97bb4008584",
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
                  "path": "rss-headlines-slack"
            },
            "id": "9a8d1358-96d4-4234-a729-4e0e4ced17f3",
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
            "id": "b65c9914-f17c-40e3-b297-4829b6ca48c0",
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
            "id": "794ba230-95a3-4309-ab88-e048833c8f32",
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
                        "value": "rss_headlines_slack",
                        "mode": "list",
                        "cachedResultName": "rss_headlines_slack"
                  }
            },
            "id": "121535eb-291a-43da-beef-22fb7b8e61e2",
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
                        "value": "rss_headlines_slack",
                        "mode": "list",
                        "cachedResultName": "rss_headlines_slack"
                  }
            },
            "id": "1007022a-f3f8-45e0-a172-3a722ef55013",
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
            "id": "45bba375-133f-4e21-b3f5-44129052232c",
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
            "id": "4260b8fd-8881-4c50-8d0c-ec3ff10dd94e",
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
            "id": "5dc099ae-249d-409d-acf2-1f6a50ecc270",
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
                  "text": "Process the following data for task 'RSS Headlines Slack':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for RSS Headlines Slack"
                  }
            },
            "id": "f799ca8c-9622-4a74-b21a-6c84c8ec458a",
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
                        "cachedResultName": "RSS Headlines Slack"
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
            "id": "24e74dce-aaf5-48d8-abd9-4a052dbb378c",
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
                  "text": "RSS Headlines Slack error: {$json.error.message}"
            },
            "id": "b225130c-f97e-4652-baac-a2afd1049a9d",
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
    name: "Server Health Grafana",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Server Health Grafana",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "d2ba1e2d-bcbc-45e4-bd37-73668fce5802",
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
                  "path": "server-health-grafana"
            },
            "id": "eb7fca76-66e2-4fa1-ab00-09b4c0817961",
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
            "id": "7db01be8-61d6-4c89-9800-db7b62eb7fcf",
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
            "id": "66a0f30e-32ee-4ef3-823c-82b4a1af354c",
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
                  "indexName": "server_health_grafana"
            },
            "id": "6ea57ca4-3426-4820-a293-78565186c35e",
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
                  "indexName": "server_health_grafana"
            },
            "id": "443a366d-7547-4bda-b066-91fb43d60aed",
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
            "id": "fdbc5d42-f717-414e-a775-235a0de386e9",
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
            "id": "48c210ef-2004-4ef4-b2f9-d2dab2f5d391",
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
            "id": "86681bd5-9377-4348-a411-caf2a0b9887b",
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
                  "text": "Process the following data for task 'Server Health Grafana':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Server Health Grafana"
                  }
            },
            "id": "78773e49-4558-4ec1-a740-adfd2f177a9f",
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
                        "cachedResultName": "Server Health Grafana"
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
            "id": "77eccce3-bf9e-4d3a-9262-820db8faaeec",
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
                  "text": "Server Health Grafana error: {$json.error.message}"
            },
            "id": "2f5f6b7a-45d8-4f54-8b06-af95c6032926",
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
    name: "Starred Slack to Notion",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Starred Slack to Notion",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "3394fb98-3259-414f-bc1e-a478f9bb48ce",
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
                  "path": "starred-slack-to-notion"
            },
            "id": "634c2549-c8a7-4ed6-9f8f-286ac52e728e",
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
            "id": "496b5b4a-59fb-48d9-834c-8e43123d4f40",
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
            "id": "86d40b9f-1b53-4751-a02f-6fc7cda4543c",
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
                  "indexName": "starred_slack_to_notion"
            },
            "id": "d83c9acd-dd15-4965-b024-51acdea5d1be",
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
                  "indexName": "starred_slack_to_notion"
            },
            "id": "41eed679-dece-4a2c-96ea-8a97076c3429",
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
            "id": "efc47245-60b6-4692-84aa-1a2a0c0c1324",
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
            "id": "1c9592de-238c-492a-9a0c-87390d366956",
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
            "id": "eab396da-9252-4a29-964c-0aa3abac4044",
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
                  "text": "Process the following data for task 'Starred Slack to Notion':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Starred Slack to Notion"
                  }
            },
            "id": "103d9ff8-a291-46fc-aa5b-fbdef7f6c61d",
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
                        "cachedResultName": "Starred Slack to Notion"
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
            "id": "0af20245-042c-4192-beb1-915218f01f11",
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
                  "text": "Starred Slack to Notion error: {$json.error.message}"
            },
            "id": "a765761c-52d0-4e72-a26f-9fd514a9a2b1",
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
    name: "Survey Auto Analyze",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Survey Auto Analyze",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "e57a6111-23c7-46fc-8321-8cb81c12e0ff",
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
                  "path": "survey-auto-analyze"
            },
            "id": "69582a00-cb89-4618-9181-ed5c900b5d37",
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
            "id": "38c659ff-d227-436b-ace0-e8f19d04be21",
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
            "id": "7e5e5bb2-b8ac-410a-8daa-41d994652f61",
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
                        "value": "survey_auto_analyze",
                        "mode": "list",
                        "cachedResultName": "survey_auto_analyze"
                  }
            },
            "id": "01a6fea8-0a4f-4a2b-941c-95f1fd7c7f87",
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
                        "value": "survey_auto_analyze",
                        "mode": "list",
                        "cachedResultName": "survey_auto_analyze"
                  }
            },
            "id": "c81e7845-06d4-4653-aa6f-c8f86c47ed5b",
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
            "id": "d7ee429c-5e5a-4fc1-aaa5-5487bade9563",
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
            "id": "c420b709-36dd-41f0-877e-776b99b5bb7c",
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
            "id": "b184a9f5-b15c-4870-9484-4d7645bb0fb5",
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
                  "text": "Process the following data for task 'Survey Auto Analyze':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Survey Auto Analyze"
                  }
            },
            "id": "9b3a3954-60fa-4819-8dd1-9f7dfb9753f1",
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
                        "cachedResultName": "Survey Auto Analyze"
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
            "id": "349b2a7a-e0c7-4629-83d5-42656bb34486",
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
                  "text": "Survey Auto Analyze error: {$json.error.message}"
            },
            "id": "304fd227-5d2b-4dd6-9ddc-1f79adc5aade",
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
    name: "Toggl Daily Report",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Toggl Daily Report",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "90116b46-a456-448a-9dda-333b3688f86c",
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
                  "path": "toggl-daily-report"
            },
            "id": "3fbc7512-72c5-46c4-bd02-573c27d029f1",
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
            "id": "e5106852-2d61-4bdd-bbfb-53ca2517555d",
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
            "id": "1118d7ea-3e7d-411f-85e8-ad0de51c3e88",
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
                        "value": "toggl_daily_report",
                        "mode": "list",
                        "cachedResultName": "toggl_daily_report"
                  }
            },
            "id": "7b34c0e1-07d7-4488-b794-7d394b5fab7b",
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
                        "value": "toggl_daily_report",
                        "mode": "list",
                        "cachedResultName": "toggl_daily_report"
                  }
            },
            "id": "506ba0dd-a095-4a85-8d63-36b7fbae2fbf",
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
            "id": "1683b741-68d8-45fd-a976-4cc8ef37a47a",
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
            "id": "e8d33ed2-1eba-427d-a874-e9b3b32d2b49",
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
            "id": "e3f9ca1d-92c7-41f5-8da1-0855273f5dd3",
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
                  "text": "Process the following data for task 'Toggl Daily Report':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Toggl Daily Report"
                  }
            },
            "id": "4b343b9b-415f-4f66-b7dd-c7efb87ac836",
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
                        "cachedResultName": "Toggl Daily Report"
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
            "id": "2d657857-6a0c-48ff-9f2f-edcaffa10f0e",
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
                  "text": "Toggl Daily Report error: {$json.error.message}"
            },
            "id": "9747b5e6-d32e-4038-aa7f-620f9e5ff58f",
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
    name: "Unsplash to Pinterest",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Unsplash to Pinterest",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "8da48de7-ef4d-4d78-8c0e-3c6b57ef3b9a",
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
                  "path": "unsplash-to-pinterest"
            },
            "id": "672c0eab-878f-484d-a072-9482935437c4",
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
            "id": "87553792-b816-44e2-ac2f-64d0f9a5adf5",
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
            "id": "d8a5b9d0-b59f-49d2-9b1c-99149dd6d71b",
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
                  "indexName": "unsplash_to_pinterest"
            },
            "id": "6f194f04-7764-4a60-a36a-027d5c1410f7",
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
                  "indexName": "unsplash_to_pinterest"
            },
            "id": "9f1eabc4-1dfe-4271-94e3-e1ec9b402828",
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
            "id": "20fe470d-efef-462c-8641-13589cf31512",
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
            "id": "e9979d17-c88a-4964-81d8-c5508f03d709",
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
            "id": "e3ac4cbe-35ee-48d3-bb1d-f840f6ee1b77",
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
                  "text": "Process the following data for task 'Unsplash to Pinterest':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Unsplash to Pinterest"
                  }
            },
            "id": "8b13c89e-4f09-4e5a-9ef9-bcea4bc692de",
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
                        "cachedResultName": "Unsplash to Pinterest"
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
            "id": "d273d2ef-dd98-4e0d-a03f-77e5d22e772e",
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
                  "text": "Unsplash to Pinterest error: {$json.error.message}"
            },
            "id": "8cddb37e-ed6a-4ad5-a88e-e2b393f07114",
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
    name: "Voice Task to Notion",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Voice Task to Notion",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "788c7113-8566-49c8-b7af-3313f57a479c",
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
                  "path": "voice-task-to-notion"
            },
            "id": "aaf99a8a-1412-455a-97ed-f853121f366f",
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
            "id": "917142f0-7738-4fde-b862-b763463248a6",
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
            "id": "b17227b4-2631-41f6-bc3b-45ca977de46a",
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
                  "indexName": "voice_task_to_notion"
            },
            "id": "7f0fa79f-e276-4a66-8120-66e94ba4c045",
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
                  "indexName": "voice_task_to_notion"
            },
            "id": "a9a11174-df20-483b-85fd-d9126b715aca",
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
            "id": "b337a057-1ccd-46d1-9d44-ee1512a8c5cd",
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
            "id": "ca6d53a5-1b46-43c4-8dfa-86e38c115898",
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
            "id": "69538d38-2f88-41bb-ad85-3370afbbc873",
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
                  "text": "Process the following data for task 'Voice Task to Notion':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Voice Task to Notion"
                  }
            },
            "id": "f1388a0a-3d58-4291-8538-f82000579f4c",
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
                        "cachedResultName": "Voice Task to Notion"
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
            "id": "b92d452b-d59b-4177-a4fa-4985b33bdb44",
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
                  "text": "Voice Task to Notion error: {$json.error.message}"
            },
            "id": "ea200b2e-d1ad-45e5-9d39-4b502e4f6f86",
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
    name: "Weekly Notes Backup",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Weekly Notes Backup",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "09f96970-f5ea-401a-bf0b-0035b1ae502a",
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
                  "path": "weekly-notes-backup"
            },
            "id": "0cf773d3-bb5a-467b-8059-746735a95815",
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
            "id": "34029e24-83b2-4e0d-afe4-52510a3c20e4",
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
            "id": "0318220f-be7c-43ff-8b23-01bc841d6160",
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
                  "indexName": "weekly_notes_backup"
            },
            "id": "b6c46a40-013a-45fc-b942-614ea6a9077b",
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
                  "indexName": "weekly_notes_backup"
            },
            "id": "d154672e-8623-47e1-bd2f-eb50df358f3e",
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
            "id": "5e598772-1a0b-4afb-8fcd-4339843923c0",
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
            "id": "0d9605c9-b48d-4509-b542-5b671f4c5609",
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
            "id": "94e7ea25-d825-4729-ad5a-b9a545f7fc43",
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
                  "text": "Process the following data for task 'Weekly Notes Backup':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Weekly Notes Backup"
                  }
            },
            "id": "4497ea3b-8f08-4db2-a18a-c0d2e2d4c1f4",
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
                        "cachedResultName": "Weekly Notes Backup"
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
            "id": "e91c44c2-ae2f-4c8b-a49c-86b529efb775",
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
                  "text": "Weekly Notes Backup error: {$json.error.message}"
            },
            "id": "49273683-737d-48b5-bf48-48d3233437f8",
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
    name: "Woo Order Mailchimp",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Woo Order Mailchimp",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "0dd507e4-f32b-4c4c-85d9-26316c63c0e0",
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
                  "path": "woo-order-mailchimp"
            },
            "id": "42aa0b71-1c9f-48d7-b339-94919de26da1",
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
            "id": "38bd53d5-c599-45cb-bd28-f52fe513a687",
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
            "id": "fbb0666b-b845-4490-ad86-25713c97a122",
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
                  "indexName": "woo_order_mailchimp"
            },
            "id": "d85253d5-b3b8-452b-8153-996f7b6c9bca",
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
                  "indexName": "woo_order_mailchimp"
            },
            "id": "6cefb367-4cde-4c48-bdb8-c90ecc5215fc",
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
            "id": "356012ed-5c87-4b07-8ddb-e0afe3c3faec",
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
            "id": "12fd721e-e3f6-4f61-a709-2b4c9821e373",
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
            "id": "a16d1695-9c1a-40f7-86a9-99b081045a20",
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
                  "text": "Process the following data for task 'Woo Order Mailchimp':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Woo Order Mailchimp"
                  }
            },
            "id": "10ea4d67-7ee6-466f-b8c9-5847177d478a",
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
                        "cachedResultName": "Woo Order Mailchimp"
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
            "id": "fb5c5c60-aa5d-40fb-aeed-e6a47f4bc030",
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
                  "text": "Woo Order Mailchimp error: {$json.error.message}"
            },
            "id": "d54c4d1f-2ce2-431d-8a37-2f2e6d23f6da",
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
    name: "Zoom Attendance Log",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Zoom Attendance Log",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "30425599-20bc-4cab-84fb-a97a7d936dd8",
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
                  "path": "zoom-attendance-log"
            },
            "id": "40e28ff7-25fe-4260-9dff-fc7b0fb83b9e",
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
            "id": "0ebd915f-62ad-4a37-ae47-94a492b82d74",
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
            "id": "97982daf-72b3-4c42-aea3-e33642422cfd",
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
                  "indexName": "zoom_attendance_log"
            },
            "id": "092e9417-d39a-407f-8c39-2bc28184c6ea",
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
                  "indexName": "zoom_attendance_log"
            },
            "id": "93de8859-cdbb-4783-9706-5696e8ba6876",
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
            "id": "a729203a-897a-4851-a525-8291cf9589dd",
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
            "id": "38493122-32dc-4b8e-b56f-53f6837c0d7a",
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
            "id": "68814235-d4fc-4c02-b9ba-776e84284e5a",
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
                  "text": "Process the following data for task 'Zoom Attendance Log':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Zoom Attendance Log"
                  }
            },
            "id": "ea407af4-b883-4fc3-84df-3c04e885c01c",
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
                        "cachedResultName": "Zoom Attendance Log"
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
            "id": "ccf323a1-9823-458d-ac99-44cbe2ec704c",
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
                  "text": "Zoom Attendance Log error: {$json.error.message}"
            },
            "id": "f15f021b-938c-4521-86ff-648a8169309f",
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
];

export function MiscCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-gray-600 text-white shadow-lg shadow-gray-500/25 border border-gray-600' : 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-500/20 hover:border-gray-300 dark:hover:border-gray-600/50 hover:shadow-md'}`}
    >
      <MoreHorizontal className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
      Misc
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {miscTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function MiscTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {miscTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-gray-50/50 dark:group-hover:to-gray-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-gray-500 to-gray-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gray-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <MoreHorizontal className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
