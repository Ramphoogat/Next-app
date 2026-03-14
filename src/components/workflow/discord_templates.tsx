import React from 'react';
import { Play, MessageSquare } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const discordTemplates: IN8nTemplate[] = [
  {
    name: "Discord AI bot",
    nodes: [
      {
            "id": "6f188270-2c08-491f-bf52-c4a152b33aa0",
            "name": "When clicking \"Execute Workflow\"",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  1220,
                  780
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "e4839de2-fc04-40b0-b6bc-596455ad93fe",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  1220,
                  580
            ],
            "webhookId": "d0cdd428-be96-4821-85bc-65342cf928d0",
            "parameters": {
                  "path": "d0cdd428-be96-4821-85bc-65342cf928d0",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 1
      },
      {
            "id": "15dcafe1-6361-4775-ace0-e34fd2a143b4",
            "name": "No Operation, do nothing",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  2120,
                  940
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0d28fe8e-da80-458b-9a75-d316019cb3ae",
            "name": "Analyze user request",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  1420,
                  680
            ],
            "parameters": {
                  "model": "gpt-4",
                  "prompt": {
                        "messages": [
                              {
                                    "role": "system",
                                    "content": "Act as a service desk agent and help to categorize user messages. Return back only JSON without quotations. Do not return anything else."
                              },
                              {
                                    "content": "=Here is a user feedback: \"{{ $json.body.feedback }}\". Please analyse it and put into one of the categories:\n1. \"success-story\" for user appraisal or success story. this will be processed by customer success department\n2. \"urgent-issue\" for extreme dissatisfaction or an urgent problem. this will be escalated to the IT team. Please assess if the request is really urgent and whether it has an immediate impact on the client. If the ticket doesn't look like an immediate problem or an extreme dissatisfaction then proceed as a normal ticket.\n3. \"ticket\" for everything else. This will be processed as normal by customer support team.\n\nPlease return back a JSON with the following structure: category (string), feedback (string), instruction (string).\nCategory must match the analysed category. feedback must match the original text. instruction should contain a text for a department according to the category with a one sentense summary of the feedback. Please be polite and friendly to the colleagues."
                              }
                        ]
                  },
                  "options": {
                        "maxTokens": 500,
                        "temperature": 0.5
                  },
                  "resource": "chat"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "63",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "ce1c4198-ce21-4436-9ccb-4a2a078cd06e",
            "name": "Select category",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1840,
                  680
            ],
            "parameters": {
                  "rules": {
                        "rules": [
                              {
                                    "value2": "success-story"
                              },
                              {
                                    "output": 1,
                                    "value2": "urgent-issue"
                              },
                              {
                                    "output": 2,
                                    "value2": "ticket"
                              }
                        ]
                  },
                  "value1": "={{ $json.gpt_reply.category.toLowerCase() }}",
                  "dataType": "string",
                  "fallbackOutput": 3
            },
            "typeVersion": 1
      },
      {
            "id": "839cc38d-b393-4fc1-a068-47a8fcf55e3f",
            "name": "Parse JSON",
            "type": "n8n-nodes-base.set",
            "position": [
                  1640,
                  680
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "gpt_reply",
                                    "value": "={{ JSON.parse( $json.message.content.replace(/\\n(?=[^\"]*\"(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g, '\\\\n')) }}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 2
      },
      {
            "id": "4c150439-89af-42bd-bbdc-905d13ada76b",
            "name": "User Success Dept",
            "type": "n8n-nodes-base.discord",
            "position": [
                  2120,
                  460
            ],
            "parameters": {
                  "text": "={{ $json.gpt_reply.instruction }}",
                  "options": {},
                  "webhookUri": "https://discord.com/api/webhooks/<YOUR WEBHOOK HERE>"
            },
            "typeVersion": 1
      },
      {
            "id": "9a5e5335-9e6c-4f1f-a0f0-b1b022956549",
            "name": "IT Dept",
            "type": "n8n-nodes-base.discord",
            "position": [
                  2120,
                  620
            ],
            "parameters": {
                  "text": "={{ $json.gpt_reply.instruction }}",
                  "options": {},
                  "webhookUri": "https://discord.com/api/webhooks/<YOUR WEBHOOK HERE>"
            },
            "typeVersion": 1
      },
      {
            "id": "d6d6250a-3a24-49f1-a597-47ebc179949c",
            "name": "Helpdesk",
            "type": "n8n-nodes-base.discord",
            "position": [
                  2120,
                  780
            ],
            "parameters": {
                  "text": "={{ $json.gpt_reply.instruction }}",
                  "options": {},
                  "webhookUri": "https://discord.com/api/webhooks/<YOUR WEBHOOK HERE>"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Analyze user request",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Parse JSON": {
            "main": [
                  [
                        {
                              "node": "Select category",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Select category": {
            "main": [
                  [
                        {
                              "node": "User Success Dept",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "IT Dept",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Helpdesk",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "No Operation, do nothing",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze user request": {
            "main": [
                  [
                        {
                              "node": "Parse JSON",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "When clicking \"Execute Workflow\"": {
            "main": [
                  [
                        {
                              "node": "Analyze user request",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "callerPolicy": "workflowsFromSameOwner",
      "saveManualExecutions": true,
      "saveDataSuccessExecution": "all"
},
  },
  {
    name: "Send Daily Translated Calvin And Hobbes Comics To Discord",
    nodes: [
      {
            "id": "4bf26356-9c59-4cee-8eb8-8553b23a172f",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  560,
                  -120
            ],
            "parameters": {
                  "width": 660,
                  "height": 460,
                  "content": "![](https://raw.githubusercontent.com/2innnnn0/30-Days-of-ChatGPT/refs/heads/main/datapopcorn_logo_50px.png)\n# Daily Cartoon (w/ AI Translate)\n\n### How it works\n- Automates the retrieval of Calvin and Hobbes daily comics.\n- Extracts the comic image URL from the website.\n- Translates comic dialogues to English and Korean(Other Language)\n- Posts the comic and translations to Discord daily.\n\n### Set up steps\n- Estimated setup time: ~10-15 minutes.\n- Use a **Schedule Trigger** to automate the workflow at 9 AM daily.\n- Add nodes for parameter setup, HTTP request, data extraction, and integration with Discord.\n- Add detailed notes to each node in the workflow for easy understanding."
            },
            "typeVersion": 1
      },
      {
            "id": "52d19472-41b4-4d71-874e-064ef9d6f248",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  620,
                  380
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "triggerAtHour": 9
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "bcc15f37-c048-4d9a-83cd-367856470095",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1620,
                  380
            ],
            "parameters": {
                  "text": "Please write the original language and Korean together. \n\nEXAMPLE)\nCalvin: \"YOU'VE NEVER HAD AN OBLIGATION, AN ASSIGNMENT, OR A DEADLINE IN ALL YOUR LIFE! YOU HAVE NO RESPONSIBILITIES AT ALL! IT MUST BE NICE!\" (너는 평생 한 번도 의무, 과제, 혹은 마감일 없었잖아! 전혀 책임이 없다니! 정말 좋겠다!)\nHobbes: \"WIPE THAT INSOLENT SMIRK OFF YOUR FACE!\" (그 뻔뻔한 미소를 그만 지어!)\n",
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "GPT-4O-MINI"
                  },
                  "options": {},
                  "resource": "image",
                  "imageUrls": "={{ $json.output.cartoon_image }}",
                  "operation": "analyze"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kYIZ8ZwQHS2d4GiD",
                        "name": "(datapopcorn )OpenAi account"
                  }
            },
            "typeVersion": 1.6
      },
      {
            "id": "35004d43-4061-476a-9af6-7d0b82ae86bd",
            "name": "param",
            "type": "n8n-nodes-base.set",
            "position": [
                  840,
                  380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "59d36aef-2991-4fd2-9fbe-dad9a701b40f",
                                    "name": "year",
                                    "type": "string",
                                    "value": "={{ $now.format('yyyy') }}"
                              },
                              {
                                    "id": "b6b329f2-ba08-4516-bdb9-c5d124c02110",
                                    "name": "month",
                                    "type": "string",
                                    "value": "={{ $now.format('MM') }}"
                              },
                              {
                                    "id": "3cba75d1-a281-4e14-9bf7-e0bc0cc7c768",
                                    "name": "day",
                                    "type": "string",
                                    "value": "={{ $now.format('dd') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "cf2c953f-1ff2-4abc-8abd-95e05603e64a",
            "name": "Discord",
            "type": "n8n-nodes-base.discord",
            "position": [
                  1840,
                  380
            ],
            "parameters": {
                  "content": "=Daily Cartoon ({{ $('param').item.json.year }}/{{ $('param').item.json.month }}/{{ $('param').item.json.day }})\n{{ $('Information Extractor').item.json.output.cartoon_image }}\n\n{{ $json.content }}\n",
                  "options": {},
                  "authentication": "webhook"
            },
            "credentials": {
                  "discordWebhookApi": {
                        "id": "w82RWS7nmXLKDczt",
                        "name": "n8n test webhook"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "5eec9870-a509-4090-a540-76b22bb3eac9",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1260,
                  560
            ],
            "parameters": {
                  "model": "gpt-4o-mini-2024-07-18",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kYIZ8ZwQHS2d4GiD",
                        "name": "(datapopcorn )OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "352db81e-7571-47cb-b028-dec18e15ccce",
            "name": "Information Extractor",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  1260,
                  380
            ],
            "parameters": {
                  "text": "=Please just extract the src value in the <img class=\"img-fluid Lazyloaded\"> tag from HTML below. I don't need anything other than the value.\n\ne.g.)\nEXAMPLE INPUT)\n<img class=\"img-fluid lazyloaded\" srcset=\"https://assets.amuniversal.com/5ed526b06e94013bda88005056a9545d 900w\" data-srcset=\"https://assets.amuniversal.com/5ed526b06e94013bda88005056a9545d 900w\" sizes=\"\n (min-width: 992px) 900px,\n (min-width: 768px) 600px,\n (min-width: 576px) 300px,\n 900px\" width=\"100%\" alt=\"Calvin and Hobbes Comic Strip for March 03, 2023 \" src=\"https://assets.amuniversal.com/5ed526b06e94013bda88005056a9545d\">\n\n\nEXAMPLE OUTPUT)\nhttps://assets.amuniversal.com/5ed526b06e94013bda88005056a9545d\n\n--\n(INPUT)\n{{ $json.data }}",
                  "options": {},
                  "attributes": {
                        "attributes": [
                              {
                                    "name": "cartoon_image",
                                    "description": "EXAMPLE OUTPUT) https://assets.amuniversal.com/***"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "517799ed-559c-4d17-b8aa-58bd4ee92ed3",
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1040,
                  380
            ],
            "parameters": {
                  "url": "=https://www.gocomics.com/calvinandhobbes/{{ $json.year }}/{{ $json.month }}/{{ $json.day }}",
                  "options": {}
            },
            "typeVersion": 4.2
      }
],
    connections: {
      "param": {
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
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Discord",
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
                              "node": "Information Extractor",
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
                              "node": "param",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Information Extractor",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Information Extractor": {
            "main": [
                  [
                        {
                              "node": "OpenAI",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {},
  },
  {
    name: "YouTube Videos with AI Summaries on Discord",
    nodes: [
      {
            "id": "48c87027-7eea-40b9-a73c-4e002b748783",
            "name": "YouTube Video Trigger",
            "type": "n8n-nodes-base.rssFeedReadTrigger",
            "position": [
                  560,
                  220
            ],
            "parameters": {
                  "feedUrl": "https://www.youtube.com/feeds/videos.xml?channel_id=UC08Fah8EIryeOZRkjBRohcQ",
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "56166228-b365-4043-b48c-098b4de71f6f",
            "name": "Retrieve Caption Data",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  780,
                  220
            ],
            "parameters": {
                  "url": "https://www.googleapis.com/youtube/v3/captions",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "videoId",
                                    "value": "={{ $json.id.match(/(?:[^:]*:){2}\\s*(.*)/)[1] }}"
                              },
                              {
                                    "name": "part",
                                    "value": "snippet"
                              }
                        ]
                  },
                  "nodeCredentialType": "youTubeOAuth2Api"
            },
            "credentials": {
                  "youTubeOAuth2Api": {
                        "id": "uy3xy1Ks2ATwRGr4",
                        "name": "Creator Magic - YouTube account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "c029ac6f-3071-4045-83f6-2dede0c1f358",
            "name": "Download Captions",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1220,
                  220
            ],
            "parameters": {
                  "url": "=https://www.googleapis.com/youtube/v3/captions/{{ $json.caption.id }}",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "youTubeOAuth2Api"
            },
            "credentials": {
                  "youTubeOAuth2Api": {
                        "id": "uy3xy1Ks2ATwRGr4",
                        "name": "Creator Magic - YouTube account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "8b45dc14-f10f-4b50-8ca6-a9d0ccfee4dc",
            "name": "Caption File Conversion",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  1440,
                  220
            ],
            "parameters": {
                  "options": {},
                  "operation": "text",
                  "destinationKey": "content"
            },
            "typeVersion": 1
      },
      {
            "id": "6527adb4-9087-40eb-b63a-8c4cdf5d0a40",
            "name": "Caption Summary with ChatGPT",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1660,
                  220
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-3.5-turbo",
                        "cachedResultName": "GPT-3.5-TURBO"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "content": "=Summarise this transcript into three bullet points to sum up what the video is about and why someone should watch it: {{ $json[\"content\"] }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "QpdCHVaJVRd9NNYl",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "2c83f230-bc37-4efb-9ee9-842bcefa0ef4",
            "name": "Post to Discord",
            "type": "n8n-nodes-base.discord",
            "position": [
                  2000,
                  220
            ],
            "parameters": {
                  "content": "=🌟 New Video Alert! 🌟\n\n**{{ $('YouTube Video Trigger').item.json[\"title\"] }}**\n\n*What’s it about?*\n\n{{ $json[\"message\"][\"content\"] }}\n\n[Watch NOW]({{ $('YouTube Video Trigger').item.json[\"link\"] }}) and remember to share your thoughts!",
                  "options": {},
                  "authentication": "webhook"
            },
            "credentials": {
                  "discordWebhookApi": {
                        "id": "QQxpAIskycvb8fIE",
                        "name": "Discord Webhook account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "8408887e-1d89-402c-b350-93d5f96f4dea",
            "name": "Find English Captions",
            "type": "n8n-nodes-base.set",
            "position": [
                  1000,
                  220
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "eaf7dcb5-91cf-4405-917b-38845f0ef78d",
                                    "name": "caption",
                                    "type": "object",
                                    "value": "={{ $jmespath( $json.items, \"[?snippet.language == 'en'] | [0]\" ) }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "71cc0977-1695-4797-9df2-b0a98e41d3de",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  500,
                  -20
            ],
            "parameters": {
                  "width": 448.11859838274916,
                  "height": 417.2722371967648,
                  "content": "### Summarise Your YouTube Videos with AI for Discord\n\n📽️ [Watch the Video Tutorial](https://mrc.fm/ai2d)\n\n* Add your [YouTube channel ID](https://www.youtube.com/account_advanced) to the URL in the first node: `https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID`.\n\n* Ensure authorization with the YouTube channel that you want to download captions from."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Download Captions": {
            "main": [
                  [
                        {
                              "node": "Caption File Conversion",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Find English Captions": {
            "main": [
                  [
                        {
                              "node": "Download Captions",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve Caption Data": {
            "main": [
                  [
                        {
                              "node": "Find English Captions",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "YouTube Video Trigger": {
            "main": [
                  [
                        {
                              "node": "Retrieve Caption Data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Caption File Conversion": {
            "main": [
                  [
                        {
                              "node": "Caption Summary with ChatGPT",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Caption Summary with ChatGPT": {
            "main": [
                  [
                        {
                              "node": "Post to Discord",
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

export function DiscordCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-600' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-600/50 hover:shadow-md'}`}
    >
      <MessageSquare className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}`} />
      <span className="truncate max-w-[200px]">Discord</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {discordTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function DiscordTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {discordTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-indigo-50/50 dark:group-hover:to-indigo-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <MessageSquare className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-indigo-600 dark:hover:bg-indigo-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
