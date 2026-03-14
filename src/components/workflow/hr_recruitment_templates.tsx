import React from 'react';
import { Play, Users } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const hrRecruitmentTemplates: IN8nTemplate[] = [
  {
    name: "BambooHR AI-Powered Company Policies and Benefits Chatbot",
    nodes: [
      {
            "id": "832e4a1d-320f-4793-be3c-8829776a3ce6",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  760,
                  560
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "63be0638-d7df-4af8-ba56-555593a6de0c",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  2080,
                  740
            ],
            "parameters": {
                  "options": {},
                  "dataType": "binary"
            },
            "typeVersion": 1
      },
      {
            "id": "ffe33bb2-efd0-4b6e-a146-aaded7c28304",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  1860,
                  740
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "32de5318-ea5d-4951-b81c-3c96167bc320",
            "name": "Recursive Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  2060,
                  880
            ],
            "parameters": {
                  "options": {},
                  "chunkOverlap": 100
            },
            "typeVersion": 1
      },
      {
            "id": "6306d263-16c1-4a68-9318-c58fea1e3e62",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1000,
                  1340
            ],
            "parameters": {},
            "typeVersion": 1.2
      },
      {
            "id": "364cf0ce-524c-4b61-89f3-40b2801bc7e3",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  840,
                  1340
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "901163a1-1e66-42ee-bfd0-9ed815a7c83d",
            "name": "Vector Store Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "position": [
                  1120,
                  1380
            ],
            "parameters": {
                  "name": "company_files",
                  "topK": 5,
                  "description": "Retrieves information from the company handbook, 401k policies, benefits overview, and expense policies available to all employees."
            },
            "typeVersion": 1
      },
      {
            "id": "b87fa113-6a32-48fc-8e06-049345c66f38",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1220,
                  1600
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9dc1a896-c8a5-4d22-b029-14eae0717bd8",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  940,
                  1700
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "20cda474-ef6f-48af-b299-04f1fe980d3d",
            "name": "Employee Lookup Tool",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1440,
                  1360
            ],
            "parameters": {
                  "name": "employee_lookup_tool",
                  "workflowId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $workflow.id }}"
                  },
                  "description": "Call this tool with the full name of an employee to retrieve their details from our HRIS, including their job title, department, and supervisor. If an employee name is not provided, you may call this tool with a department name to retrieve the most senior person in that department. This tool requires an exact match on employee names but can infer the senior-most person for a department query.",
                  "jsonSchemaExample": "{\n\t\"name\": \"The name of an employee or department\"\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.2
      },
      {
            "id": "55718295-459b-4a4b-8c57-fd6b31e3d963",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1960,
                  1500
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e574d63d-7e38-4d90-9533-64a4ddbe2e36",
            "name": "OpenAI Chat Model3",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2980,
                  1600
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "04d53430-b8d9-43ff-b2c4-ef0da2d799c0",
            "name": "OpenAI Chat Model4",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  3700,
                  1620
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9759fe08-3c81-4472-8d62-2c5d26156984",
            "name": "Auto-fixing Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserAutofixing",
            "position": [
                  3880,
                  1600
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "d8830fd8-f238-4e5d-8c5f-bf83c9450dbe",
            "name": "OpenAI Chat Model5",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  3780,
                  1700
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XXXXXX",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "da580308-e4ed-400b-99e2-31baf27b039d",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  4080,
                  1700
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n\t\"name\": \"The name of an employee\"\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "e81dbe81-5f6b-4b2c-a4bc-afa0136e33ac",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  680,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 1695.17727595829,
                  "height": 582.7965199011514,
                  "content": "## STEP #1: Retrieve company policies and load them into a vector store"
            },
            "typeVersion": 1
      },
      {
            "id": "629872ed-2f99-424d-96da-feee6df96d3d",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  680,
                  1080
            ],
            "parameters": {
                  "color": 4,
                  "width": 873.5637402697844,
                  "height": 780.6181567295652,
                  "content": "## BambooHR AI-Powered HR Benefits and Company Policies Chatbot"
            },
            "typeVersion": 1
      },
      {
            "id": "8888281b-5701-4c62-b76b-a0b6a80d8463",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1580,
                  1075.4375994898523
            ],
            "parameters": {
                  "color": 7,
                  "width": 2783.3549952823255,
                  "height": 781.525845027296,
                  "content": "## (Optional) STEP #2: Set up employee lookup tool"
            },
            "typeVersion": 1
      },
      {
            "id": "17044553-d081-4c17-8108-d0327709f352",
            "name": "GET all files",
            "type": "n8n-nodes-base.bambooHr",
            "position": [
                  960,
                  560
            ],
            "parameters": {
                  "resource": "file",
                  "operation": "getAll",
                  "returnAll": true,
                  "simplifyOutput": false
            },
            "credentials": {
                  "bambooHrApi": {
                        "id": "XXXXXX",
                        "name": "BambooHR account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "939881b1-eb18-4ab7-ac4a-9edcc218356f",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  920,
                  720
            ],
            "parameters": {
                  "color": 5,
                  "width": 177.89252000024067,
                  "height": 99.24268260893132,
                  "content": "Toggle **off** the _simplify_ option to ensure categories are retrieved as well"
            },
            "typeVersion": 1
      },
      {
            "id": "0907a1d3-97e2-4219-bfbc-524186f6d889",
            "name": "Filter out files from undesired categories",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1160,
                  560
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
                                    "id": "b85b86cd-0b54-4348-a538-8ff4ae625b9a",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.name }}",
                                    "rightValue": "=Company Files"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "43069219-7cd9-4515-846d-ed6a0f9bbb61",
            "name": "Split out individual files",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  1360,
                  560
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "files"
            },
            "typeVersion": 1
      },
      {
            "id": "8412af5f-f07f-4a98-a174-e363ba04f902",
            "name": "Filter out non-pdf files",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1560,
                  560
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
                                    "id": "73cc2cb9-04fa-43e7-a459-de0bf26ffb18",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.originalFileName.endsWith(\".pdf\") }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "7e007a29-c902-41d3-ab22-f6a93bc43f7d",
            "name": "Download file from BambooHR",
            "type": "n8n-nodes-base.bambooHr",
            "position": [
                  1760,
                  560
            ],
            "parameters": {
                  "fileId": "={{ $json.id }}",
                  "resource": "file",
                  "operation": "download"
            },
            "credentials": {
                  "bambooHrApi": {
                        "id": "XXXXXX",
                        "name": "BambooHR account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "cec7ce3a-77df-4400-8683-fb5cf87004b6",
            "name": "Supabase Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  1960,
                  560
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {
                        "queryName": "match_files"
                  },
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "company_files",
                        "cachedResultName": "company_files"
                  }
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "XXXXXX",
                        "name": "Supabase account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5e070dc3-5f6d-44bb-a655-b769aac14890",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1600,
                  1140
            ],
            "parameters": {
                  "color": 5,
                  "width": 530.9221622705562,
                  "height": 91.00370621080086,
                  "content": "This employee lookup tool gives the AI Benefits and Company Policies chatbot additional superpowers by allowing it to **search for an individual or a department to retrieve contact information from BambooHR**."
            },
            "typeVersion": 1
      },
      {
            "id": "8f3cd44e-d1e5-4806-9d89-78c8728ea0e4",
            "name": "Employee initiates a conversation",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  760,
                  1140
            ],
            "webhookId": "27ec9df7-5007-4642-81c7-7fcf7e834c43",
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "3d56dc6a-13e2-404b-ad38-6370b9610f61",
            "name": "Supabase Vector Store Retrieval",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  940,
                  1540
            ],
            "parameters": {
                  "options": {
                        "queryName": "match_files"
                  },
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "company_files",
                        "cachedResultName": "company_files"
                  }
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "XXXXXX",
                        "name": "Supabase account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "1e6f5d4a-5897-42b7-bfcf-e69b7880b6c4",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  680,
                  1880
            ],
            "parameters": {
                  "width": 865.771928038017,
                  "height": 281.07009330339326,
                  "content": "### AI Chatbot Operating Guidelines \n- When an employee asks for a contact person, first attempt to find the relevant contact in company_files. \n- If a contact person is found but their details (e.g., email or phone number) are missing, use the `employee_lookup_tool` to retrieve their contact details. \n- If no contact person is found: \n 1. Use the `employee_lookup_tool` with \"HR\" (or another relevant department) to retrieve the most senior person in that department. \n 2. If no senior contact is found, ask the employee for their name. \n 3. Use the `employee_lookup_tool` to retrieve their supervisor’s name. \n 4. Use the `employee_lookup_tool` to retrieve their supervisor’s details. \n 5. Provide the supervisor's contact information and recommend them as the best next point of contact. "
            },
            "typeVersion": 1
      },
      {
            "id": "ba8c82cb-4972-46cc-8594-dfe71149a41c",
            "name": "AI-Powered HR Benefits and Company Policies Chatbot",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  1640,
                  1340
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "aaf611fd-1779-4826-8f9c-4e9a7a538af0",
            "name": "Text Classifier",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  1840,
                  1340
            ],
            "parameters": {
                  "options": {},
                  "inputText": "={{ $json.query.name }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "person",
                                    "description": "This is the name of a person."
                              },
                              {
                                    "category": "department",
                                    "description": "This is the name of a department within the company."
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4a1e0d47-87f8-4301-9aee-2227003a40e6",
            "name": "GET all employees",
            "type": "n8n-nodes-base.bambooHr",
            "position": [
                  2260,
                  1240
            ],
            "parameters": {
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "bambooHrApi": {
                        "id": "XXXXXX",
                        "name": "BambooHR account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "93e1017a-07c6-4b97-be90-659a91fdc065",
            "name": "Filter out other employees",
            "type": "n8n-nodes-base.filter",
            "position": [
                  2460,
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
                                    "id": "e80c892e-21dc-4d6e-8ef6-c2ffaea6d43e",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.displayName }}",
                                    "rightValue": "={{ $('AI-Powered HR Benefits and Company Policies Chatbot').item.json.query.name }}"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "c45eec9a-05ca-4b35-b595-42f2251a01ec",
            "name": "Stringify employee record for response",
            "type": "n8n-nodes-base.set",
            "position": [
                  2660,
                  1240
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "73ae7ef0-339a-4e32-bbc9-c40cefd37757",
                                    "name": "response",
                                    "type": "string",
                                    "value": "={{ $json.toJsonString() }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "aa30062a-2476-4fc2-8380-6d2106885ae2",
            "name": "GET all employees (second path)",
            "type": "n8n-nodes-base.bambooHr",
            "position": [
                  2260,
                  1440
            ],
            "parameters": {
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "bambooHrApi": {
                        "id": "XXXXXX",
                        "name": "BambooHR account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f44cb9ab-00aa-4ebc-bb1a-6ba1da2e2aaa",
            "name": "Extract departments",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  2460,
                  1440
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "renameField": true,
                                    "outputFieldName": "departments",
                                    "fieldToAggregate": "department"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "855a6968-d919-4071-96d8-04cbc4b6ec39",
            "name": "Ensure uniqueness in department list",
            "type": "n8n-nodes-base.set",
            "position": [
                  2660,
                  1440
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "34f456ff-d2c5-431f-ade3-ace48abd0c6a",
                                    "name": "departments",
                                    "type": "array",
                                    "value": "={{ $json.departments.unique() }}"
                              },
                              {
                                    "id": "cf31288a-65fc-45c6-8b6f-6680020dce09",
                                    "name": "query",
                                    "type": "string",
                                    "value": "={{ $('Text Classifier').item.json.query.name }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "0dca5763-33c6-4444-b4e0-f26127bb91d5",
            "name": "Extract department",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  2860,
                  1440
            ],
            "parameters": {
                  "text": "={{ $json.query }}",
                  "options": {},
                  "attributes": {
                        "attributes": [
                              {
                                    "name": "department",
                                    "description": "=The department from the following list that would be most applicable:\n{{ $json.departments }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "833b43e8-7ed5-4431-b362-b5d11bb9f787",
            "name": "Retrieve all employees",
            "type": "n8n-nodes-base.bambooHr",
            "position": [
                  3220,
                  1440
            ],
            "parameters": {
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "bambooHrApi": {
                        "id": "XXXXXX",
                        "name": "BambooHR account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "adcaafb5-700f-4e93-a7f4-c393967fb4f0",
            "name": "Filter out other departments",
            "type": "n8n-nodes-base.filter",
            "position": [
                  3420,
                  1440
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
                                    "id": "a88bf53c-ecfd-49a7-8180-1e8b8eaeb6fd",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.department }}",
                                    "rightValue": "={{ $('Extract department').item.json.output.department }}"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "fe928eb9-2b70-4ab9-a5a6-a4c141467ad7",
            "name": "Extract relevant employee fields",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  3620,
                  1440
            ],
            "parameters": {
                  "include": "specifiedFields",
                  "options": {},
                  "aggregate": "aggregateAllItemData",
                  "fieldsToInclude": "id, displayName, jobTitle, workEmail",
                  "destinationFieldName": "department_employees"
            },
            "typeVersion": 1
      },
      {
            "id": "0632ae1b-280e-486e-9cdd-c6c9fd2a1b6e",
            "name": "Identify most senior employee",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  3800,
                  1440
            ],
            "parameters": {
                  "text": "=Who is the most senior employee from this list:\n{{ $json.department_employees.toJsonString() }}",
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.4
      },
      {
            "id": "0e6c8d0a-d84f-468b-993b-c5a14d7d458f",
            "name": "Format name for response",
            "type": "n8n-nodes-base.set",
            "position": [
                  4160,
                  1440
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "2b4412bf-142b-4ba0-a6b2-654e97c263e5",
                                    "name": "response",
                                    "type": "string",
                                    "value": "={{ $json.output.name }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "e865d8bf-ab6d-4d23-9d7c-a76f96ba75a1",
            "name": "HR AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1040,
                  1140
            ],
            "parameters": {
                  "options": {
                        "systemMessage": "You are a helpful HR assistant accessible by employees at our company.\n\nObjective: \nAssist employees with questions regarding company policies, documents, and escalation procedures.\n\nTools: \n1. A vector store database (company_files) containing the company handbook, 401k policy, expense policy, and employee benefits. \n2. An employee lookup tool (employee_lookup_tool) that retrieves details about an employee when provided with their name. It can also retrieve the most senior person in a department if given a department name. \n\nGuidelines: \n- When an employee asks for a contact person, first attempt to find the relevant contact in company_files. \n- If a contact person is found but their details (e.g., email or phone number) are missing, use the `employee_lookup_tool` to retrieve their contact details. \n- If no contact person is found: \n 1. Use the `employee_lookup_tool` with \"HR\" (or another relevant department) to retrieve the most senior person in that department. \n 2. If no senior contact is found, ask the employee for their name. \n 3. Use the `employee_lookup_tool` to retrieve their supervisor’s name. \n 4. Use the `employee_lookup_tool` to retrieve their supervisor’s details. \n 5. Provide the supervisor's contact information and recommend them as the best next point of contact. \n"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "3aa42dcf-a411-4bd8-87b3-9ab9d0043303",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1600,
                  1660
            ],
            "parameters": {
                  "color": 3,
                  "width": 340.93489445096634,
                  "height": 180.79319430657273,
                  "content": "### GetAll employees from BambooHR\nBambooHR does not offer search by {field} functionality for its `/employees` endpoint, so filtering must be done after data retrieval. This can be inefficient for very large organizations where there may be multiple employees with the same name or simply a large number of employees."
            },
            "typeVersion": 1
      },
      {
            "id": "3b3b400c-9c7e-4fd0-91f3-1c6bcf05617f",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2240,
                  1140
            ],
            "parameters": {
                  "color": 5,
                  "width": 542.9452105095002,
                  "height": 89.69037140899545,
                  "content": "### GET singular employee by name path\nThis path may be used multiple times by the HR AI Agent to look up the employee's details, and then to look up their supervisor's details."
            },
            "typeVersion": 1
      },
      {
            "id": "6ad78a36-e68d-4b0d-b532-ca67bcd0738d",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2240,
                  1620
            ],
            "parameters": {
                  "color": 5,
                  "width": 542.9452105095002,
                  "height": 121.0648445295759,
                  "content": "### GET senior leader of department path\nThis path would normally only be used when no other contacts can be identified from the company_files. The employee can retrieve the contact details for the most senior leader of a department should they request it."
            },
            "typeVersion": 1
      },
      {
            "id": "25d1e603-cce0-4cd1-9293-810880c65584",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4020,
                  1320
            ],
            "parameters": {
                  "color": 5,
                  "width": 300.8019702746294,
                  "height": 97.8161667645835,
                  "content": "### Final node returns employee name\nThe AI Agent can then call the employee lookup path to retrieve details, if requested."
            },
            "typeVersion": 1
      },
      {
            "id": "e7076eaa-a67e-4b02-9aec-553c405f3bb9",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  700,
                  940
            ],
            "parameters": {
                  "color": 4,
                  "width": 244.3952545193282,
                  "height": 87.34661077350344,
                  "content": "## About the maker\n**[Find Ludwig Gerdes on LinkedIn](https://www.linkedin.com/in/ludwiggerdes)**"
            },
            "typeVersion": 1
      }
],
    connections: {
      "GET all files": {
            "main": [
                  [
                        {
                              "node": "Filter out files from undesired categories",
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
                              "node": "GET all employees",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "GET all employees (second path)",
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
                              "node": "Supabase Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "GET all employees": {
            "main": [
                  [
                        {
                              "node": "Filter out other employees",
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
                              "node": "HR AI Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Vector Store Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "HR AI Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI1": {
            "ai_embedding": [
                  [
                        {
                              "node": "Supabase Vector Store Retrieval",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract department": {
            "main": [
                  [
                        {
                              "node": "Retrieve all employees",
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
                              "node": "Vector Store Tool",
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
                              "node": "Text Classifier",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model3": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Extract department",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model4": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Identify most senior employee",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model5": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Auto-fixing Output Parser",
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
                              "node": "Supabase Vector Store",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract departments": {
            "main": [
                  [
                        {
                              "node": "Ensure uniqueness in department list",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Employee Lookup Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "HR AI Agent",
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
                              "node": "HR AI Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve all employees": {
            "main": [
                  [
                        {
                              "node": "Filter out other departments",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter out non-pdf files": {
            "main": [
                  [
                        {
                              "node": "Download file from BambooHR",
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
                              "node": "Auto-fixing Output Parser",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Auto-fixing Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Identify most senior employee",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter out other employees": {
            "main": [
                  [
                        {
                              "node": "Stringify employee record for response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split out individual files": {
            "main": [
                  [
                        {
                              "node": "Filter out non-pdf files",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Download file from BambooHR": {
            "main": [
                  [
                        {
                              "node": "Supabase Vector Store",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter out other departments": {
            "main": [
                  [
                        {
                              "node": "Extract relevant employee fields",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Identify most senior employee": {
            "main": [
                  [
                        {
                              "node": "Format name for response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "GET all employees (second path)": {
            "main": [
                  [
                        {
                              "node": "Extract departments",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Supabase Vector Store Retrieval": {
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
      "Extract relevant employee fields": {
            "main": [
                  [
                        {
                              "node": "Identify most senior employee",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Employee initiates a conversation": {
            "main": [
                  [
                        {
                              "node": "HR AI Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Recursive Character Text Splitter": {
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
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "GET all files",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Ensure uniqueness in department list": {
            "main": [
                  [
                        {
                              "node": "Extract department",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter out files from undesired categories": {
            "main": [
                  [
                        {
                              "node": "Split out individual files",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "AI-Powered HR Benefits and Company Policies Chatbot": {
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
    name: "CV Screening With OpenAI",
    nodes: [
      {
            "id": "0f3b39af-2802-462c-ac54-a7bccf5b78c5",
            "name": "Extract Document PDF",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  520,
                  400
            ],
            "parameters": {
                  "options": {},
                  "operation": "pdf"
            },
            "typeVersion": 1,
            "alwaysOutputData": false
      },
      {
            "id": "6f76e3a6-a3be-4f9f-a0db-3f002eafc2ad",
            "name": "Download File",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  340,
                  400
            ],
            "parameters": {
                  "url": "={{ $json.file_url }}",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "2c4e0b0f-28c7-48f5-b051-6e909ac878d2",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -20,
                  400
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "a70d972b-ceb4-4f4d-8737-f0be624d6234",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  120,
                  280
            ],
            "parameters": {
                  "width": 187.37066290133808,
                  "height": 80,
                  "content": "**Add direct link to CV and Job description**"
            },
            "typeVersion": 1
      },
      {
            "id": "9fdff1be-14cf-4167-af2d-7c5e60943831",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -800,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 280.2462120317618,
                  "height": 438.5821431288714,
                  "content": "### Setup\n\n1. **Download File**: Fetch the CV using its direct URL.\n2. **Extract Data**: Use N8N’s PDF or text extraction nodes to retrieve text from the CV.\n3. **Send to OpenAI**:\n - **URL**: POST to OpenAI’s API for analysis.\n - **Parameters**:\n - Include the extracted CV data and job description.\n - Use JSON Schema to structure the response.\n4. **Save Results**:\n - Store the extracted data and OpenAI's analysis in Supabase for further use."
            },
            "typeVersion": 1
      },
      {
            "id": "b1ce4a61-270f-480b-a716-6618e6034581",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -800,
                  -500
            ],
            "parameters": {
                  "color": 7,
                  "width": 636.2128494576581,
                  "height": 598.6675280064023,
                  "content": "![5min Logo](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/Untitled%20(1500%20x%20300%20px).png)\n## CV Screening with OpenAI\n**Made by [Mark Shcherbakov](https://www.linkedin.com/in/marklowcoding/) from community [5minAI](https://www.skool.com/5minai-2861)**\n\nThis workflow is ideal for recruitment agencies, HR professionals, and hiring managers looking to automate the initial screening of CVs. It is especially useful for organizations handling large volumes of applications and seeking to streamline their recruitment process.\n\nThis workflow automates the resume screening process using OpenAI for analysis and Supabase for structured data storage. It provides a matching score, a summary of candidate suitability, and key insights into why the candidate fits (or doesn’t fit) the job. \n\n1. **Retrieve Resume**: The workflow downloads CVs from a direct link (e.g., Supabase storage or Dropbox).\n2. **Extract Data**: Extracts text data from PDF or DOC files for analysis.\n3. **Analyze with OpenAI**: Sends the extracted data and job description to OpenAI to:\n - Generate a matching score.\n - Summarize candidate strengths and weaknesses.\n - Provide actionable insights into their suitability for the job.\n4. **Store Results in Supabase**: Saves the analysis and raw data in a structured format for further processing or integration into other tools.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "747591cd-76b1-417e-ab9d-0a3935d3db03",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -500,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 330.5152611046425,
                  "height": 240.6839895136402,
                  "content": "### ... or watch set up video [8 min]\n[![Youtube Thumbnail](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/11.png)](https://youtu.be/TWuI3dOcn0E)\n"
            },
            "typeVersion": 1
      },
      {
            "id": "051d8cb0-2557-4e35-9045-c769ec5a34f9",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  660,
                  280
            ],
            "parameters": {
                  "width": 187.37066290133808,
                  "height": 80,
                  "content": "**Replace OpenAI connection**"
            },
            "typeVersion": 1
      },
      {
            "id": "865f4f69-e13d-49c1-8bb4-9f98facbf75c",
            "name": "OpenAI - Analyze CV",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  700,
                  400
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/chat/completions",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"model\": \"gpt-4o-mini\",\n \"messages\": [\n {\n \"role\": \"system\",\n \"content\": \"{{ $('Set Variables').item.json.prompt }}\"\n },\n {\n \"role\": \"user\",\n \"content\": {{ JSON.stringify(encodeURIComponent($json.text))}}\n }\n ],\n \"response_format\":{ \"type\": \"json_schema\", \"json_schema\": {{ $('Set Variables').item.json.json_schema }}\n\n }\n }",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "SphXAX7rlwRLkiox",
                        "name": "Test club key"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "68b7fc08-506d-4816-9a8f-db7ab89e4589",
            "name": "Set Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  160,
                  400
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "83274f6f-c73e-4d5e-946f-c6dfdf7ed1c4",
                                    "name": "file_url",
                                    "type": "string",
                                    "value": "https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/software_engineer_resume_example.pdf"
                              },
                              {
                                    "id": "6e44f3e5-a0df-4337-9f7e-7cfa91b3cc37",
                                    "name": "job_description",
                                    "type": "string",
                                    "value": "Melange is a venture-backed startup building a brand new search infrastructure for the patent system. Leveraging recent and ongoing advancements in machine learning and natural language processing, we are building systems to conduct patent search faster and more accurately than any human currently can. We are a small team with a friendly, mostly-remote culture\\n\\nAbout the team\\nMelange is currently made up of 9 people. We are remote but headquartered in Brooklyn, NY. We look for people who are curious and earnest.\\n\\nAbout the role\\nJoin the team at Melange, a startup with a focus on revolutionizing patent search through advanced technology. As a software engineer in this role, you will be responsible for developing conversation graphs, integrating grammar processes, and maintaining a robust codebase. The ideal candidate will have experience shipping products, working with cloud platforms, and have familiarity with containerization tools. Additionally, experience with prompting tools, NLP packages, and cybersecurity is a plus.\\n\\nCandidate location - the US. Strong preference if they're in NYC, Boston or SF but open to anywhere else but needs to be rockstar\\n\\nYou will \\n\\n* Ship high-quality products.\\n* Utilize prompting libraries such as Langchain and Langgraph to develop conversation graphs and evaluation flows.\\n* Collaborate with linguists to integrate our in-house grammar and entity mapping processes into an iterable patent search algorithm piloted by AI patent agents.\\n* Steward the codebase, ensuring that it remains robust as it scales.\\n\\n\\nCandidate requirements\\nMinimum requirements a candidate must meet\\nHad ownership over aspects of product development in both small and large organizations at differing points in your career.\\n\\nHave used Langchain, LangGraph, or other prompting tools in production or for personal projects.\\n\\nFamiliarity with NLP packages such as Spacy, Stanza, PyTorch, and/or Tensorflow.\\n\\nShipped a working product to users, either as part of a team or on your own. \\nThis means you have: \\nproficiency with one of AWS, Azure, or Google Cloud, \\nfamiliarity with containerization and orchestration tools like Docker and Kubernetes, and \\nbuilt and maintained CI/CD pipelines.\\n5+ years of experience as a software engineer\\n\\nNice-to-haves\\nWhat could make your candidate stand out\\nExperience with cybersecurity.\\n\\nIdeal companies\\nSuccessful b2b growth stage startups that have a strong emphasis on product and design. Orgs with competent management where talent is dense and protected.\\n\\nRamp, Rippling, Brex, Carta, Toast, Asana, Airtable, Benchling, Figma, Gusto, Stripe, Plaid, Monday.com, Smartsheet, Bill.com, Freshworks, Intercom, Sprout Social, Sisense, InsightSquared, DocuSign, Dropbox, Slack, Trello, Qualtrics, Datadog, HubSpot, Shopify, Zendesk, SurveyMonkey, Squarespace, Mixpanel, Github, Atlassian, Zapier, PagerDuty, Box, Snowflake, Greenhouse, Lever, Pendo, Lucidchart, Asana, New Relic, Kajabi, Veeva Systems, Adyen, Twilio, Workday, ServiceNow, Confluent.\\n"
                              },
                              {
                                    "id": "c597c502-9a3c-48e6-a5f5-8a2a8be7282c",
                                    "name": "prompt",
                                    "type": "string",
                                    "value": "You are the recruiter in recruiting agency, you are strict and you pay extra attention on details in a resume. You work with companies and find talents for their jobs. You asses any resume really attentively and critically. If the candidate is a jumper, you notice that and say us. You need to say if the candidate from out base is suitable for this job. Return 4 things: 1. Percentage (10% step) of matching candidate resume with job. 2. Short summary - should use simple language and be short. Provide final decision on candidate based on matching percentage and candidate skills vs job requirements. 3. Summary why this candidate suits this jobs. 4. Summary why this candidate doesn't suit this jobs."
                              },
                              {
                                    "id": "1884eed1-9111-4ce1-8d07-ed176611f2d8",
                                    "name": "json_schema",
                                    "type": "string",
                                    "value": "{ \"name\": \"candidate_evaluation\", \"description\": \"Structured data for evaluating a candidate based on experience and fit\", \"strict\": true, \"schema\": { \"type\": \"object\", \"properties\": { \"percentage\": { \"type\": \"integer\", \"description\": \"Overall suitability percentage score for the candidate\" }, \"summary\": { \"type\": \"string\", \"description\": \"A brief summary of the candidate's experience, personality, and any notable strengths or concerns\" }, \"reasons-suit\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"properties\": { \"name\": { \"type\": \"string\", \"description\": \"Title of the strength or reason for suitability\" }, \"text\": { \"type\": \"string\", \"description\": \"Description of how this experience or skill matches the job requirements\" } }, \"required\": [\"name\", \"text\"], \"additionalProperties\": false }, \"description\": \"List of reasons why the candidate is suitable for the position\" }, \"reasons-notsuit\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"properties\": { \"name\": { \"type\": \"string\", \"description\": \"Title of the concern or reason for unsuitability\" }, \"text\": { \"type\": \"string\", \"description\": \"Description of how this factor may not align with the job requirements\" } }, \"required\": [\"name\", \"text\"], \"additionalProperties\": false }, \"description\": \"List of reasons why the candidate may not be suitable for the position\" } }, \"required\": [\"percentage\", \"summary\", \"reasons-suit\", \"reasons-notsuit\"], \"additionalProperties\": false } }"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "22dedac7-c44b-430f-b9c7-57d0c55328fa",
            "name": "Parsed JSON",
            "type": "n8n-nodes-base.set",
            "position": [
                  880,
                  400
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "83274f6f-c73e-4d5e-946f-c6dfdf7ed1c4",
                                    "name": "json_parsed",
                                    "type": "object",
                                    "value": "={{ JSON.parse($json.choices[0].message.content) }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      }
],
    connections: {
      "Download File": {
            "main": [
                  [
                        {
                              "node": "Extract Document PDF",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Variables": {
            "main": [
                  [
                        {
                              "node": "Download File",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Analyze CV": {
            "main": [
                  [
                        {
                              "node": "Parsed JSON",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Document PDF": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Analyze CV",
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
                              "node": "Set Variables",
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
    name: "HR & IT Helpdesk Chatbot with Audio Transcription",
    nodes: [
      {
            "id": "c6cb921e-97ac-48f6-9d79-133993dd6ef7",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -300,
                  -280
            ],
            "parameters": {
                  "color": 7,
                  "width": 780,
                  "height": 460,
                  "content": "## 1. Download & Extract Internal Policy Documents\n[Read more about the HTTP Request Tool](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest)\n\nBegin by importing the PDF documents that contain your internal policies and FAQs—these will become the knowledge base for your Internal Helpdesk Assistant. For example, you can store a company handbook or IT/HR policy PDFs on a shared drive or cloud storage and reference a direct download link here.\n\nIn this demonstration, we'll use the **HTTP Request node** to fetch the PDF file from a given URL and then parse its text contents using the **Extract from File node**. Once extracted, these text chunks will be used to build the vector store that underpins your helpdesk chatbot’s responses.\n\n[Example Employee Handbook with Policies](https://s3.amazonaws.com/scschoolfiles/656/employee_handbook_print_1.pdf)"
            },
            "typeVersion": 1
      },
      {
            "id": "450a254c-eec3-41ea-a11d-eb87b62ee4f4",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -80,
                  20
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0972f31c-1f62-430c-8beb-bef8976cd0eb",
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  100,
                  20
            ],
            "parameters": {
                  "url": "https://s3.amazonaws.com/scschoolfiles/656/employee_handbook_print_1.pdf",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "bf523255-39f5-410a-beb7-6331139c5f9b",
            "name": "Extract from File",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  280,
                  20
            ],
            "parameters": {
                  "options": {},
                  "operation": "pdf"
            },
            "typeVersion": 1
      },
      {
            "id": "88901c7c-e747-44c7-87d9-e14ac99a93db",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  540,
                  -280
            ],
            "parameters": {
                  "color": 7,
                  "width": 780,
                  "height": 1020,
                  "content": "## 2. Create Internal Policy Vector Store\n[Read more about the In-Memory Vector Store](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/)\n\nVector stores power the retrieval process by matching a user's natural language questions to relevant chunks of text. We'll transform your extracted internal policy text into vector embeddings and store them in a database-like structure.\n\nWe will be using PostgreSQL which has production ready vector support.\n\n**How it works** \n1. The text extracted in Step 1 is split into manageable segments (chunks). \n2. An embedding model transforms these segments into numerical vectors. \n3. These vectors, along with metadata, are stored in PostgreSQL. \n4. When users ask a question, their query is embedded and matched to the most relevant vectors, improving the accuracy of the chatbot's response."
            },
            "typeVersion": 1
      },
      {
            "id": "8d6472ab-dcff-4d24-a320-109787bce52a",
            "name": "Create HR Policies",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePGVector",
            "position": [
                  620,
                  100
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {}
            },
            "credentials": {
                  "postgres": {
                        "id": "wQK6JXyS5y1icHw3",
                        "name": "Postgres account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e669b3fb-aaf1-4df8-855b-d3142215b308",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  600,
                  320
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "J2D6m1evHLUJOMhO",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e25418af-65bb-4628-9b26-ec59cae7b2b4",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  760,
                  340
            ],
            "parameters": {
                  "options": {},
                  "jsonData": "={{ $('Extract from File').item.json.text }}",
                  "jsonMode": "expressionData"
            },
            "typeVersion": 1
      },
      {
            "id": "a4538deb-8406-4a5b-9b1e-4e2f859943c8",
            "name": "Recursive Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  860,
                  560
            ],
            "parameters": {
                  "options": {},
                  "chunkSize": 2000
            },
            "typeVersion": 1
      },
      {
            "id": "7ee0e861-1576-4b0c-b2ef-3fc023371907",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  1420,
                  240
            ],
            "webhookId": "65f501de-3c14-4089-9b9d-8956676bebf3",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "jSdrxiRKb8yfG6Ty",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "bcf1e82e-0e83-4783-a59f-857a6d1528b6",
            "name": "Verify Message Type",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1620,
                  240
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Text",
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
                                                            "type": "array",
                                                            "operation": "contains",
                                                            "rightType": "any"
                                                      },
                                                      "leftValue": "={{ $json.message.keys()}}",
                                                      "rightValue": "text"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Audio",
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
                                                      "id": "d16eb899-cccb-41b6-921e-172c525ff92c",
                                                      "operator": {
                                                            "type": "array",
                                                            "operation": "contains",
                                                            "rightType": "any"
                                                      },
                                                      "leftValue": "={{ $json.message.keys()}}",
                                                      "rightValue": "voice"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "extra"
                  }
            },
            "typeVersion": 3.2,
            "alwaysOutputData": false
      },
      {
            "id": "d403f864-c781-48fc-a62b-de0c8bfedf06",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2340,
                  380
            ],
            "parameters": {
                  "options": {},
                  "resource": "audio",
                  "operation": "transcribe",
                  "binaryPropertyName": "=data"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "J2D6m1evHLUJOMhO",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "5b17c8f1-4bee-4f2a-abcb-74fe72d4cdfd",
            "name": "Telegram1",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2120,
                  380
            ],
            "parameters": {
                  "fileId": "={{ $json.message.voice.file_id }}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "jSdrxiRKb8yfG6Ty",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "cc6862cb-acfc-465b-b142-dd5fdc12fb13",
            "name": "Unsupported Message Type",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2200,
                  560
            ],
            "parameters": {
                  "text": "I'm not able to process this message type.",
                  "chatId": "={{ $json.message.chat.id }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "jSdrxiRKb8yfG6Ty",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "8b97aaa1-ea0d-4b11-89c9-9ac6376c0760",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2860,
                  400
            ],
            "parameters": {
                  "text": "={{ $json.text }}",
                  "options": {
                        "systemMessage": "You are a helpful assistant for HR and employee policies"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "e0d5416e-a799-46a2-83e3-fa6919ec0e36",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2800,
                  840
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "J2D6m1evHLUJOMhO",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "9149f41d-692e-49bc-ad70-848492d2c345",
            "name": "Postgres Chat Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryPostgresChat",
            "position": [
                  3060,
                  840
            ],
            "parameters": {
                  "sessionKey": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "sessionIdType": "customKey"
            },
            "credentials": {
                  "postgres": {
                        "id": "wQK6JXyS5y1icHw3",
                        "name": "Postgres account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "a1f68887-da44-4bff-86fc-f607a5bd0ab6",
            "name": "Answer questions with a vector store",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "position": [
                  3360,
                  580
            ],
            "parameters": {
                  "name": "hr_employee_policies",
                  "description": "data for HR and employee policies"
            },
            "typeVersion": 1
      },
      {
            "id": "76220fe4-2448-4b32-92d8-68c564cc702d",
            "name": "Postgres PGVector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePGVector",
            "position": [
                  3220,
                  780
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "postgres": {
                        "id": "wQK6JXyS5y1icHw3",
                        "name": "Postgres account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "055fd294-7483-45ce-b58a-c90075199f5f",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  3640,
                  780
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "J2D6m1evHLUJOMhO",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "cc13eac7-8163-45bf-8d8a-9cf72659e357",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  3300,
                  920
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "J2D6m1evHLUJOMhO",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "d46e415e-75ff-46b8-b382-cdcda216b1ed",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  4200,
                  420
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "={{ $('Telegram Trigger').first().json.message.chat.id }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "jSdrxiRKb8yfG6Ty",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "ddf623a1-0a5e-48c9-b897-6a339895a891",
            "name": "Edit Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  2120,
                  200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "403b336f-87ce-4bef-a5f2-1640425f8198",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $json.message.text }}"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "4ae84e17-cfc1-425c-930d-949da7308b78",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1340,
                  -280
            ],
            "parameters": {
                  "color": 4,
                  "width": 1300,
                  "height": 1020,
                  "content": "## 3. Handling Messages with Fallback Support\n\nThis workflow processes Telegram messages to handle **text** and **voice** inputs, with a fallback for unsupported message types. Here’s how it works:\n\n1. **Trigger Node**:\n - The workflow starts with a Telegram trigger that listens for incoming messages.\n\n2. **Message Type Check**:\n - The workflow verifies the type of message received:\n - **Text Message**: If the message contains `$json.message.text`, it is sent directly to the agent.\n - **Voice Message**: If the message contains `$json.message.voice`, the audio is transcribed into text using a transcription service, and the result is sent to the agent.\n\n3. **Fallback Path**:\n - If the message is neither text nor voice, a fallback response is returned:\n `\"Sorry, I couldn’t process your message. Please try again.\"`\n\n4. **Unified Output**:\n - Both text messages and transcribed voice messages are converted into the same format before sending to the agent, ensuring consistency in handling.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "86ad4e08-ef2d-405e-8861-bff38e1db651",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  220,
                  220
            ],
            "parameters": {
                  "width": 260,
                  "height": 80,
                  "content": "The setup needs to be run at the start or when data is changed"
            },
            "typeVersion": 1
      },
      {
            "id": "b05c4437-00fb-40f6-87fa-8dc564b16005",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2680,
                  -280
            ],
            "parameters": {
                  "color": 4,
                  "width": 1180,
                  "height": 1420,
                  "content": "## 4. HR & IT AI Agent Provides Helpdesk Support \nn8n's AI agents allow you to create intelligent and interactive workflows that can access and retrieve data from internal knowledgebases. In this workflow, the AI agent is configured to provide answers for HR and IT queries by performing Retrieval-Augmented Generation (RAG) on internal documents.\n\n### How It Works:\n- **Internal Knowledgebase Access**: A **Vector store tool** is used to connect the agent to the HR & IT knowledgebase built earlier in the workflow. This enables the agent to fetch accurate and specific answers for employee queries.\n- **Chat Memory**: A **Chat memory subnode** tracks the conversation, allowing the agent to maintain context across multiple queries from the same user, creating a personalized and cohesive experience.\n- **Dynamic Query Responses**: Whether employees ask about policies, leave balances, or technical troubleshooting, the agent retrieves relevant data from the vector store and crafts a natural language response.\n\nBy integrating the AI agent with a vector store and chat memory, this workflow empowers your HR & IT helpdesk chatbot to provide quick, accurate, and conversational support to employees. \n\nPostgrSQL is used for all steps to simplify development in production."
            },
            "typeVersion": 1
      },
      {
            "id": "b266ca42-de62-4341-9aff-33ee0ac68045",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3900,
                  300
            ],
            "parameters": {
                  "color": 4,
                  "width": 540,
                  "height": 280,
                  "content": "## 5. Send Message\n\nThe simplest and most important part :)"
            },
            "typeVersion": 1
      }
],
    connections: {
      "OpenAI": {
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
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Telegram",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram1": {
            "main": [
                  [
                        {
                              "node": "OpenAI",
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
                              "node": "AI Agent",
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
                              "node": "Extract from File",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Trigger": {
            "main": [
                  [
                        {
                              "node": "Verify Message Type",
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
                              "node": "Create HR Policies",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract from File": {
            "main": [
                  [
                        {
                              "node": "Create HR Policies",
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
                              "node": "AI Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI1": {
            "ai_embedding": [
                  [
                        {
                              "node": "Postgres PGVector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Answer questions with a vector store",
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
                              "node": "Create HR Policies",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Verify Message Type": {
            "main": [
                  [
                        {
                              "node": "Edit Fields",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Telegram1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Unsupported Message Type",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Postgres Chat Memory": {
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
      "Postgres PGVector Store": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Answer questions with a vector store",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Recursive Character Text Splitter": {
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
      "When clicking ‘Test workflow’": {
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
      "Answer questions with a vector store": {
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
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "HR Job Posting and Evaluation with AI",
    nodes: [
      {
            "id": "450e15b2-bddf-4853-b44e-822facaac14d",
            "name": "On form submission",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  -700,
                  -80
            ],
            "webhookId": "18f7428c-9990-413f-aff3-bdcca1bbbe2d",
            "parameters": {
                  "options": {
                        "path": "automation-specialist-application",
                        "ignoreBots": false,
                        "buttonLabel": "Submit",
                        "appendAttribution": false,
                        "useWorkflowTimezone": true
                  },
                  "formTitle": "Job Application",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "First Name",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "Last Name",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "email",
                                    "fieldLabel": "Email",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "number",
                                    "fieldLabel": "Phone",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "number",
                                    "fieldLabel": "Years of experience",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "file",
                                    "fieldLabel": "Upload your CV",
                                    "requiredField": true,
                                    "acceptFileTypes": ".pdf"
                              }
                        ]
                  },
                  "formDescription": "=Fill this for to apply for the role Automation Specialist:\n\nLocation: Remote\nExperience: Minimum 3 years\nEmployment Type: Full-time\n\nJob Description:\nWe are seeking a highly skilled Automation Specialist with at least 3 years of experience in designing and implementing workflow automation solutions. The ideal candidate will have expertise in tools such as n8n, Zapier, Make.com, or similar platforms, and a strong background in integrating APIs, streamlining processes, and enhancing operational efficiency.\n\nKey Responsibilities:\n\n Develop and implement automated workflows to optimize business processes.\n Integrate third-party APIs and systems to create seamless data flow.\n Analyze, debug, and improve existing automation setups.\n Collaborate with cross-functional teams to identify automation opportunities.\n Monitor and maintain automation systems to ensure reliability.\n\nRequired Skills & Qualifications:\n\n Proven 3+ years of experience in workflow automation and integration.\n Proficiency with tools like n8n, Zapier, or Make.com.\n Strong understanding of APIs, webhooks, and data transformation.\n Familiarity with scripting languages (e.g., JavaScript or Python).\n Excellent problem-solving and communication skills.\n\nPreferred Qualifications:\n\n Experience with database management and cloud services.\n Background in business process analysis or RPA tools.\n\nWhy Join Us?\n\n Opportunity to work on cutting-edge automation projects.\n Supportive and collaborative team environment.\n Competitive salary and benefits package."
            },
            "typeVersion": 2.2
      },
      {
            "id": "5005e9ba-a68a-4795-8a65-22374a182bdb",
            "name": "Airtable",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  -60,
                  -80
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "columns": {
                        "value": {
                              "Name": "={{ $json.Name }}",
                              "Phone": "={{ $json.Phone }}",
                              "CV Link": "={{ $json[\"CV link\"] }}",
                              "Applying for": "=[\"Automation Specialist\"]",
                              "Email address": "={{ $json.email }}"
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
                                    "id": "Email address",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "No hire",
                                                "value": "No hire"
                                          },
                                          {
                                                "name": "Interviewing",
                                                "value": "Interviewing"
                                          },
                                          {
                                                "name": "Decision needed",
                                                "value": "Decision needed"
                                          },
                                          {
                                                "name": "Hire",
                                                "value": "Hire"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Stage",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Applying for",
                                    "type": "array",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Applying for",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Link",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "JD CV score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "JD CV score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Attachments",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Attachments",
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
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "b291527b-9937-4388-a712-2b60dd292f65",
            "name": "Upload CV to google drive",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  -480,
                  -80
            ],
            "parameters": {
                  "name": "={{ $binary.Upload_your_CV.fileName }}",
                  "driveId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "My Drive"
                  },
                  "options": {},
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1u_YBpqSU5TjNsu72sQKFMIesb62JKHXz",
                        "cachedResultUrl": "https://drive.google.com/drive/folders/1u_YBpqSU5TjNsu72sQKFMIesb62JKHXz",
                        "cachedResultName": "HR Test"
                  },
                  "inputDataFieldName": "Upload_your_CV"
            },
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "MHcgKR744VHXSe3X",
                        "name": "Drive n8n"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "83a965f9-bdb1-42ca-9701-24a82438ea0e",
            "name": "applicant details",
            "type": "n8n-nodes-base.set",
            "position": [
                  -260,
                  -80
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "bffff778-859a-4bb8-b973-39237ce7486e",
                                    "name": "Name",
                                    "type": "string",
                                    "value": "={{ $('On form submission').item.json['First Name'] + \" \" + $('On form submission').item.json['Last Name'] }}"
                              },
                              {
                                    "id": "cd6e7372-c65f-4e6f-9612-6ea513bb8e15",
                                    "name": "Phone",
                                    "type": "number",
                                    "value": "={{ $('On form submission').item.json.Phone }}"
                              },
                              {
                                    "id": "eb19138e-7ff3-4f0c-ad95-ac33f8835717",
                                    "name": "email",
                                    "type": "string",
                                    "value": "={{ $('On form submission').item.json.Email }}"
                              },
                              {
                                    "id": "25172db9-91fb-45da-b036-ee9aea1e8b09",
                                    "name": "Experience",
                                    "type": "number",
                                    "value": "={{ $('On form submission').item.json[\"Years of experience\"] }}"
                              },
                              {
                                    "id": "64393285-3770-47e0-bbbb-3c5d5e14f1f4",
                                    "name": "Applied On",
                                    "type": "string",
                                    "value": "={{ $('On form submission').item.json.submittedAt }}"
                              },
                              {
                                    "id": "dc052fd6-f57d-4da1-9976-67fcd9496e58",
                                    "name": "CV link",
                                    "type": "string",
                                    "value": "={{ $json.webViewLink }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "41038c1c-876d-46a6-9dcc-f40c77e834df",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -720,
                  -160
            ],
            "parameters": {
                  "color": 3,
                  "width": 760,
                  "height": 220,
                  "content": "## Grab User Details and Update in Airtable\n"
            },
            "typeVersion": 1
      },
      {
            "id": "d0f85487-8e78-4cde-8ecb-a55ab94940cc",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  120,
                  -180
            ],
            "parameters": {
                  "width": 820,
                  "height": 460,
                  "content": "## Download the CV and get the job description and requirements.\n- ### Send the details to ChatGPT to score the viability of the candidate"
            },
            "typeVersion": 1
      },
      {
            "id": "334c4580-a0e6-45f0-9b3a-3904eb80b3e8",
            "name": "download CV",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  140,
                  -80
            ],
            "parameters": {
                  "fileId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "={{ $json.fields[\"CV Link\"] }}"
                  },
                  "options": {},
                  "operation": "download"
            },
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "MHcgKR744VHXSe3X",
                        "name": "Drive n8n"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "b7d8013a-71bd-49a4-a58f-f63186e1b6d8",
            "name": "Extract from File",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  360,
                  -80
            ],
            "parameters": {
                  "options": {},
                  "operation": "pdf"
            },
            "typeVersion": 1
      },
      {
            "id": "22ba7844-9f20-41b1-96bb-f2e33e18d14a",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  580,
                  -80
            ],
            "parameters": {
                  "text": "=Compare the following job description and resume. Assign a qualification score between 0 and 1, where 1 indicates the best match. Provide only the score and the reason for the score in less than 20 words.\nJob Description: Use Airtable tool to get the job description\nResume: \n{{ $json.text }}",
                  "options": {},
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "5f0317cb-35a5-4e57-938d-0d604c1f7f4f",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  500,
                  120
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "0Q6M4JEKewP9VKl8",
                        "name": "Bulkbox"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d040091b-282b-4bb7-8a82-de3030c14b91",
            "name": "Airtable1",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  700,
                  120
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbljhmLdPULqSya0d",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tbljhmLdPULqSya0d",
                        "cachedResultName": "Positions"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "fba48717-a068-44de-a776-6e0c14ebd667",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  820,
                  120
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n \"score\": 0.8,\n \"reason\": \"Does not meet required number of experience in years\"\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "2eef8181-3e4d-4c66-acd7-d440eb2f6748",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  960,
                  -340
            ],
            "parameters": {
                  "color": 2,
                  "width": 1200,
                  "height": 600,
                  "content": "## Update Airtable with score and reason for the score\n\n- ### if score is above 0.7, shortlist and continue flow.\n\n## Get questionnaires based on the JD and CV\n\n- ### Update the responses in Airtable"
            },
            "typeVersion": 1
      },
      {
            "id": "ed42fa6c-be05-4d62-aa1f-390b5fc471dd",
            "name": "shortlisted?",
            "type": "n8n-nodes-base.if",
            "position": [
                  960,
                  -80
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
                                    "id": "7b4950b2-d218-4911-89cd-22a60b7465d8",
                                    "operator": {
                                          "type": "number",
                                          "operation": "gte"
                                    },
                                    "leftValue": "={{ $json.output.score }}",
                                    "rightValue": 0.7
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "6df70bee-6a9f-43f6-8c39-46663b572f5c",
            "name": "Rejected",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1240,
                  60
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('Airtable').item.json.id }}",
                              "Stage": "No hire",
                              "JD CV score": "={{ $json.output.score }}",
                              "CV Score Notes": "={{ $json.output.reason }}"
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
                                    "id": "Email address",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "No hire",
                                                "value": "No hire"
                                          },
                                          {
                                                "name": "Interviewing",
                                                "value": "Interviewing"
                                          },
                                          {
                                                "name": "Decision needed",
                                                "value": "Decision needed"
                                          },
                                          {
                                                "name": "Hire",
                                                "value": "Hire"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Stage",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Applying for",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Applying for",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Link",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "JD CV score",
                                    "type": "number",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "JD CV score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Score Notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Score Notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Attachments",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Attachments",
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
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "888869bb-6fca-4d91-8428-cf5159d410e3",
            "name": "Potential Hire",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1240,
                  -140
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('Airtable').item.json.id }}",
                              "Stage": "Interviewing",
                              "JD CV score": "={{ $json.output.score }}",
                              "CV Score Notes": "={{ $json.output.reason }}"
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
                                    "id": "Email address",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "No hire",
                                                "value": "No hire"
                                          },
                                          {
                                                "name": "Interviewing",
                                                "value": "Interviewing"
                                          },
                                          {
                                                "name": "Decision needed",
                                                "value": "Decision needed"
                                          },
                                          {
                                                "name": "Hire",
                                                "value": "Hire"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Stage",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Applying for",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Applying for",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Link",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "JD CV score",
                                    "type": "number",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "JD CV score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Score Notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Score Notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Attachments",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Attachments",
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
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "8f59889d-dff7-4eef-85f4-7c6d9e171c17",
            "name": "Airtable2",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  1560,
                  100
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbljhmLdPULqSya0d",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tbljhmLdPULqSya0d",
                        "cachedResultName": "Positions"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "8358ab12-a0b9-4a21-b9eb-7054716b6f5b",
            "name": "generate questionnaires",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1460,
                  -140
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
                                    "content": "=Given the following job description and candidate CV, create 5 insightful interview questions to gather more information about the candidate's suitability for the role. The questions should focus on:\n\n Specific projects the candidate has worked on.\n Key responsibilities and achievements in their previous roles.\n Skills relevant to the job description.\n Problem-solving abilities and how they handled challenges.\n Alignment with the company’s goals and values.\n\nProvide the questions in a clear, concise format.\n\nJob Description:\nUse the airtable tool to get the job description\n\nCandidate CV:\n{{ $('Extract from File').item.json.text }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "lcpI0YZU9bebg3uW",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "21ffd179-42d9-4da3-9f1b-e2bbeb9cdee7",
            "name": "questionnaires",
            "type": "n8n-nodes-base.form",
            "position": [
                  1820,
                  -140
            ],
            "webhookId": "3f654280-b5d0-4392-824f-bc384d91a1df",
            "parameters": {
                  "options": {
                        "formTitle": "Questionnaires",
                        "buttonLabel": "Submit",
                        "formDescription": "Kindly fill in the following questions to proceed."
                  },
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "={{ $json.message.content.interview_questions[0].question }}",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "={{ $json.message.content.interview_questions[1].question }}",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "={{ $json.message.content.interview_questions[2].question }}",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "={{ $json.message.content.interview_questions[3].question }}",
                                    "requiredField": true
                              },
                              {
                                    "fieldLabel": "={{ $json.message.content.interview_questions[4].question }}",
                                    "requiredField": true
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "29a228ca-6b8e-458f-a030-372b50151a94",
            "name": "update questionnaires",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2040,
                  -140
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('Airtable').item.json.id }}",
                              "Questonnaires and responses": "={{ $('generate questionnaires').item.json.message.content.interview_questions[0].question }}: {{ $json['Can you describe one of the most complex automation projects you worked on, particularly detailing your role and the technologies you used?'] }}\n\n\n{{ $('generate questionnaires').item.json.message.content.interview_questions[1].question }}: {{ $json['What specific achievements in your previous roles do you believe demonstrate your ability to meet the responsibilities listed in the Automation Specialist position?'] }}\n\n\n{{ $('generate questionnaires').item.json.message.content.interview_questions[2].question }}: {{ $json['Given your experience with automation tools like n8n and APIs, can you provide an example of how you\\'ve successfully integrated different systems to improve operational efficiency?'] }}\n\n\n{{ $('generate questionnaires').item.json.message.content.interview_questions[3].question }}: {{ $json['Describe a challenging situation you faced during a project, how you approached the problem, and what the outcome was.'] }}\n\n\n{{ $('generate questionnaires').item.json.message.content.interview_questions[4].question }}: {{ $json['How do your values and career goals align with our company\\'s mission to optimize and enhance automation solutions?'] }}\n\n"
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
                                    "id": "Email address",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "No hire",
                                                "value": "No hire"
                                          },
                                          {
                                                "name": "Interviewing",
                                                "value": "Interviewing"
                                          },
                                          {
                                                "name": "Decision needed",
                                                "value": "Decision needed"
                                          },
                                          {
                                                "name": "Hire",
                                                "value": "Hire"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Stage",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Applying for",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Applying for",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Link",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "JD CV score",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "JD CV score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Score Notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Score Notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Questonnaires and responses",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Questonnaires and responses",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Attachments",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Attachments",
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
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "9a72a172-4272-4715-8e57-75ca010bc0e5",
            "name": "job_posting",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  2300,
                  100
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbljhmLdPULqSya0d",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tbljhmLdPULqSya0d",
                        "cachedResultName": "Positions"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "28c210c8-5684-4683-a168-5a02b39eb0f2",
            "name": "candidate_insights",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  2420,
                  100
            ],
            "parameters": {
                  "id": "={{ $('update questionnaires').item.json.id }}",
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "options": {}
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "6e6f43f4-43a7-426f-b3c7-264a7980c771",
            "name": "Personalize email",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2260,
                  -140
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
                                    "content": "=Craft a personalized email to the interviewee, expressing interest in continuing the conversation over a phone call. The email should mention strengths or achievements from their CV or questionnaire responses, and include a polite request to have the phone conversation. Ensure the tone is professional and warm.\n\nProvide an output of \nTo:\nSubject:\nEmail Content:\n\nInputs:\n\n The candidate's CV.\n The job description.\n The candidate's questionnaire responses stored in Airtable.\n\n\nExample email:\nDear [Candidate's Name],\n\nThank you for submitting your application and responses to the questionnaire for the [Job Title] position. We were impressed by [specific strength or achievement from their CV or questionnaire, e.g., \"your experience in automating workflows using n8n, which aligns closely with our goals\"].\n\nWe’d love to continue the conversation to discuss your experience further. \n\nLooking forward to speaking with you soon.\n\n\n\nNOTE: \nSign off the email with\n\nRegards,\nFrancis"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "lcpI0YZU9bebg3uW",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "ee3f1a4e-d262-461d-93c5-9aed81de9825",
            "name": "Edit Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  2620,
                  -140
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b3d6e85e-c478-452d-aafc-c325dfbe2c9b",
                                    "name": "To",
                                    "type": "string",
                                    "value": "={{ $json.message.content.To }}"
                              },
                              {
                                    "id": "f24eb1d5-fa61-48ce-8685-a0b2022bf576",
                                    "name": "Subject",
                                    "type": "string",
                                    "value": "={{ $json.message.content.Subject }}"
                              },
                              {
                                    "id": "25de1423-b66a-4389-906f-8b0c9c1d3826",
                                    "name": "Email Content",
                                    "type": "string",
                                    "value": "={{ $json.message.content['Email Content'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "7454b4ea-1b43-4a4a-8623-7848c13298c7",
            "name": "Send Email",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  2840,
                  -140
            ],
            "parameters": {
                  "text": "={{ $json['Email Content'] }}",
                  "options": {
                        "appendAttribution": false
                  },
                  "subject": "={{ $json.Subject }}",
                  "toEmail": "={{ $json.To }}",
                  "fromEmail": "gatura@bulkbox.co.ke",
                  "emailFormat": "text"
            },
            "credentials": {
                  "smtp": {
                        "id": "FRchTiFJGPeC5YNE",
                        "name": "SMTP account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "92be970b-8514-4842-bbc9-f6680681df60",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2220,
                  -280
            ],
            "parameters": {
                  "color": 5,
                  "width": 1340,
                  "height": 480,
                  "content": "## Personalize email and send\n\n## Schedule Meeting and update meeting time in AIrtable"
            },
            "typeVersion": 1
      },
      {
            "id": "38a7f43b-f7b2-4dda-8dea-045d637870e8",
            "name": "Book Meeting",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  3060,
                  -140
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
                                    "content": "=Check the interviewer's calendar for available 30-minute time slots within working hours (8 AM - 5 PM) the next day. Schedule the meeting and confirm the time with the candidate. Ensure that the meeting time is aligned with the candidate's and interviewer's availability.\n\nInputs:\n\n The interviewer's calendar for scheduling.\n Today's date: {{ $today }}\n\nUse the calendar tool to book the meeting\n\n\nGive back the follwoing information:\nStart time:\nEnd time:"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "lcpI0YZU9bebg3uW",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "b6a94b8c-8c92-49f2-931b-44d23f627152",
            "name": "Google Calendar",
            "type": "n8n-nodes-base.googleCalendarTool",
            "position": [
                  3160,
                  80
            ],
            "parameters": {
                  "end": "={{ $fromAI(\"end_time\", \"The end time for the meeting\", \"string\", \"2025-01-01T09:00:00Z\") }}",
                  "start": "={{ $fromAI(\"start_time\", \"The start time for the meeting\", \"string\", \"2025-01-01T09:00:00Z\") }}\n",
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gaturanjenga@gmail.com",
                        "cachedResultName": "gaturanjenga@gmail.com"
                  },
                  "additionalFields": {
                        "location": "=Online"
                  }
            },
            "credentials": {
                  "googleCalendarOAuth2Api": {
                        "id": "nzPOQoEN0ibAA9xT",
                        "name": "Google Calendar account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "9ff2433f-c2f8-4716-aa22-92fb1e4028dd",
            "name": "update phone meeting time",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  3440,
                  -140
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('update questionnaires').item.json.id }}",
                              "Phone interview": "={{ $json.message.content['Start time'] }}"
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
                                    "id": "Email address",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "No hire",
                                                "value": "No hire"
                                          },
                                          {
                                                "name": "Interviewing",
                                                "value": "Interviewing"
                                          },
                                          {
                                                "name": "Decision needed",
                                                "value": "Decision needed"
                                          },
                                          {
                                                "name": "Hire",
                                                "value": "Hire"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Stage",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Applying for",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Applying for",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Link",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "JD CV score",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "JD CV score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Score Notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Score Notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Questonnaires and responses",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Questonnaires and responses",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Attachments",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Attachments",
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
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "a9233b89-c4a4-4c68-bb88-ce34381f9c99",
            "name": "Screening Questions",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  3660,
                  -140
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
                                    "content": "=Given the job description, along with the candidate's CV and their responses to the questionnaires, generate a list of screening questions that will help gauge the candidate's suitability for the role. The questions should focus on understanding the candidate’s relevant experience, skills, and cultural fit. The questions should take into account both the job description and the candidate's background and responses. Provide a minimum of 5 questions.\n\nUse the tools to get the job description and the applicant's responses to the questionnaires.\n\nApplicant's CV:\n{{ $('Extract from File').item.json.text }}\n\n\nGive the output as various sentences as a paragraph with every new question in a new line:\nScreening Questions:"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "lcpI0YZU9bebg3uW",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "de53c452-bd8f-4bdb-88a9-152f287bd796",
            "name": "job_posting1",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  3680,
                  80
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbljhmLdPULqSya0d",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tbljhmLdPULqSya0d",
                        "cachedResultName": "Positions"
                  },
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "dcca85af-d194-427c-83a1-3ef686e4e4c4",
            "name": "candidate_insights1",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  3880,
                  80
            ],
            "parameters": {
                  "id": "={{ $('update questionnaires').item.json.id }}",
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "options": {}
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "092bc9a2-7d22-436c-a625-f182a55caf06",
            "name": "screening questions",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  4240,
                  -140
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appublMkWVQfHkZ09",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09",
                        "cachedResultName": "Simple applicant tracker"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblllvQaRTSnEr17a",
                        "cachedResultUrl": "https://airtable.com/appublMkWVQfHkZ09/tblllvQaRTSnEr17a",
                        "cachedResultName": "Applicants"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('update phone meeting time').item.json.id }}",
                              "Phne interview screening questions": "={{ $json['Screening Questions'] }}"
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
                                    "id": "Email address",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Email address",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "No hire",
                                                "value": "No hire"
                                          },
                                          {
                                                "name": "Interviewing",
                                                "value": "Interviewing"
                                          },
                                          {
                                                "name": "Decision needed",
                                                "value": "Decision needed"
                                          },
                                          {
                                                "name": "Hire",
                                                "value": "Hire"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Stage",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Applying for",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Applying for",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Link",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "JD CV score",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "JD CV score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "CV Score Notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "CV Score Notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Questonnaires and responses",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Questonnaires and responses",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phne interview screening questions",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phne interview screening questions",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Phone interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Phone interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interviewer",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interviewer",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview score",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "0 – No hire",
                                                "value": "0 – No hire"
                                          },
                                          {
                                                "name": "1 – Probably no hire",
                                                "value": "1 – Probably no hire"
                                          },
                                          {
                                                "name": "2 – Worth consideration",
                                                "value": "2 – Worth consideration"
                                          },
                                          {
                                                "name": "3 – Good candidate",
                                                "value": "3 – Good candidate"
                                          },
                                          {
                                                "name": "4 – Please hire this person",
                                                "value": "4 – Please hire this person"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview score",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Onsite interview notes",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Onsite interview notes",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Attachments",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Attachments",
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
                        "id": "gQtK3HX661rFA6KW",
                        "name": "gaturanjenga account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "c466c71b-ab9d-41f0-9467-975f62a80ad6",
            "name": "Edit Fields1",
            "type": "n8n-nodes-base.set",
            "position": [
                  4020,
                  -140
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "d51edc4a-60cd-41fe-8cc3-afc3c266d588",
                                    "name": "Screening Questions",
                                    "type": "string",
                                    "value": "={{ $json.message.content['Screening Questions'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "4bfab808-9353-4293-8e21-f8ca64095aaa",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3640,
                  -200
            ],
            "parameters": {
                  "width": 720,
                  "height": 420,
                  "content": "## Generate Screening Questions and post to Airtable"
            },
            "typeVersion": 1
      },
      {
            "id": "9635d334-8ff7-4c16-813e-d91a5765c252",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1300,
                  -300
            ],
            "parameters": {
                  "width": 580,
                  "height": 460,
                  "content": "## Actions\n- ### Change the `Form Description` with the job description you are hiring for.\n- ### Make sure to check and change the prompts if need be to suit your use case.\n- ### Use the Simple Applicant Tracker template on Airtable to set up the tables required."
            },
            "typeVersion": 1
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "shortlisted?",
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
                              "node": "download CV",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Airtable1": {
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
      "Airtable2": {
            "ai_tool": [
                  [
                        {
                              "node": "generate questionnaires",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Email": {
            "main": [
                  [
                        {
                              "node": "Book Meeting",
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
                              "node": "Send Email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "download CV": {
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
      "job_posting": {
            "ai_tool": [
                  [
                        {
                              "node": "Personalize email",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Book Meeting": {
            "main": [
                  [
                        {
                              "node": "update phone meeting time",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Edit Fields1": {
            "main": [
                  [
                        {
                              "node": "screening questions",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "job_posting1": {
            "ai_tool": [
                  [
                        {
                              "node": "Screening Questions",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "shortlisted?": {
            "main": [
                  [
                        {
                              "node": "Potential Hire",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Rejected",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Potential Hire": {
            "main": [
                  [
                        {
                              "node": "generate questionnaires",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "questionnaires": {
            "main": [
                  [
                        {
                              "node": "update questionnaires",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Calendar": {
            "ai_tool": [
                  [
                        {
                              "node": "Book Meeting",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract from File": {
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
      "Personalize email": {
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
      "applicant details": {
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
      "On form submission": {
            "main": [
                  [
                        {
                              "node": "Upload CV to google drive",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "candidate_insights": {
            "ai_tool": [
                  [
                        {
                              "node": "Personalize email",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Screening Questions": {
            "main": [
                  [
                        {
                              "node": "Edit Fields1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "candidate_insights1": {
            "ai_tool": [
                  [
                        {
                              "node": "Screening Questions",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "update questionnaires": {
            "main": [
                  [
                        {
                              "node": "Personalize email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "generate questionnaires": {
            "main": [
                  [
                        {
                              "node": "questionnaires",
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
                              "node": "AI Agent",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload CV to google drive": {
            "main": [
                  [
                        {
                              "node": "applicant details",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "update phone meeting time": {
            "main": [
                  [
                        {
                              "node": "Screening Questions",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {
      "timezone": "Africa/Nairobi",
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1"
},
  },
];

export function HrRecruitmentCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25 border border-orange-600' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50 hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:border-orange-300 dark:hover:border-orange-600/50 hover:shadow-md'}`}
    >
      <Users className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-500 dark:text-orange-400'}`} />
      <span className="truncate max-w-[200px]">HR and Recruitment</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {hrRecruitmentTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function HrRecruitmentTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {hrRecruitmentTemplates.map((tpl, i) => (
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
