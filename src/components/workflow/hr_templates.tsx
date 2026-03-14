import React from 'react';
import { Play, Users } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const hrTemplates: IN8nTemplate[] = [
  {
    name: "New Job Application Parser",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: New Job Application Parser",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "355dc5d9-e675-4948-ac07-e2372746beac",
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
                  "path": "new-job-application-parser"
            },
            "id": "5a292fdb-55a6-4b6c-95cb-918e2f5592a1",
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
            "id": "53900c40-00b0-4e87-98cf-de274ce1fddc",
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
            "id": "a3b1c492-f0ec-4275-a656-765170f336db",
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
                        "value": "new_job_application_parser",
                        "mode": "list",
                        "cachedResultName": "new_job_application_parser"
                  }
            },
            "id": "cfcd7174-0670-4521-a3d0-f166637355b9",
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
                        "value": "new_job_application_parser",
                        "mode": "list",
                        "cachedResultName": "new_job_application_parser"
                  }
            },
            "id": "2a452b2b-edca-4ab6-87a5-a9cb33ca4473",
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
            "id": "3f39c7db-4b74-452f-85c5-1221de07d7c8",
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
            "id": "c3cf7b90-7202-47b1-a2e3-e1f2c74eaa33",
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
            "id": "3cd3b436-538e-470c-89e5-e8776258c498",
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
                  "text": "Process the following data for task 'New Job Application Parser':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for New Job Application Parser"
                  }
            },
            "id": "a741b715-3e97-445a-8c1a-f5c8ce5cf2dd",
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
                        "cachedResultName": "New Job Application Parser"
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
            "id": "8d1a3c8a-520f-4e56-8120-7b54029bd828",
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
                  "text": "New Job Application Parser error: {$json.error.message}"
            },
            "id": "1b63bca3-2e7f-450e-80ef-f5cf18df53f1",
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
    name: "Notion Job Board Poster",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Notion Job Board Poster",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "9935d8e0-c8e8-47df-8d22-f18fed6cc35f",
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
                  "path": "notion-job-board-poster"
            },
            "id": "c7202964-f164-4e73-952f-e6cfb216df5a",
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
            "id": "698758c3-6ec0-4a98-ab25-77ad28d1a86b",
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
            "id": "00faf696-bcee-45d6-925c-5789d6f33d04",
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
                  "indexName": "notion_job_board_poster"
            },
            "id": "c7d38489-d3fd-4f35-95e9-8fa1de802baf",
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
                  "indexName": "notion_job_board_poster"
            },
            "id": "b3b46858-b322-4702-86f6-c6bfc0116a39",
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
            "id": "c664c632-f102-413b-92da-8ad22e070251",
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
            "id": "88bf4c86-8a9d-4b78-8965-3aabe394cac3",
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
            "id": "90778f34-c1c9-4506-b105-6463d7e170cd",
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
                  "text": "Process the following data for task 'Notion Job Board Poster':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Notion Job Board Poster"
                  }
            },
            "id": "d0df09be-eb92-4de4-a038-8c488ee4d1fa",
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
                        "cachedResultName": "Notion Job Board Poster"
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
            "id": "5eb58bc2-9cd5-4e71-a456-4a64541d3179",
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
                  "text": "Notion Job Board Poster error: {$json.error.message}"
            },
            "id": "f495a132-6e2f-4d8b-b978-1cb312b7934f",
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

export function HrCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25 border border-orange-600' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50 hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:border-orange-300 dark:hover:border-orange-600/50 hover:shadow-md'}`}
    >
      <Users className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-500 dark:text-orange-400'}`} />
      HR
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {hrTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function HrTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {hrTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-orange-50/50 dark:group-hover:to-orange-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-orange-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Users className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-orange-600 dark:hover:bg-orange-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
