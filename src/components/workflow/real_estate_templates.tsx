import React from 'react';
import { Play, Building } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const realEstateTemplates: IN8nTemplate[] = [
  {
    name: "Airbnb Guest Assistant",
    nodes: [
      {
            "parameters": {
                  "options": {}
            },
            "id": "5c8d2013-4bb8-476b-84a3-4b2ddea3e569",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1,
            "position": [
                  640,
                  360
            ],
            "credentials": {
                  "openAiApi": {
                        "id": "PHFKmuDYWAWJyAHe",
                        "name": "OpenAi account"
                  }
            }
      },
      {
            "parameters": {
                  "options": {}
            },
            "id": "042a2eee-5990-4018-88eb-de3b2955897d",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "typeVersion": 1,
            "position": [
                  1660,
                  360
            ],
            "credentials": {
                  "openAiApi": {
                        "id": "PHFKmuDYWAWJyAHe",
                        "name": "OpenAi account"
                  }
            }
      },
      {
            "parameters": {
                  "resource": "folder",
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
            "id": "a96ced6d-426f-48aa-b174-eb3a64332671",
            "name": "Google Drive",
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  -160,
                  780
            ],
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "vBDzrDMXMNFgtVf9",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "operation": "download",
                  "fileId": {
                        "__rl": true,
                        "value": "https://drive.google.com/file/d/1Ce2evOt4kIxYgCIIWOTKjDYw_TEwwhtq/view?usp=drive_link",
                        "mode": "url"
                  },
                  "options": {
                        "binaryPropertyName": "data",
                        "googleFileConversion": {
                              "conversion": {
                                    "docsToFormat": "text/plain"
                              }
                        }
                  }
            },
            "id": "071ab689-351e-45d7-96e0-828ac0b92f3b",
            "name": "Get File Content",
            "type": "n8n-nodes-base.googleDrive",
            "typeVersion": 3,
            "position": [
                  60,
                  780
            ],
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "vBDzrDMXMNFgtVf9",
                        "name": "Google Drive account"
                  }
            }
      },
      {
            "parameters": {
                  "options": {}
            },
            "id": "dc21a412-1967-4ad7-8484-ccf379632da8",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "typeVersion": 1,
            "position": [
                  600,
                  1000
            ]
      },
      {
            "parameters": {
                  "chunkSize": 500,
                  "chunkOverlap": 50
            },
            "id": "3e3b38e8-89a1-4292-b254-9aa347bf6c02",
            "name": "Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
            "typeVersion": 1,
            "position": [
                  600,
                  1180
            ]
      },
      {
            "parameters": {
                  "operation": "text",
                  "options": {}
            },
            "id": "24aff186-ef93-4a34-9adc-30a194a15abb",
            "name": "Extract from File",
            "type": "n8n-nodes-base.extractFromFile",
            "typeVersion": 1,
            "position": [
                  280,
                  780
            ]
      },
      {
            "parameters": {
                  "model": "text-embedding-3-small",
                  "options": {}
            },
            "id": "cb079d86-a333-4073-aede-d4cf4fcd02fb",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "typeVersion": 1,
            "position": [
                  440,
                  1000
            ],
            "credentials": {
                  "openAiApi": {
                        "id": "PHFKmuDYWAWJyAHe",
                        "name": "OpenAi account"
                  }
            }
      },
      {
            "parameters": {
                  "content": "## Tool to Add a Google Drive File to Vector DB",
                  "height": 661.3783861449286,
                  "width": 1290.2441524753906,
                  "color": 5
            },
            "id": "a759b89e-8bd7-4a95-80bd-2f77e033de13",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -340,
                  680
            ]
      },
      {
            "parameters": {
                  "content": "## RAG AI Agent with Chat Interface",
                  "height": 711.4232611135845,
                  "width": 1905.0323056629377
            },
            "id": "be50a82b-531d-4d4b-94f0-93bb6002032a",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "typeVersion": 1,
            "position": [
                  -40,
                  -40
            ]
      },
      {
            "parameters": {
                  "model": "text-embedding-3-small",
                  "options": {}
            },
            "id": "639a52f5-5ed6-4d89-8cb4-58c26be2e1e9",
            "name": "Embeddings OpenAI2",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "typeVersion": 1,
            "position": [
                  1160,
                  500
            ],
            "credentials": {
                  "openAiApi": {
                        "id": "PHFKmuDYWAWJyAHe",
                        "name": "OpenAi account"
                  }
            }
      },
      {
            "parameters": {
                  "name": "Pinecone",
                  "description": "this is the vector database that contains the property info faq and answers. use this first to look for answers."
            },
            "id": "0613d2e7-09d6-41be-8e31-87183e20a153",
            "name": "Vector Store Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "typeVersion": 1,
            "position": [
                  1340,
                  200
            ]
      },
      {
            "parameters": {
                  "pineconeIndex": {
                        "__rl": true,
                        "value": "air12",
                        "mode": "list",
                        "cachedResultName": "air12"
                  },
                  "options": {}
            },
            "id": "665c3869-9ce5-4941-a1cd-d03987821328",
            "name": "Pinecone Vector Store1",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  1300,
                  380
            ],
            "credentials": {
                  "pineconeApi": {
                        "id": "ooxyNJwHOsFoFU7W",
                        "name": "PineconeApi account"
                  }
            }
      },
      {
            "parameters": {
                  "mode": "insert",
                  "pineconeIndex": {
                        "__rl": true,
                        "value": "air12",
                        "mode": "list",
                        "cachedResultName": "air12"
                  },
                  "options": {}
            },
            "id": "63c508e7-c75d-4412-a8c5-71ae1b3ba685",
            "name": "Pinecone Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1,
            "position": [
                  540,
                  780
            ],
            "credentials": {
                  "pineconeApi": {
                        "id": "ooxyNJwHOsFoFU7W",
                        "name": "PineconeApi account"
                  }
            }
      },
      {
            "parameters": {
                  "public": true,
                  "initialMessages": "Hi there! 👋\nMy name is FiFi. How can I assist you today?",
                  "options": {}
            },
            "id": "f13700d2-ec9e-4b26-8d56-7b010f07d676",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "typeVersion": 1.1,
            "position": [
                  80,
                  300
            ],
            "webhookId": "057f6fe7-e865-42b6-9020-8cc759271eb9"
      },
      {
            "parameters": {
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "d4b513c8-c4a4-4441-ae0d-35cc29240ce0",
                                    "name": "sessionId",
                                    "value": "={{ $json.sessionId }}",
                                    "type": "string"
                              }
                        ]
                  },
                  "options": {}
            },
            "id": "5a74cb47-fbe2-4bae-843c-1b3c19142f05",
            "name": "Captures session id",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [
                  380,
                  220
            ]
      },
      {
            "parameters": {
                  "promptType": "define",
                  "text": "={{ $('When chat message received').item.json.chatInput }}",
                  "options": {
                        "systemMessage": "CURRENT_TIME: {{$json[\"timestamp\"]}}\nCURRENT_DATE: {{$json[\"formattedDate\"]}}\n\nYou are a happy and friendly AI assistant for an Airbnb property located at 3009 Grant St., Concord, CA. You are aware of the current date and time shown above.\n\nDATA SOURCES:\n1. ALWAYS check Pinecone database first for answering questions.\n2. Use SerpAPI only for location/nearby place queries\n3. NEVER reference the Zep chat memory for answers. \n\nTONE:\nMaintain a warm, friendly, and conversational tone. Use positive and encouraging language, and show empathy when users are frustrated. Keep explanations simple.\n\nTERM MATCHING:\nBefore searching the database, match these variations to the same term:\n- check in, check-in, checkin → \"check-in\"\n- check out, check-out, checkout → \"check-out\"\n- wifi, wi-fi, wi fi → \"WiFi\"\n- hot tub, hottub, hot-tub → \"hot tub\"\n- tv, t.v., television → \"TV\"\n\nSPECIAL RESPONSES:\n1. For check-in queries: ALWAYS include both time (2 pm) and access code (5555)\n2. For check-out queries: ALWAYS include both time (12 pm) and closing instructions\n3. For WiFi queries: ALWAYS include the password\n4. For amenity queries: ALWAYS include both instructions and link\n\nAMENITY LINKS:\nWhen these items are mentioned, include their link:\n- TV Remote: [Click here for TV Remote instructions](https://bit.ly/420GR7T)\n- Hot Tub: [Click here for Hot Tub instructions](https://www.youtube.com/watch?v=vzcO-MvpPks)\n- Ceiling Fan: [Click here for Ceiling Fan instructions](https://drive.google.com/file/d/1rCvGnm7wJT1dCd60RlEnW6DhcwvWVpOu/view?usp=sharing)\n- Thermostat: [Click here for Thermostat instructions](https://www.youtube.com/watch?v=cD4ZVG3C7As)\n- Oven: [Click here for Oven instructions](https://drive.google.com/file/d/1bgUF8Dffo5_E7hv_MFl1TQ1q84fpMJz8/view?usp=drive_link)\n\nRESPONSE FORMAT:\n\n1. Provide the information from Pinecone's details field\n2. If it's an amenity with a link, add:\n   \"For more information: [LINK]\"\n3. For lists (like games), show each item on a new line with bullet points\n\nIF NO INFORMATION FOUND:\n\"I don't have that information in our property database. Please contact the host, Gustavo Uribe, at 925-555-1234 for assistance.\"\n\nEXAMPLE RESPONSES:\n\nCheck-out query:\n\"Based on our property database: Check-out time is 12 pm (noon). Please close all doors and windows, turn off the hot tub, and don't forget your chargers!\"\n\nHot tub query:\n\"Based on our property database: To turn the hot tub on or off, lift the lever in the grey metal box next to the door. Adjust the jets and water temperature using the panel controls.\n\nFor more information: [Click here for Hot Tub instructions](https://www.youtube.com/watch?v=VJVpf6B8l84)\"\n\nBoard games query:\n\"Based on our property database: A variety of board games and playing cards are located in the main living room closet. The available games are:\n- Sorry\n- Codenames\n- Monopoly\n- Scrabble\"\n\nSAFETY GUARDRAILS:\n\nAPPROPRIATE TOPICS:\n\n\nOnly provide information directly related to the property, local attractions, and guest services\nDefer personal or private questions about the host or other guests to the host contact number\nDo not provide personal information about the host beyond the provided contact details\nDo not provide information about security systems, cameras, or property vulnerabilities\n\n\nLOCAL RECOMMENDATIONS:\n\n\nOnly use SerpAPI to provide factual information about:\n\nRestaurants and dining\nTourist attractions\nShopping areas\nParks and recreation\nPublic transportation\nEmergency services\n\n\nDo not provide recommendations for:\n\nAdult entertainment\nIllegal activities or substances\nPrivate residences\nNon-public locations\n\nEMERGENCY SITUATIONS:\n\n\nFor medical emergencies: Direct guests to call 911\nFor non-emergency maintenance issues: Provide host contact information\nFor safety concerns: Direct to appropriate emergency services\nNever attempt to provide medical, legal, or safety advice\n\n\nINAPPROPRIATE REQUESTS:\n\nDecline requests for:\n\nAdditional guests beyond capacity\nLate check-out without host approval\nAccess to restricted areas\nProperty modifications\nHost's personal information\nOther guests' information\nSecurity system information\n\n\nResponse for inappropriate requests:\n\"I apologize, but I cannot assist with that request. Please contact the host, Gustavo Uribe, at 925-555-1234 for any special arrangements or concerns.\"\n\n\nDISPUTE HANDLING:\n\nDo not engage in:\n\nPayment disputes\nDamage claims\nReservation modifications\nGuest conflicts\n\n\nDirect all such matters to the host or Airbnb support"
                  }
            },
            "id": "ff860b0a-6d87-4f51-9352-a51853bd9599",
            "name": "RAG AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 1.6,
            "position": [
                  900,
                  80
            ]
      },
      {
            "parameters": {
                  "options": {}
            },
            "type": "@n8n/n8n-nodes-langchain.toolSerpApi",
            "typeVersion": 1,
            "position": [
                  1060,
                  300
            ],
            "id": "df63946f-426f-4484-aa4e-b4dae4ff6a26",
            "name": "SerpAPI",
            "credentials": {
                  "serpApi": {
                        "id": "lsbBUPJ5EVjCl45d",
                        "name": "SerpAPI account"
                  }
            }
      },
      {
            "parameters": {
                  "sessionIdType": "customKey",
                  "sessionKey": "{{ $json.session_id || Math.random().toString(36).substring(2, 10) }}"
            },
            "type": "@n8n/n8n-nodes-langchain.memoryZep",
            "typeVersion": 1.3,
            "position": [
                  840,
                  520
            ],
            "id": "6fbfe3c1-bea5-459f-b2b6-586a59cae105",
            "name": "Zep",
            "credentials": {
                  "zepApi": {
                        "id": "TRvT6eCcKfl5vpOz",
                        "name": "Zep Api account"
                  }
            }
      },
      {
            "parameters": {
                  "url": "https://api.getzep.com/api/v2/sessions-ordered",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "zepApi",
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "=Authorization",
                                    "value": "API-Key z_1dWlkIjoiZmRmMzI0ZDMtMWUyNy00OTI0LTgzZDQtYTQ4Yzc5MWVjYjc4In0.WSX3jgySGOVMlDdWa8P7dcqQ0t1nP3Pw-HIWY0rY7Z3k98hTotTitSDg2oV3-bbv1HSSDXKT5gj-HOcWyfuR8g"
                              }
                        ]
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  2160,
                  880
            ],
            "id": "c7953720-fd35-4b52-8a51-fdb5ec88ef20",
            "name": "HTTP Request",
            "credentials": {
                  "zepApi": {
                        "id": "TRvT6eCcKfl5vpOz",
                        "name": "Zep Api account"
                  }
            }
      },
      {
            "parameters": {
                  "jsCode": "// Parse the input data\nconst data = JSON.parse($json.data);\n\n// Extract the sessions array\nconst sessions = data.sessions || [];\n\n// Map the sessions array to extract only session_id\nreturn sessions.map(session => {\n  return {\n    json: {\n      session_id: session.session_id\n    }\n  };\n});"
            },
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [
                  2380,
                  880
            ],
            "id": "dce5991a-f972-4f85-aa38-a350a651efb6",
            "name": "Code"
      },
      {
            "parameters": {
                  "url": "={{$json[\"url\"]}}",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "zepApi",
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "=Authorization",
                                    "value": "API-Key z_1dWlkIjoiZmRmMzI0ZDMtMWUyNy00OTI0LTgzZDQtYTQ4Yzc5MWVjYjc4In0.WSX3jgySGOVMlDdWa8P7dcqQ0t1nP3Pw-HIWY0rY7Z3k98hTotTitSDg2oV3-bbv1HSSDXKT5gj-HOcWyfuR8g"
                              }
                        ]
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [
                  2920,
                  880
            ],
            "id": "ae84b765-9967-4ea1-922f-6866d0b3a1f9",
            "name": "HTTP Request1",
            "credentials": {
                  "zepApi": {
                        "id": "TRvT6eCcKfl5vpOz",
                        "name": "Zep Api account"
                  }
            }
      },
      {
            "parameters": {
                  "jsCode": "// Create dynamic URLs for each session ID\nreturn items.map(item => {\n  return {\n    json: {\n      session_id: item.json.session_id,\n      url: `https://api.getzep.com/api/v2/sessions/${item.json.session_id}/memory`\n    }\n  };\n});"
            },
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [
                  2640,
                  880
            ],
            "id": "74f4922f-72a6-4dac-823a-9d2105b37186",
            "name": "Code1"
      },
      {
            "parameters": {
                  "jsCode": "// Input is expected to contain multiple sessions, each with \"messages\" and \"facts\"\n// Split sessions and structure the output\n\n// Simulate two sessions based on input data\nconst sessions = [\n    {\n        session_id: \"Session 1\",\n        messages: [\n            {\n                uuid: \"937b7674-231a-4c4e-baa1-44dcf4727201\",\n                created_at: \"2024-12-18T22:52:30.849671Z\",\n                updated_at: \"0001-01-01T00:00:00Z\",\n                role: \"Human\",\n                role_type: \"user\",\n                content: \"where can i park?\",\n                token_count: 0\n            },\n            {\n                uuid: \"cf67088c-925b-4fe8-a52c-d3b0a7782db0\",\n                created_at: \"2024-12-18T22:52:30.849671Z\",\n                updated_at: \"0001-01-01T00:00:00Z\",\n                role: \"AI\",\n                role_type: \"assistant\",\n                content: \"You’ve got parking options! 🚗 You can park in the driveway or find a spot on the street. Just remember, no parallel parking in your dreams! Happy parking!\",\n                token_count: 0\n            },\n            {\n                uuid: \"718f25e3-0d0a-4c05-bc41-f4ea30780d77\",\n                created_at: \"2024-12-19T00:42:53.057886Z\",\n                updated_at: \"0001-01-01T00:00:00Z\",\n                role: \"Human\",\n                role_type: \"user\",\n                content: \"what are some good italian restaurants nearby\",\n                token_count: 0\n            },\n            {\n                uuid: \"5e98aed7-d11a-47ff-ad7b-609fb26c0916\",\n                created_at: \"2024-12-19T00:42:53.057886Z\",\n                updated_at: \"0001-01-01T00:00:00Z\",\n                role: \"AI\",\n                role_type: \"assistant\",\n                content: \"Here are some delicious Italian restaurants nearby...\",\n                token_count: 0\n            }\n        ],\n        facts: [\n            \"The closet contains a variety of board games.\",\n            \"Board games are located in the closet.\",\n            \"Board games are perfect for a fun game night.\"\n        ]\n    },\n    {\n        session_id: \"Session 2\",\n        messages: [\n            {\n                uuid: \"8984547c-bc9d-4d75-81e7-bc6008a9e59b\",\n                created_at: \"2024-12-18T20:09:12.296453Z\",\n                updated_at: \"0001-01-01T00:00:00Z\",\n                role: \"Human\",\n                role_type: \"user\",\n                content: \"what pre-rolls do you have?\",\n                token_count: 0\n            },\n            {\n                uuid: \"5c3a19bb-b944-4156-a50b-827e97e93c14\",\n                created_at: \"2024-12-18T20:09:12.296453Z\",\n                updated_at: \"0001-01-01T00:00:00Z\",\n                role: \"AI\",\n                role_type: \"assistant\",\n                content: \"I'm sorry, but it seems I don't have the current information on available pre-rolls at the moment...\",\n                token_count: 0\n            }\n        ],\n        facts: [\n            \"AI suggests exploring other product types.\",\n            \"AI (assistant) currently has 'Edible - Cookies' available.\"\n        ]\n    }\n];\n\n// Transform each session into an output item\nreturn sessions.map(session => {\n    return {\n        json: {\n            session_id: session.session_id,\n            messages: session.messages, // Include all messages for the session\n            facts: session.facts // Include all associated facts\n        }\n    };\n});"
            },
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [
                  3140,
                  880
            ],
            "id": "61bea00e-9296-40a4-a03b-3625017fe27e",
            "name": "Code2"
      },
      {
            "parameters": {
                  "operation": "append",
                  "documentId": {
                        "__rl": true,
                        "value": "1cGQydmnStiSgDVFWfzh3Z38lNt67Eurn7J-kIjUBuFU",
                        "mode": "list",
                        "cachedResultName": "Zepmemory",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1cGQydmnStiSgDVFWfzh3Z38lNt67Eurn7J-kIjUBuFU/edit?usp=drivesdk"
                  },
                  "sheetName": {
                        "__rl": true,
                        "value": "gid=0",
                        "mode": "list",
                        "cachedResultName": "Sheet1",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1cGQydmnStiSgDVFWfzh3Z38lNt67Eurn7J-kIjUBuFU/edit#gid=0"
                  },
                  "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                              "session_id": "={{ $json.session_id }}",
                              "created_at": "={{ $json.messages[0].created_at }}",
                              "updated_at": "={{ $json.messages[0].updated_at }}",
                              "role": "={{ $json.messages[0].role }}",
                              "content": "={{ $json.messages[0].content }}",
                              "token_count": "={{ $json.messages[0].token_count }}",
                              "user_id": "={{ $json.messages[0].uuid }}"
                        },
                        "matchingColumns": [],
                        "schema": [
                              {
                                    "id": "session_id",
                                    "displayName": "session_id",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "created_at",
                                    "displayName": "created_at",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "updated_at",
                                    "displayName": "updated_at",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "user_id",
                                    "displayName": "user_id",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": false
                              },
                              {
                                    "id": "role",
                                    "displayName": "role",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "content",
                                    "displayName": "content",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "facts",
                                    "displayName": "facts",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": true
                              },
                              {
                                    "id": "entity_name",
                                    "displayName": "entity_name",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": true
                              },
                              {
                                    "id": "entity_summary",
                                    "displayName": "entity_summary",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": true
                              },
                              {
                                    "id": "context",
                                    "displayName": "context",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": true
                              },
                              {
                                    "id": "token_count",
                                    "displayName": "token_count",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "messages",
                                    "displayName": "messages",
                                    "required": false,
                                    "defaultMatch": false,
                                    "display": true,
                                    "type": "string",
                                    "canBeUsedToMatch": true,
                                    "removed": true
                              }
                        ]
                  },
                  "options": {}
            },
            "type": "n8n-nodes-base.googleSheets",
            "typeVersion": 4.5,
            "position": [
                  3360,
                  880
            ],
            "id": "c39e31ac-3381-4642-a2b4-98000ce8f5bf",
            "name": "Google Sheets",
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "IKl9sX1aVQI8pvAf",
                        "name": "Google Sheets account"
                  }
            }
      },
      {
            "parameters": {},
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [
                  900,
                  320
            ],
            "id": "ba75fef4-c65d-42e4-948c-d53104d34bb6",
            "name": "Window Buffer Memory"
      }
],
    connections: {
      "OpenAI Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "RAG AI Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Vector Store Tool",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get File Content": {
            "main": [
                  [
                        {
                              "node": "Extract from File",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Character Text Splitter": {
            "ai_textSplitter": [
                  [
                        {
                              "node": "Default Data Loader",
                              "type": "ai_textSplitter",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract from File": {
            "main": [
                  [
                        {
                              "node": "Pinecone Vector Store",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI1": {
            "ai_embedding": [
                  [
                        {
                              "node": "Pinecone Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Default Data Loader": {
            "ai_document": [
                  [
                        {
                              "node": "Pinecone Vector Store",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI2": {
            "ai_embedding": [
                  [
                        {
                              "node": "Pinecone Vector Store1",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Vector Store Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "RAG AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pinecone Vector Store1": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Vector Store Tool",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "When chat message received": {
            "main": [
                  [
                        {
                              "node": "Captures session id",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Captures session id": {
            "main": [
                  [
                        {
                              "node": "RAG AI Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "SerpAPI": {
            "ai_tool": [
                  [
                        {
                              "node": "RAG AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Zep": {
            "ai_memory": [
                  []
            ]
      },
      "HTTP Request": {
            "main": [
                  [
                        {
                              "node": "Code",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Code": {
            "main": [
                  [
                        {
                              "node": "Code1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Code1": {
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
                              "node": "Code2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Code2": {
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
      "Window Buffer Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "RAG AI Agent",
                              "type": "ai_memory",
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
    name: "HOA Fee Analyzer",
    nodes: [
      {
            "parameters": {
                  "content": "## HOA Fee Analyzer",
                  "height": 520,
                  "width": 1100
            },
            "id": "4afac323-5876-45a8-bccd-7dcbeb0d05ae",
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
                  "path": "hoa_fee_analyzer"
            },
            "id": "170dc7af-c8e4-4420-9a4e-80c0a62ff3df",
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
            "id": "bbf26500-857a-47ce-9dab-5a1bbc3a0029",
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
            "id": "dc4d3b33-40b8-4414-81e6-ca74e48ad493",
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
                  "indexName": "hoa_fee_analyzer"
            },
            "id": "e96269e1-5bf2-4422-afc4-b33472a46cf2",
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
                  "indexName": "hoa_fee_analyzer"
            },
            "id": "02a2e7c7-2457-467f-adec-04c8b3f7da82",
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
            "id": "0de505bb-2592-406d-92dc-f56bc9bb6f3f",
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
            "id": "132e0e2b-e8e4-43c8-841e-d89830fa7a7f",
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
            "id": "a5bd7242-10d9-4386-8d3d-dfa03c4e369a",
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
            "id": "d991fa78-4870-4dc8-ae72-c1f25a91a61e",
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
            "id": "f898e01a-ebd6-40aa-b6c3-1c513f398ef8",
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
    name: "Lead Scoring with MLS Data",
    nodes: [
      {
            "parameters": {
                  "content": "## Lead Scoring with MLS Data",
                  "height": 520,
                  "width": 1100
            },
            "id": "b3e798e0-f54d-43bf-9115-803ed5440da0",
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
                  "path": "lead_scoring_with_mls_data"
            },
            "id": "91731293-a22d-4e7f-a326-e4370193b2ec",
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
            "id": "c66ae7bb-3ce4-49f9-aa05-74097ff017d1",
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
            "id": "dd94a3be-6fef-4337-a815-2ea920012b1e",
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
                  "indexName": "lead_scoring_with_mls_data"
            },
            "id": "11d992bd-c645-440a-b946-c8603d2e52a5",
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
                  "indexName": "lead_scoring_with_mls_data"
            },
            "id": "d6d1a18d-3612-438e-8509-1dd7c6e2f6a4",
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
            "id": "6d3594e7-3e47-41cd-810e-4d415bea9e31",
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
            "id": "7ad970e6-4176-4eac-b242-904e6cd0011b",
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
            "id": "d6c9338c-bc66-4036-9a16-ca9e9e302e90",
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
            "id": "8ee19830-3676-4825-bad4-e7768bd6be95",
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
            "id": "a6a6cccb-aa45-42da-bbf1-198fba885857",
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
    name: "Mortgage Rate Alert",
    nodes: [
      {
            "parameters": {
                  "content": "## Mortgage Rate Alert",
                  "height": 520,
                  "width": 1100
            },
            "id": "e7f69fa7-a800-43bc-b113-061d37523f4d",
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
                  "path": "mortgage_rate_alert"
            },
            "id": "3b8e8fe5-3986-44f2-9306-790e2ae3119f",
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
            "id": "dc561d99-0499-4c81-a7e5-e59ced66a2d5",
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
            "id": "e867ce4b-bebb-484e-a69c-4e287cc7c6bd",
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
                  "indexName": "mortgage_rate_alert"
            },
            "id": "2e5ebbc6-b41e-403b-a20f-32335c185615",
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
                  "indexName": "mortgage_rate_alert"
            },
            "id": "1bba824c-3bf0-478e-9a44-80dcf4354cec",
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
            "id": "94bd1fe4-881f-4ce5-8bed-5d3af96b97a2",
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
            "id": "b637c592-cb50-44c1-adb9-011e8777c26d",
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
            "id": "39f9a420-6a85-4abe-abb4-b467878e582f",
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
            "id": "6a52cdd2-c9b3-450f-8131-0f1acaa404ce",
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
            "id": "b7bb9fa0-cdd0-4ea7-b2ee-b0279939be98",
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
    name: "Neighborhood Safety Insights",
    nodes: [
      {
            "parameters": {
                  "content": "## Neighborhood Safety Insights",
                  "height": 520,
                  "width": 1100
            },
            "id": "6d429e9f-4cf4-413c-992a-934cb55c8e16",
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
                  "path": "neighborhood_safety_insights"
            },
            "id": "8ef7fb3d-575d-4892-8afc-54c302c80b3d",
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
            "id": "5b0b3f59-3490-48b0-bfe2-8327f49e9916",
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
            "id": "bc814284-3660-429f-afc4-32ce5c43cb7d",
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
                  "indexName": "neighborhood_safety_insights"
            },
            "id": "fa876356-58fc-4c4d-9eaf-d375d986a76d",
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
                  "indexName": "neighborhood_safety_insights"
            },
            "id": "1fe7c854-514d-4365-9f40-5d5e443a9fec",
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
            "id": "2a2a28cf-9d1b-40b6-ab5f-24a1ff1b27b6",
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
            "id": "0c114c70-0c3d-4f76-b177-948a72857f4a",
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
            "id": "2ed19d0b-5981-4187-ae4a-db60bba6b82a",
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
            "id": "fd4845a4-e13e-4ca4-af76-ec8b63b63502",
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
            "id": "9dbfe97d-d0d7-4bb0-a9bc-8cc20d6becb2",
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
    name: "Open House Reminder",
    nodes: [
      {
            "parameters": {
                  "content": "## Open House Reminder",
                  "height": 520,
                  "width": 1100
            },
            "id": "f924cb54-ba11-4cb7-8f29-71b0baca8062",
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
                  "path": "open_house_reminder"
            },
            "id": "4f2c3ae0-9c02-4921-9127-b8be22f97c79",
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
            "id": "f8085896-3869-4b45-81a1-fb35887c6582",
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
            "id": "c3060c67-0183-4888-bb93-afdc90167a4b",
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
                  "indexName": "open_house_reminder"
            },
            "id": "33aa151a-e859-41bb-beaf-9ba3d6b372f7",
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
                  "indexName": "open_house_reminder"
            },
            "id": "4831a728-1c61-4914-95ea-3d50700018e2",
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
            "id": "df6c51f6-7b94-444a-9501-32086e7e463c",
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
            "id": "392846c4-b5f2-42f8-96f7-9db4226f700e",
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
            "id": "fcd7abdb-6cb0-4ea6-a9ff-26ad5460c10f",
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
            "id": "6b05f764-5f33-462f-be12-e3d119822653",
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
            "id": "b87baeaf-550a-4ae0-88ae-4ac16afb6ba1",
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
    name: "Property Description Generator",
    nodes: [
      {
            "parameters": {
                  "content": "## Property Description Generator",
                  "height": 520,
                  "width": 1100
            },
            "id": "de9e99d7-55a7-4ab5-be65-a76562417c9e",
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
                  "path": "property_description_generator"
            },
            "id": "95eaae13-d097-4ee7-850c-dde459bb204a",
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
            "id": "7fc75187-cc83-48d5-a7e9-dae38978b806",
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
            "id": "9290b626-0263-42be-b96f-5a577b128620",
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
                  "indexName": "property_description_generator"
            },
            "id": "1e94decf-e2a7-4e6f-b319-6ff1a44eef83",
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
                  "indexName": "property_description_generator"
            },
            "id": "312a60d1-dcba-4181-b287-a5ecb3469e2e",
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
            "id": "8ab3c450-26e0-4b87-a68e-663ab7cfad16",
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
            "id": "c87803e6-a97d-4ef9-8c10-e5758445cbc7",
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
            "id": "31cfc461-50a1-422a-9ef3-6cdfa690b52b",
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
            "id": "beb92ab9-ec72-4327-9b30-fdddfd9216e7",
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
            "id": "cee3fcdc-0dc6-4dee-9863-767b4fd805a6",
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
    name: "Real Estate Market Trend Report",
    nodes: [
      {
            "parameters": {
                  "content": "## Real Estate Market Trend Report",
                  "height": 520,
                  "width": 1100
            },
            "id": "e5cd3533-af52-45ca-8e52-6086b7d244ea",
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
                  "path": "real_estate_market_trend_report"
            },
            "id": "0501dc92-8312-4244-a68e-0d6c798f9278",
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
            "id": "1570ba94-787d-4f3b-b5b5-e614db90bc8d",
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
            "id": "f4bd6310-ca6e-46c6-bc83-7e15c0588619",
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
                  "indexName": "real_estate_market_trend_report"
            },
            "id": "d69bb710-b962-4b60-98cf-efefae8ed524",
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
                  "indexName": "real_estate_market_trend_report"
            },
            "id": "5aed1ad1-1c3d-4f04-bf89-a3aa11cf4557",
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
            "id": "10f720a6-db13-4540-a66c-e62e9d8c9aaf",
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
            "id": "9d5f774a-3ac5-4bef-9e43-7184c59b3f7f",
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
            "id": "4b64717e-3152-429e-822a-8714766070e3",
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
            "id": "a381694b-832c-4be6-b93a-e3077a8a8efe",
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
            "id": "cc085301-7d71-4b78-a0f2-6b35f03cfe00",
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
    name: "Rental Price Estimator",
    nodes: [
      {
            "parameters": {
                  "content": "## Rental Price Estimator",
                  "height": 520,
                  "width": 1100
            },
            "id": "522a1c32-482c-4ac3-83bf-a8ae38f035e9",
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
                  "path": "rental_price_estimator"
            },
            "id": "8b1409f9-abae-4c17-8049-ef854d2875b4",
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
            "id": "75e1adde-fad5-43b1-aff6-61a6f37dd10c",
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
            "id": "cfaa3081-4cb7-412b-83c0-8dcc28a25224",
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
                  "indexName": "rental_price_estimator"
            },
            "id": "50813f68-ed6d-46b4-81bd-c44b22b4b378",
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
                  "indexName": "rental_price_estimator"
            },
            "id": "654d535f-97a6-42b2-8f62-fc5ee805807e",
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
            "id": "dfeb7f91-ab52-42b5-b776-1fd67d9fbd79",
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
            "id": "3614aecd-22e9-449b-8368-8e238c50faa9",
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
            "id": "bc73d731-23d4-4294-ad6c-c8a6efe5e7e4",
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
            "id": "18a6cf50-4848-4e94-bf5a-c7638f772ab7",
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
            "id": "3ba0b33e-9b94-4e0f-82a1-a51408b9ad0d",
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
    name: "Tenant Screening Summary",
    nodes: [
      {
            "parameters": {
                  "content": "## Tenant Screening Summary",
                  "height": 520,
                  "width": 1100
            },
            "id": "3b33eebf-9222-4bd3-b76f-184d65d84dab",
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
                  "path": "tenant_screening_summary"
            },
            "id": "18fe7bca-e67c-47c4-b3ff-1026e4ea6dd2",
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
            "id": "49839ad9-502f-469b-a079-ef2ca8f2f0dd",
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
            "id": "647d7561-8466-4208-8895-e9fcb704ac2a",
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
                  "indexName": "tenant_screening_summary"
            },
            "id": "e490ed00-02f9-425c-b529-3b5a3083255e",
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
                  "indexName": "tenant_screening_summary"
            },
            "id": "18a368e6-b6ba-459d-96ea-0155c46b2685",
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
            "id": "a83bba45-b696-4930-a9a0-926690456afa",
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
            "id": "ee95789c-9e70-4905-883d-7cc66e61490b",
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
            "id": "e6431ed2-a268-483d-b15c-a3ab0a795fd1",
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
            "id": "8c55a527-e45c-4813-997b-ec051d3b9529",
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
            "id": "51d31d49-cc35-42ed-b760-e79e47b451e7",
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
    name: "Zoning Regulation Checker",
    nodes: [
      {
            "parameters": {
                  "content": "## Zoning Regulation Checker",
                  "height": 520,
                  "width": 1100
            },
            "id": "07d635fb-5ea6-40db-8eb3-477a78c63232",
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
                  "path": "zoning_regulation_checker"
            },
            "id": "3f13da25-c4d9-47c5-b521-2c2e25635ec3",
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
            "id": "e4a8e3ef-15b9-4e2a-876b-1d29f56cd0fa",
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
            "id": "b40a547d-4b1c-43b3-9820-732c263ce7fd",
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
                  "indexName": "zoning_regulation_checker"
            },
            "id": "d29b865b-9909-4fc4-8785-9a04eb7eee35",
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
                  "indexName": "zoning_regulation_checker"
            },
            "id": "5ffa1b33-c404-4135-b7fc-097a7af026ed",
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
            "id": "b2752bb3-20d7-43dd-83b5-3a9103d7cd46",
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
            "id": "c6319312-5f09-4f7e-8590-0f2c17a5b88c",
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
            "id": "6da6b757-2fdf-4f85-8e2a-a1d4e15ec9fc",
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
            "id": "b5fda3af-1de8-41ba-a7f1-3f0ac4625110",
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
            "id": "a01be5c7-9426-4835-b2b9-3d03d1b6622b",
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

export function RealEstateCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/25 border border-sky-600' : 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50 hover:bg-sky-100 dark:hover:bg-sky-500/20 hover:border-sky-300 dark:hover:border-sky-600/50 hover:shadow-md'}`}
    >
      <Building className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-500 dark:text-sky-400'}`} />
      Real Estate
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {realEstateTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function RealEstateTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {realEstateTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-sky-50/50 dark:group-hover:to-sky-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-sky-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-sky-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Building className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-sky-600 dark:hover:bg-sky-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
