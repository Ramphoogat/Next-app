"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Package, Zap, ArrowRight, Grid } from 'lucide-react';
import nodesData from '@/workflow/data/nodes.json';
import categoriesData from '@/workflow/data/categories.json';
import { generateText } from '@/workflow/ai/aiGenerator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import router from 'next/router';

// ── Types ──────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  name: string;
  description: string;
}

interface NodeDef {
  id: string;
  name: string;
  categoryId: string;
  triggers: string[];
  actions: string[];
  icon: string;
  templatesCount?: number;
}

// ── BrowseIntegrations Component ──────────────────────────────────────────
interface BrowseIntegrationsProps {
  categories: Category[];
  nodes: NodeDef[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  onUseIntegration: (nodeId: string) => void;
  mode?: 'workflows' | 'templates';
}

const BrowseIntegrations: React.FC<BrowseIntegrationsProps> = ({
  categories,
  nodes,
  selectedCategoryId,
  onSelectCategory,
  onUseIntegration,
  mode = 'workflows'
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesCategory = selectedCategoryId === 'all' || node.categoryId === selectedCategoryId;
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [nodes, selectedCategoryId, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search nodes (e.g., Slack, GitHub)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative min-w-[200px]">
          <select
            className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all shadow-sm cursor-pointer"
            value={selectedCategoryId}
            onChange={(e) => onSelectCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredNodes.map(node => (
          <div
            key={node.id}
            onClick={() => onUseIntegration(node.id)}
            className="group relative flex flex-col p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
                <span className="text-xl">📦</span>
              </div>
              {mode === 'templates' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  {node.templatesCount} {node.templatesCount === 1 ? 'Template' : 'Templates'}
                </span>
              )}
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{node.name}</h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              {node.triggers.length > 0 ? 'Trigger' : 'Action'}
            </p>

            <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
              <span>{mode === 'templates' ? 'View Templates' : 'Use Integration'}</span>
              <ArrowRight className="ml-1 w-3 h-3" />
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

import { IN8nTemplate } from './templateUtils';

interface TemplatesPageProps {
  onUseTemplate?: (template: IN8nTemplate) => void;
}

export default function TemplatesPage({ onUseTemplate }: TemplatesPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setAiResult('');
    try {
      const response = await generateText(aiPrompt);
      if (response.success && response.content) {
        setAiResult(response.content);
      } else {
        setAiResult(`Error: ${response.error || 'Failed to generate template.'}`);
      }
    } catch (error) {
      console.error(error);
      setAiResult('Error: An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  const categories = categoriesData as Category[];

  const handleUseIntegration = (nodeId: string) => {
    console.log(`Using integration for node: ${nodeId}`);
    // Logic to navigate or open template viewer for this specific node could go here
    alert(`Showing templates for: ${nodeId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 animate-in fade-in duration-500">
      {/* Hero Header */}
      <section className="relative overflow-hidden p-8 md:p-12 rounded-[2rem] bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl transition-colors text-center">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            Workflow Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mx-auto">
            Choose from hundreds of pre-built integrations or start with a custom template to automate your business processes.
          </p>
        </div>
      </section>

      {/* AI Generator CTA */}
      <section className="p-8 rounded-[2rem] bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 text-center">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Can&rsquo;t find what you&rsquo;re looking for?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          Use our AI Generator to build a custom workflow template just by describing your needs.
        </p>
        {!isAIGeneratorOpen ? (
          <button
            onClick={() => setIsAIGeneratorOpen(true)}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/25 transition-all"
          >
            Try AI Generator
          </button>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-500/30 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-transparent transition-all overflow-hidden min-h-[160px]">
              <textarea
                id='textarea-ai'
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAIGenerate();
                  }
                }}
                placeholder="Describe the workflow you want to build..."
                className="w-full bg-transparent flex-1 px-6 pt-6 pb-2 text-gray-900 dark:text-white outline-none resize-none"
                disabled={isGenerating}
              />
              <div className="flex justify-between items-center px-4 pb-4">
                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">
                  Shift + Enter for new line
                </span>
                <button
                  onClick={handleAIGenerate}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:dark:bg-blue-500/50 disabled:cursor-not-allowed text-white transition-all shadow-md flex items-center justify-center group"
                >
                  {isGenerating ? <Zap className="w-5 h-5 animate-pulse" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />}
                </button>
              </div>
            </div>

            {aiResult && (
              <div className="mt-6 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-500/20 text-left shadow-lg animate-in fade-in slide-in-from-top-4 duration-500 overflow-x-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <h4 className="font-bold text-gray-900 dark:text-white">AI Suggestion</h4>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-2xl font-black mt-8 mb-4 text-gray-900 dark:text-white leading-snug" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white leading-snug" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-5 mb-2 text-gray-900 dark:text-white leading-snug" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />,
                      li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                      code: ({ node, inline, className, children, ...props }: any) => {
                        return inline ? (
                          <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm text-blue-600 dark:text-blue-400 font-mono font-semibold" {...props}>
                            {children}
                          </code>
                        ) : (
                          <div className="relative my-6 rounded-xl overflow-hidden bg-[#0d1117] border border-gray-800 shadow-md">
                            <div className="flex items-center px-4 py-2.5 bg-[#161b22] border-b border-gray-800">
                              <div className="flex gap-1.5 mr-auto">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                              </div>
                            </div>
                            <pre className="p-5 overflow-x-auto text-[13px] text-gray-300 font-mono leading-relaxed" {...props}>
                              <code>{children}</code>
                            </pre>
                          </div>
                        );
                      },
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-5 py-2 my-5 bg-blue-50 dark:bg-blue-500/10 text-gray-800 dark:text-gray-200 rounded-r-xl italic" {...props} />,
                      table: ({ node, ...props }) => <div className="overflow-x-auto mb-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"><table className="w-full text-left border-collapse text-sm" {...props} /></div>,
                      th: ({ node, ...props }) => <th className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-5 py-3.5 font-bold text-gray-900 dark:text-white whitespace-nowrap" {...props} />,
                      td: ({ node, ...props }) => <td className="border-b border-gray-100 dark:border-gray-800 px-5 py-3 text-gray-700 dark:text-gray-300 align-top" {...props} />,
                      a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:underline font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors" {...props} />
                    }}
                  >
                    {aiResult}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
