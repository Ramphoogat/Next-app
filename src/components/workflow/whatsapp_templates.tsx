import React from 'react';
import { Play, MessageCircle } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const whatsappTemplates: IN8nTemplate[] = [
  {
    name: "Automate Sales Meeting Prep With AI & APIFY Sent To WhatsApp",
    nodes: [
      {
            "id": "201ef455-2d65-4563-8ec1-318211b1fa6a",
            "name": "Get Message Contents",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  2080,
                  500
            ],
            "webhookId": "fa1d496f-17fa-4e50-bae9-84ca85ed4502",
            "parameters": {
                  "simple": false,
                  "options": {},
                  "messageId": "={{ $json.id }}",
                  "operation": "get"
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
            "id": "ded010af-e977-4c47-87dd-8221d601af74",
            "name": "Simplify Emails",
            "type": "n8n-nodes-base.set",
            "position": [
                  2240,
                  500
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "2006c806-42db-4457-84c2-35f59ed39018",
                                    "name": "date",
                                    "type": "string",
                                    "value": "={{ $json.date }}"
                              },
                              {
                                    "id": "872278d2-b97c-45ba-a9d3-162f154fe7dc",
                                    "name": "subject",
                                    "type": "string",
                                    "value": "={{ $json.subject }}"
                              },
                              {
                                    "id": "282f03e9-1d0f-4a17-b9ed-75b44171d4ee",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $json.text }}"
                              },
                              {
                                    "id": "9421776c-ff53-4490-b0e1-1e610534ba25",
                                    "name": "from",
                                    "type": "string",
                                    "value": "={{ $json.from.value[0].name }} ({{ $json.from.value[0].address }})"
                              },
                              {
                                    "id": "3b6716e8-5582-4da3-ae9d-e8dd1afad530",
                                    "name": "to",
                                    "type": "string",
                                    "value": "={{ $json.to.value[0].name }} ({{ $json.to.value[0].address }})"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "816bf787-ff9c-4b97-80ac-4b0c6ae5638b",
            "name": "Check For Upcoming Meetings",
            "type": "n8n-nodes-base.googleCalendar",
            "position": [
                  526,
                  -180
            ],
            "parameters": {
                  "limit": 1,
                  "options": {
                        "orderBy": "startTime",
                        "timeMax": "={{ $now.toUTC().plus(1, 'hour') }}",
                        "timeMin": "={{ $now.toUTC() }}",
                        "singleEvents": true
                  },
                  "calendar": {
                        "__rl": true,
                        "mode": "list",
                        "value": "c_5792bdf04bc395cbcbc6f7b754268245a33779d36640cc80a357711aa2f09a0a@group.calendar.google.com",
                        "cachedResultName": "n8n-events"
                  },
                  "operation": "getAll"
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
            "id": "234d5c79-bf40-44bb-8829-c6ccf8648359",
            "name": "OpenAI Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  920,
                  -20
            ],
            "parameters": {
                  "model": "gpt-4o-2024-08-06",
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
            "id": "445aa0f4-d41a-4d46-aa2f-e79a9cdb04b5",
            "name": "Extract Attendee Information",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  920,
                  -180
            ],
            "parameters": {
                  "text": "=start: {{ $json.start.dateTime }}\nmeeting url: {{ $json.hangoutLink }}\nsummary: {{ $json.summary }}\ndescription: {{ $json.description }}\norganiser: {{ $json.organizer.displayName }} ({{ $json.organizer.email }})\nattendees: {{ $json.attendees.filter(item => !item.organizer).map(item => item.email).join(',') }}",
                  "options": {
                        "systemPromptTemplate": "You are an expert extraction algorithm. Try to link any information found in the description to help fill in the attendee details.\nIf you do not know the value of an attribute asked to extract, you may omit the attribute's value."
                  },
                  "schemaType": "manual",
                  "inputSchema": "{\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"attendees\": {\n \"type\": \"array\",\n \"description\": \"list of attendees excluding the meeting organiser\",\n \"items\": {\n\t\t\t\"type\": \"object\",\n\t\t\t\"properties\": {\n\t\t\t \"name\": { \"type\": \"string\" },\n \"email\": { \"type\": \"string\" },\n \"linkedin_url\": { \"type\": \"string\" }\n\t\t\t}\n }\n\t\t}\n\t}\n}"
            },
            "typeVersion": 1
      },
      {
            "id": "390743d8-acfd-4951-8901-212f162dcbb4",
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "position": [
                  920,
                  580
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "ea9c76a0-40a0-413a-a93a-ad99069d0d91",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2460,
                  640
            ],
            "parameters": {
                  "model": "gpt-4o-2024-08-06",
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
            "id": "8d9df9e4-1815-44a2-a6fc-a9af42a77153",
            "name": "Get Last Correspondence",
            "type": "n8n-nodes-base.gmail",
            "position": [
                  1740,
                  500
            ],
            "webhookId": "b00c960c-3689-4fa1-9f0f-7d6c9479f0c6",
            "parameters": {
                  "limit": 1,
                  "filters": {
                        "sender": "={{ $json.email }}"
                  },
                  "operation": "getAll"
            },
            "credentials": {
                  "gmailOAuth2": {
                        "id": "Sf5Gfl9NiFTNXFWb",
                        "name": "Gmail account"
                  }
            },
            "typeVersion": 2.1,
            "alwaysOutputData": true
      },
      {
            "id": "23c7161f-60e2-4a99-9279-ff1dca5efc1c",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  4020,
                  1320
            ],
            "parameters": {
                  "model": "gpt-4o-2024-08-06",
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
            "id": "9ab535aa-bd8c-4bd6-a7a0-f7182d8d7123",
            "name": "OpenAI Chat Model3",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2720,
                  -20
            ],
            "parameters": {
                  "model": "gpt-4o-2024-08-06",
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
            "id": "410acb11-a16c-4abd-9f10-7582168d100e",
            "name": "WhatsApp Business Cloud",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  3360,
                  -140
            ],
            "parameters": {
                  "textBody": "={{ $json.text }}",
                  "operation": "send",
                  "phoneNumberId": "477115632141067",
                  "requestOptions": {},
                  "additionalFields": {},
                  "recipientPhoneNumber": "44123456789"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a7e8195d-eb73-4acb-aae1-eb04f8290d24",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  180,
                  -400
            ],
            "parameters": {
                  "color": 7,
                  "width": 616.7897454470152,
                  "height": 449.1424626006906,
                  "content": "## 1. Periodically Search For Upcoming Meetings\n[Read about the Scheduled Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger)\n\nLet's use the Scheduled Trigger node to trigger our Assistant to notify about upcoming meetings. Here, we'll set it for 1 hour intervals to check for meetings scheduled in our Google Calendar. You may need to play with the intervals and frequency depending on how many meetings you typically have."
            },
            "typeVersion": 1
      },
      {
            "id": "1aebb209-e440-4ef2-8527-381e5e70b4ea",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  326,
                  -180
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "hours"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "95758053-fcc2-45c6-96c2-ec0bf89bcb82",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  820,
                  -520
            ],
            "parameters": {
                  "color": 7,
                  "width": 655.5654775604146,
                  "height": 670.4114154200236,
                  "content": "## 2. Extract Attendee Details From Invite\n[Learn more about the Information Extractor node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor/)\n\nOnce we have our upcoming meeting, it'll be nice to prepare for it by reminding the user what the meeting is about and some context with the attendees. This will be the goal this template and of our assistant! However, first we'll need to extract some contact information of the attendees to do so.\n\nFor this demonstration, we'll assume that attendee's email and LinkedIn profile URLs are included in the meeting invite. We'll extract this information for each attendee using the Information Extractor node. This convenient node uses AI to parse and extract which saves us from writing complex pattern matching code otherwise.\n\nIn your own scenario, feel free to use your CRM to get this information instead."
            },
            "typeVersion": 1
      },
      {
            "id": "bd17aed0-9c96-4301-b09b-e61a03ebc1ac",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1500,
                  -520
            ],
            "parameters": {
                  "color": 7,
                  "width": 1020.0959898041108,
                  "height": 670.8210817031078,
                  "content": "## 3. Fetch Recent Correspondance & LinkedIn Activity\n[Learn more about the Execute Workflow node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow)\n\nAs both email fetching and LinkedIn scraping actions are quite complex, we'll split them out as subworkflow executions. Doing so (in my honest opinion), helps with development and maintainability of the template. Here, we'll make perform the research for all applicable attendees by making 2 calls to the subworkflow and merging them back into a single node at the end.\n\nHead over to the subworkflow (see below - step 3a) to see how we pull the summaries from Gmail and LinkedIn."
            },
            "typeVersion": 1
      },
      {
            "id": "ae804039-32e0-4d2d-a2ef-a6e8d65f7ce2",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2547.540603371386,
                  -440
            ],
            "parameters": {
                  "color": 7,
                  "width": 610.3630186140072,
                  "height": 582.1201380897592,
                  "content": "## 4. Generate Pre-Meeting Notification\n[Read more about the Basic LLM node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nNow that we have (1) our upcoming meeting details and (2) recent email and/or Linkedin summaries about our attendee, let's feed them into our LLM node to generate the best pre-meeting notification ever seen! Of course, we'll need to keep it short as we intend to send this notification via WhatsApp message but should you choose to use another channel such as email, feel free to adjust the length of the message which suits."
            },
            "typeVersion": 1
      },
      {
            "id": "045eb1d9-fd80-4f9c-8218-ae66583d0186",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3180,
                  -360
            ],
            "parameters": {
                  "color": 7,
                  "width": 466.8967433831988,
                  "height": 454.24485615650235,
                  "content": "## 5. Send Notification via WhatsApp\n[Learn more about the WhatsApp node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp)\n\nThe WhatsApp node is a super convenient way to send messages to WhatsApp which is one of the many messaging apps supported by n8n out of the box. Not using WhatsApp? Simply swap this our for Twilio, Telegram, Slack and others."
            },
            "typeVersion": 1
      },
      {
            "id": "46d35c68-88d7-445f-9834-b8b37ce90619",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1740,
                  260
            ],
            "parameters": {
                  "color": 7,
                  "width": 519.1145893777881,
                  "height": 190.5042226526524,
                  "content": "## 3.2: Fetch Last Email Correspondance\n[Learn more about Gmail node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail)\n\nFetching our attendee's last email will definitely help the user \"pick up\" from when they last last off. To do this, we'll assume a Gmail user and use the Gmail node to filter messages by the attendee's email address."
            },
            "typeVersion": 1
      },
      {
            "id": "fe1c751c-4879-482b-bb6f-89df23e1faa8",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1740,
                  860
            ],
            "parameters": {
                  "color": 7,
                  "width": 667.8619481635637,
                  "height": 259.7914017217902,
                  "content": "## 3.4 Scraping LinkedIn With [Apify.com](https://www.apify.com?fpr=414q6)\n[Learn more about Apify.com for Web Scraping](https://www.apify.com?fpr=414q6)\n\nTo get the attendee's recent LinkedIn activity, we'll need a webscraper capable of rendering the user's LinkedIn profile. We'll use [Apify.com](https://www.apify.com?fpr=414q6) which is a commercial web scraping service but has a very generous monthly free tier ($5/mo).\n\nWhile Apify offers a number of dedicated LinkedIn scrapers, we'll build our own which works by impersonating our own LinkedIn account using our login cookie - this can be obtained by inspecting network requests when logged into Linkedin. **Add your LinkedIn Cookie to the node below!**"
            },
            "typeVersion": 1
      },
      {
            "id": "a648cf7d-b859-4fec-8ae7-6450c70e6333",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  920,
                  310
            ],
            "parameters": {
                  "color": 7,
                  "width": 572.0305871208889,
                  "height": 231.49547088049098,
                  "content": "## 3.1 Attendee Researcher SubWorkflow\n[Learn more about using Execute Workflow Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger/)\n\nThe Attendee Researcher SubWorkflow's aims to collect and summarize both an attendee's last correspondance with the user (if applicable) and the attendee's LinkedIn profile (if available). It uses the router pattern to handle both branches allowing for shorter execution chains. Using the Switch node, this subworkflow is either triggered to fetch emails or scrape LinkedIn but never both simultaneously."
            },
            "typeVersion": 1
      },
      {
            "id": "8a8dbe4f-86b1-41a4-9b7e-3affdee8e524",
            "name": "Return LinkedIn Success",
            "type": "n8n-nodes-base.set",
            "position": [
                  4360,
                  1180
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "fc4b63a7-ad4d-49ff-9d42-715760910f6a",
                                    "name": "linkedin_summary",
                                    "type": "string",
                                    "value": "={{ $json.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "537a399b-1f78-440b-abc4-ad2e91c5950a",
            "name": "Return LinkedIn Error",
            "type": "n8n-nodes-base.set",
            "position": [
                  2380,
                  1320
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "bf5a0781-3bad-4f63-a49c-273b03204747",
                                    "name": "linkedin_summary",
                                    "type": "string",
                                    "value": "No activities found."
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "a68e7df7-8467-46e2-8ea8-fcf270755d12",
            "name": "Return Email Error",
            "type": "n8n-nodes-base.set",
            "position": [
                  2080,
                  680
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "9a7efc9e-26b0-48c9-83aa-ae989f20b1df",
                                    "name": "email_summary",
                                    "type": "string",
                                    "value": "No correspondance found."
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "00df2b18-22ca-48d6-b053-12fe502effc5",
            "name": "Return Email Success",
            "type": "n8n-nodes-base.set",
            "position": [
                  2800,
                  500
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "fc4b63a7-ad4d-49ff-9d42-715760910f6a",
                                    "name": "email_summary",
                                    "type": "object",
                                    "value": "={{ $json.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "cdae9f9f-11c0-4f26-9ba1-5d5ed279ebfc",
            "name": "Set Route Email",
            "type": "n8n-nodes-base.set",
            "position": [
                  1600,
                  -260
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{ Object.assign({ \"route\": \"email\" }, $json) }}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "b01371f6-8871-4ad9-866d-888e22e7908e",
            "name": "Set Route Linkedin",
            "type": "n8n-nodes-base.set",
            "position": [
                  1600,
                  -100
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{ Object.assign({ \"route\": \"linkedin\" }, $json) }}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "c4907171-b239-46a6-a0b0-6bf66570005f",
            "name": "Router",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1100,
                  580
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "email",
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
                                                      "leftValue": "={{ $json.route }}",
                                                      "rightValue": "email"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "linkedin",
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
                                                      "id": "ba71a258-de67-4f61-a24a-33c86bd4c4f5",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.route }}",
                                                      "rightValue": "linkedin"
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
            "id": "45554355-57ad-464d-b768-5b00d707fc58",
            "name": "Return LinkedIn Error1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1440,
                  870
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "bf5a0781-3bad-4f63-a49c-273b03204747",
                                    "name": "linkedin_summary",
                                    "type": "string",
                                    "value": "No activities found."
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "05b04c17-eeeb-42f2-8d94-bc848889f17c",
            "name": "Has Emails?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1900,
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
                                    "id": "ff11640a-33e4-4695-a62c-7dcab57f0ae5",
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
            "id": "c24aca66-6222-46ae-bb9b-1838b01f3100",
            "name": "Return Email Error1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1440,
                  700
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "9a7efc9e-26b0-48c9-83aa-ae989f20b1df",
                                    "name": "email_summary",
                                    "type": "string",
                                    "value": "No correspondance found."
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "22f3ccbf-19a2-4ca5-ba23-f91963b52c0a",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2560,
                  920
            ],
            "parameters": {
                  "color": 7,
                  "width": 682.7350931085596,
                  "height": 219.59936012669806,
                  "content": "## 3.5: Extract LinkedIn Profile & Recent Activity\n[Learn more about the HTML node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.html)\n\nOnce we have our scraped LinkedIn profile, it's just a simple case of parsing and extracting the relevant sections from the page.\nFor the purpose of our workflow, we'll only need the \"About\" and \"Activity\" sections which we'll pull out of the page using a series of HTML nodes. Feel free to extract other sections to suit your needs! Once extracted, we'll combine the about and activities data in preparation of sending it to our LLM."
            },
            "typeVersion": 1
      },
      {
            "id": "49b1fc8f-1259-4596-84b0-b37fae1c098c",
            "name": "Sections To List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  2720,
                  1180
            ],
            "parameters": {
                  "options": {
                        "destinationFieldName": "data"
                  },
                  "fieldToSplitOut": "sections"
            },
            "typeVersion": 1
      },
      {
            "id": "875b278d-44c6-4315-87e3-459a90799a9b",
            "name": "Set LinkedIn Cookie",
            "type": "n8n-nodes-base.set",
            "position": [
                  1800,
                  1180
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "b4354c00-cc1a-4a55-8b44-6ba4854cc6ba",
                                    "name": "linkedin_profile_url",
                                    "type": "string",
                                    "value": "={{ $json.linkedin_url }}"
                              },
                              {
                                    "id": "4888db89-2573-4246-8ab9-c106a7fe5f38",
                                    "name": "linkedin_cookies",
                                    "type": "string",
                                    "value": "<COPY_YOUR_LINKEDIN_COOKIES_HERE>"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "91da49ab-86a1-4539-b673-106b9edaeae9",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1400,
                  1240
            ],
            "parameters": {
                  "color": 3,
                  "width": 308.16846950517856,
                  "height": 110.18457997698513,
                  "content": "### Be aware of LinkedIn T&Cs!\nFor production, you may want to consider not using your main Linkedin account if you can help it!"
            },
            "typeVersion": 1
      },
      {
            "id": "7abd390f-36a6-49af-b190-5bb720bd2ae8",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1740,
                  1152
            ],
            "parameters": {
                  "width": 209.84856156501735,
                  "height": 301.5806674338321,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Input Required!\nYou need to add your cuurent linkedIn Cookies here to continue."
            },
            "typeVersion": 1
      },
      {
            "id": "40dfb438-76c2-40b5-8945-94dcf7cafcf7",
            "name": "Attendees to List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  1260,
                  -180
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "output.attendees"
            },
            "typeVersion": 1
      },
      {
            "id": "cc7f8416-6ea1-4425-a320-3f8217d2ad4e",
            "name": "Merge Attendee with Summaries",
            "type": "n8n-nodes-base.set",
            "position": [
                  2160,
                  -180
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{ Object.assign({}, $('Attendees to List').item.json, $json) }}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "459c5f2b-5dd5-491f-8bed-475ae5af7ac0",
            "name": "Has Email Address?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1280,
                  580
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
                                    "id": "1382e335-bfae-4665-a2ee-a05496a7b463",
                                    "operator": {
                                          "type": "string",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.email }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "610e9849-f06c-4534-a269-d1982dcab259",
            "name": "Has LinkedIn URL?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1280,
                  750
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
                                    "id": "1382e335-bfae-4665-a2ee-a05496a7b463",
                                    "operator": {
                                          "type": "string",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.linkedin_url }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "43e5192e-c1b0-4d71-8d0e-aa466aa9930c",
            "name": "Get Correspondance",
            "type": "n8n-nodes-base.executeWorkflow",
            "onError": "continueRegularOutput",
            "position": [
                  1780,
                  -260
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
            "id": "4662f928-d38b-42e1-8a70-5676eb638ce1",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2000,
                  -180
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineByPosition"
            },
            "typeVersion": 3
      },
      {
            "id": "3eaf5d5b-d99c-4f9f-beaa-53b859bf482e",
            "name": "Aggregate Attendees",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  2340,
                  -180
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData",
                  "destinationFieldName": "attendees"
            },
            "typeVersion": 1
      },
      {
            "id": "752afdd3-0561-4e53-8b18-391741a2f43b",
            "name": "Activities To Array",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  3680,
                  1360
            ],
            "parameters": {
                  "options": {},
                  "aggregate": "aggregateAllItemData",
                  "destinationFieldName": "activity"
            },
            "typeVersion": 1
      },
      {
            "id": "a35dc751-62a0-4f5c-92cb-2801d060c613",
            "name": "Extract Profile Metadata",
            "type": "n8n-nodes-base.html",
            "position": [
                  2560,
                  1180
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "dataPropertyName": "body",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "name",
                                    "cssSelector": "h1"
                              },
                              {
                                    "key": "tagline",
                                    "cssSelector": ".pv-text-details__left-panel--full-width .text-body-medium"
                              },
                              {
                                    "key": "location",
                                    "cssSelector": ".pv-text-details__left-panel--full-width + div .text-body-small"
                              },
                              {
                                    "key": "num_connections",
                                    "cssSelector": "a[href=\"/mynetwork/invite-connect/connections/\"]"
                              },
                              {
                                    "key": "num_followers",
                                    "cssSelector": "a[href=\"https://www.linkedin.com/feed/followers/\"]"
                              },
                              {
                                    "key": "sections",
                                    "cssSelector": "section[data-view-name]",
                                    "returnArray": true,
                                    "returnValue": "html"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "5685ec9f-c219-41b4-94d7-787daef8a628",
            "name": "Activities To List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  3360,
                  1360
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "activity"
            },
            "typeVersion": 1
      },
      {
            "id": "71240827-3e0d-4276-afb0-9ed72878ea4c",
            "name": "APIFY Web Scraper",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  2000,
                  1180
            ],
            "parameters": {
                  "url": "https://api.apify.com/v2/acts/apify~web-scraper/run-sync-get-dataset-items",
                  "options": {},
                  "jsonBody": "={\n \"startUrls\": [\n {\n \"url\": \"{{ $json.linkedin_profile_url }}\",\n \"method\": \"GET\"\n }\n ],\n \"initialCookies\": [\n {\n \"name\": \"li_at\",\n \"value\": \"{{ $json.linkedin_cookies.match(/li_at=([^;]+)/)[1] }}\",\n \"domain\": \".www.linkedin.com\"\n }\n ],\n \"breakpointLocation\": \"NONE\",\n \"browserLog\": false,\n \"closeCookieModals\": false,\n \"debugLog\": false,\n \"downloadCss\": false,\n \"downloadMedia\": false,\n \"excludes\": [\n {\n \"glob\": \"/**/*.{png,jpg,jpeg,pdf}\"\n }\n ],\n \"headless\": true,\n \"ignoreCorsAndCsp\": false,\n \"ignoreSslErrors\": false,\n \n \"injectJQuery\": true,\n \"keepUrlFragments\": false,\n \"linkSelector\": \"a[href]\",\n \"maxCrawlingDepth\": 1,\n \"maxPagesPerCrawl\": 1,\n \"maxRequestRetries\": 1,\n \"maxResultsPerCrawl\": 1,\n \"pageFunction\": \"// The function accepts a single argument: the \\\"context\\\" object.\\n// For a complete list of its properties and functions,\\n// see https://apify.com/apify/web-scraper#page-function \\nasync function pageFunction(context) {\\n\\n await new Promise(res => { setTimeout(res, 6000) });\\n // This statement works as a breakpoint when you're trying to debug your code. Works only with Run mode: DEVELOPMENT!\\n // debugger; \\n\\n // jQuery is handy for finding DOM elements and extracting data from them.\\n // To use it, make sure to enable the \\\"Inject jQuery\\\" option.\\n const $ = context.jQuery;\\n const title = $('title').first().text();\\n\\n // Clone the body to avoid modifying the original content\\n const bodyClone = $('body').clone();\\n bodyClone.find('iframe, img, script, style, object, embed, noscript, svg, video, audio').remove();\\n const body = bodyClone.html();\\n\\n // Return an object with the data extracted from the page.\\n // It will be stored to the resulting dataset.\\n return {\\n url: context.request.url,\\n title,\\n body\\n };\\n}\",\n \"postNavigationHooks\": \"// We need to return array of (possibly async) functions here.\\n// The functions accept a single argument: the \\\"crawlingContext\\\" object.\\n[\\n async (crawlingContext) => {\\n // ...\\n },\\n]\",\n \"preNavigationHooks\": \"// We need to return array of (possibly async) functions here.\\n// The functions accept two arguments: the \\\"crawlingContext\\\" object\\n// and \\\"gotoOptions\\\".\\n[\\n async (crawlingContext, gotoOptions) => {\\n // ...\\n },\\n]\\n\",\n \"proxyConfiguration\": {\n \"useApifyProxy\": true\n },\n \"runMode\": \"PRODUCTION\",\n \n \"useChrome\": false,\n \"waitUntil\": [\n \"domcontentloaded\"\n ],\n \"globs\": [],\n \"pseudoUrls\": [],\n \"proxyRotation\": \"RECOMMENDED\",\n \"maxConcurrency\": 50,\n \"pageLoadTimeoutSecs\": 60,\n \"pageFunctionTimeoutSecs\": 60,\n \"maxScrollHeightPixels\": 5000,\n \"customData\": {}\n}",
                  "sendBody": true,
                  "specifyBody": "json",
                  "authentication": "genericCredentialType",
                  "genericAuthType": "httpQueryAuth"
            },
            "credentials": {
                  "httpQueryAuth": {
                        "id": "cO2w8RDNOZg8DRa8",
                        "name": "Apify API"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "01659121-44f9-4d53-b973-cea29a8b0301",
            "name": "Get Activity Details",
            "type": "n8n-nodes-base.html",
            "position": [
                  3520,
                  1360
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "dataPropertyName": "activity",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "header",
                                    "attribute": "aria-label",
                                    "cssSelector": ".feed-mini-update-optional-navigation-context-wrapper",
                                    "returnValue": "attribute"
                              },
                              {
                                    "key": "url",
                                    "attribute": "href",
                                    "cssSelector": ".feed-mini-update-optional-navigation-context-wrapper",
                                    "returnValue": "attribute"
                              },
                              {
                                    "key": "content",
                                    "cssSelector": ".inline-show-more-text--is-collapsed"
                              },
                              {
                                    "key": "num_reactions",
                                    "cssSelector": ".social-details-social-counts__reactions-count"
                              },
                              {
                                    "key": "num_comments",
                                    "cssSelector": ".social-details-social-counts__comments"
                              },
                              {
                                    "key": "num_reposts",
                                    "cssSelector": ".social-details-social-counts__item--truncate-text"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "420a3a3e-ca99-49fb-b6b7-e9757f27b5d4",
            "name": "Get Sections",
            "type": "n8n-nodes-base.html",
            "position": [
                  2880,
                  1180
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "title",
                                    "cssSelector": "h2 [aria-hidden=true]"
                              },
                              {
                                    "key": "content",
                                    "cssSelector": "*",
                                    "returnValue": "html"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "4983c987-79a7-4725-9913-630a71608f41",
            "name": "Get About Section",
            "type": "n8n-nodes-base.set",
            "position": [
                  3040,
                  1180
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "79d7943f-45a5-456c-a15b-cef53903409d",
                                    "name": "html",
                                    "type": "string",
                                    "value": "={{\n$input.all()\n .find(input => input.json.title.toLowerCase().trim() === 'about')\n .json\n .content\n}}"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "0e8bed5b-a622-4dbd-a11e-24df5d68f038",
            "name": "Get Activity Section",
            "type": "n8n-nodes-base.set",
            "position": [
                  3040,
                  1360
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "79d7943f-45a5-456c-a15b-cef53903409d",
                                    "name": "html",
                                    "type": "string",
                                    "value": "={{\n$input.all()\n .find(input => input.json.title.toLowerCase().trim() === 'activity')\n .json\n .content\n}}"
                              }
                        ]
                  }
            },
            "executeOnce": true,
            "typeVersion": 3.4
      },
      {
            "id": "5dd2677f-a4fc-447f-af7d-28e90dda46e8",
            "name": "Extract Activities",
            "type": "n8n-nodes-base.html",
            "position": [
                  3200,
                  1360
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "dataPropertyName": "html",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "activity",
                                    "cssSelector": ".profile-creator-shared-feed-update__mini-container",
                                    "returnArray": true,
                                    "returnValue": "html"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "1a32808f-e465-47ef-b8bd-52b19c26ff1a",
            "name": "Merge1",
            "type": "n8n-nodes-base.merge",
            "position": [
                  3860,
                  1180
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineByPosition"
            },
            "typeVersion": 3
      },
      {
            "id": "6e452337-55a3-4466-a094-ec9106b36498",
            "name": "Is Scrape Successful?",
            "type": "n8n-nodes-base.if",
            "position": [
                  2180,
                  1180
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
                                    "id": "3861abc7-7699-4459-b983-0c8b33e090b5",
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
            "typeVersion": 2.2
      },
      {
            "id": "51a79d99-46af-4951-a99e-64f1d59f556e",
            "name": "Extract About",
            "type": "n8n-nodes-base.html",
            "position": [
                  3200,
                  1180
            ],
            "parameters": {
                  "options": {},
                  "operation": "extractHtmlContent",
                  "dataPropertyName": "html",
                  "extractionValues": {
                        "values": [
                              {
                                    "key": "about",
                                    "cssSelector": "body"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "d943fbde-f8fc-42b1-8b7e-f73735b81394",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3860,
                  940
            ],
            "parameters": {
                  "color": 7,
                  "width": 508.12647286359606,
                  "height": 212.26880753952497,
                  "content": "## 3.6 Summarize LinkedIn For Attendee\n[Read more about the Basic LLM node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nFinally, we'll use the Basic LLM node to summarize our attendee's LinkedIn profile and recent activity. Our goal here is to identify and send back interesting tidbits of information which may be relevant to the meeting as well as inform the user. Should you require different criteria, simply edit the summarizer to get the response you need."
            },
            "typeVersion": 1
      },
      {
            "id": "b64bbfb0-ebd6-4fe7-9c02-3c1b72407df5",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2460,
                  270
            ],
            "parameters": {
                  "color": 7,
                  "width": 593.8676556715506,
                  "height": 196.6490014749014,
                  "content": "## 3.3: Summarize Correspondance For Attendee\n[Read more about the Basic LLM node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nNext, we'll generate a shorter version of the email(s) using the Basic LLM node - useful if the email was part of a large chain. The goal here is, if applicable, to remind the user of the conversion with this attendee and highlight any expectations which might be set before going into the meeting."
            },
            "typeVersion": 1
      },
      {
            "id": "a2dd5060-dd12-463b-8bbe-327ed691bdb9",
            "name": "Get LinkedIn Profile & Activity",
            "type": "n8n-nodes-base.executeWorkflow",
            "onError": "continueRegularOutput",
            "position": [
                  1780,
                  -100
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
            "id": "fde0fa35-e692-4ca9-83ef-14e527f2f8d2",
            "name": "Sticky Note13",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -320,
                  -660
            ],
            "parameters": {
                  "width": 453.4804561790962,
                  "height": 588.3011632094225,
                  "content": "## Try It Out!\n\n### This workflow builds an AI meeting assistant who sends information-dense pre-meeting notifications for a user's upcoming meetings. This template is ideal for busy professional who is constantly on the move and wants to save time and make an impression.\n\n### How It Works\n* A scheduled trigger fires hourly and checks for upcoming meetings within the hour.\n* When found, a search for last correspondence and LinkedIn profile + recent activity is performed for each attendee.\n* Using both available correspondance and/or Linkedin profile, an AI/LLM is used to summarize this information and generate a short notification message which should help the user prepare for the meeting.\n* The notification is finally sent to the user's WhatsApp.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      },
      {
            "id": "f2f19824-9865-465b-a612-7d3215209c79",
            "name": "Correspondance Recap Agent",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  2460,
                  500
            ],
            "parameters": {
                  "text": "=from: {{ $json.from }}\nto: {{ $json.to }}\ndate: {{ $json.date }}\nsubject: {{ $json.subject }}\ntext:\n{{ $json.text }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=You are helping the \"to\" user recap the last correspondance they had in this email thread. Summarize succiently what was discussed, changed or agreed to help the user prepare for their upcoming meeting."
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "42641933-edf6-4b01-a17f-8cda2be7a093",
            "name": "Attendee Research Agent",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  2720,
                  -180
            ],
            "parameters": {
                  "text": "=meeting date: {{ $('Check For Upcoming Meetings').item.json.start.dateTime }}\nmeeting url: {{ $('Check For Upcoming Meetings').item.json.hangoutLink }}\nmeeting summary: {{ $('Check For Upcoming Meetings').first().json.summary }}\nmeeting description: {{ $('Check For Upcoming Meetings').item.json.description }}\nmeeting with: {{ $json.attendees.map(item => item.name).join(',') }}\n---\n{{\n$json.attendees.map(item => {\n return\n`attendee name: ${item.name}\n${item.name}'s last correspondance: ${item.email_summary.replaceAll('\\n', ' ') || `We have not had any correspondance with ${item.name}`}\n${item.name}'s linkedin profile: ${item.linkedin_summary.replaceAll('\\n', ' ') || `We were unable to find the linkedin profile for ${$json.name}`}\n`\n}).join('\\n---\\n')\n}}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=You are a personal meeing assistant.\nYou are helping to remind user of an upcoming meeting with {{ $json.attendees.map(item => item.name).join(',') }} (aka \"the attendee(s)\"}. You will structure your notification using the following guidance:\n1. Start by providing the meeting summary, mentioning the date, with whom and providing the meeting link.\n2. For each attendee, give a short bullet point summary of their last correspondance. Assess if the correspondance has any relevance to the meeting and if so, identify any important todos or items which should be mentioned during the meeting. Additionally, give a short bullet point summary of attendee's recent activity which makes for good talking points. These need not be relevant to the meeting.\n\nWrite your response in a casual tone as if sending a SMS message to the user. USe bullet points where appropriate."
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "1916515d-8b85-4da9-ac17-1c08485cdf04",
            "name": "LinkedIn Summarizer Agent",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  4020,
                  1180
            ],
            "parameters": {
                  "text": "=### name\n{{ $('Extract Profile Metadata').item.json.name }}\n### about\n\"{{ $('Extract Profile Metadata').item.json.tagline }}\"\n{{ $json.about.replaceAll('\\n', ' ')}}\n### recent activity\n{{\n$json.activity.map((item, idx) => {\n return [\n item.header.replace('View full post.', ''),\n `(${item.url})`,\n ' - ',\n item.content.replaceAll('\\n', ' ').replaceAll('…show more', '')\n ].join(' ')\n}).join('\\n---\\n')\n}}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=Summarize briefly the person and their recent activities as seen in the given feed and highlight noteworthy awards or achievements which make for good talking points."
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      }
],
    connections: {
      "Merge": {
            "main": [
                  [
                        {
                              "node": "Merge Attendee with Summaries",
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
                              "node": "LinkedIn Summarizer Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Router": {
            "main": [
                  [
                        {
                              "node": "Has Email Address?",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Has LinkedIn URL?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has Emails?": {
            "main": [
                  [
                        {
                              "node": "Get Message Contents",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Return Email Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Sections": {
            "main": [
                  [
                        {
                              "node": "Get About Section",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get Activity Section",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract About": {
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
      "Set Route Email": {
            "main": [
                  [
                        {
                              "node": "Get Correspondance",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Simplify Emails": {
            "main": [
                  [
                        {
                              "node": "Correspondance Recap Agent",
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
                              "node": "Check For Upcoming Meetings",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Sections To List": {
            "main": [
                  [
                        {
                              "node": "Get Sections",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "APIFY Web Scraper": {
            "main": [
                  [
                        {
                              "node": "Is Scrape Successful?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Attendees to List": {
            "main": [
                  [
                        {
                              "node": "Set Route Email",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Set Route Linkedin",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get About Section": {
            "main": [
                  [
                        {
                              "node": "Extract About",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Has LinkedIn URL?": {
            "main": [
                  [
                        {
                              "node": "Set LinkedIn Cookie",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Return LinkedIn Error1",
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
                              "node": "Correspondance Recap Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Activities To List": {
            "main": [
                  [
                        {
                              "node": "Get Activity Details",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Activities": {
            "main": [
                  [
                        {
                              "node": "Activities To List",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Correspondance": {
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
      "Has Email Address?": {
            "main": [
                  [
                        {
                              "node": "Get Last Correspondence",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Return Email Error1",
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
                              "node": "LinkedIn Summarizer Agent",
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
                              "node": "Extract Attendee Information",
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
                              "node": "Attendee Research Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Route Linkedin": {
            "main": [
                  [
                        {
                              "node": "Get LinkedIn Profile & Activity",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Activities To Array": {
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
      "Aggregate Attendees": {
            "main": [
                  [
                        {
                              "node": "Attendee Research Agent",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set LinkedIn Cookie": {
            "main": [
                  [
                        {
                              "node": "APIFY Web Scraper",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Activity Details": {
            "main": [
                  [
                        {
                              "node": "Activities To Array",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Activity Section": {
            "main": [
                  [
                        {
                              "node": "Extract Activities",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Message Contents": {
            "main": [
                  [
                        {
                              "node": "Simplify Emails",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Is Scrape Successful?": {
            "main": [
                  [
                        {
                              "node": "Extract Profile Metadata",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Return LinkedIn Error",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Attendee Research Agent": {
            "main": [
                  [
                        {
                              "node": "WhatsApp Business Cloud",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Last Correspondence": {
            "main": [
                  [
                        {
                              "node": "Has Emails?",
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
                              "node": "Router",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Profile Metadata": {
            "main": [
                  [
                        {
                              "node": "Sections To List",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "LinkedIn Summarizer Agent": {
            "main": [
                  [
                        {
                              "node": "Return LinkedIn Success",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Correspondance Recap Agent": {
            "main": [
                  [
                        {
                              "node": "Return Email Success",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check For Upcoming Meetings": {
            "main": [
                  [
                        {
                              "node": "Extract Attendee Information",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Attendee Information": {
            "main": [
                  [
                        {
                              "node": "Attendees to List",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge Attendee with Summaries": {
            "main": [
                  [
                        {
                              "node": "Aggregate Attendees",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get LinkedIn Profile & Activity": {
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
    name: "Building Your First WhatsApp Chatbot",
    nodes: [
      {
            "id": "77ee6494-4898-47dc-81d9-35daf6f0beea",
            "name": "WhatsApp Trigger",
            "type": "n8n-nodes-base.whatsAppTrigger",
            "position": [
                  1360,
                  -280
            ],
            "webhookId": "aaa71f03-f7af-4d18-8d9a-0afb86f1b554",
            "parameters": {
                  "updates": [
                        "messages"
                  ]
            },
            "credentials": {
                  "whatsAppTriggerApi": {
                        "id": "H3uYNtpeczKMqtYm",
                        "name": "WhatsApp OAuth account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "57210e27-1f89-465a-98cc-43f890a4bf58",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1960,
                  -200
            ],
            "parameters": {
                  "model": "gpt-4o-2024-08-06",
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
            "id": "e1053235-0ade-4e36-9ad2-8b29c78fced8",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  2080,
                  -200
            ],
            "parameters": {
                  "sessionKey": "=whatsapp-75-{{ $json.messages[0].from }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "69f1b78b-7c93-4713-863a-27e04809996f",
            "name": "Vector Store Tool",
            "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
            "position": [
                  2200,
                  -200
            ],
            "parameters": {
                  "name": "query_product_brochure",
                  "description": "Call this tool to query the product brochure. Valid for the year 2024."
            },
            "typeVersion": 1
      },
      {
            "id": "170e8f7d-7e14-48dd-9f80-5352cc411fc1",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  2200,
                  80
            ],
            "parameters": {
                  "model": "text-embedding-3-small",
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
            "id": "ee78320b-d407-49e8-b4b8-417582a44709",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2440,
                  -60
            ],
            "parameters": {
                  "model": "gpt-4o-2024-08-06",
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
            "id": "9dd89378-5acf-4ca6-8d84-e6e64254ed02",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  0,
                  -240
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "e68fc137-1bcb-43f0-b597-3ae07f380c15",
            "name": "Embeddings OpenAI1",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  760,
                  -20
            ],
            "parameters": {
                  "model": "text-embedding-3-small",
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
            "id": "2d31e92b-18d4-4f6b-8cdb-bed0056d50d7",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  900,
                  -20
            ],
            "parameters": {
                  "options": {},
                  "jsonData": "={{ $('Extract from File').item.json.text }}",
                  "jsonMode": "expressionData"
            },
            "typeVersion": 1
      },
      {
            "id": "ca0c015e-fba2-4dca-b0fe-bac66681725a",
            "name": "Recursive Character Text Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
            "position": [
                  900,
                  100
            ],
            "parameters": {
                  "options": {},
                  "chunkSize": 2000,
                  "chunkOverlap": {}
            },
            "typeVersion": 1
      },
      {
            "id": "63abb6b2-b955-4e65-9c63-3211dca65613",
            "name": "Extract from File",
            "type": "n8n-nodes-base.extractFromFile",
            "position": [
                  360,
                  -240
            ],
            "parameters": {
                  "options": {},
                  "operation": "pdf"
            },
            "typeVersion": 1
      },
      {
            "id": "be2add9c-3670-4196-8c38-82742bf4f283",
            "name": "get Product Brochure",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  180,
                  -240
            ],
            "parameters": {
                  "url": "https://usa.yamaha.com/files/download/brochure/1/1474881/Yamaha-Powered-Loudspeakers-brochure-2024-en-web.pdf",
                  "options": {}
            },
            "typeVersion": 4.2
      },
      {
            "id": "1ae5a311-36d7-4454-ab14-6788d1331780",
            "name": "Reply To User",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  2820,
                  -280
            ],
            "parameters": {
                  "textBody": "={{ $json.output }}",
                  "operation": "send",
                  "phoneNumberId": "477115632141067",
                  "requestOptions": {},
                  "additionalFields": {
                        "previewUrl": false
                  },
                  "recipientPhoneNumber": "={{ $('WhatsApp Trigger').item.json.messages[0].from }}"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "b6efba81-18b0-4378-bb91-51f39ca57f3e",
            "name": "Reply To User1",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  1760,
                  80
            ],
            "parameters": {
                  "textBody": "=I'm unable to process non-text messages. Please send only text messages. Thanks!",
                  "operation": "send",
                  "phoneNumberId": "477115632141067",
                  "requestOptions": {},
                  "additionalFields": {
                        "previewUrl": false
                  },
                  "recipientPhoneNumber": "={{ $('WhatsApp Trigger').item.json.messages[0].from }}"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "52decd86-ac6c-4d91-a938-86f93ec5f822",
            "name": "Product Catalogue",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory",
            "position": [
                  2200,
                  -60
            ],
            "parameters": {
                  "memoryKey": "whatsapp-75"
            },
            "typeVersion": 1
      },
      {
            "id": "6dd5a652-2464-4ab8-8e5f-568529299523",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -88.75,
                  -473.4375
            ],
            "parameters": {
                  "color": 7,
                  "width": 640.4375,
                  "height": 434.6875,
                  "content": "## 1. Download Product Brochure PDF\n[Read more about the HTTP Request Tool](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest)\n\nImport your marketing PDF document to build your vector store. This will be used as the knowledgebase by the Sales AI Agent.\n\nFor this demonstration, we'll use the HTTP request node to import the YAMAHA POWERED LOUDSPEAKERS 2024 brochure ([Source](https://usa.yamaha.com/files/download/brochure/1/1474881/Yamaha-Powered-Loudspeakers-brochure-2024-en-web.pdf)) and an Extract from File node to extract the text contents. "
            },
            "typeVersion": 1
      },
      {
            "id": "116663bc-d8d6-41a5-93dc-b219adbb2235",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  -476
            ],
            "parameters": {
                  "color": 7,
                  "width": 614.6875,
                  "height": 731.1875,
                  "content": "## 2. Create Product Brochure Vector Store\n[Read more about the In-Memory Vector Store](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/)\n\nVector stores are powerful databases which serve the purpose of matching a user's questions to relevant parts of a document. By creating a vector store of our product catalog, we'll allow users to query using natural language.\n\nTo keep things simple, we'll use the **In-memory Vector Store** which comes built-in to n8n and doesn't require a separate service. For production deployments, I'd recommend replacing the in-memory vector store with either [Qdrant](https://qdrant.tech) or [Pinecone](https://pinecone.io)."
            },
            "typeVersion": 1
      },
      {
            "id": "86bd5334-d735-4650-aeff-06230119d705",
            "name": "Create Product Catalogue",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory",
            "position": [
                  760,
                  -200
            ],
            "parameters": {
                  "mode": "insert",
                  "memoryKey": "whatsapp-75",
                  "clearStore": true
            },
            "typeVersion": 1
      },
      {
            "id": "b8078b0d-cbd7-423f-bb30-13902988be38",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1254,
                  -552
            ],
            "parameters": {
                  "color": 7,
                  "width": 546.6875,
                  "height": 484.1875,
                  "content": "## 3. Use the WhatsApp Trigger\n[Learn more about the WhatsApp Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/)\n\nThe WhatsApp Trigger allows you to receive incoming WhatsApp messages from customers. It requires a bit of setup so remember to follow the documentation carefully! Once ready however, it's quite easy to build powerful workflows which are easily accessible to users.\n\nNote that WhatsApp can send many message types such as audio and video so in this demonstration, we'll filter them out and just accept the text messages."
            },
            "typeVersion": 1
      },
      {
            "id": "5bf7ed07-282b-4198-aa90-3e5ae5180404",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1640,
                  280
            ],
            "parameters": {
                  "width": 338,
                  "height": 92,
                  "content": "### Want to handle all message types?\nCheck out my other WhatsApp template in my creator page! https://n8n.io/creators/jimleuk/"
            },
            "typeVersion": 1
      },
      {
            "id": "a3661b59-25d2-446e-8462-32b4d692b69d",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1640,
                  -40
            ],
            "parameters": {
                  "color": 7,
                  "width": 337.6875,
                  "height": 311.1875,
                  "content": "### 3a. Handle Unsupported Message Types\nFor non-text messages, we'll just reply with a simple message to inform the sender."
            },
            "typeVersion": 1
      },
      {
            "id": "ea3c9ee1-505a-40e7-82fe-9169bdbb80af",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1840,
                  -682.5
            ],
            "parameters": {
                  "color": 7,
                  "width": 746.6875,
                  "height": 929.1875,
                  "content": "## 4. Sales AI Agent Responds To Customers\n[Learn more about using AI Agents](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)\n\nn8n's AI agents are powerful nodes which make it incredibly easy to use state-of-the-art AI in your workflows. Not only do they have the ability to remember conversations per individual customer but also tap into resources such as our product catalogue vector store to pull factual information and data for every question.\n\nIn this demonstration, we use an AI agent which is directed to help the user navigate the product brochure. A Chat memory subnode is attached to identify and keep track of the customer session. A Vector store tool is added to allow the Agent to tap into the product catalogue knowledgebase we built earlier."
            },
            "typeVersion": 1
      },
      {
            "id": "5c72df8d-bca1-4634-b1ed-61ffec8bd103",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2620,
                  -560
            ],
            "parameters": {
                  "color": 7,
                  "width": 495.4375,
                  "height": 484.1875,
                  "content": "## 5. Repond to WhatsApp User\n[Learn more about the WhatsApp Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/)\n\nThe WhatsApp node is the go-to if you want to interact with WhatsApp users. With this node, you can send text, images, audio and video messages as well as use your WhatsApp message templates.\n\nHere, we'll keep it simple by replying with a text message which is the output of the AI agent."
            },
            "typeVersion": 1
      },
      {
            "id": "48ec809f-ca0e-4052-b403-9ad7077b3fff",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -520,
                  -620
            ],
            "parameters": {
                  "width": 401.25,
                  "height": 582.6283033962263,
                  "content": "## Try It Out!\n\n### This n8n template builds a simple WhatsApp chabot acting as a Sales Agent. The Agent is backed by a product catalog vector store to better answer user's questions.\n\n* This template is in 2 parts: creating the product catalog vector store and building the WhatsApp AI chatbot.\n* A product brochure is imported via HTTP request node and its text contents extracted.\n* The text contents are then uploaded to the in-memory vector store to build a knowledgebase for the chatbot.\n* A WhatsApp trigger is used to capture messages from customers where non-text messages are filtered out.\n* The customer's message is sent to the AI Agent which queries the product catalogue using the vector store tool.\n* The Agent's response is sent back to the user via the WhatsApp node.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!"
            },
            "typeVersion": 1
      },
      {
            "id": "87cf9b41-66de-49a7-aeb0-c8809191b5a0",
            "name": "Handle Message Types",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1560,
                  -280
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Supported",
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
                                                      "leftValue": "={{ $json.messages[0].type }}",
                                                      "rightValue": "text"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Not Supported",
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
                                                      "id": "89971d8c-a386-4e77-8f6c-f491a8e84cb6",
                                                      "operator": {
                                                            "type": "string",
                                                            "operation": "notEquals"
                                                      },
                                                      "leftValue": "={{ $json.messages[0].type }}",
                                                      "rightValue": "text"
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
            "id": "e52f0a50-0c34-4c4a-b493-4c42ba112277",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -80,
                  -20
            ],
            "parameters": {
                  "color": 5,
                  "width": 345.10906976744184,
                  "height": 114.53583720930231,
                  "content": "### You only have to run this part once!\nRun this step to populate our product catalogue vector. Run again if you want to update the vector store with a new version."
            },
            "typeVersion": 1
      },
      {
            "id": "c1a7d6d1-191e-4343-af9f-f2c9eb4ecf49",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1260,
                  -40
            ],
            "parameters": {
                  "color": 5,
                  "width": 364.6293255813954,
                  "height": 107.02804651162779,
                  "content": "### Activate your workflow to use!\nTo start using the WhatsApp chatbot, you'll need to activate the workflow. If you are self-hosting ensure WhatsApp is able to connect to your server."
            },
            "typeVersion": 1
      },
      {
            "id": "a36524d0-22a6-48cc-93fe-b4571cec428a",
            "name": "AI Sales Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1960,
                  -400
            ],
            "parameters": {
                  "text": "={{ $json.messages[0].text.body }}",
                  "options": {
                        "systemMessage": "You are an assistant working for a company who sells Yamaha Powered Loudspeakers and helping the user navigate the product catalog for the year 2024. Your goal is not to facilitate a sale but if the user enquires, direct them to the appropriate website, url or contact information.\n\nDo your best to answer any questions factually. If you don't know the answer or unable to obtain the information from the datastore, then tell the user so."
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.6
      }
],
    connections: {
      "AI Sales Agent": {
            "main": [
                  [
                        {
                              "node": "Reply To User",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "WhatsApp Trigger": {
            "main": [
                  [
                        {
                              "node": "Handle Message Types",
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
                              "node": "Product Catalogue",
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
                              "node": "Create Product Catalogue",
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
                              "node": "AI Sales Agent",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Product Catalogue": {
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
      "Vector Store Tool": {
            "ai_tool": [
                  [
                        {
                              "node": "AI Sales Agent",
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
                              "node": "Create Product Catalogue",
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
                              "node": "Vector Store Tool",
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
                              "node": "Create Product Catalogue",
                              "type": "ai_document",
                              "index": 0
                        }
                  ]
            ]
      },
      "Handle Message Types": {
            "main": [
                  [
                        {
                              "node": "AI Sales Agent",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Reply To User1",
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
                              "node": "AI Sales Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "get Product Brochure": {
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
                              "node": "get Product Brochure",
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
    name: "Business WhatsApp AI RAG Chatbot",
    nodes: [
      {
            "id": "2c5b2dd1-c63f-4bc9-909e-5f4b2a385d01",
            "name": "Respond to Webhook",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1020,
                  1040
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "text",
                  "responseBody": "={{ $json.query['hub.challenge'] }}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "cc230fcd-f88c-40d4-8835-ac9dc6228b18",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1560,
                  1380
            ],
            "parameters": {
                  "text": "={{ $('Respond').item.json.body.entry[0].changes[0].value.messages[0].text.body }}",
                  "agent": "conversationalAgent",
                  "options": {
                        "systemMessage": "You are an AI-powered assistant for an electronics store. Your primary goal is to assist customers by providing accurate and helpful information about products, troubleshooting tips, and general support. Use the provided knowledge base (retrieved documents) to answer questions with precision and professionalism.\n\n**Guidelines**:\n1. **Product Information**:\n - Provide detailed descriptions of products, including specifications, features, and compatibility.\n - Highlight key selling points and differences between similar products.\n - Mention availability, pricing, and promotions if applicable.\n\n2. **Technical Support**:\n - Offer step-by-step troubleshooting guides for common issues.\n - Suggest solutions for setup, installation, or configuration problems.\n - If the issue is complex, recommend contacting the store’s support team for further assistance.\n\n3. **Customer Service**:\n - Respond politely and professionally to all inquiries.\n - If a question is unclear, ask for clarification to provide the best possible answer.\n - For order-related questions (e.g., status, returns, or cancellations), guide customers on how to proceed using the store’s systems.\n\n4. **Knowledge Base Usage**:\n - Always reference the provided knowledge base (retrieved documents) to ensure accuracy.\n - If the knowledge base does not contain relevant information, inform the customer and suggest alternative resources or actions.\n\n5. **Tone and Style**:\n - Use a friendly, approachable, and professional tone.\n - Avoid technical jargon unless the customer demonstrates familiarity with the topic.\n - Keep responses concise but informative.\n\n**Example Interactions**:\n1. **Product Inquiry**:\n - Customer: \"What’s the difference between the XYZ Smartwatch and the ABC Smartwatch?\"\n - AI: \"The XYZ Smartwatch features a longer battery life (up to 7 days) and built-in GPS, while the ABC Smartwatch has a brighter AMOLED display and supports wireless charging. Both are compatible with iOS and Android devices. Would you like more details on either product?\"\n\n2. **Technical Support**:\n - Customer: \"My wireless router isn’t connecting to the internet.\"\n - AI: \"Please try the following steps: 1) Restart your router and modem. 2) Ensure all cables are securely connected. 3) Check if the router’s LED indicators show a stable connection. If the issue persists, you may need to reset the router to factory settings. Would you like a detailed guide for resetting your router?\"\n\n3. **Customer Service**:\n - Customer: \"How do I return a defective product?\"\n - AI: \"To return a defective product, please visit our Returns Portal on our website and enter your order number. You’ll receive a return label and instructions. If you need further assistance, our support team is available at support@electronicsstore.com.\"\n\n**Limitations**:\n- If the question is outside the scope of the knowledge base or requires human intervention, inform the customer and provide contact details for the appropriate department.\n- Do not provide speculative or unverified information. Always rely on the knowledge base or direct the customer to official resources."
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.7
      },
      {
            "id": "283df38d-1a2b-44d9-8e29-5e928ca1c4c9",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  740,
                  1260
            ],
            "parameters": {
                  "width": 459,
                  "height": 485,
                  "content": "# STEP 4\n\n## RAG System\n\n\n\n\n\n\n\n\n\n\n\n\n\n* *Respond* webhook receives various POST Requests from Meta regarding WhatsApp messages (user messages + status notifications)\n* Check if the incoming JSON contains user message\n* Echo back the text message to the user. This is a custom message, not a WhatsApp Business template message\n"
            },
            "typeVersion": 1
      },
      {
            "id": "b8f5ac53-03fe-4151-ac56-b246245702b6",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1560,
                  1580
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
                        "id": "CDX6QM4gLYanh0P4",
                        "name": "OpenAi account"
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "a02f4e76-1895-48ad-a2d5-6daf3347f181",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "position": [
                  460,
                  100
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "35a71dd7-ae08-46c5-acb2-e66d92b311cb",
            "name": "Qdrant Vector Store",
            "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
            "position": [
                  1440,
                  220
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
            "id": "1538c8b1-f914-4991-b311-e533df625c5f",
            "name": "Create collection",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  760,
                  -40
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
            "id": "423b73a6-2497-4635-9ad0-9e768f32018d",
            "name": "Refresh collection",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  760,
                  220
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
            "id": "9519866a-f28a-495a-9cb4-3b2170407943",
            "name": "Get folder",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  980,
                  220
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
            "id": "c9a36259-8340-4382-8bb0-84b73a8288c6",
            "name": "Download Files",
            "type": "n8n-nodes-base.googleDrive",
            "position": [
                  1200,
                  220
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
            "id": "b20975d7-e367-49a3-ac8c-613289775463",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "position": [
                  1420,
                  420
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
            "id": "4c2d02a4-c954-42c4-97b0-b94ee3198f56",
            "name": "Default Data Loader",
            "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
            "position": [
                  1600,
                  420
            ],
            "parameters": {
                  "options": {},
                  "dataType": "binary"
            },
            "typeVersion": 1
      },
      {
            "id": "72591129-1691-4caf-bf63-c04db85708dc",
            "name": "Token Splitter",
            "type": "@n8n/n8n-nodes-langchain.textSplitterTokenSplitter",
            "position": [
                  1560,
                  580
            ],
            "parameters": {
                  "chunkSize": 300,
                  "chunkOverlap": 30
            },
            "typeVersion": 1
      },
      {
            "id": "cc74592d-6562-4816-917c-0d88913a8125",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  1140
            ],
            "parameters": {
                  "color": 3,
                  "width": 405,
                  "height": 177,
                  "content": "## Important!\n### Configure the webhook nodes this way:\n* Make sure that both *Verify* and *Respond* have the same URL\n* *Verify* should have GET HTTP Method\n* *Respond* should have POST HTTP Method"
            },
            "typeVersion": 1
      },
      {
            "id": "9c8d4973-dcc5-4506-967f-3b3a5df501fa",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  740,
                  800
            ],
            "parameters": {
                  "color": 5,
                  "width": 618,
                  "height": 392,
                  "content": "# STEP 3\n\n## Create Webhook\n* Go to your [Meta for Developers App page](https://developers.facebook.com/apps/), navigate to the App settings\n* Add a **production webhook URL** as a new Callback URL\n* *Verify* webhook receives a GET Request and sends back a verification code\n* After that you can delete this\n"
            },
            "typeVersion": 1
      },
      {
            "id": "ec013e0c-a354-4f12-8ded-97013bb8fb21",
            "name": "Verify",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  780,
                  1040
            ],
            "webhookId": "f0d2e6f6-8fda-424d-b377-0bd191343c20",
            "parameters": {
                  "path": "f0d2e6f6-8fda-424d-b377-0bd191343c20",
                  "options": {},
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "253ddc93-5693-4362-aa6c-a80ab3f6df82",
            "name": "Respond",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  760,
                  1420
            ],
            "webhookId": "f0d2e6f6-8fda-424d-b377-0bd191343c20",
            "parameters": {
                  "path": "f0d2e6f6-8fda-424d-b377-0bd191343c20",
                  "options": {},
                  "httpMethod": "POST"
            },
            "typeVersion": 2
      },
      {
            "id": "2d4b956e-92d9-41da-a6d3-9f588e453d2a",
            "name": "is Message?",
            "type": "n8n-nodes-base.if",
            "position": [
                  980,
                  1420
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
                                    "id": "959fbffc-876a-4235-87be-2dedba4926cd",
                                    "operator": {
                                          "type": "object",
                                          "operation": "exists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.body.entry[0].changes[0].value.messages[0] }}",
                                    "rightValue": ""
                              }
                        ]
                  },
                  "looseTypeValidation": true
            },
            "typeVersion": 2.2
      },
      {
            "id": "2af633a9-f6b0-4989-9e85-abb619d2b3bb",
            "name": "Only message",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  1280,
                  1520
            ],
            "parameters": {
                  "textBody": "=You can only send text messages",
                  "operation": "send",
                  "phoneNumberId": "470271332838881",
                  "requestOptions": {},
                  "additionalFields": {},
                  "recipientPhoneNumber": "={{ $('Respond').item.json.body.entry[0].changes[0].value.contacts[0].wa_id }}"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "HDUOWQXeRXMVjo0Z",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5235dd06-2235-4edb-904e-872848e2ed79",
            "name": "Send",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  1980,
                  1380
            ],
            "parameters": {
                  "textBody": "={{ $json.output }}",
                  "operation": "send",
                  "phoneNumberId": "470271332838881",
                  "requestOptions": {},
                  "additionalFields": {},
                  "recipientPhoneNumber": "={{ $('Respond').item.json.body.entry[0].changes[0].value.contacts[0].wa_id }}"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "HDUOWQXeRXMVjo0Z",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "dafe692e-7767-4ded-966c-df812f58ae63",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1760,
                  1580
            ],
            "parameters": {},
            "typeVersion": 1.3
      },
      {
            "id": "ba6254bd-4dad-47bb-a535-7b6b708ea763",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  960,
                  -100
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
            "id": "83cf4483-cd45-4de6-9b88-e00727ed8352",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  740,
                  160
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
            "id": "4e0a4245-370f-4596-b01b-4eed8acbe2c3",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1520,
                  1260
            ],
            "parameters": {
                  "width": 380,
                  "height": 260,
                  "content": "## Configure AI Agent\nSet System prompt and chat model. If you want you can set any tools"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Verify": {
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
      "Respond": {
            "main": [
                  [
                        {
                              "node": "is Message?",
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
                              "node": "Send",
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
      "is Message?": {
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
                              "node": "Only message",
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
                              "node": "Qdrant Vector Store",
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
      "Default Data Loader": {
            "ai_document": [
                  [
                        {
                              "node": "Qdrant Vector Store",
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
    name: "Respond To WhatsApp Messages With AI Like A Pro!",
    nodes: [
      {
            "id": "38ffe41a-ecdf-4bb4-bd55-51998abab0f5",
            "name": "WhatsApp Trigger",
            "type": "n8n-nodes-base.whatsAppTrigger",
            "position": [
                  220,
                  300
            ],
            "webhookId": "0b1b3a9b-2f6a-4f5a-8385-6365d96f4802",
            "parameters": {
                  "updates": [
                        "messages"
                  ]
            },
            "credentials": {
                  "whatsAppTriggerApi": {
                        "id": "H3uYNtpeczKMqtYm",
                        "name": "WhatsApp OAuth account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a35ac268-eff0-46cd-ac4e-c9b047a3f893",
            "name": "Get Audio URL",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  1020,
                  -160
            ],
            "parameters": {
                  "resource": "media",
                  "operation": "mediaUrlGet",
                  "mediaGetId": "={{ $json.audio.id }}",
                  "requestOptions": {}
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a3be543c-949c-4443-bf82-e0d00419ae23",
            "name": "Get Video URL",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  1020,
                  200
            ],
            "parameters": {
                  "resource": "media",
                  "operation": "mediaUrlGet",
                  "mediaGetId": "={{ $json.video.id }}",
                  "requestOptions": {}
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "dd3cd0e7-0d1e-40cf-8120-aba0d1646d6d",
            "name": "Get Image URL",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  1020,
                  540
            ],
            "parameters": {
                  "resource": "media",
                  "operation": "mediaUrlGet",
                  "mediaGetId": "={{ $json.image.id }}",
                  "requestOptions": {}
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "a3505c93-2719-4a11-8813-39844fe0dd1a",
            "name": "Download Video",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1180,
                  200
            ],
            "parameters": {
                  "url": "={{ $json.url }}",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "whatsAppApi"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "b22e3a7d-5fa1-4b8d-be08-b59f5bb5c417",
            "name": "Download Audio",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1180,
                  -160
            ],
            "parameters": {
                  "url": "={{ $json.url }}",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "whatsAppApi"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "dcadbd30-598e-443b-a3a7-10d7f9210f49",
            "name": "Download Image",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1180,
                  540
            ],
            "parameters": {
                  "url": "={{ $json.url }}",
                  "options": {},
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "whatsAppApi"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "d38b6f73-272e-4833-85fc-46ce0db91f6a",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  2380,
                  560
            ],
            "parameters": {
                  "sessionKey": "=whatsapp-tutorial-{{ $json.from }}",
                  "sessionIdType": "customKey"
            },
            "typeVersion": 1.2
      },
      {
            "id": "3459f96b-c0de-4514-9d53-53a9b40d534e",
            "name": "Get User's Message",
            "type": "n8n-nodes-base.set",
            "position": [
                  2080,
                  380
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "d990cbd6-a408-4ec4-a889-41be698918d9",
                                    "name": "message_type",
                                    "type": "string",
                                    "value": "={{ $('Split Out Message Parts').item.json.type }}"
                              },
                              {
                                    "id": "23b785c3-f38e-4706-80b7-51f333bba3bd",
                                    "name": "message_text",
                                    "type": "string",
                                    "value": "={{ $json.text }}"
                              },
                              {
                                    "id": "6e83f9a7-cf75-4182-b2d2-3151e8af76b9",
                                    "name": "from",
                                    "type": "string",
                                    "value": "={{ $('WhatsApp Trigger').item.json.messages[0].from }}"
                              },
                              {
                                    "id": "da4b602a-28ca-4b0d-a747-c3d3698c3731",
                                    "name": "message_caption",
                                    "type": "string",
                                    "value": "={{ $('Redirect Message Types').item.json.video && $('Redirect Message Types').item.json.video.caption || '' }}\n{{ $('Redirect Message Types').item.json.image && $('Redirect Message Types').item.json.image.caption || ''}}\n{{ $('Redirect Message Types').item.json.audio && $('Redirect Message Types').item.json.audio.caption || ''}}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "7a4c9905-37f0-4cfe-a928-91c7e38914b9",
            "name": "Split Out Message Parts",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  460,
                  300
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "messages"
            },
            "typeVersion": 1
      },
      {
            "id": "f2ecc9a9-bdd9-475d-be0c-43594d0cb613",
            "name": "Wikipedia",
            "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
            "position": [
                  2500,
                  560
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "325dac6d-6698-41e0-8d2f-9ac5d84c245e",
            "name": "Redirect Message Types",
            "type": "n8n-nodes-base.switch",
            "position": [
                  740,
                  380
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Audio Message",
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
                                                            "type": "boolean",
                                                            "operation": "true",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.type == 'audio' && Boolean($json.audio) }}",
                                                      "rightValue": "audio"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Video Message",
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
                                                      "id": "82aa5ff4-c9b6-4187-a27e-c7c5d9bfdda0",
                                                      "operator": {
                                                            "type": "boolean",
                                                            "operation": "true",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.type == 'video' && Boolean($json.video) }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Image Message",
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
                                                      "id": "05b30af4-967b-4824-abdc-84a8292ac0e5",
                                                      "operator": {
                                                            "type": "boolean",
                                                            "operation": "true",
                                                            "singleValue": true
                                                      },
                                                      "leftValue": "={{ $json.type == 'image' && Boolean($json.image) }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "extra",
                        "renameFallbackOutput": "Text Message"
                  }
            },
            "typeVersion": 3.2
      },
      {
            "id": "b25c7d65-b9ea-4f90-8516-1747130501b2",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  220,
                  20
            ],
            "parameters": {
                  "color": 7,
                  "width": 335.8011507479863,
                  "height": 245.72612197928734,
                  "content": "## 1. WhatsApp Trigger\n[Learn more about the WhatsApp Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger)\n\nTo start receiving WhatsApp messages in your workflow, there are quite a few steps involved so be sure to follow the n8n documentation. When we recieve WhatsApp messages, we'll split out the messages part of the payload and handle them depending on the message type using the Switch node."
            },
            "typeVersion": 1
      },
      {
            "id": "0d3d721e-fefc-4b50-abe1-0dd504c962ff",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1020,
                  -280
            ],
            "parameters": {
                  "color": 7,
                  "width": 356.65822784810103,
                  "height": 97.23360184119679,
                  "content": "### 2. Transcribe Audio Messages 💬\nFor audio messages or voice notes, we can use GPT4o to transcribe the message for our AI Agent."
            },
            "typeVersion": 1
      },
      {
            "id": "59de051e-f0d4-4c07-9680-03923ab81f57",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1020,
                  40
            ],
            "parameters": {
                  "color": 7,
                  "width": 492.5258918296896,
                  "height": 127.13555811277331,
                  "content": "### 3. Describe Video Messages 🎬\nFor video messages, one approach is to use a Multimodal Model that supports parsing video. Currently, Google Gemini is a well-tested service for this task. We'll need to use the HTTP request node as currrently n8n's LLM node doesn't currently support video binary types."
            },
            "typeVersion": 1
      },
      {
            "id": "e2ca780f-01c0-4a5f-9f0a-e15575d0b803",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1020,
                  420
            ],
            "parameters": {
                  "color": 7,
                  "width": 356.65822784810103,
                  "height": 97.23360184119679,
                  "content": "### 4. Analyse Image Messages 🏞️\nFor image messages, we can use GPT4o to explain what is going on in the message for our AI Agent."
            },
            "typeVersion": 1
      },
      {
            "id": "6eea3c0f-4501-4355-b3b7-b752c93d5c48",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1020,
                  720
            ],
            "parameters": {
                  "color": 7,
                  "width": 428.24395857307246,
                  "height": 97.23360184119679,
                  "content": "### 5. Text summarizer 📘\nFor text messages, we don't need to do much transformation but it's nice to summarize for easier understanding."
            },
            "typeVersion": 1
      },
      {
            "id": "925a3871-9cdb-49f9-a2b9-890617d09965",
            "name": "Get Text",
            "type": "n8n-nodes-base.wait",
            "position": [
                  1020,
                  840
            ],
            "webhookId": "99b49c83-d956-46d2-b8d3-d65622121ad9",
            "parameters": {
                  "amount": 0
            },
            "typeVersion": 1.1
      },
      {
            "id": "9225a6b9-322a-4a33-86af-6586fcf246b9",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2280,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 500.7797468354428,
                  "height": 273.14522439585744,
                  "content": "## 6. Generate Response with AI Agent\n[Read more about the AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)\n\nNow that we'll able to handle all message types from WhatsApp, we could do pretty much anything we want with it by giving it our AI agent. Examples could include handling customer support, helping to book appointments or verifying documents.\n\nIn this demonstration, we'll just create a simple AI Agent which responds to our WhatsApp user's message and returns a simple response."
            },
            "typeVersion": 1
      },
      {
            "id": "5a863e5d-e7fb-4e89-851b-e0936f5937e7",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2740,
                  660
            ],
            "parameters": {
                  "color": 7,
                  "width": 384.12151898734186,
                  "height": 211.45776754890682,
                  "content": "## 7. Respond to WhatsApp User\n[Read more about the Whatsapp node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/)\n\nTo close out this demonstration, we'll simple send a simple text message back to the user. Note that this WhatsApp node also allows you to send images, audio, videos, documents as well as location!"
            },
            "typeVersion": 1
      },
      {
            "id": "89df6f6c-2d91-4c14-a51a-4be29b1018ec",
            "name": "Respond to User",
            "type": "n8n-nodes-base.whatsApp",
            "position": [
                  2740,
                  480
            ],
            "parameters": {
                  "textBody": "={{ $json.output }}",
                  "operation": "send",
                  "phoneNumberId": "477115632141067",
                  "requestOptions": {},
                  "additionalFields": {},
                  "recipientPhoneNumber": "={{ $('WhatsApp Trigger').item.json.messages[0].from }}"
            },
            "credentials": {
                  "whatsAppApi": {
                        "id": "9SFJPeqrpChOkAmw",
                        "name": "WhatsApp account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "67709b9e-a9b3-456b-9e68-71720b0cd75e",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -340,
                  -140
            ],
            "parameters": {
                  "width": 470.66513233601853,
                  "height": 562.8608514850005,
                  "content": "## Try It Out!\n\n### This n8n template demonstrates the beginnings of building your own n8n-powered WhatsApp chatbot! Under the hood, utilise n8n's powerful AI features to handle different message types and use an AI agent to respond to the user. A powerful tool for any use-case!\n\n* Incoming WhatsApp Trigger provides a way to get messages into the workflow.\n* The message received is extracted and sent through 1 of 4 branches for processing.\n* Each processing branch uses AI to analyse, summarize or transcribe the message so that the AI agent can understand it.\n* The AI Agent is used to generate a response generally and uses a wikipedia tool for more complex queries.\n* Finally, the response message is sent back to the WhatsApp user using the WhatsApp node.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!"
            },
            "typeVersion": 1
      },
      {
            "id": "10ae1f60-c025-4b63-8e02-4e6353bb67dc",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -340,
                  440
            ],
            "parameters": {
                  "color": 5,
                  "width": 473.28063885246377,
                  "height": 96.0144533433243,
                  "content": "### Activate workflow to use!\nYou must activate the workflow to use this WhatsApp Chabot. If you are self-hosting, ensure WhatsApp is able to connect to your server."
            },
            "typeVersion": 1
      },
      {
            "id": "2f0fd658-a138-4f50-95a7-7ddc4eb90fab",
            "name": "Image Explainer",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1700,
                  540
            ],
            "parameters": {
                  "text": "Here is an image sent by the user. Describe the image and transcribe any text visible in the image.",
                  "messages": {
                        "messageValues": [
                              {
                                    "type": "HumanMessagePromptTemplate",
                                    "messageType": "imageBinary"
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "d969ce8b-d6c4-4918-985e-3420557ef707",
            "name": "Format Response",
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
                                    "id": "2ec0e573-373b-4692-bfae-86b6d3b9aa9a",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $json.candidates[0].content.parts[0].text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "b67c9c4e-e13f-4ee4-bf01-3fd9055a91be",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1540,
                  180
            ],
            "parameters": {
                  "width": 260,
                  "height": 305.35604142692785,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Google Gemini Required!\nNot using Gemini? Feel free to swap this out for any Multimodal Model that supports Video."
            },
            "typeVersion": 1
      },
      {
            "id": "8dd972be-305b-4d26-aa05-1dee17411d8a",
            "name": "Google Gemini Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  2240,
                  560
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-pro-002"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "dSxo6ns5wn658r8N",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "00a883a6-7688-4e82-926b-c5ba680378b7",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1540,
                  -180
            ],
            "parameters": {
                  "width": 260,
                  "height": 294.22048331415436,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n### 🚨 Google Gemini Required!\nNot using Gemini? Feel free to swap this out for any Multimodal Model that supports Audio."
            },
            "typeVersion": 1
      },
      {
            "id": "d0c7c2f6-b626-4ec5-86ff-96523749db2c",
            "name": "Google Gemini Audio",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  -160
            ],
            "parameters": {
                  "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={{\n{\n \"contents\": [{\n \"parts\":[\n {\"text\": \"Transcribe this audio\"},\n {\"inlineData\": {\n \"mimeType\": `audio/${$binary.data.fileExtension}`,\n \"data\": $input.item.binary.data.data }\n }\n ]\n }]\n}\n}}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  },
                  "nodeCredentialType": "googlePalmApi"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "dSxo6ns5wn658r8N",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "27261815-f949-48e8-920d-7bf880ea87ce",
            "name": "Google Gemini Video",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  200
            ],
            "parameters": {
                  "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "={{\n{\n \"contents\": [{\n \"parts\":[\n {\"text\": \"Describe this video\"},\n {\"inlineData\": {\n \"mimeType\": `video/${$binary.data.fileExtension}`,\n \"data\": $input.item.binary.data.data }\n }\n ]\n }]\n}\n}}",
                  "sendBody": true,
                  "sendHeaders": true,
                  "specifyBody": "json",
                  "authentication": "predefinedCredentialType",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "Content-Type",
                                    "value": "application/json"
                              }
                        ]
                  },
                  "nodeCredentialType": "googlePalmApi"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "dSxo6ns5wn658r8N",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "7e28786b-ab19-4969-9915-2432a25b49d3",
            "name": "Google Gemini Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  1680,
                  680
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-pro-002"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "dSxo6ns5wn658r8N",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "8832dac3-9433-4dcc-a805-346408042bf2",
            "name": "Google Gemini Chat Model2",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  1680,
                  980
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-pro-002"
            },
            "credentials": {
                  "googlePalmApi": {
                        "id": "dSxo6ns5wn658r8N",
                        "name": "Google Gemini(PaLM) Api account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "73d0af9e-d009-4859-b60d-48a2fbeda932",
            "name": "Format Response1",
            "type": "n8n-nodes-base.set",
            "position": [
                  1860,
                  -160
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "2ec0e573-373b-4692-bfae-86b6d3b9aa9a",
                                    "name": "text",
                                    "type": "string",
                                    "value": "={{ $json.candidates[0].content.parts[0].text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "2ad0e104-0924-47ef-ad11-d84351d72083",
            "name": "Text Summarizer",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1700,
                  840
            ],
            "parameters": {
                  "text": "={{ $json.text.body || $json.text }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "Summarize the user's message succinctly."
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.4
      },
      {
            "id": "85eaad3a-c4d1-4ae7-a37b-0b72be39409d",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2280,
                  380
            ],
            "parameters": {
                  "text": "=The user sent the following message\nmessage type: {{ $json.message_type }}\nmessage text or description:\n```{{ $json.message_text }}```\n{{ $json.message_caption ? `message caption: ${$json.message_caption.trim()}` : '' }}",
                  "options": {
                        "systemMessage": "You are a general knowledge assistant made available to the public via whatsapp. Help answer the user's query succiently and factually."
                  },
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
                              "node": "Respond to User",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Text": {
            "main": [
                  [
                        {
                              "node": "Text Summarizer",
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
      "Get Audio URL": {
            "main": [
                  [
                        {
                              "node": "Download Audio",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Image URL": {
            "main": [
                  [
                        {
                              "node": "Download Image",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Video URL": {
            "main": [
                  [
                        {
                              "node": "Download Video",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Download Audio": {
            "main": [
                  [
                        {
                              "node": "Google Gemini Audio",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Download Image": {
            "main": [
                  [
                        {
                              "node": "Image Explainer",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Download Video": {
            "main": [
                  [
                        {
                              "node": "Google Gemini Video",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format Response": {
            "main": [
                  [
                        {
                              "node": "Get User's Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Image Explainer": {
            "main": [
                  [
                        {
                              "node": "Get User's Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Text Summarizer": {
            "main": [
                  [
                        {
                              "node": "Get User's Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Format Response1": {
            "main": [
                  [
                        {
                              "node": "Get User's Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "WhatsApp Trigger": {
            "main": [
                  [
                        {
                              "node": "Split Out Message Parts",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get User's Message": {
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
      "Google Gemini Audio": {
            "main": [
                  [
                        {
                              "node": "Format Response1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Gemini Video": {
            "main": [
                  [
                        {
                              "node": "Format Response",
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
      "Redirect Message Types": {
            "main": [
                  [
                        {
                              "node": "Get Audio URL",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get Video URL",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get Image URL",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Get Text",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Split Out Message Parts": {
            "main": [
                  [
                        {
                              "node": "Redirect Message Types",
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
      "Google Gemini Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Image Explainer",
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
                              "node": "Text Summarizer",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      }
},
    settings: {},
  },
];

export function WhatsappCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-500/25 border border-green-600' : 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700/50 hover:bg-green-100 dark:hover:bg-green-500/20 hover:border-green-300 dark:hover:border-green-600/50 hover:shadow-md'}`}
    >
      <MessageCircle className={`w-4 h-4 ${isActive ? 'text-white' : 'text-green-500 dark:text-green-400'}`} />
      <span className="truncate max-w-[200px]">WhatsApp</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {whatsappTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function WhatsappTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {whatsappTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-green-300 dark:hover:border-green-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-green-50/50 dark:group-hover:to-green-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-green-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <MessageCircle className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-green-600 dark:hover:bg-green-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
