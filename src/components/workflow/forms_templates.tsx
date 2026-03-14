import React from 'react';
import { Play, ClipboardList } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const formsTemplates: IN8nTemplate[] = [
  {
    name: "Conversational Interviews With AI Agents And N8n Forms",
    nodes: [
      {
            "id": "d73e5113-119f-4e62-9872-48e6a971d760",
            "name": "Stop Interview?",
            "type": "n8n-nodes-base.if",
            "position": [
                  3380,
                  920
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
                                    "id": "3cf788a6-94d0-4223-9caa-30b8e4df8e01",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.output.stop_interview }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "cda3c487-97fa-4037-b9a0-0802f4a02727",
            "name": "Generate Row",
            "type": "n8n-nodes-base.set",
            "position": [
                  3740,
                  1200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "06146a75-b67a-42cf-aa6f-241f23c47b9a",
                                    "name": "timestamp",
                                    "type": "string",
                                    "value": "={{ $now.toISO() }}"
                              },
                              {
                                    "id": "b0278c64-58a7-487d-b7ba-d102fb5d4a0c",
                                    "name": "type",
                                    "type": "string",
                                    "value": "next_question"
                              },
                              {
                                    "id": "ba034ca1-408e-422f-b071-dab0ef12fb48",
                                    "name": "question",
                                    "type": "string",
                                    "value": "={{ $('Parse Response').item.json.output.question }}"
                              },
                              {
                                    "id": "a2231f6e-f507-408e-b598-53888cf8d4b5",
                                    "name": "answer",
                                    "type": "string",
                                    "value": "={{ $('Get Answer').item.json.answer }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "3486f9ae-6a19-4f1f-be46-15376053e71f",
            "name": "Generate Row1",
            "type": "n8n-nodes-base.set",
            "position": [
                  3580,
                  760
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "06146a75-b67a-42cf-aa6f-241f23c47b9a",
                                    "name": "timestamp",
                                    "type": "string",
                                    "value": "={{ $now.toISO() }}"
                              },
                              {
                                    "id": "b0278c64-58a7-487d-b7ba-d102fb5d4a0c",
                                    "name": "type",
                                    "type": "string",
                                    "value": "stop_interview"
                              },
                              {
                                    "id": "ba034ca1-408e-422f-b071-dab0ef12fb48",
                                    "name": "question",
                                    "type": "string",
                                    "value": "=None"
                              },
                              {
                                    "id": "a2231f6e-f507-408e-b598-53888cf8d4b5",
                                    "name": "answer",
                                    "type": "string",
                                    "value": "=None"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "a0e5d40d-e956-4ded-891f-ce5d0f55935f",
            "name": "Clear For Next Interview",
            "type": "@n8n/n8n-nodes-langchain.memoryManager",
            "position": [
                  3900,
                  760
            ],
            "parameters": {
                  "mode": "delete",
                  "deleteMode": "all"
            },
            "typeVersion": 1.1
      },
      {
            "id": "66a33fcb-a902-4159-a025-2dff426c1fce",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2580,
                  860
            ],
            "parameters": {
                  "width": 180,
                  "height": 260,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Set Interview Topic Here!"
            },
            "typeVersion": 1
      },
      {
            "id": "5cfb7114-a773-4c76-bb3b-7c004be5f799",
            "name": "Send Reply To Agent",
            "type": "n8n-nodes-base.set",
            "position": [
                  4060,
                  1200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "06a9c730-4756-4bc8-a394-6ff249cf7117",
                                    "name": "answer",
                                    "type": "string",
                                    "value": "={{ $('Get Answer').item.json.answer }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "aa30c462-7dfa-40a7-8e63-bed29b30213c",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1880,
                  1060
            ],
            "parameters": {
                  "color": 7,
                  "width": 490,
                  "height": 220,
                  "content": "## 1. Setup Interview\n[Learn more about the form trigger node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger)\n\nThe form trigger node will be our entry point into this workflow and to start, we'll just ask for the user's name to start the interview.\nOur session storage will be using Redis via Upstash.com (you can use regular redis btw!) - whichever way, this ensures a highly scalable system able to handle many users."
            },
            "typeVersion": 1
      },
      {
            "id": "5353a7c8-d0e4-429a-ab68-c54d9b845a43",
            "name": "Start Interview",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  1880,
                  880
            ],
            "webhookId": "8d849295-ed30-41ab-a17c-464227cec8fb",
            "parameters": {
                  "options": {
                        "path": "driving-lessons-survey",
                        "ignoreBots": true,
                        "buttonLabel": "Begin Interview!",
                        "appendAttribution": true,
                        "useWorkflowTimezone": true
                  },
                  "formTitle": "=UK Practical Driving Test Satisfaction Interview",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "What is your name?",
                                    "placeholder": "ie. Sam Smith",
                                    "requiredField": true
                              }
                        ]
                  },
                  "responseMode": "lastNode",
                  "formDescription": "=Thanks for taking part in our Interview. You will be presented with an unending series of questions to help us with your experiences in preparing for and taking the UK Practical Driving Test.\n\nThe interviewer is an AI agent and the questions are dynamically generated. When you're done with answer, simple say STOP to exit the interview. Sessions are deleted after 24 hours."
            },
            "typeVersion": 2.2
      },
      {
            "id": "c88a829f-c4b4-4ad4-b121-32b15fae9980",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2840,
                  600
            ],
            "parameters": {
                  "color": 7,
                  "width": 614,
                  "height": 280,
                  "content": "## 2. AI Researcher for Endless Interview Questions\n[Learn more about the AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)\n\nAn AI interviewer is an interesting take on a role traditionally understood as expensive and time-consuming - both in preparation and execution. What if this could be handed off to an AI/LLM, which could perform when it suits the interviewee and ask a never-ending list of open and follow-on questions for deeper insights?\n\nThis is what this AI researcher agent is designed to do! Upon activation, a loop is created where the agent generates the question and the user answers via the form node. This continues until the user asks to stop the interview."
            },
            "typeVersion": 1
      },
      {
            "id": "10e5dbe0-0163-4c21-8811-9ce9a2a5063b",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3580,
                  1380
            ],
            "parameters": {
                  "color": 7,
                  "width": 580,
                  "height": 202,
                  "content": "## 3. Record Answers and Prep for Next Question\n[Learn more about the n8n Form node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form/)\n\nThe interview is no good if we can't record the answers somewhere for later analysis! Using n8n form node to capture the answer, we can simple push our new question and answer pair to our Redis session to build our transcript before continuing the loop with the agent."
            },
            "typeVersion": 1
      },
      {
            "id": "0a0cc961-d364-40d2-9ece-cef7d17c4b45",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3820,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 528,
                  "height": 253,
                  "content": "## 4. Graciously End the Interview\n[Read more about the Chat Manager node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager/)\n\nOnce the AI/LLM detects the user wishes to end the interview (which is done by the user explicitly saying in the form), then the loop breaks and we conclude the interview session and displaying the confirmation screen.\n\nFor this demo, I've created a special confirmation screen which also displays the transcript. This is done by redirecting to a webhook URL. If you don't need this, feel free to change this to \"show completion screen\" instead.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "279d9a67-1d3b-4ffe-a152-33164ef9e2c8",
            "name": "Get Answer",
            "type": "n8n-nodes-base.form",
            "position": [
                  3580,
                  1200
            ],
            "webhookId": "d96bb88d-db84-4a68-8f02-bcff9cb8429e",
            "parameters": {
                  "options": {
                        "formTitle": "={{ $json.output.question }}",
                        "buttonLabel": "Next Question",
                        "formDescription": "Please answer the question or type \"stop interview\" to end the interview."
                  },
                  "formFields": {
                        "values": [
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "answer",
                                    "requiredField": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4e284505-afc3-4e3e-88c8-38021efbf3c1",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1280,
                  500
            ],
            "parameters": {
                  "width": 522.6976744186048,
                  "height": 787.6241860465118,
                  "content": "## Try it out! \n\n### Conducting user interviews have been traditionally difficult due to preparation, timing and execution costs. What if we let an AI/LLM do it instead?\n\nThis template enables automated AI/LLM powered user interviews using n8n forms and an AI agent where the question and answers are recorded in a google sheet for later analysis. A powerful tool for any researcher.\n\n### Check out the full showcase post here: https://community.n8n.io/t/build-your-own-ai-interview-agents-with-n8n-forms/62312\n\n### How it works\n* A form trigger is used to start the interview and a new session is created in redis to capture the transcript.\n* An AI agent is then tasked to ask questions to the user regarding the topic of the interview. This is setup as a loop so the questions never stop unless the user wishes to end the interview.\n* Each answer is recorded in our session set up earlier between questions.\n* Finally, when the user requests to end the interview we break the loop and show the interview completion screen.\n\n### Why Redis?\nRedis is a fast key-value datastore which makes it ideal for sessions. This ensures the interview flow stays snappy between questions. For my live demo, I used Upstash.com which has a generous free tier.\n\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!\n"
            },
            "typeVersion": 1
      },
      {
            "id": "ff37e943-851f-4ea7-bcab-b33150881b72",
            "name": "Set Interview Topic",
            "type": "n8n-nodes-base.set",
            "position": [
                  2620,
                  880
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "386f91e1-cc3e-4912-84e3-5ecdbf5412c8",
                                    "name": "answer",
                                    "type": "string",
                                    "value": "=Hello, my name is {{ $('Start Interview').first().json['What is your name?'] }}"
                              },
                              {
                                    "id": "492d5ecc-4e76-4297-b8a7-9ca4f801c855",
                                    "name": "interview_topic",
                                    "type": "string",
                                    "value": "Your experience preparing for and taking the UK practical driving test"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "446937bc-a599-4184-b52e-be0607d62d94",
            "name": "UUID",
            "type": "n8n-nodes-base.crypto",
            "position": [
                  2020,
                  880
            ],
            "parameters": {
                  "action": "generate"
            },
            "typeVersion": 1
      },
      {
            "id": "da94c22a-4b26-4898-bde8-b57b5bf01f15",
            "name": "Generate Row2",
            "type": "n8n-nodes-base.set",
            "position": [
                  2300,
                  880
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "06146a75-b67a-42cf-aa6f-241f23c47b9a",
                                    "name": "timestamp",
                                    "type": "string",
                                    "value": "={{ $now.toISO() }}"
                              },
                              {
                                    "id": "b0278c64-58a7-487d-b7ba-d102fb5d4a0c",
                                    "name": "type",
                                    "type": "string",
                                    "value": "start_interview"
                              },
                              {
                                    "id": "ba034ca1-408e-422f-b071-dab0ef12fb48",
                                    "name": "question",
                                    "type": "string",
                                    "value": "=What is your name?"
                              },
                              {
                                    "id": "a2231f6e-f507-408e-b598-53888cf8d4b5",
                                    "name": "answer",
                                    "type": "string",
                                    "value": "={{ $('Start Interview').first().json['What is your name?'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "9aba23d7-04af-4478-b39b-417f0917597d",
            "name": "Create Session",
            "type": "n8n-nodes-base.redis",
            "position": [
                  2160,
                  880
            ],
            "parameters": {
                  "key": "=session_{{ $('UUID').item.json.data }}",
                  "ttl": "={{ 60 * 60 * 24 }}",
                  "value": "={{ [] }}",
                  "expire": true,
                  "keyType": "list",
                  "operation": "set"
            },
            "credentials": {
                  "redis": {
                        "id": "AbPH1yYQ924bVUqm",
                        "name": "Upstash (ai interviewer)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "217c9866-a162-41c6-b123-189869a6cb58",
            "name": "Update Session",
            "type": "n8n-nodes-base.redis",
            "position": [
                  2440,
                  880
            ],
            "parameters": {
                  "list": "=session_{{ $('UUID').first().json.data }}",
                  "tail": true,
                  "operation": "push",
                  "messageData": "={{ $json.toJsonString() }}"
            },
            "credentials": {
                  "redis": {
                        "id": "AbPH1yYQ924bVUqm",
                        "name": "Upstash (ai interviewer)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "95e8b7c4-4f27-49f3-b509-5238c0f7bd5d",
            "name": "Update Session1",
            "type": "n8n-nodes-base.redis",
            "position": [
                  3900,
                  1200
            ],
            "parameters": {
                  "list": "=session_{{ $('UUID').first().json.data }}",
                  "tail": true,
                  "operation": "push",
                  "messageData": "={{ $json.toJsonString() }}"
            },
            "credentials": {
                  "redis": {
                        "id": "AbPH1yYQ924bVUqm",
                        "name": "Upstash (ai interviewer)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "afaa55dd-844e-4bf3-8a31-3a0953caaf69",
            "name": "Update Session2",
            "type": "n8n-nodes-base.redis",
            "position": [
                  3740,
                  760
            ],
            "parameters": {
                  "list": "=session_{{ $('UUID').first().json.data }}",
                  "tail": true,
                  "operation": "push",
                  "messageData": "={{ $json.toJsonString() }}"
            },
            "credentials": {
                  "redis": {
                        "id": "AbPH1yYQ924bVUqm",
                        "name": "Upstash (ai interviewer)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c381d598-1902-4789-ac15-65ac2124fbdd",
            "name": "Valid Session?",
            "type": "n8n-nodes-base.if",
            "position": [
                  5080,
                  1240
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
                                    "id": "500d6ca9-2a04-40f0-98e8-aa4290e6a30d",
                                    "operator": {
                                          "type": "array",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.data }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "f26ccdaa-4f94-4acb-894b-341648aee8b0",
            "name": "Respond to Webhook",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  5440,
                  1240
            ],
            "parameters": {
                  "options": {
                        "responseCode": 200,
                        "responseHeaders": {
                              "entries": [
                                    {
                                          "name": "Content-Type",
                                          "value": "text/html"
                                    }
                              ]
                        }
                  },
                  "respondWith": "text",
                  "responseBody": "={{ $json.html }}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "09a05dc6-4a21-4df0-a83d-5e1b986090f8",
            "name": "Window Buffer Memory2",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  3000,
                  1120
            ],
            "parameters": {
                  "sessionKey": "={{ $('UUID').first().json.data }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "26f87c7d-9e2c-41e8-b7eb-3c249a69f905",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  3900,
                  920
            ],
            "parameters": {
                  "sessionKey": "={{ $('UUID').first().json.data }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "ab891c71-af03-49c9-b281-d0058374260b",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4180,
                  740
            ],
            "parameters": {
                  "width": 276.4353488372094,
                  "height": 320.31553488372094,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Set Your Webhook URL here!\nFor this demo, we want to show a customised completion screen with transcript so it's necessary to redirect to a webhook (see step 6)."
            },
            "typeVersion": 1
      },
      {
            "id": "7a063851-1bea-4e34-897c-4038d08b845e",
            "name": "Redirect to Completion Screen",
            "type": "n8n-nodes-base.form",
            "position": [
                  4260,
                  760
            ],
            "webhookId": "9fdedf1b-e413-4fc3-94a4-9cc24bffff8a",
            "parameters": {
                  "operation": "completion",
                  "redirectUrl": "=https://<host>/webhook/<uuid-if-using-n8n-cloud>/ai-interview-transcripts/{{ $('UUID').first().json.data }}",
                  "respondWith": "redirect"
            },
            "typeVersion": 1
      },
      {
            "id": "b67b3fa5-faf6-402b-9b9e-c783869770ca",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4640,
                  1220
            ],
            "parameters": {
                  "color": 5,
                  "width": 236.3564651162793,
                  "height": 345.82027906976737,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 This is the webhook we want to redirect to!\nIf you're on n8n cloud, you may want to copy the webhook url generated here and use it as the form ending's redirect url."
            },
            "typeVersion": 1
      },
      {
            "id": "583d1572-2d6f-4ca4-9e31-33dc1481e87a",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4580,
                  980
            ],
            "parameters": {
                  "color": 7,
                  "width": 588,
                  "height": 207,
                  "content": "## 6. Display the Transcript\n[Read more about the Webhook Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook)\n\nThis step is totally optional. For a nicer user experience, I use this webhook mini-flow to display the user's transcript for the completion screen. It works by capturing the session_id in the webhook's url and searching for it in our redis database. If a match is found the transcript is fetched and rendered into a webpage using the HTML node and returned to the user. If no match is found, a 404 message is displayed instead."
            },
            "typeVersion": 1
      },
      {
            "id": "5fcf86b9-3fa3-48f5-a4a4-a1e261a48b49",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  4700,
                  1240
            ],
            "webhookId": "78df12c4-ccd0-46dd-be0d-4445c2bd04f2",
            "parameters": {
                  "path": "ai-interview-transcripts/:session_id",
                  "options": {
                        "ignoreBots": true
                  },
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "6df57307-feef-4be5-861d-fdc0b92d1ef6",
            "name": "404 Not Found",
            "type": "n8n-nodes-base.html",
            "position": [
                  5260,
                  1320
            ],
            "parameters": {
                  "html": "\n<html lang='en'>\n\n\t<head>\n\t\t<meta charset='UTF-8' />\n\t\t<meta name='viewport' content='width=device-width, initial-scale=1.0' />\n\t\t<link rel='icon' type='image/png' href='https://n8n.io/favicon.ico' />\n\t\t<link\n\t\t\thref='https://fonts.googleapis.com/css?family=Open+Sans'\n\t\t\trel='stylesheet'\n\t\t\ttype='text/css'\n\t\t/>\n\n\t\t<title>Driving Practice Test 2024 Survey</title>\n\n\t\t<style>\n\t\t\t*, ::after, ::before { box-sizing: border-box; margin: 0; padding: 0; } body { font-family:\n\t\t\tOpen Sans, sans-serif; font-weight: 400; font-size: 12px; display: flex; flex-direction:\n\t\t\tcolumn; justify-content: start; background-color: #FBFCFE; } .container { margin: auto;\n\t\t\ttext-align: center; padding-top: 24px; width: 448px; } .card { padding: 24px;\n\t\t\tbackground-color: white; border: 1px solid #DBDFE7; border-radius: 8px; box-shadow: 0px 4px\n\t\t\t16px 0px #634DFF0F; margin-bottom: 16px; } .n8n-link a { color: #7E8186; font-weight: 600;\n\t\t\tfont-size: 12px; text-decoration: none; } .n8n-link svg { display: inline-block;\n\t\t\tvertical-align: middle; } .header h1 { color: #525356; font-size: 20px; font-weight: 400;\n\t\t\tpadding-bottom: 8px; } .header p { color: #7E8186; font-size: 14px; font-weight: 400; }\n\t\t</style>\n\t</head>\n\n\t<body>\n\t\t<div class='container'>\n\t\t\t<section>\n\t\t\t\t<div class='card'>\n\t\t\t\t\t<div class='header'>\n\t\t\t\t\t\t<h1>404 Not Found</h1>\n\t\t\t\t\t\t<p>The requested session does not exist.</p>\n <p>Your session may have expired.</p>\n </div>\n\t\t\t\t</div>\n\t\t\t\t\t<div class='n8n-link'>\n\t\t\t\t\t\t<a href=\"https://n8n.partnerlinks.io/ee7izbliiw0n\" target='_blank'>\n\t\t\t\t\t\t\tForm automated with\n\t\t\t\t\t\t\t<svg\n\t\t\t\t\t\t\t\twidth='73'\n\t\t\t\t\t\t\t\theight='20'\n\t\t\t\t\t\t\t\tviewBox='0 0 73 20'\n\t\t\t\t\t\t\t\tfill='none'\n\t\t\t\t\t\t\t\txmlns='http://www.w3.org/2000/svg'\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\tfill-rule='evenodd'\n\t\t\t\t\t\t\t\t\tclip-rule='evenodd'\n\t\t\t\t\t\t\t\t\td='M40.2373 4C40.2373 6.20915 38.4464 8 36.2373 8C34.3735 8 32.8074 6.72525 32.3633 5H26.7787C25.801 5 24.9666 5.70685 24.8059 6.6712L24.6415 7.6576C24.4854 8.59415 24.0116 9.40925 23.3417 10C24.0116 10.5907 24.4854 11.4058 24.6415 12.3424L24.8059 13.3288C24.9666 14.2931 25.801 15 26.7787 15H28.3633C28.8074 13.2747 30.3735 12 32.2373 12C34.4464 12 36.2373 13.7908 36.2373 16C36.2373 18.2092 34.4464 20 32.2373 20C30.3735 20 28.8074 18.7253 28.3633 17H26.7787C24.8233 17 23.1546 15.5864 22.8331 13.6576L22.6687 12.6712C22.508 11.7069 21.6736 11 20.6959 11H19.0645C18.5652 12.64 17.0406 13.8334 15.2373 13.8334C13.434 13.8334 11.9094 12.64 11.4101 11H9.06449C8.56519 12.64 7.04059 13.8334 5.2373 13.8334C3.02817 13.8334 1.2373 12.0424 1.2373 9.83335C1.2373 7.6242 3.02817 5.83335 5.2373 5.83335C7.16069 5.83335 8.76699 7.19085 9.15039 9H11.3242C11.7076 7.19085 13.3139 5.83335 15.2373 5.83335C17.1607 5.83335 18.767 7.19085 19.1504 9H20.6959C21.6736 9 22.508 8.29315 22.6687 7.3288L22.8331 6.3424C23.1546 4.41365 24.8233 3 26.7787 3H32.3633C32.8074 1.27478 34.3735 0 36.2373 0C38.4464 0 40.2373 1.79086 40.2373 4ZM38.2373 4C38.2373 5.10455 37.3419 6 36.2373 6C35.1327 6 34.2373 5.10455 34.2373 4C34.2373 2.89543 35.1327 2 36.2373 2C37.3419 2 38.2373 2.89543 38.2373 4ZM5.2373 11.8334C6.34189 11.8334 7.23729 10.9379 7.23729 9.83335C7.23729 8.72875 6.34189 7.83335 5.2373 7.83335C4.13273 7.83335 3.2373 8.72875 3.2373 9.83335C3.2373 10.9379 4.13273 11.8334 5.2373 11.8334ZM15.2373 11.8334C16.3419 11.8334 17.2373 10.9379 17.2373 9.83335C17.2373 8.72875 16.3419 7.83335 15.2373 7.83335C14.1327 7.83335 13.2373 8.72875 13.2373 9.83335C13.2373 10.9379 14.1327 11.8334 15.2373 11.8334ZM32.2373 18C33.3419 18 34.2373 17.1045 34.2373 16C34.2373 14.8954 33.3419 14 32.2373 14C31.1327 14 30.2373 14.8954 30.2373 16C30.2373 17.1045 31.1327 18 32.2373 18Z'\n\t\t\t\t\t\t\t\t\tfill='#EA4B71'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td='M44.2393 15.0007H46.3277V10.5791C46.3277 9.12704 47.2088 8.49074 48.204 8.49074C49.183 8.49074 49.9498 9.14334 49.9498 10.4812V15.0007H52.038V10.057C52.038 7.91969 50.798 6.67969 48.8567 6.67969C47.633 6.67969 46.9477 7.16914 46.4582 7.80544H46.3277L46.1482 6.84284H44.2393V15.0007Z'\n\t\t\t\t\t\t\t\t\tfill='#101330'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td='M60.0318 9.50205V9.40415C60.7498 9.0452 61.4678 8.4252 61.4678 7.20155C61.4678 5.43945 60.0153 4.37891 58.0088 4.37891C55.9528 4.37891 54.4843 5.5047 54.4843 7.23415C54.4843 8.4089 55.1698 9.0452 55.9203 9.40415V9.50205C55.0883 9.79575 54.0928 10.6768 54.0928 12.1452C54.0928 13.9237 55.5613 15.1637 57.9923 15.1637C60.4233 15.1637 61.8428 13.9237 61.8428 12.1452C61.8428 10.6768 60.8638 9.81205 60.0318 9.50205ZM57.9923 5.87995C58.8083 5.87995 59.4118 6.40205 59.4118 7.2831C59.4118 8.16415 58.7918 8.6863 57.9923 8.6863C57.1928 8.6863 56.5238 8.16415 56.5238 7.2831C56.5238 6.38575 57.1603 5.87995 57.9923 5.87995ZM57.9923 13.5974C57.0458 13.5974 56.2793 12.9937 56.2793 11.9658C56.2793 11.0358 56.9153 10.3342 57.9758 10.3342C59.0203 10.3342 59.6568 11.0195 59.6568 11.9984C59.6568 12.9937 58.9223 13.5974 57.9923 13.5974Z'\n\t\t\t\t\t\t\t\t\tfill='#101330'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td='M63.9639 15.0007H66.0524V10.5791C66.0524 9.12704 66.9334 8.49074 67.9289 8.49074C68.9079 8.49074 69.6744 9.14334 69.6744 10.4812V15.0007H71.7629V10.057C71.7629 7.91969 70.5229 6.67969 68.5814 6.67969C67.3579 6.67969 66.6724 7.16914 66.1829 7.80544H66.0524L65.8729 6.84284H63.9639V15.0007Z'\n\t\t\t\t\t\t\t\t\tfill='#101330'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</body>\n\n</html>"
            },
            "typeVersion": 1.2
      },
      {
            "id": "0e968154-ead5-4194-834e-0d1175e7c1d9",
            "name": "AI Researcher",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2900,
                  920
            ],
            "parameters": {
                  "text": "={{ $json.answer }}",
                  "options": {
                        "systemMessage": "=You are a user research expert interviewing a user on the topic of \"{{ $('Set Interview Topic').first().json.interview_topic }}\".\n\n* Your task is to ask open-ended questions relevant to the interview topic.\n* Ask only one question at a time. Analyse the previous question and ask new question each time. If there is an opportunity to dig deeper into a previous answer, do so but limit to 1 follow-on question.\n* Keep asking questions until the user requests to stop the interview. When the user requests to stop the interview and no question is required, \"question\" is an empty string.\n* Use a friendly and polite tone when asking questions.\n* If the user answers are inrelevant to the question, ask the question again or move on to another question.\n* If the user's answer is beyond the scope of the interview, ignore the answer and ask if the user would like to stop the interview.\n*You must format your response using the following json schema as we require pre processing before responding to the user.\n```\n{\n \"type\":\"object\",\n \"properties\": {\n \"stop_interview\": { \"type\": \"boolean\" },\n \"question\": { \"type\": [\"string\", \"null\"] }\n }\n}\n```\n* Output only the json object and do not prefix or suffix the message with extraneous text."
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "969d4094-1046-4f53-bf8b-5ae7e50bd3ed",
            "name": "Parse Response",
            "type": "n8n-nodes-base.set",
            "position": [
                  3220,
                  920
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "bf61134c-e24c-453e-97ef-5edd25726148",
                                    "name": "output",
                                    "type": "object",
                                    "value": "={{\n$json.output\n .replace('```json', '')\n .replace('```', '')\n .parseJson()\n}}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "323b73c4-8c77-48a9-a549-f3e863ba72c2",
            "name": "Groq Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
            "position": [
                  2860,
                  1120
            ],
            "parameters": {
                  "model": "llama-3.2-90b-text-preview",
                  "options": {}
            },
            "credentials": {
                  "groqApi": {
                        "id": "YQVoV5K9FREww7t1",
                        "name": "Groq account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "bf4518c4-8e59-450e-be5a-92f31cf38528",
            "name": "Show Transcript",
            "type": "n8n-nodes-base.html",
            "position": [
                  5260,
                  1140
            ],
            "parameters": {
                  "html": "\n<html lang='en'>\n\n\t<head>\n\t\t<meta charset='UTF-8' />\n\t\t<meta name='viewport' content='width=device-width, initial-scale=1.0' />\n\t\t<link rel='icon' type='image/png' href='https://n8n.io/favicon.ico' />\n\t\t<link\n\t\t\thref='https://fonts.googleapis.com/css?family=Open+Sans'\n\t\t\trel='stylesheet'\n\t\t\ttype='text/css'\n\t\t/>\n\n\t\t<title>AI Interviewer Transcripts</title>\n\n\t\t<style>\n\t\t\t*, ::after, ::before { box-sizing: border-box; margin: 0; padding: 0; } body { font-family:\n\t\t\tOpen Sans, sans-serif; font-weight: 400; font-size: 12px; display: flex; flex-direction:\n\t\t\tcolumn; justify-content: start; background-color: #FBFCFE; } .container { margin: auto;\n\t\t\ttext-align: center; padding-top: 24px; width: 448px; } .card { padding: 24px;\n\t\t\tbackground-color: white; border: 1px solid #DBDFE7; border-radius: 8px; box-shadow: 0px 4px\n\t\t\t16px 0px #634DFF0F; margin-bottom: 16px; } .n8n-link a { color: #7E8186; font-weight: 600;\n\t\t\tfont-size: 12px; text-decoration: none; } .n8n-link svg { display: inline-block;\n\t\t\tvertical-align: middle; } .header h1 { color: #525356; font-size: 20px; font-weight: 400;\n\t\t\tpadding-bottom: 8px; } .header p { color: #7E8186; font-size: 14px; font-weight: 400; }\n\t\t</style>\n\t</head>\n\n\t<body>\n\t\t<div class='container' style=\"width:640px\">\n\t\t\t<section>\n\t\t\t\t<div class='card'>\n\t\t\t\t\t<div class='header'>\n\t\t\t\t\t\t<h1>Thanks for Completing the Interview!</h1>\n\t\t\t\t\t\t<p style=\"margin-bottom:12px;\">If you liked this demo, <br/>please follow me on <a href=\"http://linkedin.com/in/jimleuk\" target=\"_blank\">http://linkedin.com/in/jimleuk</a> and\n <a href=\"https://x.com/jimle_uk\" target=\"_blank\">https://x.com/jimle_uk</a>\n </p>\n <p>\n <a href=\"https://n8n.partnerlinks.io/ee7izbliiw0n\" target=\"_blank\">\n Support my work! Sign up to n8n using this link 🙏\n </a>\n </p>\n </div>\n\t\t\t\t</div>\n <div class='card' >\n\t\t\t\t\t<div class='header'>\n\t\t\t\t\t\t<h1>Transcript</h1>\n <p style=\"color:#ccc;margin-bottom:24px;font-size:0.8rem\">This session is deleted within 24 hours.</p>\n {{\n $json.data\n .map(item => JSON.parse(item))\n .filter(item => item.type === 'next_question')\n .map(item => `\n <div style=\"display:flex;flex-direction:row;margin-bottom: 16px;\">\n <div style=\"width: 60px;padding-right: 5px;text-align: left;color: #ccc;\">\n ${DateTime.fromISO(item.timestamp).format('dd MMM, hh:mm')}\n </div>\n <div style=\"width:100%\">\n <div style=\"\n border: 1px solid #ccc;\n padding: 10px;\n border-radius: 5px;\n background-color: #f8f7f7;\n text-align: right;\n margin-bottom: 5px;\n\">${item.question}</div>\n <div style=\"\n border: 1px solid #c7ccec;\n padding: 10px;\n border-radius: 5px;\n background-color: #f5f5fc;\n text-align: left;\n color: #2e2e84;\n\">${item.answer}</div>\n </div>\n </div>\n `)\n .join('\\n')\n }}\n \t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\t<div class='n8n-link'>\n\t\t\t\t\t\t<a href=\"https://n8n.partnerlinks.io/ee7izbliiw0n\" target='_blank'>\n\t\t\t\t\t\t\tForm automated with\n\t\t\t\t\t\t\t<svg\n\t\t\t\t\t\t\t\twidth='73'\n\t\t\t\t\t\t\t\theight='20'\n\t\t\t\t\t\t\t\tviewBox='0 0 73 20'\n\t\t\t\t\t\t\t\tfill='none'\n\t\t\t\t\t\t\t\txmlns='http://www.w3.org/2000/svg'\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\tfill-rule='evenodd'\n\t\t\t\t\t\t\t\t\tclip-rule='evenodd'\n\t\t\t\t\t\t\t\t\td='M40.2373 4C40.2373 6.20915 38.4464 8 36.2373 8C34.3735 8 32.8074 6.72525 32.3633 5H26.7787C25.801 5 24.9666 5.70685 24.8059 6.6712L24.6415 7.6576C24.4854 8.59415 24.0116 9.40925 23.3417 10C24.0116 10.5907 24.4854 11.4058 24.6415 12.3424L24.8059 13.3288C24.9666 14.2931 25.801 15 26.7787 15H28.3633C28.8074 13.2747 30.3735 12 32.2373 12C34.4464 12 36.2373 13.7908 36.2373 16C36.2373 18.2092 34.4464 20 32.2373 20C30.3735 20 28.8074 18.7253 28.3633 17H26.7787C24.8233 17 23.1546 15.5864 22.8331 13.6576L22.6687 12.6712C22.508 11.7069 21.6736 11 20.6959 11H19.0645C18.5652 12.64 17.0406 13.8334 15.2373 13.8334C13.434 13.8334 11.9094 12.64 11.4101 11H9.06449C8.56519 12.64 7.04059 13.8334 5.2373 13.8334C3.02817 13.8334 1.2373 12.0424 1.2373 9.83335C1.2373 7.6242 3.02817 5.83335 5.2373 5.83335C7.16069 5.83335 8.76699 7.19085 9.15039 9H11.3242C11.7076 7.19085 13.3139 5.83335 15.2373 5.83335C17.1607 5.83335 18.767 7.19085 19.1504 9H20.6959C21.6736 9 22.508 8.29315 22.6687 7.3288L22.8331 6.3424C23.1546 4.41365 24.8233 3 26.7787 3H32.3633C32.8074 1.27478 34.3735 0 36.2373 0C38.4464 0 40.2373 1.79086 40.2373 4ZM38.2373 4C38.2373 5.10455 37.3419 6 36.2373 6C35.1327 6 34.2373 5.10455 34.2373 4C34.2373 2.89543 35.1327 2 36.2373 2C37.3419 2 38.2373 2.89543 38.2373 4ZM5.2373 11.8334C6.34189 11.8334 7.23729 10.9379 7.23729 9.83335C7.23729 8.72875 6.34189 7.83335 5.2373 7.83335C4.13273 7.83335 3.2373 8.72875 3.2373 9.83335C3.2373 10.9379 4.13273 11.8334 5.2373 11.8334ZM15.2373 11.8334C16.3419 11.8334 17.2373 10.9379 17.2373 9.83335C17.2373 8.72875 16.3419 7.83335 15.2373 7.83335C14.1327 7.83335 13.2373 8.72875 13.2373 9.83335C13.2373 10.9379 14.1327 11.8334 15.2373 11.8334ZM32.2373 18C33.3419 18 34.2373 17.1045 34.2373 16C34.2373 14.8954 33.3419 14 32.2373 14C31.1327 14 30.2373 14.8954 30.2373 16C30.2373 17.1045 31.1327 18 32.2373 18Z'\n\t\t\t\t\t\t\t\t\tfill='#EA4B71'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td='M44.2393 15.0007H46.3277V10.5791C46.3277 9.12704 47.2088 8.49074 48.204 8.49074C49.183 8.49074 49.9498 9.14334 49.9498 10.4812V15.0007H52.038V10.057C52.038 7.91969 50.798 6.67969 48.8567 6.67969C47.633 6.67969 46.9477 7.16914 46.4582 7.80544H46.3277L46.1482 6.84284H44.2393V15.0007Z'\n\t\t\t\t\t\t\t\t\tfill='#101330'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td='M60.0318 9.50205V9.40415C60.7498 9.0452 61.4678 8.4252 61.4678 7.20155C61.4678 5.43945 60.0153 4.37891 58.0088 4.37891C55.9528 4.37891 54.4843 5.5047 54.4843 7.23415C54.4843 8.4089 55.1698 9.0452 55.9203 9.40415V9.50205C55.0883 9.79575 54.0928 10.6768 54.0928 12.1452C54.0928 13.9237 55.5613 15.1637 57.9923 15.1637C60.4233 15.1637 61.8428 13.9237 61.8428 12.1452C61.8428 10.6768 60.8638 9.81205 60.0318 9.50205ZM57.9923 5.87995C58.8083 5.87995 59.4118 6.40205 59.4118 7.2831C59.4118 8.16415 58.7918 8.6863 57.9923 8.6863C57.1928 8.6863 56.5238 8.16415 56.5238 7.2831C56.5238 6.38575 57.1603 5.87995 57.9923 5.87995ZM57.9923 13.5974C57.0458 13.5974 56.2793 12.9937 56.2793 11.9658C56.2793 11.0358 56.9153 10.3342 57.9758 10.3342C59.0203 10.3342 59.6568 11.0195 59.6568 11.9984C59.6568 12.9937 58.9223 13.5974 57.9923 13.5974Z'\n\t\t\t\t\t\t\t\t\tfill='#101330'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\td='M63.9639 15.0007H66.0524V10.5791C66.0524 9.12704 66.9334 8.49074 67.9289 8.49074C68.9079 8.49074 69.6744 9.14334 69.6744 10.4812V15.0007H71.7629V10.057C71.7629 7.91969 70.5229 6.67969 68.5814 6.67969C67.3579 6.67969 66.6724 7.16914 66.1829 7.80544H66.0524L65.8729 6.84284H63.9639V15.0007Z'\n\t\t\t\t\t\t\t\t\tfill='#101330'\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</body>\n\n</html>"
            },
            "typeVersion": 1.2
      },
      {
            "id": "dff24e45-8e57-4dfc-8b65-9d315b406bd2",
            "name": "Save to Google Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  5040,
                  760
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "name": "{{ $('Start Interview').first().json['What is your name?'] }}",
                              "session_id": "={{ $('UUID').first().json.data }}"
                        },
                        "schema": [
                              {
                                    "id": "session_id",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "session_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "timestamp",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "timestamp",
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
                                    "id": "type",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "type",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "question",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "question",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "answer",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "answer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "autoMapInputData",
                        "matchingColumns": []
                  },
                  "options": {
                        "useAppend": true
                  },
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1695693704,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1wKjVdm7HeufJkHrUJn_bW9bFI_blm0laoI_jgXKDe0Q/edit#gid=1695693704",
                        "cachedResultName": "transcripts"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1wKjVdm7HeufJkHrUJn_bW9bFI_blm0laoI_jgXKDe0Q",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1wKjVdm7HeufJkHrUJn_bW9bFI_blm0laoI_jgXKDe0Q/edit?usp=drivesdk",
                        "cachedResultName": "AI Researcher with n8n Forms"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "FsFwFchwmgtBu5l7",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "8eb03a1c-02e4-4d49-bf68-bb148585828f",
            "name": "Session to List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  4700,
                  760
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "session"
            },
            "typeVersion": 1
      },
      {
            "id": "c594aa2b-a29d-42e4-8799-1c557d78932d",
            "name": "Messages To JSON",
            "type": "n8n-nodes-base.set",
            "position": [
                  4860,
                  760
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{\n{\n ...$json.session.parseJson(),\n session_id: `session_${$('UUID').first().json.data}`,\n name: $('Start Interview').first().json['What is your name?'],\n}\n}}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "106bd688-6ccc-4a6a-9b52-ee7187d9aebe",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4540,
                  420
            ],
            "parameters": {
                  "color": 7,
                  "width": 508,
                  "height": 293,
                  "content": "## 5. Save the Interview to Sheets\n[Read more about the Google Sheets node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)\n\nFor easier data-sharing, we can have the workflow upload the session messages into data analysis tools for our team members.\n\nFor this demo, Google Sheets is an easy option. We'll pull the entire session out of redis and upload the messages one by one to sheets.\n\n### Check out the example sheet here: https://docs.google.com/spreadsheets/d/1wKjVdm7HeufJkHrUJn_bW9bFI_blm0laoI_jgXKDe0Q/edit?usp=sharing"
            },
            "typeVersion": 1
      },
      {
            "id": "b7754724-7473-4245-8b54-85c370a2b1be",
            "name": "Query By Session",
            "type": "n8n-nodes-base.redis",
            "position": [
                  4920,
                  1240
            ],
            "parameters": {
                  "key": "=session_{{ $('Webhook').first().json.params.session_id }}",
                  "options": {},
                  "operation": "get",
                  "propertyName": "data"
            },
            "credentials": {
                  "redis": {
                        "id": "AbPH1yYQ924bVUqm",
                        "name": "Upstash (ai interviewer)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4b6a0db6-1d33-4ed3-a955-7562e0dba1f0",
            "name": "Get Session",
            "type": "n8n-nodes-base.redis",
            "position": [
                  4540,
                  760
            ],
            "parameters": {
                  "key": "=session_{{ $('UUID').first().json.data }}",
                  "keyType": "list",
                  "options": {},
                  "operation": "get",
                  "propertyName": "session"
            },
            "credentials": {
                  "redis": {
                        "id": "AbPH1yYQ924bVUqm",
                        "name": "Upstash (ai interviewer)"
                  }
            },
            "executeOnce": true,
            "typeVersion": 1
      }
],
    connections: {
      "UUID": {
            "main": [
                  [
                        {
                              "node": "Create Session",
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
                              "node": "Query By Session",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Answer": {
            "main": [
                  [
                        {
                              "node": "Generate Row",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Session": {
            "main": [
                  [
                        {
                              "node": "Session to List",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Row": {
            "main": [
                  [
                        {
                              "node": "Update Session1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "404 Not Found": {
            "main": [
                  [
                        {
                              "node": "Respond to Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "AI Researcher": {
            "main": [
                  [
                        {
                              "node": "Parse Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Row1": {
            "main": [
                  [
                        {
                              "node": "Update Session2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Row2": {
            "main": [
                  [
                        {
                              "node": "Update Session",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Session": {
            "main": [
                  [
                        {
                              "node": "Generate Row2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Parse Response": {
            "main": [
                  [
                        {
                              "node": "Stop Interview?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Session": {
            "main": [
                  [
                        {
                              "node": "Set Interview Topic",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Valid Session?": {
            "main": [
                  [
                        {
                              "node": "Show Transcript",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "404 Not Found",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Groq Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "AI Researcher",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Session to List": {
            "main": [
                  [
                        {
                              "node": "Messages To JSON",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Show Transcript": {
            "main": [
                  [
                        {
                              "node": "Respond to Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Start Interview": {
            "main": [
                  [
                        {
                              "node": "UUID",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Stop Interview?": {
            "main": [
                  [
                        {
                              "node": "Generate Row1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get Answer",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Session1": {
            "main": [
                  [
                        {
                              "node": "Send Reply To Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Session2": {
            "main": [
                  [
                        {
                              "node": "Clear For Next Interview",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Messages To JSON": {
            "main": [
                  [
                        {
                              "node": "Save to Google Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Query By Session": {
            "main": [
                  [
                        {
                              "node": "Valid Session?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Reply To Agent": {
            "main": [
                  [
                        {
                              "node": "AI Researcher",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Interview Topic": {
            "main": [
                  [
                        {
                              "node": "AI Researcher",
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
                              "node": "Clear For Next Interview",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Window Buffer Memory2": {
            "ai_memory": [
                  [
                        {
                              "node": "AI Researcher",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Clear For Next Interview": {
            "main": [
                  [
                        {
                              "node": "Redirect to Completion Screen",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Redirect to Completion Screen": {
            "main": [
                  [
                        {
                              "node": "Get Session",
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
    name: "Email Subscription Service With N8n Forms, Airtable And AI",
    nodes: [
      {
            "id": "4dd52c72-9a9b-4db4-8de5-5b12b1e5c4be",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  180,
                  1480
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
            "id": "9226181c-b84c-4ea1-a5b4-eedb6c62037b",
            "name": "Search daily",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  440,
                  1480
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appL3dptT6ZTSzY9v",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v",
                        "cachedResultName": "Scheduled Emails"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblzR9vSuFUzlQNMI",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v/tblzR9vSuFUzlQNMI",
                        "cachedResultName": "Table 1"
                  },
                  "options": {},
                  "operation": "search",
                  "filterByFormula": "AND({Status} = 'active', {Interval} = 'daily')"
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
            "id": "1a3b6224-2f66-41c6-8b3d-be286cf16370",
            "name": "Search weekly",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  440,
                  1660
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appL3dptT6ZTSzY9v",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v",
                        "cachedResultName": "Scheduled Emails"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblzR9vSuFUzlQNMI",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v/tblzR9vSuFUzlQNMI",
                        "cachedResultName": "Table 1"
                  },
                  "options": {},
                  "operation": "search",
                  "filterByFormula": "=AND(\n {Status} = 'active', \n {Interval} = 'weekly', \n {Last Sent} <= DATEADD(TODAY(), -7, 'days')\n)"
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
            "id": "1ea47e14-0a28-4780-95c7-31e24eb724d5",
            "name": "confirmation email1",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  620,
                  820
            ],
            "webhookId": "dd8bd6df-2013-4f8d-a2cc-cd9b3913e3d2",
            "parameters": {
                  "sendTo": "={{ $('Subscribe Form').item.json.email }}",
                  "message": "=This is to confirm your request to subscribe to \"Learn something every day!\" - a free service to send you facts about your favourite topics.\n\nTopic: {{ $('Subscribe Form').item.json.topic }}\nSchedule: {{ $('Subscribe Form').item.json.frequency }}",
                  "options": {
                        "appendAttribution": false
                  },
                  "subject": "Learn something every day confirmation"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "Sf5Gfl9NiFTNXFWb",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "d95262af-1b52-4f9c-8346-183b4eee8544",
            "name": "Execute Workflow",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  1140,
                  1480
            ],
            "parameters": {
                  "mode": "each",
                  "options": {
                        "waitForSubWorkflow": false
                  },
                  "workflowId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $workflow.id }}"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "075292af-7a66-4275-ac2d-3c392189a10c",
            "name": "Create Event",
            "type": "n8n-nodes-base.set",
            "position": [
                  980,
                  1480
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b28a0142-a028-471a-8180-9883e930feea",
                                    "name": "email",
                                    "type": "string",
                                    "value": "={{ $json.Email }}"
                              },
                              {
                                    "id": "970f5495-05df-42b6-a422-b2ac27f8eb95",
                                    "name": "topic",
                                    "type": "string",
                                    "value": "={{ $json.Topic }}"
                              },
                              {
                                    "id": "e871c431-948f-4b80-aa17-1e4266674663",
                                    "name": "interval",
                                    "type": "string",
                                    "value": "={{ $json.Interval }}"
                              },
                              {
                                    "id": "9b72597d-1446-4ef3-86e5-0a071c69155b",
                                    "name": "id",
                                    "type": "string",
                                    "value": "={{ $json.id }}"
                              },
                              {
                                    "id": "b17039c2-14a2-4811-9528-88ae963e44f7",
                                    "name": "created_at",
                                    "type": "string",
                                    "value": "={{ $json.Created }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "28776aaf-6bd9-4f9f-bcf0-3d4401a74219",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  1360,
                  1480
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0eb62e75-228b-452b-80ab-f9ef3ad33204",
            "name": "Unsubscribe Form",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  180,
                  1160
            ],
            "webhookId": "e64db96d-5e61-40d5-88fb-761621a829ab",
            "parameters": {
                  "options": {
                        "path": "free-factoids-unsubscribe"
                  },
                  "formTitle": "Unsubscribe from Learn Something Every Day",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "ID",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Reason For Unsubscribe",
                                    "multiselect": true,
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "Emails not relevant"
                                                },
                                                {
                                                      "option": "Too many Emails"
                                                },
                                                {
                                                      "option": "I did not sign up to this service"
                                                }
                                          ]
                                    }
                              }
                        ]
                  },
                  "formDescription": "We're sorry to see you go! Please take a moment to help us improve the service."
            },
            "typeVersion": 2.2
      },
      {
            "id": "f889efe9-dc3c-428b-ad8e-4f7d17f23e75",
            "name": "Set Email Vars",
            "type": "n8n-nodes-base.set",
            "position": [
                  2500,
                  1480
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "62a684fb-16f9-4326-8eeb-777d604b305a",
                                    "name": "to",
                                    "type": "string",
                                    "value": "={{ $('Execute Workflow Trigger').first().json.email }},jim@height.io"
                              },
                              {
                                    "id": "4270849e-c805-4580-9088-e8d1c3ef2fb4",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "=Your {{ $('Execute Workflow Trigger').first().json.interval }} factoid"
                              },
                              {
                                    "id": "81d0e897-2496-4a3c-b16c-9319338f899f",
                                    "name": "message",
                                    "type": "string",
                                    "value": "=<p>\n<strong>You asked about \"{{ $('Execution Data').first().json.topic.replace('\"','') }}\"</strong>\n</p>\n<p>\n<i>{{ $('Content Generation Agent').first().json.output }}</i>\n</p>"
                              },
                              {
                                    "id": "ee05de7b-5342-4deb-8118-edaf235d92cc",
                                    "name": "unsubscribe_link",
                                    "type": "string",
                                    "value": "=https://<MY_HOST>/form/inspiration-unsubscribe?ID={{ $('Execute Workflow Trigger').first().json.id }}"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "84741e6d-f5be-440d-8633-4eb30ccce170",
            "name": "Log Last Sent",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2860,
                  1480
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appL3dptT6ZTSzY9v",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v",
                        "cachedResultName": "Scheduled Emails"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblzR9vSuFUzlQNMI",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v/tblzR9vSuFUzlQNMI",
                        "cachedResultName": "Table 1"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('Execute Workflow Trigger').first().json.id }}",
                              "Last Sent": "2024-11-29T13:34:11"
                        },
                        "schema": [
                              {
                                    "id": "id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true
                              },
                              {
                                    "id": "Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Email",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Status",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "inactive",
                                                "value": "inactive"
                                          },
                                          {
                                                "name": "active",
                                                "value": "active"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Interval",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "daily",
                                                "value": "daily"
                                          },
                                          {
                                                "name": "weekly",
                                                "value": "weekly"
                                          },
                                          {
                                                "name": "surprise",
                                                "value": "surprise"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Interval",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Start Day",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "Mon",
                                                "value": "Mon"
                                          },
                                          {
                                                "name": "Tue",
                                                "value": "Tue"
                                          },
                                          {
                                                "name": "Wed",
                                                "value": "Wed"
                                          },
                                          {
                                                "name": "Thu",
                                                "value": "Thu"
                                          },
                                          {
                                                "name": "Fri",
                                                "value": "Fri"
                                          },
                                          {
                                                "name": "Sat",
                                                "value": "Sat"
                                          },
                                          {
                                                "name": "Sun",
                                                "value": "Sun"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Start Day",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Topic",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Topic",
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
                                    "id": "Last Sent",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Last Sent",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "id"
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
            "id": "88f864d6-13fb-4f09-b22d-030d016678e1",
            "name": "Search surprise",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  440,
                  1840
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appL3dptT6ZTSzY9v",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v",
                        "cachedResultName": "Scheduled Emails"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblzR9vSuFUzlQNMI",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v/tblzR9vSuFUzlQNMI",
                        "cachedResultName": "Table 1"
                  },
                  "options": {},
                  "operation": "search",
                  "filterByFormula": "=AND(\n {Status} = 'active', \n {Interval} = 'surprise'\n)"
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
            "id": "28238d9a-7bc0-4a22-bb4e-a7a2827e4da3",
            "name": "Should Send = True",
            "type": "n8n-nodes-base.filter",
            "position": [
                  800,
                  1840
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
                                    "id": "9aaf9ae2-8f96-443a-8294-c04270296b22",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.should_send }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "3a46dd3d-48a6-40ca-8823-0516aa9f73a4",
            "name": "Should Send?",
            "type": "n8n-nodes-base.code",
            "position": [
                  620,
                  1840
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "const luckyPick = Math.floor(Math.random() * 10) + 1;\n$input.item.json.should_send = luckyPick == 8;\nreturn $input.item;"
            },
            "typeVersion": 2
      },
      {
            "id": "3611da19-920b-48e6-84a4-f7be0b3a78fc",
            "name": "Create Subscriber",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  440,
                  820
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appL3dptT6ZTSzY9v",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v",
                        "cachedResultName": "Scheduled Emails"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblzR9vSuFUzlQNMI",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v/tblzR9vSuFUzlQNMI",
                        "cachedResultName": "Table 1"
                  },
                  "columns": {
                        "value": {
                              "Email": "={{ $json.email }}",
                              "Topic": "={{ $json.topic }}",
                              "Status": "active",
                              "Interval": "={{ $json.frequency }}",
                              "Start Day": "={{ $json.submittedAt.toDateTime().format('EEE') }}"
                        },
                        "schema": [
                              {
                                    "id": "Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Name",
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
                                    "id": "Status",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "inactive",
                                                "value": "inactive"
                                          },
                                          {
                                                "name": "active",
                                                "value": "active"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Interval",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "daily",
                                                "value": "daily"
                                          },
                                          {
                                                "name": "weekly",
                                                "value": "weekly"
                                          },
                                          {
                                                "name": "surprise",
                                                "value": "surprise"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Interval",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Start Day",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "Mon",
                                                "value": "Mon"
                                          },
                                          {
                                                "name": "Tue",
                                                "value": "Tue"
                                          },
                                          {
                                                "name": "Wed",
                                                "value": "Wed"
                                          },
                                          {
                                                "name": "Thu",
                                                "value": "Thu"
                                          },
                                          {
                                                "name": "Fri",
                                                "value": "Fri"
                                          },
                                          {
                                                "name": "Sat",
                                                "value": "Sat"
                                          },
                                          {
                                                "name": "Sun",
                                                "value": "Sun"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Start Day",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Topic",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Topic",
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
                                    "id": "Last Sent",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Last Sent",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "Email"
                        ]
                  },
                  "options": {},
                  "operation": "upsert"
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
            "id": "2213a81f-53a9-4142-9586-e87b88710eec",
            "name": "Update Subscriber",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  440,
                  1160
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appL3dptT6ZTSzY9v",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v",
                        "cachedResultName": "Scheduled Emails"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblzR9vSuFUzlQNMI",
                        "cachedResultUrl": "https://airtable.com/appL3dptT6ZTSzY9v/tblzR9vSuFUzlQNMI",
                        "cachedResultName": "Table 1"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $json.ID }}",
                              "Status": "inactive"
                        },
                        "schema": [
                              {
                                    "id": "id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true
                              },
                              {
                                    "id": "Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Email",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Status",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "inactive",
                                                "value": "inactive"
                                          },
                                          {
                                                "name": "active",
                                                "value": "active"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Interval",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "daily",
                                                "value": "daily"
                                          },
                                          {
                                                "name": "weekly",
                                                "value": "weekly"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Interval",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Start Day",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "Mon",
                                                "value": "Mon"
                                          },
                                          {
                                                "name": "Tue",
                                                "value": "Tue"
                                          },
                                          {
                                                "name": "Wed",
                                                "value": "Wed"
                                          },
                                          {
                                                "name": "Thu",
                                                "value": "Thu"
                                          },
                                          {
                                                "name": "Fri",
                                                "value": "Fri"
                                          },
                                          {
                                                "name": "Sat",
                                                "value": "Sat"
                                          },
                                          {
                                                "name": "Sun",
                                                "value": "Sun"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Start Day",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Topic",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Topic",
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
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "id"
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
            "id": "c94ec18b-e0cf-4859-8b89-23abdd63739c",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  900,
                  1280
            ],
            "parameters": {
                  "color": 7,
                  "width": 335,
                  "height": 173,
                  "content": "### 4. Using Subworkflows to run executions concurrently\nThis configuration is desired when sequential execution is slow and unnecessary. Also if one email fails, it doesn't fail the execution for everyone else."
            },
            "typeVersion": 1
      },
      {
            "id": "c14cab28-13eb-4d91-8578-8187a95a8909",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  180,
                  700
            ],
            "parameters": {
                  "color": 7,
                  "width": 380,
                  "height": 80,
                  "content": "### 1. Subscribe flow\nUse a form to allow users to subscribe to the service."
            },
            "typeVersion": 1
      },
      {
            "id": "0e44ada0-f8a7-440e-aded-33b446190a08",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  180,
                  1020
            ],
            "parameters": {
                  "color": 7,
                  "width": 355,
                  "height": 115,
                  "content": "### 2. Unsubscribe flow\n* Uses Form's pre-fill field feature to identify user\n* Doesn't use \"email\" as identifier so you can't unsubscribe others"
            },
            "typeVersion": 1
      },
      {
            "id": "e67bdffe-ccfc-4818-990d-b2a5ab613035",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  180,
                  1340
            ],
            "parameters": {
                  "color": 7,
                  "width": 347,
                  "height": 114,
                  "content": "### 3. Scheduled Trigger\n* Runs every day at 9am\n* Handles all 3 frequency types\n* Send emails concurrently"
            },
            "typeVersion": 1
      },
      {
            "id": "ce7d5310-7170-46d3-b8d8-3f97407f9dfd",
            "name": "Subscribe Form",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  180,
                  820
            ],
            "webhookId": "c6abe3e3-ba87-4124-a227-84e253581b58",
            "parameters": {
                  "options": {
                        "path": "free-factoids-subscribe",
                        "appendAttribution": false,
                        "respondWithOptions": {
                              "values": {
                                    "formSubmittedText": "Thanks! Your factoid is on its way!"
                              }
                        }
                  },
                  "formTitle": "Learn something every day!",
                  "formFields": {
                        "values": [
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "topic",
                                    "placeholder": "What topic(s) would you like to learn about?",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "email",
                                    "fieldLabel": "email",
                                    "placeholder": "eg. jim@example.com",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "frequency",
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "daily"
                                                },
                                                {
                                                      "option": "weekly"
                                                },
                                                {
                                                      "option": "surprise me"
                                                }
                                          ]
                                    },
                                    "requiredField": true
                              }
                        ]
                  },
                  "formDescription": "Get a fact a day (or week) about any subject sent to your inbox."
            },
            "typeVersion": 2.2
      },
      {
            "id": "a5d50886-7d6b-4bf8-b376-b23c12a60608",
            "name": "Execution Data",
            "type": "n8n-nodes-base.executionData",
            "position": [
                  1560,
                  1480
            ],
            "parameters": {
                  "dataToSave": {
                        "values": [
                              {
                                    "key": "email",
                                    "value": "={{ $json.email }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "69b40d8d-7734-47f1-89fe-9ea0378424b7",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1860,
                  1680
            ],
            "parameters": {
                  "sessionKey": "=scheduled_send_{{ $json.email }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.3
      },
      {
            "id": "f83cff18-f41f-4a63-9d43-7e3947aae386",
            "name": "Wikipedia",
            "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
            "position": [
                  2020,
                  1680
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "77457037-e3ab-42f1-948b-b994d42f2f6e",
            "name": "Content Generation Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1780,
                  1460
            ],
            "parameters": {
                  "text": "=Generate an new factoid on the following topic: \"{{ $json.topic.replace('\"','') }}\"\nEnsure it is unique and not one generated previously.",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "cdfdd870-48b6-4c7d-a7d1-a22d70423e37",
            "name": "Groq Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
            "position": [
                  1720,
                  1680
            ],
            "parameters": {
                  "model": "llama-3.3-70b-versatile",
                  "options": {}
            },
            "credentials": {
                  "groqApi": {
                        "id": "02xZ4o87lUMUFmbT",
                        "name": "Groq account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "87df322d-a544-476f-b2ff-83feb619fe7f",
            "name": "Generate Image",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2120,
                  1460
            ],
            "parameters": {
                  "prompt": "=Generate a child-friendly illustration which compliments the following paragraph:\n{{ $json.output }}",
                  "options": {},
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "8gccIjcuf3gvaoEr",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "5c8d9e72-4015-44da-b5d5-829864d33672",
            "name": "Resize Image",
            "type": "n8n-nodes-base.editImage",
            "position": [
                  2280,
                  1460
            ],
            "parameters": {
                  "width": 480,
                  "height": 360,
                  "options": {},
                  "operation": "resize"
            },
            "typeVersion": 1
      },
      {
            "id": "a9939fad-98b3-4894-aae0-c11fa40d09da",
            "name": "Send Message",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  2680,
                  1480
            ],
            "webhookId": "dd8bd6df-2013-4f8d-a2cc-cd9b3913e3d2",
            "parameters": {
                  "sendTo": "={{ $json.to }}",
                  "message": "=<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n <meta charset=\"UTF-8\">\n <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n <title>{{ $json.subject }}</title>\n</head>\n<body>\n {{ $json.message }}\n<p>\n<a href=\"{{ $json.unsubscribe_link }}\">Unsubscribe</a>\n</p>\n</body>\n</html>\n",
                  "options": {
                        "attachmentsUi": {
                              "attachmentsBinary": [
                                    {}
                              ]
                        },
                        "appendAttribution": false
                  },
                  "subject": "={{ $json.subject }}"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "Sf5Gfl9NiFTNXFWb",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "10b6ad35-fc1c-47a2-b234-5de3557d1164",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1320,
                  1660
            ],
            "parameters": {
                  "color": 7,
                  "width": 335,
                  "height": 113,
                  "content": "### 5. Use Execution Data to Filter Logs\nIf you've registered for community+ or are on n8n cloud, best practice is to use execution node to allow filtering of execution logs."
            },
            "typeVersion": 1
      },
      {
            "id": "e3563fae-ff35-457b-9fb1-784eda637518",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1780,
                  1280
            ],
            "parameters": {
                  "color": 7,
                  "width": 340,
                  "height": 140,
                  "content": "### 6. Use AI to Generate Factoid and Image\nUse an AI agent to automate the generation of factoids as requested by the user. This is a simple example but we recommend a adding a unique touch to stand out from the crowd!"
            },
            "typeVersion": 1
      },
      {
            "id": "d1016c5d-c855-44c5-8ad3-a534bedaa8cf",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2500,
                  1040
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 400,
                  "content": "### 7. Send Email to User\nFinally, send a message to the user with both text and image.\nLog the event in the Airtable for later analysis if required.\n\n![Screenshot of email result](https://res.cloudinary.com/daglih2g8/image/upload/f_auto,q_auto/v1/n8n-workflows/dbpctdhohj3vlewy6oyc)"
            },
            "typeVersion": 1
      },
      {
            "id": "773075fa-e5a2-4d4f-8527-eb07c7038b00",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -420,
                  680
            ],
            "parameters": {
                  "width": 480,
                  "height": 900,
                  "content": "## Try It Out!\n\n### This n8n templates demonstrates how to build a simple subscriber service entirely in n8n using n8n forms as a frontend, n8n generally as the backend and Airtable as the storage layer.\n\nThis template in particular shows a fully automated service to send automated messages containing facts about a topic the user requested for.\n\n### How it works\n* An n8n form is setup up to allow users to subscribe with a desired topic and interval of which to recieve messages via n8n forms which is then added to the Airtable.\n* A scheduled trigger is executed every morning and searches for subscribers to send messages for based on their desired intervals.\n* Once found, Subscribers are sent to a subworkflow which performs the text content generation via an AI agent and also uses a vision model to generate an image.\n* Both are attached to an email which is sent to the subscriber. This email also includes an unsubscribe link.\n* The unsubscribe flow works similarly via n8n form interface which when submitted disables further scheduled emails to the user.\n\n## How to use\n* Make a copy of sample Airtable here: https://airtable.com/appL3dptT6ZTSzY9v/shrLukHafy5bwDRfD\n* Make sure the workflow is \"activated\" and the forms are available and reachable by your audience.\n\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Wikipedia": {
            "ai_tool": [
                  [
                        {
                              "node": "Content Generation Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Event": {
            "main": [
                  [
                        {
                              "node": "Execute Workflow",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Resize Image": {
            "main": [
                  [
                        {
                              "node": "Set Email Vars",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search daily": {
            "main": [
                  [
                        {
                              "node": "Create Event",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Message": {
            "main": [
                  [
                        {
                              "node": "Log Last Sent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Should Send?": {
            "main": [
                  [
                        {
                              "node": "Should Send = True",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search weekly": {
            "main": [
                  [
                        {
                              "node": "Create Event",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Execution Data": {
            "main": [
                  [
                        {
                              "node": "Content Generation Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Image": {
            "main": [
                  [
                        {
                              "node": "Resize Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Email Vars": {
            "main": [
                  [
                        {
                              "node": "Send Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Subscribe Form": {
            "main": [
                  [
                        {
                              "node": "Create Subscriber",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Groq Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Content Generation Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search surprise": {
            "main": [
                  [
                        {
                              "node": "Should Send?",
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
                              "node": "Search surprise",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Search daily",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Search weekly",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Unsubscribe Form": {
            "main": [
                  [
                        {
                              "node": "Update Subscriber",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Subscriber": {
            "main": [
                  [
                        {
                              "node": "confirmation email1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Should Send = True": {
            "main": [
                  [
                        {
                              "node": "Create Event",
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
                              "node": "Content Generation Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Content Generation Agent": {
            "main": [
                  [
                        {
                              "node": "Generate Image",
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
                              "node": "Execution Data",
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
    name: "Qualifying Appointment Requests With AI & N8n Forms",
    nodes: [
      {
            "id": "76589d1c-45f3-4a89-906f-8ef300d34964",
            "name": "n8n Form Trigger",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  -2520,
                  -280
            ],
            "webhookId": "5e7637dd-d222-4786-8cdc-7b66cebc1481",
            "parameters": {
                  "path": "schedule_appointment",
                  "options": {
                        "ignoreBots": true,
                        "appendAttribution": true,
                        "useWorkflowTimezone": true
                  },
                  "formTitle": "Schedule an Appointment",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "Your Name",
                                    "placeholder": "eg. Sam Smith",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "email",
                                    "fieldLabel": "Email",
                                    "placeholder": "eg. sam@example.com",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Enquiry",
                                    "placeholder": "eg. I'm looking for...",
                                    "requiredField": true
                              }
                        ]
                  },
                  "formDescription": "Welcome to Jim's Appointment Form.\nBefore we set a date, please tell me a little about yourself and how I can help."
            },
            "typeVersion": 2.1
      },
      {
            "id": "194b7073-fa33-4e75-85ed-c02724c8075c",
            "name": "Form End",
            "type": "n8n-nodes-base.form",
            "position": [
                  -420,
                  -260
            ],
            "webhookId": "8fcc907b-bc2e-4fdf-a829-82c83e677724",
            "parameters": {
                  "options": {
                        "formTitle": "Appointment Request Sent!"
                  },
                  "operation": "completion",
                  "completionTitle": "Appointment Request Sent!",
                  "completionMessage": "=Thank you for submitting an appointment request. A confirmation of this request will be sent to your inbox. I'll get back to you shortly with a confirmation of the appointment.\n\nHere is the summary of the appointment request.\n\nName: {{ $('Get Form Values').item.json.name }}\nDate & Time: {{ DateTime.fromISO($('Get Form Values').item.json.dateTime).format('EEE, dd MMM @ t') }}\nEnquiry: {{ $('Get Form Values').item.json.enquiry.trim() }}\n"
            },
            "typeVersion": 1
      },
      {
            "id": "688ea2cc-b595-4b6f-9214-d5dfd3893172",
            "name": "Enter Date & Time",
            "type": "n8n-nodes-base.form",
            "position": [
                  -1260,
                  -320
            ],
            "webhookId": "0cd03415-66f8-4c82-8069-5bfd8ea310bd",
            "parameters": {
                  "options": {
                        "formTitle": "Enter a Date & Time",
                        "formDescription": "=Please select a date and time"
                  },
                  "defineForm": "json",
                  "jsonOutput": "={{\n[\n {\n \"fieldLabel\":\"Date\",\n \"requiredField\":true,\n \"fieldType\": \"dropdown\",\n \"fieldOptions\":\n Array(5).fill(0)\n .map((_,idx) => $now.plus(idx+1, 'day'))\n .filter(d => !d.isWeekend)\n .map(d => ({ option: d.format('EEE, d MMM') }))\n },\n {\n \"fieldLabel\": \"Time\",\n \"requiredField\": true,\n \"fieldType\": \"dropdown\",\n \"fieldOptions\": [\n { \"option\": \"9:00 am\" },\n { \"option\": \"10:00 am\" },\n { \"option\": \"11:00 am\" },\n { \"option\": \"12:00 pm\" },\n { \"option\": \"1:00 pm\" },\n { \"option\": \"2:00 pm\" },\n { \"option\": \"3:00 pm\" },\n { \"option\": \"4:00 pm\" },\n { \"option\": \"5:00 pm\" },\n { \"option\": \"6:00 pm\" }\n ]\n }\n]\n}}"
            },
            "typeVersion": 1
      },
      {
            "id": "602c40f9-ab11-4908-aab3-1a199126e097",
            "name": "Get Form Values",
            "type": "n8n-nodes-base.set",
            "position": [
                  -900,
                  -260
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{\n{\n name: $('n8n Form Trigger').first().json['Your Name'],\n email: $('n8n Form Trigger').first().json.Email,\n enquiry: $('n8n Form Trigger').first().json.Enquiry,\n dateTime: DateTime.fromFormat(`${$json.Date} ${$json.Time}`, \"EEE, dd MMM t\"),\n submittedAt: $('n8n Form Trigger').first().json.submittedAt,\n}\n}}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "21f93645-5e27-4e9f-a72c-47a39e42a79c",
            "name": "Terms & Conditions",
            "type": "n8n-nodes-base.form",
            "position": [
                  -1680,
                  -240
            ],
            "webhookId": "dcf32f99-8fb7-457a-8a58-ac1a018b1873",
            "parameters": {
                  "options": {
                        "formTitle": "Before we continue...",
                        "formDescription": "=Terms and Conditions for Booking an Appointment\n\nNon-Binding Nature of Discussions:\nAny information shared, discussed, or agreed upon during the call is non-binding and provisional. No agreement, service, or commitment shall be considered confirmed unless explicitly documented and agreed to in writing.\n\nProhibition of Recording and Note-Taking Tools:\nBy proceeding with the appointment, the user agrees not to use AI assistants, note-taking applications, recording devices, or any other technology to record or transcribe the conversation, whether manually or automatically. This is to ensure confidentiality and respect for the integrity of the discussion.\n\nConfirmation of Understanding:\nBy booking this appointment, you acknowledge and accept these terms and conditions in full."
                  },
                  "formFields": {
                        "values": [
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Please select",
                                    "multiselect": true,
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "I accept the terms and conditions"
                                                }
                                          ]
                                    },
                                    "requiredField": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "22e03fec-bd56-4fc3-864a-f1e81a864cb5",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -2340,
                  -140
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
            "id": "8b4e9bba-cd57-46af-8042-4b47e5ebcd82",
            "name": "Has Accepted?",
            "type": "n8n-nodes-base.if",
            "position": [
                  -1500,
                  -240
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
                                    "id": "bc7c3e99-e610-4997-82a7-4851f2c04c19",
                                    "operator": {
                                          "type": "string",
                                          "operation": "startsWith"
                                    },
                                    "leftValue": "={{ $json[\"Please select\"] }}",
                                    "rightValue": "I accept"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "627a4c00-e831-4a77-8aad-f417f0f8e6dd",
            "name": "Send Receipt",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  -580,
                  -260
            ],
            "webhookId": "5f590407-4ab9-4ae6-bb85-38dbe41d6dce",
            "parameters": {
                  "sendTo": "={{ $('Get Form Values').first().json.email }}",
                  "message": "=<p>Dear {{ $('Get Form Values').first().json.name }},</p>\n<p>Thanks for requesting an appointment. We will review and get back to you shortly.</p>\n<p>Here is the summary of the request that was sent:</p>\n<p>\nName: {{ $('Get Form Values').first().json.name }}<br/>\nEmail: {{ $('Get Form Values').first().json.email }}<br/>\nEnquiry: {{ $('Get Form Values').first().json.enquiry }}<br/>\nSubmitted at: {{ $('Get Form Values').first().json.submittedAt }}\n</p>\n",
                  "options": {},
                  "subject": "=Appointment Request Received for {{ DateTime.fromISO($('Get Form Values').first().json.dateTime).format('EEE, dd MMM @ t') }}"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "Sf5Gfl9NiFTNXFWb",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "91d3dd7d-53f8-4f8e-9af2-ec54cf7f42ad",
            "name": "Wait for Approval",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  340,
                  -260
            ],
            "webhookId": "ab9c6c5e-334d-44bb-a8fd-a58140bc680d",
            "parameters": {
                  "sendTo": "=admin@example.com",
                  "message": "=<h2>A new appointment request was submitted!</h2>\n<p>\nRequesting appointment date is <strong>{{ DateTime.fromISO($('Execute Workflow Trigger').item.json.dateTime).format('EEE, dd MMM @ t') }}</strong>.\n</p>\n<p>\nName: {{ $('Execute Workflow Trigger').first().json.name }}<br/>\nEmail: {{ $('Execute Workflow Trigger').first().json.email }}<br/>\nEnquiry Summary: {{ $json.text }}<br/>\nSubmitted at: {{ $('Execute Workflow Trigger').first().json.submittedAt }}\n</p>",
                  "subject": "New Appointment Request!",
                  "operation": "sendAndWait",
                  "approvalOptions": {
                        "values": {
                              "approvalType": "double",
                              "approveLabel": "Confirm"
                        }
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "Sf5Gfl9NiFTNXFWb",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "7a02b57b-b9b1-45b1-9b3d-aebb84259875",
            "name": "Has Approval?",
            "type": "n8n-nodes-base.if",
            "position": [
                  520,
                  -260
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
                                    "id": "e5e37acb-9e9d-4a9e-bf59-a35dfc035886",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.data.approved }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "96aab8be-4c5e-4e14-a6ea-6d2b743551be",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  0,
                  -120
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
            "id": "6f2b5454-70a3-4391-b785-bb871c3e2081",
            "name": "Create Appointment",
            "type": "n8n-nodes-base.googleCalendar",
            "position": [
                  720,
                  -340
            ],
            "parameters": {
                  "end": "={{ DateTime.fromISO($('Execute Workflow Trigger').first().json.dateTime).plus(30, 'minute').toISO() }}",
                  "start": "={{ $('Execute Workflow Trigger').first().json.dateTime }}",
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "c_5792bdf04bc395cbcbc6f7b754268245a33779d36640cc80a357711aa2f09a0a@group.calendar.google.com",
                        "cachedResultName": "n8n-events"
                  },
                  "additionalFields": {
                        "summary": "=Appointment Scheduled - {{ $('Execute Workflow Trigger').item.json.name }} & Jim",
                        "attendees": [
                              "={{ $('Execute Workflow Trigger').item.json.email }}"
                        ],
                        "description": "={{ $('Summarise Enquiry').first().json.text }}\n\nOriginal message:\n> {{ $('Execute Workflow Trigger').item.json.enquiry }}",
                        "conferenceDataUi": {
                              "conferenceDataValues": {
                                    "conferenceSolution": "hangoutsMeet"
                              }
                        }
                  }
            },
            "credentials": {
                  "googleCalendarOAuth2Api": {
                        "id": "kWMxmDbMDDJoYFVK",
                        "name": "Google Calendar account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e6881867-5b3c-4b85-b06a-a0a3c01be227",
            "name": "Send Rejection",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  720,
                  -180
            ],
            "webhookId": "5f590407-4ab9-4ae6-bb85-38dbe41d6dce",
            "parameters": {
                  "sendTo": "={{ $('Execute Workflow Trigger').first().json.email }}",
                  "message": "=<p>Dear {{ $('Execute Workflow Trigger').first().json.name }},</p>\n<p>Unfortunately, we cannot schedule the requested appointment at the requested time.</p>\n<p>Kind regards</p>\n",
                  "options": {},
                  "subject": "=Appointment Request Rejected for {{ DateTime.fromISO($('Execute Workflow Trigger').first().json.dateTime).format('EEE, dd MMM @ t') }}"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "Sf5Gfl9NiFTNXFWb",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "40785eca-943c-45f6-b4a9-0c95538621ed",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2580,
                  -555.2889298043726
            ],
            "parameters": {
                  "color": 7,
                  "width": 763.0427617951669,
                  "height": 611.898918296892,
                  "content": "## 1. Qualify Enquiries Using AI\n[Learn more about the text classifier](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier/)\n\nWith n8n's multi-forms, you’re no longer stuck creating long, overwhelming forms. Instead, you have more flexibility and control to design smarter, more engaging form experiences.\n\nIn this demo, we’ll explore an appointment request scenario where a user wants to schedule a call to discuss their inquiry. However, not all inquiries require a meeting, making it a perfect use case for AI to pre-qualify the request. We can handle this validation using the text classifier node."
            },
            "typeVersion": 1
      },
      {
            "id": "985be8d1-e77a-475b-9ac2-dba163dbd950",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1800,
                  -549.8684464902185
            ],
            "parameters": {
                  "color": 7,
                  "width": 781.472405063291,
                  "height": 606.0718987341766,
                  "content": "## 2. Split Form For Better User Experience\n[Learn more about the forms](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form)\n\nOnboarding is a great reason to split your big form into smaller ones. Taking the user through a step by step process ensures a smooth experience and keeps them engaged throughout.\n\nHere, we take the opportunity of the extra context space to display a terms and conditions which the user must agree to making their request. The next form then asks for desired date and time of the event."
            },
            "typeVersion": 1
      },
      {
            "id": "9b0a3f0e-e15d-4d0e-b620-1acc78bf812c",
            "name": "Decline",
            "type": "n8n-nodes-base.form",
            "position": [
                  -2020,
                  -160
            ],
            "webhookId": "4353eadb-b7a0-45f2-8dd8-5f6cd882d8d8",
            "parameters": {
                  "options": {},
                  "operation": "completion",
                  "completionTitle": "Send me a DM Instead!",
                  "completionMessage": "Thanks for your enquiry but it may not necessarily need an appointment. Please feel free to email me instead at jim@example.com."
            },
            "typeVersion": 1
      },
      {
            "id": "fcd3eb7d-6389-4c07-97cc-275ae387c963",
            "name": "Decline1",
            "type": "n8n-nodes-base.form",
            "position": [
                  -1260,
                  -160
            ],
            "webhookId": "4353eadb-b7a0-45f2-8dd8-5f6cd882d8d8",
            "parameters": {
                  "options": {},
                  "operation": "completion",
                  "completionTitle": "Send me a DM Instead!",
                  "completionMessage": "Thanks for your enquiry but it may not necessarily need an appointment. Please feel free to email me instead at jim@example.com."
            },
            "typeVersion": 1
      },
      {
            "id": "d89427cb-fffb-4aa4-b55c-b315fa0e92be",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1000,
                  -498.80432681242814
            ],
            "parameters": {
                  "color": 7,
                  "width": 792.9401150747982,
                  "height": 497.4250863060987,
                  "content": "## 3. Send Acknowledgement to User and Start Approval Process\n[Learn more about the Gmail node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/)\n\nOnce all form steps are concluded, we can send a notification to the requester via email and in the background, trigger another email to the admin to initiate the approval process. The approval process works in a separate execution so doesn't interrupt the user's form experience."
            },
            "typeVersion": 1
      },
      {
            "id": "041081e1-ee98-4b40-aa14-1980b23f4031",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -160,
                  -620
            ],
            "parameters": {
                  "color": 7,
                  "width": 609.4228768699652,
                  "height": 287.178089758343,
                  "content": "## 4. Approve or Decline Appointment\n[Learn more about the Waiting for Approval](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#send-a-message-and-wait-for-approval)\n\nThe Wait for Approval feature for Gmail is a special operation which allows for human-in-the-loop interaction in n8n workflows. In this example, the human interaction is the approval of the appointment request. The feature will put the workflow in a waiting state where a message is sent to the admin with 2 buttons: confirm and decline.\n\nWhen the admin clicks on the confirm button, the workflow resumes from the Gmail node and a meeting event is created for the requesting user in Google Calendar.\n\nWhen declined, a rejection email is sent to the requester instead."
            },
            "typeVersion": 1
      },
      {
            "id": "d6af0f50-234f-46ca-aa41-7f3891aff8a3",
            "name": "Trigger Approval Process",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  -740,
                  -260
            ],
            "parameters": {
                  "mode": "each",
                  "options": {
                        "waitForSubWorkflow": false
                  },
                  "workflowId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $workflow.id }}"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e524d6df-9b6d-4d61-8e71-08a0d3a751d7",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  -160,
                  -260
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "74dccbc1-7728-4336-a18a-2541007fd369",
            "name": "Summarise Enquiry",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  0,
                  -260
            ],
            "parameters": {
                  "text": "=The enquiry is as follows:\n{{ $('Execute Workflow Trigger').first().json.enquiry.substring(0, 500) }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "Summarise the given enquiry"
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.5
      },
      {
            "id": "b74f0f5a-39f0-4db3-beba-03caf981c5d2",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -3080,
                  -640
            ],
            "parameters": {
                  "width": 468.6766398158801,
                  "height": 690.6653164556957,
                  "content": "## Try it out!\n\n### This n8n template is a simple appointment scheduling workflow using n8n forms with AI thrown in the mix for good measure. It also uses n8n's wait for approval feature which allows the ability to confirm appointment requests and create events in Google Calendar.\n\n### How it works\n* We start with a form trigger which asks for the purpose of the appointment.\n* Instantly, we can qualify this by using a text classifier node which uses AI's contextual understanding to ensure the appointment is worthwhile. If not, an alternative is suggested instead.\n* Multi-page forms are then used to set the terms of the appointment and ask the user for a desired date and time.\n* An acknowledgement is sent to the user while an approval by email process is triggered in the background.\n* In a subworkflow, we use Gmail with the wait for approval operation to send an approval form to the admin user who can either confirm or decline the appointment request.\n* When approved, a Google Calendar event is created. When declined, the user is notified via email that the appointment request was declined.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!\n"
            },
            "typeVersion": 1
      },
      {
            "id": "d3c87dfa-d6e5-402a-89e5-6d8f93b824a6",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  299,
                  -280
            ],
            "parameters": {
                  "width": 177.66444188722656,
                  "height": 257.56869965477557,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Set your admin email here!"
            },
            "typeVersion": 1
      },
      {
            "id": "6351121d-6ebe-432d-b370-13296fd58e1a",
            "name": "Enquiry Classifier",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  -2340,
                  -280
            ],
            "parameters": {
                  "options": {
                        "fallback": "other"
                  },
                  "inputText": "={{ $json.Enquiry }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "relevant enquiry",
                                    "description": "Enquire about AI, automation, digital products and product engineering."
                              }
                        ]
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Send Receipt": {
            "main": [
                  [
                        {
                              "node": "Form End",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Accepted?": {
            "main": [
                  [
                        {
                              "node": "Enter Date & Time",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Decline1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Approval?": {
            "main": [
                  [
                        {
                              "node": "Create Appointment",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Send Rejection",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Form Values": {
            "main": [
                  [
                        {
                              "node": "Trigger Approval Process",
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
                              "node": "Enquiry Classifier",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Enter Date & Time": {
            "main": [
                  [
                        {
                              "node": "Get Form Values",
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
                              "node": "Enquiry Classifier",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Summarise Enquiry": {
            "main": [
                  [
                        {
                              "node": "Wait for Approval",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wait for Approval": {
            "main": [
                  [
                        {
                              "node": "Has Approval?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Enquiry Classifier": {
            "main": [
                  [
                        {
                              "node": "Terms & Conditions",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Decline",
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
                              "node": "Summarise Enquiry",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Terms & Conditions": {
            "main": [
                  [
                        {
                              "node": "Has Accepted?",
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
                              "node": "Summarise Enquiry",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Trigger Approval Process": {
            "main": [
                  [
                        {
                              "node": "Send Receipt",
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

export function FormsCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 border border-emerald-600' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-600/50 hover:shadow-md'}`}
    >
      <ClipboardList className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500 dark:text-emerald-400'}`} />
      <span className="truncate max-w-[200px]">Forms and Surveys</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {formsTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function FormsTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {formsTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-emerald-50/50 dark:group-hover:to-emerald-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <ClipboardList className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-emerald-600 dark:hover:bg-emerald-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
