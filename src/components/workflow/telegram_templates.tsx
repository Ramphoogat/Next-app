import React from 'react';
import { Play, Send } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const telegramTemplates: IN8nTemplate[] = [
  {
    name: "Agentic Telegram AI bot with LangChain nodes and new tools",
    nodes: [
      {
            "id": "13b3488e-af72-4d89-bef4-e9b895e3bf76",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1640,
                  580
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {
                        "temperature": 0.7,
                        "frequencyPenalty": 0.2
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "rveqdSfp7pCRON1T",
                        "name": "Ted's Tech Talks OpenAi"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "864937a1-43f6-4055-bdea-61ab07db9903",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1760,
                  580
            ],
            "parameters": {
                  "sessionKey": "=chat_with_{{ $('Listen for incoming events').first().json.message.chat.id }}",
                  "contextWindowLength": 10
            },
            "typeVersion": 1
      },
      {
            "id": "4ef838d4-feaa-4bd3-b2c7-ccd938be4373",
            "name": "Listen for incoming events",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  1580,
                  360
            ],
            "webhookId": "322dce18-f93e-4f86-b9b1-3305519b7834",
            "parameters": {
                  "updates": [
                        "*"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "fed51c41-2846-4a1a-a5f5-ce121ee7fe88",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1460,
                  180
            ],
            "parameters": {
                  "color": 7,
                  "width": 926.3188190787038,
                  "height": 553.452795998601,
                  "content": "## Generate an image with Dall-E-3 and send it via Telegram"
            },
            "typeVersion": 1
      },
      {
            "id": "1c7a204b-3ed7-47bd-a434-202b05272d18",
            "name": "Send final reply",
            "type": "n8n-nodes-base.telegram",
            "onError": "continueErrorOutput",
            "position": [
                  2140,
                  360
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "bebbe9d4-47ba-4c13-9e1e-d36bfe6e472e",
            "name": "Send back an image",
            "type": "n8n-nodes-base.telegramTool",
            "position": [
                  2020,
                  580
            ],
            "parameters": {
                  "file": "={{ $fromAI(\"url\", \"a valid url of an image\", \"string\", \" \") }}",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "operation": "sendDocument",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "38f2410d-bd55-4ddf-8aaa-4e28919de78f",
            "name": "Generate image in Dalle",
            "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
            "position": [
                  1880,
                  580
            ],
            "parameters": {
                  "url": "https://api.openai.com/v1/images/generations",
                  "method": "POST",
                  "sendBody": true,
                  "authentication": "predefinedCredentialType",
                  "parametersBody": {
                        "values": [
                              {
                                    "name": "model",
                                    "value": "dall-e-3",
                                    "valueProvider": "fieldValue"
                              },
                              {
                                    "name": "prompt"
                              }
                        ]
                  },
                  "toolDescription": "Call this tool to request a Dall-E-3 model, when the user asks to draw something. If you gеt a response from this tool, forward it to the Telegram tool.",
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "rveqdSfp7pCRON1T",
                        "name": "Ted's Tech Talks OpenAi"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "34265eab-9f37-475a-a2ae-a6c37c69c595",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1780,
                  360
            ],
            "parameters": {
                  "text": "={{ $json.message.text }}",
                  "options": {
                        "systemMessage": "=You are a helpful assistant. You are communicating with a user named {{ $json.message.from.first_name }}. Address the user by name every time. If the user asks for an image, always send the link to the image in the final reply."
                  },
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
                              "node": "Send final reply",
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
      "Send back an image": {
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
      "Generate image in Dalle": {
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
      "Listen for incoming events": {
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
    name: "AI-Powered Children S Arabic Storytelling On Telegram",
    nodes: [
      {
            "id": "e0f68f60-f036-4103-a9fc-d6cb80b6f8a2",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1980,
                  1100
            ],
            "parameters": {
                  "model": "gpt-4-turbo",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "23779dea-c21d-42da-b493-09394bc64436",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2420,
                  660
            ],
            "parameters": {
                  "model": "gpt-4-turbo",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "af59863e-12c5-414c-bf64-dd6712e3aa7b",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  1680,
                  960
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "hours",
                                    "hoursInterval": 12
                              }
                        ]
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "bc2ad02b-72c9-4132-96e8-b64487f589f7",
            "name": "Recursive Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  2160,
                  1140
            ],
            "parameters": {
                  "options": {},
                  "chunkSize": 500,
                  "chunkOverlap": 300
            },
            "typeVersion": 1
      },
      {
            "id": "cb11a8bb-bdca-43cb-a586-7f93471d58f7",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2420,
                  1300
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "9d02b910-a467-4d4d-a2fa-32d1d3361d21",
            "name": "Create a Prompt for DALL-E",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  2400,
                  1080
            ],
            "parameters": {
                  "options": {
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "Summarize the characters in this story based on their appearance and describe them if they are humans or animals and how they look like and what kind of are they, the prompt should be no-text in the picture.\n\n\n\n\n\"{text}\"\n\n\nCONCISE SUMMARY:",
                                    "summarizationMethod": "stuff"
                              }
                        }
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "4723dd65-96f5-41c1-9ff6-f1a344d96241",
            "name": "Generate an Image for the Story",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2860,
                  1080
            ],
            "parameters": {
                  "prompt": "=Produce an image ensuring that no text is generated within the visual content. {{ $json.response.text }}",
                  "options": {},
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "70b7f55a-31c4-456b-8273-8250bac74409",
            "name": "Generate Audio for the Story",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2640,
                  820
            ],
            "parameters": {
                  "input": "={{ $json.response.text }}",
                  "options": {},
                  "resource": "audio"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 1.3
      },
      {
            "id": "c381dbe4-6112-441c-b213-8a2d218f4cc2",
            "name": "Send the Story To Channel",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  3160,
                  480
            ],
            "parameters": {
                  "text": "={{ $json.response.text }}",
                  "chatId": "=-4170994782",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "78289bfa-54b4-4acb-b513-7a0134a010f3",
            "name": "Send Image to the Channel",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  3180,
                  1080
            ],
            "parameters": {
                  "chatId": "=-4170994782",
                  "operation": "sendPhoto",
                  "binaryData": true,
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "f779047b-6dec-4e4e-ae09-4dd91f961d08",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  240
            ],
            "parameters": {
                  "width": 1224.7156767468991,
                  "height": 1282.378312060854,
                  "content": "# Template for Kids' Story in Arabic\n\nThe n8n template for creating kids' stories in Arabic provides a versatile platform for storytellers to captivate young audiences with educational and interactive tales. Along with its core functionalities, this template allows for customization to suit various use cases and can be set up effortlessly.\n\nCheck this example: [https://t.me/st0ries95](https://t.me/st0ries95)\n\n\n## Node Functionalities\n\n\n## Automated Storytelling Process\n\n\n## Use Cases\n1. **Educational Platforms**:\n Educational platforms can automate the creation and distribution of educational stories in Arabic for children using this template. By incorporating visual and auditory elements into the storytelling process, educational platforms can enhance learning experiences and engage young learners effectively.\n\n2. **Children's Libraries**:\n Children's libraries can utilize this template to curate and share a diverse collection of Arabic stories with young readers. The automated generation of visual content and audio files enhances the storytelling experience, encouraging children to immerse themselves in new worlds and characters through captivating narratives.\n\n3. **Language Learning Apps**:\n Language learning apps focused on Arabic can integrate this template to offer culturally rich storytelling experiences for children learning the language. By translating stories into Arabic and supplementing them with visual and auditory components, these apps can facilitate language acquisition in an enjoyable and interactive manner.\n\n## Configuration Guide for Nodes\n\n### OpenAI Chat Model Nodes:\n- **Credentials**: Provide the necessary API credentials for the OpenAI GPT-4 Turbo model.\n- **Options**: Configure any specific options required for the chat model.\n\n### Create a Prompt for DALL-E Node:\n- **Prompts Customization**: Customize prompts to generate relevant visual content for the stories.\n- **Summarization Method and Prompts**: Define the summarization method and prompts for generating visual content without text.\n\n### Generate an Image for the Story Node:\n- **Resource**: Specify the type of resource (image).\n- **Prompt**: Set up the prompt for producing an image without text within the visual content.\n\n### Generate Audio for the Story Node:\n- **Resource**: Select the type of resource (audio).\n- **Input**: Define the input text for generating audio files.\n\n### Translate the Story to Arabic Node:\n- **Chunking Mode**: Choose the chunking mode (advanced).\n- **Summarization Method and Prompts**: Set the summarization method and prompts for translating the story into Arabic.\n\n### Send the Story To Channel Node:\n- **Chat ID**: Provide the chat ID where the story text will be sent.\n- **Text**: Configure the text to be sent to the channel.\n\nBy configuring each node as per the guidelines above, users can effectively set up and customize the n8n template for kids' stories in Arabic, tailoring it to specific use cases and delivering a seamless and engaging storytelling experience for young audiences.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "5ef92ebc-e4e4-4165-a7df-9f94802f8e27",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1620,
                  240
            ],
            "parameters": {
                  "width": 1811.9647367735226,
                  "height": 1280.7253282813103,
                  "content": ""
            },
            "typeVersion": 1
      },
      {
            "id": "76d2b256-8083-42d9-8465-63b2f9c73a67",
            "name": "Translate the Story to Arabic",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  2400,
                  480
            ],
            "parameters": {
                  "options": {
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "Translate this story texts to \"Arabic\" and make it easy to understands for kids with easy words and moral lesson :\n\n\n\"{text}\"\n\n\n",
                                    "summarizationMethod": "stuff"
                              }
                        }
                  },
                  "chunkingMode": "advanced"
            },
            "executeOnce": true,
            "typeVersion": 2
      },
      {
            "id": "126e463e-f1e8-4cd2-856d-aaaebc279797",
            "name": "Send Audio to the Channel",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  3180,
                  820
            ],
            "parameters": {
                  "chatId": "-4170994782",
                  "operation": "sendAudio",
                  "binaryData": true,
                  "additionalFields": {
                        "caption": "نهاية القصة ... "
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "162049a0-620a-4044-966a-27b665827b60",
            "name": "Create a Story for Kids",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  1980,
                  960
            ],
            "parameters": {
                  "options": {
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "Create a captivating short tale for kids, whisking them away to magical lands brimming with wisdom. Explore diverse themes in a fun and simple way, weaving in valuable messages. Dive into cultural adventures with lively language that sparks curiosity. Let your story inspire young minds through enchanting narratives that linger long after the last word. Begin crafting your imaginative tale now! (Approximately 900 characters)\n\n\n\"{text}\"\n\nCONCISE SUMMARY:",
                                    "summarizationMethod": "stuff"
                              }
                        }
                  },
                  "chunkingMode": "advanced"
            },
            "executeOnce": true,
            "typeVersion": 2
      }
],
    connections: {
      "Schedule Trigger": {
            "main": [
                  [
                        {
                              "node": "Create a Story for Kids",
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
                              "node": "Create a Story for Kids",
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
                              "node": "Translate the Story to Arabic",
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
                              "node": "Create a Prompt for DALL-E",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create a Story for Kids": {
            "main": [
                  [
                        {
                              "node": "Translate the Story to Arabic",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Create a Prompt for DALL-E",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create a Prompt for DALL-E": {
            "main": [
                  [
                        {
                              "node": "Generate an Image for the Story",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Audio for the Story": {
            "main": [
                  [
                        {
                              "node": "Send Audio to the Channel",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Translate the Story to Arabic": {
            "main": [
                  [
                        {
                              "node": "Send the Story To Channel",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Generate Audio for the Story",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate an Image for the Story": {
            "main": [
                  [
                        {
                              "node": "Send Image to the Channel",
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
                              "node": "Create a Story for Kids",
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
    name: "AI-Powered Children S English Storytelling On Telegram With OpenAI",
    nodes: [
      {
            "id": "757a7e67-073a-4fa1-b571-2ddd147b35f6",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1000,
                  1240
            ],
            "parameters": {
                  "model": "gpt-3.5-turbo-16k-0613",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "761ed83a-2cfb-474a-b596-922e5a7e2717",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  660,
                  1060
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "hours",
                                    "hoursInterval": 12
                              }
                        ]
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "41faf334-30d6-4cc0-9a94-9c486ec3fa6c",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1520,
                  1420
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d9ad0a3a-2ce6-4071-8262-8176b3eecf36",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1780,
                  220
            ],
            "parameters": {
                  "width": 1004.4263690337257,
                  "height": 811.7188223885136,
                  "content": "### Setting Up a Workflow for \"AI-Powered Children's English Storytelling on Telegram\"\n\nIn this guide, we will walk you through the process of setting up a workflow to create and share captivating children's stories using the provided configuration. Let's dive into the steps required to bring these imaginative tales to life on your Telegram channel:\n\n#### Steps to Setup the Workflow:\n1. **Import the Workflow:**\n - Copy the provided workflow JSON configuration.\n - In your n8n instance, go to Workflows and select \"Import from JSON.\"\n - Paste the configuration and import the workflow.\n\n2. **Configure Node Credentials:**\n - For nodes requiring API credentials (OpenAI and Telegram), create credentials with the appropriate API keys or tokens.\n\n3. **Set Node Parameters:**\n - Modify node parameters as needed, such as chat IDs, prompts, and intervals.\n - Change the chatId in Config node to the ID of the chat you want the story to be posted.\n\n4. **Ensure Data Flow:**\n - Check the connections between nodes to ensure a smooth flow of data and actions.\n\n5. **Execute Once:**\n - Activate the \"executeOnce\" option in nodes where necessary to trigger actions only once during setup.\n\n6. **Test the Workflow:**\n - Run the workflow to verify that each node functions correctly and data is processed as expected.\n\n7. **Enable Recurring Triggers:**\n - Confirm that the Schedule Trigger node is set to trigger the workflow at the desired interval (every 12 hours).\n\n8. **Initiate Workflow:**\n - Once everything is configured correctly, activate the workflow to start generating and sharing children's stories on Telegram.\n\nBy following these steps meticulously, you can seamlessly establish and operate the workflow designed to create captivating children's stories for your audience. Embrace the power of automation to inspire young minds and foster a love for storytelling through engaging narratives shared on Telegram.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "b550e4ff-167d-4b12-8dff-0511a435cd7c",
            "name": "Create a Prompt for DALL-E",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  1500,
                  1280
            ],
            "parameters": {
                  "options": {
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "Summarize the characters in this story based on their appearance and describe them if they are humans or animals and how they look like and what kind of are they, the prompt should be no-text in the picture, make sure the text is free from any prohibited or inappropriate content:\n\n\n\n\"{text}\"\n\n\nCONCISE SUMMARY:",
                                    "summarizationMethod": "stuff"
                              }
                        }
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "024a3615-9e90-4e47-81e3-21febfc2f0c9",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  240
            ],
            "parameters": {
                  "width": 611.6882702103559,
                  "height": 651.7145525871413,
                  "content": "### Use Case for Setting Up a Workflow for Children's Stories\n\nCheck this example: [https://t.me/st0ries95](https://t.me/st0ries95)\n\n\nThe workflow for children's stories serves as a valuable tool for content creators, educators, and parents looking to engage children with imaginative and educational storytelling. Here are some key use cases for this workflow:\n\n1. **Content Creation:** The workflow streamlines the process of creating captivating children's stories by providing a structured framework and automation for story generation, audio creation, and image production.\n\n2. **Educational Resources:** Teachers can use this workflow to develop educational materials that incorporate storytelling to make learning more engaging and interactive for students.\n\n3. **Parental Engagement:** Parents can utilize the workflow to share personalized stories with their children, fostering a love for reading and creativity while bonding over shared storytelling experiences.\n\n4. **Community Building:** Organizations and community groups can leverage the workflow to create and share children's stories as a way to connect with their audience and promote literacy and creativity.\n\n5. **Inspiring Young Minds:** By automating the process of creating and sharing enchanting children's stories, this workflow aims to inspire young minds, spark imagination, and instill a passion for storytelling in children.\n\nOverall, the use case for this workflow extends to various settings where storytelling plays a significant role in engaging, educating, and entertaining children, making it a versatile tool for enhancing the storytelling experience.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "11bfff09-33c6-48ab-b9e6-2e5349a87ca5",
            "name": "Recursive Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  1160,
                  1260
            ],
            "parameters": {
                  "options": {},
                  "chunkSize": 500,
                  "chunkOverlap": 300
            },
            "typeVersion": 1
      },
      {
            "id": "9da21054-961e-4b7a-973e-1c180571ce92",
            "name": "Create a story",
            "type": "@n8n/n8n-nodes-langchain.chainSummarization",
            "position": [
                  1080,
                  1060
            ],
            "parameters": {
                  "options": {
                        "summarizationMethodAndPrompts": {
                              "values": {
                                    "prompt": "Create a captivating short tale for kids, whisking them away to magical lands brimming with wisdom. Explore diverse themes in a fun and simple way, weaving in valuable messages. Dive into cultural adventures with lively language that sparks curiosity. Let your story inspire young minds through enchanting narratives that linger long after the last word. Begin crafting your imaginative tale now! (Approximately 900 characters)\n\n\n\"{text}\"\n\nCONCISE SUMMARY:",
                                    "summarizationMethod": "stuff"
                              }
                        }
                  },
                  "chunkingMode": "advanced"
            },
            "executeOnce": true,
            "typeVersion": 2
      },
      {
            "id": "35579446-e11c-416b-b34a-b31e8461a1b3",
            "name": "Generate Audio for the story",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1520,
                  1060
            ],
            "parameters": {
                  "input": "={{ $json.response.text }}",
                  "options": {},
                  "resource": "audio"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 1.3
      },
      {
            "id": "453d149f-a2a7-4fc9-ba3b-85b42df1c29b",
            "name": "Generate a Picture for the story",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1840,
                  1280
            ],
            "parameters": {
                  "prompt": "=Produce an image ensuring that no text is generated within the visual content. {{ $json.response.text }}",
                  "options": {},
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "8f324f12-b21e-4d0c-b7fa-5e2f93ba08aa",
            "name": "Send Story Text",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1520,
                  840
            ],
            "parameters": {
                  "text": "={{ $json.response.text }}",
                  "chatId": "={{ $('Config').item.json.chatId }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "51a08f75-1c34-48a0-86de-b47e435ef618",
            "name": "Send Audio for the story",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1720,
                  1060
            ],
            "parameters": {
                  "chatId": "={{ $('Config').item.json.chatId }}",
                  "operation": "sendAudio",
                  "binaryData": true,
                  "additionalFields": {
                        "caption": "End of the Story for today ....."
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "3f890a4d-26ea-452a-8ed5-917282e8b0d8",
            "name": "Send Story Picture",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2020,
                  1280
            ],
            "parameters": {
                  "chatId": "={{ $('Config').item.json.chatId }}",
                  "operation": "sendPhoto",
                  "binaryData": true,
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "1cbec52c-b545-45df-885f-57c287f81017",
            "name": "Config",
            "type": "n8n-nodes-base.set",
            "position": [
                  880,
                  1060
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "327667cb-b5b0-4f6f-915c-544696ed8e5a",
                                    "name": "chatId",
                                    "type": "string",
                                    "value": "-4170994782"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      }
],
    connections: {
      "Config": {
            "main": [
                  [
                        {
                              "node": "Create a story",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create a story": {
            "main": [
                  [
                        {
                              "node": "Generate Audio for the story",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Create a Prompt for DALL-E",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Send Story Text",
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
                              "node": "Config",
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
                              "node": "Create a story",
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
                              "node": "Create a Prompt for DALL-E",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create a Prompt for DALL-E": {
            "main": [
                  [
                        {
                              "node": "Generate a Picture for the story",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Audio for the story": {
            "main": [
                  [
                        {
                              "node": "Send Audio for the story",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate a Picture for the story": {
            "main": [
                  [
                        {
                              "node": "Send Story Picture",
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
                              "node": "Create a story",
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
    name: "Angie, Personal AI Assistant With Telegram Voice And Text",
    nodes: [
      {
            "id": "c70236ea-91ab-4e47-b6f6-63a70ede5d3c",
            "name": "Google Calendar",
            "type": "n8n-nodes-base.googleCalendarTool",
            "position": [
                  1000,
                  680
            ],
            "parameters": {
                  "options": {
                        "fields": "=items(summary, start(dateTime))",
                        "timeMin": "={{$fromAI(\"date\",\"the date after which to fetch the messages in format YYYY-MM-DDTHH:MM:SS\")}}"
                  },
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "derekcheungsa@gmail.com",
                        "cachedResultName": "derekcheungsa@gmail.com"
                  },
                  "operation": "getAll"
            },
            "credentials": {
                  "googleCalendarOAuth2Api": {
                        "id": "qx8JdPX4I5Xk9c46",
                        "name": "Google Calendar account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "d2287bea-de47-4180-8ee6-55d4ab1a89da",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  760,
                  680
            ],
            "parameters": {
                  "sessionKey": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "fa955731-86f6-4e4d-8604-dab5f52dee87",
            "name": "Get Email",
            "type": "n8n-nodes-base.gmailTool",
            "position": [
                  880,
                  680
            ],
            "parameters": {
                  "filters": {
                        "labelIds": [
                              "INBOX",
                              "UNREAD"
                        ],
                        "readStatus": "unread",
                        "receivedAfter": "={{$fromAI(\"date\",\"the date after which to fetch the messages in format YYYY-MM-DDTHH:MM:SS\")}}"
                  },
                  "operation": "getAll"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "tojOpzEqFprdxS46",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "46511f47-1687-4cbe-ae41-ceb205ed1f11",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  640,
                  680
            ],
            "parameters": {
                  "model": "gpt-4o-mini",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "5oYe8Cxj7liOPAKk",
                        "name": "Derek T"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "64fe44db-af19-43eb-9ff1-de0a72a9e645",
            "name": "Listen for incoming events",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  -160,
                  360
            ],
            "webhookId": "322dce18-f93e-4f86-b9b1-3305519b7834",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e35c04ff-a050-4564-8c1b-5b22b556872f",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "onError": "continueErrorOutput",
            "position": [
                  1280,
                  360
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e791d4f8-2c19-4c14-a71e-39a04f22e944",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  200,
                  360
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
                                    "id": "a0bf9719-4272-46f6-ab3b-eda6f7b44fd8",
                                    "operator": {
                                          "type": "string",
                                          "operation": "empty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.text }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "5bd1788a-3d08-4eb3-8e03-3ce82f44d2a7",
            "name": "Speech to Text",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  620,
                  360
            ],
            "parameters": {
                  "options": {},
                  "resource": "audio",
                  "operation": "transcribe"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "5oYe8Cxj7liOPAKk",
                        "name": "Derek T"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "b67a2a93-517b-469e-aaa4-32c422710743",
            "name": "Voice or Text",
            "type": "n8n-nodes-base.set",
            "position": [
                  40,
                  360
            ],
            "parameters": {
                  "fields": {
                        "values": [
                              {
                                    "name": "text",
                                    "stringValue": "={{ $json?.message?.text || \"\" }}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "8105c39f-9e87-44c4-9215-b3777f0b4164",
            "name": "Get Voice File",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  380,
                  360
            ],
            "parameters": {
                  "fileId": "={{ $('Listen for incoming events').item.json.message.voice.file_id }}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "759b975f-d17c-4386-a5b3-12413f0361f4",
            "name": "Angie, AI Assistant 👩🏻‍🏫",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  780,
                  360
            ],
            "parameters": {
                  "text": "={{ $json.text }}",
                  "options": {
                        "systemMessage": "=You are a helpful assistant.\n\nToday's date is {{ $now }}.\n\nGuidelines:\n- When fetching emails, filter out any promotional emails. \n- When summarizing emails, include Sender, Message date, subject, and brief summary of email.\n- if the user did not specify a date in the request assume they are asking for today\n- Use baserow tool to answer questions about tasks\n- When answering questions about calendar events, filter out events that don't apply to the question. For example, the question is about events for today, only reply with events for today. Don't mention future events if it's more than 1 week away"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.6
      },
      {
            "id": "5537c777-f003-4673-b48a-4993a0c10520",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  20,
                  260
            ],
            "parameters": {
                  "color": 5,
                  "width": 496.25,
                  "height": 278.75,
                  "content": "## Process Telegram Request\n"
            },
            "typeVersion": 1
      },
      {
            "id": "40e92679-b47a-4213-bb23-3f8d086459f2",
            "name": "Tasks",
            "type": "n8n-nodes-base.baserowTool",
            "position": [
                  1120,
                  680
            ],
            "parameters": {
                  "tableId": 372174,
                  "databaseId": 146496,
                  "additionalOptions": {}
            },
            "credentials": {
                  "baserowApi": {
                        "id": "jsgACn0VxAPoD0E2",
                        "name": "Baserow account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "570a0647-b571-4ebc-9dfe-40244b5a0b2a",
            "name": "Contacts",
            "type": "n8n-nodes-base.baserowTool",
            "position": [
                  1240,
                  680
            ],
            "parameters": {
                  "tableId": 372177,
                  "databaseId": 146496,
                  "descriptionType": "manual",
                  "toolDescription": "Useful for getting contact information. For example emails or phone numbers.",
                  "additionalOptions": {}
            },
            "credentials": {
                  "baserowApi": {
                        "id": "jsgACn0VxAPoD0E2",
                        "name": "Baserow account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "7fb1d95a-a8d6-4040-9271-5197296be7da",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -620,
                  220
            ],
            "parameters": {
                  "color": 5,
                  "width": 386.9292441979969,
                  "height": 389.78268107403096,
                  "content": "## Start here: Step-by Step Youtube Tutorial :star:\n\n[![Building an AI Personal Assistant](https://img.youtube.com/vi/pXjowPc6V2s/sddefault.jpg)](https://youtu.be/pXjowPc6V2s)\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Get Voice File",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Tasks": {
            "ai_tool": [
                  [
                        {
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Contacts": {
            "ai_tool": [
                  [
                        {
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Email": {
            "ai_tool": [
                  [
                        {
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "Voice or Text": {
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
      "Get Voice File": {
            "main": [
                  [
                        {
                              "node": "Speech to Text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Speech to Text": {
            "main": [
                  [
                        {
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
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
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
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
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
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
                              "node": "Angie, AI Assistant 👩🏻‍🏫",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Listen for incoming events": {
            "main": [
                  [
                        {
                              "node": "Voice or Text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Angie, AI Assistant 👩🏻‍🏫": {
            "main": [
                  [
                        {
                              "node": "Telegram",
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
    name: "Automated AI Image Analysis And Response Via Telegram",
    nodes: [
      {
            "id": "ecb4bbc8-939a-4c6c-80b6-6f053d1d7745",
            "name": "Get the Image",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  1640,
                  880
            ],
            "webhookId": "8404b32c-14bd-428e-88a6-560755f0f7ba",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {
                        "download": true
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "2fd523b7-5f89-4e53-9445-4336b51cad51",
            "name": "Send Content for the Analyzed image",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2380,
                  760
            ],
            "parameters": {
                  "text": "={{ $json.content }}",
                  "chatId": "={{ $('Get the Image').item.json.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "b77fe84f-7651-42aa-aa40-f903b10c8fb1",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  360
            ],
            "parameters": {
                  "width": 1235.4238259410247,
                  "height": 1361.9843517631348,
                  "content": "# Automated Image Analysis and Response via Telegram\n\n## Example: @SubAlertMe_Bot\n\n## Summary:\nThe automated image analysis and response workflow using n8n is a sophisticated solution designed to streamline the process of analyzing images sent via Telegram and delivering insightful responses based on the analysis outcomes. This cutting-edge workflow employs a series of meticulously orchestrated nodes to ensure seamless automation and efficiency in image processing tasks.\n\n## Use Cases:\nThis advanced workflow caters to a myriad of scenarios where real-time image analysis and response mechanisms are paramount. The use cases include:\n- Providing immediate feedback on images shared within Telegram groups.\n- Enabling automated content moderation based on the analysis of image content.\n- Facilitating rapid categorization and tagging of images based on the results of the analysis.\n\n## Detailed Workflow Setup:\nTo effectively implement this workflow, users must adhere to a meticulous setup process, which includes:\n- Access to the versatile n8n platform, ensuring seamless workflow orchestration.\n- Integration of a Telegram account to facilitate image reception and communication.\n- Utilization of an OpenAI account for sophisticated image analysis capabilities.\n- Configuration of Telegram and OpenAI credentials within the n8n environment for seamless integration.\n- Proficiency in creating and interconnecting nodes within the n8n workflow for optimal functionality.\n\n## Detailed Node Description:\n1. **Get the Image (Telegram Trigger):**\n - Actively triggers upon receipt of an image via Telegram, ensuring prompt processing.\n - Extracts essential information from the received image message to initiate further actions.\n\n2. **Merge all fields To get data from trigger:**\n - Seamlessly amalgamates all relevant data fields extracted from the trigger node for comprehensive data consolidation.\n\n3. **Analyze Image (OpenAI):**\n - Harnesses the powerful capabilities of OpenAI services to conduct in-depth analysis of the received image.\n - Processes the image data in base64 format to derive meaningful insights from the visual content.\n\n4. **Aggregate all fields:**\n - Compiles and consolidates all data items for subsequent processing and analysis, ensuring comprehensive data aggregation.\n\n5. **Send Content for the Analyzed Image (Telegram):**\n - Transmits the analyzed content back to the Telegram chat interface for seamless communication.\n - Delivers the analyzed information in textual format, enhancing user understanding and interaction.\n\n6. **Switch Node:**\n - The Switch node is pivotal for decision-making based on predefined conditions within the workflow.\n - It evaluates incoming data to determine the existence or absence of specific elements, such as images in this context.\n - Utilizes a set of rules to assess the presence of image data in the message payload and distinguishes between cases where images are detected and when they are not.\n - This crucial node plays a pivotal role in directing the flow of the workflow based on the outcomes of its evaluations.\n\n\n\n## Conclusion:\nThe automation of image analysis processes through this sophisticated workflow not only enhances operational efficiency but also revolutionizes communication dynamics within Telegram interactions. By incorporating this advanced workflow solution, users can optimize their image analysis workflows, bolster communication efficacy, and unlock new levels of automation in image processing tasks.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "7a588ccb-7a97-4776-82fd-c4f42640e8f7",
            "name": "Update Telegram Error Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2380,
                  1000
            ],
            "parameters": {
                  "text": "Please Upload an Image ....",
                  "chatId": "={{ $json.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "k3RE6o9brmFRFE9p",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "0cd83b82-0a20-4bf6-82bc-24827a368b89",
            "name": "Wait",
            "type": "n8n-nodes-base.wait",
            "position": [
                  2180,
                  1000
            ],
            "webhookId": "d4d6fc13-d8ad-42b6-b4dd-e922b5534282",
            "parameters": {
                  "amount": 3
            },
            "typeVersion": 1.1
      },
      {
            "id": "a6d52335-72e7-4ce4-92e9-861b2806e9ae",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1620,
                  360
            ],
            "parameters": {
                  "color": 4,
                  "width": 1139.7707284714515,
                  "height": 1359.6943046286056,
                  "content": ""
            },
            "typeVersion": 1
      },
      {
            "id": "0222b4f6-a7c1-4183-8df8-b47b9e0cd685",
            "name": "Analyze image",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2180,
                  760
            ],
            "parameters": {
                  "options": {},
                  "resource": "image",
                  "inputType": "base64",
                  "operation": "analyze"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "kDo5LhPmHS2WQE0b",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "f83c7dc2-a986-40e7-831c-b7968866ef4e",
            "name": "Switch ( image or not )",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1820,
                  880
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Image",
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
                                                            "type": "array",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.message.photo }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Empty",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "3fe3a96d-6ee9-4f12-a32c-f5f5b729e257",
                                                      "operator": {
                                                            "type": "array",
                                                            "operation": "notExists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.message.photo }}",
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
            "typeVersion": 3
      }
],
    connections: {
      "Wait": {
            "main": [
                  [
                        {
                              "node": "Update Telegram Error Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Analyze image": {
            "main": [
                  [
                        {
                              "node": "Send Content for the Analyzed image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get the Image": {
            "main": [
                  [
                        {
                              "node": "Switch ( image or not )",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Switch ( image or not )": {
            "main": [
                  [
                        {
                              "node": "Analyze image",
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
    settings: {},
  },
  {
    name: "Chat With OpenAIs GPT Via A Simple Telegram Bot",
    nodes: [
      {
            "id": "0b4eb8e4-e98b-4f67-b134-914a5aa46b4d",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  960,
                  400
            ],
            "webhookId": "9c8b833c-7aa7-430d-8fc0-47936f695ddf",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "4lzd2F9cNrnR7j0j",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "339246f2-76cb-44c4-8828-da0cb5d3ad5e",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1100,
                  600
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "m3YyjGXFLLWwcnk7",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "70a981e2-7833-473b-a27a-fedf860901cb",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1200,
                  400
            ],
            "parameters": {
                  "text": "=Respond to this as a helpful assistant with emojis: {{ $json.message.text }}",
                  "options": {}
            },
            "typeVersion": 1.2
      },
      {
            "id": "fb6ff65b-56b4-44c4-978a-b9a5c3d535d6",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1560,
                  400
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "4lzd2F9cNrnR7j0j",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      }
],
    connections: {
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
      "Telegram Trigger": {
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
      }
},
    settings: {},
  },
  {
    name: "Detect Toxic Language In Telegram Messages",
    nodes: [
      {
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  600,
                  300
            ],
            "webhookId": "2d0805da-143e-40c9-b327-242b1f052c31",
            "parameters": {
                  "updates": [
                        "message",
                        "edited_message",
                        "channel_post",
                        "edited_channel_post"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": "telegram_habot"
            },
            "typeVersion": 1
      },
      {
            "name": "Google Perspective",
            "type": "n8n-nodes-base.googlePerspective",
            "position": [
                  800,
                  300
            ],
            "parameters": {
                  "text": "={{$json[\"message\"][\"text\"]}}",
                  "options": {
                        "languages": "en"
                  },
                  "requestedAttributesUi": {
                        "requestedAttributesValues": [
                              {
                                    "attributeName": "identity_attack"
                              },
                              {
                                    "attributeName": "threat"
                              },
                              {
                                    "attributeName": "profanity"
                              }
                        ]
                  }
            },
            "credentials": {
                  "googlePerspectiveOAuth2Api": "perspective_api"
            },
            "typeVersion": 1
      },
      {
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "position": [
                  1000,
                  300
            ],
            "parameters": {
                  "conditions": {
                        "number": [
                              {
                                    "value1": "={{$json[\"attributeScores\"][\"PROFANITY\"][\"summaryScore\"][\"value\"]}}",
                                    "value2": 0.7,
                                    "operation": "larger"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1200,
                  150
            ],
            "parameters": {
                  "text": "I don't tolerate toxic language!",
                  "chatId": "={{$node[\"Telegram Trigger\"].json[\"message\"][\"chat\"][\"id\"]}}",
                  "additionalFields": {
                        "reply_to_message_id": "={{$node[\"Telegram Trigger\"].json[\"message\"][\"message_id\"]}}"
                  }
            },
            "credentials": {
                  "telegramApi": "telegram_habot"
            },
            "typeVersion": 1
      },
      {
            "name": "NoOp",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1200,
                  400
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
                              "node": "Telegram",
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
      "Telegram Trigger": {
            "main": [
                  [
                        {
                              "node": "Google Perspective",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Perspective": {
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
    name: "Image Creation With OpenAI And Telegram",
    nodes: [
      {
            "id": "a998289c-65da-49ea-ba8a-4b277d9e16f3",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  1060,
                  640
            ],
            "webhookId": "2901cde3-b35a-4b0b-a1ba-17a7d9f80125",
            "parameters": {
                  "updates": [
                        "message",
                        "*"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pbbCqv0hRu9TDmWm",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "7f50072a-5312-4a47-823e-0513cd9d383a",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1380,
                  640
            ],
            "parameters": {
                  "prompt": "={{ $json.message.text }}",
                  "options": {},
                  "resource": "image"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "p4Qrsjiuev2epBzW",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "a59264d6-c199-4d7b-ade4-1e31f10eb632",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1580,
                  1000
            ],
            "parameters": {
                  "chatId": "={{ $json.data[1].message.from.id }}",
                  "operation": "sendPhoto",
                  "binaryData": true,
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pbbCqv0hRu9TDmWm",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e0719c38-75ae-4082-91ba-d68c7cd28339",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1060,
                  1000
            ],
            "parameters": {},
            "typeVersion": 2.1
      },
      {
            "id": "bee14b74-248b-4e17-9221-378daff965aa",
            "name": "Aggregate",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1320,
                  1000
            ],
            "parameters": {
                  "options": {
                        "includeBinaries": true
                  },
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "50293949-3dc0-4b35-a040-a3ad1a9e80d0",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -60,
                  479.3775380651615
            ],
            "parameters": {
                  "width": 1036.6634532467683,
                  "height": 671.0981521245417,
                  "content": "\n# N8N Workflow: AI-Enhanced Image Processing and Communication\n\n## Description:\nThis n8n workflow integrates artificial intelligence to optimize image processing tasks and streamline communication via Telegram. Each node in the workflow provides specific benefits that contribute to enhancing user engagement and facilitating efficient communication.\n\n## Title:\nAI-Enhanced Image Processing and Communication Workflow with n8n\n\n## Node Names and Benefits:\n\n\n3. Set up the necessary credentials for the Telegram account and OpenAI API.\n4. Configure each node in the workflow to maximize its benefits and optimize user engagement.\n5. Run the workflow to leverage AI-enhanced image processing and communication capabilities for enhanced user interactions.\n6. Monitor the workflow execution for any errors or issues that may arise during processing.\n7. Customize the workflow nodes, parameters, or AI models to align with specific business objectives and user engagement strategies.\n8. Embrace the power of AI-driven image processing and interactive communication on Telegram to elevate user engagement and satisfaction levels.\n\n## Elevate your user engagement strategies with AI-powered image processing and seamless communication on Telegram using n8n!\n"
            },
            "typeVersion": 1
      },
      {
            "id": "529fb39e-5140-41b2-8454-2a1c45d670d0",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  480
            ],
            "parameters": {
                  "width": 276.16526553869744,
                  "height": 296.62433647952383,
                  "content": " **Telegram Trigger Node**:\n - Benefit: Initiates the workflow based on incoming messages from users on Telegram, enabling real-time interaction and communication."
            },
            "typeVersion": 1
      },
      {
            "id": "339bc4ff-bca0-48ee-98ce-bbf7deb3f6fc",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1320,
                  480
            ],
            "parameters": {
                  "width": 238.40710655577766,
                  "height": 316.8446819098802,
                  "content": " **OpenAI Node**:\n - Benefit: Utilizes AI algorithms to analyze text content of messages, generating intelligent responses and enhancing the quality of communication."
            },
            "typeVersion": 1
      },
      {
            "id": "64216b05-5a6e-44f5-8cf1-86487368d892",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1520,
                  820
            ],
            "parameters": {
                  "width": 229.95409290591755,
                  "height": 332.7896020182219,
                  "content": "**Telegram Node**:\n - Benefit: Sends processed data, including images and responses, back to users on Telegram, ensuring seamless communication and user engagement."
            },
            "typeVersion": 1
      },
      {
            "id": "c15a57ee-f461-43d0-9232-b6d2728ee058",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1260,
                  820
            ],
            "parameters": {
                  "height": 332.78960201822133,
                  "content": "**Merge Node**:\n - Benefit: Combines and organizes processed data for efficient handling and integration, optimizing the workflow's data management capabilities."
            },
            "typeVersion": 1
      },
      {
            "id": "f6f0aaac-426a-4923-9100-a52f53e78dec",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1000,
                  820
            ],
            "parameters": {
                  "height": 326.33042266316727,
                  "content": "**Aggregate Node**:\n - Benefit: Aggregates all item data, including binaries if specified, for comprehensive reporting and analysis, aiding in decision-making and performance evaluation.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "c36d8d68-0641-4e6d-92b1-82879d81e2c9",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -80,
                  460
            ],
            "parameters": {
                  "color": 2,
                  "width": 1837.5703604833238,
                  "height": 706.8771853945606,
                  "content": ""
            },
            "typeVersion": 1
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
                              "index": 0
                        }
                  ]
            ]
      },
      "Aggregate": {
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
      "Telegram Trigger": {
            "main": [
                  [
                        {
                              "node": "OpenAI",
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
      }
},
    settings: {},
  },
  {
    name: "Send A Random Recipe Once A Day To Telegram",
    nodes: [
      {
            "name": "Cron",
            "type": "n8n-nodes-base.cron",
            "position": [
                  440,
                  440
            ],
            "parameters": {
                  "triggerTimes": {
                        "item": [
                              {}
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Airtable2",
            "type": "n8n-nodes-base.airtable",
            "notes": "Grab our list of chats from Airtable to send a random recipe",
            "position": [
                  660,
                  440
            ],
            "parameters": {
                  "table": "Table 1",
                  "operation": "list",
                  "application": "your_sheet_id",
                  "additionalOptions": {}
            },
            "credentials": {
                  "airtableApi": {
                        "id": "5",
                        "name": "Airtable account"
                  }
            },
            "notesInFlow": true,
            "typeVersion": 1
      },
      {
            "name": "Set",
            "type": "n8n-nodes-base.set",
            "position": [
                  860,
                  600
            ],
            "parameters": {
                  "values": {
                        "number": [
                              {
                                    "name": "chatid",
                                    "value": "={{$node[\"Airtable2\"].json[\"fields\"][\"chatid\"]}}"
                              }
                        ],
                        "string": []
                  },
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "name": "Recipe Photo",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1240,
                  440
            ],
            "parameters": {
                  "file": "={{$node[\"Get recipes from API\"].json[\"recipes\"][0][\"image\"]}}",
                  "chatId": "={{$node[\"Set\"].json[\"chatid\"]}}",
                  "operation": "sendPhoto",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "1",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1,
            "continueOnFail": true
      },
      {
            "name": "Recipe URL",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1420,
                  440
            ],
            "parameters": {
                  "text": "=\n{{$node[\"Get recipes from API\"].json[\"recipes\"][0][\"title\"]}}\n\n{{$node[\"Get recipes from API\"].json[\"recipes\"][0][\"sourceUrl\"]}}",
                  "chatId": "={{$node[\"Set\"].json[\"chatid\"]}}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "1",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1,
            "continueOnFail": true
      },
      {
            "name": "IF",
            "type": "n8n-nodes-base.if",
            "notes": "If the chat ID isn't in our airtable, we add it. This is to send a new recipe daily. ",
            "position": [
                  860,
                  -80
            ],
            "parameters": {
                  "conditions": {
                        "number": [],
                        "string": [
                              {
                                    "value1": "= {{$node[\"Airtable1\"].parameter[\"fields\"][1]}}",
                                    "value2": "= {{$node[\"Airtable1\"].parameter[\"fields\"][0]}}",
                                    "operation": "notEqual"
                              }
                        ],
                        "boolean": []
                  }
            },
            "notesInFlow": true,
            "typeVersion": 1
      },
      {
            "name": "Airtable",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  620,
                  -80
            ],
            "parameters": {
                  "table": "Table 1",
                  "operation": "list",
                  "application": "your_sheet_id",
                  "additionalOptions": {}
            },
            "credentials": {
                  "airtableApi": {
                        "id": "5",
                        "name": "Airtable account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Airtable1",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1340,
                  -100
            ],
            "parameters": {
                  "table": "Table 1",
                  "fields": [
                        "chatid",
                        "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"chat\"][\"id\"]}}",
                        "Name",
                        "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"from\"][\"first_name\"]}}"
                  ],
                  "options": {},
                  "operation": "append",
                  "application": "your_sheet_id",
                  "addAllFields": false
            },
            "credentials": {
                  "airtableApi": {
                        "id": "5",
                        "name": "Airtable account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Telegram Recipe Image",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  980,
                  180
            ],
            "parameters": {
                  "file": "={{$node[\"Get recipes\"].json[\"recipes\"][0][\"image\"]}}",
                  "chatId": "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"chat\"][\"id\"]}}",
                  "operation": "sendPhoto",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "1",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Telegram Recipe URL",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1180,
                  180
            ],
            "parameters": {
                  "text": "=\n{{$node[\"Get recipes\"].json[\"recipes\"][0][\"title\"]}}\n\n{{$node[\"Get recipes\"].json[\"recipes\"][0][\"sourceUrl\"]}}",
                  "chatId": "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"chat\"][\"id\"]}}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "1",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Set1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1120,
                  -100
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "chatid",
                                    "value": "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"chat\"][\"id\"]}}"
                              },
                              {
                                    "name": "Name",
                                    "value": "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"from\"][\"first_name\"]}}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "name": "Get recipes from API",
            "type": "n8n-nodes-base.httpRequest",
            "notes": "https://spoonacular.com/food-api/docs",
            "position": [
                  1080,
                  440
            ],
            "parameters": {
                  "url": "https://api.spoonacular.com/recipes/random?apiKey=APIKEYHERE&number=1&tags=vegan",
                  "options": {
                        "fullResponse": false
                  },
                  "queryParametersUi": {
                        "parameter": []
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Get recipes",
            "type": "n8n-nodes-base.httpRequest",
            "notes": "https://spoonacular.com/food-api/docs",
            "position": [
                  800,
                  180
            ],
            "parameters": {
                  "url": "https://api.spoonacular.com/recipes/random?apiKey=APIKEYHERE&number=1&tags=vegan",
                  "options": {
                        "fullResponse": false
                  },
                  "queryParametersUi": {
                        "parameter": []
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Telegram Trigger - people join bot",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  420,
                  140
            ],
            "webhookId": "your_bot_id",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "1",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      },
      {
            "name": "Telegram - Welcome Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  620,
                  180
            ],
            "parameters": {
                  "text": "=Welcome! This bot will send you one vegan recipe a day. Here is your first recipe!",
                  "chatId": "={{$node[\"Telegram Trigger - people join bot\"].json[\"message\"][\"chat\"][\"id\"]}}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "1",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "IF": {
            "main": [
                  [
                        {
                              "node": "Set1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set": {
            "main": [
                  [
                        {
                              "node": "Get recipes from API",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Cron": {
            "main": [
                  [
                        {
                              "node": "Airtable2",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set1": {
            "main": [
                  [
                        {
                              "node": "Airtable1",
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
                              "node": "IF",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Airtable2": {
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
      "Get recipes": {
            "main": [
                  [
                        {
                              "node": "Telegram Recipe Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Recipe Photo": {
            "main": [
                  [
                        {
                              "node": "Recipe URL",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get recipes from API": {
            "main": [
                  [
                        {
                              "node": "Recipe Photo",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Recipe Image": {
            "main": [
                  [
                        {
                              "node": "Telegram Recipe URL",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram - Welcome Message": {
            "main": [
                  [
                        {
                              "node": "Get recipes",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Trigger - people join bot": {
            "main": [
                  [
                        {
                              "node": "Airtable",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Telegram - Welcome Message",
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
    name: "Telegram AI multi-format chatbot",
    nodes: [
      {
            "id": "65196267-0d57-4af4-9081-962701478146",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  660,
                  640
            ],
            "parameters": {
                  "model": "gpt-4o",
                  "options": {
                        "temperature": 0.7,
                        "frequencyPenalty": 0.2
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "rveqdSfp7pCRON1T",
                        "name": "Ted's Tech Talks OpenAi"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "fc446ef0-2f15-42e7-a993-7960d76d8876",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  800,
                  640
            ],
            "parameters": {
                  "sessionKey": "=chat_with_{{ $('Listen for incoming events').first().json.message.chat.id }}",
                  "contextWindowLength": 10
            },
            "typeVersion": 1
      },
      {
            "id": "51c3cddd-fc21-4fff-b615-ea7080c47947",
            "name": "Correct errors",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1220,
                  580
            ],
            "parameters": {
                  "text": "={{ $('AI Agent').item.json.output.replace(/&/g, \"&amp;\").replace(/>/g, \"&gt;\").replace(/</g, \"&lt;\").replace(/\"/g, \"&quot;\") }}",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "d931b7e1-bc17-431e-ae67-967b6ef79236",
            "name": "Listen for incoming events",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  -440,
                  480
            ],
            "webhookId": "322dce18-f93e-4f86-b9b1-3305519b7834",
            "parameters": {
                  "updates": [
                        "*"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b33335ff-5dea-4fff-8f63-fea2b11b8241",
            "name": "Download voice file",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  60,
                  600
            ],
            "parameters": {
                  "fileId": "={{$json.message.voice.file_id}}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "2954ced6-ab98-42e6-bf64-237146a433e0",
            "name": "Combine content and set properties",
            "type": "n8n-nodes-base.set",
            "position": [
                  440,
                  460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "bccbce0a-7786-49c9-979a-7a285cb69f78",
                                    "name": "CombinedMessage",
                                    "type": "string",
                                    "value": "={{ $json.message && $json.message.text ? $json.message.text : ($json.text ? $json.text : '') }}"
                              },
                              {
                                    "id": "5b1fc9f5-1408-4099-88cc-a23725c9eddb",
                                    "name": "Message Type ",
                                    "type": "string",
                                    "value": "={{ $json?.message?.text && !$json?.text ? \"text query\" : (!$json?.message?.text && $json?.text ? \"voice message\" : \"unknown type message\") }}"
                              },
                              {
                                    "id": "1e9a17fa-ec5d-49dc-9ff6-1f28b57fb02e",
                                    "name": "Source Type",
                                    "type": "string",
                                    "value": "={{ $('Listen for incoming events').item.json.message.forward_origin ? \" forwarded\" : \"\" }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "e18de374-941f-4c2e-ab6c-6c6f68f2ce12",
            "name": "Send final reply",
            "type": "n8n-nodes-base.telegram",
            "onError": "continueErrorOutput",
            "position": [
                  1040,
                  460
            ],
            "parameters": {
                  "text": "={{ $json.output }} \n\nThank you for your{{ $('Combine content and set properties').item.json['Source Type'] }} {{ $('Combine content and set properties').item.json['Message Type '] }} 🤗",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "b47a9583-ce5c-464f-a9e6-153fb42e685f",
            "name": "Send error message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  60,
                  300
            ],
            "parameters": {
                  "text": "=Sorry, {{ $('Listen for incoming events').first().json.message.from.first_name }}! This command is not supported yet. Please send text or voice messages.",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "0196b49e-90a1-4f2f-8b94-492fced37dbf",
            "name": "Convert audio to text",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  240,
                  600
            ],
            "parameters": {
                  "options": {
                        "language": "",
                        "temperature": 0.7
                  },
                  "resource": "audio",
                  "operation": "transcribe"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "rveqdSfp7pCRON1T",
                        "name": "Ted's Tech Talks OpenAi"
                  }
            },
            "typeVersion": 1.5
      },
      {
            "id": "66505b83-e0c3-4d9d-8e1a-9b54030e29e7",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -466.12784869794086,
                  220
            ],
            "parameters": {
                  "width": 1035.4478381373049,
                  "height": 547.5630890194532,
                  "content": "## Receive and pre-process messages \n"
            },
            "typeVersion": 1
      },
      {
            "id": "44087d3f-86c8-407c-8791-645d167165cb",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  220
            ],
            "parameters": {
                  "color": 2,
                  "width": 861.262180151035,
                  "height": 550.5748478134515,
                  "content": "## 1. Send incoming message to the AI Agent\n## 2. Deliver agent reply to the user \n"
            },
            "typeVersion": 1
      },
      {
            "id": "d7e58831-de97-483f-8b8a-583f85397245",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  20,
                  553.0639243489702
            ],
            "parameters": {
                  "color": 6,
                  "width": 367.73614918993235,
                  "height": 194.83713159725437,
                  "content": "## Transcribe audio"
            },
            "typeVersion": 1
      },
      {
            "id": "89515d80-6efc-40a8-95ce-343d4ff4dbee",
            "name": "Send Typing action",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -180,
                  300
            ],
            "parameters": {
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "operation": "sendChatAction"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "9dexJXnlVPA6wt8K",
                        "name": "Chat & Sound"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "c925d059-f843-473c-bfd4-3c563d80ca0f",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  680,
                  460
            ],
            "parameters": {
                  "text": "={{ $json.CombinedMessage }}",
                  "options": {
                        "humanMessage": "TOOLS\n------\nAssistant can ask the user to use tools to look up information that may be helpful in answering the users original question. The tools the human can use are:\n\n{tools}\n\n{format_instructions}\n\nUSER'S INPUT\n--------------------\nHere is the user's input (remember to respond with a markdown code snippet of a json blob with a single action, and NOTHING else):\n\n{{input}}",
                        "systemMessage": "=You are a helpful AI assistant. You are chatting with the user named `{{ $('Determine content type').item.json.message.from.first_name }}`. You need to address the user by their name. Today is {{ DateTime.fromISO($now).toLocaleString(DateTime.DATETIME_FULL) }}\n\nIn your reply, always send a message in Telegram-supported HTML format. Here are the formatting instructions:\n1. The following tags are currently supported:\n<b>bold</b>, <strong>bold</strong>\n<i>italic</i>, <em>italic</em>\n<u>underline</u>, <ins>underline</ins>\n<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>\n<span class=\"tg-spoiler\">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>\n<b>bold <i>italic bold <s>italic bold strikethrough <span class=\"tg-spoiler\">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>\n<a href=\"http://www.example.com/\">inline URL</a>\n<code>inline fixed-width code</code>\n<pre>pre-formatted fixed-width code block</pre>\n2. Any code that you send should be wrapped in these tags: <pre><code class=\"language-python\">pre-formatted fixed-width code block written in the Python programming language</code></pre>\nOther programming languages are supported as well.\n3. All <, > and & symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (< with &lt;, > with &gt; and & with &amp;)\n4. If the user sends you a message starting with / sign, it means this is a Telegram bot command. For example, all users send /start command as their first message. Try to figure out what these commands mean and reply accodringly\n"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "2c56536d-1a86-4a49-b495-3e877adb308a",
            "name": "Determine content type",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -180,
                  480
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
                                                            "type": "string",
                                                            "operation": "notEmpty",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.message.text }}",
                                                      "rightValue": "/"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Voice",
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
                                                      "id": "dd41bbf0-bee0-450b-9160-b769821a4abc",
                                                      "operator": {
                                                            "type": "object",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.message.voice}}",
                                                      "rightValue": ""
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
            "typeVersion": 3.2
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Send final reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send final reply": {
            "main": [
                  [],
                  [
                        {
                              "node": "Correct errors",
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
      "Download voice file": {
            "main": [
                  [
                        {
                              "node": "Convert audio to text",
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
      "Convert audio to text": {
            "main": [
                  [
                        {
                              "node": "Combine content and set properties",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Determine content type": {
            "main": [
                  [
                        {
                              "node": "Combine content and set properties",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Download voice file",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Send error message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Listen for incoming events": {
            "main": [
                  [
                        {
                              "node": "Determine content type",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Send Typing action",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine content and set properties": {
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
    name: "Telegram AI Langchain bot",
    nodes: [
      {
            "id": "e275f31f-6a5f-4444-8bf7-6c003a8e53df",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1100,
                  600
            ],
            "parameters": {
                  "model": "gpt-4-1106-preview",
                  "options": {
                        "temperature": 0.7,
                        "frequencyPenalty": 0.2
                  }
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
            "id": "f25a6666-ff23-4372-afd0-4920a99aab6a",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1220,
                  600
            ],
            "parameters": {
                  "sessionKey": "=chat_with_{{ $('Listen for incoming events').first().json.message.chat.id }}",
                  "contextWindowLength": 10
            },
            "typeVersion": 1
      },
      {
            "id": "96faef5d-0349-47fe-a7cf-150953490e90",
            "name": "Telegram",
            "type": "n8n-nodes-base.telegram",
            "onError": "continueErrorOutput",
            "position": [
                  1500,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram sdfsdfsdfsdfsfd_bot"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "5ad43039-aaa6-43cd-9b0f-1d02f4d9c4ff",
            "name": "Correct errors",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1700,
                  380
            ],
            "parameters": {
                  "text": "={{ $('AI Agent').item.json.output.replace(/&/g, \"&amp;\").replace(/>/g, \"&gt;\").replace(/</g, \"&lt;\").replace(/\"/g, \"&quot;\") }}",
                  "chatId": "={{ $('Listen for incoming events').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram sdfsdfsdfsdfsfd_bot"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "0349a250-966a-4064-970a-8bcfba1647ad",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  940,
                  900
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "69a45c1f-838f-49ce-9b89-75db6a8b876f",
            "name": "Listen for incoming events",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  940,
                  380
            ],
            "webhookId": "322dce18-f93e-4f86-b9b1-3305519b7834",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram sdfsdfsdfsdfsfd_bot"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2f5d5f25-9870-40d6-ad42-52750e62de63",
            "name": "Send back an image",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1300,
                  900
            ],
            "parameters": {
                  "file": "={{ $json.data[0].url }}",
                  "chatId": "={{ $('Execute Workflow Trigger').first().json.chat_id }}",
                  "operation": "sendPhoto",
                  "additionalFields": {
                        "parse_mode": "HTML"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram sdfsdfsdfsdfsfd_bot"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "50b43dbf-39e3-4d00-8e47-01e8c193cd1a",
            "name": "add response field",
            "type": "n8n-nodes-base.set",
            "position": [
                  1480,
                  900
            ],
            "parameters": {
                  "fields": {
                        "values": [
                              {
                                    "name": "response",
                                    "stringValue": "Success"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "171bee83-c8e1-4af3-9d1c-12cb6ede4943",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  900,
                  840
            ],
            "parameters": {
                  "width": 752.0361990950231,
                  "height": 247.42081447963798,
                  "content": "## Generate an image with Dall-E 3 and send it via Telegram"
            },
            "typeVersion": 1
      },
      {
            "id": "4d81d201-70bf-4c80-9689-4b65851ad770",
            "name": "Dall-E 3 Tool",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  1360,
                  600
            ],
            "parameters": {
                  "name": "Draw_Dalle_image",
                  "fields": {
                        "values": [
                              {
                                    "name": "chat_id",
                                    "stringValue": "={{ $('Listen for incoming events').first().json.message.chat.id }}"
                              }
                        ]
                  },
                  "workflowId": "={{ $workflow.id }}",
                  "description": "Call this tool to request a Dall-E 3 model, when the user asks to draw something. Please send the user request for an image as an inline query string."
            },
            "typeVersion": 1
      },
      {
            "id": "39d532d3-8c96-4722-9cb0-cad92ff39e94",
            "name": "Generate image in Dall-E 3",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1120,
                  900
            ],
            "parameters": {
                  "url": "https://api.openai.com/v1/images/generations",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "model",
                                    "value": "dall-e-3"
                              },
                              {
                                    "name": "prompt",
                                    "value": "={{ $json.query }}"
                              },
                              {
                                    "name": "n",
                                    "value": 1
                              },
                              {
                                    "name": "size",
                                    "value": "1024x1024"
                              }
                        ]
                  },
                  "nodeCredentialType": "openAiApi"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "63",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 4.1
      },
      {
            "id": "e5aa496d-55d3-456b-82bb-fe10a06c7338",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1140,
                  380
            ],
            "parameters": {
                  "text": "={{ $json.message.text }}",
                  "options": {
                        "humanMessage": "TOOLS\n------\nAssistant can ask the user to use tools to look up information that may be helpful in answering the users original question. The tools the human can use are:\n\n{tools}\n\n{format_instructions}\n\nUSER'S INPUT\n--------------------\nHere is the user's input (remember to respond with a markdown code snippet of a json blob with a single action, and NOTHING else):\n\n{{input}}",
                        "systemMessage": "=You are a helpful AI assistant. You are chatting with the user named `{{ $json.message.from.first_name }}`. Today is {{ DateTime.fromISO($now).toLocaleString(DateTime.DATETIME_FULL) }}\n\nFrom time to time call a user by name (if the user name is provided). In your reply, always send a message in Telegram-supported HTML format. Here are the formatting instructions:\n1. The following tags are currently supported:\n<b>bold</b>, <strong>bold</strong>\n<i>italic</i>, <em>italic</em>\n<u>underline</u>, <ins>underline</ins>\n<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>\n<span class=\"tg-spoiler\">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>\n<b>bold <i>italic bold <s>italic bold strikethrough <span class=\"tg-spoiler\">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>\n<a href=\"http://www.example.com/\">inline URL</a>\n<code>inline fixed-width code</code>\n<pre>pre-formatted fixed-width code block</pre>\n2. Any code that you send should be wrapped in these tags: <pre><code class=\"language-python\">pre-formatted fixed-width code block written in the Python programming language</code></pre>\nOther programming languages are supported as well.\n3. All <, > and & symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (< with &lt;, > with &gt; and & with &amp;)\n4. If the user sends you a message starting with / sign, it means this is a Telegram bot command. For example, all users send /start command as their first message. Try to figure out what these commands mean and reply accodringly\n"
                  }
            },
            "typeVersion": 1.1
      }
],
    connections: {
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
      "Telegram": {
            "main": [
                  [],
                  [
                        {
                              "node": "Correct errors",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Dall-E 3 Tool": {
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
      "Send back an image": {
            "main": [
                  [
                        {
                              "node": "add response field",
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
      "Execute Workflow Trigger": {
            "main": [
                  [
                        {
                              "node": "Generate image in Dall-E 3",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate image in Dall-E 3": {
            "main": [
                  [
                        {
                              "node": "Send back an image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Listen for incoming events": {
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
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1",
      "saveManualExecutions": true,
      "saveDataSuccessExecution": "all"
},
  },
  {
    name: "NeurochainAI Basic API Integration",
    nodes: [
      {
            "id": "da34bd1a-4e4e-4133-acad-939d0cc96596",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  -1740,
                  880
            ],
            "webhookId": "05885608-5344-4dcf-81ad-4550b9a01241",
            "parameters": {
                  "updates": [
                        "*"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "3b3f4b00-6b3b-4346-8fcc-7ab75bcfe838",
            "name": "Code",
            "type": "n8n-nodes-base.code",
            "notes": "Extract the URL from the previous node",
            "position": [
                  80,
                  260
            ],
            "parameters": {
                  "jsCode": "// O valor vem como um array com uma string, então precisamos pegar o primeiro item do array\nconst rawUrl = $json.choices[0].text;\n\n// Remover colchetes e aspas (se existirem) e pegar o primeiro elemento do array\nconst imageUrl = JSON.parse(rawUrl)[0];\n\nreturn {\n json: {\n imageUrl: imageUrl\n }\n};"
            },
            "notesInFlow": true,
            "typeVersion": 2
      },
      {
            "id": "ccb91a15-96b5-42aa-a6ae-ff7ae79d1e8f",
            "name": "HTTP Request3",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  240,
                  260
            ],
            "parameters": {
                  "url": "={{ $json.imageUrl }}",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "588899b6-a68e-407e-b12f-f05c205674c5",
            "name": "Telegram2",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -520,
                  500
            ],
            "parameters": {
                  "text": "⌛",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "replyMarkup": "inlineKeyboard",
                  "additionalFields": {
                        "appendAttribution": false,
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e1534b69-d93d-4e8b-a3c4-adbc17c1dacd",
            "name": "Telegram1",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  440,
                  260
            ],
            "parameters": {
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "operation": "sendPhoto",
                  "binaryData": true,
                  "additionalFields": {
                        "caption": "=*Prompt:* `{{ $('Code1').item.json.cleanMessage }}`",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "88ba4ced-bdd0-408e-94e1-9e54ed4d1b5d",
            "name": "Telegram4",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  620,
                  260
            ],
            "parameters": {
                  "chatId": "={{ $('Telegram2').item.json.result.chat.id }}",
                  "messageId": "={{ $('Telegram2').item.json.result.message_id }}",
                  "operation": "deleteMessage"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "251a026e-ebfa-44f5-9c80-f30e5c142e23",
            "name": "Telegram3",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  260,
                  700
            ],
            "parameters": {
                  "text": "={{ $json.error.message }}",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "replyMarkup": "inlineKeyboard",
                  "inlineKeyboard": {
                        "rows": [
                              {
                                    "row": {
                                          "buttons": [
                                                {
                                                      "text": "🔄 Retry",
                                                      "additionalFields": {
                                                            "callback_data": "=response= Fluxretry: {{ $('Code1').item.json.cleanMessage }}"
                                                      }
                                                }
                                          ]
                                    }
                              }
                        ]
                  },
                  "additionalFields": {
                        "appendAttribution": false,
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "fb71a62a-9cf8-4abf-baa4-885ae4b1a290",
            "name": "Telegram5",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  480,
                  700
            ],
            "parameters": {
                  "chatId": "={{ $('Telegram2').item.json.result.chat.id }}",
                  "messageId": "={{ $('Telegram2').item.json.result.message_id }}",
                  "operation": "deleteMessage"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "0f9bcdf0-0008-447a-900c-6afe5b9d53fe",
            "name": "Telegram6",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  260,
                  520
            ],
            "parameters": {
                  "text": "=*Prompt too short*",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "replyMarkup": "inlineKeyboard",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false,
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "d805548a-7379-456c-9bc3-f5fafeb86aed",
            "name": "Telegram7",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  480,
                  520
            ],
            "parameters": {
                  "chatId": "={{ $('Telegram2').item.json.result.chat.id }}",
                  "messageId": "={{ $('Telegram2').item.json.result.message_id }}",
                  "operation": "deleteMessage"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a3e521a3-aff0-4d31-9a69-626f70f86ae2",
            "name": "NeurochainAI - REST API",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueErrorOutput",
            "position": [
                  -680,
                  1280
            ],
            "parameters": {
                  "url": "https://ncmb.neurochain.io/tasks/message",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"model\": \"Meta-Llama-3.1-8B-Instruct-Q6_K.gguf\",\n \"prompt\": \"You must respond directly to the user's message, and the message the user sent you is the following message: {{ $('Telegram Trigger').item.json.message.text }}\",\n \"max_tokens\": 1024,\n \"temperature\": 0.6,\n \"top_p\": 0.95,\n \"frequency_penalty\": 0,\n \"presence_penalty\": 1.1\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "=Bearer YOUR-API-KEY-HERE"
                              },
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2,
            "alwaysOutputData": false
      },
      {
            "id": "5fea3a8b-3e1b-4c69-b734-3f9dc7647e4b",
            "name": "TYPING - ACTION",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -1100,
                  1280
            ],
            "parameters": {
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "operation": "sendChatAction"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "ca183e3d-2bef-4d80-bbb7-c712a0290b2b",
            "name": "AI Response",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -360,
                  1000
            ],
            "parameters": {
                  "text": "={{ $json.choices[0].text }}",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false,
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "27e65f30-e58e-457d-b3b7-2b74267554e1",
            "name": "No response",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -140,
                  1240
            ],
            "parameters": {
                  "text": "=*No response from worker*",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false,
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "02cf4dfa-558f-4968-ad09-19f1e40735b0",
            "name": "Prompt too short",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -140,
                  1400
            ],
            "parameters": {
                  "text": "=*Prompt too short*",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "replyMarkup": "inlineKeyboard",
                  "additionalFields": {
                        "parse_mode": "Markdown",
                        "appendAttribution": false,
                        "reply_to_message_id": "={{ $('Telegram Trigger').item.json.message.message_id }}"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "VPtf3hBnwGucAQtu",
                        "name": "TEMPLATE"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "943d31e4-3745-49ea-9669-8a560a486cc4",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -400,
                  1220
            ],
            "parameters": {
                  "color": 3,
                  "width": 460.4333621829785,
                  "height": 347.9769162173868,
                  "content": "## ERROR"
            },
            "typeVersion": 1
      },
      {
            "id": "6b5d142f-8d8c-493f-81e7-cedb4e95cd31",
            "name": "Switch2",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -380,
                  1380
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
                                                      "leftValue": "={{ $json.error.message }}",
                                                      "rightValue": "=500 - \"{\\\"error\\\":true,\\\"msg\\\":\\\"No response from worker\\\"}\""
                                                }
                                          ]
                                    }
                              },
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
                                                      "id": "ef851d57-0618-4fe7-8469-a30971a05ee5",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "notEquals"
                                                      },
                                                      "leftValue": "{{ $json.error.message }}",
                                                      "rightValue": "400 - \"{\\\"error\\\":true,\\\"msg\\\":\\\"Prompt string is invalid\\\"}\""
                                                }
                                          ]
                                    }
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "77651cb7-2530-46b2-89eb-7ac07f39a3ba",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -400,
                  860
            ],
            "parameters": {
                  "color": 4,
                  "width": 459.0810102677459,
                  "height": 350.68162004785273,
                  "content": "## SUCCESS\nThis node will send the AI ​​response directly to the Telegram chat."
            },
            "typeVersion": 1
      },
      {
            "id": "5dce8414-fe7a-450a-a414-553d3e5e01cd",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -830.8527430805248,
                  861.5987888475245
            ],
            "parameters": {
                  "color": 5,
                  "width": 411.78262099325127,
                  "height": 705.0354263931183,
                  "content": "## HTTP REQUEST\n\nReplace **MODEL** with the desired AI model from the NeurochainAI dashboard.\n\nReplace YOUR-API-KEY-HERE with your actual NeurochainAI API key.\n\n**Models:**\nMeta-Llama-3.1-8B-Instruct-Q8_0.gguf\nMeta-Llama-3.1-8B-Instruct-Q6_K.gguf\nMistral-7B-Instruct-v0.2-GPTQ-Neurochain-custom-io\nMistral-7B-Instruct-v0.2-GPTQ-Neurochain-custom\nMistral-7B-OpenOrca-GPTQ\nMistral-7B-Instruct-v0.1-gguf-q8_0.gguf\nMistral-7B-Instruct-v0.2-GPTQ\ningredient-extractor-mistral-7b-instruct-v0.1-gguf-q8_0.gguf"
            },
            "typeVersion": 1
      },
      {
            "id": "3540e1fa-01f8-4b5e-ad7a-1b1c5cd90d08",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -840,
                  220
            ],
            "parameters": {
                  "color": 6,
                  "width": 236.80242230495116,
                  "height": 535.7153791682382,
                  "content": "## This node removes the /flux prefix."
            },
            "typeVersion": 1
      },
      {
            "id": "6720b734-c0ae-4c88-adb6-3931467c780d",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  220,
                  444
            ],
            "parameters": {
                  "color": 3,
                  "width": 593.1328365275054,
                  "height": 403.9345258807414,
                  "content": "## ERROR"
            },
            "typeVersion": 1
      },
      {
            "id": "30332278-399d-4c8f-8470-dfb967764455",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -320,
                  220
            ],
            "parameters": {
                  "color": 5,
                  "width": 384.60321058533617,
                  "height": 538.7613862505775,
                  "content": "## HTTP REQUEST\n\nReplace **MODEL** with the desired AI model from the NeurochainAI dashboard.\n\nReplace YOUR-API-KEY-HERE with your actual NeurochainAI API key.\n\n**Models:**\nsuper-flux1-schnell-gguf\nflux1-schnell-gguf"
            },
            "typeVersion": 1
      },
      {
            "id": "09f17d6a-6229-49ad-b77b-243712552f2b",
            "name": "Code1",
            "type": "n8n-nodes-base.code",
            "position": [
                  -780,
                  480
            ],
            "parameters": {
                  "jsCode": "// Acessa a mensagem original que está em $json.message.text\nconst userMessage = $json.message.text;\n\n// Remover o prefixo '/flux' e qualquer espaço extra após o comando\nconst cleanMessage = userMessage.replace(/^\\/flux\\s*/, '');\n\n// Retornar a mensagem limpa\nreturn {\n json: {\n cleanMessage: cleanMessage\n }\n};"
            },
            "typeVersion": 2
      },
      {
            "id": "0c809796-9776-4238-94b8-0779ad390bc6",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -580,
                  220
            ],
            "parameters": {
                  "height": 535.7153791682384,
                  "content": "## This node sends an emoji to indicate that the prompt is being processed."
            },
            "typeVersion": 1
      },
      {
            "id": "19043710-a61a-46d0-9ab9-bcdf9c94f800",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  220,
                  80
            ],
            "parameters": {
                  "color": 4,
                  "width": 596.5768511548468,
                  "height": 350.68162004785273,
                  "content": "## SUCCESS\nThis node will send the AI ​​response directly to the Telegram chat."
            },
            "typeVersion": 1
      },
      {
            "id": "e5715001-75a3-4da3-84bb-9aad193fe680",
            "name": "Switch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  -1420,
                  880
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Flux",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "loose"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "f5df9de6-0650-42e4-9a6e-8d1becf16c51",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "startsWith"
                                                      },
                                                      "leftValue": "={{ $json.message.text }}",
                                                      "rightValue": "/flux"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "text",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "loose"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "a49ecf63-3f68-4e21-a015-d0cbc227c230",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "contains"
                                                      },
                                                      "leftValue": "={{ $json.message.text }}",
                                                      "rightValue": "@NCNAI_BOT"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "DM Text",
                                    "conditions": {
                                          "options": {
                                                "version": 2,
                                                "leftValue": "",
                                                "caseSensitive": false,
                                                "typeValidation": "loose"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "d5ac0c9f-858a-4040-b72e-ae7b522ff60e",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.message.chat.type }}",
                                                      "rightValue": "private"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "ignoreCase": true
                  },
                  "looseTypeValidation": true
            },
            "typeVersion": 3.2
      },
      {
            "id": "0ebdea59-8518-4078-b07a-9aa24c5e79b5",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1840,
                  200
            ],
            "parameters": {
                  "width": 623.6530631885605,
                  "height": 648.96526541807,
                  "content": "## Instructions for Using the Template\nFollow these steps to set up and use this template:\n\n**Create a Telegram Bot**:\n- Open Telegram and search for BotFather.\n- Use the ``/newbot`` command to create your bot.\n- Follow the prompts and copy the Token provided at the end.\n-------------\n**Obtain a NeurochainAI API Key:**\n\n- Log in to the NeurochainAI Dashboard.\n- Generate an **API Key** under the Inference As Service section.\n- Ensure your account has sufficient credits for usage.\n-------------\n **Configure Telegram Nodes:**\n- Locate all Telegram nodes in the workflow and add your Telegram Bot Token to each node's credentials.\n-------------\n**Configure HTTP Request Nodes:**\n\n- Identify the NeurochainAI - Rest API and NeurochainAI - Flux nodes in the workflow.\nIn each node:\n- Enter your desired model in the Model field.\n- Replace ``YOUR-API-KEY-HERE`` with your API Key in the headers or configuration section.\n-------------\n**Save and Test:**\n- Save the workflow in N8N.\n- Test the workflow by interacting with your Telegram bot to trigger text and image generation tasks."
            },
            "typeVersion": 1
      },
      {
            "id": "06642d6b-f8e2-48b6-87e3-5f51af75d357",
            "name": "NeurochainAI - Flux",
            "type": "n8n-nodes-base.httpRequest",
            "onError": "continueErrorOutput",
            "position": [
                  -180,
                  540
            ],
            "parameters": {
                  "url": "https://ncmb.neurochain.io/tasks/tti",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={\n \"model\": \"flux1-schnell-gguf\",\n \"prompt\": \"Generate an image that matches exactly this: {{ $('Code1').item.json.cleanMessage }}\",\n \"size\": \"1024x1024\",\n \"quality\": \"standard\",\n \"n\": 1,\n \"seed\": {{ Math.floor(Math.random() * 999) + 1 }}\n}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Authorization",
                                    "value": "=Bearer YOUR-API-KEY-HERE"
                              },
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2,
            "alwaysOutputData": false
      },
      {
            "id": "92820069-3e65-4385-8b79-9b04dd1d3b03",
            "name": "Switch1",
            "type": "n8n-nodes-base.switch",
            "position": [
                  100,
                  600
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
                                                      "leftValue": "={{ $json.error.message }}",
                                                      "rightValue": "400 - \"{\\\"error\\\":true,\\\"msg\\\":\\\"Prompt string is invalid\\\"}\""
                                                }
                                          ]
                                    }
                              },
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
                                                      "id": "ef851d57-0618-4fe7-8469-a30971a05ee5",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "notEquals"
                                                      },
                                                      "leftValue": "{{ $json.error.message }}",
                                                      "rightValue": "400 - \"{\\\"error\\\":true,\\\"msg\\\":\\\"Prompt string is invalid\\\"}\""
                                                }
                                          ]
                                    }
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      }
],
    connections: {
      "Code": {
            "main": [
                  [
                        {
                              "node": "HTTP Request3",
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
                              "node": "Telegram2",
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
                              "node": "Code1",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "TYPING - ACTION",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "TYPING - ACTION",
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
                              "node": "Telegram6",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Telegram3",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Switch2": {
            "main": [
                  [
                        {
                              "node": "No response",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Prompt too short",
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
                              "node": "Telegram4",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram2": {
            "main": [
                  [
                        {
                              "node": "NeurochainAI - Flux",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram3": {
            "main": [
                  [
                        {
                              "node": "Telegram5",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram6": {
            "main": [
                  [
                        {
                              "node": "Telegram7",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "HTTP Request3": {
            "main": [
                  [
                        {
                              "node": "Telegram1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "TYPING - ACTION": {
            "main": [
                  [
                        {
                              "node": "NeurochainAI - REST API",
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
                              "node": "Switch",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "NeurochainAI - Flux": {
            "main": [
                  [
                        {
                              "node": "Code",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Switch1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "NeurochainAI - REST API": {
            "main": [
                  [
                        {
                              "node": "AI Response",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Switch2",
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
    name: "Telegram AI-bot",
    nodes: [
      {
            "id": "ea71a467-a646-4aca-b72e-cef1249c74e2",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  20,
                  340
            ],
            "webhookId": "51942fbb-ca0e-4ec4-9423-5fcc7d3c4281",
            "parameters": {
                  "updates": [
                        "*"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram bot"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "1cbe43d4-ea8b-4178-bc10-4bfad7abe143",
            "name": "CheckCommand",
            "type": "n8n-nodes-base.switch",
            "position": [
                  980,
                  360
            ],
            "parameters": {
                  "rules": {
                        "rules": [
                              {
                                    "value2": "/",
                                    "operation": "notStartsWith"
                              },
                              {
                                    "output": 1,
                                    "value2": "/start",
                                    "operation": "startsWith"
                              },
                              {
                                    "output": 2,
                                    "value2": "=/image ",
                                    "operation": "startsWith"
                              }
                        ]
                  },
                  "value1": "={{ $json.message?.text }}",
                  "dataType": "string",
                  "fallbackOutput": 3
            },
            "typeVersion": 1
      },
      {
            "id": "074e907f-634b-4242-b669-33fa064f8472",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1600,
                  581.661764705882
            ],
            "parameters": {
                  "width": 316.1071428571428,
                  "height": 231.22373949579838,
                  "content": "## Error fallback for unsupported commands"
            },
            "typeVersion": 1
      },
      {
            "id": "2aa961b8-f0af-4d5c-a6af-1be56ea4b2e6",
            "name": "Settings",
            "type": "n8n-nodes-base.set",
            "position": [
                  380,
                  340
            ],
            "parameters": {
                  "values": {
                        "number": [
                              {
                                    "name": "model_temperature",
                                    "value": 0.8
                              },
                              {
                                    "name": "token_length",
                                    "value": 500
                              }
                        ],
                        "string": [
                              {
                                    "name": "system_command",
                                    "value": "=You are a friendly chatbot. User name is {{ $json?.message?.from?.first_name }}. User system language is {{ $json?.message?.from?.language_code }}. First, detect user text language. Next, provide your reply in the same language. Include several suitable emojis in your answer."
                              },
                              {
                                    "name": "bot_typing",
                                    "value": "={{ $json?.message?.text.startsWith('/image') ? \"upload_photo\" : \"typing\" }}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 2
      },
      {
            "id": "2d2fe268-1e3e-483b-847c-4412e586c1ca",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1240,
                  -240
            ],
            "parameters": {
                  "width": 330.5019024637719,
                  "height": 233,
                  "content": "## Chatbot mode by default\n### (when no command is provided)"
            },
            "typeVersion": 1
      },
      {
            "id": "09a9c0b4-ac6e-46eb-b2e0-ef2b55e94ada",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1240,
                  20
            ],
            "parameters": {
                  "width": 330.7863484403046,
                  "height": 219.892857142857,
                  "content": "## Welcome message\n### /start"
            },
            "typeVersion": 1
      },
      {
            "id": "088cffee-5720-488b-a4ec-cfdccbf77e75",
            "name": "Chat_mode",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  1340,
                  -160
            ],
            "parameters": {
                  "model": "gpt-4",
                  "prompt": {
                        "messages": [
                              {
                                    "role": "system",
                                    "content": "={{ $json.system_command }}"
                              },
                              {
                                    "content": "={{ $json.message.text }}"
                              }
                        ]
                  },
                  "options": {
                        "maxTokens": "={{ $json.token_length }}",
                        "temperature": "={{ $json.model_temperature }}"
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
            "id": "41248697-6474-4a8f-a8b8-038c96465948",
            "name": "Greeting",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  1340,
                  80
            ],
            "parameters": {
                  "prompt": {
                        "messages": [
                              {
                                    "role": "system",
                                    "content": "={{ $json.system_command }}"
                              },
                              {
                                    "content": "=This is the first message from a user. Please welcome a new user in `{{ $json.message.from.language_code }}` language"
                              }
                        ]
                  },
                  "options": {
                        "maxTokens": "={{ $json.token_length }}",
                        "temperature": "={{ $json.model_temperature }}"
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
            "id": "20c2e7fa-5d65-441b-8d1d-a8d46c624964",
            "name": "Text reply",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1700,
                  -40
            ],
            "parameters": {
                  "text": "={{ $json.message.content }}",
                  "chatId": "={{ $('Settings').first().json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram bot"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "30321276-ebe1-41ac-b420-9dab8daa405b",
            "name": "Send Typing action",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  580,
                  480
            ],
            "parameters": {
                  "action": "={{ $json.bot_typing }}",
                  "chatId": "={{ $json.message.from.id }}",
                  "operation": "sendChatAction"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram bot"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "7d7ff2e8-b0ca-4638-a056-f7b4e2e6273d",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  800,
                  360
            ],
            "parameters": {
                  "mode": "chooseBranch"
            },
            "typeVersion": 2.1
      },
      {
            "id": "656bab5e-b7f7-47a1-8e75-4a17d2070290",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1240,
                  280
            ],
            "parameters": {
                  "width": 329.7428571428562,
                  "height": 233.8785714285713,
                  "content": "## Create an image\n### /image + request"
            },
            "typeVersion": 1
      },
      {
            "id": "ca2111d2-463a-4ef0-9436-ee09598dbf07",
            "name": "Create an image",
            "type": "n8n-nodes-base.openAi",
            "position": [
                  1340,
                  360
            ],
            "parameters": {
                  "prompt": "={{ $json.message.text.split(' ').slice(1).join(' ') }}",
                  "options": {
                        "n": 1,
                        "size": "512x512"
                  },
                  "resource": "image",
                  "responseFormat": "imageUrl"
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
            "id": "e91d616b-1d5e-40e8-8468-2d0b2dda4cf7",
            "name": "Send error message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1700,
                  660
            ],
            "parameters": {
                  "text": "=Sorry, {{ $json.message.from.first_name }}! This command is not supported yet. Please type some text to a chat bot or try this command:\n/image \\[your prompt]\n\nEnter the command, then space and provide your request. Example:\n\n`/image a picture or a cute little kitten with big eyes. Miyazaki studio ghibli style`",
                  "chatId": "={{ $json.message.from.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram bot"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "125e27d2-b03b-4f02-9dd1-8fc81ecf0b6b",
            "name": "Send image",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1700,
                  360
            ],
            "parameters": {
                  "file": "={{ $json.url }}",
                  "chatId": "={{ $('Settings').first().json.message.from.id }}",
                  "operation": "sendPhoto",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "70",
                        "name": "Telegram bot"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "730a51ac-223e-4956-be7f-166eadb6ed81",
            "name": "PreProcessing",
            "type": "n8n-nodes-base.set",
            "position": [
                  200,
                  340
            ],
            "parameters": {
                  "values": {
                        "string": [
                              {
                                    "name": "message.text",
                                    "value": "={{ $json?.message?.text || \"\" }}"
                              }
                        ]
                  },
                  "options": {
                        "dotNotation": true
                  }
            },
            "typeVersion": 2
      }
],
    connections: {
      "Merge": {
            "main": [
                  [
                        {
                              "node": "CheckCommand",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Greeting": {
            "main": [
                  [
                        {
                              "node": "Text reply",
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
                              "node": "Send Typing action",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Chat_mode": {
            "main": [
                  [
                        {
                              "node": "Text reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "CheckCommand": {
            "main": [
                  [
                        {
                              "node": "Chat_mode",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Greeting",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Create an image",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Send error message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "PreProcessing": {
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
      "Create an image": {
            "main": [
                  [
                        {
                              "node": "Send image",
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
                              "node": "PreProcessing",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Send Typing action": {
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
    settings: {
      "callerPolicy": "workflowsFromSameOwner",
      "saveManualExecutions": true,
      "saveDataSuccessExecution": "all"
},
  },
  {
    name: "Telegram Bot With Supabase Memory And OpenAI Assistant Integration",
    nodes: [
      {
            "id": "9cc26a42-eb43-40c4-b507-cbaf187a5e15",
            "name": "Get New Message",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  1120,
                  500
            ],
            "webhookId": "464f0a75-56d1-402f-8b12-b358452e9736",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "rI0zyfIYVIyXt2fL",
                        "name": "Telegram Club"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "098b6fcf-7cb6-4730-8892-949fedc946b3",
            "name": "OPENAI - Create thread",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1740,
                  640
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
                        "id": "zJhr5piyEwVnWtaI",
                        "name": "OpenAi club"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "fa157f8c-b776-4b20-bfaf-c17460383505",
            "name": "Create User",
            "type": "n8n-nodes-base.supabase",
            "position": [
                  1900,
                  640
            ],
            "parameters": {
                  "tableId": "telegram_users",
                  "fieldsUi": {
                        "fieldValues": [
                              {
                                    "fieldId": "telegram_id",
                                    "fieldValue": "={{ $('Get New Message').item.json.message.chat.id }}"
                              },
                              {
                                    "fieldId": "openai_thread_id",
                                    "fieldValue": "={{ $('OPENAI - Create thread').item.json.id }}"
                              }
                        ]
                  }
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "QBhcokohbJHfQZ9A",
                        "name": "Supabase club"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "115e417f-5962-409b-8adf-ff236eb9ce2e",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2080,
                  500
            ],
            "parameters": {},
            "typeVersion": 3
      },
      {
            "id": "ba5c7385-8c80-43c8-9de2-430175bda70b",
            "name": "OPENAI - Send message",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2240,
                  500
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('Merge').item.json.openai_thread_id }}/messages ",
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
                                    "value": "={{ $('Get New Message').item.json.message.text }}"
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
            "id": "024832bc-3d42-4879-a57f-b23e962b4c69",
            "name": "OPENAI - Run assistant",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2440,
                  500
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('Merge').item.json.openai_thread_id }}/runs",
                  "method": "POST",
                  "options": {},
                  "sendBody": true,
                  "sendHeaders": true,
                  "authentication": "predefinedCredentialType",
                  "bodyParameters": {
                        "parameters": [
                              {
                                    "name": "assistant_id",
                                    "value": "asst_b0QhuzySG6jofHFdzPZD7WEz"
                              },
                              {
                                    "name": "stream",
                                    "value": "={{true}}"
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
            "id": "bc191e2b-15f4-45b7-af2e-19ed1639b7f5",
            "name": "OPENAI - Get messages",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2640,
                  500
            ],
            "parameters": {
                  "url": "=https://api.openai.com/v1/threads/{{ $('Merge').item.json.openai_thread_id }}/messages",
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
            "id": "c22e05e5-f0a7-4a09-a864-acfc58469b30",
            "name": "Send Message to User",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2840,
                  500
            ],
            "parameters": {
                  "text": "={{ $('OPENAI - Get messages').item.json.data[0].content[0].text.value }}",
                  "chatId": "={{ $('Get New Message').item.json.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "rI0zyfIYVIyXt2fL",
                        "name": "Telegram Club"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "0673be1f-3cae-42a0-9c62-1ed570859043",
            "name": "If User exists",
            "type": "n8n-nodes-base.if",
            "position": [
                  1560,
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
                                    "id": "b6e69a1f-eb42-4ef6-b80c-3167f1b8c830",
                                    "operator": {
                                          "type": "string",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.id }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "a4916f54-ae6b-495d-979b-92dca965e3bb",
            "name": "Find User",
            "type": "n8n-nodes-base.supabase",
            "position": [
                  1360,
                  500
            ],
            "parameters": {
                  "filters": {
                        "conditions": [
                              {
                                    "keyName": "telegram_id",
                                    "keyValue": "={{ $json.message.chat.id }}",
                                    "condition": "eq"
                              }
                        ]
                  },
                  "tableId": "telegram_users",
                  "operation": "getAll"
            },
            "credentials": {
                  "supabaseApi": {
                        "id": "QBhcokohbJHfQZ9A",
                        "name": "Supabase club"
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": true
      },
      {
            "id": "6d01d7ed-e96b-47cf-9a5f-46608031baa2",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1300,
                  800
            ],
            "parameters": {
                  "color": 7,
                  "width": 600.723278204605,
                  "height": 213.15921994594194,
                  "content": "SQL query to create table in Supabase:\n\n```\ncreate table\n public.telegram_users (\n id uuid not null default gen_random_uuid (),\n date_created timestamp with time zone not null default (now() at time zone 'utc'::text),\n telegram_id bigint null,\n openai_thread_id text null,\n constraint telegram_users_pkey primary key (id)\n ) tablespace pg_default;\n```"
            },
            "typeVersion": 1
      },
      {
            "id": "1a996da0-6022-48d7-ba40-1d137547a3d7",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2340,
                  360
            ],
            "parameters": {
                  "color": 3,
                  "width": 282.075050779723,
                  "height": 80,
                  "content": "Create assistant in [OpenAI](https://platform.openai.com/assistants).\n\n**Specify own assistant id here**\n"
            },
            "typeVersion": 1
      },
      {
            "id": "b24d2008-7950-41f0-a7fa-50360c0c6854",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1040,
                  380
            ],
            "parameters": {
                  "color": 3,
                  "width": 235.09282368774151,
                  "height": 80,
                  "content": "Create own Telegram bot in [Botfather bot](https://t.me/botfather)"
            },
            "typeVersion": 1
      },
      {
            "id": "9eb2491e-5ad9-4015-8ed9-611e72924503",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1300,
                  680
            ],
            "parameters": {
                  "color": 3,
                  "height": 80,
                  "content": "Create table in [Supabase](https://supabase.com) with SQL query"
            },
            "typeVersion": 1
      },
      {
            "id": "884b5a1b-007c-4752-becc-46c8fc58db92",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  120
            ],
            "parameters": {
                  "color": 7,
                  "width": 280.2462120317618,
                  "height": 438.5821431288714,
                  "content": "### Set up steps\n1. **Create a Telegram Bot** using the [Botfather](https://t.me/botfather) and obtain the bot token.\n2. **Set up Supabase:**\n\t1. Create a new project and generate a ```SUPABASE_URL``` and ```SUPABASE_KEY```.\n\t2. Create a new table named ```telegram_users``` with the following SQL query:\n```\ncreate table\n public.telegram_users (\n id uuid not null default gen_random_uuid (),\n date_created timestamp with time zone not null default (now() at time zone 'utc'::text),\n telegram_id bigint null,\n openai_thread_id text null,\n constraint telegram_users_pkey primary key (id)\n ) tablespace pg_default;\n```\n3. **OpenAI Setup:**\n\t1. Create an OpenAI assistant and obtain the ```OPENAI_API_KEY```.\n\t2. Customize your assistant’s personality or use cases according to your requirements.\n4. **Environment Configuration in n8n:**\n\t1. Configure the Telegram, Supabase, and OpenAI nodes with the appropriate credentials.\n\t2. Set up triggers for receiving messages and handling conversation logic.\n\t3. Set up OpenAI assistant ID in \"++OPENAI - Run assistant++\" node."
            },
            "typeVersion": 1
      },
      {
            "id": "02db77ac-4909-4a56-a558-03c86d8b8552",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  -400
            ],
            "parameters": {
                  "color": 7,
                  "width": 636.2128494576581,
                  "height": 494.9629292914819,
                  "content": "![5min Logo](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/Untitled%20(1500%20x%20300%20px).png)\n## AI Telegram Bot with Supabase memory\n**Made by [Mark Shcherbakov](https://www.linkedin.com/in/marklowcoding/) from community [5minAI](https://www.skool.com/5minai-2861)**\n\nMany simple chatbots lack context awareness and user memory. This workflow solves that by integrating Supabase to keep track of user sessions (via ```telegram_id``` and ```openai_thread_id```), allowing the bot to maintain continuity and context in conversations, leading to a more human-like and engaging experience.\n\nThis Telegram bot template connects with OpenAI to answer user queries while storing and retrieving user information from a Supabase database. The memory component ensures that the bot can reference past interactions, making it suitable for use cases such as customer support, virtual assistants, or any application where context retention is crucial.\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "a991a7c9-ea5f-4a25-aa92-6dc2fce11b05",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  500,
                  120
            ],
            "parameters": {
                  "color": 7,
                  "width": 330.5152611046425,
                  "height": 240.6839895136402,
                  "content": "### ... or watch set up video [5 min]\n[![Youtube Thumbnail](https://cflobdhpqwnoisuctsoc.supabase.co/storage/v1/object/public/my_storage/Youtube%20thumb%20(3).png)](https://www.youtube.com/watch?v=kS41gut8l0g)\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Merge": {
            "main": [
                  [
                        {
                              "node": "OPENAI - Send message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Find User": {
            "main": [
                  [
                        {
                              "node": "If User exists",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create User": {
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
      "If User exists": {
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
                              "node": "OPENAI - Create thread",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get New Message": {
            "main": [
                  [
                        {
                              "node": "Find User",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OPENAI - Get messages": {
            "main": [
                  [
                        {
                              "node": "Send Message to User",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OPENAI - Send message": {
            "main": [
                  [
                        {
                              "node": "OPENAI - Run assistant",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OPENAI - Create thread": {
            "main": [
                  [
                        {
                              "node": "Create User",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OPENAI - Run assistant": {
            "main": [
                  [
                        {
                              "node": "OPENAI - Get messages",
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
    name: "Telegram RAG pdf",
    nodes: [
      {
            "id": "9fbce801-8c42-43a4-bc70-d93042d68b2c",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  -220,
                  240
            ],
            "webhookId": "b178f034-9997-4832-9bb4-a43c3015506e",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "1bfc1fbd-86b1-4a8a-9301-fe54497f5acd",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  720,
                  460
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "d5ad7851-ed40-4b3a-b0d5-aeaf04362f1c",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  860,
                  460
            ],
            "parameters": {
                  "options": {},
                  "dataType": "binary"
            },
            "typeVersion": 1
      },
      {
            "id": "fed803d0-49a2-4b82-8f20-a02a10caa027",
            "name": "Recursive Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  940,
                  680
            ],
            "parameters": {
                  "options": {},
                  "chunkSize": 3000,
                  "chunkOverlap": 200
            },
            "typeVersion": 1
      },
      {
            "id": "ab60f36f-fada-4812-8dbd-441ad372cb80",
            "name": "Stop and Error",
            "type": "n8n-nodes-base.stopAndError",
            "position": [
                  220,
                  840
            ],
            "parameters": {
                  "errorMessage": "An error occurred"
            },
            "typeVersion": 1
      },
      {
            "id": "c87f1db3-7cc9-4063-9895-4b4d68ea53a1",
            "name": "Question and Answer Chain",
            "type": "@n8n/n8n-nodes-langchain.chainRetrievalQa",
            "position": [
                  -280,
                  500
            ],
            "parameters": {
                  "text": "={{ $json.message.text }}\nSearch the database with the retriever for information for the answer",
                  "promptType": "define"
            },
            "typeVersion": 1.3
      },
      {
            "id": "c9bc4c80-8e57-48bc-a405-131ed7348c1d",
            "name": "Vector Store Retriever",
            "type": "@n8n/n8n-nodes-langchain.retrieverVectorStore",
            "position": [
                  -240,
                  680
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "0217056f-2b71-4308-adf1-19dcd4d2cc11",
            "name": "Pinecone Vector Store1",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "position": [
                  -280,
                  860
            ],
            "parameters": {
                  "options": {},
                  "pineconeIndex": {
                        "__rl": true,
                        "mode": "list",
                        "value": "telegram",
                        "cachedResultName": "telegram"
                  }
            },
            "credentials": {
                  "pineconeApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "693f9026-f47f-48dc-8e5d-e8b832a37235",
            "name": "Groq Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
            "position": [
                  -380,
                  660
            ],
            "parameters": {
                  "model": "llama-3.1-70b-versatile",
                  "options": {}
            },
            "credentials": {
                  "groqApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "c7acf014-138f-4be7-b569-c309bb10e50d",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  500,
                  73.04879287725316
            ],
            "parameters": {
                  "color": 7,
                  "width": 1139.5159692915001,
                  "height": 873.6068151028411,
                  "content": "# Load data into database\nFetch file from **Telegram**, split it into chunks and insert into **Pinecone** index, a message from **Telegram** will be sent just to let the user know that the process finished"
            },
            "typeVersion": 1
      },
      {
            "id": "dd3b9d8b-5771-4a09-8c1b-794cb8737d5d",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -878.769,
                  400
            ],
            "parameters": {
                  "color": 7,
                  "width": 1344.7918019808176,
                  "height": 806.8716167324012,
                  "content": "# Chat with Database\n\n1. **Receive** the incoming chat message.\n2. **Retrieve** relevant chunks from the _vector store_.\n3. **Pass** these chunks to the model.\n\nThe model will use the retrieved information to **formulate a precise response**.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "9aaf575a-5e40-407c-951c-10b1d16e5d3c",
            "name": "Check If is a document",
            "type": "n8n-nodes-base.if",
            "position": [
                  220,
                  240
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
                                    "id": "8839993b-9fe7-4e1e-a1cc-fe5de6b0bb62",
                                    "operator": {
                                          "type": "object",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.message.document }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "c1edb6bf-ba95-4a5f-9626-add673274086",
            "name": "Change to application/pdf",
            "type": "n8n-nodes-base.code",
            "position": [
                  700,
                  220
            ],
            "parameters": {
                  "jsCode": "// Função para modificar os metadados do arquivo binário\nfunction modifyBinaryMetadata(items) {\n for (const item of items) {\n if (item.binary && item.binary.data) {\n // Modifica o tipo MIME\n item.binary.data.mimeType = 'application/pdf';\n \n // Garante que o nome do arquivo termine com .pdf\n if (!item.binary.data.fileName.toLowerCase().endsWith('.pdf')) {\n item.binary.data.fileName += '.pdf';\n }\n \n // Atualiza o contentType no fileType (se existir)\n if (item.binary.data.fileType) {\n item.binary.data.fileType.contentType = 'application/pdf';\n }\n }\n }\n return items;\n}\n\n// Aplica a modificação e retorna os itens atualizados\nreturn modifyBinaryMetadata($input.all());"
            },
            "typeVersion": 2
      },
      {
            "id": "ea4d4e74-8954-47f0-a3a0-662d47ea2298",
            "name": "Telegram get File",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  520,
                  220
            ],
            "parameters": {
                  "fileId": "={{ $json.message.document.file_id }}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "cf548bee-d5d5-4f1a-a059-932ea163e155",
            "name": "Embeddings",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  -100,
                  1080
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e3bd4759-80cc-42bb-ba53-f9e88e9ba916",
            "name": "Telegram Response",
            "type": "n8n-nodes-base.telegram",
            "onError": "continueErrorOutput",
            "position": [
                  160,
                  560
            ],
            "parameters": {
                  "text": "={{ $json.response.text }}",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e478df48-9e6d-4a84-89be-beb569914ae3",
            "name": "Telegram Response about Database",
            "type": "n8n-nodes-base.telegram",
            "onError": "continueErrorOutput",
            "position": [
                  1400,
                  220
            ],
            "parameters": {
                  "text": "={{ $json.metadata.pdf.totalPages }} pages saved on Pinecone",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "5be7a321-1be6-4173-83de-3d569666718d",
            "name": "Stop and Error1",
            "type": "n8n-nodes-base.stopAndError",
            "position": [
                  1400,
                  580
            ],
            "parameters": {
                  "errorMessage": "An error occurred."
            },
            "typeVersion": 1
      },
      {
            "id": "aae26861-f34d-4b59-bd99-3662fbd6676c",
            "name": "Pinecone Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "position": [
                  880,
                  220
            ],
            "parameters": {
                  "mode": "insert",
                  "options": {},
                  "pineconeIndex": {
                        "__rl": true,
                        "mode": "list",
                        "value": "telegram",
                        "cachedResultName": "telegram"
                  }
            },
            "credentials": {
                  "pineconeApi": {
                        "id": "",
                        "name": ""
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "312fb807-4225-4630-ab32-aa12fe07c127",
            "name": "Limit to 1",
            "type": "n8n-nodes-base.limit",
            "position": [
                  1220,
                  220
            ],
            "parameters": {},
            "typeVersion": 1
      }
],
    connections: {
      "Embeddings": {
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
      "Limit to 1": {
            "main": [
                  [
                        {
                              "node": "Telegram Response about Database",
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
                              "node": "Question and Answer Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Trigger": {
            "main": [
                  [
                        {
                              "node": "Check If is a document",
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
                              "node": "Pinecone Vector Store",
                              "type": "ai_embedding",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Response": {
            "main": [
                  [],
                  [
                        {
                              "node": "Stop and Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram get File": {
            "main": [
                  [
                        {
                              "node": "Change to application/pdf",
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
                              "node": "Pinecone Vector Store",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pinecone Vector Store": {
            "main": [
                  [
                        {
                              "node": "Limit to 1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check If is a document": {
            "main": [
                  [
                        {
                              "node": "Telegram get File",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Question and Answer Chain",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pinecone Vector Store1": {
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
      "Change to application/pdf": {
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
      "Question and Answer Chain": {
            "main": [
                  [
                        {
                              "node": "Telegram Response",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Response about Database": {
            "main": [
                  [],
                  [
                        {
                              "node": "Stop and Error1",
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
      }
},
    settings: {
      "timezone": "America/Sao_Paulo",
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1",
      "saveManualExecutions": true
},
  },
  {
    name: "Play with Spotify from Telegram",
    nodes: [
      {
            "id": "0395b3e4-94ef-49ea-9b4c-8f908e62f8c6",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  -60,
                  20
            ],
            "webhookId": "e7aa284b-5eef-4ac1-94bf-8e4d307a3b14",
            "parameters": {
                  "updates": [
                        "message"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "gblW5oACGEPuccja",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "263edf45-58a0-45e8-91f8-601bc62c7d6f",
            "name": "OpenAI - Ask about a track",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  120,
                  -120
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
                                    "content": "=get artist and song name from '{{ $json.message.text }}'. Reply only eg. 'track:song name artist:artist name'"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "vDcge3EgslxfX3EC",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.6
      },
      {
            "id": "086aef8b-533a-4c33-9952-29d5adb152c8",
            "name": "Search track",
            "type": "n8n-nodes-base.spotify",
            "onError": "continueErrorOutput",
            "position": [
                  540,
                  -200
            ],
            "parameters": {
                  "limit": 1,
                  "query": "={{ $json.message.content }}",
                  "filters": {},
                  "resource": "track",
                  "operation": "search"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "wylKghFNQa8IKy1U",
                        "name": "Spotify account"
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": true
      },
      {
            "id": "08af6055-ba52-4cb2-a561-ea04ac55279f",
            "name": "Add song",
            "type": "n8n-nodes-base.spotify",
            "onError": "continueErrorOutput",
            "position": [
                  780,
                  -240
            ],
            "parameters": {
                  "id": "=spotify:track:{{ $json.id }}"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "wylKghFNQa8IKy1U",
                        "name": "Spotify account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "2dbdafa4-3b6f-4a14-813c-4e10da10abad",
            "name": "Next Song",
            "type": "n8n-nodes-base.spotify",
            "onError": "continueErrorOutput",
            "position": [
                  980,
                  -280
            ],
            "parameters": {
                  "operation": "nextSong"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "wylKghFNQa8IKy1U",
                        "name": "Spotify account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "cb8d42aa-0c7e-45a5-90b5-b91e483dd13a",
            "name": "Resume play",
            "type": "n8n-nodes-base.spotify",
            "notes": "We don't have to stop here on error. An error is thrown from Spotify if the player is already playing.",
            "onError": "continueRegularOutput",
            "position": [
                  1240,
                  -380
            ],
            "parameters": {
                  "operation": "resume"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "wylKghFNQa8IKy1U",
                        "name": "Spotify account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "089e1070-b013-454c-9f6c-55b909e06c1d",
            "name": "Currently Playing",
            "type": "n8n-nodes-base.spotify",
            "onError": "continueErrorOutput",
            "position": [
                  1420,
                  -300
            ],
            "parameters": {
                  "operation": "currentlyPlaying"
            },
            "credentials": {
                  "spotifyOAuth2Api": {
                        "id": "wylKghFNQa8IKy1U",
                        "name": "Spotify account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "e9df0dcf-b166-45a3-910b-787b3718bbcf",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  120,
                  -300
            ],
            "parameters": {
                  "color": 5,
                  "width": 254.05813953488382,
                  "content": "## Telegram to Spotify \nAsk AI about a track with artist and song name or if you can't remember describe it and AI does it's thing.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "77bae9be-2d92-4028-ae78-7887b6a2d394",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  440,
                  220
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineAll"
            },
            "typeVersion": 3
      },
      {
            "id": "0d95000d-7efd-402a-9a34-47ababb2f53e",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  620,
                  -440
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
                                    "id": "02af5387-07d2-4a16-bd83-e1359d091165",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEmpty",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json?.id }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "363f89ad-34d0-4445-8ff3-693d991dad09",
            "name": "Message parser",
            "type": "n8n-nodes-base.set",
            "position": [
                  1280,
                  -40
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "93cd2545-c6e9-4717-96b7-d49eb056ac70",
                                    "name": "message",
                                    "type": "string",
                                    "value": "={{ $json.error }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "8b80f80d-8c8e-44de-9838-6d05199bb734",
            "name": "Not found error message",
            "type": "n8n-nodes-base.set",
            "position": [
                  880,
                  -460
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "{\n \"error\": \"Song not found\"\n}\n"
            },
            "typeVersion": 3.4
      },
      {
            "id": "f1785140-8e97-43e1-9d84-aedc8b8d5e06",
            "name": "Return message to Telegram",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  760,
                  220
            ],
            "parameters": {
                  "text": "={{ $('Message parser').item.json.message }}",
                  "chatId": "={{ $json.message.chat.id }}",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "gblW5oACGEPuccja",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e3e16535-094b-41bf-88c6-166bb6805d53",
            "name": "Define Now Playing",
            "type": "n8n-nodes-base.set",
            "notes": "We use the object \"error\" as a returned bject so we can re-use the Message Parser node.",
            "position": [
                  1660,
                  -240
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={\n \"error\": \"Now playing {{ $json.item.name }} - {{ $json.item.artists[0].name }} - {{ $json.item.album.name }}\"\n}\n"
            },
            "typeVersion": 3.4
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Add song",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Not found error message",
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
                              "node": "Return message to Telegram",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Add song": {
            "main": [
                  [
                        {
                              "node": "Next Song",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Message parser",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Next Song": {
            "main": [
                  [
                        {
                              "node": "Resume play",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Message parser",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Resume play": {
            "main": [
                  [
                        {
                              "node": "Currently Playing",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  []
            ]
      },
      "Search track": {
            "main": [
                  [
                        {
                              "node": "If",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Message parser",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Message parser": {
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
      "Telegram Trigger": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Ask about a track",
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
      "Currently Playing": {
            "main": [
                  [
                        {
                              "node": "Define Now Playing",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Message parser",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Define Now Playing": {
            "main": [
                  [
                        {
                              "node": "Message parser",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Not found error message": {
            "main": [
                  [
                        {
                              "node": "Message parser",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Ask about a track": {
            "main": [
                  [
                        {
                              "node": "Search track",
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
    name: "Translate Telegram audio messages with AI (55 supported languages) v1",
    nodes: [
      {
            "id": "f91fa0cf-ea01-4fc0-9ef2-754da399b7fb",
            "name": "Telegram Trigger",
            "type": "n8n-nodes-base.telegramTrigger",
            "position": [
                  440,
                  220
            ],
            "webhookId": "c537cfcc-6c4a-436a-8871-d32f8ce016cb",
            "parameters": {
                  "updates": [
                        "*"
                  ],
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "057ae05f-2c7d-48c5-a057-a6917a88971c",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1240,
                  0
            ],
            "parameters": {
                  "width": 556.5162909529794,
                  "height": 586.6978417266175,
                  "content": "## Translation\n\n- Converts from speech to text.\n\n- Translates the language from the native language to translated language (as specified in settings node)\n\n"
            },
            "typeVersion": 1
      },
      {
            "id": "c6947668-118e-4e23-bc55-1cdbce554a20",
            "name": "Text reply",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2240,
                  220
            ],
            "parameters": {
                  "text": "={{ $json.text }}",
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "Markdown"
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "93551aea-0213-420d-bf82-7669ab291dae",
            "name": "Telegram1",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1060,
                  220
            ],
            "parameters": {
                  "fileId": "={{ $('Telegram Trigger').item.json.message.voice.file_id }}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "972177e4-b0a4-424f-9ca6-6555ff3271d7",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1520,
                  400
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "fOF5kro9BJ6KMQ7n",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0e8f610f-03a7-4943-bd19-b3fb10c89519",
            "name": "Input Error Handling",
            "type": "n8n-nodes-base.set",
            "position": [
                  860,
                  220
            ],
            "parameters": {
                  "fields": {
                        "values": [
                              {
                                    "name": "message.text",
                                    "stringValue": "={{ $json?.message?.text || \"\" }}"
                              }
                        ]
                  },
                  "options": {}
            },
            "typeVersion": 3.2
      },
      {
            "id": "c8ab9e01-c9b5-4647-8008-9157ed97c4c3",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1920,
                  0
            ],
            "parameters": {
                  "width": 585.8688089385912,
                  "height": 583.7625899280566,
                  "content": "## Telegram output\n\n- Provide the output in both text as well as speech. \n\n- Many languages are supported including English,French, German, Spanish, Chinese, Japanese.\n\nFull list here:\nhttps://platform.openai.com/docs/guides/speech-to-text/supported-languages\n"
            },
            "typeVersion": 1
      },
      {
            "id": "0898dc4d-c3ad-43df-871f-1896f673f631",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -140,
                  0
            ],
            "parameters": {
                  "color": 4,
                  "width": 489.00549958607303,
                  "height": 573.4892086330929,
                  "content": "## Multi-lingual AI Powered Universal Translator with Speech ⭐\n\n### Key capabilities\nThis flow enables a Telegram bot that can \n- accept speech in one of 55 languages \n- translates to another language and returns result in speech\n\n### Use case:\n- Learning a new language\n- Communicate with others while traveling to another country\n\n### Setup\n- Open the Settings node and specify the languages you would like to work with"
            },
            "typeVersion": 1
      },
      {
            "id": "ae0595d2-7e40-4c1e-a643-4b232220d19a",
            "name": "Settings",
            "type": "n8n-nodes-base.set",
            "position": [
                  660,
                  220
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "501ac5cc-73e8-4e9c-bf91-df312aa9ff88",
                                    "name": "language_native",
                                    "type": "string",
                                    "value": "english"
                              },
                              {
                                    "id": "efb9a7b2-5baa-44cc-b94d-c8030f17e890",
                                    "name": "language_translate",
                                    "type": "string",
                                    "value": "french"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "2d3654cf-a182-4916-a50c-a501828c2f6e",
            "name": "Auto-detect and translate",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1500,
                  220
            ],
            "parameters": {
                  "text": "=Detect the language of the text that follows. \n- If it is {{ $('Settings').item.json.language_native }} translate to {{ $('Settings').item.json.language_translate }}. \n- If it is in {{ $('Settings').item.json.language_translate }} translate to {{ $('Settings').item.json.language_native }} . \n- In the output just provide the translation and do not explain it. Just provide the translation without anything else.\n\nText:\n {{ $json.text }}\n",
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "a6e63516-4967-4e81-ba5b-58ad0ab21ee3",
            "name": "Audio reply",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  2240,
                  400
            ],
            "parameters": {
                  "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
                  "operation": "sendAudio",
                  "binaryData": true,
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "Ov00cT0t4h4AFtZ0",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e4782117-03de-41d2-9208-390edc87fc08",
            "name": "OpenAI2",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1300,
                  220
            ],
            "parameters": {
                  "options": {},
                  "resource": "audio",
                  "operation": "transcribe"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "fOF5kro9BJ6KMQ7n",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      },
      {
            "id": "b29355f5-122c-4557-8215-28fdb523d221",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2020,
                  400
            ],
            "parameters": {
                  "input": "={{ $json.text }}",
                  "options": {},
                  "resource": "audio"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "fOF5kro9BJ6KMQ7n",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.3
      }
],
    connections: {
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Audio reply",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI2": {
            "main": [
                  [
                        {
                              "node": "Auto-detect and translate",
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
                              "node": "Input Error Handling",
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
                              "node": "OpenAI2",
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
                              "node": "Settings",
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
                              "node": "Auto-detect and translate",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Input Error Handling": {
            "main": [
                  [
                        {
                              "node": "Telegram1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Auto-detect and translate": {
            "main": [
                  [
                        {
                              "node": "Text reply",
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
      }
},
    settings: {
      "executionOrder": "v1"
},
  },
  {
    name: "🐋🤖 DeepSeek AI Agent + Telegram + LONG TERM Memory 🧠",
    nodes: [
      {
            "id": "23b50c07-39a8-4166-ab13-9683b3ee25e6",
            "name": "Check User & Chat ID",
            "type": "n8n-nodes-base.if",
            "position": [
                  -80,
                  160
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
                                    "id": "5fe3c0d8-bd61-4943-b152-9e6315134520",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Listen for Telegram Events').item.json.body.message.from.first_name }}",
                                    "rightValue": "={{ $json.first_name }}"
                              },
                              {
                                    "id": "98a0ea91-0567-459c-bbce-06abc14a49ce",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Listen for Telegram Events').item.json.body.message.from.last_name }}",
                                    "rightValue": "={{ $json.last_name }}"
                              },
                              {
                                    "id": "18a96c1f-f2a0-4a2a-b789-606763df4423",
                                    "operator": {
                                          "type": "number",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Listen for Telegram Events').item.json.body.message.from.id }}",
                                    "rightValue": "={{ $json.id }}"
                              }
                        ]
                  },
                  "looseTypeValidation": "="
            },
            "typeVersion": 2.2
      },
      {
            "id": "ecbc13fe-305d-4cdd-b35c-3e119e8e8b5d",
            "name": "Error message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  160,
                  440
            ],
            "parameters": {
                  "text": "=Unable to process your message.",
                  "chatId": "={{ $json.body.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "be722bc7-0b22-4892-967c-fdd398a7b129",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -540,
                  -20
            ],
            "parameters": {
                  "color": 6,
                  "width": 949,
                  "height": 652,
                  "content": "# Receive Telegram Message with Webhook"
            },
            "typeVersion": 1
      },
      {
            "id": "a3866585-bfee-4025-a8f4-f06fde16171a",
            "name": "Listen for Telegram Events",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -480,
                  160
            ],
            "webhookId": "097f36f3-1574-44f9-815f-58387e3b20bf",
            "parameters": {
                  "path": "wbot",
                  "options": {
                        "binaryPropertyName": "data"
                  },
                  "httpMethod": "POST"
            },
            "typeVersion": 2
      },
      {
            "id": "f70571d5-3680-4616-90fa-3358b0883368",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1380,
                  -20
            ],
            "parameters": {
                  "color": 7,
                  "width": 800,
                  "height": 860,
                  "content": "# How to set up a Telegram Bot WebHook\n\n## WebHook Setup Process\n\n**Basic Concept**\nA WebHook allows your Telegram bot to automatically receive updates instead of manually polling the Bot API.\n\n**Setup Method**\nTo set a WebHook, make a GET request using this URL format:\n```\nhttps://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}\n```\nWhere:\n- `my_bot_token`: Your bot token from BotFather\n- `url_to_send_updates_to`: Your HTTPS endpoint that handles bot updates\n\n\n**Verification**\nTo verify the WebHook setup, use:\n```\nhttps://api.telegram.org/bot{my_bot_token}/getWebhookInfo\n```\n\nA successful response looks like:\n```json\n{\n \"ok\": true,\n \"result\": {\n \"url\": \"https://www.example.com/my-telegram-bot/\",\n \"has_custom_certificate\": false,\n \"pending_update_count\": 0,\n \"max_connections\": 40\n }\n}\n```\n\n\nThis method provides a simple and efficient way to handle Telegram bot updates automatically through webhooks rather than manual polling."
            },
            "typeVersion": 1
      },
      {
            "id": "2b6149d5-ffd6-46ef-9840-149508251a77",
            "name": "Validation",
            "type": "n8n-nodes-base.set",
            "position": [
                  -260,
                  160
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "0cea6da1-652a-4c1e-94c3-30608ced90f8",
                                    "name": "first_name",
                                    "type": "string",
                                    "value": "FirstName"
                              },
                              {
                                    "id": "b90280c6-3e36-49ca-9e7e-e15c42d256cc",
                                    "name": "last_name",
                                    "type": "string",
                                    "value": "LastName"
                              },
                              {
                                    "id": "f6d86283-16ca-447e-8427-7d3d190babc0",
                                    "name": "id",
                                    "type": "number",
                                    "value": 12345667891
                              }
                        ]
                  },
                  "includeOtherFields": true
            },
            "typeVersion": 3.4
      },
      {
            "id": "41c965ea-b67d-4d6b-82e4-0e57f5fc13bb",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -320,
                  100
            ],
            "parameters": {
                  "color": 7,
                  "width": 420,
                  "height": 260,
                  "content": "## Validate Telegram User\n"
            },
            "typeVersion": 1
      },
      {
            "id": "164f5e91-1958-4dc5-b38c-db1cec0579d4",
            "name": "Message Router",
            "type": "n8n-nodes-base.switch",
            "position": [
                  160,
                  160
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "audio",
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
                                                            "type": "object",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.body.message.voice }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "text",
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
                                                      "id": "342f0883-d959-44a2-b80d-379e39c76218",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.body.message.text }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "image",
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
                                                      "id": "ded3a600-f861-413a-8892-3fc5ea935ecb",
                                                      "operator": {
                                                            "type": "array",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.body.message.photo }}",
                                                      "rightValue": ""
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
            "typeVersion": 3.2
      },
      {
            "id": "7947173d-39fa-4d4b-9b1e-60de809a9950",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "onError": "continueErrorOutput",
            "position": [
                  860,
                  340
            ],
            "parameters": {
                  "text": "={{ $('Message Router').item.json.body.message.text }}",
                  "options": {
                        "systemMessage": "=## ROLE \nYou are a friendly, attentive, and helpful AI assistant. Your primary goal is to assist the user while maintaining a personalized and engaging interaction. The current user's first name is **{{ $json.body.message.from.first_name }}**.\n\n---\n\n## RULES \n\n1. **Memory Management**: \n - When the user sends a new message, evaluate whether it contains noteworthy or personal information (e.g., preferences, habits, goals, or important events). \n - If such information is identified, use the **Save Memory** tool to store this data in memory. \n - Always send a meaningful response back to the user, even if your primary action was saving information. This response should not reveal that information was stored but should acknowledge or engage with the user’s input naturally.\n\n2. **Context Awareness**: \n - Use stored memories to provide contextually relevant and personalized responses. \n - Always consider the **date and time** when a memory was collected to ensure your responses are up-to-date and accurate.\n\n3. **User-Centric Responses**: \n - Tailor your responses based on the user's preferences and past interactions. \n - Be proactive in recalling relevant details from memory when appropriate but avoid overwhelming the user with unnecessary information.\n\n4. **Privacy and Sensitivity**: \n - Handle all user data with care and sensitivity. Avoid making assumptions or sharing stored information unless it directly enhances the conversation or task at hand.\n\n5. **Fallback Responses**: \n - **IMPORTANT** If no specific task or question arises from the user’s message (e.g., when only saving information), respond in a way that keeps the conversation flowing naturally. For example:\n - Acknowledge their input: “Thanks for sharing that!” \n - Provide a friendly follow-up: “Is there anything else I can help you with today?”\n - DO NOT tell Jokes as a fall back response.\n\n---\n\n## TOOLS \n\n### Save Memory \n- Use this tool to store summarized, concise, and meaningful information about the user. \n- Extract key details from user messages that could enhance future interactions (e.g., likes/dislikes, important dates, hobbies). \n- Ensure that the summary is clear and devoid of unnecessary details.\n\n---\n\n## MEMORIES \n\n### Recent Noteworthy Memories \nHere are the most recent memories collected from the user, including their date and time of collection: \n\n**{{ $('Retrieve Long Term Memories').item.json.content }}**\n\n### Guidelines for Using Memories: \n- Prioritize recent memories but do not disregard older ones if they remain relevant. \n- Cross-reference memories to maintain consistency in your responses. For example, if a user shares conflicting preferences over time, clarify or adapt accordingly.\n\n---\n\n## ADDITIONAL INSTRUCTIONS \n\n- Think critically before responding to ensure your answers are thoughtful and accurate. \n- Strive to build trust with the user by being consistent, reliable, and personable in your interactions. \n- Avoid robotic or overly formal language; aim for a conversational tone that aligns with being \"friendly and helpful.\" \n"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7,
            "alwaysOutputData": true
      },
      {
            "id": "6111c771-d8af-4586-8829-213d86dc4f47",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  860,
                  100
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineAll"
            },
            "typeVersion": 3
      },
      {
            "id": "94a01b4f-549d-4e49-88e0-143c90dd200e",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  920,
                  780
            ],
            "parameters": {
                  "sessionKey": "={{ $json.id }}",
                  "sessionIdType": "customKey",
                  "contextWindowLength": 50
            },
            "typeVersion": 1.3
      },
      {
            "id": "d1182e11-025e-4885-abb1-b76a9b617b84",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "disabled": true,
            "position": [
                  -480,
                  420
            ],
            "webhookId": "701ddc24-2637-466e-9789-5d47145333a8",
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "97d4cdcd-b016-44aa-882c-eb2ec38968eb",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  440,
                  -20
            ],
            "parameters": {
                  "color": 5,
                  "width": 1033,
                  "height": 1029,
                  "content": "# Process Text Message"
            },
            "typeVersion": 1
      },
      {
            "id": "73156ecc-af5f-4e3d-82c6-4668db52b511",
            "name": "Telegram Response",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1240,
                  160
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "5f342299-40fe-44cf-9b58-8a9d3bfac1df",
            "name": "Save Long Term Memories",
            "type": "n8n-nodes-base.googleDocsTool",
            "position": [
                  1260,
                  780
            ],
            "parameters": {
                  "actionsUi": {
                        "actionFields": [
                              {
                                    "text": "= Memory: {{ $fromAI('memory') }} - Date: {{ $now }} ",
                                    "action": "insert"
                              }
                        ]
                  },
                  "operation": "update",
                  "documentURL": "[Google Doc ID]",
                  "descriptionType": "manual",
                  "toolDescription": "Save memories"
            },
            "credentials": {
                  "googleDocsOAuth2Api": {
                        "id": "YWEHuG28zOt532MQ",
                        "name": "Google Docs account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "aba001a8-68f9-4870-9cd0-60a4c59ecd5b",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  220
            ],
            "parameters": {
                  "color": 4,
                  "width": 300,
                  "height": 340,
                  "content": "## Retrieve Long Term Memories\nGoogle Docs"
            },
            "typeVersion": 1
      },
      {
            "id": "e5ec71ec-9527-4ccd-87c3-3aa2f09192e8",
            "name": "Retrieve Long Term Memories",
            "type": "n8n-nodes-base.googleDocs",
            "position": [
                  560,
                  360
            ],
            "parameters": {
                  "operation": "get",
                  "documentURL": "[Google Doc ID]"
            },
            "credentials": {
                  "googleDocsOAuth2Api": {
                        "id": "YWEHuG28zOt532MQ",
                        "name": "Google Docs account"
                  }
            },
            "typeVersion": 2,
            "alwaysOutputData": true
      },
      {
            "id": "4764383a-3c4b-4e64-b391-5dc9fb4b9de6",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  820,
                  660
            ],
            "parameters": {
                  "width": 280,
                  "height": 320,
                  "content": "## Save To Current Chat Memory (Optional)"
            },
            "typeVersion": 1
      },
      {
            "id": "e11995b8-e061-4b40-b4b6-9ec03c7e5a06",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1160,
                  660
            ],
            "parameters": {
                  "color": 4,
                  "width": 280,
                  "height": 320,
                  "content": "## Save Long Term Memories\nGoogle Docs"
            },
            "typeVersion": 1
      },
      {
            "id": "1b53aef2-ca99-409b-bd10-3fc1fd87f540",
            "name": "Response Error message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1240,
                  360
            ],
            "parameters": {
                  "text": "=Unable to process your message.",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "e5d79084-d7f1-44fd-a1db-73cc76a148ec",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -60,
                  660
            ],
            "parameters": {
                  "color": 7,
                  "width": 820,
                  "height": 600,
                  "content": "# DeepSeek API Call\n\nThe DeepSeek API uses an API format compatible with OpenAI. By modifying the configuration, you can use the OpenAI SDK or softwares compatible with the OpenAI API to access the DeepSeek API.\n\nhttps://api-docs.deepseek.com/\n\n## Configuration Parameters\n\n| Parameter | Value |\n|-----------|--------|\n| base_url | https://api.deepseek.com |\n| api_key | https://platform.deepseek.com/api_keys |\n\n\n\n## Important Notes\n\n- To be compatible with OpenAI, you can also use `https://api.deepseek.com/v1` as the base_url. Note that the v1 here has NO relationship with the model's version.\n\n- The deepseek-chat model has been upgraded to DeepSeek-V3. The API remains unchanged. You can invoke DeepSeek-V3 by specifying `model='deepseek-chat'`.\n\n- deepseek-reasoner is the latest reasoning model, DeepSeek-R1, released by DeepSeek. You can invoke DeepSeek-R1 by specifying `model='deepseek-reasoner'`."
            },
            "typeVersion": 1
      },
      {
            "id": "af14e803-44a5-4b0e-a675-b1e860bf6d29",
            "name": "DeepSeek-R1 Reasoning",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  440,
                  880
            ],
            "parameters": {
                  "model": "=deepseek-reasoner",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "MSl7SdcvZe0SqCYI",
                        "name": "deepseek"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "e8be6a32-ba4c-4895-b34b-c5e7d0ded5e8",
            "name": "DeepSeek-V3 Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  600,
                  880
            ],
            "parameters": {
                  "model": "=deepseek-chat",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "MSl7SdcvZe0SqCYI",
                        "name": "deepseek"
                  }
            },
            "typeVersion": 1.1
      }
],
    connections: {
      "Merge": {
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
                              "node": "Telegram Response",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Response Error message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Validation": {
            "main": [
                  [
                        {
                              "node": "Check User & Chat ID",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Message Router": {
            "main": [
                  [],
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Retrieve Long Term Memories",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [],
                  [
                        {
                              "node": "Error message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "DeepSeek-V3 Chat": {
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
      "Check User & Chat ID": {
            "main": [
                  [
                        {
                              "node": "Message Router",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Error message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Window Buffer Memory": {
            "ai_memory": [
                  []
            ]
      },
      "Save Long Term Memories": {
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
      "Listen for Telegram Events": {
            "main": [
                  [
                        {
                              "node": "Validation",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "When chat message received": {
            "main": [
                  []
            ]
      },
      "Retrieve Long Term Memories": {
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
    settings: {
      "timezone": "America/Vancouver",
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1"
},
  },
  {
    name: "🤖 Telegram Messaging Agent for Text/Audio/Images",
    nodes: [
      {
            "id": "1656be7a-7a27-47f3-b511-3634a65a97a2",
            "name": "Check User & Chat ID",
            "type": "n8n-nodes-base.if",
            "position": [
                  100,
                  160
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
                                    "id": "5fe3c0d8-bd61-4943-b152-9e6315134520",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Listen for Telegram Events').item.json.body.message.from.first_name }}",
                                    "rightValue": "={{ $json.first_name }}"
                              },
                              {
                                    "id": "98a0ea91-0567-459c-bbce-06abc14a49ce",
                                    "operator": {
                                          "name": "filter.operator.equals",
                                          "type": "string",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Listen for Telegram Events').item.json.body.message.from.last_name }}",
                                    "rightValue": "={{ $json.last_name }}"
                              },
                              {
                                    "id": "18a96c1f-f2a0-4a2a-b789-606763df4423",
                                    "operator": {
                                          "type": "number",
                                          "operation": "equals"
                                    },
                                    "leftValue": "={{ $('Listen for Telegram Events').item.json.body.message.from.id }}",
                                    "rightValue": "={{ $json.id }}"
                              }
                        ]
                  },
                  "looseTypeValidation": "="
            },
            "typeVersion": 2.2
      },
      {
            "id": "73b0fedb-eb82-4464-a08f-397a3fe69480",
            "name": "Error message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  320,
                  440
            ],
            "parameters": {
                  "text": "=Unable to process your message.",
                  "chatId": "={{ $json.body.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a3dc143b-cf3c-4416-bf43-0ca75cbde6c9",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -380,
                  -20
            ],
            "parameters": {
                  "width": 929,
                  "height": 652,
                  "content": "# Receive Telegram Message with Webhook"
            },
            "typeVersion": 1
      },
      {
            "id": "c80dae1e-dd20-4632-a00c-9c6290540f22",
            "name": "Listen for Telegram Events",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -320,
                  160
            ],
            "webhookId": "b4ed4c80-a655-4ff2-87d6-febd5280d343",
            "parameters": {
                  "path": "your-endpoint",
                  "options": {
                        "binaryPropertyName": "data"
                  },
                  "httpMethod": "POST"
            },
            "typeVersion": 2
      },
      {
            "id": "6010dacf-1ed6-413c-adf9-146397e16b09",
            "name": "Set Webhook Test URL",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  260,
                  -260
            ],
            "parameters": {
                  "url": "=https://api.telegram.org/{{ $json.token }}/setWebhook",
                  "options": {},
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "url",
                                    "value": "={{ $json.test_url }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "65f8d945-12bb-4ae3-bd83-3b892a36afb9",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -380,
                  -580
            ],
            "parameters": {
                  "color": 3,
                  "width": 1638,
                  "height": 532,
                  "content": "# Telegram Webhook Tools\n\n## Setting your Telegram Bot WebHook the Easy Way\n"
            },
            "typeVersion": 1
      },
      {
            "id": "8e3268e9-dc7c-4edd-b5e8-716de5d2ffb3",
            "name": "Get Telegram Webhook Info",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  -240,
                  -260
            ],
            "parameters": {
                  "url": "=https://api.telegram.org/{{ $json.token }}/getWebhookInfo",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "e31e176f-2ebd-4cd1-a160-2cc5f254ca6d",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  -20
            ],
            "parameters": {
                  "color": 4,
                  "width": 1113,
                  "height": 429,
                  "content": "# Process Audio"
            },
            "typeVersion": 1
      },
      {
            "id": "b8b10cd9-7a41-4b21-853c-b2123918ab8d",
            "name": "Image Schema",
            "type": "n8n-nodes-base.set",
            "position": [
                  660,
                  1060
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "17989eb0-feca-4631-b5c8-34b1d4a6c72b",
                                    "name": "image_file_id",
                                    "type": "string",
                                    "value": "={{ $json.body.message.photo.last().file_id }}"
                              },
                              {
                                    "id": "9317d7ae-dffd-4b1f-9a9c-b3cc4f1e0dd3",
                                    "name": "caption",
                                    "type": "string",
                                    "value": "={{ $json.body.message.caption }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "9a7b9e4c-7a81-451a-887a-b7b3f658ae6e",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  900
            ],
            "parameters": {
                  "color": 6,
                  "width": 1289,
                  "height": 432,
                  "content": "# Process Image"
            },
            "typeVersion": 1
      },
      {
            "id": "800da6c7-8d03-4932-a081-f35ce01c8dd7",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1200,
                  -580
            ],
            "parameters": {
                  "color": 7,
                  "width": 800,
                  "height": 860,
                  "content": "# How to set up a Telegram Bot WebHook\n\n## WebHook Setup Process\n\n**Basic Concept**\nA WebHook allows your Telegram bot to automatically receive updates instead of manually polling the Bot API.\n\n**Setup Method**\nTo set a WebHook, make a GET request using this URL format:\n```\nhttps://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}\n```\nWhere:\n- `my_bot_token`: Your bot token from BotFather\n- `url_to_send_updates_to`: Your HTTPS endpoint that handles bot updates\n\n\n**Verification**\nTo verify the WebHook setup, use:\n```\nhttps://api.telegram.org/bot{my_bot_token}/getWebhookInfo\n```\n\nA successful response looks like:\n```json\n{\n \"ok\": true,\n \"result\": {\n \"url\": \"https://www.example.com/my-telegram-bot/\",\n \"has_custom_certificate\": false,\n \"pending_update_count\": 0,\n \"max_connections\": 40\n }\n}\n```\n\n\nThis method provides a simple and efficient way to handle Telegram bot updates automatically through webhooks rather than manual polling."
            },
            "typeVersion": 1
      },
      {
            "id": "cd09daf9-ac74-4e86-9d74-875d78f466f0",
            "name": "gpt-4o-mini",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1080,
                  260
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jEMSvKmtYfzAkhe6",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4c69533c-e4e7-4667-baf8-7ca1ed36b150",
            "name": "Get Audio File",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  660,
                  100
            ],
            "parameters": {
                  "fileId": "={{ $json.body.message.voice.file_id }}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "0b15b158-88ec-45ba-ae70-fd55a9a72ea3",
            "name": "Get Image",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  860,
                  1060
            ],
            "parameters": {
                  "fileId": "={{ $json.image_file_id }}",
                  "resource": "file"
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "081ec871-6cac-4945-9c1b-97bb87489688",
            "name": "Analyze Image",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1460,
                  1060
            ],
            "parameters": {
                  "modelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini",
                        "cachedResultName": "GPT-4O-MINI"
                  },
                  "options": {},
                  "resource": "image",
                  "inputType": "base64",
                  "operation": "analyze"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jEMSvKmtYfzAkhe6",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.6
      },
      {
            "id": "072c21fc-d125-4078-b151-9c2fd5a4802c",
            "name": "Transcribe Recording",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  860,
                  100
            ],
            "parameters": {
                  "options": {},
                  "resource": "audio",
                  "operation": "transcribe",
                  "binaryPropertyName": "=data"
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jEMSvKmtYfzAkhe6",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.6
      },
      {
            "id": "b74e2181-8bf2-43a5-b4d4-d24112989b81",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  440
            ],
            "parameters": {
                  "color": 5,
                  "width": 1113,
                  "height": 429,
                  "content": "# Process Text"
            },
            "typeVersion": 1
      },
      {
            "id": "8f44b159-07ff-4805-82ad-d8aeed1f9f68",
            "name": "gpt-4o-mini1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1080,
                  720
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jEMSvKmtYfzAkhe6",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "666ed1b9-475e-44bf-a884-1ddf58c6c6af",
            "name": "Test Webhook Status",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  460,
                  -260
            ],
            "parameters": {
                  "text": "={{ $json.description }} for Testing",
                  "chatId": "=1234567891",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "2a1174a2-2eae-4cf5-ba48-a58a479956bf",
            "name": "Production Webhook Status",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  980,
                  -260
            ],
            "parameters": {
                  "text": "={{ $json.description }} for Production",
                  "chatId": "=1234567891",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "210b6df9-e799-409f-b78f-953bffbb37db",
            "name": "Set Webhook Production URL",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  780,
                  -260
            ],
            "parameters": {
                  "url": "=https://api.telegram.org/{{ $json.token }}/setWebhook",
                  "options": {},
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "url",
                                    "value": "={{ $json.production_url }}"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "5dc6642c-3557-47bb-b012-b353a0d10ca0",
            "name": "Edit Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  860,
                  560
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b37b48ba-8fef-4e6c-bbca-73e6c2e1e0a8",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $json.body.message.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "cd715b79-765e-4605-84d6-963d9889c922",
            "name": "Audio Task Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1460,
                  40
            ],
            "parameters": {
                  "text": "=Task message: <i>{{ $json.text }}</i>",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "9845b3e6-8c0f-4194-8442-5648147f905e",
            "name": "Audio Other Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1460,
                  220
            ],
            "parameters": {
                  "text": "=Other message: <i>{{ $json.text }}</i>",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "0184b872-27a1-48dd-8e37-4fdaae7241cd",
            "name": "Text Task Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1460,
                  500
            ],
            "parameters": {
                  "text": "=Task message: <i>{{ $json.text }}</i>",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "7d90fb9b-b2b5-48eb-a6f2-7f953fe6ee52",
            "name": "Text Other Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1460,
                  680
            ],
            "parameters": {
                  "text": "=Other message: <i>{{ $json.text }}</i>",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "c9b9f6d2-c4c4-44b9-a929-9bc0552e8e45",
            "name": "Image Message",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1660,
                  1060
            ],
            "parameters": {
                  "text": "={{ $json.content }}",
                  "chatId": "={{ $('Listen for Telegram Events').item.json.body.message.chat.id }}",
                  "additionalFields": {
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "bfc69b30-4bab-459d-bbe1-42e540275582",
            "name": "Convert to Image File",
            "type": "n8n-nodes-base.convertToFile",
            "position": [
                  1260,
                  1060
            ],
            "parameters": {
                  "options": {
                        "fileName": "={{ $json.result.file_path }}"
                  },
                  "operation": "toBinary",
                  "sourceProperty": "data"
            },
            "typeVersion": 1.1
      },
      {
            "id": "f78d54c3-aa00-4e82-bfb1-f3131182940c",
            "name": "Extract from File to Base64",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  1060,
                  1060
            ],
            "parameters": {
                  "options": {},
                  "operation": "binaryToPropery"
            },
            "typeVersion": 1
      },
      {
            "id": "735bb735-6b24-4bbd-8d3f-aec6cd383383",
            "name": "Text Classifier Audio",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  1060,
                  100
            ],
            "parameters": {
                  "options": {},
                  "inputText": "={{ $json.text }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "task",
                                    "description": "If the message is about about creating a task/todo"
                              },
                              {
                                    "category": "other",
                                    "description": "If the message is not about creating a task/todo "
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "be7f49da-f88e-4803-95ef-fb7e2ff2d2ed",
            "name": "Text Classifier",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  1060,
                  560
            ],
            "parameters": {
                  "options": {},
                  "inputText": "={{ $json.text }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "task",
                                    "description": "If the message is about about creating a task/todo"
                              },
                              {
                                    "category": "other",
                                    "description": "If the message is not about creating a task/todo "
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "33eab7d8-5b90-4533-8799-fb4ae32fc6c5",
            "name": "Telegram Token & Webhooks",
            "type": "n8n-nodes-base.set",
            "position": [
                  380,
                  -540
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "87811892-85f5-4578-a149-3edd94d3815a",
                                    "name": "token",
                                    "type": "string",
                                    "value": "bot[your-telegram-bot-token]"
                              },
                              {
                                    "id": "d2b9ab83-44ad-4741-aac9-1feed974c015",
                                    "name": "test_url",
                                    "type": "string",
                                    "value": "https://[your-url]/webhook-test/[your-endpoint]"
                              },
                              {
                                    "id": "0c671fbf-aa2c-42ef-9e8b-398ac38358d0",
                                    "name": "production_url",
                                    "type": "string",
                                    "value": "https://[your-url]/webhook/[your-endpoint]"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "65d9568e-0504-4c7d-ac05-0b7b4c52a6b2",
            "name": "Get Webhook Status",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  -40,
                  -260
            ],
            "parameters": {
                  "text": "={{ JSON.stringify($json.result, null, 2) }}",
                  "chatId": "=1234567891",
                  "additionalFields": {}
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "04669db1-3a74-4404-9b5f-9b8554b1059e",
            "name": "Validation",
            "type": "n8n-nodes-base.set",
            "position": [
                  -100,
                  160
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "0cea6da1-652a-4c1e-94c3-30608ced90f8",
                                    "name": "first_name",
                                    "type": "string",
                                    "value": "First Name"
                              },
                              {
                                    "id": "b90280c6-3e36-49ca-9e7e-e15c42d256cc",
                                    "name": "last_name",
                                    "type": "string",
                                    "value": "Last Name"
                              },
                              {
                                    "id": "f6d86283-16ca-447e-8427-7d3d190babc0",
                                    "name": "id",
                                    "type": "number",
                                    "value": 12345678999
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "7f9935cb-4ca6-40cf-99c5-96c5a1f4ca91",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -160,
                  100
            ],
            "parameters": {
                  "color": 7,
                  "width": 420,
                  "height": 260,
                  "content": "## Validate Telegram User\n"
            },
            "typeVersion": 1
      },
      {
            "id": "fa6c87eb-5f96-4e26-a1bb-60dae902186c",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -320,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 240,
                  "content": "## Webhook Status"
            },
            "typeVersion": 1
      },
      {
            "id": "96536ad2-e607-448e-a368-e4e8c7578b57",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 240,
                  "content": "## Set Webhook for Testing"
            },
            "typeVersion": 1
      },
      {
            "id": "a58c16d5-0c08-4ee6-a3fe-b9fdbd62eb8b",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  720,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 480,
                  "height": 240,
                  "content": "## Set Webhook for Production"
            },
            "typeVersion": 1
      },
      {
            "id": "158bf4d2-aac9-4a1a-b319-1a4766cdeaca",
            "name": "Message Router",
            "type": "n8n-nodes-base.switch",
            "position": [
                  320,
                  160
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "audio",
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
                                                            "type": "object",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.body.message.voice }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "text",
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
                                                      "id": "342f0883-d959-44a2-b80d-379e39c76218",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.body.message.text }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "image",
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
                                                      "id": "ded3a600-f861-413a-8892-3fc5ea935ecb",
                                                      "operator": {
                                                            "type": "array",
                                                            "operation": "exists",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.body.message.photo }}",
                                                      "rightValue": ""
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
            "typeVersion": 3.2
      }
],
    connections: {
      "Get Image": {
            "main": [
                  [
                        {
                              "node": "Extract from File to Base64",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Validation": {
            "main": [
                  [
                        {
                              "node": "Check User & Chat ID",
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
                              "node": "Text Classifier",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "gpt-4o-mini": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Text Classifier Audio",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Image Schema": {
            "main": [
                  [
                        {
                              "node": "Get Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "gpt-4o-mini1": {
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
      "Analyze Image": {
            "main": [
                  [
                        {
                              "node": "Image Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Image Message": {
            "main": [
                  []
            ]
      },
      "Get Audio File": {
            "main": [
                  [
                        {
                              "node": "Transcribe Recording",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Message Router": {
            "main": [
                  [
                        {
                              "node": "Get Audio File",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Edit Fields",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Image Schema",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Error message",
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
                              "node": "Text Task Message",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Text Other Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check User & Chat ID": {
            "main": [
                  [
                        {
                              "node": "Message Router",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Error message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Webhook Test URL": {
            "main": [
                  [
                        {
                              "node": "Test Webhook Status",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Transcribe Recording": {
            "main": [
                  [
                        {
                              "node": "Text Classifier Audio",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Convert to Image File": {
            "main": [
                  [
                        {
                              "node": "Analyze Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Text Classifier Audio": {
            "main": [
                  [
                        {
                              "node": "Audio Task Message",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Audio Other Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Telegram Webhook Info": {
            "main": [
                  [
                        {
                              "node": "Get Webhook Status",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Telegram Token & Webhooks": {
            "main": [
                  [
                        {
                              "node": "Set Webhook Production URL",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Set Webhook Test URL",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get Telegram Webhook Info",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Listen for Telegram Events": {
            "main": [
                  [
                        {
                              "node": "Validation",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Webhook Production URL": {
            "main": [
                  [
                        {
                              "node": "Production Webhook Status",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract from File to Base64": {
            "main": [
                  [
                        {
                              "node": "Convert to Image File",
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
    name: "🤖🧠 AI Agent Chatbot + LONG TERM Memory + Note Storage + Telegram",
    nodes: [
      {
            "id": "20a2d959-5412-447b-a2c4-7736b6b758b3",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "position": [
                  -320,
                  1600
            ],
            "webhookId": "8ba8fa53-2c24-47a8-b4dd-67b88c106e3d",
            "parameters": {
                  "options": {}
            },
            "typeVersion": 1.1
      },
      {
            "id": "de79c268-bac5-48ff-be4d-18f522861c22",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -100,
                  1280
            ],
            "parameters": {
                  "color": 4,
                  "width": 340,
                  "height": 380,
                  "content": "## Retrieve Long Term Memories\nGoogle Docs"
            },
            "typeVersion": 1
      },
      {
            "id": "000a94d1-57ce-4eec-a021-9123685d22bf",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1040,
                  1840
            ],
            "parameters": {
                  "width": 280,
                  "height": 380,
                  "content": "## Save To Current Chat Memory (Optional)"
            },
            "typeVersion": 1
      },
      {
            "id": "1bf1cade-bb3e-450a-a531-9add259069df",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1360,
                  1840
            ],
            "parameters": {
                  "color": 4,
                  "width": 280,
                  "height": 380,
                  "content": "## Save Long Term Memories\nGoogle Docs"
            },
            "typeVersion": 1
      },
      {
            "id": "8b30f207-8204-4548-8f51-38c387d98ae9",
            "name": "gpt-4o-mini",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  820,
                  1900
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "jEMSvKmtYfzAkhe6",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "50271e59-6dd2-4f54-9b28-dd4a9f33ddc5",
            "name": "Chat Response",
            "type": "n8n-nodes-base.set",
            "position": [
                  1440,
                  1600
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "d6f68b1c-a6a6-44d4-8686-dc4dcdde4767",
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
            "id": "1064a2bf-bf74-44cd-ba8a-48f93700e887",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1140,
                  2000
            ],
            "parameters": {
                  "sessionKey": "={{ $('When chat message received').item.json.sessionId }}",
                  "sessionIdType": "customKey",
                  "contextWindowLength": 50
            },
            "typeVersion": 1.3
      },
      {
            "id": "280fe3b1-faca-41b6-be0e-2ab906cd1662",
            "name": "Save Long Term Memories",
            "type": "n8n-nodes-base.googleDocsTool",
            "position": [
                  1460,
                  2000
            ],
            "parameters": {
                  "actionsUi": {
                        "actionFields": [
                              {
                                    "text": "={ \n \"memory\": \"{{ $fromAI('memory') }}\",\n \"date\": \"{{ $now }}\"\n}",
                                    "action": "insert"
                              }
                        ]
                  },
                  "operation": "update",
                  "documentURL": "[Google Doc ID]",
                  "descriptionType": "manual",
                  "toolDescription": "Save Memory"
            },
            "credentials": {
                  "googleDocsOAuth2Api": {
                        "id": "YWEHuG28zOt532MQ",
                        "name": "Google Docs account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "37baa147-120a-40a8-b92f-df319fc4bc46",
            "name": "Retrieve Long Term Memories",
            "type": "n8n-nodes-base.googleDocs",
            "position": [
                  20,
                  1420
            ],
            "parameters": {
                  "operation": "get",
                  "documentURL": "[Google Doc ID]"
            },
            "credentials": {
                  "googleDocsOAuth2Api": {
                        "id": "YWEHuG28zOt532MQ",
                        "name": "Google Docs account"
                  }
            },
            "typeVersion": 2,
            "alwaysOutputData": true
      },
      {
            "id": "b047a271-d2aa-4a26-b663-6a76d249824a",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  720,
                  1840
            ],
            "parameters": {
                  "color": 3,
                  "width": 280,
                  "height": 380,
                  "content": "## LLM"
            },
            "typeVersion": 1
      },
      {
            "id": "15bb5fd5-7dfe-4da9-830c-e1d905831640",
            "name": "Telegram Response",
            "type": "n8n-nodes-base.telegram",
            "position": [
                  1440,
                  1260
            ],
            "parameters": {
                  "text": "={{ $json.output }}",
                  "chatId": "=1234567891",
                  "additionalFields": {
                        "parse_mode": "HTML",
                        "appendAttribution": false
                  }
            },
            "credentials": {
                  "telegramApi": {
                        "id": "pAIFhguJlkO3c7aQ",
                        "name": "Telegram account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "8cc38a87-e214-4193-9fe6-ba4adc3d5530",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1360,
                  1160
            ],
            "parameters": {
                  "width": 260,
                  "height": 300,
                  "content": "## Telegram \n(Optional)"
            },
            "typeVersion": 1
      },
      {
            "id": "38121a81-d768-4bb0-a9e6-39de0906e026",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  680,
                  1500
            ],
            "parameters": {
                  "color": 5,
                  "width": 1320,
                  "height": 780,
                  "content": "## AI AGENT with Long Term Memory & Note Storage"
            },
            "typeVersion": 1
      },
      {
            "id": "7d5d1466-b4c9-4055-a634-ea7025dc370a",
            "name": "DeepSeek-V3 Chat",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  820,
                  2060
            ],
            "parameters": {
                  "model": "=deepseek-chat",
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "MSl7SdcvZe0SqCYI",
                        "name": "deepseek"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "68303b67-2203-41e8-b370-220d884d2945",
            "name": "AI Tools Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1060,
                  1600
            ],
            "parameters": {
                  "text": "={{ $('When chat message received').item.json.chatInput }}",
                  "options": {
                        "systemMessage": "=## ROLE \nYou are a friendly, attentive, and helpful AI assistant. Your primary goal is to assist the user while maintaining a personalized and engaging interaction. \n\n---\n\n## RULES \n\n1. **Memory Management**: \n - When the user sends a new message, evaluate whether it contains noteworthy or personal information (e.g., preferences, habits, goals, or important events). \n - If such information is identified, use the **Save Memory** tool to store this data in memory. \n - Always send a meaningful response back to the user, even if your primary action was saving information. This response should not reveal that information was stored but should acknowledge or engage with the user’s input naturally. \n\n2. **Note Management**: \n - If the user provides information that is intended to be stored as a note (e.g., specific instructions, reminders, or standalone pieces of information), use the **Save Note** tool. \n - Notes should not be stored in memory using the **Save Memory** tool. \n - Ensure that notes are clear, concise, and accurately reflect the user’s input. \n\n3. **Context Awareness**: \n - Use stored memories and notes to provide contextually relevant and personalized responses. \n - Always consider the **date and time** when a memory or note was collected to ensure your responses are up-to-date and accurate.\n\n4. **User-Centric Responses**: \n - Tailor your responses based on the user's preferences and past interactions. \n - Be proactive in recalling relevant details from memory or notes when appropriate but avoid overwhelming the user with unnecessary information.\n\n5. **Privacy and Sensitivity**: \n - Handle all user data with care and sensitivity. Avoid making assumptions or sharing stored information unless it directly enhances the conversation or task at hand.\n - Never store passwords or usernames.\n\n6. **Fallback Responses**: \n - **IMPORTANT** If no specific task or question arises from the user’s message (e.g., when only saving information), respond in a way that keeps the conversation flowing naturally. For example: \n - Acknowledge their input: “Thanks for sharing that!” \n - Provide a friendly follow-up: “Is there anything else I can help you with today?” \n - DO NOT tell jokes as a fallback response.\n\n---\n\n## TOOLS \n\n### Save Memory \n- Use this tool to store summarized, concise, and meaningful information about the user. \n- Extract key details from user messages that could enhance future interactions (e.g., likes/dislikes, important dates, hobbies). \n- Ensure that the summary is clear and devoid of unnecessary details.\n\n### Save Note \n- Use this tool to store specific instructions, reminders, or standalone pieces of information provided by the user. \n- Notes should not include general personal preferences or habits meant for long-term memory storage. \n- Ensure that notes are concise and accurately reflect what the user wants to store.\n\n---\n\n## MEMORIES \n\n### Recent Noteworthy Memories \nHere are the most recent memories collected from the user, including their date and time of collection: \n\n**{{ $json.data[0].content }}**\n\n### Guidelines for Using Memories: \n- Prioritize recent memories but do not disregard older ones if they remain relevant. \n- Cross-reference memories to maintain consistency in your responses. For example, if a user shares conflicting preferences over time, clarify or adapt accordingly.\n\n---\n\n## NOTES \n\n### Recent Notes Collected from User: \nHere are the most recent notes collected from the user: \n\n**{{ $json.data[1].content }}**\n\n### Guidelines for Using Notes: \n- Use notes for tasks requiring specific instructions or reminders.\n- Do not mix note content with general memory content; keep them distinct.\n\n---\n\n## ADDITIONAL INSTRUCTIONS \n\n- Think critically before responding to ensure your answers are thoughtful and accurate. \n- Strive to build trust with the user by being consistent, reliable, and personable in your interactions. \n- Avoid robotic or overly formal language; aim for a conversational tone that aligns with being \"friendly and helpful.\" \n"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7,
            "alwaysOutputData": false
      },
      {
            "id": "a6741133-93a1-42f8-83b4-bc29b9f49ae2",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1680,
                  1840
            ],
            "parameters": {
                  "color": 4,
                  "width": 280,
                  "height": 380,
                  "content": "## Save Notes\nGoogle Docs"
            },
            "typeVersion": 1
      },
      {
            "id": "87c88d31-811d-4265-b44e-ab30a45ff88b",
            "name": "Save Notes",
            "type": "n8n-nodes-base.googleDocsTool",
            "position": [
                  1780,
                  2000
            ],
            "parameters": {
                  "actionsUi": {
                        "actionFields": [
                              {
                                    "text": "={ \n \"note\": \"{{ $fromAI('memory') }}\",\n \"date\": \"{{ $now }}\"\n}",
                                    "action": "insert"
                              }
                        ]
                  },
                  "operation": "update",
                  "documentURL": "[Google Doc ID]",
                  "descriptionType": "manual",
                  "toolDescription": "Save Notes"
            },
            "credentials": {
                  "googleDocsOAuth2Api": {
                        "id": "YWEHuG28zOt532MQ",
                        "name": "Google Docs account"
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "b9b97837-d6f2-4cef-89c4-9301973015df",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -100,
                  1680
            ],
            "parameters": {
                  "color": 4,
                  "width": 340,
                  "height": 380,
                  "content": "## Retrieve Notes\nGoogle Docs"
            },
            "typeVersion": 1
      },
      {
            "id": "0002a227-4240-4d3c-9a45-fc6e23fdc7f5",
            "name": "Retrieve Notes",
            "type": "n8n-nodes-base.googleDocs",
            "onError": "continueRegularOutput",
            "position": [
                  20,
                  1820
            ],
            "parameters": {
                  "operation": "get",
                  "documentURL": "[Google Doc ID]"
            },
            "credentials": {
                  "googleDocsOAuth2Api": {
                        "id": "YWEHuG28zOt532MQ",
                        "name": "Google Docs account"
                  }
            },
            "typeVersion": 2,
            "alwaysOutputData": true
      },
      {
            "id": "88f7024c-87d4-48b4-b6bb-f68c88202f56",
            "name": "Aggregate",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  520,
                  1600
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData"
            },
            "typeVersion": 1
      },
      {
            "id": "48d576fc-870a-441e-a7be-3056ef7e1d7a",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  340,
                  1600
            ],
            "parameters": {},
            "typeVersion": 3
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
      "Aggregate": {
            "main": [
                  [
                        {
                              "node": "AI Tools Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Save Notes": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Tools Agent",
                              "type": "ai_tool",
                              "index": 0
                        }
                  ]
            ]
      },
      "gpt-4o-mini": {
            "ai_languageModel": [
                  [
                        {
                              "node": "AI Tools Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "AI Tools Agent": {
            "main": [
                  [
                        {
                              "node": "Telegram Response",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Chat Response",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  []
            ]
      },
      "Retrieve Notes": {
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
      "DeepSeek-V3 Chat": {
            "ai_languageModel": [
                  []
            ]
      },
      "Telegram Response": {
            "main": [
                  []
            ]
      },
      "Window Buffer Memory": {
            "ai_memory": [
                  [
                        {
                              "node": "AI Tools Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Save Long Term Memories": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Tools Agent",
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
                              "node": "Retrieve Long Term Memories",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Retrieve Notes",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Retrieve Long Term Memories": {
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
    settings: {
      "timezone": "America/Vancouver",
      "callerPolicy": "workflowsFromSameOwner",
      "executionOrder": "v1"
},
  },
];

export function TelegramCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/25 border border-sky-600' : 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50 hover:bg-sky-100 dark:hover:bg-sky-500/20 hover:border-sky-300 dark:hover:border-sky-600/50 hover:shadow-md'}`}
    >
      <Send className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-500 dark:text-sky-400'}`} />
      <span className="truncate max-w-[200px]">Telegram</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {telegramTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function TelegramTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {telegramTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-sky-50/50 dark:group-hover:to-sky-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-sky-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-sky-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Send className="w-6 h-6" />
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
