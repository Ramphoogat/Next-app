import React from 'react';
import { Play, CheckSquare } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const productivityTemplates: IN8nTemplate[] = [
  {
    name: "Morning Briefing Email",
    nodes: [
      {
            "parameters": {
                  "content": "Automated workflow: Morning Briefing Email",
                  "height": 530,
                  "width": 1100,
                  "color": 5
            },
            "id": "290fb569-25f2-4464-8d96-bab3c4cb3276",
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
                  "path": "morning-briefing-email"
            },
            "id": "13727821-7b64-46b6-96bd-7b97dd43d06e",
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
            "id": "b0725ca4-2727-4201-a9bd-cb219ff1508f",
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
            "id": "af97f001-e5ea-49fb-ac6b-b2d30730c3e8",
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
                  "indexName": "morning_briefing_email"
            },
            "id": "63c51bdb-fbd9-43a9-bacf-f5c6d39aedb3",
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
                  "indexName": "morning_briefing_email"
            },
            "id": "8304ff6a-c852-4c49-895c-00ac13314028",
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
            "id": "e330bfdb-576e-44d1-b8cf-73a829b898e3",
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
            "id": "ab1dd014-0dc8-4635-9dad-f728310f2b86",
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
            "id": "6320a7d3-7bc0-47cf-9052-43a60ad9ae28",
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
                  "text": "Process the following data for task 'Morning Briefing Email':\n\n{{ $json }}",
                  "options": {
                        "systemMessage": "You are an assistant for Morning Briefing Email"
                  }
            },
            "id": "f0c605d8-4612-4402-80ee-ae9e9d05044d",
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
                        "cachedResultName": "Morning Briefing Email"
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
            "id": "101334a4-b2d6-4095-b095-f0934b2f17af",
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
                  "text": "Morning Briefing Email error: {$json.error.message}"
            },
            "id": "7e567cd3-ecc8-4b95-80e4-a9a8a12de770",
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

export function ProductivityCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25 border border-teal-600' : 'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700/50 hover:bg-teal-100 dark:hover:bg-teal-500/20 hover:border-teal-300 dark:hover:border-teal-600/50 hover:shadow-md'}`}
    >
      <CheckSquare className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-500 dark:text-teal-400'}`} />
      Productivity
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {productivityTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function ProductivityTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {productivityTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-teal-50/50 dark:group-hover:to-teal-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-teal-500 to-teal-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <CheckSquare className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-teal-600 dark:hover:bg-teal-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
