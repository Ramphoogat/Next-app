import React from 'react';
import { Play, Mail } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const gmailTemplates: IN8nTemplate[] = [
  {
    name: "Very simple Human in the loop system email with AI e IMAP",
    nodes: [
      {
            "id": "271bb16f-9b62-41d9-ab76-114cd7ba915a",
            "name": "Email Trigger (IMAP)",
            "type": "n8n-nodes-base.emailReadImap",
            "position": [
                  -1300,
                  1340
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "imap": {
                        "id": "k31W9oGddl9pMDy4",
                        "name": "IMAP info@n3witalia.com"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "42d150d8-d574-49f9-9c0e-71a2cdea3b79",
            "name": "Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  -1040,
                  1340
            ],
            "parameters": {
                  "html": "={{ $json.textHtml }}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "e9498a60-0078-4581-b269-7ff552f4047a",
            "name": "Send Email",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  920,
                  1320
            ],
            "webhookId": "a79ae1b4-648c-4cb4-b6cd-04ea3c1d9314",
            "parameters": {
                  "html": "={{ $('Set Email text').item.json.email }}",
                  "options": {},
                  "subject": "=Re: {{ $('Email Trigger (IMAP)').item.json.subject }}",
                  "toEmail": "={{ $('Email Trigger (IMAP)').item.json.from }}",
                  "fromEmail": "={{ $('Email Trigger (IMAP)').item.json.to }}"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "ab9f6ac3-2095-44df-aeba-2eab96ecf425",
            "name": "Email Summarization Chain",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  -780,
                  1340
            ],
            "parameters": {
                  "options": {
                        "binaryDataKey": "={{ $json.data }}",
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "=Write a concise summary of the following in max 100 words:\n\n\"{{ $json.data }}\"\n\nDo not enter the total number of words used.",
                                    "combineMapPrompt": "=Write a concise summary of the following in max 100 words:\n\n\"{{ $json.data }}\"\n\nDo not enter the total number of words used."
                              }
                        }
                  },
                  "operationMode": "nodeInputBinary"
            },
            "typeVersion": 2
      },
      {
            "id": "86b7c3d0-e1f2-4e2f-b293-8042700d6816",
            "name": "Write email",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  -340,
                  1340
            ],
            "parameters": {
                  "text": "=Write the text to reply to the following email:\n\n{{ $json.response.text }}",
                  "options": {
                        "systemMessage": "You are an expert at answering emails. You need to answer them professionally based on the information you have. This is a business email. Be concise and never exceed 100 words. Only the body of the email, not create the subject"
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "5d5a397f-f9c3-4691-afd0-9a6102679eac",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -400,
                  1560
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "5b36a295-fda6-4174-9078-0a8ec57620d2",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -800,
                  1260
            ],
            "parameters": {
                  "width": 320,
                  "height": 240,
                  "content": "Chain that summarizes the received email"
            },
            "typeVersion": 1
      },
      {
            "id": "7110fe1f-0099-49aa-9095-96e733aa468f",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -360,
                  1260
            ],
            "parameters": {
                  "width": 340,
                  "height": 240,
                  "content": "Agent that retrieves business information from a vector database and processes the response"
            },
            "typeVersion": 1
      },
      {
            "id": "e2bdbd64-3c37-4867-ae2c-0f6937d82b81",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1100,
                  1260
            ],
            "parameters": {
                  "height": 240,
                  "content": "Convert email to Markdown format for better understanding of LLM models"
            },
            "typeVersion": 1
      },
      {
            "id": "8ae5d216-5897-4c33-800a-27ff939b174a",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  1300
            ],
            "parameters": {
                  "height": 180,
                  "content": "If the feedback is OK send email"
            },
            "typeVersion": 1
      },
      {
            "id": "4cfce63c-5931-45c5-99ca-eb85dca962b5",
            "name": "Approve Email",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  380,
                  1340
            ],
            "webhookId": "4f9f06e7-9b2b-4896-9b51-245972341d12",
            "parameters": {
                  "message": "=<h3>MESSAGE</h3>\n{{ $('Email Trigger (IMAP)').item.json.textHtml }}\n\n<h3>AI RESPONSE</h3>\n{{ $json.email }}",
                  "options": {},
                  "subject": "=[Approval Required] {{ $('Email Trigger (IMAP)').item.json.subject }}",
                  "toEmail": "info@n3witalia.com",
                  "fromEmail": "info@n3witalia.com",
                  "operation": "sendAndWait"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "d6c8acd2-ebc1-4aaa-bfcc-cdb18fcc8715",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -820,
                  1560
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "deepseek-chat",
                        "cachedResultName": "deepseek-chat"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "97Cz4cqyiy1RdcQL",
                        "name": "DeepSeek"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "33bbedeb-129a-4e99-ab5a-9e0ec4456156",
            "name": "Set Email text",
            "type": "n8n-nodes-base.set",
            "position": [
                  100,
                  1340
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "35d7c303-42f4-4dd1-b41e-6eb087c23c3d",
                                    "name": "email",
                                    "type": "string",
                                    "value": "={{ $json.output }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "2293e0e6-4f2a-4622-a610-64b65f34e1e5",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  320,
                  1300
            ],
            "parameters": {
                  "height": 180,
                  "content": "Human in the loop"
            },
            "typeVersion": 1
      },
      {
            "id": "510196ec-adaf-4e6c-aac0-8ca8b754438a",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1100,
                  940
            ],
            "parameters": {
                  "color": 3,
                  "width": 540,
                  "height": 260,
                  "content": "# How it works\nThis workflow automates the handling of incoming emails, summarizes their content, generates appropriate responses and validate it through send IMAP email with \"Human in the loop\" system. \n\nYou can quickly integrate Gmail and Outlook via the appropriate nodes"
            },
            "typeVersion": 1
      },
      {
            "id": "c4c9157d-4d05-47a1-a5eb-63865e838d39",
            "name": "Approved?",
            "type": "n8n-nodes-base.if",
            "position": [
                  680,
                  1340
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
                                    "id": "62e26bc5-1732-4699-a602-99490c7406fd",
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
      }
],
    connections: {
      "OpenAI": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Write email",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Markdown": {
            "main": [
                  [
                        {
                              "node": "Email Summarization Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Approved?": {
            "main": [
                  [
                        {
                              "node": "Send Email",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  []
            ]
      },
      "Write email": {
            "main": [
                  [
                        {
                              "node": "Set Email text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Approve Email": {
            "main": [
                  [
                        {
                              "node": "Approved?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Email text": {
            "main": [
                  [
                        {
                              "node": "Approve Email",
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
                              "node": "Email Summarization Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Trigger (IMAP)": {
            "main": [
                  [
                        {
                              "node": "Markdown",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Summarization Chain": {
            "main": [
                  [
                        {
                              "node": "Write email",
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
    name: "AI Email processing autoresponder with approval (Yes/No)",
    nodes: [
      {
            "id": "06a098db-160b-45f7-aeac-a73ef868148e",
            "name": "Email Trigger (IMAP)",
            "type": "n8n-nodes-base.emailReadImap",
            "position": [
                  -180,
                  -100
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "imap": {
                        "id": "k31W9oGddl9pMDy4",
                        "name": "IMAP info@n3witalia.com"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "9589443b-efb7-4e0d-bafc-0be9858a4755",
            "name": "Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  40,
                  -100
            ],
            "parameters": {
                  "html": "={{ $json.textHtml }}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "8de7b2f3-bf75-4f3c-a1ee-eec047a7b82e",
            "name": "DeepSeek R1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  240,
                  80
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "deepseek/deepseek-r1:free",
                        "cachedResultName": "deepseek/deepseek-r1:free"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XJTqRiKFJpFs5MuX",
                        "name": "OpenRouter account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "babf37dc-99ca-439a-b094-91c52799b8df",
            "name": "Send Email",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  1840,
                  -120
            ],
            "webhookId": "f84fcde7-6aac-485a-9a08-96a35955af49",
            "parameters": {
                  "html": "={{ $('Write email').item.json.output }}",
                  "options": {},
                  "subject": "=Re: {{ $('Email Trigger (IMAP)').item.json.subject }}",
                  "toEmail": "={{ $('Email Trigger (IMAP)').item.json.from }}",
                  "fromEmail": "={{ $('Email Trigger (IMAP)').item.json.to }}"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "ebeb986d-053a-420d-8482-ee00e75f2f10",
            "name": "Qdrant Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  1180,
                  200
            ],
            "parameters": {
                  "mode": "retrieve-as-tool",
                  "options": {},
                  "toolName": "company_knowladge_base",
                  "toolDescription": "Extracts information regarding the request made.",
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "=COLLECTION"
                  },
                  "includeDocumentMetadata": false
            },
            "credentials": {
                  "qdrantApi": {
                        "id": "iyQ6MQiVaF3VMBmt",
                        "name": "QdrantApi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "ccc3d026-bfa3-4fda-be0a-ef70bf831aa7",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  1180,
                  380
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "1726aac9-a77d-4f19-8c07-70b032c3abeb",
            "name": "Email Summarization Chain",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  260,
                  -100
            ],
            "parameters": {
                  "options": {
                        "binaryDataKey": "={{ $json.data }}",
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "=Write a concise summary of the following in max 100 words :\n\n\"{{ $json.data }}\"\n\nDo not enter the total number of words used.",
                                    "combineMapPrompt": "=Write a concise summary of the following in max 100 words:\n\n\"{{ $json.data }}\"\n\nDo not enter the total number of words used."
                              }
                        }
                  },
                  "operationMode": "nodeInputBinary"
            },
            "typeVersion": 2
      },
      {
            "id": "81b889d0-e724-4c1f-9ce3-7593c796aaaf",
            "name": "Write email",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  980,
                  -100
            ],
            "parameters": {
                  "text": "=Write the text to reply to the following email:\n\n{{ $('Email Summarization Chain').item.json.response.text }}",
                  "options": {
                        "systemMessage": "You are an expert at answering emails. You need to answer them professionally based on the information you have. This is a business email. Be concise and never exceed 100 words. Only the body of the email, not create the subject.\n\nIt must be in HTML format and you can insert (if you think it is appropriate) only HTML characters such as <br>, <b>, <i>, <p> where necessary."
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "cf38e319-59b3-490e-b841-579afc9fbc02",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  980,
                  200
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "19842e5f-c372-4dfd-b860-87dc5f00b1af",
            "name": "Set Email",
            "type": "n8n-nodes-base.set",
            "position": [
                  760,
                  -100
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "759dc0f9-f582-492c-896c-6426f8410127",
                                    "name": "email",
                                    "type": "string",
                                    "value": "={{ $json.response.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "2cf7a9af-c5e8-45dd-bda5-01c562a0defb",
            "name": "Approve?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1560,
                  -100
            ],
            "parameters": {
                  "options": {
                        "ignoreCase": false
                  },
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
                                    "id": "5c377c1c-43c6-45e7-904e-dbbe6b682686",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.data.approved }}",
                                    "rightValue": "true"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "08cabec6-9840-4214-8315-b877c86794bf",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -220,
                  -680
            ],
            "parameters": {
                  "color": 3,
                  "width": 580,
                  "height": 420,
                  "content": "# Main Flow\n\n## Preliminary step:\nCreate a vector database on Qdrant and tokenize the documents useful for generating a response\n\n\n## How it works\nThis workflow is designed to automate the process of handling incoming emails, summarizing their content, generating appropriate responses with RAG, and obtaining approval (YES/NO button) before sending replies.\n\nThis workflow is designed to handle general inquiries that come in via corporate email via IMAP and generate responses using RAG. You can quickly integrate Gmail and Outlook via the appropriate trigger nodes"
            },
            "typeVersion": 1
      },
      {
            "id": "80692c8f-e236-43ac-aad2-91bd90f40065",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -40,
                  -180
            ],
            "parameters": {
                  "height": 240,
                  "content": "Convert email to Markdown format for better understanding of LLM models"
            },
            "typeVersion": 1
      },
      {
            "id": "e6957fde-bf05-4b67-aa0e-44c575fca04d",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  240,
                  -180
            ],
            "parameters": {
                  "width": 320,
                  "height": 240,
                  "content": "Chain that summarizes the received email"
            },
            "typeVersion": 1
      },
      {
            "id": "7cfba59f-83ce-4f0b-b54a-b2c11d58fd82",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  940,
                  -180
            ],
            "parameters": {
                  "width": 340,
                  "height": 240,
                  "content": "Agent that retrieves business information from a vector database and processes the response"
            },
            "typeVersion": 1
      },
      {
            "id": "28c4bd00-6a47-422f-a50a-935f3724ba01",
            "name": "Send Draft",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1340,
                  -100
            ],
            "webhookId": "d6dd2e7c-90ea-4b65-9c64-523d2541a054",
            "parameters": {
                  "sendTo": "YOUR GMAIL ADDRESS",
                  "message": "=<h3>MESSAGE</h3>\n{{ $('Email Trigger (IMAP)').item.json.textHtml }}\n\n<h3>AI RESPONSE</h3>\n{{ $json.output }}",
                  "options": {},
                  "subject": "=[Approval Required] {{ $('Email Trigger (IMAP)').item.json.subject }}",
                  "operation": "sendAndWait",
                  "approvalOptions": {
                        "values": {
                              "approvalType": "double"
                        }
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "nyuHvSX5HuqfMPlW",
                        "name": "Gmail account (n3w.it)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "0aae1689-cee7-403a-8640-396db32eceed",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1300,
                  -300
            ],
            "parameters": {
                  "color": 4,
                  "height": 360,
                  "content": "## IMPORTANT\n\nFor the \"Send Draft\" node, you need to send the draft email to a Gmail address because it is the only one that allows the \"Send and wait for response\" function."
            },
            "typeVersion": 1
      }
],
    connections: {
      "OpenAI": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Write email",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Approve?": {
            "main": [
                  [
                        {
                              "node": "Send Email",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set Email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Markdown": {
            "main": [
                  [
                        {
                              "node": "Email Summarization Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Email": {
            "main": [
                  [
                        {
                              "node": "Write email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Draft": {
            "main": [
                  [
                        {
                              "node": "Approve?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "DeepSeek R1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Email Summarization Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Write email": {
            "main": [
                  [
                        {
                              "node": "Send Draft",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI": {
            "ai_embedding": [
                  [
                        {
                              "node": "Qdrant Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Qdrant Vector Store": {
            "ai_tool": [
                  [
                        {
                              "node": "Write email",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Trigger (IMAP)": {
            "main": [
                  [
                        {
                              "node": "Markdown",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Summarization Chain": {
            "main": [
                  [
                        {
                              "node": "Set Email",
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
    name: "Analyze & Sort Suspicious Email Contents With ChatGPT",
    nodes: [
      {
            "id": "94dd7f48-0013-4fb5-89c4-826ecd7f2d66",
            "name": "Gmail Trigger",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  1460,
                  120
            ],
            "parameters": {
                  "simple": false,
                  "filters": {},
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "kkhNhqKpZt6IUZd0",
                        "name": "Gmail"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "ca2023fa-ceca-4923-80e4-a3843803536c",
            "name": "Microsoft Outlook Trigger",
            "type": "n8n-nodes-base.microsoftOutlookTrigger",
            "disabled": true,
            "position": [
                  1480,
                  680
            ],
            "parameters": {
                  "fields": [
                        "body",
                        "toRecipients",
                        "subject",
                        "bodyPreview"
                  ],
                  "output": "fields",
                  "filters": {},
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "vTCK0oVQ0WjFrI5H",
                        "name": " Outlook Credential"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "1f011214-91a0-4cfa-9d9e-29864937c0a3",
            "name": "Screenshot HTML",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2620,
                  420
            ],
            "parameters": {
                  "url": "https://hcti.io/v1/image",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendQuery": true,
                  "authentication": "genericCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "html",
                                    "value": "={{ $('Set Email Variables').item.json.htmlBody }}"
                              }
                        ]
                  },
                  "genericAuthType": "httpBasicAuth",
                  "queryParameters": {
                        "parameters": [
                              {}
                        ]
                  }
            },
            "credentials": {
                  "httpBasicAuth": {
                        "id": "8tm8mUWmPvtmPFPk",
                        "name": "hcti.io"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "64f4789f-9de8-414f-af62-ddc339f0d0ac",
            "name": "Retrieve Screenshot",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2800,
                  420
            ],
            "parameters": {
                  "url": "={{ $json.url }}",
                  "options": {},
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpBasicAuth"
            },
            "credentials": {
                  "httpBasicAuth": {
                        "id": "8tm8mUWmPvtmPFPk",
                        "name": "hcti.io"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "db707bd9-6abc-4ab7-8ffa-ad25c5e8adc4",
            "name": "Set Outlook Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  2040,
                  680
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "38bd3db2-1a8d-4c40-a2dd-336e0cc84224",
                                    "name": "htmlBody",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook Trigger').item.json.body.content }}"
                              },
                              {
                                    "id": "13bdd95b-ef02-486e-b38b-d14bd05a4a8a",
                                    "name": "headers",
                                    "type": "string",
                                    "value": "={{ $json}}"
                              },
                              {
                                    "id": "20566ad4-7eb7-42b1-8a0d-f8b759610f10",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook Trigger').item.json.subject }}"
                              },
                              {
                                    "id": "7171998f-a5a2-4e23-946a-9c1ad75710e7",
                                    "name": "recipient",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook Trigger').item.json.toRecipients[0].emailAddress.address }}"
                              },
                              {
                                    "id": "cc262634-2470-4524-8319-abe2518a6335",
                                    "name": "textBody",
                                    "type": "string",
                                    "value": "={{ $('Retrieve Headers of Email').item.json.body.content }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "7a3622c0-6949-4ea3-ae13-46a1ee26de7b",
            "name": "Set Gmail Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  2020,
                  120
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "38bd3db2-1a8d-4c40-a2dd-336e0cc84224",
                                    "name": "htmlBody",
                                    "type": "string",
                                    "value": "={{ $json.html }}"
                              },
                              {
                                    "id": "18fbcf78-6d3c-4036-b3a2-fb5adf22176a",
                                    "name": "headers",
                                    "type": "string",
                                    "value": "={{ $json.headers }}"
                              },
                              {
                                    "id": "1d690098-be2a-4604-baf8-62f314930929",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "8009f00a-547f-4eb1-b52d-2e7305248885",
                                    "name": "recipient",
                                    "type": "string",
                                    "value": "={{ $json.to.text }}"
                              },
                              {
                                    "id": "1932e97d-b03b-4964-b8bc-8262aaaa1f7a",
                                    "name": "textBody",
                                    "type": "string",
                                    "value": "={{ $json.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "4b4c6b34-f74c-4402-91a1-4d002e02a3bd",
            "name": "Retrieve Headers of Email",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1700,
                  680
            ],
            "parameters": {
                  "url": "=https://graph.microsoft.com/v1.0/me/messages/{{ $json.id }}?$select=internetMessageHeaders,body",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Accept",
                                    "value": "application/json"
                              },
                              {
                                    "name": "Prefer",
                                    "value": "outlook.body-content-type=\"text\""
                              }
                        ]
                  },
                  "nodeCredentialType": "microsoftOutlookOAuth2Api"
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "vTCK0oVQ0WjFrI5H",
                        "name": " Outlook Credential"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "0c9883b5-3eb7-45db-9803-d1b30166a3b5",
            "name": "Format Headers",
            "type": "n8n-nodes-base.code",
            "position": [
                  1880,
                  680
            ],
            "parameters": {
                  "jsCode": "const input = $('Retrieve Headers of Email').item.json.internetMessageHeaders;\n\nconst result = input.reduce((acc, { name, value }) => {\n if (!acc[name]) acc[name] = [];\n acc[name].push(value);\n return acc;\n}, {});\n\nreturn result;"
            },
            "typeVersion": 2
      },
      {
            "id": "c21a976c-00e5-4823-bd94-4c95a7d60438",
            "name": "Analyze Email with ChatGPT",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  3000,
                  420
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o",
                        "cachedResultName": "GPT-4O"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "content": "=Describe the following email using the HTML body and headers. Determine if the email could be a phishing email. \n\nHere is the HTML body:\n{{ $('Set Email Variables').item.json.htmlBody }}\n\nThe message headers are as follows:\n{{ $('Set Email Variables').item.json.headers }}\n\n"
                              },
                              {
                                    "role": "system",
                                    "content": "Please make sure to output all responses using the following structured JSON output:\n{\n \"malicious\": false,\n \"summary\": \"The email appears to be a legitimate communication from a known sender. It contains no suspicious links, attachments, or language that indicates phishing or malicious intent.\"\n}\n\nFormat the response for Jira who uses a wiki-style renderer. Do not include ``` around your response. Make the summary as verbose as possible including a full breakdown of why the email is benign or malicious."
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "76",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.6
      },
      {
            "id": "a91f4095-9245-4276-b21f-f415de22df62",
            "name": "Create Potentially Malicious Ticket",
            "type": "n8n-nodes-base.jira",
            "position": [
                  3640,
                  400
            ],
            "parameters": {
                  "project": {
                        "__rl": true,
                        "mode": "list",
                        "value": "10001",
                        "cachedResultName": "Support"
                  },
                  "summary": "=Potentially Malicious - Phishing Email Reported: \"{{ $('Set Email Variables').item.json.subject }}\"",
                  "issueType": {
                        "__rl": true,
                        "mode": "list",
                        "value": "10008",
                        "cachedResultName": "Task"
                  },
                  "additionalFields": {
                        "description": "=A phishing email was reported by {{ $('Set Email Variables').item.json.recipient }} with the subject line \"{{ $('Set Email Variables').item.json.subject }}\"\n\\\\\nh2. Here is ChatGPT's analysis of the email:\n{{ $json.message.content.summary }}"
                  }
            },
            "credentials": {
                  "jiraSoftwareCloudApi": {
                        "id": "BZmmGUrNIsgM9fDj",
                        "name": "New Jira Cloud"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a5a66a0e-9d8a-45a9-b1ae-aec78ddfec27",
            "name": "Create Potentially Benign Ticket",
            "type": "n8n-nodes-base.jira",
            "position": [
                  3640,
                  580
            ],
            "parameters": {
                  "project": {
                        "__rl": true,
                        "mode": "list",
                        "value": "10001",
                        "cachedResultName": "Support"
                  },
                  "summary": "=Potentially Benign - Phishing Email Reported: \"{{ $('Set Email Variables').item.json.subject }}\"",
                  "issueType": {
                        "__rl": true,
                        "mode": "list",
                        "value": "10008",
                        "cachedResultName": "Task"
                  },
                  "additionalFields": {
                        "description": "=A phishing email was reported by {{ $('Set Email Variables').item.json.recipient }} with the subject line \"{{ $('Set Email Variables').item.json.subject }}\"\n\\\\\nh2. Here is ChatGPT's analysis of the email:\n{{ $json.message.content.summary }}"
                  }
            },
            "credentials": {
                  "jiraSoftwareCloudApi": {
                        "id": "BZmmGUrNIsgM9fDj",
                        "name": "New Jira Cloud"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5af0d60b-d021-4dd9-98f7-b2842800764a",
            "name": "Rename Screenshot",
            "type": "n8n-nodes-base.code",
            "position": [
                  4020,
                  480
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "$('Retrieve Screenshot').item.binary.data.fileName = 'emailScreenshot.png'\n\nreturn $('Retrieve Screenshot').item;"
            },
            "typeVersion": 2
      },
      {
            "id": "441c4cbb-bd93-4213-bd34-e18f2a49389f",
            "name": "Set Jira ID",
            "type": "n8n-nodes-base.set",
            "position": [
                  3860,
                  480
            ],
            "parameters": {
                  "options": {},
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "4c71188c-011d-4f8e-a36c-87900bfab59a",
            "name": "Upload Screenshot of Email to Jira",
            "type": "n8n-nodes-base.jira",
            "position": [
                  4220,
                  480
            ],
            "parameters": {
                  "issueKey": "={{ $('Set Jira ID').item.json.key }}",
                  "resource": "issueAttachment"
            },
            "credentials": {
                  "jiraSoftwareCloudApi": {
                        "id": "BZmmGUrNIsgM9fDj",
                        "name": "New Jira Cloud"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "3c031c34-8306-44e1-8e0e-a584c5323112",
            "name": "Upload Email Body to Jira",
            "type": "n8n-nodes-base.jira",
            "position": [
                  4620,
                  480
            ],
            "parameters": {
                  "issueKey": "={{ $('Set Jira ID').item.json.key }}",
                  "resource": "issueAttachment"
            },
            "credentials": {
                  "jiraSoftwareCloudApi": {
                        "id": "BZmmGUrNIsgM9fDj",
                        "name": "New Jira Cloud"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d033dcbd-7ccb-451f-ab81-cc6d32d2e01f",
            "name": "Convert Email Body to File",
            "type": "n8n-nodes-base.convertToFile",
            "position": [
                  2420,
                  420
            ],
            "parameters": {
                  "options": {
                        "fileName": "emailBody.txt"
                  },
                  "operation": "toText",
                  "sourceProperty": "textBody"
            },
            "typeVersion": 1.1
      },
      {
            "id": "bda5e2fe-d8c0-456b-975a-35e82ff02816",
            "name": "Set Email Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  2240,
                  420
            ],
            "parameters": {
                  "options": {},
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "54ecd8ab-ac4a-4b6b-bd1b-bf8c70082a33",
            "name": "Rename Email Body Screenshot",
            "type": "n8n-nodes-base.code",
            "position": [
                  4420,
                  480
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "$('Convert Email Body to File').item.binary.data.fileName = 'emailBody.txt'\n\nreturn $('Convert Email Body to File').item;"
            },
            "typeVersion": 2
      },
      {
            "id": "fe5b82cc-b4bb-4c97-9477-075d5a280e9f",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2574.536755825029,
                  0
            ],
            "parameters": {
                  "color": 7,
                  "width": 376.8280004374956,
                  "height": 595.590013880477,
                  "content": "![hctiapi](https://uploads.n8n.io/templates/hctiapi2.png)\n## Email Body Screenshot Creation\n\nThe **Screenshot HTML** node sends the email's HTML body to the **hcti.io** API, generating a screenshot that visually represents the email's layout. The **Retrieve Screenshot** node then fetches this image, making it available for attachment or review in subsequent steps. This dual-format processing ensures both clarity and flexibility in email analysis workflows."
            },
            "typeVersion": 1
      },
      {
            "id": "86b21049-f65e-4c6a-a854-c4376f870da9",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1380,
                  -149.99110983560342
            ],
            "parameters": {
                  "color": 7,
                  "width": 814.4556539379754,
                  "height": 444.5525554815556,
                  "content": "![Gmail](https://uploads.n8n.io/templates/gmail.png)\n## Gmail Integration and Data Extraction\n\nThis section of the workflow connects to a Gmail account using the **Gmail Trigger** node, capturing incoming emails in real-time, with checks performed every minute. Once an email is detected, its key components—such as the subject, recipient, body, and headers—are extracted and assigned to variables using the **Set Gmail Variables** node. These variables are structured for subsequent analysis and processing in later steps."
            },
            "typeVersion": 1
      },
      {
            "id": "b1a786cf-7a8d-49e1-90ed-31f3d0e65b13",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1380,
                  308
            ],
            "parameters": {
                  "color": 7,
                  "width": 809.7918597571277,
                  "height": 602.9002284617277,
                  "content": "![Gmail](https://uploads.n8n.io/templates/outlook.png)\n## Microsoft Outlook Integration and Email Header Processing\n\nThis section enables the integration of Microsoft Outlook to monitor and capture incoming emails. The Microsoft Outlook Trigger node checks for new messages every minute. Once an email is detected, the Retrieve Headers of Email node fetches detailed header and body content via the Microsoft Graph API. The Format Headers node organizes the email headers into a structured format using a JavaScript function, ensuring clarity and readiness for further processing. Finally, the Set Outlook Variables node extracts and assigns key details—such as the email subject, recipient, body, and formatted headers—to variables for use in subsequent workflow steps. This section is essential for processing Outlook emails and preparing them for analysis and reporting.\n\n\n\n\n\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "e7ace035-b5f5-4ef3-a117-22c7c938868d",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2958.4325220284563,
                  24.744924120002338
            ],
            "parameters": {
                  "color": 7,
                  "width": 593.0990401534098,
                  "height": 573.1750519720028,
                  "content": "![hctiapi](https://uploads.n8n.io/templates/openai.png)\n## AI-Powered Email Analysis and Threat Detection\n\nThis section leverages ChatGPT for advanced email content and header analysis to determine potential phishing threats. The **Analyze Email with ChatGPT** node processes the email's HTML body and headers, generating a detailed JSON response that categorizes the email as malicious or benign. The response includes a verbose explanation, formatted for Jira, outlining the reasons for the classification. The **Check if Malicious** node evaluates the AI output to determine the next steps based on the email's threat status. If flagged as malicious, subsequent actions like reporting and ticket creation are triggered. This section ensures precise, AI-driven analysis to enhance email security workflows."
            },
            "typeVersion": 1
      },
      {
            "id": "02c1ad8e-f952-42d2-ae9f-cf3a77e49e52",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3562.4948140707697,
                  -125.79607719303533
            ],
            "parameters": {
                  "color": 7,
                  "width": 1251.7025543502837,
                  "height": 891.579206098173,
                  "content": "![hctiapi](https://uploads.n8n.io/templates/jira.png)\n## Automated Jira Ticket Creation and Email Attachment\n\nThis section streamlines the process of logging phishing email reports in Jira, complete with detailed analysis and attachments. The workflow creates two distinct Jira tickets depending on the AI classification of the email:\n\n1. **Potentially Malicious**: The **Create Potentially Malicious Ticket** node generates a ticket if the email is flagged as a phishing attempt, including a summary of ChatGPT's analysis and the email’s details.\n2. **Potentially Benign**: If the email is classified as safe, the **Create Potentially Benign Ticket** node logs a ticket with similar details but under a non-malicious category.\n\n\nThe **Set Jira ID** node ensures the generated ticket's ID is tracked for subsequent operations. Attachments are handled efficiently:\n\n- **Rename Screenshot** prepares the email screenshot for upload.\n- **Upload Screenshot of Email to Jira** adds the screenshot to the Jira ticket for visual context.\n- **Rename Email Body Screenshot** and **Upload Email Body to Jira** manage the attachment of the email's text body as a `.txt` file.\n\n\nThis section enhances reporting by automating ticket creation, ensuring all relevant email data is readily available for review by security teams."
            },
            "typeVersion": 1
      },
      {
            "id": "597ef23e-c61c-4e27-8c14-74ec20079c96",
            "name": "Check if Malicious",
            "type": "n8n-nodes-base.if",
            "position": [
                  3400,
                  420
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
                                    "id": "493f412c-5f11-4173-8940-90f5bc7f5fab",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.content.malicious }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "af512af9-924b-4019-bdf9-62aac9cd0dac",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2200,
                  39.041733604283195
            ],
            "parameters": {
                  "color": 7,
                  "width": 365.6458805720866,
                  "height": 559.8072303111675,
                  "content": "![n8n](https://uploads.n8n.io/templates/n8n.png)\n## Email Body Conversion\n\nThis section processes the email body into both text and visual formats for detailed analysis and reporting. The **Set Email Variables** node organizes the email's data, including its HTML body and text content, to prepare it for further steps. The **Convert Email Body to File** node creates a `.txt` file containing the plain text version of the email body, useful for documentation or further analysis."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Set Jira ID": {
            "main": [
                  [
                        {
                              "node": "Rename Screenshot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail Trigger": {
            "main": [
                  [
                        {
                              "node": "Set Gmail Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format Headers": {
            "main": [
                  [
                        {
                              "node": "Set Outlook Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Screenshot HTML": {
            "main": [
                  [
                        {
                              "node": "Retrieve Screenshot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Rename Screenshot": {
            "main": [
                  [
                        {
                              "node": "Upload Screenshot of Email to Jira",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check if Malicious": {
            "main": [
                  [
                        {
                              "node": "Create Potentially Malicious Ticket",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Create Potentially Benign Ticket",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve Screenshot": {
            "main": [
                  [
                        {
                              "node": "Analyze Email with ChatGPT",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Email Variables": {
            "main": [
                  [
                        {
                              "node": "Convert Email Body to File",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Gmail Variables": {
            "main": [
                  [
                        {
                              "node": "Set Email Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Outlook Variables": {
            "main": [
                  [
                        {
                              "node": "Set Email Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook Trigger": {
            "main": [
                  [
                        {
                              "node": "Retrieve Headers of Email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve Headers of Email": {
            "main": [
                  [
                        {
                              "node": "Format Headers",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze Email with ChatGPT": {
            "main": [
                  [
                        {
                              "node": "Check if Malicious",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Convert Email Body to File": {
            "main": [
                  [
                        {
                              "node": "Screenshot HTML",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Rename Email Body Screenshot": {
            "main": [
                  [
                        {
                              "node": "Upload Email Body to Jira",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Potentially Benign Ticket": {
            "main": [
                  [
                        {
                              "node": "Set Jira ID",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload Screenshot of Email to Jira": {
            "main": [
                  [
                        {
                              "node": "Rename Email Body Screenshot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Potentially Malicious Ticket": {
            "main": [
                  [
                        {
                              "node": "Set Jira ID",
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
    name: "Analyze Suspicious Email Contents With ChatGPT Vision",
    nodes: [
      {
            "id": "1bad6bfc-9ec9-48a5-b8f7-73c4de3d08cf",
            "name": "Gmail Trigger",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  1480,
                  160
            ],
            "parameters": {
                  "simple": false,
                  "filters": {},
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "kkhNhqKpZt6IUZd0",
                        "name": " Gmail"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "9ac747a1-4fd8-46ba-b4c1-75fd17aab2ed",
            "name": "Microsoft Outlook Trigger",
            "type": "n8n-nodes-base.microsoftOutlookTrigger",
            "disabled": true,
            "position": [
                  1480,
                  720
            ],
            "parameters": {
                  "fields": [
                        "body",
                        "toRecipients",
                        "subject",
                        "bodyPreview"
                  ],
                  "output": "fields",
                  "filters": {},
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "vTCK0oVQ0WjFrI5H",
                        "name": " Outlook Credential"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5bf9b0e8-b84e-44a2-aad2-45dde3e4ab1b",
            "name": "Screenshot HTML",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2520,
                  480
            ],
            "parameters": {
                  "url": "https://hcti.io/v1/image",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendQuery": true,
                  "authentication": "genericCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "html",
                                    "value": "={{ $json.htmlBody }}"
                              }
                        ]
                  },
                  "genericAuthType": "httpBasicAuth",
                  "queryParameters": {
                        "parameters": [
                              {}
                        ]
                  }
            },
            "credentials": {
                  "httpBasicAuth": {
                        "id": "8tm8mUWmPvtmPFPk",
                        "name": "hcti.io"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "fc770d1d-6c18-4d14-8344-1dc042464df6",
            "name": "Retrieve Screenshot",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2700,
                  480
            ],
            "parameters": {
                  "url": "={{ $json.url }}",
                  "options": {},
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpBasicAuth"
            },
            "credentials": {
                  "httpBasicAuth": {
                        "id": "8tm8mUWmPvtmPFPk",
                        "name": "hcti.io"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "2f3e5cc0-24e8-450a-898b-71e2d6f7bb58",
            "name": "Set Outlook Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  2020,
                  720
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "38bd3db2-1a8d-4c40-a2dd-336e0cc84224",
                                    "name": "htmlBody",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook Trigger').item.json.body.content }}"
                              },
                              {
                                    "id": "13bdd95b-ef02-486e-b38b-d14bd05a4a8a",
                                    "name": "headers",
                                    "type": "string",
                                    "value": "={{ $json}}"
                              },
                              {
                                    "id": "20566ad4-7eb7-42b1-8a0d-f8b759610f10",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook Trigger').item.json.subject }}"
                              },
                              {
                                    "id": "7171998f-a5a2-4e23-946a-9c1ad75710e7",
                                    "name": "recipient",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook Trigger').item.json.toRecipients[0].emailAddress.address }}"
                              },
                              {
                                    "id": "cc262634-2470-4524-8319-abe2518a6335",
                                    "name": "textBody",
                                    "type": "string",
                                    "value": "={{ $('Retrieve Headers of Email').item.json.body.content }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "374e5b16-a666-4706-9fd2-762b2927012d",
            "name": "Set Gmail Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  2040,
                  160
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "38bd3db2-1a8d-4c40-a2dd-336e0cc84224",
                                    "name": "htmlBody",
                                    "type": "string",
                                    "value": "={{ $json.html }}"
                              },
                              {
                                    "id": "18fbcf78-6d3c-4036-b3a2-fb5adf22176a",
                                    "name": "headers",
                                    "type": "string",
                                    "value": "={{ $json.headers }}"
                              },
                              {
                                    "id": "1d690098-be2a-4604-baf8-62f314930929",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "8009f00a-547f-4eb1-b52d-2e7305248885",
                                    "name": "recipient",
                                    "type": "string",
                                    "value": "={{ $json.to.text }}"
                              },
                              {
                                    "id": "1932e97d-b03b-4964-b8bc-8262aaaa1f7a",
                                    "name": "textBody",
                                    "type": "string",
                                    "value": "={{ $json.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "3166738e-d0a3-475b-8b19-51afd519ee3a",
            "name": "Retrieve Headers of Email",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1680,
                  720
            ],
            "parameters": {
                  "url": "=https://graph.microsoft.com/v1.0/me/messages/{{ $json.id }}?$select=internetMessageHeaders,body",
                  "options": {},
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Accept",
                                    "value": "application/json"
                              },
                              {
                                    "name": "Prefer",
                                    "value": "outlook.body-content-type=\"text\""
                              }
                        ]
                  },
                  "nodeCredentialType": "microsoftOutlookOAuth2Api"
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "vTCK0oVQ0WjFrI5H",
                        "name": " Outlook Credential"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "25ae222c-088f-4565-98d6-803c8c1b0826",
            "name": "Format Headers",
            "type": "n8n-nodes-base.code",
            "position": [
                  1860,
                  720
            ],
            "parameters": {
                  "jsCode": "const input = $('Retrieve Headers of Email').item.json.internetMessageHeaders;\n\nconst result = input.reduce((acc, { name, value }) => {\n if (!acc[name]) acc[name] = [];\n acc[name].push(value);\n return acc;\n}, {});\n\nreturn result;"
            },
            "typeVersion": 2
      },
      {
            "id": "8f14f267-1074-43ea-968d-26a6ab36fd7b",
            "name": "Set Email Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  2360,
                  480
            ],
            "parameters": {
                  "options": {},
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "45d156aa-91f4-483c-91d4-c9de4a4f595d",
            "name": "ChatGPT Analysis",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  3100,
                  480
            ],
            "parameters": {
                  "text": "=Describe this image. Determine if the email could be a phishing email. The message headers are as follows:\n{{ $('Set Email Variables').item.json.headers }}\n\nFormat the response for Jira who uses a wiki-style renderer. Do not include ``` around your response.",
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "chatgpt-4o-latest",
                        "cachedResultName": "CHATGPT-4O-LATEST"
                  },
                  "options": {
                        "maxTokens": 1500
                  },
                  "resource": "image",
                  "inputType": "base64",
                  "operation": "analyze"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "76",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.6
      },
      {
            "id": "62ca591b-6627-496c-96a7-95cb0081480d",
            "name": "Create Jira Ticket",
            "type": "n8n-nodes-base.jira",
            "position": [
                  3500,
                  480
            ],
            "parameters": {
                  "project": {
                        "__rl": true,
                        "mode": "list",
                        "value": "10001",
                        "cachedResultName": "Support"
                  },
                  "summary": "=Phishing Email Reported: \"{{ $('Set Email Variables').item.json.subject }}\"",
                  "issueType": {
                        "__rl": true,
                        "mode": "list",
                        "value": "10008",
                        "cachedResultName": "Task"
                  },
                  "additionalFields": {
                        "description": "=A phishing email was reported by {{ $('Set Email Variables').item.json.recipient }} with the subject line \"{{ $('Set Email Variables').item.json.subject }}\" and body:\n{{ $('Set Email Variables').item.json.textBody }}\n\\\\\n\\\\\n\\\\\nh2. Here is ChatGPT's analysis of the email:\n{{ $json.content }}"
                  }
            },
            "credentials": {
                  "jiraSoftwareCloudApi": {
                        "id": "BZmmGUrNIsgM9fDj",
                        "name": "New Jira Cloud"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "071380c8-8070-4f8f-86c6-87c4ee3bc261",
            "name": "Rename Screenshot",
            "type": "n8n-nodes-base.code",
            "position": [
                  3680,
                  480
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "$('Retrieve Screenshot').item.binary.data.fileName = 'emailScreenshot.png'\n\nreturn $('Retrieve Screenshot').item;"
            },
            "typeVersion": 2
      },
      {
            "id": "05c57490-c1ee-48f0-9e38-244c9a995e22",
            "name": "Upload Screenshot of Email to Jira",
            "type": "n8n-nodes-base.jira",
            "position": [
                  3860,
                  480
            ],
            "parameters": {
                  "issueKey": "={{ $('Create Jira Ticket').item.json.key }}",
                  "resource": "issueAttachment"
            },
            "credentials": {
                  "jiraSoftwareCloudApi": {
                        "id": "BZmmGUrNIsgM9fDj",
                        "name": "New Jira Cloud"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "be02770d-a943-41f5-98a9-5c433a6a3dbf",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1420,
                  -107.36679523834897
            ],
            "parameters": {
                  "color": 7,
                  "width": 792.3026315789474,
                  "height": 426.314163659402,
                  "content": "![Gmail](https://uploads.n8n.io/templates/gmail.png)\n## Gmail Integration and Data Extraction\n\nThis section of the workflow connects to a Gmail account using the **Gmail Trigger** node, capturing incoming emails in real-time, with checks performed every minute. Once an email is detected, its key components—such as the subject, recipient, body, and headers—are extracted and assigned to variables using the **Set Gmail Variables** node. These variables are structured for subsequent analysis and processing in later steps."
            },
            "typeVersion": 1
      },
      {
            "id": "c1d2f691-669a-46de-9ef8-59ce4e6980c5",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1420,
                  380.6918768014301
            ],
            "parameters": {
                  "color": 7,
                  "width": 792.3026315789474,
                  "height": 532.3344389880435,
                  "content": "![Gmail](https://uploads.n8n.io/templates/outlook.png)\n## Microsoft Outlook Integration and Email Header Processing\n\nThis section connects to a Microsoft Outlook account to monitor incoming emails using the **Microsoft Outlook Trigger** node, which checks for new messages every minute. Emails are then processed to retrieve detailed headers and body content via the **Retrieve Headers of Email** node. The headers are structured into a user-friendly format using the **Format Headers** code node, ensuring clarity for further analysis. Key details, including the email's subject, recipient, and body content, are assigned to variables with the **Set Outlook Variables** node for streamlined integration into subsequent workflow steps."
            },
            "typeVersion": 1
      },
      {
            "id": "c189e2e0-9f51-4bc0-a483-8b7f0528be70",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2287.3684210526317,
                  46.18421052631584
            ],
            "parameters": {
                  "color": 7,
                  "width": 580.4605263157906,
                  "height": 615.460526315789,
                  "content": "![hctiapi](https://uploads.n8n.io/templates/hctiapi.png)\n## HTML Screenshot Generation and Email Visualization\n\nThis section processes an email’s HTML content to create a visual representation, useful for documentation or phishing detection workflows. The **Set Email Variables** node organizes the email's HTML body into a format ready for processing. The **Screenshot HTML** node sends this HTML content to the **hcti.io** API, which generates a screenshot of the email's layout. The **Retrieve Screenshot** node then fetches the image URL for further use in the workflow. This setup ensures that the email's appearance is preserved in a visually accessible format, simplifying review and reporting. Keep in mind however that this exposes the email content to a third party. If you self host n8n, you can deploy a cli tool to rasterize locally instead."
            },
            "typeVersion": 1
      },
      {
            "id": "9076f9e9-f4fb-409a-9580-1ae459094c31",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2880,
                  123.72476075009968
            ],
            "parameters": {
                  "color": 7,
                  "width": 507.82894736842223,
                  "height": 537.9199760920052,
                  "content": "![hctiapi](https://uploads.n8n.io/templates/openai.png)\n## AI-Powered Email Analysis with ChatGPT\n\nThis section leverages AI to analyze email content and headers for phishing indicators. The **ChatGPT Analysis** node utilizes the ChatGPT-4 model to review the email screenshot and associated metadata, including message headers. It generates a detailed report indicating whether the email might be a phishing attempt. The output is formatted specifically for Jira’s wiki-style renderer, making it ready for seamless integration into ticketing workflows. This ensures thorough and automated email threat assessments."
            },
            "typeVersion": 1
      },
      {
            "id": "ca2488af-e787-4675-802a-8b4f2d845376",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3400,
                  122.88662032580646
            ],
            "parameters": {
                  "color": 7,
                  "width": 692.434210526317,
                  "height": 529.5475902005091,
                  "content": "![hctiapi](https://uploads.n8n.io/templates/jira.png)\n## Automated Jira Ticket Creation for Phishing Reports\n\nThis section streamlines the process of reporting phishing emails by automatically creating detailed Jira tickets. The **Create Jira Ticket** node compiles email information, including the subject, recipient, body text, and ChatGPT's phishing analysis, into a structured ticket. The **Rename Screenshot** node ensures that the email screenshot file is appropriately labeled for attachment. Finally, the **Upload Screenshot of Email to Jira** node attaches the email’s visual representation to the ticket, providing additional context for the security team. This integration ensures that phishing reports are logged with all necessary details, enabling efficient tracking and resolution."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Gmail Trigger": {
            "main": [
                  [
                        {
                              "node": "Set Gmail Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format Headers": {
            "main": [
                  [
                        {
                              "node": "Set Outlook Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Screenshot HTML": {
            "main": [
                  [
                        {
                              "node": "Retrieve Screenshot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "ChatGPT Analysis": {
            "main": [
                  [
                        {
                              "node": "Create Jira Ticket",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Rename Screenshot": {
            "main": [
                  [
                        {
                              "node": "Upload Screenshot of Email to Jira",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Jira Ticket": {
            "main": [
                  [
                        {
                              "node": "Rename Screenshot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve Screenshot": {
            "main": [
                  [
                        {
                              "node": "ChatGPT Analysis",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Email Variables": {
            "main": [
                  [
                        {
                              "node": "Screenshot HTML",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Gmail Variables": {
            "main": [
                  [
                        {
                              "node": "Set Email Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Outlook Variables": {
            "main": [
                  [
                        {
                              "node": "Set Email Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook Trigger": {
            "main": [
                  [
                        {
                              "node": "Retrieve Headers of Email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve Headers of Email": {
            "main": [
                  [
                        {
                              "node": "Format Headers",
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
    name: "Auto Categorise Outlook Emails With AI",
    nodes: [
      {
            "id": "30f5203b-469d-4f0c-8493-e8f08e14e4fe",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -560,
                  440
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "d16f59dd-f54e-487b-9aac-67f109ba9869",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  -280
            ],
            "parameters": {
                  "color": 7,
                  "width": 727.9032097745135,
                  "height": 110.58643966444157,
                  "content": "# Auto Categorise Outlook Emails with AI\nBuilt by [Wayne Simpson](https://www.linkedin.com/in/simpsonwayne/) at [nocodecreative.io](https://nocodecreative.io)"
            },
            "typeVersion": 1
      },
      {
            "id": "4e110412-8530-4322-bc5c-7f9df2b63bcb",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1100,
                  -120
            ],
            "parameters": {
                  "color": 7,
                  "width": 506.8102696237577,
                  "height": 337.24177957113216,
                  "content": "### Watch Set Up Video 👇\n[![Auto Categorise Outlook Emails with AI](https://vdyfnvnstovfxpabhdjc.supabase.co/storage/v1/object/public/images/Thumbnails/auto-categories-emails.png?t=2024-10-11T09%3A56%3A37.961Z#full-width)](https://www.youtube.com/watch?v=EhRBkkjv_3c)\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "9d79875f-148e-46ef-967a-95c07298456d",
            "name": "Ollama Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOllama",
            "position": [
                  1129,
                  684
            ],
            "parameters": {
                  "model": "qwen2.5:14b",
                  "options": {
                        "temperature": 0.2
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "bcf92a71-ff5f-46a7-bec3-cedb5be2bf98",
            "name": "Microsoft Outlook10",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  3020,
                  8
            ],
            "parameters": {
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj-aQEAnz-IOcWBGE2lrVuQgAF6zAAAAgFJAAAA",
                        "cachedResultUrl": "https://outlook.office365.com/mail/AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj%2FaQEAnz%2FIOcWBGE2lrVuQgAF6zAAAAgFJAAAA",
                        "cachedResultName": "Junk Email"
                  },
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "move"
            },
            "typeVersion": 2
      },
      {
            "id": "100db1cb-3819-43c7-a74b-5c087ad4f2da",
            "name": "Microsoft Outlook12",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2700,
                  8
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "d4969259-a3ae-473d-82ef-0c9f7933c899",
            "name": "Loop Over Items1",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  160,
                  448
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "524f6be3-7708-4aae-b9ab-e0ef8180a627",
            "name": "Microsoft Outlook13",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2700,
                  188
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "72cb54f3-4e4e-4ad2-8845-11a38fc29f1a",
            "name": "Microsoft Outlook15",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  3020,
                  188
            ],
            "parameters": {
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj-aQEAnz-IOcWBGE2lrVuQgAF6zAADLJmrBwAAAA==",
                        "cachedResultUrl": "https://outlook.office365.com/mail/AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj%2FaQEAnz%2FIOcWBGE2lrVuQgAF6zAADLJmrBwAAAA%3D%3D",
                        "cachedResultName": "Receipt"
                  },
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "move"
            },
            "typeVersion": 2
      },
      {
            "id": "e4446e84-c05e-4d04-b415-7608e39024ee",
            "name": "Microsoft Outlook16",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2709,
                  504
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "3ee05cfe-a528-472e-aa3d-c890fd88b6c4",
            "name": "Microsoft Outlook17",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  3020,
                  508
            ],
            "parameters": {
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj-aQEAnz-IOcWBGE2lrVuQgAF6zAADLJmrCAAAAA==",
                        "cachedResultUrl": "https://outlook.office365.com/mail/AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj%2FaQEAnz%2FIOcWBGE2lrVuQgAF6zAADLJmrCAAAAA%3D%3D",
                        "cachedResultName": "Community"
                  },
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "move"
            },
            "typeVersion": 2
      },
      {
            "id": "2fcecd9e-95cc-489a-b874-699c54518e44",
            "name": "Microsoft Outlook18",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2709,
                  344
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "41a39309-1a94-461f-9308-63dd5b9a94a7",
            "name": "Microsoft Outlook19",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  3020,
                  348
            ],
            "parameters": {
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj-aQEAnz-IOcWBGE2lrVuQgAF6zAADLJmrCQAAAA==",
                        "cachedResultUrl": "https://outlook.office365.com/mail/AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj%2FaQEAnz%2FIOcWBGE2lrVuQgAF6zAADLJmrCQAAAA%3D%3D",
                        "cachedResultName": "SaaS"
                  },
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "move"
            },
            "typeVersion": 2
      },
      {
            "id": "ebf606f9-099c-4218-b23b-66e2487262d0",
            "name": "Markdown1",
            "type": "n8n-nodes-base.markdown",
            "notes": "Converts the body of the email to markdown",
            "position": [
                  420,
                  468
            ],
            "parameters": {
                  "html": "={{ $('Loop Over Items1').item.json.body.content }}",
                  "options": {}
            },
            "notesInFlow": true,
            "typeVersion": 1
      },
      {
            "id": "ff447dd5-3ef6-4a02-8453-3489af8bf6b5",
            "name": "varEmal1",
            "type": "n8n-nodes-base.set",
            "notes": "Set email fields",
            "position": [
                  620,
                  468
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "edb304e1-3e9f-4a77-918c-25646addbc53",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "57a3ef3a-2701-40d9-882f-f43a7219f148",
                                    "name": "importance",
                                    "type": "string",
                                    "value": "={{ $json.importance }}"
                              },
                              {
                                    "id": "d8317f4f-aa0e-4196-89af-cb016765490a",
                                    "name": "sender",
                                    "type": "object",
                                    "value": "={{ $json.sender.emailAddress }}"
                              },
                              {
                                    "id": "908716c8-9ff7-4bdc-a1a3-64227559635e",
                                    "name": "from",
                                    "type": "object",
                                    "value": "={{ $json.from.emailAddress }}"
                              },
                              {
                                    "id": "ce007329-e221-4c5a-8130-2f8e9130160f",
                                    "name": "body",
                                    "type": "string",
                                    "value": "={{ $json.data\n .replace(/<[^>]*>/g, '') // Remove HTML tags\n .replace(/\\[(.*?)\\]\\((.*?)\\)/g, '') // Remove Markdown links like [text](link)\n .replace(/!\\[.*?\\]\\(.*?\\)/g, '') // Remove Markdown images like ![alt](image-link)\n .replace(/\\|/g, '') // Remove table separators \"|\"\n .replace(/-{3,}/g, '') // Remove horizontal rule \"---\"\n .replace(/\\n+/g, ' ') // Remove multiple newlines\n .replace(/([^\\w\\s.,!?@])/g, '') // Remove special characters except essential ones\n .replace(/\\s{2,}/g, ' ') // Replace multiple spaces with a single space\n .trim() // Trim leading/trailing whitespace\n}}\n"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "198524cb-c9f0-4261-8c38-7c878efe7457",
            "name": "Microsoft Outlook20",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2700,
                  668
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "ec73629c-59ac-4f0e-a432-2c06934952ab",
            "name": "Microsoft Outlook21",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2709,
                  1044
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "0a19d15c-0cd3-4f26-9be2-4914522751fb",
            "name": "Filter1",
            "type": "n8n-nodes-base.filter",
            "position": [
                  -100,
                  448
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
                                    "id": "c8cd6917-f94e-4fb7-8601-b8ed8f1aa8bf",
                                    "operator": {
                                          "type": "array",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.categories }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "96e6e31c-6306-44a8-a57a-2b5216636b00",
            "name": "If1",
            "type": "n8n-nodes-base.if",
            "notes": "Checks if the email has been read",
            "position": [
                  3320,
                  668
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
                                    "id": "f8cf2a56-cea8-4150-b7a0-048dbda20f2f",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.isRead }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "8a6e0118-abe3-45e2-aefc-94640348b2ec",
            "name": "Microsoft Outlook22",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  2709,
                  864
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ \n [$('varJSON1').first().json.output.category, $('varJSON1').first().json.output.subCategory]\n .filter(item => item && item.trim() !== \"\")\n .map(item => item.charAt(0).toUpperCase() + item.slice(1))\n}}"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "e2d8e7b5-4447-4327-9f4e-b8d52765667e",
            "name": "Catch Errors1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1760,
                  608
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "0dc6d439-60fb-49f6-b4d5-f5cce6f030ad",
                                    "name": "error",
                                    "type": "string",
                                    "value": "={{ $json }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "17f6ac43-51e4-4bee-b0d8-13deb3bf3cc9",
            "name": "varJSON1",
            "type": "n8n-nodes-base.set",
            "onError": "continueErrorOutput",
            "position": [
                  1540,
                  468
            ],
            "parameters": {
                  "options": {
                        "ignoreConversionErrors": true
                  },
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "0c52f57f-74eb-4385-ac6b-f3e5f4f50e73",
                                    "name": "output",
                                    "type": "object",
                                    "value": "={{ $json.output.replace(/^.*?({.*}).*$/s, '$1') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "82dd9631-a34b-4d54-be28-6f8dcc3548f0",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -360,
                  220
            ],
            "parameters": {
                  "width": 411.91693012378937,
                  "height": 401.49417117683515,
                  "content": "## Outlook Business with filters\nFilters:\n```\nflag/flagStatus eq 'notFlagged' and not categories/any()\n```\n\nThese filters ensure we do not process flagged emails or email that already have a category set."
            },
            "typeVersion": 1
      },
      {
            "id": "0583e196-37a5-43db-8c0a-aa624029c926",
            "name": "Microsoft Outlook23",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  -300,
                  448
            ],
            "parameters": {
                  "limit": 1,
                  "fields": [
                        "flag",
                        "from",
                        "importance",
                        "replyTo",
                        "sender",
                        "subject",
                        "toRecipients",
                        "body",
                        "categories",
                        "isRead"
                  ],
                  "output": "fields",
                  "options": {},
                  "filtersUI": {
                        "values": {
                              "filters": {
                                    "custom": "flag/flagStatus eq 'notFlagged' and not categories/any()",
                                    "foldersToInclude": [
                                          "AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj-aQEAnz-IOcWBGE2lrVuQgAF6zAAAAgEMAAAA"
                                    ]
                              }
                        }
                  },
                  "operation": "getAll"
            },
            "typeVersion": 2
      },
      {
            "id": "a9540e6b-929b-4460-8972-93e4d19cd934",
            "name": "varID & Category1",
            "type": "n8n-nodes-base.set",
            "position": [
                  900,
                  468
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "de2ad4f2-7381-4715-a3f4-59611e161b74",
                                    "name": "id",
                                    "type": "string",
                                    "value": "={{ $('Microsoft Outlook23').item.json.id }}"
                              },
                              {
                                    "id": "458c7a89-e4a3-46d0-8b38-72d87748e306",
                                    "name": "category",
                                    "type": "string",
                                    "value": "\"action\", \"junk\", \"receipt\", \"SaaS\", \"community\", \"business\" or \"other\""
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "e6b3b41e-d7d3-4c9b-8189-a005c748ff18",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  360,
                  348
            ],
            "parameters": {
                  "color": 6,
                  "width": 418.7820408163265,
                  "height": 301.40952380952365,
                  "content": "## Sanitise Email \nRemoves HTML and useless information in preparation for the AI Agent"
            },
            "typeVersion": 1
      },
      {
            "id": "f9787a75-526c-4ef1-b0a7-0db7d890ab3f",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  820,
                  348
            ],
            "parameters": {
                  "color": 6,
                  "width": 256.16108843537415,
                  "height": 298.37931972789124,
                  "content": "## Modify Categories \nEdit this to customise category selection"
            },
            "typeVersion": 1
      },
      {
            "id": "50223a01-34cf-4191-9dd7-3dac02a9e945",
            "name": "Sticky Note13",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1480,
                  328
            ],
            "parameters": {
                  "color": 5,
                  "width": 441.003537414966,
                  "height": 463.0204081632651,
                  "content": "## Convert to JSON\n* Ensures the Agent output to converted to JSON\n* Catches any errors and continues processing"
            },
            "typeVersion": 1
      },
      {
            "id": "4580c532-96a6-46b4-8922-d79316d1cc01",
            "name": "Sticky Note14",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2120,
                  328
            ],
            "parameters": {
                  "color": 5,
                  "width": 311.71482993197264,
                  "height": 454.93986394557805,
                  "content": "## Switch Categories\nEnsure your categories match the **varID & Category** Edit Fields node"
            },
            "typeVersion": 1
      },
      {
            "id": "b51a7c34-2a5e-4670-81a4-d1582711c69a",
            "name": "Sticky Note15",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2629,
                  -76
            ],
            "parameters": {
                  "color": 4,
                  "width": 251.3480889735252,
                  "height": 1289.0156245602684,
                  "content": "## Set Categories\n"
            },
            "typeVersion": 1
      },
      {
            "id": "3a7ede7b-539b-49d2-8803-153ca6c9eb69",
            "name": "Sticky Note16",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2949,
                  -76
            ],
            "parameters": {
                  "color": 4,
                  "width": 251.3480889735252,
                  "height": 770.995811762121,
                  "content": "## Move to Folders\n"
            },
            "typeVersion": 1
      },
      {
            "id": "ee9a9d78-8c07-470a-9d1b-ceddfc8875ca",
            "name": "Sticky Note17",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3260,
                  553
            ],
            "parameters": {
                  "color": 4,
                  "height": 293.65527013262994,
                  "content": "## Check if email has been read\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "c75b9d38-79a7-4be2-a90b-a99da1bbd745",
            "name": "Microsoft Outlook Move Message1",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  3609,
                  604
            ],
            "parameters": {
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj-aQEAnz-IOcWBGE2lrVuQgAF6zAADLJmrCwAAAA==",
                        "cachedResultUrl": "https://outlook.office365.com/mail/AQMkAGE3ZTU5MGMzLTFkNGItNGQ5Zi04MDQ1LThmNGFlMTVhYjMwYgAuAAAD8UhruVwm402lgPBG2Tj%2FaQEAnz%2FIOcWBGE2lrVuQgAF6zAADLJmrCwAAAA%3D%3D",
                        "cachedResultName": "Actioned"
                  },
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('varID & Category1').item.json.id }}"
                  },
                  "operation": "move"
            },
            "typeVersion": 2
      },
      {
            "id": "85ff0348-16dc-46e6-bf70-48a10fe0ded8",
            "name": "AI Agent1",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1160,
                  468
            ],
            "parameters": {
                  "text": "=Categorise the following email\n<email>\n{{ $('varEmal1').first().json.toJsonString() }}\n</email>\n\nEnsure your final output is valid JSON with no additional text or token in the following format:\n\n{\n \"subject\": \"SUBJECT_LINE\",1\n \"category\": \"CATEGORY\",\n \"subCategory\": \"SUBCATEGORY\", //use sparingly\n \"analysis\": \"ANALYSIS_REASONING\"\n}\n\nRemember you can only use ONE of the following categories {{ $json.category }}. No other categories can be used. Use the subcategory for additional context, for example, if a SaaS email requires action, or if a business email requires action. Do not create any additional subcategories, you can only use ONE of the following {{ $json.category }}.",
                  "options": {
                        "systemMessage": "=You're an AI assistant for a freelance developer, categorizing emails as {{ $json.category }}. Email info is in <email> tags.\n\nCategorization priority:\n\nAction: Needs response or action (includes some SaaS emails), avoid sales email but include enquires.\nJunk: Ads, sales, newsletters, promotions, daily digests, (emojis often indicate junk), phishing, scams, discounts etc.\nReceipt: Any purchase confirmation.\nSaaS: Account/security updates, unless action required, generic SaaS information, usually from a non-personal email address.\nCommunity: Updates, events, forums, everything related to \"community\".\nBusiness: Any communication related to freelance work, usually from a humans email address\nOther: Doesn't fit into any other category.\n\nKey points:\n\nSaaS emails needing action are \"SaaS\" and subcategory \"action\".\nAnalyze the subject, body, email addresses and other data.\nLook for specific keywords and phrases for each category.\nEmail can have 2 categories, primary and sub, for example, \"action\" and \"SaaS\" or \"action\" and \"business\".\nEmails from business development executives are often junk.\n\n\nOutput in valid JSON format:\n{\n\"subject\": \"SUBJECT_LINE\",\n\"category\": \"PRIMARY CATEGORY\",\n\"subCategory\": \"SUBCATEGORY\", //use sparingly\n\"analysis\": \"Brief 1-2 sentence explanation of category choice\"\n}\nNo additional text or tokens outside the JSON.\n\nYou may only use the following categories and subcategories, do not create any more categories or subcategories: {{ $json.category }}"
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      },
      {
            "id": "93e7be79-9035-4b58-9a83-b9182a0515f8",
            "name": "Merge1",
            "type": "n8n-nodes-base.merge",
            "position": [
                  3989,
                  564
            ],
            "parameters": {
                  "numberInputs": 7
            },
            "typeVersion": 3
      },
      {
            "id": "cbaeaed1-cb09-4614-93f1-3fe349cd0e4e",
            "name": "Switch1",
            "type": "n8n-nodes-base.switch",
            "position": [
                  2220,
                  488
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "junk",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "junk"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "receipt",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "0c61c7a8-e8b4-49c5-a96c-402d5eae7089",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "receipt"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "SaaS",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "703f65c8-cf4a-47fe-ad1a-a5f6e0412ae7",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "SaaS"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "community",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "b074d5cd-9215-40df-8877-5df904edc000",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "community"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "action",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "bece338a-e0c5-43b5-b8cc-41229a374213",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "action"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "business",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "d6c9751f-0ffa-4041-a579-6957bb9c9296",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "business"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "ignoreCase": true,
                        "fallbackOutput": "extra"
                  }
            },
            "typeVersion": 3.2
      }
],
    connections: {
      "If1": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook Move Message1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 5
                        }
                  ]
            ]
      },
      "Merge1": {
            "main": [
                  [
                        {
                              "node": "Loop Over Items1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter1": {
            "main": [
                  [
                        {
                              "node": "Loop Over Items1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Switch1": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook12",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Microsoft Outlook13",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Microsoft Outlook18",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Microsoft Outlook16",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Microsoft Outlook20",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Microsoft Outlook22",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Microsoft Outlook21",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "varEmal1": {
            "main": [
                  [
                        {
                              "node": "varID & Category1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "varJSON1": {
            "main": [
                  [
                        {
                              "node": "Switch1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Catch Errors1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "AI Agent1": {
            "main": [
                  [
                        {
                              "node": "varJSON1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Markdown1": {
            "main": [
                  [
                        {
                              "node": "varEmal1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Catch Errors1": {
            "main": [
                  [
                        {
                              "node": "Loop Over Items1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Loop Over Items1": {
            "main": [
                  null,
                  [
                        {
                              "node": "Markdown1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "varID & Category1": {
            "main": [
                  [
                        {
                              "node": "AI Agent1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Ollama Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "AI Agent1",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook10": {
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
      "Microsoft Outlook12": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook10",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook13": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook15",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook15": {
            "main": [
                  [
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Microsoft Outlook16": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook17",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook17": {
            "main": [
                  [
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 3
                        }
                  ]
            ]
      },
      "Microsoft Outlook18": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook19",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook19": {
            "main": [
                  [
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 2
                        }
                  ]
            ]
      },
      "Microsoft Outlook20": {
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
      "Microsoft Outlook21": {
            "main": [
                  [
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 6
                        }
                  ]
            ]
      },
      "Microsoft Outlook22": {
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
      "Microsoft Outlook23": {
            "main": [
                  [
                        {
                              "node": "Filter1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook Move Message1": {
            "main": [
                  [
                        {
                              "node": "Merge1",
                              "type": "main",
                              "index": 4
                        }
                  ]
            ]
      },
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook23",
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
    name: "Auto-Label Incoming Gmail Messages With AI Nodes",
    nodes: [
      {
            "id": "8141ffad-df2a-403b-a869-799c036f9733",
            "name": "Gmail trigger",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -600,
                  580
            ],
            "parameters": {
                  "simple": false,
                  "filters": {},
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6d9aa398-e2de-4fd0-b939-2a12d0c9fe14",
            "name": "Get message content",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  -340,
                  580
            ],
            "parameters": {
                  "simple": false,
                  "options": {},
                  "messageId": "={{ $json.id }}",
                  "operation": "get"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "cd86bc09-8c7f-4c85-9cb3-6dbd42420672",
            "name": "Set label values",
            "type": "n8n-nodes-base.set",
            "position": [
                  300,
                  580
            ],
            "parameters": {
                  "fields": {
                        "values": [
                              {
                                    "name": "labels",
                                    "type": "arrayValue",
                                    "arrayValue": "={{ $json.labels }}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "329435a6-51d1-416e-9aa9-5fe9a8dce74f",
            "name": "Get all labels",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  580,
                  460
            ],
            "parameters": {
                  "resource": "label",
                  "returnAll": true
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "7ae2dd15-472d-4a4b-b036-f80ebd7e3c28",
            "name": "Split out assigned labels",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  580,
                  700
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "labels"
            },
            "typeVersion": 1
      },
      {
            "id": "744c7afa-75b1-4b3b-8ccb-e2106c01f387",
            "name": "Merge corresponding labels",
            "type": "n8n-nodes-base.merge",
            "position": [
                  860,
                  580
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "mergeByFields": {
                        "values": [
                              {
                                    "field1": "name",
                                    "field2": "labels"
                              }
                        ]
                  },
                  "outputDataFrom": "input1"
            },
            "typeVersion": 2.1
      },
      {
            "id": "e47424dc-f43e-41a9-b1e5-ab3e08cbf395",
            "name": "Aggregate label IDs",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1120,
                  580
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "renameField": true,
                                    "outputFieldName": "label_ids",
                                    "fieldToAggregate": "id"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "22ba8297-8efc-463e-8ae0-385fd94a205f",
            "name": "Add labels to message",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1340,
                  580
            ],
            "parameters": {
                  "labelIds": "={{ $json.label_ids }}",
                  "messageId": "={{ $('Gmail trigger').item.json[\"id\"] }}",
                  "operation": "addLabels"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "7ebb1aad-00ad-43fa-9e07-e5f324864a74",
            "name": "Assign labels for message",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  -80,
                  580
            ],
            "parameters": {
                  "prompt": "={{ $json.text }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "Your task is to categorize the message according to the following labels.\n\nPartnership - email about sponsored content, cooperation etc.\nInquiry - email about products, services.\nNotification - email that doesn't require response. \n\nOne email can have more than one label. Return only label names in JSON format, nothing else. Do not make things up. "
                              }
                        ]
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "2f82db6a-422c-4697-a629-cc782d88209d",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1100,
                  400
            ],
            "parameters": {
                  "color": 4,
                  "width": 420.4803040774015,
                  "height": 240.57943708322733,
                  "content": "## Add AI labels to Gmail messages\nWith this workflow you can automatically set labels for your Gmail message according to its content. \n\nIn this workflow available are 3 labels: \"Partnership\", \"Inquiry\" and \"Notification\". Feel free to adjust labels according to your needs. \n\n**Please remember to set label names both in your Gmail account and workflow.**"
            },
            "typeVersion": 1
      },
      {
            "id": "4a10fb2b-aebb-4735-bbdb-7f07f1136d95",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1100,
                  660
            ],
            "parameters": {
                  "width": 421.0932411886662,
                  "height": 257.42916378714597,
                  "content": "## ⚠️ Note\n\n1. Complete video guide for this workflow is available [on my YouTube](https://youtu.be/a8Dhj3Zh9vQ). \n2. Remember to add your credentials and configure nodes (covered in the video guide).\n3. If you like this workflow, please subscribe to [my YouTube channel](https://www.youtube.com/@workfloows) and/or [my newsletter](https://workfloows.com/).\n\n**Thank you for your support!**"
            },
            "typeVersion": 1
      },
      {
            "id": "76e62351-d502-4377-9df2-fe92df00fe03",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -660,
                  400
            ],
            "parameters": {
                  "width": 238.4602598584674,
                  "height": 348.5873725349161,
                  "content": "### Gmail Trigger\nReceive data from Gmail about new incoming message. \n\n⚠️ Set polling interval according to your needs."
            },
            "typeVersion": 1
      },
      {
            "id": "c10702db-211f-4638-bcf0-fbbe18251cb7",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  60,
                  780
            ],
            "parameters": {
                  "width": 241.53974014153226,
                  "height": 319.3323098457962,
                  "content": "###\n\n\n\n\n\n\n\n\n\n\n### JSON schema\nEdit JSON schema and label names according to your needs.\n\n⚠️ **Label names in system prompt and JSON schema should be the same.**"
            },
            "typeVersion": 1
      },
      {
            "id": "cb6e3573-3d4d-4313-a97e-86a017438399",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  800,
                  420
            ],
            "parameters": {
                  "width": 226.14233872620645,
                  "height": 347.0476323933831,
                  "content": "### Merge labels\nCombine labels retrieved from Gmail account and assigned by AI together."
            },
            "typeVersion": 1
      },
      {
            "id": "8cfb4341-98e6-4944-b26c-15e39184f468",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1060,
                  420
            ],
            "parameters": {
                  "width": 452.48413953150185,
                  "height": 347.0476323933831,
                  "content": "### Aggregarte labels and add to message\nCreate array of label IDs and add to the desired email message in Gmail."
            },
            "typeVersion": 1
      },
      {
            "id": "bb9766e8-0b72-47f8-9a8e-0b291609e814",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -400,
                  400
            ],
            "parameters": {
                  "width": 238.4602598584674,
                  "height": 348.5873725349161,
                  "content": "### Get message content\nBased on Gmail message ID retrieve body content of the email and pass it to AI chain."
            },
            "typeVersion": 1
      },
      {
            "id": "48630cbd-8336-4577-928e-37341f09ef9b",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -140,
                  400
            ],
            "parameters": {
                  "width": 378.57661273793565,
                  "height": 348.5873725349161,
                  "content": "### Assign labels\nLet the AI decide which labels suit the best content of the message.\n\n⚠️ **Remember to edit system prompt** - modify label names and instructions according to your needs."
            },
            "typeVersion": 1
      },
      {
            "id": "60a9d75e-1564-4b1d-b3f2-acc2e3bf2411",
            "name": "JSON Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  140,
                  800
            ],
            "parameters": {
                  "jsonSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"labels\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": \"string\",\n \"enum\": [\"Inquiry\", \"Partnership\", \"Notification\"]\n }\n }\n },\n \"required\": [\"labels\"]\n}\n"
            },
            "typeVersion": 1
      },
      {
            "id": "2bdf3fed-8a7f-411a-bad4-266bfea5cede",
            "name": "OpenAI Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -120,
                  800
            ],
            "parameters": {
                  "model": "gpt-4-turbo-preview",
                  "options": {
                        "temperature": 0,
                        "responseFormat": "json_object"
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jazew1WAaSRrjcHp",
                        "name": "OpenAI (workfloows@gmail.com)"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "JSON Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Assign labels for message",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Assign labels for message",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail trigger": {
            "main": [
                  [
                        {
                              "node": "Get message content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get all labels": {
            "main": [
                  [
                        {
                              "node": "Merge corresponding labels",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set label values": {
            "main": [
                  [
                        {
                              "node": "Get all labels",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Split out assigned labels",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Aggregate label IDs": {
            "main": [
                  [
                        {
                              "node": "Add labels to message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get message content": {
            "main": [
                  [
                        {
                              "node": "Assign labels for message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Assign labels for message": {
            "main": [
                  [
                        {
                              "node": "Set label values",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split out assigned labels": {
            "main": [
                  [
                        {
                              "node": "Merge corresponding labels",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Merge corresponding labels": {
            "main": [
                  [
                        {
                              "node": "Aggregate label IDs",
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
    name: "Basic Automatic Gmail Email Labelling With OpenAI And Gmail API",
    nodes: [
      {
            "id": "2a41e2da-19f7-4c31-ab93-3a534db3179e",
            "name": "Gmail Trigger",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -360,
                  -260
            ],
            "parameters": {
                  "filters": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyX",
                                    "unit": "minutes",
                                    "value": 5
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "10LJ3tXKoUfexiKU",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a25e0e42-8eab-49c5-a553-797da40eb623",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -220,
                  -60
            ],
            "parameters": {
                  "options": {
                        "maxTokens": 4096
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "qR44iMsUYcLrhdR0",
                        "name": "OpenAi account"
                  }
            },
            "notesInFlow": false,
            "typeVersion": 1
      },
      {
            "id": "cf437748-a0df-42a2-b1ca-f93162d85bfe",
            "name": "Gmail - read labels",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  80,
                  -40
            ],
            "webhookId": "d8ec9401-a9ff-4fe2-9c1e-5a8036cd96c9",
            "parameters": {
                  "resource": "label",
                  "returnAll": true,
                  "descriptionType": "manual",
                  "toolDescription": "Tool to read all existing gmail labels"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "10LJ3tXKoUfexiKU",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "152f1970-7a1f-4977-9c21-64b69242d3a9",
            "name": "Gmail - get message",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  260,
                  -40
            ],
            "webhookId": "d8ec9401-a9ff-4fe2-9c1e-5a8036cd96c9",
            "parameters": {
                  "messageId": "={{ $fromAI('gmail_message_id', 'id of the gmail message, like 1944fdc33f544369', 'string') }}",
                  "operation": "get",
                  "descriptionType": "manual",
                  "toolDescription": "Tool to read a specific message based on the message ID"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "10LJ3tXKoUfexiKU",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "ae09cedc-9675-4080-bcdc-3d6c4e4bc490",
            "name": "Gmail - add label to message",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  460,
                  -40
            ],
            "webhookId": "7a87b026-1c6e-40e1-a062-aefdd1af1585",
            "parameters": {
                  "labelIds": "={{ $fromAI('gmail_categories', 'array of label ids') }}",
                  "messageId": "={{ $fromAI('gmail_message_id') }}",
                  "operation": "addLabels",
                  "descriptionType": "manual",
                  "toolDescription": "Tool to add label to message"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "10LJ3tXKoUfexiKU",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "be4a92ab-d3ab-451b-8655-172851f68628",
            "name": "Gmail - create label",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  640,
                  -40
            ],
            "webhookId": "d8ec9401-a9ff-4fe2-9c1e-5a8036cd96c9",
            "parameters": {
                  "name": "={{ $fromAI('new_label_name', 'new label name', 'string' ) }} ",
                  "options": {},
                  "resource": "label",
                  "operation": "create",
                  "descriptionType": "manual",
                  "toolDescription": "Tool to create a new label, only use if label does not already exist"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "10LJ3tXKoUfexiKU",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "a40466d2-2fe3-4a97-98fe-b14cc38cc141",
            "name": "Gmail labelling agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "notes": "Objective:\nAutomatically categorize incoming emails based on existing Gmail labels or create a new label if none match.\n\nTools:\n- Get message\n- Read all labels\n- Create label\n- Assign label to message\n\nInstructions:\n\nLabel Matching:\n\nAnalyze the email's subject, sender, recipient, keywords, and content.\nCompare with existing Gmail labels to find the most relevant match.\nLabel Assignment:\n\nAssign the email to the most appropriate existing label.`\nRemove the inbox label if the email is of less importance (like ads, promotions, aka \"Reclame\"), keep normal and important emails in the inbox.\nIf no suitable label exists, create a new label based on the existing labels. Try reusing existing labels as much as possible. Always create a label as a sublabel, if no label applies, if the main label already exists, create the new label under the existing label, if no main label exists, create the label AI and create the new label under this label.\nLabel Creation:\n\nEnsure new labels align with the structure of existing ones, including capitalization, delimiters, and prefixes.\nExamples:\n\nIf the email subject is \"Project Alpha Update,\" assign to [Project Alpha] if it exists.\nFor \"New Vendor Inquiry,\" create \"Vendor Inquiry\" if no relevant label exists.\nOutcome:\nEmails are consistently categorized under the appropriate or newly created labels, maintaining Gmail's organizational structure.",
            "onError": "continueErrorOutput",
            "position": [
                  -60,
                  -260
            ],
            "parameters": {
                  "text": "=Label the email based on the details below:\n{{ JSON.stringify($json) }}",
                  "options": {
                        "maxIterations": 5,
                        "systemMessage": "Objective:\nAutomatically categorize incoming emails based on existing Gmail labels or create a new label if none match.\n\nTools:\n- Get message\n- Read all labels\n- Create label\n- Assign label to message\n\nInstructions:\n\nLabel Matching:\n\nAnalyze the email's subject, sender, recipient, keywords, and content.\nCompare with existing Gmail labels to find the most relevant match.\nLabel Assignment:\n\nAssign the email to the most appropriate existing label.`\nRemove the inbox label if the email is of less importance (like ads, promotions, aka \"Reclame\"), keep normal and important emails in the inbox.\nIf no suitable label exists, create a new label based on the existing labels. Try reusing existing labels as much as possible. Always create a label as a sublabel, if no label applies, if the main label already exists, create the new label under the existing label, if no main label exists, create the label AI and create the new label under this label.\nLabel Creation:\n\nEnsure new labels align with the structure of existing ones, including capitalization, delimiters, and prefixes.\nExamples:\n\nIf the email subject is \"Project Alpha Update,\" assign to [Project Alpha] if it exists.\nFor \"New Vendor Inquiry,\" create \"Vendor Inquiry\" if no relevant label exists.\nOutcome:\nEmails are consistently categorized under the appropriate or newly created labels, maintaining Gmail's organizational structure."
                  },
                  "promptType": "define"
            },
            "notesInFlow": true,
            "retryOnFail": false,
            "typeVersion": 1.7
      },
      {
            "id": "6b514df4-761c-4072-abf8-d572ee4b8030",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  -60,
                  -40
            ],
            "parameters": {
                  "sessionKey": "={{ $json.id }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.3
      },
      {
            "id": "f06717ed-00d7-4a99-a78c-53217a0067e7",
            "name": "Wait",
            "type": "n8n-nodes-base.wait",
            "position": [
                  -220,
                  -260
            ],
            "webhookId": "2066b863-4526-40cf-90aa-82229895a73c",
            "parameters": {
                  "amount": 1
            },
            "typeVersion": 1.1
      },
      {
            "id": "f6084fc3-2b6b-488f-b212-f179435e1a63",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -640,
                  -300
            ],
            "parameters": {
                  "content": "## Gmail trigger\nPoll Gmail every x minutes, trigger when a new email is received.\n\n- Gmail API"
            },
            "typeVersion": 1
      },
      {
            "id": "5ede55a4-52ae-48c0-969e-afa45d19f2f0",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  -960
            ],
            "parameters": {
                  "width": 780,
                  "height": 840,
                  "content": "## Gmail labelling agent\n- Read the message\n- Read existing labels\n- Create a new label if needed\n- Assign label to message\n\n----\n\nObjective:\nAutomatically categorize incoming emails based on existing Gmail labels or create a new label if none match.\n\nTools:\n- Get message\n- Read all labels\n- Create label\n- Assign label to message\n\nInstructions:\n\nLabel Matching:\n\nAnalyze the email's subject, sender, recipient, keywords, and content.\nCompare with existing Gmail labels to find the most relevant match.\nLabel Assignment:\n\nAssign the email to the most appropriate existing label.`\nRemove the inbox label if the email is of less importance (like ads, promotions, aka \"Reclame\"), keep normal and important emails in the inbox.\nIf no suitable label exists, create a new label based on the existing labels. Try reusing existing labels as much as possible. Always create a label as a sublabel, if no label applies, if the main label already exists, create the new label under the existing label, if no main label exists, create the label AI and create the new label under this label.\nLabel Creation:\n\nEnsure new labels align with the structure of existing ones, including capitalization, delimiters, and prefixes.\nExamples:\n\nIf the email subject is \"Project Alpha Update,\" assign to [Project Alpha] if it exists.\nFor \"New Vendor Inquiry,\" create \"Vendor Inquiry\" if no relevant label exists.\nOutcome:\nEmails are consistently categorized under the appropriate or newly created labels, maintaining Gmail's organizational structure."
            },
            "typeVersion": 1
      },
      {
            "id": "7c8bb6de-b729-4c8e-90c2-641d173ed3dd",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  160,
                  160
            ],
            "parameters": {
                  "width": 440,
                  "content": "## Gmail API\n- Add credentials "
            },
            "typeVersion": 1
      },
      {
            "id": "e9d05013-9546-426f-bdc7-45199dbfc72a",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -580,
                  80
            ],
            "parameters": {
                  "width": 440,
                  "content": "## OpenAI\n- Add credentials "
            },
            "typeVersion": 1
      }
],
    connections: {
      "Wait": {
            "main": [
                  [
                        {
                              "node": "Gmail labelling agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail Trigger": {
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
      "OpenAI Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Gmail labelling agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail - get message": {
            "ai_tool": [
                  [
                        {
                              "node": "Gmail labelling agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail - read labels": {
            "ai_tool": [
                  [
                        {
                              "node": "Gmail labelling agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail - create label": {
            "ai_tool": [
                  [
                        {
                              "node": "Gmail labelling agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Window Buffer Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "Gmail labelling agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail - add label to message": {
            "ai_tool": [
                  [
                        {
                              "node": "Gmail labelling agent",
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
    name: "Classify Lemlist Replies Using OpenAI And Automate Reply Handling",
    nodes: [
      {
            "id": "7786165e-5e74-4614-b065-86db19482b72",
            "name": "Format text with Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  -1200,
                  980
            ],
            "parameters": {
                  "html": "={{ $json.text }}",
                  "options": {},
                  "destinationKey": "textClean"
            },
            "typeVersion": 1,
            "continueOnFail": true
      },
      {
            "id": "8f73d4d6-2473-4fdf-8797-c049d6df6967",
            "name": "Lemlist Trigger - On new reply",
            "type": "n8n-nodes-base.lemlistTrigger",
            "position": [
                  -1600,
                  980
            ],
            "webhookId": "039bb443-8d2a-4eb3-9c16-772943a46db7",
            "parameters": {
                  "event": "emailsReplied",
                  "options": {
                        "isFirst": true
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "1f94d672-0a70-45ad-bf96-72c4aecabcd0",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1700,
                  680
            ],
            "parameters": {
                  "width": 304.92548549441915,
                  "height": 504.9663351162785,
                  "content": "### Get your lemlist API key\n\n1. Go to your lemlist account or create one [HERE](https://app.lemlist.com/create-account)\n\n2. Go to Settings -> Integrations\n\n3. Generate your API Key and copy it\n\n4. On this node, click on create new credential and paste your API key"
            },
            "typeVersion": 1
      },
      {
            "id": "3032b04c-76a2-4f7c-a790-ede26b102254",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2040,
                  680
            ],
            "parameters": {
                  "width": 319.6621253622332,
                  "height": 507.1074887209538,
                  "content": "# Read me\n\nThis workflow send email replies of your lemlist campaigns to the Slack channel of your choice.\n\nThe OpenAI node will classify the reply status. \n\nThe Slack alert is structured in a way that make it easy to read for the user."
            },
            "typeVersion": 1
      },
      {
            "id": "df142fcb-f5ec-475d-8f90-c0bd064d390c",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -760,
                  1320
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "1fa6d12c-2555-42c6-8f80-b24dc3608ed7",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  -600,
                  1320
            ],
            "parameters": {
                  "schemaType": "manual",
                  "inputSchema": "{\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"category\": {\n\t\t\t\"type\": \"string\"\n }\n\t}\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "734013f9-d058-4f08-9026-a41cd5877a3b",
            "name": "Send alert to Slack",
            "type": "n8n-nodes-base.slack",
            "position": [
                  320,
                  700
            ],
            "parameters": {
                  "text": "=",
                  "select": "channel",
                  "blocksUi": "={\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \":raised_hands: New reply in lemlist!\\n\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"fields\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Categorized as:*\\n{{ $json[\"output\"][\"category\"] }}\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Campaign:*\\n<https://app.lemlist.com/teams/{{ $json[\"teamId\"] }}/reports/campaigns/{{ $json[\"campaignId\"] }}|{{ $json[\"campaignName\"] }}>\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Sender Email:*\\n{{ $json[\"sendUserEmail\"] }}\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Lead Email:*\\n{{ $json[\"leadEmail\"] }}\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Linkedin URL:*\\n{{ $json[\"linkedinUrl\"] }}\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"*Reply preview*:\\n{{ JSON.stringify($json[\"textClean\"]).replace(/^\"(.+(?=\"$))\"$/, '$1').substring(0, 100) }}\"\n\t\t\t}\n\t\t}\n\t]\n}",
                  "channelId": {
                        "__rl": true,
                        "mode": "name",
                        "value": "automated_outbound_replies"
                  },
                  "messageType": "block",
                  "otherOptions": {
                        "botProfile": {
                              "imageValues": {
                                    "icon_emoji": ":fire:",
                                    "profilePhotoType": "emoji"
                              }
                        },
                        "unfurl_links": false,
                        "includeLinkToWorkflow": false
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "0558c166-16d7-4c26-a09c-fb46c2b6b687",
            "name": "Lemlist - Unsubscribe",
            "type": "n8n-nodes-base.lemlist",
            "position": [
                  300,
                  1000
            ],
            "parameters": {
                  "email": "={{ $json[\"leadEmail\"] }}",
                  "resource": "lead",
                  "operation": "unsubscribe",
                  "campaignId": "={{$json[\"campaignId\"]}}"
            },
            "typeVersion": 1
      },
      {
            "id": "79d17d20-a60a-4b5a-a83c-821cac265b17",
            "name": "lemlist - Mark as interested",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  300,
                  1260
            ],
            "parameters": {
                  "url": "=https://api.lemlist.com/api/campaigns/{{$json[\"campaignId\"]}}/leads/{{$json[\"leadEmail\"]}}/interested",
                  "options": {},
                  "requestMethod": "POST",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "lemlistApi"
            },
            "typeVersion": 2
      },
      {
            "id": "04f74337-903c-481a-95ca-a1d4a5985b9e",
            "name": "Categorize lemlist reply",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  -780,
                  1120
            ],
            "parameters": {
                  "text": "=Classify the [email_content] in one only of the following categories: \n\nCategories=[\"Interested\", \"Out of office\", \"Unsubscribe\", \"Not interested\", \"Other\"] \n\n- Interested is when the reply is positive, and the person want more information or a meeting \n\nDon't output quotes like in the next example: \nemail_content_example:Hey I would like to know more \ncategory:Interested\n\nemail_content:\"{{ $json.textClean }}\" \n\nOnly answer with JSON in the following format:\n{\"replyStatus\":category}\n\nJSON:",
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.4
      },
      {
            "id": "c1d66785-e096-4fd7-90de-51c7b9117413",
            "name": "Merge data",
            "type": "n8n-nodes-base.merge",
            "position": [
                  -280,
                  1000
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2.1
      },
      {
            "id": "bf21f5b9-6978-4657-a0a2-847265cff31e",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  260,
                  520
            ],
            "parameters": {
                  "width": 480.38008828116847,
                  "height": 341.5885389153657,
                  "content": "### Create a Slack notification for each new replies\n\n1. Connect your Slack account by clicking to add Credentials\n\n2. Write the name of the channel where you want to send the Slack alert"
            },
            "typeVersion": 1
      },
      {
            "id": "024b4399-8e20-4974-986d-6c1ee4103fa0",
            "name": "Route reply to the right branch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -100,
                  1000
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Send all replies to Slack",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Unsubscribe",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "9ad6f5cd-8c50-4710-8eaf-085e8f11f202",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "Unsubscribe"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Interested",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "cb410bcc-a70c-4430-aec1-b71f3f615c4d",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.output.category }}",
                                                      "rightValue": "Interested"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "allMatchingOutputs": true
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "f9f23daa-f7a9-49f9-8ffb-16798656af73",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  260,
                  900
            ],
            "parameters": {
                  "width": 480.38008828116847,
                  "height": 256.5682017131378,
                  "content": "### Save time by automatically unsubscribing leads that don't want to receive emails from you"
            },
            "typeVersion": 1
      },
      {
            "id": "63c536bd-e624-4118-b0c8-38c07f2d1955",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  260,
                  1200
            ],
            "parameters": {
                  "width": 480.38008828116847,
                  "height": 256.5682017131378,
                  "content": "### Mark interested leads as interested in lemlist"
            },
            "typeVersion": 1
      },
      {
            "id": "8ed8b714-8196-4593-87b8-18c6a7318fbe",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -880,
                  875.46282303881
            ],
            "parameters": {
                  "width": 480.38008828116847,
                  "height": 608.2279357257166,
                  "content": "### Categorize the reply with OpenAI"
            },
            "typeVersion": 1
      },
      {
            "id": "6b1846df-0214-4383-87cf-55232093ae2a",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1320,
                  880
            ],
            "parameters": {
                  "width": 336.62085535637357,
                  "height": 311.3046602455328,
                  "content": "### This node will clean the text and make sure it looks pretty on Slack"
            },
            "typeVersion": 1
      },
      {
            "id": "f7378ecd-e8d2-4204-a883-3161be601ffc",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -220,
                  880
            ],
            "parameters": {
                  "width": 336.62085535637357,
                  "height": 311.3046602455328,
                  "content": "### Trigger a different scenario according to the category of the reply"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Merge data": {
            "main": [
                  [
                        {
                              "node": "Route reply to the right branch",
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
                              "node": "Categorize lemlist reply",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Categorize lemlist reply": {
            "main": [
                  [
                        {
                              "node": "Merge data",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Structured Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Categorize lemlist reply",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format text with Markdown": {
            "main": [
                  [
                        {
                              "node": "Merge data",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Categorize lemlist reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Lemlist Trigger - On new reply": {
            "main": [
                  [
                        {
                              "node": "Format text with Markdown",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Route reply to the right branch": {
            "main": [
                  [
                        {
                              "node": "Send alert to Slack",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Lemlist - Unsubscribe",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "lemlist - Mark as interested",
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
    name: "Compose Reply Draft In Gmail With OpenAI Assistant",
    nodes: [
      {
            "id": "a99b3164-fe36-4dde-9525-110c1ae08afb",
            "name": "Convert raw to base64",
            "type": "n8n-nodes-base.code",
            "position": [
                  3320,
                  580
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "const encoded = Buffer.from($json.raw).toString('base64');\n\nreturn { encoded };"
            },
            "typeVersion": 2
      },
      {
            "id": "f0f731bd-7b2f-4c39-bc06-42fd57bc4ae8",
            "name": "Add email draft to thread",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  3580,
                  580
            ],
            "parameters": {
                  "url": "https://www.googleapis.com/gmail/v1/users/me/drafts",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\"message\":{\"raw\":\"{{ $json.encoded }}\", \"threadId\": \"{{ $('Map fields for further processing').item.json[\"threadId\"] }}\"}}",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "gmailOAuth2"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "c1ce3400-4582-46c7-a85d-8fa9c325ff7b",
            "name": "Remove AI label from email",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  3820,
                  580
            ],
            "parameters": {
                  "resource": "thread",
                  "threadId": "={{ $('Map fields for further processing').item.json[\"threadId\"] }}",
                  "operation": "removeLabels"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "65f0508a-ca2e-49ce-b02f-ef6505b5e983",
            "name": "Schedule trigger (1 min)",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  960,
                  580
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "minutes",
                                    "minutesInterval": 1
                              }
                        ]
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "ca4a209b-a79d-4911-b69b-1db22808be60",
            "name": "Map fields for further processing",
            "type": "n8n-nodes-base.set",
            "position": [
                  2620,
                  580
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "a77b2d79-1e70-410c-a657-f3d618154ea1",
                                    "name": "response",
                                    "type": "string",
                                    "value": "={{ $json.output }}"
                              },
                              {
                                    "id": "20850cac-f82c-4f02-84f0-3de31871a5b8",
                                    "name": "threadId",
                                    "type": "string",
                                    "value": "={{ $('Get single message content').item.json[\"threadId\"] }}"
                              },
                              {
                                    "id": "d270c18e-39a0-4d87-85f0-cc1ffc9c10ff",
                                    "name": "to",
                                    "type": "string",
                                    "value": "={{ $('Get single message content').item.json[\"from\"][\"text\"] }}"
                              },
                              {
                                    "id": "30acb50b-bdde-44bf-803c-76e0ae65f526",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $('Get single message content').item.json[\"subject\"] }}"
                              },
                              {
                                    "id": "88914536-8c25-4877-8914-feab5e32fae3",
                                    "name": "messageId",
                                    "type": "string",
                                    "value": "={{ $('Get threads with specific labels').item.json[\"id\"] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "93eb3844-f1fe-4b09-bcae-3e372a19ab6f",
            "name": "Convert response to HTML",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  2860,
                  580
            ],
            "parameters": {
                  "mode": "markdownToHtml",
                  "options": {
                        "simpleLineBreaks": false
                  },
                  "markdown": "={{ $json.response }}",
                  "destinationKey": "response"
            },
            "typeVersion": 1
      },
      {
            "id": "da35eda9-b63e-49f9-8fe8-7517c1445c92",
            "name": "Build email raw",
            "type": "n8n-nodes-base.set",
            "position": [
                  3100,
                  580
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "913e9cb1-10de-4637-bf48-40272c7c7fe3",
                                    "name": "raw",
                                    "type": "string",
                                    "value": "=To: {{ $json.to }}\nSubject: {{ $json.subject }}\nContent-Type: text/html; charset=\"utf-8\"\n\n{{ $json.response }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "b667a399-a178-42e3-a587-4eccd2a153d8",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  460
            ],
            "parameters": {
                  "color": 4,
                  "width": 420.4803040774015,
                  "height": 189.69151356225348,
                  "content": "## Reply draft with OpenAI Assistant\nThis workflow automatically transfers content of incoming email messages with specific labels into OpenAI Assitant and returns reply draft. After draft is composed, trigger label is deleted from the thread.\n\n**Please remember to configure your OpenAI Assistant first.**"
            },
            "typeVersion": 1
      },
      {
            "id": "fe47636b-2142-4c40-a937-2ec360b230ae",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  900,
                  460
            ],
            "parameters": {
                  "width": 451.41125086385614,
                  "height": 313.3056033573073,
                  "content": "### Schedule trigger and get emails\nRun the workflow in equal intervals and check for threads with specific labels (trigger labels)."
            },
            "typeVersion": 1
      },
      {
            "id": "c9bfa42c-a045-404d-aebe-d87dceb68f1a",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  680
            ],
            "parameters": {
                  "color": 3,
                  "width": 421.0932411886662,
                  "height": 257.42916378714597,
                  "content": "## ⚠️ Note\n\n1. Complete video guide for this workflow is available [on my YouTube](https://youtu.be/a8Dhj3Zh9vQ). \n2. Remember to add your credentials and configure nodes (covered in the video guide).\n3. If you like this workflow, please subscribe to [my YouTube channel](https://www.youtube.com/@workfloows) and/or [my newsletter](https://workfloows.com/).\n\n**Thank you for your support!**"
            },
            "typeVersion": 1
      },
      {
            "id": "40424340-c0ec-435a-9ce0-0e0dc3b94cfc",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2160,
                  460
            ],
            "parameters": {
                  "width": 381.6458068293894,
                  "height": 313.7892229150129,
                  "content": "### Generate reply\nTransfer email content to OpenAI Assitant and return AI-generated reply.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "e7cce507-6658-414d-8cbc-3af847dad124",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2800,
                  460
            ],
            "parameters": {
                  "width": 219.88389496558554,
                  "height": 314.75072291501283,
                  "content": "### Create HTML message\nConvert incoming Markdown from OpenAI Assistant into HTML content."
            },
            "typeVersion": 1
      },
      {
            "id": "2b383967-0a23-46a1-9a19-a9532a3c3425",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3040,
                  460
            ],
            "parameters": {
                  "width": 461.3148409669012,
                  "height": 314.75072291501283,
                  "content": "### Build and encode message\nCreate raw message in RFC standard and encode it into base64 string (please see [Gmail API reference](https://developers.google.com/gmail/api/reference/rest/v1/users.drafts/create) for more details)."
            },
            "typeVersion": 1
      },
      {
            "id": "07685b17-cf22-4adf-a6b7-7acc2d863115",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3520,
                  460
            ],
            "parameters": {
                  "width": 219.88389496558554,
                  "height": 314.75072291501283,
                  "content": "### Insert reply draft\nAdd reply draft from OpenAI Assistant to specific Gmail thread."
            },
            "typeVersion": 1
      },
      {
            "id": "1e8109f8-7dd3-4308-a5e8-32382aa41805",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3760,
                  460
            ],
            "parameters": {
                  "width": 219.88389496558554,
                  "height": 314.75072291501283,
                  "content": "### Remove label\nDelete trigger label from the Gmail thread."
            },
            "typeVersion": 1
      },
      {
            "id": "d488db90-7367-49fa-b366-ccdfc796b5b3",
            "name": "Get threads with specific labels",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1180,
                  580
            ],
            "parameters": {
                  "filters": {
                        "labelIds": []
                  },
                  "resource": "thread",
                  "returnAll": true
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "9f5262c5-d319-4a9d-af6e-aa42970d1a6f",
            "name": "Ask OpenAI Assistant",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2220,
                  580
            ],
            "parameters": {
                  "text": "={{ $json.text }}",
                  "prompt": "define",
                  "options": {},
                  "resource": "assistant",
                  "assistantId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "asst_kmKeAtwF2rv0vgF0ujY4jlp6",
                        "cachedResultName": "Customer assistant"
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jazew1WAaSRrjcHp",
                        "name": "OpenAI (workfloows@gmail.com)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6ffd7d66-40b6-49a4-9e15-9742bda73d2f",
            "name": "Loop over threads",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  1440,
                  580
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "8afc47c8-075f-4f3d-a89d-fda81fc270fc",
            "name": "Get thread messages",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1700,
                  820
            ],
            "parameters": {
                  "options": {
                        "returnOnlyMessages": true
                  },
                  "resource": "thread",
                  "threadId": "={{ $json.id }}",
                  "operation": "get"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "2286bfa7-dcb8-4a61-a71b-ea58e21bf7ab",
            "name": "Return last message in thread",
            "type": "n8n-nodes-base.limit",
            "position": [
                  1920,
                  820
            ],
            "parameters": {
                  "keep": "lastItems"
            },
            "typeVersion": 1
      },
      {
            "id": "44c52e61-dd88-4499-85db-69ce4704c2b2",
            "name": "Get single message content",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1700,
                  460
            ],
            "parameters": {
                  "simple": false,
                  "options": {},
                  "messageId": "={{ $json.id }}",
                  "operation": "get"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "uBcIMfsTtKjexw7I",
                        "name": "Gmail (workfloowstutorial@gmail.com)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "7ca62611-f02e-47bf-b940-3a56ece443b7",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1640,
                  340
            ],
            "parameters": {
                  "width": 219.88389496558554,
                  "height": 314.75072291501283,
                  "content": "### Return message content\nRetrieve content of the last message in the thread."
            },
            "typeVersion": 1
      },
      {
            "id": "165df2a4-3c94-456d-9906-be8020098802",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1640,
                  680
            ],
            "parameters": {
                  "width": 470.88389496558545,
                  "height": 314.75072291501283,
                  "content": "### Get last message from thread\nReturn all messages for a single thread and pass for further processing only the last one."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Build email raw": {
            "main": [
                  [
                        {
                              "node": "Convert raw to base64",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Loop over threads": {
            "main": [
                  [
                        {
                              "node": "Get single message content",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get thread messages",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get thread messages": {
            "main": [
                  [
                        {
                              "node": "Return last message in thread",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Ask OpenAI Assistant": {
            "main": [
                  [
                        {
                              "node": "Map fields for further processing",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Convert raw to base64": {
            "main": [
                  [
                        {
                              "node": "Add email draft to thread",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Convert response to HTML": {
            "main": [
                  [
                        {
                              "node": "Build email raw",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Schedule trigger (1 min)": {
            "main": [
                  [
                        {
                              "node": "Get threads with specific labels",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Add email draft to thread": {
            "main": [
                  [
                        {
                              "node": "Remove AI label from email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get single message content": {
            "main": [
                  [
                        {
                              "node": "Ask OpenAI Assistant",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Return last message in thread": {
            "main": [
                  [
                        {
                              "node": "Loop over threads",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get threads with specific labels": {
            "main": [
                  [
                        {
                              "node": "Loop over threads",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Map fields for further processing": {
            "main": [
                  [
                        {
                              "node": "Convert response to HTML",
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
    name: "Create E-Mail Responses With Fastmail And OpenAI",
    nodes: [
      {
            "id": "082d1828-72b1-48c0-8426-c8051c29f0db",
            "name": "Session",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -20,
                  -20
            ],
            "parameters": {
                  "url": "https://api.fastmail.com/jmap/session",
                  "options": {},
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "3IRsYkeB2ofrwQjv",
                        "name": "Fastmail"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "d7dc4c50-c8fc-4999-918d-5d357567ed14",
            "name": "Get Mailbox IDs",
            "type": "n8n-nodes-base.httpRequest",
            "notes": "https://api.fastmail.com/.well-known/jmap\n\nhttps://api.fastmail.com/jmap/session",
            "position": [
                  200,
                  -20
            ],
            "parameters": {
                  "url": "https://api.fastmail.com/jmap/api/",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"using\": [\"urn:ietf:params:jmap:core\", \"urn:ietf:params:jmap:mail\"],\n \"methodCalls\": [\n [\n \"Mailbox/get\",\n {\n \"accountId\": \"{{ $('Session').item.json.primaryAccounts['urn:ietf:params:jmap:mail'] }}\"\n },\n \"c0\"\n ]\n ]\n }",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              },
                              {
                                    "name": "Accept",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "3IRsYkeB2ofrwQjv",
                        "name": "Fastmail"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "31be3c1c-f4c5-4309-92b3-2fd0a3fcecc6",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  400,
                  -20
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "methodResponses[0][1].list"
            },
            "typeVersion": 1
      },
      {
            "id": "93de4dad-70d6-4e16-b351-7c540c3a4bfa",
            "name": "Email Trigger (IMAP)",
            "type": "n8n-nodes-base.emailReadImap",
            "position": [
                  -20,
                  -240
            ],
            "parameters": {
                  "options": {
                        "customEmailConfig": "[\"UNSEEN\"]"
                  },
                  "postProcessAction": "nothing",
                  "downloadAttachments": true
            },
            "credentials": {
                  "imap": {
                        "id": "vFzz9hU9rTHVHs3I",
                        "name": "IMAP"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "41e77a60-622f-426c-a50c-e0df03c53208",
            "name": "Get fields from source email",
            "type": "n8n-nodes-base.set",
            "position": [
                  200,
                  -240
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "a9d425bd-e576-4e38-a251-b462240d3e2d",
                                    "name": "textPlain",
                                    "type": "string",
                                    "value": "={{ $json.textPlain }}"
                              },
                              {
                                    "id": "7071a252-fcad-4aa1-953f-205c3e403497",
                                    "name": "from",
                                    "type": "string",
                                    "value": "={{ $json.from }}"
                              },
                              {
                                    "id": "c4b0ed1b-590c-4d7f-b494-a0f34304cc1a",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "7e0badd1-02be-4149-b9ff-286f0943f051",
                                    "name": "metadata['message-id']",
                                    "type": "string",
                                    "value": "={{ $json.metadata['message-id'] }}"
                              },
                              {
                                    "id": "f87c7c15-c1d3-4696-bcd4-6677e5ddb240",
                                    "name": "metadata['reply-to']",
                                    "type": "string",
                                    "value": "={{ $json.metadata['reply-to'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "f9d1a529-1377-456b-8357-d37fb3fe74f9",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  400,
                  -240
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o",
                        "cachedResultName": "GPT-4O"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "content": "=Please analyze the following personal email and draft a casual response based solely on its content. Return only the response text without any additional introductions or formatting. The response should include appropriate greetings (e.g., \"Hi\", \"Hallo\", \"Moin\" in German or \"Hi\", \"Hello\" in English) and sign-offs (e.g., \"Gruß\", \"Lieben Gruß\" in German or \"Regards\" in English). Add a thanks if appropriate. Use \"Du\" only if appropriate; if the email contains \"Sie\", maintain the same formality.\n\nSubject: {{ $json.subject }}\nEmail Content: {{ $json.textPlain }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "iW0ItIt1ZxCQrBqk",
                        "name": "OpenAI"
                  }
            },
            "typeVersion": 1.5
      },
      {
            "id": "c421ddc9-b230-499c-a11d-a20a68d30c5b",
            "name": "Filter for drafts folder",
            "type": "n8n-nodes-base.filter",
            "position": [
                  560,
                  -20
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
                                    "id": "4e4c63d1-40fe-4314-bfe7-4fee62c78b88",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.role }}",
                                    "rightValue": "drafts"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "ef19fde4-cf8c-4e19-912e-822611c18056",
            "name": "upload draft email",
            "type": "n8n-nodes-base.httpRequest",
            "notes": "https://api.fastmail.com/.well-known/jmap\n\nhttps://api.fastmail.com/jmap/session",
            "position": [
                  1000,
                  -120
            ],
            "parameters": {
                  "url": "https://api.fastmail.com/jmap/api/",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"using\": [\"urn:ietf:params:jmap:core\", \"urn:ietf:params:jmap:mail\"],\n \"methodCalls\": [\n [\n \"Email/set\",\n {\n \"accountId\": \"{{ $('Session').item.json.primaryAccounts['urn:ietf:params:jmap:mail'] }}\",\n \"create\": {\n \"newDraft\": {\n \"mailboxIds\": {\n \"{{ $json.draftsId }}\": true\n },\n \"keywords\": {\n \"$draft\": true\n },\n \"inReplyTo\": [\"{{ $json.metadata['message-id'] }}\"],\n \"references\": [\"{{ $json.metadata['message-id'] }}\"],\n \"from\": [{\n \"name\": \"\",\n \"email\": \"{{ $('Session').item.json.username }}\"\n }],\n \"to\": [{\n \"name\": \"{{ $json['to-friendly'] }}\",\n \"email\": \"{{ $json.to }}\"\n }],\n \"subject\": \"{{ $json.subject }}\",\n \"bodyValues\": {\n \"textBody\": {\n \"value\": \"{{ $json.message.content.replace(/\\n/g, '\\\\n') }}\"\n }\n },\n \"bodyStructure\": {\n \"partId\": \"textBody\"\n }\n }\n }\n },\n \"c1\"\n ]\n ]\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              },
                              {
                                    "name": "Accept",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "3IRsYkeB2ofrwQjv",
                        "name": "Fastmail"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "f4ecb64a-c978-4aa3-943e-c4a7f0592b91",
            "name": "gather data for draft email",
            "type": "n8n-nodes-base.set",
            "position": [
                  800,
                  -120
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "78885ad0-fa62-407e-82de-f297190265be",
                                    "name": "draftsId",
                                    "type": "string",
                                    "value": "={{ $json.id }}"
                              },
                              {
                                    "id": "fcb31dde-0881-4b98-8bc2-e3e215148a5c",
                                    "name": "to-friendly",
                                    "type": "string",
                                    "value": "={{ $('Get fields from source email').item.json.from.match(/[^<]+/)[0].trim().replaceAll(/\\\"/g, \"\") }}"
                              },
                              {
                                    "id": "84c80af6-68dd-44bd-97ba-fde78a42e88a",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "=Re: {{ $('Get fields from source email').item.json.subject }}"
                              },
                              {
                                    "id": "590e9856-9c6f-4d23-af42-8a0a1384ac00",
                                    "name": "message.content",
                                    "type": "string",
                                    "value": "={{ $('OpenAI').item.json.message.content }}"
                              },
                              {
                                    "id": "4f24e071-24e3-4101-a423-ad5bbcca9fc7",
                                    "name": "metadata['message-id']",
                                    "type": "string",
                                    "value": "={{ $('Get fields from source email').item.json.metadata['message-id'] }}"
                              },
                              {
                                    "id": "80c92734-0296-4299-9f98-15cc62e93d44",
                                    "name": "to",
                                    "type": "string",
                                    "value": "={{ $('Get fields from source email').item.json.metadata['reply-to'].match(/<([^>]+)>/)[1] ?? $('Get fields from source email').item.json.from.match(/<([^>]+)>/)[1] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "ca868672-85bd-4e2e-b2c6-6c6c69b78b24",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -580,
                  -560
            ],
            "parameters": {
                  "width": 493.9330818092735,
                  "height": 695.2489786026621,
                  "content": "## Workflow Description:\nThis n8n workflow automates the drafting of email replies for Fastmail using OpenAI's GPT-4 model. Here’s the overall process:\n\n1. **Email Monitoring**: The workflow continuously monitors a specified IMAP inbox for new, unread emails.\n2. **Email Data Extraction**: When a new email is detected, it extracts relevant details such as the sender, subject, email body, and metadata.\n3. **AI Response Generation**: The extracted email content is sent to OpenAI's GPT-4, which generates a personalized draft response.\n4. **Get Fastmail Session and Mailbox IDs**: Connects to the Fastmail API to retrieve necessary session details and mailbox IDs.\n5. **Draft Identification**: Identifies the \"Drafts\" folder in the mailbox.\n6. **Draft Preparation**: Compiles all the necessary information to create the draft, including the generated response, original email details, and specified recipient.\n7. **Draft Uploading**: Uploads the prepared draft email to the \"Drafts\" folder in the Fastmail mailbox."
            },
            "typeVersion": 1
      },
      {
            "id": "c4273cc2-1ac2-43f4-bcd1-7f42d3109373",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -40,
                  -560
            ],
            "parameters": {
                  "color": 3,
                  "width": 722.928660826031,
                  "height": 285.5319148936168,
                  "content": "## Prerequisites:\n1. **IMAP Email Account**: You need to configure an IMAP email account in n8n to monitor incoming emails.\n2. **Fastmail API Credentials**: A Fastmail account with JMAP API enabled. You should set up HTTP Header authentication in n8n with your Fastmail API credentials.\n3. **OpenAI API Key**: An API key from OpenAI to access GPT-4. Make sure to configure the OpenAI credentials in n8n."
            },
            "typeVersion": 1
      }
],
    connections: {
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Session",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Session": {
            "main": [
                  [
                        {
                              "node": "Get Mailbox IDs",
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
                              "node": "Filter for drafts folder",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Mailbox IDs": {
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
      "Email Trigger (IMAP)": {
            "main": [
                  [
                        {
                              "node": "Get fields from source email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter for drafts folder": {
            "main": [
                  [
                        {
                              "node": "gather data for draft email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "gather data for draft email": {
            "main": [
                  [
                        {
                              "node": "upload draft email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get fields from source email": {
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
    name: "Effortless Email Management with AI",
    nodes: [
      {
            "id": "9d77e26f-de2b-4bd4-b0f0-9924a8f459a6",
            "name": "Email Trigger (IMAP)",
            "type": "n8n-nodes-base.emailReadImap",
            "position": [
                  -2000,
                  -180
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "imap": {
                        "id": "k31W9oGddl9pMDy4",
                        "name": "IMAP info@n3witalia.com"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "cf2d020b-b125-4a20-8694-8ed0f7acf755",
            "name": "Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  -1740,
                  -180
            ],
            "parameters": {
                  "html": "={{ $json.textHtml }}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "41bfceff-0155-4643-be60-ee301e2d69e1",
            "name": "Send Email",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  400,
                  -320
            ],
            "webhookId": "a79ae1b4-648c-4cb4-b6cd-04ea3c1d9314",
            "parameters": {
                  "html": "={{ $('Edit Fields').item.json.email }}",
                  "options": {},
                  "subject": "=Re: {{ $('Email Trigger (IMAP)').item.json.subject }}",
                  "toEmail": "={{ $('Email Trigger (IMAP)').item.json.from }}",
                  "fromEmail": "={{ $('Email Trigger (IMAP)').item.json.to }}"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "2aff581a-8b64-405c-b62f-74bf189fd7b1",
            "name": "Qdrant Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  -320,
                  600
            ],
            "parameters": {
                  "mode": "retrieve-as-tool",
                  "options": {},
                  "toolName": "company_knowladge_base",
                  "toolDescription": "Extracts information regarding the request made.",
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "=COLLECTION"
                  },
                  "includeDocumentMetadata": false
            },
            "credentials": {
                  "qdrantApi": {
                        "id": "iyQ6MQiVaF3VMBmt",
                        "name": "QdrantApi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6e3f6df0-8924-47d9-855c-51205d19e86d",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  -440,
                  800
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "37ac411b-4a74-44d1-917e-b07d1c9ca221",
            "name": "Email Summarization Chain",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  -1480,
                  -180
            ],
            "parameters": {
                  "options": {
                        "binaryDataKey": "={{ $json.data }}",
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "=Write a concise summary of the following in max 100 words:\n\n\"{{ $json.data }}\"\n\nDo not enter the total number of words used.",
                                    "combineMapPrompt": "=Write a concise summary of the following in max 100 words:\n\n\"{{ $json.data }}\"\n\nDo not enter the total number of words used."
                              }
                        }
                  },
                  "operationMode": "nodeInputBinary"
            },
            "typeVersion": 2
      },
      {
            "id": "91edbac9-847b-4f31-a8dd-09418bd93642",
            "name": "Write email",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  -1040,
                  -180
            ],
            "parameters": {
                  "text": "=Write the text to reply to the following email:\n\n{{ $json.response.text }}",
                  "options": {
                        "systemMessage": "You are an expert at answering emails. You need to answer them professionally based on the information you have. This is a business email. Be concise and never exceed 100 words. Only the body of the email, not create the subject"
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "1da0e72a-db97-4216-a1a5-038cebaf7e10",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -180,
                  280
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "af2d6284-4c8f-4a07-b689-d0f55aaabd26",
            "name": "Gmail",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  -300,
                  -180
            ],
            "webhookId": "d6dd2e7c-90ea-4b65-9c64-523d2541a054",
            "parameters": {
                  "sendTo": "info@n3w.it",
                  "message": "=<h3>MESSAGE</h3>\n{{ $('Email Trigger (IMAP)').item.json.textHtml }}\n\n<h3>AI RESPONSE</h3>\n{{ $json.email }}",
                  "options": {},
                  "subject": "=[Approval Required] {{ $('Email Trigger (IMAP)').item.json.subject }}",
                  "operation": "sendAndWait",
                  "responseType": "freeText"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "nyuHvSX5HuqfMPlW",
                        "name": "Gmail account (n3w.it)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "aaccc4a6-ce53-4813-8247-65bd1a9d5639",
            "name": "Text Classifier",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  -60,
                  -180
            ],
            "parameters": {
                  "options": {
                        "systemPromptTemplate": "Please classify the text provided by the user into one of the following categories: {categories}, and use the provided formatting instructions below. Don't explain, and only output the json."
                  },
                  "inputText": "={{ $json.data.text }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "Approved",
                                    "description": "The email has been reviewed and accepted as-is. The human explicitly or implicity express approva, indicating that no changes ar needed.\n\nExample:\n\"Ok\",\n\"Approvato\",\n\"Invia\""
                              },
                              {
                                    "category": "Declined",
                                    "description": "The email has been reviewd, but the human request modifications before it sent link tweaks, removing parts, rewording etc... This could include suggested edits, rewording or major revision."
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b46de5d9-1a2e-4d28-930b-e18fb1d7876e",
            "name": "Edit Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  -580,
                  -180
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "35d7c303-42f4-4dd1-b41e-6eb087c23c3d",
                                    "name": "email",
                                    "type": "string",
                                    "value": "={{ $json.output }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "36ce51c6-8ee1-4230-84c0-40e259eafb1a",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -1340,
                  -1300
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "21a0c991-65dc-483e-9b98-5cedaba7ae13",
            "name": "Create collection",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -1040,
                  -1440
            ],
            "parameters": {
                  "url": "https://QDRANTURL/collections/COLLECTION",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "{\n \"filter\": {}\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "qhny6r5ql9wwotpn",
                        "name": "Qdrant API (Hetzner)"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "9a048d7d-bcdf-40b7-b33a-94b811083eac",
            "name": "Refresh collection",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -1040,
                  -1180
            ],
            "parameters": {
                  "url": "https://QDRANTURL/collections/COLLECTION/points/delete",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "{\n \"filter\": {}\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "qhny6r5ql9wwotpn",
                        "name": "Qdrant API (Hetzner)"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "db494d2d-5390-4f83-9b87-3409fef31a7d",
            "name": "Get folder",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  -820,
                  -1180
            ],
            "parameters": {
                  "filter": {
                        "driveId": {
                              "__rl": true,
                              "mode": "list",
                              "value": "My Drive",
                              "cachedResultUrl": "https://drive.google.com/drive/my-drive",
                              "cachedResultName": "My Drive"
                        },
                        "folderId": {
                              "__rl": true,
                              "mode": "id",
                              "value": "=test-whatsapp"
                        }
                  },
                  "options": {},
                  "resource": "fileFolder"
            },
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "HEy5EuZkgPZVEa9w",
                        "name": "Google Drive account"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "e30dbe6f-482e-47f9-b5b8-62c1113e6c8b",
            "name": "Download Files",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  -600,
                  -1180
            ],
            "parameters": {
                  "fileId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $json.id }}"
                  },
                  "options": {
                        "googleFileConversion": {
                              "conversion": {
                                    "docsToFormat": "text/plain"
                              }
                        }
                  },
                  "operation": "download"
            },
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "HEy5EuZkgPZVEa9w",
                        "name": "Google Drive account"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "492d48d8-4997-4f04-902b-041da3210417",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  -200,
                  -980
            ],
            "parameters": {
                  "options": {},
                  "dataType": "binary"
            },
            "typeVersion": 1
      },
      {
            "id": "0cf45d10-3cbf-4eb6-ab30-11f264b3aa8d",
            "name": "Token Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  -240,
                  -820
            ],
            "parameters": {
                  "chunkSize": 300,
                  "chunkOverlap": 30
            },
            "typeVersion": 1
      },
      {
            "id": "7d60f569-c34e-49a8-ba9a-88cf33083136",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -840,
                  -1500
            ],
            "parameters": {
                  "color": 6,
                  "width": 880,
                  "height": 220,
                  "content": "# STEP 1\n\n## Create Qdrant Collection\nChange:\n- QDRANTURL\n- COLLECTION"
            },
            "typeVersion": 1
      },
      {
            "id": "e86b18c4-d7e8-4e81-b520-dbd8125edf38",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1060,
                  -1240
            ],
            "parameters": {
                  "color": 4,
                  "width": 620,
                  "height": 400,
                  "content": "# STEP 2\n\n\n\n\n\n\n\n\n\n\n\n\n## Documents vectorization with Qdrant and Google Drive\nChange:\n- QDRANTURL\n- COLLECTION"
            },
            "typeVersion": 1
      },
      {
            "id": "05f65120-ef31-4c67-ac18-e68a8353909c",
            "name": "Qdrant Vector Store1",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  -360,
                  -1180
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "=COLLECTION"
                  }
            },
            "credentials": {
                  "qdrantApi": {
                        "id": "iyQ6MQiVaF3VMBmt",
                        "name": "QdrantApi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c15fd52f-b142-408e-af06-aeed10a1cf85",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  -380,
                  -980
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "3e47224f-3deb-450b-b825-f16c5f860f28",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2020,
                  -600
            ],
            "parameters": {
                  "color": 3,
                  "width": 580,
                  "height": 260,
                  "content": "# STEP 3 - MAIN FLOW\n\n\n## How it works\nThis workflow automates the handling of incoming emails, summarizes their content, generates appropriate responses using a retrieval-augmented generation (RAG) approach, and obtains approval or suggestions before sending replies. \n\nYou can quickly integrate Gmail and Outlook via the appropriate trigger nodes"
            },
            "typeVersion": 1
      },
      {
            "id": "63097039-58cb-4e0f-9fb6-6bf868275519",
            "name": "DeepSeek Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatDeepSeek",
            "position": [
                  -1560,
                  40
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "deepSeekApi": {
                        "id": "sxh1rfZxonXV83hS",
                        "name": "DeepSeek account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c86d6eeb-cf08-429f-b5b4-60b317071035",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1500,
                  -260
            ],
            "parameters": {
                  "width": 320,
                  "height": 240,
                  "content": "Chain that summarizes the received email"
            },
            "typeVersion": 1
      },
      {
            "id": "4afc8b00-d1e5-473c-a71e-1299c84c546e",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1060,
                  -260
            ],
            "parameters": {
                  "width": 340,
                  "height": 240,
                  "content": "Agent that retrieves business information from a vector database and processes the response"
            },
            "typeVersion": 1
      },
      {
            "id": "be1762ff-729b-4b83-9139-16f835b748f2",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1800,
                  -260
            ],
            "parameters": {
                  "height": 240,
                  "content": "Convert email to Markdown format for better understanding of LLM models"
            },
            "typeVersion": 1
      },
      {
            "id": "f818ede7-895a-4860-91d3-f08cc32ec0e3",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -380,
                  -380
            ],
            "parameters": {
                  "color": 4,
                  "height": 360,
                  "content": "## IMPORTANT\n\nFor the \"Send Draft\" node, you need to send the draft email to a Gmail address because it is the only one that allows the \"Send and wait for response\" function."
            },
            "typeVersion": 1
      },
      {
            "id": "929b525a-912b-4f7b-a6e7-dfeb88a446c8",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -100,
                  -260
            ],
            "parameters": {
                  "width": 360,
                  "height": 240,
                  "content": "Based on the suggestion received, the text classifier can understand whether the feedback received approves the generated email or not."
            },
            "typeVersion": 1
      },
      {
            "id": "2468e643-013f-4925-ab35-c8ef4ee6eed2",
            "name": "Email Reviewer",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  380,
                  -40
            ],
            "parameters": {
                  "text": "=Review at the following email:\n{{ $('Edit Fields').item.json.email }}\n\nFeedback from human:\n{{ $json.data.text }}",
                  "options": {
                        "systemMessage": "If you are an expert in reviewing emails before sending them. You need to review and structure them in such a way that you can send them. It must be in HTML format and you can insert (if you think it is appropriate) only HTML characters such as <br>, <b>, <i>, <p> where necessary. Be concise and never exceed 100 words. Only the body of the email"
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "ecd9d3f8-2e79-4e5f-a73d-48de60441376",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  340,
                  -120
            ],
            "parameters": {
                  "width": 340,
                  "height": 220,
                  "content": "The Email Reviewer agent, taking inspiration from human feedback, rewrites the email"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Gmail": {
            "main": [
                  [
                        {
                              "node": "Text Classifier",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Write email",
                              "type": "ai_languageModel",
                              "index": 0
                        },
                        {
                              "node": "Email Reviewer",
                              "type": "ai_languageModel",
                              "index": 0
                        },
                        {
                              "node": "Text Classifier",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Markdown": {
            "main": [
                  [
                        {
                              "node": "Email Summarization Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get folder": {
            "main": [
                  [
                        {
                              "node": "Download Files",
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
                              "node": "Gmail",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Write email": {
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
      "Download Files": {
            "main": [
                  [
                        {
                              "node": "Qdrant Vector Store1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Reviewer": {
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
      "Token Splitter": {
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
      "Text Classifier": {
            "main": [
                  [
                        {
                              "node": "Send Email",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Email Reviewer",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI": {
            "ai_embedding": [
                  [
                        {
                              "node": "Qdrant Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI1": {
            "ai_embedding": [
                  [
                        {
                              "node": "Qdrant Vector Store1",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Refresh collection": {
            "main": [
                  [
                        {
                              "node": "Get folder",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "DeepSeek Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Email Summarization Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Default Data Loader": {
            "ai_document": [
                  [
                        {
                              "node": "Qdrant Vector Store1",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Qdrant Vector Store": {
            "ai_tool": [
                  [
                        {
                              "node": "Write email",
                              "type": "ai_tool",
                              "index": 0
                        },
                        {
                              "node": "Email Reviewer",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Trigger (IMAP)": {
            "main": [
                  [
                        {
                              "node": "Markdown",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email Summarization Chain": {
            "main": [
                  [
                        {
                              "node": "Write email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "Create collection",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Refresh collection",
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
    name: "Email Summary Agent",
    nodes: [
      {
            "id": "94c09c05-539b-452e-83b7-0a029bbe6b7f",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -120,
                  -140
            ],
            "parameters": {
                  "width": 248.47086922498647,
                  "height": 314.47468983163634,
                  "content": "- Starts the workflow every day at 7 AM.\n- Adjust the time if you want the workflow to run at a different hour."
            },
            "typeVersion": 1
      },
      {
            "id": "5e5cbc87-5c01-438b-a1c0-e8468d3ee20b",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  160,
                  -137.04548301590512
            ],
            "parameters": {
                  "width": 213.36643278764896,
                  "height": 313.40934714314244,
                  "content": "Fetches all emails received in the past 24 hours from the email address"
            },
            "typeVersion": 1
      },
      {
            "id": "9a82f5e9-7d0b-430f-9dbb-d8ae0b129dad",
            "name": "Daily 7AM Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -40,
                  0
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "triggerAtHour": 7
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "dd3e4b10-187b-45ce-b999-f0143e5af134",
            "name": "Fetch Emails - Past 24 Hours",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  220,
                  0
            ],
            "webhookId": "20f1d11d-8a69-43f3-9323-33eaf1b3b600",
            "parameters": {
                  "filters": {
                        "q": "={{ \n (() => {\n const yesterday = new Date();\n yesterday.setDate(yesterday.getDate() - 1);\n return `isb.quantana@quantana.in after:${yesterday.getFullYear()}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getDate().toString().padStart(2, '0')}`;\n })()\n}}"
                  },
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "YFARhQXJAjbwXjSO",
                        "name": "Vishal Gmail"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "4a8fdfd9-93d7-43a2-92b0-88d845f217bf",
            "name": "Organize Email Data - Morning",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  460,
                  0
            ],
            "parameters": {
                  "include": "specifiedFields",
                  "options": {},
                  "aggregate": "aggregateAllItemData",
                  "fieldsToInclude": "id, From, To, CC, snippet"
            },
            "typeVersion": 1
      },
      {
            "id": "9e2426e8-57ba-4708-b66f-b58bd19eabff",
            "name": "Summarize Emails with OpenAI - Morning",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  680,
                  0
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
                                    "content": "=Go through this email summary and identify all key details mentioned, any specific issues to look at, and action items.\nUse this format to output\n{\n \"summary_of_emails\": [\n \"Point 1\",\n \"Point 2\",\n \"Point 3\"\n ],\n \"actions\": [\n {\n \"name\": \"Name 1\",\n \"action\": \"Action 1\"\n },\n {\n \"name\": \"Name 1\",\n \"action\": \"Action 2\"\n },\n {\n \"name\": \"Name 2\",\n \"action\": \"Action 3\"\n }\n ]\n}\n\nInput Data:\n\n {{ $json.data.toJsonString() }}\n\n"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "ksU2WMcMqe2lPgRw",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "4aa68ee8-d38f-418a-9f20-6cc76850c638",
            "name": "Send Summary - Morning",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1040,
                  0
            ],
            "webhookId": "83f2aeb9-7b6c-4336-b5ed-8acfcd259850",
            "parameters": {
                  "sendTo": "team-email@example.com",
                  "message": "=<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n <meta charset=\"UTF-8\">\n <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n <title>Email Summary - isbonline@quantana.in</title>\n <style>\n body {\n font-family: Arial, sans-serif;\n margin: 0;\n padding: 0;\n background-color: #f9f9f9;\n color: #333;\n line-height: 1.6;\n }\n .email-container {\n max-width: 600px;\n margin: 20px auto;\n background: #ffffff;\n border: 1px solid #ddd;\n border-radius: 10px;\n box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n }\n .email-header {\n background-color: #0073e6;\n color: #fff;\n padding: 20px;\n text-align: center;\n border-top-left-radius: 10px;\n border-top-right-radius: 10px;\n }\n .email-header h1 {\n margin: 0;\n font-size: 24px;\n }\n .email-content {\n padding: 20px;\n }\n .section-title {\n font-size: 20px;\n color: #0073e6;\n margin-bottom: 10px;\n }\n ul {\n list-style: none;\n padding: 0;\n }\n ul li {\n margin: 10px 0;\n padding: 10px;\n background: #f4f4f4;\n border-left: 4px solid #0073e6;\n border-radius: 5px;\n }\n .action-item {\n font-weight: bold;\n margin: 5px 0;\n }\n .action-detail {\n margin-left: 10px;\n }\n .email-footer {\n background-color: #0073e6;\n color: #fff;\n text-align: center;\n padding: 10px;\n font-size: 14px;\n border-bottom-left-radius: 10px;\n border-bottom-right-radius: 10px;\n }\n </style>\n</head>\n<body>\n <div class=\"email-container\">\n <div class=\"email-header\">\n <h1>Email Summary</h1>\n </div>\n <div class=\"email-content\">\n <div>\n <h2 class=\"section-title\">Summary of Emails:</h2>\n <ul>\n {{ $json.message.content.summary_of_emails.map(email => `<li>${email}</li>`).join('') }}\n </ul>\n </div>\n <div>\n <h2 class=\"section-title\">Actions:</h2>\n <ul>\n {{ $json.message.content.actions.map(action => `\n <li>\n <span class=\"action-item\">${action.name}:</span>\n <span class=\"action-detail\">${action.action}</span>\n </li>\n `).join('') }}\n </ul>\n </div>\n </div>\n <div class=\"email-footer\">\n <p>Generated by Quantana ESAgent <br /> A Quantana AI Labs Initiative\n </div>\n </div>\n</body>\n</html>",
                  "options": {
                        "ccList": "cc-list@example.com",
                        "appendAttribution": false,
                        "replyToSenderOnly": false
                  },
                  "subject": "=ESAgent - {{ new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }}-00:00 to {{ new Date(new Date().setDate(new Date().getDate())).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }}-07:00AM"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "YFARhQXJAjbwXjSO",
                        "name": "Vishal Gmail"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "c7667667-9533-40cb-9c09-914a11560600",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  400,
                  -132.6641804468672
            ],
            "parameters": {
                  "width": 226.7095107678671,
                  "height": 305.83657700487913,
                  "content": "Organizes the fetched email data, extracting fields like sender, receiver, CC, and a preview snippet."
            },
            "typeVersion": 1
      },
      {
            "id": "43955af4-3a18-44d7-8c8d-cf8051b18bdd",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  980,
                  -180
            ],
            "parameters": {
                  "width": 232.8435827211592,
                  "height": 359.7308639651144,
                  "content": "- Sends the summarized email report to recipients with a styled HTML layout.\n- Update the \"sendTo\" and \"ccList\" fields with the email addresses of your recipients.\n\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Daily 7AM Trigger": {
            "main": [
                  [
                        {
                              "node": "Fetch Emails - Past 24 Hours",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetch Emails - Past 24 Hours": {
            "main": [
                  [
                        {
                              "node": "Organize Email Data - Morning",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Organize Email Data - Morning": {
            "main": [
                  [
                        {
                              "node": "Summarize Emails with OpenAI - Morning",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Summarize Emails with OpenAI - Morning": {
            "main": [
                  [
                        {
                              "node": "Send Summary - Morning",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "timezone": "Asia/Kolkata",
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1"
},
  },
  {
    name: "Extract spend details (template)",
    nodes: [
      {
            "id": "8e1e0861-9f06-4fe2-a9c1-423bab246959",
            "name": "Get invoice",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  600,
                  380
            ],
            "parameters": {
                  "simple": false,
                  "filters": {
                        "labelIds": [
                              "Label_7885838942566773656"
                        ]
                  },
                  "options": {
                        "downloadAttachments": true
                  },
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "fegneFqi8XJX3NJH",
                        "name": "Gmail account (hana@hanamizuki.tw)"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "364fe355-672a-4074-800a-a7496c4fb1b2",
            "name": "Get payment",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  600,
                  580
            ],
            "parameters": {
                  "simple": false,
                  "filters": {
                        "labelIds": [
                              "Label_371722915607774622"
                        ]
                  },
                  "options": {
                        "downloadAttachments": true
                  },
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "fegneFqi8XJX3NJH",
                        "name": "Gmail account (hana@hanamizuki.tw)"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e3218faf-2486-46e0-bf43-3bc52927e2bd",
            "name": "Extract invoice",
            "type": "n8n-nodes-base.extractFromFile",
            "notes": "No attachements",
            "onError": "continueRegularOutput",
            "position": [
                  820,
                  380
            ],
            "parameters": {
                  "options": {
                        "password": "E223706995"
                  },
                  "operation": "pdf",
                  "binaryPropertyName": "attachment_0"
            },
            "typeVersion": 1
      },
      {
            "id": "3772b3dc-7601-4005-9b61-263b2c1abd5f",
            "name": "Extract payment",
            "type": "n8n-nodes-base.extractFromFile",
            "notes": "No attachements",
            "onError": "continueRegularOutput",
            "position": [
                  820,
                  580
            ],
            "parameters": {
                  "options": {
                        "password": "E223706995"
                  },
                  "operation": "pdf",
                  "binaryPropertyName": "attachment_0"
            },
            "typeVersion": 1
      },
      {
            "id": "10d57038-940e-47aa-84ea-3850f61ac757",
            "name": "HTML",
            "type": "n8n-nodes-base.html",
            "notes": "\".spend-table\" here is an example when the email use \"spend\" html tags to display each spends.\ne.g.\n<div class=spend-table>Spend 1</div>\n<div class=spend-table>Spend 2</div>",
            "position": [
                  1440,
                  200
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "dataPropertyName": "=html",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "spend",
                                    "cssSelector": ".spend-table",
                                    "returnArray": true
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "dae6d22e-587d-4102-b006-20a341ede5ee",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  1660,
                  200
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "spend"
            },
            "typeVersion": 1
      },
      {
            "id": "0d75443d-0d23-4120-95e5-b3128a760fb4",
            "name": "Structured Output Parser1",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  2500,
                  640
            ],
            "parameters": {
                  "schemaType": "manual",
                  "inputSchema": "{\n \"title\": \"Expense Record Schema\",\n \"description\": \"Schema used to parse expense record emails, including date, service name, transaction details, amount, category, currency, and card.\",\n \"type\": \"object\",\n \"properties\": {\n \"date\": {\n \"type\": \"string\",\n \"description\": \"Transaction date, can refer to the email date or the consumption date within the content. If there are multiple dates, use the earliest one. The format is 'YYYY-MM-DD hh:mm', e.g., '2024-09-02 10:12'.\",\n \"examples\": [\"2024-09-02 10:12\"]\n },\n \"service\": {\n \"type\": [\"string\", \"null\"],\n \"description\": \"Name of the service or store, such as 'GOOGLE', 'Uber', etc.\",\n \"examples\": [\"GOOGLE\", \"Uber Eats\", \"Uber\", \"CLAUDE.AI\"]\n },\n \"details\": {\n \"type\": [\"string\", \"null\"],\n \"description\": \"Detailed transaction information, such as overseas card usage, online transactions, restaurant names, or consumption details. If none, can be left blank or null.\",\n \"examples\": [\"Uber: from Fuxing North Road to Minquan East Road\", \"Restaurant name\", null]\n },\n \"amount\": {\n \"type\": \"number\",\n \"description\": \"Transaction amount. If in USD, keep two decimal places (e.g., 50.12); if in TWD, use integers (e.g., 550).\",\n \"examples\": [50.12, 550]\n },\n \"category\": {\n \"type\": \"string\",\n \"description\": \"Transaction category\",\n \"enum\": [\"Food & Beverage\", \"Transportation\", \"Daily Necessities\", \"Housing\", \"Electronics\", \"Beauty & Hair\", \"Apparel & Accessories\", \"Medical & Healthcare\", \"Pets\", \"Education\", \"Entertainment\", \"Cloud Services\", \"Automobile\", \"Gifts\", \"Family Care\", \"Counseling\", \"Insurance\", \"Taxes\", \"Transfer Fees\", \"Music\", \"Fitness\", \"Travel\", \"Lending\", \"Donations\", \"Advertising\", \"Finance\"],\n \"examples\": [\"Food & Beverage\", \"Transportation\"]\n },\n \"currency\": {\n \"type\": \"string\",\n \"description\": \"Currency code used in the transaction. If the amount starts with NT$, then currency is TWD.\",\n \"enum\": [\"TWD\", \"USD\", \"JPY\", \"EUR\", \"SGD\"],\n \"examples\": [\"USD\", \"TWD\"]\n },\n \"card\": {\n \"type\": [\"string\", \"null\"],\n \"description\": \"Credit card used for the transaction.\",\n \"enum\": [\"HSBC 3088\", \"HSBC 3854\", \"Fubon Card\", \"Crypto.com Card\", \"Cathay Card\", null],\n \"examples\": [\"HSBC 3088\", \"HSBC 3854\"]\n }\n },\n \"required\": [\"date\", \"amount\", \"category\", \"currency\"]\n}\n"
            },
            "typeVersion": 1.2
      },
      {
            "id": "7ade499c-015b-4903-8129-6c135264bf75",
            "name": "Google Gemini Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  2320,
                  640
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-flash"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "QR3KfTwhKpbgAGWU",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "10fe4a38-139b-4284-9e86-dd36e472f59e",
            "name": "Send",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2740,
                  480
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "date": "={{ $json.output.date }}",
                              "amount": "={{ $json.output.amount }}",
                              "source": "n8n",
                              "details": "={{ $json.output.details }}",
                              "payment": "={{ $json.output.card }}",
                              "service": "={{ $json.output.service }}",
                              "category": "={{ $json.output.category }}",
                              "currency": "={{ $json.output.currency }}"
                        },
                        "schema": [
                              {
                                    "id": "date",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "service",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "details",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "details",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "amount",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "amount",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "category",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "category",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "currency",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "currency",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "payment",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "payment",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "source",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "source",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 2071031170,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ccwhQeUSUkINccAucC6_clRyNF5Mw4IjIxAtcH4ftIs/edit#gid=2071031170",
                        "cachedResultName": "raw data 2"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "https://docs.google.com/spreadsheets/d/1ccwhQeUSUkINccAucC6_clRyNF5Mw4IjIxAtcH4ftIs/edit?gid=370005862#gid=370005862"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "flAcWUeyvdjh7MiW",
                        "name": "Google Sheets account: hana@hanamizuki.tw (GCP: n8n)"
                  }
            },
            "retryOnFail": true,
            "typeVersion": 4.5
      },
      {
            "id": "87ab4932-aae5-4c5a-a175-c782bebdf781",
            "name": "Set data 0",
            "type": "n8n-nodes-base.set",
            "position": [
                  1860,
                  200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "75b16672-71cf-4157-bcb6-683099ff1620",
                                    "name": "email_date",
                                    "type": "string",
                                    "value": "={{ $('Switch').item.json.date }}"
                              },
                              {
                                    "id": "3298f680-5d17-42fd-8b41-a6ca621af37d",
                                    "name": "email_subject",
                                    "type": "string",
                                    "value": "={{ $('Switch').item.json.subject }}"
                              },
                              {
                                    "id": "cf7181b7-fef9-437a-8bbe-cd4a4eda85b8",
                                    "name": "email_content",
                                    "type": "string",
                                    "value": "={{ $ifEmpty($json.spend, $ifEmpty( $json.text, $json.html)) }}"
                              },
                              {
                                    "id": "1a524cb4-6975-4d45-ac0e-f1ac1f9b0417",
                                    "name": "email_type",
                                    "type": "number",
                                    "value": "=0"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "c2829f41-1e3f-40bc-8d4b-9fd1bac41381",
            "name": "Set data 1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1660,
                  440
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "75b16672-71cf-4157-bcb6-683099ff1620",
                                    "name": "email_date",
                                    "type": "string",
                                    "value": "={{ $json.date }}"
                              },
                              {
                                    "id": "3298f680-5d17-42fd-8b41-a6ca621af37d",
                                    "name": "email_subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "cf7181b7-fef9-437a-8bbe-cd4a4eda85b8",
                                    "name": "email_content",
                                    "type": "string",
                                    "value": "={{ $ifEmpty( $json.text, $json.html) }}"
                              },
                              {
                                    "id": "1a524cb4-6975-4d45-ac0e-f1ac1f9b0417",
                                    "name": "email_type",
                                    "type": "number",
                                    "value": "=1"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "ecf9ea3c-3f34-43ef-b101-ca4a420e4c24",
            "name": "Set data 2",
            "type": "n8n-nodes-base.set",
            "position": [
                  1640,
                  740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "75b16672-71cf-4157-bcb6-683099ff1620",
                                    "name": "email_date",
                                    "type": "string",
                                    "value": "={{ $json.date }}"
                              },
                              {
                                    "id": "3298f680-5d17-42fd-8b41-a6ca621af37d",
                                    "name": "email_subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "cf7181b7-fef9-437a-8bbe-cd4a4eda85b8",
                                    "name": "email_content",
                                    "type": "string",
                                    "value": "={{ $ifEmpty( $json.text, $json.html) }}"
                              },
                              {
                                    "id": "1a524cb4-6975-4d45-ac0e-f1ac1f9b0417",
                                    "name": "email_type",
                                    "type": "number",
                                    "value": "=2"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "0d9f8bde-af54-480c-bdc9-15cd5b0e6f28",
            "name": "Invoice data",
            "type": "n8n-nodes-base.set",
            "position": [
                  1040,
                  380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "ac7c18ba-1944-4019-aa85-03d7751a7e1c",
                                    "name": "html",
                                    "type": "string",
                                    "value": "={{ $('Get invoice').item.json.html }}"
                              },
                              {
                                    "id": "5eb54501-9c55-437d-9918-e5eff92e2229",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $('Get invoice').item.json.subject }}"
                              },
                              {
                                    "id": "87eebc48-0b95-46ae-b41b-b6540b1afaa9",
                                    "name": "date",
                                    "type": "string",
                                    "value": "={{ $('Get invoice').item.json.date }}"
                              },
                              {
                                    "id": "c6b75367-239e-4e88-9e17-90ee75a064e2",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $('Get invoice').item.json.text }} \\n {{ $json.text }}"
                              },
                              {
                                    "id": "7d5b4b42-6b90-4ffe-ab8f-4288771d1302",
                                    "name": "label",
                                    "type": "string",
                                    "value": "={{ $('Get invoice').item.json.labelIds }}"
                              },
                              {
                                    "id": "551ea1c3-01ca-4615-9d52-a880e24252ed",
                                    "name": "from",
                                    "type": "string",
                                    "value": "={{ $('Get invoice').item.json.from.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "c1c4c490-d7a9-4b16-a81b-a338103764b6",
            "name": "Payment data",
            "type": "n8n-nodes-base.set",
            "position": [
                  1040,
                  580
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "ac7c18ba-1944-4019-aa85-03d7751a7e1c",
                                    "name": "html",
                                    "type": "string",
                                    "value": "={{ $('Get payment').item.json.html }}"
                              },
                              {
                                    "id": "5eb54501-9c55-437d-9918-e5eff92e2229",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $('Get payment').item.json.subject }}"
                              },
                              {
                                    "id": "87eebc48-0b95-46ae-b41b-b6540b1afaa9",
                                    "name": "date",
                                    "type": "string",
                                    "value": "={{ $('Get payment').item.json.date }}"
                              },
                              {
                                    "id": "c6b75367-239e-4e88-9e17-90ee75a064e2",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $('Get payment').item.json.text }} \\n {{ $json.text }}"
                              },
                              {
                                    "id": "7d5b4b42-6b90-4ffe-ab8f-4288771d1302",
                                    "name": "label",
                                    "type": "string",
                                    "value": "={{ $('Get payment').item.json.labelIds }}"
                              },
                              {
                                    "id": "2c976be1-48b8-42fa-b1c9-2fd315da89ae",
                                    "name": "from",
                                    "type": "string",
                                    "value": "={{ $('Get payment').item.json.from.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "01c5a934-9412-4ef9-81a8-c4aef19c8868",
            "name": "Switch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1300,
                  480
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Multiple payment info in one mail",
                                    "conditions": {
                                          "options": {
                                                "version": 1,
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "contains"
                                                      },
                                                      "leftValue": "={{ $json.from }}",
                                                      "rightValue": "service@pxbillrc01.cathaybk.com.tw"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "One payment info in one mail",
                                    "conditions": {
                                          "options": {
                                                "version": 1,
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "47e3b84f-903c-4594-9297-785cfbea0316",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "regex"
                                                      },
                                                      "leftValue": "={{ $json.from }}",
                                                      "rightValue": "\\b(?:noreply@messaging\\.hsbc\\.com\\.tw|hello@crypto\\.com|taipeifubon\\.com\\.tw)\\b"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Invoices",
                                    "conditions": {
                                          "options": {
                                                "version": 1,
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "db9d40f1-8fa4-4908-9010-985072b3f319",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "notRegex"
                                                      },
                                                      "leftValue": "={{ $json.from }}",
                                                      "rightValue": "\\b(?:noreply@messaging\\.hsbc\\.com\\.tw|hello@crypto\\.com|taipeifubon\\.com\\.tw)\\b"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {}
            },
            "executeOnce": false,
            "typeVersion": 3.1,
            "alwaysOutputData": false
      },
      {
            "id": "250bbd9a-3d22-4a04-910c-7cec437b3c33",
            "name": "Groq Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
            "position": [
                  2320,
                  1120
            ],
            "parameters": {
                  "model": "llama-3.2-11b-text-preview",
                  "options": {}
            },
            "credentials": {
                  "groqApi": {
                        "id": "vaG2nZFaKeQarQHw",
                        "name": "Groq account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b8d2b2fc-748c-43c5-a82b-d5e7357bbef8",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  2520,
                  1120
            ],
            "parameters": {
                  "schemaType": "manual",
                  "inputSchema": "{\n \"title\": \"Transaction Record Schema\",\n \"description\": \"Schema for parsing transaction record emails, including date, service name, transaction details, amount, category, currency, and card.\",\n \"type\": \"object\",\n \"properties\": {\n \"date\": {\n \"type\": \"string\",\n \"description\": \"Transaction date, can refer to email date or transaction date in content. If multiple dates exist, use the earliest date. Format is 'YYYY-MM-DD hh:mm', e.g., '2024-09-02 10:12'.\",\n \"examples\": [\"2024-09-02 10:12\"]\n },\n \"service\": {\n \"type\": [\"string\", \"null\"],\n \"description\": \"Name of service or store, e.g., 'GOOGLE', 'Uber', etc.\",\n \"examples\": [\"GOOGLE\", \"Uber Eats\", \"Uber\", \"CLAUDE.AI\"]\n },\n \"details\": {\n \"type\": [\"string\", \"null\"],\n \"description\": \"Detailed transaction information, such as overseas purchase, online purchase, restaurant name, or consumption details. Can be empty or null if not available.\",\n \"examples\": [\"Uber: From Fuxing North Road to Minquan East Road\", \"Restaurant name\", null]\n },\n \"amount\": {\n \"type\": \"number\",\n \"description\": \"Transaction amount. For USD, keep two decimal places (e.g., 50.12); for TWD, use integers (e.g., 550).\",\n \"examples\": [50.12, 550]\n },\n \"category\": {\n \"type\": \"string\",\n \"description\": \"Transaction category\",\n \"enum\": [\"Food & Beverage\", \"Transportation\", \"Daily Necessities\", \"Housing\", \"Electronics\", \"Beauty & Hair\", \"Clothing & Accessories\", \"Healthcare\", \"Pets\", \"Education\", \"Entertainment\", \"Cloud Services\", \"Automotive\", \"Gifts\", \"Family Support\", \"Counseling\", \"Insurance\", \"Taxes\", \"Transfer Fee\", \"Music\", \"Fitness\", \"Travel\", \"Lending\", \"Donations\", \"Advertising\", \"Finance\"],\n \"examples\": [\"Food & Beverage\", \"Transportation\"]\n },\n \"currency\": {\n \"type\": \"string\",\n \"description\": \"Currency code used for the transaction, if amount starts with NT$, currency is TWD.\",\n \"enum\": [\"TWD\", \"USD\", \"JPY\", \"EUR\", \"SGD\"],\n \"examples\": [\"USD\", \"TWD\"]\n }\n },\n \"required\": [\"date\", \"amount\", \"category\", \"currency\"]\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "39b10715-54fe-4c07-9ca1-afbe43ae519e",
            "name": "Send1",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2740,
                  900
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "date": "={{ $json.output.date }}",
                              "amount": "={{ $json.output.amount }}",
                              "source": "n8n",
                              "details": "={{ $json.output.details }}",
                              "payment": "=",
                              "service": "={{ $json.output.service }}",
                              "category": "={{ $json.output.category }}",
                              "currency": "={{ $json.output.currency }}"
                        },
                        "schema": [
                              {
                                    "id": "date",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "service",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "details",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "details",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "amount",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "amount",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "category",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "category",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "currency",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "currency",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "payment",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "payment",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "source",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "source",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 2071031170,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1ccwhQeUSUkINccAucC6_clRyNF5Mw4IjIxAtcH4ftIs/edit#gid=2071031170",
                        "cachedResultName": "raw data 2"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "https://docs.google.com/spreadsheets/d/1ccwhQeUSUkINccAucC6_clRyNF5Mw4IjIxAtcH4ftIs/edit?gid=370005862#gid=370005862"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "flAcWUeyvdjh7MiW",
                        "name": "Google Sheets account: hana@hanamizuki.tw (GCP: n8n)"
                  }
            },
            "retryOnFail": true,
            "typeVersion": 4.5
      },
      {
            "id": "112f5198-871e-42f9-9376-5fa074497413",
            "name": "Extract details1",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  2320,
                  900
            ],
            "parameters": {
                  "text": "=Email Date: {{ $json.email_date }}\nEmail Subject: {{ $json.email_subject }}\nEmail Content:\n{{ $json.email_content }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=Please analyze the following email to extract transaction details for bookkeeping purposes.\n\nPlease extract relevant transaction details such as transaction date, amount, merchant name, and any other pertinent information, and provide them in a structured format suitable for accounting records."
                              }
                        ]
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "retryOnFail": true,
            "typeVersion": 1.4
      },
      {
            "id": "b9c3cb29-e68e-4ae0-8930-185c17bc6cab",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2060,
                  440
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "b50d632c-b762-4f61-b34a-91f941100668",
            "name": "Extract details",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  2320,
                  480
            ],
            "parameters": {
                  "text": "=Email Date: {{ $json.email_date }}\nEmail Subject: {{ $json.email_subject }}\nEmail Content:\n{{ $json.email_content }}\nEmail Source: {{ $json.email_type }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=Please analyze the following email to extract transaction details for bookkeeping purposes. The \"Email Source\" field indicates the origin of the email, where 0 represents Cathay Bank card statements and 1 represents other credit card statements.\n\nPlease extract relevant transaction details such as transaction date, amount, merchant name, and any other pertinent information, and provide them in a structured format suitable for accounting records."
                              }
                        ]
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "retryOnFail": true,
            "typeVersion": 1.4
      },
      {
            "id": "7a7e2e36-a8b6-48dc-ad57-2f5eea691285",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  500,
                  220
            ],
            "parameters": {
                  "width": 720,
                  "height": 560,
                  "content": "# A. Get data\n- Set up labels in Gmail\n- Suggested using Gmail filters to move emails to labels automatically"
            },
            "typeVersion": 1
      },
      {
            "id": "108becad-1a7b-4409-9cb3-36a1c7b64786",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1280,
                  -20
            ],
            "parameters": {
                  "width": 920,
                  "height": 960,
                  "content": "# B. Deal with the data\n1. Multiple payment info in one mail: input the \"sender\" of the emails that contain more than one payment info. e.g. credit card daily spend notification\n2. One payment info in one mail: input the \"sender\" of the emails that contain only one payment info. e.g. instant credit card spend notification\n3. Invoices: input the mails that contain one invoice in one mail"
            },
            "typeVersion": 1
      },
      {
            "id": "7123f576-87f9-4df1-ae24-f3e5289c7234",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2240,
                  320
            ],
            "parameters": {
                  "width": 840,
                  "height": 980,
                  "content": "# C. Get spend details and send to google sheet\n- Edit the output schema to fit your google sheet format\n- Edit the prompt to fit your needs"
            },
            "typeVersion": 1
      }
],
    connections: {
      "HTML": {
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
      "Merge": {
            "main": [
                  [
                        {
                              "node": "Extract details",
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
                              "node": "HTML",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set data 1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set data 2",
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
                              "node": "Set data 0",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set data 0": {
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
      "Set data 1": {
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
      "Set data 2": {
            "main": [
                  [
                        {
                              "node": "Extract details1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get invoice": {
            "main": [
                  [
                        {
                              "node": "Extract invoice",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get payment": {
            "main": [
                  [
                        {
                              "node": "Extract payment",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Invoice data": {
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
      "Payment data": {
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
      "Extract details": {
            "main": [
                  [
                        {
                              "node": "Send",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract invoice": {
            "main": [
                  [
                        {
                              "node": "Invoice data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract payment": {
            "main": [
                  [
                        {
                              "node": "Payment data",
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
                              "node": "Extract details1",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract details1": {
            "main": [
                  [
                        {
                              "node": "Send1",
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
                              "node": "Extract details1",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Gemini Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Extract details",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Structured Output Parser1": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Extract details",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1",
      "saveManualExecutions": true,
      "saveExecutionProgress": true
},
  },
  {
    name: "Gmail AI auto-responder: create draft replies to incoming emails",
    nodes: [
      {
            "id": "2a9ff08f-919a-41a8-980b-8c2bca3059e4",
            "name": "Gmail Trigger",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -332.809175564116,
                  566.0845437534399
            ],
            "parameters": {
                  "simple": false,
                  "filters": {
                        "q": "-from:me"
                  },
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "ofvBTX8A0aWfQb2O",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "3ef14615-0045-404f-a21b-2c65a52f4be8",
            "name": "If Needs Reply",
            "type": "n8n-nodes-base.if",
            "position": [
                  240,
                  560
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
                                    "id": "53849246-ad32-4845-9976-9f9688f5a6f2",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.needsReply }}",
                                    "rightValue": "true"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "36968dd5-8d51-4184-a05a-587b6c95aa82",
            "name": "JSON Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  100,
                  720
            ],
            "parameters": {
                  "jsonSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"needsReply\": {\n \"type\": \"boolean\"\n }\n },\n \"required\": [\"needsReply\"]\n}\n"
            },
            "typeVersion": 1
      },
      {
            "id": "2a64dce8-e2f0-475e-a366-a02084293aad",
            "name": "OpenAI Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -92.809175564116,
                  726.0845437534399
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {
                        "temperature": 0,
                        "responseFormat": "json_object"
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "13ffkrNMlQMfvbZy",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "be892ff8-0981-4b34-9c93-7674ddd90360",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -429.809175564116,
                  461.08454375343996
            ],
            "parameters": {
                  "width": 304.10628068244364,
                  "height": 394.42512272977456,
                  "content": "## When I receive an Email\n"
            },
            "typeVersion": 1
      },
      {
            "id": "9d92839a-9ff2-436c-8abb-2f43e07c1ace",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -112.809175564116,
                  460.08454375343996
            ],
            "parameters": {
                  "width": 556,
                  "height": 397,
                  "content": "## ... that Needs a Reply\n"
            },
            "typeVersion": 1
      },
      {
            "id": "3cd77609-684c-44e2-9cdc-9479cfd836bd",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  460
            ],
            "parameters": {
                  "width": 333.19082443588354,
                  "height": 400.08454375343996,
                  "content": "## Generate a Reply"
            },
            "typeVersion": 1
      },
      {
            "id": "b123cf31-767d-48bb-a0ba-79a69f6da585",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  807.190824435884,
                  461.08454375343996
            ],
            "parameters": {
                  "width": 326,
                  "height": 395,
                  "content": "## ...as a Draft in the conversation"
            },
            "typeVersion": 1
      },
      {
            "id": "1a87c416-6b1c-4526-a2b6-20468c95ea0e",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  480,
                  680
            ],
            "parameters": {
                  "model": "gpt-4-turbo",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "13ffkrNMlQMfvbZy",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "84b4d516-252e-444e-b998-2d4aa0f89653",
            "name": "Gmail - Create Draft",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  900,
                  560
            ],
            "parameters": {
                  "message": "={{ $json.text.replace(/\\n/g, \"<br />\\n\") }}",
                  "options": {
                        "sendTo": "={{ $('Gmail Trigger').item.json.headers.from }}",
                        "threadId": "={{ $('Gmail Trigger').item.json.threadId }}"
                  },
                  "subject": "=Re: {{ $('Gmail Trigger').item.json.headers.subject }}",
                  "resource": "draft",
                  "emailType": "html"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "ofvBTX8A0aWfQb2O",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "86017ff4-9c57-4b2a-9cd9-f62571a05ffd",
            "name": "Assess if message needs a reply",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  -92.809175564116,
                  566.0845437534399
            ],
            "parameters": {
                  "prompt": "=Subject: {{ $json.subject }}\nMessage:\n{{ $json.textAsHtml }} ",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "Your task is to assess if the message requires a response. Return in JSON format true if it does, false otherwise.\nMarketing emails don't require a response."
                              }
                        ]
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "cab1e7e5-93dc-4850-a471-e285cdbe2058",
            "name": "Generate email reply",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  500,
                  520
            ],
            "parameters": {
                  "text": "=Subject: {{ $('Gmail Trigger').item.json.subject }}\nMessage: {{ $('Gmail Trigger').item.json.textAsHtml }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "You're a helpful personal assistant and your task is to draft replies on my behalf to my incoming emails. Whenever I provide some text from an email, return an appropriate draft reply for it and nothing else.\nEnsure that the reply is suitable for a professional email setting and addresses the topic in a clear, structured, and detailed manner.\nDo not make things up.\n\nDetailed instructions:\n- Be concise and maintain a business casual tone.\n- Start with \"Hello,\", and end with \"Best,\"\n- When replying to yes-no questions, draft 2 responses: one affirmative and one negative separated by \" - - - - - - - OR - - - - - - - \"\n- If you don't know an answer, you can leave placeholders like \"[YOUR_ANSWER_HERE]\".\n- Don't use any special formatting, only plain text.\n- Reply in the same language as the inbound email."
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      }
],
    connections: {
      "JSON Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Assess if message needs a reply",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Assess if message needs a reply",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail Trigger": {
            "main": [
                  [
                        {
                              "node": "Assess if message needs a reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If Needs Reply": {
            "main": [
                  [
                        {
                              "node": "Generate email reply",
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
                              "node": "Generate email reply",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate email reply": {
            "main": [
                  [
                        {
                              "node": "Gmail - Create Draft",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Assess if message needs a reply": {
            "main": [
                  [
                        {
                              "node": "If Needs Reply",
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
    name: "Microsoft Outlook AI Email Assistant",
    nodes: [
      {
            "id": "a923cfb0-64fe-499a-8f0e-13fc848731df",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  980,
                  540
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "ea865c8e-5c73-4d37-97d1-0349a265b9a4",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2880,
                  -600
            ],
            "parameters": {
                  "color": 5,
                  "width": 675,
                  "height": 107,
                  "content": "# Microsoft Outlook AI Email Assistant"
            },
            "typeVersion": 1
      },
      {
            "id": "c835042f-421b-44a0-8dc4-686ac638b358",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1300,
                  60
            ],
            "parameters": {
                  "width": 612,
                  "height": 401,
                  "content": "## Outlook Business with filters\nFilters:\n```\nflag/flagStatus eq 'notFlagged' and not categories/any()\n```\n\nThese filters ensure we do not process flagged emails or email that already have a category set."
            },
            "typeVersion": 1
      },
      {
            "id": "51ae8a4e-2d37-4118-a538-cd0fd4f427f7",
            "name": "Microsoft Outlook23",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  1540,
                  240
            ],
            "parameters": {
                  "limit": 10,
                  "fields": [
                        "flag",
                        "from",
                        "importance",
                        "replyTo",
                        "sender",
                        "subject",
                        "toRecipients",
                        "body",
                        "categories",
                        "isRead"
                  ],
                  "output": "fields",
                  "options": {},
                  "filtersUI": {
                        "values": {
                              "filters": {
                                    "custom": "flag/flagStatus eq 'notFlagged' and not categories/any()",
                                    "foldersToInclude": [
                                          "AAMkADYyNmQ0YWE1LWQxYjEtNDBhYS1hODI3LTg3MTkyNDAwMzE5NwAuAAAAAAA44w-ZZoU7QLO9GQAyv8UcAQAkfR2JHrRET4CmwDGznLN6AAAAAAEMAAA="
                                    ]
                              }
                        }
                  },
                  "operation": "getAll"
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "nv0cz3C6VZDzEgtR",
                        "name": "Microsoft365 Email Account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "a144adad-6fef-4f76-a06e-c889e8f16080",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2020,
                  60
            ],
            "parameters": {
                  "color": 6,
                  "width": 459,
                  "height": 401,
                  "content": "## Sanitise Email \nRemoves HTML and useless information in preparation for the AI Agent"
            },
            "typeVersion": 1
      },
      {
            "id": "92ccac8f-9ce3-4f81-a499-e55835be3fc7",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2020,
                  580
            ],
            "parameters": {
                  "color": 4,
                  "width": 736,
                  "height": 558,
                  "content": "## Get Rules & Categories\nEdit the airtables to set your own categories, rules, contacts and/or delete rules. "
            },
            "typeVersion": 1
      },
      {
            "id": "5b304e0f-002c-42c6-82a0-9ab1dc858861",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  3860,
                  460
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {
                        "temperature": 0.2
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "l2JgpErNc5namHVH",
                        "name": "OpenAI account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "210816e8-6a1f-4e63-a90e-d953e0e87ccd",
            "name": "Set Category",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  4500,
                  240
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $json.output.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ [$json.output.category] }}"
                  }
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "nv0cz3C6VZDzEgtR",
                        "name": "Microsoft365 Email Account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "fe4f8e8f-6a5c-4b7b-b5f7-10f1f374397c",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  4040,
                  460
            ],
            "parameters": {
                  "schemaType": "manual",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"id\": {\n \"type\": \"string\",\n \"description\": \"The email id\"\n },\n \"subject\": {\n \"type\": \"string\",\n \"description\": \"The email subject line\"\n },\n \"category\": {\n \"type\": \"string\",\n \"description\": \"Primary classification of the email\"\n },\n \"subCategory\": {\n \"type\": \"string\",\n \"description\": \"Optional sub-classification if applicable\"\n },\n \"analysis\": {\n \"type\": \"string\",\n \"description\": \"Reasoning behind the categorization\"\n }\n },\n \"required\": [\"id\",\"subject\", \"category\", \"analysis\"]\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "489028ca-f265-4ea2-b8dd-64dd6b06c8f6",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  4740,
                  240
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
                                    "id": "6e4ecd0c-d151-4e5b-8d66-558f9f9ec3b0",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('AI: Analyse Email').item.json.output.subCategory }}",
                                    "rightValue": "Action"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "e2a27071-bac6-4a67-94fb-93e7ac218c89",
            "name": "Set Importance",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  5000,
                  220
            ],
            "parameters": {
                  "messageId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('AI: Analyse Email').item.json.output.id }}"
                  },
                  "operation": "update",
                  "updateFields": {
                        "importance": "High"
                  }
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "nv0cz3C6VZDzEgtR",
                        "name": "Microsoft365 Email Account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "61cecccf-589f-4514-b126-cfbfc7d94981",
            "name": "AI: Analyse Email",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  3860,
                  240
            ],
            "parameters": {
                  "text": "=Categorise the following email:\n<email>\n{{ $('Loop Over Items').item.json.toJsonString() }}\n</email>\n\n<Contact>\n{{ $('Contact').all().toJsonString() }}\n</Contact>\n\n<DeleteRules>\n{{ $('Delete Rules').all().toJsonString() }}\n</DeleteRules>\n\n<Categories>\n{{ $('Categories').all().toJsonString() }}\n</Categories>\n\nEnsure your final output is valid JSON with no additional text or token in the following format:\n\n{\n \"subject\": \"SUBJECT_LINE\",1\n \"category\": \"CATEGORY\",\n \"subCategory\": \"SUBCATEGORY\", //use sparingly\n \"analysis\": \"ANALYSIS_REASONING\"\n}\n\nRemember you can only use ONE of the following category 'Name' values from the 'Categories' defined above. No other categories can be used. Use the subcategory for additional context, for example, if a client email requires action or if a supplier email requires action. Do not create any additional subcategories; you can only use ONE of the category 'Name' values from the 'Categories' defined above.",
                  "options": {
                        "systemMessage": "=Categories: \"\"\"{{ $('Categories').all().toJsonString() }}\"\"\"\n\nYou are an AI email assistant for the *insert role & title*. Your task is to categorize incoming emails using one of the category 'Name' values defined in 'Categories' above.\n\nYou may also use the subcategory:\n- Action\n\nInstructions:\nAnalyse the email subject, body, and sender's email address to determine the appropriate category by referring to the 'Usage', 'Sender Indicators' and 'Subject Indicators' defined in the 'Categories' above.\n\n\nOutput Format:\nProduce output in valid JSON format:\n{\n \"id\": \"{{ $('Loop Over Items').item.json.id }}\",\n \"subject\": \"SUBJECT_LINE\",\n \"category\": \"PRIMARY CATEGORY\",\n \"subCategory\": \"SUBCATEGORY\", // use sparingly\n \"analysis\": \"Brief 1-2 sentence explanation of category choice\"\n}\n- Replace \"SUBJECT_LINE\" with the actual subject of the email.\n- \"PRIMARY CATEGORY\" should be one of the categories listed above.\n- \"SUBCATEGORY\" should be \"Action\" if applicable; otherwise, omit or leave blank.\n- The \"analysis\" should be a brief 1-2 sentence explanation of why the category was chosen. Also, indicate if there was a match for the 'Contact' email and the email sender.\n\nImportant:\nYou may only use the categories and the subcategory listed above; do not create any additional categories or subcategories.\n\nNo additional text or tokens should be included outside the JSON output.\n"
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      },
      {
            "id": "947eb4d7-9067-4144-819b-f53947ca77f8",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1420,
                  -620
            ],
            "parameters": {
                  "color": 6,
                  "width": 760,
                  "height": 400,
                  "content": "## CRM Contact List Integration \nFor this workflow I am retrieving supplier & client contacts from Monday.com the email assistant has better context to categorise, prioritise and reply to emails.\nThe list is updated daily or you can change the scheduler trigger to update more or less frequently.\nYou could replace this with your own CRM."
            },
            "typeVersion": 1
      },
      {
            "id": "79815a8f-5650-4ec9-97b3-c0201469d048",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3640,
                  60
            ],
            "parameters": {
                  "width": 700,
                  "height": 580,
                  "content": "## Categorise & Prioritise Emails Agent \n"
            },
            "typeVersion": 1
      },
      {
            "id": "2e9411a8-30da-4ee5-9597-cb08e34049a5",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4400,
                  120
            ],
            "parameters": {
                  "color": 4,
                  "width": 740,
                  "height": 280,
                  "content": "## Set the category & importance using the output from the agent\n"
            },
            "typeVersion": 1
      },
      {
            "id": "138a734f-0ac5-4e50-a4af-b7255e11e862",
            "name": "Check Mail Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "disabled": true,
            "position": [
                  980,
                  260
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "minutes",
                                    "minutesInterval": 15
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "709795fd-68ff-4881-9f30-6270dea83f7c",
            "name": "Update Contacts Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  1080,
                  -420
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {}
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "552803ce-3dae-415d-b14d-a7b990450482",
            "name": "Monday.com - Get Contacts",
            "type": "n8n-nodes-base.mondayCom",
            "position": [
                  1520,
                  -440
            ],
            "parameters": {
                  "boardId": "1840712625",
                  "groupId": "topics",
                  "resource": "boardItem",
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "mondayComApi": {
                        "id": "wur9UFaP9YKCFZly",
                        "name": "Monday.com - API User"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "cf41ebb0-f295-4f1a-a49c-05471a4d9220",
            "name": "Airtable - Contacts",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1920,
                  -440
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appNmgIGA4Fhculsn",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn",
                        "cachedResultName": "AI Email Assistant"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbl8gTTEn96uFRDHE",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn/tbl8gTTEn96uFRDHE",
                        "cachedResultName": "Contacts"
                  },
                  "columns": {
                        "value": {
                              "Type": "={{ $json.column_values[1].text }}",
                              "Email": "={{ $json.column_values[6].text }}",
                              "Last Name": "={{ $json.name.split(\" \",2).last() }}",
                              "First Name": "={{ $json.name.split(\" \",2).first() }}"
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
                                    "id": "First Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "First Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Last Name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Last Name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Type",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Type",
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
                        "id": "Bgr0Fi30Oek2jpXT",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "6d698b4d-f18c-4e4a-9c83-8a39208aee8c",
            "name": "Convert to Markdown",
            "type": "n8n-nodes-base.markdown",
            "notes": "Converts the body of the email to markdown",
            "position": [
                  2120,
                  240
            ],
            "parameters": {
                  "html": "={{ $json.body.content }}",
                  "options": {}
            },
            "notesInFlow": true,
            "typeVersion": 1
      },
      {
            "id": "012109cc-dcba-464b-b3bc-17201b1ad436",
            "name": "Email Messages",
            "type": "n8n-nodes-base.set",
            "notes": "Set email fields",
            "position": [
                  2320,
                  240
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "edb304e1-3e9f-4a77-918c-25646addbc53",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "57a3ef3a-2701-40d9-882f-f43a7219f148",
                                    "name": "importance",
                                    "type": "string",
                                    "value": "={{ $json.importance }}"
                              },
                              {
                                    "id": "d8317f4f-aa0e-4196-89af-cb016765490a",
                                    "name": "sender",
                                    "type": "object",
                                    "value": "={{ $json.sender.emailAddress }}"
                              },
                              {
                                    "id": "908716c8-9ff7-4bdc-a1a3-64227559635e",
                                    "name": "from",
                                    "type": "object",
                                    "value": "={{ $json.from.emailAddress }}"
                              },
                              {
                                    "id": "ce007329-e221-4c5a-8130-2f8e9130160f",
                                    "name": "body",
                                    "type": "string",
                                    "value": "={{ $json.data\n .replace(/<[^>]*>/g, '') // Remove HTML tags\n .replace(/\\[(.*?)\\]\\((.*?)\\)/g, '') // Remove Markdown links like [text](link)\n .replace(/!\\[.*?\\]\\(.*?\\)/g, '') // Remove Markdown images like ![alt](image-link)\n .replace(/\\|/g, '') // Remove table separators \"|\"\n .replace(/-{3,}/g, '') // Remove horizontal rule \"---\"\n .replace(/\\n+/g, ' ') // Remove multiple newlines\n .replace(/([^\\w\\s.,!?@])/g, '') // Remove special characters except essential ones\n .replace(/\\s{2,}/g, ' ') // Replace multiple spaces with a single space\n .trim() // Trim leading/trailing whitespace\n}}\n"
                              },
                              {
                                    "id": "6abfcc56-7b0a-469e-82fc-ce294ed5162b",
                                    "name": "id",
                                    "type": "string",
                                    "value": "={{ $json.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "6d3933f3-3f2e-4268-8979-d6c93c961916",
            "name": "Rules",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2400,
                  720
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appNmgIGA4Fhculsn",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn",
                        "cachedResultName": "AI Email Assistant"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblMSXbMFKETNToxV",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn/tblMSXbMFKETNToxV",
                        "cachedResultName": "Rules"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Bgr0Fi30Oek2jpXT",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 2.1
      },
      {
            "id": "9166d63f-0c16-490f-afb8-e30ef25c49da",
            "name": "Categories",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2300,
                  860
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appNmgIGA4Fhculsn",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn",
                        "cachedResultName": "AI Email Assistant"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbliKDp5PoFNF7YI7",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn/tbliKDp5PoFNF7YI7",
                        "cachedResultName": "Categories"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Bgr0Fi30Oek2jpXT",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 2.1
      },
      {
            "id": "f48e5a29-0eee-4420-80d9-2b9b016fba0d",
            "name": "Delete Rules",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2140,
                  960
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appNmgIGA4Fhculsn",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn",
                        "cachedResultName": "AI Email Assistant"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbl84EJr7y65ed4zh",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn/tbl84EJr7y65ed4zh",
                        "cachedResultName": "Delete Rules"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Bgr0Fi30Oek2jpXT",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 2.1
      },
      {
            "id": "d6ad6091-2c7e-41b9-a9b3-b8715208cec0",
            "name": "Contact",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  3080,
                  240
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appNmgIGA4Fhculsn",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn",
                        "cachedResultName": "AI Email Assistant"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbl8gTTEn96uFRDHE",
                        "cachedResultUrl": "https://airtable.com/appNmgIGA4Fhculsn/tbl8gTTEn96uFRDHE",
                        "cachedResultName": "Contacts"
                  },
                  "options": {},
                  "operation": "search",
                  "filterByFormula": "={Email}='{{ $('Loop Over Items').item.json.from.address }}'"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Bgr0Fi30Oek2jpXT",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "executeOnce": false,
            "typeVersion": 2.1,
            "alwaysOutputData": true
      },
      {
            "id": "bc1ede01-fa21-4446-a4e1-1a725a3a4887",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  2720,
                  260
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "fcdd837d-8852-4dcf-924c-aba4f2cddeba",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  3420,
                  220
            ],
            "parameters": {
                  "mode": "chooseBranch",
                  "numberInputs": 4
            },
            "typeVersion": 3
      },
      {
            "id": "f790dd9b-19bb-4649-975e-00a511f2dd9f",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3020,
                  60
            ],
            "parameters": {
                  "color": 4,
                  "height": 400,
                  "content": "## Match Contact\nCheck if the sender is an existing contact. Note in this workflow the contacts are dynamically loaded from Monday.com"
            },
            "typeVersion": 1
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Set Importance",
                              "type": "main",
                              "index": 0
                        }
                  ],
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
                              "node": "AI: Analyse Email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Rules": {
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
      "Contact": {
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
      "Categories": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 2
                        }
                  ]
            ]
      },
      "Delete Rules": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 3
                        }
                  ]
            ]
      },
      "Set Category": {
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
      "Email Messages": {
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
      "Set Importance": {
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
      "Loop Over Items": {
            "main": [
                  [],
                  [
                        {
                              "node": "Contact",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "AI: Analyse Email": {
            "main": [
                  [
                        {
                              "node": "Set Category",
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
                              "node": "AI: Analyse Email",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Convert to Markdown": {
            "main": [
                  [
                        {
                              "node": "Email Messages",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Microsoft Outlook23": {
            "main": [
                  [
                        {
                              "node": "Convert to Markdown",
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
                              "node": "AI: Analyse Email",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Monday.com - Get Contacts": {
            "main": [
                  [
                        {
                              "node": "Airtable - Contacts",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check Mail Schedule Trigger": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook23",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Contacts Schedule Trigger": {
            "main": [
                  [
                        {
                              "node": "Monday.com - Get Contacts",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "Microsoft Outlook23",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Rules",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Categories",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Delete Rules",
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
    name: "Contact Form Text Classifier for eCommerce",
    nodes: [
      {
            "id": "13175d48-c3a6-4ca6-afed-b70f40289f38",
            "name": "On form submission",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  -480,
                  -320
            ],
            "webhookId": "8e10c8ca-895c-4274-ba95-0d646b8bda4e",
            "parameters": {
                  "options": {},
                  "formTitle": "Contacts",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "Name",
                                    "placeholder": "Name",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "Email",
                                    "placeholder": "Email",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "textarea",
                                    "fieldLabel": "Message",
                                    "placeholder": "Message",
                                    "requiredField": true
                              }
                        ]
                  },
                  "responseMode": "lastNode",
                  "formDescription": "Basic Contact Form"
            },
            "typeVersion": 2.2
      },
      {
            "id": "7b352c9f-5d2e-46ca-9499-594063167e9a",
            "name": "Text Classifier",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  -160,
                  -320
            ],
            "parameters": {
                  "options": {
                        "fallback": "other",
                        "systemPromptTemplate": "=Please classify the text provided by the user into one of the following categories: {categories}, and use the provided formatting instructions below. Don't explain, and only output the json with the selected {categories}."
                  },
                  "inputText": "={{ $json.Message }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "Request Quote",
                                    "description": "Request for quote"
                              },
                              {
                                    "category": "Product info",
                                    "description": "General information about a product"
                              },
                              {
                                    "category": "General problem",
                                    "description": "General problems about a product"
                              },
                              {
                                    "category": "Order",
                                    "description": "Information about an order placed"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "efef4c71-5f56-44b0-a613-9fa888e495b8",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -220,
                  -100
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "83f0d528-884c-4701-8fdd-dc07c05fafb5",
            "name": "Prod. Dep.",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  320,
                  -540
            ],
            "parameters": {
                  "html": "=Name: {{ $json.Name }}\nEmail: {{ $json.Email }}\n\nMessage:\n{{ $json.Message }}\n\nTipo prodotto: {{ $json[\"tipo prodotto\"] }}",
                  "options": {
                        "replyTo": "={{ $json.Email }}"
                  },
                  "subject": "=[n8n Contacts] Product info",
                  "toEmail": "to@domain.com",
                  "fromEmail": "from@domain.com"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "88486500-dcea-4db9-9ffd-f55193eaa83d",
            "name": "Quote Dep.",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  320,
                  -780
            ],
            "parameters": {
                  "html": "=Name: {{ $json.Name }}\nEmail: {{ $json.Email }}\n\nMessage:\n{{ $json.Message }}\n\nTipo prodotto: {{ $json[\"tipo prodotto\"] }}",
                  "options": {
                        "replyTo": "={{ $json.Email }}"
                  },
                  "subject": "=[n8n Contacts] Quote",
                  "toEmail": "to@domain.com",
                  "fromEmail": "from@domain.com"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "f6a63c4f-ee2e-42f1-a12c-b1fc6cf48f94",
            "name": "Gen. Dep.",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  320,
                  -320
            ],
            "parameters": {
                  "html": "=Name: {{ $json.Name }}\nEmail: {{ $json.Email }}\n\nMessage:\n{{ $json.Message }}\n\nTipo prodotto: {{ $json[\"tipo prodotto\"] }}",
                  "options": {
                        "replyTo": "={{ $json.Email }}"
                  },
                  "subject": "=[n8n Contacts] General",
                  "toEmail": "to@domain.com",
                  "fromEmail": "from@domain.com"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "04a3e144-af75-4a95-819f-d5f1d4591b67",
            "name": "Order Dep.",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  320,
                  -80
            ],
            "parameters": {
                  "html": "=Name: {{ $json.Name }}\nEmail: {{ $json.Email }}\n\nMessage:\n{{ $json.Message }}\n\nTipo prodotto: {{ $json[\"tipo prodotto\"] }}",
                  "options": {
                        "replyTo": "={{ $json.Email }}"
                  },
                  "subject": "=[n8n Contacts] Order info",
                  "toEmail": "to@domain.com",
                  "fromEmail": "from@domain.com"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "3767e3c7-b792-4b0d-a1f2-fc068310cb11",
            "name": "Other Dep.",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  320,
                  140
            ],
            "parameters": {
                  "html": "=Name: {{ $json.Name }}\nEmail: {{ $json.Email }}\n\nMessage:\n{{ $json.Message }}\n\nTipo prodotto: {{ $json[\"tipo prodotto\"] }}",
                  "options": {
                        "replyTo": "={{ $json.Email }}"
                  },
                  "subject": "=[n8n Contacts] Other",
                  "toEmail": "to@domain.com",
                  "fromEmail": "from@domain.com"
            },
            "credentials": {
                  "smtp": {
                        "id": "hRjP3XbDiIQqvi7x",
                        "name": "SMTP info@n3witalia.com"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "c411a82d-0b86-49da-a11f-47ec79f9f7ff",
            "name": "Quote DB",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  520,
                  -780
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "TO": "={{ (JSON.stringify($json.envelope.to)) }}",
                              "DATA": "={{ $('Text Classifier').item.json.submittedAt }}",
                              "NOME": "={{ $('Text Classifier').item.json.Name }}",
                              "EMAIL": "={{ $('Text Classifier').item.json.Email }}",
                              "CATEGORIA": "info prodotti",
                              "RICHIESTA": "={{ $('Text Classifier').item.json.Message }}"
                        },
                        "schema": [
                              {
                                    "id": "DATA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "DATA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "NOME",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "NOME",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "EMAIL",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "EMAIL",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "RICHIESTA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "RICHIESTA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CATEGORIA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "CATEGORIA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "TO",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "TO",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit#gid=0",
                        "cachedResultName": "Foglio1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit?usp=drivesdk",
                        "cachedResultName": "Classified Contact Form"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "JYR6a64Qecd6t8Hb",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "c14008fb-8932-44ad-88ef-42f6d4029fb1",
            "name": "Prod DB",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  520,
                  -540
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "TO": "={{ (JSON.stringify($json.envelope.to)) }}",
                              "DATA": "={{ $('Text Classifier').item.json.submittedAt }}",
                              "NOME": "={{ $('Text Classifier').item.json.Name }}",
                              "EMAIL": "={{ $('Text Classifier').item.json.Email }}",
                              "CATEGORIA": "info prodotti",
                              "RICHIESTA": "={{ $('Text Classifier').item.json.Message }}"
                        },
                        "schema": [
                              {
                                    "id": "DATA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "DATA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "NOME",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "NOME",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "EMAIL",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "EMAIL",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "RICHIESTA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "RICHIESTA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CATEGORIA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "CATEGORIA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "TO",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "TO",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit#gid=0",
                        "cachedResultName": "Foglio1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit?usp=drivesdk",
                        "cachedResultName": "Classified Contact Form"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "JYR6a64Qecd6t8Hb",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "f2e02c07-7218-4d08-a816-1ce2de289312",
            "name": "General DB",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  520,
                  -320
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "TO": "={{ (JSON.stringify($json.envelope.to)) }}",
                              "DATA": "={{ $('Text Classifier').item.json.submittedAt }}",
                              "NOME": "={{ $('Text Classifier').item.json.Name }}",
                              "EMAIL": "={{ $('Text Classifier').item.json.Email }}",
                              "CATEGORIA": "info prodotti",
                              "RICHIESTA": "={{ $('Text Classifier').item.json.Message }}"
                        },
                        "schema": [
                              {
                                    "id": "DATA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "DATA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "NOME",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "NOME",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "EMAIL",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "EMAIL",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "RICHIESTA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "RICHIESTA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CATEGORIA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "CATEGORIA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "TO",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "TO",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit#gid=0",
                        "cachedResultName": "Foglio1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit?usp=drivesdk",
                        "cachedResultName": "Classified Contact Form"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "JYR6a64Qecd6t8Hb",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "d6ee5c05-d966-47c1-a7ec-df721f77c5d0",
            "name": "Order DB",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  520,
                  -80
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "TO": "={{ (JSON.stringify($json.envelope.to)) }}",
                              "DATA": "={{ $('Text Classifier').item.json.submittedAt }}",
                              "NOME": "={{ $('Text Classifier').item.json.Name }}",
                              "EMAIL": "={{ $('Text Classifier').item.json.Email }}",
                              "CATEGORIA": "info prodotti",
                              "RICHIESTA": "={{ $('Text Classifier').item.json.Message }}"
                        },
                        "schema": [
                              {
                                    "id": "DATA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "DATA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "NOME",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "NOME",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "EMAIL",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "EMAIL",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "RICHIESTA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "RICHIESTA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CATEGORIA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "CATEGORIA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "TO",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "TO",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit#gid=0",
                        "cachedResultName": "Foglio1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit?usp=drivesdk",
                        "cachedResultName": "Classified Contact Form"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "JYR6a64Qecd6t8Hb",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "b4f344bd-a5c4-4977-af96-edbab85b49d0",
            "name": "Other DB",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  520,
                  140
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "TO": "={{ (JSON.stringify($json.envelope.to)) }}",
                              "DATA": "={{ $('Text Classifier').item.json.submittedAt }}",
                              "NOME": "={{ $('Text Classifier').item.json.Name }}",
                              "EMAIL": "={{ $('Text Classifier').item.json.Email }}",
                              "CATEGORIA": "info prodotti",
                              "RICHIESTA": "={{ $('Text Classifier').item.json.Message }}"
                        },
                        "schema": [
                              {
                                    "id": "DATA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "DATA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "NOME",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "NOME",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "EMAIL",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "EMAIL",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "RICHIESTA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "RICHIESTA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CATEGORIA",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "CATEGORIA",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "TO",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "TO",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit#gid=0",
                        "cachedResultName": "Foglio1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D6tfsAK81ZE6VA0-sd_syuyI_rloNYjgWOhwgszPIZw/edit?usp=drivesdk",
                        "cachedResultName": "Classified Contact Form"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "JYR6a64Qecd6t8Hb",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "99872f49-85c3-47a0-b0ea-10ebbdbb67f5",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -480,
                  -680
            ],
            "parameters": {
                  "width": 580,
                  "height": 280,
                  "content": "## Important notes\n\nThis very simple workflow is ideal for eCommerce businesses or customer support teams looking to automate and streamline the handling of contact form submissions.\n\n- It is possible to hook any external form such as CF7 for Wordpress through a webhook\n- It is possible to send the email through other providers by replacing them with the relative nodes (Gmail, Outlook....)\n- It is possible to change the collection database with other tools"
            },
            "typeVersion": 1
      }
],
    connections: {
      "OpenAI": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Text Classifier",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gen. Dep.": {
            "main": [
                  [
                        {
                              "node": "General DB",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Order Dep.": {
            "main": [
                  [
                        {
                              "node": "Order DB",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Other Dep.": {
            "main": [
                  [
                        {
                              "node": "Other DB",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Prod. Dep.": {
            "main": [
                  [
                        {
                              "node": "Prod DB",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Quote Dep.": {
            "main": [
                  [
                        {
                              "node": "Quote DB",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Text Classifier": {
            "main": [
                  [
                        {
                              "node": "Quote Dep.",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Prod. Dep.",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [],
                  [
                        {
                              "node": "Gen. Dep.",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Order Dep.",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Other Dep.",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "On form submission": {
            "main": [
                  [
                        {
                              "node": "Text Classifier",
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
    name: "Send A ChatGPT Email Reply And Save Responses To Google Sheets",
    nodes: [
      {
            "id": "88c0f64c-a7cd-4f35-96dd-9eee4b1d6a1a",
            "name": "Generate reply",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  -480,
                  2260
            ],
            "parameters": {
                  "prompt": "=From: {{ $json.from.value }}\nTo: {{ $json.to.value }}\nSubject: {{ $json.subject }}\nBody: {{ $json.reply }}\n\n\nReply: ",
                  "options": {
                        "maxTokens": "={{ $('Configure').first().json.replyTokenSize }}"
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "27",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "7105b689-9f9c-4354-aad9-8f1abb6c0a06",
            "name": "On email received",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -2460,
                  2680
            ],
            "parameters": {
                  "simple": false,
                  "filters": {},
                  "options": {},
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "26",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "ea18ed9a-0158-45e1-ac1b-1993ace4ff2c",
            "name": "Only continue for specific emails",
            "type": "n8n-nodes-base.if",
            "position": [
                  -1360,
                  2460
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $('Configure').first().json.recipients.split(',') }}",
                                    "value2": "*",
                                    "operation": "contains"
                              },
                              {
                                    "value1": "={{ $('Configure').first().json.recipients.split(',') }}",
                                    "value2": "={{ $json.from.value[0].address }}",
                                    "operation": "contains"
                              }
                        ]
                  },
                  "combineOperation": "any"
            },
            "typeVersion": 1
      },
      {
            "id": "d1425dff-0fc1-4a4b-9202-418ce30d7cd9",
            "name": "Configure",
            "type": "n8n-nodes-base.set",
            "position": [
                  -1940,
                  2800
            ],
            "parameters": {
                  "values": {
                        "number": [
                              {
                                    "name": "maxTokenSize",
                                    "value": 4000
                              },
                              {
                                    "name": "replyTokenSize",
                                    "value": 300
                              }
                        ],
                        "string": [
                              {
                                    "name": "spreadsheetId"
                              },
                              {
                                    "name": "worksheetId"
                              },
                              {
                                    "name": "spreadsheetName",
                                    "value": "ChatGPT responses"
                              },
                              {
                                    "name": "worksheetName",
                                    "value": "Database"
                              },
                              {
                                    "name": "recipients",
                                    "value": "[UPDATE ME]"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "594f77e6-9e7e-4e93-b6e0-95fad57e42f0",
            "name": "Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -2060,
                  2480
            ],
            "parameters": {
                  "width": 330.0279884670691,
                  "height": 929.4540475960038,
                  "content": "### Configuration\nIf you decide to use your own spreadsheet, it is up to you to ensure all columns are present before running this workflow. A good way to do this is to run this workflow once with **empty** `spreadsheetid` and `worksheetId` variables (see the `Configure` node). Then map the output from `Store spreadsheet ID` to this node.\n\nIt is recommended that you specify the `spreadsheetId` and `worksheetId`, since relying solely on a workflow's static data is considered bad practice.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n__`spreadsheetId`__: The ID of the spreadsheet where Pipedrive deals will be stored.\n__`worksheetId`__: The ID of the worksheet where Pipedrive deals will be stored.\n__`spreadsheetName`(required)__: The human readable name of the spreadsheet where Pipedrive deals will be stored.\n__`worksheetName`(required)__: The human readable name of the worksheet in the spreadsheet where Pipedrive deals will be stored.\n__`recipients`(required)__: Comma-separated list of email recipients to send ChatGPT emails to. Use `*` to send ChatGPT response to every email address.\n__`maxTokenSize`(required)__: The maximum token size for the model you choose. See possible models from OpenAI [here](https://platform.openai.com/docs/models/gpt-3).\n__`replyTokenSize`(required)__: The reply's maximum token size. Default is 300. This determines how much text the AI will reply with."
            },
            "typeVersion": 1
      },
      {
            "id": "2dc3e403-f2a0-43c2-a1e4-187d901d692f",
            "name": "Send reply to recipient",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  360,
                  1860
            ],
            "parameters": {
                  "message": "={{ $json.html }}",
                  "options": {},
                  "emailType": "html",
                  "messageId": "={{ $node[\"On email received\"].json.id }}",
                  "operation": "reply"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "26",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "f845aa4d-5542-4126-a42d-4e5afa1893d1",
            "name": "Generate UUID",
            "type": "n8n-nodes-base.crypto",
            "position": [
                  -1140,
                  2360
            ],
            "parameters": {
                  "action": "generate",
                  "dataPropertyName": "uuid"
            },
            "typeVersion": 1
      },
      {
            "id": "3c468585-4546-439b-9e8a-efb7231277d8",
            "name": "Thanks for your response!",
            "type": "n8n-nodes-base.html",
            "position": [
                  -1140,
                  2980
            ],
            "parameters": {
                  "html": "<!DOCTYPE html>\n\n<html>\n<head>\n <meta charset=\"UTF-8\" />\n <title>Thanks for your response!</title>\n</head>\n<body>\n <div class=\"container\">\n <h1>Thanks for your response!</h1>\n <h2>You can safely close this window.</h2>\n </div>\n</body>\n</html>\n\n<style>\n.container {\n background-color: #ffffff;\n text-align: center;\n padding: 16px;\n border-radius: 8px;\n}\n\nh1 {\n color: #ff6d5a;\n font-size: 24px;\n font-weight: bold;\n padding: 8px;\n}\n\nh2 {\n color: #909399;\n font-size: 18px;\n font-weight: bold;\n padding: 8px;\n}\n</style>\n\n<script>\nconsole.log(\"Hello World!\");\n</script>"
            },
            "typeVersion": 1
      },
      {
            "id": "6b0bfa33-84ca-4b9c-98ec-c1bc08a1230d",
            "name": "Extract message content (advanced)",
            "type": "n8n-nodes-base.code",
            "position": [
                  -920,
                  2360
            ],
            "parameters": {
                  "jsCode": "// source: https://gist.github.com/ikbelkirasan/2462073f6c7c760faa6fad7c6a0c4dc3\nvar EmailParser=function(t){var r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},n.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},n.t=function(t,r){if(1&r&&(t=n(t)),8&r)return t;if(4&r&&\"object\"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,\"default\",{enumerable:!0,value:t}),2&r&&\"string\"!=typeof t)for(var o in t)n.d(e,o,function(r){return t[r]}.bind(null,o));return e},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,\"a\",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p=\"\",n(n.s=59)}([function(t,r){var n=Array.isArray;t.exports=n},function(t,r,n){var e=n(31),o=\"object\"==typeof self&&self&&self.Object===Object&&self,u=e||o||Function(\"return this\")();t.exports=u},function(t,r,n){var e=n(74),o=n(79);t.exports=function(t,r){var n=o(t,r);return e(n)?n:void 0}},function(t,r){t.exports=function(t){return null!=t&&\"object\"==typeof t}},function(t,r){t.exports=function(t){var r=typeof t;return null!=t&&(\"object\"==r||\"function\"==r)}},function(t,r,n){var e=n(6),o=n(75),u=n(76),i=e?e.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?\"[object Undefined]\":\"[object Null]\":i&&i in Object(t)?o(t):u(t)}},function(t,r,n){var e=n(1).Symbol;t.exports=e},function(t,r,n){var e=n(35),o=n(99),u=n(14);t.exports=function(t){return u(t)?e(t):o(t)}},function(t,r,n){var e=n(64),o=n(65),u=n(66),i=n(67),c=n(68);function a(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}a.prototype.clear=e,a.prototype.delete=o,a.prototype.get=u,a.prototype.has=i,a.prototype.set=c,t.exports=a},function(t,r,n){var e=n(18);t.exports=function(t,r){for(var n=t.length;n--;)if(e(t[n][0],r))return n;return-1}},function(t,r,n){var e=n(2)(Object,\"create\");t.exports=e},function(t,r,n){var e=n(88);t.exports=function(t,r){var n=t.__data__;return e(r)?n[\"string\"==typeof r?\"string\":\"hash\"]:n.map}},function(t,r,n){var e=n(33),o=n(34);t.exports=function(t,r,n,u){var i=!n;n||(n={});for(var c=-1,a=r.length;++c<a;){var s=r[c],f=u?u(n[s],t[s],s,n,t):void 0;void 0===f&&(f=t[s]),i?o(n,s,f):e(n,s,f)}return n}},function(t,r){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,\"loaded\",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,\"id\",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,r,n){var e=n(30),o=n(22);t.exports=function(t){return null!=t&&o(t.length)&&!e(t)}},function(t,r,n){var e=n(109),o=n(19),u=n(110),i=n(111),c=n(112),a=n(5),s=n(32),f=s(e),p=s(o),l=s(u),v=s(i),b=s(c),h=a;(e&&\"[object DataView]\"!=h(new e(new ArrayBuffer(1)))||o&&\"[object Map]\"!=h(new o)||u&&\"[object Promise]\"!=h(u.resolve())||i&&\"[object Set]\"!=h(new i)||c&&\"[object WeakMap]\"!=h(new c))&&(h=function(t){var r=a(t),n=\"[object Object]\"==r?t.constructor:void 0,e=n?s(n):\"\";if(e)switch(e){case f:return\"[object DataView]\";case p:return\"[object Map]\";case l:return\"[object Promise]\";case v:return\"[object Set]\";case b:return\"[object WeakMap]\"}return r}),t.exports=h},function(t,r,n){var e=n(29);t.exports=function(t){if(\"string\"==typeof t||e(t))return t;var r=t+\"\";return\"0\"==r&&1/t==-1/0?\"-0\":r}},function(t,r,n){var e=n(8),o=n(69),u=n(70),i=n(71),c=n(72),a=n(73);function s(t){var r=this.__data__=new e(t);this.size=r.size}s.prototype.clear=o,s.prototype.delete=u,s.prototype.get=i,s.prototype.has=c,s.prototype.set=a,t.exports=s},function(t,r){t.exports=function(t,r){return t===r||t!=t&&r!=r}},function(t,r,n){var e=n(2)(n(1),\"Map\");t.exports=e},function(t,r,n){var e=n(80),o=n(87),u=n(89),i=n(90),c=n(91);function a(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}a.prototype.clear=e,a.prototype.delete=o,a.prototype.get=u,a.prototype.has=i,a.prototype.set=c,t.exports=a},function(t,r,n){(function(t){var e=n(1),o=n(97),u=r&&!r.nodeType&&r,i=u&&\"object\"==typeof t&&t&&!t.nodeType&&t,c=i&&i.exports===u?e.Buffer:void 0,a=(c?c.isBuffer:void 0)||o;t.exports=a}).call(this,n(13)(t))},function(t,r){t.exports=function(t){return\"number\"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},function(t,r){t.exports=function(t){return function(r){return t(r)}}},function(t,r,n){(function(t){var e=n(31),o=r&&!r.nodeType&&r,u=o&&\"object\"==typeof t&&t&&!t.nodeType&&t,i=u&&u.exports===o&&e.process,c=function(){try{var t=u&&u.require&&u.require(\"util\").types;return t||i&&i.binding&&i.binding(\"util\")}catch(t){}}();t.exports=c}).call(this,n(13)(t))},function(t,r){var n=Object.prototype;t.exports=function(t){var r=t&&t.constructor;return t===(\"function\"==typeof r&&r.prototype||n)}},function(t,r,n){var e=n(41),o=n(42),u=Object.prototype.propertyIsEnumerable,i=Object.getOwnPropertySymbols,c=i?function(t){return null==t?[]:(t=Object(t),e(i(t),(function(r){return u.call(t,r)})))}:o;t.exports=c},function(t,r,n){var e=n(48);t.exports=function(t){var r=new t.constructor(t.byteLength);return new e(r).set(new e(t)),r}},function(t,r,n){var e=n(0),o=n(29),u=/\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,i=/^\\w*$/;t.exports=function(t,r){if(e(t))return!1;var n=typeof t;return!(\"number\"!=n&&\"symbol\"!=n&&\"boolean\"!=n&&null!=t&&!o(t))||(i.test(t)||!u.test(t)||null!=r&&t in Object(r))}},function(t,r,n){var e=n(5),o=n(3);t.exports=function(t){return\"symbol\"==typeof t||o(t)&&\"[object Symbol]\"==e(t)}},function(t,r,n){var e=n(5),o=n(4);t.exports=function(t){if(!o(t))return!1;var r=e(t);return\"[object Function]\"==r||\"[object GeneratorFunction]\"==r||\"[object AsyncFunction]\"==r||\"[object Proxy]\"==r}},function(t,r){var n=\"object\"==typeof global&&global&&global.Object===Object&&global;t.exports=n},function(t,r){var n=Function.prototype.toString;t.exports=function(t){if(null!=t){try{return n.call(t)}catch(t){}try{return t+\"\"}catch(t){}}return\"\"}},function(t,r,n){var e=n(34),o=n(18),u=Object.prototype.hasOwnProperty;t.exports=function(t,r,n){var i=t[r];u.call(t,r)&&o(i,n)&&(void 0!==n||r in t)||e(t,r,n)}},function(t,r,n){var e=n(93);t.exports=function(t,r,n){\"__proto__\"==r&&e?e(t,r,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[r]=n}},function(t,r,n){var e=n(95),o=n(36),u=n(0),i=n(21),c=n(37),a=n(38),s=Object.prototype.hasOwnProperty;t.exports=function(t,r){var n=u(t),f=!n&&o(t),p=!n&&!f&&i(t),l=!n&&!f&&!p&&a(t),v=n||f||p||l,b=v?e(t.length,String):[],h=b.length;for(var y in t)!r&&!s.call(t,y)||v&&(\"length\"==y||p&&(\"offset\"==y||\"parent\"==y)||l&&(\"buffer\"==y||\"byteLength\"==y||\"byteOffset\"==y)||c(y,h))||b.push(y);return b}},function(t,r,n){var e=n(96),o=n(3),u=Object.prototype,i=u.hasOwnProperty,c=u.propertyIsEnumerable,a=e(function(){return arguments}())?e:function(t){return o(t)&&i.call(t,\"callee\")&&!c.call(t,\"callee\")};t.exports=a},function(t,r){var n=/^(?:0|[1-9]\\d*)$/;t.exports=function(t,r){var e=typeof t;return!!(r=null==r?9007199254740991:r)&&(\"number\"==e||\"symbol\"!=e&&n.test(t))&&t>-1&&t%1==0&&t<r}},function(t,r,n){var e=n(98),o=n(23),u=n(24),i=u&&u.isTypedArray,c=i?o(i):e;t.exports=c},function(t,r){t.exports=function(t,r){return function(n){return t(r(n))}}},function(t,r,n){var e=n(35),o=n(102),u=n(14);t.exports=function(t){return u(t)?e(t,!0):o(t)}},function(t,r){t.exports=function(t,r){for(var n=-1,e=null==t?0:t.length,o=0,u=[];++n<e;){var i=t[n];r(i,n,t)&&(u[o++]=i)}return u}},function(t,r){t.exports=function(){return[]}},function(t,r,n){var e=n(44),o=n(45),u=n(26),i=n(42),c=Object.getOwnPropertySymbols?function(t){for(var r=[];t;)e(r,u(t)),t=o(t);return r}:i;t.exports=c},function(t,r){t.exports=function(t,r){for(var n=-1,e=r.length,o=t.length;++n<e;)t[o+n]=r[n];return t}},function(t,r,n){var e=n(39)(Object.getPrototypeOf,Object);t.exports=e},function(t,r,n){var e=n(47),o=n(26),u=n(7);t.exports=function(t){return e(t,u,o)}},function(t,r,n){var e=n(44),o=n(0);t.exports=function(t,r,n){var u=r(t);return o(t)?u:e(u,n(t))}},function(t,r,n){var e=n(1).Uint8Array;t.exports=e},function(t,r,n){var e=n(41),o=n(125),u=n(51),i=n(0);t.exports=function(t,r){return(i(t)?e:o)(t,u(r,3))}},function(t,r,n){var e=n(126),o=n(129)(e);t.exports=o},function(t,r,n){var e=n(130),o=n(143),u=n(153),i=n(0),c=n(154);t.exports=function(t){return\"function\"==typeof t?t:null==t?u:\"object\"==typeof t?i(t)?o(t[0],t[1]):e(t):c(t)}},function(t,r,n){var e=n(132),o=n(3);t.exports=function t(r,n,u,i,c){return r===n||(null==r||null==n||!o(r)&&!o(n)?r!=r&&n!=n:e(r,n,u,i,t,c))}},function(t,r,n){var e=n(133),o=n(136),u=n(137);t.exports=function(t,r,n,i,c,a){var s=1&n,f=t.length,p=r.length;if(f!=p&&!(s&&p>f))return!1;var l=a.get(t);if(l&&a.get(r))return l==r;var v=-1,b=!0,h=2&n?new e:void 0;for(a.set(t,r),a.set(r,t);++v<f;){var y=t[v],x=r[v];if(i)var d=s?i(x,y,v,r,t,a):i(y,x,v,t,r,a);if(void 0!==d){if(d)continue;b=!1;break}if(h){if(!o(r,(function(t,r){if(!u(h,r)&&(y===t||c(y,t,n,i,a)))return h.push(r)}))){b=!1;break}}else if(y!==x&&!c(y,x,n,i,a)){b=!1;break}}return a.delete(t),a.delete(r),b}},function(t,r,n){var e=n(4);t.exports=function(t){return t==t&&!e(t)}},function(t,r){t.exports=function(t,r){return function(n){return null!=n&&(n[t]===r&&(void 0!==r||t in Object(n)))}}},function(t,r,n){var e=n(57),o=n(16);t.exports=function(t,r){for(var n=0,u=(r=e(r,t)).length;null!=t&&n<u;)t=t[o(r[n++])];return n&&n==u?t:void 0}},function(t,r,n){var e=n(0),o=n(28),u=n(145),i=n(148);t.exports=function(t,r){return e(t)?t:o(t,r)?[t]:u(i(t))}},function(t,r){t.exports=function(t,r){for(var n=-1,e=null==t?0:t.length,o=Array(e);++n<e;)o[n]=r(t[n],n,t);return o}},function(t,r,n){var e=n(60);t.exports=function(t,r){var n=(new e).parse(t);return r?n?n.getVisibleText():\"\":n}},function(t,r,n){var e=n(61),o=n(159),u=n(160),i=n(49),c=n(161);const a=/(?:^\\s*--|^\\s*__|^-\\w|^-- $)|(?:^Sent from my (?:\\s*\\w+){1,4}$)|(?:^={30,}$)$/,s=/>+$/,f=[/^\\s*(On(?:(?!.*On\\b|\\bwrote:)[\\s\\S])+wrote:)$/m,/^\\s*(Le(?:(?!.*Le\\b|\\bécrit:)[\\s\\S])+écrit :)$/m,/^\\s*(El(?:(?!.*El\\b|\\bescribió:)[\\s\\S])+escribió:)$/m,/^\\s*(Il(?:(?!.*Il\\b|\\bscritto:)[\\s\\S])+scritto:)$/m,/^\\s*(Op\\s[\\S\\s]+?schreef[\\S\\s]+:)$/m,/^\\s*((W\\sdniu|Dnia)\\s[\\S\\s]+?(pisze|napisał(\\(a\\))?):)$/mu,/^\\s*(Den\\s.+\\sskrev\\s.+:)$/m,/^\\s*(Am\\s.+\\sum\\s.+\\sschrieb\\s.+:)$/m,/^(在[\\S\\s]+写道：)$/m,/^(20[0-9]{2}\\..+\\s작성:)$/m,/^(20[0-9]{2}\\/.+のメッセージ:)$/m,/^(.+\\s<.+>\\sschrieb:)$/m,/^\\s*(From\\s?:.+\\s?(\\[|<).+(\\]|>))/mu,/^\\s*(De\\s?:.+\\s?(\\[|<).+(\\]|>))/mu,/^\\s*(Van\\s?:.+\\s?(\\[|<).+(\\]|>))/mu,/^\\s*(Da\\s?:.+\\s?(\\[|<).+(\\]|>))/mu,/^(20[0-9]{2}-(?:0?[1-9]|1[012])-(?:0?[0-9]|[1-2][0-9]|3[01]|[1-9])\\s[0-2]?[0-9]:\\d{2}\\s[\\S\\s]+?:)$/m,/^\\s*([a-z]{3,4}\\.[\\s\\S]+\\sskrev[\\s\\S]+:)$/m];\n/**\n * Represents a fragment that hasn't been constructed (yet)\n * @license MIT License\n */\nclass p{constructor(){this.lines=[],this.isHidden=!1,this.isSignature=!1,this.isQuoted=!1}toFragment(){var t=c.reverse(this.lines.join(\"\\n\")).replace(/^\\n/,\"\");return new o(t,this.isHidden,this.isSignature,this.isQuoted)}}t.exports=class{constructor(t,r,n){this._signatureRegex=t||a,this._quotedLineRegex=r||s,this._quoteHeadersRegex=n||f}parse(t){if(\"string\"!=typeof t)return new e([]);var r=[];for(var n of(t=t.replace(\"\\r\\n\",\"\\n\"),this._quoteHeadersRegex)){var o=t.match(n);o&&o.length>=2&&(t=t.replace(o[1],o[1].replace(/\\n/g,\" \")))}var i=null;for(var a of c.reverse(t).split(\"\\n\")){if(a=a.replace(/\\n+$/,\"\"),this._isSignature(a)||(a=a.replace(/^\\s+/,\"\")),i){var s=i.lines[i.lines.length-1];this._isSignature(s)?(i.isSignature=!0,this._addFragment(i,r),i=null):0===a.length&&this._isQuoteHeader(s)&&(i.isQuoted=!0,this._addFragment(i,r),i=null)}var f=this._isQuote(a);null!==i&&this._isFragmentLine(i,a,f)||(i&&this._addFragment(i,r),(i=new p).isQuoted=f),i.lines.push(a)}i&&this._addFragment(i,r);var l=[];for(var v of r)l.push(v.toFragment());return new e(u(l))}_addFragment(t,r){(t.isQuoted||t.isSignature||0===t.lines.join(\"\").length)&&(t.isHidden=!0),r.push(t)}_isFragmentLine(t,r,n){return t.isQuoted===n||!!t.isQuoted&&(this._isQuoteHeader(r)||0===r.length)}_isSignature(t){return this._signatureRegex.test(c.reverse(t))}_isQuote(t){return this._quotedLineRegex.test(t)}_isQuoteHeader(t){return i(this._quoteHeadersRegex,r=>r.test(c.reverse(t))).length>0}}},function(t,r,n){var e=n(62),o=n(49),u=n(157);t.exports=class{constructor(t){this._fragments=t}getFragments(){return e(this._fragments)}getVisibleText(){var t=o(this._fragments,t=>!t.isHidden());return u(t,t=>t.getContent()).join(\"\\n\")}}},function(t,r,n){var e=n(63);t.exports=function(t){return e(t,5)}},function(t,r,n){var e=n(17),o=n(92),u=n(33),i=n(94),c=n(101),a=n(104),s=n(105),f=n(106),p=n(107),l=n(46),v=n(108),b=n(15),h=n(113),y=n(114),x=n(119),d=n(0),j=n(21),_=n(121),g=n(4),m=n(123),O=n(7),w={};w[\"[object Arguments]\"]=w[\"[object Array]\"]=w[\"[object ArrayBuffer]\"]=w[\"[object DataView]\"]=w[\"[object Boolean]\"]=w[\"[object Date]\"]=w[\"[object Float32Array]\"]=w[\"[object Float64Array]\"]=w[\"[object Int8Array]\"]=w[\"[object Int16Array]\"]=w[\"[object Int32Array]\"]=w[\"[object Map]\"]=w[\"[object Number]\"]=w[\"[object Object]\"]=w[\"[object RegExp]\"]=w[\"[object Set]\"]=w[\"[object String]\"]=w[\"[object Symbol]\"]=w[\"[object Uint8Array]\"]=w[\"[object Uint8ClampedArray]\"]=w[\"[object Uint16Array]\"]=w[\"[object Uint32Array]\"]=!0,w[\"[object Error]\"]=w[\"[object Function]\"]=w[\"[object WeakMap]\"]=!1,t.exports=function t(r,n,F,A,S,D){var $,P=1&n,z=2&n,E=4&n;if(F&&($=S?F(r,A,S,D):F(r)),void 0!==$)return $;if(!g(r))return r;var k=d(r);if(k){if($=h(r),!P)return s(r,$)}else{var B=b(r),M=\"[object Function]\"==B||\"[object GeneratorFunction]\"==B;if(j(r))return a(r,P);if(\"[object Object]\"==B||\"[object Arguments]\"==B||M&&!S){if($=z||M?{}:x(r),!P)return z?p(r,c($,r)):f(r,i($,r))}else{if(!w[B])return S?r:{};$=y(r,B,P)}}D||(D=new e);var I=D.get(r);if(I)return I;D.set(r,$),m(r)?r.forEach((function(e){$.add(t(e,n,F,e,r,D))})):_(r)&&r.forEach((function(e,o){$.set(o,t(e,n,F,o,r,D))}));var C=E?z?v:l:z?keysIn:O,Q=k?void 0:C(r);return o(Q||r,(function(e,o){Q&&(e=r[o=e]),u($,o,t(e,n,F,o,r,D))})),$}},function(t,r){t.exports=function(){this.__data__=[],this.size=0}},function(t,r,n){var e=n(9),o=Array.prototype.splice;t.exports=function(t){var r=this.__data__,n=e(r,t);return!(n<0)&&(n==r.length-1?r.pop():o.call(r,n,1),--this.size,!0)}},function(t,r,n){var e=n(9);t.exports=function(t){var r=this.__data__,n=e(r,t);return n<0?void 0:r[n][1]}},function(t,r,n){var e=n(9);t.exports=function(t){return e(this.__data__,t)>-1}},function(t,r,n){var e=n(9);t.exports=function(t,r){var n=this.__data__,o=e(n,t);return o<0?(++this.size,n.push([t,r])):n[o][1]=r,this}},function(t,r,n){var e=n(8);t.exports=function(){this.__data__=new e,this.size=0}},function(t,r){t.exports=function(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}},function(t,r){t.exports=function(t){return this.__data__.get(t)}},function(t,r){t.exports=function(t){return this.__data__.has(t)}},function(t,r,n){var e=n(8),o=n(19),u=n(20);t.exports=function(t,r){var n=this.__data__;if(n instanceof e){var i=n.__data__;if(!o||i.length<199)return i.push([t,r]),this.size=++n.size,this;n=this.__data__=new u(i)}return n.set(t,r),this.size=n.size,this}},function(t,r,n){var e=n(30),o=n(77),u=n(4),i=n(32),c=/^\\[object .+?Constructor\\]$/,a=Function.prototype,s=Object.prototype,f=a.toString,p=s.hasOwnProperty,l=RegExp(\"^\"+f.call(p).replace(/[\\\\^$.*+?()[\\]{}|]/g,\"\\\\$&\").replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g,\"$1.*?\")+\"$\");t.exports=function(t){return!(!u(t)||o(t))&&(e(t)?l:c).test(i(t))}},function(t,r,n){var e=n(6),o=Object.prototype,u=o.hasOwnProperty,i=o.toString,c=e?e.toStringTag:void 0;t.exports=function(t){var r=u.call(t,c),n=t[c];try{t[c]=void 0;var e=!0}catch(t){}var o=i.call(t);return e&&(r?t[c]=n:delete t[c]),o}},function(t,r){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},function(t,r,n){var e,o=n(78),u=(e=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||\"\"))?\"Symbol(src)_1.\"+e:\"\";t.exports=function(t){return!!u&&u in t}},function(t,r,n){var e=n(1)[\"__core-js_shared__\"];t.exports=e},function(t,r){t.exports=function(t,r){return null==t?void 0:t[r]}},function(t,r,n){var e=n(81),o=n(8),u=n(19);t.exports=function(){this.size=0,this.__data__={hash:new e,map:new(u||o),string:new e}}},function(t,r,n){var e=n(82),o=n(83),u=n(84),i=n(85),c=n(86);function a(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}a.prototype.clear=e,a.prototype.delete=o,a.prototype.get=u,a.prototype.has=i,a.prototype.set=c,t.exports=a},function(t,r,n){var e=n(10);t.exports=function(){this.__data__=e?e(null):{},this.size=0}},function(t,r){t.exports=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}},function(t,r,n){var e=n(10),o=Object.prototype.hasOwnProperty;t.exports=function(t){var r=this.__data__;if(e){var n=r[t];return\"__lodash_hash_undefined__\"===n?void 0:n}return o.call(r,t)?r[t]:void 0}},function(t,r,n){var e=n(10),o=Object.prototype.hasOwnProperty;t.exports=function(t){var r=this.__data__;return e?void 0!==r[t]:o.call(r,t)}},function(t,r,n){var e=n(10);t.exports=function(t,r){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=e&&void 0===r?\"__lodash_hash_undefined__\":r,this}},function(t,r,n){var e=n(11);t.exports=function(t){var r=e(this,t).delete(t);return this.size-=r?1:0,r}},function(t,r){t.exports=function(t){var r=typeof t;return\"string\"==r||\"number\"==r||\"symbol\"==r||\"boolean\"==r?\"__proto__\"!==t:null===t}},function(t,r,n){var e=n(11);t.exports=function(t){return e(this,t).get(t)}},function(t,r,n){var e=n(11);t.exports=function(t){return e(this,t).has(t)}},function(t,r,n){var e=n(11);t.exports=function(t,r){var n=e(this,t),o=n.size;return n.set(t,r),this.size+=n.size==o?0:1,this}},function(t,r){t.exports=function(t,r){for(var n=-1,e=null==t?0:t.length;++n<e&&!1!==r(t[n],n,t););return t}},function(t,r,n){var e=n(2),o=function(){try{var t=e(Object,\"defineProperty\");return t({},\"\",{}),t}catch(t){}}();t.exports=o},function(t,r,n){var e=n(12),o=n(7);t.exports=function(t,r){return t&&e(r,o(r),t)}},function(t,r){t.exports=function(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}},function(t,r,n){var e=n(5),o=n(3);t.exports=function(t){return o(t)&&\"[object Arguments]\"==e(t)}},function(t,r){t.exports=function(){return!1}},function(t,r,n){var e=n(5),o=n(22),u=n(3),i={};i[\"[object Float32Array]\"]=i[\"[object Float64Array]\"]=i[\"[object Int8Array]\"]=i[\"[object Int16Array]\"]=i[\"[object Int32Array]\"]=i[\"[object Uint8Array]\"]=i[\"[object Uint8ClampedArray]\"]=i[\"[object Uint16Array]\"]=i[\"[object Uint32Array]\"]=!0,i[\"[object Arguments]\"]=i[\"[object Array]\"]=i[\"[object ArrayBuffer]\"]=i[\"[object Boolean]\"]=i[\"[object DataView]\"]=i[\"[object Date]\"]=i[\"[object Error]\"]=i[\"[object Function]\"]=i[\"[object Map]\"]=i[\"[object Number]\"]=i[\"[object Object]\"]=i[\"[object RegExp]\"]=i[\"[object Set]\"]=i[\"[object String]\"]=i[\"[object WeakMap]\"]=!1,t.exports=function(t){return u(t)&&o(t.length)&&!!i[e(t)]}},function(t,r,n){var e=n(25),o=n(100),u=Object.prototype.hasOwnProperty;t.exports=function(t){if(!e(t))return o(t);var r=[];for(var n in Object(t))u.call(t,n)&&\"constructor\"!=n&&r.push(n);return r}},function(t,r,n){var e=n(39)(Object.keys,Object);t.exports=e},function(t,r,n){var e=n(12),o=n(40);t.exports=function(t,r){return t&&e(r,o(r),t)}},function(t,r,n){var e=n(4),o=n(25),u=n(103),i=Object.prototype.hasOwnProperty;t.exports=function(t){if(!e(t))return u(t);var r=o(t),n=[];for(var c in t)(\"constructor\"!=c||!r&&i.call(t,c))&&n.push(c);return n}},function(t,r){t.exports=function(t){var r=[];if(null!=t)for(var n in Object(t))r.push(n);return r}},function(t,r,n){(function(t){var e=n(1),o=r&&!r.nodeType&&r,u=o&&\"object\"==typeof t&&t&&!t.nodeType&&t,i=u&&u.exports===o?e.Buffer:void 0,c=i?i.allocUnsafe:void 0;t.exports=function(t,r){if(r)return t.slice();var n=t.length,e=c?c(n):new t.constructor(n);return t.copy(e),e}}).call(this,n(13)(t))},function(t,r){t.exports=function(t,r){var n=-1,e=t.length;for(r||(r=Array(e));++n<e;)r[n]=t[n];return r}},function(t,r,n){var e=n(12),o=n(26);t.exports=function(t,r){return e(t,o(t),r)}},function(t,r,n){var e=n(12),o=n(43);t.exports=function(t,r){return e(t,o(t),r)}},function(t,r,n){var e=n(47),o=n(43),u=n(40);t.exports=function(t){return e(t,u,o)}},function(t,r,n){var e=n(2)(n(1),\"DataView\");t.exports=e},function(t,r,n){var e=n(2)(n(1),\"Promise\");t.exports=e},function(t,r,n){var e=n(2)(n(1),\"Set\");t.exports=e},function(t,r,n){var e=n(2)(n(1),\"WeakMap\");t.exports=e},function(t,r){var n=Object.prototype.hasOwnProperty;t.exports=function(t){var r=t.length,e=new t.constructor(r);return r&&\"string\"==typeof t[0]&&n.call(t,\"index\")&&(e.index=t.index,e.input=t.input),e}},function(t,r,n){var e=n(27),o=n(115),u=n(116),i=n(117),c=n(118);t.exports=function(t,r,n){var a=t.constructor;switch(r){case\"[object ArrayBuffer]\":return e(t);case\"[object Boolean]\":case\"[object Date]\":return new a(+t);case\"[object DataView]\":return o(t,n);case\"[object Float32Array]\":case\"[object Float64Array]\":case\"[object Int8Array]\":case\"[object Int16Array]\":case\"[object Int32Array]\":case\"[object Uint8Array]\":case\"[object Uint8ClampedArray]\":case\"[object Uint16Array]\":case\"[object Uint32Array]\":return c(t,n);case\"[object Map]\":return new a;case\"[object Number]\":case\"[object String]\":return new a(t);case\"[object RegExp]\":return u(t);case\"[object Set]\":return new a;case\"[object Symbol]\":return i(t)}}},function(t,r,n){var e=n(27);t.exports=function(t,r){var n=r?e(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}},function(t,r){var n=/\\w*$/;t.exports=function(t){var r=new t.constructor(t.source,n.exec(t));return r.lastIndex=t.lastIndex,r}},function(t,r,n){var e=n(6),o=e?e.prototype:void 0,u=o?o.valueOf:void 0;t.exports=function(t){return u?Object(u.call(t)):{}}},function(t,r,n){var e=n(27);t.exports=function(t,r){var n=r?e(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}},function(t,r,n){var e=n(120),o=n(45),u=n(25);t.exports=function(t){return\"function\"!=typeof t.constructor||u(t)?{}:e(o(t))}},function(t,r,n){var e=n(4),o=Object.create,u=function(){function t(){}return function(r){if(!e(r))return{};if(o)return o(r);t.prototype=r;var n=new t;return t.prototype=void 0,n}}();t.exports=u},function(t,r,n){var e=n(122),o=n(23),u=n(24),i=u&&u.isMap,c=i?o(i):e;t.exports=c},function(t,r,n){var e=n(15),o=n(3);t.exports=function(t){return o(t)&&\"[object Map]\"==e(t)}},function(t,r,n){var e=n(124),o=n(23),u=n(24),i=u&&u.isSet,c=i?o(i):e;t.exports=c},function(t,r,n){var e=n(15),o=n(3);t.exports=function(t){return o(t)&&\"[object Set]\"==e(t)}},function(t,r,n){var e=n(50);t.exports=function(t,r){var n=[];return e(t,(function(t,e,o){r(t,e,o)&&n.push(t)})),n}},function(t,r,n){var e=n(127),o=n(7);t.exports=function(t,r){return t&&e(t,r,o)}},function(t,r,n){var e=n(128)();t.exports=e},function(t,r){t.exports=function(t){return function(r,n,e){for(var o=-1,u=Object(r),i=e(r),c=i.length;c--;){var a=i[t?c:++o];if(!1===n(u[a],a,u))break}return r}}},function(t,r,n){var e=n(14);t.exports=function(t,r){return function(n,o){if(null==n)return n;if(!e(n))return t(n,o);for(var u=n.length,i=r?u:-1,c=Object(n);(r?i--:++i<u)&&!1!==o(c[i],i,c););return n}}},function(t,r,n){var e=n(131),o=n(142),u=n(55);t.exports=function(t){var r=o(t);return 1==r.length&&r[0][2]?u(r[0][0],r[0][1]):function(n){return n===t||e(n,t,r)}}},function(t,r,n){var e=n(17),o=n(52);t.exports=function(t,r,n,u){var i=n.length,c=i,a=!u;if(null==t)return!c;for(t=Object(t);i--;){var s=n[i];if(a&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<c;){var f=(s=n[i])[0],p=t[f],l=s[1];if(a&&s[2]){if(void 0===p&&!(f in t))return!1}else{var v=new e;if(u)var b=u(p,l,f,t,r,v);if(!(void 0===b?o(l,p,3,u,v):b))return!1}}return!0}},function(t,r,n){var e=n(17),o=n(53),u=n(138),i=n(141),c=n(15),a=n(0),s=n(21),f=n(38),p=\"[object Object]\",l=Object.prototype.hasOwnProperty;t.exports=function(t,r,n,v,b,h){var y=a(t),x=a(r),d=y?\"[object Array]\":c(t),j=x?\"[object Array]\":c(r),_=(d=\"[object Arguments]\"==d?p:d)==p,g=(j=\"[object Arguments]\"==j?p:j)==p,m=d==j;if(m&&s(t)){if(!s(r))return!1;y=!0,_=!1}if(m&&!_)return h||(h=new e),y||f(t)?o(t,r,n,v,b,h):u(t,r,d,n,v,b,h);if(!(1&n)){var O=_&&l.call(t,\"__wrapped__\"),w=g&&l.call(r,\"__wrapped__\");if(O||w){var F=O?t.value():t,A=w?r.value():r;return h||(h=new e),b(F,A,n,v,h)}}return!!m&&(h||(h=new e),i(t,r,n,v,b,h))}},function(t,r,n){var e=n(20),o=n(134),u=n(135);function i(t){var r=-1,n=null==t?0:t.length;for(this.__data__=new e;++r<n;)this.add(t[r])}i.prototype.add=i.prototype.push=o,i.prototype.has=u,t.exports=i},function(t,r){t.exports=function(t){return this.__data__.set(t,\"__lodash_hash_undefined__\"),this}},function(t,r){t.exports=function(t){return this.__data__.has(t)}},function(t,r){t.exports=function(t,r){for(var n=-1,e=null==t?0:t.length;++n<e;)if(r(t[n],n,t))return!0;return!1}},function(t,r){t.exports=function(t,r){return t.has(r)}},function(t,r,n){var e=n(6),o=n(48),u=n(18),i=n(53),c=n(139),a=n(140),s=e?e.prototype:void 0,f=s?s.valueOf:void 0;t.exports=function(t,r,n,e,s,p,l){switch(n){case\"[object DataView]\":if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return!1;t=t.buffer,r=r.buffer;case\"[object ArrayBuffer]\":return!(t.byteLength!=r.byteLength||!p(new o(t),new o(r)));case\"[object Boolean]\":case\"[object Date]\":case\"[object Number]\":return u(+t,+r);case\"[object Error]\":return t.name==r.name&&t.message==r.message;case\"[object RegExp]\":case\"[object String]\":return t==r+\"\";case\"[object Map]\":var v=c;case\"[object Set]\":var b=1&e;if(v||(v=a),t.size!=r.size&&!b)return!1;var h=l.get(t);if(h)return h==r;e|=2,l.set(t,r);var y=i(v(t),v(r),e,s,p,l);return l.delete(t),y;case\"[object Symbol]\":if(f)return f.call(t)==f.call(r)}return!1}},function(t,r){t.exports=function(t){var r=-1,n=Array(t.size);return t.forEach((function(t,e){n[++r]=[e,t]})),n}},function(t,r){t.exports=function(t){var r=-1,n=Array(t.size);return t.forEach((function(t){n[++r]=t})),n}},function(t,r,n){var e=n(46),o=Object.prototype.hasOwnProperty;t.exports=function(t,r,n,u,i,c){var a=1&n,s=e(t),f=s.length;if(f!=e(r).length&&!a)return!1;for(var p=f;p--;){var l=s[p];if(!(a?l in r:o.call(r,l)))return!1}var v=c.get(t);if(v&&c.get(r))return v==r;var b=!0;c.set(t,r),c.set(r,t);for(var h=a;++p<f;){var y=t[l=s[p]],x=r[l];if(u)var d=a?u(x,y,l,r,t,c):u(y,x,l,t,r,c);if(!(void 0===d?y===x||i(y,x,n,u,c):d)){b=!1;break}h||(h=\"constructor\"==l)}if(b&&!h){var j=t.constructor,_=r.constructor;j==_||!(\"constructor\"in t)||!(\"constructor\"in r)||\"function\"==typeof j&&j instanceof j&&\"function\"==typeof _&&_ instanceof _||(b=!1)}return c.delete(t),c.delete(r),b}},function(t,r,n){var e=n(54),o=n(7);t.exports=function(t){for(var r=o(t),n=r.length;n--;){var u=r[n],i=t[u];r[n]=[u,i,e(i)]}return r}},function(t,r,n){var e=n(52),o=n(144),u=n(150),i=n(28),c=n(54),a=n(55),s=n(16);t.exports=function(t,r){return i(t)&&c(r)?a(s(t),r):function(n){var i=o(n,t);return void 0===i&&i===r?u(n,t):e(r,i,3)}}},function(t,r,n){var e=n(56);t.exports=function(t,r,n){var o=null==t?void 0:e(t,r);return void 0===o?n:o}},function(t,r,n){var e=n(146),o=/[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g,u=/\\\\(\\\\)?/g,i=e((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(\"\"),t.replace(o,(function(t,n,e,o){r.push(e?o.replace(u,\"$1\"):n||t)})),r}));t.exports=i},function(t,r,n){var e=n(147);t.exports=function(t){var r=e(t,(function(t){return 500===n.size&&n.clear(),t})),n=r.cache;return r}},function(t,r,n){var e=n(20);function o(t,r){if(\"function\"!=typeof t||null!=r&&\"function\"!=typeof r)throw new TypeError(\"Expected a function\");var n=function(){var e=arguments,o=r?r.apply(this,e):e[0],u=n.cache;if(u.has(o))return u.get(o);var i=t.apply(this,e);return n.cache=u.set(o,i)||u,i};return n.cache=new(o.Cache||e),n}o.Cache=e,t.exports=o},function(t,r,n){var e=n(149);t.exports=function(t){return null==t?\"\":e(t)}},function(t,r,n){var e=n(6),o=n(58),u=n(0),i=n(29),c=e?e.prototype:void 0,a=c?c.toString:void 0;t.exports=function t(r){if(\"string\"==typeof r)return r;if(u(r))return o(r,t)+\"\";if(i(r))return a?a.call(r):\"\";var n=r+\"\";return\"0\"==n&&1/r==-1/0?\"-0\":n}},function(t,r,n){var e=n(151),o=n(152);t.exports=function(t,r){return null!=t&&o(t,r,e)}},function(t,r){t.exports=function(t,r){return null!=t&&r in Object(t)}},function(t,r,n){var e=n(57),o=n(36),u=n(0),i=n(37),c=n(22),a=n(16);t.exports=function(t,r,n){for(var s=-1,f=(r=e(r,t)).length,p=!1;++s<f;){var l=a(r[s]);if(!(p=null!=t&&n(t,l)))break;t=t[l]}return p||++s!=f?p:!!(f=null==t?0:t.length)&&c(f)&&i(l,f)&&(u(t)||o(t))}},function(t,r){t.exports=function(t){return t}},function(t,r,n){var e=n(155),o=n(156),u=n(28),i=n(16);t.exports=function(t){return u(t)?e(i(t)):o(t)}},function(t,r){t.exports=function(t){return function(r){return null==r?void 0:r[t]}}},function(t,r,n){var e=n(56);t.exports=function(t){return function(r){return e(r,t)}}},function(t,r,n){var e=n(58),o=n(51),u=n(158),i=n(0);t.exports=function(t,r){return(i(t)?e:u)(t,o(r,3))}},function(t,r,n){var e=n(50),o=n(14);t.exports=function(t,r){var n=-1,u=o(t)?Array(t.length):[];return e(t,(function(t,e,o){u[++n]=r(t,e,o)})),u}},function(t,r){t.exports=class{constructor(t,r,n,e){this._content=t,this._isHidden=r,this._isSignature=n,this._isQuoted=e}getContent(){return this._content}isHidden(){return this._isHidden}isSignature(){return this._isSignature}isQuoted(){return this._isQuoted}isEmpty(){return 0===this.getContent().replace(\"\\n\",\"\").length}}},function(t,r){var n=Array.prototype.reverse;t.exports=function(t){return null==t?t:n.call(t)}},function(t,r,n){(function(t){var e;/*! https://mths.be/esrever v0.2.0 by @mathias */!function(o){var u=r,i=(t&&t.exports,\"object\"==typeof global&&global);i.global!==i&&i.window;var c=/([\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])([\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F]+)/g,a=/([\\uD800-\\uDBFF])([\\uDC00-\\uDFFF])/g,s=function(t){for(var r=\"\",n=(t=t.replace(c,(function(t,r,n){return s(n)+r})).replace(a,\"$2$1\")).length;n--;)r+=t.charAt(n);return r},f={version:\"0.2.0\",reverse:s};void 0===(e=function(){return f}.call(r,n,r,t))||(t.exports=e)}()}).call(this,n(13)(t))}]);\n\nfunction extractReplyContent(message) {\n const email = EmailParser(message);\n const reply = (email.getFragments()[0].getContent().trim());\n return reply;\n}\n\nfor (const item of $input.all()) {\n item.json.reply = extractReplyContent(item.json.text);\n}\n\nreturn $input.all();"
            },
            "typeVersion": 1
      },
      {
            "id": "4f6998f6-88a8-4b8b-acea-33c3f33d04dd",
            "name": "If spreadsheet doesn't exist",
            "type": "n8n-nodes-base.if",
            "position": [
                  1420,
                  2500
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json[\"error\"] }}",
                                    "value2": "The resource you are requesting could not be found"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f3564023-a1c5-42f5-923d-a8e98c95c284",
            "name": "Successfully created or updated row",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1660,
                  2640
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "55869b16-3a98-4127-83ec-bcfdf21c2daf",
            "name": "Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  980,
                  2140
            ],
            "parameters": {
                  "width": 778.177339901478,
                  "height": 289.16256157635416,
                  "content": "### Create spreadsheet and populate with headers and deal information\nA spreadsheet is created if the spreadsheet does not exist. The spreadsheet ID is stored in the `$getWorkflowStaticData('global')` variable. Using `Extract current deal` node, the deal information is formatted for the sending to the new spreadsheet."
            },
            "typeVersion": 1
      },
      {
            "id": "8994f1e7-dd0d-4247-89fd-befcc9c511b0",
            "name": "Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1220,
                  2680
            ],
            "parameters": {
                  "width": 301.18226600985224,
                  "height": 114.67980295566498,
                  "content": "### Tip: Deleting old spreadsheets\nIf you ever want to start over, delete the old spreadsheet, __making sure that it is also deleted from Google Drive's trash__."
            },
            "typeVersion": 1
      },
      {
            "id": "cd8c9657-3380-4e25-907e-baa1c02c0793",
            "name": "Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  400,
                  2140
            ],
            "parameters": {
                  "width": 260.3940886699507,
                  "height": 333.34975369458095,
                  "content": "### `Get spreadsheet ID`\n\n\n\n\n\n\n\n\n\n\n\n\n\nThe spreadsheet ID is stored in this workflow's static data. If you want to refresh the static data you will need to copy this entire workflow into a new workflow."
            },
            "typeVersion": 1
      },
      {
            "id": "ab0348c2-f688-42d3-815b-63290e95baad",
            "name": "Create spreadsheet",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  1020,
                  2260
            ],
            "parameters": {
                  "title": "={{ $(\"Configure\").first().json[\"spreadsheetName\"] }}",
                  "options": {},
                  "resource": "spreadsheet",
                  "sheetsUi": {
                        "sheetValues": [
                              {
                                    "title": "={{ $(\"Configure\").first().json[\"worksheetName\"] }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "7",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "c56522b2-5eca-497d-afbb-d713abd8d810",
            "name": "Store spreadsheet ID",
            "type": "n8n-nodes-base.code",
            "position": [
                  1220,
                  2260
            ],
            "parameters": {
                  "jsCode": "const staticData = $getWorkflowStaticData('global');\n\nstaticData.googleSheetsSpreadsheetId = $('Create spreadsheet').first().json.spreadsheetId\nstaticData.googleSheetsWorksheetId = $('Create spreadsheet').first().json.sheets[0].properties.sheetId\n\nreturn {\n \"spreadsheetId\": staticData.googleSheetsSpreadsheetId,\n \"worksheetId\": staticData.googleSheetsWorksheetId\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "ba62fd4d-912b-4b37-9fda-2f80cdeb65f8",
            "name": "Paste data",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  1620,
                  2260
            ],
            "parameters": {
                  "options": {
                        "cellFormat": "RAW"
                  },
                  "dataMode": "autoMapInputData",
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $node[\"Store spreadsheet ID\"].json[\"worksheetId\"] }}"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $node[\"Store spreadsheet ID\"].json[\"spreadsheetId\"] }}"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "7",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "a8be831a-f2be-48c9-a661-bc8c5cde6444",
            "name": "If no sheet IDs",
            "type": "n8n-nodes-base.if",
            "position": [
                  800,
                  2380
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json[\"spreadsheetId\"] }}",
                                    "operation": "isEmpty"
                              },
                              {
                                    "value1": "={{ $json[\"worksheetId\"] }}",
                                    "operation": "isEmpty"
                              }
                        ]
                  },
                  "combineOperation": "any"
            },
            "typeVersion": 1
      },
      {
            "id": "efdb343d-f5bf-4ba4-bc27-850b9e7935ac",
            "name": "Create or update rows",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  1220,
                  2500
            ],
            "parameters": {
                  "options": {
                        "cellFormat": "RAW"
                  },
                  "dataMode": "autoMapInputData",
                  "operation": "appendOrUpdate",
                  "sheetName": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $node[\"If no sheet IDs\"].json[\"worksheetId\"] }}"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $node[\"If no sheet IDs\"].json[\"spreadsheetId\"] }}"
                  },
                  "columnToMatchOn": "ID"
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "7",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 3,
            "continueOnFail": true
      },
      {
            "id": "091ad4fa-21aa-42e0-abc5-17221cdf8fb7",
            "name": "Get data from `Format data`",
            "type": "n8n-nodes-base.code",
            "position": [
                  1020,
                  2500
            ],
            "parameters": {
                  "jsCode": "return $('Format data').all()"
            },
            "typeVersion": 1
      },
      {
            "id": "97071540-59b2-48dd-8f88-ab44446832fc",
            "name": "Get data from `Format data` node",
            "type": "n8n-nodes-base.code",
            "position": [
                  1420,
                  2260
            ],
            "parameters": {
                  "jsCode": "return $('Format data').all()"
            },
            "typeVersion": 1
      },
      {
            "id": "ecf03802-51c8-43b1-84d8-5ed5826fd444",
            "name": "Format data",
            "type": "n8n-nodes-base.set",
            "position": [
                  -40,
                  2380
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "ID",
                                    "value": "={{ $node[\"Generate UUID\"].json.uuid }}"
                              },
                              {
                                    "name": "Initial message",
                                    "value": "={{ $node[\"Extract message content (advanced)\"].json.reply }}"
                              },
                              {
                                    "name": "Generated reply",
                                    "value": "={{ $node[\"Generate reply\"].json.text }}"
                              },
                              {
                                    "name": "Good response?"
                              }
                        ]
                  },
                  "options": {},
                  "keepOnlySet": true
            },
            "typeVersion": 1
      },
      {
            "id": "9eedd7b7-ec4e-4dbf-a257-33e73bdff9c1",
            "name": "Send email reply",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -40,
                  1860
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "8e2f4a3b-d224-4248-9682-184a646e022f",
            "name": "On feedback given",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -2460,
                  2940
            ],
            "webhookId": "e2aa55fb-618a-4478-805d-d6da46b908d1",
            "parameters": {
                  "path": "e2aa55fb-618a-4478-805d-d6da46b908d1",
                  "options": {},
                  "responseMode": "responseNode"
            },
            "typeVersion": 1
      },
      {
            "id": "87506e44-21aa-4f08-82f9-f47a24ddb9ce",
            "name": "Send feedback for fine-tuned data",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  -100,
                  2980
            ],
            "parameters": {
                  "options": {},
                  "fieldsUi": {
                        "values": [
                              {
                                    "column": "Good response?",
                                    "fieldValue": "={{ $node[\"On feedback given\"].json.query.feedback }}"
                              }
                        ]
                  },
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $json[\"worksheetId\"] }}"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $json[\"spreadsheetId\"] }}"
                  },
                  "valueToMatchOn": "={{ $node[\"On feedback given\"].json.query.id }}",
                  "columnToMatchOn": "ID"
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "7",
                        "name": "[UPDATE ME]"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "d2a720d4-8487-4dfa-bdb8-6b59368e44bc",
            "name": "Show HTML page",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  -920,
                  2980
            ],
            "parameters": {
                  "options": {
                        "responseCode": 200
                  },
                  "respondWith": "text",
                  "responseBody": "={{ $json.html }}"
            },
            "typeVersion": 1
      },
      {
            "id": "2da7a7b1-e96d-4759-b3cb-13558e2ad1d4",
            "name": "Get sheet IDs #1",
            "type": "n8n-nodes-base.code",
            "position": [
                  480,
                  2200
            ],
            "parameters": {
                  "jsCode": "const staticData = $getWorkflowStaticData('global');\n\nreturn {\n \"spreadsheetId\": staticData.googleSheetsSpreadsheetId,\n \"worksheetId\": staticData.googleSheetsWorksheetId\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "08ddeed5-fefe-4acd-918a-00d1fd5a5392",
            "name": "Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -480,
                  2780
            ],
            "parameters": {
                  "width": 260.3940886699507,
                  "height": 333.34975369458095,
                  "content": "### `Get spreadsheet ID`\n\n\n\n\n\n\n\n\n\n\n\n\n\nThe spreadsheet ID is stored in this workflow's static data. If you want to refresh the static data you will need to copy this entire workflow into a new workflow."
            },
            "typeVersion": 1
      },
      {
            "id": "49d77f89-3c1e-4e86-93e8-ae7a566802b7",
            "name": "If no spreadsheet in configuration #2",
            "type": "n8n-nodes-base.if",
            "position": [
                  -700,
                  2980
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $('Configure').first().json.spreadsheetId }}",
                                    "operation": "isEmpty"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e3b8f696-41eb-46e1-a4b1-6ba2d219aa45",
            "name": "Store specific sheet IDs #2",
            "type": "n8n-nodes-base.code",
            "position": [
                  -400,
                  3180
            ],
            "parameters": {
                  "jsCode": "const staticData = $getWorkflowStaticData('global');\n\nstaticData.googleSheetsSpreadsheetId = $('Configure').all()[0].json.spreadsheetId\nstaticData.googleSheetsWorksheetId = $('Configure').all()[0].json.worksheetId\n\nreturn {\n \"spreadsheetId\": staticData.googleSheetsSpreadsheetId,\n \"worksheetId\": staticData.googleSheetsWorksheetId\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "44d37f76-af16-4507-b1a1-76fadf530806",
            "name": "Get sheet IDs #2",
            "type": "n8n-nodes-base.code",
            "position": [
                  -400,
                  2840
            ],
            "parameters": {
                  "jsCode": "const staticData = $getWorkflowStaticData('global');\n\nreturn {\n \"spreadsheetId\": staticData.googleSheetsSpreadsheetId,\n \"worksheetId\": staticData.googleSheetsWorksheetId\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "fae8cbc5-7462-4eb0-9f60-85e8e7cfd10e",
            "name": "If no spreadsheet in configuration #1",
            "type": "n8n-nodes-base.if",
            "position": [
                  180,
                  2380
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $('Configure').first().json.spreadsheetId }}",
                                    "operation": "isEmpty"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "67312347-74c0-4ce4-a78c-615da6937bcf",
            "name": "Store specific sheet IDs #1",
            "type": "n8n-nodes-base.code",
            "position": [
                  480,
                  2540
            ],
            "parameters": {
                  "jsCode": "const staticData = $getWorkflowStaticData('global');\n\nstaticData.googleSheetsSpreadsheetId = $('Configure').all()[0].json.spreadsheetId\nstaticData.googleSheetsWorksheetId = $('Configure').all()[0].json.worksheetId\n\nreturn {\n \"spreadsheetId\": staticData.googleSheetsSpreadsheetId,\n \"worksheetId\": staticData.googleSheetsWorksheetId\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "400eae76-7b17-48de-a49f-8b0cbc9db1f8",
            "name": "Email template",
            "type": "n8n-nodes-base.html",
            "position": [
                  160,
                  1860
            ],
            "parameters": {
                  "html": "<html>\n <head>\n <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n <title>Template for ChatGPT email</title>\n <style>\n /* cspell:disable-file */\n /* webkit printing magic: print all background colors */\n html {\n -webkit-print-color-adjust: exact;\n }\n * {\n box-sizing: border-box;\n -webkit-print-color-adjust: exact;\n }\n\n html,\n body {\n margin: 0;\n padding: 0;\n }\n @media only screen {\n body {\n margin: 2em auto;\n max-width: 900px;\n color: rgb(55, 53, 47);\n }\n }\n\n body {\n line-height: 1.5;\n white-space: pre-wrap;\n }\n\n a,\n a.visited {\n color: inherit;\n text-decoration: underline;\n }\n\n .pdf-relative-link-path {\n font-size: 80%;\n color: #444;\n }\n\n h1,\n h2,\n h3 {\n letter-spacing: -0.01em;\n line-height: 1.2;\n font-weight: 600;\n margin-bottom: 0;\n }\n\n .page-title {\n font-size: 2.5rem;\n font-weight: 700;\n margin-top: 0;\n margin-bottom: 0.75em;\n }\n\n h1 {\n font-size: 1.875rem;\n margin-top: 1.875rem;\n }\n\n h2 {\n font-size: 1.5rem;\n margin-top: 1.5rem;\n }\n\n h3 {\n font-size: 1.25rem;\n margin-top: 1.25rem;\n }\n\n .source {\n border: 1px solid #ddd;\n border-radius: 3px;\n padding: 1.5em;\n word-break: break-all;\n }\n\n .callout {\n border-radius: 3px;\n padding: 1rem;\n }\n\n figure {\n margin: 1.25em 0;\n page-break-inside: avoid;\n }\n\n figcaption {\n opacity: 0.5;\n font-size: 85%;\n margin-top: 0.5em;\n }\n\n mark {\n background-color: transparent;\n }\n\n .indented {\n padding-left: 1.5em;\n }\n\n hr {\n background: transparent;\n display: block;\n width: 100%;\n height: 1px;\n visibility: visible;\n border: none;\n border-bottom: 1px solid rgba(55, 53, 47, 0.09);\n }\n\n img {\n max-width: 100%;\n }\n\n @media only print {\n img {\n max-height: 100vh;\n object-fit: contain;\n }\n }\n\n @page {\n margin: 1in;\n }\n\n .collection-content {\n font-size: 0.875rem;\n }\n\n .column-list {\n display: flex;\n justify-content: space-between;\n }\n\n .column {\n padding: 0 1em;\n }\n\n .column:first-child {\n padding-left: 0;\n }\n\n .column:last-child {\n padding-right: 0;\n }\n\n .table_of_contents-item {\n display: block;\n font-size: 0.875rem;\n line-height: 1.3;\n padding: 0.125rem;\n }\n\n .table_of_contents-indent-1 {\n margin-left: 1.5rem;\n }\n\n .table_of_contents-indent-2 {\n margin-left: 3rem;\n }\n\n .table_of_contents-indent-3 {\n margin-left: 4.5rem;\n }\n\n .table_of_contents-link {\n text-decoration: none;\n opacity: 0.7;\n border-bottom: 1px solid rgba(55, 53, 47, 0.18);\n }\n\n table,\n th,\n td {\n border: 1px solid rgba(55, 53, 47, 0.09);\n border-collapse: collapse;\n }\n\n table {\n border-left: none;\n border-right: none;\n }\n\n th,\n td {\n font-weight: normal;\n padding: 0.25em 0.5em;\n line-height: 1.5;\n min-height: 1.5em;\n text-align: left;\n }\n\n th {\n color: rgba(55, 53, 47, 0.6);\n }\n\n ol,\n ul {\n margin: 0;\n margin-block-start: 0.6em;\n margin-block-end: 0.6em;\n }\n\n li > ol:first-child,\n li > ul:first-child {\n margin-block-start: 0.6em;\n }\n\n ul > li {\n list-style: disc;\n }\n\n ul.to-do-list {\n text-indent: -1.7em;\n }\n\n ul.to-do-list > li {\n list-style: none;\n }\n\n .to-do-children-checked {\n text-decoration: line-through;\n opacity: 0.375;\n }\n\n ul.toggle > li {\n list-style: none;\n }\n\n ul {\n padding-inline-start: 1.7em;\n }\n\n ul > li {\n padding-left: 0.1em;\n }\n\n ol {\n padding-inline-start: 1.6em;\n }\n\n ol > li {\n padding-left: 0.2em;\n }\n\n .mono ol {\n padding-inline-start: 2em;\n }\n\n .mono ol > li {\n text-indent: -0.4em;\n }\n\n .toggle {\n padding-inline-start: 0em;\n list-style-type: none;\n }\n\n /* Indent toggle children */\n .toggle > li > details {\n padding-left: 1.7em;\n }\n\n .toggle > li > details > summary {\n margin-left: -1.1em;\n }\n\n .selected-value {\n display: inline-block;\n padding: 0 0.5em;\n background: rgba(206, 205, 202, 0.5);\n border-radius: 3px;\n margin-right: 0.5em;\n margin-top: 0.3em;\n margin-bottom: 0.3em;\n white-space: nowrap;\n }\n\n .collection-title {\n display: inline-block;\n margin-right: 1em;\n }\n\n .simple-table {\n margin-top: 1em;\n font-size: 0.875rem;\n empty-cells: show;\n }\n .simple-table td {\n height: 29px;\n min-width: 120px;\n }\n\n .simple-table th {\n height: 29px;\n min-width: 120px;\n }\n\n .simple-table-header-color {\n background: rgb(247, 246, 243);\n color: black;\n }\n .simple-table-header {\n font-weight: 500;\n }\n\n time {\n opacity: 0.5;\n }\n\n .icon {\n display: inline-block;\n max-width: 1.2em;\n max-height: 1.2em;\n text-decoration: none;\n vertical-align: text-bottom;\n margin-right: 0.5em;\n }\n\n img.icon {\n border-radius: 3px;\n }\n\n .user-icon {\n width: 1.5em;\n height: 1.5em;\n border-radius: 100%;\n margin-right: 0.5rem;\n }\n\n .user-icon-inner {\n font-size: 0.8em;\n }\n\n .text-icon {\n border: 1px solid #000;\n text-align: center;\n }\n\n .page-cover-image {\n display: block;\n object-fit: cover;\n width: 100%;\n max-height: 30vh;\n }\n\n .page-header-icon {\n font-size: 3rem;\n margin-bottom: 1rem;\n }\n\n .page-header-icon-with-cover {\n margin-top: -0.72em;\n margin-left: 0.07em;\n }\n\n .page-header-icon img {\n border-radius: 3px;\n }\n\n .link-to-page {\n margin: 1em 0;\n padding: 0;\n border: none;\n font-weight: 500;\n }\n\n p > .user {\n opacity: 0.5;\n }\n\n td > .user,\n td > time {\n white-space: nowrap;\n }\n\n input[type=\"checkbox\"] {\n transform: scale(1.5);\n margin-right: 0.6em;\n vertical-align: middle;\n }\n\n p {\n margin-top: 0.5em;\n margin-bottom: 0.5em;\n }\n\n .image {\n border: none;\n margin: 1.5em 0;\n padding: 0;\n border-radius: 0;\n text-align: center;\n }\n\n .code,\n code {\n background: rgba(135, 131, 120, 0.15);\n border-radius: 3px;\n padding: 0.2em 0.4em;\n border-radius: 3px;\n font-size: 85%;\n tab-size: 2;\n }\n\n code {\n color: #eb5757;\n }\n\n .code {\n padding: 1.5em 1em;\n }\n\n .code-wrap {\n white-space: pre-wrap;\n word-break: break-all;\n }\n\n .code > code {\n background: none;\n padding: 0;\n font-size: 100%;\n color: inherit;\n }\n\n blockquote {\n font-size: 1.25em;\n margin: 1em 0;\n padding-left: 1em;\n border-left: 3px solid rgb(55, 53, 47);\n }\n\n .bookmark {\n text-decoration: none;\n max-height: 8em;\n padding: 0;\n display: flex;\n width: 100%;\n align-items: stretch;\n }\n\n .bookmark-title {\n font-size: 0.85em;\n overflow: hidden;\n text-overflow: ellipsis;\n height: 1.75em;\n white-space: nowrap;\n }\n\n .bookmark-text {\n display: flex;\n flex-direction: column;\n }\n\n .bookmark-info {\n flex: 4 1 180px;\n padding: 12px 14px 14px;\n display: flex;\n flex-direction: column;\n justify-content: space-between;\n }\n\n .bookmark-image {\n width: 33%;\n flex: 1 1 180px;\n display: block;\n position: relative;\n object-fit: cover;\n border-radius: 1px;\n }\n\n .bookmark-description {\n color: rgba(55, 53, 47, 0.6);\n font-size: 0.75em;\n overflow: hidden;\n max-height: 4.5em;\n word-break: break-word;\n }\n\n .bookmark-href {\n font-size: 0.75em;\n margin-top: 0.25em;\n }\n\n .sans {\n font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont,\n \"Segoe UI\", Helvetica, \"Apple Color Emoji\", Arial, sans-serif,\n \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n }\n .code {\n font-family: \"SFMono-Regular\", Menlo, Consolas, \"PT Mono\",\n \"Liberation Mono\", Courier, monospace;\n }\n .serif {\n font-family: Lyon-Text, Georgia, ui-serif, serif;\n }\n .mono {\n font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;\n }\n .pdf .sans {\n font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,\n \"Segoe UI\", Helvetica, \"Apple Color Emoji\", Arial, sans-serif,\n \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Twemoji\", \"Noto Color Emoji\",\n \"Noto Sans CJK JP\";\n }\n .pdf:lang(zh-CN) .sans {\n font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,\n \"Segoe UI\", Helvetica, \"Apple Color Emoji\", Arial, sans-serif,\n \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Twemoji\", \"Noto Color Emoji\",\n \"Noto Sans CJK SC\";\n }\n .pdf:lang(zh-TW) .sans {\n font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,\n \"Segoe UI\", Helvetica, \"Apple Color Emoji\", Arial, sans-serif,\n \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Twemoji\", \"Noto Color Emoji\",\n \"Noto Sans CJK TC\";\n }\n .pdf:lang(ko-KR) .sans {\n font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,\n \"Segoe UI\", Helvetica, \"Apple Color Emoji\", Arial, sans-serif,\n \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Twemoji\", \"Noto Color Emoji\",\n \"Noto Sans CJK KR\";\n }\n .pdf .code {\n font-family: Source Code Pro, \"SFMono-Regular\", Menlo, Consolas,\n \"PT Mono\", \"Liberation Mono\", Courier, monospace, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Sans Mono CJK JP\";\n }\n .pdf:lang(zh-CN) .code {\n font-family: Source Code Pro, \"SFMono-Regular\", Menlo, Consolas,\n \"PT Mono\", \"Liberation Mono\", Courier, monospace, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Sans Mono CJK SC\";\n }\n .pdf:lang(zh-TW) .code {\n font-family: Source Code Pro, \"SFMono-Regular\", Menlo, Consolas,\n \"PT Mono\", \"Liberation Mono\", Courier, monospace, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Sans Mono CJK TC\";\n }\n .pdf:lang(ko-KR) .code {\n font-family: Source Code Pro, \"SFMono-Regular\", Menlo, Consolas,\n \"PT Mono\", \"Liberation Mono\", Courier, monospace, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Sans Mono CJK KR\";\n }\n .pdf .serif {\n font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Serif CJK JP\";\n }\n .pdf:lang(zh-CN) .serif {\n font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Serif CJK SC\";\n }\n .pdf:lang(zh-TW) .serif {\n font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Serif CJK TC\";\n }\n .pdf:lang(ko-KR) .serif {\n font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, \"Twemoji\",\n \"Noto Color Emoji\", \"Noto Serif CJK KR\";\n }\n .pdf .mono {\n font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,\n \"Twemoji\", \"Noto Color Emoji\", \"Noto Sans Mono CJK JP\";\n }\n .pdf:lang(zh-CN) .mono {\n font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,\n \"Twemoji\", \"Noto Color Emoji\", \"Noto Sans Mono CJK SC\";\n }\n .pdf:lang(zh-TW) .mono {\n font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,\n \"Twemoji\", \"Noto Color Emoji\", \"Noto Sans Mono CJK TC\";\n }\n .pdf:lang(ko-KR) .mono {\n font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,\n \"Twemoji\", \"Noto Color Emoji\", \"Noto Sans Mono CJK KR\";\n }\n .highlight-default {\n color: rgba(55, 53, 47, 1);\n }\n .highlight-gray {\n color: rgba(120, 119, 116, 1);\n fill: rgba(120, 119, 116, 1);\n }\n .highlight-brown {\n color: rgba(159, 107, 83, 1);\n fill: rgba(159, 107, 83, 1);\n }\n .highlight-orange {\n color: rgba(217, 115, 13, 1);\n fill: rgba(217, 115, 13, 1);\n }\n .highlight-yellow {\n color: rgba(203, 145, 47, 1);\n fill: rgba(203, 145, 47, 1);\n }\n .highlight-teal {\n color: rgba(68, 131, 97, 1);\n fill: rgba(68, 131, 97, 1);\n }\n .highlight-blue {\n color: rgba(51, 126, 169, 1);\n fill: rgba(51, 126, 169, 1);\n }\n .highlight-purple {\n color: rgba(144, 101, 176, 1);\n fill: rgba(144, 101, 176, 1);\n }\n .highlight-pink {\n color: rgba(193, 76, 138, 1);\n fill: rgba(193, 76, 138, 1);\n }\n .highlight-red {\n color: rgba(212, 76, 71, 1);\n fill: rgba(212, 76, 71, 1);\n }\n .highlight-gray_background {\n background: rgba(241, 241, 239, 1);\n }\n .highlight-brown_background {\n background: rgba(244, 238, 238, 1);\n }\n .highlight-orange_background {\n background: rgba(251, 236, 221, 1);\n }\n .highlight-yellow_background {\n background: rgba(251, 243, 219, 1);\n }\n .highlight-teal_background {\n background: rgba(237, 243, 236, 1);\n }\n .highlight-blue_background {\n background: rgba(231, 243, 248, 1);\n }\n .highlight-purple_background {\n background: rgba(244, 240, 247, 0.8);\n }\n .highlight-pink_background {\n background: rgba(249, 238, 243, 0.8);\n }\n .highlight-red_background {\n background: rgba(253, 235, 236, 1);\n }\n .block-color-default {\n color: inherit;\n fill: inherit;\n }\n .block-color-gray {\n color: rgba(120, 119, 116, 1);\n fill: rgba(120, 119, 116, 1);\n }\n .block-color-brown {\n color: rgba(159, 107, 83, 1);\n fill: rgba(159, 107, 83, 1);\n }\n .block-color-orange {\n color: rgba(217, 115, 13, 1);\n fill: rgba(217, 115, 13, 1);\n }\n .block-color-yellow {\n color: rgba(203, 145, 47, 1);\n fill: rgba(203, 145, 47, 1);\n }\n .block-color-teal {\n color: rgba(68, 131, 97, 1);\n fill: rgba(68, 131, 97, 1);\n }\n .block-color-blue {\n color: rgba(51, 126, 169, 1);\n fill: rgba(51, 126, 169, 1);\n }\n .block-color-purple {\n color: rgba(144, 101, 176, 1);\n fill: rgba(144, 101, 176, 1);\n }\n .block-color-pink {\n color: rgba(193, 76, 138, 1);\n fill: rgba(193, 76, 138, 1);\n }\n .block-color-red {\n color: rgba(212, 76, 71, 1);\n fill: rgba(212, 76, 71, 1);\n }\n .block-color-gray_background {\n background: rgba(241, 241, 239, 1);\n }\n .block-color-brown_background {\n background: rgba(244, 238, 238, 1);\n }\n .block-color-orange_background {\n background: rgba(251, 236, 221, 1);\n }\n .block-color-yellow_background {\n background: rgba(251, 243, 219, 1);\n }\n .block-color-teal_background {\n background: rgba(237, 243, 236, 1);\n }\n .block-color-blue_background {\n background: rgba(231, 243, 248, 1);\n }\n .block-color-purple_background {\n background: rgba(244, 240, 247, 0.8);\n }\n .block-color-pink_background {\n background: rgba(249, 238, 243, 0.8);\n }\n .block-color-red_background {\n background: rgba(253, 235, 236, 1);\n }\n .select-value-color-pink {\n background-color: rgba(245, 224, 233, 1);\n }\n .select-value-color-purple {\n background-color: rgba(232, 222, 238, 1);\n }\n .select-value-color-green {\n background-color: rgba(219, 237, 219, 1);\n }\n .select-value-color-gray {\n background-color: rgba(227, 226, 224, 1);\n }\n .select-value-color-opaquegray {\n background-color: rgba(255, 255, 255, 0.0375);\n }\n .select-value-color-orange {\n background-color: rgba(250, 222, 201, 1);\n }\n .select-value-color-brown {\n background-color: rgba(238, 224, 218, 1);\n }\n .select-value-color-red {\n background-color: rgba(255, 226, 221, 1);\n }\n .select-value-color-yellow {\n background-color: rgba(253, 236, 200, 1);\n }\n .select-value-color-blue {\n background-color: rgba(211, 229, 239, 1);\n }\n\n .checkbox {\n display: inline-flex;\n vertical-align: text-bottom;\n width: 16;\n height: 16;\n background-size: 16px;\n margin-left: 2px;\n margin-right: 5px;\n }\n\n .checkbox-on {\n background-image: url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E\");\n }\n\n .checkbox-off {\n background-image: url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E\");\n }\n </style>\n </head>\n <body>\n <article id=\"f2b31a8e-f32a-474c-bf3e-baf4928f6c1c\" class=\"page sans\">\n <div class=\"page-body\">\n <p id=\"937a899c-eec7-4aaa-9ec3-631b13c30fb5\" class=\"\">\n {{ $json.text }}\n </p>\n <hr id=\"fc51a942-226f-4411-b001-b5376a835e0c\" />\n <!--\n Was this message helpful? Yes • No.\n If the user clicks \"Yes\", a webhook will be sent to the URL specified in the \"Yes\" button's \"Webhook URL\" field.\n If the user clicks \"No\", a webhook will be sent to the URL specified in the \"No\" button's \"Webhook URL\" field.\n Include the following in the webhook URL:\n - initial message content\n - reply content\n use links\n -->\n <p id=\"c28c1c98-621b-4169-a7de-90d85d36ca90\" class=\"\">\n Was this message helpful? <a href={{ $env.WEBHOOK_URL + 'webhook/' + $node[\"On feedback given\"].parameter[\"path\"] }}?id={{ $node[\"Generate UUID\"].json.uuid }}&feedback=Yes>Yes</a> <strong>•</strong> <a href={{ $env.WEBHOOK_URL + 'webhook/' + $node[\"On feedback given\"].parameter[\"path\"] }}?id={{ $node[\"Generate UUID\"].json.uuid }}&feedback=No>No</a>\n </p>\n <p id=\"7138639a-e639-4eb8-b80d-3d40bfc5c102\" class=\"\"></p>\n </div>\n </article>\n </body>\n</html>\n"
            },
            "typeVersion": 1
      },
      {
            "id": "38e0f992-a461-4bc1-9f5c-2ceb0e461708",
            "name": "Record feedback",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -1360,
                  2980
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "899a0c63-0333-4dc4-ba83-5615a38ae431",
            "name": "Fallback route",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -1360,
                  3280
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "2fd5b109-8a54-4684-a8a3-3f7b2d961ae3",
            "name": "Identify trigger #2",
            "type": "n8n-nodes-base.set",
            "position": [
                  -2240,
                  2940
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "triggeredFrom",
                                    "value": "webhook"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "8c27f798-d947-432c-bfc9-d22727d0159e",
            "name": "Identify trigger #1",
            "type": "n8n-nodes-base.set",
            "position": [
                  -2240,
                  2680
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "triggeredFrom",
                                    "value": "gmail"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "bd8cc1dd-3643-4d2f-9527-cfd740a4072a",
            "name": "Do not send unfinished email reply",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -40,
                  2060
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "c8b68fdb-c1c0-4f94-b712-e0570a3ad53c",
            "name": "If reply is complete",
            "type": "n8n-nodes-base.if",
            "position": [
                  -260,
                  1960
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json.finish_reason }}",
                                    "value2": "stop"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f9d56d42-aa4e-4394-8c83-8d39164a784e",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -100,
                  2020
            ],
            "parameters": {
                  "width": 225.59802712700315,
                  "height": 314.2786683107279,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nIf your workflow reaches this stage, you will need to consider increasing the tokens in `Generate reply` node."
            },
            "typeVersion": 1
      },
      {
            "id": "039714b3-88ac-4ca8-86fc-ec1c109110c3",
            "name": "Do not send email to this recipient",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -1140,
                  2560
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "330c67dd-e538-414d-a144-e05dbf5effb3",
            "name": "Send reply to database",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -260,
                  2380
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "6e7586db-f437-4450-a1c7-e5ea7e8767b0",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -3060,
                  2520
            ],
            "parameters": {
                  "width": 516.6954377311955,
                  "height": 680.5491163173024,
                  "content": "## Send a ChatGPT email reply when email received and save responses to Google Sheets\nThis workflow sends a OpenAI GPT reply when an email is received from specific email recipients. It then saves the initial email and the GPT response to an automatically generated Google spreadsheet. Subsequent GPT responses will be added to the same spreadsheet. Additionally, when feedback is given for any of the GPT responses, it will be recorded to the spreasheet, which can then be used later to fine-tune the GPT model.\n\n### How it works\nThis workflow is essentially a two-in-one workflow. It triggers off from two different nodes and have very different functionality from each trigger.\n\n**`On email received`**:\n1. Triggers off on the `On email received` node.\n2. Extract the email body from the email.\n3. Generate a response from the email body using the `OpenAI` node.\n4. Reply to the email sender using the `Send reply to recipient` node. A feedback link is also included in the email body which will trigger the `On feedback given` node. This is used to fine-tune the GPT model.\n5. Save the email body and OpenAI response to a Google Sheet. If a sheet does not exist, it will be created.\n\n\n**`On feedback given`**:\n1. Triggers off when a feedback link is clicked in the emailed GPT response.\n2. The feedback, either positive or negative, for that specific GPT response is then recorded to the Google Sheet.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "9d5e780e-4282-4c7e-b083-3f769f7dc740",
            "name": "Determine which trigger ran",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -1660,
                  2800
            ],
            "parameters": {
                  "rules": {
                        "rules": [
                              {
                                    "value2": "gmail"
                              },
                              {
                                    "output": 1,
                                    "value2": "webhook"
                              }
                        ]
                  },
                  "value1": "={{ $json.triggeredFrom }}",
                  "dataType": "string",
                  "fallbackOutput": 3
            },
            "typeVersion": 1
      },
      {
            "id": "2c6c604c-7f59-42cc-9ed2-6d55f342f0ae",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1420,
                  3240
            ],
            "parameters": {
                  "width": 225.59802712700315,
                  "height": 289.61775585696694,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\nThis workflow should never reach this node. It is only here for extending the functionality of this workflow if needed."
            },
            "typeVersion": 1
      },
      {
            "id": "3defbf98-0caa-49b1-9bfd-f4640b43d64b",
            "name": "Is text within token limit?",
            "type": "n8n-nodes-base.if",
            "position": [
                  -700,
                  2360
            ],
            "parameters": {
                  "conditions": {
                        "boolean": [
                              {
                                    "value1": "={{ $json.reply.length() / 4 <= $('Configure').first().json.maxTokenSize - $('Configure').first().json.replyTokenSize }}",
                                    "value2": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b268b8a3-6361-4515-a995-320cd0979688",
            "name": "Do nothing",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  -480,
                  2460
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "413588d1-ede0-4a51-85fa-c9035ec2e605",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -540,
                  2420
            ],
            "parameters": {
                  "width": 225.59802712700315,
                  "height": 288.2949081608216,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nThe email that was received is too large to process, as it exceeds token limit. See more on [token limits](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Configure": {
            "main": [
                  [
                        {
                              "node": "Determine which trigger ran",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format data": {
            "main": [
                  [
                        {
                              "node": "If no spreadsheet in configuration #1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate UUID": {
            "main": [
                  [
                        {
                              "node": "Extract message content (advanced)",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email template": {
            "main": [
                  [
                        {
                              "node": "Send reply to recipient",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate reply": {
            "main": [
                  [
                        {
                              "node": "Send reply to database",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "If reply is complete",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Show HTML page": {
            "main": [
                  [
                        {
                              "node": "If no spreadsheet in configuration #2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If no sheet IDs": {
            "main": [
                  [
                        {
                              "node": "Create spreadsheet",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get data from `Format data`",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Record feedback": {
            "main": [
                  [
                        {
                              "node": "Thanks for your response!",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get sheet IDs #1": {
            "main": [
                  [
                        {
                              "node": "If no sheet IDs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get sheet IDs #2": {
            "main": [
                  [
                        {
                              "node": "Send feedback for fine-tuned data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send email reply": {
            "main": [
                  [
                        {
                              "node": "Email template",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "On email received": {
            "main": [
                  [
                        {
                              "node": "Identify trigger #1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "On feedback given": {
            "main": [
                  [
                        {
                              "node": "Identify trigger #2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create spreadsheet": {
            "main": [
                  [
                        {
                              "node": "Store spreadsheet ID",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Identify trigger #1": {
            "main": [
                  [
                        {
                              "node": "Configure",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Identify trigger #2": {
            "main": [
                  [
                        {
                              "node": "Configure",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If reply is complete": {
            "main": [
                  [
                        {
                              "node": "Send email reply",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Do not send unfinished email reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Store spreadsheet ID": {
            "main": [
                  [
                        {
                              "node": "Get data from `Format data` node",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create or update rows": {
            "main": [
                  [
                        {
                              "node": "If spreadsheet doesn't exist",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send reply to database": {
            "main": [
                  [
                        {
                              "node": "Format data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Thanks for your response!": {
            "main": [
                  [
                        {
                              "node": "Show HTML page",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Determine which trigger ran": {
            "main": [
                  [
                        {
                              "node": "Only continue for specific emails",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Record feedback",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  null,
                  [
                        {
                              "node": "Fallback route",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get data from `Format data`": {
            "main": [
                  [
                        {
                              "node": "Create or update rows",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is text within token limit?": {
            "main": [
                  [
                        {
                              "node": "Generate reply",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Do nothing",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Store specific sheet IDs #1": {
            "main": [
                  [
                        {
                              "node": "If no sheet IDs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Store specific sheet IDs #2": {
            "main": [
                  [
                        {
                              "node": "Send feedback for fine-tuned data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If spreadsheet doesn't exist": {
            "main": [
                  [
                        {
                              "node": "Create spreadsheet",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Successfully created or updated row",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get data from `Format data` node": {
            "main": [
                  [
                        {
                              "node": "Paste data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Only continue for specific emails": {
            "main": [
                  [
                        {
                              "node": "Generate UUID",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Do not send email to this recipient",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract message content (advanced)": {
            "main": [
                  [
                        {
                              "node": "Is text within token limit?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If no spreadsheet in configuration #1": {
            "main": [
                  [
                        {
                              "node": "Get sheet IDs #1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Store specific sheet IDs #1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If no spreadsheet in configuration #2": {
            "main": [
                  [
                        {
                              "node": "Get sheet IDs #2",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Store specific sheet IDs #2",
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
    name: "Send Specific PDF Attachments From Gmail To Google Drive Using OpenAI",
    nodes: [
      {
            "id": "deafa2e8-af41-4f11-92e0-09992f6c6970",
            "name": "Read PDF",
            "type": "n8n-nodes-base.readPDF",
            "position": [
                  860,
                  1420
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "8e3ddbb1-83a1-4f79-9464-61d5a20f0427",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -760,
                  1300
            ],
            "parameters": {
                  "width": 444.034812880766,
                  "height": 599.5274151436035,
                  "content": "## Send specific PDF attachments from Gmail to Google Drive using OpenAI\n\n_**DISCLAIMER**: You may have varying success when using this workflow so be prepared to validate the correctness of OpenAI's results._\n\nThis workflow reads PDF textual content and sends the text to OpenAI. Attachments of interest will then be uploaded to a specified Google Drive folder. For example, you may wish to send invoices received from an email to an inbox folder in Google Drive for later processing. This workflow has been designed to easily change the search term to match your needs. See the workflow for more details.\n\n### How it works\n1. Triggers off on the `On email received` node.\n2. Iterates over the attachments in the email.\n3. Uses the `OpenAI` node to filter out the attachments that do not match the search term set in the `Configure` node. You could match on various PDF files (i.e. invoice, receipt, or contract).\n4. If the PDF attachment matches the search term, the workflow uses the `Google Drive` node to upload the PDF attachment to a specific Google Drive folder.\n\n\nWorkflow written by [David Sha](https://davidsha.me)."
            },
            "typeVersion": 1
      },
      {
            "id": "fb2c3697-a92f-4be1-b9a6-0326f87de70b",
            "name": "Configure",
            "type": "n8n-nodes-base.set",
            "position": [
                  -20,
                  1520
            ],
            "parameters": {
                  "values": {
                        "number": [
                              {
                                    "name": "maxTokenSize",
                                    "value": 4000
                              },
                              {
                                    "name": "replyTokenSize",
                                    "value": 50
                              }
                        ],
                        "string": [
                              {
                                    "name": "Match on",
                                    "value": "payslip"
                              },
                              {
                                    "name": "Google Drive folder to upload matched PDFs",
                                    "value": "https://drive.google.com/drive/u/0/folders/1SKdHTnYoBNlnhF_QJ-Zyepy-3-WZkObo"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "792c49f4-06e3-4d77-a31f-1513f70abf32",
            "name": "Is PDF",
            "type": "n8n-nodes-base.if",
            "position": [
                  640,
                  1520
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $binary.data.fileExtension }}",
                                    "value2": "pdf"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "82be9111-665d-41c6-8190-2247acdb749b",
            "name": "Not a PDF",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  860,
                  1620
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "c2ac155f-38ee-46f2-8a24-5614e3c32ff5",
            "name": "Is matched",
            "type": "n8n-nodes-base.if",
            "position": [
                  1720,
                  1480
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json[\"text\"] }}",
                                    "value2": "true"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4a8f15b8-c153-493d-9a2a-d63d911d642d",
            "name": "This is a matched PDF",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1940,
                  1380
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "89601591-5c7b-461c-859b-25c7c1f0c2e6",
            "name": "This is not a matched PDF",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1940,
                  1580
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "ac517c4a-83b8-441f-b14c-c927c18f8012",
            "name": "Iterate over email attachments",
            "type": "n8n-nodes-base.code",
            "position": [
                  420,
                  1420
            ],
            "parameters": {
                  "jsCode": "// https://community.n8n.io/t/iterating-over-email-attachments/13588/3\nlet results = [];\n\nfor (const item of $input.all()) {\n for (key of Object.keys(item.binary)) {\n results.push({\n json: {},\n binary: {\n data: item.binary[key],\n }\n });\n }\n}\n\nreturn results;"
            },
            "typeVersion": 1
      },
      {
            "id": "79fdf2de-42fe-4ebb-80fb-cc80dcd284f9",
            "name": "OpenAI matches PDF textual content",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  1300,
                  1340
            ],
            "parameters": {
                  "prompt": "=Does this PDF file look like a {{ $(\"Configure\").first().json[\"Match on\"] }}? Return \"true\" if it is a {{ $(\"Configure\").first().json[\"Match on\"] }} and \"false\" if not. Only reply with lowercase letters \"true\" or \"false\".\n\nThis is the PDF filename:\n```\n{{ $binary.data.fileName }}\n```\n\nThis is the PDF text content:\n```\n{{ $json.text }}\n```",
                  "options": {
                        "maxTokens": "={{ $('Configure').first().json.replyTokenSize }}",
                        "temperature": 0.1
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "30",
                        "name": "REPLACE ME"
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": false
      },
      {
            "id": "8bdb3263-40f2-4277-8cc0-f6edef90a1cd",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1500,
                  1480
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {
                        "clashHandling": {
                              "values": {
                                    "resolveClash": "preferInput1"
                              }
                        }
                  },
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2
      },
      {
            "id": "8e68e725-b2df-4c0c-8b17-e0cd4610714d",
            "name": "Upload file to folder",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  2160,
                  1380
            ],
            "parameters": {
                  "name": "={{ $binary.data.fileName }}",
                  "options": {},
                  "parents": [
                        "={{ $('Configure').first().json[\"Google Drive folder to upload matched PDFs\"].split(\"/\").at(-1) }}"
                  ],
                  "binaryData": true
            },
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "32",
                        "name": "REPLACE ME"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "bda00901-5ade-471c-b6f9-a18ef4d71589",
            "name": "On email received",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -240,
                  1520
            ],
            "parameters": {
                  "simple": false,
                  "filters": {},
                  "options": {
                        "downloadAttachments": true,
                        "dataPropertyAttachmentsPrefixName": "attachment_"
                  },
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  }
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "31",
                        "name": "REPLACE ME"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b2ff4774-336b-47a3-af3f-ada809ed9b8a",
            "name": "Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -100,
                  1440
            ],
            "parameters": {
                  "width": 259.0890718059702,
                  "height": 607.9684549079709,
                  "content": "### Configuration\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n__`Match on`(required)__: What should OpenAI's search term be? Examples: invoice, callsheet, receipt, contract, payslip.\n__`Google Drive folder to upload matched PDFs`(required)__: Paste the link of the GDrive folder, an example has been provided but will need to change to a folder you own.\n__`maxTokenSize`(required)__: The maximum token size for the model you choose. See possible models from OpenAI [here](https://platform.openai.com/docs/models/gpt-3).\n__`replyTokenSize`(required)__: The reply's maximum token size. Default is 300. This determines how much text the AI will reply with."
            },
            "typeVersion": 1
      },
      {
            "id": "beb571fe-e7a3-4f3c-862b-dc01821e5f3f",
            "name": "Ignore large PDFs",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1300,
                  1620
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "f3c4f249-08a7-4e5e-8f46-e07393ac10b5",
            "name": "Is text within token limit?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1080,
                  1520
            ],
            "parameters": {
                  "conditions": {
                        "boolean": [
                              {
                                    "value1": "={{ $json.text.length() / 4 <= $('Configure').first().json.maxTokenSize - $('Configure').first().json.replyTokenSize }}",
                                    "value2": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "93b6fb96-3e0e-4953-bd09-cf882d2dc69c",
            "name": "Has attachments?",
            "type": "n8n-nodes-base.if",
            "position": [
                  200,
                  1520
            ],
            "parameters": {
                  "conditions": {
                        "boolean": [
                              {
                                    "value1": "={{ $('On email received').item.binary.isNotEmpty() }}",
                                    "value2": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "554d415e-a965-46be-8442-35c4cb6b005c",
            "name": "There are no attachments",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  420,
                  1620
            ],
            "parameters": {},
            "typeVersion": 1
      }
],
    connections: {
      "Merge": {
            "main": [
                  [
                        {
                              "node": "Is matched",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is PDF": {
            "main": [
                  [
                        {
                              "node": "Read PDF",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Not a PDF",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Read PDF": {
            "main": [
                  [
                        {
                              "node": "Is text within token limit?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Configure": {
            "main": [
                  [
                        {
                              "node": "Has attachments?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is matched": {
            "main": [
                  [
                        {
                              "node": "This is a matched PDF",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "This is not a matched PDF",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has attachments?": {
            "main": [
                  [
                        {
                              "node": "Iterate over email attachments",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "There are no attachments",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "On email received": {
            "main": [
                  [
                        {
                              "node": "Configure",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "This is a matched PDF": {
            "main": [
                  [
                        {
                              "node": "Upload file to folder",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is text within token limit?": {
            "main": [
                  [
                        {
                              "node": "OpenAI matches PDF textual content",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 1
                        }
                  ],
                  [
                        {
                              "node": "Ignore large PDFs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Iterate over email attachments": {
            "main": [
                  [
                        {
                              "node": "Is PDF",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI matches PDF textual content": {
            "main": [
                  [
                        {
                              "node": "Merge",
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
    name: "Summarize emails with A.I. then send to messenger",
    nodes: [
      {
            "id": "50e12e63-df28-45ac-9208-48cbf5116d09",
            "name": "Read emails (IMAP)",
            "type": "n8n-nodes-base.emailReadImap",
            "position": [
                  340,
                  260
            ],
            "parameters": {
                  "options": {},
                  "postProcessAction": "nothing"
            },
            "credentials": {
                  "imap": {
                        "id": "gXtdakU9M02LBQc3",
                        "name": "IMAP account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "6565350b-2269-44e3-8f36-8797f32d3e09",
            "name": "Send email to A.I. to summarize",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  700,
                  260
            ],
            "parameters": {
                  "url": "https://openrouter.ai/api/v1/chat/completions",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"model\": \"meta-llama/llama-3.1-70b-instruct:free\",\n \"messages\": [\n {\n \"role\": \"user\",\n \"content\": \"I want you to read and summarize all the emails. If it's not rimportant, just give me a short summary with less than 10 words.\\n\\nHighlight as important if it is, add an emoji to indicate it is urgent:\\nFor the relevant content, find any action items and deadlines. Sometimes I need to sign up before a certain date or pay before a certain date, please highlight that in the summary for me.\\n\\nPut the deadline in BOLD at the top. If the email is not important, keep the summary short to 1 sentence only.\\n\\nHere's the email content for you to read:\\nSender email address: {{ encodeURIComponent($json.from) }}\\nSubject: {{ encodeURIComponent($json.subject) }}\\n{{ encodeURIComponent($json.textHtml) }}\"\n }\n ]\n}",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "WY7UkF14ksPKq3S8",
                        "name": "Header Auth account 2"
                  }
            },
            "typeVersion": 4.2,
            "alwaysOutputData": false
      },
      {
            "id": "d04c422a-c000-4e48-82d0-0bf44bcd9fff",
            "name": "Send summarized content to messenger",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1100,
                  260
            ],
            "parameters": {
                  "url": "https://api.line.me/v2/bot/message/push",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"to\": \"U3ec262c49811f30cdc2d2f2b0a0df99a\",\n \"messages\": [\n {\n \"type\": \"text\",\n \"text\": \"{{ $json.choices[0].message.content.replace(/\\n/g, \"\\\\n\") }}\"\n }\n ]\n}\n\n\n ",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "SzcKjO9Nn9vZPL2H",
                        "name": "Header Auth account 5"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "57a1219c-4f40-407c-855b-86c4c7c468bb",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  180,
                  0
            ],
            "parameters": {
                  "width": 361,
                  "height": 90,
                  "content": "## Summarize emails with A.I.\nYou can find out more about the [use case](https://rumjahn.com/how-a-i-saved-my-kids-school-life-and-my-marriage/)"
            },
            "typeVersion": 1
      },
      {
            "id": "17686264-56ac-419e-a32b-dc5c75f15f1f",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  283,
                  141
            ],
            "parameters": {
                  "color": 5,
                  "width": 229,
                  "height": 280,
                  "content": "Find your email server's IMAP Settings. \n- Link for [gmail](https://www.getmailspring.com/setup/access-gmail-via-imap-smtp)"
            },
            "typeVersion": 1
      },
      {
            "id": "1862abd6-7dca-4c66-90d6-110d4fcf4d99",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  0
            ],
            "parameters": {
                  "color": 6,
                  "width": 365,
                  "height": 442,
                  "content": "For the A.I. you can use Openrouter.ai. \n- Set up a free account\n- The A.I. model selected is FREE to use.\n## Credentials\n- Use header auth\n- Username: Authorization\n- Password: Bearer {insert your API key}.\n- The password is \"Bearer\" space plus your API key."
            },
            "typeVersion": 1
      },
      {
            "id": "c4a3a76f-539d-4bbf-8f95-d7aaebf39a55",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  0
            ],
            "parameters": {
                  "color": 4,
                  "width": 307,
                  "height": 439,
                  "content": "Don't use the official Line node. It's outdated.\n## Credentials\n- Use header auth\n- Username: Authorization\n- Password: Bearer {channel access token}\n\nYou can find your channel access token at the [Line API console](https://developers.line.biz/console/). Go to Messaging API and scroll to the bottom."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Read emails (IMAP)": {
            "main": [
                  [
                        {
                              "node": "Send email to A.I. to summarize",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send email to A.I. to summarize": {
            "main": [
                  [
                        {
                              "node": "Send summarized content to messenger",
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
    name: "📈 Receive Daily Market News From FT.Com To Your Microsoft Outlook Inbox",
    nodes: [
      {
            "id": "d2a24a9b-9cf3-4de0-82e7-5d858658d4b4",
            "name": "Extract specific content",
            "type": "n8n-nodes-base.html",
            "notes": "Extract selected headlines, editor's picks, spotlight etc.",
            "position": [
                  800,
                  340
            ],
            "parameters": {
                  "options": {
                        "cleanUpText": true
                  },
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "Headline #1",
                                    "cssSelector": "#site-content > div:nth-child(1) > section > div > div > div.layout-desktop__grid.layout-desktop__grid--span4.layout-desktop__grid--column-start-1.layout-desktop__grid--row-start-1.layout-desktop__grid--with-border.layout--default > div > div > div > div.story-group-stacked__primary-story > div > div > div > div > div.primary-story__teaser"
                              },
                              {
                                    "key": "Headline #2",
                                    "cssSelector": "#site-content > div:nth-child(1) > section > div > div > div.layout-desktop__grid.layout-desktop__grid--span6.layout-desktop__grid--column-start-5.layout-desktop__grid--row-start-1.layout-desktop__grid--with-border.layout--default > div > div > div > div > div > div.story-group__article.story-group__article--featured > div > div.featured-story-content > div.headline.js-teaser-headline.headline--scale-5.headline--color-black > a > span"
                              },
                              {
                                    "key": "Editor's Picks",
                                    "cssSelector": "#site-content > div:nth-child(1) > section > div > div > div.layout-desktop__grid.layout-desktop__grid--span2.layout-desktop__grid--column-start-11.layout-desktop__grid--row-start-1.layout--default > div"
                              },
                              {
                                    "key": "Top Stories",
                                    "cssSelector": "#site-content > div:nth-child(3) > section > div",
                                    "skipSelectors": "h2"
                              },
                              {
                                    "key": "Spotlight",
                                    "cssSelector": "#site-content > div:nth-child(6) > section",
                                    "skipSelectors": "h2"
                              },
                              {
                                    "key": "Various News",
                                    "cssSelector": "#site-content > div:nth-child(8) > section",
                                    "skipSelectors": "h2"
                              },
                              {
                                    "key": "Europe News",
                                    "cssSelector": "#site-content > div:nth-child(13) > section",
                                    "skipSelectors": "h2"
                              }
                        ]
                  }
            },
            "notesInFlow": true,
            "typeVersion": 1.2
      },
      {
            "id": "38af5df2-65ce-4f04-aed3-6f71d81a37df",
            "name": "Get financial news online",
            "type": "n8n-nodes-base.httpRequest",
            "notes": "Url : https://www.ft.com/",
            "position": [
                  580,
                  340
            ],
            "parameters": {
                  "url": "https://www.ft.com/",
                  "options": {}
            },
            "notesInFlow": true,
            "typeVersion": 4.2
      },
      {
            "id": "764b2209-bf20-4feb-b000-fa261459a617",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  360,
                  340
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "triggerAtHour": 7
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "96b337ba-6fe7-47ec-8385-58bfc6c789cb",
            "name": "Google Gemini Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  1200,
                  520
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "450x4z8bKvomb0tZ",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "925eabf3-3619-4da2-be2c-bda97c605d4d",
            "name": "Gather the elements",
            "type": "n8n-nodes-base.set",
            "position": [
                  1020,
                  340
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "5412a5ee-dbbe-4fcc-98a5-6fafc37b94d1",
                                    "name": "News together",
                                    "type": "string",
                                    "value": "=Yahoo news :\n\n{{ $json['Headline '] }};\n\n{{ $('HTML').item.json['News #1'] }};\n\n{{ $('HTML').item.json['News #2'] }};\n\nFinancial times news :\n\n{{ $('Extract specific content').item.json['Headline #1'] }};\n\n{{ $('Extract specific content').item.json['Headline #2'] }};\n\n{{ $('Extract specific content').item.json['Editor\\'s Picks'] }};\n\n{{ $('Extract specific content').item.json['Top Stories'] }};\n\n{{ $('Extract specific content').item.json.Spotlight }};\n\n{{ $('Extract specific content').item.json['Various News'] }};\n\n{{ $('Extract specific content').item.json['Europe News'] }};\n\n"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "5445b14f-25e8-4759-82d4-985961ca7fdd",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1200,
                  340
            ],
            "parameters": {
                  "text": "=Here are the news to summarise :\n\n{{ $json['News together'] }}",
                  "options": {
                        "systemMessage": "You role is to summarise the financial news from today. The summary will help an investor to have a clear view of the market, and to make better choice. \n\nYou will write the body of an e-mail using a well structured html format"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "30b76eac-d646-44d8-bc41-46aa2d9fe05f",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -200,
                  200
            ],
            "parameters": {
                  "width": 683.6774193548385,
                  "height": 581.4193548387093,
                  "content": "# Financial News Recap Workflow\n\nThis workflow automates the daily email delivery of curated financial news to a designated recipient at 7:00 AM. It extracts relevant financial news articles, structures the content, and sends it in a concise summary format via Microsoft Outlook.\n\n### Workflow Steps\n1. **Schedule Trigger** \n Sets the workflow to activate daily at 7:00 AM.\n2. **Fetch Financial News** \n Retrieves financial news content from [ft.com](https://www.ft.com/) using an HTTP Request node.\n3. **Extract News Headlines and Sections** \n Using CSS selectors, this node parses specific sections of the HTML page to gather key headlines and sections:\n - Headline #1, Headline #2\n - Editor's Picks\n - etc.\n4. **Aggregate News Content** \n Combines all extracted news sections into a single data set, organizing content under relevant categories.\n5. **AI Agent for Summarization** \n A Google Gemini Chat Model generates a structured summary in HTML format, optimized to provide investors with a clear market overview.\n6. **Email Dispatch** \n Sends the summarized content via Microsoft Outlook with a subject \"Financial news from today,\" formatted in HTML for clarity and readability.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "7f2b6e9a-8b14-4083-a05c-3b76aae601a8",
            "name": "Send the summary by e-mail",
            "type": "n8n-nodes-base.microsoftOutlook",
            "position": [
                  1540,
                  340
            ],
            "parameters": {
                  "subject": "Financial news from today",
                  "bodyContent": "=News of the day : \n\n{{ $json.output }}",
                  "toRecipients": "",
                  "additionalFields": {
                        "bodyContentType": "html"
                  }
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "8asOQiRWBGic8ei8",
                        "name": "Microsoft Outlook account"
                  }
            },
            "typeVersion": 2
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Send the summary by e-mail",
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
                              "node": "Get financial news online",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gather the elements": {
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
      "Extract specific content": {
            "main": [
                  [
                        {
                              "node": "Gather the elements",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Gemini Chat Model": {
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
      "Get financial news online": {
            "main": [
                  [
                        {
                              "node": "Extract specific content",
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

export function GmailCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-red-600 text-white shadow-lg shadow-red-500/25 border border-red-600' : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700/50 hover:bg-red-100 dark:hover:bg-red-500/20 hover:border-red-300 dark:hover:border-red-600/50 hover:shadow-md'}`}
    >
      <Mail className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-500 dark:text-red-400'}`} />
      <span className="truncate max-w-[200px]">Gmail and Email Automation</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {gmailTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function GmailTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {gmailTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-red-300 dark:hover:border-red-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-red-50/50 dark:group-hover:to-red-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-red-500 to-red-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Mail className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-red-600 dark:hover:bg-red-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
