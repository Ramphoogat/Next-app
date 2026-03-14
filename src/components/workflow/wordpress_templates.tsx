import React from 'react';
import { Play, Globe } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const wordpressTemplates: IN8nTemplate[] = [
  {
    name: "Auto categorize wordpress template",
    nodes: [
      {
            "id": "2017403c-7496-48f8-a487-8a017c7adfe3",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  680,
                  320
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "82ff288f-4234-4192-9046-33e5ffee5264",
            "name": "Wordpress",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  1500,
                  320
            ],
            "parameters": {
                  "postId": "={{ $('Get All Wordpress Posts').item.json.id }}",
                  "operation": "update",
                  "updateFields": {
                        "categories": "={{ $json.output }}"
                  }
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "lGWPwxTdfPDDbFjj",
                        "name": "Rumjahn.com wordpress"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "521deb22-62dd-4b5f-8b9a-aab9777821da",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  -100
            ],
            "parameters": {
                  "width": 504.88636363636317,
                  "content": "## How to Auto-Categorize 82 Blog Posts in 2 Minutes using A.I. (No Coding Required)\n\n💡 Read the [case study here](https://rumjahn.com/how-to-use-a-i-to-categorize-wordpress-posts-and-streamline-your-content-organization-process/).\n\n📺 Watch the [youtube tutorial here](https://www.youtube.com/watch?v=IvQioioVqhw)\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4090d827-f8cd-47ef-ad4f-654ee58216f6",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  860,
                  180
            ],
            "parameters": {
                  "color": 3,
                  "width": 188.14814814814804,
                  "height": 327.3400673400663,
                  "content": "### Get wordpress posts\n\nTurn off return all if you're running into issues.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "71585d54-fdcc-42a5-8a0e-0fac3adc1809",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1080,
                  80
            ],
            "parameters": {
                  "color": 4,
                  "width": 315.1464152082392,
                  "height": 416.90235690235625,
                  "content": "### A.I. Categorization\n\n1. you need to set up the categories first in wordpress\n\n2. Edit the message prompt and change the categories and category numbers"
            },
            "typeVersion": 1
      },
      {
            "id": "29354054-8600-4e45-99d0-6f30f779a505",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1480,
                  240
            ],
            "parameters": {
                  "color": 5,
                  "width": 171.64983164983155,
                  "height": 269.59595959595947,
                  "content": "### Update category"
            },
            "typeVersion": 1
      },
      {
            "id": "d9fe6289-6b97-4830-80aa-754ac4d4b3e0",
            "name": "Get All Wordpress Posts",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  900,
                  320
            ],
            "parameters": {
                  "options": {},
                  "operation": "getAll",
                  "returnAll": true
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "lGWPwxTdfPDDbFjj",
                        "name": "Rumjahn.com wordpress"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "ed40bf13-8294-4b4e-a8b6-5749989d3420",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1080,
                  540
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "XO3iT1iYT5Vod56X",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "dafeb935-532e-4067-9dfb-7e9a6bbc4e5a",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1100,
                  320
            ],
            "parameters": {
                  "text": "=You are an expert content strategist and taxonomy specialist with extensive experience in blog categorization and content organization.\n\nI will provide you with a blog post's title. Your task is to assign ONE primary category ID from this fixed list:\n\n13 = Content Creation\n14 = Digital Marketing\n15 = AI Tools\n17 = Automation & Integration\n18 = Productivity Tools\n19 = Analytics & Strategy\n\nAnalyze the title and return only the single most relevant category ID number that best represents the main focus of the post. While a post might touch on multiple topics, select the dominant theme that would be most useful for navigation purposes.\n\n{{ $json.title.rendered }}\n\nOutput only the category number",
                  "options": {},
                  "promptType": "define"
            },
            "typeVersion": 1.7
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Wordpress",
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
      "Get All Wordpress Posts": {
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
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "Get All Wordpress Posts",
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
    name: "Auto-Tag Blog Posts in WordPress with AI",
    nodes: [
      {
            "id": "0561d80b-f360-4a8e-930d-49b778833991",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  3260,
                  480
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "yWpagxp5s8o3dlBp",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d71aec64-299c-4258-8eb4-95821d15b758",
            "name": "Auto-fixing Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserAutofixing",
            "position": [
                  3460,
                  540
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "1468a001-ca7b-4726-ae31-02b28d78b07e",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  3360,
                  680
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "yWpagxp5s8o3dlBp",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "bb4221ad-94d7-4543-850f-87b83735d2a6",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  3560,
                  760
            ],
            "parameters": {
                  "jsonSchemaExample": "{\n\t\"tags\": [\"Germany\", \"Technology\", \"Workflow Automation\"]\n}"
            },
            "typeVersion": 1.2
      },
      {
            "id": "2380c4ea-d804-45b2-8341-417afa2ae21f",
            "name": "RSS Feed Trigger",
            "type": "n8n-nodes-base.rssFeedReadTrigger",
            "position": [
                  3140,
                  320
            ],
            "parameters": {
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
            "id": "782e9c61-7d51-499b-89b2-888415c5116e",
            "name": "Return article details",
            "type": "n8n-nodes-base.set",
            "position": [
                  4140,
                  320
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "ebe28fc7-f166-4428-b3f3-b319f2d080df",
                                    "name": "tag_ids",
                                    "type": "array",
                                    "value": "={{ $json.tag_ids }}"
                              },
                              {
                                    "id": "bc296683-2a93-42b4-a9a7-90a2bc22f37b",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $('MOCK article').item.json.title }}"
                              },
                              {
                                    "id": "32dc0950-3708-447e-a3b6-a5c5ae9bdcd0",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $('MOCK article').item.json.content }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "6b5ce61f-8351-40ab-9e63-51c3e85ce53d",
            "name": "Split Out",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  2200,
                  840
            ],
            "parameters": {
                  "options": {
                        "destinationFieldName": "missing_tag"
                  },
                  "fieldToSplitOut": "missing_tags"
            },
            "typeVersion": 1
      },
      {
            "id": "2338e3e8-cba4-48c8-8c1a-50019af70932",
            "name": "Loop over articles",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  1980,
                  320
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "39b89004-6032-4d22-8bcc-3dfd1d793ed0",
            "name": "SET initial record",
            "type": "n8n-nodes-base.set",
            "position": [
                  2200,
                  440
            ],
            "parameters": {
                  "options": {},
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "ec0b93cb-de9d-41be-9d4b-6846d3ee14a2",
            "name": "GET WP tags",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2440,
                  440
            ],
            "parameters": {
                  "url": "https://www.example.com/wp-json/wp/v2/tags",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "XXXXXXX",
                        "name": "Example"
                  }
            },
            "executeOnce": true,
            "typeVersion": 4.2,
            "alwaysOutputData": true
      },
      {
            "id": "cbabadef-9f5f-4402-8bd7-255f5c237ff9",
            "name": "POST WP tags",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2420,
                  840
            ],
            "parameters": {
                  "url": "https://www.example.com/wp-json/wp/v2/tags",
                  "method": "POST",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "slug",
                                    "value": "={{ $json.missing_tag }}"
                              },
                              {
                                    "name": "name",
                                    "value": "={{ $json.missing_tag.replaceAll(\"-\",\" \").toTitleCase() }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "XXXXXXX",
                        "name": "Example"
                  }
            },
            "executeOnce": false,
            "typeVersion": 4.2
      },
      {
            "id": "6bf40d39-4b42-413f-9502-3ca494f75bcb",
            "name": "GET updated WP tags",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2700,
                  840
            ],
            "parameters": {
                  "url": "https://www.example.com/wp-json/wp/v2/tags",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "XXXXXXX",
                        "name": "Example"
                  }
            },
            "executeOnce": true,
            "typeVersion": 4.2
      },
      {
            "id": "aea9a631-0cd8-4ed8-9fb1-981b8e11f3dd",
            "name": "Keep matches",
            "type": "n8n-nodes-base.filter",
            "position": [
                  2200,
                  1040
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
                                    "id": "8ec4fdfc-73f3-4d7b-96e4-f42a18252599",
                                    "operator": {
                                          "type": "array",
                                          "operation": "contains",
                                          "rightType": "any"
                                    },
                                    "leftValue": "={{ $('SET initial record').first().json.tags.map(item => item.toLowerCase().replaceAll(\" \",\"-\")) }}",
                                    "rightValue": "={{ $json.slug }}"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "6d71d7a5-495d-4809-b66f-9f1cba0d11c6",
            "name": "Combine tag_ids",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  2420,
                  1040
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "renameField": true,
                                    "outputFieldName": "tag_ids",
                                    "fieldToAggregate": "id"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "dc3cac68-dee8-4821-963b-b0594d1a7e0e",
            "name": "Combine slugs",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  2700,
                  440
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "renameField": true,
                                    "outputFieldName": "tags",
                                    "fieldToAggregate": "slug"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "8e0f668c-e3ac-4d70-9ffb-5515e6221c62",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  2440,
                  640
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
                                    "id": "8d77d072-cb47-4fbb-831a-0e6f3ecefc71",
                                    "operator": {
                                          "type": "array",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.missing_tags }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "7988188d-07e6-4a36-94f2-e21d7677802e",
            "name": "MOCK article",
            "type": "n8n-nodes-base.set",
            "position": [
                  3740,
                  320
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "4a69cf1b-341a-40bc-a36a-b76c05bdd819",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $('RSS Feed Trigger').item.json.title }}"
                              },
                              {
                                    "id": "63097eb0-6165-4365-a5b5-e9f3de65d715",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $('RSS Feed Trigger').item.json.content }}"
                              },
                              {
                                    "id": "ae4859ec-ad14-403e-b5b6-53703fefe3f3",
                                    "name": "categories",
                                    "type": "array",
                                    "value": "={{ $('RSS Feed Trigger').item.json.categories }}"
                              },
                              {
                                    "id": "3f94d5ac-5196-4ad0-acea-79c07b0ee2c6",
                                    "name": "tags",
                                    "type": "array",
                                    "value": "={{ $json.output.tags }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "4578cb14-dc86-4bc4-8d59-f0c088574164",
            "name": "Return missing tags",
            "type": "n8n-nodes-base.code",
            "position": [
                  2200,
                  640
            ],
            "parameters": {
                  "jsCode": "const new_ary = $('SET initial record').first().json.tags.map(x => x.toLowerCase().replaceAll(\" \",\"-\")).filter(x => !$input.first().json.tags.includes(x))\n\nreturn {\"missing_tags\": new_ary};"
            },
            "typeVersion": 2
      },
      {
            "id": "91c8dde5-58ce-4bf6-ac3c-0062cbf0046e",
            "name": "Wordpress",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  4360,
                  320
            ],
            "parameters": {
                  "title": "=Demo tagging post: {{ $json.title }}",
                  "additionalFields": {
                        "tags": "={{ $json.tag_ids }}",
                        "content": "=This is a post to demo automatic tagging a WordPress postvia n8n. The following content could be rewritten in full or part with commentary using AI.\n\n{{ $json.content }}"
                  }
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "XXXXXXX",
                        "name": "Example"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "8257534e-f433-4225-a795-230fd367cc01",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3000,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 1673.0029952487134,
                  "height": 1061.6563737812796,
                  "content": "## Demo Usage in Another Workflow (Tagging an article discovered with an RSS feed)"
            },
            "typeVersion": 1
      },
      {
            "id": "b14e6fda-c569-4ada-90d9-77b61049c531",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1680,
                  198.96245932022566
            ],
            "parameters": {
                  "color": 7,
                  "width": 1243.102096674096,
                  "height": 1077.24135750937,
                  "content": "## Auto-Tag Posts in WordPress\n\nThis workflow allows you to hand off the responsibility of tagging content for WordPress to an AI Agent in n8n with no data entry required."
            },
            "typeVersion": 1
      },
      {
            "id": "21420d0f-a5c9-4eac-b6d9-06d3a6de5fb9",
            "name": "Demo Usage in Another Workflow",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  1780,
                  320
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "7571b196-3827-478f-b032-84d99adf4aa8",
            "name": "Auto-Tag Posts in WordPress",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  3940,
                  320
            ],
            "parameters": {
                  "mode": "each",
                  "options": {},
                  "workflowId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "siXUnQhJpCJ9rHzu"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e5b63f63-09a6-452d-9d26-8501fc49d7fe",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2640,
                  140
            ],
            "parameters": {
                  "color": 5,
                  "width": 256.62869115182394,
                  "height": 146.4958582739091,
                  "content": "## Copy this workflow\n\nYou can use it inline by removing the Called by Another Workflow trigger, or as-is as a subworkflow"
            },
            "typeVersion": 1
      },
      {
            "id": "2ea9fbdd-b492-4030-b640-227a163d70ef",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3040,
                  980
            ],
            "parameters": {
                  "width": 409.8780943583022,
                  "height": 248.2919292392927,
                  "content": "Handing off tagging and categorization fully to AI lets you **put your WordPress account on autopilot** without a human-in-the-loop.\n\nIn this example the application is use-case agnostic, but with this workflow you can:\n1. Use AI to rewrite content with original thoughts and tags\n2. Ensure healthy information architecture on your site\n3. Quickly generate multivariate tag and category combinations for optimal SEO"
            },
            "typeVersion": 1
      },
      {
            "id": "57cfa462-fc71-4173-b7c9-8253c4e240d1",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3900,
                  500
            ],
            "parameters": {
                  "color": 3,
                  "width": 369.61896876326364,
                  "height": 103.91486928512641,
                  "content": "### To ensure data can be passed to subsequent nodes, make sure to select \"Run Once for Each Item\" if executing a subworkflow"
            },
            "typeVersion": 1
      },
      {
            "id": "7f1dfade-07be-49b7-b5ee-99b58f1e6cc7",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2640,
                  660
            ],
            "parameters": {
                  "color": 6,
                  "width": 211.8330719827787,
                  "content": "## What's this? \nIf there are missing tags we create them in WP, otherwise we keep get them all from WP and keep the relevant ones."
            },
            "typeVersion": 1
      },
      {
            "id": "61711c71-3e45-4b06-80a8-b651177b585d",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1960,
                  540
            ],
            "parameters": {
                  "color": 3,
                  "width": 174.33565557367925,
                  "height": 251.80401948434695,
                  "content": "## What's this? \nOne of the few potential failure points in this workflow, when checking for missing tags it's important that both the generated tags and the existing tags are in the same case (snake, dash, title)."
            },
            "typeVersion": 1
      },
      {
            "id": "31db85c9-e4c2-4409-9d92-7eb005223de0",
            "name": "Generate tags for article",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  3360,
                  320
            ],
            "parameters": {
                  "text": "=Please provide 3-5 suitable tags for the following article:\n\n{{ $json.content }}\n\nTag Formatting Rules:\n1. Tags should be in title case",
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.4
      },
      {
            "id": "7d6eac92-6f6f-44a4-8dce-0830440a9dff",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1600,
                  1040
            ],
            "parameters": {
                  "width": 285.2555025627061,
                  "content": "## ! A note about cases !\nIf you want your tags to follow a different case than I am using (dash case for slug, title case for name), then you will need to update a few nodes in this workflow."
            },
            "typeVersion": 1
      },
      {
            "id": "133be2f7-071b-4651-b3b5-8052a64b7f49",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2600,
                  1200
            ],
            "parameters": {
                  "color": 5,
                  "width": 296.01271681531176,
                  "content": "## Ready for a challenge?\n\nMake this subworkflow executable for both categories and tags, accounting for different API calls to different endpoints."
            },
            "typeVersion": 1
      },
      {
            "id": "7807e967-ac3d-4a4d-bd9d-f123d57e1676",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4400,
                  1155.7364351382535
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
      "If": {
            "main": [
                  [
                        {
                              "node": "GET updated WP tags",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Split Out",
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
                              "node": "POST WP tags",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "GET WP tags": {
            "main": [
                  [
                        {
                              "node": "Combine slugs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Keep matches": {
            "main": [
                  [
                        {
                              "node": "Combine tag_ids",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "MOCK article": {
            "main": [
                  [
                        {
                              "node": "Auto-Tag Posts in WordPress",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "POST WP tags": {
            "main": [
                  [
                        {
                              "node": "GET updated WP tags",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine slugs": {
            "main": [
                  [
                        {
                              "node": "Return missing tags",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine tag_ids": {
            "main": [
                  [
                        {
                              "node": "Loop over articles",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "RSS Feed Trigger": {
            "main": [
                  [
                        {
                              "node": "Generate tags for article",
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
                              "node": "Generate tags for article",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Loop over articles": {
            "main": [
                  [],
                  [
                        {
                              "node": "SET initial record",
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
                              "node": "Auto-fixing Output Parser",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "SET initial record": {
            "main": [
                  [
                        {
                              "node": "GET WP tags",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "GET updated WP tags": {
            "main": [
                  [
                        {
                              "node": "Keep matches",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Return missing tags": {
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
      "Return article details": {
            "main": [
                  [
                        {
                              "node": "Wordpress",
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
                              "node": "Generate tags for article",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate tags for article": {
            "main": [
                  [
                        {
                              "node": "MOCK article",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Auto-Tag Posts in WordPress": {
            "main": [
                  [
                        {
                              "node": "Return article details",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Demo Usage in Another Workflow": {
            "main": [
                  [
                        {
                              "node": "Loop over articles",
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
    name: "Automate Blog Creation In Brand Voice With AI",
    nodes: [
      {
            "id": "d3159589-dbb7-4cca-91f5-09e8b2e4cba8",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  240,
                  500
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "b4b42b3f-ef30-4fc8-829d-59f8974c4168",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2180,
                  700
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
            "id": "032c3012-ed8d-44eb-94f0-35790f4b616f",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2980,
                  460
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
            "id": "bf922785-7e8f-4f93-bfff-813c16d93278",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2020,
                  520
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
            "id": "d8d4b26f-270f-4b39-a4cd-a6e4361da591",
            "name": "Extract Voice Characteristics",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  2160,
                  540
            ],
            "parameters": {
                  "text": "=### Analyse the given content\n\n{{ $json.data.map(item => item.replace(/\\n/g, '')).join('\\n---\\n') }}",
                  "options": {
                        "systemPromptTemplate": "You help identify and define a company or individual's \"brand voice\". Using the given content belonging to the company or individual, extract all voice characteristics from it along with description and examples demonstrating it."
                  },
                  "schemaType": "manual",
                  "inputSchema": "{\n\t\"type\": \"array\",\n \"items\": {\n \"type\": \"object\",\n \t\"properties\": {\n \"characteristic\": { \"type\": \"string\" },\n \"description\": { \"type\": \"string\" },\n \"examples\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } }\n }\n\t}\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "8cca272c-b912-40f1-ba08-aa7c5ff7599c",
            "name": "Get Blog",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  480,
                  500
            ],
            "parameters": {
                  "url": "https://blog.n8n.io",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "aa1e2a02-2e2b-4e8d-aef8-f5f7a54d9562",
            "name": "Get Article",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1120,
                  500
            ],
            "parameters": {
                  "url": "=https://blog.n8n.io{{ $json.article }}",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "78ae3dfc-5afd-452f-a2b6-bdb9dbd728bd",
            "name": "Extract Article URLs",
            "type": "n8n-nodes-base.html",
            "position": [
                  640,
                  500
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "article",
                                    "attribute": "href",
                                    "cssSelector": ".item.post a.global-link",
                                    "returnArray": true,
                                    "returnValue": "attribute"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "3b2b6fea-ed2f-43ba-b6d1-e0666b88c65b",
            "name": "Split Out URLs",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  800,
                  500
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "article"
            },
            "typeVersion": 1
      },
      {
            "id": "68bb20b1-2177-4c0f-9ada-d1de69bdc2a0",
            "name": "Latest Articles",
            "type": "n8n-nodes-base.limit",
            "position": [
                  960,
                  500
            ],
            "parameters": {
                  "maxItems": 5
            },
            "typeVersion": 1
      },
      {
            "id": "f20d7393-24c9-4a51-872e-0dce391f661c",
            "name": "Extract Article Content",
            "type": "n8n-nodes-base.html",
            "position": [
                  1280,
                  500
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "data",
                                    "cssSelector": ".post-section",
                                    "returnValue": "html"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "299a04be-fe9b-47d9-b2c6-e2e4628f77e0",
            "name": "Combine Articles",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1780,
                  540
            ],
            "parameters": {
                  "options": {
                        "mergeLists": true
                  },
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "fieldToAggregate": "data"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "8480ece7-0dc1-4682-ba9e-ded2c138d8b8",
            "name": "Article Style & Brand Voice",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2560,
                  320
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineByPosition"
            },
            "typeVersion": 3
      },
      {
            "id": "024efee2-5a2f-455c-a150-4b9bdce650b2",
            "name": "Save as Draft",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  3460,
                  320
            ],
            "parameters": {
                  "title": "={{ $json.output.title }}",
                  "additionalFields": {
                        "slug": "={{ $json.output.title.toSnakeCase() }}",
                        "format": "standard",
                        "status": "draft",
                        "content": "={{ $json.output.body }}"
                  }
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "YMW8mGrekjfxKJUe",
                        "name": "Wordpress account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "71f4ab1e-ef61-48f3-92e8-70691f7d0750",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  480,
                  180
            ],
            "parameters": {
                  "color": 7,
                  "width": 606,
                  "height": 264,
                  "content": "## 1. Import Existing Content\n[Read more about the HTML node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.html/)\n\nFirst, we'll need to gather existing content for the brand voice we want to replicate. This content can be blogs, social media posts or internal documents - the idea is to use this content to \"train\" our AI to produce content from the provided examples. One call out is that the quality and consistency of the content is important to get the desired results.\n\nIn this demonstration, we'll grab the latest blog posts off a corporate blog to use as an example. Since, the blog articles are likely consistent because of the source and narrower focus of the medium, it'll serve well to showcase this workflow."
            },
            "typeVersion": 1
      },
      {
            "id": "3d3a55a5-4b4a-4ea2-a39c-82b366fb81e6",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1440,
                  240
            ],
            "parameters": {
                  "color": 7,
                  "width": 434,
                  "height": 230,
                  "content": "## 2. Convert HTML to Markdown\n[Learn more about the Markdown node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown)\n\nMarkdown is a great way to optimise the article data we're sending to the LLM because it reduces the amount of tokens required but keeps all relevant writing structure information.\n\nAlso useful to get Markdown output as a response because typically it's the format authors will write in."
            },
            "typeVersion": 1
      },
      {
            "id": "08c0b683-ec06-47ce-871c-66265195ca29",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1980,
                  80
            ],
            "parameters": {
                  "color": 7,
                  "width": 446,
                  "height": 233,
                  "content": "## 3. Using AI to Analyse Article Structure and Writing Styles\n[Read more about the Basic LLM Chain node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nOur approach is to first perform a high-level analysis of all available articles in order to replicate their content layout and writing styles. This will act as a guideline to help the AI to structure our future articles."
            },
            "typeVersion": 1
      },
      {
            "id": "515fe69f-061e-4dfc-94ed-4cf2fbe10b7b",
            "name": "Capture Existing Article Structure",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  2020,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.data.join('\\n---\\n') }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=Given the following one or more articles (which are separated by ---), describe how best one could replicate the common structure, layout, language and writing styles of all as aggregate."
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "ba4e68fb-eccc-4efa-84be-c42a695dccdb",
            "name": "Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  1600,
                  540
            ],
            "parameters": {
                  "html": "={{ $json.data }}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "d459ff5b-0375-4458-a49f-59700bb57e12",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2340,
                  740
            ],
            "parameters": {
                  "color": 7,
                  "width": 446,
                  "height": 253,
                  "content": "## 4. Using AI to Extract Voice Characteristics and Traits\n[Read more about the Information Extractor node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor/)\n\nSecond, we'll use AI to analysis the brand voice characteristics of the previous articles. This picks out the tone, style and choice of language used and identifies them into categories. These categories will be used as guidelines for the AI to keep the future article consistent in tone and voice. "
            },
            "typeVersion": 1
      },
      {
            "id": "71fe32a9-1b8a-446c-a4ff-fb98c6a68e1b",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2720,
                  0
            ],
            "parameters": {
                  "color": 7,
                  "width": 626,
                  "height": 633,
                  "content": "## 5. Automate On-Brand Articles Using AI\n[Read more about the Information Extractor node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor)\n\nFinally with this approach, we can feed both content and voice guidelines into our final LLM - our content generation agent - to produce any number of on-brand articles, social media posts etc.\n\nWhen it comes to assessing the output, note the AI does a pretty good job at simulating format and reusing common phrases and wording for the target article. However, this could become repetitive very quickly! Whilst AI can help speed up the process, a human touch may still be required to add a some variety."
            },
            "typeVersion": 1
      },
      {
            "id": "4e6fbe4e-869e-4bef-99ba-7b18740caecf",
            "name": "Content Generation Agent",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  3000,
                  320
            ],
            "parameters": {
                  "text": "={{ $json.instruction }}",
                  "options": {
                        "systemPromptTemplate": "=You are a blog content writer who writes using the following article guidelines. Write a content piece as requested by the user. Output the body as Markdown. Do not include the date of the article because the publishing date is not determined yet.\n\n## Brand Article Style\n{{ $('Article Style & Brand Voice').item.json.text }}\n\n##n Brand Voice Characteristics\n\nHere are the brand voice characteristic and examples you must adopt in your piece. Pick only the characteristic which make sense for the user's request. Try to keep it as similar as possible but don't copy word for word.\n\n|characteristic|description|examples|\n|-|-|-|\n{{\n$('Article Style & Brand Voice').item.json.output.map(item => (\n`|${item.characteristic}|${item.description}|${item.examples.map(ex => `\"${ex}\"`).join(', ')}|`\n)).join('\\n')\n}}"
                  },
                  "attributes": {
                        "attributes": [
                              {
                                    "name": "title",
                                    "required": true,
                                    "description": "title of article"
                              },
                              {
                                    "name": "summary",
                                    "required": true,
                                    "description": "summary of article"
                              },
                              {
                                    "name": "body",
                                    "required": true,
                                    "description": "body of article"
                              },
                              {
                                    "name": "characteristics",
                                    "required": true,
                                    "description": "comma delimited string of characteristics chosen"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "022de44c-c06c-41ac-bd50-38173dae9b37",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3460,
                  480
            ],
            "parameters": {
                  "color": 7,
                  "width": 406,
                  "height": 173,
                  "content": "## 6. Save Draft to Wordpress\n[Learn more about the Wordpress node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/)\n\nTo close out the template, we'll simple save our generated article as a draft which could allow human team members to review and validate the article before publishing."
            },
            "typeVersion": 1
      },
      {
            "id": "fe54c40e-6ddd-45d6-a938-f467e4af3f57",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2900,
                  660
            ],
            "parameters": {
                  "color": 5,
                  "width": 440,
                  "height": 120,
                  "content": "### Q. Do I need to analyse Brand Voice for every article?\nA. No! I would recommend storing the results of the AI's analysis and re-use for a list of planned articles rather than generate anew every time."
            },
            "typeVersion": 1
      },
      {
            "id": "1832131e-21e8-44fc-9370-907f7b5a6eda",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  680
            ],
            "parameters": {
                  "color": 5,
                  "width": 380,
                  "height": 120,
                  "content": "### Q. Can I use other media than blog articles?\nA. Yes! This approach can use other source materials such as PDFs, as long as they can be produces in a text format to give to the LLM."
            },
            "typeVersion": 1
      },
      {
            "id": "8e8706a3-122d-436b-9206-de7a6b2f3c39",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -220,
                  -120
            ],
            "parameters": {
                  "width": 400,
                  "height": 800,
                  "content": "## Try It Out!\n### This n8n template demonstrates how to use AI to generate new on-brand written content by analysing previously published content.\n\nWith such an approach, it's possible to generate a steady stream of blog article drafts quickly with high consistency with your brand and existing content.\n\n### How it works\n* In this demonstration, the n8n.io blog is used as the source of existing published content and 5 of the latest articles are imported via the HTTP node.\n* The HTML node is extract the article bodies which are then converted to markdown for our LLMs.\n* We use LLM nodes to (1) understand the article structure and writing style and (2) identify the brand voice characteristics used in the posts.\n* These are then used as guidelines in our final LLM node when generating new articles.\n* Finally, a draft is saved to Wordpress for human editors to review or use as starting point for their own articles.\n\n### How to use\n* Update Step 1 to fetch data from your desired blog or change to fetch existing content in a different way.\n* Update Step 5 to provide your new article instruction. For optimal output, theme topics relevant to your brand.\n\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      },
      {
            "id": "1510782d-0f88-40ca-99a8-44f984022c8e",
            "name": "New Article Instruction",
            "type": "n8n-nodes-base.set",
            "position": [
                  2820,
                  320
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "2c7e2a28-30f9-4533-a394-a5e967ebf4ec",
                                    "name": "instruction",
                                    "type": "string",
                                    "value": "=Write a comprehensive guide on using AI for document classification and document extraction. Explain the benefits of using vision models over traditional OCR. Close out with a recommendation of using n8n as the preferred way to get started with this AI use-case."
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      }
],
    connections: {
      "Get Blog": {
            "main": [
                  [
                        {
                              "node": "Extract Article URLs",
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
                              "node": "Combine Articles",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Article": {
            "main": [
                  [
                        {
                              "node": "Extract Article Content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out URLs": {
            "main": [
                  [
                        {
                              "node": "Latest Articles",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Latest Articles": {
            "main": [
                  [
                        {
                              "node": "Get Article",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine Articles": {
            "main": [
                  [
                        {
                              "node": "Capture Existing Article Structure",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Extract Voice Characteristics",
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
                              "node": "Extract Voice Characteristics",
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
                              "node": "Content Generation Agent",
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
                              "node": "Capture Existing Article Structure",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Article URLs": {
            "main": [
                  [
                        {
                              "node": "Split Out URLs",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Article Content": {
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
      "New Article Instruction": {
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
      "Content Generation Agent": {
            "main": [
                  [
                        {
                              "node": "Save as Draft",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Article Style & Brand Voice": {
            "main": [
                  [
                        {
                              "node": "New Article Instruction",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Voice Characteristics": {
            "main": [
                  [
                        {
                              "node": "Article Style & Brand Voice",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "When clicking ‘Test workflow’": {
            "main": [
                  [
                        {
                              "node": "Get Blog",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Capture Existing Article Structure": {
            "main": [
                  [
                        {
                              "node": "Article Style & Brand Voice",
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
    name: "Automate Content Generator for WordPress with DeepSeek R1",
    nodes: [
      {
            "id": "c4a6995f-7769-4b77-80ca-1e6bccef77c1",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  -20,
                  200
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "c76b1458-5130-41e7-b2f2-1cfe22eab536",
            "name": "Get Ideas",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  200,
                  200
            ],
            "parameters": {
                  "options": {},
                  "sheetName": {
                        "__rl": true,
                        "mode": "id",
                        "value": "=Sheet1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "YOURDOCUMENT"
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
            "id": "8d17a640-3e15-42e9-9481-e3291d395ccd",
            "name": "Set your prompt",
            "type": "n8n-nodes-base.set",
            "position": [
                  420,
                  200
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "3e8d2523-66aa-46fe-adcc-39dc78b9161e",
                                    "name": "prompt",
                                    "type": "string",
                                    "value": "={{ $json.PROMPT }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "4f0e9065-b331-49ed-acd9-77c7c43e89a5",
            "name": "Create post on Wordpress",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  0,
                  500
            ],
            "parameters": {
                  "title": "={{ $json.message.content }}",
                  "additionalFields": {
                        "status": "draft",
                        "content": "={{ $('Generate article with DeepSeek').item.json.message.content }}"
                  }
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "OE4AgquSkMWydRqn",
                        "name": "Wordpress (wp.test.7hype.com)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "cb85d980-9d60-4c85-8574-b46e4cc14341",
            "name": "Upload image",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  420,
                  500
            ],
            "parameters": {
                  "url": "https://YOURSITE.com/wp-json/wp/v2/media",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "contentType": "binaryData",
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Disposition",
                                    "value": "=attachment; filename=\"copertina-{{ $('Create post on Wordpress').item.json.id }}.jpg\""
                              }
                        ]
                  },
                  "inputDataFieldName": "data",
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "OE4AgquSkMWydRqn",
                        "name": "Wordpress (wp.test.7hype.com)"
                  },
                  "wooCommerceApi": {
                        "id": "vYYrjB5kgHQ0XByZ",
                        "name": "WooCommerce (wp.test.7hype.com)"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "bc71ed8a-fe35-487a-b4cd-6b8c1b256763",
            "name": "Set Image",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  640,
                  500
            ],
            "parameters": {
                  "url": "=https://wp.test.7hype.com/wp-json/wp/v2/posts/{{ $('Create post on Wordpress').item.json.id }}",
                  "method": "POST",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "featured_media",
                                    "value": "={{ $json.id }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "OE4AgquSkMWydRqn",
                        "name": "Wordpress (wp.test.7hype.com)"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "fbed2813-cc64-42a2-994f-3696e9d8d8fe",
            "name": "Update Sheet",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  880,
                  500
            ],
            "parameters": {
                  "columns": {
                        "value": {
                              "DATA": "={{ $now.format('dd/LL/yyyy') }}",
                              "TITOLO": "={{ $('Generate title with DeepSeek').item.json.message.content }}",
                              "ID POST": "={{ $('Create post on Wordpress').item.json.id }}",
                              "row_number": "={{ $('Get Ideas').item.json.row_number }}"
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
                                    "id": "PROMPT",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "PROMPT",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "TITOLO",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "TITOLO",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "ID POST",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "ID POST",
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
                        ],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "update",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/16VFeCrE5BkMBoA_S5HD-9v7C0sxcXAUiDbq5JvkDqnI/edit#gid=0",
                        "cachedResultName": "Foglio1"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "16VFeCrE5BkMBoA_S5HD-9v7C0sxcXAUiDbq5JvkDqnI",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/16VFeCrE5BkMBoA_S5HD-9v7C0sxcXAUiDbq5JvkDqnI/edit?usp=drivesdk",
                        "cachedResultName": "Plan Blog wp.test.7hype.com"
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
            "id": "8db2b0cb-6d61-4e2d-bfac-e25a0385296d",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -60,
                  -360
            ],
            "parameters": {
                  "color": 3,
                  "width": 800,
                  "height": 380,
                  "content": "## Target\nThis workflow is designed to automatically generate seo-friendly content for wordpress through DeepSeek R1 by giving input ideas on how to structure the article. A cover image is also generated and uploaded with OpenAI DALL-E 3. This flow is designed to be executed automatically (ad \"On a schedule\" node) and thus have a complete editorial plan.\n\nThis process is useful for blog managers who want to automate content creation and publishing.\n\n## Preliminary step\nCreate a google sheet with the following columns:\n- Date\n- Prompt\n- Title\n- Post ID\n\nFill in only the \"Prompt\" column with basic ideas that DeepSeek will work on to generate the content."
            },
            "typeVersion": 1
      },
      {
            "id": "ab620659-558d-46f0-ab85-e061af99b743",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  140,
                  100
            ],
            "parameters": {
                  "height": 260,
                  "content": "Connect with your Google Sheet. This node select only rows for which no content has been generated yet in WordPress"
            },
            "typeVersion": 1
      },
      {
            "id": "73b0e640-8ccf-4e29-a0cd-6340db907bbd",
            "name": "Generate article with DeepSeek",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  640,
                  200
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "=deepseek-reasoner"
                  },
                  "options": {
                        "maxTokens": 2048
                  },
                  "messages": {
                        "values": [
                              {
                                    "content": "=You are an SEO expert, write an article based on this topic:\n{{ $json.prompt }}\n\nInstructions:\n- In the introduction, introduce the topic that will be explored in the rest of the text\n- The introduction should be about 120 words\n- The conclusions should be about 120 words\n- Use the conclusions to summarize everything said in the article and offer a conclusion to the reader\n- Write a maximum of 4-5 chapters and argue them.\n- The chapters should follow a logical flow and not repeat the same concepts.\n- The chapters should be related to each other and not isolated blocks of text. The text should flow and follow a linear logic.\n- Do not start chapters with \"Chapter 1\", \"Chapter 2\", \"Chapter 3\" ... write only the chapter title\n- For the text, use HTML for formatting, but limit yourself to bold, italics, paragraphs and lists.\n- Don't put the output in ```html but only text\n- Don't use markdown for formatting.\n- Go deeper into the topic you're talking about, don't just throw superficial information there\n- In output I want only the HTML format"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "97Cz4cqyiy1RdcQL",
                        "name": "DeepSeek"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "6ef4e0d1-6123-4f47-94fb-c06c785ddd92",
            "name": "Generate title with DeepSeek",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  880,
                  200
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "=deepseek-reasoner"
                  },
                  "options": {
                        "maxTokens": 2048
                  },
                  "messages": {
                        "values": [
                              {
                                    "content": "=You are an SEO Copywriter and you need to think of a title of maximum 60 characters for the following article:\n{{ $json.message.content }}\n\nInstructions:\n- Use keywords contained in the article\n- Do not use any HTML characters\n- Output only the string containing the title.\n- Do not use quotation marks. The only special characters allowed are \":\" and \",\""
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "97Cz4cqyiy1RdcQL",
                        "name": "DeepSeek"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "2ecc8514-c04e-4f8b-9ab3-560f2cf910b0",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  100
            ],
            "parameters": {
                  "width": 420,
                  "height": 260,
                  "content": "Add your DeepSeek API credential. If you want you can change the model with \"deepseek-chat\""
            },
            "typeVersion": 1
      },
      {
            "id": "196f7799-a6ab-429b-afd3-bcbcbd65da3b",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -20,
                  420
            ],
            "parameters": {
                  "width": 160,
                  "height": 260,
                  "content": "Add your WordPress API credential\n"
            },
            "typeVersion": 1
      },
      {
            "id": "93c2d359-531a-4cc9-8a18-870c2d6ec62c",
            "name": "Generate Image with DALL-E",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  200,
                  500
            ],
            "parameters": {
                  "prompt": "=Generate a real photographic image used as a cover for a blog post:\n\nImage prompt:\n{{ $('Generate title with DeepSeek').item.json.message.content }}, photography, realistic, sigma 85mm f/1.4",
                  "options": {
                        "size": "1792x1024",
                        "style": "natural",
                        "quality": "hd"
                  },
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.8
      },
      {
            "id": "eec14cd7-fb2b-4f7d-ad94-bcffc1249353",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  180,
                  420
            ],
            "parameters": {
                  "width": 160,
                  "height": 260,
                  "content": "Add your OpenAI API credential\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4f15679b-bc8f-45b8-b3c4-8b43d7f9bb6f",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  420
            ],
            "parameters": {
                  "width": 180,
                  "height": 260,
                  "content": "Upload the image on your WordPress via APIs\n"
            },
            "typeVersion": 1
      },
      {
            "id": "abe32434-671a-4ac3-a788-fcf5fd0e9435",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  600,
                  420
            ],
            "parameters": {
                  "width": 180,
                  "height": 260,
                  "content": "Set the uploaded image with the newly created article\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Get Ideas": {
            "main": [
                  [
                        {
                              "node": "Set your prompt",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Image": {
            "main": [
                  [
                        {
                              "node": "Update Sheet",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload image": {
            "main": [
                  [
                        {
                              "node": "Set Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set your prompt": {
            "main": [
                  [
                        {
                              "node": "Generate article with DeepSeek",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create post on Wordpress": {
            "main": [
                  [
                        {
                              "node": "Generate Image with DALL-E",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Image with DALL-E": {
            "main": [
                  [
                        {
                              "node": "Upload image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate title with DeepSeek": {
            "main": [
                  [
                        {
                              "node": "Create post on Wordpress",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate article with DeepSeek": {
            "main": [
                  [
                        {
                              "node": "Generate title with DeepSeek",
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
                              "node": "Get Ideas",
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
    name: "RAG & GenAI App With WordPress Content",
    nodes: [
      {
            "id": "c3738490-ed39-4774-b337-bf5ee99d0c72",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  500,
                  940
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "3ab719bd-3652-433f-a597-9cd28f8cfcea",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  2580,
                  1320
            ],
            "parameters": {
                  "model": "text-embedding-3-small",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "e8639569-2091-44de-a84d-c3fc3ce54de4",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  2800,
                  1260
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "title",
                                          "value": "={{ $json.title }}"
                                    },
                                    {
                                          "name": "url",
                                          "value": "={{ $json.url }}"
                                    },
                                    {
                                          "name": "content_type",
                                          "value": "={{ $json.content_type }}"
                                    },
                                    {
                                          "name": "publication_date",
                                          "value": "={{ $json.publication_date }}"
                                    },
                                    {
                                          "name": "modification_date",
                                          "value": "={{ $json.modification_date }}"
                                    },
                                    {
                                          "name": "id",
                                          "value": "={{ $json.id }}"
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
            "id": "e7f858eb-4dca-40ea-9da9-af953687e63d",
            "name": "Token Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  2900,
                  1480
            ],
            "parameters": {
                  "chunkSize": 300,
                  "chunkOverlap": 30
            },
            "typeVersion": 1
      },
      {
            "id": "27585104-5315-4c11-b333-4b5d27d9bae4",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  1400,
                  2340
            ],
            "parameters": {
                  "model": "text-embedding-3-small",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "35269a98-d905-4e4f-ae5b-dadad678f260",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2800,
                  2300
            ],
            "parameters": {
                  "model": "gpt-4o-mini",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "cd26b6fa-a8bb-4139-9bec-8656d90d8203",
            "name": "Postgres Chat Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryPostgresChat",
            "position": [
                  2920,
                  2300
            ],
            "parameters": {
                  "tableName": "website_chat_histories"
            },
            "typeVersion": 1.1
      },
      {
            "id": "7c718e1b-1398-49f3-ba67-f970a82983e0",
            "name": "Respond to Webhook",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  3380,
                  2060
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "f91f18e0-7a04-4218-8490-bff35dfbf7a8",
            "name": "Set fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  2360,
                  2060
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "6888175b-853b-457a-96f7-33dfe952a05d",
                                    "name": "documents",
                                    "type": "string",
                                    "value": "={{ \n JSON.stringify(\n $json.documents.map(doc => ({\n metadata: \n 'URL: ' + doc.metadata.url.replaceAll('&rsquo;', \"'\").replaceAll(/[\"]/g, '') + '\\n' +\n 'Publication Date: ' + doc.metadata.publication_date.replaceAll(/[\"]/g, '') + '\\n' +\n 'Modification Date: ' + doc.metadata.modification_date.replaceAll(/[\"]/g, '') + '\\n' +\n 'Content Type: ' + doc.metadata.content_type.replaceAll(/[\"]/g, '') + '\\n' +\n 'Title: ' + doc.metadata.title.replaceAll('&rsquo;', \"'\").replaceAll(/[\"]/g, '') + '\\n',\n \n page_content: doc.pageContent\n }))\n ).replaceAll(/[\\[\\]{}]/g, '')\n}}"
                              },
                              {
                                    "id": "ae310b77-4560-4f44-8c4e-8d13f680072e",
                                    "name": "sessionId",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.sessionId }}"
                              },
                              {
                                    "id": "8738f4de-b3c3-45ad-af4b-8311c8105c35",
                                    "name": "chatInput",
                                    "type": "string",
                                    "value": "={{ $('When chat message received').item.json.chatInput }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "7f392a40-e353-4bb2-9ecf-3ee330110b95",
            "name": "Embeddings OpenAI2",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  6400,
                  860
            ],
            "parameters": {
                  "model": "text-embedding-3-small",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "9e045857-5fcd-4c4b-83ee-ceda28195b76",
            "name": "Default Data Loader1",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  6500,
                  860
            ],
            "parameters": {
                  "options": {
                        "metadata": {
                              "metadataValues": [
                                    {
                                          "name": "title",
                                          "value": "={{ $json.title }}"
                                    },
                                    {
                                          "name": "url",
                                          "value": "={{ $json.url }}"
                                    },
                                    {
                                          "name": "content_type",
                                          "value": "={{ $json.content_type }}"
                                    },
                                    {
                                          "name": "publication_date",
                                          "value": "={{ $json.publication_date }}"
                                    },
                                    {
                                          "name": "modification_date",
                                          "value": "={{ $json.modification_date }}"
                                    },
                                    {
                                          "name": "id",
                                          "value": "={{ $json.id }}"
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
            "id": "d0c1144b-4542-470e-8cbe-f985e839d9d0",
            "name": "Token Splitter1",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  6500,
                  980
            ],
            "parameters": {
                  "chunkSize": 300,
                  "chunkOverlap": 30
            },
            "typeVersion": 1
      },
      {
            "id": "ec7cf1b2-f56f-45da-bb34-1dc8a66a7de6",
            "name": "Markdown1",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  6240,
                  900
            ],
            "parameters": {
                  "html": "={{ $json.content }}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "8399976b-340a-49ce-a5b6-f7339957aa9d",
            "name": "Postgres",
            "type": "n8n-nodes-base.postgres",
            "position": [
                  4260,
                  900
            ],
            "parameters": {
                  "query": "select max(created_at) as last_workflow_execution from n8n_website_embedding_histories",
                  "options": {},
                  "operation": "executeQuery"
            },
            "typeVersion": 2.5
      },
      {
            "id": "88e79403-06df-4f18-9e4c-a4c4e727aa17",
            "name": "Aggregate",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  3300,
                  900
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "db7241e8-1c3a-4f91-99b7-383000f41afe",
            "name": "Aggregate1",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  6800,
                  680
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "94bbba31-d83b-427f-a7dc-336725238294",
            "name": "Aggregate2",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  7180,
                  1160
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "fieldToAggregate": "metadata.id"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "52a110fa-cdd6-4b1d-99fe-394b5dfa0a1f",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  440,
                  600
            ],
            "parameters": {
                  "color": 5,
                  "width": 3308.2687575224263,
                  "height": 1015.3571428571431,
                  "content": "# Workflow 1 : Initial Embedding \n## Use this workflow to create the initial embedding for your WordPress website content\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4cbf8135-a52b-4a54-b7b0-15ea27ce7ae3",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3812,
                  605
            ],
            "parameters": {
                  "color": 5,
                  "width": 3785.6673412474183,
                  "height": 1020.4528919414245,
                  "content": "# Workflow 2 : Upsert\n## Use this workflow to upsert embeddings for documents stored in the Supabase vector table\n"
            },
            "typeVersion": 1
      },
      {
            "id": "f6e954e0-a37a-45ac-9882-20f4f1944b70",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  440,
                  1820
            ],
            "parameters": {
                  "color": 5,
                  "width": 3235.199999999999,
                  "height": 817.9199999999992,
                  "content": "# Workflow 3 : Use this workflow to enable chat functionality with your website content. The chat can be embedded into your website to enhance user experience"
            },
            "typeVersion": 1
      },
      {
            "id": "acbdd54b-f02a-41aa-a0ce-8642db560151",
            "name": "Wordpress - Get all posts",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  1260,
                  880
            ],
            "parameters": {
                  "options": {},
                  "operation": "getAll",
                  "returnAll": true
            },
            "typeVersion": 1
      },
      {
            "id": "94fce59d-9336-4d49-a378-17335ec02e52",
            "name": "Wordpress - Get all pages",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  1260,
                  1060
            ],
            "parameters": {
                  "options": {},
                  "resource": "page",
                  "operation": "getAll",
                  "returnAll": true
            },
            "typeVersion": 1
      },
      {
            "id": "b00c92e5-1765-4fd9-9981-e01053992a0a",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1157,
                  727
            ],
            "parameters": {
                  "width": 1108.3519999999999,
                  "height": 561.4080000000004,
                  "content": "## Use filters to create embeddings only for content that you want to include in your GenAI application"
            },
            "typeVersion": 1
      },
      {
            "id": "f8a22739-898d-456b-93f8-79f74b60a00c",
            "name": "Set fields1",
            "type": "n8n-nodes-base.set",
            "position": [
                  2320,
                  900
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "de6711dc-d03c-488c-bef4-0a853e2d0a14",
                                    "name": "publication_date",
                                    "type": "string",
                                    "value": "={{ $json.date }}"
                              },
                              {
                                    "id": "f8e35dcc-c96c-4554-b6bc-8e5d7eca90e3",
                                    "name": "modification_date",
                                    "type": "string",
                                    "value": "={{ $json.modified }}"
                              },
                              {
                                    "id": "f6a6e3de-fe39-4cfc-ab07-c4ccfaef78f5",
                                    "name": "content_type",
                                    "type": "string",
                                    "value": "={{ $json.type }}"
                              },
                              {
                                    "id": "b0428598-073f-4560-9a0c-01caf3708921",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $json.title.rendered }}"
                              },
                              {
                                    "id": "534f51b4-b43a-40d3-8120-58df8043d909",
                                    "name": "url",
                                    "type": "string",
                                    "value": "={{ $json.link }}"
                              },
                              {
                                    "id": "dbe0c559-90bd-49f8-960e-0d85d5ed4f5e",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $json.content.rendered }}"
                              },
                              {
                                    "id": "892be7c6-b032-4129-b285-1986ed4ee046",
                                    "name": "protected",
                                    "type": "boolean",
                                    "value": "={{ $json.excerpt.protected }}"
                              },
                              {
                                    "id": "06fac885-4431-41ff-a43b-6eb84ca57401",
                                    "name": "status",
                                    "type": "string",
                                    "value": "={{ $json.status }}"
                              },
                              {
                                    "id": "43b1aea7-895e-41da-a0a6-2f1cec1f1b97",
                                    "name": "id",
                                    "type": "number",
                                    "value": "={{ $json.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "404db031-f470-4e42-a3b3-66b849a86174",
            "name": "Filter - Only published & unprotected content",
            "type": "n8n-nodes-base.filter",
            "position": [
                  2520,
                  900
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
                                    "id": "1f708587-f3d3-487a-843a-b6a2bfad2ca9",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "false",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.protected }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "04f47269-e112-44c3-9014-749898aca8bd",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.status }}",
                                    "rightValue": "publish"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "05bb6091-515e-4f22-a3fd-d25b2046a03d",
            "name": "HTML To Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  2740,
                  900
            ],
            "parameters": {
                  "html": "={{ $json.content}}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "391e9ea7-71dd-42ae-bee7-badcae32427c",
            "name": "Supabase - Store workflow execution",
            "type": "n8n-nodes-base.supabase",
            "position": [
                  3520,
                  900
            ],
            "parameters": {
                  "tableId": "n8n_website_embedding_histories",
                  "fieldsUi": {
                        "fieldValues": [
                              {
                                    "fieldId": "id",
                                    "fieldValue": "={{ $executionId }}"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "47dad096-efc8-4bdd-9c22-49562325d8a0",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  1320
            ],
            "parameters": {
                  "width": 851.1898437499999,
                  "height": 275.2000000000001,
                  "content": "## Run these two nodes if the \"documents\" table on Supabase and the \"n8n_website_embedding_histories\" table do not exist"
            },
            "typeVersion": 1
      },
      {
            "id": "d19f3a5f-fa42-46d0-a366-4c5a5d09f559",
            "name": "Every 30 seconds",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  3940,
                  900
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "seconds"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a22ab0dd-1da8-4fc2-8106-6130bf7938c8",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3820,
                  740
            ],
            "parameters": {
                  "width": 336.25,
                  "height": 292.5,
                  "content": "## Set this node to match the frequency of publishing and updating on your website"
            },
            "typeVersion": 1
      },
      {
            "id": "ba25135b-6e6e-406b-b18a-f532a6e37276",
            "name": "Wordpress - Get posts modified after last workflow execution",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  4600,
                  840
            ],
            "parameters": {
                  "url": "https://mydomain.com/wp-json/wp/v2/posts",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "modified_after",
                                    "value": "={{ $json.last_workflow_execution }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "wordpressApi"
            },
            "typeVersion": 4.2
      },
      {
            "id": "a1d8572e-2b0d-40a1-a898-bbd563a6b190",
            "name": "Wordpress - Get posts modified after last workflow execution1",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  4600,
                  1060
            ],
            "parameters": {
                  "url": "https://mydomain.com/wp-json/wp/v2/pages",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "modified_after",
                                    "value": "={{ $json.last_workflow_execution }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "wordpressApi"
            },
            "typeVersion": 4.2
      },
      {
            "id": "c0839aaa-8ba7-47ff-8fa9-dc75e1c4da84",
            "name": "Set fields2",
            "type": "n8n-nodes-base.set",
            "position": [
                  5420,
                  920
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "de6711dc-d03c-488c-bef4-0a853e2d0a14",
                                    "name": "publication_date",
                                    "type": "string",
                                    "value": "={{ $json.date }}"
                              },
                              {
                                    "id": "f8e35dcc-c96c-4554-b6bc-8e5d7eca90e3",
                                    "name": "modification_date",
                                    "type": "string",
                                    "value": "={{ $json.modified }}"
                              },
                              {
                                    "id": "f6a6e3de-fe39-4cfc-ab07-c4ccfaef78f5",
                                    "name": "content_type",
                                    "type": "string",
                                    "value": "={{ $json.type }}"
                              },
                              {
                                    "id": "b0428598-073f-4560-9a0c-01caf3708921",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $json.title.rendered }}"
                              },
                              {
                                    "id": "534f51b4-b43a-40d3-8120-58df8043d909",
                                    "name": "url",
                                    "type": "string",
                                    "value": "={{ $json.link }}"
                              },
                              {
                                    "id": "dbe0c559-90bd-49f8-960e-0d85d5ed4f5e",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $json.content.rendered }}"
                              },
                              {
                                    "id": "892be7c6-b032-4129-b285-1986ed4ee046",
                                    "name": "protected",
                                    "type": "boolean",
                                    "value": "={{ $json.content.protected }}"
                              },
                              {
                                    "id": "06fac885-4431-41ff-a43b-6eb84ca57401",
                                    "name": "status",
                                    "type": "string",
                                    "value": "={{ $json.status }}"
                              },
                              {
                                    "id": "43b1aea7-895e-41da-a0a6-2f1cec1f1b97",
                                    "name": "id",
                                    "type": "number",
                                    "value": "={{ $json.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "15b1d30a-5861-4380-89d5-0eef65240503",
            "name": "Filter - Only published and unprotected content",
            "type": "n8n-nodes-base.filter",
            "position": [
                  5760,
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
                                    "id": "c2b25d74-91d7-44ea-8598-422100947b07",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "false",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.protected }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "3e63bf79-25ca-4ccf-aa86-ff5f90e1ece1",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $json.status }}",
                                    "rightValue": "publish"
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "0990f503-8d6f-44f6-8d04-7e2f7d74301a",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  6040,
                  920
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "6cc4e46e-3884-4259-b7ed-51c5552cc3e0",
            "name": "Set fields3",
            "type": "n8n-nodes-base.set",
            "position": [
                  7400,
                  1160
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "de6711dc-d03c-488c-bef4-0a853e2d0a14",
                                    "name": "publication_date",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.publication_date }}"
                              },
                              {
                                    "id": "f8e35dcc-c96c-4554-b6bc-8e5d7eca90e3",
                                    "name": "modification_date",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.modification_date }}"
                              },
                              {
                                    "id": "f6a6e3de-fe39-4cfc-ab07-c4ccfaef78f5",
                                    "name": "content_type",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.content_type }}"
                              },
                              {
                                    "id": "b0428598-073f-4560-9a0c-01caf3708921",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.title }}"
                              },
                              {
                                    "id": "534f51b4-b43a-40d3-8120-58df8043d909",
                                    "name": "url",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.url }}"
                              },
                              {
                                    "id": "dbe0c559-90bd-49f8-960e-0d85d5ed4f5e",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.content }}"
                              },
                              {
                                    "id": "892be7c6-b032-4129-b285-1986ed4ee046",
                                    "name": "protected",
                                    "type": "boolean",
                                    "value": "={{ $('Loop Over Items').item.json.protected }}"
                              },
                              {
                                    "id": "06fac885-4431-41ff-a43b-6eb84ca57401",
                                    "name": "status",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.status }}"
                              },
                              {
                                    "id": "43b1aea7-895e-41da-a0a6-2f1cec1f1b97",
                                    "name": "id",
                                    "type": "number",
                                    "value": "={{ $('Loop Over Items').item.json.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "24f47982-a803-4848-8390-c400a8cebcee",
            "name": "Set fields4",
            "type": "n8n-nodes-base.set",
            "position": [
                  6680,
                  1400
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "de6711dc-d03c-488c-bef4-0a853e2d0a14",
                                    "name": "publication_date",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.publication_date }}"
                              },
                              {
                                    "id": "f8e35dcc-c96c-4554-b6bc-8e5d7eca90e3",
                                    "name": "modification_date",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.modification_date }}"
                              },
                              {
                                    "id": "f6a6e3de-fe39-4cfc-ab07-c4ccfaef78f5",
                                    "name": "content_type",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.content_type }}"
                              },
                              {
                                    "id": "b0428598-073f-4560-9a0c-01caf3708921",
                                    "name": "title",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.title }}"
                              },
                              {
                                    "id": "534f51b4-b43a-40d3-8120-58df8043d909",
                                    "name": "url",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.url }}"
                              },
                              {
                                    "id": "dbe0c559-90bd-49f8-960e-0d85d5ed4f5e",
                                    "name": "content",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.content }}"
                              },
                              {
                                    "id": "892be7c6-b032-4129-b285-1986ed4ee046",
                                    "name": "protected",
                                    "type": "boolean",
                                    "value": "={{ $('Loop Over Items').item.json.protected }}"
                              },
                              {
                                    "id": "06fac885-4431-41ff-a43b-6eb84ca57401",
                                    "name": "status",
                                    "type": "string",
                                    "value": "={{ $('Loop Over Items').item.json.status }}"
                              },
                              {
                                    "id": "43b1aea7-895e-41da-a0a6-2f1cec1f1b97",
                                    "name": "id",
                                    "type": "number",
                                    "value": "={{ $('Loop Over Items').item.json.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "5f59ebbf-ca17-4311-809c-85b74ce624cc",
            "name": "Store documents on Supabase",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  6380,
                  680
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {
                        "queryName": "match_documents"
                  },
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "documents",
                        "cachedResultName": "documents"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2422562e-9c95-4d77-ae8c-485b06f9234e",
            "name": "Store workflow execution id and timestamptz",
            "type": "n8n-nodes-base.supabase",
            "position": [
                  7060,
                  680
            ],
            "parameters": {
                  "tableId": "n8n_website_embedding_histories"
            },
            "typeVersion": 1
      },
      {
            "id": "5013f3a1-f7fb-4fa7-9ef2-3599f77f5fc8",
            "name": "Aggregate documents",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1960,
                  2060
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "renameField": true,
                                    "outputFieldName": "documents",
                                    "fieldToAggregate": "document"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "26532217-3206-4be3-b186-733bc364913b",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1220,
                  1980
            ],
            "parameters": {
                  "width": 665.78125,
                  "height": 507.65625,
                  "content": "## Retrieve documents from Supabase immediately after chat input to send metadata to OpenAI"
            },
            "typeVersion": 1
      },
      {
            "id": "78d2806c-8d13-44b8-bd6d-866fa794edae",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  6375,
                  1090
            ],
            "parameters": {
                  "width": 1198.9843749999998,
                  "height": 515.4687499999998,
                  "content": "## Switch:\n- **If the document exists and has been updated:** delete rows and insert new embedding\n- **If it’s a new document:** insert embedding"
            },
            "typeVersion": 1
      },
      {
            "id": "3b5ffada-ae2a-45a2-a76c-69732b05761c",
            "name": "Postgres - Create documents table",
            "type": "n8n-nodes-base.postgres",
            "position": [
                  560,
                  1440
            ],
            "parameters": {
                  "query": "-- Enable the pgvector extension to work with embedding vectors\nCREATE EXTENSION vector;\n\n-- Create a table to store your documents with default RLS\nCREATE TABLE\n documents (\n id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,\n CONTENT TEXT, -- corresponds to Document.pageContent\n metadata jsonb, -- corresponds to Document.metadata\n embedding vector (1536) -- 1536 works for OpenAI embeddings, change if needed\n );\n\n-- Enable Row Level Security on the documents table\nALTER TABLE documents ENABLE ROW LEVEL SECURITY;\n\n-- Create a function to search for documents\nCREATE FUNCTION match_documents (\n query_embedding vector (1536),\n match_count INT DEFAULT NULL,\n FILTER jsonb DEFAULT '{}'\n) RETURNS TABLE (\n id BIGINT,\n CONTENT TEXT,\n metadata jsonb,\n similarity FLOAT\n) LANGUAGE plpgsql AS $$\n#variable_conflict use_column\nBEGIN\n RETURN QUERY\n SELECT\n id,\n content,\n metadata,\n 1 - (documents.embedding <=> query_embedding) AS similarity\n FROM documents\n WHERE metadata @> filter\n ORDER BY documents.embedding <=> query_embedding\n LIMIT match_count;\nEND;\n$$;",
                  "options": {},
                  "operation": "executeQuery"
            },
            "typeVersion": 2.5
      },
      {
            "id": "632a7b44-a062-472e-a777-805ee74a4bd6",
            "name": "Postgres - Create workflow execution history table",
            "type": "n8n-nodes-base.postgres",
            "position": [
                  920,
                  1440
            ],
            "parameters": {
                  "query": "CREATE TABLE\n n8n_website_embedding_histories (\n id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,\n created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n );",
                  "options": {},
                  "operation": "executeQuery"
            },
            "typeVersion": 2.5
      },
      {
            "id": "7c55e08b-e116-4e22-bd1d-e4bec5107d89",
            "name": "Merge Wordpress Posts and Pages",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1660,
                  900
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "4520db6c-2e68-45ff-9439-6fd95f95dc85",
            "name": "Merge retrieved WordPress posts and pages",
            "type": "n8n-nodes-base.merge",
            "position": [
                  5120,
                  920
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "d547a063-6b76-4bfd-ba0a-165181c4af19",
            "name": "Postgres - Filter on existing documents",
            "type": "n8n-nodes-base.postgres",
            "position": [
                  6260,
                  1180
            ],
            "parameters": {
                  "query": "SELECT *\nFROM documents\nWHERE (metadata->>'id')::integer = {{ $json.id }};\n",
                  "options": {},
                  "operation": "executeQuery"
            },
            "typeVersion": 2.5,
            "alwaysOutputData": true
      },
      {
            "id": "03456a81-d512-4fd8-842a-27b6d8b3f94e",
            "name": "Supabase - Delete row if documents exists",
            "type": "n8n-nodes-base.supabase",
            "position": [
                  6900,
                  1160
            ],
            "parameters": {
                  "tableId": "documents",
                  "operation": "delete",
                  "filterType": "string",
                  "filterString": "=metadata->>id=like.{{ $json.metadata.id }}"
            },
            "executeOnce": false,
            "typeVersion": 1,
            "alwaysOutputData": false
      },
      {
            "id": "72e5bf4b-c413-4fb7-acb8-59e7abee60f7",
            "name": "Switch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  6580,
                  1180
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "existing_documents",
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
                                                            "type": "number",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.metadata.id }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "new_documents",
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
                                                      "id": "696d1c1b-8674-4549-880e-e0d0ff681905",
                                                      "operator": {
                                                            "type": "number",
                                                            "operation": "notExists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.metadata.id }}",
                                                      "rightValue": ""
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
            "id": "6c5d8f6a-569e-4f1e-99a6-07ec492575ff",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  660,
                  2060
            ],
            "webhookId": "4e762668-c19f-40ec-83bf-302bb9fc6527",
            "parameters": {
                  "mode": "webhook",
                  "public": true,
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "9a2f17ba-902f-4528-9eef-f8c0e4ddf516",
            "name": "Supabase - Retrieve documents from chatinput",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  1380,
                  2060
            ],
            "parameters": {
                  "mode": "load",
                  "prompt": "={{ $json.chatInput }}",
                  "options": {},
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "documents",
                        "cachedResultName": "documents"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "43607f23-d33f-4aca-b478-f20ba8c218cf",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2780,
                  2060
            ],
            "parameters": {
                  "text": "=Visitor's question : {{ $json.chatInput }}\nDocuments found: {{ $json.documents }}",
                  "agent": "conversationalAgent",
                  "options": {
                        "systemMessage": "You are an assistant tasked with answering questions from visitors to the website {{your_website_url}}.\n\nInput:\nVisitor's question: The question posed by the visitor.\nDocuments found: A selection of documents from the vector database that match the visitor's question. These documents are accompanied by the following metadata:\nurl: The URL of the page or blog post found.\ncontent_type: The type of content (e.g., page or blog article).\npublication_date: The publication date of the document.\nmodification_date: The last modification date of the document.\nObjective:\nProvide a helpful answer using the relevant information from the documents found.\nIMPORTANT : You must always include all metadata (url, content_type, publication_date, and modification_date) directly in the main answer to the visitor to indicate the source of the information. These should not be separated from the main answer, and must be naturally integrated into the response.\nIf multiple documents are used in your response, mention each one with its respective metadata.\nIf no relevant documents are found, or if the documents are insufficient, clearly indicate this in your response.\nImportant: Respond in the language used by the visitor who asked the question.\nExample of forced metadata integration:\n\"The cost of a home charging station for an electric vehicle varies depending on several factors. According to [title of the page](https://example.com/charging-point-price), published on April 8, 2021, and updated on July 24, 2022, the price for a 7kW station is €777.57 including VAT. This page provides further details about the price range and installation considerations.\""
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "cd4107cb-e521-4c1e-88e2-3417a12fd585",
            "name": "Supabase Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
            "position": [
                  2940,
                  900
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {
                        "queryName": "match_documents"
                  },
                  "tableName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "documents",
                        "cachedResultName": "documents"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Switch": {
            "main": [
                  [
                        {
                              "node": "Supabase - Delete row if documents exists",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set fields4",
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
                              "node": "Respond to Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Postgres": {
            "main": [
                  [
                        {
                              "node": "Wordpress - Get posts modified after last workflow execution",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Wordpress - Get posts modified after last workflow execution1",
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
                              "node": "Supabase - Store workflow execution",
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
                              "node": "Store documents on Supabase",
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
                              "node": "Store workflow execution id and timestamptz",
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
                              "node": "Set fields3",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set fields": {
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
      "Set fields1": {
            "main": [
                  [
                        {
                              "node": "Filter - Only published & unprotected content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set fields2": {
            "main": [
                  [
                        {
                              "node": "Filter - Only published and unprotected content",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set fields3": {
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
      "Set fields4": {
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
      "Loop Over Items": {
            "main": [
                  [
                        {
                              "node": "Markdown1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Postgres - Filter on existing documents",
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
                              "node": "Default Data Loader1",
                              "type": "ai_textSplitter",
                              "index": 0
                        }
                  ]
            ]
      },
      "Every 30 seconds": {
            "main": [
                  [
                        {
                              "node": "Postgres",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "HTML To Markdown": {
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
                              "node": "Supabase - Retrieve documents from chatinput",
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
                              "node": "Store documents on Supabase",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Aggregate documents": {
            "main": [
                  [
                        {
                              "node": "Set fields",
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
                              "node": "Supabase Vector Store",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Default Data Loader1": {
            "ai_document": [
                  [
                        {
                              "node": "Store documents on Supabase",
                              "type": "ai_document",
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
      "Supabase Vector Store": {
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
      "Wordpress - Get all pages": {
            "main": [
                  [
                        {
                              "node": "Merge Wordpress Posts and Pages",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Wordpress - Get all posts": {
            "main": [
                  [
                        {
                              "node": "Merge Wordpress Posts and Pages",
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
                              "node": "Supabase - Retrieve documents from chatinput",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Store documents on Supabase": {
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
      "Merge Wordpress Posts and Pages": {
            "main": [
                  [
                        {
                              "node": "Set fields1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Postgres - Create documents table": {
            "main": [
                  [
                        {
                              "node": "Postgres - Create workflow execution history table",
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
                              "node": "Wordpress - Get all posts",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Wordpress - Get all pages",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Postgres - Filter on existing documents": {
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
      "Merge retrieved WordPress posts and pages": {
            "main": [
                  [
                        {
                              "node": "Set fields2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Supabase - Delete row if documents exists": {
            "main": [
                  [
                        {
                              "node": "Aggregate2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Supabase - Retrieve documents from chatinput": {
            "main": [
                  [
                        {
                              "node": "Aggregate documents",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter - Only published & unprotected content": {
            "main": [
                  [
                        {
                              "node": "HTML To Markdown",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Filter - Only published and unprotected content": {
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
      "Wordpress - Get posts modified after last workflow execution": {
            "main": [
                  [
                        {
                              "node": "Merge retrieved WordPress posts and pages",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Wordpress - Get posts modified after last workflow execution1": {
            "main": [
                  [
                        {
                              "node": "Merge retrieved WordPress posts and pages",
                              "type": "main",
                              "index": 1
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
    name: "Write a WordPress post with AI (starting from a few keywords)",
    nodes: [
      {
            "id": "a4f19a81-6101-48c2-9560-9cf231bc240b",
            "name": "Form",
            "type": "n8n-nodes-base.formTrigger",
            "position": [
                  -580,
                  320
            ],
            "webhookId": "4b937814-e829-4df7-aaba-31192babf7e1",
            "parameters": {
                  "path": "create-wordpress-post",
                  "formTitle": "Create a WordPress post with AI",
                  "formFields": {
                        "values": [
                              {
                                    "fieldLabel": "Keywords (comma-separated)",
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "dropdown",
                                    "fieldLabel": "Number of chapters",
                                    "fieldOptions": {
                                          "values": [
                                                {
                                                      "option": "1"
                                                },
                                                {
                                                      "option": "2"
                                                },
                                                {
                                                      "option": "3"
                                                },
                                                {
                                                      "option": "4"
                                                },
                                                {
                                                      "option": "5"
                                                },
                                                {
                                                      "option": "6"
                                                },
                                                {
                                                      "option": "7"
                                                },
                                                {
                                                      "option": "8"
                                                },
                                                {
                                                      "option": "9"
                                                },
                                                {
                                                      "option": "10"
                                                }
                                          ]
                                    },
                                    "requiredField": true
                              },
                              {
                                    "fieldType": "number",
                                    "fieldLabel": "Max words count",
                                    "requiredField": true
                              }
                        ]
                  },
                  "responseMode": "responseNode",
                  "formDescription": "Fill this form with the required information to create a draft post on WordPress"
            },
            "typeVersion": 2
      },
      {
            "id": "e4cf75f7-00e7-473a-a944-af635581715f",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  209.98769233621147,
                  140
            ],
            "parameters": {
                  "color": 4,
                  "width": 301.3874093724939,
                  "height": 371.765663140765,
                  "content": "## Data check"
            },
            "typeVersion": 1
      },
      {
            "id": "e949a487-6701-4650-b9be-08146b4e93ad",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  225.20535922952297,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 272.8190508599808,
                  "height": 80,
                  "content": "Checks that the data returned by OpenAI is correct"
            },
            "typeVersion": 1
      },
      {
            "id": "662fe28b-c0b7-4aef-b99c-a8c4c641251c",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1580,
                  140
            ],
            "parameters": {
                  "color": 5,
                  "width": 282.3398199598652,
                  "height": 371.7656631407652,
                  "content": "## Draft on WordPress"
            },
            "typeVersion": 1
      },
      {
            "id": "85996d51-ab98-41f5-b525-d926f04f50a8",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1595,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 254.77269221373095,
                  "height": 80,
                  "content": "The article is posted as a draft on WordPress"
            },
            "typeVersion": 1
      },
      {
            "id": "46f67505-f2dc-4110-b1d4-a27d7814cb52",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1881,
                  140
            ],
            "parameters": {
                  "color": 3,
                  "width": 557.7592769264069,
                  "height": 369.2595606183891,
                  "content": "## Featured image"
            },
            "typeVersion": 1
      },
      {
            "id": "a1beeb4f-f171-4c6a-ac19-7086b09757ab",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1900,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 517.9195082760601,
                  "height": 80,
                  "content": "The image is generated with Dall-E, uploaded to WordPress, and then connected to the post as its featured image"
            },
            "typeVersion": 1
      },
      {
            "id": "d1fd737b-7f14-4371-8720-7742f708e641",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -117.99507693448459,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 287.370178643191,
                  "height": 80,
                  "content": "Starting from the given keywords, generates the article title, subtitle, chapters, and image prompt"
            },
            "typeVersion": 1
      },
      {
            "id": "ccaaf851-613b-4d0c-8b3d-99a35ec9cdad",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -129.93405171072595,
                  142
            ],
            "parameters": {
                  "color": 6,
                  "width": 319.697690939268,
                  "height": 370.512611879577,
                  "content": "## Article structure"
            },
            "typeVersion": 1
      },
      {
            "id": "69bebd7b-8ad5-4b0d-a8df-1b2e6d4be96e",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -640,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 239.97343293577688,
                  "height": 370.512611879577,
                  "content": "## User form"
            },
            "typeVersion": 1
      },
      {
            "id": "2037f81b-189c-4dc4-a4dc-179e4283544c",
            "name": "Sticky Note13",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -623,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 199.7721486302032,
                  "height": 80,
                  "content": "The user triggers the post creation"
            },
            "typeVersion": 1
      },
      {
            "id": "e8d7f711-185d-499b-ba58-de52ac6a4e58",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2461,
                  140
            ],
            "parameters": {
                  "color": 7,
                  "width": 219.70753707029849,
                  "height": 370.512611879577,
                  "content": "## User feedback"
            },
            "typeVersion": 1
      },
      {
            "id": "d89bebca-3607-4c66-a13d-07c32262e01a",
            "name": "Sticky Note14",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2481,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 183.38125554060056,
                  "height": 80,
                  "content": "Final confirmation to the user"
            },
            "typeVersion": 1
      },
      {
            "id": "7df452e2-52f3-4efe-94a4-7d4eab0670c8",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  534.9876923362115,
                  530.9889231025903
            ],
            "parameters": {
                  "color": 7,
                  "width": 281.2716777103785,
                  "height": 288.4116890365125,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nUser is notified to try again since some data is missing"
            },
            "typeVersion": 1
      },
      {
            "id": "f881bcd9-c7d2-4a1c-bc1a-beb515d52ade",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -128.98646156983267,
                  532.991384635348
            ],
            "parameters": {
                  "color": 7,
                  "width": 319.8306137081817,
                  "height": 275.3956890735875,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWikipedia is used to write the article"
            },
            "typeVersion": 1
      },
      {
            "id": "1b788b37-b8b5-47f6-8198-547dac8c76d6",
            "name": "Settings",
            "type": "n8n-nodes-base.set",
            "position": [
                  -320,
                  320
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "3a433b0f-9957-4b64-ad81-359ab5e521d5",
                                    "name": "wordpress_url",
                                    "type": "string",
                                    "value": "https://you-wordpress-url-here.com/"
                              },
                              {
                                    "id": "ec5430e3-92c5-46e4-8c2c-c87291680892",
                                    "name": "keywords",
                                    "type": "string",
                                    "value": "={{ $json['Keywords (comma-separated)'] }}"
                              },
                              {
                                    "id": "5defb0a2-d921-4909-b10d-da59e1768496",
                                    "name": "chapters",
                                    "type": "number",
                                    "value": "={{ $json['Number of chapters'] }}"
                              },
                              {
                                    "id": "230ebd0b-73c2-4265-9b3c-57af7fbc48c8",
                                    "name": "words",
                                    "type": "number",
                                    "value": "={{ $json['Max words count'] }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "af29ed91-84b5-43f8-b1ce-1c8dc35c2c1b",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -377,
                  140
            ],
            "parameters": {
                  "color": 2,
                  "width": 226.71615243495023,
                  "height": 370.512611879577,
                  "content": "## Settings"
            },
            "typeVersion": 1
      },
      {
            "id": "a6fe2238-22ba-4c54-adef-663bd3955dcc",
            "name": "Sticky Note15",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -360,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 179.37633247508526,
                  "height": 80,
                  "content": "Set the URL of your WordPress here"
            },
            "typeVersion": 1
      },
      {
            "id": "358ac79f-be7d-44eb-a353-b2ad4ac8d582",
            "name": "Check data consistency",
            "type": "n8n-nodes-base.if",
            "position": [
                  300,
                  320
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
                                    "id": "9c8c53ea-6079-48da-9d6e-dd527167b123",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.content.title }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "a7fabfe1-3539-453a-93d9-8d6d395c3de4",
                                    "operator": {
                                          "type": "array",
                                          "operation": "lengthGte",
                                          "rightType": "number"
                                    },
                                    "leftValue": "={{ $json.message.content.chapters }}",
                                    "rightValue": "={{ 1 }}"
                              },
                              {
                                    "id": "a687081e-24e2-423c-a2da-b7c18baf0715",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.content.subtitle }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "0a435a69-3699-4b98-b46f-40954c7a7816",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.content.introduction }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "1a440144-21f3-42bd-9222-774bd564f3ef",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.content.conclusions }}",
                                    "rightValue": ""
                              },
                              {
                                    "id": "834ce92d-b1e9-48ef-ae63-1d0841c900b5",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.content.imagePrompt }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "479f474a-1687-4588-8485-d793afc6757d",
            "name": "Split out chapters",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  600,
                  320
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "message.content.chapters"
            },
            "typeVersion": 1
      },
      {
            "id": "bde7b7db-45c6-4ab3-a705-358000cefbec",
            "name": "Merge chapters title and text",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1220,
                  460
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combinationMode": "mergeByPosition"
            },
            "typeVersion": 2.1
      },
      {
            "id": "0079022b-eaa2-481b-8c78-f8623a63645b",
            "name": "Final article text",
            "type": "n8n-nodes-base.code",
            "position": [
                  1400,
                  320
            ],
            "parameters": {
                  "jsCode": "let article = \"\";\n\n// Introduction\narticle += $('Create post title and structure').first().json.message.content.introduction;\narticle += \"<br><br>\";\n\nfor (const item of $input.all()) {\n article += \"<strong>\" + item.json.title + \"</strong>\";\n article += \"<br><br>\";\n article += item.json.message.content;\n article += \"<br><br>\";\n}\n\n// Conclusions\narticle += \"<strong>Conclusions</strong>\";\narticle += \"<br><br>\";\narticle += $('Create post title and structure').first().json.message.content.conclusions;\n\n\nreturn [\n {\n \"article\": article\n }\n];"
            },
            "typeVersion": 1
      },
      {
            "id": "d892f00a-90fd-4bbb-bac6-4684d7d0c638",
            "name": "Post on Wordpress",
            "type": "n8n-nodes-base.wordpress",
            "position": [
                  1680,
                  320
            ],
            "parameters": {
                  "title": "={{ $('Create post title and structure').all()[0].json.message.content.title }}",
                  "additionalFields": {
                        "status": "draft",
                        "content": "={{ $json.article }}"
                  }
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "xxxxxxxxxxx",
                        "name": "WordPress Credentials"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a609d80d-f586-4e5f-a72d-01257f676574",
            "name": "Upload media",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2120,
                  320
            ],
            "parameters": {
                  "url": "https://wp-demo.mondo.surf/wp-json/wp/v2/media",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "contentType": "binaryData",
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Disposition",
                                    "value": "attachment; filename=\"example.jpg\""
                              }
                        ]
                  },
                  "inputDataFieldName": "data",
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "xxxxxxxxxxx",
                        "name": "WordPress Credentials"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "bdb2ef52-0201-4fe1-a7a6-59e34e21bf5e",
            "name": "Set image ID for the post",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2280,
                  320
            ],
            "parameters": {
                  "url": "=https://wp-demo.mondo.surf/wp-json/wp/v2/posts/{{ $('Post on Wordpress').item.json.id }}",
                  "method": "POST",
                  "options": {},
                  "sendQuery": true,
                  "authentication": "predefinedCredentialType",
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "featured_media",
                                    "value": "={{ $json.id }}"
                              }
                        ]
                  },
                  "nodeCredentialType": "wordpressApi"
            },
            "credentials": {
                  "wordpressApi": {
                        "id": "xxxxxxxxxxx",
                        "name": "WordPress Credentials"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "a721762f-168d-4c87-ab6d-0d31deecd9a5",
            "name": "Respond: Success",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  2520,
                  320
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "json",
                  "responseBody": "={\n \"formSubmittedText\": \"The article {{ $json.title.rendered }} was correctly created as a draft on WordPress!\"\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "51b79bc2-035d-4db8-87bb-db6c889b164e",
            "name": "Respond: Error",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  620,
                  580
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "json",
                  "responseBody": "={\n 'formSubmittedText': 'There was a problem creating the article, please refresh the form and try again!'\n}\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "d8748498-0800-4208-b993-f233d14da7b6",
            "name": "Sticky Note16",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  533.7711864406776,
                  140
            ],
            "parameters": {
                  "color": 2,
                  "width": 225.47038972308582,
                  "height": 370.512611879577,
                  "content": "## Chapters split"
            },
            "typeVersion": 1
      },
      {
            "id": "4115de31-d4e9-4d77-a055-3dead31c4dc5",
            "name": "Sticky Note17",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  550.7711864406779,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 185.6051460344073,
                  "height": 80,
                  "content": "Splits out chapter contents from the previous node"
            },
            "typeVersion": 1
      },
      {
            "id": "aff8edf6-4e1e-4522-86f7-f0ce88cd0cd4",
            "name": "Sticky Note18",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  792,
                  198
            ],
            "parameters": {
                  "color": 7,
                  "width": 287.370178643191,
                  "height": 80,
                  "content": "Writes the text for each chapter"
            },
            "typeVersion": 1
      },
      {
            "id": "e45715a8-b1ca-4499-a16a-854f8bd4f370",
            "name": "Sticky Note19",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  780,
                  140
            ],
            "parameters": {
                  "color": 6,
                  "width": 333.40108076977657,
                  "height": 370.512611879577,
                  "content": "## Chapters text"
            },
            "typeVersion": 1
      },
      {
            "id": "5c4cd7a1-7dc9-4159-9bd2-dbe5f8feb663",
            "name": "Sticky Note21",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1138.423429009716,
                  140
            ],
            "parameters": {
                  "color": 4,
                  "width": 420.4253447940705,
                  "height": 514.2177254645992,
                  "content": "## Content preparation"
            },
            "typeVersion": 1
      },
      {
            "id": "7a6d3f7d-0436-4844-b09a-37e805b95a2f",
            "name": "Sticky Note22",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1160,
                  200
            ],
            "parameters": {
                  "color": 7,
                  "width": 368.1523541074699,
                  "height": 80,
                  "content": "Merges the content and prepare it before sending it to WordPress"
            },
            "typeVersion": 1
      },
      {
            "id": "903b695d-015a-4956-9c63-45802dfb9fdb",
            "name": "Generate featured image",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1940,
                  320
            ],
            "parameters": {
                  "prompt": "=Generate a photographic image to be used as the cover image for the article titled: {{ $('Create post title and structure').all()[0].json.message.content.title }}. This is the prompt for the image: {{ $('Create post title and structure').all()[0].json.message.content.imagePrompt }}, photography, realistic, sigma 85mm f/1.4",
                  "options": {
                        "size": "1792x1024",
                        "style": "natural",
                        "quality": "hd"
                  },
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "xxxxxxxxxxx",
                        "name": "OpenAI Credentials"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "faa847cb-9702-4207-aa1e-6d9f62493527",
            "name": "Wikipedia",
            "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
            "position": [
                  -20,
                  620
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "9d09c92e-11c0-4ea9-81d6-13bc9266741a",
            "name": "Create post title and structure",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  -100,
                  320
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4-1106-preview",
                        "cachedResultName": "GPT-4-1106-PREVIEW"
                  },
                  "options": {
                        "maxTokens": 2048
                  },
                  "messages": {
                        "values": [
                              {
                                    "content": "=Write the title, the subtitle, the chapters details, the introduction, the conclusions, and an image prompt for a SEO-friendly article about these topics:\n{{ $json.keywords }}.\n\nInstructions:\n- Place the article title in a JSON field called `title`\n- Place the subtitle in a JSON field called `subtitle`\n- Place the introduction in a JSON field called `introduction`\n- In the introduction introduce the topic that is then explored in depth in the rest of the text\n- The introduction should be around 60 words\n- Place the conclusions in a JSON field called `conclusions`\n- The conclusions should be around 60 words\n- Use the conclusions to sum all said in the article and offer a conclusion to the reader\n- The image prompt will be used to produce a photographic cover image for the article and should depict the topics discussed in the article\n- Place the image prompt in a JSON field called `imagePrompt`\n- There should be {{ $json.chapters.toString() }} chapters.\n- For each chapter provide a title and an exaustive prompt that will be used to write the chapter text.\n- Place the chapters in an array field called `chapters`\n- For each chapter provide the fields `title` and `prompt`\n- The chapters should follow a logical flow and not repeat the same concepts.\n- The chapters should be one related to the other and not isolated blocks of text. The text should be fluent and folow a linear logic.\n- Don't start the chapters with \"Chapter 1\", \"Chapter 2\", \"Chapter 3\"... just write the title of the chapter\n- For the title and the capthers' titles don't use colons (`:`)\n- For the text, use HTML for formatting, but limited to bold, italic and lists.\n- Don't use markdown for formatting.\n- Always search on Wikipedia for useful information or verify the accuracy of what you write.\n- Never mention it if you don't find information on Wikipedia or the web\n- Go deep in the topic you treat, don't just throw some superficial info"
                              }
                        ]
                  },
                  "jsonOutput": true
            },
            "credentials": {
                  "openAiApi": {
                        "id": "xxxxxxxxxxx",
                        "name": "OpenAI Credentials"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2ecd3a50-a34f-4ab9-ad31-e4e6608708fb",
            "name": "Create chapters text",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  820,
                  320
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4-0125-preview",
                        "cachedResultName": "GPT-4-0125-PREVIEW"
                  },
                  "options": {
                        "maxTokens": 2048
                  },
                  "messages": {
                        "values": [
                              {
                                    "content": "=Write a chapter for the article: {{ $('Create post title and structure').item.json.message.content.title }}, {{ $('Create post title and structure').item.json.message.content.subtitle }}, that talks about {{ $('Settings').item.json[\"keywords\"] }}\n\nThis is the prompt for the chapter titled {{ $json.title }}: {{ $json.prompt }}.\n\nGuidelines:\n- Just return the plain text for each chapter (no JSON structure).\n- Don't use markdown for formatting.\n- Use HTML for formatting, but limited to bold, italic and lists.\n- Don't add internal titles or headings.\n- The length of each chapther should be around {{ Math.round(($('Settings').item.json.words - 120)/ $('Settings').item.json.chapters) }} words long\n- Go deep in the topic you treat, don't just throw some superficial info\n{{ $itemIndex > 0 ? \"- The previous chapter talks about \" + $input.all()[$itemIndex-1].json.title : \"\" }}\n{{ $itemIndex > 0 ? \"- The promt for the previous chapter is \" + $input.all()[$itemIndex-1].json.prompt : \"\" }}\n{{ $itemIndex < $input.all().length ? \"- The following chapter will talk about \" + $input.all()[$itemIndex+1].json.title: \"\" }}\n{{ $itemIndex < $input.all().length ? \"- The prompt for the following chapter is \" + $input.all()[$itemIndex+1].json.prompt : \"\" }}\n- Consider the previous and following chapters what writing the text for this chapter. The text must be coherent with the previous and following chapters.\n- This chapter should not repeat the concepts already exposed in the previous chapter.\n- This chapter is a part of a larger article so don't include an introduction or conclusions. This chapter should merge with the rest of the article.\n"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "xxxxxxxxxxx",
                        "name": "OpenAI Credentials"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Form": {
            "main": [
                  [
                        {
                              "node": "Settings",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Settings": {
            "main": [
                  [
                        {
                              "node": "Create post title and structure",
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
                              "node": "Create post title and structure",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Upload media": {
            "main": [
                  [
                        {
                              "node": "Set image ID for the post",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Post on Wordpress": {
            "main": [
                  [
                        {
                              "node": "Generate featured image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Final article text": {
            "main": [
                  [
                        {
                              "node": "Post on Wordpress",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split out chapters": {
            "main": [
                  [
                        {
                              "node": "Merge chapters title and text",
                              "type": "main",
                              "index": 1
                        },
                        {
                              "node": "Create chapters text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create chapters text": {
            "main": [
                  [
                        {
                              "node": "Merge chapters title and text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check data consistency": {
            "main": [
                  [
                        {
                              "node": "Split out chapters",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Respond: Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate featured image": {
            "main": [
                  [
                        {
                              "node": "Upload media",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set image ID for the post": {
            "main": [
                  [
                        {
                              "node": "Respond: Success",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge chapters title and text": {
            "main": [
                  [
                        {
                              "node": "Final article text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create post title and structure": {
            "main": [
                  [
                        {
                              "node": "Check data consistency",
                              "type": "main",
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
      "saveDataSuccessExecution": "all"
},
  },
];

export function WordpressCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-600' : 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700/50 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:border-cyan-300 dark:hover:border-cyan-600/50 hover:shadow-md'}`}
    >
      <Globe className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-500 dark:text-cyan-400'}`} />
      <span className="truncate max-w-[200px]">WordPress</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {wordpressTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function WordpressTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {wordpressTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-cyan-50/50 dark:group-hover:to-cyan-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-cyan-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Globe className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-cyan-600 dark:hover:bg-cyan-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
