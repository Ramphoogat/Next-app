"use client";

import React, { useMemo } from 'react';
import {
  X, Settings, Webhook, Clock, FileText, Zap, Mail, Globe,
  Database, Bell, GitBranch, Timer, Split, Repeat, Trash2, Link2,
  Lock, AlertCircle, ChevronDown, ChevronRight
} from 'lucide-react';
import { WorkflowNode } from '@/types/workflow';
import { NodeRegistry, NodeParameter, NodeParameterOption } from '@/workflow/core/nodeRegistry';

// ── Icons for node types ───────────────────────────────────────────────────
const IconMap: Record<string, React.ElementType> = {
  Webhook, Clock, FileText, Zap, Mail, Globe, Database, Bell,
  GitBranch, Timer, Split, Repeat, Link2, Settings
};

// ── Components ─────────────────────────────────────────────────────────────

interface ConfigInputProps {
  parameter: NodeParameter;
  value: unknown;
  onChange: (value: unknown) => void;
}

const ConfigInput: React.FC<ConfigInputProps> = ({ parameter, value, onChange }) => {
  const commonClasses = "w-full px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/40 outline-none transition-all";

  switch (parameter.type) {
    case 'string':
      return (
        <input
          type="text"
          value={(value as string | number) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={parameter.label}
          className={commonClasses}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          value={(value as string | number) ?? ''}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          placeholder={parameter.label}
          className={commonClasses}
        />
      );
    case 'boolean':
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{parameter.label}</span>
        </div>
      );
    case 'select':
      return (
        <select
          value={(value as string | number) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={commonClasses}
        >
          <option value="">Select an option</option>
          {parameter.options?.map((opt: NodeParameterOption) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    case 'json':
    case 'object':
    case 'array':
      return (
        <textarea
          value={typeof value === 'object' ? JSON.stringify(value, null, 2) : (value as string | number) ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            try {
              onChange(JSON.parse(val));
            } catch {
              onChange(val);
            }
          }}
          rows={5}
          className={`${commonClasses} font-mono text-xs resize-none`}
        />
      );
    case 'credentials':
      return (
        <div className="relative">
          <select
            value={(value as string | number) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${commonClasses} pl-10`}
          >
            <option value="">Select Credentials...</option>
            <option value="temp-id">Saved Credential #1</option>
          </select>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
        </div>
      );
    default:
      return (
        <div className="p-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg text-xs text-red-600">
          Unsupported type: {parameter.type}
        </div>
      );
  }
};

interface ParameterGroupProps {
  name: string;
  parameters: NodeParameter[];
  config: Record<string, unknown>;
  onUpdate: (key: string, value: unknown) => void;
}

const ParameterGroup: React.FC<ParameterGroupProps> = ({ name, parameters, config, onUpdate }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Filter parameters based on dependencies
  const visibleParams = parameters.filter(param => {
    if (!param.dependsOn) return true;
    const depValue = config[param.dependsOn.field];
    return param.dependsOn.valueIn.includes(depValue);
  });

  if (visibleParams.length === 0) return null;

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{name}</span>
        {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {visibleParams.map(param => (
            <div key={param.id} className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {param.label}
                  {param.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
              </div>
              <ConfigInput
                parameter={param}
                value={config[param.id]}
                onChange={(val) => onUpdate(param.id, val)}
              />
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                {param.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main Panel ─────────────────────────────────────────────────────────────

interface NodeConfigPanelProps {
  selectedNode: WorkflowNode | null;
  onUpdateNode: (nodeId: string, data: Partial<WorkflowNode['data']>) => void;
  onDeleteNode: (nodeId: string) => void;
  onClose: () => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onClose
}) => {
  const nodeDef = useMemo(() => {
    if (!selectedNode) return null;
    // nodeType can be internal id like 'gmail' or legacy 'gmail-send'
    return NodeRegistry.getNodeById(selectedNode.data.nodeType as string);
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 text-center">
        <Settings className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3 animate-pulse-slow" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Select a node to customize its functionality</p>
      </div>
    );
  }

  const nodeConfig = (selectedNode.data.config as Record<string, unknown>) || {};
  const Icon = IconMap[selectedNode.data.icon] || Settings;

  const handleUpdate = (key: string, value: unknown) => {
    onUpdateNode(selectedNode.id, {
      config: { ...nodeConfig, [key]: value }
    });
  };

  // Group parameters
  const groupedParams: Record<string, NodeParameter[]> = {};
  nodeDef?.parameters.forEach(p => {
    if (!groupedParams[p.group]) groupedParams[p.group] = [];
    groupedParams[p.group].push(p);
  });

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shadow-sm border border-blue-500/20">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">{selectedNode.data.label}</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                {selectedNode.data.category} • {selectedNode.data.nodeType}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Display Name</label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all"
          />
        </div>
      </div>

      {/* Dynamic Parameters */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        {nodeDef ? (
          Object.entries(groupedParams).map(([group, params]) => (
            <ParameterGroup
              key={group}
              name={group}
              parameters={params}
              config={nodeConfig}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <div className="p-6">
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-tight">
                  No parameter metadata found for {selectedNode.data.nodeType} node.
                  Check your node registration.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-600 hover:text-white border border-red-500/20 transition-all duration-300 group"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">Delete Node</span>
        </button>
      </div>
    </div>
  );
};

export default NodeConfigPanel;
