import React from 'react';
import { Play, Hash } from 'lucide-react';
import { IN8nTemplate } from './templateUtils';

export const slackTemplates: IN8nTemplate[] = [
  {
    name: "AI-Powered Information Monitoring with OpenAI, Google Sheets, Jina AI and Slack",
    nodes: [
      {
            "id": "704de862-43e5-4322-ae35-45b505e68bb6",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  4220,
                  380
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "",
                        "name": "OpenAi Connection"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "eaae54b0-0500-47a7-ad8f-097e0882d21c",
            "name": "Basic LLM Chain",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  4180,
                  -120
            ],
            "parameters": {
                  "text": "={{ $json.data }}",
                  "messages": {
                        "messageValues": [
                              {
                                    "message": "=You are an AI assistant responsible for summarizing articles **in English** and formatting them into Slack-compatible messages. \nYour job is to create a clear and concise summary following the guidelines below and format it in Slack-specific Markdown format. \n\n---\n\n## 1. Title with Link \n\n- Format the article title as a **clickable link** using Slack's Markdown syntax: \n `<URL|*Title of the article*>`. \n- The title should be clear and engaging to encourage readers to click. \n\n---\n\n## 2. Section Headings \n\n- Use **bold text** to introduce different sections of the summary by wrapping the text with `*` symbols. \n- Ensure headings are descriptive and guide the reader through the content effectively. \n\n---\n\n## 3. Key Points \n\n- Present key insights using **bullet points**, using the `•` symbol for listing important information. \n- Each point should be concise, informative, and directly related to the article's topic. \n\n---\n\n## 4. Content Summary \n\n- Provide a brief but comprehensive overview of the article's content. \n- Use plain text and line breaks to separate paragraphs for improved readability. \n- Focus on the most important aspects without unnecessary details. \n\n---\n\n## 5. Context and Relevance \n\n- Explain why the article is important and how it relates to the reader's interests. \n- Highlight its relevance to ongoing trends or industry developments. \n\n---\n\n## Message Structure \n\nThe output should follow this structured format: \n\n1. **Title with link** – Present the article as a clickable link formatted in Slack Markdown. \n2. **Summary sections** – Organized under clear headings to enhance readability. \n3. **Key insights** – Presented as bullet points for quick scanning. \n4. **Contextual analysis** – A brief explanation of the article's relevance and importance. \n\n---\n\n## Slack Markdown Formatting Guide \n\nEnsure the message follows Slack's Markdown syntax for proper display: \n\n- **Bold text:** Use `*bold text*`. \n- **Italic text:** Use `_italic text_`. \n- **Bullet points:** Use `•` or `-` for lists. \n- **Links:** Format as `<URL|*text*>` to create clickable links. \n- **Line breaks:** Use a blank line to separate paragraphs for readability. \n\n---\n\n## Example of Slack-formatted Output \n\n🔔 *New article from n8n Blog* \n\n<https://blog.n8n.io/self-hosted-ai/|*Introducing the Self-hosted AI Starter Kit: Run AI locally for privacy-first solutions*> \n\n*Summary of the article* \nn8n has launched the Self-hosted AI Starter Kit, a Docker Compose template designed to simplify the deployment of local AI tools. This initiative addresses the growing need for on-premise AI solutions that enhance data privacy and reduce reliance on external APIs. The starter kit includes tools like Ollama, Qdrant, and PostgreSQL, providing a foundation for building self-hosted AI workflows. While it's tailored for proof-of-concept projects, users can customize it to fit specific requirements. \n\n*Key Points* \n• The Self-hosted AI Starter Kit facilitates quick setup of local AI environments using Docker Compose. \n• It includes preconfigured AI workflow templates and essential tools such as Ollama, Qdrant, and PostgreSQL. \n• Running AI on-premise offers benefits like improved data privacy and cost savings by minimizing dependence on external API calls. \n• The kit is designed for easy deployment on local machines or personal cloud instances like Digital Ocean and runpod.io. \n• n8n emphasizes the flexibility of their platform, allowing integration with over 400 services, including Google, Slack, Twilio, and JIRA, to streamline AI application development. \n\n*Context and Relevance* \nThis article introduces a practical solution for organizations and developers seeking to implement AI workflows locally. By providing a ready-to-use starter kit, n8n addresses common challenges associated with setting up and maintaining on-premise AI systems, promoting greater control over data and potential cost efficiencies.\n \n---\n\nEnsure that the message is formatted according to Slack's requirements to improve readability and engagement. \n"
                              }
                        ]
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.5
      },
      {
            "id": "a3a10ccd-26f9-4b05-a79f-8754f619c153",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -840,
                  120
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
            "id": "54ed8957-39be-4ad4-bea7-f56308d75a91",
            "name": "RSS Read",
            "type": "n8n-nodes-base.rssFeedRead",
            "onError": "continueRegularOutput",
            "position": [
                  800,
                  120
            ],
            "parameters": {
                  "url": "={{ $json.rss_feed_url }}",
                  "options": {
                        "ignoreSSL": false
                  }
            },
            "executeOnce": false,
            "typeVersion": 1.1
      },
      {
            "id": "1ec53a9a-ca21-4da2-ab94-55b863a27aff",
            "name": "Relevance Classification for Topic Monitoring",
            "type": "@n8n/n8n-nodes-langchain.textClassifier",
            "position": [
                  2380,
                  -20
            ],
            "parameters": {
                  "options": {
                        "fallback": "discard"
                  },
                  "inputText": "={{ $json.title }}\n{{ $json.contentSnippet }}",
                  "categories": {
                        "categories": [
                              {
                                    "category": "relevant",
                                    "description": "Articles related to artificial intelligence (AI), data science, machine learning, algorithms, big data, or innovations in these fields."
                              },
                              {
                                    "category": "not_relevant",
                                    "description": "Articles not directly related to artificial intelligence (AI), data science, machine learning, algorithms, big data, or innovations in these fields."
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "840431b1-cf2e-45e2-a79c-cab90f46a452",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2240,
                  -480
            ],
            "parameters": {
                  "color": 7,
                  "width": 600,
                  "height": 960,
                  "content": "## LLM Call 1 - Article Topic Relevance Classification \n\nThis **LLM call** is used to **classify** whether the articles published on the website are **relevant** to the **topics and interests** you want to monitor. \nIt analyzes the **title** and the **content snippet** retrieved from the **RSS Read** node. \n\nIn this template, the monitored articles are related to **data and AI.** \nThe classification is done into **two categories**, which you should modify in the `Description` field under the **Categories** section of the node:\n\n### Relevant \n`Description`: Articles related to **[The topics you want to monitor]**. \n\n### Not Relevant \n`Description`: Articles that are not directly related to **[The topics you want to monitor]**.\n\nBy default, this template monitors topics related to artificial intelligence (AI), data science, machine learning, algorithms, big data, and innovations in these fields.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "7dbc2246-9e1a-4c2e-a051-703e10e5fa0e",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4020,
                  -660
            ],
            "parameters": {
                  "color": 7,
                  "width": 600,
                  "height": 680,
                  "content": "## LLM Call 2 - Summarize and Format in Slack Markdown \n\nThis node **uses OpenAI's GPT-4o-mini model** to **summarize the article content**, which is provided as **Markdown text** from Jina AI, and formats it in **Slack Markdown** to enhance readability within Slack. \n\n### Customize to fit your needs \n\nHere are two examples of how you can modify the **System Prompt** of this node to better suit your requirements: \n\n- **Language customization:** \n You can modify the **System Prompt** to instruct the LLM to generate the summary in a specific language (e.g., French or Italian). \n However, consider the option of adding a separate LLM node **dedicated to translation** if the model cannot handle **summarization, formatting, and translation** simultaneously while maintaining high output quality.\n\n- **Changing the summary structure:** \n You can adjust the prompt to modify how the summary is structured to better match your preferred format and style.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "b472f924-81d9-4b99-8620-d95b286800c5",
            "name": "Google Sheets - Get RSS Feed url followed",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  260,
                  120
            ],
            "parameters": {
                  "options": {},
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gid=0",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit#gid=0",
                        "cachedResultName": "rss_feed"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit?usp=drivesdk",
                        "cachedResultName": "Template - AI-Powered Information Monitoring"
                  },
                  "authentication": "serviceAccount"
            },
            "credentials": {
                  "googleApi": {
                        "id": "",
                        "name": "Google Sheets account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 4.5
      },
      {
            "id": "c2a571f0-614f-41cf-b0b0-db4c714a8ab8",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  80,
                  -480
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 960,
                  "content": "## Google Sheets - Get RSS Feed URLs Followed \nThis node **retrieves rows** from the Google Sheet that contains the **RSS feed URLs** you follow. \nIt is configured to run only once per execution, meaning that even if the previous node outputs many items, this node will execute only once. \n\nYou can **add more URLs** to your sheet, but keep in mind that following **more RSS feeds** will increase the **cost of LLM API usage** (e.g., OpenAI). \n\nYou can access the **Google Sheet template** to copy and use in this workflow [here](https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/). \n(*This is the same template used in the previous node.*)\n\nIn this node, make sure to select the **\"rss_feed\"** sheet from your **copied version of the Google Sheet template**. \nThis sheet contains the list of RSS feed URLs that the workflow will process."
            },
            "typeVersion": 1
      },
      {
            "id": "90e34a2f-f326-4c83-ae26-d8f38d983c21",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  620,
                  -480
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 960,
                  "content": "## RSS Read \nThis node **reads** the RSS feed. \nThe RSS URL is **retrieved** from the data you have entered in **Google Sheets**, so make sure the URL provided is indeed a **valid RSS feed**. \n\n### What is an RSS feed? \nAn **RSS feed** is a **web feed** that allows users to **automatically receive updates** from websites, such as **news sites** or **blogs**, in a **standardized format**.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "06c22fcc-6fb6-4646-8cd2-3e2c48a56fbc",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2940,
                  -480
            ],
            "parameters": {
                  "color": 7,
                  "width": 960,
                  "height": 500,
                  "content": "## Jina AI - Read URL\n\nThis node **uses the Jina AI API** to **retrieve the content** of articles that were classified as **\"relevant\"** in the previous step. \nSince this process **involves web scraping**, ensure that it complies with the **scraping regulations** in your country. \n\n### What is Jina AI? \n**Jina AI** is an API that allows you to **extract webpage content** and convert it into a format that is **ready for LLM processing**, such as **Markdown**. \n\nYou can create an account [here](https://jina.ai/) and receive **1,000,000 free tokens** for testing. \nHowever, the service can also be used **without an API key** (without an account), though with **reduced RPM (requests per minute)**. \nFor this workflow, the default RPM limits should generally be sufficient.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "3f8a0ce3-d7b3-400b-bc03-1a233f441429",
            "name": "Slack1",
            "type": "n8n-nodes-base.slack",
            "position": [
                  4940,
                  -120
            ],
            "webhookId": "",
            "parameters": {
                  "text": "={{ $json.text }}",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "C0898R9G7JP",
                        "cachedResultName": "topic-monitoring"
                  },
                  "otherOptions": {},
                  "authentication": "oAuth2"
            },
            "credentials": {
                  "slackOAuth2Api": {
                        "id": "",
                        "name": "slack-topic-monitoring"
                  }
            },
            "typeVersion": 2.3
      },
      {
            "id": "6920300f-fd0e-41dc-adf6-ed5a3a267b3f",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -460,
                  -480
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 960,
                  "content": "## Google Sheets - Get Article Monitored Database \nThis node **retrieves rows** from the Google Sheet that contains articles **already monitored and summarized** by the workflow. \nDepending on the RSS feed you monitor, **URLs may remain in the feed for a long time**, and you don't want to monitor the same URL **twice**. \nYou can find the **Google Sheet template** that you can copy and use in this workflow [here](https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit?gid=1966921272#gid=1966921272).\n\nIn this node, make sure to select the **\"article_database\"** sheet from your **copied version of the Google Sheet template**. \nThis sheet is used to store and manage the articles processed by the workflow.\n\n\n---\n\n## Set Field - existing_url \n\nThis node sets the **\"existing_url\"** field with the value from **\"article_url\"** in the Google Sheets database. \nDuring the **first execution** of the workflow, this field will be **empty**, as no articles are present in Google Sheets yet. \nAn error may occur in this case; however, the workflow will **continue running** without interruption.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "204aab36-1081-4d6e-b3a3-2fc03b6a1a10",
            "name": "Sticky Note9",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1180,
                  -480
            ],
            "parameters": {
                  "color": 7,
                  "width": 980,
                  "height": 960,
                  "content": "## Code Node to Filter Existing URLs\n\nThis code node filters URLs that have **not yet been summarized by AI.** \nIt outputs:\n\n- A **list of URLs** following the RSS Read schema if new URLs are found.\n- An item called **\"message\"** with the value **\"No new articles found\"** if no new articles are available in your RSS feed.\n\n---\n\n## IF Node\n\nThe condition for this node is: `{{ $json.message }}` *not equal to* **\"No new articles found\"**.\n\n- **False** → The workflow executes the \"No Operation, do nothing\" node.\n- **True** → The workflow proceeds to process the new articles for your web development industry monitoring.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "ef83c5f9-12a7-4924-9356-d1307fc8f279",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2940,
                  60
            ],
            "parameters": {
                  "color": 7,
                  "width": 960,
                  "height": 580,
                  "content": "## Set Fields - Not Relevant Articles \n\nThis node prepares the data to be added to the Google Sheet by defining the following fields: \n\n- **`article_url`** – The article's URL.\n- **`summarized`** – Always set to `\"NO (not relevant)\"`, as it belongs to the **\"not_relevant\"** path. \n- **`website`** – The website where the article URL was published. \n- **`fetched_at`** – The timestamp when the URL was processed by the workflow. \n > *(Note: This timestamp reflects when the scenario was triggered, as obtained from the **Schedule Trigger** node, not the exact fetch time.)* \n- **`publish_date`** – The date the article was published. \n\n---\n\n## Google Sheets - Add Not Relevant Articles\n\nThis node adds the prepared data to the **\"article_database\"** sheet in your copied Google Sheet template. \nEnsure that you select the **\"article_database\"** sheet when configuring this node. \n"
            },
            "typeVersion": 1
      },
      {
            "id": "10af053d-23f6-416b-9fe2-874dfc2ec7aa",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4020,
                  80
            ],
            "parameters": {
                  "color": 5,
                  "width": 600,
                  "height": 440,
                  "content": "## OpenAI Chat Model \n\nThis node specifies the **AI model** to be used for processing. \nThe default model is **GPT-4o-mini**, which has been **tested** and proven to perform well for this task. \n\n**GPT-4o-mini** is a **cost-efficient** model, offering a good balance between **performance and affordability**, making it suitable for regular usage without incurring high costs.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "67e6b0f9-32fc-4dcf-ae1b-effe11b31cd1",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4680,
                  -640
            ],
            "parameters": {
                  "color": 7,
                  "width": 600,
                  "height": 680,
                  "content": "## Slack - Send Article Summary \n\nThis node **posts the message** to the designated Slack channel, containing the **output generated by the LLM.** \n\nFor better organization and accessibility, it is recommended to use a **dedicated Slack channel** specifically for topic monitoring. \nThis ensures that team members can easily access relevant summaries without cluttering other discussions. \n\n\n### Why not use Slack Tool Calling? \n\nAfter extensive testing, the output from the previous node has proven to be **highly effective**, making it unnecessary to use **tool calling** or an **AI agent.** 😀 \nKeeping things simple **streamlines the workflow** and reduces complexity.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "afe7643d-618b-4798-851e-b8b9d024e792",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  4700,
                  80
            ],
            "parameters": {
                  "color": 7,
                  "width": 1260,
                  "height": 560,
                  "content": "## Set Fields - Relevant Articles \n\nThis node prepares the data to be added to the Google Sheet by defining the following fields: \n\n- **`article_url`** – The article's URL. \n- **`summarized`** – Always set to `\"YES\"`, as it follows the **\"relevant\"** path. \n- **`summary`** – The article summary that was posted to Slack. \n- **`website`** – The source website where the article was published. \n- **`fetched_at`** – The timestamp indicating when the URL was processed by the workflow. \n > *(Note: This timestamp reflects when the data was added to Google Sheets, not the actual fetch time.)* \n- **`publish_date`** – The date the article was published. \n\n---\n\n## Google Sheets - Add Relevant Articles\n\nThis node adds the prepared data to the **\"article_database\"** sheet in your copied Google Sheet template. \nMake sure to select the **\"article_database\"** sheet when configuring this node. \n"
            },
            "typeVersion": 1
      },
      {
            "id": "e87619df-48e3-4ef8-83c7-1695746e2b92",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1000,
                  -280
            ],
            "parameters": {
                  "color": 7,
                  "width": 460,
                  "height": 600,
                  "content": "## Scheduler \nThis **trigger** is a **scheduler** that defines **how often the workflow is executed**. \nBy default, the **template is set to every 1 hour**, meaning the workflow will check **every hour** if **new articles** have been added to the **RSS feed** you follow.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "e2bcd684-abd9-4f47-bf4c-12eac379432d",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -1900,
                  -720
            ],
            "parameters": {
                  "color": 6,
                  "width": 780,
                  "height": 1300,
                  "content": "# Workflow Overview\n\n## Check Legal Regulations:\nThis workflow involves scraping, so ensure you comply with the legal regulations in your country before getting started. Better safe than sorry!\n\n## 📌 Purpose \nThis workflow enables **automated and AI-driven topic monitoring**, delivering **concise article summaries** directly to a **Slack channel** in a structured and easy-to-read format. \nIt allows users to stay informed on specific topics of interest effortlessly, without manually checking multiple sources, ensuring a **time-efficient and focused** monitoring experience. \n\n**To get started, copy the Google Sheets template required for this workflow from [here](https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY).** \n\n\n## 🎯 Target Audience \nThis workflow is designed for: \n- **Industry professionals** looking to track key developments in their field. \n- **Research teams** who need up-to-date insights on specific topics. \n- **Companies** aiming to keep their teams informed with relevant content. \n\n## ⚙️ How It Works \n1. **Trigger:** A **Scheduler** initiates the workflow at regular intervals (default: every hour). \n2. **Data Retrieval:** \n - RSS feeds are fetched using the **RSS Read** node. \n - Previously monitored articles are checked in **Google Sheets** to avoid duplicates. \n3. **Content Processing:** \n - The article relevance is assessed using **OpenAI (GPT-4o-mini)**. \n - Relevant articles are scraped using **Jina AI** to extract content. \n - Summaries are generated and formatted for Slack. \n4. **Output:** \n - Summaries are posted to the specified Slack channel. \n - Article metadata is stored in **Google Sheets** for tracking. \n\n## 🛠️ Key APIs and Nodes Used \n- **Scheduler Node:** Triggers the workflow periodically. \n- **RSS Read:** Fetches the latest articles from defined RSS feeds. \n- **Google Sheets:** Stores monitored articles and manages feed URLs. \n- **OpenAI API (GPT-4o-mini):** Classifies article relevance and generates summaries. \n- **Jina AI API:** Extracts the full content of relevant articles. \n- **Slack API:** Posts formatted messages to Slack channels. \n\n---\n\nThis workflow provides an **efficient and intelligent way** to stay informed about your topics of interest, directly within Slack.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "d72f505d-2bbf-41db-b404-8a61b8c21452",
            "name": "Google Sheets - Get article monitored database",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  -400,
                  120
            ],
            "parameters": {
                  "options": {},
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1966921272,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit#gid=1966921272",
                        "cachedResultName": "article_database"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit?usp=drivesdk",
                        "cachedResultName": "Template - AI-Powered Information Monitoring"
                  },
                  "authentication": "serviceAccount"
            },
            "credentials": {
                  "googleApi": {
                        "id": "",
                        "name": "Google Sheets account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 4.5,
            "alwaysOutputData": true
      },
      {
            "id": "08eae799-2682-4d49-81fa-2127a65d887b",
            "name": "Code",
            "type": "n8n-nodes-base.code",
            "position": [
                  1280,
                  120
            ],
            "parameters": {
                  "jsCode": "// Retrieve data from RSS feed and Google Sheets\nconst rssItems = items; // Contains RSS articles\nconst sheetItems = $items(\"Set field - existing_url\", 0);\n\n// Extract the links of articles present in Google Sheets\nconst existingUrls = sheetItems.map(entry => entry.json.existing_url);\n\n// Filter RSS articles to keep only those not present in Google Sheets\nconst newArticles = rssItems.filter(rssItem => {\n return !existingUrls.includes(rssItem.json.link);\n});\n\n// If new articles are found, return them\nif (newArticles.length > 0) {\n return newArticles;\n}\n\n// If no new articles, return an informational message\nreturn [{ json: { message: \"No new articles found.\" } }];\n\n"
            },
            "typeVersion": 2
      },
      {
            "id": "9f2d2c87-460b-4872-9538-519d26524475",
            "name": "No Operation, do nothing",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1960,
                  240
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "e9ebbce6-a3b4-4f89-9908-3d9b2dd42f44",
            "name": "If",
            "type": "n8n-nodes-base.if",
            "position": [
                  1640,
                  120
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
                                    "id": "bad6fc33-2e1e-4169-9893-d284c6c68288",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notEquals"
                                    },
                                    "leftValue": "={{ $json.message }}",
                                    "rightValue": "No new articles found."
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "6e2c820d-27da-4d3b-844c-581fb266e04a",
            "name": "Jina AI - Read URL",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  3240,
                  -120
            ],
            "parameters": {
                  "url": "=https://r.jina.ai/{{ $json.link }}",
                  "options": {}
            },
            "retryOnFail": true,
            "typeVersion": 4.2,
            "waitBetweenTries": 5000
      },
      {
            "id": "3f942518-f75b-4d03-9cd1-b275ad3b91cd",
            "name": "Set field - existing_url",
            "type": "n8n-nodes-base.set",
            "onError": "continueRegularOutput",
            "position": [
                  -180,
                  120
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "07799638-55d7-42a9-b1f7-fea762cfa2f1",
                                    "name": "existing_url",
                                    "type": "string",
                                    "value": "={{ $json.article_url.extractUrl() }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4,
            "alwaysOutputData": true
      },
      {
            "id": "baef0ff9-8bf5-4ecf-9300-0adbad0d1a07",
            "name": "OpenAI Chat Model1",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2400,
                  300
            ],
            "parameters": {
                  "options": {}
            },
            "credentials": {
                  "openAiApi": {
                        "id": "",
                        "name": "OpenAi Connection"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "ccbfe5fc-2e87-4fff-b23d-0c4c6ebd3648",
            "name": "Set fields - Not relevant articles",
            "type": "n8n-nodes-base.set",
            "position": [
                  3060,
                  480
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "3fbf5256-f06b-450a-adf7-65591a19c7dd",
                                    "name": "article_url",
                                    "type": "string",
                                    "value": "={{ $json.link }}"
                              },
                              {
                                    "id": "02f506cf-28fe-46ef-b97e-7ec938805151",
                                    "name": "summarized",
                                    "type": "string",
                                    "value": "NO (not relevant)"
                              },
                              {
                                    "id": "552efef4-63cb-448b-bb0c-30ae9666f310",
                                    "name": "website",
                                    "type": "string",
                                    "value": "={{ $('Google Sheets - Get RSS Feed url followed').item.json.website }}"
                              },
                              {
                                    "id": "096acb35-4e9e-48fd-8e61-8ceb525591fa",
                                    "name": "fetched_at",
                                    "type": "string",
                                    "value": "={{$now}}"
                              },
                              {
                                    "id": "427243d1-01c4-458a-9626-75366e4264cd",
                                    "name": "publish_date",
                                    "type": "string",
                                    "value": "={{ $('Relevance Classification for Topic Monitoring').item.json.pubDate.toDateTime().format('yyyy-MM-dd') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "0dbcc872-9afa-4e2c-be24-82d3a2457dd0",
            "name": "Google Sheets - Add relevant articles",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  3480,
                  480
            ],
            "parameters": {
                  "columns": {
                        "value": {},
                        "schema": [
                              {
                                    "id": "article_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "article_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "summarized",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "summarized",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "summary",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "summary",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "website",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "fetched_at",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "fetched_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "publish_date",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "publish_date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "autoMapInputData",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1966921272,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit#gid=1966921272",
                        "cachedResultName": "article_database"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit?usp=drivesdk",
                        "cachedResultName": "Template - AI-Powered Information Monitoring"
                  },
                  "authentication": "serviceAccount"
            },
            "credentials": {
                  "googleApi": {
                        "id": "",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "0c7024b6-dfac-4e97-9d42-198fff6bcc47",
            "name": "Google Sheets - Add relevant article",
            "type": "n8n-nodes-base.googleSheets",
            "position": [
                  5660,
                  520
            ],
            "parameters": {
                  "columns": {
                        "value": {},
                        "schema": [
                              {
                                    "id": "article_url",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "article_url",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "summarized",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "summarized",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "summary",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "summary",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "website",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "website",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "fetched_at",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "fetched_at",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "publish_date",
                                    "type": "string",
                                    "display": true,
                                    "required": false,
                                    "displayName": "publish_date",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              }
                        ],
                        "mappingMode": "autoMapInputData",
                        "matchingColumns": [],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                  },
                  "options": {},
                  "operation": "append",
                  "sheetName": {
                        "__rl": true,
                        "mode": "list",
                        "value": 1966921272,
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit#gid=1966921272",
                        "cachedResultName": "article_database"
                  },
                  "documentId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1F2FzWt9FMkA5V5i9d_hBJRahLDvxs3DQBOLkLYowXbY/edit?usp=drivesdk",
                        "cachedResultName": "Template - AI-Powered Information Monitoring"
                  },
                  "authentication": "serviceAccount"
            },
            "credentials": {
                  "googleApi": {
                        "id": "",
                        "name": "Google Sheets account"
                  }
            },
            "typeVersion": 4.5
      },
      {
            "id": "e1266606-eaee-4077-be7e-6f08ae9bae39",
            "name": "Set Fields - Relevant Articles",
            "type": "n8n-nodes-base.set",
            "position": [
                  4900,
                  520
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "3fbf5256-f06b-450a-adf7-65591a19c7dd",
                                    "name": "article_url",
                                    "type": "string",
                                    "value": "={{ $('Relevance Classification for Topic Monitoring').item.json.link }}"
                              },
                              {
                                    "id": "02f506cf-28fe-46ef-b97e-7ec938805151",
                                    "name": "summarized",
                                    "type": "string",
                                    "value": "YES"
                              },
                              {
                                    "id": "e23059bd-8bb2-439a-85bd-f9e191930d1e",
                                    "name": "summary",
                                    "type": "string",
                                    "value": "={{ $json.text }}"
                              },
                              {
                                    "id": "552efef4-63cb-448b-bb0c-30ae9666f310",
                                    "name": "website",
                                    "type": "string",
                                    "value": "={{ $('Google Sheets - Get RSS Feed url followed').item.json.website }}"
                              },
                              {
                                    "id": "096acb35-4e9e-48fd-8e61-8ceb525591fa",
                                    "name": "fetched_at",
                                    "type": "string",
                                    "value": "={{$now}}"
                              },
                              {
                                    "id": "427243d1-01c4-458a-9626-75366e4264cd",
                                    "name": "publish_date",
                                    "type": "string",
                                    "value": "={{ $('Relevance Classification for Topic Monitoring').item.json.pubDate.toDateTime().format('yyyy-MM-dd') }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      }
],
    connections: {
      "If": {
            "main": [
                  [
                        {
                              "node": "Relevance Classification for Topic Monitoring",
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
      "Code": {
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
      "RSS Read": {
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
      "Basic LLM Chain": {
            "main": [
                  [
                        {
                              "node": "Slack1",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Set Fields - Relevant Articles",
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
                              "node": "Google Sheets - Get article monitored database",
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
                              "node": "Basic LLM Chain",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Jina AI - Read URL": {
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
      "OpenAI Chat Model1": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Relevance Classification for Topic Monitoring",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set field - existing_url": {
            "main": [
                  [
                        {
                              "node": "Google Sheets - Get RSS Feed url followed",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set Fields - Relevant Articles": {
            "main": [
                  [
                        {
                              "node": "Google Sheets - Add relevant article",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Set fields - Not relevant articles": {
            "main": [
                  [
                        {
                              "node": "Google Sheets - Add relevant articles",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets - Add relevant article": {
            "main": [
                  []
            ]
      },
      "Google Sheets - Get RSS Feed url followed": {
            "main": [
                  [
                        {
                              "node": "RSS Read",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Relevance Classification for Topic Monitoring": {
            "main": [
                  [
                        {
                              "node": "Jina AI - Read URL",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Set fields - Not relevant articles",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Sheets - Get article monitored database": {
            "main": [
                  [
                        {
                              "node": "Set field - existing_url",
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
    name: "Creating A AI Slack Bot With Google Gemini",
    nodes: [
      {
            "id": "2ce91ec6-0a8c-438a-8a18-216001c9ee07",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  380,
                  240
            ],
            "parameters": {
                  "width": 407.6388140161723,
                  "height": 490.24769122000794,
                  "content": "## This is a POST Webhook endpoint\n\nMake sure to configure this webhook using a https:// wraper and dont use the default http://localhost:5678 as that will not be recognized by your slack webhook\n\n\nOnce the data has been sent to your webhook, the next step will be passing it via an AI Agent to process data based on the queries we pass to our agent.\n\nTo have some sort of a memory, be sure to set the slack token to the memory node. This way you can refer to other chats from the history.\n\nThe final message is relayed back to slack as a new message. Since we can not wait longer than 3000 ms for slack response, we will create anew message with reference to the input we passed.\n\nWe can advance this using the tools or data sources for it to be more custom tailored for your company.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "7a0c84a8-90ef-4de8-b120-700c94c35a51",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1180,
                  560
            ],
            "parameters": {
                  "color": 4,
                  "width": 221.73584905660368,
                  "height": 233,
                  "content": "### Conversation history is stored in memory using the body token as the chatsession id"
            },
            "typeVersion": 1
      },
      {
            "id": "9b843e0e-42a6-4125-8c59-a7d5620a15f7",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  942.5229110512129,
                  560
            ],
            "parameters": {
                  "color": 4,
                  "width": 217.47708894878716,
                  "height": 233,
                  "content": "### The chat LLM to process the prompt. Use any AI model here"
            },
            "typeVersion": 1
      },
      {
            "id": "4efa968f-ebf5-42ec-80d3-907ef2622c61",
            "name": "Google Gemini Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
            "position": [
                  1020,
                  640
            ],
            "parameters": {
                  "options": {},
                  "modelName": "models/gemini-1.5-flash-latest"
            },
            "typeVersion": 1
      },
      {
            "id": "fd1efd7c-7cd0-4edf-960e-19bd4567293e",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  1260,
                  660
            ],
            "parameters": {
                  "sessionKey": "={{ $('Webhook to receive message').item.json.body.token }}",
                  "sessionIdType": "customKey",
                  "contextWindowLength": 10
            },
            "typeVersion": 1.2
      },
      {
            "id": "60d1eb77-492d-4a18-8cec-fa3f6ef8d707",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1467.5148247978436,
                  260
            ],
            "parameters": {
                  "color": 4,
                  "width": 223.7196765498655,
                  "height": 236.66152029520293,
                  "content": "### Send the response from AI back to slack channel\n"
            },
            "typeVersion": 1
      },
      {
            "id": "186069c0-5c79-4738-9924-de33998658bc",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  840,
                  180
            ],
            "parameters": {
                  "color": 4,
                  "width": 561.423180592992,
                  "height": 340.09703504043114,
                  "content": "## Receive a POST webhook, process data and return response"
            },
            "typeVersion": 1
      },
      {
            "id": "2bfce117-a769-46e1-a028-ed0c7ba62653",
            "name": "Send response back to slack channel",
            "type": "n8n-nodes-base.slack",
            "position": [
                  1540,
                  320
            ],
            "parameters": {
                  "text": "={{ $('Webhook to receive message').item.json.body.user_name }}: {{ $('Webhook to receive message').item.json.body.text }}\n\nEffibotics Bot: {{ $json.output.removeMarkdown() }} ",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Webhook to receive message').item.json.body.channel_id }}"
                  },
                  "otherOptions": {
                        "mrkdwn": true,
                        "sendAsUser": "Effibotics Bot",
                        "includeLinkToWorkflow": false
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "cfcf2bbc-8ed5-4a9f-8f35-cf2715686ebe",
            "name": "Webhook to receive message",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  880,
                  320
            ],
            "webhookId": "28b84545-96aa-42f5-990b-aa8783a320ca",
            "parameters": {
                  "path": "slack-bot",
                  "options": {
                        "responseData": ""
                  },
                  "httpMethod": "POST"
            },
            "typeVersion": 1
      },
      {
            "id": "dc93e588-fc0b-4561-88a5-e1cccd48323f",
            "name": "Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  1100,
                  320
            ],
            "parameters": {
                  "text": "={{ $json.body.text }}",
                  "options": {
                        "systemMessage": "You are Effibotics AI personal assistant. Your task will be to provide helpful assistance and advice related to automation and such tasks. "
                  }
            },
            "typeVersion": 1
      }
],
    connections: {
      "Agent": {
            "main": [
                  [
                        {
                              "node": "Send response back to slack channel",
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
                              "node": "Agent",
                              "type": "ai_memory",
                              "index": 0
                        }
                  ]
            ]
      },
      "Google Gemini Chat Model": {
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
      "Webhook to receive message": {
            "main": [
                  [
                        {
                              "node": "Agent",
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
    name: "Customer Support Channel And Ticketing System With Slack And Linear",
    nodes: [
      {
            "id": "2b3112a9-046e-4aae-8fcc-95bddf3bb02e",
            "name": "Slack",
            "type": "n8n-nodes-base.slack",
            "position": [
                  828,
                  327
            ],
            "parameters": {
                  "limit": 10,
                  "query": "in:#n8n-tickets has::ticket:",
                  "options": {},
                  "operation": "search"
            },
            "credentials": {
                  "slackApi": {
                        "id": "VfK3js0YdqBdQLGP",
                        "name": "Slack account"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "65fd6821-4d19-436c-81d9-9bdb0f5efddd",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  1920,
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
            "id": "85125704-7363-40de-af84-f267f8c7e919",
            "name": "Structured Output Parser",
            "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
            "position": [
                  2100,
                  480
            ],
            "parameters": {
                  "jsonSchema": "{\n \"type\": \"object\",\n \"properties\": {\n \"title\": { \"type\": \"string\" },\n \"summary\": { \"type\": \"string\" },\n \"ideas\": {\n \"type\": \"array\",\n \"items\": { \"type\": \"string\" }\n },\n \"priority\": { \"type\": \"string\" }\n }\n}"
            },
            "typeVersion": 1.1
      },
      {
            "id": "eda8851a-1929-4f2f-9149-627c0fe62fbc",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  628,
                  327
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "minutes"
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "ad0d56b5-5caf-4fc0-bdbb-4e6207e4eb03",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  112.87898199907983
            ],
            "parameters": {
                  "color": 7,
                  "width": 432.4578914269739,
                  "height": 427.09547550768553,
                  "content": "## 1. Query Slack for Messages \n[Read more about the Slack Trigger](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack)\n\nSlack API search uses the same search syntax found in the app. Here, we'll use it to filter the latest messages with the ticket emoji within our designated channel called #n8n-tickets. "
            },
            "typeVersion": 1
      },
      {
            "id": "d4ebe5b3-6d9a-4547-8af8-0985206c4ca4",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1040,
                  180.44851541532478
            ],
            "parameters": {
                  "color": 7,
                  "width": 711.6907825442045,
                  "height": 632.7258798316449,
                  "content": "## 2. Decide If We Need to Create a New Ticket \n[Read more about using Linear](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.linear)\n\nFor generated issues, we add the message id to the description of the message so that we can check them at this point in the workflow to avoid duplicates."
            },
            "typeVersion": 1
      },
      {
            "id": "b2920271-6698-47a4-8cac-ea4cec7b47d6",
            "name": "Get Values",
            "type": "n8n-nodes-base.set",
            "position": [
                  1100,
                  360
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={\n \"id\": \"#{{ $json.permalink.split('/').last() }}\",\n \"type\": \"{{ $json.type }}\",\n \"title\": \"__NOT_SET__\",\n \"channel\": \"{{ $json.channel.name }}\",\n \"user\": \"{{ $json.username }} ({{ $json.user }})\",\n \"ts\": \"{{ $json.ts }}\",\n \"permalink\": \"{{ $json.permalink }}\",\n \"message\": \"{{ $json.text.replaceAll('\"','\\\\\"').replaceAll('\\n', '\\\\n') }}\"\n}"
            },
            "typeVersion": 3.3
      },
      {
            "id": "c4a4db2a-5d1c-4726-8c98-aef57fdcfaa6",
            "name": "Create New Ticket?",
            "type": "n8n-nodes-base.if",
            "position": [
                  1600,
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
                                    "id": "c11109b6-ee45-4b52-adc3-4be5fe420202",
                                    "operator": {
                                          "type": "boolean",
                                          "operation": "false",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ Boolean(($json.hashes ?? []).includes($json.id)) }}",
                                    "rightValue": "=false"
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "46acb0de-1df1-4116-8aaf-704ec6644d7c",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1780,
                  80
            ],
            "parameters": {
                  "color": 7,
                  "width": 530.6864600881105,
                  "height": 578.3950618708791,
                  "content": "## 3. Use AI to Generate Ticket Contents\n[Read more about using Basic LLM Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm)\n\nFor this demo, we've instructed the AI to do the following:\n* Generate a descriptive title of the issue\n* Summarise the user message into an actionable request.\n* Determine a prority based on tone and context of the user message. \n* Can offer possible fixes through use of tools or RAG. (not implemented)\n"
            },
            "typeVersion": 1
      },
      {
            "id": "503d4ae7-9d5b-4dab-94a2-da28bc0e49da",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  200,
                  120
            ],
            "parameters": {
                  "width": 359.6648027457353,
                  "height": 400.4748439127683,
                  "content": "## Try It Out!\n### This workflow does the following:\n* Monitors a Slack channel for new user messages asking for assistance\n* Only user messages which are tagged with the ticket(🎫) emoji are processed.\n* Linear is first checked to see if a ticket was created for the user message.\n* User messages are sent to ChatGPT to generate title, description and priority.\n* Support ticket is created in Linear.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      },
      {
            "id": "11e423a4-36b6-4ecd-8bf7-58a7d4a1aa9a",
            "name": "Get Existing Issues",
            "type": "n8n-nodes-base.linear",
            "position": [
                  1260,
                  360
            ],
            "parameters": {
                  "operation": "getAll"
            },
            "credentials": {
                  "linearApi": {
                        "id": "Nn0F7T9FtvRUtEbe",
                        "name": "Linear account"
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": true
      },
      {
            "id": "413fde96-346a-468e-80b7-d465bd8add14",
            "name": "Generate Ticket Using ChatGPT",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  1920,
                  320
            ],
            "parameters": {
                  "text": "=The \"user issue\" is enclosed by 3 backticks:\n```\n{{ $('Get Values').item.json.message }}\n```\nYou will complete the following 4 tasks:\n1. Generate a title intended for a support ticket based on the user issue only. Be descriptive but use no more than 10 words.\n2. Summarise the user issue only by identifying the key expectations and steps that were taken to reach the conclusion.\n3. Offer at most 3 suggestions to debug or resolve the user issue only. ignore the previous issues for this task.\n4. Identify the urgency of the user issue only and denote the priority as one of \"low\", \"medium\", \"high\" or \"urgent\". If you cannot determine the urgency of the issue, then assign the \"low\" priority. Also consider that requests which require action either today or tomorrow should be prioritised as \"high\".",
                  "promptType": "define",
                  "hasOutputParser": true
            },
            "typeVersion": 1.4
      },
      {
            "id": "66aecf53-6e8a-4ee8-88c3-be6b7d8d0527",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2340,
                  206
            ],
            "parameters": {
                  "color": 7,
                  "width": 374.7406065828194,
                  "height": 352.3865785298774,
                  "content": "## 4. Create New Ticket in Linear\n[Read more about using Linear](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.linear)\n\nWith our ticket contents generated, we can now create our ticket in Linear for support to handle.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "f7898b7b-f60a-4315-a870-8c8ec4ad848f",
            "name": "Create Ticket",
            "type": "n8n-nodes-base.linear",
            "position": [
                  2480,
                  380
            ],
            "parameters": {
                  "title": "={{ $json.output.title }}",
                  "teamId": "1c721608-321d-4132-ac32-6e92d04bb487",
                  "additionalFields": {
                        "stateId": "92962324-3d1f-4cf8-993b-0c982cc95245",
                        "priorityId": "={{ { 'urgent': 1, 'high': 2, 'medium': 3, 'low': 4 }[$json.output.priority.toLowerCase()] ?? 0 }}",
                        "description": "=## {{ $json.output.summary }}\n\n### Suggestions\n{{ $json.output.ideas.map(idea => '* ' + idea).join('\\n') }}\n\n## Original Message\n{{ $('Get Values').item.json[\"user\"] }} asks:\n> {{ $('Get Values').item.json[\"message\"] }}\n\n### Metadata\nchannel: {{ $('Get Values').item.json.channel }}\nts: {{ $('Get Values').item.json.ts }}\npermalink: {{ $('Get Values').item.json.permalink }}\nhash: {{ $('Get Values').item.json.id }}\n"
                  }
            },
            "credentials": {
                  "linearApi": {
                        "id": "Nn0F7T9FtvRUtEbe",
                        "name": "Linear account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0b706c12-6ce0-41af-ad4b-9d98d7d03a41",
            "name": "Merge",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1440,
                  360
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combinationMode": "multiplex"
            },
            "typeVersion": 2.1
      },
      {
            "id": "d5b30127-f237-459d-860a-2589e3b54fb8",
            "name": "Get Hashes Only",
            "type": "n8n-nodes-base.set",
            "position": [
                  1260,
                  640
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "9b0e8527-ea17-4b1e-ba62-287111f4b37e",
                                    "name": "hashes",
                                    "type": "array",
                                    "value": "={{ $json.descriptions.map(desc => desc.match(/hash\\:\\s([\\w#]+)/i)[1]) }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "9de103e1-b6a4-4454-b1b9-73eff730fcb6",
            "name": "Collect Descriptions",
            "type": "n8n-nodes-base.aggregate",
            "position": [
                  1260,
                  500
            ],
            "parameters": {
                  "options": {},
                  "fieldsToAggregate": {
                        "fieldToAggregate": [
                              {
                                    "renameField": true,
                                    "outputFieldName": "descriptions",
                                    "fieldToAggregate": "description"
                              }
                        ]
                  }
            },
            "typeVersion": 1,
            "alwaysOutputData": true
      },
      {
            "id": "af34916f-7888-4d41-aee6-752b78e88c0c",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  780,
                  300
            ],
            "parameters": {
                  "width": 204.96868508214473,
                  "height": 296.735132421306,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🚨**Required**\n* Set the Slack channel to monitor here."
            },
            "typeVersion": 1
      },
      {
            "id": "58ab44f7-5fe5-4804-8bf1-36f351d86528",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2440,
                  360
            ],
            "parameters": {
                  "width": 183.49787916474958,
                  "height": 296.735132421306,
                  "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🚨**Required**\n* Set the Linear Team Name or ID here."
            },
            "typeVersion": 1
      }
],
    connections: {
      "Merge": {
            "main": [
                  [
                        {
                              "node": "Create New Ticket?",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Slack": {
            "main": [
                  [
                        {
                              "node": "Get Values",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Values": {
            "main": [
                  [
                        {
                              "node": "Merge",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get Existing Issues",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Hashes Only": {
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
      "Schedule Trigger": {
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
      "OpenAI Chat Model": {
            "ai_languageModel": [
                  [
                        {
                              "node": "Generate Ticket Using ChatGPT",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Create New Ticket?": {
            "main": [
                  [
                        {
                              "node": "Generate Ticket Using ChatGPT",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Existing Issues": {
            "main": [
                  [
                        {
                              "node": "Collect Descriptions",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Collect Descriptions": {
            "main": [
                  [
                        {
                              "node": "Get Hashes Only",
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
                              "node": "Generate Ticket Using ChatGPT",
                              "type": "ai_outputParser",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Ticket Using ChatGPT": {
            "main": [
                  [
                        {
                              "node": "Create Ticket",
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
    name: "Enhance Security Operations With The Qualys Slack Shortcut Bot!",
    nodes: [
      {
            "id": "adfda9cb-1d77-4c54-b3ea-e7bf438a48af",
            "name": "Parse Webhook",
            "type": "n8n-nodes-base.set",
            "position": [
                  760,
                  640
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e63f9299-a19d-4ba1-93b0-59f458769fb2",
                                    "name": "response",
                                    "type": "object",
                                    "value": "={{ $json.body.payload }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "b3e0e490-18e0-44b5-a960-0fdbf8422515",
            "name": "Qualys Create Report",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  1720,
                  1740
            ],
            "parameters": {
                  "options": {},
                  "workflowId": "icSLX102kSS9zNdK"
            },
            "typeVersion": 1
      },
      {
            "id": "80ae074b-bda5-4638-b46f-246a1b9530ae",
            "name": "Required Report Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  1520,
                  1740
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "47cd1502-3039-4661-a6b1-e20a74056550",
                                    "name": "report_title",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.report_title.report_title_input.value }}"
                              },
                              {
                                    "id": "6a8a0cbf-bf3e-4702-956e-a35966d8b9c5",
                                    "name": "base_url",
                                    "type": "string",
                                    "value": "https://qualysapi.qg3.apps.qualys.com"
                              },
                              {
                                    "id": "9a15f4db-f006-4ad8-a2c0-4002dd3e2655",
                                    "name": "output_format",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.output_format.output_format_select.selected_option.value }}"
                              },
                              {
                                    "id": "13978e05-7e7f-42e9-8645-d28803db8cc9",
                                    "name": "template_name",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.report_template.report_template_select.selected_option.text.text }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "b596da86-02c7-4d8e-a267-88933f47ae0c",
            "name": "Qualys Start Vulnerability Scan",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  1720,
                  1540
            ],
            "parameters": {
                  "options": {},
                  "workflowId": "pYPh5FlGZgb36xZO"
            },
            "typeVersion": 1
      },
      {
            "id": "61e39516-6558-46ce-a300-b4cbade7a6f6",
            "name": "Scan Report Task Modal",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  720
            ],
            "parameters": {
                  "url": "https://slack.com/api/views.open",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "= {\n \"trigger_id\": \"{{ $('Parse Webhook').item.json['response']['trigger_id'] }}\",\n \"external_id\": \"Scan Report Generator\",\n \"view\": {\n\t\"title\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Scan Report Generator\",\n\t\t\"emoji\": true\n\t},\n\t\"submit\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Generate Report\",\n\t\t\"emoji\": true\n\t},\n\t\"type\": \"modal\",\n\t\"close\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Cancel\",\n\t\t\"emoji\": true\n\t},\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"image\",\n\t\t\t\"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Logo-Qualys.svg/300px-Logo-Qualys.svg.png\",\n\t\t\t\"alt_text\": \"Qualys Logo\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"Select a template and generate a detailed scan report based on the results of your previous scans.\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"report_template\",\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"external_select\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Select a report template\",\n\t\t\t\t\t\"emoji\": true\n\t\t\t\t},\n\t\t\t\t\"action_id\": \"report_template_select\"\n\t\t\t},\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Report Template\",\n\t\t\t\t\"emoji\": true\n\t\t\t},\n\t\t\t\"hint\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Choose a report template from your Qualys account to structure the output.\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"report_title\",\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"plain_text_input\",\n\t\t\t\t\"action_id\": \"report_title_input\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Enter a custom title for the report\"\n\t\t\t\t}\n\t\t\t},\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Report Title\",\n\t\t\t\t\"emoji\": true\n\t\t\t},\n\t\t\t\"hint\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Provide a descriptive title for your report. This title will be used in the report header.\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"output_format\",\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"static_select\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Select output format\",\n\t\t\t\t\t\"emoji\": true\n\t\t\t\t},\n\t\t\t\t\"options\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\t\"text\": \"PDF\",\n\t\t\t\t\t\t\t\"emoji\": true\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"value\": \"pdf\"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\t\"text\": \"HTML\",\n\t\t\t\t\t\t\t\"emoji\": true\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"value\": \"html\"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\t\"text\": \"CSV\",\n\t\t\t\t\t\t\t\"emoji\": true\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"value\": \"csv\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"action_id\": \"output_format_select\"\n\t\t\t},\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Output Format\",\n\t\t\t\t\"emoji\": true\n\t\t\t},\n\t\t\t\"hint\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Choose the format in which you want the report to be generated.\"\n\t\t\t}\n\t\t}\n\t]\n}\n}",
                  "sendBody": true,
                  "jsonQuery": "{\n \"Content-type\": \"application/json\"\n}",
                  "sendQuery": true,
                  "specifyBody": "json",
                  "specifyQuery": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "slackApi"
            },
            "credentials": {
                  "slackApi": {
                        "id": "DZJDes1ZtGpqClNk",
                        "name": "Qualys Slack App"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "29cf716c-9cd6-4bd9-a0f9-c75baca86cc1",
            "name": "Vuln Scan Modal",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1620,
                  560
            ],
            "parameters": {
                  "url": "https://slack.com/api/views.open",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "= {\n \"trigger_id\": \"{{ $('Parse Webhook').item.json['response']['trigger_id'] }}\",\n \"external_id\": \"Scan Report Generator\",\n \"view\": {\n\t\"title\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Vulnerability Scan\",\n\t\t\"emoji\": true\n\t},\n\t\"submit\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Execute Scan\",\n\t\t\"emoji\": true\n\t},\n\t\"type\": \"modal\",\n\t\"close\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Cancel\",\n\t\t\"emoji\": true\n\t},\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"image\",\n\t\t\t\"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Logo-Qualys.svg/300px-Logo-Qualys.svg.png\",\n\t\t\t\"alt_text\": \"Qualys Logo\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Initiate a network-wide scan to detect and assess security vulnerabilities.\",\n\t\t\t\t\"emoji\": true\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"option_title\",\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"plain_text_input\",\n\t\t\t\t\"action_id\": \"text_input-action\",\n\t\t\t\t\"initial_value\": \"Initial Options\"\n\t\t\t},\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Option Title\",\n\t\t\t\t\"emoji\": true\n\t\t\t},\n\t\t\t\"hint\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Specify the title of the option profile to use for the scan.\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"scan_title\",\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"plain_text_input\",\n\t\t\t\t\"action_id\": \"text_input-action\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Enter your scan title\"\n\t\t\t\t},\n\t\t\t\t\"initial_value\": \"n8n Scan 1\"\n\t\t\t},\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Scan Title\",\n\t\t\t\t\"emoji\": true\n\t\t\t},\n\t\t\t\"hint\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Provide a descriptive title for the scan. Up to 2000 characters.\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"asset_groups\",\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"plain_text_input\",\n\t\t\t\t\"action_id\": \"text_input-action\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Enter asset groups\"\n\t\t\t\t},\n\t\t\t\t\"initial_value\": \"Group1\"\n\t\t\t},\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Asset Groups\",\n\t\t\t\t\"emoji\": true\n\t\t\t},\n\t\t\t\"hint\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Specify asset group titles for targeting. Multiple titles must be comma-separated.\"\n\t\t\t}\n\t\t}\n\t]\n}\n}",
                  "sendBody": true,
                  "jsonQuery": "{\n \"Content-type\": \"application/json\"\n}",
                  "sendQuery": true,
                  "specifyBody": "json",
                  "specifyQuery": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "slackApi"
            },
            "credentials": {
                  "slackApi": {
                        "id": "DZJDes1ZtGpqClNk",
                        "name": "Qualys Slack App"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "a771704d-4191-4e80-b62f-81b41b047a87",
            "name": "Route Message",
            "type": "n8n-nodes-base.switch",
            "position": [
                  940,
                  640
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Vuln Scan Modal",
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
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.callback_id }}",
                                                      "rightValue": "trigger-qualys-vmscan"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Scan Report Modal",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "02868fd8-2577-4c6d-af5e-a1963cb2f786",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.callback_id }}",
                                                      "rightValue": "qualys-scan-report"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Process Submission",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "c320c8b8-947b-433a-be82-d2aa96594808",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.type }}",
                                                      "rightValue": "view_submission"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "none"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "c8346d57-762a-4bbd-8d2b-f13097cb063d",
            "name": "Required Scan Variables",
            "type": "n8n-nodes-base.set",
            "position": [
                  1520,
                  1540
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "096ff32e-356e-4a85-aad2-01001d69dd46",
                                    "name": "platformurl",
                                    "type": "string",
                                    "value": "https://qualysapi.qg3.apps.qualys.com"
                              },
                              {
                                    "id": "070178a6-73b0-458b-8657-20ab4ff0485c",
                                    "name": "option_title",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.option_title['text_input-action'].value }}"
                              },
                              {
                                    "id": "3605424b-5bfc-44f0-b6e4-e0d6b1130b8e",
                                    "name": "scan_title",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.scan_title['text_input-action'].value }}"
                              },
                              {
                                    "id": "2320d966-b834-46fb-b674-be97cc08682e",
                                    "name": "asset_groups",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.asset_groups['text_input-action'].value }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "55589da9-50ce-4d55-a5ff-d62abdf65fa4",
            "name": "Route Submission",
            "type": "n8n-nodes-base.switch",
            "position": [
                  1240,
                  1140
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Vuln Scan",
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
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.view.title.text }}",
                                                      "rightValue": "Vulnerability Scan"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Scan Report",
                                    "conditions": {
                                          "options": {
                                                "leftValue": "",
                                                "caseSensitive": true,
                                                "typeValidation": "strict"
                                          },
                                          "combinator": "and",
                                          "conditions": [
                                                {
                                                      "id": "02868fd8-2577-4c6d-af5e-a1963cb2f786",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.view.title.text }}",
                                                      "rightValue": "Scan Report Generator"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "none"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "d0fc264d-0c48-4aa6-aeab-ed605d96f35a",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  428.3467548314237,
                  270.6382978723399
            ],
            "parameters": {
                  "color": 7,
                  "width": 466.8168310000617,
                  "height": 567.6433222116042,
                  "content": "![Imgur](https://uploads.n8n.io/templates/slack.png)\n## Events Webhook Trigger\nThe first node receives all messages from Slack API via Subscription Events API. You can find more information about setting up the subscription events API by [clicking here](https://api.slack.com/apis/connections/events-api). \n\nThe second node extracts the payload from slack into an object that n8n can understand. "
            },
            "typeVersion": 1
      },
      {
            "id": "acb3fbdc-1fcb-4763-8529-ea2842607569",
            "name": "Sticky Note15",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  900,
                  -32.762682645579616
            ],
            "parameters": {
                  "color": 7,
                  "width": 566.0553219408072,
                  "height": 1390.6748140207737,
                  "content": "![n8n](https://uploads.n8n.io/templates/n8n.png)\n## Efficient Slack Interaction Handling with n8n\n\nThis section of the workflow is designed to efficiently manage and route messages and submissions from Slack based on specific triggers and conditions. When a Slack interaction occurs—such as a user triggering a vulnerability scan or generating a report through a modal—the workflow intelligently routes the message to the appropriate action:\n\n- **Dynamic Routing**: Uses conditions to determine the nature of the Slack interaction, whether it's a direct command to initiate a scan or a request to generate a report.\n- **Modal Management**: Differentiates actions based on modal titles and `callback_id`s, ensuring that each type of submission is processed according to its context.\n- **Streamlined Responses**: After routing, the workflow promptly handles the necessary responses or actions, including closing modal popups and responding to Slack with appropriate confirmation or data.\n\n**Purpose**: This mechanism ensures that all interactions within Slack are handled quickly and accurately, automating responses and actions in real-time to enhance user experience and workflow efficiency."
            },
            "typeVersion": 1
      },
      {
            "id": "85f370e8-70d2-466e-8f44-45eaf04a0d95",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1473.6255461332685,
                  56.17183602125283
            ],
            "parameters": {
                  "color": 7,
                  "width": 396.6025898621133,
                  "height": 881.1659905894905,
                  "content": "![Imgur](https://uploads.n8n.io/templates/slack.png)\n## Display Modal Popup\nThis section pops open a modal window that is later used to send data into TheHive. \n\nModals can be customized to perform all sorts of actions. And they are natively mobile! You can see a screenshot of the Slack Modals on the right. \n\nLearn more about them by [clicking here](https://api.slack.com/surfaces/modals)"
            },
            "typeVersion": 1
      },
      {
            "id": "cae79c1c-47f8-41c0-b1d0-e284359b52a8",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1480,
                  960
            ],
            "parameters": {
                  "color": 7,
                  "width": 390.82613196003143,
                  "height": 950.1640646001949,
                  "content": "![Imgur](https://i.imgur.com/abGF8EO.png)\n## Modal Submission Payload\nThe data input into the Slack Modal makes its way into these set nodes that then pass that data into the Qualys Sub workflows that handle the heavy lifting. \n\n### Two Trigger Options\n- **Trigger a Vulnerability Scan** in the Slack UI which then sends a slack message to a channel of your choice summarizing and linking to the scan in slack\n- **Trigger report creation** in the Slack UI from the previously generated Vulnerability scan and upload a PDF copy of the report directly in a slack channel of your choice"
            },
            "typeVersion": 1
      },
      {
            "id": "1017df8b-ff32-47aa-a4c2-a026e6597fa9",
            "name": "Close Modal Popup",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1000,
                  1140
            ],
            "parameters": {
                  "options": {
                        "responseCode": 204
                  },
                  "respondWith": "noData"
            },
            "typeVersion": 1.1
      },
      {
            "id": "6b058f2a-2c0c-4326-aa42-08d840e306f7",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -260,
                  280
            ],
            "parameters": {
                  "width": 675.1724774900403,
                  "height": 972.8853473866498,
                  "content": "![n8n](https://uploads.n8n.io/templates/n8n.png)\n## Enhance Security Operations with the Qualys Slack Shortcut Bot!\n\nOur **Qualys Slack Shortcut Bot** is strategically designed to facilitate immediate security operations directly from Slack. This powerful tool allows users to initiate vulnerability scans and generate detailed reports through simple Slack interactions, streamlining the process of managing security assessments.\n\n**Workflow Highlights:**\n- **Interactive Modals**: Utilizes Slack modals to gather user inputs for scan configurations and report generation, providing a user-friendly interface for complex operations.\n- **Dynamic Workflow Execution**: Integrates seamlessly with Qualys to execute vulnerability scans and create reports based on user-specified parameters.\n- **Real-Time Feedback**: Offers instant feedback within Slack, updating users about the status of their requests and delivering reports directly through Slack channels.\n\n\n**Operational Flow:**\n- **Parse Webhook Data**: Captures and parses incoming data from Slack to understand user commands accurately.\n- **Execute Actions**: Depending on the user's selection, the workflow triggers other sub-workflows like 'Qualys Start Vulnerability Scan' or 'Qualys Create Report' for detailed processing.\n- **Respond to Slack**: Ensures that every interaction is acknowledged, maintaining a smooth user experience by managing modal popups and sending appropriate responses.\n\n\n**Setup Instructions:**\n- Verify that Slack and Qualys API integrations are correctly configured for seamless interaction.\n- Customize the modal interfaces to align with your organization's operational protocols and security policies.\n- Test the workflow to ensure that it responds accurately to Slack commands and that the integration with Qualys is functioning as expected.\n\n\n**Need Assistance?**\n- Explore our [Documentation](https://docs.qualys.com) or get help from the [n8n Community](https://community.n8n.io) for more detailed guidance on setup and customization.\n\nDeploy this bot within your Slack environment to significantly enhance the efficiency and responsiveness of your security operations, enabling proactive management of vulnerabilities and streamlined reporting."
            },
            "typeVersion": 1
      },
      {
            "id": "63b537e8-50c9-479d-96a4-54e621689a23",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  520,
                  640
            ],
            "webhookId": "4f86c00d-ceb4-4890-84c5-850f8e5dec05",
            "parameters": {
                  "path": "4f86c00d-ceb4-4890-84c5-850f8e5dec05",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "13500444-f2ff-4b77-8f41-8ac52d067ec7",
            "name": "Respond to Slack Webhook - Vulnerability",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1280,
                  560
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "noData"
            },
            "typeVersion": 1.1
      },
      {
            "id": "e64cedf0-948c-43c8-a62c-d0ec2916f3b6",
            "name": "Respond to Slack Webhook - Report",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1280,
                  720
            ],
            "parameters": {
                  "options": {
                        "responseCode": 200
                  },
                  "respondWith": "noData"
            },
            "typeVersion": 1.1
      },
      {
            "id": "d2e53f7b-090a-4330-949d-d66ac0e5849c",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1494.8207799250774,
                  1400
            ],
            "parameters": {
                  "color": 5,
                  "width": 361.46312518523973,
                  "height": 113.6416448104651,
                  "content": "### 🙋 Remember to update your Slack Channels\nDon't forget to update the Slack Channels in the Slack nodes in these two subworkflows. \n"
            },
            "typeVersion": 1
      },
      {
            "id": "2731f910-288f-497a-a71d-d840a63b2930",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1480,
                  400
            ],
            "parameters": {
                  "color": 5,
                  "width": 376.26546828439086,
                  "height": 113.6416448104651,
                  "content": "### 🙋 Don't forget your slack credentials!\nThankfully n8n makes it easy, as long as you've added credentials to a normal slack node, these http nodes are a snap to change via the drop down. "
            },
            "typeVersion": 1
      },
      {
            "id": "72105959-ee9b-4ce6-a7f8-0f5f112c14d2",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1880,
                  500
            ],
            "parameters": {
                  "color": 5,
                  "width": 532.5097590794944,
                  "height": 671.013686767174,
                  "content": "![Imgur](https://uploads.n8n.io/templates/qualysscanreport.png)"
            },
            "typeVersion": 1
      },
      {
            "id": "49b8ce63-cefd-483a-b802-03e3500d807b",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1880,
                  -200
            ],
            "parameters": {
                  "color": 5,
                  "width": 535.8333316661616,
                  "height": 658.907292269235,
                  "content": "![Imgur](https://uploads.n8n.io/templates/qualysmodalscan.png)"
            },
            "typeVersion": 1
      },
      {
            "id": "3ec8c799-d5a5-4134-891a-59adb3e68e23",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  280,
                  -158.042446016207
            ],
            "parameters": {
                  "color": 5,
                  "width": 596.6847639718076,
                  "height": 422.00743613240917,
                  "content": "![Imgur](https://uploads.n8n.io/templates/qualysscanshortcut.png)\n### 🤖 Triggering this workflow is as easy as typing a backslash in Slack"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Webhook": {
            "main": [
                  [
                        {
                              "node": "Parse Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Parse Webhook": {
            "main": [
                  [
                        {
                              "node": "Route Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Route Message": {
            "main": [
                  [
                        {
                              "node": "Respond to Slack Webhook - Vulnerability",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Respond to Slack Webhook - Report",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Close Modal Popup",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Route Submission": {
            "main": [
                  [
                        {
                              "node": "Required Scan Variables",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Required Report Variables",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Close Modal Popup": {
            "main": [
                  [
                        {
                              "node": "Route Submission",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Required Scan Variables": {
            "main": [
                  [
                        {
                              "node": "Qualys Start Vulnerability Scan",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Required Report Variables": {
            "main": [
                  [
                        {
                              "node": "Qualys Create Report",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Respond to Slack Webhook - Report": {
            "main": [
                  [
                        {
                              "node": "Scan Report Task Modal",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Respond to Slack Webhook - Vulnerability": {
            "main": [
                  [
                        {
                              "node": "Vuln Scan Modal",
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
    name: "piepdrive-test",
    nodes: [
      {
            "id": "b2838678-c796-4c99-a3da-a2cd1b42ea97",
            "name": "Pipedrive Trigger - An Organization is created",
            "type": "n8n-nodes-base.pipedriveTrigger",
            "position": [
                  820,
                  380
            ],
            "webhookId": "f5de09a8-6601-4ad5-8bc8-9b3f4b83e997",
            "parameters": {
                  "action": "added",
                  "object": "organization"
            },
            "credentials": {
                  "pipedriveApi": {
                        "id": "",
                        "name": "Pipedrive Connection"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "5aa05d79-b2fa-4040-b4ca-cad83adf2798",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -20,
                  120
            ],
            "parameters": {
                  "width": 656.3637637842876,
                  "height": 1455.9537026322007,
                  "content": "# Enrich Pipedrive's Organization Data with GPT-4o When an Organization is Created in Pipedrive\n\nThis workflow **enriches a Pipedrive organization's data by adding a note to the organization object in Pipedrive**. It assumes there is a custom \"website\" field in your Pipedrive setup, as data will be scraped from this website to generate a note using OpenAI.\n\n## ⚠️ Disclaimer\n**These workflows use a scraping API. Before using it, ensure you comply with the regulations regarding web scraping in your country or state**.\n\n## Important Notes\n- The OpenAI model used is GPT-4o, chosen for its large input token context capacity. However, it is also **the most expensive option**, you should take cost into consideration.\n\n- The system prompt in the OpenAI Node generates output with relevant information, but feel free to improve or **modify it according to your needs**.\n\n## **How It Works**\n\n### Node 1: `Pipedrive Trigger - An Organization is Created`\nThis is the trigger of the workflow. When **an organization object is created in Pipedrive**, this node is triggered and retrieves the data. Make sure you have a \"website\" custom field (the name of the field in the n8n node will appear as a random ID and not with the Pipedrive custom field name).\n\n### Node 2: `ScrapingBee - Get Organization's Website's Homepage Content`\nThis node **scrapes the content** from the URL of the website associated with the **Pipedrive Organization** created in Node 1. The workflow uses the [ScrapingBee](https://www.scrapingbee.com/) API, but you can use any preferred API or simply the HTTP request node in n8n.\n\n### Node 3: `OpenAI - Message GPT-4o with Scraped Data`\nThis node sends HTML-scraped data from the previous node to the **OpenAI GPT-4 model**. The system prompt instructs the model to **extract company data**, such as products or services offered and competitors (if known by the model), and format it as HTML for optimal use in a Pipedrive Note.\n\n### Node 4: `Pipedrive - Create a Note with OpenAI Output`\nThis node **adds a Note to the Organization created in Pipedrive** using the OpenAI node output. The Note will include the company description, target market, selling products, and competitors (if GPT-4 was able to determine them).\n\n### Node 5 & 6: `HTML To Markdown` & `Code - Markdown to Slack Markdown`\nThese two nodes **format the HTML output to Slack Markdown**.\n\nThe Note created in Pipedrive is in HTML format, **as specified by the System Prompt of the OpenAI Node**. To send it to Slack, it needs to be converted to Markdown and then to Slack-specific Markdown.\n\n### Node 7: `Slack - Notify`\nThis node **sends a message in Slack containing the Pipedrive Organization Note** created with this workflow.\n"
            },
            "typeVersion": 1
      },
      {
            "id": "47ee8bfb-2f9d-4790-a929-1533215d6746",
            "name": "Pipedrive - Create a Note with OpenAI output",
            "type": "n8n-nodes-base.pipedrive",
            "position": [
                  1640,
                  380
            ],
            "parameters": {
                  "content": "={{ $json.message.content }}",
                  "resource": "note",
                  "additionalFields": {
                        "org_id": "={{ $('Pipedrive Trigger - An Organization is created').item.json.meta.id }}"
                  }
            },
            "credentials": {
                  "pipedriveApi": {
                        "id": "",
                        "name": "Pipedrive Connection"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "7783b531-0469-4bee-868e-4b26a1bb41ba",
            "name": "Code - Markdown to Slack Markdown",
            "type": "n8n-nodes-base.code",
            "position": [
                  2080,
                  380
            ],
            "parameters": {
                  "jsCode": "const inputMarkdown = items[0].json.data;\n\nfunction convertMarkdownToSlackFormat(markdown) {\n let slackFormatted = markdown;\n \n // Convert headers\n slackFormatted = slackFormatted.replace(/^# (.*$)/gim, '*$1*');\n slackFormatted = slackFormatted.replace(/^## (.*$)/gim, '*$1*');\n \n // Convert unordered lists\n slackFormatted = slackFormatted.replace(/^\\* (.*$)/gim, '➡️ $1');\n \n // Convert tables\n const tableRegex = /\\n\\|.*\\|\\n\\|.*\\|\\n((\\|.*\\|\\n)+)/;\n const tableMatch = slackFormatted.match(tableRegex);\n if (tableMatch) {\n const table = tableMatch[0];\n const rows = table.split('\\n').slice(3, -1);\n const formattedRows = rows.map(row => {\n const columns = row.split('|').slice(1, -1).map(col => col.trim());\n return `*${columns[0]}*: ${columns[1]}`;\n }).join('\\n');\n slackFormatted = slackFormatted.replace(table, formattedRows);\n }\n \n return slackFormatted;\n}\n\nconst slackMarkdown = convertMarkdownToSlackFormat(inputMarkdown);\nconsole.log(slackMarkdown);\n\n// Return data\nreturn [{ slackFormattedMarkdown: slackMarkdown }];\n"
            },
            "typeVersion": 2
      },
      {
            "id": "cf2b02df-07e8-4ebb-ba3d-bfd294dcfab0",
            "name": "Scrapingbee - Get Organization's URL content",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1040,
                  380
            ],
            "parameters": {
                  "url": "https://app.scrapingbee.com/api/v1",
                  "options": {},
                  "sendQuery": true,
                  "queryParameters": {
                        "parameters": [
                              {
                                    "name": "api_key",
                                    "value": "<YOUR_SCRAPINGBEE_API_KEY>"
                              },
                              {
                                    "name": "url",
                                    "value": "={{ $json.current.<random_api_id_custom_website_field> }}"
                              },
                              {
                                    "name": "render_js",
                                    "value": "false"
                              }
                        ]
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "906d44f0-7582-4742-9fd8-4c8dfba918e0",
            "name": "HTML To Markdown",
            "type": "n8n-nodes-base.markdown",
            "position": [
                  1860,
                  380
            ],
            "parameters": {
                  "html": "={{ $json.content }}",
                  "options": {}
            },
            "typeVersion": 1
      },
      {
            "id": "8c1a5d64-4f38-4f9e-8878-443f750206b7",
            "name": "Slack - Notify ",
            "type": "n8n-nodes-base.slack",
            "position": [
                  2300,
                  380
            ],
            "parameters": {
                  "text": "=*New Organizaton {{ $('Pipedrive Trigger - An Organization is created').item.json.current.name }} created on Pipedrive* :\n\n\n {{ $json.slackFormattedMarkdown }}",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "",
                        "cachedResultName": "pipedrive-notification"
                  },
                  "otherOptions": {},
                  "authentication": "oAuth2"
            },
            "credentials": {
                  "slackOAuth2Api": {
                        "id": "",
                        "name": "Slack Connection"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "2414a5d3-1d4b-447b-b401-4b6f823a0cf9",
            "name": "OpenAI - Message GPT-4o with Scraped Data",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  1260,
                  380
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
                                    "content": "={{ $json.data }}"
                              },
                              {
                                    "role": "system",
                                    "content": "You're an assistant that summarizes website content for CRM entries. The user will provide HTML content from a company's website. Your task is to analyze the HTML content and create a concise summary that includes:\n\n1. A brief description of the company's services or products.\n2. Any information about the company's target market or customer base.\n3. Key points about the company's unique selling propositions or competitive advantages.\n4. Based on the provided information, suggest potential competitors if you know any.\n\nFormat your response as HTML.\n\nExample response :\n\n <h1>Company Description</h1>\n <p>Company1 specializes in services related to electric vehicles. The company focuses on providing resources and information about electric car chargers, battery life, different car brands, and the environmental impact of electric vehicles.</p>\n\n <h2>Target Market</h2>\n <p>The target market for Company1 includes electric vehicle owners and potential buyers who are interested in making the shift from traditional fossil fuel vehicles to electric cars. The company also targets environmentally conscious consumers who are looking for sustainable mobility solutions.</p>\n\n <h2>Unique Selling Propositions</h2>\n <ul>\n <li>Comprehensive information about electric vehicle charging solutions, including how to install home charging stations.</li>\n <li>Detailed articles on the advantages of electric vehicles such as ecology and reliability.</li>\n <li>Educational resources on the autonomy and battery life of different electric car models.</li>\n <li>Insights into premier electric vehicle brands.</li>\n </ul>\n\n <h2>Potential Competitors</h2>\n <table border=\"1\">\n <tr>\n <th>Competitor Name</th>\n <th>Website</th>\n </tr>\n <tr>\n <td>Competitor1</td>\n <td><a href=\"https://www.example1.com\">https://www.example1.com</a></td>\n </tr>\n <tr>\n <td>Competitor2</td>\n <td><a href=\"https://www.example2.com\">https://www.example2.com</a></td>\n </tr>\n <tr>\n <td>Competitor3</td>\n <td><a href=\"https://www.example3.com\">https://www.example3.com</a></td>\n </tr>\n <tr>\n <td>Competitor4</td>\n <td><a href=\"https://www.example4.com\">https://www.example4.com</a></td>\n </tr>\n </table>\n"
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "",
                        "name": "OpenAi Connection"
                  }
            },
            "typeVersion": 1.3
      }
],
    connections: {
      "HTML To Markdown": {
            "main": [
                  [
                        {
                              "node": "Code - Markdown to Slack Markdown",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Code - Markdown to Slack Markdown": {
            "main": [
                  [
                        {
                              "node": "Slack - Notify ",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "OpenAI - Message GPT-4o with Scraped Data": {
            "main": [
                  [
                        {
                              "node": "Pipedrive - Create a Note with OpenAI output",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pipedrive - Create a Note with OpenAI output": {
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
      "Scrapingbee - Get Organization's URL content": {
            "main": [
                  [
                        {
                              "node": "OpenAI - Message GPT-4o with Scraped Data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Pipedrive Trigger - An Organization is created": {
            "main": [
                  [
                        {
                              "node": "Scrapingbee - Get Organization's URL content",
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
    name: "IT Ops AI SlackBot Workflow - Chat With Your Knowledge Base",
    nodes: [
      {
            "id": "96ef3bfe-a493-4377-b090-6b2d02d87480",
            "name": "Verify Webhook",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  1420,
                  800
            ],
            "parameters": {
                  "options": {
                        "responseCode": 200,
                        "responseHeaders": {
                              "entries": [
                                    {
                                          "name": "Content-type",
                                          "value": "application/json"
                                    }
                              ]
                        }
                  },
                  "respondWith": "json",
                  "responseBody": "={\"challenge\":\"{{ $json.body.challenge }}\"}"
            },
            "typeVersion": 1
      },
      {
            "id": "38db6da6-13bf-47a1-b5cb-f06403b309ac",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  2120,
                  1220
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
            "id": "139b606d-29ae-480d-bde7-458ef45dba01",
            "name": "No Operation, do nothing",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1840,
                  700
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "64acd4c6-cd53-46e5-a29e-40884044b186",
            "name": "Window Buffer Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "position": [
                  2800,
                  1220
            ],
            "parameters": {
                  "sessionKey": "={{ $('Receive DMs').item.json[\"body\"][\"event\"][\"channel\"] }}",
                  "sessionIdType": "customKey",
                  "contextWindowLength": 10
            },
            "typeVersion": 1.2
      },
      {
            "id": "e605864f-198e-4358-8333-50ed962d4e50",
            "name": "Check if Bot",
            "type": "n8n-nodes-base.if",
            "position": [
                  1640,
                  800
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
                                    "id": "89ed1b2a-5e42-4196-989d-f7f81df04b6d",
                                    "operator": {
                                          "type": "string",
                                          "operation": "notExists",
                                          "singleValue": true
                                    },
                                    "leftValue": "={{ $json.body.event.user }}",
                                    "rightValue": ""
                              }
                        ]
                  }
            },
            "typeVersion": 2
      },
      {
            "id": "8479c41e-b251-4f32-8daa-421969c4c8b3",
            "name": "Send Initial Message",
            "type": "n8n-nodes-base.slack",
            "position": [
                  2140,
                  820
            ],
            "parameters": {
                  "text": "On it! Let me check Confluence to see if there are any relevant links to answer your question. ",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Receive DMs').item.json[\"body\"][\"event\"][\"channel\"] }}"
                  },
                  "otherOptions": {
                        "botProfile": {
                              "imageValues": {
                                    "icon_url": "https://avatars.slack-edge.com/2024-08-30/7671440019297_d6ce97ff3ab5a3abf9c1_72.jpg",
                                    "profilePhotoType": "image"
                              }
                        },
                        "includeLinkToWorkflow": false
                  }
            },
            "credentials": {
                  "slackApi": {
                        "id": "OfRxDxHFIqk1q44a",
                        "name": "helphub n8n labs auth"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "dcd325b1-1ee8-4133-9a6e-8b37bf20d056",
            "name": "Delete Initial Message",
            "type": "n8n-nodes-base.slack",
            "position": [
                  2960,
                  760
            ],
            "parameters": {
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Receive DMs').item.json[\"body\"][\"event\"][\"channel\"] }}"
                  },
                  "operation": "delete",
                  "timestamp": "={{ $('Send Initial Message').item.json[\"message_timestamp\"] }}"
            },
            "credentials": {
                  "slackApi": {
                        "id": "OfRxDxHFIqk1q44a",
                        "name": "helphub n8n labs auth"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "8d3ac15c-b0bc-459c-9523-685b7f498efb",
            "name": "Send Message",
            "type": "n8n-nodes-base.slack",
            "position": [
                  3160,
                  760
            ],
            "parameters": {
                  "text": "={{ $('AI Agent').item.json.output.replace(/\\[(.+?)\\]\\((.+?)\\)/g, '<$2|$1>').replace(/\\*\\*(.+?)\\*\\*/g, '*$1*') }}",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Receive DMs').item.json[\"body\"][\"event\"][\"channel\"] }}"
                  },
                  "otherOptions": {
                        "botProfile": {
                              "imageValues": {
                                    "icon_url": "https://avatars.slack-edge.com/2024-08-30/7671440019297_d6ce97ff3ab5a3abf9c1_72.jpg",
                                    "profilePhotoType": "image"
                              }
                        },
                        "includeLinkToWorkflow": false
                  }
            },
            "credentials": {
                  "slackApi": {
                        "id": "OfRxDxHFIqk1q44a",
                        "name": "helphub n8n labs auth"
                  }
            },
            "typeVersion": 2.1
      },
      {
            "id": "02afa6b3-c528-4925-8b92-7b708b10e7ca",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1160,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 414.5626477541374,
                  "height": 516.5011820330969,
                  "content": "![Imgur](https://i.imgur.com/iKyMV0N.png)\n## Webhook Trigger\nThe first node receives all messages from Slack API via Subscription Events API. You can find more information about setting up the subscription events API by [clicking here](https://api.slack.com/apis/connections/events-api). The second node responds to the periodic security challenges that Slack sends to ensure the N8n webhook is still active. "
            },
            "typeVersion": 1
      },
      {
            "id": "a8caa088-80dd-44a8-8c61-7a03a37de386",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1600,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 403.49881796690335,
                  "height": 517.6832151300242,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n## Check for Bot Responses\nIf the message received is from a Bot instead of a real user, it will ignore the message."
            },
            "typeVersion": 1
      },
      {
            "id": "17b51014-4f9d-4650-963b-8d8d944869ea",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2900,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 430.54373522458616,
                  "height": 451.3947990543734,
                  "content": "![Slack](https://i.imgur.com/iKyMV0N.png)\n## Delete Receipt and Send Response \nOnce the AI response is generated in response to the slack message, n8n delete's it's original *Message Received* message to avoid cluttering up the user's DMs, and then sends the final Slack message back to the user. "
            },
            "typeVersion": 1
      },
      {
            "id": "494a9ada-18e9-48a6-86a9-5e72cc797ddf",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2394.7517730496443,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 488.1796690307332,
                  "height": 723.5460992907797,
                  "content": "![OpenAI](https://i.imgur.com/o89G0If.png)\n## Parse Response with AI Model \nThis workflow currently uses OpenAI to power it's responses, but you can open the AI Agent node below and set your own AI LLM using the n8n options offered. "
            },
            "typeVersion": 1
      },
      {
            "id": "31bc923f-c981-45fd-827d-cede2ec3f3c3",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2020,
                  460
            ],
            "parameters": {
                  "color": 7,
                  "width": 356.5484633569741,
                  "height": 516.5011820330968,
                  "content": "![Slack](https://i.imgur.com/iKyMV0N.png)\n## Response Received\nOnce N8n sees that the messaged received is from a user, it will respond right away to acknowledge a message was received. You can edit the message by opening the node below. "
            },
            "typeVersion": 1
      },
      {
            "id": "e81d6b07-9ac0-4848-ab7f-57a588103ce5",
            "name": "Sticky Note5",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2980,
                  1200
            ],
            "parameters": {
                  "color": 7,
                  "width": 951.1571908442271,
                  "height": 467.66775526888296,
                  "content": "![n8n](https://i.imgur.com/FWJX4km.png)\n## Build n8n workflow to query Knowledge Base\nBuilding your own tools for an AI Agent to use is simple and straightforward, but requires that you build a second workflow and then connect it to this one by inputting the workflow ID from the workflow URL in the *Custom n8n KB Tool* sub node. \n\nThis gives you the freedom to work with any tool, whether n8n has support for it or not. In this sample build, we have connected the AI agent to Confluence, which does not have a native built in n8n node. For this we use the HTTP request node and pointed it to Confluence's search api. It then returns a response that the AI agent uses to generate a final slack message response to the user. "
            },
            "typeVersion": 1
      },
      {
            "id": "890aeb96-1721-4cb4-a609-5409b30d5f6c",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2320,
                  1200
            ],
            "parameters": {
                  "color": 7,
                  "width": 644.582152697438,
                  "height": 318.6662788502134,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n\n## Remembers the last 5 messages that a user sent\nBecause we are passing the channel ID of the user to the memory module, n8n is storing the last 5 slack messages sent to it per slack channel. This means that it will remember all your users conversations separately from one another and not get confused by different requests from different users. You can increase the memory storage by using a different storage medium and increase the number of prompts and responses it should remember. "
            },
            "typeVersion": 1
      },
      {
            "id": "1fa61c12-70d1-4d7e-8564-a2a574804243",
            "name": "Sticky Note7",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1660,
                  1200
            ],
            "parameters": {
                  "color": 7,
                  "width": 644.582152697438,
                  "height": 318.6662788502134,
                  "content": "![OpenAI](https://i.imgur.com/o89G0If.png)\n\n## Change the AI Agents LLM\nTo change the model used, simply delete the ChatGPT model and replace with a different supported model by hitting the plus sign under model in the AI Agent."
            },
            "typeVersion": 1
      },
      {
            "id": "fecd81da-4723-4886-8d6f-9729623028a9",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  460,
                  460
            ],
            "parameters": {
                  "width": 675.1724774900403,
                  "height": 994.2389415638766,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n# Streamline IT Inquiries with n8n & AI!\n\n## Introducing the IT Ops AI SlackBot Workflow---a sophisticated solution designed to automate and optimize the management of IT-related inquiries via Slack.\n\nWhen an employee messages the IT department slack app, the workflow kicks off with the \"Receive DMs\" node, which captures incoming messages and ensures a secure and active communication line by responding to Slack's webhook challenges.\n\n**How It Works:**\n\n- Verify Webhook: Responds to slacks challenge and respond requests to ensure is still active.\n- Check if bot: Checks whether the message sender is a bot to prevent unnecessary processing.\n- Send Initial Message: Sends a quick confirmation, like \"On it!\", to let the user know their query is being handled.\n- AI-Driven Responses: Employs the \"AI Agent\" node with OpenAI to craft relevant replies based on the conversation history maintained by the \"Window Buffer Memory\" node.\n- Knowledge Integration tool: Uses a custom Knowledge Base tool to fetch pertinent information from confluence, enhancing the quality of responses.\n- Cleanup and Reply: Deletes the initial acknowledgment to tidy up before sending the final detailed response back to the user.\n\n\n**Get Started:**\n- Ensure your [Slack](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.slack) and [OpenAI](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=@n8n/n8n-nodes-langchain.lmChatOpenAi) integrations are properly set up.\n- Customize the workflow to align with your IT department's protocols.\n\n\n**Need Help?**\n- Join the discussion on our Forum or check out resources on Discord!\n\n\nDeploy this workflow to improve response times and enhance the efficiency of your IT support services."
            },
            "typeVersion": 1
      },
      {
            "id": "16b79887-8218-4056-8add-39ebee6166bd",
            "name": "Receive DMs",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  1200,
                  800
            ],
            "webhookId": "44c26a10-d54a-46ce-a522-5d83e8a854be",
            "parameters": {
                  "path": "44c26a10-d54a-46ce-a522-5d83e8a854be",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "201b5399-6fff-48ca-81f0-a5cfc02c46d5",
            "name": "Call Confluence Workflow Tool",
            "type": "@n8n/n8n-nodes-langchain.toolWorkflow",
            "position": [
                  3380,
                  1280
            ],
            "parameters": {
                  "name": "confluence_kb_search",
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "Pxzc65WaCPn2yB5I",
                        "cachedResultName": "KB Tool - Confluence KB"
                  },
                  "description": "Call this tool to search n8n-labs confluence knowledge base. The input should be the user prompt reduced into 1 to 3 keywords to use for a KB search. These words should be words that are most likely to be contained in the text of a KB article that is helpful based on the user prompt. The words should be the only response and they should just be separated by a space."
            },
            "typeVersion": 1.2
      },
      {
            "id": "41026e03-5844-4e57-86bf-fc7e586265a4",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "position": [
                  2500,
                  820
            ],
            "parameters": {
                  "text": "={{ $('Receive DMs').item.json.body.event.text }}",
                  "options": {
                        "humanMessage": "TOOLS\n------\nAssistant can ask the user to use tools to look up information that may be helpful in answering the users original question. The tools the human can use are:\n\n{tools}\n\nIf no response is given for a given tool or the response is an error, then do not reference the tool results and instead ask for more context. \n\nThe tools currently search Notion and returns back a list of results. Please try to respond using the most relevant result URL to guide the user to the right answer. \n\nIf you are not sure, let the user know you were unable to find a notion page for them to help, but give them the top results that are relevant to their request.\n\nPlease summarize the results and return all the URLs exactly as you get them from the tool. Please format all links you send in this format: <url|name of url> \nAdditionally, here are other formatting layouts to use: \n_italic_ will produce italicized text\n*bold* will produce bold text\n~strike~ will produce strikethrough text\n\n{format_instructions}\n\nUSER'S INPUT\n--------------------\nHere is the user's input (remember to respond with a slack flavored (see above for more details) code snippet of a json blob with a single action, and NOTHING else):\n\n{{input}}\n",
                        "maxIterations": 2,
                        "systemMessage": "You are Knowledge Ninja, a specialized IT support tool developed to streamline interactions between employees and the IT department and the company knowledge base. \n\nDesigned with efficiency in mind, Knowledge Ninja is equipped to handle a variety of IT-related queries, from sales competition analysis to troubleshooting to more complex technical guidance.\n\nAs a dynamic knowledge tool, Knowledge Ninja utilizes a comprehensive internal knowledge base that can be tailored to your organization's specific IT infrastructure and policies. \n\nThis allows it to deliver precise and contextually relevant information swiftly, enhancing the support process.\n\nKnowledge Ninja is continuously updated to reflect the latest IT standards and practices, ensuring that the guidance it provides is both accurate and up-to-date. \n\nIts capabilities include understanding detailed queries, providing step-by-step troubleshooting instructions, and clarifying IT policies.\n\nPlease format all links you send in this format: <url|name of url> \nAdditionally, here are other formatting layouts to use: \n_italic_ will produce italicized text\n*bold* will produce bold text\n~strike~ will produce strikethrough text"
                  },
                  "promptType": "define"
            },
            "typeVersion": 1.5
      }
],
    connections: {
      "AI Agent": {
            "main": [
                  [
                        {
                              "node": "Delete Initial Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Receive DMs": {
            "main": [
                  [
                        {
                              "node": "Verify Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Check if Bot": {
            "main": [
                  [
                        {
                              "node": "No Operation, do nothing",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Send Initial Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Verify Webhook": {
            "main": [
                  [
                        {
                              "node": "Check if Bot",
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
      "Send Initial Message": {
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
      "Delete Initial Message": {
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
      "Call Confluence Workflow Tool": {
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
    name: "Sentiment Analysis Tracking On Support Issues With Linear And Slack",
    nodes: [
      {
            "id": "82fd6023-2cc3-416e-83b7-fda24d07d77a",
            "name": "Issues to List",
            "type": "n8n-nodes-base.splitOut",
            "position": [
                  40,
                  -100
            ],
            "parameters": {
                  "options": {},
                  "fieldToSplitOut": "data.issues.nodes"
            },
            "typeVersion": 1
      },
      {
            "id": "9cc77786-e14f-47c6-a3cf-60c2830612e6",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  360,
                  80
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
            "id": "821d4a60-81a4-4915-9c13-3d978cc0114b",
            "name": "Combine Sentiment Analysis",
            "type": "n8n-nodes-base.set",
            "position": [
                  700,
                  -80
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{\n{\n ...$('Issues to List').item.json,\n ...$json.output\n}\n}}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "fe6560f6-2e1b-4442-a2af-bd5a1623f213",
            "name": "Sentiment over Issue Comments",
            "type": "@n8n/n8n-nodes-langchain.informationExtractor",
            "position": [
                  360,
                  -80
            ],
            "parameters": {
                  "text": "={{\n$json.comments.nodes.map(node => [\n `${node.user.displayName} commented on ${node.createdAt}:`,\n node.body\n].join('\\n')).join('---\\n')\n}}",
                  "options": {},
                  "attributes": {
                        "attributes": [
                              {
                                    "name": "sentiment",
                                    "required": true,
                                    "description": "One of positive, negative or neutral"
                              },
                              {
                                    "name": "sentimentSummary",
                                    "description": "Describe the sentiment of the conversation"
                              }
                        ]
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "4fd0345d-e5bf-426d-8403-e2217e19bbea",
            "name": "Copy of Issue",
            "type": "n8n-nodes-base.set",
            "position": [
                  1200,
                  -60
            ],
            "parameters": {
                  "mode": "raw",
                  "options": {},
                  "jsonOutput": "={{ $json }}"
            },
            "typeVersion": 3.4
      },
      {
            "id": "6d103d67-451e-4780-8f52-f4dba4b42860",
            "name": "For Each Issue...",
            "type": "n8n-nodes-base.splitInBatches",
            "position": [
                  1020,
                  -60
            ],
            "parameters": {
                  "options": {}
            },
            "typeVersion": 3
      },
      {
            "id": "032702d9-27d8-4735-b978-20b55bc1a74f",
            "name": "Get Existing Sentiment",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1380,
                  -60
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appViDaeaFw4qv9La",
                        "cachedResultUrl": "https://airtable.com/appViDaeaFw4qv9La",
                        "cachedResultName": "Sentiment Analysis over Issue Comments"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblhO0sfRhKP6ibS8",
                        "cachedResultUrl": "https://airtable.com/appViDaeaFw4qv9La/tblhO0sfRhKP6ibS8",
                        "cachedResultName": "Table 1"
                  },
                  "options": {
                        "fields": [
                              "Issue ID",
                              "Current Sentiment"
                        ]
                  },
                  "operation": "search",
                  "filterByFormula": "={Issue ID} = '{{ $json.identifier || 'XYZ' }}'"
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
            "id": "f2ded6fa-8b0f-4a34-868c-13c19f725c98",
            "name": "Update Row",
            "type": "n8n-nodes-base.airtable",
            "position": [
                  1560,
                  -60
            ],
            "parameters": {
                  "base": {
                        "__rl": true,
                        "mode": "list",
                        "value": "appViDaeaFw4qv9La",
                        "cachedResultUrl": "https://airtable.com/appViDaeaFw4qv9La",
                        "cachedResultName": "Sentiment Analysis over Issue Comments"
                  },
                  "table": {
                        "__rl": true,
                        "mode": "list",
                        "value": "tblhO0sfRhKP6ibS8",
                        "cachedResultUrl": "https://airtable.com/appViDaeaFw4qv9La/tblhO0sfRhKP6ibS8",
                        "cachedResultName": "Table 1"
                  },
                  "columns": {
                        "value": {
                              "Summary": "={{ $('Copy of Issue').item.json.sentimentSummary || '' }}",
                              "Assigned": "={{ $('Copy of Issue').item.json.assignee.name }}",
                              "Issue ID": "={{ $('Copy of Issue').item.json.identifier }}",
                              "Issue Title": "={{ $('Copy of Issue').item.json.title }}",
                              "Issue Created": "={{ $('Copy of Issue').item.json.createdAt }}",
                              "Issue Updated": "={{ $('Copy of Issue').item.json.updatedAt }}",
                              "Current Sentiment": "={{ $('Copy of Issue').item.json.sentiment.toSentenceCase() }}",
                              "Previous Sentiment": "={{ !$json.isEmpty() ? $json['Current Sentiment'] : 'N/A' }}"
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
                                    "id": "Issue ID",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Issue ID",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Previous Sentiment",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "Positive",
                                                "value": "Positive"
                                          },
                                          {
                                                "name": "Negative",
                                                "value": "Negative"
                                          },
                                          {
                                                "name": "Neutral",
                                                "value": "Neutral"
                                          },
                                          {
                                                "name": "N/A",
                                                "value": "N/A"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Previous Sentiment",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Current Sentiment",
                                    "type": "options",
                                    "display": true,
                                    "options": [
                                          {
                                                "name": "Positive",
                                                "value": "Positive"
                                          },
                                          {
                                                "name": "Negative",
                                                "value": "Negative"
                                          },
                                          {
                                                "name": "Neutral",
                                                "value": "Neutral"
                                          },
                                          {
                                                "name": "N/A",
                                                "value": "N/A"
                                          }
                                    ],
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Current Sentiment",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Summary",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Summary",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Issue Title",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Issue Title",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Issue Created",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Issue Created",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Issue Updated",
                                    "type": "dateTime",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Issue Updated",
                                    "defaultMatch": false,
                                    "canBeUsedToMatch": true
                              },
                              {
                                    "id": "Assigned",
                                    "type": "string",
                                    "display": true,
                                    "removed": false,
                                    "readOnly": false,
                                    "required": false,
                                    "displayName": "Assigned",
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
                              "Issue ID"
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
            "id": "e6fb0b8f-2469-4b66-b9e2-f4f3c0a613af",
            "name": "Airtable Trigger",
            "type": "n8n-nodes-base.airtableTrigger",
            "position": [
                  1900,
                  -40
            ],
            "parameters": {
                  "baseId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "appViDaeaFw4qv9La"
                  },
                  "tableId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "tblhO0sfRhKP6ibS8"
                  },
                  "pollTimes": {
                        "item": [
                              {
                                    "mode": "everyHour"
                              }
                        ]
                  },
                  "triggerField": "Current Sentiment",
                  "authentication": "airtableTokenApi",
                  "additionalFields": {}
            },
            "credentials": {
                  "airtableTokenApi": {
                        "id": "Und0frCQ6SNVX3VV",
                        "name": "Airtable Personal Access Token account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "669762c4-860b-43ad-b677-72d4564e1c29",
            "name": "Sentiment Transition",
            "type": "n8n-nodes-base.switch",
            "position": [
                  2080,
                  -40
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "NON-NEGATIVE to NEGATIVE",
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
                                                      "leftValue": "={{ $json.fields[\"Previous Sentiment\"] !== 'Negative' && $json.fields[\"Current Sentiment\"] === 'Negative' }}",
                                                      "rightValue": ""
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "none"
                  }
            },
            "typeVersion": 3.2
      },
      {
            "id": "2fbcfbea-3989-459b-8ca7-b65c130a479b",
            "name": "Fetch Active Linear Issues",
            "type": "n8n-nodes-base.graphql",
            "position": [
                  -140,
                  -100
            ],
            "parameters": {
                  "query": "=query (\n $filter: IssueFilter\n) {\n issues(\n filter: $filter\n ) {\n nodes {\n id\n identifier\n title\n description\n url\n createdAt\n updatedAt\n assignee {\n name\n }\n comments {\n nodes {\n id\n createdAt\n user {\n displayName\n }\n body\n }\n }\n }\n }\n}",
                  "endpoint": "https://api.linear.app/graphql",
                  "variables": "={{\n{\n \"filter\": {\n updatedAt: { gte: $now.minus(30, 'minutes').toISO() }\n }\n}\n}}",
                  "requestFormat": "json",
                  "authentication": "headerAuth"
            },
            "credentials": {
                  "httpHeaderAuth": {
                        "id": "XME2Ubkuy9hpPEM5",
                        "name": "Linear.app (heightio)"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "aaf1c25e-c398-4715-88bf-bd98daafc10f",
            "name": "Schedule Trigger",
            "type": "n8n-nodes-base.scheduleTrigger",
            "position": [
                  -340,
                  -100
            ],
            "parameters": {
                  "rule": {
                        "interval": [
                              {
                                    "field": "minutes",
                                    "minutesInterval": 30
                              }
                        ]
                  }
            },
            "typeVersion": 1.2
      },
      {
            "id": "b3e2df39-90ce-4ebf-aa68-05499965ec30",
            "name": "Deduplicate Notifications",
            "type": "n8n-nodes-base.removeDuplicates",
            "position": [
                  2280,
                  -40
            ],
            "parameters": {
                  "options": {},
                  "operation": "removeItemsSeenInPreviousExecutions",
                  "dedupeValue": "={{ $json.fields[\"Issue ID\"] }}:{{ $json.fields['Last Modified'] }}"
            },
            "typeVersion": 2
      },
      {
            "id": "2a116475-32cd-4c9d-bfc1-3bd494f79a49",
            "name": "Report Issue Negative Transition",
            "type": "n8n-nodes-base.slack",
            "position": [
                  2480,
                  -40
            ],
            "webhookId": "612f1001-3fcc-480b-a835-05f9e2d56a5f",
            "parameters": {
                  "text": "={{ $('Deduplicate Notifications').all().length }} Issues have transitions to Negative Sentiment",
                  "select": "channel",
                  "blocksUi": "={{\n{\n \"blocks\": [\n {\n \"type\": \"section\",\n \"text\": {\n \"type\": \"mrkdwn\",\n \"text\": \":rotating_light: The following Issues transitioned to Negative Sentiment\"\n }\n },\n {\n \"type\": \"divider\"\n },\n ...($('Deduplicate Notifications').all().map(item => (\n {\n \"type\": \"section\",\n \"text\": {\n \"type\": \"mrkdwn\",\n \"text\": `*<https://linear.app/myOrg/issue/${$json.fields['Issue ID']}|${$json.fields['Issue ID']} ${$json.fields['Issue Title']}>*\\n${$json.fields.Summary}`\n }\n }\n )))\n ]\n}\n}}",
                  "channelId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "C0749JVFERK",
                        "cachedResultName": "n8n-tickets"
                  },
                  "messageType": "block",
                  "otherOptions": {}
            },
            "credentials": {
                  "slackApi": {
                        "id": "VfK3js0YdqBdQLGP",
                        "name": "Slack account"
                  }
            },
            "executeOnce": true,
            "typeVersion": 2.3
      },
      {
            "id": "1f3d30b6-de31-45a8-a872-554c339f112f",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -420,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 660,
                  "height": 440,
                  "content": "## 1. Continuously Monitor Active Linear Issues\n[Learn more about the GraphQL node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.graphql)\n\nTo keep up with the latest changes in our active Linear tickets, we'll need to use Linear's GraphQL endpoint because filtering is currently unavailable in the official Linear.app node.\n\nFor this demonstration, we'll check for updated tickets every 30mins."
            },
            "typeVersion": 1
      },
      {
            "id": "9024512d-5cb9-4e9f-b6e1-495d1a32118a",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  260,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 640,
                  "height": 560,
                  "content": "## 2. Sentiment Analysis on Current Issue Activity\n[Learn more about the Information Extractor node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor)\n\nWith our recently updated posts, we can use our AI to perform a quick sentiment analysis on the ongoing conversation to check the overall mood of the support issue. This is a great way to check how things are generally going in the support queue; positive should be normal but negative could indicate some uncomfortableness or even frustration."
            },
            "typeVersion": 1
      },
      {
            "id": "233ebd6d-38cb-4f2d-84b5-29c97d30d77b",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  920,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 840,
                  "height": 560,
                  "content": "## 3. Capture and Track Results in Airtable\n[Learn more about the Airtable node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable)\n\nNext, we can capture this analysis in our insights database as means for human review. When the issue is new, we can create a new row but if the issue exists, we will update it's existing row instead.\n\nWhen updating an existing row, we move its previous \"current sentiment\" value into the \"previous sentiment\" column and replace with our new current sentiment. This gives us a \"sentiment transition\" which will be useful in the next step.\n\nCheck out the Airtable here: https://airtable.com/appViDaeaFw4qv9La/shrq6HgeYzpW6uwXL"
            },
            "typeVersion": 1
      },
      {
            "id": "a2229225-b580-43cb-b234-4f69cb5924fd",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1800,
                  -320
            ],
            "parameters": {
                  "color": 7,
                  "width": 920,
                  "height": 560,
                  "content": "## 4. Get Notified when Sentiment becomes Negative\n[Learn more about the Slack node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack/)\n\nA good use-case for tracking sentiment transitions could be to be alerted if ever an issue moves from a non-negative sentiment to a negative one. This could be a signal of issue handling troubles which may require attention before it escalates.\n\nIn this demonstration, we use the Airtable trigger to catch rows which have their sentiment column updated and check for the non-negative-to-negative sentiment transition using the switch node. For those matching rows, we combine add send a notification via slack. A cool trick is to use the \"remove duplication\" node to prevent repeat notifications for the same updates - here we combine the Linear issue key and the row's last modified date."
            },
            "typeVersion": 1
      },
      {
            "id": "6f26769e-ec5d-46d0-ae0a-34148b24e6a2",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -940,
                  -720
            ],
            "parameters": {
                  "width": 480,
                  "height": 840,
                  "content": "## Try It Out!\n### This n8n template performs continous monitoring on Linear Issue conversations performing sentiment analysis and alerting when the sentiment becomes negative.\nThis is helpful to quickly identify difficult customer support situations early and prioritising them before they get out of hand.\n\n## How it works\n* A scheduled trigger is used to fetch recently updated issues in Linear using the GraphQL node.\n* Each issue's comments thread is passed into a simple Information Extractor node to identify the overall sentiment.\n* The resulting sentiment analysis combined with the some issue details are uploaded to Airtable for review.\n* When the template is re-run at a later date, each issue is re-analysed for sentiment\n* Each issue's new sentiment state is saved to the airtable whilst its previous state is moved to the \"previous sentiment\" column.\n* An Airtable trigger is used to watch for recently updated rows\n* Each matching Airtable row is filtered to check if it has a previous non-negative state but now has a negative state in its current sentiment.\n* The results are sent via notification to a team slack channel for priority.\n\n**Check out the sample Airtable here**: https://airtable.com/appViDaeaFw4qv9La/shrq6HgeYzpW6uwXL\n\n## How to use\n* Modify the GraphQL filter to fetch issues to a relevant issue type, team or person.\n* Update the Slack channel to ensure messages are sent to the correct location.\n\n### Need Help?\nJoin the [Discord](https://discord.com/invite/XPKeKXeB7d) or ask in the [Forum](https://community.n8n.io/)!\n\nHappy Hacking!"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Update Row": {
            "main": [
                  [
                        {
                              "node": "For Each Issue...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Copy of Issue": {
            "main": [
                  [
                        {
                              "node": "Get Existing Sentiment",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Issues to List": {
            "main": [
                  [
                        {
                              "node": "Sentiment over Issue Comments",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Airtable Trigger": {
            "main": [
                  [
                        {
                              "node": "Sentiment Transition",
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
                              "node": "Fetch Active Linear Issues",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "For Each Issue...": {
            "main": [
                  [],
                  [
                        {
                              "node": "Copy of Issue",
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
                              "node": "Sentiment over Issue Comments",
                              "type": "ai_languageModel",
                              "index": 0
                        }
                  ]
            ]
      },
      "Sentiment Transition": {
            "main": [
                  [
                        {
                              "node": "Deduplicate Notifications",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Existing Sentiment": {
            "main": [
                  [
                        {
                              "node": "Update Row",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Deduplicate Notifications": {
            "main": [
                  [
                        {
                              "node": "Report Issue Negative Transition",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Combine Sentiment Analysis": {
            "main": [
                  [
                        {
                              "node": "For Each Issue...",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Fetch Active Linear Issues": {
            "main": [
                  [
                        {
                              "node": "Issues to List",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Sentiment over Issue Comments": {
            "main": [
                  [
                        {
                              "node": "Combine Sentiment Analysis",
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
    name: "My workflow 6",
    nodes: [
      {
            "id": "82670f40-2e3b-4e02-ae52-f2c918c3aa1c",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -80,
                  -600
            ],
            "parameters": {
                  "color": 7,
                  "width": 280,
                  "height": 380,
                  "content": "## Command Trigger\n\nCopy the webhook URL, paste it into the Request URL of the Slack slash command, and complete the creation.\n\n\n웹훅 URL을 복사하여 슬랙 슬래시 커맨드의 Request URL에 붙이고 생성을 완료하세요."
            },
            "typeVersion": 1
      },
      {
            "id": "28f56691-0ad5-47b1-974b-1ece4890933b",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  260,
                  -600
            ],
            "parameters": {
                  "color": 7,
                  "height": 380,
                  "content": "## Command Switch\n\nSwitch each slash command.\n\n각 슬래시 커맨드를 분기하세요."
            },
            "typeVersion": 1
      },
      {
            "id": "9dc9ca95-e29d-44d9-9e09-b2a72d9ad23a",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  600,
                  -600
            ],
            "parameters": {
                  "color": 7,
                  "width": 360,
                  "height": 380,
                  "content": "## Create AI Messages"
            },
            "typeVersion": 1
      },
      {
            "id": "025c5a59-06b6-4b6d-b3e0-aa782a133c97",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1060,
                  -600
            ],
            "parameters": {
                  "color": 7,
                  "height": 340,
                  "content": "## Send a Slack Message"
            },
            "typeVersion": 1
      },
      {
            "id": "cb60e9b0-a9a8-4dd6-9aa3-9d22c7f5f537",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  -20,
                  -380
            ],
            "webhookId": "1bd05fcf-8286-491f-ae13-f0e6bff4aca6",
            "parameters": {
                  "path": "1bd05fcf-8286-491f-ae13-f0e6bff4aca6",
                  "options": {
                        "responseCode": {
                              "values": {
                                    "responseCode": 204
                              }
                        }
                  },
                  "httpMethod": "POST"
            },
            "typeVersion": 2
      },
      {
            "id": "d60cfb45-df3d-4ab1-8e7e-1b2e81bc5b34",
            "name": "Switch",
            "type": "n8n-nodes-base.switch",
            "position": [
                  320,
                  -380
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "ask",
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
                                                      "leftValue": "={{ $json.body.command }}",
                                                      "rightValue": "/ask"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "another",
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
                                                      "id": "a0924665-de21-4d9b-a1d1-c9f41f74ee09",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.body.command }}",
                                                      "rightValue": "/another"
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
            "id": "810ac4dd-8241-4486-b183-74cbde3d58e7",
            "name": "Basic LLM Chain",
            "type": "@n8n/n8n-nodes-langchain.chainLlm",
            "position": [
                  640,
                  -500
            ],
            "parameters": {
                  "text": "={{ $json.body.text }}",
                  "promptType": "define"
            },
            "typeVersion": 1.5
      },
      {
            "id": "f173fe2d-45e7-460c-aa33-d5509b6d59b9",
            "name": "OpenAI Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            "position": [
                  720,
                  -340
            ],
            "parameters": {
                  "model": {
                        "__rl": true,
                        "mode": "list",
                        "value": "gpt-4o-mini"
                  },
                  "options": {}
            },
            "typeVersion": 1.2
      },
      {
            "id": "4752da4c-b013-4469-a3bc-386d3ab3d15d",
            "name": "Send a Message",
            "type": "n8n-nodes-base.slack",
            "position": [
                  1120,
                  -460
            ],
            "webhookId": "a37abc2a-6e8c-4c00-8543-3f313b300df6",
            "parameters": {
                  "text": "={{ $json.text }}",
                  "select": "channel",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "={{ $('Webhook').item.json.body.channel_id }}"
                  },
                  "otherOptions": {
                        "includeLinkToWorkflow": false
                  }
            },
            "typeVersion": 2.3
      },
      {
            "id": "c2f5dbcc-8283-47ab-b19a-810ad526d519",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -80,
                  -1060
            ],
            "parameters": {
                  "color": 7,
                  "width": 340,
                  "height": 400,
                  "content": "## 슬랙 Slash Command와 채널 메시지로 챗봇 만들기 🤖\n\n이 튜토리얼에서는 n8n을 활용해 슬랙에서 동작하는 AI 챗봇을 만드는 방법을 알려드립니다. 슬래시 커맨드를 통한 개인 메시지부터 공개 채널에서의 자동 응답까지, 실용적인 챗봇 구현 방법을 단계별로 설명합니다. 슬랙 앱 설정부터 n8n 노드 구성, 웹훅 트리거 설정, AI 봇 연동까지 하나하나 자세히 다룹니다.\n\n유튜브 링크:\nhttps://www.youtube.com/watch?v=UpudYFCWaIM\n"
            },
            "typeVersion": 1
      },
      {
            "id": "4ecdfdfa-8886-47c6-b9df-ac45321b0cea",
            "name": "Sticky Note10",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  300,
                  -1060
            ],
            "parameters": {
                  "color": 7,
                  "width": 340,
                  "height": 400,
                  "content": "## Create an AI chatbot with Slack slash commands! 🤖\n\nIn this tutorial, we'll show you how to create an AI chatbot that works in Slack using n8n. We'll explain step by step how to implement a practical chatbot, from personal messages through slash commands to automatic responses in public channels. We'll cover everything in detail, from Slack app configuration to n8n node setup, webhook trigger configuration, and AI bot integration.\n\nThe YouTube video is provided in Korean.\n\nYoutube Link:\nhttps://www.youtube.com/watch?v=UpudYFCWaIM\n"
            },
            "typeVersion": 1
      }
],
    connections: {
      "Switch": {
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
      "Webhook": {
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
      "Basic LLM Chain": {
            "main": [
                  [
                        {
                              "node": "Send a Message",
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
                              "node": "Basic LLM Chain",
                              "type": "ai_languageModel",
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
    name: "Venafi Cloud Slack Cert Bot",
    nodes: [
      {
            "id": "1092ab50-67a0-4e50-8c10-f05f70b45f56",
            "name": "Venafi TLS Protect Cloud",
            "type": "n8n-nodes-base.venafiTlsProtectCloud",
            "position": [
                  2860,
                  1700
            ],
            "parameters": {
                  "options": {},
                  "commonName": "={{ $('Parse Webhook').item.json.response.view.state.values.domain_name_block.domain_name_input.value.match(/^(\\*\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$/g).toString() }}",
                  "generateCsr": true,
                  "applicationId": "f3c15c80-7151-11ef-9a22-abeac49f7094",
                  "additionalFields": {
                        "organizationalUnits": [
                              "={{ $json.name }}"
                        ]
                  },
                  "certificateIssuingTemplateId": "d28d82b1-714b-11ef-9026-7bb80b32867a"
            },
            "credentials": {
                  "venafiTlsProtectCloudApi": {
                        "id": "WU38IpfutNNkJWuo",
                        "name": "Venafi TLS Protect Cloud account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "0c1f1b92-2da4-413f-a4cc-68c816e8511c",
            "name": "Parse Webhook",
            "type": "n8n-nodes-base.set",
            "position": [
                  440,
                  1100
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "e63f9299-a19d-4ba1-93b0-59f458769fb2",
                                    "name": "response",
                                    "type": "object",
                                    "value": "={{ $json.body.payload }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.3
      },
      {
            "id": "95fb1907-c9e0-4164-b0b0-c3691bb46b9a",
            "name": "Sticky Note",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  108.34675483142371,
                  741.4892041682327
            ],
            "parameters": {
                  "color": 7,
                  "width": 466.8168310000617,
                  "height": 556.7924159157113,
                  "content": "![Imgur](https://i.imgur.com/iKyMV0N.png)\n## Events Webhook Trigger\nThe first node receives all messages from Slack API via Subscription Events API. You can find more information about setting up the subscription events API by [clicking here](https://api.slack.com/apis/connections/events-api). \n\nThe second node extracts the payload from slack into an object that n8n can understand. "
            },
            "typeVersion": 1
      },
      {
            "id": "4dd8cbbe-278c-4c86-bcd7-9fb0eff619b2",
            "name": "Sticky Note15",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  580,
                  420
            ],
            "parameters": {
                  "color": 7,
                  "width": 566.0553219408072,
                  "height": 999.0925226187064,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n## Efficient Slack Interaction Handling with n8n\n\nThis section of the workflow is designed to efficiently manage and route messages and submissions from Slack based on specific triggers and conditions. When a Slack interaction occurs—such as a user triggering a vulnerability scan or generating a report through a modal—the workflow intelligently routes the message to the appropriate action:\n\n- **Dynamic Routing**: Uses conditions to determine the nature of the Slack interaction, whether it's a direct command to initiate a scan or a request to generate a report.\n- **Modal Management**: Differentiates actions based on modal titles and `callback_id`s, ensuring that each type of submission is processed according to its context.\n- **Streamlined Responses**: After routing, the workflow promptly handles the necessary responses or actions, including closing modal popups and responding to Slack with appropriate confirmation or data.\n\n**Purpose**: This mechanism ensures that all interactions within Slack are handled quickly and accurately, automating responses and actions in real-time to enhance user experience and workflow efficiency."
            },
            "typeVersion": 1
      },
      {
            "id": "db8aabd8-d00d-4d50-9f97-443eba7c7c90",
            "name": "Sticky Note11",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1153.6255461332685,
                  516.1718360212528
            ],
            "parameters": {
                  "color": 7,
                  "width": 396.6025898621133,
                  "height": 652.6603582798184,
                  "content": "![Imgur](https://i.imgur.com/iKyMV0N.png)\n## Display Modal Popup\nThis section pops open a modal window that is later used to send data into Virustotal, then depending on those results, to Venafi or Slack for manual approval. \n\nModals can be customized to perform all sorts of actions. And they are natively mobile! Additionally, messages themselves can perform actions if you include inputs like buttons or field inputs. \n\nLearn more about them by [clicking here](https://api.slack.com/surfaces/modals)"
            },
            "typeVersion": 1
      },
      {
            "id": "a86e0b86-0740-4b77-831a-52413983818e",
            "name": "Close Modal Popup",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  960,
                  1200
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "noData"
            },
            "typeVersion": 1.1
      },
      {
            "id": "a5abc206-6b10-42bc-9196-bcedacdb3726",
            "name": "Sticky Note8",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  -580,
                  740
            ],
            "parameters": {
                  "width": 675.1724774900403,
                  "height": 972.8853473866498,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n## Enhance Security Operations with the Venafi Slack CertBot!\n\nOur **Venafi Slack CertBot** is strategically designed to facilitate immediate security operations directly from Slack. This tool allows end users to request Certificate Signing Requests that are automatically approved or passed to the Secops team for manual approval depending on the Virustotal analysis of the requested domain. Not only does this help centralize requests, but it helps an organization maintain the security certifications by allowing automated processes to log and analyze requests in real time. \n\n**Workflow Highlights:**\n- **Interactive Modals**: Utilizes Slack modals to gather user inputs for scan configurations and report generation, providing a user-friendly interface for complex operations.\n- **Dynamic Workflow Execution**: Integrates seamlessly with Venafi to execute CSR generation and if any issues are found, AI can generate a custom report that is then passed to a slack teams channel for manual approval with the press of a single button.\n\n**Operational Flow:**\n- **Parse Webhook Data**: Captures and parses incoming data from Slack to understand user commands accurately.\n- **Execute Actions**: Depending on the user's selection, the workflow triggers other actions within the flow like automatic Virustotal Scanning.\n- **Respond to Slack**: Ensures that every interaction is acknowledged, maintaining a smooth user experience by managing modal popups and sending appropriate responses.\n\n\n**Setup Instructions:**\n- Verify that Slack and Qualys API integrations are correctly configured for seamless interaction.\n- Customize the modal interfaces to align with your organization's operational protocols and security policies.\n- Test the workflow to ensure that it responds accurately to Slack commands and that the integration with Qualys is functioning as expected.\n\n\n**Need Assistance?**\n- Explore Venafi's [Documentation](https://docs.venafi.com/) or get help from the [n8n Community](https://community.n8n.io) for more detailed guidance on setup and customization.\n\nDeploy this bot within your Slack environment to significantly enhance the efficiency and responsiveness of your security operations, enabling proactive management of CSR's."
            },
            "typeVersion": 1
      },
      {
            "id": "352680c7-3b77-4fc1-81eb-8b5495747d89",
            "name": "Respond to Slack Webhook - Vulnerability",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  960,
                  1000
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "noData"
            },
            "typeVersion": 1.1
      },
      {
            "id": "7e2991c3-14ee-478c-b9b6-9dd58590dde9",
            "name": "Sticky Note2",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1160,
                  860
            ],
            "parameters": {
                  "color": 5,
                  "width": 376.26546828439086,
                  "height": 113.6416448104651,
                  "content": "### 🙋 Don't forget your slack credentials!\nThankfully n8n makes it easy, as long as you've added credentials to a normal slack node, these http nodes are a snap to change via the drop down. "
            },
            "typeVersion": 1
      },
      {
            "id": "97b8942b-1ec5-437f-9c51-2188cc9a9d6f",
            "name": "Venafi Request Certificate",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1240,
                  1000
            ],
            "parameters": {
                  "url": "https://slack.com/api/views.open",
                  "method": "POST",
                  "options": {},
                  "jsonBody": "= {\n \"trigger_id\": \"{{ $('Parse Webhook').item.json['response']['trigger_id'] }}\",\n \"external_id\": \"Idea Selector\",\n \"view\": {\n\t\"type\": \"modal\",\n\t\"callback_id\": \"certificate_request_modal\",\n\t\"title\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Request New Certificate\"\n\t},\n\t\"submit\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Request\"\n\t},\n\t\"close\": {\n\t\t\"type\": \"plain_text\",\n\t\t\"text\": \"Cancel\"\n\t},\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"image\",\n\t\t\t\"image_url\": \"https://img.securityinfowatch.com/files/base/cygnus/siw/image/2022/10/Venafi_logo.63459e2b03b7b.png?auto=format%2Ccompress&w=640&width=640\",\n\t\t\t\"alt_text\": \"delicious tacos\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"domain_name_block\",\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Domain Name\"\n\t\t\t},\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"plain_text_input\",\n\t\t\t\t\"action_id\": \"domain_name_input\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Enter the domain name\"\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"validity_period_block\",\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Validity Period\"\n\t\t\t},\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"static_select\",\n\t\t\t\t\"action_id\": \"validity_period_select\",\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Select a validity period\"\n\t\t\t\t},\n\t\t\t\t\"options\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\t\"text\": \"1 Year\"\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"value\": \"P1Y\"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\t\"text\": \"2 Years\"\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"value\": \"P2Y\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"input\",\n\t\t\t\"block_id\": \"optional_note_block\",\n\t\t\t\"optional\": true,\n\t\t\t\"label\": {\n\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\"text\": \"Optional Note\"\n\t\t\t},\n\t\t\t\"element\": {\n\t\t\t\t\"type\": \"plain_text_input\",\n\t\t\t\t\"action_id\": \"optional_note_input\",\n\t\t\t\t\"multiline\": true,\n\t\t\t\t\"placeholder\": {\n\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\"text\": \"Add any extra information (e.g., usage context, urgency)\"\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t]\n}\n}",
                  "sendBody": true,
                  "jsonQuery": "{\n \"Content-type\": \"application/json\"\n}",
                  "sendQuery": true,
                  "specifyBody": "json",
                  "specifyQuery": "json",
                  "authentication": "predefinedCredentialType",
                  "nodeCredentialType": "slackApi"
            },
            "credentials": {
                  "slackApi": {
                        "id": "hkcQkp6qhtiMzBEX",
                        "name": "certbot"
                  }
            },
            "typeVersion": 4.2
      },
      {
            "id": "12c50bad-8aab-4bab-8790-153d9e484762",
            "name": "Extract Fields",
            "type": "n8n-nodes-base.set",
            "position": [
                  1200,
                  1460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "39808a24-60f6-4f4b-8f4c-4c2aa3850b4f",
                                    "name": "domain",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.domain_name_block.domain_name_input.value }}"
                              },
                              {
                                    "id": "27c905be-18cc-434f-8af0-a08ee23a168f",
                                    "name": "validity",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.validity_period_block.validity_period_select.selected_option.value }}"
                              },
                              {
                                    "id": "ba1382e5-0629-4276-9858-34bcb59cc85a",
                                    "name": "note",
                                    "type": "string",
                                    "value": "={{ $json.response.view.state.values.optional_note_block.optional_note_input.value }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "f16a97d7-639e-4ec9-b003-b4ee4fdf8666",
            "name": "Get Slack User ID",
            "type": "n8n-nodes-base.set",
            "position": [
                  1200,
                  2020
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "53dfe019-d91d-4f5c-b279-f8b3fde98bf1",
                                    "name": "id",
                                    "type": "string",
                                    "value": "={{ $json.response.user.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "2a6af9ae-3916-4993-b2b3-a737f54f7a37",
            "name": "Translate Slack User ID to Email",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  1520,
                  2020
            ],
            "parameters": {
                  "options": {
                        "waitForSubWorkflow": true
                  },
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "afeVlIVyoIF8Psu4",
                        "cachedResultName": "Slack ID to Email"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "19541f84-0d97-4711-80ed-d36a5d517d9b",
            "name": "VirusTotal HTTP Request",
            "type": "n8n-nodes-base.httpRequest",
            "position": [
                  1440,
                  1460
            ],
            "parameters": {
                  "": "",
                  "url": "=https://www.virustotal.com/api/v3/domains/{{ $json.domain }}",
                  "method": "GET",
                  "options": {},
                  "sendBody": false,
                  "sendQuery": false,
                  "curlImport": "",
                  "infoMessage": "",
                  "sendHeaders": true,
                  "authentication": "none",
                  "specifyHeaders": "keypair",
                  "headerParameters": {
                        "parameters": [
                              {
                                    "name": "accept",
                                    "value": "application/json"
                              },
                              {
                                    "name": "X-Apikey",
                                    "value": "455144dac89b783b2f5421578b9ab4072adebfc011c969ba384d1c8f0e2ce39e"
                              }
                        ]
                  },
                  "httpVariantWarning": "",
                  "provideSslCertificates": false
            },
            "credentials": {
                  "virusTotalApi": {
                        "id": "JRK1xDyMiseROCmY",
                        "name": "VirusTotal account 2"
                  }
            },
            "typeVersion": 4.2,
            "extendsCredential": "virusTotalApi"
      },
      {
            "id": "4a0e0a71-b433-479b-87b7-7200537009af",
            "name": "Summarize output to save on tokens",
            "type": "n8n-nodes-base.set",
            "position": [
                  1760,
                  1460
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "2c4689a3-4b72-4240-8a0f-2fa00d33c553",
                                    "name": "data.attributes.last_analysis_stats.malicious",
                                    "type": "number",
                                    "value": "={{ $json.data.attributes.last_analysis_stats.malicious }}"
                              },
                              {
                                    "id": "59db6f41-1cf1-4feb-8120-8c50fadc5c9e",
                                    "name": "data.attributes.last_analysis_stats.suspicious",
                                    "type": "number",
                                    "value": "={{ $json.data.attributes.last_analysis_stats.suspicious }}"
                              },
                              {
                                    "id": "b55e7d39-0358-4863-8147-c5ce2b65ea96",
                                    "name": "data.attributes.last_analysis_stats.undetected",
                                    "type": "number",
                                    "value": "={{ $json.data.attributes.last_analysis_stats.undetected }}"
                              },
                              {
                                    "id": "ecd98a37-cb8b-48cd-bd3d-9c8bf777c5ca",
                                    "name": "data.attributes.last_analysis_stats.harmless",
                                    "type": "number",
                                    "value": "={{ $json.data.attributes.last_analysis_stats.harmless }}"
                              },
                              {
                                    "id": "72a776d5-70d7-4c30-b8fc-f7da382bc626",
                                    "name": "data.attributes.last_analysis_stats.timeout",
                                    "type": "number",
                                    "value": "={{ $json.data.attributes.last_analysis_stats.timeout }}"
                              },
                              {
                                    "id": "b85d8e8a-620c-4bb7-97db-d780f273deee",
                                    "name": "data.attributes.reputation",
                                    "type": "number",
                                    "value": "={{ $json.data.attributes.reputation }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "3d641c80-8a2a-4888-9ee3-ecd82f8d0d8b",
            "name": "Auto Issue Certificate Based on 0 Malicious Reports",
            "type": "n8n-nodes-base.if",
            "position": [
                  2300,
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
                                    "id": "795c6ff5-ac4a-4b67-b2fe-369fba276194",
                                    "operator": {
                                          "type": "number",
                                          "operation": "lte"
                                    },
                                    "leftValue": "={{ $json.data.attributes.last_analysis_stats.malicious }}",
                                    "rightValue": 0
                              }
                        ]
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "3f6e9bf2-6c6c-4316-8d14-1b004122fa67",
            "name": "Auto Issue Certificate",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  2560,
                  1700
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "fa34e736-65c4-4bc1-a391-794225a588d2",
            "name": "Generate Report For Manual Approval",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  2540,
                  2220
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "178afe87-cdef-46f0-8166-68b661349189",
            "name": "Get Slack Team ID",
            "type": "n8n-nodes-base.set",
            "position": [
                  1220,
                  2220
            ],
            "parameters": {
                  "options": {},
                  "assignments": {
                        "assignments": [
                              {
                                    "id": "53dfe019-d91d-4f5c-b279-f8b3fde98bf1",
                                    "name": "id",
                                    "type": "string",
                                    "value": "={{ $json.response.team.id }}"
                              }
                        ]
                  }
            },
            "typeVersion": 3.4
      },
      {
            "id": "c4d89085-f7f4-4073-bfe2-cd156275710c",
            "name": "Execute Workflow",
            "type": "n8n-nodes-base.executeWorkflow",
            "position": [
                  1520,
                  2220
            ],
            "parameters": {
                  "options": {},
                  "workflowId": {
                        "__rl": true,
                        "mode": "list",
                        "value": "ZIl9VdWh7BiVRRBT",
                        "cachedResultName": "Slack Team ID to Name"
                  }
            },
            "typeVersion": 1.1
      },
      {
            "id": "51d85502-ea61-423b-a6c4-66ed8397d685",
            "name": "Merge User and Team Data",
            "type": "n8n-nodes-base.merge",
            "position": [
                  1820,
                  2140
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineByPosition"
            },
            "typeVersion": 3
      },
      {
            "id": "febb1be8-7cad-46f1-a854-2ff1432216cb",
            "name": "OpenAI",
            "type": "@n8n/n8n-nodes-langchain.openAi",
            "position": [
                  2720,
                  2220
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
                                    "content": "=Analyze the following VirusTotal scan results and summarize the overall risk as Low, Medium, or High based on the number of engines flagging the domain (excluding \"clean\" or \"unrated\" results). Use the following criteria for risk rating:\n\nLow: No significant threats detected; domain is clean.\nMedium: Minor issues detected; may require further review.\nHigh: Significant threats like phishing or malware; manual review recommended.\n\nHere are the scan results for the domain {{ $('Parse Webhook').item.json.response.view.state.values.domain_name_block.domain_name_input.value }}:\n\nMalicious: {{ $json.data.attributes.last_analysis_stats.malicious }}\nSuspicious: {{ $json.data.attributes.last_analysis_stats.suspicious }}\nUndetected: {{ $json.data.attributes.last_analysis_stats.undetected }}\nHarmless: {{ $json.data.attributes.last_analysis_stats.harmless }}\nTimeout: {{ $json.data.attributes.last_analysis_stats.timeout }}\nReputation: {{ $json.data.attributes.reputation }}\n\nProvide an overall risk rating and suggest next steps based on your analysis. Please keep it concise. "
                              },
                              {
                                    "role": "system",
                                    "content": "Analyze the VirusTotal scan results and categorize the domain’s risk as Low, Medium, or High:\n\nIdentify Risks: Focus on results flagged as anything other than \"clean\" or \"unrated.\"\nAssess Risk:\nLow: No major threats flagged, domain is safe.\nMedium: Minor issues flagged, review recommended.\nHigh: Significant threats flagged (e.g., phishing, malware), manual review needed.\nRecommendation:\nLow: Auto-issue the certificate.\nMedium/High: Recommend manual review."
                              }
                        ]
                  }
            },
            "credentials": {
                  "openAiApi": {
                        "id": "2KVzlb0XZRZkoObj",
                        "name": "angel openai auth"
                  }
            },
            "typeVersion": 1.5
      },
      {
            "id": "04ffe7bb-be5d-4ce0-b17c-68276673f585",
            "name": "Sticky Note16",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1160,
                  1680
            ],
            "parameters": {
                  "color": 7,
                  "width": 833.9929589980072,
                  "height": 705.5291769708515,
                  "content": "![n8n](https://i.imgur.com/qXWqiOd.png)\n## Run Workflows within other Workflows like Functions\n\nThis section of the workflow contains 2 subworkflows that translate the Slack User ID to an email and name, and the Slack Team ID into the team name and Avatar of the team to make the slack messages more visual. This allows you to reuse these flows like you would use a function in code. \n\nThese nodes run parallel to each other so they will not override the data generated by each thread, and then are joined using the Merge nodes. "
            },
            "typeVersion": 1
      },
      {
            "id": "a2b48f56-946b-4ae7-ade4-5b84b1a99bb9",
            "name": "Sticky Note1",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1160,
                  1180
            ],
            "parameters": {
                  "color": 7,
                  "width": 832.2724669887743,
                  "height": 485.55399396506067,
                  "content": "![VirusTotal](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/VirusTotal_logo.svg/320px-VirusTotal_logo.svg.png)\n## URL Analysis with VirusTotal\nThe first node receives all messages from Slack API via Subscription Events API. You can find more information about setting up the subscription events API by [clicking here](https://api.slack.com/apis/connections/events-api). \n\nThe second node extracts the payload from slack into an object that n8n can understand. "
            },
            "typeVersion": 1
      },
      {
            "id": "c38c30f3-acb1-40e4-acc5-3fd4f6b8e643",
            "name": "Merge Requestor and VT Data",
            "type": "n8n-nodes-base.merge",
            "position": [
                  2100,
                  1840
            ],
            "parameters": {
                  "mode": "combine",
                  "options": {},
                  "combineBy": "combineByPosition"
            },
            "typeVersion": 3
      },
      {
            "id": "2e2c6100-b82e-4cdf-a290-33c2898de652",
            "name": "Sticky Note3",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2480,
                  1420
            ],
            "parameters": {
                  "color": 7,
                  "width": 547.705272240834,
                  "height": 485.55399396506067,
                  "content": "![VirusTotal](https://img.securityinfowatch.com/files/base/cygnus/siw/image/2022/10/Venafi_logo.63459e2b03b7b.png?auto=format%2Ccompress&w=250&width=250)\n## Automatic CSR Generation via Venafi\nContextual data from the Slack user's webhook is used to gather the needed contextual data, such as the name of the Slack team/group the user is in and their email and name if needed. \n\nFor automatic CSR Generation to work, ensure you have a Vsatelite deployed and active. "
            },
            "typeVersion": 1
      },
      {
            "id": "4c168cd6-e5d2-4d82-9fe3-3b8431db3dcd",
            "name": "Sticky Note12",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  3040,
                  1309.0359710471785
            ],
            "parameters": {
                  "color": 7,
                  "width": 367.3323860824746,
                  "height": 831.2760849855022,
                  "content": "![Imgur](https://i.imgur.com/iKyMV0N.png)\n## Send Contextual Message to Slack\nThis section pops open a modal window that is later used to send data into TheHive. \n\nModals can be customized to perform all sorts of actions. And they are natively mobile! You can see a screenshot of the Slack Modals on the right. \n\nLearn more about them by [clicking here](https://api.slack.com/surfaces/modals)"
            },
            "typeVersion": 1
      },
      {
            "id": "08687e15-90e0-42da-95a4-ada8b7ddcd36",
            "name": "Sticky Note17",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2000,
                  1421.1618229241317
            ],
            "parameters": {
                  "color": 7,
                  "width": 465.44793569024944,
                  "height": 676.0664675646049,
                  "content": "![n8n](https://i.imgur.com/lKnBNnH.png)\n## Efficient Slack Interaction Handling with n8n\n\nThis section of the workflow is designed to efficiently manage and route messages and submissions from Slack based on specific triggers and conditions. When a Slack interaction occurs—such as a user triggering a vulnerability scan or generating a report through a modal—the workflow intelligently routes the message to the appropriate action:"
            },
            "typeVersion": 1
      },
      {
            "id": "7098d247-5f39-4c61-a055-d7e9d12c2a64",
            "name": "Sticky Note6",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  2480,
                  1920
            ],
            "parameters": {
                  "color": 7,
                  "width": 544.2406462166426,
                  "height": 546.0036529662652,
                  "content": "![OpenAI](https://i.imgur.com/o89G0If.png)\n## Parse Response with AI Model \nThis workflow currently uses OpenAI to power it's responses, but you can replace the AI Agent node below and set your own local AI LLM using the n8n options offered. "
            },
            "typeVersion": 1
      },
      {
            "id": "3f2ea251-6f4e-4701-8456-d3020169f802",
            "name": "Send Auto Generated Confirmation",
            "type": "n8n-nodes-base.slack",
            "position": [
                  3160,
                  1700
            ],
            "parameters": {
                  "text": "test",
                  "select": "channel",
                  "blocksUi": "={\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"*:lock: CSR Auto-Issued Successfully!*\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"divider\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"*Team:* {{ $('Merge Requestor and VT Data').item.json.name }}\\n*Requested by:* <@{{ $('Parse Webhook').item.json.response.user.id }}>\\n*Email:* {{ $('Merge User and Team Data').item.json.email }}\\n*Date Issued:* {{ $json.creationDate }}\"\n\t\t\t},\n\t\t\t\"accessory\": {\n\t\t\t\t\"type\": \"image\",\n\t\t\t\t\"image_url\": \"{{ $('Merge User and Team Data').item.json.team.icon.image_132 }}\",\n\t\t\t\t\"alt_text\": \"Team Avatar\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"context\",\n\t\t\t\"elements\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*CSR Details:*\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"fields\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Common Name:* {{ $('Parse Webhook').item.json.response.view.state.values.domain_name_block.domain_name_input.value }}\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Organization:* n8n.io\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Issued By:* Venafi CA\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Validity Period:* {{ DateTime.fromISO($json.creationDate).toFormat('MMMM dd, yyyy') }} to {{ DateTime.fromISO($json.creationDate).plus({ years: 1 }).toFormat('MMMM dd, yyyy') }}\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"type\": \"divider\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"actions\",\n\t\t\t\"elements\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"button\",\n\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\"text\": \"View CSR Details\"\n\t\t\t\t\t},\n\t\t\t\t\t\"url\": \"https://eval-32690260.venafi.cloud/issuance/certificate-requests?id={{ $json.id }}\",\n\t\t\t\t\t\"style\": \"primary\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"button\",\n\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\"text\": \"Revoke CSR\"\n\t\t\t\t\t},\n\t\t\t\t\t\"style\": \"danger\",\n\t\t\t\t\t\"value\": \"revoke_csr\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "C07MB8PGZ36"
                  },
                  "messageType": "block",
                  "otherOptions": {}
            },
            "credentials": {
                  "slackApi": {
                        "id": "hkcQkp6qhtiMzBEX",
                        "name": "certbot"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "17b7cc2e-32ff-4670-a756-bb41627dc14a",
            "name": "Send Message Request for Manual Approval",
            "type": "n8n-nodes-base.slack",
            "position": [
                  3160,
                  1940
            ],
            "parameters": {
                  "text": "test",
                  "select": "channel",
                  "blocksUi": "={\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \":warning: *CSR Pending Approval*\\n\\nThe Certificate Signing Request for the following domain was not auto-approved. Please review the details and press the button below to submit the request for manual approval.\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"divider\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"*Team:* {{ $('Merge Requestor and VT Data').item.json.name }}\\n*Submitted by:* <@{{ $('Parse Webhook').item.json.response.user.id }}>\\n*Requestor Email:* {{ $('Merge Requestor and VT Data').item.json.email }}\\n*Date Submitted:* {{ DateTime.fromISO($json.creationDate).toFormat('MMMM dd, yyyy') }}\\n*Domain:* {{ $('Parse Webhook').item.json.response.view.state.values.domain_name_block.domain_name_input.value }}\\n\\n:mag: *AI Analysis*\\n> The AI detected the following potential issues with the CSR:\\n> - *VT Malicious Reports:* {{ $('Generate Report For Manual Approval').item.json.data.attributes.last_analysis_stats.malicious }}\\n> - *Reputation Score:* {{ $('Generate Report For Manual Approval').item.json.data.attributes.reputation }}/100\\n> - *Additional Notes:* {{ $json.message.content.replace(/\\n/g, '\\\\n').replace(/###/g, ' ').replace(/-\\s+\\*\\*(.*?)\\*\\*/g, '• *$1*').replace(/\"/g, '\\\\\"').replace(/\\*\\*/g, '*') }}\\n\\nPlease ensure these risks are mitigated before proceeding.\"\n\t\t\t},\n\t\t\t\"accessory\": {\n\t\t\t\t\"type\": \"image\",\n\t\t\t\t\"image_url\": \"https://avatars.slack-edge.com/2024-08-29/7652078599283_52acb3a88da26e76bab6_132.png\",\n\t\t\t\t\"alt_text\": \"Team Avatar\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"divider\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"actions\",\n\t\t\t\"elements\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"button\",\n\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\"text\": \":arrow_forward: Submit for Approval\"\n\t\t\t\t\t},\n\t\t\t\t\t\"value\": \"submit_for_approval\",\n\t\t\t\t\t\"style\": \"primary\",\n\t\t\t\t\t\"action_id\": \"submit_for_approval\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"button\",\n\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\"text\": \"View CSR Details\"\n\t\t\t\t\t},\n\t\t\t\t\t\"value\": \"view_csr_details\",\n\t\t\t\t\t\"url\": \"https://google.com\",\n\t\t\t\t\t\"action_id\": \"view_csr_details\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"type\": \"context\",\n\t\t\t\"elements\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"Submitted on {{ $now.toFormat('MMMM dd, yyyy') }}. The request requires manual approval. If you have any questions, contact the security team.\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "C07MB8PGZ36"
                  },
                  "messageType": "block",
                  "otherOptions": {}
            },
            "credentials": {
                  "slackApi": {
                        "id": "hkcQkp6qhtiMzBEX",
                        "name": "certbot"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "480c7f12-fc3a-44d1-885f-d6618a1e0dc8",
            "name": "Route Message",
            "type": "n8n-nodes-base.switch",
            "position": [
                  620,
                  1100
            ],
            "parameters": {
                  "rules": {
                        "values": [
                              {
                                    "outputKey": "Request Modal",
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
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.callback_id }}",
                                                      "rightValue": "request-certificate"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Submit Data",
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
                                                      "id": "65daa75f-2e17-4ba0-8fd8-2ac2159399e3",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.type }}",
                                                      "rightValue": "view_submission"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              },
                              {
                                    "outputKey": "Block Actions",
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
                                                      "id": "87f6f93e-28c9-49bc-8e1e-d073d86347b4",
                                                      "operator": {
                                                            "name": "filter.operator.equals",
                                                            "type": "string",
                                                            "operation": "equals"
                                                      },
                                                      "leftValue": "={{ $json.response.type }}",
                                                      "rightValue": "block_actions"
                                                }
                                          ]
                                    },
                                    "renameOutput": true
                              }
                        ]
                  },
                  "options": {
                        "fallbackOutput": "none"
                  }
            },
            "typeVersion": 3
      },
      {
            "id": "a42115ce-f0d7-443b-947d-cb8d54c2df22",
            "name": "Venafi TLS Protect Cloud1",
            "type": "n8n-nodes-base.venafiTlsProtectCloud",
            "position": [
                  1500,
                  2700
            ],
            "parameters": {
                  "options": {},
                  "commonName": "={{ $json.response.message.blocks[2].text.text.match(/\\*Domain:\\*\\s*<http[^|]+\\|([^\\n]+)>/)[1] }}",
                  "generateCsr": true,
                  "applicationId": "f3c15c80-7151-11ef-9a22-abeac49f7094",
                  "additionalFields": {
                        "organizationalUnits": [
                              "={{ $json.response.message.blocks[2].text.text.match(/\\*Team:\\*\\s*([^\\n]*)/)[1] }}"
                        ]
                  },
                  "certificateIssuingTemplateId": "d28d82b1-714b-11ef-9026-7bb80b32867a"
            },
            "credentials": {
                  "venafiTlsProtectCloudApi": {
                        "id": "WU38IpfutNNkJWuo",
                        "name": "Venafi TLS Protect Cloud account"
                  }
            },
            "typeVersion": 1
      },
      {
            "id": "69765a07-32ee-478a-a2f7-4de459fd69d9",
            "name": "Send Auto Generated Confirmation1",
            "type": "n8n-nodes-base.slack",
            "position": [
                  1800,
                  2700
            ],
            "parameters": {
                  "text": "test",
                  "select": "channel",
                  "blocksUi": "={\n\t\"blocks\": [\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"*:lock: CSR Auto-Issued Successfully!*\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"divider\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"text\": {\n\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\"text\": \"*Team:* {{ $('Parse Webhook').item.json.response.message.blocks[2].text.text.match(/\\*Team:\\*\\s*([^\\n]*)/)[1] }}\\n*Requested by:* \\n*Email:* {{ $('Parse Webhook').item.json.response.message.blocks[2].text.text.match(/\\*Requestor\\sEmail:\\*\\s*<mailto:([^|]+)\\|/)[1] }}\\n*Date Issued:* {{ $json.creationDate }}\"\n\t\t\t},\n\t\t\t\"accessory\": {\n\t\t\t\t\"type\": \"image\",\n\t\t\t\t\"image_url\": \"{{ $('Parse Webhook').item.json.response.message.blocks[2].accessory.image_url }}\",\n\t\t\t\t\"alt_text\": \"Team Avatar\"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"type\": \"context\",\n\t\t\t\"elements\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*CSR Details:*\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"type\": \"section\",\n\t\t\t\"fields\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Common Name:* {{ $('Parse Webhook').item.json.response.message.blocks[2].text.text.match(/\\*Domain:\\*\\s*<http[^|]+\\|([^\\n]+)>/)[1] }}\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Organization:* n8n.io\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Issued By:* Venafi CA\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"mrkdwn\",\n\t\t\t\t\t\"text\": \"*Validity Period:* {{ DateTime.fromISO($json.creationDate).toFormat('MMMM dd, yyyy') }} to {{ DateTime.fromISO($json.creationDate).plus({ years: 1 }).toFormat('MMMM dd, yyyy') }}\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"type\": \"divider\"\n\t\t},\n\t\t{\n\t\t\t\"type\": \"actions\",\n\t\t\t\"elements\": [\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"button\",\n\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\"text\": \"View CSR Details\"\n\t\t\t\t\t},\n\t\t\t\t\t\"url\": \"https://eval-32690260.venafi.cloud/issuance/certificate-requests?id={{ $json.id }}\",\n\t\t\t\t\t\"style\": \"primary\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"type\": \"button\",\n\t\t\t\t\t\"text\": {\n\t\t\t\t\t\t\"type\": \"plain_text\",\n\t\t\t\t\t\t\"text\": \"Revoke CSR\"\n\t\t\t\t\t},\n\t\t\t\t\t\"style\": \"danger\",\n\t\t\t\t\t\"value\": \"revoke_csr\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}",
                  "channelId": {
                        "__rl": true,
                        "mode": "id",
                        "value": "C07MB8PGZ36"
                  },
                  "messageType": "block",
                  "otherOptions": {}
            },
            "credentials": {
                  "slackApi": {
                        "id": "hkcQkp6qhtiMzBEX",
                        "name": "certbot"
                  }
            },
            "typeVersion": 2.2
      },
      {
            "id": "82b70dab-2c29-4ecd-8a26-8d7c9e8c007f",
            "name": "Sticky Note4",
            "type": "n8n-nodes-base.stickyNote",
            "position": [
                  1165.4582041476783,
                  2400
            ],
            "parameters": {
                  "color": 7,
                  "width": 822.2470680931556,
                  "height": 485.55399396506067,
                  "content": "![VirusTotal](https://img.securityinfowatch.com/files/base/cygnus/siw/image/2022/10/Venafi_logo.63459e2b03b7b.png?auto=format%2Ccompress&w=250&width=250)\n## Manual CSR Generation via Venafi\nContextual data from the Slack user's webhook is used to gather the needed contextual data, such as the name of the Slack team/group the user is in and their email and name if needed. Please note this section is still a proof of context and may not work exactly as expected. \n\nFor automatic CSR Generation to work, ensure you have a Vsatelite deployed and active. "
            },
            "typeVersion": 1
      },
      {
            "id": "1ae279b2-fc2d-4686-a640-2592cc98318e",
            "name": "Manual Issue Certificate",
            "type": "n8n-nodes-base.noOp",
            "position": [
                  1240,
                  2700
            ],
            "parameters": {},
            "typeVersion": 1
      },
      {
            "id": "ce9c2a38-ef95-467d-846b-35f3aa6b2c84",
            "name": "Webhook",
            "type": "n8n-nodes-base.webhook",
            "position": [
                  200,
                  1100
            ],
            "webhookId": "4f86c00d-ceb4-4890-84c5-850f8e5dec05",
            "parameters": {
                  "path": "venafiendpoint",
                  "options": {},
                  "httpMethod": "POST",
                  "responseMode": "responseNode"
            },
            "typeVersion": 2
      },
      {
            "id": "1caa5c53-7b65-4578-a7ca-0bf62d05cfb0",
            "name": "Respond to webhook success",
            "type": "n8n-nodes-base.respondToWebhook",
            "position": [
                  760,
                  1280
            ],
            "parameters": {
                  "options": {},
                  "respondWith": "noData"
            },
            "typeVersion": 1.1
      }
],
    connections: {
      "OpenAI": {
            "main": [
                  [
                        {
                              "node": "Send Message Request for Manual Approval",
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
                              "node": "Parse Webhook",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Parse Webhook": {
            "main": [
                  [
                        {
                              "node": "Route Message",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Route Message": {
            "main": [
                  [
                        {
                              "node": "Respond to Slack Webhook - Vulnerability",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Close Modal Popup",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Respond to webhook success",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Extract Fields": {
            "main": [
                  [
                        {
                              "node": "VirusTotal HTTP Request",
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
                              "node": "Merge User and Team Data",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Close Modal Popup": {
            "main": [
                  [
                        {
                              "node": "Extract Fields",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get Slack User ID",
                              "type": "main",
                              "index": 0
                        },
                        {
                              "node": "Get Slack Team ID",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Get Slack Team ID": {
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
      "Get Slack User ID": {
            "main": [
                  [
                        {
                              "node": "Translate Slack User ID to Email",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Auto Issue Certificate": {
            "main": [
                  [
                        {
                              "node": "Venafi TLS Protect Cloud",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "VirusTotal HTTP Request": {
            "main": [
                  [
                        {
                              "node": "Summarize output to save on tokens",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Manual Issue Certificate": {
            "main": [
                  [
                        {
                              "node": "Venafi TLS Protect Cloud1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge User and Team Data": {
            "main": [
                  [
                        {
                              "node": "Merge Requestor and VT Data",
                              "type": "main",
                              "index": 1
                        }
                  ]
            ]
      },
      "Venafi TLS Protect Cloud": {
            "main": [
                  [
                        {
                              "node": "Send Auto Generated Confirmation",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Venafi TLS Protect Cloud1": {
            "main": [
                  [
                        {
                              "node": "Send Auto Generated Confirmation1",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Respond to webhook success": {
            "main": [
                  [
                        {
                              "node": "Manual Issue Certificate",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Merge Requestor and VT Data": {
            "main": [
                  [
                        {
                              "node": "Auto Issue Certificate Based on 0 Malicious Reports",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Translate Slack User ID to Email": {
            "main": [
                  [
                        {
                              "node": "Merge User and Team Data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Summarize output to save on tokens": {
            "main": [
                  [
                        {
                              "node": "Merge Requestor and VT Data",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Generate Report For Manual Approval": {
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
      "Respond to Slack Webhook - Vulnerability": {
            "main": [
                  [
                        {
                              "node": "Venafi Request Certificate",
                              "type": "main",
                              "index": 0
                        }
                  ]
            ]
      },
      "Auto Issue Certificate Based on 0 Malicious Reports": {
            "main": [
                  [
                        {
                              "node": "Auto Issue Certificate",
                              "type": "main",
                              "index": 0
                        }
                  ],
                  [
                        {
                              "node": "Generate Report For Manual Approval",
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

export function SlackCategoryButton({ isActive, onClick }: { isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group py-2 px-4 rounded-xl font-medium transition-all flex items-center gap-2 ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-600' : 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:border-purple-300 dark:hover:border-purple-600/50 hover:shadow-md'}`}
    >
      <Hash className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
      <span className="truncate max-w-[200px]">Slack</span>
      {isActive && (
        <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
          {slackTemplates.length}
        </span>
      )}
    </button>
  );
}

export default function SlackTemplateGrid({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {slackTemplates.map((tpl, i) => (
        <div key={i} className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
          
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/20 group-hover:to-purple-50/50 dark:group-hover:to-purple-900/10 pointer-events-none transition-colors duration-500" />
          
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-purple-400 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
            <Hash className="w-6 h-6" />
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 z-10">
            {tpl.name || 'Unnamed Template'}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow z-10">
            <p>Automate your tasks seamlessly with this predefined workflow consisting of <strong className="text-gray-700 dark:text-gray-300">{tpl.nodes?.length || 0} nodes</strong>.</p>
          </div>
          
          <button 
            onClick={() => onUseTemplate && onUseTemplate(tpl)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-purple-600 dark:hover:bg-purple-600/90 text-white rounded-xl font-semibold transition-colors duration-300 shadow-md z-10 text-sm">
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}
