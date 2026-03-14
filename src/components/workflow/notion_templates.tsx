import React from 'react';
import { Play, FileText } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const notionTemplates: IN8nTemplate[] = [
  {
    name: "Add Positive Feedback Messages To A Table In Notion",
    nodes: [
      {
            "name": "Typeform Trigger",
            "type": "n8n-nodes-base.typeformTrigger",
            "position": [
                  0,
                  400
            ],
            "webhookId": "ad8a87ef-d293-4e48-8d36-838d69ebce0f",
            "parameters": {
                  "formId": "fBYjtY5e"
            },
            "credentials": {
                  "typeformApi": ""
            },
            "typeVersion": 1
      },
      {
            "name": "Google Cloud Natural Language",
            "type": "n8n-nodes-base.googleCloudNaturalLanguage",
            "position": [
                  200,
                  400
            ],
            "parameters": {
                  "content": "={{$json[\"Any suggestions for us? \"]}}",
                  "options": {}
            },
            "credentials": {
                  "googleCloudNaturalLanguageOAuth2Api": ""
            },
            "typeVersion": 1
      },
      {
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "position": [
                  400,
                  400
            ],
            "parameters": {
                  "conditions": {
                        "number": [
                              {
                                    "value1": "={{$node[\"Google Cloud Natural Language\"].json[\"documentSentiment\"][\"score\"]}}",
                                    "operation": "larger"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Notion",
            "type": "n8n-nodes-base.notion",
            "position": [
                  600,
                  300
            ],
            "parameters": {
                  "resource": "databasePage",
                  "databaseId": "b7d1130a-3756-4bb3-aa56-0c77bf416437",
                  "propertiesUi": {
                        "propertyValues": [
                              {
                                    "key": "Name|title",
                                    "title": "={{$node[\"Typeform Trigger\"].json[\"Name\"]}}"
                              },
                              {
                                    "key": "Feedback|rich_text",
                                    "textContent": "={{$node[\"Typeform Trigger\"].json[\"Any suggestions for us? \"]}}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "notionApi": ""
            },
            "typeVersion": 1
      },
      {
            "name": "Slack",
            "type": "n8n-nodes-base.slack",
            "position": [
                  800,
                  300
            ],
            "parameters": {
                  "channel": "general",
                  "blocksUi": {
                        "blocksValues": []
                  },
                  "attachments": [
                        {
                              "text": "={{$node[\"Typeform Trigger\"].json[\"Any suggestions for us? \"]}}",
                              "title": "={{$node[\"Typeform Trigger\"].json[\"Name\"]}} {{$node[\"Google Cloud Natural Language\"].json[\"documentSentiment\"][\"score\"]}}"
                        }
                  ],
                  "otherOptions": {}
            },
            "credentials": {
                  "slackApi": ""
            },
            "typeVersion": 1
      },
      {
            "name": "Trello",
            "type": "n8n-nodes-base.trello",
            "position": [
                  600,
                  500
            ],
            "parameters": {
                  "name": "=Score: {{$json[\"documentSentiment\"][\"score\"]}}",
                  "listId": "5fbb9e2eb1d5cc0a8a7ab8ac",
                  "description": "=Score: {{$json[\"documentSentiment\"][\"score\"]}}\nFeedback: {{$node[\"Typeform Trigger\"].json[\"Any suggestions for us? \"]}}\nUser: {{$node[\"Typeform Trigger\"].json[\"Name\"]}}",
                  "additionalFields": {}
            },
            "credentials": {
                  "trelloApi": ""
            },
            "typeVersion": 1
      }
],
    connections: {
      "IF": {
            "main": [
                  [
                        {
                              "node": "Notion",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Trello",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Notion": {
            "main": [
                  [
                        {
                              "node": "Slack",
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
    name: "Hugging Face to Notion",
    nodes: [
      {
            "id": "32d5bfee-97f1-4e92-b62e-d09bdd9c3821",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -2640,
                  -300
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "weeks",
                                    "triggerAtDay": [
                                          1,
                                          2,
                                          3,
                                          4,
                                          5
                                    ],
                                    "triggerAtHour": 8
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "b1f4078e-ac77-47ec-995c-f52fd98fafef",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  -1360,
                  -280
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
                                    "id": "7094d6db-1fa7-4b59-91cf-6bbd5b5f067e",
                                    "operator": {
                                          "type": "object",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "afac08e1-b629-4467-86ef-907e4a5e8841",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  -1760,
                  -300
            ],
            "parameters": {
                  "options": {
                        "reset": false
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "807ba450-9c89-4f88-aa84-91f43e3adfc6",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  -1960,
                  -300
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "url, url"
            },
            "typeVersion": 1
      },
      {
            "id": "08dd3f15-2030-48f2-ab0f-f85f797268e1",
            "name": "Request Hugging Face Paper",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -2440,
                  -300
            ],
            "parameters": {
                  "url": "https://huggingface.co/papers",
                  "options": {},
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "date",
                                    "value": "={{ $now.minus(1,'days').format('yyyy-MM-dd') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "f37ba769-d881-4aad-927d-ca1f4a68b9a1",
            "name": "Extract Hugging Face Paper",
            "type": "n8n-nodes-base.html",
            "position": [
                  -2200,
                  -300
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "url",
                                    "attribute": "href",
                                    "cssSelector": ".line-clamp-3",
                                    "returnArray": true,
                                    "returnValue": "attribute"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "94ba99bf-a33b-4311-a4e6-86490e1bb9ad",
            "name": "Check Paper URL Existed",
            "type": "n8n-nodes-base.notion",
            "position": [
                  -1540,
                  -280
            ],
            "parameters": {
                  "filters": {
                        "conditions": [
                              {
                                    "key": "URL|url",
                                    "urlValue": "={{ 'https://huggingface.co'+$json.url }}",
                                    "condition": "equals"
                              }
                        ]
                  },
                  "options": {},
                  "resource": "databasePage",
                  "operation": "getAll",
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "17b67aba-1fcc-80ae-baa1-d88ffda7ae83",
                        "cachedResultUrl": "https://www.notion.so/17b67aba1fcc80aebaa1d88ffda7ae83",
                        "cachedResultName": "huggingface-abstract"
                  },
                  "filterType": "manual"
            },
            "credentials": {
                  "notionApi": {
                        "id": "I5KdUzwhWnphQ862",
                        "name": "notion"
                  }
            },
            "typeVersion": 2.2,
            "alwaysOutputData": true
      },
      {
            "id": "ece8dee2-e444-4557-aad9-5bdcb5ecd756",
            "name": "Request Hugging Face Paper Detail",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -1080,
                  -300
            ],
            "parameters": {
                  "url": "={{ 'https://huggingface.co'+$('Split Out').item.json.url }}",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "53b266fe-e7c4-4820-92eb-78a6ba7a6430",
            "name": "OpenAI Analysis Abstract",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  -640,
                  -300
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-2024-11-20",
                        "cachedResultName": "GPT-4O-2024-11-20"
                  },
                  "options": {},
                  "messages": {
                        "values": [
                              {
                                    "role": "system",
                                    "content": "Extract the following key details from the paper abstract:\n\nCore Introduction: Summarize the main contributions and objectives of the paper, highlighting its innovations and significance.\nKeyword Extraction: List 2-5 keywords that best represent the research direction and techniques of the paper.\nKey Data and Results: Extract important performance metrics, comparison results, and the paper's advantages over other studies.\nTechnical Details: Provide a brief overview of the methods, optimization techniques, and datasets mentioned in the paper.\nClassification: Assign an appropriate academic classification based on the content of the paper.\n\n\nOutput as json：\n{\n \"Core_Introduction\": \"PaSa is an advanced Paper Search agent powered by large language models that can autonomously perform a series of decisions (including invoking search tools, reading papers, and selecting relevant references) to provide comprehensive and accurate results for complex academic queries.\",\n \"Keywords\": [\n \"Paper Search Agent\",\n \"Large Language Models\",\n \"Reinforcement Learning\",\n \"Academic Queries\",\n \"Performance Benchmarking\"\n ],\n \"Data_and_Results\": \"PaSa outperforms existing baselines (such as Google, GPT-4, chatGPT) in tests using AutoScholarQuery (35k academic queries) and RealScholarQuery (real-world academic queries). For example, PaSa-7B exceeds Google with GPT-4o by 37.78% in recall@20 and 39.90% in recall@50.\",\n \"Technical_Details\": \"PaSa is optimized using reinforcement learning with the AutoScholarQuery synthetic dataset, demonstrating superior performance in multiple benchmarks.\",\n \"Classification\": [\n \"Artificial Intelligence (AI)\",\n \"Academic Search and Information Retrieval\",\n \"Natural Language Processing (NLP)\",\n \"Reinforcement Learning\"\n ]\n}\n```"
                              },
                              {
                                    "content": "={{ $json.abstract }}"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "LmLcxHwbzZNWxqY6",
                        "name": "Unnamed credential"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "f491cd7f-598e-46fd-b80c-04cfa9766dfd",
            "name": "Store Abstract Notion",
            "type": "n8n-nodes-base.notion",
            "position": [
                  -300,
                  -300
            ],
            "parameters": {
                  "options": {},
                  "resource": "databasePage",
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "17b67aba-1fcc-80ae-baa1-d88ffda7ae83",
                        "cachedResultUrl": "https://www.notion.so/17b67aba1fcc80aebaa1d88ffda7ae83",
                        "cachedResultName": "huggingface-abstract"
                  },
                  "propertiesUi": {
                        "propertyValues": [
                              {
                                    "key": "URL|url",
                                    "urlValue": "={{ 'https://huggingface.co'+$('Split Out').item.json.url }}"
                              },
                              {
                                    "key": "title|title",
                                    "title": "={{ $('Extract Hugging Face Paper Abstract').item.json.title }}"
                              },
                              {
                                    "key": "abstract|rich_text",
                                    "textContent": "={{ $('Extract Hugging Face Paper Abstract').item.json.abstract.substring(0,2000) }}"
                              },
                              {
                                    "key": "scrap-date|date",
                                    "date": "={{ $today.format('yyyy-MM-dd') }}",
                                    "includeTime": false
                              },
                              {
                                    "key": "Classification|rich_text",
                                    "textContent": "={{ $json.message.content.Classification.join(',') }}"
                              },
                              {
                                    "key": "Technical_Details|rich_text",
                                    "textContent": "={{ $json.message.content.Technical_Details }}"
                              },
                              {
                                    "key": "Data_and_Results|rich_text",
                                    "textContent": "={{ $json.message.content.Data_and_Results }}"
                              },
                              {
                                    "key": "keywords|rich_text",
                                    "textContent": "={{ $json.message.content.Keywords.join(',') }}"
                              },
                              {
                                    "key": "Core Introduction|rich_text",
                                    "textContent": "={{ $json.message.content.Core_Introduction }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "I5KdUzwhWnphQ862",
                        "name": "notion"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "d5816a1c-d1fa-4be2-8088-57fbf68e6b43",
            "name": "Extract Hugging Face Paper Abstract",
            "type": "n8n-nodes-base.html",
            "position": [
                  -840,
                  -300
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "abstract",
                                    "cssSelector": ".text-gray-700"
                              },
                              {
                                    "key": "title",
                                    "cssSelector": ".text-2xl"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Request Hugging Face Paper Detail",
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
      "Loop Over Items": {
            "main": [
                  [],
                  [
                        {
                              "node": "Check Paper URL Existed",
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
                              "node": "Request Hugging Face Paper",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Store Abstract Notion": {
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
      "Check Paper URL Existed": {
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
      "OpenAI Analysis Abstract": {
            "main": [
                  [
                        {
                              "node": "Store Abstract Notion",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Hugging Face Paper": {
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
      "Request Hugging Face Paper": {
            "main": [
                  [
                        {
                              "node": "Extract Hugging Face Paper",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Request Hugging Face Paper Detail": {
            "main": [
                  [
                        {
                              "node": "Extract Hugging Face Paper Abstract",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Hugging Face Paper Abstract": {
            "main": [
                  [
                        {
                              "node": "OpenAI Analysis Abstract",
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
    name: "Automate LinkedIn Posts with AI",
    nodes: [
      {
            "id": "7e8ec5cc-0216-4897-8a40-c44f9bbe5a9b",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  580,
                  540
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "triggerAtHour": 15
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "dbde804d-9c84-4023-9e05-7506cd38a460",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  760,
                  225.26841303066982
            ],
            "parameters": {
                  "color": 6,
                  "width": 652.1201853643956,
                  "height": 542.0867486896091,
                  "content": "## Fetch the day's post from my Notion database\nA Notion _\"database\"_ is just a table on a Notion Page.\nThis table will have various rows, for which a minimum of three columns are required:\n- Name\n- Status\n- Date\n\nThe Date column is the most important, which will dictate when that row from your Notion table containing the text should be posted.\n\nNOTE: each post is required to have a copy and pasted image!"
            },
            "typeVersion": 1
      },
      {
            "id": "95205e81-e28d-48f9-b3fb-bcf361f7799e",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1520,
                  220
            ],
            "parameters": {
                  "width": 860.9829802912225,
                  "height": 540.7357881640437,
                  "content": "## Format Post\nSend the post to OpenAI, where it will attempt to ask your assistant how to take the incoming blob of text, and soup it up into something more palpable for LinkedIn engagement."
            },
            "typeVersion": 1
      },
      {
            "id": "4bc2a550-a8ad-4b25-ac53-01413277e068",
            "name": "Set post status to \"Done\"",
            "type": "n8n-nodes-base.notion",
            "position": [
                  2760,
                  540
            ],
            "parameters": {
                  "pageId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "={{ $('query entries from Notion table for today').item.json.url }}"
                  },
                  "options": {},
                  "resource": "databasePage",
                  "operation": "update",
                  "propertiesUi": {
                        "propertyValues": [
                              {
                                    "key": "Status|status",
                                    "statusValue": "Done"
                              }
                        ]
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "nBu4zRArkldtNypO",
                        "name": "Notion account"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "31116f06-72ca-4219-9575-8efaefbff24b",
            "name": "Post on LinkedIn",
            "type": "n8n-nodes-base.linkedIn",
            "position": [
                  2500,
                  540
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "person": "_RmSSZc0jB",
                  "additionalFields": {},
                  "shareMediaCategory": "IMAGE"
            },
            "credentials": {
                  "linkedInOAuth2Api": {
                        "id": "fozSa4dLS6Jgbn4e",
                        "name": "LinkedIn account 2"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "1bf0540d-a180-457a-a7d7-fb74c8119a52",
            "name": "Combine text+image",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2100,
                  540
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2.1
      },
      {
            "id": "f1fdf6f7-a75c-451b-8bce-ea581b4b6197",
            "name": "Fetch image from post",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1640,
                  620
            ],
            "parameters": {
                  "url": "={{ $json.url[0] }}",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "00e2bbcb-bac0-4a7e-9892-59f41a26ce9d",
            "name": "Reformat Post Text",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1620,
                  440
            ],
            "parameters": {
                  "text": "=Thank you kindly for your help, please refer to the following LinkedIn post, and output a reformatted version employing thoroughly thought-out paragraph breaks, and lists if present:\n```\n{{ $json.content.join(\" \") }}\n```",
                  "prompt": "define",
                  "options": {},
                  "resource": "assistant",
                  "assistantId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "asst_J1KuOx5wTLrjEHuy5q94jEgh",
                        "cachedResultName": "LinkedIn Post Reviewer"
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "Gxn0kNMCREcTNGcB",
                        "name": "OpenAi account 2"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "119d7fc7-ed62-4a73-916e-8baf19ab1d86",
            "name": "get all content from post page",
            "type": "n8n-nodes-base.notion",
            "position": [
                  1020,
                  540
            ],
            "parameters": {
                  "blockId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "={{ $json.url }}"
                  },
                  "resource": "block",
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "notionApi": {
                        "id": "nBu4zRArkldtNypO",
                        "name": "Notion account"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "461d4dd2-a91a-4219-bd20-6dd3398d4274",
            "name": "Pull together all text blocks + image",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1240,
                  540
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "fieldToAggregate": "content"
                              },
                              {
                                    "fieldToAggregate": "image.file.url"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "72052eec-c180-4da5-ba15-1a69a7ce6892",
            "name": "query entries from Notion table for today",
            "type": "n8n-nodes-base.notion",
            "position": [
                  800,
                  540
            ],
            "parameters": {
                  "filters": {
                        "conditions": [
                              {
                                    "key": "Date|date",
                                    "date": "={{ $today.format(\"yyyy/mM/dd\") }}",
                                    "condition": "equals"
                              }
                        ]
                  },
                  "options": {},
                  "resource": "databasePage",
                  "operation": "getAll",
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "9aba7f55-a7de-4329-9d5b-6d127937fa49",
                        "cachedResultUrl": "https://www.notion.so/9aba7f55a7de43299d5b6d127937fa49",
                        "cachedResultName": "LinkedIn Posts example"
                  },
                  "filterType": "manual"
            },
            "credentials": {
                  "notionApi": {
                        "id": "nBu4zRArkldtNypO",
                        "name": "Notion account"
                  }
            },
            "typeVersion": 2.2
      }
],
    connections: {
      "Post on LinkedIn": {
            "main": [
                  [
                        {
                              "node": "Set post status to \"Done\"",
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
                              "node": "query entries from Notion table for today",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine text+image": {
            "main": [
                  [
                        {
                              "node": "Post on LinkedIn",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Reformat Post Text": {
            "main": [
                  [
                        {
                              "node": "Combine text+image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetch image from post": {
            "main": [
                  [
                        {
                              "node": "Combine text+image",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "get all content from post page": {
            "main": [
                  [
                        {
                              "node": "Pull together all text blocks + image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pull together all text blocks + image": {
            "main": [
                  [
                        {
                              "node": "Fetch image from post",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Reformat Post Text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "query entries from Notion table for today": {
            "main": [
                  [
                        {
                              "node": "get all content from post page",
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
    name: "Notion AI Assistant Generator",
    nodes: [
      {
            "id": "9052b5b2-1e2d-425c-92e5-1ed51323e71c",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  240
            ],
            "parameters": {
                  "color": 7,
                  "width": 616.7964812508943,
                  "height": 231.27721611949534,
                  "content": "# Generate new workflow version for specific notion db schema\nInput a Notion database URL and get an AI Assistant chatbot workflow for it based on this template: https://n8n.io/workflows/2413-notion-knowledge-base-ai-assistant/\n\nProject in notion: https://www.notion.so/n8n/Chat-with-notion-database-84eec91b74dd4e36ba97edda17c2c306"
            },
            "typeVersion": 1
      },
      {
            "id": "b4a83f76-2bad-4bbe-9b7f-1df684166035",
            "name": "Notion",
            "type": "n8n-nodes-base.notion",
            "onError": "continueErrorOutput",
            "position": [
                  1280,
                  480
            ],
            "parameters": {
                  "simple": false,
                  "resource": "database",
                  "databaseId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "={{ $json.chatInput.match(/https?:\\/\\/[^\\s/$.?#].[^\\s]*/g)[0] }}"
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "aDS2eHXMOtsMrQnJ",
                        "name": "Nathan's notion account"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "39537c95-5ca0-47a9-b2bf-2c0134d3f236",
            "name": "Return success to chat",
            "type": "n8n-nodes-base.set",
            "position": [
                  3540,
                  740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "bebcb43c-461d-40d7-af83-436d94733622",
                                    "name": "output",
                                    "type": "string",
                                    "value": "=Created workflow:\n```\n{{ $json.generatedWorkflow }}\n```\n\n☝️ Copy and paste JSON above into an n8n workflow canvas (on v 1.52.0+)"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "5ae0fcfb-c3e2-443d-9a0c-25e7b17dc189",
            "name": "Auto-fixing Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserAutofixing",
            "position": [
                  2340,
                  640
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "4cd182ff-040a-4c0f-819f-a0648c67ab66",
            "name": "Anthropic Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "position": [
                  2100,
                  640
            ],
            "parameters": {
                  "options": {
                        "temperature": 0.7,
                        "maxTokensToSample": 8192
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "dc751c1f-4cd6-4d04-8152-402eb5e24574",
            "name": "Set schema for eval",
            "type": "n8n-nodes-base.set",
            "position": [
                  2720,
                  440
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "f82e26dd-f5c5-43b5-b97d-ee63c3ef124e",
                                    "name": "searchNotionDBJsonBody",
                                    "type": "string",
                                    "value": "={{ $json.output.output.workflowJson.parseJson().nodes.find(node => node.name === \"Search notion database\").parameters.jsonBody }}"
                              },
                              {
                                    "id": "a804139b-8bf0-43dc-aa8c-9c0dcb387392",
                                    "name": "generatedWorkflow",
                                    "type": "string",
                                    "value": "={{ $json.output.output.workflowJson }}"
                              },
                              {
                                    "id": "1e24fdfe-c31f-43e3-bca2-7124352fd62e",
                                    "name": "inputDatabase",
                                    "type": "object",
                                    "value": "={{ $('Set input data').first().json.inputDatabase }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "8f8c9d29-c901-4c3c-83a6-23bfe51809bd",
            "name": "Return error to chat",
            "type": "n8n-nodes-base.set",
            "position": [
                  1500,
                  660
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b561b640-7fcb-4613-8b66-068dbd115b4e",
                                    "name": "sessionId",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.sessionId }}"
                              },
                              {
                                    "id": "74d91d28-b73a-4341-a037-693468120d2d",
                                    "name": "output",
                                    "type": "string",
                                    "value": "Sorry that doesn't look like a valid notion database url. Try again."
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "518d2e58-6f2e-4497-9f74-7dbfeff4fd6f",
            "name": "Anthropic Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "position": [
                  2300,
                  800
            ],
            "parameters": {
                  "options": {
                        "maxTokensToSample": 8192
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "0e7a4d05-db00-4915-9df4-d3cb79bf5789",
            "name": "standardize schema",
            "type": "n8n-nodes-base.set",
            "position": [
                  1500,
                  440
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "8fc7df86-4a47-43ec-baea-f9ee87a899a8",
                                    "name": "inputDatabase.id",
                                    "type": "string",
                                    "value": "={{ $json.id }}"
                              },
                              {
                                    "id": "fdeb5b1b-0bf3-46d6-a266-7f85e212a427",
                                    "name": "inputDatabase.url",
                                    "type": "string",
                                    "value": "={{ $json.url }}"
                              },
                              {
                                    "id": "b2b06176-b4df-41bd-9422-9c89726fa3fd",
                                    "name": "inputDatabase.public_url",
                                    "type": "string",
                                    "value": "={{ $json.public_url }}"
                              },
                              {
                                    "id": "c7b65a70-8af6-4808-aae9-898df9b10340",
                                    "name": "inputDatabase.name",
                                    "type": "string",
                                    "value": "={{ $json.title[0].text.content }}"
                              },
                              {
                                    "id": "87c1be85-e180-487b-9c82-61c87c7c460b",
                                    "name": "inputDatabase.properties",
                                    "type": "object",
                                    "value": "={{ $json.properties }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "8244fb04-75ec-4b41-93cf-e9c5755fabfd",
            "name": "Simplify properties object",
            "type": "n8n-nodes-base.code",
            "position": [
                  1720,
                  440
            ],
            "parameters": {
                  "jsCode": "// Loop through each incoming item\nreturn items.map(item => {\n const inputDatabase = item.json[\"inputDatabase\"];\n\n const simplifiedProperties = Object.fromEntries(Object.entries(inputDatabase.properties).map(([key, value]) => {\n const simplifiedValue = {\n id: value.id,\n name: value.name,\n type: value.type\n };\n\n // Simplify based on type\n if (value.type === 'multi_select' || value.type === 'select') {\n simplifiedValue.options = value.multi_select?.options?.map(option => option.name) || [];\n }\n \n return [key, simplifiedValue];\n }));\n\n // Overwrite the properties object with simplifiedProperties\n item.json.inputDatabase.properties = simplifiedProperties;\n\n return item; // Return the modified item\n});\n"
            },
            "typeVersion": 2
      },
      {
            "id": "41b615cc-de7d-4c3f-b608-2d1856e0541a",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  2500,
                  800
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n\t\"workflowJson\": \"json of workflow\"\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "8016baac-9242-44e6-b487-111bb560019d",
            "name": "Set input data",
            "type": "n8n-nodes-base.code",
            "notes": "This allows different routes to input into our agent (e.g. the retry branch). In the AI Agent, we can use a relative $json reference for data, since it's always the same input schema going in. ",
            "position": [
                  1980,
                  440
            ],
            "parameters": {
                  "jsCode": "\nreturn [{\n json: {\n inputDatabase: $input.first().json.inputDatabase,\n feedbackPrompt: (typeof yourVariable !== 'undefined' && yourVariable) ? yourVariable : \" \",\n workflowTemplate: {\n \"nodes\": [\n {\n \"parameters\": {\n \"model\": \"gpt-4o\",\n \"options\": {\n \"temperature\": 0.7,\n \"timeout\": 25000\n }\n },\n \"id\": \"f262c0b4-d627-4fd4-ad78-0aa2f57d963f\",\n \"name\": \"OpenAI Chat Model\",\n \"type\": \"@n8n/n8n-nodes-langchain.lmChatOpenAi\",\n \"typeVersion\": 1,\n \"position\": [\n 1320,\n 640\n ],\n \"credentials\": {\n \"openAiApi\": {\n \"id\": \"AzPPV759YPBxJj3o\",\n \"name\": \"Max's DevRel OpenAI account\"\n }\n }\n },\n {\n \"parameters\": {\n \"assignments\": {\n \"assignments\": [\n {\n \"id\": \"055e8a80-4aff-4466-aaa5-ac58bb90f2d0\",\n \"name\": \"databaseName\",\n \"value\": \"={{ $json.name }}\",\n \"type\": \"string\"\n },\n {\n \"id\": \"2a61e473-72e7-46f6-98b0-817508d701c7\",\n \"name\": \"databaseId\",\n \"value\": \"={{ $json.id }}\",\n \"type\": \"string\"\n }\n ]\n },\n \"options\": {}\n },\n \"id\": \"fb74819f-660e-479c-9519-73cfc41c7ee0\",\n \"name\": \"workflow vars\",\n \"type\": \"n8n-nodes-base.set\",\n \"typeVersion\": 3.4,\n \"position\": [\n 940,\n 460\n ]\n },\n {\n \"parameters\": {\n \"assignments\": {\n \"assignments\": [\n {\n \"id\": \"a8e58791-ba51-46a2-8645-386dd1a0ff6e\",\n \"name\": \"sessionId\",\n \"value\": \"={{ $('When chat message received').item.json.sessionId }}\",\n \"type\": \"string\"\n },\n {\n \"id\": \"434209de-39d5-43d8-a964-0fcb7396306c\",\n \"name\": \"action\",\n \"value\": \"={{ $('When chat message received').item.json.action }}\",\n \"type\": \"string\"\n },\n {\n \"id\": \"cad4c972-51a9-4e16-a627-b00eea77eb30\",\n \"name\": \"chatInput\",\n \"value\": \"={{ $('When chat message received').item.json.chatInput }}\",\n \"type\": \"string\"\n }\n ]\n },\n \"options\": {}\n },\n \"id\": \"832ec8ce-0f7c-4380-9a24-633f490a60a9\",\n \"name\": \"format input for agent\",\n \"type\": \"n8n-nodes-base.set\",\n \"typeVersion\": 3.4,\n \"position\": [\n 1160,\n 460\n ]\n },\n {\n \"parameters\": {\n \"toolDescription\": \"=Use this tool to search the \\\"{{ $('workflow vars').item.json.databaseName }}\\\" Notion app database.\\n\\nIt is structured with question and answer format. \\nYou can filter query result by:\\n- By keyword\\n- filter by tag.\\n\\nKeyword and Tag have an OR relationship not AND.\\n\\n\",\n \"method\": \"POST\",\n \"url\": \"https://api.notion.com/v1/databases/7ea9697d-4875-441e-b262-1105337d232e/query\",\n \"authentication\": \"predefinedCredentialType\",\n \"nodeCredentialType\": \"notionApi\",\n \"sendBody\": true,\n \"specifyBody\": \"json\",\n \"jsonBody\": \"{\\n \\\"filter\\\": {\\n \\\"or\\\": [\\n {\\n \\\"property\\\": \\\"question\\\",\\n \\\"rich_text\\\": {\\n \\\"contains\\\": \\\"{keyword}\\\"\\n }\\n },\\n {\\n \\\"property\\\": \\\"tags\\\",\\n \\\"multi_select\\\": {\\n \\\"contains\\\": \\\"{tag}\\\"\\n }\\n }\\n ]\\n },\\n \\\"sorts\\\": [\\n {\\n \\\"property\\\": \\\"updated_at\\\",\\n \\\"direction\\\": \\\"ascending\\\"\\n }\\n ]\\n}\",\n \"placeholderDefinitions\": {\n \"values\": [\n {\n \"name\": \"keyword\",\n \"description\": \"Searches question of the record. Use one keyword at a time.\"\n },\n {\n \"name\": \"tag\",\n \"description\": \"Options: PTO, HR Policy, Health Benefits, Direct Deposit, Payroll, Sick Leave, 1:1 Meetings, Scheduling, Internal Jobs, Performance Review, Diversity, Inclusion, Training, Harassment, Discrimination, Product Roadmap, Development, Feature Request, Product Management, Support, Ticket Submission, Password Reset, Email, Slack, GitHub, Team Collaboration, Development Setup, DevOps, GitHub Profile Analyzer, Security Breach, Incident Report, New Software, Software Request, IT, Hardware, Procurement, Software Licenses, JetBrains, Adobe, Data Backup, IT Policy, Security, MFA, Okta, Device Policy, Support Ticket, Phishing, Office Supplies, Operations, Meeting Room, Berlin Office, Travel Expenses, Reimbursement, Facilities, Maintenance, Equipment, Expense Reimbursement, Mobile Phones, SIM Cards, Parking, OKRs, Dashboard, Catering, Office Events\"\n }\n ]\n }\n },\n \"id\": \"f16acb7e-f27d-4a95-845c-c990fc334795\",\n \"name\": \"Search notion database\",\n \"type\": \"@n8n/n8n-nodes-langchain.toolHttpRequest\",\n \"typeVersion\": 1.1,\n \"position\": [\n 1620,\n 640\n ],\n \"credentials\": {\n \"notionApi\": {\n \"id\": \"gfNp6Jup8rsmFLRr\",\n \"name\": \"max-bot\"\n }\n }\n },\n {\n \"parameters\": {\n \"public\": true,\n \"initialMessages\": \"=Happy {{ $today.weekdayLong }}!\\nKnowledge source assistant at your service. How can I help?\",\n \"options\": {\n \"subtitle\": \"\",\n \"title\": \"Notion Knowledge Base\"\n }\n },\n \"id\": \"9fc1ae38-d115-44d0-a088-7cec7036be6f\",\n \"name\": \"When chat message received\",\n \"type\": \"@n8n/n8n-nodes-langchain.chatTrigger\",\n \"typeVersion\": 1.1,\n \"position\": [\n 560,\n 460\n ],\n \"webhookId\": \"b76d02c0-b406-4d21-b6bf-8ad2c623def3\"\n },\n {\n \"parameters\": {\n \"resource\": \"database\",\n \"databaseId\": {\n \"__rl\": true,\n \"value\": \"7ea9697d-4875-441e-b262-1105337d232e\",\n \"mode\": \"list\",\n \"cachedResultName\": \"StarLens Company Knowledge Base\",\n \"cachedResultUrl\": \"https://www.notion.so/7ea9697d4875441eb2621105337d232e\"\n }\n },\n \"id\": \"9325e0fe-549f-423b-af48-85e802429a7f\",\n \"name\": \"Get database details\",\n \"type\": \"n8n-nodes-base.notion\",\n \"typeVersion\": 2.2,\n \"position\": [\n 760,\n 460\n ],\n \"credentials\": {\n \"notionApi\": {\n \"id\": \"gfNp6Jup8rsmFLRr\",\n \"name\": \"max-bot\"\n }\n }\n },\n {\n \"parameters\": {\n \"contextWindowLength\": 4\n },\n \"id\": \"637f5731-4442-42be-9151-30ee29ad97c6\",\n \"name\": \"Window Buffer Memory\",\n \"type\": \"@n8n/n8n-nodes-langchain.memoryBufferWindow\",\n \"typeVersion\": 1.2,\n \"position\": [\n 1460,\n 640\n ]\n },\n {\n \"parameters\": {\n \"toolDescription\": \"=Use this tool to retrieve Notion page content using the page ID. \\n\\nIt is structured with question and answer format. \\nYou can filter query result by:\\n- By keyword\\n- filter by tag.\\n\\nKeyword and Tag have an OR relationship not AND.\\n\\n\",\n \"url\": \"https://api.notion.com/v1/blocks/{page_id}/children\",\n \"authentication\": \"predefinedCredentialType\",\n \"nodeCredentialType\": \"notionApi\",\n \"placeholderDefinitions\": {\n \"values\": [\n {\n \"name\": \"page_id\",\n \"description\": \"Notion page id from 'Search notion database' tool results\"\n }\n ]\n },\n \"optimizeResponse\": true,\n \"dataField\": \"results\",\n \"fieldsToInclude\": \"selected\",\n \"fields\": \"id, type, paragraph.text, heading_1.text, heading_2.text, heading_3.text, bulleted_list_item.text, numbered_list_item.text, to_do.text, children\"\n },\n \"id\": \"6b87ae47-fac9-4ef5-aa9a-f1a1ae1adc5f\",\n \"name\": \"Search inside database record\",\n \"type\": \"@n8n/n8n-nodes-langchain.toolHttpRequest\",\n \"typeVersion\": 1.1,\n \"position\": [\n 1800,\n 640\n ],\n \"credentials\": {\n \"notionApi\": {\n \"id\": \"gfNp6Jup8rsmFLRr\",\n \"name\": \"max-bot\"\n }\n }\n },\n {\n \"parameters\": {\n \"promptType\": \"define\",\n \"text\": \"={{ $json.chatInput }}\",\n \"options\": {\n \"systemMessage\": \"=# Role:\\nYou are a helpful agent. Query the \\\"{{ $('workflow vars').item.json.databaseName }}\\\" Notion database to find relevant records or provide insights based on multiple records.\\n\\n# Behavior:\\n\\nBe clear, very concise, efficient, and accurate in responses. Do not hallucinate.\\nIf the request is ambiguous, ask for clarification. Do not embellish, only use facts from the Notion records. Never offer general advice.\\n\\n# Error Handling:\\n\\nIf no matching records are found, try alternative search criteria. Example: Laptop, then Computer, then Equipment. \\nClearly explain any issues with queries (e.g., missing fields or unsupported filters).\\n\\n# Output:\\n\\nReturn concise, user-friendly results or summaries.\\nFor large sets, show top results by default and offer more if needed. Output URLs in markdown format. \\n\\nWhen a record has the answer to user question, always output the URL to that page. Always list links to records separately at the end of the message like this:\\n\\\"Relevant pages: \\n(links in markdown format)\\\"\\nDo not output links twice, only in Relevant pages section\\n\"\n }\n },\n \"id\": \"17f2c426-c48e-48e0-9c5e-e35bdafe5109\",\n \"name\": \"AI Agent\",\n \"type\": \"@n8n/n8n-nodes-langchain.agent\",\n \"typeVersion\": 1.6,\n \"position\": [\n 1380,\n 460\n ]\n }\n ],\n \"connections\": {\n \"OpenAI Chat Model\": {\n \"ai_languageModel\": [\n [\n {\n \"node\": \"AI Agent\",\n \"type\": \"ai_languageModel\",\n \"index\": 0\n }\n ]\n ]\n },\n \"workflow vars\": {\n \"main\": [\n [\n {\n \"node\": \"format input for agent\",\n \"type\": \"main\",\n \"index\": 0\n }\n ]\n ]\n },\n \"format input for agent\": {\n \"main\": [\n [\n {\n \"node\": \"AI Agent\",\n \"type\": \"main\",\n \"index\": 0\n }\n ]\n ]\n },\n \"Search notion database\": {\n \"ai_tool\": [\n [\n {\n \"node\": \"AI Agent\",\n \"type\": \"ai_tool\",\n \"index\": 0\n }\n ]\n ]\n },\n \"When chat message received\": {\n \"main\": [\n [\n {\n \"node\": \"Get database details\",\n \"type\": \"main\",\n \"index\": 0\n }\n ]\n ]\n },\n \"Get database details\": {\n \"main\": [\n [\n {\n \"node\": \"workflow vars\",\n \"type\": \"main\",\n \"index\": 0\n }\n ]\n ]\n },\n \"Window Buffer Memory\": {\n \"ai_memory\": [\n [\n {\n \"node\": \"AI Agent\",\n \"type\": \"ai_memory\",\n \"index\": 0\n }\n ]\n ]\n },\n \"Search inside database record\": {\n \"ai_tool\": [\n [\n {\n \"node\": \"AI Agent\",\n \"type\": \"ai_tool\",\n \"index\": 0\n }\n ]\n ]\n }\n },\n \"pinData\": {}\n}\n }\n}];"
            },
            "typeVersion": 2
      },
      {
            "id": "dc15a250-074e-4aed-8eec-5c60c91cc42d",
            "name": "Set schem for rerun",
            "type": "n8n-nodes-base.set",
            "position": [
                  3540,
                  240
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b4669a2c-7780-4c54-aef6-89a56ddf1d06",
                                    "name": "inputDatabase",
                                    "type": "object",
                                    "value": "={{ $json.inputDatabase }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "224f4963-caac-4438-a61b-90e2c0858f24",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1060,
                  240
            ],
            "parameters": {
                  "color": 7,
                  "width": 747.234277816171,
                  "height": 110.78786136085805,
                  "content": "## #1 Serve chat, get URL from user, pull new notion DB schema\nUses n8n Chat trigger. Notion node will fail if an invalid URL is used, or if n8n doesn't have access to it. Also attempts to strip non URL text input. Simplifies notion DB outputs for more efficient token usage in AI Agent."
            },
            "typeVersion": 1
      },
      {
            "id": "7e18ca8d-3181-446f-96f5-0e4b1000d855",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1939,
                  240
            ],
            "parameters": {
                  "color": 7,
                  "width": 638.6509136143742,
                  "height": 114.20873484539783,
                  "content": "## #2 GenAI step\nTakes 2 inputs: [original workflow template](https://n8n.io/workflows/2413-notion-knowledge-base-ai-assistant/) and new Notion database details from #1"
            },
            "typeVersion": 1
      },
      {
            "id": "b54b8c03-eb66-4ec7-bc7f-f62ddc566bbe",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2660,
                  240
            ],
            "parameters": {
                  "color": 7,
                  "width": 727.8599253628195,
                  "height": 111.9281525223713,
                  "content": "## #3 Does the new workflow look right?\nChecks for previously identified cases (e.g. LLM outputs placeholder for certain values) then does general LLM check on whether it looks like valid n8n workflow JSON."
            },
            "typeVersion": 1
      },
      {
            "id": "a5cc97a7-33e3-45fe-9e13-45ebafd469d7",
            "name": "Add feedback prompt",
            "type": "n8n-nodes-base.set",
            "position": [
                  3220,
                  440
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "1243a328-8420-4be0-8932-4e153472a638",
                                    "name": "feedbackPrompt",
                                    "type": "string",
                                    "value": "=You attempted the below task and outputted incorrect JSON. Below is your incorrect attempt and original task prompt. Try again.\n\n# Incorrect task prompt\n"
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "b066fa2d-77ba-4466-ae3b-9ab2405bae3c",
            "name": "Check for WF JSON errors",
            "type": "n8n-nodes-base.switch",
            "notes": "Placeholder jsonBody in tool - this means the 'Search notion database' tool got [object Object] as it's value (happening ~25% of the time)",
            "position": [
                  2920,
                  440
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Placeholder jsonBody in tool",
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
                                                      "leftValue": "={{ $json.searchNotionDBJsonBody }}",
                                                      "rightValue": "object Object"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "extra",
                        "allMatchingOutputs": false
                  }
            },
            "typeVersion": 3.1
      },
      {
            "id": "e4b38c13-255d-4136-9c7b-90678cbe523b",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3540,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 343.3887397891673,
                  "height": 132.30907857627597,
                  "content": "## #4 Respond to Chat trigger\nEach response to the chat trigger is one run. Data of the last node that runs in the workflow is sent to chat trigger, like `Return success to chat`"
            },
            "typeVersion": 1
      },
      {
            "id": "3ecfadc2-2499-4e0f-94c4-1e68770beefb",
            "name": "Generate Workflow Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "onError": "continueRegularOutput",
            "position": [
                  2220,
                  440
            ],
            "parameters": {
                  "text": "=Your task is to output a modified version of a n8n workflow template so it works with the provided new notion database schema. \n\n\n# new notion database details\n{{ $json.inputDatabase.toJsonString() }}\n\n# n8n workflow template to use as reference\n{{ $json.workflowTemplate.toJsonString() }}\n\nJSON Output:\n- Ensure valid JSON with properly quoted keys and values, no trailing commas, and correctly nested braces `{}` and brackets `[]`. If unable to format, return an error or a valid example.\n- Output linebreaks so user can copy working JSON",
                  "agent": "reActAgent",
                  "options": {
                        "prefix": "You are an n8n expert and understand n8n's workflow JSON Structure. You take n8n workflows and make changes to them based on the user request. \n\nDon't hallucinate. Only output n8n workflow json. \n\n",
                        "returnIntermediateSteps": false
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      },
      {
            "id": "3ac37a66-30d5-404a-8c22-1402874e4f37",
            "name": "Anthropic Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
            "position": [
                  3120,
                  860
            ],
            "parameters": {
                  "options": {
                        "maxTokensToSample": 8192
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "f71ddd6e-7d41-405c-8cd8-bb21fc0654ae",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  1100,
                  480
            ],
            "webhookId": "49dfdc22-b4c8-4ed3-baef-6751ec52f278",
            "parameters": {
                  "public": true,
                  "options": {
                        "title": "🤖 Notion database assistant generator",
                        "subtitle": "Generates an n8n workflow-based AI Agent that can query any arbitrary Notion database. ",
                        "inputPlaceholder": "e.g. https://www.notion.so/n8n/34f67a14195344fda645691c63dc3901",
                        "loadPreviousSession": "manually"
                  },
                  "initialMessages": "Hi there, I can help you make an AI Agent assistant that can query a Notion database.\n\nGenerating the workflow may take a few minutes as I check whether it works and try again if I oopsie.\n\nEnter a notion database URL and I'll output the workflow in JSON that you can paste in to the n8n canvas. \n"
            },
            "typeVersion": 1.1
      },
      {
            "id": "5a549080-0ad0-4f94-87b1-8b735d7b95a3",
            "name": "Valid n8n workflow JSON?",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  3140,
                  700
            ],
            "parameters": {
                  "options": {
                        "systemPromptTemplate": "You are an expert in n8n workflow automation tool. You know whether the json representation of an n8n workflow is valid. \n\nPlease classify the text provided by the user into one of the following categories: {categories}, and use the provided formatting instructions below. Don't explain, and only output the json."
                  },
                  "inputText": "={{ $json.generatedWorkflow }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "invalidJSON",
                                    "description": "Any other workflow JSON"
                              },
                              {
                                    "category": "validJSON",
                                    "description": "A valid n8n workflow JSON"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "02bf6e06-6671-4d18-ba30-117459e9d58a",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  500
            ],
            "parameters": {
                  "color": 7,
                  "width": 614.8565246662145,
                  "height": 416.2640726760381,
                  "content": "## Watch a quick set up video 👇\n[![Notion AI Assistant Generator](https://uploads.n8n.io/devrel/notion-db-assistant-thumb#full-width)](https://youtu.be/iK87ppcaNgM)\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Notion": {
            "main": [
                  [
                        {
                              "node": "standardize schema",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Return error to chat",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set input data": {
            "main": [
                  [
                        {
                              "node": "Generate Workflow Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "standardize schema": {
            "main": [
                  [
                        {
                              "node": "Simplify properties object",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Add feedback prompt": {
            "main": [
                  [
                        {
                              "node": "Set schem for rerun",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set schem for rerun": {
            "main": [
                  [
                        {
                              "node": "Set input data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set schema for eval": {
            "main": [
                  [
                        {
                              "node": "Check for WF JSON errors",
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
                              "node": "Generate Workflow Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Anthropic Chat Model1": {
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
      "Anthropic Chat Model2": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Valid n8n workflow JSON?",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Workflow Agent": {
            "main": [
                  [
                        {
                              "node": "Set schema for eval",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check for WF JSON errors": {
            "main": [
                  [
                        {
                              "node": "Add feedback prompt",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Valid n8n workflow JSON?",
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
      "Valid n8n workflow JSON?": {
            "main": [
                  [
                        {
                              "node": "Set schem for rerun",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Return success to chat",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Auto-fixing Output Parser": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Generate Workflow Agent",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Simplify properties object": {
            "main": [
                  [
                        {
                              "node": "Set input data",
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
                              "node": "Notion",
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
    name: "Notion Knowledge Base AI Assistant",
    nodes: [
      {
            "id": "d1d4291e-fa37-43d0-81e0-f0a594371426",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  680,
                  620
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {
                        "timeout": 25000,
                        "temperature": 0.7
                  }
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
            "id": "68e6805b-9c19-4c9e-a300-8983f2b7c28a",
            "name": "Search notion database",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  980,
                  620
            ],
            "parameters": {
                  "url": "=https://api.notion.com/v1/databases/{{ $json.notionID }}/query",
                  "method": "POST",
                  "jsonBody": "{\n \"filter\": {\n \"or\": [\n {\n \"property\": \"question\",\n \"rich_text\": {\n \"contains\": \"{keyword}\"\n }\n },\n {\n \"property\": \"tags\",\n \"multi_select\": {\n \"contains\": \"{tag}\"\n }\n }\n ]\n },\n \"sorts\": [\n {\n \"property\": \"updated_at\",\n \"direction\": \"ascending\"\n }\n ]\n}",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "toolDescription": "=Use this tool to search the \"\" Notion app database.\n\nIt is structured with question and answer format. \nYou can filter query result by:\n- By keyword\n- filter by tag.\n\nKeyword and Tag have an OR relationship not AND.\n\n",
                  "nodeCredentialType": "notionApi",
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "keyword",
                                    "description": "Searches question of the record. Use one keyword at a time."
                              },
                              {
                                    "name": "tag",
                                    "description": "=Options: {{ $json.tagsOptions }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "gfNp6Jup8rsmFLRr",
                        "name": "max-bot"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "c3164d38-a9fb-4ee3-b6bd-fccb4aa5a1a4",
            "name": "Get database details",
            "type": "n8n-nodes-base.notion",
            "position": [
                  420,
                  380
            ],
            "parameters": {
                  "simple": false,
                  "resource": "database",
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "7ea9697d-4875-441e-b262-1105337d232e",
                        "cachedResultUrl": "https://www.notion.so/7ea9697d4875441eb2621105337d232e",
                        "cachedResultName": "StarLens Company Knowledge Base"
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "gfNp6Jup8rsmFLRr",
                        "name": "max-bot"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "98300243-efcc-4427-88da-c1af8a91ddae",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  820,
                  620
            ],
            "parameters": {
                  "contextWindowLength": 4
            },
            "typeVersion": 1.2
      },
      {
            "id": "a8473f48-1343-4eb2-8e48-ec89377a2a00",
            "name": "Search inside database record",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "notes": " ",
            "position": [
                  1140,
                  620
            ],
            "parameters": {
                  "url": "https://api.notion.com/v1/blocks/{page_id}/children",
                  "fields": "id, type, paragraph.text, heading_1.text, heading_2.text, heading_3.text, bulleted_list_item.text, numbered_list_item.text, to_do.text, children",
                  "dataField": "results",
                  "authentication": "predefinedCredentialType",
                  "fieldsToInclude": "selected",
                  "toolDescription": "=Use this tool to retrieve Notion page content using the page ID. \n\nIt is structured with question and answer format. \nYou can filter query result by:\n- By keyword\n- filter by tag.\n\nKeyword and Tag have an OR relationship not AND.\n\n",
                  "optimizeResponse": true,
                  "nodeCredentialType": "notionApi",
                  "placeholderDefinitions": {
                        "values": [
                              {
                                    "name": "page_id",
                                    "description": "Notion page id from 'Search notion database' tool results"
                              }
                        ]
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "gfNp6Jup8rsmFLRr",
                        "name": "max-bot"
                  }
            },
            "notesInFlow": true,
            "typeVersion": 1.1
      },
      {
            "id": "115c328e-84b0-43d2-8df7-8b3f74cbb2fb",
            "name": "Format schema",
            "type": "n8n-nodes-base.set",
            "position": [
                  620,
                  380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "a8e58791-ba51-46a2-8645-386dd1a0ff6e",
                                    "name": "sessionId",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.sessionId }}"
                              },
                              {
                                    "id": "434209de-39d5-43d8-a964-0fcb7396306c",
                                    "name": "action",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.action }}"
                              },
                              {
                                    "id": "cad4c972-51a9-4e16-a627-b00eea77eb30",
                                    "name": "chatInput",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.chatInput }}"
                              },
                              {
                                    "id": "8e88876c-2714-494d-bd5e-5e80c99f83e3",
                                    "name": "notionID",
                                    "type": "string",
                                    "value": "={{ $('Get database details').item.json.id }}"
                              },
                              {
                                    "id": "a88a15f6-317c-4d2e-9d64-26f5ccaf7a97",
                                    "name": "databaseName",
                                    "type": "string",
                                    "value": "={{ $json.title[0].text.content }}"
                              },
                              {
                                    "id": "7c3bf758-8ed3-469a-8695-6777f4af4fb9",
                                    "name": "tagsOptions",
                                    "type": "string",
                                    "value": "={{ $json.properties.tags.multi_select.options.map(item => item.name).join(',') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "3b82f4fe-6c0c-4e6e-a387-27de31fec758",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -340,
                  240
            ],
            "parameters": {
                  "color": 6,
                  "width": 462.3561535890252,
                  "height": 95.12709218477178,
                  "content": "## Notion knowledge base assistant [v1]\nBuilt as part of the [30 Day AI Sprint](https://30dayaisprint.notion.site/) by [@maxtkacz](https://x.com/maxtkacz)\n"
            },
            "typeVersion": 1
      },
      {
            "id": "31debc55-6608-4e64-be18-1bc0fc0fbf16",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -340,
                  1060
            ],
            "parameters": {
                  "color": 7,
                  "width": 462.3561535890252,
                  "height": 172.4760209818479,
                  "content": "### FAQ\n- In `Get database details` if you see a `The resource you are requesting could not be found` error, you need to add your connection to the database (in the Notion app).\n- The `Get database details` pulls most recent `Tags` and informs AI Agent of them. However this step adds ~250-800ms per run. Watch detailed video to see how to remove this step. "
            },
            "typeVersion": 1
      },
      {
            "id": "9f48e548-f032-477c-960d-9c99d61443df",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  820,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.chatInput }}",
                  "options": {
                        "systemMessage": "=# Role:\nYou are a helpful agent. Query the \"{{ $json.databaseName }}\" Notion database to find relevant records or summarize insights based on multiple records.\n\n# Behavior:\n\nBe clear, very concise, efficient, and accurate in responses. Do not hallucinate.\nIf the request is ambiguous, ask for clarification. Do not embellish, only use facts from the Notion records. Do not offer general advice.\n\n# Error Handling:\n\nIf no matching records are found, try alternative search criteria. Example 1: Laptop, then Computer, then Equipment. Example 2: meetings, then meeting.\nClearly explain any issues with queries (e.g., missing fields or unsupported filters).\n\n# Output:\n\nReturn concise, user-friendly results or summaries.\nFor large sets, show top results by default and offer more if needed. Output URLs in markdown format. \n\nWhen a record has the answer to user question, always output the URL to that page. Do not output links twice."
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "f1274a12-128c-4549-a19b-6bfc3beccd89",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  220,
                  380
            ],
            "webhookId": "b76d02c0-b406-4d21-b6bf-8ad2c623def3",
            "parameters": {
                  "public": true,
                  "options": {
                        "title": "Notion Knowledge Base",
                        "subtitle": ""
                  },
                  "initialMessages": "=Happy {{ $today.weekdayLong }}!\nKnowledge source assistant at your service. How can I help you?"
            },
            "typeVersion": 1.1
      },
      {
            "id": "2e25e4bc-7970-4d00-a757-ba1e418873aa",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -340,
                  360
            ],
            "parameters": {
                  "color": 7,
                  "width": 463.90418399676537,
                  "height": 318.2958135288425,
                  "content": "### Template set up quickstart video 👇\n[![Video Thumbnail](https://uploads.n8n.io/maxt/notion-db-assistant-embedded-thumb.png#full-width)](https://www.youtube.com/watch?v=ynLZwS2Nhnc)\n"
            },
            "typeVersion": 1
      },
      {
            "id": "ba6fe953-fd5c-497f-ac2a-7afa04b7e6cc",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -340,
                  700
            ],
            "parameters": {
                  "color": 7,
                  "width": 461.5634274842711,
                  "height": 332.14098134070576,
                  "content": "### Written set up steps\n1. Add a Notion credential to your n8n workspace (follow [this Notion guide](https://developers.notion.com/docs/create-a-notion-integration))\n2. [Duplicate Company knowledge base Notion template](https://www.notion.so/templates/knowledge-base-ai-assistant-with-n8n) to your Notion workspace, then make sure to share the new knowledge base with connection you created in Step 1. \n3. Add Notion cred to `Get database details`:`Credential to connect with` parameter, then to `Search notion database`:`Notion API` parameter (same for `Search inside database record`)\n4. Add OpenAI credential to `Open AI Chat Model` node (tested and working with Anthropic Claude 3.5 too)\n5. In `Get database details`, select the db you created from Step 2 in `Database` dropdown.\n6. Click `Chat` button to test the workflow. Then Activate it and copy the `Chat URL` from `When chat message received`."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Format schema": {
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
      "Get database details": {
            "main": [
                  [
                        {
                              "node": "Format schema",
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
      "Search notion database": {
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
                              "node": "Get database details",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Search inside database record": {
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
    name: "Prod: Notion to Vector Store - Dimension 768",
    nodes: [
      {
            "id": "6d2579b8-376f-44c3-82e8-9dc608efd98b",
            "name": "Token Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  2200,
                  800
            ],
            "parameters": {
                  "chunkSize": 256,
                  "chunkOverlap": 30
            },
            "typeVersion": 1
      },
      {
            "id": "79b3c147-08ca-4db4-9116-958a868cbfd9",
            "name": "Notion - Page Added Trigger",
            "type": "n8n-nodes-base.notionTrigger",
            "position": [
                  1080,
                  360
            ],
            "parameters": {
                  "simple": false,
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  },
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "17b11930-c10f-8000-a545-ece7cade03f9",
                        "cachedResultUrl": "https://www.notion.so/17b11930c10f8000a545ece7cade03f9",
                        "cachedResultName": "Embeddings"
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "oktwaKqpFztx5hYX",
                        "name": "Auto: Notion"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e4a6f524-e3f5-4d02-949a-8523f2d21965",
            "name": "Notion - Retrieve Page Content",
            "type": "n8n-nodes-base.notion",
            "position": [
                  1300,
                  360
            ],
            "parameters": {
                  "blockId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "={{ $json.url }}"
                  },
                  "resource": "block",
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "notionApi": {
                        "id": "oktwaKqpFztx5hYX",
                        "name": "Auto: Notion"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "bfebc173-8d4b-4f8f-a625-4622949dd545",
            "name": "Filter Non-Text Content",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1520,
                  360
            ],
            "parameters": {
                  "options": {},
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
                                    "id": "e5b605e5-6d05-4bca-8f19-a859e474620f",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEquals"
                                    },
                                    "leftValue": "={{ $json.type }}",
                                    "rightValue": "image"
                              },
                              {
                                    "id": "c7415859-5ffd-4c78-b497-91a3d6303b6f",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEquals"
                                    },
                                    "leftValue": "={{ $json.type }}",
                                    "rightValue": "video"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "b04939f9-355a-430b-a069-b11800066313",
            "name": "Summarize - Concatenate Notion's blocks content",
            "type": "n8n-nodes-base.summarize",
            "position": [
                  1780,
                  360
            ],
            "parameters": {
                  "options": {
                        "outputFormat": "separateItems"
                  },
                  "fieldsToSummarize": {
                        "values": [
                              {
                                    "field": "content",
                                    "separateBy": "\n",
                                    "aggregation": "concatenate"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0e64dbb5-20c1-4b90-b818-a1726aaf5112",
            "name": "Create metadata and load content",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  2180,
                  600
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "pageId",
                                          "value": "={{ $('Notion - Page Added Trigger').item.json.id }}"
                                    },
                                    {
                                          "name": "createdTime",
                                          "value": "={{ $('Notion - Page Added Trigger').item.json.created_time }}"
                                    },
                                    {
                                          "name": "pageTitle",
                                          "value": "={{ $('Notion - Page Added Trigger').item.json.properties.Name.title[0].text.content }}"
                                    }
                              ]
                        }
                  },
                  "jsonData": "={{ $json.concatenated_content }}",
                  "jsonMode": "expressionData"
            },
            "typeVersion": 1
      },
      {
            "id": "1f93c3e6-2d53-46b4-9ce9-1350e660ba82",
            "name": "Embeddings Google Gemini",
            "type": "@n8n/n8n-nodes-langchain.embeddingsGoogleGemini",
            "position": [
                  1940,
                  580
            ],
            "parameters": {
                  "modelName": "models/text-embedding-004"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "9idxGZRZ3BAKDoxq",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b804b3fc-161c-40c1-ad9c-3022a09c4a0a",
            "name": "Pinecone Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "position": [
                  2060,
                  360
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "pineconeIndex": {
                        "__rl": true,
                        "mode": "list",
                        "value": "notion-pages",
                        "cachedResultName": "notion-pages"
                  }
            },
            "credentials": {
                  "pineconeApi": {
                        "id": "R3QGXSEIRTEAZttK",
                        "name": "Auto: PineconeApi"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Token Splitter": {
            "ai_textSplitter": [
                  [
                        {
                              "node": "Create metadata and load content",
                              "type": "ai_textSplitter",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter Non-Text Content": {
            "main": [
                  [
                        {
                              "node": "Summarize - Concatenate Notion's blocks content",
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
                              "node": "Pinecone Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Notion - Page Added Trigger": {
            "main": [
                  [
                        {
                              "node": "Notion - Retrieve Page Content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Notion - Retrieve Page Content": {
            "main": [
                  [
                        {
                              "node": "Filter Non-Text Content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create metadata and load content": {
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
      "Summarize - Concatenate Notion's blocks content": {
            "main": [
                  [
                        {
                              "node": "Pinecone Vector Store",
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
    name: "Store Notion's Pages as Vector Documents into Supabase with OpenAI",
    nodes: [
      {
            "id": "495609cd-4ca0-426d-8413-69e771398188",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  480,
                  400
            ],
            "parameters": {
                  "width": 637.1327972412109,
                  "height": 1113.7434387207031,
                  "content": "## Store Notion's Pages as Vector Documents into Supabase\n\n**This workflow assumes you have a Supabase project with a table that has a vector column. If you don't have it, follow the instructions here:** [Supabase Vector Columns Guide](https://supabase.com/docs/guides/ai/vector-columns)\n\n## Workflow Description\n\nThis workflow automates the process of storing Notion pages as vector documents in a Supabase database with a vector column. The steps are as follows:\n\n1. **Notion Page Added Trigger**:\n - Monitors a specified Notion database for newly added pages. You can create a specific Notion database where you copy the pages you want to store in Supabase.\n - Node: `Page Added in Notion Database`\n\n2. **Retrieve Page Content**:\n - Fetches all block content from the newly added Notion page.\n - Node: `Get Blocks Content`\n\n3. **Filter Non-Text Content**:\n - Excludes blocks of type \"image\" and \"video\" to focus on textual content.\n - Node: `Filter - Exclude Media Content`\n\n4. **Summarize Content**:\n - Concatenates the Notion blocks content to create a single text for embedding.\n - Node: `Summarize - Concatenate Notion's blocks content`\n\n5. **Store in Supabase**:\n - Stores the processed documents and their embeddings into a Supabase table with a vector column.\n - Node: `Store Documents in Supabase`\n\n6. **Generate Embeddings**:\n - Utilizes OpenAI's API to generate embeddings for the textual content.\n - Node: `Generate Text Embeddings`\n\n\n7. **Create Metadata and Load Content**:\n - Loads the block content and creates associated metadata, such as page ID and block ID.\n - Node: `Load Block Content & Create Metadata`\n\n8. **Split Content into Chunks**:\n - Divides the text into smaller chunks for easier processing and embedding generation.\n - Node: `Token Splitter`\n\n\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "3f3e65dc-2b26-407c-87e5-52ba3b315fed",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  2200,
                  760
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "6d2579b8-376f-44c3-82e8-9dc608efd98b",
            "name": "Token Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  2340,
                  960
            ],
            "parameters": {
                  "chunkSize": 256,
                  "chunkOverlap": 30
            },
            "typeVersion": 1
      },
      {
            "id": "79b3c147-08ca-4db4-9116-958a868cbfd9",
            "name": "Notion - Page Added Trigger",
            "type": "n8n-nodes-base.notionTrigger",
            "position": [
                  1180,
                  520
            ],
            "parameters": {
                  "simple": false,
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  },
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "",
                        "cachedResultUrl": "",
                        "cachedResultName": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e4a6f524-e3f5-4d02-949a-8523f2d21965",
            "name": "Notion - Retrieve Page Content",
            "type": "n8n-nodes-base.notion",
            "position": [
                  1400,
                  520
            ],
            "parameters": {
                  "blockId": {
                        "__rl": true,
                        "mode": "url",
                        "value": "={{ $json.url }}"
                  },
                  "resource": "block",
                  "operation": "getAll",
                  "returnAll": true
            },
            "typeVersion": 2.2
      },
      {
            "id": "bfebc173-8d4b-4f8f-a625-4622949dd545",
            "name": "Filter Non-Text Content",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1620,
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
                                    "id": "e5b605e5-6d05-4bca-8f19-a859e474620f",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEquals"
                                    },
                                    "leftValue": "={{ $json.type }}",
                                    "rightValue": "image"
                              },
                              {
                                    "id": "c7415859-5ffd-4c78-b497-91a3d6303b6f",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEquals"
                                    },
                                    "leftValue": "={{ $json.type }}",
                                    "rightValue": "video"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "b04939f9-355a-430b-a069-b11800066313",
            "name": "Summarize - Concatenate Notion's blocks content",
            "type": "n8n-nodes-base.summarize",
            "position": [
                  1920,
                  520
            ],
            "parameters": {
                  "options": {
                        "outputFormat": "separateItems"
                  },
                  "fieldsToSummarize": {
                        "values": [
                              {
                                    "field": "content",
                                    "separateBy": "\n",
                                    "aggregation": "concatenate"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0e64dbb5-20c1-4b90-b818-a1726aaf5112",
            "name": "Create metadata and load content",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  2320,
                  760
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "pageId",
                                          "value": "={{ $('Notion - Page Added Trigger').item.json.id }}"
                                    },
                                    {
                                          "name": "createdTime",
                                          "value": "={{ $('Notion - Page Added Trigger').item.json.created_time }}"
                                    },
                                    {
                                          "name": "pageTitle",
                                          "value": "={{ $('Notion - Page Added Trigger').item.json.properties.Page.title[0].text.content }}"
                                    }
                              ]
                        }
                  },
                  "jsonData": "={{ $('Summarize - Concatenate Notion's blocks content').item.json.concatenated_content }}",
                  "jsonMode": "expressionData"
            },
            "typeVersion": 1
      },
      {
            "id": "187aba6f-eaed-4427-8d40-b9da025fb37d",
            "name": "Supabase Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  2200,
                  520
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "",
                        "cachedResultName": ""
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Token Splitter": {
            "ai_textSplitter": [
                  [
                        {
                              "node": "Create metadata and load content",
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
                              "node": "Supabase Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter Non-Text Content": {
            "main": [
                  [
                        {
                              "node": "Summarize - Concatenate Notion's blocks content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Notion - Page Added Trigger": {
            "main": [
                  [
                        {
                              "node": "Notion - Retrieve Page Content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Notion - Retrieve Page Content": {
            "main": [
                  [
                        {
                              "node": "Filter Non-Text Content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create metadata and load content": {
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
      "Summarize - Concatenate Notion's blocks content": {
            "main": [
                  [
                        {
                              "node": "Supabase Vector Store",
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
    name: "mails2notion V2",
    nodes: [
      {
            "id": "3f649e97-e568-47ff-b175-bf63d859d95f",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2560,
                  240
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
                        "id": "mrgqM64cM1L88xC6",
                        "name": "octionicsolutions@gmail.com"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "bd60c65f-ba6c-4dcb-8d09-b29f5dd475b7",
            "name": "Calculator",
            "type": "@n8n/n8n-nodes-langchain.toolCalculator",
            "disabled": true,
            "position": [
                  2700,
                  240
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "d052786a-92a0-4f9b-9867-2dd64ada8034",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  2820,
                  240
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n \"summary\": \"Text\",\n \"meta\": {\n \"sender\": \"Text\",\n \"subject\": \"Text\",\n \"date\": \"Text\"\n }\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "50d396fd-d3b0-4fea-99d7-18bd4773cb20",
            "name": "Add Label \"Processed\"",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  3860,
                  20
            ],
            "parameters": {
                  "labelIds": "={{ $('Globals').item.json.processedLabelID }}",
                  "messageId": "={{ $('Gmail Trigger').item.json.id }}",
                  "operation": "addLabels"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "9LLNsPzyDJlQFgdw",
                        "name": "Gmail (mails2notion)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "8a4c49f9-0c14-46ea-a475-a0d83eb9d688",
            "name": "Active Routes Only",
            "type": "n8n-nodes-base.filter",
            "position": [
                  2000,
                  20
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
                                    "id": "02b11920-e737-46cc-b1b9-22ffaf7f3f64",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "true",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.Active }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "fd0f902f-4d16-4bad-8ed0-7fe02e8e879b",
            "name": "Extract Route ID",
            "type": "n8n-nodes-base.set",
            "position": [
                  1560,
                  220
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "acfaf63a-74de-4018-ae30-671f209878ba",
                                    "name": "route",
                                    "type": "string",
                                    "value": "={{ $('Gmail Trigger').item.json.to.text.match(/\\+([^@]+)@/)[1] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "81d1dec6-aacc-480d-8cb4-1832ff27de92",
            "name": "Deactivate Route",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  3420,
                  220
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appuqZhHVVGAcMwoA",
                        "cachedResultUrl": "https://airtable.com/appuqZhHVVGAcMwoA",
                        "cachedResultName": "mails2notion"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblWL6FqfLkLHmLEo",
                        "cachedResultUrl": "https://airtable.com/appuqZhHVVGAcMwoA/tblWL6FqfLkLHmLEo",
                        "cachedResultName": "Routes"
                  },
                  "columns": {
                        "value": {
                              "id": "={{ $('Get Route by ID').item.json.id }}",
                              "Active": false
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
                                    "id": "Token",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Token",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "NotionDatabase",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "NotionDatabase",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Email Alias",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "Email Alias",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "User",
                                    "type": "array",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "User",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Active",
                                    "type": "boolean",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Active",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Status",
                                    "type": "string",
                                    "display": true,
                                    "removed": true,
                                    "readOnly": true,
                                    "required": false,
                                    "displayName": "Status",
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
                        "id": "kHzLZhbAFQ1CQnQz",
                        "name": "Airtable (octionicsolutions)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "20242505-c57e-424c-a215-2b2effac1d94",
            "name": "Add Label \"Error\"",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  3860,
                  220
            ],
            "parameters": {
                  "labelIds": "={{ $('Globals').item.json.errorLabelID }}",
                  "messageId": "={{ $('Gmail Trigger').item.json.id }}",
                  "operation": "addLabels"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "9LLNsPzyDJlQFgdw",
                        "name": "Gmail (mails2notion)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "7a788a4f-f0a8-4fe8-b21d-b114a65313b1",
            "name": "Send notification about deactivated route",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  3640,
                  220
            ],
            "parameters": {
                  "sendTo": "={{ $('Gmail Trigger').item.json.from.value[0].address }}",
                  "message": "=An error happened while trying to create a Notion Page. It can have various reasons, including a temporary outage of the Notion API, missing permissions to the Notion Database or a wrong Notion Database URL.\n\nThe route has been deaktivated to prevent future errors.\n\nPlease double check your configuration and enable the route again.",
                  "options": {
                        "appendAttribution": false
                  },
                  "subject": "A route has been deactivated",
                  "emailType": "text"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "9LLNsPzyDJlQFgdw",
                        "name": "Gmail (mails2notion)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "5e7cc69c-8f58-4ac8-9263-1ad206609295",
            "name": "Send notification about missing route",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  3640,
                  420
            ],
            "parameters": {
                  "sendTo": "={{ $('Gmail Trigger').item.json.from.value[0].address }}",
                  "message": "=There seems to be no active route anymore which connects this Alias to a Notion Database.\n\nPlease try again later or double check your configuration.",
                  "options": {
                        "appendAttribution": false
                  },
                  "subject": "Your Message could not be processed",
                  "emailType": "text"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "9LLNsPzyDJlQFgdw",
                        "name": "Gmail (mails2notion)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "7dd9646c-3172-4b53-82c8-4df7fd5f53ea",
            "name": "Get Route by ID",
            "type": "n8n-nodes-base.airtable",
            "onError": "continueErrorOutput",
            "position": [
                  1780,
                  220
            ],
            "parameters": {
                  "id": "={{ $json.route }}",
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appuqZhHVVGAcMwoA",
                        "cachedResultUrl": "https://airtable.com/appuqZhHVVGAcMwoA",
                        "cachedResultName": "mails2notion"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblWL6FqfLkLHmLEo",
                        "cachedResultUrl": "https://airtable.com/appuqZhHVVGAcMwoA/tblWL6FqfLkLHmLEo",
                        "cachedResultName": "Routes"
                  },
                  "options": {},
                  "operation": "get"
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "kHzLZhbAFQ1CQnQz",
                        "name": "Airtable (octionicsolutions)"
                  }
            },
            "retryOnFail": true,
            "typeVersion": 2.1,
            "waitBetweenTries": 5000
      },
      {
            "id": "8ddfe273-3fda-4b71-a972-5001d4fa71c1",
            "name": "Create Notion Page",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueErrorOutput",
            "position": [
                  3200,
                  20
            ],
            "parameters": {
                  "url": "https://api.notion.com/v1/pages",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={{ $json.toJsonString() }}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "=Bearer {{ $('Get Route by ID').item.json.Token }}"
                              },
                              {
                                    "name": "Notion-Version",
                                    "value": "2022-06-28"
                              }
                        ]
                  }
            },
            "retryOnFail": true,
            "typeVersion": 4.2,
            "waitBetweenTries": 5000
      },
      {
            "id": "f773e41f-13b7-483a-9886-90a4425a7f6a",
            "name": "Gmail Trigger",
            "type": "n8n-nodes-base.gmailTrigger",
            "position": [
                  900,
                  220
            ],
            "parameters": {
                  "simple": false,
                  "filters": {
                        "labelIds": "=INBOX"
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
                        "id": "9LLNsPzyDJlQFgdw",
                        "name": "Gmail (mails2notion)"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "918ce27c-2886-4793-81f5-e459f3299bb1",
            "name": "Filter for unprocessed mails",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1340,
                  220
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
                                    "id": "28879541-2e66-4a31-b25f-f0419ae45f47",
                                    "operator": {
                                          "type": "array",
                                          "operation": "notContains",
                                          "rightType": "any"
                                    },
                                    "leftValue": "={{ $('Gmail Trigger').item.json.labelIds }}",
                                    "rightValue": "={{ $json.errorLabelID }}"
                              },
                              {
                                    "id": "259a783f-5954-467b-ad52-c1e0072c2239",
                                    "operator": {
                                          "type": "array",
                                          "operation": "notContains",
                                          "rightType": "any"
                                    },
                                    "leftValue": "={{ $('Gmail Trigger').item.json.labelIds }}",
                                    "rightValue": "={{ $json.processedLabelID }}"
                              },
                              {
                                    "id": "81ef1ac2-449e-44c2-a94b-2fc9b08ec934",
                                    "operator": {
                                          "type": "string",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $('Gmail Trigger').item.json.to.text.match(/\\+([^@]+)@/)[1] }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "14764527-ca40-4937-baa2-368b716c6f58",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "disabled": true,
            "position": [
                  920,
                  600
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "5f955606-4063-4683-b242-2fc0a4fbf34a",
            "name": "Required labels",
            "type": "n8n-nodes-base.filter",
            "position": [
                  1360,
                  600
            ],
            "parameters": {
                  "options": {},
                  "conditions": {
                        "options": {
                              "leftValue": "",
                              "caseSensitive": true,
                              "typeValidation": "strict"
                        },
                        "combinator": "or",
                        "conditions": [
                              {
                                    "id": "9bb51a86-76d3-42f7-8362-1931244f8cd9",
                                    "operator": {
                                          "type": "string",
                                          "operation": "contains"
                                    },
                                    "leftValue": "={{ $json.name }}",
                                    "rightValue": "Error"
                              },
                              {
                                    "id": "28b3afb4-d727-4306-9e45-321c9bd688e3",
                                    "operator": {
                                          "type": "string",
                                          "operation": "contains"
                                    },
                                    "leftValue": "={{ $json.name }}",
                                    "rightValue": "Processed"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "697198d3-2fc2-4665-86a8-4bc16dbc3d43",
            "name": "Globals",
            "type": "n8n-nodes-base.set",
            "position": [
                  1120,
                  220
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "0dcfba61-ddb5-425d-a803-f88cf36d81d9",
                                    "name": "errorLabelID",
                                    "type": "string",
                                    "value": "Label_4248329647975725750"
                              },
                              {
                                    "id": "b1505eaa-1d7e-49d7-be2e-cd71f5ec2632",
                                    "name": "processedLabelID",
                                    "type": "string",
                                    "value": "Label_6498950601707174088"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "b7efe665-97d8-4a82-a3f5-e15bffd68752",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  840,
                  420
            ],
            "parameters": {
                  "color": 5,
                  "width": 742.4418604651174,
                  "height": 361.9189248985609,
                  "content": "## Setup\n- Disable the Gmail Trigger and enable the manual trigger here\n- Execute the workflow once\n- Copy the Gmail Label IDs from the output of the \"Required labels\" node to the \"Globals\" node\n- Disable the manual trigger here and and enable the Gmail Trigger again\n- Activate the workflow, so it runs automatically in the background\n"
            },
            "typeVersion": 1
      },
      {
            "id": "3d035d35-3760-4393-8796-cb713338c9d7",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1060,
                  60
            ],
            "parameters": {
                  "width": 215.20930232558143,
                  "height": 323.99999999999943,
                  "content": "## Set Globals\nUse the setup instructions below to retrieve the values for both `errorLabelID` and `processedLabelID`"
            },
            "typeVersion": 1
      },
      {
            "id": "b420310e-c0d5-4168-94ad-4c5973dfb3ab",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1720,
                  60
            ],
            "parameters": {
                  "width": 215.49263552738452,
                  "height": 324.4244486294891,
                  "content": "## Select Base\nSelect the database and the table where the \"Routes\" are defined"
            },
            "typeVersion": 1
      },
      {
            "id": "c917a3cb-d745-4f37-bd8f-0350c5aef473",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  840,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 245.005504426549,
                  "content": "The Gmail inbox is checked every minute for new entries"
            },
            "typeVersion": 1
      },
      {
            "id": "9298ad5b-ae09-44c6-8da4-2d2bd473c3ea",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1500,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 245.005504426549,
                  "content": "Extract the Airtable Row ID from the Email address"
            },
            "typeVersion": 1
      },
      {
            "id": "654bbfbe-3e0f-40e0-a686-5081069d825e",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1280,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 245.005504426549,
                  "content": "Filter by labels to prohibit double-processing"
            },
            "typeVersion": 1
      },
      {
            "id": "31ade897-22de-4b39-8f96-37bc7b274bfb",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2920,
                  -120
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 305.2192252594149,
                  "content": "Dynamically build request body for Notion, since dynamic auth, and content with optional fields require a custom request"
            },
            "typeVersion": 1
      },
      {
            "id": "26cf52ea-01d1-48ed-9d3d-71e4ff01983f",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3140,
                  -120
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 304.5973623748489,
                  "content": "The custom built request including the user specific authentication is sent to Notion to create a new Page inside of a database"
            },
            "typeVersion": 1
      },
      {
            "id": "d765c84d-9e15-44c8-b975-2c366c315bfe",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2160,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 755.8332895195936,
                  "height": 529.1698390841688,
                  "content": "The Email is processed in multiple ways:\n- An actionable task is being generated based on the content, consisting of a short title, a short description and optionally a few details as bullet points\n- A detailed Email summary is being generated\n- Meta data is being extracted - so the user has a reference to find the original Email again\n- To get more stable results, the tasks are devided between two Agents"
            },
            "typeVersion": 1
      },
      {
            "id": "0103f8bc-2a43-455a-88da-b7317821f0b3",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1940,
                  -80
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 249.09934448053562,
                  "content": "Skip disabled routes (determined by a checkbox attribute in Airtable)"
            },
            "typeVersion": 1
      },
      {
            "id": "1d2fe867-f3d1-4702-b35e-f730f20b7251",
            "name": "No Operation, do nothing",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  2000,
                  420
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "758d1797-0e6c-40de-a6a4-e16f8350674c",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3580,
                  100
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 503.00412949500975,
                  "content": "Send custom Email notifications back to sender, containing an error message and suggestions to fix it"
            },
            "typeVersion": 1
      },
      {
            "id": "56522a6d-c961-48a5-a5ef-33df96d77a22",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3800,
                  -60
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 446.3164817463921,
                  "content": "Add labels which prevent from double-processing"
            },
            "typeVersion": 1
      },
      {
            "id": "5b81389b-49a6-4849-becf-35c4e680b734",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3360,
                  120
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 261.3816681594028,
                  "content": "Disable a checkbox attribute in Airtable which determines if a route is active"
            },
            "typeVersion": 1
      },
      {
            "id": "6558328c-30cf-4f37-a0cb-d5f9f6efa7b2",
            "name": "Format Notion Page Blocks",
            "type": "n8n-nodes-base.code",
            "position": [
                  2980,
                  20
            ],
            "parameters": {
                  "mode": "runOnceForEachItem",
                  "jsCode": "function paragraph(content, annotations={}) {\n return {\n \"object\": \"block\",\n \"type\": \"paragraph\",\n \"paragraph\": {\n \"rich_text\": [\n {\n \"type\": \"text\",\n \"text\": {\n \"content\": content\n },\n \"annotations\": annotations\n }\n ]\n }\n };\n}\nfunction bulletPoint(content) {\n return {\n \"object\": \"block\",\n \"type\": \"bulleted_list_item\",\n \"bulleted_list_item\": {\n \"rich_text\": [\n {\n \"type\": \"text\",\n \"text\": {\n \"content\": content\n }\n }\n ]\n }\n };\n}\n\n// combine AI generated content\nconst content = Object.assign({}, $('Generate Actionable Task').item.json.output, $('Get Summary & Meta Data').item.json.output);\n\nblocks = [];\n\n// append task description\nblocks.push(paragraph(content.description));\n\nif (content.bulletpoints) {\n for (let bulletpoint of content.bulletpoints) {\n blocks.push(bulletPoint(bulletpoint));\n }\n}\n\n// append empty line\nblocks.push(paragraph(\"\"));\n\n// append devider\nblocks.push({\n \"object\": \"block\",\n \"type\": \"divider\",\n \"divider\": {}\n});\n\n// append summary & meta data\nblocks.push(paragraph(\"Email summary:\"));\nblocks.push(paragraph(content.summary));\nblocks.push(paragraph(\"\"));\nblocks.push(paragraph(content.meta.sender + \"\\n\" + content.meta.subject + \"\\n\" + content.meta.date, {\"italic\": true}));\n\n// build final object\noutput = {\n \"parent\": {\n \"database_id\": $('Get Route by ID').item.json.NotionDatabase.match(/https:\\/\\/www\\.notion\\.so\\/[a-zA-Z0-9-]+\\/([a-zA-Z0-9]{32})/)[1]\n },\n \"properties\": {\n \"Name\": {\n \"title\": [\n {\n \"text\": {\n \"content\": content.title\n }\n }\n ]\n }\n },\n \"children\": blocks\n};\n\nreturn { json: output };"
            },
            "typeVersion": 2
      },
      {
            "id": "133e3498-10ce-4a08-aa50-3c7d56f1b9c8",
            "name": "Get all labels",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1140,
                  600
            ],
            "parameters": {
                  "resource": "label",
                  "returnAll": true
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "9LLNsPzyDJlQFgdw",
                        "name": "Gmail (mails2notion)"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "f68e66e1-9f84-498a-bfc4-f7c5b2ca42b1",
            "name": "Structured Output Parser1",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  2440,
                  240
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n \"title\": \"Title\",\n \"description\": \"Text\",\n \"bulletpoints\": [\n \"Text\",\n \"Text\"\n ]\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "c55a3e9b-5637-4775-a0a6-ea11f1bd26a7",
            "name": "Calculator1",
            "type": "@n8n/n8n-nodes-langchain.toolCalculator",
            "disabled": true,
            "position": [
                  2320,
                  240
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "4d4f7b04-5431-47d2-b9b1-ee2c516e729c",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2180,
                  240
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
                        "id": "mrgqM64cM1L88xC6",
                        "name": "octionicsolutions@gmail.com"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "ea081c31-2721-4e6c-820a-2f0da33495ac",
            "name": "Generate Actionable Task",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2220,
                  20
            ],
            "parameters": {
                  "text": "={{ $('Gmail Trigger').item.json.text }}",
                  "options": {
                        "systemMessage": "Your task is to understand the Email content and extract one actionable task. If there is no obvious actionable task, then just create a title which implies to take a look at this Email by addressing the content summarized to 5 words. The title should be quite decided. This attribute is called title.\n\nCreate a proper description for the task. Be precise but detailed. Start with a short sentence and if it is worth adding more information, add bulletpoints after that containing additional information which help to understand the context of the task better, like links and other references, or just more detailed instructions. Add the description to the output as attribute output. Add the bulletpoints to the output as attribute output, but remember, bullet points are optional.\n\nReturn all attributes in a JSON format."
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      },
      {
            "id": "6fb2d964-dc0b-45d9-8307-6da16fba769e",
            "name": "Get Summary & Meta Data",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2600,
                  20
            ],
            "parameters": {
                  "text": "={{ $('Gmail Trigger').item.json.text }}",
                  "options": {
                        "systemMessage": "Summarize the email (as much detail as possible) and add it to the output as the attribute summary.\n\nExtract the email sender, subject and date of receipt. If this is a forwarded email, then get this data from the original message, otherwise use the meta data of this Email. Format the Email Adress as follows, and add it to the JSON output as the attribute meta.sender: \"From: Full Name <mail@example.com\". Format the the subject as follows and add it to the output as attribute meta.subject: \"Subject: SubjectGoesHere\". Format the the date as follows and add it to the output as attribute meta.date: \"Date: DateStringGoesHere\" (Date format: RFC 2822).\n\nReturn all attributes in a JSON format."
                  },
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.6
      }
],
    connections: {
      "Globals": {
            "main": [
                  [
                        {
                              "node": "Filter for unprocessed mails",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Calculator": {
            "ai_tool": [
                  [
                        {
                              "node": "Get Summary & Meta Data",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Calculator1": {
            "ai_tool": [
                  [
                        {
                              "node": "Generate Actionable Task",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Gmail Trigger": {
            "main": [
                  [
                        {
                              "node": "Globals",
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
                              "node": "Required labels",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Route by ID": {
            "main": [
                  [
                        {
                              "node": "Active Routes Only",
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
      "Deactivate Route": {
            "main": [
                  [
                        {
                              "node": "Send notification about deactivated route",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Route ID": {
            "main": [
                  [
                        {
                              "node": "Get Route by ID",
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
                              "node": "Get Summary & Meta Data",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Active Routes Only": {
            "main": [
                  [
                        {
                              "node": "Generate Actionable Task",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create Notion Page": {
            "main": [
                  [
                        {
                              "node": "Add Label \"Processed\"",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Deactivate Route",
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
                              "node": "Generate Actionable Task",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Summary & Meta Data": {
            "main": [
                  [
                        {
                              "node": "Format Notion Page Blocks",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Actionable Task": {
            "main": [
                  [
                        {
                              "node": "Get Summary & Meta Data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "No Operation, do nothing": {
            "main": [
                  [
                        {
                              "node": "Send notification about missing route",
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
                              "node": "Get Summary & Meta Data",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format Notion Page Blocks": {
            "main": [
                  [
                        {
                              "node": "Create Notion Page",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Structured Output Parser1": {
            "ai_outputParser": [
                  [
                        {
                              "node": "Generate Actionable Task",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter for unprocessed mails": {
            "main": [
                  [
                        {
                              "node": "Extract Route ID",
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
                              "node": "Get all labels",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send notification about missing route": {
            "main": [
                  [
                        {
                              "node": "Add Label \"Error\"",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send notification about deactivated route": {
            "main": [
                  [
                        {
                              "node": "Add Label \"Error\"",
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
    name: "RAG on living data",
    nodes: [
      {
            "id": "49086cdf-a38c-4cb8-9be9-d3e6ea5bdde5",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  1740,
                  1040
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "X7Jf0zECd3IkQdSw",
                        "name": "OpenAi (octionicsolutions)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "f0670721-92f4-422a-99c9-f9c2aa6fe21f",
            "name": "Token Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  2380,
                  540
            ],
            "parameters": {
                  "chunkSize": 500
            },
            "typeVersion": 1
      },
      {
            "id": "fe80ecac-4f79-4b07-ad8e-60ab5f980cba",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  1180,
                  -200
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "81b79248-08e8-4214-872b-1796e51ad0a4",
            "name": "Question and Answer Chain",
            "type": "@n8n/n8n-nodes-langchain.chainRetrievalQa",
            "position": [
                  744,
                  495
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.3
      },
      {
            "id": "e78f7b63-baef-4834-8f1b-aecfa9102d6c",
            "name": "Vector Store Retriever",
            "type": "@n8n/n8n-nodes-langchain.retrieverVectorStore",
            "position": [
                  844,
                  715
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "1d5ffbd0-b2cf-4660-a291-581d18608ecd",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  704,
                  715
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "X7Jf0zECd3IkQdSw",
                        "name": "OpenAi (octionicsolutions)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "37a3063f-aa21-4347-a72f-6dd316c58366",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  524,
                  495
            ],
            "webhookId": "74479a54-418f-4de2-b70d-cfb3e3fdd5a7",
            "parameters": {
                  "public": true,
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "5924bc01-1694-4b5c-8a06-7c46ee4c6425",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  520,
                  -200
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
            "typeVersion": 1.2
      },
      {
            "id": "5067eda6-8bbe-407a-a6af-93e81be53661",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  0
            ],
            "parameters": {
                  "width": 329.16412916774584,
                  "height": 312.52803480051045,
                  "content": "## Switch trigger (optional)\nIf you are on the cloud plan, consider switching to the Notion Trigger Node instead, to save on executions."
            },
            "typeVersion": 1
      },
      {
            "id": "33458828-484d-426b-a3d1-974a81c6162e",
            "name": "Limit",
            "type": "n8n-nodes-base.limit",
            "position": [
                  1620,
                  -60
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "4d39503a-378e-4942-a5d4-8c62785aac44",
            "name": "Limit1",
            "type": "n8n-nodes-base.limit",
            "position": [
                  2660,
                  -60
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0e0b1391-3fe5-4d80-a2eb-a2483b79d9a6",
            "name": "Delete old embeddings if exist",
            "type": "n8n-nodes-base.supabase",
            "position": [
                  1400,
                  -60
            ],
            "parameters": {
                  "tableId": "documents",
                  "operation": "delete",
                  "filterType": "string",
                  "filterString": "=metadata->>id=eq.{{ $('Input Reference').item.json.id }}"
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "DjIb4HMTYXhTU8Uc",
                        "name": "Supabase (VectorStore)"
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": true
      },
      {
            "id": "4a8614e4-0a53-4731-bc68-57505d7d0a09",
            "name": "Get page blocks",
            "type": "n8n-nodes-base.notion",
            "position": [
                  1840,
                  -60
            ],
            "parameters": {
                  "blockId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Input Reference').item.json.id }}"
                  },
                  "resource": "block",
                  "operation": "getAll",
                  "returnAll": true,
                  "fetchNestedBlocks": true
            },
            "credentials": {
                  "notionApi": {
                        "id": "ObmaBA0dJss3JJPv",
                        "name": "Notion (octionicsolutions / Test)"
                  }
            },
            "executeOnce": true,
            "typeVersion": 2.2
      },
      {
            "id": "8c922895-49d6-4778-8356-6f6cf49e5420",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  2300,
                  260
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "id",
                                          "value": "={{ $('Input Reference').item.json.id }}"
                                    },
                                    {
                                          "name": "name",
                                          "value": "={{ $('Input Reference').item.json.name }}"
                                    }
                              ]
                        }
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "8ad7ff2e-4bc2-4821-ae03-bab2dc11d947",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2220,
                  400
            ],
            "parameters": {
                  "width": 376.2098538932132,
                  "height": 264.37628764336097,
                  "content": "## Adjust chunk size and overlap\nFor more accurate search results, increase the overlap. For the *text-embedding-ada-002* model the chunk size plus overlap must not exceed 8191"
            },
            "typeVersion": 1
      },
      {
            "id": "8078d59a-f45f-4e96-a8ec-6c2f1c328e84",
            "name": "Input Reference",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  960,
                  -200
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "aae6c517-a316-40e3-aee9-1cc4b448689f",
            "name": "Notion Trigger",
            "type": "n8n-nodes-base.notionTrigger",
            "disabled": true,
            "position": [
                  740,
                  120
            ],
            "parameters": {
                  "event": "pagedUpdatedInDatabase",
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyMinute"
                              }
                        ]
                  },
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "ec6dc7b4-9ce0-47f7-8025-ef09295999fd",
                        "cachedResultUrl": "https://www.notion.so/ec6dc7b49ce047f78025ef09295999fd",
                        "cachedResultName": "Knowledge Base"
                  }
            },
            "credentials": {
                  "notionApi": {
                        "id": "ObmaBA0dJss3JJPv",
                        "name": "Notion (octionicsolutions / Test)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "3a43d66d-d4e3-4ca1-aee9-85ac65160e45",
            "name": "Get updated pages",
            "type": "n8n-nodes-base.notion",
            "position": [
                  740,
                  -200
            ],
            "parameters": {
                  "filters": {
                        "conditions": [
                              {
                                    "key": "Last edited time|last_edited_time",
                                    "condition": "equals",
                                    "lastEditedTime": "={{ $now.minus(1, 'minutes').toISO() }}"
                              }
                        ]
                  },
                  "options": {},
                  "resource": "databasePage",
                  "operation": "getAll",
                  "databaseId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "ec6dc7b4-9ce0-47f7-8025-ef09295999fd",
                        "cachedResultUrl": "https://www.notion.so/ec6dc7b49ce047f78025ef09295999fd",
                        "cachedResultName": "Knowledge Base"
                  },
                  "filterType": "manual"
            },
            "credentials": {
                  "notionApi": {
                        "id": "ObmaBA0dJss3JJPv",
                        "name": "Notion (octionicsolutions / Test)"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "bbf1296f-4e2b-4a38-bdf3-ae2b63cc7774",
            "name": "Sticky Note23",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  900,
                  -300
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "This placeholder serves as a reference point so it is easier to swap the data source with a different service"
            },
            "typeVersion": 1
      },
      {
            "id": "631e1e10-0b52-4a17-89a4-769ac563321f",
            "name": "Sticky Note24",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1340,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "All chunks of a previous version of the document are being deleted by filtering the meta data by the given ID"
            },
            "typeVersion": 1
      },
      {
            "id": "6c830c83-4b70-4719-8e2a-26846e60085c",
            "name": "Sticky Note25",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1560,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "Reduce the active streams/items to just 1 to prevent the following nodes from double-processing"
            },
            "typeVersion": 1
      },
      {
            "id": "46c8e4e4-0a5e-4ede-947b-5773710d4e55",
            "name": "Sticky Note26",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1780,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "Retrieve all page contents/blocks"
            },
            "typeVersion": 1
      },
      {
            "id": "0369e610-d074-4812-9d04-8615b42965a5",
            "name": "Sticky Note27",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2600,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "Reduce the active streams/items to just 1 to prevent the following nodes from double-processing"
            },
            "typeVersion": 1
      },
      {
            "id": "4f3bce54-1650-45fa-abb0-c881358c7e8d",
            "name": "Sticky Note28",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2220,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 375.9283286479995,
                  "height": 275.841854198618,
                  "content": "Embed item and store in Vector Store. Depending on the length the content is being split up into multiple chunks/embeds"
            },
            "typeVersion": 1
      },
      {
            "id": "44125921-e068-4a5d-a56b-b0e63c103556",
            "name": "Supabase Vector Store1",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  924,
                  935
            ],
            "parameters": {
                  "options": {},
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "documents",
                        "cachedResultName": "documents"
                  }
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "DjIb4HMTYXhTU8Uc",
                        "name": "Supabase (VectorStore)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "467322a9-949d-4569-aac6-92196da46ba5",
            "name": "Sticky Note30",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  400
            ],
            "parameters": {
                  "color": 7,
                  "width": 730.7522093855692,
                  "height": 668.724737081502,
                  "content": "Simple chat bot to ask specific questions while having access to the context of the Notion Knowledge Base which was stored in the Vector Store"
            },
            "typeVersion": 1
      },
      {
            "id": "27f078cf-b309-4dd1-a8ce-b4fc504d6e29",
            "name": "Sticky Note31",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1660,
                  900
            ],
            "parameters": {
                  "color": 7,
                  "width": 219.31927574471658,
                  "height": 275.841854198618,
                  "content": "Model used for both creating and reading embeddings"
            },
            "typeVersion": 1
      },
      {
            "id": "2f59cba1-4318-47e7-bf0b-b908d4186b86",
            "name": "Supabase Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  2280,
                  -60
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "documents",
                        "cachedResultName": "documents"
                  }
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "DjIb4HMTYXhTU8Uc",
                        "name": "Supabase (VectorStore)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "729849e7-0eff-40c2-ae00-ae660c1eec69",
            "name": "Sticky Note32",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1120,
                  -300
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "Process each page/document separately."
            },
            "typeVersion": 1
      },
      {
            "id": "3f632a24-ca0a-45c4-801d-041aa3f887a7",
            "name": "Sticky Note29",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2220,
                  120
            ],
            "parameters": {
                  "color": 7,
                  "width": 376.0759088111347,
                  "height": 275.841854198618,
                  "content": "Store additional meta data with each embed, especially the Notion ID, which can be later used to find all belonging entries of one page, even if they got split into multiple embeds."
            },
            "typeVersion": 1
      },
      {
            "id": "ffaf3861-5287-4f57-8372-09216a18cb4d",
            "name": "Sticky Note33",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  -300
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "Using a manual approach for polling data from Notion for more accuracy."
            },
            "typeVersion": 1
      },
      {
            "id": "cbbedfc0-4d64-42a6-8f55-21e04887305f",
            "name": "Sticky Note34",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  680,
                  -300
            ],
            "parameters": {
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "## Select Database\nChoose the database which represents your Knowledge Base"
            },
            "typeVersion": 1
      },
      {
            "id": "8b6767f2-1bc9-42fb-b319-f39f6734b9f2",
            "name": "Sticky Note35",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2000,
                  -160
            ],
            "parameters": {
                  "color": 7,
                  "width": 216.47293010628914,
                  "height": 275.841854198618,
                  "content": "Combine all contents to a single text formatted into one line which can be easily stored as an embed"
            },
            "typeVersion": 1
      },
      {
            "id": "cdff1756-77d7-421e-8672-25c9862840b0",
            "name": "Concatenate to single string",
            "type": "n8n-nodes-base.summarize",
            "position": [
                  2060,
                  -60
            ],
            "parameters": {
                  "options": {},
                  "fieldsToSummarize": {
                        "values": [
                              {
                                    "field": "content",
                                    "separateBy": "\n",
                                    "aggregation": "concatenate"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Limit": {
            "main": [
                  [
                        {
                              "node": "Get page blocks",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Limit1": {
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
      "Notion Trigger": {
            "main": [
                  [
                        {
                              "node": "Input Reference",
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
      "Get page blocks": {
            "main": [
                  [
                        {
                              "node": "Concatenate to single string",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Input Reference": {
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
                              "node": "Delete old embeddings if exist",
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
                              "node": "Get updated pages",
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
                        },
                        {
                              "node": "Supabase Vector Store1",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get updated pages": {
            "main": [
                  [
                        {
                              "node": "Input Reference",
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
                              "node": "Question and Answer Chain",
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
      "Supabase Vector Store": {
            "main": [
                  [
                        {
                              "node": "Limit1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Supabase Vector Store1": {
            "ai_vectorStore": [
                  [
                        {
                              "node": "Vector Store Retriever",
                              "type": "ai_vectorStore",
                              "index": 0
                        }
                  ]
            ]
      },
      "Vector Store Retriever": {
            "ai_retriever": [
                  [
                        {
                              "node": "Question and Answer Chain",
                              "type": "ai_retriever",
                              "index": 0
                        }
                  ]
            ]
      },
      "When chat message received": {
            "main": [
                  [
                        {
                              "node": "Question and Answer Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Concatenate to single string": {
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
      "Delete old embeddings if exist": {
            "main": [
                  [
                        {
                              "node": "Limit",
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

export function NotionCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-stone-600 text-white shadow-lg shadow-stone-500/25 border border-stone-600' : 'bg-stone-50 dark:bg-stone-500/10 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-500/20 hover:border-stone-300 dark:hover:border-stone-600/50 hover:shadow-md'}`}
    >
      <FileText className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`} />
      <span className="truncate max-w-[200px]">Notion</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {notionTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function NotionTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {notionTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-stone-50/50 dark:group-hover:to-stone-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-stone-500 to-stone-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-stone-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <FileText className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-stone-600 dark:hover:bg-stone-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
