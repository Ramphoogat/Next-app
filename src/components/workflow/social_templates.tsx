import React from 'react';
import { Play, Share2 } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const socialTemplates: IN8nTemplate[] = [
  {
    name: "InstaTest",
    nodes: [
      {
            "id": "51dcaa84-d1f9-4abc-aebc-24a06801e42d",
            "name": "Set your system promt for AI",
            "type": "n8n-nodes-base.set",
            "notes": "In this node in \"prompt\" variable you can set your system prompt",
            "position": [
                  1120,
                  620
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "0b3c3d71-5627-4b8c-91f0-ac44eaedf196",
                                    "name": "prompt",
                                    "type": "string",
                                    "value": "=Persona: You are a instagram influencer.\nContext: You receive a messages from your subscribers\nTask: Answer questions in your writing style and patterns according to your previous posts text. Use your post only for style and patterns reference.\nStyle rules:\nsimple answers"
                              },
                              {
                                    "id": "c2a9e272-5c0d-4685-ad0e-ce6995f92a1c",
                                    "name": "sessionId",
                                    "type": "string",
                                    "value": "={{ $json.body.session_id }}"
                              },
                              {
                                    "id": "b3c20ee3-07a1-4584-b0d9-7310a2c6b723",
                                    "name": "chatInput",
                                    "type": "string",
                                    "value": "={{ $json.body.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "0fb36573-d632-4403-8809-3973f9caa32a",
            "name": "Local n8n memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1500,
                  780
            ],
            "parameters": {
                  "sessionKey": "={{ $('Set your system promt for AI').last().json.sessionId }}",
                  "sessionIdType": "customKey",
                  "contextWindowLength": 20
            },
            "typeVersion": 1.3
      },
      {
            "id": "2f0471a7-2a84-41ce-aab1-896d5ea95ac3",
            "name": "ChatGPT model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1360,
                  780
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "HxWZhtJcnqTXVHAA",
                        "name": "General"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "49abc3a3-faf9-4249-b874-908138a84aea",
            "name": "Send respond ",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1720,
                  620
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "49382508-9307-4ffa-8b31-78fac3a7db10",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  320,
                  360
            ],
            "parameters": {
                  "color": 5,
                  "width": 458.4028599661066,
                  "height": 447.98321744507007,
                  "content": "## Easy Instagram(via ManyChat) bot\n---\n### Description:\nThis template is a main part of Entire solution. It's getting new message from Instagram via ManyChat(Extra No-Code tool for getting and sending message in Instagram). Generating message using ChatGPT and send back to ManyChat that sends it to Instagrtam.\n\n### Logic:\n1. Getting message from Instagram(from ManyChat)\n2. Set you system prompt for AI\n3. Create simple answer for message in AI block\n4. Send answer to Instagram(to ManyChat)\n\n---\n*Helpful links:*\n- [Guide in Notion how to create full bot](https://shadowed-pound-d6e.notion.site/Instagram-GPT-light-version-Manychat-X-N8N-176293bddff880899a9ac255585d29f7?pvs=4)\n- [ManyChat](https://manychat.partnerlinks.io/vm4wkw8j81tc)"
            },
            "typeVersion": 1
      },
      {
            "id": "5d14544c-7039-435f-a53c-615b5722bb99",
            "name": "Getting message from Instagram",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  900,
                  620
            ],
            "webhookId": "68d3fbc9-6e49-4bdc-851c-2a532be911ab",
            "parameters": {
                  "path": "instagram_chat",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "3770f558-341b-4d67-a7f0-0bb2fecf51a3",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1320,
                  300
            ],
            "parameters": {
                  "width": 313.9634922216307,
                  "height": 614.7475040550845,
                  "content": "## 3) AI block\n---\nThere is 3 nodes:\n- AI Agent\n- Chat GPT model\n- Memory for history messages\n\n### To do:\n- in ChatGPT node you can choose the best model for you\n- in Memory Block you can change number of messages in history\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "cbb6c5a2-9b96-4305-afce-5ac560ae2dec",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1340,
                  620
            ],
            "parameters": {
                  "text": "={{ $json.chatInput }}",
                  "options": {
                        "systemMessage": "={{ $json.prompt }}"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "4e28119f-b1aa-4b20-a8ed-28bd137f9627",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  820,
                  360
            ],
            "parameters": {
                  "height": 440,
                  "content": "## 1) HTTP Post webhook\n\n**To do:**\nJust copy production link from this node and insert to custom action in ManyChat\n\nNo edits needed"
            },
            "typeVersion": 1
      },
      {
            "id": "b18a8890-b420-4086-91c8-8edbc845c8af",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1080,
                  480
            ],
            "parameters": {
                  "width": 220,
                  "height": 320,
                  "content": "## 2) Edit prompt\n\n**To do:**\nGo inside and change input\n"
            },
            "typeVersion": 1
      },
      {
            "id": "74d4e6f5-069e-4b37-8005-8c03226b05df",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1660,
                  480
            ],
            "parameters": {
                  "height": 300,
                  "content": "## 4) Respond webhook\n\nNo edits needed"
            },
            "typeVersion": 1
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Send respond ",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "ChatGPT model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Local n8n memory": {
            "ai_memory": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set your system promt for AI": {
            "main": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Getting message from Instagram": {
            "main": [
                  [
                        {
                              "node": "Set your system promt for AI",
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
    name: "Create Dynamic Twitter Profile Banner",
    nodes: [
      {
            "name": "On clicking 'execute'",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  260,
                  210
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "name": "Fetch new followers",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  460,
                  210
            ],
            "parameters": {
                  "url": "https://api.twitter.com/2/users/{YOUR_USER_ID}/followers?user.fields=profile_image_url&max_results=3",
                  "options": {},
                  "authentication": "headerAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "2",
                        "name": "Twitter Token"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Item Lists",
            "type": "n8n-nodes-base.itemLists",
            "position": [
                  660,
                  210
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "data"
            },
            "typeVersion": 1
      },
      {
            "name": "Function",
            "type": "n8n-nodes-base.function",
            "position": [
                  1660,
                  210
            ],
            "parameters": {
                  "functionCode": "const binary = {};\nfor (let i=0; i < items.length; i++) {\n binary[`data${i}`] = items[i].binary.avatar;\n}\n\nreturn [\n {\n json: {\n numIcons: items.length,\n },\n binary,\n }\n];\n"
            },
            "typeVersion": 1
      },
      {
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1910,
                  110
            ],
            "parameters": {
                  "mode": "mergeByIndex"
            },
            "typeVersion": 1
      },
      {
            "name": "Fetching images",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  860,
                  210
            ],
            "parameters": {
                  "url": "={{$json[\"profile_image_url\"].replace('normal','400x400')}}",
                  "options": {},
                  "responseFormat": "file",
                  "dataPropertyName": "avatar"
            },
            "typeVersion": 1
      },
      {
            "name": "Fetch bg",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1660,
                  -40
            ],
            "parameters": {
                  "url": "{TEMPLATE_IMAGE_URL}",
                  "options": {},
                  "responseFormat": "file",
                  "dataPropertyName": "bg"
            },
            "typeVersion": 1
      },
      {
            "name": "Resize",
            "type": "n8n-nodes-base.editImage",
            "position": [
                  1060,
                  210
            ],
            "parameters": {
                  "width": 200,
                  "height": 200,
                  "options": {},
                  "operation": "resize",
                  "dataPropertyName": "avatar"
            },
            "typeVersion": 1
      },
      {
            "name": "Crop",
            "type": "n8n-nodes-base.editImage",
            "position": [
                  1260,
                  210
            ],
            "parameters": {
                  "options": {
                        "format": "png"
                  },
                  "operation": "multiStep",
                  "operations": {
                        "operations": [
                              {
                                    "width": 200,
                                    "height": 200,
                                    "operation": "create",
                                    "backgroundColor": "#000000ff"
                              },
                              {
                                    "color": "#ffffff00",
                                    "operation": "draw",
                                    "primitive": "circle",
                                    "endPositionX": 25,
                                    "endPositionY": 50,
                                    "startPositionX": 100,
                                    "startPositionY": 100
                              },
                              {
                                    "operator": "In",
                                    "operation": "composite",
                                    "dataPropertyNameComposite": "avatar"
                              }
                        ]
                  },
                  "dataPropertyName": "avatar"
            },
            "typeVersion": 1
      },
      {
            "name": "Edit Image",
            "type": "n8n-nodes-base.editImage",
            "position": [
                  2110,
                  110
            ],
            "parameters": {
                  "options": {},
                  "operation": "multiStep",
                  "operations": {
                        "operations": [
                              {
                                    "operation": "composite",
                                    "positionX": 1000,
                                    "positionY": 375,
                                    "dataPropertyNameComposite": "data0"
                              },
                              {
                                    "operation": "composite",
                                    "positionX": 1100,
                                    "positionY": 375,
                                    "dataPropertyNameComposite": "data1"
                              },
                              {
                                    "operation": "composite",
                                    "positionX": 1200,
                                    "positionY": 375,
                                    "dataPropertyNameComposite": "data2"
                              }
                        ]
                  },
                  "dataPropertyName": "bg"
            },
            "typeVersion": 1
      },
      {
            "name": "Resize1",
            "type": "n8n-nodes-base.editImage",
            "position": [
                  1450,
                  210
            ],
            "parameters": {
                  "width": 75,
                  "height": 75,
                  "options": {},
                  "operation": "resize",
                  "dataPropertyName": "avatar"
            },
            "typeVersion": 1
      },
      {
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2310,
                  110
            ],
            "parameters": {
                  "url": "https://api.twitter.com/1.1/account/update_profile_banner.json",
                  "options": {
                        "bodyContentType": "multipart-form-data"
                  },
                  "requestMethod": "POST",
                  "authentication": "oAuth1",
                  "jsonParameters": true,
                  "sendBinaryData": true,
                  "binaryPropertyName": "banner:bg"
            },
            "credentials": {
                  "oAuth1Api": {
                        "id": "13",
                        "name": "Twitter OAuth1.0"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Crop": {
            "main": [
                  [
                        {
                              "node": "Resize1",
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
                              "node": "Edit Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Resize": {
            "main": [
                  [
                        {
                              "node": "Crop",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Resize1": {
            "main": [
                  [
                        {
                              "node": "Function",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetch bg": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Function": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Edit Image": {
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
      "Item Lists": {
            "main": [
                  [
                        {
                              "node": "Fetching images",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetching images": {
            "main": [
                  [
                        {
                              "node": "Resize",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetch new followers": {
            "main": [
                  [
                        {
                              "node": "Item Lists",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "On clicking 'execute'": {
            "main": [
                  [
                        {
                              "node": "Fetch new followers",
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
    name: "Generate Instagram Content from Top Trends with AI Image Generation",
    nodes: [
      {
            "id": "8c49be2b-6320-4eb0-8303-6448ced34636",
            "name": "If media status is finished",
            "type": "n8n-nodes-base.if",
            "position": [
                  1420,
                  260
            ],
            "parameters": {
                  "options": {},
                  "conditions": {
                        "options": {
                              "version": 2,
                              "leftValue": "",
                              "caseSensitive": true,
                              "typeValidation": "strict"
                        },
                        "combinator": "and",
                        "conditions": [
                              {
                                    "id": "0304efee-33b2-499e-bad1-9238c1fc2999",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.status_code }}",
                                    "rightValue": "FINISHED"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "f0cc0be5-6d35-4334-a124-139fa8676d07",
            "name": "If media status is finished1",
            "type": "n8n-nodes-base.if",
            "position": [
                  2000,
                  260
            ],
            "parameters": {
                  "options": {},
                  "conditions": {
                        "options": {
                              "version": 2,
                              "leftValue": "",
                              "caseSensitive": true,
                              "typeValidation": "strict"
                        },
                        "combinator": "and",
                        "conditions": [
                              {
                                    "id": "0304efee-33b2-499e-bad1-9238c1fc2999",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.status_code }}",
                                    "rightValue": "PUBLISHED"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "c8d8d8cd-8501-4d1b-ac28-8cb3fa74d9d7",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1580,
                  440
            ],
            "parameters": {
                  "text": "Video upload edilmeden önce bir problem oldu",
                  "chatId": "={{ $('Telegram Params').item.json.telegram_chat_id }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "GcIVVl98RcazYBaB",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "ae91a5e0-4f70-4a1c-afa5-41f5449facab",
            "name": "Telegram1",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2160,
                  100
            ],
            "parameters": {
                  "text": "Instagram Content is shared",
                  "chatId": "={{ $('Telegram Params').item.json.telegram_chat_id }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "GcIVVl98RcazYBaB",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "b8b38440-14a7-43f6-ac49-6ca9502ff54d",
            "name": "Telegram2",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2160,
                  440
            ],
            "parameters": {
                  "text": "There was a problem when execution a upload content to instagram",
                  "chatId": "={{ $('Telegram Params').item.json.telegram_chat_id }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "GcIVVl98RcazYBaB",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "82e0e5d0-bf50-4b2e-8693-2612dffe53e2",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  -1000,
                  220
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "fb72beb1-1a6a-4148-9ee4-cdc564c4dc5c",
            "name": "Schedule Trigger1",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -3080,
                  300
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "cronExpression",
                                    "expression": "5 13,19 * * *"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "470f3406-19d2-420c-8f33-7031237d882c",
            "name": "Telegram Params",
            "type": "n8n-nodes-base.set",
            "position": [
                  -2320,
                  300
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "d18cdca7-d301-4c70-a4d0-8d6e7ecfc2d1",
                                    "name": "telegram_chat_id",
                                    "type": "string",
                                    "value": ""
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "12971505-7061-4d32-8921-d2e731eae9db",
            "name": "Instagram params",
            "type": "n8n-nodes-base.set",
            "position": [
                  -2560,
                  300
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "1e380c14-e908-4eeb-90e0-957a422829d0",
                                    "name": "instagram_business_account_id",
                                    "type": "string",
                                    "value": ""
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "3cb5f27d-eb3b-4fdc-bb55-1b54f85298e5",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2860,
                  20
            ],
            "parameters": {
                  "color": 4,
                  "width": 1000,
                  "height": 600,
                  "content": "## All Credentials You Need\n** Instagram Business Account Id\n** Telegram Chat Id\n** Rapid Api Key\n** Replicate Token"
            },
            "typeVersion": 1
      },
      {
            "id": "2bc617b8-835c-48ba-8de6-341a6c87b853",
            "name": "Rapid Api params",
            "type": "n8n-nodes-base.set",
            "notes": "test",
            "position": [
                  -2080,
                  300
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "48a33ec7-2b4f-496a-ad77-e4d5f1907ee4",
                                    "name": "x-rapid-api-key",
                                    "type": "string",
                                    "value": ""
                              }
                        ]
                  }
            },
            "notesInFlow": false,
            "typeVersion": 3.4
      },
      {
            "id": "23bad41e-40ac-4488-8b2f-0d54d22a927a",
            "name": "filter the image content",
            "type": "n8n-nodes-base.code",
            "position": [
                  -1480,
                  380
            ],
            "parameters": {
                  "jsCode": "const filteredData = $input.first().json.data.items.filter(item=> !item.is_video)\nreturn filteredData.map((item)=>{\n return {\n id: item.id,\n prompt: item.caption.text,\n content_code: item.code,\n thumbnail_url: item.thumbnail_url,\n tag: $input.first().json.data.additional_data.name\n }\n}) \n\n"
            },
            "typeVersion": 2
      },
      {
            "id": "a65690cd-4d30-4541-b80d-aae872326a77",
            "name": "get top trends on instagram #blender3d",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -1720,
                  180
            ],
            "parameters": {
                  "url": "https://instagram-scraper-api2.p.rapidapi.com/v1/hashtag",
                  "options": {},
                  "sendQuery": true,
                  "sendHeaders": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "hashtag",
                                    "value": "blender3d"
                              },
                              {
                                    "name": "feed_type",
                                    "value": "top"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "x-rapidapi-host",
                                    "value": "instagram-scraper-api2.p.rapidapi.com"
                              },
                              {
                                    "name": "x-rapidapi-key",
                                    "value": "={{ $json['x-rapid-api-key'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "8707c475-7e28-4d80-92b8-ba24033c4632",
            "name": "get top trends on instagram #isometric",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -1720,
                  380
            ],
            "parameters": {
                  "url": "https://instagram-scraper-api2.p.rapidapi.com/v1/hashtag",
                  "options": {},
                  "sendQuery": true,
                  "sendHeaders": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "hashtag",
                                    "value": "isometric"
                              },
                              {
                                    "name": "feed_type",
                                    "value": "top"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "x-rapidapi-host",
                                    "value": "instagram-scraper-api2.p.rapidapi.com"
                              },
                              {
                                    "name": "x-rapidapi-key",
                                    "value": "={{ $json['x-rapid-api-key'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "1c1bfd8f-b086-4147-ba08-578877f2a315",
            "name": "merge the array content",
            "type": "n8n-nodes-base.merge",
            "position": [
                  -1280,
                  280
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "dcc2b6b6-9880-4676-8a1a-a3c21e583bba",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -3180,
                  20
            ],
            "parameters": {
                  "color": 3,
                  "width": 280,
                  "height": 600,
                  "content": "## Schedule Your Time To Post\n"
            },
            "typeVersion": 1
      },
      {
            "id": "c1e0ac33-c4b7-47d8-bd2b-0b74b02afe38",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2600,
                  160
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 300,
                  "content": "## Guide \n** [Guide](https://docs.matillion.com/metl/docs/6957316//) of getting of Instagram Business Account Id "
            },
            "typeVersion": 1
      },
      {
            "id": "321680da-ca7a-4c6f-98d4-a0d8f8d0347f",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2360,
                  160
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 300,
                  "content": "## Guide \n** [Guide](https://rapidapi.com/i-yqerddkq0t/api/telegram92/tutorials/how-to-get-the-id-of-a-telegram-channel,-chat,-user-or-bot%3F) of Getting of Telegram Chat Id "
            },
            "typeVersion": 1
      },
      {
            "id": "b3d07cf7-8d03-4644-88f7-2e94de0c43c2",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2120,
                  160
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 300,
                  "content": "## Guide \n** [Guide](https://docs.rapidapi.com/docs/keys-and-key-rotation) of Getting of Rapid Api Key "
            },
            "typeVersion": 1
      },
      {
            "id": "b6dbdfaa-fc71-4def-a723-bf6c0facd372",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2360,
                  480
            ],
            "parameters": {
                  "color": 7,
                  "width": 180,
                  "height": 120,
                  "content": "## Warning\n**Don't forgot the create bot and send a message to bot first"
            },
            "typeVersion": 1
      },
      {
            "id": "81d598e2-8993-4315-9894-2e78dc26ad10",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1820,
                  20
            ],
            "parameters": {
                  "width": 660,
                  "height": 600,
                  "content": "## Getting Top Trend Posts On Instagram\n** Change the topic you want to get on http request"
            },
            "typeVersion": 1
      },
      {
            "id": "6beb79ef-8205-4882-9bb0-6a2e1a33f1d4",
            "name": "Check Data on Database Is Exist",
            "type": "n8n-nodes-base.postgres",
            "onError": "continueErrorOutput",
            "position": [
                  -760,
                  220
            ],
            "parameters": {
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "top_trends",
                        "cachedResultName": "top_trends"
                  },
                  "where": {
                        "values": [
                              {
                                    "value": "={{$json.content_code}}",
                                    "column": "code"
                              }
                        ]
                  },
                  "schema": {
                        "__rl": true,
                        "mode": "list",
                        "value": "public",
                        "cachedResultName": "public"
                  },
                  "options": {},
                  "operation": "select"
            },
            "credentials": {
                  "postgres": {
                        "id": "sBHQ2psBsfnHkFrZ",
                        "name": "Postgres account"
                  }
            },
            "typeVersion": 2.5,
            "alwaysOutputData": true
      },
      {
            "id": "5b0c05a8-3eb7-4ad8-88e8-ceef81fe7a61",
            "name": "If Data is Exist",
            "type": "n8n-nodes-base.if",
            "position": [
                  -540,
                  240
            ],
            "parameters": {
                  "options": {},
                  "conditions": {
                        "options": {
                              "version": 2,
                              "leftValue": "",
                              "caseSensitive": true,
                              "typeValidation": "loose"
                        },
                        "combinator": "and",
                        "conditions": [
                              {
                                    "id": "9dc20983-ae4d-40db-b969-7d43fa8b0c3e",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ !$json.isEmpty() }}",
                                    "rightValue": "we"
                              },
                              {
                                    "id": "0e1b9264-be56-4d0c-a83e-d9ca0b05b265",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "",
                                    "rightValue": ""
                              }
                        ]
                  },
                  "looseTypeValidation": true
            },
            "executeOnce": false,
            "typeVersion": 2.2,
            "alwaysOutputData": false
      },
      {
            "id": "557aa2c3-8d0b-42c4-b444-953a538d7ff4",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1120,
                  20
            ],
            "parameters": {
                  "width": 1060,
                  "height": 600,
                  "content": "## Looping Data And Checking For Is Exist On Database\n**We are checking until find a data we did not insert because we don't want to create content about in same content"
            },
            "typeVersion": 1
      },
      {
            "id": "9b510f11-9a44-4d54-b162-3ffb55d66677",
            "name": "send error message to telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -1000,
                  440
            ],
            "parameters": {
                  "text": "There was a problem execution a postgresql content",
                  "chatId": "={{ $('Telegram Params').item.json.telegram_chat_id}}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "GcIVVl98RcazYBaB",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "48bc61de-d416-4673-9e9b-8331ea841891",
            "name": "insert data on db",
            "type": "n8n-nodes-base.postgres",
            "position": [
                  -260,
                  240
            ],
            "parameters": {
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "top_trends",
                        "cachedResultName": "top_trends"
                  },
                  "schema": {
                        "__rl": true,
                        "mode": "list",
                        "value": "public"
                  },
                  "columns": {
                        "value": {
                              "tag": "={{$('Loop Over Items').item.json.tag}}",
                              "code": "={{$('Loop Over Items').item.json.content_code}}",
                              "prompt": "={{$('Loop Over Items').item.json.prompt}}",
                              "isposted": false,
                              "thumbnail_url": "={{$('Loop Over Items').item.json.thumbnail_url}}"
                        },
                        "schema": [
                              {
                                    "id": "id",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "prompt",
                                    "type": "string",
                                    "display": true,
                                    "required": true,
                                    "displayName": "prompt",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "isposted",
                                    "type": "boolean",
                                    "display": true,
                                    "required": false,
                                    "displayName": "isposted",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "createdat",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "createdat",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "updatedat",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "updatedat",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "deletedat",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "deletedat",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "code",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "code",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "tag",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "tag",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "thumbnail_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "thumbnail_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "id"
                        ],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {}
            },
            "credentials": {
                  "postgres": {
                        "id": "sBHQ2psBsfnHkFrZ",
                        "name": "Postgres account"
                  }
            },
            "typeVersion": 2.5
      },
      {
            "id": "15e7d69d-a10f-48a1-b240-046e9950d077",
            "name": "Analyze Image and give the content",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  80,
                  240
            ],
            "parameters": {
                  "text": "Create a clear and concise description of the object in the image, focusing on its physical and general features. Avoid detailed environmental aspects like background, lighting, or colors. Describe the shape, texture, size, and any unique characteristics of the object. Mention any notable features that make the object stand out, such as its surface details, materials, and design. The description should be focused on the object itself, not its surroundings.\n\nFor example, describe the following image:\n",
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "GPT-4O-MINI"
                  },
                  "options": {},
                  "resource": "image",
                  "imageUrls": "={{ $('Loop Over Items').item.json.thumbnail_url }}",
                  "operation": "analyze"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "1TwEayhZUT90fq8N",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "93e253b1-da7d-4193-b899-a38e6fd9f4e4",
            "name": "Analyze Content And Generate Instagram Caption",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  280,
                  240
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "GPT-4O-MINI"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "content": "=\nSummarize the following content description into a short, engaging Instagram caption under 150 words. The caption should focus on the content of the image, not the app. Keep it appealing to social media users, and highlight the visual details of the image. Include hashtags relevant to 3D modeling and design, such as #Blender3D, #3DArt, #DigitalArt, #3DModeling, and #ArtCommunity. Ensure the tone is friendly and inviting.\n\n\nContent description to summarize:\n{{ $json.content }}\n\nMake sure to craft the caption around the content's features, such as the color contrast, reflective surface, and artistic nature of the image.\n\n"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "1TwEayhZUT90fq8N",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "9af1dc59-1d9e-4900-8f80-1eba946c4057",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -20,
                  20
            ],
            "parameters": {
                  "color": 4,
                  "width": 860,
                  "height": 600,
                  "content": "## Analyze Post Content\n** We are analyzing the image\n** We are generating a instagram caption by content\n** Then we are generating the image"
            },
            "typeVersion": 1
      },
      {
            "id": "2259f6df-dca9-4a7e-babb-e63375f7207f",
            "name": "Prepare data on Instagram",
            "type": "n8n-nodes-base.facebookGraphApi",
            "position": [
                  980,
                  260
            ],
            "parameters": {
                  "edge": "media",
                  "node": "={{ $('Instagram params').item.json.instagram_business_account_id }}",
                  "options": {
                        "queryParameters": {
                              "parameter": [
                                    {
                                          "name": "image_url",
                                          "value": "={{ $json.output[0] }}"
                                    },
                                    {
                                          "name": "caption",
                                          "value": "={{ $('Analyze Content And Generate Instagram Caption').item.json.message.content }}"
                                    }
                              ]
                        }
                  },
                  "graphApiVersion": "v20.0",
                  "httpRequestMethod": "POST"
            },
            "credentials": {
                  "facebookGraphApi": {
                        "id": "ZFxxxLfZ25M7Va6r",
                        "name": "Facebook Graph account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "bcbb6058-1966-4bb5-915a-1e65b9131117",
            "name": "Check Status Of Media Before Uploaded",
            "type": "n8n-nodes-base.facebookGraphApi",
            "position": [
                  1200,
                  260
            ],
            "parameters": {
                  "node": "={{ $json.id }}",
                  "options": {
                        "fields": {
                              "field": [
                                    {
                                          "name": "id"
                                    },
                                    {
                                          "name": "status"
                                    },
                                    {
                                          "name": "status_code"
                                    }
                              ]
                        }
                  },
                  "graphApiVersion": "v20.0"
            },
            "credentials": {
                  "facebookGraphApi": {
                        "id": "ZFxxxLfZ25M7Va6r",
                        "name": "Facebook Graph account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "518d87ff-7808-4c06-b137-4e97d8f2ca28",
            "name": "Publish Media on Instagram",
            "type": "n8n-nodes-base.facebookGraphApi",
            "position": [
                  1600,
                  100
            ],
            "parameters": {
                  "edge": "media_publish",
                  "node": "={{ $('Instagram params').item.json.instagram_business_account_id }}",
                  "options": {
                        "queryParameters": {
                              "parameter": [
                                    {
                                          "name": "creation_id",
                                          "value": "={{ $json.id }}"
                                    }
                              ]
                        }
                  },
                  "graphApiVersion": "v20.0",
                  "httpRequestMethod": "POST"
            },
            "credentials": {
                  "facebookGraphApi": {
                        "id": "ZFxxxLfZ25M7Va6r",
                        "name": "Facebook Graph account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a033d12b-524f-40e8-9208-5300bbc823d3",
            "name": "Check status of post ",
            "type": "n8n-nodes-base.facebookGraphApi",
            "position": [
                  1800,
                  260
            ],
            "parameters": {
                  "node": "={{ $('Check Status Of Media Before Uploaded').item.json.id }}",
                  "options": {
                        "fields": {
                              "field": [
                                    {
                                          "name": "id"
                                    },
                                    {
                                          "name": "status"
                                    },
                                    {
                                          "name": "status_code"
                                    }
                              ]
                        }
                  },
                  "graphApiVersion": "v20.0"
            },
            "credentials": {
                  "facebookGraphApi": {
                        "id": "ZFxxxLfZ25M7Va6r",
                        "name": "Facebook Graph account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f136e907-2938-4175-b51f-4201fbe3477d",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  880,
                  20
            ],
            "parameters": {
                  "color": 5,
                  "width": 1580,
                  "height": 600,
                  "content": "## Publish On Instagram And Send Message When Published via Telegram\n"
            },
            "typeVersion": 1
      },
      {
            "id": "8145986c-5453-43ac-8d5c-c50a84a62136",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1800,
                  100
            ],
            "parameters": {
                  "color": 5,
                  "width": 260,
                  "height": 500,
                  "content": "## For More About Api\n** [Facebook Scraper Api Guide](https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2/playground/apiendpoint_a45552b2-9850-4da9-b5cb-bbdd3ac2199d)"
            },
            "typeVersion": 1
      },
      {
            "id": "02416fbb-4250-4278-af23-1f9189787123",
            "name": "filter the image content-2",
            "type": "n8n-nodes-base.code",
            "position": [
                  -1480,
                  180
            ],
            "parameters": {
                  "jsCode": "const filteredData = $input.first().json.data.items.filter(item=> !item.is_video)\nreturn filteredData.map((item)=>{\n return {\n id: item.id,\n prompt: item.caption.text,\n content_code: item.code,\n thumbnail_url: item.thumbnail_url,\n tag: $input.first().json.data.additional_data.name\n }\n}) \n\n"
            },
            "typeVersion": 2
      },
      {
            "id": "2d1ea53d-1d32-4b86-8944-ce2ad4a69847",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2820,
                  160
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 300,
                  "content": "## Guide \n** [Guide](https://replicate.com) of getting of Replicate Token "
            },
            "typeVersion": 1
      },
      {
            "id": "c8b933af-356e-49ae-92d3-42eaf4ee3e9f",
            "name": "Replicate params",
            "type": "n8n-nodes-base.set",
            "position": [
                  -2780,
                  300
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "1e380c14-e908-4eeb-90e0-957a422829d0",
                                    "name": "replicate_token",
                                    "type": "string",
                                    "value": ""
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "2c73cc9c-d436-459b-9b3c-bd870810b9b4",
            "name": "Generate image on flux",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  680,
                  260
            ],
            "parameters": {
                  "url": "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"input\": {\n \"prompt\": \"A highly detailed 3D isometric model of {{$('Analyze Image and give the content').item.json.content .replace(/\\\\n/g, ' ') \n.replace(/\\\\t/g, ' ') \n.replace(/\\s+/g, ' ')\n.trim(); }} rendered in a stylized miniature toy aesthetic. Materials: Matte plastic/painted metal/weathered stone texture with no self-shadowing. Lighting: - Completely shadowless rendering - Ultra bright and perfectly even illumination from all angles - Pure ambient lighting without directional shadows - Flat, consistent lighting across all surfaces - No ambient occlusion. Style specifications: - Clean, defined edges and surfaces - Slightly exaggerated proportions - Miniature/toy-like scale - Subtle wear and texturing - Rich color palette with muted tones - Isometric 3/4 view angle - Crisp details and micro-elements. Technical details: - 4K resolution - PBR materials without shadows - No depth of field - High-quality anti-aliasing - Perfect uniform lighting. Environment: Pure white background with zero shadows or gradients. Post-processing: High key lighting, maximum brightness, shadow removal.\",\n \"output_format\": \"jpg\",\n \"output_quality\": 100,\n \"go_fast\":false\n }\n}\n",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "=json",
                  "bodyParameters": {
                        "parameters": [
                              {}
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "=Bearer {{ $('Replicate params').item.json.replicate_token}}"
                              },
                              {
                                    "name": "Prefer",
                                    "value": "wait"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "6f9e7dc6-1287-4235-8631-198d729f367f",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1120,
                  -340
            ],
            "parameters": {
                  "color": 4,
                  "width": 1060,
                  "height": 320,
                  "content": "## For top_trends Table\n```\nCREATE TABLE top_trends (\n id SERIAL PRIMARY KEY,\n isposted BOOLEAN DEFAULT false,\n createdat TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n updatedat TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n deletedat TIMESTAMP WITHOUT TIME ZONE,\n prompt TEXT NOT NULL,\n thumbnail_url TEXT,\n code TEXT,\n tag TEXT\n);\n```"
            },
            "typeVersion": 1
      },
      {
            "id": "b19951bb-6346-44a7-a4c8-1bd0806c6019",
            "name": "Sticky Note13",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -660,
                  -120
            ],
            "parameters": {
                  "color": 3,
                  "width": 160,
                  "height": 120,
                  "content": "## Warning\n** Don't forgot the create top_trends table"
            },
            "typeVersion": 1
      },
      {
            "id": "3de6b8e5-c5e0-4999-871a-c349cb9b3ac0",
            "name": "Sticky Note14",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -3180,
                  -940
            ],
            "parameters": {
                  "width": 620,
                  "height": 840,
                  "content": "\n## Automated Instagram Content Creation from Trending Posts\n\nThis workflow automates the process of discovering and recreating trending content on Instagram:\n\n1. Content Discovery:\n - Scrapes top trending posts from specific hashtags (#blender3d, #isometric)\n - Filters for image-only content (excludes videos)\n - Checks database to avoid duplicate content\n\n2. AI-Powered Content Generation:\n - Analyzes trending images using GPT-4 Vision\n - Generates detailed descriptions of visual elements\n - Creates engaging Instagram captions with relevant hashtags\n - Uses Flux AI to generate similar but unique images\n\n3. Publishing & Monitoring:\n - Automatically posts content to Instagram Business Account\n - Monitors post status and publishing process\n - Sends status updates via Telegram\n\nPerfect for content creators and businesses looking to maintain an active Instagram presence with AI-generated content inspired by current trends. The workflow runs on schedule and handles everything from content discovery to publication automatically.\n\nNote: Requires Instagram Business Account, Telegram Bot, OpenAI, and Replicate API credentials."
            },
            "typeVersion": 1
      },
      {
            "id": "dfd0d182-177c-4336-8950-4792ea739123",
            "name": "Sticky Note15",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2120,
                  480
            ],
            "parameters": {
                  "color": 7,
                  "width": 180,
                  "height": 120,
                  "content": "##Warning\n** Dont forgot the subscribe [Instagram Scraper Api](https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2/playground/apiendpoint_a45552b2-9850-4da9-b5cb-bbdd3ac2199d)"
            },
            "typeVersion": 1
      },
      {
            "id": "03330941-3c6e-4152-8c51-f1d53f4424bc",
            "name": "Sticky Note16",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2120,
                  640
            ],
            "parameters": {
                  "width": 180,
                  "height": 180,
                  "content": "## Warning\n** You can check the [rate limit](https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2) of the Instagram Scraper Api on Rapid Api\n** Free version is monthly 500 request\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Telegram": {
            "main": [
                  []
            ]
      },
      "Loop Over Items": {
            "main": [
                  [],
                  [
                        {
                              "node": "Check Data on Database Is Exist",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Params": {
            "main": [
                  [
                        {
                              "node": "Rapid Api params",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If Data is Exist": {
            "main": [
                  [
                        {
                              "node": "Loop Over Items",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "insert data on db",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Instagram params": {
            "main": [
                  [
                        {
                              "node": "Telegram Params",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Rapid Api params": {
            "main": [
                  [
                        {
                              "node": "get top trends on instagram #isometric",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "get top trends on instagram #blender3d",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Replicate params": {
            "main": [
                  [
                        {
                              "node": "Instagram params",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Schedule Trigger1": {
            "main": [
                  [
                        {
                              "node": "Replicate params",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "insert data on db": {
            "main": [
                  [
                        {
                              "node": "Analyze Image and give the content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check status of post ": {
            "main": [
                  [
                        {
                              "node": "If media status is finished1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate image on flux": {
            "main": [
                  [
                        {
                              "node": "Prepare data on Instagram",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "merge the array content": {
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
      "filter the image content": {
            "main": [
                  [
                        {
                              "node": "merge the array content",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Prepare data on Instagram": {
            "main": [
                  [
                        {
                              "node": "Check Status Of Media Before Uploaded",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Publish Media on Instagram": {
            "main": [
                  [
                        {
                              "node": "Check status of post ",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "filter the image content-2": {
            "main": [
                  [
                        {
                              "node": "merge the array content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If media status is finished": {
            "main": [
                  [
                        {
                              "node": "Publish Media on Instagram",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Telegram",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If media status is finished1": {
            "main": [
                  [
                        {
                              "node": "Telegram1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Telegram2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check Data on Database Is Exist": {
            "main": [
                  [
                        {
                              "node": "If Data is Exist",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "send error message to telegram",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze Image and give the content": {
            "main": [
                  [
                        {
                              "node": "Analyze Content And Generate Instagram Caption",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check Status Of Media Before Uploaded": {
            "main": [
                  [
                        {
                              "node": "If media status is finished",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "get top trends on instagram #isometric": {
            "main": [
                  [
                        {
                              "node": "filter the image content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "get top trends on instagram #blender3d": {
            "main": [
                  [
                        {
                              "node": "filter the image content-2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze Content And Generate Instagram Caption": {
            "main": [
                  [
                        {
                              "node": "Generate image on flux",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "timezone": "Europe/Istanbul",
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1"
},
  },
  {
    name: "OpenAI-Powered Tweet Generator",
    nodes: [
      {
            "name": "On clicking 'execute'",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  250,
                  300
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "name": "FunctionItem",
            "type": "n8n-nodes-base.functionItem",
            "position": [
                  450,
                  300
            ],
            "parameters": {
                  "functionCode": "// hashtag list\nconst Hashtags = [\n \"#techtwitter\",\n \"#n8n\"\n];\n\n// random output function\nconst randomHashtag = Hashtags[Math.floor(Math.random() * Hashtags.length)];\nitem.hashtag = randomHashtag;\nreturn item;"
            },
            "typeVersion": 1
      },
      {
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  650,
                  300
            ],
            "parameters": {
                  "url": "https://api.openai.com/v1/engines/text-davinci-001/completions",
                  "options": {},
                  "requestMethod": "POST",
                  "authentication": "headerAuth",
                  "jsonParameters": true,
                  "bodyParametersJson": "={\n \"prompt\": \"Generate a tweet, with under 100 characters, about and including the hashtag {{$node[\"FunctionItem\"].json[\"hashtag\"]}}:\",\n \"temperature\": 0.7,\n \"max_tokens\": 64,\n \"top_p\": 1,\n \"frequency_penalty\": 0,\n \"presence_penalty\": 0\n}"
            },
            "credentials": {
                  "httpHeaderAuth": ""
            },
            "typeVersion": 1
      },
      {
            "name": "Airtable",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1050,
                  300
            ],
            "parameters": {
                  "table": "main",
                  "options": {},
                  "operation": "append",
                  "application": "appOaG8kEA8FAABOr"
            },
            "credentials": {
                  "airtableApi": ""
            },
            "typeVersion": 1
      },
      {
            "name": "Set",
            "type": "n8n-nodes-base.set",
            "position": [
                  850,
                  300
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "Hashtag",
                                    "value": "={{$node[\"FunctionItem\"].json[\"hashtag\"]}}"
                              },
                              {
                                    "name": "Content",
                                    "value": "={{$node[\"HTTP Request\"].json[\"choices\"][0][\"text\"]}}"
                              }
                        ]
                  },
                  "options": {},
                  "keepOnlySet": true
            },
            "typeVersion": 1
      }
],
    connections: {
      "Set": {
            "main": [
                  [
                        {
                              "node": "Airtable",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "FunctionItem": {
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
                              "node": "Set",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "On clicking 'execute'": {
            "main": [
                  [
                        {
                              "node": "FunctionItem",
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
    name: "Post New YouTube Videos to X",
    nodes: [
      {
            "id": "576be5c4-1ed0-4d01-a980-cb2fc31e2223",
            "name": "Post to X",
            "type": "n8n-nodes-base.twitter",
            "position": [
                  1280,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.message.content }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "twitterOAuth2Api": {
                        "id": "FjHOuF0APzoMqIjG",
                        "name": "X account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "3b87cf2a-51d5-4589-9729-bb1fe3cfceca",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  254.76543209876536
            ],
            "parameters": {
                  "color": 3,
                  "width": 221.82716049382665,
                  "height": 308.7901234567902,
                  "content": "🆔 Ensure you enter your YouTube Channel ID in the \"Channel ID\" field of this node. You can find your [Channel ID here](https://youtube.com/account_advanced)."
            },
            "typeVersion": 1
      },
      {
            "id": "912e631c-aa43-4e02-9816-b35fe6e62dd8",
            "name": "Generate Post for X with ChatGPT",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  900,
                  380
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
                                    "content": "=Write an engaging post about my latest YouTube video for X (Twitter) of no more than 140 characters in length. Link to the video at https://youtu.be/{{ $json.id.videoId }} use this title and description: {{ $json.snippet.title }} {{ $json.snippet.description }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "UpdYKqoR9wsGBnaA",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "841ee140-7e37-4e9c-8ab2-2a3ee941d255",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  360,
                  254.5679012345679
            ],
            "parameters": {
                  "width": 244.34567901234558,
                  "height": 102.81481481481477,
                  "content": "**Use AI to Promote Your New YouTube Videos on X**\n\n🎬 Watch the [Setup Video Here](https://mrc.fm/ai2x)"
            },
            "typeVersion": 1
      },
      {
            "id": "583b7d5d-e5dc-4183-92ee-8135ce6095a8",
            "name": "Fetch Latest Videos",
            "type": "n8n-nodes-base.youTube",
            "position": [
                  680,
                  380
            ],
            "parameters": {
                  "limit": 1,
                  "filters": {
                        "channelId": "UC08Fah8EIryeOZRkjBRohcQ",
                        "publishedAfter": "={{ new Date(new Date().getTime() - 30 * 60000).toISOString() }}"
                  },
                  "options": {},
                  "resource": "video"
            },
            "credentials": {
                  "youTubeOAuth2Api": {
                        "id": "cVI5wEqeFEeJ81nk",
                        "name": "YouTube account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6e391007-10e2-4e67-9db6-e13d5d2bef11",
            "name": "Check Every 30 Min",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  460,
                  380
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "minutes",
                                    "minutesInterval": 30
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      }
],
    connections: {
      "Check Every 30 Min": {
            "main": [
                  [
                        {
                              "node": "Fetch Latest Videos",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetch Latest Videos": {
            "main": [
                  [
                        {
                              "node": "Generate Post for X with ChatGPT",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Post for X with ChatGPT": {
            "main": [
                  [
                        {
                              "node": "Post to X",
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
    name: "Reddit AI Digest",
    nodes: [
      {
            "id": "d9bae984-2ce7-4f6b-ab53-527ac9dfea3d",
            "name": "When clicking \"Execute Workflow\"",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  680,
                  320
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "32ecf73c-b6e9-4bd6-9ecc-d82c4c50d7b5",
            "name": "Reddit",
            "type": "n8n-nodes-base.reddit",
            "position": [
                  880,
                  320
            ],
            "parameters": {
                  "keyword": "n8n",
                  "location": "allReddit",
                  "operation": "search",
                  "additionalFields": {
                        "sort": "new"
                  }
            },
            "credentials": {},
            "typeVersion": 1
      },
      {
            "id": "4b560620-a101-4566-b066-4ce3f44d8b0c",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  120,
                  180
            ],
            "parameters": {
                  "width": 507.1052631578949,
                  "height": 210.99380804953552,
                  "content": "## What this workflow does\n✔︎ 1) Get posts from reddit that might be about n8n\n - Filter for the most relevant posts (posted in last 7 days and more than 5 upvotes and is original content)\n\n✔︎ 2) Check if the post is actually about n8n\n\n✔︎ 3) if it is, categorise with OpenAi.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "f3be9af5-b4ff-4f4e-a726-fc05fab94521",
            "name": "Set",
            "type": "n8n-nodes-base.set",
            "position": [
                  1260,
                  320
            ],
            "parameters": {
                  "values": {
                        "number": [
                              {
                                    "name": "upvotes",
                                    "value": "={{ $json.ups }}"
                              },
                              {
                                    "name": "subredditSize",
                                    "value": "={{ $json.subreddit_subscribers }}"
                              }
                        ],
                        "string": [
                              {
                                    "name": "selftextTrimmed",
                                    "value": "={{ $json.selftext.substring(0,500) }}"
                              },
                              {
                                    "name": "subreddit",
                                    "value": "={{ $json.subreddit }}"
                              },
                              {
                                    "name": "date",
                                    "value": "={{ DateTime.fromSeconds($json.created).toLocaleString() }}"
                              },
                              {
                                    "name": "url",
                                    "value": "={{ $json.url }}"
                              }
                        ]
                  },
                  "options": {},
                  "keepOnlySet": true
            },
            "typeVersion": 1
      },
      {
            "id": "b1dbf78f-c7c6-4ab7-a957-78d58c5e13e3",
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "position": [
                  1060,
                  320
            ],
            "parameters": {
                  "conditions": {
                        "number": [
                              {
                                    "value1": "={{ $json.ups }}",
                                    "value2": "=5",
                                    "operation": "largerEqual"
                              }
                        ],
                        "string": [
                              {
                                    "value1": "={{ $json.selftext }}",
                                    "operation": "isNotEmpty"
                              }
                        ],
                        "dateTime": [
                              {
                                    "value1": "={{ DateTime.fromSeconds($json.created).toISO() }}",
                                    "value2": "={{ $today.minus({days: 7}).toISO() }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a3aa9e43-a824-4cc1-b4e6-d41a2e8e56cd",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  120,
                  660
            ],
            "parameters": {
                  "width": 504.4736842105267,
                  "height": 116.77974205725066,
                  "content": "## Drawbacks\n🤔 Workflow only considers first 500 characters of each reddit post. So if n8n is mentioned after this amount, it won't register as being a post about n8n.io."
            },
            "typeVersion": 1
      },
      {
            "id": "b3d566aa-1645-4c2c-9704-15aa2e42bb12",
            "name": "IF1",
            "type": "n8n-nodes-base.if",
            "position": [
                  1880,
                  340
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json.choices[0].text }}",
                                    "value2": "No",
                                    "operation": "contains"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0ad54272-08b9-46d4-8e6a-1fb55a92d3e4",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1680,
                  520
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {
                        "fuzzyCompare": false,
                        "includeUnpaired": true
                  },
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2
      },
      {
            "id": "288f53cc-0e53-4683-ac0e-debe0a3691b8",
            "name": "Merge1",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2340,
                  540
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {
                        "fuzzyCompare": false,
                        "includeUnpaired": true
                  },
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2
      },
      {
            "id": "46280db5-e4b0-4108-958a-763b6410caa0",
            "name": "SetFinal",
            "type": "n8n-nodes-base.set",
            "position": [
                  2560,
                  540
            ],
            "parameters": {
                  "values": {
                        "number": [
                              {
                                    "name": "upvotes",
                                    "value": "={{ $json.upvotes }}"
                              },
                              {
                                    "name": "subredditSize",
                                    "value": "={{ $json.subredditSize }}"
                              }
                        ],
                        "string": [
                              {
                                    "name": "subreddit",
                                    "value": "={{ $json.subreddit }}"
                              },
                              {
                                    "name": "bulletSummary",
                                    "value": "={{ $json.text }}"
                              },
                              {
                                    "name": "date",
                                    "value": "={{ $json.date }}"
                              },
                              {
                                    "name": "url",
                                    "value": "={{ $json.url }}"
                              }
                        ]
                  },
                  "options": {},
                  "keepOnlySet": true
            },
            "typeVersion": 1
      },
      {
            "id": "ac8c4847-4d73-4dce-9543-a199e8b11b51",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  120,
                  400
            ],
            "parameters": {
                  "width": 507.1052631578949,
                  "height": 247.53869969040255,
                  "content": "## Next steps\n* Improve OpenAI Summary node prompt to return cleaner summaries.\n* Extend to **more platforms/sources** - e.g. it would be really cool to monitor larger slack communities in this way. \n* Do some classification on type of user to highlight users likely to be in our **ICP**.\n* Separate a list of data sources (reddit, twitter, slack, discord etc.), extract messages from there and have them go to a **sub workflow for classification and summarisation.**"
            },
            "typeVersion": 1
      },
      {
            "id": "12ab5ba4-d24d-4fa1-a0d1-d1e81e2d5dee",
            "name": "OpenAI Summary",
            "type": "n8n-nodes-base.openAi",
            "notes": "A one sentence summary of what the post is about.",
            "disabled": true,
            "position": [
                  2160,
                  160
            ],
            "parameters": {
                  "input": "={{ $json.selftextTrimmed }}",
                  "options": {
                        "temperature": 0.3
                  },
                  "operation": "edit",
                  "instruction": "Summarise what this is talking about in a meta way less than 20 words. Ignore punctuation in your summary and return a short, human readable summary."
            },
            "credentials": {},
            "typeVersion": 1
      },
      {
            "id": "e303a1aa-ee93-4f8f-b834-19aa8da7fe95",
            "name": "OpenAI Classify",
            "type": "n8n-nodes-base.openAi",
            "notes": "Is the post about n8n?",
            "position": [
                  1460,
                  320
            ],
            "parameters": {
                  "prompt": "=Decide whether a reddit post is about n8n.io, a workflow automation low code tool that can be self-hosted, or not.\nReddit Post: {{ $json.selftextTrimmed }}\nAbout n8n?: Yes/No",
                  "options": {
                        "maxTokens": 32
                  },
                  "simplifyOutput": false
            },
            "credentials": {},
            "notesInFlow": true,
            "typeVersion": 1
      },
      {
            "id": "f56cb8b6-4c28-448e-b259-8946ffc4c1f7",
            "name": "OpenAI Summary Backup",
            "type": "n8n-nodes-base.openAi",
            "notes": "A one sentence summary of what the post is about.",
            "position": [
                  2160,
                  340
            ],
            "parameters": {
                  "prompt": "=Summarise what this is talking about in a meta way in only 1 sentence.\n\n {{ $json.selftextTrimmed }}",
                  "options": {
                        "maxTokens": 128
                  }
            },
            "credentials": {},
            "typeVersion": 1
      },
      {
            "id": "d1eacbf2-9cc8-482d-a7d2-34c351f20871",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  640,
                  520
            ],
            "parameters": {
                  "width": 843.411496498402,
                  "height": 258.676790119369,
                  "content": "## What we learned\n- 🪶 **Writing prompts**: small changes in the type of prompt result in very different results. e.g. for Summarising OpenAI would use multiple sentences even if we asked it to use only 1. We got better results by following OpenAI's documentation.\n - We could make OpenAI node easier to work with for new users by the node inputs being oriented not to sending parameters to api but by following [their suggestions](https://platform.openai.com/docs/guides/completion/prompt-design) - e.g. have a field for expected output format rather than just for prompt.\n- ↕️ **Changing the max_tokens parameter** drastically changes results - sometimes making it smaller even improves results (e.g. when you want a yes/no response in the OpenAI Classify node). In their [docs](https://platform.openai.com/docs/guides/completion/inserting-text) they recommend using max_tokens>256 but [n8n by default](https://community.n8n.io/t/openai-result-not-complete/21533) uses max_tokens=16. We should probably update this."
            },
            "typeVersion": 1
      }
],
    connections: {
      "IF": {
            "main": [
                  [
                        {
                              "node": "Set",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "IF1": {
            "main": [
                  null,
                  [
                        {
                              "node": "OpenAI Summary Backup",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Set": {
            "main": [
                  [
                        {
                              "node": "OpenAI Classify",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Merge": {
            "main": [
                  [
                        {
                              "node": "IF1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge1": {
            "main": [
                  [
                        {
                              "node": "SetFinal",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Reddit": {
            "main": [
                  [
                        {
                              "node": "IF",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Classify": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Summary Backup": {
            "main": [
                  [
                        {
                              "node": "Merge1",
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
                              "node": "Reddit",
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
    name: "Social Media Analysis And Automated Email Generation",
    nodes: [
      {
            "id": "a768bce6-ae26-464c-95fc-009edea4f94d",
            "name": "Set your company's variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  440,
                  0
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "6a8063b6-1fd8-429a-9f13-b7512066c702",
                                    "name": "your_company_name",
                                    "type": "string",
                                    "value": "Pollup Data Services"
                              },
                              {
                                    "id": "3e6780d6-86d0-4353-aa17-8470a91f63a8",
                                    "name": "your_company_activity",
                                    "type": "string",
                                    "value": "Whether it’s automating recurring tasks, analysing data faster, or personalising customer interactions, we build bespoke AI agents to help your workforce work smarter."
                              },
                              {
                                    "id": "1b42f1b3-20ed-4278-952d-f28fe0f03fa3",
                                    "name": "your_email",
                                    "type": "string",
                                    "value": "thomas@pollup.net"
                              },
                              {
                                    "id": "7c109ba2-d855-49d5-8700-624b01a05bc1",
                                    "name": "your_name",
                                    "type": "string",
                                    "value": "Justin"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "ca729f8d-cab8-4221-addb-aa23813d80b4",
            "name": "Get linkedin Posts",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1300,
                  0
            ],
            "parameters": {
                  "url": "https://fresh-linkedin-profile-data.p.rapidapi.com/get-profile-posts",
                  "options": {},
                  "sendQuery": true,
                  "sendHeaders": true,
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "linkedin_url",
                                    "value": "={{ $('Google Sheets Trigger').item.json.linkedin_url }}"
                              },
                              {
                                    "name": "type",
                                    "value": "posts"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "x-rapidapi-host",
                                    "value": "fresh-linkedin-profile-data.p.rapidapi.com"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "nhoVFnkO31mejJrI",
                        "name": "RapidAPI Key"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "b9559958-f8ac-4ab6-93c6-50eb04113808",
            "name": "Get twitter ID",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  680,
                  0
            ],
            "parameters": {
                  "url": "https://twitter-api47.p.rapidapi.com/v2/user/by-username",
                  "options": {},
                  "sendQuery": true,
                  "sendHeaders": true,
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "username",
                                    "value": "={{ $('Google Sheets Trigger').item.json.twitter_handler }}"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "x-rapidapi-host",
                                    "value": "twitter-api47.p.rapidapi.com"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "nhoVFnkO31mejJrI",
                        "name": "RapidAPI Key"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "3e85565f-ebfa-4568-9391-869961c5b3ed",
            "name": "Get tweets",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  880,
                  0
            ],
            "parameters": {
                  "url": "https://twitter-api47.p.rapidapi.com/v2/user/tweets",
                  "options": {},
                  "sendQuery": true,
                  "sendHeaders": true,
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "userId",
                                    "value": "={{ $json.rest_id }}"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "x-rapidapi-host",
                                    "value": "twitter-api47.p.rapidapi.com"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "nhoVFnkO31mejJrI",
                        "name": "RapidAPI Key"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "6e060b21-9eaf-49e6-9665-c051b3f2397e",
            "name": "Extract and limit Linkedin",
            "type": "n8n-nodes-base.code",
            "position": [
                  1520,
                  0
            ],
            "parameters": {
                  "jsCode": "// Loop over input items and add a new field called 'myNewField' to the JSON of each one\noutput = []\nmax_posts = 10\nlet counter = 0\nfor (const item of $input.all()[0].json.data) {\n let post = {\n title: item.article_title,\n text: item.text\n }\n output.push(post)\n if(counter++ >= max_posts) break;\n}\n\nreturn {\"linkedIn posts\": output};"
            },
            "typeVersion": 2
      },
      {
            "id": "e65bc472-e7c6-43c5-8e84-fe8c4512e92f",
            "name": "Exract and limit X",
            "type": "n8n-nodes-base.code",
            "position": [
                  1100,
                  0
            ],
            "parameters": {
                  "jsCode": "// Loop over input items and add a new field called 'myNewField' to the JSON of each one\noutput = []\nmax_posts = 10\nlet counter = 0\nfor (const item of $input.all()[0].json.tweets) {\n if(!item.content.hasOwnProperty('itemContent')) continue\n let post = {\n text: item.content.itemContent?.tweet_results?.result.legacy?.full_text\n }\n console.log(post)\n output.push(post)\n if(counter++ >= max_posts) break;\n}\n\nreturn {\"Twitter tweets\": output};"
            },
            "typeVersion": 2
      },
      {
            "id": "10f088a0-0479-428e-96cf-fe0df9b37877",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1740,
                  200
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "yepsCCAriRlCkICW",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9adfd648-8348-4a0a-8b9b-d54dc3b715bb",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  1920,
                  220
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n \"subject\": \"\",\n \"cover_letter\": \"\"\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "af96003c-539d-4728-832c-4819d85bbbcc",
            "name": "Generate Subject and cover letter based on match",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1720,
                  0
            ],
            "parameters": {
                  "text": "=## Me\n- My company name is: {{ $('Set your company\\'s variables').item.json.your_company_name }}\n- My company's activity is: {{ $('Set your company\\'s variables').item.json.your_company_activity }}\n- My name is: {{ $('Set your company\\'s variables').item.json.your_name }}\n- My email is: {{ $('Set your company\\'s variables').item.json.your_email }}\n\n## My lead:\nHis name: {{ $('Google Sheets Trigger').item.json.name }}\n\n## What I want you to do\n- According to the info about me, and the linkedin posts an twitter post of a user given below, I want you to find a common activity that I could propose to this person and generate a cover letter about it\n- Return ONLY the cover letter and the subject as a json like this:\n{\n \"subject\": \"\",\n \"cover_letter\": \"\"\n}\n\nTHe cover letter should be in HTML format\n\n## The Linkedin Posts:\n{{ JSON.stringify($json[\"linkedIn posts\"])}}\n\n## THe Twitter posts:\n{{ JSON.stringify($('Exract and limit X').item.json['Twitter tweets']) }}\n",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "You are a helpful Marketing assistant"
                              }
                        ]
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.5
      },
      {
            "id": "6954285f-7ea5-4e3d-8be2-03051d716d03",
            "name": "Send Cover letter and CC me",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  2080,
                  0
            ],
            "parameters": {
                  "html": "={{ $json.output.cover_letter }}",
                  "options": {},
                  "subject": "={{ $json.output.subject }}",
                  "toEmail": "={{ $('Google Sheets Trigger').item.json.email }}, {{ $('Set your company\\'s variables').item.json.your_email }}",
                  "fromEmail": "thomas@pollup.net"
            },
            "credentials": {
                  "smtp": {
                        "id": "yrsGGdbYvSB8u7sx",
                        "name": "SMTP account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "357477a8-98c3-48a5-8c88-965f90a4beb2",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  360,
                  -280
            ],
            "parameters": {
                  "color": 4,
                  "height": 480,
                  "content": "## Personalize here\n\n### Set: \n- your name\n- your company name\n- your company activity, used to find a match with your leads\n- your email, used as the sender"
            },
            "typeVersion": 1
      },
      {
            "id": "0c26383c-c8f1-44b1-995e-2c88118061bb",
            "name": "Google Sheets Trigger",
            "type": "n8n-nodes-base.googleSheetsTrigger",
            "position": [
                  -40,
                  20
            ],
            "parameters": {
                  "options": {
                        "dataLocationOnSheet": {
                              "values": {
                                    "rangeDefinition": "specifyRange"
                              }
                        }
                  },
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1IcvbbG_WScVNyutXhzqyE9NxdxNbY90Dd63R8Y1UrAw/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1IcvbbG_WScVNyutXhzqyE9NxdxNbY90Dd63R8Y1UrAw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1IcvbbG_WScVNyutXhzqyE9NxdxNbY90Dd63R8Y1UrAw/edit?usp=drivesdk",
                        "cachedResultName": "Analyze social media of a lead"
                  }
            },
            "credentials": {
                  "googleSheetsTriggerOAuth2Api": {
                        "id": "LBJHhfLqklwl9les",
                        "name": "Google Sheets Trigger account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "923cca3d-69a9-4d26-80a3-e9062d42d8a8",
            "name": "Google Sheets",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2280,
                  0
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "done": "X",
                              "linkedin_url": "={{ $('Google Sheets Trigger').item.json.linkedin_url }}"
                        },
                        "schema": [
                              {
                                    "id": "linkedin_url",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "linkedin_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "name",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "twitter_handler",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "twitter_handler",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "email",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "email",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "done",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "done",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "linkedin_url"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1IcvbbG_WScVNyutXhzqyE9NxdxNbY90Dd63R8Y1UrAw/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1IcvbbG_WScVNyutXhzqyE9NxdxNbY90Dd63R8Y1UrAw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1IcvbbG_WScVNyutXhzqyE9NxdxNbY90Dd63R8Y1UrAw/edit?usp=drivesdk",
                        "cachedResultName": "Analyze social media of a lead"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "gdLmm513ROUyH6oU",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "6df02119-09db-4d87-b435-7753693b27aa",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  180,
                  20
            ],
            "parameters": {
                  "options": {},
                  "conditions": {
                        "options": {
                              "version": 2,
                              "leftValue": "",
                              "caseSensitive": true,
                              "typeValidation": "loose"
                        },
                        "combinator": "and",
                        "conditions": [
                              {
                                    "id": "3839b337-6c33-4907-ba75-8ef04cefc14c",
                                    "operator": {
                                          "type": "string",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.done }}",
                                    "rightValue": ""
                              }
                        ]
                  },
                  "looseTypeValidation": true
            },
            "executeOnce": false,
            "typeVersion": 2.2,
            "alwaysOutputData": true
      },
      {
            "id": "2edaa85e-ef69-490c-9835-cf8779cada6d",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -120,
                  -320
            ],
            "parameters": {
                  "color": 4,
                  "width": 260,
                  "height": 500,
                  "content": "## Create a Gooogle sheet with the following columns:\n- linkedin_url\n- name\n- twitter_handler \n- email\n- done\n\nAnd put some data in it except in \"done\" that should remain empty."
            },
            "typeVersion": 1
      },
      {
            "id": "19210bba-1db1-4568-b34e-4e9de002b0eb",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1680,
                  -160
            ],
            "parameters": {
                  "color": 5,
                  "width": 340,
                  "height": 300,
                  "content": "## Here you can modify the prompt\n- make it better by adding some examples\n- Follow a known framework\netc."
            },
            "typeVersion": 1
      },
      {
            "id": "bebab4e5-35fa-49b7-bb85-a85231c44389",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  660,
                  -280
            ],
            "parameters": {
                  "color": 4,
                  "width": 340,
                  "height": 480,
                  "content": "## Call RapidAPI Twitter API Profile Data\nYou have to create an account in [RapidAPI](https://rapidapi.com/restocked-gAGxip8a_/api/twitter-api47) and subscribe to Twiiter API. With a free account you will be able to scrape 500 tweets / month.\nAfter your subscription you will have to choose as Generic Auth Type: Header Auth and then put as header name: \"x-rapidapi-key\" and the value given in the RapidAPI interface\n"
            },
            "typeVersion": 1
      },
      {
            "id": "42df4665-2d46-4020-938c-f082db6f09d0",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1220,
                  -300
            ],
            "parameters": {
                  "color": 4,
                  "width": 280,
                  "height": 480,
                  "content": "## Call RapidAPI Fresh Linkedin Profile Data\nYou have to create an account in [RapidAPI](https://rapidapi.com) and subscribe to Fresh LinkedIn Profile Data. With a free account you will be able to scrape 100 profile / month.\nAfter your subscription you will have to choose as Generic Auth Type: Header Auth and then put as header name: \"x-rapidapi-key\" and the value given in the RapidAPI interface\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4a14febd-bd82-428c-8c97-15f1ba724b02",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -840,
                  -620
            ],
            "parameters": {
                  "width": 700,
                  "height": 1180,
                  "content": "## Social Media Analysis and Automated Email Generation\n\n> by Thomas Vie [Thomas@pollup.net](mailto:thomas@pollup.net)\n\n### **Who is this for?**\nThis template is ideal for marketers, lead generation specialists, and business professionals seeking to analyze social media profiles of potential leads and automate personalized email outreach efficiently.\n\n\n### **What problem is this workflow solving?**\nManually analyzing social media profiles and crafting personalized emails can be time-consuming and prone to errors. This workflow streamlines the process by integrating social media APIs with AI to generate tailored communication, saving time and increasing outreach effectiveness.\n\n### **What this workflow does:**\n1. **Google Sheets Integration:** Start with a Google Sheet containing lead information such as LinkedIn URL, Twitter handle, name, and email.\n2. **Social Media Data Extraction:** Automatically fetch profile and activity data from Twitter and LinkedIn using RapidAPI integrations.\n3. **AI-Powered Content Generation:** Use OpenAI's Chat Model to analyze the extracted data and generate personalized email subject lines and cover letters.\n4. **Automated Email Dispatch:** Send the generated email directly to the lead, with a copy sent to yourself for tracking purposes.\n5. **Progress Tracking:** Update the Google Sheet to indicate completed actions.\n\n#### **Setup:**\n1. **Google Sheets:**\n - Create a sheet with the columns: LinkedIn URL, name, Twitter handle, email, and a \"done\" column for tracking.\n - Populate the sheet with your leads.\n\n2. **RapidAPI Accounts:**\n - Sign up for RapidAPI and subscribe to the Twitter and LinkedIn API plans.\n - Configure API authentication keys in the workflow.\n\n3. **AI Configuration:**\n - Connect OpenAI Chat Model with your API key for text generation.\n\n4. **Email Integration:**\n - Add your email credentials or service (SMTP or third-party service like Gmail) for sending automated emails.\n\n#### **How to customize this workflow to your needs:**\n- **Modify the AI Prompt:** Adapt the prompt in the AI node to better align with your tone, style, or specific messaging framework.\n- **Expand Data Fields:** Add additional data fields in Google Sheets if you require further personalization.\n- **API Limits:** Adjust API configurations to fit your usage limits or upgrade to higher tiers for increased data scraping capabilities.\n- **Personalize Email Templates:** Tweak email formats to suit different audiences or use cases.\n- **Extend Functionality:** Integrate additional social media platforms or CRM tools as needed.\n\nBy implementing this workflow, you’ll save time on repetitive tasks and create more effective lead generation strategies."
            },
            "typeVersion": 1
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Set your company's variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get tweets": {
            "main": [
                  [
                        {
                              "node": "Exract and limit X",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets": {
            "main": [
                  []
            ]
      },
      "Get twitter ID": {
            "main": [
                  [
                        {
                              "node": "Get tweets",
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
                              "node": "Generate Subject and cover letter based on match",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Exract and limit X": {
            "main": [
                  [
                        {
                              "node": "Get linkedin Posts",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get linkedin Posts": {
            "main": [
                  [
                        {
                              "node": "Extract and limit Linkedin",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets Trigger": {
            "main": [
                  [
                        {
                              "node": "If",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Structured Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Generate Subject and cover letter based on match",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract and limit Linkedin": {
            "main": [
                  [
                        {
                              "node": "Generate Subject and cover letter based on match",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Cover letter and CC me": {
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
      "Set your company's variables": {
            "main": [
                  [
                        {
                              "node": "Get twitter ID",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Subject and cover letter based on match": {
            "main": [
                  [
                        {
                              "node": "Send Cover letter and CC me",
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
    name: "Speed Up Social Media Banners With BannerBear.Com",
    nodes: [
      {
            "id": "81ea4c6a-d603-4688-8b72-d9c79faf7adf",
            "name": "n8n Form Trigger",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  1272,
                  455
            ],
            "webhookId": "d280e773-3bd8-44ce-a147-8b404251fce9",
            "parameters": {
                  "path": "d280e773-3bd8-44ce-a147-8b404251fce9",
                  "options": {},
                  "formTitle": "BannerBear Clone",
                  "formFields": {
                        "values": [
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Template",
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "n8n Meetup Template"
                                                },
                                                {
                                                      "option": "AI Meetup Template"
                                                }
                                          ]
                                    }
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Title of Event",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Location of Event",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Date of Event",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Image Prompt",
                                    "requiredField": true
                              }
                        ]
                  },
                  "formDescription": "Generate an image and apply text"
            },
            "typeVersion": 2
      },
      {
            "id": "dea26687-4060-488b-a09f-e21900fec2fc",
            "name": "Upload to Cloudinary",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1920,
                  480
            ],
            "parameters": {
                  "url": "https://api.cloudinary.com/v1_1/daglih2g8/image/upload",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendQuery": true,
                  "contentType": "multipart-form-data",
                  "authentication": "genericCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "file",
                                    "parameterType": "formBinaryData",
                                    "inputDataFieldName": "data"
                              }
                        ]
                  },
                  "genericAuthType": "httpQueryAuth",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "upload_preset",
                                    "value": "n8n-workflows-preset"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpQueryAuth": {
                        "id": "sT9jeKzZiLJ3bVPz",
                        "name": "Cloudinary API"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "4b73ba35-eac9-467b-b711-49061da30fbc",
            "name": "Send to Bannerbear Template",
            "type": "n8n-nodes-base.bannerbear",
            "position": [
                  2260,
                  440
            ],
            "parameters": {
                  "templateId": "={{ $('Set Parameters').item.json.template_id }}",
                  "modificationsUi": {
                        "modificationsValues": [
                              {
                                    "name": "placeholder_image",
                                    "text": "=",
                                    "imageUrl": "={{ $json.secure_url.replace('upload/','upload/f_auto,q_auto/') }}"
                              },
                              {
                                    "name": "placeholder_text",
                                    "text": "={{ $('Set Parameters').item.json.title }}"
                              },
                              {
                                    "name": "placeholder_location",
                                    "text": "={{ $('Set Parameters').item.json.location }}"
                              },
                              {
                                    "name": "placeholder_date",
                                    "text": "={{ $('Set Parameters').item.json.date }}"
                              }
                        ]
                  },
                  "additionalFields": {
                        "waitForImage": true,
                        "waitForImageMaxTries": 10
                  }
            },
            "credentials": {
                  "bannerbearApi": {
                        "id": "jXg71GVWN3F4PvI8",
                        "name": "Bannerbear account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d9b8f63b-ee0f-40d6-9b1a-8213c7043b3a",
            "name": "Set Parameters",
            "type": "n8n-nodes-base.set",
            "position": [
                  1452,
                  455
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "8c526649-b8a8-4b9f-a805-41de053bb642",
                                    "name": "template_id",
                                    "type": "string",
                                    "value": "={{ {\n'AI Meetup Template': 'lzw71BD6VNLgD0eYkn',\n'n8n Meetup Template': 'n1MJGd52o696D7LaPV'\n}[$json.Template] ?? '' }}"
                              },
                              {
                                    "id": "f5a3c285-719b-4a12-a669-47a63a880ac4",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $json[\"Title of Event\"] }}"
                              },
                              {
                                    "id": "6713a88e-815c-416a-b838-b07006a090a3",
                                    "name": "location",
                                    "type": "string",
                                    "value": "={{ $json[\"Location of Event\"] }}"
                              },
                              {
                                    "id": "3c331756-1f1f-4e27-b769-e3de860bfdf0",
                                    "name": "date",
                                    "type": "string",
                                    "value": "={{ $json[\"Date of Event\"] }}"
                              },
                              {
                                    "id": "b933df30-8067-4a0a-bff1-64441490478d",
                                    "name": "image_prompt",
                                    "type": "string",
                                    "value": "={{ $json[\"Image Prompt\"] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "3290571f-e858-4b73-b27d-7077d4efad15",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1220,
                  280
            ],
            "parameters": {
                  "color": 7,
                  "width": 392.4891967891814,
                  "height": 357.1079372601395,
                  "content": "## 1. Start with n8n Forms\n[Read more about using forms](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/)\n\nFor this demo, we'll use the form trigger for simple data capture but you could use webhooks for better customisation and/or integration into other workflows."
            },
            "typeVersion": 1
      },
      {
            "id": "560a6c43-07bd-4a5c-8af7-0cda78f345d4",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1640,
                  215.68990043281633
            ],
            "parameters": {
                  "color": 7,
                  "width": 456.99271465116215,
                  "height": 475.77059293291677,
                  "content": "## 2. Use AI to Generate an Image\n[Read more about using OpenAI](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai)\n\nGenerating AI images is just as easy as generating text thanks for n8n's OpenAI node. Once completed, OpenAI will return a binary image file. We'll have to store this image externally however since we can't upload it directly BannerBear. I've chosen to use Cloudinary CDN but S3 is also a good choice."
            },
            "typeVersion": 1
      },
      {
            "id": "0ffe2ada-9cb6-4d4c-9d15-df83d5a596ce",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2120,
                  168.04517481270597
            ],
            "parameters": {
                  "color": 7,
                  "width": 387.4250119152741,
                  "height": 467.21699325771294,
                  "content": "## 3. Create Social Media Banners with BannerBear.com\n[Read more about the BannerBear Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bannerbear)\n\nNow with your generated AI image and template variables, we're ready to send them to BannerBear which will use a predefined template to create our social media banner.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "e8269a57-caab-40c6-bf47-95b64eccde81",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2540,
                  299.6729638445606
            ],
            "parameters": {
                  "color": 7,
                  "width": 404.9582850950252,
                  "height": 356.8876009810222,
                  "content": "## 4. Post directly to Social Media\n[Read more about using the Discord Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.discord)\n\nWe'll share our event banner with our community in Discord. You can also choose to post this on your favourite social media channels."
            },
            "typeVersion": 1
      },
      {
            "id": "457a0744-4c08-4489-af50-5a746fa4b756",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2120,
                  40
            ],
            "parameters": {
                  "color": 5,
                  "width": 388.96199194175017,
                  "height": 122.12691731521146,
                  "content": "### 🙋‍♂️ Optimise your images!\nAI generated images can get quite large (20mb+) which may hit filesize limits for some services. I've used Cloudinary's optimise API to reduce the file size before sending to BannerBear."
            },
            "typeVersion": 1
      },
      {
            "id": "c38cc2c6-a595-48c8-a5be-668fd609c76b",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2960,
                  220
            ],
            "parameters": {
                  "color": 5,
                  "width": 391.9308945140308,
                  "height": 288.0739771936459,
                  "content": "### Result!\nHere is a screenshot of the generated banner.\n![Result](https://res.cloudinary.com/daglih2g8/image/upload/f_auto,q_auto,w_360/v1/n8n-workflows/qlzyrjjhxeh3zgerglti)"
            },
            "typeVersion": 1
      },
      {
            "id": "29ce299d-3444-4e71-b83c-edbe867e833f",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  800,
                  240
            ],
            "parameters": {
                  "width": 392.9673182916798,
                  "height": 404.96428251481916,
                  "content": "## Try It Out!\n### This workflow does the following:\n* Uses an n8n form to capture an event to be announced.\n* Form includes imagery required for the event and this is sent to OpenAI Dalle-3 service to generate.\n* Event details as well as the ai-generated image is then sent to the BannerBear.com service where a template is used.\n* The final event poster is created and posted to X (formerly Twitter)\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      },
      {
            "id": "c01d1ac0-5ebe-4ef1-bece-d6ad8bbff94e",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2200,
                  400
            ],
            "parameters": {
                  "width": 221.3032167915293,
                  "height": 368.5789698912447,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🚨**Required**\n* You'll need to create a template in BannerBear.\n* Once you have, map the template variables to fields in this node!"
            },
            "typeVersion": 1
      },
      {
            "id": "c929d9c4-1e18-4806-9fc6-fb3bf0fa75ad",
            "name": "Download Banner",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2600,
                  480
            ],
            "parameters": {
                  "url": "={{ $json.image_url_jpg }}",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "79d19004-7d82-42be-89d5-dcb3af5e3fb1",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1857.0197380966872,
                  440
            ],
            "parameters": {
                  "width": 224.2834786948422,
                  "height": 368.5789698912447,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🚨**Required**\n* You'll need to change all ids and references to your own Cloudinary instance.\n* Feel free to change this to another service!"
            },
            "typeVersion": 1
      },
      {
            "id": "18ccd15f-65b6-46eb-8235-7fe19b13649d",
            "name": "Discord",
            "type": "n8n-nodes-base.discord",
            "position": [
                  2780,
                  480
            ],
            "parameters": {
                  "files": {
                        "values": [
                              {}
                        ]
                  },
                  "content": "=📅 New Event Alert! {{ $('Set Parameters').item.json.title }} being held at {{ $('Set Parameters').item.json.location }} on the {{ $('Set Parameters').item.json.date }}! Don't miss it!",
                  "guildId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1248678443432808509",
                        "cachedResultUrl": "https://discord.com/channels/1248678443432808509",
                        "cachedResultName": "Datamoldxyz"
                  },
                  "options": {},
                  "resource": "message",
                  "channelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1248678443432808512",
                        "cachedResultUrl": "https://discord.com/channels/1248678443432808509/1248678443432808512",
                        "cachedResultName": "general"
                  }
            },
            "credentials": {
                  "discordBotApi": {
                        "id": "YUwD52E3oHsSUWdW",
                        "name": "Discord Bot account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "7122fac9-4b4d-4fcf-a188-21af025a7fa8",
            "name": "Generate AI Banner Image",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1700,
                  480
            ],
            "parameters": {
                  "prompt": "={{ $json.image_prompt }}",
                  "options": {
                        "size": "1024x1024",
                        "quality": "standard"
                  },
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "8gccIjcuf3gvaoEr",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      }
],
    connections: {
      "Set Parameters": {
            "main": [
                  [
                        {
                              "node": "Generate AI Banner Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Download Banner": {
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
      "n8n Form Trigger": {
            "main": [
                  [
                        {
                              "node": "Set Parameters",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload to Cloudinary": {
            "main": [
                  [
                        {
                              "node": "Send to Bannerbear Template",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate AI Banner Image": {
            "main": [
                  [
                        {
                              "node": "Upload to Cloudinary",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send to Bannerbear Template": {
            "main": [
                  [
                        {
                              "node": "Download Banner",
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
    name: "Twitter Virtual AI Influencer",
    nodes: [
      {
            "id": "ea9ddb4c-af49-480c-8b73-221b3741069d",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  920,
                  400
            ],
            "parameters": {
                  "width": 389,
                  "height": 265,
                  "content": "## Scheduled posting \nWrite a tweet every 6 hours and randomize the minutes that it's posted at to make it seem natural.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "9650b047-7d5e-4ed2-948c-d5be77a94b5d",
            "name": "Post tweet",
            "type": "n8n-nodes-base.twitter",
            "position": [
                  2940,
                  520
            ],
            "parameters": {
                  "text": "={{ $json.message.content.tweet }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "twitterOAuth2Api": {
                        "id": "b3qa9dBp2PxbufK3",
                        "name": "X account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "fd7fc941-37de-4f88-87c0-f62ad1ebe2d6",
            "name": "Schedule posting every 6 hours",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  1140,
                  500
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "hours",
                                    "hoursInterval": 6,
                                    "triggerAtMinute": "={{ Math.floor(Math.random() * 60) }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "107fd741-5c17-4cd6-98aa-088bf8df523d",
            "name": "Trigger posting manually",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  1140,
                  820
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "831cd431-56e5-482e-a8a5-e5c5ac078ba4",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1360,
                  400
            ],
            "parameters": {
                  "width": 389,
                  "height": 265,
                  "content": "## Configure influencer profile \nSet your target niche, writing style, and inspiration.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "791c0be9-6396-4768-ab6b-3ca7fe49fbea",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1800,
                  400
            ],
            "parameters": {
                  "width": 389,
                  "height": 265,
                  "content": "## Generate tweet\nGenerate a potentially viral tweet based on your configuration."
            },
            "typeVersion": 1
      },
      {
            "id": "3b2872cf-38f9-4cfd-befd-ad792219c313",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2240,
                  400
            ],
            "parameters": {
                  "width": 389,
                  "height": 265,
                  "content": "## Validate tweet\nIf the generated tweet does not meet length constraints, regenerate it."
            },
            "typeVersion": 1
      },
      {
            "id": "364310a1-0367-4ce2-a91b-9a9c4d9387a0",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2680,
                  400
            ],
            "parameters": {
                  "width": 389,
                  "height": 265,
                  "content": "## Post the tweet\nPost the tweet to your X account."
            },
            "typeVersion": 1
      },
      {
            "id": "c666ba9f-d28d-449b-8e20-65c0150cba5b",
            "name": "Verify tweet constraints",
            "type": "n8n-nodes-base.if",
            "position": [
                  2480,
                  500
            ],
            "parameters": {
                  "options": {},
                  "conditions": {
                        "options": {
                              "leftValue": "",
                              "caseSensitive": true,
                              "typeValidation": "strict"
                        },
                        "combinator": "and",
                        "conditions": [
                              {
                                    "id": "0a6ebbb6-4b14-4c7e-9390-215e32921663",
                                    "operator": {
                                          "type": "number",
                                          "operation": "gt"
                                    },
                                    "leftValue": "={{ $json.message.content.tweet.length }}",
                                    "rightValue": 280
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "9bf25238-98ba-4201-aecc-22be27f095c8",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  920,
                  720
            ],
            "parameters": {
                  "width": 389,
                  "height": 265,
                  "content": "## On-demand posting \nWrite a tweet on demand, when you manually run your workflow.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4b95c041-a70e-42f9-9467-26de2abe6b7a",
            "name": "Generate tweet content",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1900,
                  500
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4-turbo-preview",
                        "cachedResultName": "GPT-4-TURBO-PREVIEW"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "role": "system",
                                    "content": "=You are a successful modern Twitter influencer. Your tweets always go viral. "
                              },
                              {
                                    "role": "system",
                                    "content": "=You have a specific writing style: {{ $json.style }}"
                              },
                              {
                                    "role": "system",
                                    "content": "=You follow the principles described in your inspiration sources closely and you write your tweets based on that: {{ $json.inspiration }}"
                              },
                              {
                                    "role": "system",
                                    "content": "=You have a very specific niche: {{ $json.niche }}"
                              },
                              {
                                    "role": "system",
                                    "content": "=Answer with the viral tweet and nothing else as a response. Keep the tweet within 280 characters. Current date and time are {{DateTime.now()}}. Add hashtags and emojis where relevant."
                              },
                              {
                                    "content": "Write a tweet that is certain to go viral. Take your time in writing it. Think. Use the vast knowledge you have."
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "294",
                        "name": "Alex's OpenAI Account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "18f1af3a-58b3-4a4d-a8ad-3657da9c41ba",
            "name": "Configure your influencer profile",
            "type": "n8n-nodes-base.set",
            "position": [
                  1580,
                  500
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "45268b04-68a1-420f-9ad2-950844d16af1",
                                    "name": "niche",
                                    "type": "string",
                                    "value": "Modern Stoicism. You tweet about the greatest stoics, their ideas, their quotes, and how their wisdom applies in today's modern life. You love sharing personal stories and experiences."
                              },
                              {
                                    "id": "d95f4a1c-ab1c-4eca-8732-3d7a087f82d8",
                                    "name": "style",
                                    "type": "string",
                                    "value": "All of your tweets are very personal. "
                              },
                              {
                                    "id": "1ee088f7-7021-48c0-bcb7-d1011eb0db3d",
                                    "name": "inspiration",
                                    "type": "string",
                                    "value": "Your inspiration comes from tens of books on stoicism, psychology, and how to influence people. Books such as \"Contagious\" by Jonah Bergen, \"How To Be Internet Famous\" by Brendan Cox, \"How to Win Friends and Influence People\" by Dale Carnegie, and \"Influencers and Creators\" by Robert V Kozinets, Ulrike Gretzel, Rossella Gambetti strongly influence the way you write your tweets. "
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      }
],
    connections: {
      "Generate tweet content": {
            "main": [
                  [
                        {
                              "node": "Verify tweet constraints",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Trigger posting manually": {
            "main": [
                  [
                        {
                              "node": "Configure your influencer profile",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Verify tweet constraints": {
            "main": [
                  [
                        {
                              "node": "Configure your influencer profile",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Post tweet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Schedule posting every 6 hours": {
            "main": [
                  [
                        {
                              "node": "Configure your influencer profile",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Configure your influencer profile": {
            "main": [
                  [
                        {
                              "node": "Generate tweet content",
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
    name: "Update Twitter Banner Using HTTP Request",
    nodes: [
      {
            "name": "On clicking 'execute'",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  250,
                  300
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "name": "Start",
            "type": "n8n-nodes-base.start",
            "position": [
                  250,
                  300
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  450,
                  300
            ],
            "parameters": {
                  "url": "https://unsplash.com/photos/lUDMZUWFUXE/download?ixid=MnwxMjA3fDB8MXxhbGx8Mnx8fHx8fDJ8fDE2MzczMjY4Mjc&force=true",
                  "options": {},
                  "responseFormat": "file",
                  "headerParametersUi": {
                        "parameter": []
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "HTTP Request1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  650,
                  300
            ],
            "parameters": {
                  "url": "https://api.twitter.com/1.1/account/update_profile_banner.json",
                  "options": {},
                  "requestMethod": "POST",
                  "authentication": "oAuth1",
                  "jsonParameters": true,
                  "sendBinaryData": true,
                  "binaryPropertyName": "banner:data"
            },
            "credentials": {
                  "oAuth1Api": {
                        "id": "300",
                        "name": "Unnamed credential"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "HTTP Request": {
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
      "On clicking 'execute'": {
            "main": [
                  [
                        {
                              "node": "HTTP Request",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {},
  },
];

export function SocialCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25 border border-pink-600' : 'bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700/50 hover:bg-pink-100 dark:hover:bg-pink-500/20 hover:border-pink-300 dark:hover:border-pink-600/50 hover:shadow-md'}`}
    >
      <Share2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-500 dark:text-pink-400'}`} />
      <span className="truncate max-w-[200px]">Instagram Twitter Social Media</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {socialTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function SocialTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {socialTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-pink-300 dark:hover:border-pink-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-pink-50/50 dark:group-hover:to-pink-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-pink-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
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
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-pink-600 dark:hover:bg-pink-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
