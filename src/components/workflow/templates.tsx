"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Package, Zap, ArrowRight, Grid } from 'lucide-react';
import nodesData from '@/workflow/data/nodes.json';
import categoriesData from '@/workflow/data/categories.json';

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

// ── Mock Template Counts ──────────────────────────────────────────────────
const MOCK_TEMPLATE_COUNTS: Record<string, number> = {
  http_request: 12,
  webhook: 8,
  slack: 15,
  gmail: 20,
  stripe: 6,
  github: 9,
  if: 25,
  merge: 4,
  wait: 3,
  set: 10,
  gmail_trigger: 7,
  outlook_trigger: 5,
};

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

        {filteredNodes.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <Package className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No integrations found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── TemplatesPage Component ───────────────────────────────────────────────
export default function TemplatesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  // Load and enrich nodes with template counts
  const nodes: NodeDef[] = useMemo(() => {
    return (nodesData as NodeDef[]).map(node => ({
      ...node,
      templatesCount: MOCK_TEMPLATE_COUNTS[node.id] || 0
    }));
  }, []);

  const categories = categoriesData as Category[];

  const handleUseIntegration = (nodeId: string) => {
    console.log(`Using integration for node: ${nodeId}`);
    // Logic to navigate or open template viewer for this specific node could go here
    alert(`Showing templates for: ${nodeId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 animate-in fade-in duration-500">
      {/* Hero Header */}
      <section className="relative overflow-hidden p-8 md:p-12 rounded-[2rem] bg-gray-900 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            Workflow Templates
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Choose from hundreds of pre-built integrations or start with a custom template to automate your business processes.
          </p>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] -ml-20 -mb-20" />
      </section>

      {/* Featured / Smart Templates Placeholder */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Featured Templates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg cursor-pointer hover:scale-[1.01] transition-transform">
            <h3 className="text-xl font-bold mb-2">Social Media Auto-Poster</h3>
            <p className="opacity-80 text-sm mb-4">Post new content to Twitter and LinkedIn automatically when you publish a blog post.</p>
            <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider">Most Popular</span>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg cursor-pointer hover:scale-[1.01] transition-transform">
            <h3 className="text-xl font-bold mb-2">Stripe Revenue Dashboard</h3>
            <p className="opacity-80 text-sm mb-4">Sync Stripe payments to a Google Sheet and send a Slack daily update.</p>
            <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider">Financials</span>
          </div>
        </div>
      </section>

      {/* Browse Integrations Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Grid className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Browse by Integration</h2>
        </div>
        
        <BrowseIntegrations
          categories={categories}
          nodes={nodes}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onUseIntegration={handleUseIntegration}
          mode="templates"
        />
      </section>

      {/* AI Generator CTA */}
      <section className="p-8 rounded-[2rem] bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 text-center">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Can&rsquo;t find what you&rsquo;re looking for?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          Use our AI Generator to build a custom workflow template just by describing your needs.
        </p>
        <button className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/25 transition-all">
          Try AI Generator
        </button>
      </section>
    </div>
  );
}
