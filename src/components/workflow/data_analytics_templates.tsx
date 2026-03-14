import { Play, BarChart } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const dataAnalyticsTemplates = [
  {
    "name": "Competitor Price Scraper",
    "nodes": [
      {
        "parameters": {
          "content": "Automated workflow: Competitor Price Scraper",
          "height": 530,
          "width": 1100,
          "color": 5
        },
        "id": "3658f18f-6ed3-4c14-b12d-9ec7fadc03f9",
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
          "path": "competitor-price-scraper"
        },
        "id": "9b5a4057-4b5f-44f7-aea9-847d23a8f821",
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
        "id": "3b015342-843e-40e8-8164-734611f2c7aa",
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
        "id": "3b77afdb-828a-48bf-ab39-5600c4ac8512",
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
          "indexName": "competitor_price_scraper"
        },
        "id": "217480ed-2ad6-407d-80fa-0d5284905815",
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
          "indexName": "competitor_price_scraper"
        },
        "id": "90ed9d12-3239-48b0-b5a5-23fb2a0172ea",
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
        "id": "68bc4d4a-293e-4252-8a88-486aa3e3cb5f",
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
        "id": "3d31e91e-ad51-4967-903f-7ae2c598a870",
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
        "id": "af6568a4-96a6-4b41-8be0-730fb7c0b328",
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
          "text": "Process the following data for task 'Competitor Price Scraper':\n\n{{ $json }}",
          "options": {
            "systemMessage": "You are an assistant for Competitor Price Scraper"
          }
        },
        "id": "c0a57592-08d8-4b83-80bf-73b63a29966f",
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
            "cachedResultName": "Competitor Price Scraper"
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
        "id": "ff81c3bb-35e8-428d-9ad9-491707d7ee15",
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
          "text": "Competitor Price Scraper error: {$json.error.message}"
        },
        "id": "9f49421e-8263-4127-ad94-e063318685fb",
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
  }
];

export function DataAnalyticsCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25 border border-orange-600' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50 hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:border-orange-300 dark:hover:border-orange-600/50 hover:shadow-md'}`}
    >
      <BarChart className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-500 dark:text-orange-400'}`} />
      Data Analytics
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {dataAnalyticsTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function DataAnalyticsTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {dataAnalyticsTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-orange-50/50 dark:group-hover:to-orange-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <BarChart className="w-6 h-6" />
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
