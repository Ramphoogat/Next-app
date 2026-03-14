import React from 'react';
import { Play, Puzzle } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const otherIntegrationsTemplates: IN8nTemplate[] = [
  {
    name: "Analyze the sentiment of feedback and send a message on Mattermost",
    nodes: [
      {
            "name": "Typeform Trigger",
            "type": "n8n-nodes-base.typeformTrigger",
            "position": [
                  510,
                  260
            ],
            "webhookId": "ad8a87ef-d293-4e48-8d36-838d69ebce0f",
            "parameters": {
                  "formId": ""
            },
            "credentials": {
                  "typeformApi": "typeform"
            },
            "typeVersion": 1
      },
      {
            "name": "Google Cloud Natural Language",
            "type": "n8n-nodes-base.googleCloudNaturalLanguage",
            "position": [
                  710,
                  260
            ],
            "parameters": {
                  "content": "={{$node[\"Typeform Trigger\"].json[\"What did you think about the event?\"]}}",
                  "options": {}
            },
            "credentials": {
                  "googleCloudNaturalLanguageOAuth2Api": "cloud"
            },
            "typeVersion": 1
      },
      {
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "position": [
                  910,
                  260
            ],
            "parameters": {
                  "conditions": {
                        "number": [
                              {
                                    "value1": "={{$node[\"Google Cloud Natural Language\"].json[\"documentSentiment\"][\"score\"]}}"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Mattermost",
            "type": "n8n-nodes-base.mattermost",
            "position": [
                  1110,
                  160
            ],
            "parameters": {
                  "message": "=You got a new feedback with a score of {{$node[\"Google Cloud Natural Language\"].json[\"documentSentiment\"][\"score\"]}}. Here is what it says:{{$node[\"Typeform Trigger\"].json[\"What did you think about the event?\"]}}",
                  "channelId": "4h1bz64cyifwxnzojkzh8hxh4a",
                  "attachments": [],
                  "otherOptions": {}
            },
            "credentials": {
                  "mattermostApi": "mattermost"
            },
            "typeVersion": 1
      },
      {
            "name": "NoOp",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1110,
                  360
            ],
            "parameters": {},
            "typeVersion": 1
      }
],
    connections: {
      "IF": {
            "main": [
                  [
                        {
                              "node": "Mattermost",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "NoOp",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Typeform Trigger": {
            "main": [
                  [
                        {
                              "node": "Google Cloud Natural Language",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Cloud Natural Language": {
            "main": [
                  [
                        {
                              "node": "IF",
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
    name: "Analyze Feedback Using AWS Comprehend And Send It To A Mattermost Channel",
    nodes: [
      {
            "name": "Mattermost",
            "type": "n8n-nodes-base.mattermost",
            "position": [
                  810,
                  300
            ],
            "parameters": {
                  "message": "=You got new feedback with a score of {{$json[\"SentimentScore\"][\"Negative\"]}}. Here is what it says:{{$node[\"Typeform Trigger\"].json[\"What did you think about the event?\"]}}",
                  "channelId": "h7cxrd1cefr13x689enzyw7xhc",
                  "attachments": [],
                  "otherOptions": {}
            },
            "credentials": {
                  "mattermostApi": "Mattermost Credentials"
            },
            "typeVersion": 1
      },
      {
            "name": "NoOp",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  800,
                  500
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "position": [
                  600,
                  400
            ],
            "parameters": {
                  "conditions": {
                        "number": [],
                        "string": [
                              {
                                    "value1": "={{$json[\"Sentiment\"]}}",
                                    "value2": "NEGATIVE"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "AWS Comprehend",
            "type": "n8n-nodes-base.awsComprehend",
            "position": [
                  400,
                  400
            ],
            "parameters": {
                  "text": "={{$json[\"What did you think about the event?\"]}}",
                  "operation": "detectSentiment"
            },
            "credentials": {
                  "aws": "AWS Comprehend Credentials"
            },
            "typeVersion": 1
      },
      {
            "name": "Typeform Trigger",
            "type": "n8n-nodes-base.typeformTrigger",
            "position": [
                  200,
                  400
            ],
            "webhookId": "ad8a87ef-d293-4e48-8d36-838d69ebce0f",
            "parameters": {
                  "formId": "DuJHEGW5"
            },
            "credentials": {
                  "typeformApi": "typeform"
            },
            "typeVersion": 1
      }
],
    connections: {
      "IF": {
            "main": [
                  [
                        {
                              "node": "Mattermost",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "NoOp",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "AWS Comprehend": {
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
      "Typeform Trigger": {
            "main": [
                  [
                        {
                              "node": "AWS Comprehend",
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
    name: "API Schema Extractor",
    nodes: [
      {
            "id": "2498bb93-176f-458c-acee-f541859df770",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  2460,
                  2820
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "c08bcf84-9336-44f9-b452-0c9469f18f48",
            "name": "Web Search For API Schema",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueRegularOutput",
            "position": [
                  3100,
                  3820
            ],
            "parameters": {
                  "url": "https://api.apify.com/v2/acts/serping~fast-google-search-results-scraper/run-sync-get-dataset-items",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "authentication": "genericCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "searchTerms",
                                    "value": "={{\n[\n `site:${$json.data.url.replace(/^http[s]:\\/\\//, '').replace(/\\/$/, '').replace('www.', '')} \"${$json.data.service}\" api developer (intext:reference OR intext:resource) (-inurl:support OR -inurl:help) (inurl:api OR intitle:api) -filetype:pdf`\n]\n}}"
                              },
                              {
                                    "name": "resultsPerPage",
                                    "value": "={{ 10 }}"
                              }
                        ]
                  },
                  "genericAuthType": "httpHeaderAuth"
            },
            "typeVersion": 4.2
      },
      {
            "id": "d5b19e3a-acd0-4b06-8d77-42de1f797dba",
            "name": "Scrape Webpage Contents",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  3940,
                  3720
            ],
            "parameters": {
                  "url": "https://api.apify.com/v2/acts/apify~web-scraper/run-sync-get-dataset-items",
                  "options": {
                        "batching": {
                              "batch": {
                                    "batchSize": 2,
                                    "batchInterval": 30000
                              }
                        }
                  },
                  "jsonBody": "={\n \"startUrls\": [\n {\n \"url\": \"{{ $json.source.link }}\",\n \"method\": \"GET\"\n }\n ],\n \"breakpointLocation\": \"NONE\",\n \"browserLog\": false,\n \"closeCookieModals\": false,\n \"debugLog\": false,\n \"downloadCss\": false,\n \"downloadMedia\": false,\n \"excludes\": [\n {\n \"glob\": \"/**/*.{png,jpg,jpeg,pdf}\"\n }\n ],\n \"headless\": true,\n \"ignoreCorsAndCsp\": false,\n \"ignoreSslErrors\": false,\n \n \"injectJQuery\": true,\n \"keepUrlFragments\": false,\n \"linkSelector\": \"a[href]\",\n \"maxCrawlingDepth\": 1,\n \"maxPagesPerCrawl\": 1,\n \"maxRequestRetries\": 1,\n \"maxResultsPerCrawl\": 1,\n \"pageFunction\": \"// The function accepts a single argument: the \\\"context\\\" object.\\n// For a complete list of its properties and functions,\\n// see https://apify.com/apify/web-scraper#page-function \\nasync function pageFunction(context) {\\n\\n await new Promise(res => { setTimeout(res, 6000) });\\n // This statement works as a breakpoint when you're trying to debug your code. Works only with Run mode: DEVELOPMENT!\\n // debugger; \\n\\n // jQuery is handy for finding DOM elements and extracting data from them.\\n // To use it, make sure to enable the \\\"Inject jQuery\\\" option.\\n const $ = context.jQuery;\\n const title = $('title').first().text();\\n\\n // Clone the body to avoid modifying the original content\\n const bodyClone = $('body').clone();\\n bodyClone.find('iframe, img, script, style, object, embed, noscript, svg, video, audio').remove();\\n const body = bodyClone.html();\\n\\n // Return an object with the data extracted from the page.\\n // It will be stored to the resulting dataset.\\n return {\\n url: context.request.url,\\n title,\\n body\\n };\\n}\",\n \"postNavigationHooks\": \"// We need to return array of (possibly async) functions here.\\n// The functions accept a single argument: the \\\"crawlingContext\\\" object.\\n[\\n async (crawlingContext) => {\\n // ...\\n },\\n]\",\n \"preNavigationHooks\": \"// We need to return array of (possibly async) functions here.\\n// The functions accept two arguments: the \\\"crawlingContext\\\" object\\n// and \\\"gotoOptions\\\".\\n[\\n async (crawlingContext, gotoOptions) => {\\n // ...\\n },\\n]\\n\",\n \"proxyConfiguration\": {\n \"useApifyProxy\": true\n },\n \"runMode\": \"PRODUCTION\",\n \n \"useChrome\": false,\n \"waitUntil\": [\n \"domcontentloaded\"\n ],\n \"globs\": [],\n \"pseudoUrls\": [],\n \"proxyRotation\": \"RECOMMENDED\",\n \"maxConcurrency\": 50,\n \"pageLoadTimeoutSecs\": 60,\n \"pageFunctionTimeoutSecs\": 60,\n \"maxScrollHeightPixels\": 5000,\n \"customData\": {}\n}",
                  "sendBody": true,
                  "sendQuery": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpQueryAuth",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "memory",
                                    "value": "2048"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "5853ba7e-4068-4792-be5c-b8cf81ee89cb",
            "name": "Results to List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  3460,
                  3720
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "origin_search.results"
            },
            "typeVersion": 1
      },
      {
            "id": "8ed2e8ec-b2e3-474b-b19d-f38b518f274b",
            "name": "Recursive Character Text Splitter1",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  5800,
                  4020
            ],
            "parameters": {
                  "options": {},
                  "chunkSize": 4000
            },
            "typeVersion": 1
      },
      {
            "id": "e2a8137b-7da3-4032-bca2-c14465356f02",
            "name": "Content Chunking @ 50k Chars",
            "type": "n8n-nodes-base.set",
            "position": [
                  5380,
                  3740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "7753a4f4-3ec2-4c05-81df-3d5e8979a478",
                                    "name": "=data",
                                    "type": "array",
                                    "value": "={{ new Array(Math.round($json.content.length / Math.min($json.content.length, 50000))).fill('').map((_,idx) => $json.content.substring(idx * 50000, idx * 50000 + 50000)) }}"
                              },
                              {
                                    "id": "7973bcb4-f239-4619-85fc-c76e20386375",
                                    "name": "service",
                                    "type": "string",
                                    "value": "={{ $json.service }}"
                              },
                              {
                                    "id": "b46e44bc-ad01-4cf0-8b07-25eeb1fb5874",
                                    "name": "url",
                                    "type": "string",
                                    "value": "={{ $json.url }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "6ef5866a-d992-4472-9221-27efbec8e7be",
            "name": "Split Out Chunks",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  5540,
                  3740
            ],
            "parameters": {
                  "include": "allOtherFields",
                  "options": {},
                  "fieldToSplitOut": "data"
            },
            "typeVersion": 1
      },
      {
            "id": "5e43b4d8-cebf-43ed-866d-0b4cb2997853",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  5800,
                  3900
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "service",
                                          "value": "={{ $json.service }}"
                                    },
                                    {
                                          "name": "url",
                                          "value": "={{ $json.url }}"
                                    }
                              ]
                        }
                  },
                  "jsonData": "={{ $json.data }}",
                  "jsonMode": "expressionData"
            },
            "typeVersion": 1
      },
      {
            "id": "d4b34767-be50-44ee-b778-18842034c276",
            "name": "Set Embedding Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  4980,
                  3580
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "4008ae44-7998-4a6f-88c9-686f8b02e92b",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $json.body }}"
                              },
                              {
                                    "id": "f7381ac6-ef40-463c-ad2b-df2c31d3e828",
                                    "name": "service",
                                    "type": "string",
                                    "value": "={{ $('EventRouter').first().json.data.service }}"
                              },
                              {
                                    "id": "7eae99fd-75c7-4974-a128-641b8ada0cc2",
                                    "name": "url",
                                    "type": "string",
                                    "value": "={{ $json.url }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "109b6c3a-9b16-40cc-9186-5045df387b52",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  2420,
                  4200
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "31556ff2-6358-4bd4-8ec4-2797d993256e",
            "name": "Execution Data",
            "type": "n8n-nodes-base.executionData",
            "position": [
                  2620,
                  4200
            ],
            "parameters": {
                  "dataToSave": {
                        "values": [
                              {
                                    "key": "eventType",
                                    "value": "={{ $json.eventType }}"
                              },
                              {
                                    "key": "executedById",
                                    "value": "={{ $json.executedById }}"
                              },
                              {
                                    "key": "service",
                                    "value": "={{ $json.data.service }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b65b3d4d-f667-4f8f-a06f-847c3d7b83e0",
            "name": "EventRouter",
            "type": "n8n-nodes-base.switch",
            "position": [
                  2800,
                  4200
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "research",
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
                                                      "leftValue": "={{ $json.eventType }}",
                                                      "rightValue": "research"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "extraction",
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
                                                      "id": "5418515e-ef6a-42e0-aeb9-8d0d35b898ca",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.eventType }}",
                                                      "rightValue": "extract"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "generate",
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
                                                      "id": "0135165e-d211-44f3-92a4-a91858a57d99",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.eventType }}",
                                                      "rightValue": "generate"
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
            "id": "541f7d9b-c8ff-44dc-8618-8550dbf0b951",
            "name": "Google Gemini Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  4460,
                  3740
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-flash-latest"
            },
            "typeVersion": 1
      },
      {
            "id": "617d6139-8417-4ecb-8f7c-558cd1c38ac3",
            "name": "Successful Runs",
            "type": "n8n-nodes-base.filter",
            "position": [
                  4100,
                  3720
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
                                    "id": "cac77cce-0a5c-469e-ba80-9fb026f04b18",
                                    "operator": {
                                          "type": "string",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.body }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2,
            "alwaysOutputData": true
      },
      {
            "id": "1115db69-b414-46cd-a9a1-565ae98cbd91",
            "name": "For Each Document...",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  5180,
                  3580
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "3f0e3764-2479-4d74-aca8-c3e830eac423",
            "name": "Embeddings Google Gemini",
            "type": "@n8n/n8n-nodes-langchain.embeddingsGoogleGemini",
            "position": [
                  5680,
                  3900
            ],
            "parameters": {
                  "modelName": "models/text-embedding-004"
            },
            "typeVersion": 1
      },
      {
            "id": "87d42766-d1a2-406d-b01c-044fd2fc8910",
            "name": "Has API Documentation?",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  4460,
                  3580
            ],
            "parameters": {
                  "options": {
                        "fallback": "discard"
                  },
                  "inputText": "={{\n$json.body\n .replaceAll('\\n', '')\n .substring(0, 40000)\n}}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "contains_api_schema_documentation",
                                    "description": "True if this document contains REST API schema documentation or definitions"
                              }
                        ]
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": true
      },
      {
            "id": "55939b49-d91c-42a1-9770-48cbe4008c9a",
            "name": "Store Document Embeddings",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  5700,
                  3740
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('EventRouter').first().json.data.collection }}"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "3e1da749-b8b9-42cb-818b-eabf4b114abb",
            "name": "Embeddings Google Gemini1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsGoogleGemini",
            "position": [
                  3700,
                  4520
            ],
            "parameters": {
                  "modelName": "models/text-embedding-004"
            },
            "typeVersion": 1
      },
      {
            "id": "be0906d4-351f-4b3b-9f32-8e5ee68083c5",
            "name": "Google Gemini Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  4600,
                  4240
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-pro-002"
            },
            "typeVersion": 1
      },
      {
            "id": "886415d5-c888-4b97-9fb5-02e6a14df4cc",
            "name": "Extract API Operations",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  4600,
                  4100
            ],
            "parameters": {
                  "text": "={{ $json.documents }}",
                  "options": {
                        "systemPromptTemplate": "=You have been given an extract of a webpage which should contain a list of web/REST api operations.\nStep 1. Extract all REST (eg. GET,POST,PUT,DELETE) API operation endpoints from the page content and generate appropriate labels for the resource, operation, description, method for each.\n* \"resource\" refers to the API group, for example: \"/v1/api/indicators/list\" and \"/v1/api/indicators/create\" will both have the resource name of \"indicators\". Use the following template \"<domain>\" eg. \"entities\", \"posts\", \"credentials\".\n* \"operation\" refers to the action performed, use the following template \"<verb> <entity>\" eg. \"List entities\", \"Create post\", \"Update credentials\"\n* only use one HTTP verb for \"method\"\n* \"description\" should be limited to one sentence.\n* Examples of API urls: \"/api/\", \"/api/v1/\", \"/v1/api\". API urls should not end with \"htm\" or html\".\n* Extract a maximum of 15 endpoints.\n* If the page content contains no api operations, return an empty array."
                  },
                  "schemaType": "manual",
                  "inputSchema": "{\n \"type\": \"array\",\n \"items\": {\n \"type\": \"object\",\n \"properties\": {\n \"resource\": { \"type\": \"string\" },\n \"operation\": { \"type\": \"string\" },\n \"description\": { \"type\": \"string\" },\n \"url\": { \"type\": \"string\" },\n \"method\": { \"type\": \"string\" },\n \"documentation_url\": { \"type\": \"string\" }\n }\n }\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "76470e34-7c1f-44ce-81e2-047dcca3fa32",
            "name": "Search in Relevant Docs",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  3700,
                  4380
            ],
            "parameters": {
                  "mode": "load",
                  "topK": 5,
                  "prompt": "={{ $json.query }}",
                  "options": {
                        "searchFilterJson": "={{\n{\n \"must\": [\n {\n \"key\": \"metadata.service\",\n \"match\": {\n \"value\": $('EventRouter').first().json.data.service\n }\n }\n ]\n}\n}}"
                  },
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('EventRouter').first().json.data.collection }}"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "49ca6a35-5b89-4ed5-bbab-250e09b4222f",
            "name": "Wait",
            "type": "n8n-nodes-base.wait",
            "position": [
                  3780,
                  3160
            ],
            "webhookId": "e9ad3ef0-7403-4e65-b0a4-4afdfb0cbc6d",
            "parameters": {
                  "amount": 0
            },
            "typeVersion": 1.1
      },
      {
            "id": "800cb05b-f5d1-47c8-869e-921915929f34",
            "name": "Remove Dupes",
            "type": "n8n-nodes-base.removeDuplicates",
            "position": [
                  3780,
                  3720
            ],
            "parameters": {
                  "compare": "selectedFields",
                  "options": {},
                  "fieldsToCompare": "source.link"
            },
            "typeVersion": 2
      },
      {
            "id": "d8203c40-aa0b-44b9-8dfd-aea250c8d109",
            "name": "Filter Results",
            "type": "n8n-nodes-base.filter",
            "position": [
                  3620,
                  3720
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
                                    "id": "42872456-411b-4d86-a9dd-b907d001ea1c",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.type }}",
                                    "rightValue": "normal"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "5714dc09-fd67-4285-9434-ac97cd80dec1",
            "name": "Research",
            "type": "n8n-nodes-base.executeWorkflow",
            "onError": "continueErrorOutput",
            "position": [
                  3460,
                  2980
            ],
            "parameters": {
                  "mode": "each",
                  "options": {
                        "waitForSubWorkflow": true
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
            "id": "2a2d3271-b0b6-4a1a-94e1-9b01399ba88f",
            "name": "Has Results?",
            "type": "n8n-nodes-base.if",
            "position": [
                  3280,
                  3820
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
                                    "id": "1223d607-45a8-44b1-b510-56fdbe013eba",
                                    "operator": {
                                          "type": "array",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $jmespath($json, 'origin_search.results') }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "b953082c-2d37-4549-80a7-d60535b8580e",
            "name": "Response Empty",
            "type": "n8n-nodes-base.set",
            "position": [
                  3460,
                  3900
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "5bb23ce9-eb72-4868-9344-9e5d3952cc52",
                                    "name": "response",
                                    "type": "string",
                                    "value": "no web results"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "41e9c328-d145-4b71-93bb-e2c448a14be0",
            "name": "Response OK",
            "type": "n8n-nodes-base.set",
            "position": [
                  5380,
                  3580
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "79598789-4468-4565-828f-fedc48be15c3",
                                    "name": "response",
                                    "type": "string",
                                    "value": "ok"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "5d0a7556-def9-4c70-8828-40b4d22904de",
            "name": "Combine Docs",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  4020,
                  4380
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "39bd90b4-e0f5-49b0-b4a7-55a3ae8eccb2",
            "name": "Template to List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  3280,
                  4200
            ],
            "parameters": {
                  "options": {
                        "destinationFieldName": "query"
                  },
                  "fieldToSplitOut": "queries"
            },
            "typeVersion": 1
      },
      {
            "id": "51a1da10-5ad0-4bac-9bec-55b5af3da702",
            "name": "Query Templates",
            "type": "n8n-nodes-base.set",
            "position": [
                  3100,
                  4200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e2a02550-8f53-4f8d-bb83-68ee3606736e",
                                    "name": "queries",
                                    "type": "array",
                                    "value": "=[\n\"What are the core functionalities, essential features, or primary use cases of {{ $json.data.service }}?\",\n\"Is there an API overview or API categories for {{ $json.data.service }}? What main APIs are listed or mentioned?\",\n\"What industry does {{ $json.data.service }} operate in? What is the most important of the services in the industry? Return the important service as the function.\",\n\"What REST apis (GET, POST, DELETE, PATCH) and/or operations can you identify for {{ $json.data.service }}?\",\n\"Does {{ $json.data.service }} have any CURL examples? If you can, identify one such example and explain what it does.\"\n]"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.3
      },
      {
            "id": "414091b7-114b-4fc3-9755-2f87cfef239e",
            "name": "Google Gemini Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  3700,
                  4240
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-pro-002"
            },
            "typeVersion": 1
      },
      {
            "id": "1f0f45ff-3bc9-4786-92e1-319244d020c0",
            "name": "For Each Template...",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  3460,
                  4200
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "2e577e62-7f89-4c99-b540-ce8c44f19a55",
            "name": "Query & Docs",
            "type": "n8n-nodes-base.set",
            "position": [
                  4180,
                  4380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "fdaea3de-3c9a-4f26-b7dc-769e534006a9",
                                    "name": "query",
                                    "type": "string",
                                    "value": "={{ $('For Each Template...').item.json.query }}"
                              },
                              {
                                    "id": "88198374-d2f9-4ae7-b262-d3b2e630e0ac",
                                    "name": "documents",
                                    "type": "string",
                                    "value": "={{ $json.data.map(item => item.document.pageContent.replaceAll('\\n', ' ')).join('\\n---\\n') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "548d51fd-9740-4b4c-9c81-db62d2b31053",
            "name": "Identify Service Products",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  3700,
                  4100
            ],
            "parameters": {
                  "text": "={{ $json.query }}",
                  "options": {
                        "systemPromptTemplate": "=Use the following document to answer the user's question:\n```\n{{ $json.documents.replace(/[\\{\\}]/g, '') }}\n```"
                  },
                  "attributes": {
                        "attributes": [
                              {
                                    "name": "product_or_solution",
                                    "required": true,
                                    "description": "A product or solution offered by the service"
                              },
                              {
                                    "name": "description",
                                    "required": true,
                                    "description": "description of what the product or solution of the service does"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "aa7041e9-4ac8-47f9-b98e-cf57873922bb",
            "name": "Extract API Templates",
            "type": "n8n-nodes-base.set",
            "position": [
                  4180,
                  4200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e2a02550-8f53-4f8d-bb83-68ee3606736e",
                                    "name": "query",
                                    "type": "string",
                                    "value": "=I'm interested in {{ $json.output.product_or_solution }} apis which {{ $json.output.description }} What are the GET, POST, PATCH and/or DELETE endpoints of the {{ $json.output.product_or_solution }} api?"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "e2b371c1-52af-4e57-877c-6933ba84e2d5",
            "name": "Embeddings Google Gemini2",
            "type": "@n8n/n8n-nodes-langchain.embeddingsGoogleGemini",
            "position": [
                  4600,
                  4520
            ],
            "parameters": {
                  "modelName": "models/text-embedding-004"
            },
            "typeVersion": 1
      },
      {
            "id": "d808c591-34e2-455f-96b1-3689d950608d",
            "name": "Search in Relevant Docs1",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  4600,
                  4380
            ],
            "parameters": {
                  "mode": "load",
                  "topK": 20,
                  "prompt": "={{ $json.query }}",
                  "options": {
                        "searchFilterJson": "={{\n{\n \"must\": [\n {\n \"key\": \"metadata.service\",\n \"match\": {\n \"value\": $('EventRouter').first().json.data.service\n }\n }\n ]\n}\n}}"
                  },
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('EventRouter').first().json.data.collection }}"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "222bde31-57fa-46c4-a23b-ec2d1b3c7e2d",
            "name": "Combine Docs1",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  4920,
                  4380
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "57677d83-a79a-4b71-9977-ee2324f5d593",
            "name": "Query & Docs1",
            "type": "n8n-nodes-base.set",
            "position": [
                  5080,
                  4380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "fdaea3de-3c9a-4f26-b7dc-769e534006a9",
                                    "name": "query",
                                    "type": "string",
                                    "value": "={{ $('For Each Template...1').item.json.query }}"
                              },
                              {
                                    "id": "88198374-d2f9-4ae7-b262-d3b2e630e0ac",
                                    "name": "documents",
                                    "type": "string",
                                    "value": "={{\n$json.data\n .map(item =>\n`url: ${item.document.metadata.url}\ncontent: ${item.document.pageContent}`\n )\n .join('\\n---\\n')\n .replaceAll('\\n\\n', '\\n')\n}}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "124c3b07-3210-4190-8865-e18017fc9e6c",
            "name": "For Each Template...1",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  4380,
                  4200
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "8ea4a5da-c471-4201-a08b-9c18ed08ddc7",
            "name": "Merge Lists",
            "type": "n8n-nodes-base.code",
            "position": [
                  4920,
                  4200
            ],
            "parameters": {
                  "jsCode": "return $input.all().flatMap(input => input.json.output) || [];"
            },
            "typeVersion": 2,
            "alwaysOutputData": true
      },
      {
            "id": "0e38cd3c-c843-4f6d-bdb6-901a8c12acbf",
            "name": "Remove Duplicates",
            "type": "n8n-nodes-base.removeDuplicates",
            "position": [
                  5280,
                  4200
            ],
            "parameters": {
                  "compare": "selectedFields",
                  "options": {},
                  "fieldsToCompare": "method, url"
            },
            "typeVersion": 2
      },
      {
            "id": "8f127f7a-e351-4b30-82dd-1f785be4a765",
            "name": "Append Row",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  5440,
                  4200
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "url": "={{ $json.url }}",
                              "method": "={{ $json.method }}",
                              "service": "={{ $('EventRouter').first().json.data.service }}",
                              "resource": "={{ $json.resource }}",
                              "operation": "={{ $json.operation }}",
                              "description": "={{ $json.description }}",
                              "documentation_url": "={{ $json.documentation_url }}"
                        },
                        "schema": [
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
                                    "id": "resource",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "resource",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "operation",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "operation",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "description",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "description",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "method",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "method",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "documentation_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "documentation_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {
                        "useAppend": true
                  },
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1042334767,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=1042334767",
                        "cachedResultName": "Extracted API Operations"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "d9f490e2-320e-4dc1-af8f-ac7f6a61568d",
            "name": "Response OK1",
            "type": "n8n-nodes-base.set",
            "position": [
                  5600,
                  4200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "79598789-4468-4565-828f-fedc48be15c3",
                                    "name": "response",
                                    "type": "string",
                                    "value": "ok"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "7780b6ee-0fde-40bb-aef6-e67b883645e1",
            "name": "Has Operations?",
            "type": "n8n-nodes-base.if",
            "position": [
                  5080,
                  4200
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
                                    "id": "a95420a7-6265-4ea3-9c01-82c2d7aeb4f8",
                                    "operator": {
                                          "type": "object",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $input.first().json }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "6589673d-984d-4a1e-a655-1bc19d2b154e",
            "name": "Response Empty1",
            "type": "n8n-nodes-base.set",
            "position": [
                  5280,
                  4380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "5bb23ce9-eb72-4868-9344-9e5d3952cc52",
                                    "name": "response",
                                    "type": "string",
                                    "value": "no api operations found"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "c5dc3eac-a3a5-481d-a8bc-8b653d88143d",
            "name": "Research Pending",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3180,
                  2980
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Research...').item.json.row_number }}",
                              "Stage 1 - Research": "=pending"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "39bceadb-6c3b-4b52-82b9-bdcecd9a164a",
            "name": "Research Result",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3620,
                  2980
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Research...').item.json.row_number }}",
                              "Stage 1 - Research": "={{ $json.response }}"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "0bd07f31-1c51-45aa-8316-b658aa214293",
            "name": "Research Error",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3620,
                  3160
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Research...').item.json.row_number }}",
                              "Stage 1 - Research": "=error"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "0385784f-95ef-46c3-82c4-50fcf7146736",
            "name": "Extract Pending",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  4160,
                  2980
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Extract...').item.json.row_number }}",
                              "Stage 2 - Extraction": "pending"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "executeOnce": false,
            "typeVersion": 4.5
      },
      {
            "id": "21c1e982-25a6-4a00-b8d3-6c299c452106",
            "name": "Research Event",
            "type": "n8n-nodes-base.set",
            "position": [
                  3320,
                  2980
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{\n{\n \"eventType\": \"research\",\n \"createdAt\": $now.toISO(),\n \"executedById\": $execution.id,\n \"data\": {\n \"row_number\": $('For Each Research...').item.json.row_number,\n \"service\": $('For Each Research...').item.json.Service,\n \"url\": $('For Each Research...').item.json.Website,\n \"collection\": \"api_schema_crawler_and_extractor\"\n }\n}\n}}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "c83f99f1-e28f-4c15-aff8-da25bb5dfe3b",
            "name": "Extract Event",
            "type": "n8n-nodes-base.set",
            "position": [
                  4300,
                  2980
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{\n{\n \"eventType\": \"extract\",\n \"createdAt\": $now.toISO(),\n \"executedById\": $execution.id,\n \"data\": {\n \"row_number\": $('For Each Extract...').item.json.row_number,\n \"service\": $('For Each Extract...').item.json.Service,\n \"url\": $('For Each Extract...').item.json.Website,\n \"collection\": \"api_schema_crawler_and_extractor\"\n }\n}\n}}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "88c3caec-75f7-47a1-9b50-1246c457c2b4",
            "name": "Extract",
            "type": "n8n-nodes-base.executeWorkflow",
            "onError": "continueErrorOutput",
            "position": [
                  4440,
                  2980
            ],
            "parameters": {
                  "mode": "each",
                  "options": {
                        "waitForSubWorkflow": true
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
            "id": "2342b7ff-b00d-439a-a859-63fd0a6bac3a",
            "name": "Extract Result",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  4600,
                  2980
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Extract...').item.json.row_number }}",
                              "Stage 2 - Extraction": "={{ $json.response }}"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "d4c423c9-1d6a-4a69-9302-92ec79734d61",
            "name": "Extract Error",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  4600,
                  3160
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Extract...').item.json.row_number }}",
                              "Stage 2 - Extraction": "error"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "f64254d6-4493-4aaf-8160-35e8ff4fdc34",
            "name": "Get API Operations",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3100,
                  4740
            ],
            "parameters": {
                  "options": {},
                  "filtersUI": {
                        "values": [
                              {
                                    "lookupValue": "={{ $json.data.service }}",
                                    "lookupColumn": "service"
                              }
                        ]
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1042334767,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=1042334767",
                        "cachedResultName": "Extracted API Operations"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "fa748b63-3d2b-4cf3-b1fb-1bd953e5054b",
            "name": "Contruct JSON Schema",
            "type": "n8n-nodes-base.code",
            "position": [
                  3280,
                  4740
            ],
            "parameters": {
                  "jsCode": "const service = {\n documentation_url: $('EventRouter').first().json.data.url,\n endpoints: [],\n};\n\nconst resources = Array.from(new Set($input.all().map(item => item.json.resource.toLowerCase().trim())));\n\nfor (const resource of resources) {\n const resourceLabel = resource.replace('api', '').trim();\n if (!resourceLabel) continue;\n const endpoint = {\n resource: resourceLabel[0].toUpperCase() + resourceLabel.substring(1, resourceLabel.length)\n };\n const operations = $input.all()\n .filter(item => item.json.resource.toLowerCase().trim() === resource)\n .map(item => item.json);\n endpoint.operations = operations.map(op => ({\n \"operation\": op.operation[0].toUpperCase() + op.operation.substring(1, op.operation.length),\n \"description\": op.description.match(/(^[^\\.]+.)/)[0],\n \"ApiUrl\": op.url,\n \"method\": op.method.toUpperCase(),\n \"method_documentation_url\": op.documentation_url || ''\n }));\n service.endpoints.push(endpoint);\n}\n\nreturn service;"
            },
            "typeVersion": 2
      },
      {
            "id": "e60b7ccb-baa2-4095-8425-0e20bcdbfdd2",
            "name": "Upload to Drive",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  3640,
                  4740
            ],
            "parameters": {
                  "name": "={{ $json.filename }}",
                  "content": "={{ $json.data }}",
                  "driveId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "My Drive"
                  },
                  "options": {},
                  "folderId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "149rBJYv9RKQx-vQO2qKUGfUzxk_J4lfw",
                        "cachedResultUrl": "https://drive.google.com/drive/folders/149rBJYv9RKQx-vQO2qKUGfUzxk_J4lfw",
                        "cachedResultName": "63. API Schema Extractor Remake"
                  },
                  "operation": "createFromText"
            },
            "typeVersion": 3
      },
      {
            "id": "f90546e6-3610-4198-87fc-96d7e2b6bc57",
            "name": "Set Upload Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  3460,
                  4740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "3c7d4946-c385-4aff-93ec-ae0850964099",
                                    "name": "filename",
                                    "type": "string",
                                    "value": "={{\n $('EventRouter').first().json.data.service\n .replace(/\\W+/, '_')\n .toLowerCase()\n}}_api_operations_{{ $now.format('yyyyMMddhhmmss') }}.json"
                              },
                              {
                                    "id": "4a7a9fae-7267-4ef6-ae33-ac4cd9777ee9",
                                    "name": "data",
                                    "type": "string",
                                    "value": "={{ JSON.stringify($json, null, 4) }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "c814b48d-2005-4150-a481-956f0b9506a5",
            "name": "Response OK2",
            "type": "n8n-nodes-base.set",
            "position": [
                  3820,
                  4740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "79598789-4468-4565-828f-fedc48be15c3",
                                    "name": "response",
                                    "type": "object",
                                    "value": "={{\n({\n id: $json.id,\n filename: $('Set Upload Fields').item.json.filename\n}).toJsonString()\n}}"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "4b1efa99-e8c8-49f5-8db8-916b8dde838d",
            "name": "Generate Event",
            "type": "n8n-nodes-base.set",
            "position": [
                  5300,
                  2980
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{\n{\n \"eventType\": \"generate\",\n \"createdAt\": $now.toISO(),\n \"executedById\": $execution.id,\n \"data\": {\n \"row_number\": $('For Each Generate...').item.json.row_number,\n \"service\": $('For Each Generate...').item.json.Service,\n \"url\": $('For Each Generate...').item.json.Website,\n \"collection\": \"api_schema_crawler_and_extractor\"\n }\n}\n}}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "49b82a1a-d51e-4caf-b7ab-8d27d0585b60",
            "name": "Generate Pending",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  5160,
                  2980
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Generate...').item.json.row_number }}",
                              "Stage 3 - Output File": "pending"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "executeOnce": false,
            "typeVersion": 4.5
      },
      {
            "id": "7d1a937c-49cc-40d7-b2ca-d315c5efca93",
            "name": "Generate",
            "type": "n8n-nodes-base.executeWorkflow",
            "onError": "continueErrorOutput",
            "position": [
                  5440,
                  2980
            ],
            "parameters": {
                  "mode": "each",
                  "options": {
                        "waitForSubWorkflow": true
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
            "id": "f35d843d-6c40-4725-b73f-8ca1a8e219bb",
            "name": "Generate Error",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  5600,
                  3160
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Generate...').item.json.row_number }}",
                              "Stage 3 - Output File": "error"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "e2f1f8e8-6852-4f19-98ec-85d9bd42729c",
            "name": "Generate Result",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  5600,
                  2980
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "row_number": "={{ $('For Each Generate...').item.json.row_number }}",
                              "Output Destination": "={{ $json.response.filename }}",
                              "Stage 3 - Output File": "ok"
                        },
                        "schema": [
                              {
                                    "id": "Service",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Service",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Website",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 1 - Research",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 1 - Research",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 2 - Extraction",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "required": false,
                                    "displayName": "Stage 2 - Extraction",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Stage 3 - Output File",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Stage 3 - Output File",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Output Destination",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "Output Destination",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "row_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "row_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "row_number"
                        ]
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "00c5b05b-fd70-4d58-8fc6-4e9b8d689a43",
            "name": "Get All Extract",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3620,
                  2820
            ],
            "parameters": {
                  "options": {},
                  "filtersUI": {
                        "values": [
                              {
                                    "lookupValue": "=ok",
                                    "lookupColumn": "Stage 1 - Research"
                              },
                              {
                                    "lookupValue": "={{ \"\" }}",
                                    "lookupColumn": "Stage 2 - Extraction"
                              }
                        ]
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "executeOnce": true,
            "typeVersion": 4.5,
            "alwaysOutputData": true
      },
      {
            "id": "c477ea01-028d-4e69-b772-adb8c03d1522",
            "name": "Get All Research",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2640,
                  2820
            ],
            "parameters": {
                  "options": {},
                  "filtersUI": {
                        "values": [
                              {
                                    "lookupValue": "={{ \"\" }}",
                                    "lookupColumn": "Stage 1 - Research"
                              }
                        ]
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "aALuyzBGGfmdBzrU",
                        "name": "Google Sheets account 2"
                  }
            },
            "typeVersion": 4.5,
            "alwaysOutputData": true
      },
      {
            "id": "60ba84c1-40cf-492f-bf52-c9edf5925646",
            "name": "For Each Research...",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  3020,
                  2820
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "5365cd1a-c7f8-40fb-84b3-9e5306ecf462",
            "name": "For Each Extract...",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  4000,
                  2820
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "d7a0743f-5f83-4c9b-b11c-85e2df3a4ecc",
            "name": "Wait1",
            "type": "n8n-nodes-base.wait",
            "position": [
                  4780,
                  3160
            ],
            "webhookId": "e9ad3ef0-7403-4e65-b0a4-4afdfb0cbc6d",
            "parameters": {
                  "amount": 0
            },
            "typeVersion": 1.1
      },
      {
            "id": "ec09ac70-5e05-463c-9d30-027e691a36b4",
            "name": "All Research Done?",
            "type": "n8n-nodes-base.if",
            "position": [
                  2800,
                  2820
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
                                    "id": "8d4b0159-af18-445e-a9ee-bd7952d8e0bd",
                                    "operator": {
                                          "type": "object",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $input.first().json }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "cd892e11-b4de-42f1-bab9-4bd783494c8a",
            "name": "All Extract Done?",
            "type": "n8n-nodes-base.if",
            "position": [
                  3780,
                  2820
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
                                    "id": "8d4b0159-af18-445e-a9ee-bd7952d8e0bd",
                                    "operator": {
                                          "type": "object",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $input.first().json }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "426091fb-d0eb-4589-8f2f-2bbeb9174cfc",
            "name": "Get All Generate",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  4600,
                  2820
            ],
            "parameters": {
                  "options": {},
                  "filtersUI": {
                        "values": [
                              {
                                    "lookupValue": "=ok",
                                    "lookupColumn": "Stage 1 - Research"
                              },
                              {
                                    "lookupValue": "=ok",
                                    "lookupColumn": "Stage 2 - Extraction"
                              },
                              {
                                    "lookupValue": "={{ \"\" }}",
                                    "lookupColumn": "Stage 3 - Output File"
                              }
                        ]
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1l59ikBvEwPNSWIm2k6KRMFPTNImJPYqs9bzGT5dUiU0/edit?usp=drivesdk",
                        "cachedResultName": "API Schema Crawler & Extractor"
                  }
            },
            "executeOnce": true,
            "typeVersion": 4.5
      },
      {
            "id": "01e91cf6-5bd5-4891-ba1f-95176e444fe6",
            "name": "All Generate Done?",
            "type": "n8n-nodes-base.if",
            "position": [
                  4780,
                  2820
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
                                    "id": "8d4b0159-af18-445e-a9ee-bd7952d8e0bd",
                                    "operator": {
                                          "type": "object",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $input.first().json }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "08f3505d-aad8-475a-bf08-e3da12798367",
            "name": "For Each Generate...",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  5000,
                  2820
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "1a1b30bd-91ab-41bd-9ead-39d24fc2643f",
            "name": "Wait2",
            "type": "n8n-nodes-base.wait",
            "position": [
                  5780,
                  3160
            ],
            "webhookId": "e9ad3ef0-7403-4e65-b0a4-4afdfb0cbc6d",
            "parameters": {
                  "amount": 0
            },
            "typeVersion": 1.1
      },
      {
            "id": "8f2be6bb-ab65-4c92-9ca1-d7ffa936a2a3",
            "name": "Has Results?1",
            "type": "n8n-nodes-base.if",
            "position": [
                  4260,
                  3720
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
                                    "id": "1223d607-45a8-44b1-b510-56fdbe013eba",
                                    "operator": {
                                          "type": "array",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $input.all().filter(item => item.json.body) }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "82fe66bf-4348-4673-8c64-3415f642fb4b",
            "name": "Response Scrape Error",
            "type": "n8n-nodes-base.set",
            "position": [
                  4460,
                  3900
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "5bb23ce9-eb72-4868-9344-9e5d3952cc52",
                                    "name": "response",
                                    "type": "string",
                                    "value": "web scraping error"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "3625591b-cb48-4131-ae8a-56d1e132bb5a",
            "name": "Has Results?3",
            "type": "n8n-nodes-base.if",
            "position": [
                  4780,
                  3580
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
                                    "id": "1223d607-45a8-44b1-b510-56fdbe013eba",
                                    "operator": {
                                          "type": "array",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $input.all().filter(item => item.json.body) }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "f82a4a25-5f93-4ba4-baae-08283c4ccadd",
            "name": "Response No API Docs",
            "type": "n8n-nodes-base.set",
            "position": [
                  4980,
                  3740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "5bb23ce9-eb72-4868-9344-9e5d3952cc52",
                                    "name": "response",
                                    "type": "string",
                                    "value": "no api docs in web results"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "4c3bb934-966c-445a-893f-0676a59140ee",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3020,
                  2580
            ],
            "parameters": {
                  "width": 620,
                  "height": 180,
                  "content": "## Stage 1 - Research for API Documentation\n- Fetch a list of services pending research from Database (Google Sheet)\n- Uses a search engine (Google) to find API Documentation for each service\n- Uses Webscraper (Apify) to read the contents of search results to filter irrelevant pages\n- Stores webpage contents and metadata into Vector Store (Qdrant)"
            },
            "typeVersion": 1
      },
      {
            "id": "bc269a57-f353-4cc8-bd2e-43236fa55d39",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4000,
                  2580
            ],
            "parameters": {
                  "width": 760,
                  "height": 180,
                  "content": "## Stage 2 - Extract API Operations From Documentation\n- Fetch a list of services pending extraction from Database (Google Sheet)\n- Query Vector store (Qdrant) to figure out service's products, solutions and offerings\n- Query Vector store (Qdrant) again for API documentation relevant to these products, solutions and offerings\n- Extract any API operations found in the API documentation results using LLM (Gemini)\n- Store extracted API operations into Database (Google Sheet)"
            },
            "typeVersion": 1
      },
      {
            "id": "d2dcad47-f655-4a15-ac92-6dab05eea4e1",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  5000,
                  2580
            ],
            "parameters": {
                  "width": 740,
                  "height": 180,
                  "content": "## Stage 3 - Generate Custom Schema From API Operations\n- Fetch a list of services pending generation from Database (Google Sheet)\n- Fetch all API operations for each service from Database (Google Sheet)\n- Use Code node to combine and group all API operations for a service and convert to a custom schema\n- Upload the resulting custom schema to file storage (Google Drive)"
            },
            "typeVersion": 1
      },
      {
            "id": "d1e1a271-4260-49c3-bda6-2864605c7365",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3100,
                  3680
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 80,
                  "content": "## Stage 1 - Subworkflow"
            },
            "typeVersion": 1
      },
      {
            "id": "1e50f04a-94ff-48b4-aa99-cd1d4f1d12be",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3100,
                  4080
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 80,
                  "content": "## Stage 2 - Subworkflow"
            },
            "typeVersion": 1
      },
      {
            "id": "f8334dbd-b542-404a-b4fc-6cf7cc07730d",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3100,
                  4620
            ],
            "parameters": {
                  "color": 5,
                  "width": 180,
                  "height": 80,
                  "content": "## Stage 3 - Subworkflow"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Wait": {
            "main": [
                  [
                        {
                              "node": "For Each Research...",
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
                              "node": "For Each Extract...",
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
                              "node": "For Each Generate...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract": {
            "main": [
                  [
                        {
                              "node": "Extract Result",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Extract Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate": {
            "main": [
                  [
                        {
                              "node": "Generate Result",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Generate Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Research": {
            "main": [
                  [
                        {
                              "node": "Research Result",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Research Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Append Row": {
            "main": [
                  [
                        {
                              "node": "Response OK1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "EventRouter": {
            "main": [
                  [
                        {
                              "node": "Web Search For API Schema",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Query Templates",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get API Operations",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge Lists": {
            "main": [
                  [
                        {
                              "node": "Has Operations?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine Docs": {
            "main": [
                  [
                        {
                              "node": "Query & Docs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Results?": {
            "main": [
                  [
                        {
                              "node": "Results to List",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Response Empty",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Query & Docs": {
            "main": [
                  [
                        {
                              "node": "For Each Template...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Remove Dupes": {
            "main": [
                  [
                        {
                              "node": "Scrape Webpage Contents",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine Docs1": {
            "main": [
                  [
                        {
                              "node": "Query & Docs1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Error": {
            "main": [
                  [
                        {
                              "node": "Wait1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Event": {
            "main": [
                  [
                        {
                              "node": "Extract",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Results?1": {
            "main": [
                  [
                        {
                              "node": "Has API Documentation?",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Response Scrape Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Results?3": {
            "main": [
                  [
                        {
                              "node": "Set Embedding Variables",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Response No API Docs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Query & Docs1": {
            "main": [
                  [
                        {
                              "node": "For Each Template...1",
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
                              "node": "EventRouter",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Result": {
            "main": [
                  [
                        {
                              "node": "Wait1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter Results": {
            "main": [
                  [
                        {
                              "node": "Remove Dupes",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Error": {
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
      "Generate Event": {
            "main": [
                  [
                        {
                              "node": "Generate",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Research Error": {
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
      "Research Event": {
            "main": [
                  [
                        {
                              "node": "Research",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Pending": {
            "main": [
                  [
                        {
                              "node": "Extract Event",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Result": {
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
      "Get All Extract": {
            "main": [
                  [
                        {
                              "node": "All Extract Done?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Operations?": {
            "main": [
                  [
                        {
                              "node": "Remove Duplicates",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Response Empty1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Query Templates": {
            "main": [
                  [
                        {
                              "node": "Template to List",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Research Result": {
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
      "Results to List": {
            "main": [
                  [
                        {
                              "node": "Filter Results",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Successful Runs": {
            "main": [
                  [
                        {
                              "node": "Has Results?1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload to Drive": {
            "main": [
                  [
                        {
                              "node": "Response OK2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Pending": {
            "main": [
                  [
                        {
                              "node": "Generate Event",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get All Generate": {
            "main": [
                  [
                        {
                              "node": "All Generate Done?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get All Research": {
            "main": [
                  [
                        {
                              "node": "All Research Done?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Research Pending": {
            "main": [
                  [
                        {
                              "node": "Research Event",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out Chunks": {
            "main": [
                  [
                        {
                              "node": "Store Document Embeddings",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Template to List": {
            "main": [
                  [
                        {
                              "node": "For Each Template...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "All Extract Done?": {
            "main": [
                  [
                        {
                              "node": "Get All Generate",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "For Each Extract...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Remove Duplicates": {
            "main": [
                  [
                        {
                              "node": "Append Row",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Upload Fields": {
            "main": [
                  [
                        {
                              "node": "Upload to Drive",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "All Generate Done?": {
            "main": [
                  [],
                  [
                        {
                              "node": "For Each Generate...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "All Research Done?": {
            "main": [
                  [
                        {
                              "node": "Get All Extract",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "For Each Research...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get API Operations": {
            "main": [
                  [
                        {
                              "node": "Contruct JSON Schema",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Default Data Loader": {
            "ai_document": [
                  [
                        {
                              "node": "Store Document Embeddings",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Extract...": {
            "main": [
                  [
                        {
                              "node": "Get All Generate",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Extract Pending",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Contruct JSON Schema": {
            "main": [
                  [
                        {
                              "node": "Set Upload Fields",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Document...": {
            "main": [
                  [
                        {
                              "node": "Response OK",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Content Chunking @ 50k Chars",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Generate...": {
            "main": [
                  [],
                  [
                        {
                              "node": "Generate Pending",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Research...": {
            "main": [
                  [
                        {
                              "node": "Get All Extract",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Research Pending",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Template...": {
            "main": [
                  [
                        {
                              "node": "Identify Service Products",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Search in Relevant Docs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract API Templates": {
            "main": [
                  [
                        {
                              "node": "For Each Template...1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Template...1": {
            "main": [
                  [
                        {
                              "node": "Extract API Operations",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Search in Relevant Docs1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract API Operations": {
            "main": [
                  [
                        {
                              "node": "Merge Lists",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has API Documentation?": {
            "main": [
                  [
                        {
                              "node": "Has Results?3",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Scrape Webpage Contents": {
            "main": [
                  [
                        {
                              "node": "Successful Runs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search in Relevant Docs": {
            "main": [
                  [
                        {
                              "node": "Combine Docs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Embedding Variables": {
            "main": [
                  [
                        {
                              "node": "For Each Document...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings Google Gemini": {
            "ai_embedding": [
                  [
                        {
                              "node": "Store Document Embeddings",
                              "type": "ai_embedding",
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
      },
      "Google Gemini Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Has API Documentation?",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search in Relevant Docs1": {
            "main": [
                  [
                        {
                              "node": "Combine Docs1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings Google Gemini1": {
            "ai_embedding": [
                  [
                        {
                              "node": "Search in Relevant Docs",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings Google Gemini2": {
            "ai_embedding": [
                  [
                        {
                              "node": "Search in Relevant Docs1",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Gemini Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Extract API Operations",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Gemini Chat Model2": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Identify Service Products",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Identify Service Products": {
            "main": [
                  [
                        {
                              "node": "Extract API Templates",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Store Document Embeddings": {
            "main": [
                  [
                        {
                              "node": "For Each Document...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Web Search For API Schema": {
            "main": [
                  [
                        {
                              "node": "Has Results?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Content Chunking @ 50k Chars": {
            "main": [
                  [
                        {
                              "node": "Split Out Chunks",
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
                              "node": "Get All Research",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Recursive Character Text Splitter1": {
            "ai_textSplitter": [
                  [
                        {
                              "node": "Default Data Loader",
                              "type": "ai_textSplitter",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {},
  },
  {
    name: "Automate Pinterest Analysis & AI-Powered Content Suggestions With Pinterest API",
    nodes: [
      {
            "id": "7f582bb4-97cd-458e-a7b7-b518c5b8a4ca",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  540,
                  -260
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "95QGJD3XSz0piaNU",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "c6772882-468c-4391-a259-93e52daf49d4",
            "name": "Airtable2",
            "type": "n8n-nodes-base.airtableTool",
            "position": [
                  700,
                  -260
            ],
            "parameters": {
                  "id": "=",
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appfsNi1QEhw6WvXK",
                        "cachedResultUrl": "https://airtable.com/appfsNi1QEhw6WvXK",
                        "cachedResultName": "Pinterest_Metrics"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbl9Dxdrwx5QZGFnp",
                        "cachedResultUrl": "https://airtable.com/appfsNi1QEhw6WvXK/tbl9Dxdrwx5QZGFnp",
                        "cachedResultName": "Pinterest_Organic_Data"
                  },
                  "options": {}
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "0ApVmNsLu7aFzQD6",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "85ea8bec-14c8-4277-b2e3-eb145db0713a",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  920,
                  -280
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "95QGJD3XSz0piaNU",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "b8f7d0d6-b58f-4a41-a15d-99f4d838bb8c",
            "name": "8:00am Morning Scheduled Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -660,
                  -140
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "daysInterval": 7,
                                    "triggerAtHour": 8
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "593a320d-825e-42f9-8ab6-adafd5288fa5",
            "name": "Pull List of Pinterest Pins From Account",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -340,
                  -140
            ],
            "parameters": {
                  "url": "https://api.pinterest.com/v5/pins",
                  "options": {
                        "redirect": {
                              "redirect": {}
                        }
                  },
                  "sendBody": true,
                  "sendHeaders": true,
                  "bodyParameters": {
                        "parameters": [
                              {}
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "Bearer "
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "1e6d00fe-2b32-4d46-a230-063254ebab74",
            "name": "Update Data Field To Include Organic",
            "type": "n8n-nodes-base.code",
            "position": [
                  -20,
                  -140
            ],
            "parameters": {
                  "jsCode": "// Initialize an array to hold the output formatted for Airtable\nconst outputItems = [];\n\nfor (const item of $input.all()) {\n if (item.json.items && Array.isArray(item.json.items)) {\n for (const subItem of item.json.items) {\n // Construct an object with only the required fields for Airtable\n outputItems.push({\n id: subItem.id || null,\n created_at: subItem.created_at || null,\n title: subItem.title || null,\n description: subItem.description || null,\n link: subItem.link || null,\n type: \"Organic\" // Assign the value \"Organic\" to the 'Type' field\n });\n }\n }\n}\n\n// Return the structured output\nreturn outputItems;\n"
            },
            "typeVersion": 2
      },
      {
            "id": "539de144-dc67-4b14-b58e-2896edb1c3e6",
            "name": "Create Record Within Pinterest Data Table",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  260,
                  -140
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appfsNi1QEhw6WvXK",
                        "cachedResultUrl": "https://airtable.com/appfsNi1QEhw6WvXK",
                        "cachedResultName": "Pinterest_Metrics"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tbl9Dxdrwx5QZGFnp",
                        "cachedResultUrl": "https://airtable.com/appfsNi1QEhw6WvXK/tbl9Dxdrwx5QZGFnp",
                        "cachedResultName": "Pinterest_Organic_Data"
                  },
                  "columns": {
                        "value": {
                              "link": "={{ $json.link }}",
                              "type": "={{ $json.type }}",
                              "title": "={{ $json.title }}",
                              "pin_id": "={{ $json.id }}",
                              "created_at": "={{ $json.created_at }}",
                              "description": "={{ $json.description }}"
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
                                    "id": "pin_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "pin_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "created_at",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "created_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "title",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "description",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "description",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "link",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "type",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "type",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "active7DayUsers",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "active7DayUsers",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "sessions",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "sessions",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "userEngagementDuration",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "userEngagementDuration",
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
                  "options": {},
                  "operation": "upsert"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "0ApVmNsLu7aFzQD6",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "250f5121-437e-4bff-82af-95a156126127",
            "name": "Pinterest Analysis AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  540,
                  -440
            ],
            "parameters": {
                  "text": "You are a data analysis expert. You will pull data from the table and provide any information in regards to trends in the data. \n\nYour output should be suggestions of new pins that we can post to reach the target audiences. \n\nAnalyze the data and just summary of the pin suggestions that the team should build. ",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "181e9d89-c0f9-4de2-bdce-9359b967157c",
            "name": "Pinterest Data Analysis Summary LLM",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  900,
                  -440
            ],
            "parameters": {
                  "options": {
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "=Write a concise summary of the following:\n\n\n\"{{ $json.output }}\"\n\n\nCONCISE SUMMARY:"
                              }
                        }
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "432e7bd7-36b4-4903-8e93-c8bd6e140a04",
            "name": "Send Marketing Trends & Pinterest Analysis To Marketing Manager",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1220,
                  -440
            ],
            "webhookId": "f149c1b5-c028-4dff-9d22-a72951f2ef91",
            "parameters": {
                  "sendTo": "john.n.foster1@gmail.com",
                  "message": "={{ $json.response.text }}",
                  "options": {},
                  "subject": "Pinterest Trends & Suggestions"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "pIXP1ZseBP4Z5CCp",
                        "name": "Gmail account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 2.1
      },
      {
            "id": "dadfb22a-b1d3-459d-a332-5a2c52fd4ca0",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -740,
                  -320
            ],
            "parameters": {
                  "color": 5,
                  "width": 280,
                  "height": 440,
                  "content": "Scheduled trigger at 8:00am to start the workflow. \n\nThis can be updated to your schedule preference as an email with marketing trends can be sent to best fit one's schedule. "
            },
            "typeVersion": 1
      },
      {
            "id": "3b156d97-11bf-4d8a-9bd9-c1e23a0592d8",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -420,
                  -300
            ],
            "parameters": {
                  "color": 6,
                  "width": 860,
                  "height": 360,
                  "content": "Scheduled trigger begin process to gather Pinterest Pin data and store them within Airtable. This data can be referenced or analyzed accordingly. \n\n*If you would like to bring in Pinterest Ads data, the data is already labeled as Organic.\n\nThis is perfect for those who are creating content calendars to understand content scheduling."
            },
            "typeVersion": 1
      },
      {
            "id": "65586422-a631-477b-833d-5c445b1be744",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  480,
                  -580
            ],
            "parameters": {
                  "color": 4,
                  "width": 940,
                  "height": 460,
                  "content": "AI Agent will go through Pinterest Pins and analyze any data and trends to be able to reach target audience. The data is then summarized within the Summary LLM.\n\nThe summarized results are then sent to the Marketing Manager within an email to help lead content creation efforts. "
            },
            "typeVersion": 1
      }
],
    connections: {
      "Airtable2": {
            "ai_tool": [
                  [
                        {
                              "node": "Pinterest Analysis AI Agent",
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
                              "node": "Pinterest Analysis AI Agent",
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
                              "node": "Pinterest Data Analysis Summary LLM",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pinterest Analysis AI Agent": {
            "main": [
                  [
                        {
                              "node": "Pinterest Data Analysis Summary LLM",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "8:00am Morning Scheduled Trigger": {
            "main": [
                  [
                        {
                              "node": "Pull List of Pinterest Pins From Account",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pinterest Data Analysis Summary LLM": {
            "main": [
                  [
                        {
                              "node": "Send Marketing Trends & Pinterest Analysis To Marketing Manager",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Data Field To Include Organic": {
            "main": [
                  [
                        {
                              "node": "Create Record Within Pinterest Data Table",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Pinterest Analysis AI Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pull List of Pinterest Pins From Account": {
            "main": [
                  [
                        {
                              "node": "Update Data Field To Include Organic",
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
    name: "Analyze Screenshots with AI",
    nodes: [
      {
            "id": "6d7f34b8-6203-4512-a428-7b5a18c63db6",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  240,
                  1100
            ],
            "parameters": {
                  "width": 373.2796418305297,
                  "height": 381.1230421279239,
                  "content": "## Setup \n**For Testing use the Setup node to put in test name & url.**\n\nIf you want to use this workflow in production, you can expand it to load data from other sources like a DB or Google Sheet"
            },
            "typeVersion": 1
      },
      {
            "id": "ae568c65-e8f6-45bb-9c96-a870da1fc7d6",
            "name": "Setup",
            "type": "n8n-nodes-base.set",
            "position": [
                  360,
                  1320
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "website_name",
                                    "value": "=n8n"
                              },
                              {
                                    "name": "url",
                                    "value": "https://n8n.io/"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 2
      },
      {
            "id": "ca9f0357-a596-4453-b351-fdd8d47c81ad",
            "name": "URLbox API Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  780,
                  1120
            ],
            "parameters": {
                  "url": "https://api.urlbox.io/v1/render/sync",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendHeaders": true,
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "url",
                                    "value": "={{ $json.url }}"
                              },
                              {
                                    "name": "full_page",
                                    "value": true
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "YOUR_API_KEY"
                              }
                        ]
                  }
            },
            "retryOnFail": true,
            "typeVersion": 4.1
      },
      {
            "id": "3caffa3c-657a-4f74-a3cb-daf7beb67890",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  640,
                  920
            ],
            "parameters": {
                  "width": 373.2796418305297,
                  "height": 381.1230421279239,
                  "content": "## URLbox API call \n[URLbox](https://urlbox.com/) is a Screenshot API. With this API you can automate making screenshots based on website url's.\n\nYou have to replace the Placeholder with your API Key"
            },
            "typeVersion": 1
      },
      {
            "id": "d2b81b41-1497-4733-8130-67f8de0acff4",
            "name": "Analyze the Screenshot",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1220,
                  1120
            ],
            "parameters": {
                  "text": "=Your Input is a Screenshot of a Website.\nDescribe the content of the Website in one sentence.",
                  "options": {},
                  "resource": "image",
                  "imageUrls": "renderURL",
                  "operation": "analyze"
            },
            "typeVersion": 1.1
      },
      {
            "id": "68d86931-69bb-4b78-a7fe-44969172672f",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1080,
                  920
            ],
            "parameters": {
                  "width": 373.2796418305297,
                  "height": 381.1230421279239,
                  "content": "## Analyze the Screenshot \nAnalyze the screenshot using OpenAI.\n\nAdd your OpenAI Credentials on the top of the node.\n\nThe prompt is an example. Change it based on what you want to extract from the screenshot."
            },
            "typeVersion": 1
      },
      {
            "id": "8a22fca5-7f06-45fb-a03f-585a7eb35b40",
            "name": "Merge Name & Description",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1620,
                  1300
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2.1
      },
      {
            "id": "4f902a0a-ee93-4190-9b1e-ab3fa15eb4aa",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1480,
                  1200
            ],
            "parameters": {
                  "width": 371.85912137154685,
                  "height": 300.15337596590155,
                  "content": "## Merge\nMerge the description with the name of the website & the url."
            },
            "typeVersion": 1
      },
      {
            "id": "8b3eb3f4-b31a-48f0-94bb-35379d07a81f",
            "name": "Manual Execution",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  20,
                  1320
            ],
            "parameters": {},
            "typeVersion": 1
      }
],
    connections: {
      "Setup": {
            "main": [
                  [
                        {
                              "node": "URLbox API Request",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge Name & Description",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Manual Execution": {
            "main": [
                  [
                        {
                              "node": "Setup",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "URLbox API Request": {
            "main": [
                  [
                        {
                              "node": "Analyze the Screenshot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze the Screenshot": {
            "main": [
                  [
                        {
                              "node": "Merge Name & Description",
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
    name: "Automate SIEM Alert Enrichment With MITRE ATT&CK, Qdrant & Zendesk In N8n",
    nodes: [
      {
            "id": "86ddd018-3d6b-46b9-aa93-dedd6c6b5076",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  -880,
                  360
            ],
            "webhookId": "a9668bb8-bbe8-418a-b5c9-ff7dd431244f",
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "a5ba5090-8e3b-4408-82df-92d2c524039e",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  -680,
                  360
            ],
            "parameters": {
                  "options": {
                        "systemMessage": "You are a cybersecurity expert trained on MITRE ATT&CK and enterprise incident response. Your job is to:\n1. Extract TTP information from SIEM data.\n2. Provide actionable remediation steps tailored to the alert.\n3. Cross-reference historical patterns and related alerts.\n4. Recommend external resources for deeper understanding.\n\nEnsure that:\n- TTPs are tagged with the tactic, technique name, and technique ID.\n- Remediation steps are specific and actionable.\n- Historical data includes related alerts and notable trends.\n- External links are relevant to the observed behavior.\n"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "67c52944-b616-4ea6-9507-e9fb6fcdbe2b",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -740,
                  580
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "QpFZ2EiM3WGl6Zr3",
                        "name": "Marketing OpenAI"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "55f6c16a-51ed-45e4-a1ab-aaaf1d7b5733",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  -720,
                  1220
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "data"
            },
            "typeVersion": 1
      },
      {
            "id": "46a5b8c6-3d34-4e9b-b812-23135f28c278",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  -580,
                  1420
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "QpFZ2EiM3WGl6Zr3",
                        "name": "Marketing OpenAI"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "561b0737-26d5-450d-bd9e-08e0a608d6f9",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  -460,
                  1440
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "id",
                                          "value": "={{ $json.id }}"
                                    },
                                    {
                                          "name": "name",
                                          "value": "={{ $json.name }}"
                                    },
                                    {
                                          "name": "killchain",
                                          "value": "={{ $json.kill_chain_phases }}"
                                    },
                                    {
                                          "name": "external",
                                          "value": "={{ $json.external_references }}"
                                    }
                              ]
                        }
                  },
                  "jsonData": "={{ $json.description }}",
                  "jsonMode": "expressionData"
            },
            "typeVersion": 1
      },
      {
            "id": "6e8a4aed-7e8c-492a-b816-6ab1a98c312a",
            "name": "Token Splitter1",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  -460,
                  1620
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0c54049e-b5e8-448f-b864-39aeb274de3e",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  -580,
                  580
            ],
            "parameters": {},
            "typeVersion": 1.3
      },
      {
            "id": "96b776a0-10da-4f70-99d0-ad6b6ee8fcca",
            "name": "Embeddings OpenAI2",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  -460,
                  720
            ],
            "parameters": {
                  "model": "text-embedding-3-large",
                  "options": {
                        "dimensions": 1536
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "QpFZ2EiM3WGl6Zr3",
                        "name": "Marketing OpenAI"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "695fba89-8f42-47c3-9d86-73f4ea0e72df",
            "name": "Extract from File",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  -920,
                  1220
            ],
            "parameters": {
                  "options": {},
                  "operation": "fromJson"
            },
            "typeVersion": 1
      },
      {
            "id": "0b9897b0-149b-43ce-b66c-e78552729aa5",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -1360,
                  1220
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "d8c29a14-0389-4748-a9de-686bf9a682c5",
            "name": "AI Agent1",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  -540,
                  -440
            ],
            "parameters": {
                  "text": "=Siem Alert Data:\nAlert: {{ $json.raw_subject }}\nDescription: {{ $json.description }}",
                  "options": {
                        "systemMessage": "You are a cybersecurity expert trained on MITRE ATT&CK and enterprise incident response. Your job is to:\n1. Extract TTP information from SIEM data.\n2. Provide actionable remediation steps tailored to the alert.\n3. Cross-reference historical patterns and related alerts.\n4. Recommend external resources for deeper understanding.\n\nEnsure that:\n- TTPs are tagged with the tactic, technique name, and technique ID.\n- Remediation steps are specific and actionable.\n- Historical data includes related alerts and notable trends.\n- External links are relevant to the observed behavior.\n\nPlease output your response in html format, but do not include ```html at the beginning \n"
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.7
      },
      {
            "id": "55d0b00a-5046-45fa-87cb-cb0257caae87",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -600,
                  -220
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "QpFZ2EiM3WGl6Zr3",
                        "name": "Marketing OpenAI"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9b53566b-e021-403d-9d78-28504c5c1dfa",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  -320,
                  -40
            ],
            "parameters": {
                  "model": "text-embedding-3-large",
                  "options": {
                        "dimensions": 1536
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "QpFZ2EiM3WGl6Zr3",
                        "name": "Marketing OpenAI"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "f3b44ef5-e928-4662-81ef-4dd044829607",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  -940,
                  -440
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "cc572b71-65c9-460c-bdcd-1d20feb15b32",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1460,
                  940
            ],
            "parameters": {
                  "color": 7,
                  "width": 1380,
                  "height": 820,
                  "content": "![n8n](https://uploads.n8n.io/templates/qdrantlogo.png)\n## Embed your Vector Store\nTo provide data for your Vector store, you need to pass it in as JSON, and ensure it's setup correctly. This flow pulls the JSON file from Google Drive and extracts the JSON data and then passes it into the qdrant collection. "
            },
            "typeVersion": 1
      },
      {
            "id": "d5052d52-bec2-4b70-b460-6d5789c28d2c",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1460,
                  220
            ],
            "parameters": {
                  "color": 7,
                  "width": 1380,
                  "height": 680,
                  "content": "![n8n](https://uploads.n8n.io/templates/n8n.png)\n## Talk to your Vector Store\nNow that your vector store has been updated with the embedded data, \nyou can use the n8n chat interface to talk to your data using OpenAI, \nOllama, or any of our supported LLMs."
            },
            "typeVersion": 1
      },
      {
            "id": "5cb478f6-17f3-4d7a-9b66-9e0654bd1dc9",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1460,
                  -700
            ],
            "parameters": {
                  "color": 7,
                  "width": 2140,
                  "height": 900,
                  "content": "![Servicenow](https://uploads.n8n.io/templates/zendesk.png)\n## Deploy your Vector Store\nThis flow adds contextual information to your tickets using the Mitre Attack framework to help contextualize the ticket data."
            },
            "typeVersion": 1
      },
      {
            "id": "71ee28f5-84a2-4c6c-855a-6c7c09b2d62a",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  0,
                  -160
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n \"ttp_identification\": {\n \"alert_summary\": \"The alert indicates a check-in from the NetSupport RAT, a known Remote Access Trojan, suggesting command and control (C2) communication.\",\n \"mitre_attack_ttps\": [\n {\n \"tactic\": \"Command and Control\",\n \"technique\": \"Protocol or Service Impersonation\",\n \"technique_id\": \"T1001.003\",\n \"description\": \"The RAT's check-in over port 443 implies potential masquerading of its traffic as legitimate SSL/TLS traffic, a tactic often used to blend C2 communications with normal web traffic.\",\n \"reference\": \"https://attack.mitre.org/techniques/T1001/003/\"\n }\n ]\n },\n \"remediation_steps\": {\n \"network_segmentation\": {\n \"action\": \"Isolate the affected host\",\n \"target\": \"10.11.26.183\",\n \"reason\": \"Prevents further C2 communication or lateral movement.\"\n },\n \"endpoint_inspection\": {\n \"action\": \"Perform a thorough inspection\",\n \"target\": \"Impacted endpoint\",\n \"method\": \"Use endpoint detection and response (EDR) tools to check for additional persistence mechanisms.\"\n },\n \"network_traffic_analysis\": {\n \"action\": \"Investigate and block unusual traffic\",\n \"target\": \"IP 194.180.191.64\",\n \"method\": \"Implement blocks for the IP across the firewall or IDS/IPS systems.\"\n },\n \"system_patching\": {\n \"action\": \"Ensure all systems are updated\",\n \"method\": \"Apply the latest security patches to mitigate vulnerabilities exploited by RAT malware.\"\n },\n \"ioc_hunting\": {\n \"action\": \"Search for Indicators of Compromise (IoCs)\",\n \"method\": \"Check for NetSupport RAT IoCs across other endpoints within the network.\"\n }\n },\n \"historical_patterns\": {\n \"network_anomalies\": \"Past alerts involving similar attempts to use standard web ports (e.g., 80, 443) for non-standard applications could suggest a broader attempt to blend malicious traffic into legitimate streams.\",\n \"persistence_tactics\": \"Any detection of anomalies in task scheduling or shortcut modifications may indicate persistence methods similar to those used by RATs.\"\n },\n \"external_resources\": [\n {\n \"title\": \"ESET Report on Okrum and Ketrican\",\n \"description\": \"Discusses similar tactics involving protocol impersonation and C2.\",\n \"url\": \"https://www.eset.com/int/about/newsroom/research/okrum-ketrican/\"\n },\n {\n \"title\": \"Malleable C2 Profiles\",\n \"description\": \"Document on crafting custom C2 traffic profiles similar to the targeting methods used by NetSupport RAT.\",\n \"url\": \"https://www.cobaltstrike.com/help-malleable-c2\"\n },\n {\n \"title\": \"MITRE ATT&CK Technique Overview\",\n \"description\": \"Overview of Protocol or Service Impersonation tactics.\",\n \"url\": \"https://attack.mitre.org/techniques/T1001/003/\"\n }\n ]\n}\n"
            },
            "typeVersion": 1.2
      },
      {
            "id": "3aeb973d-22e5-4eaf-8fe8-fae3447909e1",
            "name": "Pull Mitre Data From Gdrive",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  -1140,
                  1220
            ],
            "parameters": {
                  "fileId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1oWBLO5AlIqbgo9mKD1hNtx92HdC6O28d",
                        "cachedResultUrl": "https://drive.google.com/file/d/1oWBLO5AlIqbgo9mKD1hNtx92HdC6O28d/view?usp=drivesdk",
                        "cachedResultName": "cleaned_mitre_attack_data.json"
                  },
                  "options": {},
                  "operation": "download"
            },
            "credentials": {
                  "googleDriveOAuth2Api": {
                        "id": "AVa7MXBLiB9NYjuO",
                        "name": "Angel Gdrive"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "3b35633c-de80-4062-8497-cb65092d5708",
            "name": "Embed JSON in Qdrant Collection",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  -520,
                  1220
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "id",
                        "value": "mitre"
                  }
            },
            "credentials": {
                  "qdrantApi": {
                        "id": "u0qre50aar6iqyxu",
                        "name": "Angel MitreAttack Demo Cluster"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5f7f2fd8-276f-4b3a-ae88-1f1765967883",
            "name": "Query Qdrant Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  -480,
                  580
            ],
            "parameters": {
                  "mode": "retrieve-as-tool",
                  "options": {},
                  "toolName": "mitre_attack_vector_store",
                  "toolDescription": "The mitre_attack_vector_store is a knowledge base trained on the MITRE ATT&CK framework. It is designed to help identify, correlate, and provide context for cybersecurity incidents based on textual descriptions of alerts, events, or behaviors. This tool leverages precomputed embeddings of attack techniques, tactics, and procedures (TTPs) to map user queries (such as SIEM-generated alerts or JIRA ticket titles) to relevant MITRE ATT&CK techniques.\n\nBy analyzing input text, the vector store can:\n\nRetrieve the most relevant MITRE ATT&CK entries (e.g., techniques, tactics, descriptions, external references).\nProvide structured context about potential adversary behaviors.\nSuggest remediation actions or detection methods based on the input.",
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "list",
                        "value": "mitre",
                        "cachedResultName": "mitre"
                  }
            },
            "credentials": {
                  "qdrantApi": {
                        "id": "u0qre50aar6iqyxu",
                        "name": "Angel MitreAttack Demo Cluster"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "298ffc29-1d60-4c05-92c6-a61071629a3f",
            "name": "Qdrant Vector Store query",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  -320,
                  -200
            ],
            "parameters": {
                  "mode": "retrieve-as-tool",
                  "options": {},
                  "toolName": "mitre_attack_vector_store",
                  "toolDescription": "The mitre_attack_vector_store is a knowledge base trained on the MITRE ATT&CK framework. It is designed to help identify, correlate, and provide context for cybersecurity incidents based on textual descriptions of alerts, events, or behaviors. This tool leverages precomputed embeddings of attack techniques, tactics, and procedures (TTPs) to map user queries (such as SIEM-generated alerts or JIRA ticket titles) to relevant MITRE ATT&CK techniques.\n\nBy analyzing input text, the vector store can:\n\nRetrieve the most relevant MITRE ATT&CK entries (e.g., techniques, tactics, descriptions, external references).\nProvide structured context about potential adversary behaviors.\nSuggest remediation actions or detection methods based on the input.",
                  "qdrantCollection": {
                        "__rl": true,
                        "mode": "list",
                        "value": "mitre",
                        "cachedResultName": "mitre"
                  }
            },
            "credentials": {
                  "qdrantApi": {
                        "id": "u0qre50aar6iqyxu",
                        "name": "Angel MitreAttack Demo Cluster"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c47f0ae6-106d-46da-afc3-f7afb86923ff",
            "name": "Get all Zendesk Tickets",
            "type": "n8n-nodes-base.zendesk",
            "position": [
                  -1180,
                  -440
            ],
            "parameters": {
                  "options": {},
                  "operation": "getAll"
            },
            "credentials": {
                  "zendeskApi": {
                        "id": "ROx0ipJapRomRxEX",
                        "name": "Zendesk Demo Access"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0ec2c505-5721-41af-91c8-1b0b55826d9e",
            "name": "Update Zendesk with Mitre Data",
            "type": "n8n-nodes-base.zendesk",
            "position": [
                  0,
                  -360
            ],
            "parameters": {
                  "id": "={{ $('Loop Over Items').item.json.id }}",
                  "operation": "update",
                  "updateFields": {
                        "internalNote": "=Summary: {{ $json.output.ttp_identification.alert_summary }}\n\n",
                        "customFieldsUi": {
                              "customFieldsValues": [
                                    {
                                          "id": 34479547176212,
                                          "value": "={{ $json.output.ttp_identification.mitre_attack_ttps[0].technique_id }}"
                                    },
                                    {
                                          "id": 34479570659732,
                                          "value": "={{ $json.output.ttp_identification.mitre_attack_ttps[0].tactic }}"
                                    }
                              ]
                        }
                  }
            },
            "credentials": {
                  "zendeskApi": {
                        "id": "ROx0ipJapRomRxEX",
                        "name": "Zendesk Demo Access"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6a74a6d4-610a-4a13-afe4-7bb03d83d4c8",
            "name": "Move on to next ticket",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  360,
                  -80
            ],
            "parameters": {},
            "typeVersion": 1
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  []
            ]
      },
      "AI Agent1": {
            "main": [
                  [
                        {
                              "node": "Update Zendesk with Mitre Data",
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
                              "node": "Embed JSON in Qdrant Collection",
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
                              "node": "AI Agent1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Token Splitter1": {
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
      "Embeddings OpenAI": {
            "ai_embedding": [
                  [
                        {
                              "node": "Qdrant Vector Store query",
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
                              "node": "Split Out",
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
                              "node": "Embed JSON in Qdrant Collection",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Embeddings OpenAI2": {
            "ai_embedding": [
                  [
                        {
                              "node": "Query Qdrant Vector Store",
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
                              "node": "AI Agent1",
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
                              "node": "Embed JSON in Qdrant Collection",
                              "type": "ai_document",
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
      "Move on to next ticket": {
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
      "Get all Zendesk Tickets": {
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
      "Structured Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "AI Agent1",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Qdrant Vector Store query": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Query Qdrant Vector Store": {
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
      "Pull Mitre Data From Gdrive": {
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
      "Update Zendesk with Mitre Data": {
            "main": [
                  [
                        {
                              "node": "Move on to next ticket",
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
                              "node": "Pull Mitre Data From Gdrive",
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
    name: "Automate Testimonials In Strapi With N8n",
    nodes: [
      {
            "name": "Simplify Result",
            "type": "n8n-nodes-base.set",
            "position": [
                  680,
                  100
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "Content",
                                    "value": "={{$json[\"full_text\"].replace(/(?:https?|ftp):\\/\\/[\\n\\S]+/g, '')}}"
                              },
                              {
                                    "name": "Author",
                                    "value": "={{$json[\"user\"][\"name\"]}} (@{{$json[\"user\"][\"screen_name\"]}})"
                              },
                              {
                                    "name": "Created",
                                    "value": "={{new Date($json[\"created_at\"]).toISOString()}}"
                              },
                              {
                                    "name": "URL",
                                    "value": "=https://twitter.com/{{$json[\"user\"][\"screen_name\"]}}/status/{{$json[\"id_str\"]}}"
                              }
                        ]
                  },
                  "options": {},
                  "keepOnlySet": true
            },
            "typeVersion": 1
      },
      {
            "name": "Store in Strapi",
            "type": "n8n-nodes-base.strapi",
            "position": [
                  1780,
                  100
            ],
            "parameters": {
                  "columns": "Content,Author,Created,URL",
                  "operation": "create",
                  "contentType": "posts"
            },
            "credentials": {
                  "strapiApi": {
                        "id": "136",
                        "name": "Strapi Demo"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Every 30 Minutes",
            "type": "n8n-nodes-base.interval",
            "position": [
                  240,
                  100
            ],
            "parameters": {
                  "unit": "minutes",
                  "interval": 30
            },
            "typeVersion": 1
      },
      {
            "name": "Is Retweet or Old?",
            "type": "n8n-nodes-base.if",
            "position": [
                  900,
                  100
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{$json[\"Content\"]}}",
                                    "value2": "RT @",
                                    "operation": "startsWith"
                              }
                        ],
                        "dateTime": [
                              {
                                    "value1": "={{$json[\"Created\"]}}",
                                    "value2": "={{new Date(new Date().getTime() - 30 * 60 * 1000)}}",
                                    "operation": "before"
                              }
                        ]
                  },
                  "combineOperation": "any"
            },
            "typeVersion": 1
      },
      {
            "name": "Search Tweets",
            "type": "n8n-nodes-base.twitter",
            "position": [
                  460,
                  100
            ],
            "parameters": {
                  "operation": "search",
                  "searchText": "(strapi OR n8n.io) AND lang:en",
                  "additionalFields": {
                        "tweetMode": "extended",
                        "resultType": "recent"
                  }
            },
            "credentials": {
                  "twitterOAuth1Api": {
                        "id": "15",
                        "name": "@MutedJam"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  240,
                  -120
            ],
            "webhookId": "6f833370-9068-44ef-8e56-4ceb563a851e",
            "parameters": {
                  "path": "6f833370-9068-44ef-8e56-4ceb563a851e",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 1
      },
      {
            "name": "Simplify Webhook Result",
            "type": "n8n-nodes-base.set",
            "position": [
                  460,
                  -120
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "Content",
                                    "value": "={{$json[\"body\"][\"data\"][\"fields\"][1][\"value\"]}}"
                              },
                              {
                                    "name": "Author",
                                    "value": "={{$json[\"body\"][\"data\"][\"fields\"][0][\"value\"]}}"
                              },
                              {
                                    "name": "Created",
                                    "value": "={{new Date().toISOString()}}"
                              },
                              {
                                    "name": "URL"
                              }
                        ]
                  },
                  "options": {},
                  "keepOnlySet": true
            },
            "typeVersion": 1
      },
      {
            "name": "Analyze Form Submission",
            "type": "n8n-nodes-base.googleCloudNaturalLanguage",
            "position": [
                  680,
                  -220
            ],
            "parameters": {
                  "content": "={{$json[\"Content\"]}}",
                  "options": {}
            },
            "credentials": {
                  "googleCloudNaturalLanguageOAuth2Api": {
                        "id": "138",
                        "name": "Google Cloud Natural Language account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Analyze Tweet",
            "type": "n8n-nodes-base.googleCloudNaturalLanguage",
            "position": [
                  1120,
                  200
            ],
            "parameters": {
                  "content": "={{$json[\"Content\"]}}",
                  "options": {}
            },
            "credentials": {
                  "googleCloudNaturalLanguageOAuth2Api": {
                        "id": "138",
                        "name": "Google Cloud Natural Language account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Merge Form Sentiment with Source",
            "type": "n8n-nodes-base.merge",
            "position": [
                  900,
                  -120
            ],
            "parameters": {
                  "mode": "mergeByIndex"
            },
            "typeVersion": 1
      },
      {
            "name": "Merge Tweet Sentiment with Source",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1340,
                  100
            ],
            "parameters": {
                  "mode": "mergeByIndex"
            },
            "typeVersion": 1
      },
      {
            "name": "Positive Form Sentiment?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1120,
                  -120
            ],
            "parameters": {
                  "conditions": {
                        "number": [
                              {
                                    "value1": "={{$json[\"documentSentiment\"][\"score\"]}}",
                                    "value2": 0.4,
                                    "operation": "larger"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Store Form Submission in Strapi",
            "type": "n8n-nodes-base.strapi",
            "position": [
                  1340,
                  -120
            ],
            "parameters": {
                  "columns": "Content,Author,Created,URL",
                  "operation": "create",
                  "contentType": "posts"
            },
            "credentials": {
                  "strapiApi": {
                        "id": "136",
                        "name": "Strapi Demo"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Positive Tweet Sentiment?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1560,
                  100
            ],
            "parameters": {
                  "conditions": {
                        "number": [
                              {
                                    "value1": "={{$json[\"documentSentiment\"][\"score\"]}}",
                                    "value2": 0.3,
                                    "operation": "larger"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Simplify Webhook Result",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze Tweet": {
            "main": [
                  [
                        {
                              "node": "Merge Tweet Sentiment with Source",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Search Tweets": {
            "main": [
                  [
                        {
                              "node": "Simplify Result",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Simplify Result": {
            "main": [
                  [
                        {
                              "node": "Is Retweet or Old?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Every 30 Minutes": {
            "main": [
                  [
                        {
                              "node": "Search Tweets",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is Retweet or Old?": {
            "main": [
                  null,
                  [
                        {
                              "node": "Analyze Tweet",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge Tweet Sentiment with Source",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze Form Submission": {
            "main": [
                  [
                        {
                              "node": "Merge Form Sentiment with Source",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Simplify Webhook Result": {
            "main": [
                  [
                        {
                              "node": "Analyze Form Submission",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge Form Sentiment with Source",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Positive Form Sentiment?": {
            "main": [
                  [
                        {
                              "node": "Store Form Submission in Strapi",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Positive Tweet Sentiment?": {
            "main": [
                  [
                        {
                              "node": "Store in Strapi",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge Form Sentiment with Source": {
            "main": [
                  [
                        {
                              "node": "Positive Form Sentiment?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge Tweet Sentiment with Source": {
            "main": [
                  [
                        {
                              "node": "Positive Tweet Sentiment?",
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
    name: "Bitrix24 Chatbot Application Workflow example with Webhook Integration",
    nodes: [
      {
            "id": "ddd802bb-0da0-474d-b1e9-74f247e603e0",
            "name": "Bitrix24 Handler",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  0,
                  0
            ],
            "webhookId": "c3ae607d-41f0-42bc-b669-c2c77936d443",
            "parameters": {
                  "path": "bitrix24/handler.php",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 1
      },
      {
            "id": "5676a53e-6758-4ad5-ace6-e494fa10b6c3",
            "name": "Credentials",
            "type": "n8n-nodes-base.set",
            "position": [
                  200,
                  0
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "030f8f90-2669-4c20-9eab-c572c4b7c70c",
                                    "name": "CLIENT_ID",
                                    "type": "string",
                                    "value": "local.6779636e712043.37129431"
                              },
                              {
                                    "id": "de9bbb7a-b782-4540-b259-527625db8490",
                                    "name": "CLIENT_SECRET",
                                    "type": "string",
                                    "value": "dTzUfBoTFLxNhuzc1zsnDbCeii98ZaE5By4aQPQEOxLJAS9y6i"
                              },
                              {
                                    "id": "86b7aff7-1e25-4b12-a366-23cf34e5a405",
                                    "name": "application_token",
                                    "type": "string",
                                    "value": "={{ $json.body['auth[application_token]'] }}"
                              },
                              {
                                    "id": "69bbcb1f-ba6e-42eb-be8a-ee0707ce997d",
                                    "name": "domain",
                                    "type": "string",
                                    "value": "={{ $json.body['auth[domain]'] }}\n"
                              },
                              {
                                    "id": "dc1b0515-f06a-4731-b0dc-912a8d04e56b",
                                    "name": "access_token",
                                    "type": "string",
                                    "value": "={{ $json.body['auth[access_token]'] }}"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "b72c00cf-9f8c-4c2a-9093-b80d82bab85b",
            "name": "Validate Token",
            "type": "n8n-nodes-base.if",
            "position": [
                  400,
                  0
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
                        "combinator": "or",
                        "conditions": [
                              {
                                    "id": "da73d0ba-6eeb-405e-89fe-9d041fd2e0cd",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.CLIENT_ID }}",
                                    "rightValue": "={{ $json.application_token }}"
                              },
                              {
                                    "id": "4ba90f7b-0299-4097-9ae7-6e4dee428a74",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "1",
                                    "rightValue": "1"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "f0feb392-873a-4643-b7ad-0e6d9f877e82",
            "name": "Route Event",
            "type": "n8n-nodes-base.switch",
            "position": [
                  600,
                  0
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "ONIMBOTMESSAGEADD",
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
                                                      "leftValue": "={{ $json.body.event }}",
                                                      "rightValue": "ONIMBOTMESSAGEADD"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "ONIMBOTJOINCHAT",
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
                                                      "id": "e9125f57-129e-4026-86ff-746d40b92b04",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.event }}",
                                                      "rightValue": "ONIMBOTJOINCHAT"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "ONAPPINSTALL",
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
                                                      "id": "2db7bed5-fd88-4900-b8d2-e27b49c2fcca",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.event }}",
                                                      "rightValue": "ONAPPINSTALL"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "ONIMBOTDELETE",
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
                                                      "id": "b708d339-fd46-470d-b0d5-ff2eb405f5ce",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.event }}",
                                                      "rightValue": "ONIMBOTDELETE"
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
            "id": "56fcdc5f-d509-4c9f-a437-79c53add49f8",
            "name": "Process Message",
            "type": "n8n-nodes-base.function",
            "position": [
                  800,
                  0
            ],
            "parameters": {
                  "functionCode": "// Process Message Node\nconst items = $input.all();\nconst item = items[0];\n\n// Get message data from the correct path\nconst message = item.json.body['data[PARAMS][MESSAGE]'];\nconst dialogId = item.json.body['data[PARAMS][DIALOG_ID]'];\n\n// Get auth data\nconst auth = {\n access_token: item.json.access_token,\n domain: item.json.domain\n};\n\nif (message.toLowerCase() === \"what's hot\") {\n return {\n json: {\n DIALOG_ID: dialogId,\n MESSAGE: \"Hi! I am an example-bot.\\nI repeat what you say\",\n AUTH: auth.access_token,\n DOMAIN: auth.domain\n }\n };\n} else {\n return {\n json: {\n DIALOG_ID: dialogId,\n MESSAGE: `You said:\\n${message}`,\n AUTH: auth.access_token,\n DOMAIN: auth.domain\n }\n };\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "a647ed67-c812-4416-8c85-55a681bc7f80",
            "name": "Process Join",
            "type": "n8n-nodes-base.function",
            "position": [
                  800,
                  160
            ],
            "parameters": {
                  "functionCode": "// Process Join Node\nconst items = $input.all();\nconst item = items[0];\n\n// Get dialog ID from the correct path\nconst dialogId = item.json.body['data[PARAMS][DIALOG_ID]'];\n\n// Get auth data\nconst auth = {\n access_token: item.json.access_token,\n domain: item.json.domain\n};\n\nreturn {\n json: {\n DIALOG_ID: dialogId,\n MESSAGE: 'Hi! I am an example-bot. I repeat what you say',\n AUTH: auth.access_token,\n DOMAIN: auth.domain\n }\n};"
            },
            "typeVersion": 1
      },
      {
            "id": "4aac8853-d80e-4201-9f31-7838d18afe71",
            "name": "Process Install",
            "type": "n8n-nodes-base.function",
            "position": [
                  800,
                  320
            ],
            "parameters": {
                  "functionCode": "// Process Install Node\nconst items = $input.all();\nconst item = items[0];\n\n// Get the webhook URL from input\nconst handlerBackUrl = item.json.webhookUrl;\n\n// Get auth data directly from item.json\nconst auth = {\n access_token: item.json.access_token,\n application_token: item.json.application_token,\n domain: item.json.domain\n};\n\nreturn {\n json: {\n handler_back_url: handlerBackUrl,\n CODE: 'LocalExampleBot',\n TYPE: 'B',\n EVENT_MESSAGE_ADD: handlerBackUrl,\n EVENT_WELCOME_MESSAGE: handlerBackUrl,\n EVENT_BOT_DELETE: handlerBackUrl,\n PROPERTIES: {\n NAME: 'Bot',\n LAST_NAME: 'Example',\n COLOR: 'AQUA',\n EMAIL: 'no@example.com',\n PERSONAL_BIRTHDAY: '2020-07-18',\n WORK_POSITION: 'Report on affairs',\n PERSONAL_GENDER: 'M'\n },\n // Use the auth data from item.json\n AUTH: auth.access_token,\n CLIENT_ID: auth.application_token,\n DOMAIN: auth.domain\n }\n};"
            },
            "typeVersion": 1
      },
      {
            "id": "30922462-255b-4ba6-8167-88aec244fdb1",
            "name": "Register Bot",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1000,
                  320
            ],
            "parameters": {
                  "url": "=https://{{ $json.DOMAIN }}/rest/imbot.register?auth={{$json.AUTH}}",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "CODE",
                                    "value": "LocalExampleBot"
                              },
                              {
                                    "name": "TYPE",
                                    "value": "B"
                              },
                              {
                                    "name": "EVENT_MESSAGE_ADD",
                                    "value": "={{$json.handler_back_url}}"
                              },
                              {
                                    "name": "EVENT_WELCOME_MESSAGE",
                                    "value": "={{$json.handler_back_url}}"
                              },
                              {
                                    "name": "EVENT_BOT_DELETE",
                                    "value": "={{$json.handler_back_url}}"
                              },
                              {
                                    "name": "PROPERTIES",
                                    "value": "={{ {\n NAME: 'Bot',\n LAST_NAME: 'Example',\n COLOR: 'AQUA',\n EMAIL: 'no@example.com',\n PERSONAL_BIRTHDAY: '2020-07-18',\n WORK_POSITION: 'Report on affairs',\n PERSONAL_GENDER: 'M'\n} }}"
                              },
                              {
                                    "name": "CLIENT_ID",
                                    "value": "={{ $json.CLIENT_ID }}"
                              },
                              {
                                    "name": "CLIENT_SECRET",
                                    "value": "={{ $json.AUTH }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "8c1c7ebf-d5b3-472e-9d98-34cc65ba86ba",
            "name": "Send Message",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1000,
                  0
            ],
            "parameters": {
                  "url": "=https://{{$json.DOMAIN}}/rest/imbot.message.add?auth={{$json.AUTH}}",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "DIALOG_ID",
                                    "value": "={{ $json.DIALOG_ID }}"
                              },
                              {
                                    "name": "MESSAGE",
                                    "value": "={{ $json.MESSAGE }}"
                              },
                              {
                                    "name": "AUTH",
                                    "value": "={{ $json.AUTH }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "af0d2b44-53f7-4c4c-9428-d54ebcf41bff",
            "name": "Send Join Message",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1000,
                  160
            ],
            "parameters": {
                  "url": "=https://{{$json.DOMAIN}}/rest/imbot.message.add",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "DIALOG_ID",
                                    "value": "={{ $json.DIALOG_ID }}"
                              },
                              {
                                    "name": "MESSAGE",
                                    "value": "={{ $json.MESSAGE }}"
                              },
                              {
                                    "name": "AUTH",
                                    "value": "={{ $json.AUTH }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "9110f66d-1c35-44b4-bc73-18f821b50b71",
            "name": "Process Delete",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  800,
                  480
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "81a5fc23-47a4-4ef8-bfb4-31593aed12fd",
            "name": "Success Response",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1200,
                  0
            ],
            "parameters": {
                  "options": {
                        "responseCode": 200
                  },
                  "respondWith": "json",
                  "responseBody": "={\n \"result\": true\n}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "a19f3b0b-496f-4f3d-a9c2-044356070e32",
            "name": "Error Response",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  400,
                  160
            ],
            "parameters": {
                  "options": {
                        "responseCode": 401
                  },
                  "respondWith": "json",
                  "responseBody": "={{\n \"result\": false,\n \"error\": \"Invalid application token\"\n}}"
            },
            "typeVersion": 1.1
      }
],
    connections: {
      "Credentials": {
            "main": [
                  [
                        {
                              "node": "Validate Token",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Route Event": {
            "main": [
                  [
                        {
                              "node": "Process Message",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Process Join",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Process Install",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Process Delete",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [],
                  [],
                  [],
                  [],
                  []
            ]
      },
      "Process Join": {
            "main": [
                  [
                        {
                              "node": "Send Join Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Register Bot": {
            "main": [
                  [
                        {
                              "node": "Success Response",
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
                              "node": "Success Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Process Delete": {
            "main": [
                  [
                        {
                              "node": "Success Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Validate Token": {
            "main": [
                  [
                        {
                              "node": "Route Event",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Error Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Process Install": {
            "main": [
                  [
                        {
                              "node": "Register Bot",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Process Message": {
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
      "Bitrix24 Handler": {
            "main": [
                  [
                        {
                              "node": "Credentials",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Join Message": {
            "main": [
                  [
                        {
                              "node": "Success Response",
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
    name: "ChatGPT Automatic Code Review In Gitlab MR",
    nodes: [
      {
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  880,
                  540
            ],
            "parameters": {
                  "content": "## Edit your own prompt ⬇️\n"
            },
            "typeVersion": 1
      },
      {
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -380,
                  580
            ],
            "parameters": {
                  "content": "## Filter comments and customize your trigger words ⬇️"
            },
            "typeVersion": 1
      },
      {
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -120,
                  560
            ],
            "parameters": {
                  "content": "## Replace your gitlab URL and token ⬇️"
            },
            "typeVersion": 1
      },
      {
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -540,
                  760
            ],
            "webhookId": "6cfd2f23-6f45-47d4-9fe0-8f6f1c05829a",
            "parameters": {
                  "path": "e21095c0-1876-4cd9-9e92-a2eac737f03e",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 1.1
      },
      {
            "name": "Code",
            "type": "n8n-nodes-base.code",
            "position": [
                  720,
                  540
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "// Loop over input items and add a new field called 'myNewField' to the JSON of each one\nvar diff = $input.item.json.gitDiff\n\nlet lines = diff.trimEnd().split('\\n');\n\nlet originalCode = '';\nlet newCode = '';\n\nlines.forEach(line => {\n console.log(line)\n if (line.startsWith('-')) {\n originalCode += line + \"\\n\";\n } else if (line.startsWith('+')) {\n newCode += line + \"\\n\";\n } else {\n originalCode += line + \"\\n\";\n newCode += line + \"\\n\";\n }\n});\n\nreturn {\n originalCode:originalCode,\n newCode:newCode\n};\n\n"
            },
            "typeVersion": 2
      },
      {
            "name": "Split Out1",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  140,
                  740
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "changes"
            },
            "typeVersion": 1
      },
      {
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  900,
                  860
            ],
            "parameters": {
                  "options": {
                        "baseURL": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Get Changes1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -60,
                  740
            ],
            "parameters": {
                  "url": "=https://gitlab.com/api/v4/projects/{{ $json[\"body\"][\"project_id\"] }}/merge_requests/{{ $json[\"body\"][\"merge_request\"][\"iid\"] }}/changes",
                  "options": {},
                  "sendHeaders": true,
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "PRIVATE-TOKEN"
                              }
                        ]
                  }
            },
            "typeVersion": 4.1
      },
      {
            "name": "Skip File Change1",
            "type": "n8n-nodes-base.if",
            "position": [
                  340,
                  740
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
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "false",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.renamed_file }}",
                                    "rightValue": ""
                              },
                              {
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "false",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.deleted_file }}",
                                    "rightValue": ""
                              },
                              {
                                    "operator": {
                                          "type": "string",
                                          "operation": "startsWith"
                                    },
                                    "leftValue": "={{ $json.diff }}",
                                    "rightValue": "@@"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "name": "Parse Last Diff Line1",
            "type": "n8n-nodes-base.code",
            "position": [
                  540,
                  540
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "const parseLastDiff = (gitDiff) => {\n gitDiff = gitDiff.replace(/\\n\\\\ No newline at end of file/, '')\n \n const diffList = gitDiff.trimEnd().split('\\n').reverse();\n const lastLineFirstChar = diffList?.[0]?.[0];\n const lastDiff =\n diffList.find((item) => {\n return /^@@ \\-\\d+,\\d+ \\+\\d+,\\d+ @@/g.test(item);\n }) || '';\n\n const [lastOldLineCount, lastNewLineCount] = lastDiff\n .replace(/@@ \\-(\\d+),(\\d+) \\+(\\d+),(\\d+) @@.*/g, ($0, $1, $2, $3, $4) => {\n return `${+$1 + +$2},${+$3 + +$4}`;\n })\n .split(',');\n \n if (!/^\\d+$/.test(lastOldLineCount) || !/^\\d+$/.test(lastNewLineCount)) {\n return {\n lastOldLine: -1,\n lastNewLine: -1,\n gitDiff,\n };\n }\n\n\n const lastOldLine = lastLineFirstChar === '+' ? null : (parseInt(lastOldLineCount) || 0) - 1;\n const lastNewLine = lastLineFirstChar === '-' ? null : (parseInt(lastNewLineCount) || 0) - 1;\n\n return {\n lastOldLine,\n lastNewLine,\n gitDiff,\n };\n};\n\nreturn parseLastDiff($input.item.json.diff)\n"
            },
            "typeVersion": 2
      },
      {
            "name": "Post Discussions1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1280,
                  720
            ],
            "parameters": {
                  "url": "=https://gitlab.com/api/v4/projects/{{ $('Webhook').item.json[\"body\"][\"project_id\"] }}/merge_requests/{{ $('Webhook').item.json[\"body\"][\"merge_request\"][\"iid\"] }}/discussions",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "contentType": "multipart-form-data",
                  "sendHeaders": true,
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "body",
                                    "value": "={{ $('Basic LLM Chain1').item.json[\"text\"] }}"
                              },
                              {
                                    "name": "position[position_type]",
                                    "value": "text"
                              },
                              {
                                    "name": "position[old_path]",
                                    "value": "={{ $('Split Out1').item.json.old_path }}"
                              },
                              {
                                    "name": "position[new_path]",
                                    "value": "={{ $('Split Out1').item.json.new_path }}"
                              },
                              {
                                    "name": "position[start_sha]",
                                    "value": "={{ $('Get Changes1').item.json.diff_refs.start_sha }}"
                              },
                              {
                                    "name": "position[head_sha]",
                                    "value": "={{ $('Get Changes1').item.json.diff_refs.head_sha }}"
                              },
                              {
                                    "name": "position[base_sha]",
                                    "value": "={{ $('Get Changes1').item.json.diff_refs.base_sha }}"
                              },
                              {
                                    "name": "position[new_line]",
                                    "value": "={{ $('Parse Last Diff Line1').item.json.lastNewLine || '' }}"
                              },
                              {
                                    "name": "position[old_line]",
                                    "value": "={{ $('Parse Last Diff Line1').item.json.lastOldLine || '' }}"
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "PRIVATE-TOKEN"
                              }
                        ]
                  }
            },
            "typeVersion": 4.1
      },
      {
            "name": "Need Review1",
            "type": "n8n-nodes-base.if",
            "position": [
                  -320,
                  760
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
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.body.object_attributes.note }}",
                                    "rightValue": "+0"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "name": "Basic LLM Chain1",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  880,
                  720
            ],
            "parameters": {
                  "prompt": "=File path：{{ $('Skip File Change1').item.json.new_path }}\n\n```Original code\n {{ $json.originalCode }}\n```\nchange to\n```New code\n {{ $json.newCode }}\n```\nPlease review the code changes in this section:",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "# Overview:\n You are a senior programming expert Bot, responsible for reviewing code changes and providing review recommendations.\n At the beginning of the suggestion, it is necessary to clearly make a decision to \"reject\" or \"accept\" the code change, and rate the change in the format \"Change Score: Actual Score\", with a score range of 0-100 points.\n Then, point out the existing problems in concise language and a stern tone.\n If you feel it is necessary, you can directly provide the modified content.\n Your review proposal must use rigorous Markdown format."
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1200,
                  540
            ],
            "parameters": {
                  "content": "## Replace your gitlab URL and token ⬇️"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Code": {
            "main": [
                  [
                        {
                              "node": "Basic LLM Chain1",
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
                              "node": "Need Review1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out1": {
            "main": [
                  [
                        {
                              "node": "Skip File Change1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Changes1": {
            "main": [
                  [
                        {
                              "node": "Split Out1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Need Review1": {
            "main": [
                  [
                        {
                              "node": "Get Changes1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Basic LLM Chain1": {
            "main": [
                  [
                        {
                              "node": "Post Discussions1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Skip File Change1": {
            "main": [
                  [
                        {
                              "node": "Parse Last Diff Line1",
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
                              "node": "Basic LLM Chain1",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Parse Last Diff Line1": {
            "main": [
                  [
                        {
                              "node": "Code",
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
    name: "Classify New Bugs In Linear With OpenAI S GPT-4 And Move Them To The Right Team",
    nodes: [
      {
            "id": "8920dc6e-b2fb-4446-8cb3-f3f6d626dcb3",
            "name": "Linear Trigger",
            "type": "n8n-nodes-base.linearTrigger",
            "position": [
                  420,
                  360
            ],
            "webhookId": "a02faf62-684f-44bb-809f-e962c9ede70d",
            "parameters": {
                  "teamId": "7a330c36-4b39-4bf1-922e-b4ceeb91850a",
                  "resources": [
                        "issue"
                  ],
                  "authentication": "oAuth2"
            },
            "credentials": {
                  "linearOAuth2Api": {
                        "id": "02MqKUMdPxr9t3mX",
                        "name": "Nik's Linear Creds"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "61214884-62f9-4a00-9517-e2d51b44d0ae",
            "name": "Only tickets that need to be classified",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1000,
                  360
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
                                    "id": "bc3a756d-b2b6-407b-91c9-a1cd9da004e0",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notContains"
                                    },
                                    "leftValue": "={{ $('Linear Trigger').item.json.data.description }}",
                                    "rightValue": "Add a description here"
                              },
                              {
                                    "id": "f3d8d0fc-332d-41a6-aef8-1f221bf30c0e",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Linear Trigger').item.json.data.state.id }}",
                                    "rightValue": "6b9a8eec-82dc-453a-878b-50f4c98d3e53"
                              },
                              {
                                    "id": "9cdb55b2-3ca9-43bd-84b0-ef025b59ce18",
                                    "operator": {
                                          "type": "number",
                                          "operation": "gt"
                                    },
                                    "leftValue": "={{ $('Linear Trigger').item.json.data.labels.filter(label => label.id === 'f2b6e3e9-b42d-4106-821c-6a08dcb489a9').length }}",
                                    "rightValue": 0
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "da4d8e0c-895b-4a84-8319-438f971af403",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  111.31510859283728
            ],
            "parameters": {
                  "color": 7,
                  "height": 219.68489140716272,
                  "content": "### When does this fire?\nIn our setup we have a general team in Linear where we post new tickets to. Additionally, the bug needs to have a certain label and the description needs to be filled. \nYou're of course free to adjust this to your needs\n👇"
            },
            "typeVersion": 1
      },
      {
            "id": "b7e3a328-96c4-4082-93a9-0cb331367190",
            "name": "Update team",
            "type": "n8n-nodes-base.linear",
            "position": [
                  2160,
                  280
            ],
            "parameters": {
                  "issueId": "={{ $('Linear Trigger').item.json.data.id }}",
                  "operation": "update",
                  "updateFields": {
                        "teamId": "={{ $json.teamId }}"
                  }
            },
            "credentials": {
                  "linearApi": {
                        "id": "oYIZvhmcNt5JWTCP",
                        "name": "Nik's Linear Key"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "858764ce-cd24-4399-88ce-cf69e676beaa",
            "name": "Get all linear teams",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1300,
                  540
            ],
            "parameters": {
                  "url": "https://api.linear.app/graphql",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "query",
                                    "value": "{ teams { nodes { id name } } }"
                              }
                        ]
                  },
                  "nodeCredentialType": "linearOAuth2Api"
            },
            "credentials": {
                  "linearOAuth2Api": {
                        "id": "02MqKUMdPxr9t3mX",
                        "name": "Nik's Linear Creds"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "167f0c66-5bfb-4dd7-a345-81f4d62df2c4",
            "name": "Set team ID",
            "type": "n8n-nodes-base.set",
            "position": [
                  2000,
                  280
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "a46c4476-b851-4112-ac72-e805308c5ab7",
                                    "name": "teamId",
                                    "type": "string",
                                    "value": "={{ $('Get all linear teams').first().json.data.teams.nodes.find(team => team.name === $json.message.content).id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "36363240-2b03-4af8-8987-0db95094403b",
            "name": "Set me up",
            "type": "n8n-nodes-base.set",
            "position": [
                  700,
                  360
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "a56f24c8-0a28-4dd2-885a-cb6a081a5bf4",
                                    "name": "teams",
                                    "type": "string",
                                    "value": "- [Adore][Is responsible for every persona that is not Enterprise. This includes signup journeys, trials, n8n Cloud, the Canvas building experience and more, the nodes detail view (NDV), the nodes panel, the workflows list and the executions view] \n- [Payday][Is responsible for the Enterprise persona. This includes making sure n8n is performant, the enterprise features SSO, LDAP, SAML, Log streaming, environments, queue mode, version control, external storage. Additionally the team looks out for the execution logic in n8n and how branching works] \n- [Nodes][This team is responsible for everything that is related to a specific node in n8n] \n- [Other][This is a placeholder if you don't know to which team something belongs]"
                              },
                              {
                                    "id": "d672cb59-72be-4fc8-9327-2623795f225d",
                                    "name": "slackChannel",
                                    "type": "string",
                                    "value": "#yourChannelName"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "49f2a157-b037-46d9-a6d7-97f8a72ee093",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  581.3284642016245,
                  85.15358950105212
            ],
            "parameters": {
                  "color": 5,
                  "width": 349.85308830334156,
                  "height": 439.62604295396085,
                  "content": "## Setup\n1. Add your Linear and OpenAi credentials\n2. Change the team in the `Linear Trigger` to match your needs\n3. Customize your teams and their areas of responsibility in the `Set me up` node. Please use the format `[Teamname][Description/Areas of responsibility]`. Also make sure that the teamnames match the names in Linear exactly.\n4. Change the Slack channel in the `Set me up` node to your Slack channel of choice."
            },
            "typeVersion": 1
      },
      {
            "id": "8cdb3d0d-4fd3-4ea2-957f-daf746934728",
            "name": "Check if AI was able to find a team",
            "type": "n8n-nodes-base.if",
            "position": [
                  1780,
                  380
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
                                    "id": "86bfb688-3ecc-4360-b83a-d706bb11c8f9",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEquals"
                                    },
                                    "leftValue": "={{ $json.message.content }}",
                                    "rightValue": "Other"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "a4cb20ca-658a-4b30-9185-5af9a32a7e20",
            "name": "Notify in Slack",
            "type": "n8n-nodes-base.slack",
            "position": [
                  2000,
                  460
            ],
            "parameters": {
                  "text": "The AI was not able to identify a fitting team for a bug",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "name",
                        "value": "={{ $('Set me up').first().json.slackChannel }}"
                  },
                  "otherOptions": {}
            },
            "credentials": {
                  "slackApi": {
                        "id": "376",
                        "name": "Idea Bot"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "393b2392-80be-4a68-9240-dc1065e0081a",
            "name": "Merge data",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1600,
                  380
            ],
            "parameters": {
                  "mode": "chooseBranch"
            },
            "typeVersion": 2.1
      },
      {
            "id": "f25da511-b255-4a53-ba4e-5765916e90be",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1220,
                  360
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4-32k-0314",
                        "cachedResultName": "GPT-4-32K-0314"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "role": "system",
                                    "content": "I need you to classify a bug ticket and tell me which team should work on it"
                              },
                              {
                                    "role": "system",
                                    "content": "All possible teams will be described in the following format: [Teamname][Areas of responsibility] "
                              },
                              {
                                    "role": "system",
                                    "content": "=The possible teams are the following:\n {{ $('Set me up').first().json.teams }}"
                              },
                              {
                                    "role": "system",
                                    "content": "=This is the bug that we're trying to classify:\nTitle: {{ $('Linear Trigger').first().json.data.title }}\nDescription: {{ $('Linear Trigger').first().json.data.description }}"
                              },
                              {
                                    "content": "Which team should work on this bug?"
                              },
                              {
                                    "role": "system",
                                    "content": "Do not respond with anything else than the name of the team from the list you were given"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "VQtv7frm7eLiEDnd",
                        "name": "OpenAi account 7"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Merge data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set me up": {
            "main": [
                  [
                        {
                              "node": "Only tickets that need to be classified",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge data": {
            "main": [
                  [
                        {
                              "node": "Check if AI was able to find a team",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set team ID": {
            "main": [
                  [
                        {
                              "node": "Update team",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Linear Trigger": {
            "main": [
                  [
                        {
                              "node": "Set me up",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get all linear teams": {
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
      "Check if AI was able to find a team": {
            "main": [
                  [
                        {
                              "node": "Set team ID",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Notify in Slack",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Only tickets that need to be classified": {
            "main": [
                  [
                        {
                              "node": "OpenAI",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get all linear teams",
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
    name: "Create, update, and get a profile in Humantic AI",
    nodes: [
      {
            "name": "On clicking 'execute'",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  290,
                  300
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "name": "Humantic AI",
            "type": "n8n-nodes-base.humanticAi",
            "position": [
                  490,
                  300
            ],
            "parameters": {
                  "userId": "https://www.linkedin.com/in/harshil1712/"
            },
            "credentials": {
                  "humanticAiApi": "humantic"
            },
            "typeVersion": 1
      },
      {
            "name": "HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  690,
                  300
            ],
            "parameters": {
                  "url": "",
                  "options": {},
                  "responseFormat": "file"
            },
            "typeVersion": 1
      },
      {
            "name": "Humantic AI1",
            "type": "n8n-nodes-base.humanticAi",
            "position": [
                  890,
                  300
            ],
            "parameters": {
                  "userId": "={{$node[\"Humantic AI\"].json[\"results\"][\"userid\"]}}",
                  "operation": "update",
                  "sendResume": true
            },
            "credentials": {
                  "humanticAiApi": "humantic"
            },
            "typeVersion": 1
      },
      {
            "name": "Humantic AI2",
            "type": "n8n-nodes-base.humanticAi",
            "position": [
                  1090,
                  300
            ],
            "parameters": {
                  "userId": "={{$node[\"Humantic AI\"].json[\"results\"][\"userid\"]}}",
                  "options": {
                        "persona": [
                              "hiring"
                        ]
                  },
                  "operation": "get"
            },
            "credentials": {
                  "humanticAiApi": "humantic"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Humantic AI": {
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
                              "node": "Humantic AI1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Humantic AI1": {
            "main": [
                  [
                        {
                              "node": "Humantic AI2",
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
                              "node": "Humantic AI",
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
    name: "Enhance Customer Chat By Buffering Messages With Twilio And Redis",
    nodes: [
      {
            "id": "d61d8ff3-532a-4b0d-a5a7-e02d2e79ddce",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2660,
                  480
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
            "id": "b6d5c1cf-b4a1-4901-b001-0c375747ee63",
            "name": "No Operation, do nothing",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1660,
                  520
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "f4e08e32-bb96-4b5d-852e-26ad6fec3c8c",
            "name": "Add to Messages Stack",
            "type": "n8n-nodes-base.redis",
            "position": [
                  1340,
                  200
            ],
            "parameters": {
                  "list": "=chat-buffer:{{ $json.From }}",
                  "tail": true,
                  "operation": "push",
                  "messageData": "={{ $json.Body }}"
            },
            "credentials": {
                  "redis": {
                        "id": "zU4DA70qSDrZM1El",
                        "name": "Redis account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "181ae99e-ebe7-4e99-b5a5-999acc249621",
            "name": "Should Continue?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1660,
                  360
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
                                    "id": "ec39573f-f92a-4fe4-a832-0a137de8e7d0",
                                    "operator": {
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Get Latest Message Stack').item.json.messages.last() }}",
                                    "rightValue": "={{ $('Twilio Trigger').item.json.Body }}"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "640c63ca-2798-48a9-8484-b834c1a36301",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  2780,
                  480
            ],
            "parameters": {
                  "sessionKey": "=chat-debouncer:{{ $('Twilio Trigger').item.json.From }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "123c35c5-f7b2-4b4d-b220-0e5273e25115",
            "name": "Twilio Trigger",
            "type": "n8n-nodes-base.twilioTrigger",
            "position": [
                  940,
                  360
            ],
            "webhookId": "0ca3da0e-e4e1-4e94-8380-06207bf9b429",
            "parameters": {
                  "updates": [
                        "com.twilio.messaging.inbound-message.received"
                  ]
            },
            "credentials": {
                  "twilioApi": {
                        "id": "TJv4H4lXxPCLZT50",
                        "name": "Twilio account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f4e86455-7f4d-4401-8f61-a859be1433a9",
            "name": "Get Latest Message Stack",
            "type": "n8n-nodes-base.redis",
            "position": [
                  1500,
                  360
            ],
            "parameters": {
                  "key": "=chat-buffer:{{ $json.From }}",
                  "keyType": "list",
                  "options": {},
                  "operation": "get",
                  "propertyName": "messages"
            },
            "credentials": {
                  "redis": {
                        "id": "zU4DA70qSDrZM1El",
                        "name": "Redis account"
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": false
      },
      {
            "id": "02f8e7f5-12b4-4a5a-9ce9-5f0558e447aa",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1232.162872321277,
                  -50.203627749982275
            ],
            "parameters": {
                  "color": 7,
                  "width": 632.8309394802918,
                  "height": 766.7069233634998,
                  "content": "## Step 2. Buffer Incoming Messages\n[Learn more about using Redis](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.redis)\n\n* New messages are captured into a list.\n* After X seconds, we get a fresh copy of this list\n* If the last message on the list is the same as the incoming message, then we know no new follow-on messages were sent within the last 5 seconds. Hence the user should be waiting and it is safe to reply.\n* But if the reverse is true, then we will abort the execution here."
            },
            "typeVersion": 1
      },
      {
            "id": "311c0d69-a735-4435-91b6-e80bf7d4c012",
            "name": "Send Reply",
            "type": "n8n-nodes-base.twilio",
            "position": [
                  3000,
                  320
            ],
            "parameters": {
                  "to": "={{ $('Twilio Trigger').item.json.From }}",
                  "from": "={{ $('Twilio Trigger').item.json.To }}",
                  "message": "={{ $json.output }}",
                  "options": {}
            },
            "credentials": {
                  "twilioApi": {
                        "id": "TJv4H4lXxPCLZT50",
                        "name": "Twilio account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c0e0cd08-66e3-4ca3-9441-8436c0d9e664",
            "name": "Wait 5 seconds",
            "type": "n8n-nodes-base.wait",
            "position": [
                  1340,
                  360
            ],
            "webhookId": "d486979c-8074-4ecb-958e-fcb24455086b",
            "parameters": {},
            "typeVersion": 1.1
      },
      {
            "id": "c7959fa2-69a5-46b4-8e67-1ef824860f4e",
            "name": "Get Chat History",
            "type": "@n8n/n8n-nodes-langchain.memoryManager",
            "position": [
                  2000,
                  280
            ],
            "parameters": {
                  "options": {
                        "groupMessages": true
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "55933c54-5546-4770-8b36-a31496163528",
            "name": "Window Buffer Memory1",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  2000,
                  420
            ],
            "parameters": {
                  "sessionKey": "=chat-debouncer:{{ $('Twilio Trigger').item.json.From }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "459c0181-d239-4eec-88b6-c9603868d518",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  774.3250485705519,
                  198.07493876489747
            ],
            "parameters": {
                  "color": 7,
                  "width": 431.1629802181097,
                  "height": 357.49804533541777,
                  "content": "## Step 1. Listen for Twilio Messages\n[Read more about Twilio Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger)\n\nIn this example, we'll use the sender's phone number as the session ID. This will be important in retrieving chat history."
            },
            "typeVersion": 1
      },
      {
            "id": "e06313a9-066a-4387-a36c-a6c6ff57d6f9",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1900,
                  80
            ],
            "parameters": {
                  "color": 7,
                  "width": 618.970917763344,
                  "height": 501.77420646931444,
                  "content": "## Step 3. Get Messages Since Last Reply\n[Read more about using Chat Memory](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager)\n\nOnce conditions are met and we allow the agent to reply, we'll need to find the bot's last reply and work out the buffer of user messages since then. We can do this by looking using chat memory and comparing this to the latest message in our redis messages stack."
            },
            "typeVersion": 1
      },
      {
            "id": "601a71f6-c6f8-4b73-98c7-cfa11b1facaa",
            "name": "Get Messages Buffer",
            "type": "n8n-nodes-base.set",
            "position": [
                  2320,
                  280
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "01434acb-c224-46d2-99b0-7a81a2bb50c5",
                                    "name": "messages",
                                    "type": "string",
                                    "value": "={{\n$('Get Latest Message Stack').item.json.messages\n .slice(\n $('Get Latest Message Stack').item.json.messages.lastIndexOf(\n $('Get Chat History').item.json.messages.last().human\n || $('Twilio Trigger').item.json.chatInput\n ),\n $('Get Latest Message Stack').item.json.messages.length\n )\n .join('\\n')\n}}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "9e49f2de-89e6-4152-8e9c-ed47c5fc4654",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2549,
                  120
            ],
            "parameters": {
                  "color": 7,
                  "width": 670.2274698011594,
                  "height": 522.5993538768389,
                  "content": "## Step 4. Send Single Agent Reply For Many Messages\n[Learn more about using AI Agents](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)\n\nFinally, our buffered messages are sent to the AI Agent that can formulate a single response for all. This could potentially improve the conversation experience if the chat interaction is naturally more rapid and spontaneous. A drawback however is that responses could be feel much slower - tweak the wait threshold to suit your needs!"
            },
            "typeVersion": 1
      },
      {
            "id": "be13c74a-467c-4ab1-acca-44878c68dba4",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  80
            ],
            "parameters": {
                  "width": 375.55385425077225,
                  "height": 486.69228315530853,
                  "content": "## Try It Out!\n### This workflow demonstrates a simple approach to stagger an AI Agent's reply if users often send in a sequence of partial messages and in short bursts.\n\n* Twilio webhook receives user's messages which are recorded in a message stack powered by Redis.\n* The execution is immediately paused for 5 seconds and then another check is done against the message stack for the latest message.\n* The purpose of this check lets use know if the user is sending more messages or if they are waiting for a reply.\n* The execution is aborted if the latest message on the stack differs from the incoming message and continues if they are the same.\n* For the latter, the agent receives buffered messages and is able to respond to all in a single reply."
            },
            "typeVersion": 1
      },
      {
            "id": "334d38e1-ec16-46f2-a57d-bf531adb8d3d",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2660,
                  320
            ],
            "parameters": {
                  "text": "={{ $json.messages }}",
                  "agent": "conversationalAgent",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.6
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Send Reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Twilio Trigger": {
            "main": [
                  [
                        {
                              "node": "Add to Messages Stack",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Wait 5 seconds",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wait 5 seconds": {
            "main": [
                  [
                        {
                              "node": "Get Latest Message Stack",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Chat History": {
            "main": [
                  [
                        {
                              "node": "Get Messages Buffer",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Should Continue?": {
            "main": [
                  [
                        {
                              "node": "Get Chat History",
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
      "Get Messages Buffer": {
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
      "Window Buffer Memory1": {
            "ai_memory": [
                  [
                        {
                              "node": "Get Chat History",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Latest Message Stack": {
            "main": [
                  [
                        {
                              "node": "Should Continue?",
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
    name: "Hacker News Throwback Machine - See What Was Hot On This Day, Every Year!",
    nodes: [
      {
            "id": "6ea4e702-1af8-407b-b653-964a519db1c2",
            "name": "Basic LLM Chain",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1560,
                  -360
            ],
            "parameters": {
                  "text": "=You are a highly skilled news categorizer, specializing in indentifying interesting stuff from Hacker News front-page headlines.\n\nYou are provided with JSON data containing a list of dates and their corresponding top headlines from the Hacker News front page. Each headline will also include a URL linking to the original article or discussion. Importantly, the dates provided will be the SAME DAY across MULTIPLE YEARS (e.g., January 1st, 2023, January 1st, 2022, January 1st, 2021, etc.). You need to indentify key headlines and also analyze how the tech landscape has evolved over the years, as reflected in the headlines for this specific day.\n\nYour task is to indentify top 10-15 headlines from across the years from the given json data and return in Markdown formatted bullet points categorizing into themes and adding markdown hyperlinks to the source URL with Prefixing Year before the headline. Follow the Output Foramt Mentioned.\n\n**Input Format:**\n\n```json\n[\n {\n \"headlines\": [\n \"Headline 1 Title [URL1]\",\n \"Headline 2 Title [URL2]\",\n \"Headline 3 Title [URL3]\",\n ...\n ]\n \"date\": \"YYYY-MM-DD\",\n },\n {\n \"headlines\": [\n \"Headline 1 Title [URL1]\",\n \"Headline 2 Title [URL2]\",\n ...\n ]\n \"date\": \"YYYY-MM-DD\",\n },\n ...\n]\n```\n\n**Output Format In Markdown**\n\n```\n# HN Lookback <FullMonthName-DD> | <start YYYY> to <end YYYY> \n\n## [Theme 1]\n- YYYY [Headline 1](URL1)\n- YYYY [Headline 2](URL2)\n...\n\n## [Theme 2]\n- YYYY [Headline 1](URL1)\n- YYYY [Headline 2](URL2)\n...\n\n... \n\n## <this is optional>\n<if any interesing ternds emerge mention them in oneline>\n```\n\n**Here is the Json data for Hackernews Headlines across the years**\n\n```\n{{ JSON.stringify($json.data) }}\n```",
                  "promptType": "define"
            },
            "typeVersion": 1.5
      },
      {
            "id": "b5a97c2a-0c3b-4ebe-aec5-7bca6b55ad4c",
            "name": "Google Gemini Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  1740,
                  -200
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-pro"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "Hx1fn2jrUvojSKye",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "18cba750-aef5-451d-880f-2c12d8540d78",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -380,
                  -360
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "triggerAtHour": 21
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "341da616-8670-4cd9-b47a-ee25e2ae9862",
            "name": "CreateYearsList",
            "type": "n8n-nodes-base.code",
            "position": [
                  -200,
                  -360
            ],
            "parameters": {
                  "jsCode": "for (const item of $input.all()) {\n const currentDateStr = item.json.timestamp.split('T')[0];\n const currentDate = new Date(currentDateStr);\n const currentYear = currentDate.getFullYear();\n const currentMonth = currentDate.getMonth(); // 0 for January, 1 for February, etc.\n const currentDay = currentDate.getDate();\n\n const datesToFetch = [];\n for (let year = currentYear; year >= 2007; year--) {\n let targetDate;\n if (year === 2007) {\n // Special handling for 2007 to start from Feb 19\n if (currentMonth > 1 || (currentMonth === 1 && currentDay >= 19))\n {\n targetDate = new Date(2007, 1, 19); // Feb 19, 2007\n } else {\n continue; // Skip 2007 if currentDate is before Feb 19\n }\n } else {\n targetDate = new Date(year, currentMonth, currentDay);\n }\n \n // Format the date as YYYY-MM-DD\n const formattedDate = targetDate.toISOString().split('T')[0];\n datesToFetch.push(formattedDate);\n }\n item.json.datesToFetch = datesToFetch;\n}\n\nreturn $input.all();"
            },
            "typeVersion": 2
      },
      {
            "id": "42e24547-be24-4f29-8ce8-c0df7d47a6ff",
            "name": "CleanUpYearList",
            "type": "n8n-nodes-base.set",
            "position": [
                  0,
                  -360
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b269dc0d-21e1-4124-8f3a-2c7bfa4add5c",
                                    "name": "datesToFetch",
                                    "type": "array",
                                    "value": "={{ $json.datesToFetch }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "6e51ad05-0f3d-4bfb-8c8d-5b71e7355344",
            "name": "SplitOutYearList",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  200,
                  -360
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "datesToFetch"
            },
            "typeVersion": 1
      },
      {
            "id": "6f827071-718f-4e27-9f7a-cc50296f7bc4",
            "name": "GetFrontPage",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  420,
                  -360
            ],
            "parameters": {
                  "url": "=https://news.ycombinator.com/front",
                  "options": {
                        "batching": {
                              "batch": {
                                    "batchSize": 1,
                                    "batchInterval": 3000
                              }
                        }
                  },
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "day",
                                    "value": "={{ $json.datesToFetch }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "7287e6b1-337f-4634-ac23-5ceaa87b0db3",
            "name": "ExtractDetails",
            "type": "n8n-nodes-base.html",
            "position": [
                  640,
                  -360
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "=headlines",
                                    "cssSelector": ".titleline",
                                    "returnArray": true,
                                    "skipSelectors": "span"
                              },
                              {
                                    "key": "date",
                                    "cssSelector": ".pagetop > font"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "fceff31e-4dcd-4199-89c5-8eb75cd479bf",
            "name": "GetHeadlines",
            "type": "n8n-nodes-base.set",
            "position": [
                  920,
                  -460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e1ce33e9-e4f8-4215-bbdb-156a955a0a97",
                                    "name": "headlines",
                                    "type": "array",
                                    "value": "={{ $json.headlines }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "f7683614-7225-4f05-ba12-86b326fdb4a1",
            "name": "GetDate",
            "type": "n8n-nodes-base.set",
            "position": [
                  920,
                  -280
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "fc1d15f6-a999-4d6b-a7bc-3ffa9427679e",
                                    "name": "date",
                                    "type": "string",
                                    "value": "={{ $json.date }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "7e09ce85-ece1-46a0-aa59-8e3da66413b2",
            "name": "MergeHeadlinesDate",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1180,
                  -360
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineByPosition"
            },
            "typeVersion": 3
      },
      {
            "id": "db3bf408-8179-4ca4-a5b4-8a390b68f994",
            "name": "SingleJson",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1380,
                  -360
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "2abbc0e9-ed1e-4ba0-9d2f-7c3cd314a0fe",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2020,
                  -360
            ],
            "parameters": {
                  "text": "={{ $json.text }}",
                  "chatId": "@OnThisDayHN",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "6nIwfhIWcwJFTPTg",
                        "name": "OnThisDayHNBot"
                  }
            },
            "typeVersion": 1.2
      }
],
    connections: {
      "GetDate": {
            "main": [
                  [
                        {
                              "node": "MergeHeadlinesDate",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "SingleJson": {
            "main": [
                  [
                        {
                              "node": "Basic LLM Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "GetFrontPage": {
            "main": [
                  [
                        {
                              "node": "ExtractDetails",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "GetHeadlines": {
            "main": [
                  [
                        {
                              "node": "MergeHeadlinesDate",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "ExtractDetails": {
            "main": [
                  [
                        {
                              "node": "GetHeadlines",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "GetDate",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Basic LLM Chain": {
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
      "CleanUpYearList": {
            "main": [
                  [
                        {
                              "node": "SplitOutYearList",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "CreateYearsList": {
            "main": [
                  [
                        {
                              "node": "CleanUpYearList",
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
                              "node": "CreateYearsList",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "SplitOutYearList": {
            "main": [
                  [
                        {
                              "node": "GetFrontPage",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "MergeHeadlinesDate": {
            "main": [
                  [
                        {
                              "node": "SingleJson",
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
                              "node": "Basic LLM Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {},
  },
  {
    name: "Handling Appointment Leads And Follow-Up With Twilio, Cal.Com And AI",
    nodes: [
      {
            "id": "f55b3110-f960-4d89-afba-d47bc58102eb",
            "name": "Twilio Trigger",
            "type": "n8n-nodes-base.twilioTrigger",
            "position": [
                  100,
                  180
            ],
            "webhookId": "bfc8f587-8183-46f8-9e76-3576caddf8c0",
            "parameters": {
                  "updates": [
                        "com.twilio.messaging.inbound-message.received"
                  ]
            },
            "credentials": {
                  "twilioApi": {
                        "id": "TJv4H4lXxPCLZT50",
                        "name": "Twilio account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "8472f5b0-329f-45ac-b35f-c42558daa7c7",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1140,
                  1360
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
            "id": "4b3e8a26-c808-46e5-bbcf-2e1279989a0b",
            "name": "Find Follow-Up Candidates",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  720,
                  1240
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appO2nHiT9XPuGrjN",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN",
                        "cachedResultName": "Twilio-Scheduling-Agent"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblokH7uw63RpIlQ0",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN/tblokH7uw63RpIlQ0",
                        "cachedResultName": "Lead Tracker"
                  },
                  "options": {},
                  "operation": "search",
                  "filterByFormula": "=AND(\n {appointment_id} = '',\n {status} != 'STOP',\n {followup_count} < 3,\n DATETIME_DIFF(TODAY(), {last_followup_at}, 'days') >= 3\n)"
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
            "id": "04dc979c-ad36-4e57-93d4-905929fe1af0",
            "name": "Send Follow Up Message",
            "type": "n8n-nodes-base.twilio",
            "position": [
                  1880,
                  1240
            ],
            "parameters": {
                  "to": "={{ $('Find Follow-Up Candidates').item.json.session_id }}",
                  "from": "={{ $('Find Follow-Up Candidates').item.json.twilio_service_number }}",
                  "message": "={{ $('Generate Follow Up Message').item.json.text }}\nReply STOP to stop recieving these messages.",
                  "options": {}
            },
            "credentials": {
                  "twilioApi": {
                        "id": "TJv4H4lXxPCLZT50",
                        "name": "Twilio account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "55e222af-fb59-4ffd-9661-350b1972e802",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  570,
                  943
            ],
            "parameters": {
                  "color": 7,
                  "width": 408.6631332343324,
                  "height": 515.2449997772154,
                  "content": "## Step 6. Filter Open Enquiries from Airtable\n\n### 💡Criteria For Follow Up Candidates\n* No Scheduled Appointment\n* No Request to STOP\n* No Previous Follow-up in Past 3 days\n* Follow-up is less than 3 times"
            },
            "typeVersion": 1
      },
      {
            "id": "50d0c632-233b-4b31-b396-3fa603aecd03",
            "name": "Update Follow-Up Count and Date",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1700,
                  1240
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appO2nHiT9XPuGrjN",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN",
                        "cachedResultName": "Twilio-Scheduling-Agent"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblokH7uw63RpIlQ0",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN/tblokH7uw63RpIlQ0",
                        "cachedResultName": "Lead Tracker"
                  },
                  "columns": {
                        "value": {
                              "session_id": "={{ $('Find Follow-Up Candidates').item.json.session_id }}",
                              "followup_count": "={{ ($('Find Follow-Up Candidates').item.json.followup_count ?? 0) + 1 }}",
                              "last_followup_at": "={{ $now.toISO() }}"
                        },
                        "schema": [
                              {
                                    "id": "id",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true
                              },
                              {
                                    "id": "session_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "session_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "status",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "ACTIVE",
                                                "value": "ACTIVE"
                                          },
                                          {
                                                "name": "STOP",
                                                "value": "STOP"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "customer_name",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "customer_name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "customer_summary",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "customer_summary",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "chat_messages",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "chat_messages",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "scheduled_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "scheduled_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "appointment_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "appointment_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "last_message_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "last_message_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "last_followup_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "last_followup_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "followup_count",
                                    "type": "number",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "followup_count",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "assignee",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "assignee",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "session_id"
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
            "id": "e1331352-c3da-4586-9d64-4be4dab49748",
            "name": "Create/Update Session",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  2240,
                  269
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appO2nHiT9XPuGrjN",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN",
                        "cachedResultName": "Twilio-Scheduling-Agent"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblokH7uw63RpIlQ0",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN/tblokH7uw63RpIlQ0",
                        "cachedResultName": "Lead Tracker"
                  },
                  "columns": {
                        "value": {
                              "session_id": "={{ $('Twilio Trigger').item.json.From }}",
                              "scheduled_at": "={{\n$('Appointment Scheduling Agent').item.json.output.has_appointment_scheduled\n ? $('Appointment Scheduling Agent').item.json.output.appointment.scheduled_at\n : (\n $('Get Existing Chat Session').item.json.isNotEmpty()\n ? $('Get Existing Chat Session').item.json.scheduled_at\n : $now.toISO()\n )\n}}",
                              "chat_messages": "={{\nJSON.stringify(\n ($('Get Existing Chat Session').item.json.chat_messages ? JSON.parse($('Get Existing Chat Session').item.json.chat_messages) : [])\n .concat(\n { \"role\": \"human\", \"message\": $('Twilio Trigger').item.json.Body },\n { \"role\": \"assistant\", \"message\": $('Appointment Scheduling Agent').item.json.output.reply }\n )\n)\n}}",
                              "customer_name": "={{\n !$('Get Existing Chat Session').item.json.customer_name &&\n $('Appointment Scheduling Agent').item.json.output.customer_name\n ? $('Appointment Scheduling Agent').item.json.output.customer_name\n : ($('Get Existing Chat Session').item.json.customer_name ?? '')\n}}",
                              "appointment_id": "={{\n$('Appointment Scheduling Agent').item.json.output.has_appointment_scheduled\n ? $('Appointment Scheduling Agent').item.json.output.appointment.appointment_id\n : (\n $('Get Existing Chat Session').item.json.isNotEmpty()\n ? $('Get Existing Chat Session').item.json.appointment_id\n : ''\n )\n}}",
                              "followup_count": "={{\n !$('Get Existing Chat Session').item.json.followup_count\n ? 0\n : $('Get Existing Chat Session').item.json.followup_count\n}}",
                              "last_message_at": "={{ $now.toISO() }}",
                              "customer_summary": "={{\n !$('Get Existing Chat Session').item.json.appointment_id\n && $('Appointment Scheduling Agent').item.json.output.has_appointment_scheduled\n ? $json.output.enquiry_summary\n : $('Get Existing Chat Session').item.json.customer_summary\n}}",
                              "last_followup_at": "={{\n !$('Get Existing Chat Session').item.json.last_followup_at\n ? $now.toISO()\n : $('Get Existing Chat Session').item.json.last_followup_at\n}}",
                              "twilio_service_number": "={{ $('Twilio Trigger').item.json.To }}"
                        },
                        "schema": [
                              {
                                    "id": "id",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true
                              },
                              {
                                    "id": "session_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "session_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "status",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "ACTIVE",
                                                "value": "ACTIVE"
                                          },
                                          {
                                                "name": "STOP",
                                                "value": "STOP"
                                          }
                                    ],
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "customer_name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "customer_name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "customer_summary",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "customer_summary",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "chat_messages",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "chat_messages",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "scheduled_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "scheduled_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "appointment_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "appointment_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "last_message_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "last_message_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "last_followup_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "last_followup_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "followup_count",
                                    "type": "number",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "followup_count",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "assignee",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "assignee",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "twilio_service_number",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "twilio_service_number",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "session_id"
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
            "id": "de8eaa46-2fe8-4afd-a400-9c528f578d24",
            "name": "Get Existing Chat Session",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  740,
                  240
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appO2nHiT9XPuGrjN",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN",
                        "cachedResultName": "Twilio-Scheduling-Agent"
                  },
                  "limit": 1,
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblokH7uw63RpIlQ0",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN/tblokH7uw63RpIlQ0",
                        "cachedResultName": "Lead Tracker"
                  },
                  "options": {},
                  "operation": "search",
                  "returnAll": false,
                  "filterByFormula": "={session_id}=\"{{ $('Twilio Trigger').item.json.From }}\""
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Und0frCQ6SNVX3VV",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1,
            "alwaysOutputData": true
      },
      {
            "id": "16aabbf0-fdf7-4940-a3a3-962e0b877299",
            "name": "Every 24hrs",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  220,
                  1160
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
            "id": "9471b840-3a59-491d-a309-180d5a69fb7e",
            "name": "Send Reply",
            "type": "n8n-nodes-base.twilio",
            "position": [
                  2420,
                  269
            ],
            "parameters": {
                  "to": "={{ $('Twilio Trigger').item.json.From }}",
                  "from": "={{ $('Twilio Trigger').item.json.To }}",
                  "message": "={{ $('Appointment Scheduling Agent').item.json.output.reply }}",
                  "options": {}
            },
            "credentials": {
                  "twilioApi": {
                        "id": "TJv4H4lXxPCLZT50",
                        "name": "Twilio account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "601aa9ea-f3f4-49bd-a391-84e32c47f7ba",
            "name": "Send Confirmation",
            "type": "n8n-nodes-base.twilio",
            "position": [
                  900,
                  -280
            ],
            "parameters": {
                  "to": "={{ $('Twilio Trigger').item.json.From }}",
                  "from": "={{ $('Twilio Trigger').item.json.To }}",
                  "message": "Thank you. You won't receive any more messages from us!",
                  "options": {}
            },
            "credentials": {
                  "twilioApi": {
                        "id": "TJv4H4lXxPCLZT50",
                        "name": "Twilio account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a8b9fffe-f814-4cb4-9e1a-bf7eb57e7afd",
            "name": "User Request STOP",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  660,
                  -280
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appO2nHiT9XPuGrjN",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN",
                        "cachedResultName": "Twilio-Scheduling-Agent"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblokH7uw63RpIlQ0",
                        "cachedResultUrl": "https://airtable.com/appO2nHiT9XPuGrjN/tblokH7uw63RpIlQ0",
                        "cachedResultName": "Lead Tracker"
                  },
                  "columns": {
                        "value": {
                              "status": "STOP",
                              "session_id": "={{ $('Twilio Trigger').item.json.From }}"
                        },
                        "schema": [
                              {
                                    "id": "id",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true
                              },
                              {
                                    "id": "session_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "session_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "status",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "ACTIVE",
                                                "value": "ACTIVE"
                                          },
                                          {
                                                "name": "STOP",
                                                "value": "STOP"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "chat_messages",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "chat_messages",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "scheduled_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "scheduled_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "last_message_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "last_message_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "last_followup_at",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "last_followup_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "followup_count",
                                    "type": "number",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "followup_count",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "assignee",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "assignee",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "session_id"
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
            "id": "3e7797f0-5449-404c-bac9-e0019223cea8",
            "name": "Check For Command Words",
            "type": "n8n-nodes-base.switch",
            "position": [
                  295,
                  180
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "STOP",
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
                                                            "operation": "contains"
                                                      },
                                                      "leftValue": "={{ $json.Body }}",
                                                      "rightValue": "STOP"
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
            "typeVersion": 3
      },
      {
            "id": "e636ebb5-16c6-43ef-9fee-fe2b9a8c95a9",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  1960,
                  560
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n \"reply\": \"\",\n \"customer_name\": \"\",\n \"enquiry_summary\": \"\",\n\t\"has_appointment_scheduled\": false,\n \"appointment\": {\n \"appointment_id\": \"\",\n \"scheduled_at\": \"\"\n }\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "3469740d-bd2f-4d34-a86b-59b088917d74",
            "name": "Auto-fixing Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserAutofixing",
            "position": [
                  1820,
                  440
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "fc0adfdf-724c-45d2-84f6-cb2b43254cc0",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1840,
                  560
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
            "id": "0e0d8236-0f10-4f8f-88c1-bba2ef084e90",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1080,
                  -50.317404874203476
            ],
            "parameters": {
                  "color": 7,
                  "width": 1011.8938194478603,
                  "height": 917.533068142247,
                  "content": "## Step 3. Appointment Scheduling With AI\n[Learn about using AI Agents](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)\n\nUsing an AI Agent is a powerful way to simplify and enhance workflows using the latest in AI technology. Our appointment scheduling agent is equipped to converse with the customer and all the necessary tools to schedule, re-schedule and cancel appointments.\n\nUsing the **HTTP Tool** node, it's easy to connect to third party API services to perform actions. In this workflow, we're calling the Cal.com API to handle scheduling events."
            },
            "typeVersion": 1
      },
      {
            "id": "380b437e-fa29-4ebb-bebd-1984d371bc93",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  549.8696404310444,
                  -49.46972087742148
            ],
            "parameters": {
                  "color": 7,
                  "width": 504.0066355303578,
                  "height": 557.8466102697549,
                  "content": "## Step 2. Check for Existing Chat History\n[Read more about using Airtable](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable)\n\nWe're using Airtable for customer session management and to capture chat history. Airtable is an ideal choice because it acts as a persistent database with a flexible API which could prove essential for further extension.\n\nWe'll pull any previous chat history and pass this to our agent to continue the conversation."
            },
            "typeVersion": 1
      },
      {
            "id": "f89762f5-8520-4af6-987d-a71381c603e3",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  0,
                  -52.79744987055557
            ],
            "parameters": {
                  "color": 7,
                  "width": 523.6927529886705,
                  "height": 479.4432905734608,
                  "content": "## Step 1. Wait For Customer SMS\n[Read more about Twilio trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger)\n\nFor this workflow, we'll use the twilio SMS trigger to receive enquiries from customers looking to book a PC or laptop repair.\n\nSince we'll be working with SMS, we'll have a check to see if the customer wishes to STOP any further follow-up messages. This is an optional step that we'll get to later."
            },
            "typeVersion": 1
      },
      {
            "id": "de525648-ef11-4b48-85ea-c6e5463c87cf",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  540,
                  -450.0217713292123
            ],
            "parameters": {
                  "color": 7,
                  "width": 563.7797724327219,
                  "height": 358.6710117357418,
                  "content": "## Step 9. Cancelling Follow-Up Messages \n\nIf the customer messages the bot with the word STOP, we'll update our customer record in Airtable which will prevent further follow-ups from being trigger. A confirmation message is sent after to the customer."
            },
            "typeVersion": 1
      },
      {
            "id": "028e4253-d1e6-4cf8-b181-ba27b03fa66e",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2120,
                  -40
            ],
            "parameters": {
                  "color": 7,
                  "width": 521.5259177258192,
                  "height": 558.7093446159199,
                  "content": "## Step 4. Updating Airtable and Responding to the Customer \n[Read more about using Twilio](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.twilio)\n\nOnce the agent formulates a response, we can update our appointment table accordingly ensuring the conversation at any stage is captured.\n\nIf no appointment is scheduled, we can move onto the second half of this workflow which covers following up with prospective customers and their enquiries."
            },
            "typeVersion": 1
      },
      {
            "id": "f321ded9-c5d3-418d-bf1c-e29bf9845098",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  20,
                  940
            ],
            "parameters": {
                  "color": 7,
                  "width": 509.931737588259,
                  "height": 433.74984757777247,
                  "content": "## Step 5. Following Up With Open Enquiries\n[Read more about using scheduled trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger)\n\nThe second half of this workflow deals with identifying customers who have engaged our chatbot but have not yet confirmed an appointment. We intend to send a follow-up message asking if the enquiry is still valid and encourage an appointment to be made with the customer."
            },
            "typeVersion": 1
      },
      {
            "id": "4485e39a-3e84-49ee-9d3f-a271a98a330a",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  940
            ],
            "parameters": {
                  "color": 7,
                  "width": 567.1169284476533,
                  "height": 601.5572296901626,
                  "content": "## Step 7. Generating a Follow-Up Message\n[Read more about Basic LLM Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nWith our session and chat history retrieved from Airtable, we can simple ask our AI to generate a nicely worded follow-up message to re-engage the customer.\n\nWhere the logic is linear, the Basic LLM chain is suitable for many workflows. An agent is not always required!"
            },
            "typeVersion": 1
      },
      {
            "id": "f2d66e44-cf18-4e8f-80d5-e8d03e10e5ff",
            "name": "Generate Follow Up Message",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1140,
                  1200
            ],
            "parameters": {
                  "text": "=",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=You are an appointment scheduling assistant for PC and Laptop Repairs for a company called \"PC Parts Ltd\". You shall refer to yourself as the \"service team\". You had a conversation with a customer on {{ $json.last_message_at }} but the enquiry did not end with an appointment being scheduled.\n{{ $json.last_followup_at ? `You last sent a follow-up message on ${$json.last_followup_at}` : '' }}.\n\nYou task is to ask if the prospective customer would like to continue with the enquiry using the following information gather to construct a relevant follow-up message. Try to entice the user to continue the conversation and ultimately schedule an appointment.\n\n## About the customer\nname: {{ $json.customer_name ?? '<unknown>' }}\nenquiry summary: {{ $json.customer_summary ?? '<uknown>' }}\n\n# Existing conversation\nHere are the chat logs of the existing conversation:\n{{ $json.chat_messages }}"
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "0b93a300-b9ab-4c28-8ac0-fddc49247b74",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1600,
                  940
            ],
            "parameters": {
                  "color": 7,
                  "width": 496.0833287715134,
                  "height": 526.084030034264,
                  "content": "## Step 8. Update Follow-Up Properties and Send Message\n[Read more about using Twilio](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.twilio/)\n\nFinally, we'll update our follow-up activity as part of the customer record in Airtable. Keeping track of the number of times we follow-up helps prevent spamming the customer unnecessarily.\n\nThe follow-up message is sent via Twilio and includes instruction to disable further follow-up messages using the keyword STOP."
            },
            "typeVersion": 1
      },
      {
            "id": "0e022485-9504-416a-8632-edd65df29bf4",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -480,
                  -80
            ],
            "parameters": {
                  "width": 437.0019498737189,
                  "height": 511.67220311821393,
                  "content": "## Try It Out!\n\n### This workflow implements an appointment scheduling chatbot which is powered by an AI tools agent.\n* Workflow is triggered by Customer enquires sent via SMS\n* Customer session management and chat history are captured in Airtable to enable the SMS conversation.\n* An AI Agent is equipped to answer any questions as well as schedule, re-schedule and cancel appointments on behalf of the customer.\n* The agent's reply is sent back to the customer via SMS.\n* Additional a follow-up system is implemented to re-engage customers who haven't scheduled an appointment.\n\n \n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      },
      {
            "id": "04681629-0221-47fe-b992-0d5791995523",
            "name": "OpenAI Chat Model3",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1120,
                  420
            ],
            "parameters": {
                  "model": "gpt-4o-mini",
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
            "id": "7633e3b0-daf3-495d-bcd7-ce0db24a73b9",
            "name": "Get Availability",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1260,
                  440
            ],
            "parameters": {
                  "url": "https://api.cal.com/v2/slots/available",
                  "sendQuery": true,
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "parametersQuery": {
                        "values": [
                              {
                                    "name": "eventTypeId",
                                    "value": "={{ 648297 }}",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "startTime",
                                    "value": "{startTime}",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "endTime",
                                    "value": "{endTime}",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "toolDescription": "Call this tool to get the appointment availability. Dates can be variable but times are fixed - startTime must always be 9am and endTime must be 7pm. Strictly use ISO format for dates eg. \"2024-01-01T09:00:00-00:00\". Input schema example: ```{ \"startTime\": \"...\", \"endTime\": \"...\"}```",
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "startTime",
                                    "type": "string",
                                    "description": "start of daterange in ISO format. eg. 2024-01-01T09:00:00-00:00"
                              },
                              {
                                    "name": "endTime",
                                    "type": "string",
                                    "description": "end of daterange in ISO format. eg. 2024-01-01T09:00:00-00:00"
                              }
                        ]
                  }
            },
            "credentials": {
                  "calApi": {
                        "id": "GPSKPrBhO3Pq6KVF",
                        "name": "Cal account"
                  },
                  "httpHeaderAuth": {
                        "id": "X2Vr2TQSBcOsOMst",
                        "name": "Cal.com API v2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0f814d08-218e-492e-b1f8-63985d583e80",
            "name": "Get Existing Booking",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1560,
                  440
            ],
            "parameters": {
                  "url": "https://api.cal.com/v2/bookings/{bookingUid}",
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "toolDescription": "Call this tool to get an existing booking using a booking \"uid\".",
                  "parametersHeaders": {
                        "values": [
                              {
                                    "name": "cal-api-version",
                                    "value": "2024-08-13",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "nodeCredentialType": "calApi",
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "bookingUid",
                                    "type": "string",
                                    "description": "the uid of the booking (note: this is not the same as the id of the booking)"
                              }
                        ]
                  }
            },
            "credentials": {
                  "calApi": {
                        "id": "GPSKPrBhO3Pq6KVF",
                        "name": "Cal account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "36a5a2a7-bb78-4091-8b25-5e9f49628542",
            "name": "Find Existing Booking",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1700,
                  440
            ],
            "parameters": {
                  "url": "https://api.cal.com/v2/bookings",
                  "jsonQuery": "{\n \"status\": \"upcoming\",\n \"attendeeEmail\": \"{attendee_email}\",\n \"afterStart\": \"{date}\"\n}",
                  "sendQuery": true,
                  "sendHeaders": true,
                  "specifyQuery": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "toolDescription": "Call this tool to search for an existing bookings with the user's email address and date. Use the \"uid\" field in the results as the primary booking identifier, ignore the \"id\" field.",
                  "parametersHeaders": {
                        "values": [
                              {
                                    "name": "cal-api-version",
                                    "value": "2024-08-13",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "attendee_email",
                                    "type": "string",
                                    "description": "email address of attendee"
                              },
                              {
                                    "name": "date",
                                    "description": "Filter bookings with start after this date string. The time is always fixed at 9am."
                              }
                        ]
                  }
            },
            "credentials": {
                  "calApi": {
                        "id": "GPSKPrBhO3Pq6KVF",
                        "name": "Cal account"
                  },
                  "httpHeaderAuth": {
                        "id": "X2Vr2TQSBcOsOMst",
                        "name": "Cal.com API v2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "88ee279d-ed85-4dc6-b42a-5e1e50f3d708",
            "name": "Reschedule Booking",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1560,
                  620
            ],
            "parameters": {
                  "url": "https://api.cal.com/v2/bookings/{bookingUid}/reschedule",
                  "method": "POST",
                  "jsonBody": "{\n \"start\": \"{start}\",\n \"reschedulingReason\": \"{reschedulingReason}\"\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "toolDescription": "Call this tool to reschedule a user's booking using a booking \"uid\".",
                  "parametersHeaders": {
                        "values": [
                              {
                                    "name": "cal-api-version",
                                    "value": "2024-08-13",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "bookingUid",
                                    "type": "string",
                                    "description": "the uid of the booking. Note this is not the same as the id of the booking."
                              },
                              {
                                    "name": "start",
                                    "type": "string",
                                    "description": "start datetime of the appointment, for example: \"2024-05-30T12:00:00.000Z\""
                              },
                              {
                                    "name": "reschedulingReason",
                                    "type": "string",
                                    "description": "Reason for rescheduling the booking. If not given, value is \"Declined to give reason.\""
                              }
                        ]
                  }
            },
            "credentials": {
                  "calApi": {
                        "id": "GPSKPrBhO3Pq6KVF",
                        "name": "Cal account"
                  },
                  "httpHeaderAuth": {
                        "id": "X2Vr2TQSBcOsOMst",
                        "name": "Cal.com API v2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "ee30c793-d8f4-4e49-9bd1-70e5ac109b68",
            "name": "Cancel Booking",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1700,
                  620
            ],
            "parameters": {
                  "url": "https://api.cal.com/v2/bookings/{bookingUid}/cancel",
                  "method": "POST",
                  "jsonBody": "{\n \"cancellationReason\": \"{cancellationReason}\"\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "toolDescription": "Call this tool to cancel a user's existing booking using a booking \"uid\".",
                  "parametersHeaders": {
                        "values": [
                              {
                                    "name": "cal-api-version",
                                    "value": "2024-08-13",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "bookingUid",
                                    "type": "string",
                                    "description": "the uid of the booking. Note this is not the same as the id of the booking."
                              },
                              {
                                    "name": "cancellationReason",
                                    "type": "string",
                                    "description": "Reason for cancelling the appointment"
                              }
                        ]
                  }
            },
            "credentials": {
                  "calApi": {
                        "id": "GPSKPrBhO3Pq6KVF",
                        "name": "Cal account"
                  },
                  "httpHeaderAuth": {
                        "id": "X2Vr2TQSBcOsOMst",
                        "name": "Cal.com API v2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d90aa957-30d7-4b29-93b9-acdc86f1cb17",
            "name": "Create a Booking",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1400,
                  440
            ],
            "parameters": {
                  "url": "https://api.cal.com/v2/bookings",
                  "method": "POST",
                  "jsonBody": "{\n \"eventTypeId\": 648297,\n \"start\": \"{start}\",\n \"attendee\": {\n \"name\": \"{attendee_name}\",\n \"email\": \"{attendee_email}\",\n \"timeZone\": \"{attendee_timezone}\"\n },\n \"bookingFieldsResponses\": {\n \"title\": \"{summary_of_enquiry}\"\n }\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "toolDescription": "Call this tool to create a booking. Strictly use ISO format for dates eg. \"2024-01-01T09:00:00-00:00\" for API compatibility.",
                  "parametersHeaders": {
                        "values": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "cal-api-version",
                                    "value": "2024-08-13",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "start",
                                    "type": "string",
                                    "description": "The start time of the booking in ISO format. eg. \"2024-01-01T09:00:00Z\""
                              },
                              {
                                    "name": "attendee_name",
                                    "type": "string",
                                    "description": "Name of the attendee"
                              },
                              {
                                    "name": "attendee_email",
                                    "type": "string",
                                    "description": "email of the attendee"
                              },
                              {
                                    "name": "attendee_timezone",
                                    "type": "string",
                                    "description": "If timezone is unknown, assume Europe/London."
                              },
                              {
                                    "name": "summary_of_enquiry",
                                    "type": "string",
                                    "description": "short summary of the enquiry or purpose of the meeting"
                              }
                        ]
                  }
            },
            "credentials": {
                  "calApi": {
                        "id": "GPSKPrBhO3Pq6KVF",
                        "name": "Cal account"
                  },
                  "httpHeaderAuth": {
                        "id": "X2Vr2TQSBcOsOMst",
                        "name": "Cal.com API v2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "dfcf00ca-8fe1-4517-b64f-fbb4606ab221",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  928.7527821891895,
                  600
            ],
            "parameters": {
                  "color": 7,
                  "width": 261.1134437946252,
                  "height": 168.99242033383513,
                  "content": "![alt](https://upload.wikimedia.org/wikipedia/commons/a/a5/Cal.com%2C_Inc._Logo.svg#100x80)\nYou'll need to set a custom Header Auth Credential for Cal.com API v2. See the following doc for more info: https://cal.com/docs/api-reference/v2/introduction"
            },
            "typeVersion": 1
      },
      {
            "id": "e743b324-ead2-47f8-87c9-2eb969305d4e",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1220,
                  420
            ],
            "parameters": {
                  "width": 301.851426117099,
                  "height": 360.9218237282627,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Change EventTypeID Here!\n* EventTypeID must be a number.\n* Your event type dictates the allowed duration of the booking.\n* If Event Type set to 30mins and the agent attempts to book 60mins, this will fail so make sure the agent knows how long to set the booking for!"
            },
            "typeVersion": 1
      },
      {
            "id": "f087e1a4-fffb-44da-afd6-a6277aef84b5",
            "name": "Appointment Scheduling Agent1",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1220,
                  200
            ],
            "parameters": {
                  "options": {
                        "systemMessage": "=You are an appointment scheduling helper for a company called \"PC Parts Ltd\". Customers will message you enquirying for PC or laptop repairs and your job is to schedule a repair session for the user.This role is strictly to help schedule appointments so:\n* you may answer questions relating to the company, \"PC Parts Ltd\".\n* you may not answer questions relating to competitors of \"PC Parts Ltd\".\n* you may answer questions relating to general PC or laptop repair from a non-technical perspective.\n* you may not help to customer diagnose or assist in troubleshoot or debugging thei r PC or laptop issues. If the customer does ask, defer them to book an appointment where a suitable professional from PC Parts Ltd can help.\n* If an appointment is scheduled for the user then the conversation is completed and you should not continue to ask the user to schedule an appointment.\n* If an appointment is scheduled for the user, the user may ask for the following actions: ask about details of the existing appointment, reschedule the existing appointment or cancel an existing appointment.\n* If an appointment is scheduled for the user, the user cannot schedule another appointment until the existing appointment is cancelled.\n\n## About the company\nPC Parts Ltd is based in London, UK. They offer to repair low-end to high-end PC and Laptop consumer and small business machines. They also offer custom built machines such as for gaming. There is currently a summer sale going on for 20% selected machines for repairs. The company does not repair other electronic devices such as phones, tablets or monitors.\n\n## About the appointments\nAlways start your conversation by politely asking if the user wants to book a new appointment or enquire about an existing one. The date and time now is {{ $now.toISO() }}. All dates should be given in the ISO format. Each appointment should have a start and end date and time relative to today's date in the future and should be scheduled for 30 minutes.\n\n## To book an appointment\n* Before booking an appointment, ask if the user has an existing appointment.\n* Ensure you have the user's email address, full name and proposed date, preferred start time before booking an appointment.\n* Always check the calendar availability of the user's proposed date and time. If there is no availability, suggest the next available appointment slot.\n* If the appointment booking is successful, notify the user that an email confirmation will be sent to their provided email address.\n* If the appointment booking is unsuccessful, notify the user that you are unable to complete their request at the moment and to try again later.\n\n## To find an existing appointment\n* Ask the user for their email address and the date of the existing booking\n* Use the user's email and date to search for the existing booking.\n* If the user's email and date do not match the results or no results are returned, then the existing booking is not found.\n* If the existing booking is not found, notify the user and suggest a new booking should be made.\n* When the existing booking is found, ensure you tell them the booking's UID field.\n\n# To reschedule or cancel an existing appointment\n* First find the existing appointment so that you may obtain the existing appointment's booking UID.\n* Display this booking UID to the user.\n* Use this booking UID to reschedule or cancel an existing appointment.\n* If an existing appointment ID is not found or given, then notify the user that it is not possible to complete their request at this time and they should contact via email.\n* when user wants to cancel an appointment, ask for a reason for the cancellation and suggest rescheduling as an alternative. Confirm with user before cancelling an appointment.\n\n## About the user\n* The customer's session_id is \"{{ $('Twilio Trigger').item.json.From }}\"\n{{\n$json.chat_messages \n ? '* This is a returning prospective customer.' \n : '* This is a new customer. Ask for the details of their enquiry.'\n}}\n{{\n$json.appointment_id \n ? `* The customer has already scheduled an appointment at ${$json.scheduled_at} and their appointment_id is ${$json.appointment_id}`\n : '* This customer has not scheduled an appointment yet.'\n}}\n\n## Existing Conversation\n{{\n$json.chat_messages\n ? 'Here are the existing chat logs and should be used as context to continue the conversation:\\n```\\n' + JSON.parse($json.chat_messages).map(item => `${item.role}: ${item.message.replaceAll('\\n', ' ')}`).join('\\n') + '\\n```'\n : '* There is no existing conversation so far.'\n}}\n"
                  },
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      }
],
    connections: {
      "Every 24hrs": {
            "main": [
                  [
                        {
                              "node": "Find Follow-Up Candidates",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Cancel Booking": {
            "ai_tool": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Twilio Trigger": {
            "main": [
                  [
                        {
                              "node": "Check For Command Words",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create a Booking": {
            "ai_tool": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Availability": {
            "ai_tool": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "User Request STOP": {
            "main": [
                  [
                        {
                              "node": "Send Confirmation",
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
                              "node": "Generate Follow Up Message",
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
                              "node": "Auto-fixing Output Parser",
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
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Reschedule Booking": {
            "ai_tool": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Existing Booking": {
            "ai_tool": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create/Update Session": {
            "main": [
                  [
                        {
                              "node": "Send Reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Find Existing Booking": {
            "ai_tool": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check For Command Words": {
            "main": [
                  [
                        {
                              "node": "User Request STOP",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get Existing Chat Session",
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
                              "node": "Appointment Scheduling Agent1",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Find Follow-Up Candidates": {
            "main": [
                  [
                        {
                              "node": "Generate Follow Up Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Existing Chat Session": {
            "main": [
                  [
                        {
                              "node": "Appointment Scheduling Agent1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Follow Up Message": {
            "main": [
                  [
                        {
                              "node": "Update Follow-Up Count and Date",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Appointment Scheduling Agent1": {
            "main": [
                  [
                        {
                              "node": "Create/Update Session",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Follow-Up Count and Date": {
            "main": [
                  [
                        {
                              "node": "Send Follow Up Message",
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
    name: "Integrating AI with Open-Meteo API for Enhanced Weather Forecasting",
    nodes: [
      {
            "id": "80debfe0-c591-4ba1-aca1-068adac62aa9",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  100,
                  -300
            ],
            "webhookId": "4a44e974-db62-4727-9913-12a22bc88e01",
            "parameters": {
                  "public": true,
                  "options": {
                        "title": "N8N 👋",
                        "subtitle": "Weather Assistant: Example of Tools Using ChatGPT",
                        "allowFileUploads": false,
                        "loadPreviousSession": "memory"
                  },
                  "initialMessages": "Type like this: Weather Forecast for the Next 7 Days in São Paulo"
            },
            "typeVersion": 1.1
      },
      {
            "id": "ec375027-1c0d-438b-9fca-7bc4fbef2479",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  420,
                  -60
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "bhRvwBXztNmJVObo",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "bd2f5967-8188-4b1f-9255-8008870aaf7b",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -540,
                  -640
            ],
            "parameters": {
                  "color": 5,
                  "width": 500,
                  "height": 720,
                  "content": "## Integrating AI with Open-Meteo API for Enhanced Weather Forecasting\n\n## Use case\n\n### Workshop\n\nWe are using this workflow in our workshops to teach how to use Tools a.k.a functions with artificial intelligence. In this specific case, we will use a generic \"AI Agent\" node to illustrate that it could use other models from different data providers.\n\n### Enhanced Weather Forecasting\n\nIn this small example, it's easy to demonstrate how to obtain weather forecast results from the Open-Meteo site to accurately display the upcoming days.\n\nThis can be used to plan travel decisions, for example.\n\n## What this workflow does\n\n1. We will make an HTTP request to find out the geographic coordinates of a city.\n2. Then, we will make other HTTP requests to discover the weather for the upcoming days.\n\nIn this workshop, we demonstrate that the AI will be able to determine which tool to call first—it will first call the geolocation tool and then the weather forecast tool. All of this within a single client conversation call.\n\n\n## Setup\n\nInsert an OpenAI Key and activate the workflow.\n\nby Davi Saranszky Mesquita\nhttps://www.linkedin.com/in/mesquitadavi/"
            },
            "typeVersion": 1
      },
      {
            "id": "3cfeea52-a310-4101-8377-0f393bf54c8d",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  60,
                  -440
            ],
            "parameters": {
                  "width": 340,
                  "height": 220,
                  "content": "## Create an Hosted Web Chat\n\n### And setup the trigger!\n\nExample: https://website/webhook/4a4..../chat"
            },
            "typeVersion": 1
      },
      {
            "id": "55713ffc-da61-4594-99f4-ca6b448cbee2",
            "name": "Generic AI Tool Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  440,
                  -300
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.7
      },
      {
            "id": "7f608ddc-87bb-4e54-84a8-4db6b7f95011",
            "name": "Chat Memory Buffer",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  200,
                  -60
            ],
            "parameters": {},
            "typeVersion": 1.3
      },
      {
            "id": "77f82443-1efe-47d3-92ec-aa193853c8a5",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  320,
                  0
            ],
            "parameters": {
                  "width": 260,
                  "content": "-\n\n\n## Setup OpenAI Key"
            },
            "typeVersion": 1
      },
      {
            "id": "ed37ea94-3cff-47cb-bf45-bce620b0f056",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  780,
                  60
            ],
            "parameters": {
                  "color": 4,
                  "width": 280,
                  "height": 360,
                  "content": "### Open Meteo SPEC - City Geolocation\n\nThis tool will go to the URL https://geocoding-api.open-meteo.com/v1/search to fetch the geolocation data of the city, and I only need to get the name of the city.\n\nSo, I will ask the user to input the name of the city and pass some pre-existing information, such as returning only the first city and returning in JSON format.\n\n- name (By Model) - And placeholder - The parameter that the AI will need to fill in as required.\n\n- count - 1 by default because I want only the first city.\n\n- format - Putting JSON for no specific reason, but OpenAI could figure out how to process that information."
            },
            "typeVersion": 1
      },
      {
            "id": "f9b0e65d-a85e-4511-bdd2-adf54b1c039d",
            "name": "A tool to get the weather forecast based on geolocation",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1100,
                  -160
            ],
            "parameters": {
                  "url": "https://api.open-meteo.com/v1/forecast",
                  "sendQuery": true,
                  "parametersQuery": {
                        "values": [
                              {
                                    "name": "latitude"
                              },
                              {
                                    "name": "longitude"
                              },
                              {
                                    "name": "daily",
                                    "value": "temperature_2m_max,precipitation_sum",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "timezone",
                                    "value": "GMT",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "forecast_days"
                              }
                        ]
                  },
                  "toolDescription": "To get forecast of next [forecast_days] input the geolocation of an City",
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "longitude",
                                    "type": "number",
                                    "description": "longitude"
                              },
                              {
                                    "name": "latitude",
                                    "type": "number",
                                    "description": "latitude"
                              },
                              {
                                    "name": "forecast_days",
                                    "type": "number",
                                    "description": "forecast_days number of days ahead"
                              }
                        ]
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "76382491-dd75-4b51-a2d8-cb9782246af8",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1240,
                  -220
            ],
            "parameters": {
                  "color": 4,
                  "width": 280,
                  "height": 320,
                  "content": "### Open Meteo SPEC - Weather Forecast\n\nThis tool will go to the Open Meteo site with the geolocation information at https://api.open-meteo.com/v1/forecast\n\nIt will pass the information on latitude, longitude, and the number of days for which it will bring data.\n\nThere are many default pieces of information within, but the focus is not to explain the Open Meteo API.\n\nVariables like latitude, longitude, and forecast_days are self-explanatory for OpenAI, making it the easiest tool to configure.\n\n- latitude (By Model) and Placeholder\n- longitude (By Model) and Placeholder\n- forecast_days (By Model) and Placeholder\n"
            },
            "typeVersion": 1
      },
      {
            "id": "1c8087ce-6800-4ece-8234-23914e21a692",
            "name": "A tool for inputting the city and obtaining geolocation",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  820,
                  -100
            ],
            "parameters": {
                  "url": "=https://geocoding-api.open-meteo.com/v1/search",
                  "sendQuery": true,
                  "parametersQuery": {
                        "values": [
                              {
                                    "name": "name"
                              },
                              {
                                    "name": "count",
                                    "value": "1",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "format",
                                    "value": "json",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "toolDescription": "Input the City and get geolocation, geocode or coordinates from Requested City",
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "name",
                                    "type": "string",
                                    "description": "Requested City"
                              }
                        ]
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "15ae7421-eff9-4677-b8cf-b7bbb5d2385e",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -100,
                  340
            ],
            "parameters": {
                  "color": 3,
                  "width": 840,
                  "height": 80,
                  "content": "## Within N8N, there will be a chat button to test, or you can use the external chat link from the trigger."
            },
            "typeVersion": 1
      }
],
    connections: {
      "OpenAI Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Generic AI Tool Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat Memory Buffer": {
            "ai_memory": [
                  [
                        {
                              "node": "When chat message received",
                              "type": "ai_memory",
                              "index": 0
                        },
                        {
                              "node": "Generic AI Tool Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "When chat message received": {
            "main": [
                  [
                        {
                              "node": "Generic AI Tool Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "A tool for inputting the city and obtaining geolocation": {
            "ai_tool": [
                  [
                        {
                              "node": "Generic AI Tool Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "A tool to get the weather forecast based on geolocation": {
            "ai_tool": [
                  [
                        {
                              "node": "Generic AI Tool Agent",
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
    name: "Introduction To The HTTP Tool",
    nodes: [
      {
            "id": "abccacce-bbdc-428e-94e0-19996c5bfe02",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1720,
                  160
            ],
            "parameters": {
                  "color": 7,
                  "width": 319.5392879244982,
                  "height": 218.88813194060202,
                  "content": "### AI agent that can scrape webpages\nRemake of https://n8n.io/workflows/2006-ai-agent-that-can-scrape-webpages/\n\n**Changes**:\n* Replaces Execute Workflow Tool and Subworkflow\n* Replaces Response Formatting"
            },
            "typeVersion": 1
      },
      {
            "id": "9fc05c79-5a2d-4ac4-a4f5-32b9c1b385e1",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1340,
                  340
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
            "id": "45c9bdaf-d51e-4026-8911-4b04c5473b06",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1720,
                  560
            ],
            "parameters": {
                  "color": 7,
                  "width": 365.9021913627245,
                  "height": 245.35379866205295,
                  "content": "### Allow your AI to call an API to fetch data\nRemake of https://n8n.io/workflows/2094-allow-your-ai-to-call-an-api-to-fetch-data/\n\n**Changes**:\n* Replaces Execute Workflow Tool and Subworkflow\n* Replaces Manual Query Params Definitions\n* Replaces Response Formatting"
            },
            "typeVersion": 1
      },
      {
            "id": "bc1754e6-01f4-4561-8814-c08feb45acec",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1340,
                  740
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
            "id": "a40230ae-6050-4bb8-b275-3a893dc3ad98",
            "name": "Activity Tool",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1560,
                  740
            ],
            "parameters": {
                  "url": "https://bored-api.appbrewery.com/filter",
                  "sendQuery": true,
                  "parametersQuery": {
                        "values": [
                              {
                                    "name": "type"
                              },
                              {
                                    "name": "participants"
                              }
                        ]
                  },
                  "toolDescription": "Call this tool to suggest an activity where:\n* the parameter \"type\" is one of \"education\", \"recreational\",\"social\",\"diy\",\"charity\",\"cooking\",\"relaxation\",\"music\",\"busywork\"\n* the parameter \"participants\" is the number of participants for the activity"
            },
            "typeVersion": 1
      },
      {
            "id": "297377e0-e149-4786-b521-82670ac390a7",
            "name": "Set ChatInput1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1180,
                  560
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e976bf5f-8803-4129-9136-115b3d15755c",
                                    "name": "chatInput",
                                    "type": "string",
                                    "value": "Hi! Please suggest something to do. I feel like learning something new!"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "a9128da1-4486-4a17-b9b3-64ebc402348d",
            "name": "AI Agent1",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1360,
                  560
            ],
            "parameters": {
                  "text": "={{ $json.chatInput }}",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "28a5e75e-e32d-4c94-bea2-7347923e6bb9",
            "name": "Set ChatInput",
            "type": "n8n-nodes-base.set",
            "position": [
                  1160,
                  160
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "9695c156-c882-4e43-8a4e-70fbdc1a63de",
                                    "name": "chatInput",
                                    "type": "string",
                                    "value": "Can get the latest 10 issues from https://github.com/n8n-io/n8n/issues?"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "d29b30fb-7edb-4665-bc6b-a511caf9db9f",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  900,
                  400
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "066f9cdd-4bd3-48a1-bf9b-32eda3e28945",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1360,
                  160
            ],
            "parameters": {
                  "text": "={{ $json.chatInput }}",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "fb4abae8-7e38-47b7-9595-403e523f7125",
            "name": "Webscraper Tool",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1560,
                  340
            ],
            "parameters": {
                  "url": "https://api.firecrawl.dev/v0/scrape",
                  "fields": "markdown",
                  "method": "POST",
                  "sendBody": true,
                  "dataField": "data",
                  "authentication": "genericCredentialType",
                  "parametersBody": {
                        "values": [
                              {
                                    "name": "url"
                              },
                              {
                                    "name": "pageOptions",
                                    "value": "={{ {\n onlyMainContent: true,\n replaceAllPathsWithAbsolutePaths: true,\n removeTags: 'img,svg,video,audio'\n} }}",
                                    "valueProvider": "fieldValue"
                              }
                        ]
                  },
                  "fieldsToInclude": "selected",
                  "genericAuthType": "httpHeaderAuth",
                  "toolDescription": "Call this tool to fetch a webpage content.",
                  "optimizeResponse": true
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "OUOnyTkL9vHZNorB",
                        "name": "Firecrawl API"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "73d3213c-1ecb-4007-b882-1cc756a6f6e0",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  420,
                  120
            ],
            "parameters": {
                  "width": 413.82332632615135,
                  "height": 435.92895157500243,
                  "content": "## Try It Out!\n\n### The HTTP tool is drastically simplifies API-enabled AI agents cutting down the number of workflow nodes by as much as 10!\n\n* Available since v1.47.0\n* Recommended for single purpose APIs which don't require much post-fetch formatting.\n* If you require a chain of API calls, you may need to implement a subworkflow instead.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Activity Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Agent1",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set ChatInput": {
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
      "Set ChatInput1": {
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
      "Webscraper Tool": {
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
      "OpenAI Chat Model1": {
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
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "Set ChatInput",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Set ChatInput1",
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
    name: "KB Tool - Confluence Knowledge Base",
    nodes: [
      {
            "id": "f1142274-898d-43da-a7ff-2b2e03f2dc73",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  1220,
                  840
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "1f407421-2dd6-4e0c-bc74-cfb291e475ed",
            "name": "Query Confluence",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1640,
                  840
            ],
            "parameters": {
                  "url": "https://n8n-labs.atlassian.net/wiki/rest/api/search",
                  "options": {},
                  "sendQuery": true,
                  "sendHeaders": true,
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpBasicAuth",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "cql",
                                    "value": "=text ~ \"{{ $json.query }}\""
                              }
                        ]
                  },
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "accept",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpBasicAuth": {
                        "id": "B1Cj4Uh9d9WKWxBO",
                        "name": "Confluence API Key"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "f1ab7e79-6bd8-4b87-b6dc-96f9d46cdd16",
            "name": "Return Tool Response",
            "type": "n8n-nodes-base.set",
            "position": [
                  2040,
                  840
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "c1d46e59-9340-43f3-bc2a-fbd4e0def74f",
                                    "name": "response",
                                    "type": "string",
                                    "value": "=\"Title\": \"{{ $json.results[0].content.title }}\"\n\"Link\": \"{{ $json._links.base }}{{ $json.results[0].content._links.webui }}\"\n\"Content\": {{ $json[\"results\"][0][\"excerpt\"] }}\nWhen users request the password, make sure to send them the link above to reset it in markdown. "
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "19be50a2-4835-48a6-b06a-7996231c519d",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1037.1879432624112,
                  466.2978723404259
            ],
            "parameters": {
                  "color": 7,
                  "width": 460.26595744680884,
                  "height": 598.588007755415,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n## Receive Query from Parent Workflow\nThis node receives input from the AI Agent in the top level workflow where it passes just the Slack Message directly to this workflow."
            },
            "typeVersion": 1
      },
      {
            "id": "0012feaa-89f5-40a4-86d6-98e0e9648bd5",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1520,
                  469.2511978555872
            ],
            "parameters": {
                  "color": 7,
                  "width": 350.94680851063845,
                  "height": 588.3931371954408,
                  "content": "![confluence](https://i.imgur.com/rM48yHY.png)\n## Search Confluence\nThe newly created prompt is then sent into Confluence's API as a search string. \n\nTo replace this with your own KB tool, find the Endpoint that allows search, and replace this HTTP Request node with your own HTTP Request or Built in n8n node and pass the search variable into the search input. "
            },
            "typeVersion": 1
      },
      {
            "id": "6982692e-61c5-47fc-9946-ada32d5fa2a1",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1900,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 648.2749545725208,
                  "height": 597.2865893156994,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n## Respond to Parent Workflow with Confluence Results\nThe final output is then sent to the Parent workflow to be used in the final AI Agent API call to the LLM of your choice as part of the final output. Here is the prompt output: \n```\n\"Title\": \"Title of content so AI Agent will know the name of the content\"\n\"Link\": \"Link to URL of KB article. Great for giving back to user to self help\"\n\"Content\": Truncated output of content so that the large language model will have more context in it's final response. \nWhen users request the password, make sure to send them the link above to reset it in markdown. \n```"
            },
            "typeVersion": 1
      },
      {
            "id": "9570ee97-8508-4c7f-a2da-a327fbc7db46",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  460
            ],
            "parameters": {
                  "width": 543.0233137166141,
                  "height": 854.6009864319319,
                  "content": "![n8n](https://i.imgur.com/qXWqiOd.png)\n## Enhance Query Resolution with the Knowledge Base Tool!\n\nOur **Knowledge Base Tool** is crafted to seamlessly integrate into the IT Department Q&A Workflow, enhancing the IT support process by enabling sophisticated search and response capabilities via Slack.\n\n**Workflow Functionality:**\n- **Receive Queries**: Directly accepts user queries from the main workflow, initiating a dynamic search process.\n- **AI-Powered Query Transformation**: Utilizes OpenAI's GPT-4 to refine user queries into searchable keywords that are most likely to retrieve relevant information from the Knowledge Base.\n- **Confluence Integration**: Executes searches within Confluence using the refined keywords to find the most applicable articles and information.\n- **Deliver Accurate Responses**: Gathers essential details from the Confluence results, including article titles, links, and summaries, preparing them to be sent back to the parent workflow for final user response.\n\n\n**Quick Setup Guide:**\n- Ensure correct configurations are set for OpenAI and Confluence API integrations.\n- Customize query transformation logic as per your specific Knowledge Base structure to improve search accuracy.\n\n\n**Need Help?**\n- Dive into our [Documentation](https://docs.n8n.io) or get support from the [Community Forum](https://community.n8n.io)!\n\n\nDeploy this tool to provide precise and informative responses, significantly boosting the efficiency and reliability of your IT support workflow.\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Query Confluence": {
            "main": [
                  [
                        {
                              "node": "Return Tool Response",
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
                              "node": "Query Confluence",
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
    name: "LINE Assistant with Google Calendar and Gmail Integration",
    nodes: [
      {
            "id": "9e1e1c11-f406-47de-8f65-9669cf078d3d",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  -1140,
                  120
            ],
            "parameters": {
                  "text": "={{ $json.body.events[0].message.text }}",
                  "options": {
                        "systemMessage": "=You are a helpful assistant.\n\nHere is the current date {{ $now }}"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "fa722820-8804-47da-bb21-02c0d2b5d665",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  -1020,
                  580
            ],
            "parameters": {
                  "sessionKey": "={{ $json.body.events[0].source.userId }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.3
      },
      {
            "id": "5149b91a-5934-4037-a444-dfdb93d0cd16",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -1180,
                  580
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "211a120d-d65f-4708-adc2-66dc8f4a40d6",
            "name": "Wikipedia",
            "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
            "position": [
                  -360,
                  380
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0e03137d-0300-47a4-bbd8-03c87c93d6e2",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  -780,
                  120
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
                                    "role": "system",
                                    "content": "Your task is to extract and condense the answer into an easily readable format. Don't provide a link or details such as \"ดูเพิ่มเติม\" or \"ดูรายละเอียดได้ที่นี่.\""
                              },
                              {
                                    "content": "={{ $json.output }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "8c6e96bc-aa9d-44d1-b7ce-6bb85b175cf1",
            "name": "Switch Between Text and Others",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -1820,
                  640
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
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
                                                      "leftValue": "={{ $('Line Receiving').item.json.body.events[0].message.type }}",
                                                      "rightValue": "text"
                                                }
                                          ]
                                    }
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "extra"
                  }
            },
            "typeVersion": 3.2
      },
      {
            "id": "721a5e5e-3a9a-435e-9302-03ca7cf64fb7",
            "name": "Line Receiving",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -2320,
                  560
            ],
            "webhookId": "********-****-****-****-************",
            "parameters": {
                  "path": "linechatbotagent",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 2
      },
      {
            "id": "2b47f8f1-a501-4204-9221-c838edfceae7",
            "name": "Error Handling from AI Response",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -220,
                  100
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
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
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.message.content }}",
                                                      "rightValue": "={{ $json.output }}"
                                                }
                                          ]
                                    }
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "extra"
                  }
            },
            "typeVersion": 3.2
      },
      {
            "id": "99218c08-5ec7-44b9-a795-e98f1ec4aab3",
            "name": "Text Cleansing",
            "type": "n8n-nodes-base.set",
            "position": [
                  0,
                  0
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "********-****-****-****-************",
                                    "name": "message.content",
                                    "type": "string",
                                    "value": "={{ $json.message.content.replaceAll(\"\\n\",\"\\\\n\").replaceAll(\"\\n\",\"\").removeMarkdown().removeTags().replaceAll('\"',\"\") }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "39476f44-9dc7-4c72-a857-9e79f85ccd72",
            "name": "Line Answering (Error Case)",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  760,
                  680
            ],
            "parameters": {
                  "url": "https://api.line.me/v2/bot/message/reply",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"replyToken\": \"{{ $('Line Receiving').item.json.body.events[0].replyToken }}\",\n \"messages\": [\n {\n \"type\": \"text\",\n \"text\": \"กรุณาส่งอย่างอื่นเถอะนะเตงอัว\"\n }\n ]}",
                  "sendBody": true,
                  "jsonHeaders": "{\n\"Authorization\": \"Bearer ****************************************\",\n\"Content-Type\": \"application/json\"\n}",
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "specifyHeaders": "json"
            },
            "typeVersion": 4.2
      },
      {
            "id": "a7f8837d-c21b-457d-ad8b-b0b69e3c1ba7",
            "name": "Line Answering (Ordinary Case)",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  600,
                  120
            ],
            "parameters": {
                  "url": "https://api.line.me/v2/bot/message/reply",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"replyToken\": \"{{ $('Line Receiving').item.json.body.events[0].replyToken }}\",\n \"messages\": [\n {\n \"type\": \"text\",\n \"text\": \"{{ $json.message.content }}\"\n }\n ]}",
                  "sendBody": true,
                  "jsonHeaders": "{\n\"Authorization\": \"Bearer ****************************************\",\n\"Content-Type\": \"application/json\"\n}",
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "specifyHeaders": "json"
            },
            "typeVersion": 4.2
      },
      {
            "id": "3280f331-0130-41c2-a581-14feccf76514",
            "name": "Google Calendar Create",
            "type": "n8n-nodes-base.googleCalendarTool",
            "position": [
                  -640,
                  400
            ],
            "parameters": {
                  "end": "= {{ $fromAI(\"createenddate\",\"end date and time to create event\") }}",
                  "start": "= {{ $fromAI(\"createstartdate\",\"start date and time to create event\") }}",
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "***********@gmail.com",
                        "cachedResultName": "***********@gmail.com"
                  },
                  "additionalFields": {
                        "summary": "={{ $fromAI(\"event_name\",\"Name of an Event\") }}"
                  }
            },
            "credentials": {
                  "googleCalendarOAuth2Api": {
                        "id": "0PzHsuCKdTBU5E2Q",
                        "name": "Google Calendar account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "7701895f-9781-41b9-aa80-8440e4e9cbd3",
            "name": "Google Calendar Read",
            "type": "n8n-nodes-base.googleCalendarTool",
            "position": [
                  -880,
                  580
            ],
            "parameters": {
                  "limit": 5,
                  "options": {
                        "timeMax": "={{ $fromAI(\"enddate\",\"end date user mentioned about\") }}",
                        "timeMin": "={{ $fromAI(\"startdate\",\"start date user mentioned about\") }}"
                  },
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "***********@gmail.com",
                        "cachedResultName": "***********@gmail.com"
                  },
                  "operation": "getAll"
            },
            "credentials": {
                  "googleCalendarOAuth2Api": {
                        "id": "0PzHsuCKdTBU5E2Q",
                        "name": "Google Calendar account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "881daa7f-cf9a-4d1f-8235-55d206925ac0",
            "name": "Gmail Read",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  -700,
                  560
            ],
            "webhookId": "********-****-****-****-************",
            "parameters": {
                  "limit": 5,
                  "filters": {
                        "receivedAfter": "={{ $fromAI(\"receiveddate\",\"the date email received\") }}"
                  },
                  "operation": "getAll"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "cZmU8EQya5OtXVgQ",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      }
],
    connections: {
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Error Handling from AI Response",
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
                              "node": "OpenAI",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wikipedia": {
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
      "Gmail Read": {
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
      "Line Receiving": {
            "main": [
                  [
                        {
                              "node": "Switch Between Text and Others",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Text Cleansing": {
            "main": [
                  [
                        {
                              "node": "Line Answering (Ordinary Case)",
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
      "Google Calendar Read": {
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
      "Google Calendar Create": {
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
      "Switch Between Text and Others": {
            "main": [
                  [
                        {
                              "node": "AI Agent",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Line Answering (Error Case)",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Error Handling from AI Response": {
            "main": [
                  [
                        {
                              "node": "Text Cleansing",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Line Answering (Error Case)",
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
    name: "Monthly Spotify Track Archiving And Playlist Classification",
    nodes: [
      {
            "id": "6325369f-5881-4e4e-b71b-510a64b236ef",
            "name": "Retrieve relevant info",
            "type": "n8n-nodes-base.set",
            "position": [
                  1260,
                  400
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={\n\"track\" : \"{{ $json.track.name.replaceAll('\"',\"'\") }}\",\n\"artist\": \"{{ $json.track.artists[0].name }}\",\n\"album\" :\"{{ $json.track.album.name }}\",\n\"track_spotify_uri\" : \"{{ $json.track.uri }}\",\n\"track_spotify_id\" : \"{{ $json.track.id }}\",\n\"external_urls\": \"{{ $json.track.external_urls.spotify }}\",\n\"track_popularity\" : \"{{ $json.track.popularity }}\",\n\"album_release_date\" : \"{{ $json.track.album.release_date.toDateTime().year }}\"\n}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "2252fe16-6ee7-4fbe-b74e-d9bdcc7ad708",
            "name": "Batch preparation",
            "type": "n8n-nodes-base.code",
            "position": [
                  1560,
                  280
            ],
            "parameters": {
                  "jsCode": "const items = $input.all();\nconst trackSpotifyIds = items.map((item) => item?.json?.track_spotify_id);\n\nconst aggregatedItems = [];\nfor (let i = 0; i < trackSpotifyIds.length; i += 100) {\n aggregatedItems.push({\n json: {\n trackSpotifyIds: trackSpotifyIds.slice(i, i + 100),\n },\n });\n}\n\nreturn aggregatedItems;\n"
            },
            "typeVersion": 2
      },
      {
            "id": "83c181f8-ed18-41d7-8c7e-26b0dd320083",
            "name": "Get Track details",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1980,
                  280
            ],
            "parameters": {
                  "url": "https://api.spotify.com/v1/audio-features",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "ids",
                                    "value": "={{ $json.trackSpotifyIds.join(\",\")}}"
                              }
                        ]
                  },
                  "nodeCredentialType": "spotifyOAuth2Api"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "S9iODAILG9yn19ta",
                        "name": "Spotify account - Arnaud's"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "6cf1afdd-7e62-4d76-a034-5e943e2db0ff",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  2200,
                  280
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "audio_features"
            },
            "typeVersion": 1
      },
      {
            "id": "fc3ab428-40f9-4439-83b6-8ecb125d510f",
            "name": "Anthropic Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "position": [
                  4180,
                  1100
            ],
            "parameters": {
                  "options": {
                        "temperature": 0.3,
                        "maxTokensToSample": 8192
                  }
            },
            "credentials": {
                  "anthropicApi": {
                        "id": "SsGpCc91NlFBaH2I",
                        "name": "Anthropic account - Bertrand"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e712d5c0-5045-4cd2-8324-5cde4fc37b2a",
            "name": "Get Playlist",
            "type": "n8n-nodes-base.spotify",
            "position": [
                  1080,
                  -71
            ],
            "parameters": {
                  "resource": "playlist",
                  "operation": "getUserPlaylists"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "S9iODAILG9yn19ta",
                        "name": "Spotify account - Arnaud's"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5d9d2abe-c85f-41a9-bb99-28a1306a8685",
            "name": "Get Tracks",
            "type": "n8n-nodes-base.spotify",
            "position": [
                  1040,
                  400
            ],
            "parameters": {
                  "resource": "library",
                  "returnAll": true
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "S9iODAILG9yn19ta",
                        "name": "Spotify account - Arnaud's"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9e5b30cb-db4c-445e-bd82-314740d6af64",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  4540,
                  1100
            ],
            "parameters": {
                  "schemaType": "manual",
                  "inputSchema": "{\n \"$schema\": \"http://json-schema.org/draft-07/schema#\",\n \"type\": \"array\",\n \"items\": {\n \"type\": \"object\",\n \"properties\": {\n \"playlistName\": {\n \"type\": \"string\",\n \"description\": \"The name of the playlist\"\n },\n \"uri\": {\n \"type\": \"string\",\n \"description\": \"The unique identifier for the playlist, in URI format\"\n },\n \"trackUris\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": \"string\",\n \"description\": \"The unique identifier for each track in the playlist, in URI format\"\n },\n \"description\": \"A list of track URIs for the playlist\",\n \"maxItems\": 1000\n }\n },\n \"required\": [\"playlistName\", \"uri\", \"trackUris\"],\n \"additionalProperties\": false\n }\n}\n"
            },
            "typeVersion": 1.2
      },
      {
            "id": "8ddc9606-d70a-4a94-8dff-9ed17cec378e",
            "name": "Playlists informations",
            "type": "n8n-nodes-base.set",
            "position": [
                  1520,
                  -71
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={\n \"playlist_name\": \"{{ $json.name }}\",\n \"playlist_description\": \"{{ $json.description }}\",\n \"playlist_spotify_uri\": \"{{ $json.uri }}\"\n}\n "
            },
            "typeVersion": 3.4
      },
      {
            "id": "ec99ed3b-3cd9-4dc2-a7c6-5099eaeea93b",
            "name": "Filter my playlist",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1300,
                  -71
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
                                    "id": "bad771d7-2f4c-43bb-996a-0e46bbf85231",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.owner.display_name }}",
                                    "rightValue": "Arnaud"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "64e57339-2bf2-4dc7-bca7-3de7da80b6eb",
            "name": "Split Out1",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  4700,
                  880
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "output"
            },
            "typeVersion": 1
      },
      {
            "id": "924f5b88-9dce-4acc-9ad6-0f25f804fcc5",
            "name": "Batch preparation1",
            "type": "n8n-nodes-base.code",
            "position": [
                  5380,
                  880
            ],
            "parameters": {
                  "jsCode": "const items = $input.all();\nconst result = [];\n\nitems.forEach((item) => {\n const trackUris = item.json.trackUris;\n if (trackUris.length > 100) {\n for (let i = 0; i < trackUris.length; i += 100) {\n const newItem = { ...item.json, trackUris: trackUris.slice(i, i + 100) };\n result.push(newItem);\n }\n } else {\n result.push(item.json);\n }\n});\n\nreturn result;\n"
            },
            "typeVersion": 2
      },
      {
            "id": "980ef09e-557d-4748-b92a-ceec9dc54a6b",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2400,
                  380
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {
                        "disableDotNotation": false
                  },
                  "advanced": true,
                  "joinMode": "enrichInput2",
                  "mergeByFields": {
                        "values": [
                              {
                                    "field1": "id",
                                    "field2": "track_spotify_id"
                              }
                        ]
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "a6149a04-bd65-4e55-8c1b-5e18fd98c2e8",
            "name": "Simplify Tracks informations",
            "type": "n8n-nodes-base.set",
            "position": [
                  2620,
                  380
            ],
            "parameters": {
                  "include": "except",
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "8bd9a8c4-0c95-43b0-8962-0e005504b6ee",
                                    "name": "date_added",
                                    "type": "string",
                                    "value": "={{ $now.format('yyyy-MM-dd') }}"
                              }
                        ]
                  },
                  "excludeFields": "track_spotify_id, external_urls, id, uri, track_href, analysis_url",
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "96432403-f15f-4015-8024-72731e18b18d",
            "name": "Limit",
            "type": "n8n-nodes-base.limit",
            "position": [
                  2860,
                  240
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "3efb9ee3-1955-40eb-9958-a5fb515f30c1",
            "name": "Get logged tracks",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3120,
                  240
            ],
            "parameters": {
                  "options": {
                        "dataLocationOnSheet": {
                              "values": {
                                    "range": "A:B",
                                    "rangeDefinition": "specifyRangeA1"
                              }
                        }
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit#gid=0",
                        "cachedResultName": "tracks listing"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit?gid=0#gid=0"
                  },
                  "combineFilters": "OR"
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "8UJ5YBcPU0IOkjEd",
                        "name": "Google Sheets - Arnaud Growth Perso"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "58821bc3-254c-46d2-b882-d1995aaf3d46",
            "name": "Excluding logged tracks",
            "type": "n8n-nodes-base.merge",
            "position": [
                  3380,
                  360
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "joinMode": "keepNonMatches",
                  "outputDataFrom": "input2",
                  "fieldsToMatchString": "track_spotify_uri"
            },
            "typeVersion": 3
      },
      {
            "id": "8a28cd62-9316-487e-a8f7-dd5ed3eab6c8",
            "name": "Filter",
            "type": "n8n-nodes-base.filter",
            "position": [
                  5120,
                  880
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
                                    "id": "5457225f-104a-4d38-9481-d243ba656358",
                                    "operator": {
                                          "type": "array",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.trackUris }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "770a42f8-f4e5-44b8-a096-945db7c9f85e",
            "name": "Split Out2",
            "type": "n8n-nodes-base.splitOut",
            "disabled": true,
            "position": [
                  5120,
                  520
            ],
            "parameters": {
                  "include": "allOtherFields",
                  "options": {},
                  "fieldToSplitOut": "trackUris"
            },
            "typeVersion": 1
      },
      {
            "id": "da5c9b03-2ace-40af-9364-c9119eaef7b0",
            "name": "Manual Verification",
            "type": "n8n-nodes-base.merge",
            "disabled": true,
            "position": [
                  5380,
                  480
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "advanced": true,
                  "joinMode": "enrichInput2",
                  "mergeByFields": {
                        "values": [
                              {
                                    "field1": "track_spotify_uri",
                                    "field2": "trackUris"
                              }
                        ]
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "98b3fca5-5b14-42e4-8e5f-5506643a54bb",
            "name": "Spotify",
            "type": "n8n-nodes-base.spotify",
            "onError": "continueErrorOutput",
            "position": [
                  5640,
                  880
            ],
            "parameters": {
                  "id": "={{ $json.uri }}",
                  "trackID": "={{ $json.trackUris.join(\",\") }}",
                  "resource": "playlist",
                  "additionalFields": {}
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "S9iODAILG9yn19ta",
                        "name": "Spotify account - Arnaud's"
                  }
            },
            "retryOnFail": true,
            "typeVersion": 1,
            "waitBetweenTries": 5000
      },
      {
            "id": "536f7ed8-d3bf-4c95-8a7a-42f3a2f47e5c",
            "name": "Aggregate by 200 tracks",
            "type": "n8n-nodes-base.code",
            "position": [
                  4080,
                  880
            ],
            "parameters": {
                  "jsCode": "const items = $input.all();\nconst chunkSize = 200;\nconst result = [];\n\nfor (let i = 0; i < items.length; i += chunkSize) {\n const chunk = items.slice(i, i + chunkSize).map((item) => item.json);\n result.push({json:{chunk}}); // Wrap each chunk in an object with a json property\n}\n\nreturn result;\n"
            },
            "typeVersion": 2
      },
      {
            "id": "e590ef66-4fc1-4b4d-a56c-f93db389500e",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1160,
                  -280
            ],
            "parameters": {
                  "width": 1055,
                  "height": 1188.074539731524,
                  "content": "# Monthly Spotify Track Archiving and Playlist Classification\n\nThis n8n workflow allows you to automatically archive your monthly Spotify liked tracks in a Google Sheet, along with playlist details and descriptions. Based on this data, Claude 3.5 is used to classify each track into multiple playlists and add them in bulk.\n\n## Who is this template for?\nThis workflow template is perfect for Spotify users who want to systematically archive their listening history and organize their tracks into custom playlists.\n\n## What problem does this workflow solve?\nIt automates the monthly process of tracking, storing, and categorizing Spotify tracks into relevant playlists, helping users maintain well-organized music collections and keep a historical record of their listening habits.\n\n## Workflow Overview\n- **Trigger Options**: Can be initiated manually or on a set schedule.\n- **Spotify Playlists Retrieval**: Fetches the current playlists and filters them by owner.\n- **Track Details Collection**: Retrieves information such as track ID and popularity from the user’s library.\n- **Audio Features Fetching**: Uses Spotify's API to get audio features for each track.\n- **Data Merging**: Combines track information with their audio features.\n- **Duplicate Checking**: Filters out tracks that have already been logged in Google Sheets.\n- **Data Logging**: Archives new tracks into a Google Sheet.\n- **AI Classification**: Uses an AI model to classify tracks into suitable playlists.\n- **Playlist Updates**: Adds classified tracks to the corresponding playlists.\n\n## Setup Instructions\n1. **Credentials Setup**: \n Make sure you have valid Spotify OAuth2 and Google Sheets access credentials.\n2. **Trigger Configuration**: \n Choose between manual or scheduled triggers to start the workflow.\n3. **Google Sheets Preparation**: \n Set up a Google Sheet with the necessary structure for logging track details.\n4. **Spotify Playlists Setup**: \n Have a diverse range of playlists and exhaustive description (see example) ready to accommodate different music genres and moods.\n\n## Customization Options\n- **Adjust Playlist Conditions**: \n Modify the AI model’s classification criteria to align with your personal music preferences.\n- **Enhance Track Analysis**: \n Incorporate additional audio features or external data sources for more refined track categorization.\n- **Personalize Data Logging**: \n Customize which track attributes to log in Google Sheets based on your archival preferences.\n- **Configure Scheduling**: \n Set a preferred schedule for periodic track archiving, e.g., monthly or weekly.\n\n## Cost Estimate \nFor 300 tracks, the token usage amounts to approximately 60,000 tokens (58,000 for input and 2,000 for completion), costing around 20 cents with Claude 3.5 Sonnet (as of October 2024)."
            },
            "typeVersion": 1
      },
      {
            "id": "c6e33534-a923-4a1e-8d40-54c3d39f7352",
            "name": "Monthly Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  660,
                  160
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "months"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a085a6af-ede4-4e3a-9bf4-4c29e821af35",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  -240
            ],
            "parameters": {
                  "width": 1729.2548791395811,
                  "height": 349.93537232723713,
                  "content": "**Get & Log Playlists informations**"
            },
            "typeVersion": 1
      },
      {
            "id": "ad33760b-7fa9-4246-806c-438fdf31247b",
            "name": "Get logged playlists",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2000,
                  -171
            ],
            "parameters": {
                  "options": {
                        "dataLocationOnSheet": {
                              "values": {
                                    "rangeDefinition": "detectAutomatically"
                              }
                        }
                  },
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1684849334,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit#gid=1684849334",
                        "cachedResultName": "playslists listing"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit?gid=0#gid=0"
                  },
                  "combineFilters": "OR"
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "8UJ5YBcPU0IOkjEd",
                        "name": "Google Sheets - Arnaud Growth Perso"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "e2beb78f-227c-4ecf-bf90-377d49050646",
            "name": "Log new tracks",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3680,
                  200
            ],
            "parameters": {
                  "columns": {
                        "value": {},
                        "schema": [
                              {
                                    "id": "track",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "track",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "artist",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "artist",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "album",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "album",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "track_spotify_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "track_spotify_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "external_urls",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "external_urls",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "track_popularity",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "track_popularity",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "album_release_date",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "album_release_date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "danceability",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "danceability",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "energy",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "energy",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "key",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "key",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "loudness",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "loudness",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "mode",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "mode",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "speechiness",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "speechiness",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "acousticness",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "acousticness",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "instrumentalness",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "instrumentalness",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "liveness",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "liveness",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "valence",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "valence",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "tempo",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "tempo",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "type",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "type",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "id",
                                    "defaultMatch": true,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "uri",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "uri",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "track_href",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "track_href",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "analysis_url",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "analysis_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "duration_ms",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "duration_ms",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "time_signature",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "time_signature",
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
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit#gid=0",
                        "cachedResultName": "tracks listing"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit?gid=0#gid=0"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "8UJ5YBcPU0IOkjEd",
                        "name": "Google Sheets - Arnaud Growth Perso"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "e9d311c8-d39c-481d-99dc-c89d360f3217",
            "name": "Log new playlists",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2480,
                  -91
            ],
            "parameters": {
                  "columns": {
                        "value": {},
                        "schema": [
                              {
                                    "id": "playlist_name",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "playlist_name",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "playlist_description",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "playlist_description",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "playlist_spotify_uri",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "playlist_spotify_uri",
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
                        "value": 1684849334,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit#gid=1684849334",
                        "cachedResultName": "playslists listing"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "https://docs.google.com/spreadsheets/d/19VwKRDbsh8uU6xitnTXUjk1u73XCGThzyE8nv1YsP24/edit?gid=0#gid=0"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "8UJ5YBcPU0IOkjEd",
                        "name": "Google Sheets - Arnaud Growth Perso"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "0e9dd47b-0bd3-4c8c-84c6-7ef566f41135",
            "name": "Excluding logged playlists",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2240,
                  -91
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "joinMode": "keepNonMatches",
                  "outputDataFrom": "input2",
                  "fieldsToMatchString": "playlist_spotify_uri"
            },
            "typeVersion": 3
      },
      {
            "id": "7e0f1d5b-d74b-474d-bde2-3966ab51e048",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  195.4666080114149
            ],
            "parameters": {
                  "width": 2831.0439846349473,
                  "height": 394.4687643158222,
                  "content": "**Get & Log Playlists informations**"
            },
            "typeVersion": 1
      },
      {
            "id": "b851790c-126a-43bd-a223-0a023d423309",
            "name": "Limit2",
            "type": "n8n-nodes-base.limit",
            "position": [
                  1780,
                  -171
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "f0ec1751-116a-4d14-b815-39f4ba989e33",
            "name": "Classify new tracks",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  3880,
                  460
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "38df0ed5-697d-489d-8d0c-2b18c2e017a8",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3960,
                  740
            ],
            "parameters": {
                  "width": 726.2282986582347,
                  "height": 562.9881279640259,
                  "content": "**AI Classification**"
            },
            "typeVersion": 1
      },
      {
            "id": "5649c3b6-dc55-488f-9afc-106ac410fae1",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  5080,
                  760
            ],
            "parameters": {
                  "width": 858.3555537284071,
                  "height": 309.3037982292949,
                  "content": "**Update Spotify Playlists**"
            },
            "typeVersion": 1
      },
      {
            "id": "8410fc7d-64e3-4abf-b035-667945e84d64",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  5080,
                  340
            ],
            "parameters": {
                  "width": 578.2457729796415,
                  "height": 309.3037982292949,
                  "content": "**Manual Verification**\nWe performed this merge to include the track name, making it easier to verify the AI's output. Adding the track name directly in the machine learning response would double the completion tokens, so it was avoided to keep token usage efficient."
            },
            "typeVersion": 1
      },
      {
            "id": "d59c316a-22d4-46f0-b97c-789e8c196ab1",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1140,
                  1040
            ],
            "parameters": {
                  "width": 610.3407699712512,
                  "height": 922.4081979777811,
                  "content": "### Playlists' Description Examples\n\n\n| Playlist Name | Playlist Description |\n|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| Classique | Indulge in the timeless beauty of classical music with this refined playlist. From baroque to romantic periods, this collection showcases renowned compositions. |\n| Poi | Find your flow with this dynamic playlist tailored for poi, staff, and ball juggling. Featuring rhythmic tracks that complement your movements. |\n| Pro Sound | Boost your productivity and focus with this carefully selected mix of concentration-enhancing music. Ideal for work or study sessions. |\n| ChillySleep | Drift off to dreamland with this soothing playlist of sleep-inducing tracks. Gentle melodies and ambient sounds create a peaceful atmosphere for restful sleep. |\n| To Sing | Warm up your vocal cords and sing your heart out with karaoke-friendly tracks. Featuring popular songs, perfect for solo performances or group sing-alongs. |\n| 1990s | Relive the diverse musical landscape of the 90s with this eclectic mix. From grunge to pop, hip-hop to electronic, this playlist showcases defining genres. |\n| 1980s | Take a nostalgic trip back to the era of big hair and neon with this 80s playlist. Packed with iconic hits and forgotten gems, capturing the energy of the decade.|\n| Groove Up | Elevate your mood and energy with this upbeat playlist. Featuring a mix of feel-good tracks across various genres to lift your spirits and get you moving. |\n| Reggae & Dub | Relax and unwind with the laid-back vibes of reggae and dub. This playlist combines classic reggae tunes with deep, spacious dub tracks for a chilled-out vibe. |\n| Psytrance | Embark on a mind-bending journey with this collection of psychedelic trance tracks. Ideal for late-night dance sessions or intense focus. |\n| Cumbia | Sway to the infectious rhythms of Cumbia with this lively playlist. Blending traditional Latin American sounds with modern interpretations for a danceable mix. |\n| Funky Groove | Get your body moving with this collection of funk and disco tracks. Featuring irresistible basslines and catchy rhythms, perfect for dance parties. |\n| French Chanson | Experience the romance and charm of France with this mix of classic and modern French songs, capturing the essence of French musical culture. |\n| Workout Motivation | Push your limits and power through your exercise routine with this high-energy playlist. From warm-up to cool-down, these tracks will keep you motivated. |\n| Cinematic Instrumentals | Immerse yourself in a world of atmospheric sounds with this collection of cinematic instrumental tracks, perfect for focus, relaxation, or contemplation. |\n"
            },
            "typeVersion": 1
      },
      {
            "id": "d43ce92b-3831-4fd5-a59c-f9dcd7f1b8ea",
            "name": "Basic LLM Chain - AI Classification",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  4280,
                  880
            ],
            "parameters": {
                  "text": "=#### Tracks to Analyze:\n<tracks_to_analyze>\n {{ JSON.stringify($json.chunk) }}\n</tracks_to_analyze>",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "You are an expert in music classification with extensive knowledge of genres, moods, and various musical elements. Your task is to analyze the provided tracks and generate a **comprehensive and exhaustive classification** to enhance my listening experience.\n\n### Process:\n\n1. **Identify Playlist Style**: For each of my personal playlist, use the information provided in <playlists_informations>, including the name and description, to understand its purpose and the types of tracks that are most suitable for it. Use this understanding to guide your classification decisions.\n\n2. **Identify Track Characteristics**: For each track in <tracks_to_analyze>, even if you don't have the audio, use the track's **title and artist**, along with relevant characteristics (including genre, mood, tempo, instrumentation, lyrical themes, and any other musical features), to infer these characteristics based on your expertise.\n\n3. **Playlist Assignment**: For each playlist, identify the most relevant tracks and assign them to the appropriate playlists based on their characteristics. A single track may belong to multiple playlists, so ensure you **exhaustively include it in all relevant categories**.\n\n#### Playlist Information:\n<playlists_informations>\n {{ JSON.stringify($('Playlists informations').all()) }}\n</playlists_informations>\n\n### Examples\n\nFind below the track input and a sample response for reference.\n\n\n<tracks_to_analyze>\n[ {\"track\":\"William Tell (Guillaume Tell) Overture: Finale [Arr. for Euphonium by Jorijn Van Hese]\",\"artist\":\"Jorijn Van Hese\",\"album\":\"William Tell (Guillaume Tell) Overture: Finale [Arr. for Euphonium by Jorijn Van Hese]\",\"track_spotify_uri\":\"spotify:track:1I5L8EAVFpTnSAYptTJVrU\",\"track_popularity\":\"28\",\"album_release_date\":\"2018\",\"danceability\":0.561,\"energy\":0.236,\"key\":0,\"loudness\":-27.926,\"mode\":1,\"speechiness\":0.0491,\"acousticness\":0.995,\"instrumentalness\":0.934,\"liveness\":0.121,\"valence\":0.964,\"tempo\":102.216,\"type\":\"audio_features\",\"duration_ms\":120080,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"Geffen\",\"artist\":\"Barnt\",\"album\":\"Azari & III Presents - Body Language, Vol. 13\",\"track_spotify_uri\":\"spotify:track:7wVKbT4vwRaEEJ7fnu6Ota\",\"track_popularity\":\"13\",\"album_release_date\":\"2013\",\"danceability\":0.83,\"energy\":0.355,\"key\":1,\"loudness\":-12.172,\"mode\":1,\"speechiness\":0.0911,\"acousticness\":0.00151,\"instrumentalness\":0.934,\"liveness\":0.111,\"valence\":0.129,\"tempo\":118.947,\"type\":\"audio_features\",\"duration_ms\":486910,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"I Wan'na Be Like You (The Monkey Song)\",\"artist\":\"Louis Prima\",\"album\":\"The Jungle Book\",\"track_spotify_uri\":\"spotify:track:2EeVPGHq2I7fjeDfT6LEYX\",\"track_popularity\":\"58\",\"album_release_date\":\"1997\",\"danceability\":0.746,\"energy\":0.404,\"key\":7,\"loudness\":-15.09,\"mode\":0,\"speechiness\":0.0995,\"acousticness\":0.662,\"instrumentalness\":0.000238,\"liveness\":0.281,\"valence\":0.795,\"tempo\":96.317,\"type\":\"audio_features\",\"duration_ms\":279453,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"Linda Nena\",\"artist\":\"Juaneco Y Su Combo\",\"album\":\"The Roots of Chicha\",\"track_spotify_uri\":\"spotify:track:6QsovprLkdGeE9FSsOjuQA\",\"track_popularity\":\"0\",\"album_release_date\":\"2007\",\"danceability\":0.707,\"energy\":0.749,\"key\":4,\"loudness\":-6.36,\"mode\":0,\"speechiness\":0.0336,\"acousticness\":0.696,\"instrumentalness\":0.0000203,\"liveness\":0.104,\"valence\":0.97,\"tempo\":107.552,\"type\":\"audio_features\",\"duration_ms\":225013,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"Sonido Amazonico\",\"artist\":\"Los Mirlos\",\"album\":\"The Roots of Chicha\",\"track_spotify_uri\":\"spotify:track:3hH0sVIoIoPOTmMdjmXSob\",\"track_popularity\":\"0\",\"album_release_date\":\"2007\",\"danceability\":0.883,\"energy\":0.64,\"key\":3,\"loudness\":-6.637,\"mode\":1,\"speechiness\":0.0788,\"acousticness\":0.559,\"instrumentalness\":0.000408,\"liveness\":0.176,\"valence\":0.886,\"tempo\":100.832,\"type\":\"audio_features\",\"duration_ms\":155000,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"Para Elisa\",\"artist\":\"Los Destellos\",\"album\":\"The Roots of Chicha\",\"track_spotify_uri\":\"spotify:track:4Sd525AYAaYuiexGHTcoFy\",\"track_popularity\":\"0\",\"album_release_date\":\"2007\",\"danceability\":0.69,\"energy\":0.8,\"key\":11,\"loudness\":-11.125,\"mode\":1,\"speechiness\":0.0602,\"acousticness\":0.205,\"instrumentalness\":0.886,\"liveness\":0.0531,\"valence\":0.801,\"tempo\":113.401,\"type\":\"audio_features\",\"duration_ms\":166507,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"Stand By Me\",\"artist\":\"Ben E. King\",\"album\":\"Don't Play That Song (Mono)\",\"track_spotify_uri\":\"spotify:track:3SdTKo2uVsxFblQjpScoHy\",\"track_popularity\":\"75\",\"album_release_date\":\"1962\",\"danceability\":0.65,\"energy\":0.306,\"key\":9,\"loudness\":-9.443,\"mode\":1,\"speechiness\":0.0393,\"acousticness\":0.57,\"instrumentalness\":0.00000707,\"liveness\":0.0707,\"valence\":0.605,\"tempo\":118.068,\"type\":\"audio_features\",\"duration_ms\":180056,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"One Night in Bangkok\",\"artist\":\"Murray Head\",\"album\":\"Emotions (My Favourite Songs)\",\"track_spotify_uri\":\"spotify:track:6erBowZaW6Ur3vNOWhS2zM\",\"track_popularity\":\"58\",\"album_release_date\":\"1980\",\"danceability\":0.892,\"energy\":0.578,\"key\":10,\"loudness\":-5.025,\"mode\":1,\"speechiness\":0.15,\"acousticness\":0.112,\"instrumentalness\":0.000315,\"liveness\":0.0897,\"valence\":0.621,\"tempo\":108.703,\"type\":\"audio_features\",\"duration_ms\":236067,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"The Big Tree\",\"artist\":\"Stand High Patrol\",\"album\":\"Midnight Walkers\",\"track_spotify_uri\":\"spotify:track:4ZpqCGtkgPn1Pxsgtmtc8O\",\"track_popularity\":\"50\",\"album_release_date\":\"2012\",\"danceability\":0.697,\"energy\":0.392,\"key\":2,\"loudness\":-9.713,\"mode\":1,\"speechiness\":0.0417,\"acousticness\":0.259,\"instrumentalness\":0.0000388,\"liveness\":0.0956,\"valence\":0.196,\"tempo\":167.002,\"type\":\"audio_features\",\"duration_ms\":241120,\"time_signature\":4,\"date_added\":\"2024-10-27\"}, {\"track\":\"Hotel California - 2013 Remaster\",\"artist\":\"Eagles\",\"album\":\"Hotel California (2013 Remaster)\",\"track_spotify_uri\":\"spotify:track:40riOy7x9W7GXjyGp4pjAv\",\"track_popularity\":\"82\",\"album_release_date\":\"1976\",\"danceability\":0.579,\"energy\":0.508,\"key\":2,\"loudness\":-9.484,\"mode\":1,\"speechiness\":0.027,\"acousticness\":0.00574,\"instrumentalness\":0.000494,\"liveness\":0.0575,\"valence\":0.609,\"tempo\":147.125,\"type\":\"audio_features\",\"duration_ms\":391376,\"time_signature\":4,\"date_added\":\"2024-10-27\"} ]\n</tracks_to_analyze>\n\nOutput : \n[\n {\n \"playlistName\": \"Classique\",\n \"uri\": \"spotify:playlist:1AASnV7pZApr6JWCAWg94R\",\n \"tracks\": [\n {\n \"trackName\": \"William Tell (Guillaume Tell) Overture: Finale [Arr. for Euphonium by Jorijn Van Hese]\",\n \"trackUri\": \"spotify:track:1I5L8EAVFpTnSAYptTJVrU\"\n }\n ]\n },\n {\n \"playlistName\": \"Pro Sound\",\n \"uri\": \"spotify:playlist:7G27Ccw1vZdWt7uYrUMLwk\",\n \"tracks\": [\n {\n \"trackName\": \"Geffen\",\n \"trackUri\": \"spotify:track:7wVKbT4vwRaEEJ7fnu6Ota\"\n }\n ]\n },\n {\n \"playlistName\": \"To Sing\",\n \"uri\": \"spotify:playlist:7ts0Ccxw5UijIO8zQ8YJqh\",\n \"tracks\": [\n {\n \"trackName\": \"I Wan'na Be Like You (The Monkey Song)\",\n \"trackUri\": \"spotify:track:2EeVPGHq2I7fjeDfT6LEYX\"\n },\n {\n \"trackName\": \"Stand By Me\",\n \"trackUri\": \"spotify:track:3SdTKo2uVsxFblQjpScoHy\"\n },\n {\n \"trackName\": \"One Night in Bangkok\",\n \"trackUri\": \"spotify:track:6erBowZaW6Ur3vNOWhS2zM\"\n },\n {\n \"trackName\": \"Hotel California - 2013 Remaster\",\n \"trackUri\": \"spotify:track:40riOy7x9W7GXjyGp4pjAv\"\n }\n ]\n },\n {\n \"playlistName\": \"1980s\",\n \"uri\": \"spotify:playlist:6DqSzwNT9v7eKE3hbPAQtM\",\n \"tracks\": [\n {\n \"trackName\": \"One Night in Bangkok\",\n \"trackUri\": \"spotify:track:6erBowZaW6Ur3vNOWhS2zM\"\n }\n ]\n },\n {\n \"playlistName\": \"Groove Up\",\n \"uri\": \"spotify:playlist:4rBZMQPf0u6D5FDB82LjHb\",\n \"tracks\": [\n {\n \"trackName\": \"I Wan'na Be Like You (The Monkey Song)\",\n \"trackUri\": \"spotify:track:2EeVPGHq2I7fjeDfT6LEYX\"\n },\n {\n \"trackName\": \"Stand By Me\",\n \"trackUri\": \"spotify:track:3SdTKo2uVsxFblQjpScoHy\"\n }\n ]\n },\n {\n \"playlistName\": \"Reggae & Dub\",\n \"uri\": \"spotify:playlist:60khtG2acFWcFQUIGWrPW6\",\n \"tracks\": [\n {\n \"trackName\": \"The Big Tree\",\n \"trackUri\": \"spotify:track:4ZpqCGtkgPn1Pxsgtmtc8O\"\n }\n ]\n },\n {\n \"playlistName\": \"Cumbia\",\n \"uri\": \"spotify:playlist:1SwaCdO1tS2BbF8IL3WwXO\",\n \"tracks\": [\n {\n \"trackName\": \"Linda Nena\",\n \"trackUri\": \"spotify:track:6QsovprLkdGeE9FSsOjuQA\"\n },\n {\n \"trackName\": \"Sonido Amazonico\",\n \"trackUri\": \"spotify:track:3hH0sVIoIoPOTmMdjmXSob\"\n },\n {\n \"trackName\": \"Para Elisa\",\n \"trackUri\": \"spotify:track:4Sd525AYAaYuiexGHTcoFy\"\n }\n ]\n },\n {\n \"playlistName\": \"Funky Groove\",\n \"uri\": \"spotify:playlist:7jbAj4iensK9FEWsPUez67\",\n \"tracks\": [\n {\n \"trackName\": \"I Wan'na Be Like You (The Monkey Song)\",\n \"trackUri\": \"spotify:track:2EeVPGHq2I7fjeDfT6LEYX\"\n },\n {\n \"trackName\": \"Stand By Me\",\n \"trackUri\": \"spotify:track:3SdTKo2uVsxFblQjpScoHy\"\n }\n ]\n }\n]\n\n### Output Requirements:\n\n1. **Exhaustiveness**: Ensure that at least **80% of the tracks** are categorized into playlists. Be thorough in your analysis to leave no relevant tracks unclassified.\n\n2. **Step-by-Step Approach**:\n - **Think step by step** when classifying tracks, starting with a detailed analysis of their characteristics.\n - **Review each playlist one by one**, assigning tracks based on their attributes to ensure a comprehensive and accurate classification.\n\n3. **Avoid Duplicates**: Do not include the same track more than once in the output unless it belongs to multiple playlists. Each track should appear only once in each playlist's list of tracks.\n\n4. **Only Use Provided Tracks & Playlists**: Classify tracks exclusively from the given list and assign them to the specified playlists. Do not include any tracks or playlists that are not part of the provided data.\n\n### Output Format:\n\nReturn the classification results in the following JSON structure, ensuring that the output is clear and well-organized.\n\n"
                              }
                        ]
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.4
      }
],
    connections: {
      "Limit": {
            "main": [
                  [
                        {
                              "node": "Get logged tracks",
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
                              "node": "Simplify Tracks informations",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter": {
            "main": [
                  [
                        {
                              "node": "Batch preparation1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Limit2": {
            "main": [
                  [
                        {
                              "node": "Get logged playlists",
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
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Tracks": {
            "main": [
                  [
                        {
                              "node": "Retrieve relevant info",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out1": {
            "main": [
                  [
                        {
                              "node": "Split Out2",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Filter",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out2": {
            "main": [
                  [
                        {
                              "node": "Manual Verification",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Get Playlist": {
            "main": [
                  [
                        {
                              "node": "Filter my playlist",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Monthly Trigger": {
            "main": [
                  [
                        {
                              "node": "Get Playlist",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get Tracks",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Batch preparation": {
            "main": [
                  [
                        {
                              "node": "Get Track details",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Track details": {
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
      "Get logged tracks": {
            "main": [
                  [
                        {
                              "node": "Excluding logged tracks",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Batch preparation1": {
            "main": [
                  [
                        {
                              "node": "Spotify",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter my playlist": {
            "main": [
                  [
                        {
                              "node": "Playlists informations",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Classify new tracks": {
            "main": [
                  [
                        {
                              "node": "Aggregate by 200 tracks",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Manual Verification",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Anthropic Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Basic LLM Chain - AI Classification",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get logged playlists": {
            "main": [
                  [
                        {
                              "node": "Excluding logged playlists",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Playlists informations": {
            "main": [
                  [
                        {
                              "node": "Excluding logged playlists",
                              "type": "main",
                              "index": 1
                        },
                        {
                              "node": "Limit2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve relevant info": {
            "main": [
                  [
                        {
                              "node": "Batch preparation",
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
      "Aggregate by 200 tracks": {
            "main": [
                  [
                        {
                              "node": "Basic LLM Chain - AI Classification",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Excluding logged tracks": {
            "main": [
                  [
                        {
                              "node": "Log new tracks",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Classify new tracks",
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
                              "node": "Basic LLM Chain - AI Classification",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Excluding logged playlists": {
            "main": [
                  [
                        {
                              "node": "Log new playlists",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Simplify Tracks informations": {
            "main": [
                  [
                        {
                              "node": "Limit",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Excluding logged tracks",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Basic LLM Chain - AI Classification": {
            "main": [
                  [
                        {
                              "node": "Split Out1",
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
    name: "Obsidian Notes Read Aloud: Available as a Podcast Feed",
    nodes: [
      {
            "id": "a44b5cb3-6c9f-4227-a45f-a21765ea120c",
            "name": "OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  -660,
                  -180
            ],
            "parameters": {
                  "input": "={{ $json.body.content }}",
                  "options": {
                        "response_format": "mp3"
                  },
                  "resource": "audio"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "q8L9oWVM7QyzYEE5",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "9ca589b6-f1c7-44a9-8ff7-4abb979a71c3",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1200,
                  -400
            ],
            "parameters": {
                  "width": 440,
                  "height": 540,
                  "content": "## Send Notes to Webhook\n**Setup:**\n- Install [Post Webhook Plugin](https://github.com/Masterb1234/obsidian-post-webhook/) in Obsidian\n- Enter n8n Webhook URL and name in plugin settings\n\n**Usage:**\n- Select text or use full note\n- Open Command Palette (Ctrl+P)\n- Choose 'Send Note/Selection to [name]'\n- Audio file appears in Podcast Feed and note"
            },
            "typeVersion": 1
      },
      {
            "id": "3ea132e5-8c67-4140-a9b2-607ea256e90f",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1200,
                  240
            ],
            "parameters": {
                  "width": 440,
                  "height": 440,
                  "content": "## Generic Podcast Feed Module\nA reusable module for any 'X-to-Podcast' workflow. Generates standard RSS feed from:\n- Source data (Google Sheets)\n- Podcast metadata\n\nCompatible with all major podcast platforms (Apple, Google, Spotify, etc.).\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "92d6a6df-0e4e-423b-8447-dce10d5373ae",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -720,
                  -400
            ],
            "parameters": {
                  "color": 3,
                  "width": 440,
                  "height": 540,
                  "content": "## Create Audio and Write Description\nOpenAI TTS converts notes to audio while the messaging model generates concise descriptions for podcast apps."
            },
            "typeVersion": 1
      },
      {
            "id": "b950b0ab-e27e-473d-9891-d5551a44ed17",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  800,
                  -400
            ],
            "parameters": {
                  "color": 4,
                  "width": 380,
                  "height": 540,
                  "content": "## Append Row to Google Sheets\nSaves essential podcast parameters (<title>, <link>, <description>, <duration>) to Google Sheets for Feed generation."
            },
            "typeVersion": 1
      },
      {
            "id": "02fda37f-77a5-47f5-81bc-b59486704386",
            "name": "Webhook GET Note",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -1040,
                  -120
            ],
            "webhookId": "64fac784-9b98-4bbc-aaf2-dd45763d3362",
            "parameters": {
                  "path": "64fac784-9b98-4bbc-aaf2-dd45763d3362",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "845d04ea-d221-4034-b5e1-75061e5f351c",
            "name": "Webhook GET Podcast Feed",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -1040,
                  460
            ],
            "webhookId": "2f0a6706-54da-4b89-91f4-5e147b393bd8",
            "parameters": {
                  "path": "2f0a6706-54da-4b89-91f4-5e147b393bd8h",
                  "options": {},
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "ce6d766c-89e6-4d62-9d48-d6715a28592f",
            "name": "Upload Audio to Cloudinary",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -220,
                  -120
            ],
            "parameters": {
                  "url": "https://api.cloudinary.com/v1_1/CLOUDINARY_ENV/upload",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "contentType": "multipart-form-data",
                  "sendHeaders": true,
                  "authentication": "genericCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "file",
                                    "parameterType": "formBinaryData",
                                    "inputDataFieldName": "data"
                              },
                              {
                                    "name": "upload_preset",
                                    "value": "rb_preset"
                              },
                              {
                                    "name": "resource_type",
                                    "value": "auto"
                              }
                        ]
                  },
                  "genericAuthType": "httpCustomAuth",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "multipart/form-data"
                              }
                        ]
                  }
            },
            "credentials": {
                  "httpCustomAuth": {
                        "id": "DHmR14pD9rTrd3nS",
                        "name": "Cloudinary API"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "1f86c18d-8197-4671-9c41-726a02108c4e",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  -660,
                  -20
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
                                    "content": "={{ $json.body.content }}"
                              },
                              {
                                    "role": "system",
                                    "content": "Based on the user input text, write a concise and engaging description of 50–150 characters. Highlight the key idea or takeaway while making it compelling and easy to understand. Avoid unnecessary details or repetition."
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "q8L9oWVM7QyzYEE5",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "0942959c-2231-4055-b196-4483c210a39d",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  320,
                  -40
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "ee7ba6a7-f8dd-4863-bf5c-6ec8eb2329ea",
            "name": "Aggregate",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  460,
                  -180
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "f403d045-08e9-400e-9988-c8f55a5aa609",
            "name": "Give Audio Unique Name",
            "type": "n8n-nodes-base.set",
            "position": [
                  -460,
                  -180
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "97f0fe66-7ddf-4eff-a3cf-3104e74dbfac",
                                    "name": "fileName",
                                    "type": "string",
                                    "value": "={{ $('Webhook GET Note').item.json.body.timestamp }}.mp3"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "2dbff0f5-f359-43b7-b0de-4b9d657c69c0",
            "name": "Send Audio to Obsidian",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  80,
                  -180
            ],
            "parameters": {
                  "options": {
                        "responseHeaders": {
                              "entries": [
                                    {
                                          "name": "content-type",
                                          "value": "=audio/mpeg"
                                    }
                              ]
                        }
                  },
                  "respondWith": "binary",
                  "responseDataSource": "set"
            },
            "typeVersion": 1
      },
      {
            "id": "ede7c038-b210-4b29-8557-7530ea4cf63e",
            "name": "Rename Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  620,
                  -180
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "3a7d01f4-7448-40e0-9f46-e6edea971b72",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $('Webhook GET Note').item.json.body.filename.split('.md')[0] }}"
                              },
                              {
                                    "id": "f49446df-3975-4133-a964-ebdcc0d904dd",
                                    "name": "link",
                                    "type": "string",
                                    "value": "={{ $json.data[0].url }}"
                              },
                              {
                                    "id": "8be5df35-ec79-45b1-94c3-306d58100fd2",
                                    "name": "description",
                                    "type": "string",
                                    "value": "={{ $json.data[1].message.content }}"
                              },
                              {
                                    "id": "231d0ee2-13d2-4a28-a19c-adc4920130fd",
                                    "name": "date",
                                    "type": "string",
                                    "value": "={{ $json.data[0].created_at }}"
                              },
                              {
                                    "id": "cd2748b3-999a-4514-9b31-49b7d045101f",
                                    "name": "duration",
                                    "type": "number",
                                    "value": "={{ $json.data[0].duration }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "10a35ef9-ab86-4010-9fcc-3cd765384e93",
            "name": "Append Item to Google Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  940,
                  -180
            ],
            "parameters": {
                  "columns": {
                        "value": {},
                        "schema": [
                              {
                                    "id": "title",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "link",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "link",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "description",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "description",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "date",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "duration",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "duration",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "autoMapInputData",
                        "matchingColumns": []
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F73a7uuzLAq916w2JFndumv0JhnCAvOTN-Cn_OOP3uA/edit#gid=0",
                        "cachedResultName": "Blad1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1F73a7uuzLAq916w2JFndumv0JhnCAvOTN-Cn_OOP3uA",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F73a7uuzLAq916w2JFndumv0JhnCAvOTN-Cn_OOP3uA/edit?usp=drivesdk",
                        "cachedResultName": "obsidian-n8n"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "3Pu0wlfxgNYzVqY6",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "62dd3faf-22db-40f9-892c-2cf9368a9496",
            "name": "Get Items from Google Sheets",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  -660,
                  460
            ],
            "parameters": {
                  "options": {},
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F73a7uuzLAq916w2JFndumv0JhnCAvOTN-Cn_OOP3uA/edit#gid=0",
                        "cachedResultName": "Blad1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1F73a7uuzLAq916w2JFndumv0JhnCAvOTN-Cn_OOP3uA",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F73a7uuzLAq916w2JFndumv0JhnCAvOTN-Cn_OOP3uA/edit?usp=drivesdk",
                        "cachedResultName": "obsidian-n8n"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "3Pu0wlfxgNYzVqY6",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "7b465ed0-d2cc-4862-b0e6-4bd6215f3945",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -720,
                  320
            ],
            "parameters": {
                  "color": 3,
                  "width": 440,
                  "height": 360,
                  "content": "## Podcast Feed Configuration\n- Static: Configure podcast metadata in 'Edit Fields'\n- Dynamic: Episodes automatically pulled from Google Sheets"
            },
            "typeVersion": 1
      },
      {
            "id": "1608ce65-bf1f-4dce-b4c7-b85b72ecb8c7",
            "name": "Write RSS Feed",
            "type": "n8n-nodes-base.code",
            "position": [
                  -120,
                  460
            ],
            "parameters": {
                  "jsCode": "// Variables from a separate edit node\nconst baseUrl = $node[\"Manually Enter Other Data for Podcast Feed\"].data.baseUrl; \nconst podcastTitle = $node[\"Manually Enter Other Data for Podcast Feed\"].data.podcastTitle;\nconst podcastDescription = $node[\"Manually Enter Other Data for Podcast Feed\"].data.podcastDescription;\nconst authorName = $node[\"Manually Enter Other Data for Podcast Feed\"].data.authorName;\nconst ownerName = $node[\"Manually Enter Other Data for Podcast Feed\"].data.ownerName;\nconst ownerEmail = $node[\"Manually Enter Other Data for Podcast Feed\"].data.ownerEmail;\nconst coverImageUrl = $node[\"Manually Enter Other Data for Podcast Feed\"].data.coverImageUrl;\nconst language = $node[\"Manually Enter Other Data for Podcast Feed\"].data.language || 'en-us';\nconst explicitContent = $node[\"Manually Enter Other Data for Podcast Feed\"].data.explicitContent || false;\nconst itunesCategory = $node[\"Manually Enter Other Data for Podcast Feed\"].data.itunesCategory;\nconst webhookUrl = $node[\"Webhook GET Podcast Feed\"].data.webhookUrl\n\n// Get the input items\nconst inputItems = items;\n\n// Function to format date to RFC 822 format\nfunction formatDate(dateString) {\n return new Date(dateString || new Date()).toUTCString();\n}\n\n// Function to convert duration from seconds to HH:MM:SS\nfunction formatDuration(seconds = 0) {\n const hours = Math.floor(seconds / 3600);\n const minutes = Math.floor((seconds % 3600) / 60);\n const remainingSeconds = Math.floor(seconds % 60);\n\n const minutesStr = minutes.toString().padStart(2, '0');\n const secondsStr = remainingSeconds.toString().padStart(2, '0');\n \n if (hours > 0) {\n return `${hours}:${minutesStr}:${secondsStr}`;\n }\n return `${minutesStr}:${secondsStr}`;\n}\n\n// Function to safely sanitize text\nfunction sanitizeText(text) {\n if (text === undefined || text === null) {\n return '';\n }\n return String(text)\n .replace(/&/g, '&amp;')\n .replace(/</g, '&lt;')\n .replace(/>/g, '&gt;')\n .replace(/\"/g, '&quot;')\n .replace(/'/g, '&apos;');\n}\n\n// Generate the RSS feed header\nlet rssFeed = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss xmlns:itunes=\"http://www.itunes.com/dtds/podcast-1.0.dtd\" \n xmlns:content=\"http://purl.org/rss/1.0/modules/content/\"\n xmlns:atom=\"http://www.w3.org/2005/Atom\"\n version=\"2.0\">\n <channel>\n <title>${sanitizeText(podcastTitle)}</title>\n <description>${sanitizeText(podcastDescription)}</description>\n <link>${sanitizeText(baseUrl)}</link>\n <atom:link href=\"${sanitizeText(webhookUrl)}\" rel=\"self\" type=\"application/rss+xml\"/>\n <language>${sanitizeText(language)}</language>\n <copyright>© ${new Date().getFullYear()} ${sanitizeText(authorName)}</copyright>\n <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n <itunes:author>${sanitizeText(authorName)}</itunes:author>\n <itunes:owner>\n <itunes:name>${sanitizeText(ownerName)}</itunes:name>\n <itunes:email>${sanitizeText(ownerEmail)}</itunes:email>\n </itunes:owner>\n <itunes:image href=\"${sanitizeText(coverImageUrl)}\"/>\n <itunes:category text=\"${sanitizeText(itunesCategory)}\"/>\n <itunes:explicit>${explicitContent}</itunes:explicit>\n <itunes:type>episodic</itunes:type>\\n`;\n\n// Generate items\nfor (const item of inputItems) {\n const json = item.json;\n \n // Extract values from the json object\n const title = sanitizeText(json.title);\n const description = sanitizeText(json.description);\n const link = sanitizeText(json.link);\n const date = json.date;\n const duration = json.duration;\n \n // Assign episode and season numbers dynamically based on row_number\n const episodeNumber = json.row_number; // Use row_number for the episode number\n const seasonNumber = 1; // You can adjust this logic if your episodes span multiple seasons\n\n rssFeed += ` <item>\n <title>${title}</title>\n <description>${description}</description>\n <link>${link}</link>\n <guid isPermaLink=\"false\">${link}</guid>\n <pubDate>${formatDate(date)}</pubDate>\n <enclosure \n url=\"${link}\"\n length=\"0\"\n type=\"audio/mpeg\"/>\n <itunes:duration>${formatDuration(duration)}</itunes:duration>\n <itunes:summary>${description}</itunes:summary>\n <itunes:episodeType>full</itunes:episodeType>\n <itunes:episode>${episodeNumber}</itunes:episode>\n <itunes:season>${seasonNumber}</itunes:season>\n <itunes:explicit>${explicitContent}</itunes:explicit>\n <content:encoded>\n <![CDATA[\n <p>${description}</p>\n ]]>\n </content:encoded>\n </item>\\n`;\n}\n\n// Close the RSS feed\nrssFeed += ` </channel>\n</rss>`;\n\n// Return the complete RSS feed\nreturn [{\n json: {\n rssFeed\n }\n}];\n"
            },
            "typeVersion": 2
      },
      {
            "id": "c8c7fbfc-c408-438e-af7e-5c384cfce4a5",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -240,
                  320
            ],
            "parameters": {
                  "color": 5,
                  "width": 340,
                  "height": 360,
                  "content": "## Write Podcast Feed\nGenerates RSS feed XML from collected data."
            },
            "typeVersion": 1
      },
      {
            "id": "b5962e24-49eb-423a-ab8c-cb04daf5e1a0",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -240,
                  -400
            ],
            "parameters": {
                  "color": 5,
                  "width": 460,
                  "height": 540,
                  "content": "## Audio to Cloudinary and Obsidian\nCloudinary stores audio files and provides duration metadata for podcast feed.\n\nSetup:\n- Create Custom Auth credentials\n- Set CLOUDINARY_ENV to your environment"
            },
            "typeVersion": 1
      },
      {
            "id": "e0f18eda-13fc-4771-8ce0-11574a4469ad",
            "name": "Return Podcast Feed to Webhook",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  200,
                  460
            ],
            "parameters": {
                  "options": {
                        "responseHeaders": {
                              "entries": [
                                    {
                                          "name": "Content-Type",
                                          "value": "application/xml"
                                    }
                              ]
                        }
                  },
                  "respondWith": "text",
                  "responseBody": "={{ $json.rssFeed }}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "d3afe3f0-79e4-48c1-a0d6-356b462156c7",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  260,
                  -400
            ],
            "parameters": {
                  "color": 6,
                  "width": 500,
                  "height": 540,
                  "content": "## Prepare Relevant Data\nConsolidates and formats data for Google Sheets storage."
            },
            "typeVersion": 1
      },
      {
            "id": "f77ff10c-e4e3-4761-b4db-4c42d5831f5c",
            "name": "Manually Enter Other Data for Podcast Feed",
            "type": "n8n-nodes-base.set",
            "position": [
                  -460,
                  460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "05d1c4f7-ebe7-4df8-925b-0e0d5539f172",
                                    "name": "baseUrl",
                                    "type": "string",
                                    "value": "https://n8n.io"
                              },
                              {
                                    "id": "e8c6845e-887f-49e9-8336-ca2cb2a2fd29",
                                    "name": "podcastTitle",
                                    "type": "string",
                                    "value": "My Notes to Podcast"
                              },
                              {
                                    "id": "bf2948ed-cffa-4d3f-9bab-5fb008d83b4c",
                                    "name": "podcastDescription",
                                    "type": "string",
                                    "value": "My Notes Read Aloud"
                              },
                              {
                                    "id": "f5008697-3e52-4ae2-94da-c059b60a6de9",
                                    "name": "authorName",
                                    "type": "string",
                                    "value": "Your Name"
                              },
                              {
                                    "id": "6595bf45-e054-4e18-ade9-13e38e6efedb",
                                    "name": "ownerName",
                                    "type": "string",
                                    "value": "Owner Name"
                              },
                              {
                                    "id": "b21efe1c-e5b5-4bb3-bf07-a52859c7a607",
                                    "name": "ownerEmail",
                                    "type": "string",
                                    "value": "owner@email.com"
                              },
                              {
                                    "id": "3f0b090c-0b5e-41cb-9841-05b7b8f83126",
                                    "name": "coverImageUrl",
                                    "type": "string",
                                    "value": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDcMnpgGkzIFxDpDaHEIFVg_D6nVG5Z0pPA&s"
                              },
                              {
                                    "id": "1fb27792-1f2b-4a9a-a353-a64e31bb4747",
                                    "name": "language",
                                    "type": "string",
                                    "value": "en-us"
                              },
                              {
                                    "id": "7c3d868a-f3c0-4fd0-8909-e4172f8a4b18",
                                    "name": "explicitContent",
                                    "type": "string",
                                    "value": "false"
                              },
                              {
                                    "id": "6aa041b4-554c-4540-889c-e37a314d5842",
                                    "name": "itunesCategory",
                                    "type": "string",
                                    "value": "Technology"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      }
],
    connections: {
      "Merge": {
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
      "OpenAI": {
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
      "OpenAI1": {
            "main": [
                  [
                        {
                              "node": "Give Audio Unique Name",
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
                              "node": "Rename Fields",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Rename Fields": {
            "main": [
                  [
                        {
                              "node": "Append Item to Google Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Write RSS Feed": {
            "main": [
                  [
                        {
                              "node": "Return Podcast Feed to Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Webhook GET Note": {
            "main": [
                  [
                        {
                              "node": "OpenAI1",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "OpenAI",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Give Audio Unique Name": {
            "main": [
                  [
                        {
                              "node": "Upload Audio to Cloudinary",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Send Audio to Obsidian",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Webhook GET Podcast Feed": {
            "main": [
                  [
                        {
                              "node": "Get Items from Google Sheets",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload Audio to Cloudinary": {
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
      "Append Item to Google Sheet": {
            "main": [
                  []
            ]
      },
      "Get Items from Google Sheets": {
            "main": [
                  [
                        {
                              "node": "Manually Enter Other Data for Podcast Feed",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Manually Enter Other Data for Podcast Feed": {
            "main": [
                  [
                        {
                              "node": "Write RSS Feed",
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
    name: "Printify Automation - Update Title and Description - AlexK1919",
    nodes: [
      {
            "id": "313b16dc-2583-42f3-a0f7-487e75d7a7ec",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -700,
                  -100
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "fd59c09f-64cd-4e8a-80b1-d1abd9a52a5c",
            "name": "Printify - Get Shops",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -60,
                  -100
            ],
            "parameters": {
                  "url": "https://api.printify.com/v1/shops.json",
                  "options": {},
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "vBaDp4RbmXnEx2rj",
                        "name": "AlexK1919 Printify Header Auth"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "8fa6a094-02f5-46c4-90d4-c17de302b004",
            "name": "Printify - Get Products",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  140,
                  -100
            ],
            "parameters": {
                  "url": "=https://api.printify.com/v1/shops/{{ $json.id }}/products.json",
                  "options": {},
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "vBaDp4RbmXnEx2rj",
                        "name": "AlexK1919 Printify Header Auth"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "00cdd85f-75ef-480b-aa58-d732b764337f",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  340,
                  -100
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "data"
            },
            "typeVersion": 1
      },
      {
            "id": "564b02c3-38ce-411d-b1ca-e1a4b75310e4",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  540,
                  -100
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "95ea265f-7043-46ef-8513-67cf9407bda5",
            "name": "Split - id, title, desc",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  740,
                  -100
            ],
            "parameters": {
                  "include": "selectedOtherFields",
                  "options": {},
                  "fieldToSplitOut": "id",
                  "fieldsToInclude": "title, description"
            },
            "typeVersion": 1
      },
      {
            "id": "93ec8766-6ab3-4331-91fd-9aad24b587e9",
            "name": "Calculator",
            "type": "@n8n/n8n-nodes-langchain.toolCalculator",
            "position": [
                  2240,
                  80
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "a9adf75e-bce3-4e0a-af44-e5e23b16b2f6",
            "name": "Wikipedia",
            "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
            "position": [
                  2120,
                  80
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "36272d91-a100-498d-8f24-2e93f2a1bb5b",
            "name": "Printify - Update Product",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2080,
                  500
            ],
            "parameters": {
                  "url": "=https://api.printify.com/v1/shops/{{ $json.id }}/products/{{ $('Google Sheets Trigger').item.json.product_id }}.json",
                  "method": "PUT",
                  "options": {},
                  "sendBody": true,
                  "authentication": "genericCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "=title",
                                    "value": "={{ $('Google Sheets Trigger').item.json.product_title }}"
                              },
                              {
                                    "name": "description",
                                    "value": "={{ $('Google Sheets Trigger').item.json.product_desc }}"
                              }
                        ]
                  },
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "vBaDp4RbmXnEx2rj",
                        "name": "AlexK1919 Printify Header Auth"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "63f9c4f5-cf6a-444a-af47-ea0e45b506ac",
            "name": "Brand Guidelines + Custom Instructions",
            "type": "n8n-nodes-base.set",
            "position": [
                  -420,
                  -100
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "887815dd-21d5-41d7-b429-5f4361cf93b3",
                                    "name": "brand_name",
                                    "type": "string",
                                    "value": "AlexK1919"
                              },
                              {
                                    "id": "cbaa3dc0-825c-44e4-8a27-061f49daf249",
                                    "name": "brand_tone",
                                    "type": "string",
                                    "value": "informal, instructional, trustoworthy"
                              },
                              {
                                    "id": "0bd1358e-4586-407e-848e-8257923ed1b8",
                                    "name": "custom_instructions",
                                    "type": "string",
                                    "value": "re-write for the coming Christmas season"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "8e99d571-753c-4aca-bdd5-0a8dfb6f5aca",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1000,
                  -340
            ],
            "parameters": {
                  "color": 6,
                  "width": 250,
                  "height": 1066.0405523297766,
                  "content": "# AlexK1919 \n![Alex Kim](https://media.licdn.com/dms/image/v2/D5603AQFOYMkqCPl6Sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718309808352?e=1736985600&v=beta&t=pQKm7lQfUU1ytuC2Gq1PRxNY-XmROFWbo-BjzUPxWOs)\n\n#### I’m Alex Kim, an AI-Native Workflow Automation Architect Building Solutions to Optimize your Personal and Professional Life.\n\n\n### About Me\nhttps://beacons.ai/alexk1919\n\n### Products Used \n[OpenAI](https://openai.com)\n[Printify](https://printify.com/)\n\n[Google Sheets Template for this Workflow](https://docs.google.com/spreadsheets/d/12Y7M5YSUW1e8UUOjupzctOrEtgMK-0Wb32zcVpNcfjk/edit?gid=0#gid=0)"
            },
            "typeVersion": 1
      },
      {
            "id": "59ad5fd5-8960-421e-9d8b-1da34dd54b92",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -120,
                  -340
            ],
            "parameters": {
                  "color": 4,
                  "width": 1020.0792140594992,
                  "height": 1064.4036342575048,
                  "content": "# ![Printify](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb2gV-cjThU_5xJRxtjDx7Uh9xXCN5Uo1GGA&s)\nYou can swap out the API calls to similar services like Printful, Vistaprint, etc."
            },
            "typeVersion": 1
      },
      {
            "id": "25faf7eb-c83d-4740-b3a9-762b652f67d6",
            "name": "Google Sheets Trigger",
            "type": "n8n-nodes-base.googleSheetsTrigger",
            "position": [
                  1480,
                  500
            ],
            "parameters": {
                  "event": "rowUpdate",
                  "options": {
                        "columnsToWatch": [
                              "upload"
                        ]
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
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0/edit?usp=drivesdk",
                        "cachedResultName": "Printify - AlexK1919"
                  }
            },
            "credentials": {
                  "googleSheetsTriggerOAuth2Api": {
                        "id": "qrn9YcLkT3BSPIPA",
                        "name": "AlexK191 Google Sheets Trigger account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c1f3a7f5-ddc5-4d3d-a5ae-8663c31e7376",
            "name": "Printify - Get Shops1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1880,
                  500
            ],
            "parameters": {
                  "url": "https://api.printify.com/v1/shops.json",
                  "options": {},
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "vBaDp4RbmXnEx2rj",
                        "name": "AlexK1919 Printify Header Auth"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "b38cdb40-9784-43d6-b1d2-4d30340d2c1f",
            "name": "GS - Add Product Option",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  1880,
                  -100
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "xid": "={{ Math.random().toString(36).substr(2, 12) }}",
                              "date": "={{ new Date().toISOString().split('T')[0] }}",
                              "time": "={{ new Date().toLocaleTimeString('en-US', { hour12: false }) }}",
                              "status": "Product Processing"
                        },
                        "schema": [
                              {
                                    "id": "xid",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "xid",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "status",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
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
                                    "id": "time",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "time",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "product_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "original_title",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "original_title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_title",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "product_title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "original_desc",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "original_desc",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_desc",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "product_desc",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_url",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "product_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "image_url",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "image_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "video_url",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "video_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": []
                  },
                  "options": {
                        "useAppend": true
                  },
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1Ql9TGAzZCSdSqrHvkZLcsBPoNMAjNpPVsELkumP2heM/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0/edit?usp=drivesdk",
                        "cachedResultName": "Printify - AlexK1919"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "IpY8N9VFCXJLC1hv",
                        "name": "AlexK1919 Google Sheets account"
                  }
            },
            "typeVersion": 4.3
      },
      {
            "id": "da735862-b67d-443e-8f45-e425ef518145",
            "name": "Update Product Option",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  2440,
                  -100
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "xid": "={{ $('GS - Add Product Option').item.json.xid }}",
                              "status": "Option added",
                              "keyword": "={{ $json.message.content.keyword }}",
                              "product_id": "={{ $('Split - id, title, desc').item.json.id }}",
                              "product_desc": "={{ $json.message.content.description }}",
                              "original_desc": "={{ $('Split - id, title, desc').item.json.description }}",
                              "product_title": "={{ $json.message.content.title }}",
                              "original_title": "={{ $('Split - id, title, desc').item.json.title }}"
                        },
                        "schema": [
                              {
                                    "id": "xid",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "xid",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "status",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "status",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "upload",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "upload",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
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
                                    "id": "time",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "time",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_id",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "product_id",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "keyword",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "keyword",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "original_title",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "original_title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_title",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "product_title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "original_desc",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "required": false,
                                    "displayName": "original_desc",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_desc",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "product_desc",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "product_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "product_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "image_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "image_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "video_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "video_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "defineBelow",
                        "matchingColumns": [
                              "xid"
                        ]
                  },
                  "options": {},
                  "operation": "appendOrUpdate",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0/edit#gid=0",
                        "cachedResultName": "Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1A6Phr6QwnMltm1_O6dVGAzmSPlOwuwp7RbCiLSvd9l0/edit?usp=drivesdk",
                        "cachedResultName": "Printify - AlexK1919"
                  }
            },
            "credentials": {
                  "googleSheetsOAuth2Api": {
                        "id": "IpY8N9VFCXJLC1hv",
                        "name": "AlexK1919 Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "b8eeb5b9-e048-4844-8712-b9fed848c041",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  927.0167061883853,
                  -340
            ],
            "parameters": {
                  "color": 5,
                  "width": 454.85441546185024,
                  "height": 1064.2140159143948,
                  "content": "# Set the Number of Options you'd like for the Title and Description"
            },
            "typeVersion": 1
      },
      {
            "id": "0e705827-9fc9-42d7-9c6a-7597de767acb",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1409,
                  -340
            ],
            "parameters": {
                  "color": 4,
                  "width": 1429.3228597821253,
                  "height": 692.9832938116144,
                  "content": "# Process Title and Description Options"
            },
            "typeVersion": 1
      },
      {
            "id": "c0a829b4-6902-4a8d-81a8-70fb1fdf4634",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -560,
                  -340
            ],
            "parameters": {
                  "color": 5,
                  "width": 410,
                  "height": 1067.57654641223,
                  "content": "# Update your Brand Guidelines before running this workflow\nYou can also add custom instructions for the AI node."
            },
            "typeVersion": 1
      },
      {
            "id": "6c50977f-6245-4d57-9cde-8ed8a572af21",
            "name": "If1",
            "type": "n8n-nodes-base.if",
            "position": [
                  1680,
                  -100
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
                                    "id": "22bf0855-c742-4a72-99c9-5ed72a96969a",
                                    "operator": {
                                          "type": "number",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.result }}",
                                    "rightValue": 0
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "82e2812b-59e6-4ac7-9238-7ee44052843b",
            "name": "Number of Options",
            "type": "n8n-nodes-base.set",
            "position": [
                  1100,
                  -100
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e65d9a41-d8a0-40b8-82e6-7f4dd90f0aa7",
                                    "name": "number_of_options",
                                    "type": "string",
                                    "value": "3"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "0476bdb9-6979-41a2-bbe2-63b41ea5ce80",
            "name": "Calculate Options",
            "type": "n8n-nodes-base.code",
            "position": [
                  1480,
                  -100
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "// Get the input data from the previous node\nconst inputData = $json[\"number_of_options\"]; // Fetch the \"number_of_options\" field\n\n// Convert the input to an integer\nconst initialValue = parseInt(inputData, 10);\n\n// Add 1 to retain the initial value and calculate the new value\nconst numberOfOptions = initialValue + 1;\nconst result = numberOfOptions - 1;\n\n// Return both values\nreturn {\n number_of_options: numberOfOptions,\n result,\n};\n"
            },
            "typeVersion": 2
      },
      {
            "id": "d0e57d93-26f3-43c2-8663-5ef22706fd60",
            "name": "Remember Options",
            "type": "n8n-nodes-base.set",
            "position": [
                  2680,
                  40
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e47b9073-6b83-4444-9fde-3a70326fde1f",
                                    "name": "number_of_options",
                                    "type": "number",
                                    "value": "={{ $('Calculate Options').item.json.result - 1 }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "e6ce46c9-0339-449f-8f38-c6fbe26a7a96",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1409.6877789299706,
                  380
            ],
            "parameters": {
                  "color": 4,
                  "width": 1429.3228597821253,
                  "height": 342.36777743061157,
                  "content": "# Update Title and Description"
            },
            "typeVersion": 1
      },
      {
            "id": "14233023-2e76-4cd4-a6fa-e8f67cac3e59",
            "name": "Generate Title and Desc",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2080,
                  -100
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
                                    "content": "=Write an engaging product title and description for this product: \nTitle: {{ $('Split - id, title, desc').item.json.title }}\nDescription: {{ $('Split - id, title, desc').item.json.description }}\n\nDefine a keyword for this product and use it to write the new Title and Description.\n\nThis product will be listed via Printify and posted across various sales channels such as Shopfiy, Etsy, Amazon, and TikTok Shops. This product will be promoted across social media channels."
                              },
                              {
                                    "role": "assistant",
                                    "content": "Be witty. Humanize the content. No emojis."
                              },
                              {
                                    "role": "system",
                                    "content": "You are an ecommerce master and excel at creating content for products."
                              },
                              {
                                    "role": "assistant",
                                    "content": "=Brand Guidelines:\nBrand Name: {{ $('Brand Guidelines + Custom Instructions').item.json.brand_name }}\nBrand Tone: {{ $('Brand Guidelines + Custom Instructions').item.json.brand_tone }}"
                              },
                              {
                                    "role": "system",
                                    "content": "={{ $('Brand Guidelines + Custom Instructions').item.json.custom_instructions }}"
                              },
                              {
                                    "role": "system",
                                    "content": "Output:\nKeyword\nTitle\nDescription"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "ysxujEYFiY5ozRTS",
                        "name": "AlexK OpenAi Key"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "41391fd2-d0b9-436f-a44b-29bd1db9bc72",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  1680,
                  500
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
                                    "id": "d9c78fa8-c2ba-4c08-b5d2-848112caa1cc",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.upload }}",
                                    "rightValue": "yes"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Printify - Get Shops1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If1": {
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
                              "node": "GS - Add Product Option",
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
                              "node": "Loop Over Items",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wikipedia": {
            "ai_tool": [
                  [
                        {
                              "node": "Generate Title and Desc",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Calculator": {
            "ai_tool": [
                  [
                        {
                              "node": "Generate Title and Desc",
                              "type": "ai_tool",
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
                              "node": "Split - id, title, desc",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Remember Options": {
            "main": [
                  [
                        {
                              "node": "Calculate Options",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Calculate Options": {
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
      "Number of Options": {
            "main": [
                  [
                        {
                              "node": "Calculate Options",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Printify - Get Shops": {
            "main": [
                  [
                        {
                              "node": "Printify - Get Products",
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
      "Printify - Get Shops1": {
            "main": [
                  [
                        {
                              "node": "Printify - Update Product",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Update Product Option": {
            "main": [
                  [
                        {
                              "node": "Remember Options",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "GS - Add Product Option": {
            "main": [
                  [
                        {
                              "node": "Generate Title and Desc",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Title and Desc": {
            "main": [
                  [
                        {
                              "node": "Update Product Option",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Printify - Get Products": {
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
      "Split - id, title, desc": {
            "main": [
                  [
                        {
                              "node": "Number of Options",
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
                              "node": "Brand Guidelines + Custom Instructions",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Brand Guidelines + Custom Instructions": {
            "main": [
                  [
                        {
                              "node": "Printify - Get Shops",
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
    name: "Qualify Replies From Pipedrive Persons With AI",
    nodes: [
      {
            "id": "97b36168-7fa8-4a97-a6cc-c42496918c4c",
            "name": "Search Person in CRM",
            "type": "n8n-nodes-base.pipedrive",
            "position": [
                  -880,
                  400
            ],
            "parameters": {
                  "term": "={{ $json.from.value[0].address }}",
                  "limit": 1,
                  "resource": "person",
                  "operation": "search",
                  "additionalFields": {
                        "includeFields": ""
                  }
            },
            "credentials": {
                  "pipedriveApi": {
                        "id": "MdJQDtRDHnpwuVYP",
                        "name": "Pipedrive LinkedUp"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2a17582b-9375-4a01-87d9-a50f573b83db",
            "name": "In campaign?",
            "type": "n8n-nodes-base.if",
            "position": [
                  -420,
                  400
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json.in_campaign }}",
                                    "value2": "True"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2a8d509f-8ac2-4f45-a905-f34552833381",
            "name": "Get person from CRM",
            "type": "n8n-nodes-base.pipedrive",
            "position": [
                  -640,
                  400
            ],
            "parameters": {
                  "personId": "={{ $json.id }}",
                  "resource": "person",
                  "operation": "get",
                  "resolveProperties": true
            },
            "credentials": {
                  "pipedriveApi": {
                        "id": "MdJQDtRDHnpwuVYP",
                        "name": "Pipedrive LinkedUp"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b9c6f3d3-1a6d-4144-8e77-3a3c6e5282d8",
            "name": "Is interested?",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  -180,
                  380
            ],
            "parameters": {
                  "model": "gpt-4",
                  "prompt": {
                        "messages": [
                              {
                                    "content": "=You are the best sales development representative in the world. You send cold email messages daily to CEOs and founders of companies. You do this to persuade them to make contact. This could be a phone call or a video meeting. \n\nYour task is to assess whether someone is interested in meeting up or calling sometime. You do this by attentively evaluating their response.\n\nThis is the email:\n{{ $('Get email').item.json.text }}\n\nThe response format should be:\n{\"interested\": [yes/no],\n\"reason\": reason\n}\n\nJSON:"
                              }
                        ]
                  },
                  "options": {},
                  "resource": "chat"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "qPBzqgpCRxncJ90K",
                        "name": "OpenAi account 2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f1eb438d-f002-4082-8481-51565df13f5c",
            "name": "Get email",
            "type": "n8n-nodes-base.set",
            "position": [
                  -1100,
                  400
            ],
            "parameters": {
                  "fields": {
                        "values": [
                              {
                                    "name": "email",
                                    "stringValue": "={{ $json.text }}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "78461c36-ba54-4f0f-a38e-183bfafa576c",
            "name": "Create deal in CRM",
            "type": "n8n-nodes-base.pipedrive",
            "position": [
                  460,
                  360
            ],
            "parameters": {
                  "title": "={{ $('Get person from CRM').item.json.Name }} Deal",
                  "additionalFields": {}
            },
            "credentials": {
                  "pipedriveApi": {
                        "id": "MdJQDtRDHnpwuVYP",
                        "name": "Pipedrive LinkedUp"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "efe07661-9afc-4184-b558-e1f547b6721f",
            "name": "IF interested",
            "type": "n8n-nodes-base.if",
            "position": [
                  240,
                  380
            ],
            "parameters": {
                  "conditions": {
                        "string": [
                              {
                                    "value1": "={{ $json.interested }}",
                                    "value2": "yes"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "7c2b7b59-9d68-4d8c-9b9f-a36ea47526c9",
            "name": "Get response",
            "type": "n8n-nodes-base.code",
            "position": [
                  20,
                  380
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "let interested = JSON.parse($json[\"message\"][\"content\"]).interested\nlet reason = JSON.parse($json[\"message\"][\"content\"]).reason\n\nreturn {json:{\n interested: interested,\n reason: reason\n}}"
            },
            "typeVersion": 1
      },
      {
            "id": "53f51f8c-5995-4bcd-a038-3018834942e6",
            "name": "Email box 1",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -1300,
                  400
            ],
            "parameters": {
                  "simple": false,
                  "filters": {
                        "labelIds": []
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
            "typeVersion": 1
      },
      {
            "id": "bb1254ec-676a-4edc-bf4a-a1c66bac78bb",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1880,
                  360
            ],
            "parameters": {
                  "width": 452.37174177689576,
                  "height": 462.1804790107177,
                  "content": "## About the workflow\nThe workflow reads every reply that is received from a cold email campaign and qualifies if the lead is interested in a meeting. If the lead is interested, a deal is made in pipedrive. You can add as many email inboxes as you need!\n\n## Setup:\n- Add credentials to the Gmail, OpenAI and Pipedrive Nodes.\n- Add a in_campaign field in Pipedrive for persons. In Pipedrive click on your credentials at the top right, go to company settings > Data fields > Person and click on add custom field. Single option [TRUE/FALSE].\n- If you have only one email inbox, you can delete one of the Gmail nodes.\n- If you have more than two email inboxes, you can duplicate a Gmail node as many times as you like. Just connect it to the Get email node, and you are good to go!\n- In the Gmail inbox nodes, select Inbox under label names and uncheck Simplify."
            },
            "typeVersion": 1
      },
      {
            "id": "c1aaee97-11f4-4e9d-9a71-90ca3f5773a9",
            "name": "Email box 2",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  -1300,
                  600
            ],
            "parameters": {
                  "simple": false,
                  "filters": {
                        "labelIds": []
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
            "typeVersion": 1
      }
],
    connections: {
      "Get email": {
            "main": [
                  [
                        {
                              "node": "Search Person in CRM",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email box 1": {
            "main": [
                  [
                        {
                              "node": "Get email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Email box 2": {
            "main": [
                  [
                        {
                              "node": "Get email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get response": {
            "main": [
                  [
                        {
                              "node": "IF interested",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "In campaign?": {
            "main": [
                  [
                        {
                              "node": "Is interested?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "IF interested": {
            "main": [
                  [
                        {
                              "node": "Create deal in CRM",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is interested?": {
            "main": [
                  [
                        {
                              "node": "Get response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get person from CRM": {
            "main": [
                  [
                        {
                              "node": "In campaign?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search Person in CRM": {
            "main": [
                  [
                        {
                              "node": "Get person from CRM",
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
    name: "Siri AI Agent  Apple Shortcuts Powered Voice Template",
    nodes: [
      {
            "id": "b24c6e28-3c9e-4069-9e87-49b2efd47257",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1200,
                  660
            ],
            "parameters": {
                  "model": "gpt-4o-mini",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "AzPPV759YPBxJj3o",
                        "name": "Max's DevRel OpenAI account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c71a3e22-f0fd-4377-9be2-32438b282430",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  240
            ],
            "parameters": {
                  "color": 7,
                  "width": 636.2128494576581,
                  "height": 494.9629292914819,
                  "content": "![Siri Template Thumbnail](https://uploads.n8n.io/devrel/wf-siri-header.png#full-width)\n## \"Hey Siri, Ask Agent\" workflow\n**Made by [Max Tkacz](https://www.linkedin.com/in/maxtkacz) during the [30 Day AI Sprint](https://30dayaisprint.notion.site/)**\n\nThis template integrates with Apple Shortcuts to trigger an n8n AI Agent via a \"Hey Siri\" command. The shortcut prompts for spoken input, transcribes it, and sends it to the workflow's `When Called by Apple Shortcut` Webhook trigger. The AI Agent processes the input and Siri dictates the response back to you.\n\nThe workflow also passes the current date and time to the `AI Agent`, which you can extend with additional context, like data from an App node, for more customized responses.\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "a4ec93c3-eefa-4006-b02c-f995fb7bc410",
            "name": "Respond to Apple Shortcut",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1640,
                  460
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "text",
                  "responseBody": "={{ $json.output }}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "942b284e-e26a-4534-8f33-eb92b0a88fdb",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  760
            ],
            "parameters": {
                  "color": 7,
                  "width": 280.2462120317618,
                  "height": 438.5821431288714,
                  "content": "### Set up steps\n1. Add an OpenAI API credential in `OpenAI Chat Model` node, or replace it with another model. Try `Groq` if you want a free alternative (can be used with free Groq account, no CC).\n2. Copy the \"Production URL\" from `When called by Apple Shortcut` node, you'll need this when setting up the shortcut.\n3. Save and activate this n8n workflow.\n4. Download the [Apple Shortcut here](https://uploads.n8n.io/devrel/ask-agent.shortcut), open it on macOS or iOS. This adds the shortcut to your device.\n5. Open the shortcut and swap URL in `Get contents of\" step to the \"Production URL\" you copied from `When called by Apple Shortcut`.\n6. Test it by saying \"Hey Siri, AI Agent\", then ask a question."
            },
            "typeVersion": 1
      },
      {
            "id": "ebb9e886-546a-429c-b4b5-35c0a7b6370e",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  503.6292958565226,
                  760
            ],
            "parameters": {
                  "color": 7,
                  "width": 330.5152611046425,
                  "height": 240.6839895136402,
                  "content": "### ... or watch set up video [5 min]\n[![Siri Template Thumbnail](https://uploads.n8n.io/devrel/thumb-siri.png#full-width)](https://youtu.be/dewsB-4iGA8)\n"
            },
            "typeVersion": 1
      },
      {
            "id": "5a842fa9-be8c-4ba8-996b-a26a53273b3f",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1240,
                  460
            ],
            "parameters": {
                  "text": "=Here is my request: {{ $json.body.input }}\n",
                  "agent": "conversationalAgent",
                  "options": {
                        "systemMessage": "=## Task\nYou are a helpful assistant. Provide concise replies as the user receives them via voice on their mobile phone. Avoid using symbols like \"\\n\" to prevent them from being narrated.\n\n## Context\n- Today is {{ $now.format('dd LLL yy') }}.\n- Current time: {{ $now.format('h:mm a') }} in Berlin, Germany.\n- When asked, you are an AI Agent running as an n8n workflow.\n\n## Output\nKeep responses short and clear, optimized for voice delivery. Don't hallucinate, if you don't know the answer, say you don't know. "
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      },
      {
            "id": "598d22d5-7472-44c5-ab2e-69c8bbb23ddd",
            "name": "When called by Apple Shortcut",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  980,
                  460
            ],
            "webhookId": "f0224b4b-1644-4d3d-9f12-01a9c04879e4",
            "parameters": {
                  "path": "assistant",
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
                              "node": "Respond to Apple Shortcut",
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
      "When called by Apple Shortcut": {
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
    settings: {},
  },
  {
    name: "Text Automations Using Apple Shortcuts",
    nodes: [
      {
            "id": "b165115d-5505-4e03-bf41-c21320cb8b09",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  80,
                  40
            ],
            "parameters": {
                  "color": 7,
                  "width": 681.8337349708484,
                  "height": 843.1482165886073,
                  "content": "## Workflow: Text automations using Apple Shortcuts\n\n**Overview**\n- This workflow answers user requests sent via Apple Shortcuts\n- Several Shortcuts call the same webhook, with a query and a type of query\n- Types of query are:\n - translate to english\n - translate to spanish\n - correct grammar (without changing the actual content)\n - make content shorter\n - make content longer\n\n\n**How it works**\n- Select a text you are writing\n- Launch the shortcut\n- The text is sent to the webhook\n- Depending on the type of request, a different prompt is used\n- Each request is sent to an OpenAI node\n- The workflow responds to the request with the response from GPT\n- Shortcut replace the selected text with the new one\n\n**How to use it**\n- Activate the workflow\n- Download [this Shortcut template](https://drive.usercontent.google.com/u/0/uc?id=16zs5iJX7KeX_4e0SoV49_KfbU7-EF0NE&export=download)\n- Install the shortcut\n- In step 2 of the shortcut, change the url of the Webhook\n- In Shortcut details, \"add Keyboard Shortcut\" with the key you want to use to launch the shortcut\n- Go to settings, advanced, check \"Allow running scripts\"\n- You are ready to use the shortcut. Select a text and hit the keyboard shortcut you just defined\n\n\n**Notes**\n- If you use rich formatting, you'll have to test multiple ways to replace characters in the output. For example, you might use `{{ $json.message.content.output.replaceAll('\\n', \"<br/>\") }}` in the \"Respond to Shortcut\" node depending on the app you use most.\n- This is a basic example that you can extend and modify at your will\n- You can duplicate and modify the example shortcut based on your need, as well as making new automations in this workflow."
            },
            "typeVersion": 1
      },
      {
            "id": "c45400b8-d3b8-47f7-81c6-d791bce4c266",
            "name": "Switch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1020,
                  380
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "spanish",
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
                                                      "leftValue": "={{ $json.body.type }}",
                                                      "rightValue": "spanish"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "english",
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
                                                      "id": "bedb302f-646c-4dcd-8246-1fcfecfe3f2e",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.type }}",
                                                      "rightValue": "english"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "grammar",
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
                                                      "id": "94e6cf7d-576d-4ad9-85b0-c6b945eb41b7",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.type }}",
                                                      "rightValue": "grammar"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "shorter",
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
                                                      "id": "1ed0d1e1-2df0-4f8d-b102-4004a25919ed",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.type }}",
                                                      "rightValue": "shorter"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "longer",
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
                                                      "id": "4756df03-7e7c-4e28-9b37-14684326b083",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.type }}",
                                                      "rightValue": "longer"
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
            "id": "48e0e58e-6293-4e11-a488-ca9943b53484",
            "name": "Respond to Shortcut",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1840,
                  400
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "text",
                  "responseBody": "={{ $json.message.content.output.replaceAll('\\n', '<br/>') }}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "2655b782-9538-416c-ae65-35f8c77889c7",
            "name": "Webhook from Shortcut",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  840,
                  400
            ],
            "webhookId": "e4ddadd2-a127-4690-98ca-e9ee75c1bdd6",
            "parameters": {
                  "path": "shortcut-global-as",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "880ed4a2-0756-4943-a51f-368678e22273",
            "name": "OpenAI - Make Shorter",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1300,
                  540
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
                                    "role": "system",
                                    "content": "Summarize this content a little bit (5% shorter)\nOutput a JSON with a single field: output"
                              },
                              {
                                    "content": "={{ $json.body.content }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1.4
      },
      {
            "id": "c6c6d988-7aab-4677-af1f-880d05691ec3",
            "name": "OpenAI - Make Longer",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1300,
                  680
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
                                    "role": "system",
                                    "content": "Make this content a little longer (5% longer)\nOutput a JSON with a single field: output"
                              },
                              {
                                    "content": "={{ $json.body.content }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1.4
      },
      {
            "id": "8e6de4b7-22c3-45c9-a8d7-d498cf829b6f",
            "name": "OpenAI - Correct Grammar",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1300,
                  400
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
                                    "role": "system",
                                    "content": "Correct grammar only, don't change the actual contents.\nOutput a JSON with a single field: output"
                              },
                              {
                                    "content": "={{ $json.body.content }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1.4
      },
      {
            "id": "bc006b36-5a96-4c3a-9a28-2778a6c49f10",
            "name": "OpenAI - To Spanish",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1300,
                  120
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
                                    "role": "system",
                                    "content": "Translate this message to Spanish.\nOutput a JSON with a single field: output"
                              },
                              {
                                    "content": "={{ $json.body.content }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1.4
      },
      {
            "id": "330d2e40-1e52-4517-94e0-ce96226697fa",
            "name": "OpenAI - To English",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1300,
                  260
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
                                    "role": "system",
                                    "content": "Translate this message to English.\nOutput a JSON with a single field: output"
                              },
                              {
                                    "content": "={{ $json.body.content }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1.4
      },
      {
            "id": "925e4b55-ac26-4c16-941f-66d17b6794ab",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  80,
                  900
            ],
            "parameters": {
                  "color": 7,
                  "width": 469.15174499329123,
                  "height": 341.88919758842485,
                  "content": "### Check these explanations [< 3 min]\n\n[![Check the explanations](https://cdn.loom.com/sessions/thumbnails/c5b657568af64bb1b50fa8e8a91c45d1-1db3990a618986c9-full-play.gif)](https://www.loom.com/share/c5b657568af64bb1b50fa8e8a91c45d1?sid=a406be73-55eb-4754-9f51-9ddf49b22d69)"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Switch": {
            "main": [
                  [
                        {
                              "node": "OpenAI - To Spanish",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI - To English",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI - Correct Grammar",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI - Make Shorter",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "OpenAI - Make Longer",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - To English": {
            "main": [
                  [
                        {
                              "node": "Respond to Shortcut",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - To Spanish": {
            "main": [
                  [
                        {
                              "node": "Respond to Shortcut",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Make Longer": {
            "main": [
                  [
                        {
                              "node": "Respond to Shortcut",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Make Shorter": {
            "main": [
                  [
                        {
                              "node": "Respond to Shortcut",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Webhook from Shortcut": {
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
      "OpenAI - Correct Grammar": {
            "main": [
                  [
                        {
                              "node": "Respond to Shortcut",
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
    name: "Use AI To Organize Your Todoist Inbox",
    nodes: [
      {
            "id": "d45cf237-dbbc-48ed-a7f0-fa9506ae1d67",
            "name": "Update priority in todoist",
            "type": "n8n-nodes-base.todoist",
            "position": [
                  2060,
                  520
            ],
            "parameters": {
                  "taskId": "={{ $('Get inbox tasks').item.json.id }}",
                  "operation": "update",
                  "updateFields": {
                        "priority": "={{ $('Your Projects').first().json.projects[$json.message.content] }}"
                  }
            },
            "credentials": {
                  "todoistApi": {
                        "id": "1",
                        "name": "Todoist account"
                  }
            },
            "retryOnFail": true,
            "typeVersion": 2,
            "waitBetweenTries": 5000
      },
      {
            "id": "4d0ebf98-5a1d-4dfd-85df-da182b3c5099",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  600,
                  520
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
            "id": "a950e470-6885-42f4-9b17-7b2c2525d3e4",
            "name": "Get inbox tasks",
            "type": "n8n-nodes-base.todoist",
            "position": [
                  1020,
                  520
            ],
            "parameters": {
                  "filters": {
                        "projectId": "938017196"
                  },
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "todoistApi": {
                        "id": "1",
                        "name": "Todoist account"
                  }
            },
            "retryOnFail": true,
            "typeVersion": 2,
            "waitBetweenTries": 5000
      },
      {
            "id": "093bcb2e-79b7-427e-b13d-540a5b28f427",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  540,
                  200
            ],
            "parameters": {
                  "color": 3,
                  "width": 358.6620209059232,
                  "height": 256.5853658536585,
                  "content": "## 💫 To setup this template\n\n1. Add your Todoist credentials\n2. Add your OpenAI credentials\n3. Set your project names and add priority"
            },
            "typeVersion": 1
      },
      {
            "id": "430290e7-1732-46fe-a38d-fa6dc7f78a26",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  800,
                  700
            ],
            "parameters": {
                  "width": 192.77351916376313,
                  "height": 80,
                  "content": " 👆🏽 Add your projects and priority here"
            },
            "typeVersion": 1
      },
      {
            "id": "6d5a1b7e-f7fa-4a1b-848c-1b4e79f6f667",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1020,
                  420
            ],
            "parameters": {
                  "width": 192.77351916376313,
                  "height": 80,
                  "content": " 👇🏽 Add your Todoist credentials here"
            },
            "typeVersion": 1
      },
      {
            "id": "feff35d2-e37d-48a5-9a90-c5a2efde688f",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2060,
                  420
            ],
            "parameters": {
                  "width": 192.77351916376313,
                  "height": 80,
                  "content": " 👇🏽 Add your Todoist credentials here"
            },
            "typeVersion": 1
      },
      {
            "id": "e454ebfe-47f6-4e39-8b89-d706da742911",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1540,
                  700
            ],
            "parameters": {
                  "width": 192.77351916376313,
                  "height": 80,
                  "content": " 👆🏽 Add your OpenAI credentials here"
            },
            "typeVersion": 1
      },
      {
            "id": "a79effcb-6904-4abf-835b-e1ccd94ca429",
            "name": "Your Projects",
            "type": "n8n-nodes-base.set",
            "position": [
                  820,
                  520
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "50dc1412-21f8-4158-898d-3940a146586b",
                                    "name": "projects",
                                    "type": "object",
                                    "value": "={{ {\n apartment: 1,\n health: 2,\n german: 3\n} }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "b5988629-2225-455f-b579-73e60449d2a3",
            "name": "Categorize",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1460,
                  520
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
                                    "role": "system",
                                    "content": "=Categorize the user's todo item to a project. Return the project name or just \"other\" if it does not belong to a project."
                              },
                              {
                                    "content": "=Projects:\n{{ $('Your Projects').first().json.projects.keys().join('\\n') }}\n\nTodo item:\n{{ $('Get inbox tasks').item.json.content }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "9",
                        "name": "n8n OpenAi"
                  }
            },
            "typeVersion": 1.4
      },
      {
            "id": "0dca3953-c0ac-4319-9323-c3aed9488bfb",
            "name": "If task is not a subtask",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1240,
                  520
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
                                    "id": "36dd4bc9-1282-4342-89dd-1dac81c7290e",
                                    "operator": {
                                          "type": "string",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.parent_id }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "12e25a81-dbde-4542-a137-365329da415e",
            "name": "If other or ai hallucinates",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1820,
                  520
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
                                    "id": "c4f69265-abe1-451c-8462-e68ff3b06799",
                                    "operator": {
                                          "type": "array",
                                          "operation": "contains",
                                          "rightType": "any"
                                    },
                                    "leftValue": "={{ $('Your Projects').first().json.projects.keys() }}",
                                    "rightValue": "={{ $json.message.content }}"
                              }
                        ]
                  }
            },
            "typeVersion": 2.1
      }
],
    connections: {
      "Categorize": {
            "main": [
                  [
                        {
                              "node": "If other or ai hallucinates",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Your Projects": {
            "main": [
                  [
                        {
                              "node": "Get inbox tasks",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get inbox tasks": {
            "main": [
                  [
                        {
                              "node": "If task is not a subtask",
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
                              "node": "Your Projects",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If task is not a subtask": {
            "main": [
                  [
                        {
                              "node": "Categorize",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "If other or ai hallucinates": {
            "main": [
                  [
                        {
                              "node": "Update priority in todoist",
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
    name: "get_a_web_page",
    nodes: [
      {
            "id": "290cc9b8-e4b1-4124-ab0e-afbb02a9072b",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  -460,
                  -100
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "f256ed59-ba61-4912-9a75-4e7703547de5",
            "name": "FireCrawl",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -220,
                  -100
            ],
            "parameters": {
                  "url": "https://api.firecrawl.dev/v1/scrape",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"url\": \"{{ $json.query.url }}\",\n \"formats\": [\n \"markdown\"\n ]\n} ",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpHeaderAuth",
                  "headerParameters": {
                        "parameters": [
                              {}
                        ]
                  }
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "RoJ6k6pWBzSVp9JK",
                        "name": "Firecrawl"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "a28bdbe6-fa59-4bf1-b0ab-c34ebb10cf0f",
            "name": "Edit Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  -20,
                  -100
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "1af62ef9-7385-411a-8aba-e4087f09c3a9",
                                    "name": "response",
                                    "type": "string",
                                    "value": "={{ $json.data.markdown }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "fcd26213-038a-453f-80e5-a3936e4c2d06",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -480,
                  -340
            ],
            "parameters": {
                  "width": 620,
                  "height": 200,
                  "content": "## Send URL got Crawl\nThis can be reused by Ai Agents and any Workspace to crawl a site. All that Workspace has to do is send a request:\n\n```json\n {\n \"url\": \"Some URL to Get\"\n }\n```"
            },
            "typeVersion": 1
      }
],
    connections: {
      "FireCrawl": {
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
      "Execute Workflow Trigger": {
            "main": [
                  [
                        {
                              "node": "FireCrawl",
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
    name: "UTM Link Creator & QR Code Generator with Scheduled Google Analytics Reports",
    nodes: [
      {
            "id": "5efbd956-51b6-4f94-aebc-07e3e691f7eb",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  -180,
                  480
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "95QGJD3XSz0piaNU",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a1acd323-ed07-41b4-a51e-614afe361893",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  0,
                  480
            ],
            "parameters": {
                  "sessionKey": "={{ $json.timestamp }}",
                  "sessionIdType": "customKey",
                  "contextWindowLength": 200
            },
            "typeVersion": 1.3
      },
      {
            "id": "c3c2b5fa-c294-4306-a050-dccd592477fa",
            "name": "Google Analytics",
            "type": "n8n-nodes-base.googleAnalyticsTool",
            "position": [
                  160,
                  480
            ],
            "parameters": {
                  "metricsGA4": {
                        "metricValues": [
                              {
                                    "listName": "sessions"
                              }
                        ]
                  },
                  "propertyId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "404306108",
                        "cachedResultUrl": "https://analytics.google.com/analytics/web/#/p404306108/",
                        "cachedResultName": "East Coast Concrete Coating"
                  },
                  "dimensionsGA4": {
                        "dimensionValues": [
                              {},
                              {
                                    "listName": "sourceMedium"
                              }
                        ]
                  },
                  "additionalFields": {}
            },
            "credentials": {
                  "googleAnalyticsOAuth2": {
                        "id": "sVZ61SpNfC2D1Z7V",
                        "name": "Google Analytics account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "cbc7b539-2fa6-493b-a66c-13db8d8d420c",
            "name": "Create UTM Link & Send To Database",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -440,
                  -80
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "5358f2cc-bdb0-4e9b-a6b9-93418f83db02",
            "name": "Set UTM Parameters For Link",
            "type": "n8n-nodes-base.set",
            "position": [
                  -220,
                  -80
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "28d0a36d-5b03-4b74-9941-ef0e1aab86bf",
                                    "name": "website_url",
                                    "type": "string",
                                    "value": "https://ecconcretecoating.com/"
                              },
                              {
                                    "id": "1a2ee174-4684-4246-813f-b67285af48b8",
                                    "name": "campaign_id",
                                    "type": "string",
                                    "value": "12246"
                              },
                              {
                                    "id": "e15a846d-6e37-4fbf-a9f4-b3fce3441295",
                                    "name": "campaign_source",
                                    "type": "string",
                                    "value": "google"
                              },
                              {
                                    "id": "f15e2bb1-08a6-48c4-8458-b753864e9364",
                                    "name": "campaign_medium",
                                    "type": "string",
                                    "value": "display"
                              },
                              {
                                    "id": "548900ab-aa2c-498f-bbd9-a787306e72db",
                                    "name": "campaign_name",
                                    "type": "string",
                                    "value": "summerfun"
                              },
                              {
                                    "id": "fd8d1bd4-a75d-4c49-b795-8fda7c377b66",
                                    "name": "campaign_term",
                                    "type": "string",
                                    "value": "conretecoating"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "45daf73a-01c2-40ab-8546-7fdd489e2a1c",
            "name": "Create UTM Link With Parameters",
            "type": "n8n-nodes-base.code",
            "position": [
                  40,
                  -140
            ],
            "parameters": {
                  "jsCode": "const items = $input.all();\nconst updatedItems = items.map((item) => {\n const utmUrl = `${item?.json?.website_url}?utm_source=${item?.json?.campaign_source}&utm_medium=${item?.json?.campaign_medium}&utm_campaign=${item?.json?.campaign_name}&utm_term=${item?.json?.campaign_term}&utm_content=${item?.json?.campaign_id}`;\n item.json.utmUrl = utmUrl;\n return item;\n});\nreturn updatedItems;\n"
            },
            "typeVersion": 2
      },
      {
            "id": "a621984d-eea5-464d-9be3-e620e779abd5",
            "name": "Submit UTM Link To Database",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  280,
                  -200
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appIXd8a8JeB9bPaL",
                        "cachedResultUrl": "https://airtable.com/appIXd8a8JeB9bPaL",
                        "cachedResultName": "Untitled Base"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblXyFxXMHraieGCa",
                        "cachedResultUrl": "https://airtable.com/appIXd8a8JeB9bPaL/tblXyFxXMHraieGCa",
                        "cachedResultName": "UTM_URL"
                  },
                  "columns": {
                        "value": {
                              "URL": "={{ $json.utmUrl }}"
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
                                    "id": "URL",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "URL",
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
                  "options": {},
                  "operation": "upsert"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "0ApVmNsLu7aFzQD6",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "19074462-d719-4fdf-bc59-d6b2ecd1ce20",
            "name": "Create QR Code With Submitted QR Link",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  280,
                  -20
            ],
            "parameters": {
                  "url": "=https://quickchart.io/qr?text={{ $json.utmUrl }}&size=300&margin=10&ecLevel=H&dark=000000&light=FFFFFF\n",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "a8c22bb2-f8eb-4e5f-b288-9c25e0aeb648",
            "name": "Schedule Google Analytics Report To Marketing Manager",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -460,
                  280
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
            "id": "268c110c-2b7c-4450-b5b0-5d5326eac17f",
            "name": "Google Analytics Data Analysis Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  -100,
                  280
            ],
            "parameters": {
                  "text": "={{ $json.timestamp }}",
                  "options": {
                        "systemMessage": "\"You are an advanced data analytics AI specializing in executive reporting. Your task is to analyze the provided dataset and generate a structured executive summary that highlights key insights, trends, and actionable takeaways. Structure your summary in the following format:\n\nOverview – Briefly describe the dataset and its significance.\nKey Performance Indicators (KPIs) – Highlight the most important metrics and compare them to previous periods if applicable.\nTrends & Insights – Identify patterns, growth areas, declines, and anomalies.\nOpportunities & Recommendations – Provide strategic recommendations based on the insights.\nConclusion – Summarize the key takeaways concisely.\n*Ensure the tone is professional, clear, and tailored for executives who require quick, data-driven insights without unnecessary details.\""
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "1b012731-e67b-4e0d-95b7-a7f587754a05",
            "name": "Send Summary Report To Marketing Manager",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  300,
                  280
            ],
            "webhookId": "a9b88615-c7e2-4b56-891a-98f4d6b34220",
            "parameters": {
                  "sendTo": "john@marketingcanopy.com",
                  "message": "={{ $json.output }}",
                  "options": {},
                  "subject": "Google Analytics Metrics Summary Report"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "pIXP1ZseBP4Z5CCp",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "9da758e1-8aed-446b-a074-8fee5405583f",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -540,
                  -280
            ],
            "parameters": {
                  "width": 500,
                  "height": 400,
                  "content": "Create a marketing link with UTM parameters. Easily store in database and have QR code created and ready as well.\n\nType in requirements:\nwebsite URL\ncampaign id\ncampaign source\ncampaign medium\ncampaign name\ncampaign term\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "92f5df8d-88ca-4b58-b544-c0b2d3578a73",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  0,
                  -380
            ],
            "parameters": {
                  "color": 4,
                  "width": 580,
                  "height": 540,
                  "content": "Code node creates the URL with UTM parameters. \n\nIt then sends to your Airtable database to store for records. It also creates a QR code with the embedded link to be used for materials. \n\nSample Airtable Setup:\n-Website Link UTM column"
            },
            "typeVersion": 1
      },
      {
            "id": "408af10c-4b0e-4d94-b02d-5d887fb150c3",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -540,
                  180
            ],
            "parameters": {
                  "color": 5,
                  "width": 1340,
                  "height": 460,
                  "content": "Schedule a Google Analytics Reports with Medium/Source to track UTM link performance. Update the reporting fields to fit your business needs. You can track traffic, conversions and other engagement metrics.\n\n*Sample Google Report Metrics: Sessions. Update metrics as needed."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Google Analytics": {
            "ai_tool": [
                  [
                        {
                              "node": "Google Analytics Data Analysis Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Google Analytics Data Analysis Agent",
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
                              "node": "Google Analytics Data Analysis Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set UTM Parameters For Link": {
            "main": [
                  [
                        {
                              "node": "Create UTM Link With Parameters",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Submit UTM Link To Database": {
            "main": [
                  []
            ]
      },
      "Create UTM Link With Parameters": {
            "main": [
                  [
                        {
                              "node": "Create QR Code With Submitted QR Link",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Submit UTM Link To Database",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create UTM Link & Send To Database": {
            "main": [
                  [
                        {
                              "node": "Set UTM Parameters For Link",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Analytics Data Analysis Agent": {
            "main": [
                  [
                        {
                              "node": "Send Summary Report To Marketing Manager",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Summary Report To Marketing Manager": {
            "main": [
                  []
            ]
      },
      "Schedule Google Analytics Report To Marketing Manager": {
            "main": [
                  [
                        {
                              "node": "Google Analytics Data Analysis Agent",
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
    name: "Visualize Your SQL Agent Queries With OpenAI And Quickchart.Io",
    nodes: [
      {
            "id": "50695e7f-3334-4124-a46e-1b3819412e26",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1260,
                  560
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {
                        "temperature": 0.1
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2f07481d-3ca4-48ab-a8ff-59e9ab5c6062",
            "name": "Execute Workflow",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  2360,
                  280
            ],
            "parameters": {
                  "options": {
                        "waitForSubWorkflow": true
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
            "id": "49120164-4ffc-4fe0-8ee3-4ae13bda6c8d",
            "name": "Execute \"Generate a chart\" tool",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  1320,
                  1140
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0fc6eaf9-8521-44ec-987e-73644d0cba79",
            "name": "OpenAI - Generate Chart definition with Structured Output",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  1140
            ],
            "parameters": {
                  "url": "https://api.openai.com/v1/chat/completions",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"model\": \"gpt-4o-2024-08-06\",\n \"messages\": [\n {\n \"role\": \"system\",\n \"content\": \"Based on the user request, generate a valid Chart.js definition. Important: - Be careful with the data scale and beginatzero that all data are visible. Example if ploted data 2 and 3 on a bar chart, the baseline should be 0. - Charts colors should be different only if there are multiple datasets. - Output valid JSON. In scales, min and max are numbers. Example: `{scales:{yAxes:[{ticks:{min:0,max:3}`\"\n },\n {\n \"role\": \"user\",\n \"content\": \"**User Request**: {{ $json.user_question }} \\n **Data to visualize**: {{ $json.output.replaceAll('\\n', \" \").replaceAll('\"', \"\") }}\"\n }\n ],\n \"response_format\": {\n \"type\": \"json_schema\",\n \"json_schema\": {\n \"name\": \"chart_configuration\",\n \"description\": \"Configuration schema for Chart.js charts\",\n \"strict\": true,\n \"schema\": {\n \"type\": \"object\",\n \"properties\": {\n \"type\": {\n \"type\": \"string\",\n \"enum\": [\"bar\", \"line\", \"radar\", \"pie\", \"doughnut\", \"polarArea\", \"bubble\", \"scatter\", \"area\"]\n },\n \"data\": {\n \"type\": \"object\",\n \"properties\": {\n \"labels\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": \"string\"\n }\n },\n \"datasets\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": \"object\",\n \"properties\": {\n \"label\": {\n \"type\": [\"string\", \"null\"]\n },\n \"data\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": \"number\"\n }\n },\n \"backgroundColor\": {\n \"type\": [\"array\", \"null\"],\n \"items\": {\n \"type\": \"string\"\n }\n },\n \"borderColor\": {\n \"type\": [\"array\", \"null\"],\n \"items\": {\n \"type\": \"string\"\n }\n },\n \"borderWidth\": {\n \"type\": [\"number\", \"null\"]\n }\n },\n \"required\": [\"data\", \"label\", \"backgroundColor\", \"borderColor\", \"borderWidth\"],\n \"additionalProperties\": false\n }\n }\n },\n \"required\": [\"labels\", \"datasets\"],\n \"additionalProperties\": false\n },\n \"options\": {\n \"type\": \"object\",\n \"properties\": {\n \"scales\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"yAxes\": {\n \"type\": \"array\",\n \"items\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"ticks\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"max\": {\n \"type\": [\"number\", \"null\"]\n },\n \"min\": {\n \"type\": [\"number\", \"null\"]\n },\n \"stepSize\": {\n \"type\": [\"number\", \"null\"]\n },\n \"beginAtZero\": {\n \"type\": [\"boolean\", \"null\"]\n }\n },\n \"required\": [\"max\", \"min\", \"stepSize\", \"beginAtZero\"],\n \"additionalProperties\": false\n },\n \"stacked\": {\n \"type\": [\"boolean\", \"null\"]\n }\n },\n \"required\": [\"ticks\", \"stacked\"],\n \"additionalProperties\": false\n }},\n \"xAxes\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"stacked\": {\n \"type\": [\"boolean\", \"null\"]\n }\n },\n \"required\": [\"stacked\"],\n \"additionalProperties\": false\n }\n },\n \"required\": [\"yAxes\", \"xAxes\"],\n \"additionalProperties\": false\n },\n \"plugins\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"title\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"display\": {\n \"type\": [\"boolean\", \"null\"]\n },\n \"text\": {\n \"type\": [\"string\", \"null\"]\n }\n },\n \"required\": [\"display\", \"text\"],\n \"additionalProperties\": false\n },\n \"legend\": {\n \"type\": [\"object\", \"null\"],\n \"properties\": {\n \"display\": {\n \"type\": [\"boolean\", \"null\"]\n },\n \"position\": {\n \"type\": [\"string\", \"null\"],\n \"enum\": [\"top\", \"left\", \"bottom\", \"right\", null]\n }\n },\n \"required\": [\"display\", \"position\"],\n \"additionalProperties\": false\n }\n },\n \"required\": [\"title\", \"legend\"],\n \"additionalProperties\": false\n }\n },\n \"required\": [\"scales\", \"plugins\"],\n \"additionalProperties\": false\n }\n },\n \"required\": [\"type\", \"data\", \"options\"],\n \"additionalProperties\": false\n}\n}\n}\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "=Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "8016a925-7b31-4a49-b5e1-56cf9b5fa7b3",
            "name": "Set response",
            "type": "n8n-nodes-base.set",
            "position": [
                  1860,
                  1140
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "37512e1a-8376-4ba0-bdcd-34bb9329ae4b",
                                    "name": "output",
                                    "type": "string",
                                    "value": "={{ \"https://quickchart.io/chart?width=200&c=\" + encodeURIComponent($json.choices[0].message.content) }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "9a2b8eca-5303-4eb0-8115-b0d81bfd1d7c",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  880,
                  380
            ],
            "webhookId": "b0e681ae-e00d-450c-9300-2c2a4a0876df",
            "parameters": {
                  "public": true,
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "2a02c5ee-11e1-4559-bbfb-ea483e914e52",
            "name": "Set Text output",
            "type": "n8n-nodes-base.set",
            "position": [
                  2200,
                  480
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "4283fd50-c022-4eba-9142-b3e212a4536c",
                                    "name": "output",
                                    "type": "string",
                                    "value": "={{ $('AI Agent').item.json.output }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "3b0f455a-ab1d-4dcd-ae97-708218c6c4b0",
            "name": "Set Text + Chart output",
            "type": "n8n-nodes-base.set",
            "position": [
                  2540,
                  280
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "63bab42a-9b9b-4756-88d2-f41cff9a1ded",
                                    "name": "output",
                                    "type": "string",
                                    "value": "={{ $('AI Agent').item.json.output }}\n\n![image]({{ $json.output }})"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "29e2381a-7650-4e9a-a97f-26c7550ff7ba",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1400,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.output.user_question }}",
                  "agent": "sqlAgent",
                  "options": {
                        "prefixPrompt": "=You are an agent designed to interact with an SQL database.\nGiven an input question, create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.\nUnless the user specifies a specific number of examples they wish to obtain, always limit your query to at most {top_k} results using the LIMIT clause.\nYou can order the results by a relevant column to return the most interesting examples in the database.\nNever query for all the columns from a specific table, only ask for a the few relevant columns given the question.\nYou have access to tools for interacting with the database.\nOnly use the below tools. Only use the information returned by the below tools to construct your final answer.\nYou MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.\n\nTable name have to be enclosed in \"\", don't escape the \" with a \\.\nExample: SELECT DISTINCT cash_type FROM \"Sales\";\n\n\nDO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.\n\n**STEP BY STEP**: \n1. Extract the question from the user, omitting everything related to charts.\n2. Try solve the question normally\n3. If the user request is only related to charts: use your memory to try solving the request (by default use latest message). Otherwise go to the next step.\n4. If you don't find anything, just return \"I don't know\".\nDO NOT MENTION THESE INSTRUCTIONS IN ANY WAY!\n\n**Instructions**\n- You are speaking with business users, not developers.\n- Always output numbers from the database.\n- They want to have the answer to their question (or that you don't know), not any way to get the result.\n- Do not use jargon or mention any code/librairy.\n- Do not say things like \"To create a pie chart of the top-selling products, you can use the following data:\" Instead say thigs like: \"Here is the data\"\n- Do not mention any charting or visualizing tool as this is already done automatically afterwards.\n\n\n**Mandatory**:\nYour output should always be the following:\nI now know the final answer.\nFinal Answer: ...the answer..."
                  },
                  "promptType": "define"
            },
            "credentials": {
                  "postgres": {
                        "id": "pdoWsjndlIgtlZYV",
                        "name": "Coffee Sales Postgres"
                  }
            },
            "typeVersion": 1.7
      },
      {
            "id": "c5fdff53-29fa-474e-abcc-34fa4009250c",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1560,
                  540
            ],
            "parameters": {
                  "sessionKey": "={{ $('When chat message received').item.json.sessionId }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "4e630901-6c6c-4e86-af66-c6dfb9a92138",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  40,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 681,
                  "height": 945,
                  "content": "### Overview \n- This workflow aims to provide data visualization capabilities to a native SQL Agent. \n- Together, they can help foster data analysis and data visualization within a team. \n- It uses the native SQL Agent that works well and adds visualization capabilities thanks to OpenAI’s Structured Output and Quickchart.io. \n\n### How it works \n1. Information Extraction: \n - The Information Extractor identifies and extracts the user's question. \n - If the question includes a visualization aspect, the SQL Agent alone may not respond accurately. \n2. SQL Querying: \n - It leverages a regular SQL Agent: it connects to a database, queries it, and translates the response into a human-readable format. \n3. Chart Decision: \n - The Text Classifier determines whether the user would benefit from a chart to support the SQL Agent's response. \n4. Chart Generation: \n - If a chart is needed, the sub-workflow dynamically generates a chart and appends it to the SQL Agent’s response. \n - If not, the SQL Agent’s response is output as is. \n5. Calling OpenAI for Chart Definition: \n - The sub-workflow calls OpenAI via the HTTP Request node to retrieve a chart definition. \n6. Building and Returning the Chart: \n - In the \"Set Response\" node, the chart definition is appended to a Quickchart.io URL, generating the final chart image. \n - The AI Agent returns the response along with the chart. \n\n### How to use it \n- Use an existing database or create a new one. \n- For example, I've used [this Kaggle dataset](https://www.kaggle.com/datasets/ihelon/coffee-sales/versions/15?resource=download) and uploaded it to a Supabase DB. \n- Add the PostgreSQL or MySQL credentials. \n- Alternatively, you can use SQLite binary files (check [this template](https://n8n.io/workflows/2292-talk-to-your-sqlite-database-with-a-langchain-ai-agent/)). \n- Activate the workflow. \n- Start chatting with the AI SQL Agent. \n- If the Text Classifier determines a chart would be useful, it will generate one in addition to the SQL Agent's response. \n\n### Notes \n- The full Quickchart.io specifications have not been fully integrated, so there may be some glitches (e.g., radar graphs may not display properly due to size limitations). "
            },
            "typeVersion": 1
      },
      {
            "id": "36d7b17f-c7df-4a0a-8781-626dc1edddee",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1260,
                  800
            ],
            "parameters": {
                  "color": 7,
                  "width": 769,
                  "height": 523,
                  "content": "## Generate a Quickchart definition \n[Original template](https://n8n.io/workflows/2400-ai-agent-with-charts-capabilities-using-openai-structured-output-and-quickchart/)\n\n**HTTP Request node**\n- Send the chart query to OpenAI, with a defined JSON response format - *using HTTP Request node as it has not yet been implemented in the OpenAI nodes*\n- The JSON structure is based on ChartJS and Quickchart.io definitions, that let us create nice looking graphs.\n- The output is a JSON containing the chart definition that is passed to the next node.\n\n**Set Response node**\n- Adds the chart definition at the end of a Quickchart.io URL ([see documentation](https://quickchart.io/documentation/usage/parameters/))\n- Note that in the parameters, we specify the width to 250 in order to be properly displayed in the chart interface."
            },
            "typeVersion": 1
      },
      {
            "id": "9ccea33b-c5d9-422e-a5b9-11efbc05ab1a",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  840,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 888,
                  "height": 646,
                  "content": "### Information Extractor \n- This Information Extractor is added to extract the user's question\n- In some cases, if the question contains a visualization aspect, the SQL Agent may not responding accurately.\n\n### SQL Agent\n- This SQL Agent is connected to a Database.\n- It queries the Database for each user message.\n- In this example, the prompt has been slightly changed to address an issue with querying a Supabase DB. Feel free to change the `Prefix Prompt` to suit your needs.\n- This example uses the data from this [Kaggle dataset](https://www.kaggle.com/datasets/ihelon/coffee-sales/versions/15?resource=download)"
            },
            "typeVersion": 1
      },
      {
            "id": "d8bf0767-faf0-4030-b325-08315188adcb",
            "name": "OpenAI Chat Model Classifier",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1900,
                  540
            ],
            "parameters": {
                  "options": {
                        "temperature": 0.2
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "WqzqjezKh8VtxdqA",
                        "name": "OpenAi account - Baptiste"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4bcd676f-44f3-4242-a5fd-7cf2098a3a64",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1760,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 948,
                  "height": 646,
                  "content": "### Respond with a text only or also include a chart \n- The text classifier determines if the response from the SQL Agent would benefit from a chart\n- If it does, then it executes the subworkflow to dynamically generate a chart, and append the chart to the response from the SQL Agent\n- If it doesn't, then the SQL Agent response is directly outputted. "
            },
            "typeVersion": 1
      },
      {
            "id": "256cb28b-0d83-4f6d-bb11-33745c9efa4a",
            "name": "Text Classifier - Chart required?",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  1800,
                  380
            ],
            "parameters": {
                  "options": {},
                  "inputText": "=**User Request**: {{ $('When chat message received').item.json.chatInput }}\n**Data to visualize**: {{ $json.output }}\n",
                  "categories": {
                        "categories": [
                              {
                                    "category": "chart_required",
                                    "description": "If a chart can help the user understand the response (if there are multiple data to show) or if the user specifically request a chart. "
                              },
                              {
                                    "category": "chart_not_required",
                                    "description": "if a chart doesn't help the user understand the response (e.g a single data point that doesn't require visualization).\n\"I don't know\" does fall into this category"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "6df60db5-19c0-4585-a229-b56f4b9a2b29",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  40,
                  1020
            ],
            "parameters": {
                  "color": 7,
                  "width": 680,
                  "height": 720,
                  "content": "## Demo\n![Demo SQL Agent](https://media.licdn.com/dms/image/v2/D4E22AQERT4FEXEUncw/feedshare-shrink_800/feedshare-shrink_800/0/1731433289953?e=1741824000&v=beta&t=e6xUqjcsSq5U_NELeD-nn1mFROGYZLazkYC0eELTv5Y)"
            },
            "typeVersion": 1
      },
      {
            "id": "a843845d-e010-4a09-ab50-e169beb67811",
            "name": "User question + Agent initial response",
            "type": "n8n-nodes-base.set",
            "position": [
                  2200,
                  280
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "debab41c-da64-4999-a80f-fae06522d672",
                                    "name": "user_question",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.chatInput }}"
                              },
                              {
                                    "id": "2b4bbf7f-9890-4ef3-9d8f-15e3a55fbfda",
                                    "name": "output",
                                    "type": "string",
                                    "value": "={{ $json.output }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "12c9dc38-c0fe-4f4c-a101-ec1ff7ea9048",
            "name": "Information Extractor - User question",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  1060,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.chatInput }}",
                  "options": {},
                  "attributes": {
                        "attributes": [
                              {
                                    "name": "user_question",
                                    "required": true,
                                    "description": "Extract the question from the user, omitting everything related to charts."
                              }
                        ]
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Text Classifier - Chart required?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Execute Workflow": {
            "main": [
                  [
                        {
                              "node": "Set Text + Chart output",
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
                        },
                        {
                              "node": "Information Extractor - User question",
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
      "When chat message received": {
            "main": [
                  [
                        {
                              "node": "Information Extractor - User question",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI Chat Model Classifier": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Text Classifier - Chart required?",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Execute \"Generate a chart\" tool": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Generate Chart definition with Structured Output",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Text Classifier - Chart required?": {
            "main": [
                  [
                        {
                              "node": "User question + Agent initial response",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set Text output",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Information Extractor - User question": {
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
      "User question + Agent initial response": {
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
      "OpenAI - Generate Chart definition with Structured Output": {
            "main": [
                  [
                        {
                              "node": "Set response",
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
    name: "Zoom AI Meeting Assistant",
    nodes: [
      {
            "id": "9b4b21aa-c746-4b94-a4dd-12736a7d4098",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2160,
                  1040
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "EjchNb5GBqYh0Cqn",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "536e360c-d668-4f58-8670-4e78ef579dbe",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  160,
                  460
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "eb2b6b98-ca3c-46a9-9d5f-9b5297441224",
            "name": "No Recording/Transcript available",
            "type": "n8n-nodes-base.stopAndError",
            "position": [
                  880,
                  660
            ],
            "parameters": {
                  "errorMessage": "={{ $json.error.cause.message }}"
            },
            "typeVersion": 1
      },
      {
            "id": "33ee5d8b-a373-44a8-9777-9386cf8cf008",
            "name": "Zoom: Get data of last meeting",
            "type": "n8n-nodes-base.zoom",
            "position": [
                  340,
                  460
            ],
            "parameters": {
                  "filters": {
                        "type": "scheduled"
                  },
                  "operation": "getAll",
                  "returnAll": true,
                  "authentication": "oAuth2"
            },
            "credentials": {
                  "zoomOAuth2Api": {
                        "id": "MmccxSST1g202tG2",
                        "name": "Zoom account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d67d1fcb-78d1-47e5-bc0e-5735f0f48350",
            "name": "Filter transcript URL",
            "type": "n8n-nodes-base.set",
            "onError": "continueRegularOutput",
            "position": [
                  880,
                  460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "ef149af8-7f9d-4e5a-8ccf-4a5f1e09eecc",
                                    "name": "transcript_file",
                                    "type": "string",
                                    "value": "={{ $json.recording_files.find(f => f.file_type === 'TRANSCRIPT').download_url }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "41665b4e-4d3e-4da9-9b0d-c6f9f0b2cde4",
            "name": "Filter: Only 1 item",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  1060,
                  460
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "ea12b33a-ae01-403d-9f14-466dc8880874",
            "name": "Zoom: Get transcript file",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1240,
                  460
            ],
            "parameters": {
                  "url": "={{ $json.transcript_file }}",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "zoomOAuth2Api"
            },
            "credentials": {
                  "zoomOAuth2Api": {
                        "id": "MmccxSST1g202tG2",
                        "name": "Zoom account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "fb1c32c3-5161-499d-8cd6-7624fb78ed3e",
            "name": "Extract text from transcript file",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  1420,
                  460
            ],
            "parameters": {
                  "options": {},
                  "operation": "text"
            },
            "typeVersion": 1
      },
      {
            "id": "87986fd3-37f0-48cd-942a-73fd3b5bd70f",
            "name": "Format transcript text",
            "type": "n8n-nodes-base.set",
            "position": [
                  1600,
                  460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "70019192-02ef-4b0a-a747-3ca5f46aeeaa",
                                    "name": "transcript",
                                    "type": "string",
                                    "value": "={{ $json.data.split('\\r\\n\\r\\n').slice(1).map(block => {\n const lines = block.split('\\r\\n');\n return lines.slice(2).join(' ');\n}).join('\\n') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "9af3559d-2fd0-481f-84d6-caefbcd8e4f2",
            "name": "Zoom: Get participants data",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1760,
                  460
            ],
            "parameters": {
                  "url": "=https://api.zoom.us/v2/past_meetings/{{ $('Filter: Last 24 hours').item.json.id }}/participants",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "zoomOAuth2Api"
            },
            "credentials": {
                  "zoomOAuth2Api": {
                        "id": "MmccxSST1g202tG2",
                        "name": "Zoom account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "03feecc5-e60d-45cb-bf29-6645afb86b4c",
            "name": "Create meeting summary",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1920,
                  460
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
                                    "content": "=Create a formal meeting minutes document from the following transcript and meeting details.\n\nMeeting Date: {{ $('Zoom: Get data of last meeting').item.json.start_time }} // This needs to be formatted from the meeting details\nParticipants: {{ $json.participants.map(p => p.name + ' (' + p.user_email + ')').join(', ') }}\n\nTranscript:\n{{ $('Format transcript text').item.json.transcript }}\n\nPlease create the minutes in the following format:\n\nMeeting on [Date]\n\nParticipants:\n[List of participants with email addresses]\n\nSummary of the Meeting:\n[Brief and concise summary of the topics discussed]\n\nTasks:\n- [Task] (Responsible: [Name])\n- ...\n\nImportant Dates:\n- [Date] ([Context])\n- ...\n"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "EjchNb5GBqYh0Cqn",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "5edc73f7-aa1b-47ae-97f7-c6f897e914a6",
            "name": "Sort for mail delivery",
            "type": "n8n-nodes-base.set",
            "position": [
                  2240,
                  460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "cc51b7e4-d5c2-4cd4-9488-4d181eaaa02e",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "=Meeting summary: {{ $('Zoom: Get data of last meeting').item.json.topic }} on {{ $('Zoom: Get data of last meeting').item.json.start_time }}"
                              },
                              {
                                    "id": "f3940ea2-9084-4c25-828e-5ddaa428ec83",
                                    "name": "=to",
                                    "type": "string",
                                    "value": "={{ $('Zoom: Get participants data').item.json.participants[0].user_email }}"
                              },
                              {
                                    "id": "1211af5b-2240-44ce-9df7-63d93f57806e",
                                    "name": "body",
                                    "type": "string",
                                    "value": "={{ $json.message.content }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "29ad24ba-016b-4e65-b8c8-908d8e2207c5",
            "name": "Format to html",
            "type": "n8n-nodes-base.code",
            "position": [
                  2400,
                  460
            ],
            "parameters": {
                  "jsCode": "const items = [];\n\nfor (const item of $input.all()) {\n const body = item.json.body;\n if (!body) continue;\n\n // Simple split approach\n const sections = body.split('\\n\\n');\n const title = sections[0].replace(/\\*\\*/g, '');\n const participants = sections[1].split('\\n').slice(1).join('\\n');\n const summary = sections[2].split('\\n').slice(1).join('\\n');\n const tasks = sections[3].split('\\n').slice(1).join('\\n');\n const dates = sections[4].split('\\n').slice(1).join('\\n');\n\n const html = `<html>\n<body style=\"font-family: Arial, sans-serif; max-width: 800px; margin: 20px;\">\n<h1 style=\"color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;\">${title}</h1>\n<h2 style=\"color: #2c3e50; margin-top: 20px;\">Participants:</h2>\n<ul style=\"list-style-type: none; padding-left: 20px;\">\n${participants.split('\\n').map(p => `<li>${p.replace('- ', '')}</li>`).join('\\n')}\n</ul>\n<h2 style=\"color: #2c3e50; margin-top: 20px;\">Meeting Summary:</h2>\n<p style=\"margin-left: 20px;\">${summary}</p>\n<h2 style=\"color: #2c3e50; margin-top: 20px;\">Tasks:</h2>\n<ul style=\"margin-left: 20px;\">\n${tasks.split('\\n').map(t => `<li>${t.replace('- ', '')}</li>`).join('\\n')}\n</ul>\n<h2 style=\"color: #2c3e50; margin-top: 20px;\">Important Dates:</h2>\n<ul style=\"margin-left: 20px;\">\n${dates.split('\\n').map(d => `<li>${d.replace('- ', '')}</li>`).join('\\n')}\n</ul>\n</body>\n</html>`;\n\n items.push({\n json: {\n html,\n to: item.json.to,\n subject: item.json.subject\n }\n });\n}\n\nreturn items;"
            },
            "typeVersion": 2
      },
      {
            "id": "60c9d778-d97a-4e17-858c-804f523590e5",
            "name": "Send meeting summary",
            "type": "n8n-nodes-base.emailSend",
            "position": [
                  2560,
                  460
            ],
            "parameters": {
                  "html": "={{ $json.html }}",
                  "options": {},
                  "subject": "={{ $json.subject }}",
                  "toEmail": "={{ $json.to }}",
                  "fromEmail": "friedemann.schuetz@posteo.de"
            },
            "credentials": {
                  "smtp": {
                        "id": "OFGEnOq5l8U8Lb3U",
                        "name": "SMTP account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "39d8bb49-d9e9-46e3-89b3-fcbf9345bad8",
            "name": "Create tasks",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  2340,
                  1040
            ],
            "parameters": {
                  "name": "create_task",
                  "schemaType": "manual",
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "zSKQLEObdU9RiThI",
                        "cachedResultName": "create_task"
                  },
                  "description": "=Use this tool to create a task. \nFor task creation use only action items for me Friedemann, don't use action items for other participants.",
                  "inputSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"items\": {\n \"type\": \"array\",\n \"description\": \"An array of tasks\",\n \"items\": {\n \"type\": \"object\",\n \"properties\": {\n \"name\": {\n \"type\": \"string\",\n \"description\": \"The name of the task\"\n },\n \"description\": {\n \"type\": \"string\",\n \"description\": \"A detailed description of the task\"\n },\n \"due_date\": {\n \"type\": \"string\",\n \"description\": \"Due Date\"\n },\n \"priority\": {\n \"type\": \"string\",\n \"description\": \"Priority. . Please capitalize first letter\"\n },\n \"project_name\": {\n \"type\": \"string\",\n \"description\": \"Name of the project. Word 'Project' shouldn't be included\"\n }\n },\n \"required\": [\n \"name\",\n \"description\",\n \"due_date\",\n \"priority\"\n ],\n \"additionalProperties\": false\n }\n }\n },\n \"required\": [\n \"items\"\n ],\n \"additionalProperties\": false\n}",
                  "specifyInputSchema": true
            },
            "typeVersion": 1.3
      },
      {
            "id": "9fa8eb9e-d4fc-4a2a-9843-2f51055944e9",
            "name": "Create tasks and follow-up call",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2240,
                  720
            ],
            "parameters": {
                  "text": "=<system_prompt>\n\nTODAY IS: {{ $now }}\n\nYOU ARE A MEETING ASSISTANT FOR AUTOMATION IN N8N. YOUR TASK IS TO EFFICIENTLY AND PRECISELY PROCESS INFORMATION FROM ZOOM MEETINGS TO GENERATE TO-DOS AND SCHEDULE FOLLOW-UP MEETINGS. YOU HAVE ACCESS TO THE FOLLOWING DATA:\n\n### INPUTS ###\n- **MEETING TITLE**: {{ $('Zoom: Get data of last meeting').item.json.topic }}\n- **PARTICIPANTS**: {{ $('Zoom: Get participants data').item.json.participants[0].name }}\n- **TRANSCRIPT**: {{ $('Format transcript text').item.json.transcript }}\n\n### YOUR TASKS ###\n1. **CREATE TO-DOS**:\n - IDENTIFY TASKS AND TO-DOS IN THE TRANSCRIPT.\n - FORMULATE CLEAR, CONCRETE TASKS.\n - PASS THESE TASKS TO THE TOOL \"Create tasks\" TO SAVE THEM IN CLICKUP. \n - DATA STRUCTURE:\n - **TASK DESCRIPTION**: Brief description of the task.\n - **ASSIGNED PERSON**: First name from the participant list.\n - **DUE DATE**: Use any date mentioned in the transcript; otherwise, set to \"Not specified.\"\n\n2. **CREATE MEETING**:\n - ANALYZE THE TRANSCRIPT TO IDENTIFY INFORMATION ABOUT THE NEXT MEETING (DATE, TIME, AND TOPIC).\n - PASS THIS INFORMATION TO THE TOOL \"Create follow-up call.\"\n - DATA STRUCTURE:\n - **MEETING TITLE**: \"Follow-up: [Meeting Title]\"\n - **DATE AND TIME**: Determined from the transcript or set to \"Next Tuesday at 10:00 AM\" if no information is provided.\n - **PARTICIPANTS**: Add all participants from the list.\n\n### CHAIN OF THOUGHTS ###\n1. **UNDERSTAND**: Read and analyze the provided inputs (title, participants, transcript).\n2. **IDENTIFY**: Extract relevant information for the to-dos and the next meeting.\n3. **DIVIDE**: Split the task into two separate processes: creating to-dos and creating the meeting.\n4. **STRUCTURE**: Format the results in the required structure for the respective tools.\n5. **TRANSMIT**: Pass the data to the designated tools in n8n.\n6. **VERIFY**: Ensure the data is correct and complete.\n\n### WHAT YOU SHOULD NOT DO ###\n- **NEVER**: Create unclear or vague to-dos.\n- **NEVER**: Ignore missing data – use default values where uncertain.\n- **NEVER**: Overlook information from the inputs or make incorrect connections.\n- **NEVER**: Transmit tasks or meetings without proper formatting.\n\n### OUTPUT EXAMPLES ###\n1. **TO-DO**:\n - **TASK DESCRIPTION**: \"Prepare presentation for the next meeting.\"\n - **ASSIGNED PERSON**: \"John Doe.\"\n - **DUE DATE**: \"2025-01-25.\"\n\n2. **MEETING**:\n - **MEETING TITLE**: \"Follow-up: Project Discussion.\"\n - **DATE AND TIME**: \"2025-01-28 at 10:00 AM.\"\n - **PARTICIPANTS**: \"John Doe, Jane Example.\"\n\n### NOTES ###\n- EXECUTE YOUR TASKS WITH THE HIGHEST PRECISION AND CONTEXT SENSITIVITY.\n- RELY ON THE PROVIDED DATA AND DEFAULT VALUES WHERE NECESSARY.\n</system_prompt>\n",
                  "agent": "openAiFunctionsAgent",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "05515784-c99d-4197-9d88-62350bacfb7b",
            "name": "Create follow-up call",
            "type": "n8n-nodes-base.microsoftOutlookTool",
            "position": [
                  2500,
                  1040
            ],
            "parameters": {
                  "subject": "={{ $fromAI(\"meeting_name\",\"Meeting name\",\"string\") }}",
                  "resource": "event",
                  "operation": "create",
                  "calendarId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "AQMkADAwATNiZmYAZC1jYjE5LWExMzQtMDACLTAwCgBGAAAD1gD8iHcpKEiYQc0w4fCLUgcA-79r8r8ac0aInYGVxRUqCwAAAgEGAAAA-79r8r8ac0aInYGVxRUqCwAAAkH-AAAA",
                        "cachedResultName": "Calendar"
                  },
                  "endDateTime": "={{ $fromAI(\"end_date_time\",\"Date and time of meeting end\",\"string\") }}",
                  "startDateTime": "={{ $fromAI(\"start_date_time\",\"Date and time of meeting start\",\"string\") }}",
                  "descriptionType": "manual",
                  "toolDescription": "=Use tool to create Outlook Calendar Event. Use this tool only when transcript contains information that call should be scheduled.",
                  "additionalFields": {
                        "timeZone": "Europe/Berlin"
                  }
            },
            "credentials": {
                  "microsoftOutlookOAuth2Api": {
                        "id": "DNMkqql32uwVETij",
                        "name": "Microsoft Outlook account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "2f00c2c6-2389-429c-8c9a-f8f1fbfb6524",
            "name": "Filter: Last 24 hours",
            "type": "n8n-nodes-base.filter",
            "position": [
                  500,
                  460
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
                                    "id": "de097a4f-1f3e-4dc0-9ab6-139311ff4676",
                                    "operator": {
                                          "type": "dateTime",
                                          "operation": "afterOrEquals"
                                    },
                                    "leftValue": "={{ $json.start_time }}",
                                    "rightValue": "={{$now.minus({ hours: 24 }).toISO()}}"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "fd353a51-eac3-4d04-ae06-dd8e90b82990",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "disabled": true,
            "position": [
                  1280,
                  980
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "40480f97-699b-4a49-867a-54950702af79",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  1500,
                  980
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "query.items"
            },
            "typeVersion": 1
      },
      {
            "id": "22e6165f-d7c2-4b23-be63-00c76505cdd3",
            "name": "ClickUp",
            "type": "n8n-nodes-base.clickUp",
            "position": [
                  1720,
                  980
            ],
            "parameters": {
                  "list": "901207046581",
                  "name": "={{ $json.name }}",
                  "team": "9012366821",
                  "space": "90122025710",
                  "folder": "90123813376",
                  "authentication": "oAuth2",
                  "additionalFields": {
                        "content": "={{ $json.description }}",
                        "dueDate": "={{ $json.due_date }}"
                  }
            },
            "credentials": {
                  "clickUpOAuth2Api": {
                        "id": "KYxmoCCdfSkwWlXE",
                        "name": "ClickUp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "742a411e-05cb-4aa0-a541-7b67e613e2bb",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1060,
                  900
            ],
            "parameters": {
                  "width": 1000,
                  "height": 280,
                  "content": "## Sub workflow: Create Task in ClickUp"
            },
            "typeVersion": 1
      },
      {
            "id": "ebc5f1df-b417-4977-9700-b71b49a15cbb",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  140,
                  660
            ],
            "parameters": {
                  "width": 660,
                  "height": 520,
                  "content": "## Welcome to my Zoom AI Meeting Assistant Workflow!\n\n### This workflow has the following sequence:\n\n1. manual trigger (Can be replaced by a scheduled trigger or a webhook)\n2. retrieval of of Zoom meeting data\n3. filter the events of the last 24 hours\n4. retrieval of transcripts and extract of the text\n5. creating a meeting summary, format to html and send per mail\n6. create tasks and follow-up call (if discussed in the meeting) in ClickUp/Outlook (can be replaced by Gmail, Airtable, and so forth) via sub workflow\n\n### The following accesses are required for the workflow:\n- Zoom Workspace (via API and HTTP Request): [Documentation](https://docs.n8n.io/integrations/builtin/credentials/zoom/)\n- Microsoft Outlook: [Documentation](https://docs.n8n.io/integrations/builtin/credentials/microsoft/)\n- ClickUp: [Documentation](https://docs.n8n.io/integrations/builtin/credentials/clickup/)\n- AI API access (e.g. via OpenAI, Anthropic, Google or Ollama)\n- SMTP access data (for sending the mail)\n\nYou can contact me via LinkedIn, if you have any questions: https://www.linkedin.com/in/friedemann-schuetz"
            },
            "typeVersion": 1
      },
      {
            "id": "d9109d09-eb1f-4685-a78b-d17e3dd22438",
            "name": "Zoom: Get transcripts data",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueErrorOutput",
            "position": [
                  680,
                  460
            ],
            "parameters": {
                  "url": "=https://api.zoom.us/v2/meetings/{{ $json.id }}/recordings",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "zoomOAuth2Api"
            },
            "credentials": {
                  "zoomOAuth2Api": {
                        "id": "MmccxSST1g202tG2",
                        "name": "Zoom account"
                  }
            },
            "typeVersion": 4.2
      }
],
    connections: {
      "Split Out": {
            "main": [
                  [
                        {
                              "node": "ClickUp",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create tasks": {
            "ai_tool": [
                  [
                        {
                              "node": "Create tasks and follow-up call",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format to html": {
            "main": [
                  [
                        {
                              "node": "Send meeting summary",
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
                              "node": "Create tasks and follow-up call",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter: Only 1 item": {
            "main": [
                  [
                        {
                              "node": "Filter: Only 1 item",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Zoom: Get transcript file",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send meeting summary": {
            "main": [
                  []
            ]
      },
      "Create follow-up call": {
            "ai_tool": [
                  [
                        {
                              "node": "Create tasks and follow-up call",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter transcript URL": {
            "main": [
                  [
                        {
                              "node": "Filter: Only 1 item",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter: Last 24 hours": {
            "main": [
                  [
                        {
                              "node": "Zoom: Get transcripts data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create meeting summary": {
            "main": [
                  [
                        {
                              "node": "Sort for mail delivery",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Create tasks and follow-up call",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format transcript text": {
            "main": [
                  [
                        {
                              "node": "Zoom: Get participants data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Sort for mail delivery": {
            "main": [
                  [
                        {
                              "node": "Format to html",
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
      "Zoom: Get transcript file": {
            "main": [
                  [
                        {
                              "node": "Extract text from transcript file",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Zoom: Get transcripts data": {
            "main": [
                  [
                        {
                              "node": "Filter transcript URL",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "No Recording/Transcript available",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Zoom: Get participants data": {
            "main": [
                  [
                        {
                              "node": "Create meeting summary",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Zoom: Get data of last meeting": {
            "main": [
                  [
                        {
                              "node": "Filter: Last 24 hours",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create tasks and follow-up call": {
            "main": [
                  []
            ]
      },
      "Extract text from transcript file": {
            "main": [
                  [
                        {
                              "node": "Format transcript text",
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
                              "node": "Zoom: Get data of last meeting",
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

export function OtherIntegrationsCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-zinc-600 text-white shadow-lg shadow-zinc-500/25 border border-zinc-600' : 'bg-zinc-50 dark:bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-500/20 hover:border-zinc-300 dark:hover:border-zinc-600/50 hover:shadow-md'}`}
    >
      <Puzzle className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`} />
      <span className="truncate max-w-[200px]">Other Integrations and Use Cases</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {otherIntegrationsTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function OtherIntegrationsTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {otherIntegrationsTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-zinc-50/50 dark:group-hover:to-zinc-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-zinc-500 to-zinc-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-zinc-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Puzzle className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-zinc-600 dark:hover:bg-zinc-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
