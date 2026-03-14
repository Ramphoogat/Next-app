import React from 'react';
import { Play, Database } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const airtableTemplates: IN8nTemplate[] = [
  {
    name: "AI Agent For Project Management And Meetings With Airtable And Fireflies",
    nodes: [
      {
            "id": "38972c5c-09f4-4120-a468-731e720914e1",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  900,
                  -240
            ],
            "parameters": {
                  "text": "=Title: {{ $json.data.transcript.title }}\n\nParticipants: {{ $json.data.transcript.participants }}\n\nTranscript: {{ JSON.stringify($json.data.transcript.sentences) }}\n\nBullet gist:{{ $json.data.transcript.summary.bullet_gist }}",
                  "agent": "openAiFunctionsAgent",
                  "options": {
                        "systemMessage": "=You get my calls' transcripts from Firefiles.\nThere can be meetings about projects. You can understand if it's about a project if meeting's title contains \"project\". If so - you need to:\n1. Analyze transcript, use tool \"Create Tasks\" to create tasks for me in my AirTable base.\n2. You need to use tool \"Notify Client About Tasks\" to nofity client about his tasks.\n3. If transcript contains info there's a call needed - you'll use \"Create Event\" tool to create call on Google Meet\nCurrent date: {{ $now }}"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "db5c1bfa-b979-4749-84c8-8cd7d777748c",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  880,
                  40
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "9RivS2BmSh1DDBFm",
                        "name": "OpenAi account 3"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "334873ba-ec5c-42b3-b8d0-def79d07c0aa",
            "name": "Create Tasks",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1040,
                  40
            ],
            "parameters": {
                  "name": "create_task",
                  "schemaType": "manual",
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "Jo0BiizccacaChkH",
                        "cachedResultName": "Firefiles AI Agent"
                  },
                  "description": "=Use this tool to create a task. \nFor task creation use only action items for me [YOUR NAME HERE], don't use action items for other participants.",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"items\": {\n \"type\": \"array\",\n \"description\": \"An array of tasks\",\n \"items\": {\n \"type\": \"object\",\n \"properties\": {\n \"name\": {\n \"type\": \"string\",\n \"description\": \"The name of the task\"\n },\n \"description\": {\n \"type\": \"string\",\n \"description\": \"A detailed description of the task\"\n },\n \"due_date\": {\n \"type\": \"string\",\n \"description\": \"Due Date\"\n },\n \"priority\": {\n \"type\": \"string\",\n \"description\": \"Priority. . Please capitalize first letter\"\n },\n \"project_name\": {\n \"type\": \"string\",\n \"description\": \"Name of the project. Word 'Project' shouldn't be included\"\n }\n },\n \"required\": [\n \"name\",\n \"description\",\n \"due_date\",\n \"priority\"\n ],\n \"additionalProperties\": false\n }\n }\n },\n \"required\": [\n \"items\"\n ],\n \"additionalProperties\": false\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.3
      },
      {
            "id": "7fd03a80-71e9-4c47-9870-7a3ad4916149",
            "name": "Notify Client About Tasks",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  1180,
                  40
            ],
            "webhookId": "519d9406-10ef-4ae1-a747-d278002cac9e",
            "parameters": {
                  "sendTo": "={{ $fromAI(\"participant_email\",\"participant email \",\"string\") }}",
                  "message": "=Summary:\n{{ $json.data.transcript.summary.bullet_gist }}\n\nAction Items:\n{{ $fromAI(\"participant_action_items\",\"participant action items \",\"string\") }}",
                  "options": {
                        "appendAttribution": false
                  },
                  "subject": "Meeting Summary",
                  "emailType": "text",
                  "descriptionType": "manual",
                  "toolDescription": "=Use the tool to notify a participant of the meeting with meeting summary and his tasks.\nIMPORTANT: \n1. Please notify participants except for me. My email: [YOUR EMAIL HERE]\n2. When working with tasks - please send only the participant's tasks."
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "LhdnHxP8WcSDEHw3",
                        "name": "Gmail account 3"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "094a0e52-a4fa-4078-9b96-80568acb9c51",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  460,
                  420
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "e59e5a29-4509-45cc-9130-181ea432553c",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  680,
                  420
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "query.items"
            },
            "typeVersion": 1
      },
      {
            "id": "dc664650-f74e-4574-95a0-dd4a9bf181a1",
            "name": "Create Task",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  900,
                  420
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appndgSF4faN4jPXi",
                        "cachedResultUrl": "https://airtable.com/appndgSF4faN4jPXi",
                        "cachedResultName": "Philipp's Base"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblaCSndQsSF3gq7Z",
                        "cachedResultUrl": "https://airtable.com/appndgSF4faN4jPXi/tblaCSndQsSF3gq7Z",
                        "cachedResultName": "Tasks"
                  },
                  "columns": {
                        "value": {
                              "Name": "={{ $json.name }}",
                              "Project": "={{ [$json.project_name] }}",
                              "Due Date": "={{ $json.due_date }}",
                              "Priority": "={{ $json.priority }}",
                              "Description": "={{ $json.description }}"
                        },
                        "schema": [
                              {
                                    "id": "Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Description",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Description",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Priority",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "Low",
                                                "value": "Low"
                                          },
                                          {
                                                "name": "Medium",
                                                "value": "Medium"
                                          },
                                          {
                                                "name": "Urgent",
                                                "value": "Urgent"
                                          },
                                          {
                                                "name": "low",
                                                "value": "low"
                                          },
                                          {
                                                "name": "medium",
                                                "value": "medium"
                                          },
                                          {
                                                "name": "urgent",
                                                "value": "urgent"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Priority",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Due Date",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Due Date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Project",
                                    "type": "array",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Project",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {
                        "typecast": true
                  },
                  "operation": "create"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "XT7hvl1w201jtBhx",
                        "name": "Philipp Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "6d6f9094-b0b3-495e-ade8-d80c03e727b0",
            "name": "Create Event",
            "type": "n8n-nodes-base.googleCalendarTool",
            "position": [
                  1340,
                  40
            ],
            "parameters": {
                  "end": "={{ $fromAI(\"end_date_time\",\"Date and time of meeting end\",\"string\") }}",
                  "start": "={{ $fromAI(\"start_date_time\",\"Date and time of meeting start\",\"string\") }}",
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "philipp@lowcoding.dev",
                        "cachedResultName": "philipp@lowcoding.dev"
                  },
                  "descriptionType": "manual",
                  "toolDescription": "=Use tool to create Google Calendar Event. Use this tool only when transcript contains information that call should be scheduled.",
                  "additionalFields": {
                        "summary": "={{ $fromAI(\"meeting_name\",\"Meeting name\",\"string\") }}",
                        "attendees": [
                              "={{ $fromAI(\"email\",\"client email\",\"string\") }}"
                        ],
                        "conferenceDataUi": {
                              "conferenceDataValues": {
                                    "conferenceSolution": "hangoutsMeet"
                              }
                        }
                  }
            },
            "credentials": {
                  "googleCalendarOAuth2Api": {
                        "id": "E5Ufn31vrZLKzh4n",
                        "name": "Google Calendar account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "2406fc01-fd28-403c-9378-473e8748e0dd",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  480,
                  -240
            ],
            "webhookId": "df852a9f-5ea3-43f2-bd49-d045aba5e9c9",
            "parameters": {
                  "path": "df852a9f-5ea3-43f2-bd49-d045aba5e9c9",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 2
      },
      {
            "id": "fe28fa98-4946-4379-970e-6df1a79e2a1e",
            "name": "Get Meeting Content",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  700,
                  -240
            ],
            "parameters": {
                  "url": "https://api.fireflies.ai/graphql",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"query\": \"query Transcript($transcriptId: String!) { transcript(id: $transcriptId) { title participants speakers { id name } sentences { speaker_name text } summary { bullet_gist } } }\",\n \"variables\": {\n \"transcriptId\": \"{{ $json.meetingId }}\"\n }\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "Bearer [YOUR API KEY HERE]"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "5eadd00a-9095-4bf3-80ed-e7bc5c49390d",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  -360
            ],
            "parameters": {
                  "color": 4,
                  "height": 80,
                  "content": "### Replace API key for Fireflies\n"
            },
            "typeVersion": 1
      },
      {
            "id": "93cee18c-2215-4a63-af7b-ddf45729f5e4",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1180,
                  200
            ],
            "parameters": {
                  "color": 4,
                  "height": 80,
                  "content": "### Replace connections for Airtable and Google\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4d792723-4507-486f-9dc7-62bf1b927edd",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  340
            ],
            "parameters": {
                  "width": 820,
                  "height": 280,
                  "content": "### Scenario 2 - Create Tasks tool"
            },
            "typeVersion": 1
      },
      {
            "id": "c5520210-86db-4639-9f8c-ac9055407232",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  -460
            ],
            "parameters": {
                  "width": 1100,
                  "height": 760,
                  "content": "### Scenario 1 - AI agent"
            },
            "typeVersion": 1
      },
      {
            "id": "48d47e44-b7bf-49b3-814b-6969ce97108d",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  800,
                  180
            ],
            "parameters": {
                  "color": 4,
                  "height": 80,
                  "content": "### Replace OpenAI connection\n"
            },
            "typeVersion": 1
      },
      {
            "id": "afe4bffa-8937-4c31-8513-0acc6b8858ce",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -360,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 280,
                  "height": 566,
                  "content": "### Set up steps\n\n#### Preparation\n1. **Create Accounts**:\n - [N8N](https://n8n.partnerlinks.io/2hr10zpkki6a): For workflow automation.\n - [Airtable](https://airtable.com/): For database hosting and management.\n - [Fireflies](https://fireflies.ai/): For recording meetings.\n\n#### N8N Workflow\n\n1. **Configure the Webhook**: \n - Set up a webhook to capture meeting completion events and integrate it with Fireflies.\n\n2. **Retrieve Meeting Content**: \n - Use GraphQL API requests to extract meeting details and transcripts, ensuring appropriate authentication through Bearer tokens.\n\n3. **AI Processing Setup**: \n - Define system messages for AI tasks and configure connections to the AI chat model (e.g., OpenAI's GPT) to process transcripts.\n\n4. **Task Creation Logic**: \n - Create structured tasks based on AI output, ensuring necessary details are captured and records are created in Airtable.\n\n5. **Client Notifications**: \n - Use an email node to notify clients about their tasks, ensuring communications are client-specific.\n\n6. **Scheduling Follow-Up Calls**: \n - Set up Google Calendar events if follow-up meetings are required, populating details from the original meeting context.\n\n7. **Final Testing**: \n - Conduct tests to ensure each part of the workflow is functional and seamless, making adjustments as needed based on feedback."
            },
            "typeVersion": 1
      },
      {
            "id": "cbb81fa7-4a97-4a7e-82ce-05250b2c82cf",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -360,
                  -460
            ],
            "parameters": {
                  "color": 7,
                  "width": 636.2128494576581,
                  "height": 497.1532689930921,
                  "content": "![5min Logo](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/banner.png)\n## AI Agent for project management and meetings with Airtable and Fireflies\n**Made by [Philipp Bekher](https://www.linkedin.com/in/philipp-bekher-5437171a4/) from community [5minAI](https://www.skool.com/5minai-2861)**\n\nManaging action items from meetings can often lead to missed tasks and poor follow-up. This automation alleviates that issue by automatically generating tasks from meeting transcripts, keeping everyone informed about their responsibilities and streamlining communication.\n\nThe workflow leverages n8n to create a Smart Agent that listens for completed meeting transcripts, processes them using AI, and generates tasks in Airtable. Key functionalities include:\n- Capturing completed meeting events through webhooks.\n- Extracting relevant meeting details such as transcripts and participants using API calls.\n- Generating structured tasks from meeting discussions and sending notifications to clients.\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "6d367721-875d-4d43-bd55-9801796a0e9f",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -60,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 330.5152611046425,
                  "height": 239.5888196628349,
                  "content": "### ... or watch set up video [10 min]\n[![Youtube Link](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/Video%2011%20-%20Fireflies%20Agent%20Blur.png)](https://www.youtube.com/watch?v=0TyX7G00x3A)\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Get Meeting Content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "AI Agent": {
            "main": [
                  []
            ]
      },
      "Split Out": {
            "main": [
                  [
                        {
                              "node": "Create Task",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Event": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Tasks": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model": {
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
      "Get Meeting Content": {
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
      "Execute Workflow Trigger": {
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
      "Notify Client About Tasks": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {},
  },
  {
    name: "AI Agent To Chat With Airtable And Analyze Data",
    nodes: [
      {
            "id": "799d2e0c-29b9-494c-b11a-d79c7ed4a06d",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  920,
                  480
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "zJhr5piyEwVnWtaI",
                        "name": "OpenAi club"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6254ef4e-9699-404e-96a4-569326cce48d",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1160,
                  200
            ],
            "parameters": {
                  "text": "={{ $('When chat message received').item.json.chatInput }}",
                  "agent": "openAiFunctionsAgent",
                  "options": {
                        "maxIterations": 10,
                        "systemMessage": "You are Airtable assistant. \nYou need to process user's requests and run relevant tools for that. \n\nPlan and execute in right order runs of tools to get data for user's request.\n\nFeel free to ask questions before do actions - especially if you noticed some inconcistency in user requests that might be error/misspelling. \n\nIMPORTANT Always check right table and base ids before doing queries.\n\nIMPORTANT Use Code function to do aggregation functions that requires math like - count, sum, average and etc. Aggegation function could be recognized by words like \"how many\",\"count\",\"what number\" and etc.\nUse Code function to generate graph and images.\n\nIMPORTANT If search with filter failed - try to fetch records without filter\n\nIMPORTANT Ask yourself before answering - am I did everything is possible? Is the answer is right? Is the answer related to user request?\n\nIMPORTANT Always return in response name of Base and Table where records from. "
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "227a5427-c270-47dc-bc08-4bb321314926",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1740,
                  620
            ],
            "parameters": {
                  "height": 80,
                  "content": "### Replace Mapbox public key - <your_public_key> in code"
            },
            "typeVersion": 1
      },
      {
            "id": "667751f4-9815-45b7-8dd2-9a0821a7a5a7",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  840,
                  640
            ],
            "parameters": {
                  "height": 80,
                  "content": "### Replace OpenAI connection"
            },
            "typeVersion": 1
      },
      {
            "id": "a9cdec25-4167-44a9-9d3c-fb04aac7bb32",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1080,
                  480
            ],
            "parameters": {
                  "sessionKey": "={{ $('When chat message received').item.json.sessionId }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.3
      },
      {
            "id": "dfab4eb2-ba30-4756-8a52-5d73de9fba53",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  940,
                  200
            ],
            "webhookId": "abf9ab75-eaca-4b91-b3ba-c0f83d3daba4",
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "259e3d13-ca92-4756-af69-34065dbe08f3",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  760,
                  1340
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "5b80c2c8-7649-40f2-b9be-d090d8bd5ae9",
            "name": "Response",
            "type": "n8n-nodes-base.set",
            "position": [
                  2740,
                  1360
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "cfdbe2f5-921e-496d-87bd-9c57fdc22a7a",
                                    "name": "response",
                                    "type": "object",
                                    "value": "={{$json}}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "761f5593-f85c-44cd-abbd-aeac78bc31f8",
            "name": "Switch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  980,
                  1320
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "get_bases",
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
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $('Execute Workflow Trigger').item.json.command }}",
                                                      "rightValue": "get_bases"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "get_base_tables_schema",
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
                                                      "id": "26a3ffe8-c8a6-4564-8d18-5494a8059372",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $('Execute Workflow Trigger').item.json.command }}",
                                                      "rightValue": "get_base_tables_schema"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "search",
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
                                                      "id": "0f51cc26-2e42-42e1-a5c2-cb1d2e384962",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $('Execute Workflow Trigger').item.json.command }}",
                                                      "rightValue": "search"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "code",
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
                                                      "id": "51031140-5ceb-48aa-9f33-d314131a9653",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $('Execute Workflow Trigger').item.json.command }}",
                                                      "rightValue": "code"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "d6252c5b-a820-4ded-b59b-ab2fb2e277c3",
            "name": "Aggregate",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1780,
                  980
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "1442ca2e-1793-4029-b398-61d6e6f1c346",
            "name": "Aggregate1",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1780,
                  1140
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "a81b4dcc-c999-43be-a0ea-e37f3c7c9f9d",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1960,
                  1360
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "8029213c-fd8a-4673-a2a0-11b90fd23971",
            "name": "Aggregate2",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  2260,
                  1360
            ],
            "parameters": {
                  "options": {
                        "mergeLists": true
                  },
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "fieldToAggregate": "records"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f5f99038-9d19-49ed-9f50-3cd0270bf9ce",
            "name": "If1",
            "type": "n8n-nodes-base.if",
            "position": [
                  2120,
                  1720
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
                                    "id": "fcb24127-53f9-4498-b0fd-463bd4966ac9",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notExists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.data[0].attachments[0].file_id }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "016ecba7-f6af-4881-a7d6-780dcb43223c",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notExists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.data[0].content.find(x=>x.type==\"image_file\").image_file.file_id }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "abc7ddae-9ca9-4cf6-89a4-a63da8c1e036",
            "name": "Response1",
            "type": "n8n-nodes-base.set",
            "position": [
                  2760,
                  1720
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "cfdbe2f5-921e-496d-87bd-9c57fdc22a7a",
                                    "name": "response",
                                    "type": "string",
                                    "value": "={{ $json.data.url.replace('org/','org/dl/') }}"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "6f40d50f-70e8-4b64-aa42-ae9262fb8381",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2080,
                  1520
            ],
            "parameters": {
                  "width": 160,
                  "height": 80,
                  "content": "### Replace Airtable connection"
            },
            "typeVersion": 1
      },
      {
            "id": "de99a161-5ab3-4b54-bdf7-340d74aa5a93",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1740,
                  1600
            ],
            "parameters": {
                  "width": 160,
                  "height": 80,
                  "content": "### Replace OpenAI connection"
            },
            "typeVersion": 1
      },
      {
            "id": "c1e030fd-4449-43ca-a4e7-a863f9487614",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1540,
                  860
            ],
            "parameters": {
                  "width": 160,
                  "height": 80,
                  "content": "### Replace Airtable connection"
            },
            "typeVersion": 1
      },
      {
            "id": "4375d3a4-0b3b-4de6-9db7-42af4148af2b",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1360,
                  1900
            ],
            "parameters": {
                  "width": 1180,
                  "height": 80,
                  "content": "### Replace OpenAI connection"
            },
            "typeVersion": 1
      },
      {
            "id": "138f813c-d0b0-4a2b-8833-69f1decc9253",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  700,
                  0
            ],
            "parameters": {
                  "color": 6,
                  "width": 1320,
                  "height": 780,
                  "content": "### Workflow 1"
            },
            "typeVersion": 1
      },
      {
            "id": "ca87c7b7-ab34-4ff9-8d74-cef90e6f1e5e",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  700,
                  840
            ],
            "parameters": {
                  "color": 6,
                  "width": 2240,
                  "height": 1180,
                  "content": "### Workflow 2"
            },
            "typeVersion": 1
      },
      {
            "id": "a5cdf41a-f2ca-4203-94ce-45795395ea92",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  300,
                  680
            ],
            "parameters": {
                  "color": 7,
                  "width": 330.5152611046425,
                  "height": 239.5888196628349,
                  "content": "### ... or watch set up video [20 min]\n[![Youtube Thumbnail](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/Video%2012%20-%20Chat%20with%20Airtable%20Blur.png)](https://youtu.be/SotqsAZEhdc)\n"
            },
            "typeVersion": 1
      },
      {
            "id": "697889c4-15e7-4099-89b8-f4e2e3a3abac",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  0,
                  0
            ],
            "parameters": {
                  "color": 7,
                  "width": 636,
                  "height": 657,
                  "content": "![5min Logo](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/banner.png)\n## AI Agent to chat with Airtable and analyze data\n**Made by [Mark Shcherbakov](https://www.linkedin.com/in/marklowcoding/) from community [5minAI](https://www.skool.com/5minai)**\n\nEngaging with data stored in Airtable often requires manual navigation and time-consuming searches. This workflow allows users to interact conversationally with their datasets, retrieving essential information quickly while minimizing the need for complex queries.\n\nThis workflow enables an AI agent to facilitate chat interactions over Airtable data. The agent can:\n- Retrieve order records, product details, and other relevant data.\n- Execute mathematical functions to analyze data such as calculating averages and totals.\n- Optionally generate maps for geographic data visualization.\n\n1. **Dynamic Data Retrieval**: The agent uses user prompts to dynamically query the dataset.\n2. **Memory Management**: It retains context during conversations, allowing users to engage in a more natural dialogue.\n3. **Search and Filter Capabilities**: Users can perform tailored searches with specific parameters or filters to refine their results."
            },
            "typeVersion": 1
      },
      {
            "id": "a9f7c4fd-c07a-4c7c-875d-74b27e3f1fbf",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  0,
                  680
            ],
            "parameters": {
                  "color": 7,
                  "width": 280,
                  "height": 346,
                  "content": "### Set up steps\n\n1. **Separate workflows**:\n\t- Create additional workflow and move there Workflow 2.\n\n2. **Replace credentials**:\n\t- Replace connections and credentials in all nodes.\n\n3. **Start chat**:\n\t- Ask questions and don't forget to mention required base name."
            },
            "typeVersion": 1
      },
      {
            "id": "0c86638f-7220-415d-a920-13761da925a6",
            "name": "Search records",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1500,
                  480
            ],
            "parameters": {
                  "name": "search",
                  "fields": {
                        "values": [
                              {
                                    "name": "command",
                                    "stringValue": "search"
                              }
                        ]
                  },
                  "schemaType": "manual",
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "zVd0G4m33K6KrBvV",
                        "cachedResultName": "Airtable Agent Tools"
                  },
                  "description": "Search records in specific base and table.\n\n- Use Filter (optional) rules for filtering - describe what logic you want to see in filter including field names. \nIMPORTANT - specify all related fields with types for Filter query with right names based on schema. Tool doesn't know schema and type of fields.\n\n- Use Limit (optional) to get more/less records - default = All records. IMPORTANT use default value only when user ask to get all records for analysis.\n\n- Always try to limit list of fields based on user request or in case of number of fields > 30. IMPORTANT Use fields names only.\n \n- Sort by one/multiple fields if needed - order in array is order of level for sorting.\n\nInput example:\nbase_id - appHwXgLVrBujox4J\ntable_id - tblrGzFneREP5Dktl\nlimit - 100\nsort (optional) - [{\"field\":\"Name\",\"direction\":\"asc\"}]\nfilter_desc (optional) - field Name (string) should be equal/contains Mark\nfields (optional) - [\"Name\",\"Email\"]\n\nOutput example:\nRecord 1 - value 1, value 2",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"base_id\": {\n \"type\": \"string\",\n \"description\": \"ID of the base to search in\"\n },\n \"table_id\": {\n \"type\": \"string\",\n \"description\": \"ID of the table to search in\"\n },\n \"limit\": {\n \"type\": \"number\",\n \"description\": \"Number of records to retrieve (default is all records)\"\n },\n \"filter_desc\": {\n \"type\": \"string\",\n \"description\": \"Text description of the filter logic\"\n },\n \"sort\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": \"object\",\n \"properties\": {\n \"field\": { \"type\": \"string\" },\n \"direction\": { \"type\": \"string\", \"enum\": [\"asc\", \"desc\"] }\n },\n \"required\": [\"field\", \"direction\"]\n },\n \"description\": \"Array of sorting rules for the query\"\n },\n \"fields\": {\n \"type\": \"array\",\n \"items\": { \"type\": \"string\" },\n \"description\": \"List of fields to retrieve\"\n }\n },\n \"required\": [\"base_id\", \"table_id\"]\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.2
      },
      {
            "id": "7ba1d6ac-f1a2-4b8d-a9a5-ce92eaa4e7fa",
            "name": "Process data with code",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1640,
                  480
            ],
            "parameters": {
                  "name": "code",
                  "fields": {
                        "values": [
                              {
                                    "name": "command",
                                    "stringValue": "code"
                              }
                        ]
                  },
                  "schemaType": "manual",
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "zVd0G4m33K6KrBvV",
                        "cachedResultName": "Airtable Agent Tools"
                  },
                  "description": "Process data with code. Use for math functions and image (graphs) generation. \nIMPORTANT Provide raw data only, don't preprocess or use math functions by yourself\n\nInput example:\nrequest - Count average\ndata - 1,2,3\n\nOutput example:\nAverage is 2\nImage file",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"request\": {\n \"type\": \"string\",\n \"description\": \"Description of the operation to perform.\"\n },\n \"data\": {\n \"type\": \"string\",\n \"description\": \"Stringified data - JSON, strings, arrays and etc.\"\n }\n },\n \"required\": [\"request\", \"data\"]\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.2
      },
      {
            "id": "3754175c-6f74-4750-b2e7-00e2bd3caf6d",
            "name": "Create map image",
            "type": "@n8n/n8n-nodes-langchain.toolCode",
            "position": [
                  1800,
                  480
            ],
            "parameters": {
                  "name": "create_map",
                  "jsCode": "// Example: convert the incoming query to uppercase and return it\n\nreturn `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${query.markers}/-96.9749,41.8219,3.31,0/800x500?before_layer=admin-0-boundary&access_token=<your_public_key>`;",
                  "schemaType": "manual",
                  "description": "Create link with image for map graph.\nUse addresses' longitude and latitude to create input data.\n\nInput Example:\npin-s+555555(-74.006,40.7128),pin-s+555555(-118.2437,34.0522)\n\nOutput Example:\nImage link.",
                  "inputSchema": "{\n\"type\": \"object\",\n\"properties\": {\n\t\"markers\": {\n\t\t\"type\": \"string\",\n\t\t\"description\": \"List of markers with longitude and latitude data separated by comma. Keep the same color 555555|Example: pin-s+555555(-74.006,40.7128),pin-s+555555(-118.2437,34.0522)\"\n\t\t}\n\t}\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.1
      },
      {
            "id": "135078ea-6a3f-4aee-9f60-c6d5832e446e",
            "name": "Get list of bases",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1220,
                  480
            ],
            "parameters": {
                  "name": "get_bases",
                  "fields": {
                        "values": [
                              {
                                    "name": "command",
                                    "stringValue": "get_bases"
                              }
                        ]
                  },
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "zVd0G4m33K6KrBvV",
                        "cachedResultName": "Airtable Agent Tools"
                  },
                  "description": "Fetches the list of available bases.\n\nOutput:\n- List of bases with their IDs and names."
            },
            "typeVersion": 1.2
      },
      {
            "id": "cd4781d0-f873-4aea-951c-6809358c1db6",
            "name": "Get base schema",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1360,
                  480
            ],
            "parameters": {
                  "name": "get_base_tables_schema",
                  "fields": {
                        "values": [
                              {
                                    "name": "command",
                                    "stringValue": "get_base_tables_schema"
                              }
                        ]
                  },
                  "schemaType": "manual",
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "zVd0G4m33K6KrBvV",
                        "cachedResultName": "Airtable Agent Tools"
                  },
                  "description": "Fetches the schema of tables in a specific base by id.\n\nInput:\nbase_id: appHwXgLVrBujox4J\n\nOutput:\ntable 1: field 1 - type string, fields 2 - type number",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"base_id\": {\n \"type\": \"string\",\n \"description\": \"ID of the base to retrieve the schema for. Format - appHwXgLVrBujox4J\"\n }\n },\n \"required\": [\"base_id\"]\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.2
      },
      {
            "id": "45c8b2eb-f43a-48b1-a270-9caeda9da0b0",
            "name": "Get Bases",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1580,
                  980
            ],
            "parameters": {
                  "options": {},
                  "resource": "base"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "xZwG0YpqsxpWrzVM",
                        "name": "Mark Airtable account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "bb8036bc-1c23-461b-bd03-2461e31c6cb6",
            "name": "Get Base/Tables schema",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1580,
                  1140
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Execute Workflow Trigger').item.json.query.base_id }}"
                  },
                  "resource": "base",
                  "operation": "getSchema"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "xZwG0YpqsxpWrzVM",
                        "name": "Mark Airtable account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "dab309d9-3629-44ba-9f0a-ede55f96488f",
            "name": "If filter description exists",
            "type": "n8n-nodes-base.if",
            "position": [
                  1340,
                  1360
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
                                    "id": "fcb24127-53f9-4498-b0fd-463bd4966ac9",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notExists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $('Execute Workflow Trigger').item.json.query.filter_desc }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "4cc416aa-50bd-4b60-ae51-887c4ee97c88",
            "name": "Airtable - Search records",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueErrorOutput",
            "position": [
                  2100,
                  1360
            ],
            "parameters": {
                  "url": "=https://api.airtable.com/v0/{{ $('Execute Workflow Trigger').item.json.query.base_id }}/{{ $('Execute Workflow Trigger').item.json.query.table_id }}/listRecords",
                  "method": "POST",
                  "options": {
                        "pagination": {
                              "pagination": {
                                    "parameters": {
                                          "parameters": [
                                                {
                                                      "name": "offset",
                                                      "type": "body",
                                                      "value": "={{ $response.body.offset}}"
                                                }
                                          ]
                                    },
                                    "completeExpression": "={{ $response.body.offset==undefined}}",
                                    "paginationCompleteWhen": "other"
                              }
                        }
                  },
                  "jsonBody": "={{ \n Object.fromEntries(\n Object.entries({\n sort: $('Execute Workflow Trigger').item.json.query.sort,\n limit: $('Execute Workflow Trigger').item.json.query.limit,\nfields: $('Execute Workflow Trigger').item.json.query.fields,\nfilterByFormula: $('Merge').item.json.choices == undefined ? undefined : JSON.parse($json.choices[0].message.content).filter\n }).filter(([key, value]) => value !== undefined)\n )\n}}",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "airtableTokenApi"
            },
            "credentials": {
                  "httpQueryAuth": {
                        "id": "1DXeuNaLSixqGPaU",
                        "name": "Query Auth account Youtube"
                  },
                  "airtableTokenApi": {
                        "id": "xZwG0YpqsxpWrzVM",
                        "name": "Mark Airtable account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "9dc71d31-8499-4b69-b87c-898217447d50",
            "name": "OpenAI - Generate search filter",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1760,
                  1420
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/chat/completions",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"model\": \"gpt-4o-mini\",\n \"messages\": [\n {\n \"role\": \"system\",\n \"content\": {{ JSON.stringify($('Set schema and prompt').item.json.prompt) }}\n },\n {\n \"role\": \"user\",\n \"content\": \"{{ $('Execute Workflow Trigger').item.json.query.filter_desc }}\"\n }],\n \"response_format\":{ \"type\": \"json_schema\", \"json_schema\": {{ $('Set schema and prompt').item.json.schema }}\n\n }\n }",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "zJhr5piyEwVnWtaI",
                        "name": "OpenAi club"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "16e4ea97-ea73-45a0-aa88-0f9a2969a6a3",
            "name": "Set schema and prompt",
            "type": "n8n-nodes-base.set",
            "position": [
                  1560,
                  1420
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "dc09a5b4-ff6a-4cee-b87e-35de7336ac05",
                                    "name": "prompt",
                                    "type": "string",
                                    "value": "=Analyse user request for Airtable filtration. User filter rules to build right formula. Think smart about filter (e.g. instead of search where Name equal to value - search where name contains lowercase value)\nIMPORTANT Check examples and best practices before building formula. \n\nIMPORTANT best practices:\n\nSEARCH(LOWER('example'), LOWER({Field})) ensures both the search term and field are compared in lowercase for consistent case-insensitive matching\n\nIMPORTANT Examples:\n\n- AND(SEARCH('urgent', {Notes}), {Priority} > 3) fetch records where “Notes” contain “urgent” and “Priority” is greater than 3\n- AND({Status} = 'Pending', IS_BEFORE({Due Date}, TODAY())) fetch records where “Status” is “Pending” and “Due Date” is before today\n- OR(SEARCH('error', {Logs}), SEARCH('warning', {Logs})) fetch records where “Logs” contain “error” or “warning”\n- AND(LEN({Description}) > 10, {Price} > 50) fetch records where “Description” is longer than 10 characters and “Price” is greater than 50\n- RECORD_ID() = 'rec12345' fetch a specific record by its ID\n- SEARCH('rec67890', ARRAYJOIN({Linked Records}, ',')) fetch records linked to a specific record ID rec67890\n- AND(SEARCH('rec12345', ARRAYJOIN({Linked Records}, ',')), {Status} = 'Active') fetch records where “Linked Records” contain rec12345 and “Status” is “Active”\n\nFormula rules:\nOperators - =,!=,>,<,>=,<= \n- AND(condition1, condition2, ...) logical AND\n- OR(condition1, condition2, ...) logical OR\n- NOT(condition) logical NOT\n- SEARCH('substring', {Field}) finds position of substring, case-insensitive\n- FIND('substring', {Field}) finds position of substring, case-sensitive\n- IS_BEFORE({Date}, 'YYYY-MM-DD') checks if date is before\n- IS_AFTER({Date}, 'YYYY-MM-DD') checks if date is after\n- IS_SAME({Date1}, {Date2}, 'unit') checks if dates are the same by unit\n- RECORD_ID() = 'recXXXXXX' filters by record ID\n- {Field} = '' field is blank\n- {Field} != '' field is not blank\n- ARRAYJOIN({Linked Field}, ',') joins linked records into a string\n- LOWER({Field}) converts to lowercase for case-insensitive comparison\n- UPPER({Field}) converts to uppercase for case-insensitive comparison\n- VALUE({Text}) converts text to number for numeric comparisons\n- LEN({Field}) gets text length\n- ROUND(number, precision) rounds number\n- TODAY() current date\n- NOW() current timestamp\n- IF(condition, true_value, false_value) conditional logic\n- DATETIME_FORMAT({Date}, 'format') formats date as text\n- DATETIME_DIFF(date1, date2, 'unit') difference between dates\n- DATEADD({Date}, number, 'unit') adds time to date\n- LEFT({Text}, number) extracts leftmost characters\n- RIGHT({Text}, number) extracts rightmost characters\n- AND({Field1} = 'Value1', {Field2} > 50) multiple conditions\n- SEARCH('Value', {Field}) substring match\n- ROUND({Field1} / {Field2}, 2) numeric calculation\n- AND(IS_BEFORE({Date}, TODAY()), {Status} = 'Active') filter by date and status\n- ISERROR(expression) checks if an expression has an error\n- ABS(number) absolute value\n- MIN(value1, value2) minimum value\n- MAX(value1, value2) maximum value\n\n"
                              },
                              {
                                    "id": "4e0f9af6-517f-42af-9ced-df0e8a7118b0",
                                    "name": "schema",
                                    "type": "string",
                                    "value": "={\n \"name\": \"filter\",\n \"schema\": {\n \"type\": \"object\",\n \"properties\": {\n \"filter\": {\n \"type\": \"string\"\n }\n },\n \"required\": [\n \"filter\"\n ],\n \"additionalProperties\": false\n },\n \"strict\": true\n}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "6e670074-8508-4282-9c40-600cc445b10f",
            "name": "Upload file to get link",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueRegularOutput",
            "position": [
                  2580,
                  1720
            ],
            "parameters": {
                  "url": "=https://tmpfiles.org/api/v1/upload",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "contentType": "multipart-form-data",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "file",
                                    "parameterType": "formBinaryData",
                                    "inputDataFieldName": "data"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "b7569d19-3a10-41e5-932b-4be04260a58e",
            "name": "OpenAI - Download File",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2360,
                  1720
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/files/{{ $json.data[0].attachments[0]?.file_id ?? $json.data[0].content.find(x=>x.type==\"image_file\")?.image_file.file_id }}/content",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "OpenAI-Beta",
                                    "value": "assistants=v2"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "vBLHyjEnMK9EaWwQ",
                        "name": "Mark OpenAi "
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "bf378b21-07fb-4f9e-bfc5-9623ebcb8236",
            "name": "OpenAI - Get messages",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1960,
                  1720
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('OpenAI - Create thread').item.json.id }}/messages",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "OpenAI-Beta",
                                    "value": "assistants=v2"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "zJhr5piyEwVnWtaI",
                        "name": "OpenAi club"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "9874eec1-61e2-45fe-8c57-556957a15473",
            "name": "OpenAI - Run assistant",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1760,
                  1720
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('OpenAI - Create thread').item.json.id }}/runs",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "assistant_id",
                                    "value": "asst_PGUuvzEGJWOE8p8vwV56INLO"
                              },
                              {
                                    "name": "stream",
                                    "value": "={{true}}"
                              },
                              {
                                    "name": "tool_choice",
                                    "value": "={{ {\"type\": \"code_interpreter\"} }}"
                              },
                              {
                                    "name": "tools",
                                    "value": "={{ [{\"type\": \"code_interpreter\"}] }}"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "OpenAI-Beta",
                                    "value": "assistants=v2"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "fLfRtaXbR0EVD0pl",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "e5339ad2-36c7-40c5-846b-2bd242f41ea5",
            "name": "OpenAI - Send message",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1560,
                  1720
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('OpenAI - Create thread').item.json.id }}/messages ",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "role",
                                    "value": "user"
                              },
                              {
                                    "name": "content",
                                    "value": "=Request:\n{{ $('Execute Workflow Trigger').item.json.query.request }}\n\nData:\n{{ $('Execute Workflow Trigger').item.json.query.data }}"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "OpenAI-Beta",
                                    "value": "assistants=v2"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "fLfRtaXbR0EVD0pl",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "5b822c15-af63-43f6-ac30-61a34dcd91ee",
            "name": "OpenAI - Create thread",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1360,
                  1720
            ],
            "parameters": {
                  "url": "https://api.openai.com/v1/threads",
                  "method": "POST",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "OpenAI-Beta",
                                    "value": "assistants=v2"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "vBLHyjEnMK9EaWwQ",
                        "name": "Mark OpenAi "
                  }
            },
            "typeVersion": 4.2
      }
],
    connections: {
      "If1": {
            "main": [
                  [
                        {
                              "node": "Response",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI - Download File",
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
                              "node": "Airtable - Search records",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Switch": {
            "main": [
                  [
                        {
                              "node": "Get Bases",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get Base/Tables schema",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "If filter description exists",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI - Create thread",
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
                              "node": "Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Bases": {
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
      "Aggregate1": {
            "main": [
                  [
                        {
                              "node": "Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Aggregate2": {
            "main": [
                  [
                        {
                              "node": "Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search records": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get base schema": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create map image": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get list of bases": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model": {
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
      "Window Buffer Memory": {
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
      "OpenAI - Get messages": {
            "main": [
                  [
                        {
                              "node": "If1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Send message": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Run assistant",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set schema and prompt": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Generate search filter",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Base/Tables schema": {
            "main": [
                  [
                        {
                              "node": "Aggregate1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Create thread": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Send message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Download File": {
            "main": [
                  [
                        {
                              "node": "Upload file to get link",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Run assistant": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Get messages",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Process data with code": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload file to get link": {
            "main": [
                  [
                        {
                              "node": "Response1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Execute Workflow Trigger": {
            "main": [
                  [
                        {
                              "node": "Switch",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Airtable - Search records": {
            "main": [
                  [
                        {
                              "node": "Aggregate2",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "When chat message received": {
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
      "If filter description exists": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set schema and prompt",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Generate search filter": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      }
},
    settings: {},
  },
  {
    name: "Get Airtable data in Obsidian Notes",
    nodes: [
      {
            "id": "584cfe61-7f1b-4deb-ab4b-45a5ffd20daf",
            "name": "Airtable",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  540,
                  340
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appP3ocJy1rXIo6ko",
                        "cachedResultUrl": "https://airtable.com/appP3ocJy1rXIo6ko",
                        "cachedResultName": "table"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblywtlpPtGQMTJRm",
                        "cachedResultUrl": "https://airtable.com/appP3ocJy1rXIo6ko/tblywtlpPtGQMTJRm",
                        "cachedResultName": "Dummy"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "yiZ7ZC1md4geZovu",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "8a100c92-7971-464b-b3c0-18272f0a0bef",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  220,
                  340
            ],
            "parameters": {
                  "model": "gpt-4o-mini",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "q8L9oWVM7QyzYEE5",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "98887b9b-2eae-4a2e-af2b-d40c1786c5a2",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  280,
                  200
            ],
            "parameters": {
                  "text": "={{ $json.body.content }}",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "91296976-3d78-4a9e-9f4c-a4136abcca4e",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -160,
                  -260
            ],
            "parameters": {
                  "color": 7,
                  "width": 497.9113826976365,
                  "height": 389.9939760040372,
                  "content": "[![YouTube Video](https://img.youtube.com/vi/2PIdeTgsENo/0.jpg)](https://www.youtube.com/watch?v=2PIdeTgsENo)"
            },
            "typeVersion": 1
      },
      {
            "id": "7adae874-d388-4265-aff8-28a1970bd0fb",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  360,
                  -240
            ],
            "parameters": {
                  "width": 563.3824678865192,
                  "height": 368.0048034646952,
                  "content": "## Get Airtable Data in Obsidian with AI Agent\n<-- Watch the video to see it in action!\n\n**How to Set Up:**\n- Install the [Post Webhook Plugin](https://github.com/Masterb1234/obsidian-post-webhook/) in Obsidian.\n- Insert the n8n Webhook URL into the Post Webhook plugin settings.\n- Configure Your Airtable Node to match your workflow needs.\n\n\n**How to Use:**\n- Highlight text containing a question about your Airtable data.\n- Open the Obsidian Command Palette (Ctrl+P) and choose 'Send Selection to [Your Webhook]'.\n- Click, wait for the AI Agent to process your request, and see the result appear below your selected text."
            },
            "typeVersion": 1
      },
      {
            "id": "52c40581-656d-45b5-b366-d67cf2474312",
            "name": "Respond to Obsidian",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  700,
                  200
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "text",
                  "responseBody": "={{ $json.output }}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "f2bf502e-5e6f-4e71-8c4f-27ec2dc5ab67",
            "name": "Webhook Set Up in Obsidian",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -40,
                  200
            ],
            "webhookId": "59fc8248-d3f7-4dbc-bdf3-39d59e427160",
            "parameters": {
                  "path": "59fc8248-d3f7-4dbc-bdf3-39d59e427160",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Respond to Obsidian",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Airtable": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model": {
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
      "Webhook Set Up in Obsidian": {
            "main": [
                  [
                        {
                              "node": "AI Agent",
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
    name: "Handling Job Application Submissions With AI And N8n Forms",
    nodes: [
      {
            "id": "10565888-4a1b-439a-a188-c6ee7990bb63",
            "name": "Extract from File",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  860,
                  260
            ],
            "parameters": {
                  "options": {},
                  "operation": "pdf",
                  "binaryPropertyName": "File_Upload"
            },
            "typeVersion": 1
      },
      {
            "id": "583aff4b-d9f5-44e7-8e91-4938592b5630",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1740,
                  380
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "8gccIjcuf3gvaoEr",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "3a09afd0-0dce-41fd-bec3-783fcb3d01fc",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  1920,
                  380
            ],
            "parameters": {
                  "schemaType": "manual",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"Name\": { \"type\": \"string\" },\n \"Address\": { \"type\": \"string\" },\n \"Email\": { \"type\": \"string\" },\n \"Telephone\": { \"type\": \"string\" },\n \"Education\": { \"type\": \"string\" },\n \"Skills & Technologies\": { \"type\": \"string\" },\n \"Years of Experience\": { \"type\": \"string\" },\n \"Cover Letter\": { \"type\": \"string\" }\n }\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "541a00d0-1635-48ad-b69e-83b28e178d6e",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1020,
                  420
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "8gccIjcuf3gvaoEr",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "19e4ad5b-2f96-491c-bcb3-52cca526ff82",
            "name": "Step 1 of 2 - Upload CV",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  460,
                  220
            ],
            "webhookId": "4cf0f3b7-6282-47af-a7f1-3dfb00a1311d",
            "parameters": {
                  "options": {
                        "path": "job-application-step1of2",
                        "ignoreBots": true,
                        "buttonLabel": "Submit",
                        "useWorkflowTimezone": true
                  },
                  "formTitle": "Step 1 of 2: Submit Your CV",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "Name",
                                    "placeholder": "Eg. Sam Smith",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "file",
                                    "fieldLabel": "File Upload",
                                    "multipleFiles": false,
                                    "requiredField": true,
                                    "acceptFileTypes": "pdf"
                              },
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Acknowledgement of Terms",
                                    "multiselect": true,
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "I agree to the terms & conditions"
                                                }
                                          ]
                                    },
                                    "requiredField": true
                              }
                        ]
                  },
                  "responseMode": "lastNode",
                  "formDescription": "Thank you for your interest in applying for Acme Inc. To ensure a speedy process, please ensure you following all instructions and fill out all required inputs.\n\nThis step requires you upload your CV in a password-free PDF document. Any document that is not a CV will be rejected."
            },
            "typeVersion": 2.2
      },
      {
            "id": "ec54096b-5f9f-444e-87b1-db99197731f1",
            "name": "Save to Airtable",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2340,
                  320
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appQ6mE9KSzlvaGDT",
                        "cachedResultUrl": "https://airtable.com/appQ6mE9KSzlvaGDT",
                        "cachedResultName": "Job Applications with AI & Forms"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblUwwRXGnNzesNgr",
                        "cachedResultUrl": "https://airtable.com/appQ6mE9KSzlvaGDT/tblUwwRXGnNzesNgr",
                        "cachedResultName": "Table 1"
                  },
                  "columns": {
                        "value": {
                              "Name": "={{ $json.output.Name }}",
                              "Email": "={{ $json.output.Email }}",
                              "Address": "={{ $json.output.Address }}",
                              "Education": "={{ $json.output.Education }}",
                              "Telephone": "={{ $json.output.Telephone }}",
                              "Cover Letter": "={{ $json.output['Cover Letter'] }}",
                              "Submitted By": "={{ $('Step 1 of 2 - Upload CV').first().json.Name }}",
                              "Years of Experience": "={{ $json.output['Years of Experience'] }}",
                              "Skills & Technologies": "={{ $json.output['Skills & Technologies'] }}"
                        },
                        "schema": [
                              {
                                    "id": "Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "File",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Cover Letter",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Cover Letter",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Address",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Email",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Telephone",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Telephone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Education",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Education",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Skills & Technologies",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Skills & Technologies",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Years of Experience",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Years of Experience",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Created",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "Created",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Last Modified",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "Last Modified",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Submitted By",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Submitted By",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {},
                  "operation": "create"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Und0frCQ6SNVX3VV",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "127965b3-a2c6-443b-942d-8691b5bcb25d",
            "name": "Classify Document",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  1020,
                  260
            ],
            "parameters": {
                  "options": {
                        "fallback": "other"
                  },
                  "inputText": "={{ $json.text }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "CV or Resume",
                                    "description": "This document is a CV or Resume"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b82476c8-b285-467f-b344-e1f667f42479",
            "name": "Upload File to Record",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2540,
                  320
            ],
            "parameters": {
                  "url": "=https://content.airtable.com/v0/{{ $('Save to Airtable').params.base.value }}/{{ $json.id }}/File/uploadAttachment",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "contentType",
                                    "value": "application/pdf"
                              },
                              {
                                    "name": "filename",
                                    "value": "={{ $workflow.id }}-{{ $execution.id }}.pdf"
                              },
                              {
                                    "name": "file",
                                    "value": "={{ $('Step 1 of 2 - Upload CV').first().binary.File_Upload.data }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "airtableTokenApi"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Und0frCQ6SNVX3VV",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "ee6f59ee-781f-4ed4-8cec-b7de70a82dac",
            "name": "Form Success",
            "type": "n8n-nodes-base.form",
            "position": [
                  3900,
                  320
            ],
            "webhookId": "4b154ccc-ad54-4cc2-a239-cf8354fc91bf",
            "parameters": {
                  "options": {},
                  "operation": "completion",
                  "completionTitle": "Application Success",
                  "completionMessage": "Thank you for completing the application process.\nYour informaion is filed securely and will be reviewed by our team.\n\nWe will be in touch shortly."
            },
            "typeVersion": 1
      },
      {
            "id": "43d46474-b9f8-4adf-89f8-d4c993641448",
            "name": "Save to Airtable1",
            "type": "n8n-nodes-base.airtable",
            "onError": "continueErrorOutput",
            "position": [
                  3720,
                  320
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appQ6mE9KSzlvaGDT",
                        "cachedResultUrl": "https://airtable.com/appQ6mE9KSzlvaGDT",
                        "cachedResultName": "Job Applications with AI & Forms"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblUwwRXGnNzesNgr",
                        "cachedResultUrl": "https://airtable.com/appQ6mE9KSzlvaGDT/tblUwwRXGnNzesNgr",
                        "cachedResultName": "Table 1"
                  },
                  "columns": {
                        "value": {
                              "Name": "={{ $json.Name }}",
                              "Email": "={{ $json.Email }}",
                              "Address": "={{ $json.Address }}",
                              "Education": "={{ $json.Education }}",
                              "Telephone": "={{ $json.Telephone }}",
                              "Cover Letter": "={{ $json.output['Cover Letter'] }}",
                              "Years of Experience": "={{ $json['Years of Experience'] }}",
                              "Skills & Technologies": "={{ $json['Skills & Technologies'] }}"
                        },
                        "schema": [
                              {
                                    "id": "Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "File",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Cover Letter",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Cover Letter",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Address",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Email",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Telephone",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Telephone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Education",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Education",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Skills & Technologies",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Skills & Technologies",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Years of Experience",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Years of Experience",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Created",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "Created",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Last Modified",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "Last Modified",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Submitted By",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Submitted By",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "Email",
                              "Name"
                        ]
                  },
                  "options": {},
                  "operation": "update"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Und0frCQ6SNVX3VV",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "38115307-824c-4354-917c-b18e93178f87",
            "name": "Step 2 of 2 - Application Form",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  3520,
                  320
            ],
            "webhookId": "db923d6c-ea24-4679-b4ba-d3b142ef8338",
            "parameters": {
                  "options": {
                        "path": "job-application-step2of2",
                        "ignoreBots": true,
                        "useWorkflowTimezone": true
                  },
                  "formTitle": "Step 2 of 2: Application Form",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "Name",
                                    "placeholder": "Eg. Sam Smith",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "Address",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "email",
                                    "fieldLabel": "Email",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "Telephone",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Education",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Skills & Technologies",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Years of Experience",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Cover Letter",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Acknowledgement of Terms",
                                    "multiselect": true,
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "I agree to consent to the terms and conditions"
                                                }
                                          ]
                                    },
                                    "requiredField": true
                              }
                        ]
                  },
                  "formDescription": "This application form prefills using the CV you submitted. Please make any amendments as required and once satisfied, please submit the form to complete the application process."
            },
            "typeVersion": 2.2
      },
      {
            "id": "1171540b-ebb2-41cb-b9f1-2da335caaece",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  300,
                  20
            ],
            "parameters": {
                  "color": 7,
                  "width": 430,
                  "height": 381,
                  "content": "## 1. Application Form To Upload CV\n[Learn more the Form Trigger node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/)\n\nOur application process starts with a simple file upload to get the applicant's CV for processing."
            },
            "typeVersion": 1
      },
      {
            "id": "4791901b-31a6-44c3-a1da-9c32b78cf305",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  760,
                  17.5
            ],
            "parameters": {
                  "color": 7,
                  "width": 774,
                  "height": 593,
                  "content": "## 2. Document Classifier and ReUpload Form\n[Read more about the Text Classifier](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier/)\n\nForm validation remains a critical step and before the introduction of LLMs, classifying document types was a relatively troublesome process. Today, n8n's text classifier node does an excellent job at this task.\n\nContextual validation powered by AI means invalid, incomplete or poorly created applicant CVs can be rejected as a quality check. When this happens in our workflow, we present the user again with the file upload form to retry."
            },
            "typeVersion": 1
      },
      {
            "id": "4dc1a316-15b7-4568-9910-79b4a7989dcb",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1560,
                  -20
            ],
            "parameters": {
                  "color": 7,
                  "width": 648,
                  "height": 584,
                  "content": "## 3. Smarter Application Pre-fill with Job Role Context\n[Read more about the Basic LLM node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nInformation extraction is a logical next step once we have our PDF contents but we can extend further by only extracting data which is relevant to our job post. This ensure the information we extract is always relevant which saves time for the hiring team.\n\nTo achieve this for this demo, I've included the job post in the prompt for the LLM to compare the CV against. The provides the AI enough context to complete the task successfully."
            },
            "typeVersion": 1
      },
      {
            "id": "76006a7b-32ce-4606-be98-9a7b7b451215",
            "name": "Application Suitability Agent",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1740,
                  220
            ],
            "parameters": {
                  "text": "=Here is the candidate's CV:\n{{ $json.text }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=Extract information from the applicant's CV which is relevant to the job post.\nWhen writing the cover letter, use no more than a few paragraphs. No need to address the hiring company or personnel as this text will be input into an online form.\nUse a formal and professional tone.\nThis is the job post which the cover letter should address:\n\n```\nJob Post: General Operations Manager – Manufacturing Industry\nJob Type: Full-time\nExperience Level: Mid to Senior\n\nAbout Us:\nWe are a forward-thinking manufacturing company committed to innovation, quality, and sustainability. We strive to improve operations, enhance product quality, and implement eco-friendly practices, fostering a productive and collaborative work environment.\n\nJob Description:\nWe are seeking an experienced and dynamic General Operations Manager to lead and optimize our manufacturing processes. The successful candidate will oversee production, enhance efficiency, and implement effective strategies to support our mission. This role is ideal for a seasoned professional with a strong background in operational management and a knack for process improvement.\n\nKey Responsibilities:\n\nOversee and manage production and sales teams across multiple shifts, ensuring seamless 24/6 operations.\nDevelop and implement cost-effective quality control and accountability measures to maintain high manufacturing standards.\nManage inventory and procurement, strategically timing raw material purchases to maximize cost efficiency.\nLead ERP system upgrades or similar digital transformation projects, ensuring timely and budget-friendly execution.\nOptimize credit control and payment terms to improve cash flow while maintaining client relationships.\nAdvocate for sustainable practices, including integrating recycled materials into production processes.\nQualifications:\n\nBachelor's degree in Business Administration or a related field; a Master's in Financial Economics is a plus.\nProven experience in a leadership role within the manufacturing industry.\nExpertise in managing teams, production cycles, and quality assurance.\nProficiency in ERP systems and software such as Stata, Bloomberg Professional, and Thomson Reuters DataStream.\nStrong analytical, decision-making, and organizational skills.\nFamiliarity with capital markets, private equity, or strategic management consulting is a plus.\nPreferred Skills:\n\nAdvanced knowledge of plastics manufacturing, including polyethylene and polypropylene applications.\nExperience in implementing sustainability initiatives and green business practices.\nExcellent communication skills, with a history of collaboration and team-building.\nWhat We Offer:\n\nCompetitive salary and benefits package.\nOpportunities for professional growth and development.\nA collaborative and innovative work environment.\nHow to Apply:\nPlease send your resume and a cover letter highlighting your experience and achievements to [HR Email]. Applications will be reviewed on a rolling basis.\n\nJoin us and drive operational excellence in manufacturing!\n```"
                              }
                        ]
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.5
      },
      {
            "id": "cfc6a1a1-d42c-49b1-a93b-4a04e7e88521",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2240,
                  40
            ],
            "parameters": {
                  "color": 7,
                  "width": 528,
                  "height": 524,
                  "content": "## 4. Save to Applicant Tracking System\n[Read more about the Airtable node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable/)\n\nNext, we can complete our simple data capture by integrating and pushing data to our Applicant Tracking System.\n\nHere, we're using Airtable because we can also store PDF files in our rows.\n\nSee our example Airtable here: [https://airtable.com/appQ6mE9KSzlvaGDT/shrIivfe9qH6YEYAs](https://airtable.com/appQ6mE9KSzlvaGDT/shrIivfe9qH6YEYAs)"
            },
            "typeVersion": 1
      },
      {
            "id": "8f21067f-a851-4480-84b8-bb37eddfd7d6",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2780,
                  40
            ],
            "parameters": {
                  "color": 7,
                  "width": 575.8190139534884,
                  "height": 524,
                  "content": "## 5. Redirect to Application Form\n[Learn more about Form Ending](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form/#form-ending)\n\nFinally to complete the form flow for step 1 of 2, we'll use a form ending node to redirect the user to step 2 of 2.\n\nHere, we using query params as part of our redirect as this will pre-fill the form fields in step 2 of 2."
            },
            "typeVersion": 1
      },
      {
            "id": "2ba9cea6-173f-45be-bdda-a6ef061d91f5",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3380,
                  40
            ],
            "parameters": {
                  "color": 7,
                  "width": 788,
                  "height": 524,
                  "content": "## 6. Application Form to Amend Details\n[Learn more about Forms](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form)\n\nIn the second part of the application process, applicants are presented with a form containing multiple fields to complete. This step has often been a source of frustration for many, as they end up duplicating information that’s already in their CV.\n\nIf our redirection with prefilled data works as intended, this issue will be resolved, as the fields will be automatically populated by our LLM during step 1 of 2. This also allows candidates the opportunity to review and refine the application fields before submitting."
            },
            "typeVersion": 1
      },
      {
            "id": "5add63c3-19d4-4035-a718-b1c125a03c67",
            "name": "File Upload Retry",
            "type": "n8n-nodes-base.form",
            "position": [
                  1340,
                  380
            ],
            "webhookId": "c3e8dc74-c6e0-4d0b-acf3-8bbc2f7c9ae2",
            "parameters": {
                  "options": {
                        "formTitle": "Please upload a CV",
                        "formDescription": "Unfortunately, we were unable to process your previous file upload.\n\nTo continue, you must upload a valid CV in PDF format. "
                  },
                  "formFields": {
                        "values": [
                              {
                                    "fieldType": "file",
                                    "fieldLabel": "File Upload",
                                    "multipleFiles": false,
                                    "requiredField": true,
                                    "acceptFileTypes": "pdf"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "cc27b37f-26f5-47c3-9ac2-4412352070e5",
            "name": "Redirect To Step 2 of 2",
            "type": "n8n-nodes-base.form",
            "position": [
                  3120,
                  280
            ],
            "webhookId": "1b6e2375-e21d-4e4f-a44e-3ef0de95320e",
            "parameters": {
                  "operation": "completion",
                  "redirectUrl": "=https://<HOST>/form/job-application-step2of2?{{ $('Application Suitability Agent').first().json.output.urlEncode() }}",
                  "respondWith": "redirect"
            },
            "typeVersion": 1
      },
      {
            "id": "1cba63a9-57cb-4e17-a601-2bd64fb50dbf",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -140,
                  -240
            ],
            "parameters": {
                  "width": 420,
                  "height": 640,
                  "content": "## Try It Out!\n\n### This n8n template combines form file uploads with AI components to create a simple but effective job application submission flow.\nIt's a perfect low-cost solution without the bells and whistles of the surface yet is highly advanced with its use of AI.\n\n### How it works\n* The application submission process starts with an n8n form trigger to accept CV files in the form of PDFs.\n* The PDF is validated using the text classifier node to determine if it is a valid CV.\n* A basic LLM node is used to extract relevant information from the CV as data capture. A copy of the original job post is included to ensure relevancy.\n* Applicant's data is then sent to an ATS for processing. For our demo, we used airtable because we could attach PDFs to rows.\n* Finally, a second form trigger is used to allow the applicant to amend any of the generated application fields.\n\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4289f9f2-2286-4bc7-9045-c645ff292341",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3060,
                  460
            ],
            "parameters": {
                  "height": 120,
                  "content": "### 🚨 Change Base URL here!\nThis redirect requires the full base URL, change it to the host of your n8n instance."
            },
            "typeVersion": 1
      },
      {
            "id": "fca5b2ab-291f-4ac3-b4e1-13911666359f",
            "name": "Submission Success",
            "type": "n8n-nodes-base.form",
            "position": [
                  2900,
                  280
            ],
            "webhookId": "f3b12dd4-dd5d-47a9-8bc1-727ba7eb5d15",
            "parameters": {
                  "options": {
                        "formTitle": "CV Submission Successful!",
                        "buttonLabel": "Continue",
                        "formDescription": "We'll now redirect you to step 2 of 2 - our Application form. Please note, some fields will be prefilled with information from your CV. Feel free to amend this information as needed."
                  },
                  "formFields": {
                        "values": [
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Acknowledgement",
                                    "multiselect": true,
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "I understand my CV will be held soley for purpose of application and for no more than 90 days."
                                                }
                                          ]
                                    },
                                    "requiredField": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Save to Airtable": {
            "main": [
                  [
                        {
                              "node": "Upload File to Record",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Classify Document": {
            "main": [
                  [
                        {
                              "node": "Application Suitability Agent",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "File Upload Retry",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract from File": {
            "main": [
                  [
                        {
                              "node": "Classify Document",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "File Upload Retry": {
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
      "Save to Airtable1": {
            "main": [
                  [
                        {
                              "node": "Form Success",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Form Success",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Application Suitability Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model2": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Classify Document",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Submission Success": {
            "main": [
                  [
                        {
                              "node": "Redirect To Step 2 of 2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload File to Record": {
            "main": [
                  [
                        {
                              "node": "Submission Success",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Step 1 of 2 - Upload CV": {
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
      "Structured Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Application Suitability Agent",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Application Suitability Agent": {
            "main": [
                  [
                        {
                              "node": "Save to Airtable",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Step 2 of 2 - Application Form": {
            "main": [
                  [
                        {
                              "node": "Save to Airtable1",
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
    name: "OpenAI Assistant for Hubspot Chat",
    nodes: [
      {
            "id": "7f11a684-911b-4fbc-ba1b-a8e7bce8e914",
            "name": "getHubspotMessage",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  280,
                  580
            ],
            "parameters": {
                  "url": "=https://api.hubapi.com/conversations/v3/conversations/threads/{{ $json[\"body\"][0][\"objectId\"] }}/messages/{{ $json[\"body\"][0][\"messageId\"] }}",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "hubspotAppToken"
            },
            "credentials": {
                  "hubspotAppToken": {
                        "id": "56nluFhXiGjYN1EY",
                        "name": "HubSpot App Token tinder"
                  },
                  "hubspotOAuth2Api": {
                        "id": "y6819fYl4TsW9gl6",
                        "name": "HubSpot account 6"
                  },
                  "hubspotDeveloperApi": {
                        "id": "dHB9nVcnZTqf2JDX",
                        "name": "HubSpot Developer account"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "687bcbb8-38c8-4d21-a46f-186e880d003c",
            "name": "OpenAi Create Thread",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1260,
                  420
            ],
            "parameters": {
                  "url": "https://api.openai.com/v1/threads",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"messages\": [\n {\n \"role\": \"user\",\n \"content\": \"{{ $('getHubspotMessage').item.json[\"text\"] }}\"\n }\n ]\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "8b51d465-d298-4b7a-b939-026bd51469d3",
            "name": "OpenAI Run",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  420
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $json[\"OpenAI Thread ID\"] }}/runs",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"assistant_id\": \"asst_MA71Jq0SElVpdjmJa212CTFd\"\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "3e645c55-a236-466f-9983-2a3e91c250db",
            "name": "Get Run",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1920,
                  600
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $json[\"thread_id\"] }}/runs/{{ $json[\"id\"] }}",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1,
            "alwaysOutputData": true
      },
      {
            "id": "a69a1d1e-b932-481e-8d36-8d121c63ad4b",
            "name": "Get Last Message",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2520,
                  460
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $json[\"thread_id\"] }}/messages",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "d9758207-56d4-4180-aac7-f0ebafab1064",
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2820,
                  960
            ],
            "parameters": {
                  "url": "=https://www.listafirme.ro/api/search-v1.asp",
                  "options": {},
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "key",
                                    "value": "982dc86a0c1bd4c71185d39ae9f36998"
                              },
                              {
                                    "name": "src",
                                    "value": "={{JSON.parse($json[\"required_action\"][\"submit_tool_outputs\"][\"tool_calls\"][0][\"function\"][\"arguments\"]).src}}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "5c6f30fd-3ac2-401c-897a-54c7e998c97b",
            "name": "Completed, Action or Inprogress",
            "type": "n8n-nodes-base.switch",
            "position": [
                  2120,
                  600
            ],
            "parameters": {
                  "rules": {
                        "rules": [
                              {
                                    "value2": "completed"
                              },
                              {
                                    "output": 1,
                                    "value2": "requires_action"
                              },
                              {
                                    "output": 2,
                                    "value2": "in_progress",
                                    "operation": "=equal"
                              },
                              {
                                    "output": 3,
                                    "value2": "queued"
                              }
                        ]
                  },
                  "value1": "={{ $json.status }}",
                  "dataType": "string"
            },
            "typeVersion": 1
      },
      {
            "id": "c1bc0adf-3552-43a3-b38f-bfc76e2683cd",
            "name": "Wait",
            "type": "n8n-nodes-base.wait",
            "position": [
                  2360,
                  1000
            ],
            "webhookId": "e15c2bb6-e022-4c6d-869b-f361b1ec1259",
            "parameters": {
                  "unit": "seconds"
            },
            "typeVersion": 1
      },
      {
            "id": "2e0c4528-5b2b-4d3c-9b53-166ea0f2a28e",
            "name": "Wait1",
            "type": "n8n-nodes-base.wait",
            "position": [
                  2340,
                  760
            ],
            "webhookId": "3a175bf4-c569-431e-bc56-abed3653ce9d",
            "parameters": {
                  "unit": "seconds"
            },
            "typeVersion": 1
      },
      {
            "id": "f80a2cd8-6691-4186-909b-cfed95318014",
            "name": "Submit Data",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  3360,
                  960
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('Select Function').item.json[\"thread_id\"] }}/runs/{{ $('Select Function').item.json[\"id\"] }}/submit_tool_outputs",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"tool_outputs\": [\n {\n \"tool_call_id\": \"{{ $('Select Function').item.json[\"required_action\"][\"submit_tool_outputs\"][\"tool_calls\"][0][\"id\"] }}\",\n \"output\": \"{{$json.escapedJsonString}}\"\n }\n ]\n} ",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1,
            "alwaysOutputData": true
      },
      {
            "id": "eb114cfd-1af2-4c8b-bfba-583453a1d7ca",
            "name": "Select Function",
            "type": "n8n-nodes-base.switch",
            "position": [
                  2520,
                  700
            ],
            "parameters": {
                  "rules": {
                        "rules": [
                              {
                                    "value2": "getAWBbyOrder"
                              },
                              {
                                    "output": 1,
                                    "value2": "get_awb_history"
                              }
                        ]
                  },
                  "value1": "={{ $json.required_action.submit_tool_outputs.tool_calls[0].function.name }}",
                  "dataType": "string"
            },
            "typeVersion": 1
      },
      {
            "id": "4d1ad478-a9a4-4e9f-9b06-e2a9b7b2b55c",
            "name": "Code1",
            "type": "n8n-nodes-base.code",
            "position": [
                  3080,
                  960
            ],
            "parameters": {
                  "jsCode": "const item1 = $input.all()[0]?.json;\nconst jsonString = JSON.stringify(item1);\nconst escapedJsonString = jsonString.replace(/\"/g, '\\\\\"');\n\nreturn { escapedJsonString };\n"
            },
            "typeVersion": 2
      },
      {
            "id": "39cab0c4-1d7d-41cb-a88d-00acc8e79a24",
            "name": "Wait2",
            "type": "n8n-nodes-base.wait",
            "position": [
                  3720,
                  1400
            ],
            "webhookId": "68ae5068-6a39-424c-b88d-019bfee78b6f",
            "parameters": {
                  "unit": "seconds"
            },
            "typeVersion": 1
      },
      {
            "id": "54205ed2-7c96-44b6-9637-20830300310a",
            "name": "HTTP Request1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2820,
                  1180
            ],
            "parameters": {
                  "url": "=https://www.listafirme.ro/api/info-v1.asp",
                  "options": {},
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "key",
                                    "value": "982dc86a0c1bd4c71185d39ae9f36998"
                              },
                              {
                                    "name": "data",
                                    "value": "={\"TaxCode\":\"{{JSON.parse($json[\"required_action\"][\"submit_tool_outputs\"][\"tool_calls\"][0][\"function\"][\"arguments\"]).src}}\",\"NACE\":\"info\",\"VAT\":\"\", \"RegNo\":\"\", \"Status\":\"\", \"LegalForm\":\"\", \"Name\":\"\", \"Date\":\"\", \"TownCode\":\"\", \"County\":\"\", \"City\":\"\", \"Address\":\"\", \"Administrators\":\"\", \"Shareholders\":\"\", \"Balance\":\"latest\", \"Phone\":\"\", \"Mobile\":\"\", \"Fax\":\"\", \"Email\":\"\", \"Web\":\"\", \"Geolocation\":\"\", \"Description\":\"\", \"Trademarks\":\"\", \"Subsidiaries\":\"\", \"Branches\":\"\", \"FiscalActivity\":\"\", \"Obligations\":\"\", \"Links\":\"\"}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "862ab78d-0288-4c78-9e02-7ad4ff794a6d",
            "name": "Code",
            "type": "n8n-nodes-base.code",
            "position": [
                  3060,
                  1180
            ],
            "parameters": {
                  "jsCode": "const item1 = $input.all()[0]?.json;\nconst jsonString = JSON.stringify(item1);\nconst escapedJsonString = jsonString.replace(/\"/g, '\\\\\"');\n\nreturn { escapedJsonString };\n"
            },
            "typeVersion": 2
      },
      {
            "id": "e9d1d277-107d-403c-9911-5faa4ae75671",
            "name": "Submit Data1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  3260,
                  1180
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('Select Function').item.json[\"thread_id\"] }}/runs/{{ $('Select Function').item.json[\"id\"] }}/submit_tool_outputs",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"tool_outputs\": [\n {\n \"tool_call_id\": \"{{ $('Select Function').item.json[\"required_action\"][\"submit_tool_outputs\"][\"tool_calls\"][0][\"id\"] }}\",\n \"output\": \"{{$json.escapedJsonString}}\"\n }\n ]\n} ",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1,
            "alwaysOutputData": true
      },
      {
            "id": "28e7637b-9a3b-49ba-b4c7-efd3f6cf0522",
            "name": "Wait3",
            "type": "n8n-nodes-base.wait",
            "position": [
                  3460,
                  1360
            ],
            "webhookId": "6d7d039c-8a4b-4178-8d31-57fb3c24ac14",
            "parameters": {
                  "unit": "seconds"
            },
            "typeVersion": 1
      },
      {
            "id": "2b954546-8bc6-4028-9826-37a64d2aed04",
            "name": "respondHubspotMessage1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2820,
                  420
            ],
            "parameters": {
                  "url": "=https://api.hubapi.com/conversations/v3/conversations/threads/{{ $('getHubspotMessage').item.json[\"conversationsThreadId\"] }}/messages",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "type",
                                    "value": "MESSAGE"
                              },
                              {
                                    "name": "richText",
                                    "value": "={{ $json.data[0].content[0].text.value }}"
                              },
                              {
                                    "name": "senderActorId",
                                    "value": "A-5721819"
                              },
                              {
                                    "name": "channelId",
                                    "value": "={{ $('getHubspotMessage').item.json.channelId }}"
                              },
                              {
                                    "name": "channelAccountId",
                                    "value": "={{ $('getHubspotMessage').item.json.channelAccountId }}"
                              },
                              {
                                    "name": "text",
                                    "value": "{{ $json.data[0].content[0].text.value }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "hubspotAppToken"
            },
            "credentials": {
                  "hubspotAppToken": {
                        "id": "56nluFhXiGjYN1EY",
                        "name": "HubSpot App Token tinder"
                  },
                  "hubspotOAuth2Api": {
                        "id": "y6819fYl4TsW9gl6",
                        "name": "HubSpot account 6"
                  },
                  "hubspotDeveloperApi": {
                        "id": "dHB9nVcnZTqf2JDX",
                        "name": "HubSpot Developer account"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "6facd7e9-5cbd-4eb7-ab22-84b4fbf35885",
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "position": [
                  640,
                  600
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $('getHubspotMessage').item.json[\"senders\"][0][\"actorId\"] }}",
                                    "value2": "A-5721819",
                                    "operation": "notEqual"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9410bce8-3a2d-4852-acbd-8baa7ee4964d",
            "name": "Airtable",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  860,
                  600
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appGAPr0tOy8J0NXC",
                        "cachedResultUrl": "https://airtable.com/appGAPr0tOy8J0NXC",
                        "cachedResultName": "Hubspot Conversations ChatGPT"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbljZ0POq35jgnKES",
                        "cachedResultUrl": "https://airtable.com/appGAPr0tOy8J0NXC/tbljZ0POq35jgnKES",
                        "cachedResultName": "Conversations"
                  },
                  "options": {},
                  "operation": "search",
                  "filterByFormula": "={Hubspot Thread ID}=\"{{ $json.conversationsThreadId }}\""
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Ha1BL7JqKQIwX3H1",
                        "name": "Hubspot Conversations Makeitfuture Management"
                  }
            },
            "typeVersion": 2,
            "alwaysOutputData": true
      },
      {
            "id": "06449687-7521-4151-89c5-050a2768af13",
            "name": "IF1",
            "type": "n8n-nodes-base.if",
            "position": [
                  1040,
                  640
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $('Airtable').item.json.id }}",
                                    "operation": "isEmpty"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "65c3015e-760f-41e8-9d18-05492cf908c8",
            "name": "createThread",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1440,
                  420
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appGAPr0tOy8J0NXC",
                        "cachedResultUrl": "https://airtable.com/appGAPr0tOy8J0NXC",
                        "cachedResultName": "Hubspot Conversations ChatGPT"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbljZ0POq35jgnKES",
                        "cachedResultUrl": "https://airtable.com/appGAPr0tOy8J0NXC/tbljZ0POq35jgnKES",
                        "cachedResultName": "Conversations"
                  },
                  "columns": {
                        "value": {
                              "OpenAI Thread ID": "={{ $json[\"id\"] }}",
                              "Hubspot Thread ID": "={{ $('getHubspotMessage').item.json.conversationsThreadId }}"
                        },
                        "schema": [
                              {
                                    "id": "Hubspot Thread ID",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Hubspot Thread ID",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "OpenAI Thread ID",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "OpenAI Thread ID",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {},
                  "operation": "create"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Ha1BL7JqKQIwX3H1",
                        "name": "Hubspot Conversations Makeitfuture Management"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "14cd4854-34fa-4a40-8bd2-cce2d9da9571",
            "name": "OpenAI Run1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  780
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('Airtable').item.json[\"OpenAI Thread ID\"] }}/runs",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"assistant_id\": \"asst_MA71Jq0SElVpdjmJa212CTFd\"\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "openai-beta",
                                    "value": "assistants=v1"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 4.1,
            "continueOnFail": true,
            "alwaysOutputData": false
      },
      {
            "id": "7c37641f-b0a4-4031-b289-3d6aed5a5bd6",
            "name": "IF2",
            "type": "n8n-nodes-base.if",
            "position": [
                  60,
                  600
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json[\"body\"][0][\"messageId\"] }}",
                                    "operation": "isNotEmpty"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "12744ebd-1d36-4f3c-9cbe-2ed7d18d37e3",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -200,
                  440
            ],
            "parameters": {
                  "width": 640.1970959824021,
                  "height": 428.68258455167785,
                  "content": "Watch for new message on the chatbot. \nThis can be triggered with [n8n chat widget](https://www.npmjs.com/package/@n8n/chat), hubspot or other chat services. \n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "9c200085-e9aa-4e11-93c2-da8184976229",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2480,
                  340
            ],
            "parameters": {
                  "width": 615.2010006500725,
                  "height": 279.76857176586907,
                  "content": "Post assistant Message back to chat service, in this case Hubspot"
            },
            "typeVersion": 1
      },
      {
            "id": "4458aafb-d280-46d0-ba54-3eb4ee746892",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1200,
                  300
            ],
            "parameters": {
                  "width": 636.6434938094908,
                  "height": 304.69360473583896,
                  "content": "Create a new Thread, save it to database and RUN"
            },
            "typeVersion": 1
      },
      {
            "id": "f13f45aa-47c9-4a76-a69c-f13f51d9434f",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  480,
                  440
            ],
            "parameters": {
                  "width": 328.9155262250898,
                  "height": 421.64797280574976,
                  "content": "UPDATE USER FILTER FOR DUPLICATION"
            },
            "typeVersion": 1
      },
      {
            "id": "ba0d0a2c-5014-44b8-a281-9d5014b78bcc",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  840,
                  440
            ],
            "parameters": {
                  "width": 328.9155262250898,
                  "height": 421.64797280574976,
                  "content": "Search for Thread ID in a database. \n\nThis database is maintaing references between messaging service thread id and OpenI Thread ID. "
            },
            "typeVersion": 1
      },
      {
            "id": "3d3562b5-631f-405c-b671-6856214f167f",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1200,
                  680
            ],
            "parameters": {
                  "width": 636.6434938094908,
                  "height": 304.69360473583896,
                  "content": "POST a new message to existing thread."
            },
            "typeVersion": 1
      },
      {
            "id": "9ad1622c-5b42-4279-bf16-edf7bcbb5155",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1900,
                  320
            ],
            "parameters": {
                  "width": 393.4831089305742,
                  "height": 629.4777449641093,
                  "content": "Get Run Status:\nIf still in progress, run again. \nIf action needed go to respective action.\nIf Completed, post message."
            },
            "typeVersion": 1
      },
      {
            "id": "e51965ef-7694-41b3-9c9a-9f78c00af3f3",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2538.191410231545,
                  840
            ],
            "parameters": {
                  "width": 1361.867818730004,
                  "height": 731.995091888263,
                  "content": "Run required actions based on Assistant answer and respond to Assistant with the function answer. \n\nEach route is a function that you need to define inside your assistant configuration.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "706fb261-724e-4c22-8def-24a320d213a2",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1280,
                  780
            ],
            "parameters": {
                  "text": "={{ $('getHubspotMessage').item.json[\"text\"] }}",
                  "prompt": "define",
                  "options": {
                        "baseURL": "https://api.openai.com/v1/threads/{{ $('Airtable').item.json[\"OpenAI Thread ID\"] }}/messages"
                  },
                  "resource": "assistant",
                  "assistantId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "asst_wVbEcnRttQ8K65DOV0fk1DJU",
                        "cachedResultName": "Lista Firma Agent"
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "sCh1Lrc1ZT8NVcgn",
                        "name": "OpenAi Makeitfuture.eu"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "b8f686cc-33d6-4e99-987c-d1f91864e81d",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -160,
                  600
            ],
            "webhookId": "637d5b46-b35f-4943-92a2-864ddce170f4",
            "parameters": {
                  "path": "hubspot-tinder",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 1
      }
],
    connections: {
      "IF": {
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
      "IF1": {
            "main": [
                  [
                        {
                              "node": "OpenAi Create Thread",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "IF2": {
            "main": [
                  [
                        {
                              "node": "getHubspotMessage",
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
                              "node": "Submit Data1",
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
                              "node": "Get Run",
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
                              "node": "Submit Data",
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
                              "node": "Get Run",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wait2": {
            "main": [
                  [
                        {
                              "node": "Get Run",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wait3": {
            "main": [
                  [
                        {
                              "node": "Get Run",
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
                              "node": "OpenAI Run1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Run": {
            "main": [
                  [
                        {
                              "node": "Completed, Action or Inprogress",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "IF2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Airtable": {
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
      "OpenAI Run": {
            "main": [
                  [
                        {
                              "node": "Get Run",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Run1": {
            "main": [
                  [
                        {
                              "node": "Get Run",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Submit Data": {
            "main": [
                  [
                        {
                              "node": "Wait2",
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
                              "node": "Code1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Submit Data1": {
            "main": [
                  [
                        {
                              "node": "Wait3",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "createThread": {
            "main": [
                  [
                        {
                              "node": "OpenAI Run",
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
                              "node": "Code",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Select Function": {
            "main": [
                  [
                        {
                              "node": "HTTP Request",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "HTTP Request1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Last Message": {
            "main": [
                  [
                        {
                              "node": "respondHubspotMessage1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "getHubspotMessage": {
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
      "OpenAi Create Thread": {
            "main": [
                  [
                        {
                              "node": "createThread",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Completed, Action or Inprogress": {
            "main": [
                  [
                        {
                              "node": "Get Last Message",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Select Function",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Wait1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Wait",
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

export function AirtableCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-600' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-md'}`}
    >
      <Database className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
      <span className="truncate max-w-[200px]">Airtable</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {airtableTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function AirtableTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {airtableTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-blue-50/50 dark:group-hover:to-blue-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-blue-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Database className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
