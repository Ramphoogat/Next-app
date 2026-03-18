import React, { useState, useMemo } from 'react';
import { NodeRegistry } from '@/workflow/core/nodeRegistry';
import { TemplateEngine } from '@/workflow/generator/templateEngine';
import { IWorkflow } from '@/types/workflow';
import { AIGenerator } from '@/workflow/ai/aiGenerator';

export const WorkflowBuilder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [aiPrompt, setAiPrompt] = useState('');

  // Load static data from registry
  const categories = NodeRegistry.getAllCategories();

  // Example "AI generated" or dynamic templates
  const generatedTemplates = useMemo(() => {
    return TemplateEngine.generateCommonTemplates();
  }, []);

  // Filter integration nodes dynamically based on categories & search
  const visibleNodes = useMemo(() => {
    let nodes = selectedCategory === 'all'
      ? NodeRegistry.getAllNodes()
      : NodeRegistry.getNodesByCategory(selectedCategory);

    if (searchQuery) {
      nodes = NodeRegistry.searchNodes(searchQuery);
    }

    return nodes;
  }, [selectedCategory, searchQuery]);

  const handleCreateWorkflow = (nodeId: string) => {
    const node = NodeRegistry.getNodeById(nodeId);
    if (!node) return;

    const newWorkflow: IWorkflow = TemplateEngine.generateEmptyIntegration(node);
    console.log("Created dynamic workflow template:", newWorkflow);
    alert(`Created workflow: ${newWorkflow.name}`);
  };

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return;

    const newWorkflow = AIGenerator.generateFromPrompt(aiPrompt);
    if (newWorkflow) {
      console.log("AI Generated workflow template:", newWorkflow);
      alert(`AI Successfully generated: ${newWorkflow.name}`);
    } else {
      alert("AI couldn't map the prompt to enough integration nodes. Try: 'Send Gmail when Stripe payment succeeds'");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Workflow Templates</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Start from scratch, pick an integration, or use an AI-generated template.
      </p>

      {/* AI Prompt Generator Section */}
      <section className="mb-8 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-800 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-2">✨ AI Template Generator</h2>
        <p className="opacity-90 mb-4 text-white">Just describe what you want to automate in plain English.</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. 'Send a Gmail when a Stripe payment succeeds'"
            className="flex-1 p-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
          />
          <button
            className="bg-white dark:bg-gray-100 text-purple-700 dark:text-purple-800 px-6 py-3 rounded-lg font-bold shadow hover:bg-gray-50 dark:hover:bg-gray-200 transition whitespace-nowrap"
            onClick={handleAiGenerate}
          >
            Generate
          </button>
        </div>
      </section>

      {/* Static AI Generated Templates Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">⚡ Smart Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedTemplates.map((template, idx) => (
            <div key={idx} className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{template.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow">{template.description}</p>
              <button
                className="mt-auto self-end bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-sm"
                onClick={() => console.log('Use Template', template)}
              >
                Use this Workflow
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Integrations Registry */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Browse Integrations</h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search nodes (e.g., Slack, GitHub)..."
            className="flex-1 border border-gray-300 dark:border-gray-600 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="border border-gray-300 dark:border-gray-600 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Node Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleNodes.map((node) => (
            <div
              key={node.id}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition shadow-sm hover:shadow-md"
              onClick={() => handleCreateWorkflow(node.id)}
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">📦</span> {/* Usually replaced with node.icon icon component */}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{node.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                {node.triggers.length > 0 ? 'Trigger' : 'Action'}
              </p>
            </div>
          ))}

          {visibleNodes.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
              No integrations found matching your query.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkflowBuilder;
