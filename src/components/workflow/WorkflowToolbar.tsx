"use client";

import React, { useState } from 'react';
import {
  Save, Play, Pause, Trash2, Undo2, Redo2, ZoomIn, ZoomOut,
  Maximize2, LayoutGrid, ArrowLeft, Settings, History, Copy,
  X, HelpCircle, Webhook, Clock, FileText, Zap, Globe, Database,
  Bell, GitBranch, Timer, ChevronRight, MousePointer, Link2,
} from 'lucide-react';
import { WorkflowStatus } from '@/types/workflow';

// ─── Workflow Guide Modal ──────────────────────────────────────────────────

const TABS = ['Overview', 'Nodes', 'HTTP Methods', 'Templates', 'Tips'] as const;
type Tab = typeof TABS[number];

const GuideSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
      <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
      {title}
    </h3>
    {children}
  </div>
);

const Pill: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${color}`}>
    {label}
  </span>
);

const NodeRow: React.FC<{ icon: React.ReactNode; name: string; badge: React.ReactNode; desc: string }> = ({ icon, name, badge, desc }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
        {badge}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const MethodCard: React.FC<{ method: string; color: string; emoji: string; title: string; simple: string; analogy: string; example: string }> = ({
  method, color, emoji, title, simple, analogy, example
}) => (
  <div className={`rounded-xl border p-4 mb-3 ${color}`}>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">{emoji}</span>
      <code className="text-sm font-black tracking-wider">{method}</code>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">— {title}</span>
    </div>
    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1"><span className="font-bold">Simple:</span> {simple}</p>
    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1"><span className="font-bold">Analogy:</span> {analogy}</p>
    <p className="text-xs text-gray-500 dark:text-gray-500"><span className="font-bold">Example:</span> {example}</p>
  </div>
);

export const WorkflowGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('Overview');

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Workflow Guide</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Learn how to build powerful automations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 flex-shrink-0">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${tab === t
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* ── Overview ─────────────────────────────── */}
          {tab === 'Overview' && (
            <div>
              <GuideSection title="What is a Workflow?">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  A <strong className="text-gray-900 dark:text-white">workflow</strong> is an automation — a series of steps that run automatically when something happens. Think of it like a recipe: when a certain event occurs (the trigger), a set of actions follows in sequence.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Example: <em>&ldquo;When a new user signs up (trigger) → send a welcome email (action) → wait 2 days (delay) → send a follow-up email (action).&rdquo;</em>
                </p>
              </GuideSection>

              <GuideSection title="How to Build a Workflow — Step by Step">
                {[
                  { step: '1', icon: <MousePointer className="w-3.5 h-3.5" />, title: 'Add a Trigger', desc: 'Drag a trigger node from the Node Library on the left onto the canvas. This is what starts your workflow (e.g. a Webhook hit, a Schedule, or a Form Submission).' },
                  { step: '2', icon: <Link2 className="w-3.5 h-3.5" />, title: 'Connect Nodes', desc: 'Hover over a node to see its output handle (the dot on the right edge). Drag from that dot to the input handle of the next node to create a connection arrow.' },
                  { step: '3', icon: <Settings className="w-3.5 h-3.5" />, title: 'Configure Each Node', desc: 'Click a node to open its config panel on the right. Fill in the details — URL, email address, schedule, etc.' },
                  { step: '4', icon: <Play className="w-3.5 h-3.5" />, title: 'Test Run', desc: 'Click "Test Run" in the toolbar to execute the workflow once and verify everything works correctly.' },
                  { step: '5', icon: <Save className="w-3.5 h-3.5" />, title: 'Save & Activate', desc: 'Click "Save" to persist your changes, then "Activate" to switch the workflow from Draft to Active so it runs automatically.' },
                ].map(({ step, icon, title, desc }) => (
                  <div key={step} className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center mt-0.5">{step}</div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-gray-400">{icon}</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </GuideSection>
            </div>
          )}

          {/* ── Nodes ────────────────────────────────── */}
          {tab === 'Nodes' && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                Every workflow is built from <strong className="text-gray-700 dark:text-gray-300">nodes</strong> — individual blocks that each do one job. There are three categories:
              </p>
              <GuideSection title="🟢 Triggers — Start the workflow">
                <NodeRow icon={<Webhook className="w-3.5 h-3.5" />} name="Webhook" badge={<Pill label="Trigger" color="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" />} desc="Starts when an external service sends an HTTP request to a unique URL. Great for connecting to other apps." />
                <NodeRow icon={<Clock className="w-3.5 h-3.5" />} name="Schedule" badge={<Pill label="Trigger" color="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" />} desc="Runs at specific times using a cron expression (e.g. every day at 9am, every Monday). Set it and forget it." />
                <NodeRow icon={<FileText className="w-3.5 h-3.5" />} name="Form Submission" badge={<Pill label="Trigger" color="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" />} desc="Fires when a user submits a form on your site. Use this to kick off onboarding or notification flows." />
                <NodeRow icon={<Zap className="w-3.5 h-3.5" />} name="API Event" badge={<Pill label="Trigger" color="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" />} desc="Listens for internal API events emitted by your application (e.g. 'user.created', 'order.paid')." />
              </GuideSection>
              <GuideSection title="🔵 Actions — Do something">
                <NodeRow icon={<Globe className="w-3.5 h-3.5" />} name="HTTP Request" badge={<Pill label="Action" color="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" />} desc="Makes a GET, POST, PUT or DELETE call to any external API. Use this to fetch data or send data to third-party services." />
                <NodeRow icon={<Database className="w-3.5 h-3.5" />} name="Database Write" badge={<Pill label="Action" color="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" />} desc="Inserts, updates, upserts or deletes a record in your database collection." />
                <NodeRow icon={<Bell className="w-3.5 h-3.5" />} name="Send Notification" badge={<Pill label="Action" color="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" />} desc="Sends a notification via email, SMS, push or Slack to a recipient you specify." />
                <NodeRow icon={<FileText className="w-3.5 h-3.5" />} name="Send Email" badge={<Pill label="Action" color="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" />} desc="Sends a plain-text or HTML email to a specified address with a custom subject and body." />
              </GuideSection>
              <GuideSection title="🟣 Logic — Control the flow">
                <NodeRow icon={<GitBranch className="w-3.5 h-3.5" />} name="If Condition" badge={<Pill label="Logic" color="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" />} desc="Branches the workflow based on a condition. If the condition is true, one path runs; otherwise another path runs." />
                <NodeRow icon={<Timer className="w-3.5 h-3.5" />} name="Delay" badge={<Pill label="Logic" color="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" />} desc="Pauses the workflow for a set amount of time (seconds, minutes, hours or days) before continuing." />
                <NodeRow icon={<Link2 className="w-3.5 h-3.5" />} name="Node Connector" badge={<Pill label="Logic" color="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" />} desc="Merges multiple branches or triggers back into a single path. Use when different paths need to converge." />
              </GuideSection>
            </div>
          )}

          {/* ── HTTP Methods ─────────────────────────── */}
          {tab === 'HTTP Methods' && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                When you add an <strong className="text-gray-900 dark:text-white">HTTP Request</strong> node, you pick a <em>method</em> that tells the server what you want to do. Here&apos;s what each one means in plain English:
              </p>
              <MethodCard method="GET" color="bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30" emoji="📖" title="Read / Fetch data" simple="Ask for information without changing anything." analogy="Like looking at a menu — you're just reading, not ordering yet." example="GET /api/users — fetch the list of all users." />
              <MethodCard method="POST" color="bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30" emoji="➕" title="Create new data" simple="Send new information to be saved on the server." analogy="Like filling out a form and submitting it — you're creating something new." example="POST /api/users — create a brand-new user account." />
              <MethodCard method="PUT" color="bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30" emoji="✏️" title="Update / Replace existing data" simple="Replace an existing record completely with new information." analogy="Like erasing what you wrote on a whiteboard and writing something completely new." example="PUT /api/users/123 — completely replace user 123's data." />
              <MethodCard method="PATCH" color="bg-orange-50 border-orange-200 dark:bg-orange-500/10 dark:border-orange-500/30" emoji="🩹" title="Partially update data" simple="Update only a few fields of an existing record." analogy="Like using correction fluid on just one word, not rewriting the whole page." example="PATCH /api/users/123 — update only the user's email address." />
              <MethodCard method="DELETE" color="bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/30" emoji="🗑️" title="Remove data" simple="Tell the server to permanently delete a specific record." analogy="Like throwing something in the trash — it's gone." example="DELETE /api/users/123 — permanently delete user 123." />
            </div>
          )}

          {/* ── Templates ────────────────────────────── */}
          {tab === 'Templates' && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Jumpstart your automation with pre-built <strong className="text-gray-900 dark:text-white">Templates</strong> or generate custom ones using AI.
              </p>
              <GuideSection title="Using Pre-built Templates">
                <div className="flex gap-3 mb-4 p-3 rounded-xl border bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30">
                  <span className="text-lg flex-shrink-0">📦</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Browse the Library</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Go to the Templates tab to find hundreds of ready-to-use workflows for common use cases. Click to instantly create a new workflow from any template.
                    </p>
                  </div>
                </div>
              </GuideSection>
              <GuideSection title="AI Generator">
                <div className="flex gap-3 mb-4 p-3 rounded-xl border bg-purple-50 border-purple-200 dark:bg-purple-500/10 dark:border-purple-500/30">
                  <span className="text-lg flex-shrink-0">✨</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Describe what you need</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Can't find a template? Use the AI Generator at the bottom of the Templates page. Just type what you want to achieve (e.g. "When a GitHub issue opens, send a Slack message") and the AI will suggest a personalized template architecture for you.
                    </p>
                  </div>
                </div>
              </GuideSection>
            </div>
          )}

          {/* ── Tips ─────────────────────────────────── */}
          {tab === 'Tips' && (
            <div>
              <GuideSection title="Pro Tips for Better Workflows">
                {[
                  { emoji: '🔗', tip: 'Always start with a Trigger', desc: 'Every workflow must begin with a trigger node. Without it, the workflow has no starting point and will never run.' },
                  { emoji: '🧪', tip: 'Test before activating', desc: 'Use "Test Run" to execute the workflow manually and verify each node works. Check the node outputs before going live.' },
                  { emoji: '🌿', tip: 'Use If Condition to branch', desc: 'When different inputs should produce different results, add an If Condition node. Connect the "true" output to one path and the "false" output to another.' },
                  { emoji: '⏱️', tip: 'Use Delay for follow-ups', desc: 'Add a Delay node between actions when you need to wait — e.g. send a welcome email immediately, wait 3 days, then send a check-in email.' },
                  { emoji: '🔀', tip: 'Use Node Connector to merge paths', desc: 'If your workflow branches (via If Condition) and later the paths need to rejoin, add a Node Connector where they converge.' },
                  { emoji: '💾', tip: 'Save frequently', desc: 'The toolbar shows "Unsaved changes" in amber when you have pending edits. Save often to avoid losing your work.' },
                  { emoji: '📛', tip: 'Name your nodes clearly', desc: 'Click a node and change its "Node Name" in the config panel. Descriptive names like "Fetch User Profile" make complex workflows much easier to understand.' },
                  { emoji: '🔑', tip: 'Use Auth headers for protected APIs', desc: 'In the HTTP Request node\'s Headers field, add {"Authorization": "Bearer YOUR_TOKEN"} to call APIs that require authentication.' },
                ].map(({ emoji, tip, desc }) => (
                  <div key={tip} className="flex gap-3 mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                    <span className="text-lg flex-shrink-0">{emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{tip}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </GuideSection>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Drag nodes from the library · Connect handles · Configure · Save · Activate
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Toolbar ───────────────────────────────────────────────────────────────

interface WorkflowToolbarProps {
  workflowName: string;
  workflowStatus: WorkflowStatus;
  isSaving: boolean;
  hasChanges: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onRun: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onBack: () => void;
  onViewHistory?: () => void;
  onDuplicate?: () => void;
  /** When true the back-arrow button is hidden (parent provides its own nav) */
  hideBack?: boolean;
}

// Status badge
const StatusBadge: React.FC<{ status: WorkflowStatus }> = ({ status }) => {
  const cfg = {
    draft: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400', pulse: false },
    active: { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500', pulse: true },
    paused: { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500', pulse: false },
    error: { bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500', pulse: false },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Toolbar button
interface ToolbarButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger' | 'success';
  showLabel?: boolean;
}
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon: Icon, label, onClick, disabled = false, variant = 'default', showLabel = false }) => {
  const variants = {
    default: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
    primary: 'hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    danger: 'hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400',
    success: 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  };
  return (
    <button onClick={onClick} disabled={disabled} title={label} className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${variants[variant]} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`}>
      <Icon className="w-4 h-4" />
      {showLabel && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

// Divider
const ToolbarDivider: React.FC = () => <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />;

// ─── Main toolbar ──────────────────────────────────────────────────────────

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  workflowName, workflowStatus, isSaving, hasChanges, canUndo, canRedo,
  onNameChange, onSave, onRun, onToggleStatus, onDelete,
  onUndo, onRedo, onZoomIn, onZoomOut, onFitView, onBack,
  onViewHistory, onDuplicate, hideBack = false,
}) => {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">

        {/* Left — name + status */}
        <div className="flex items-center gap-3">
          {!hideBack && (
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={workflowName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Workflow name"
              className="text-lg font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none focus:ring-0 min-w-[200px] placeholder-gray-400"
            />
            <StatusBadge status={workflowStatus} />
            {hasChanges && <span className="text-xs text-amber-600 dark:text-amber-400">Unsaved changes</span>}
          </div>
        </div>

        {/* Center — canvas controls */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-1">
          <ToolbarButton icon={Undo2} label="Undo" onClick={onUndo} disabled={!canUndo} />
          <ToolbarButton icon={Redo2} label="Redo" onClick={onRedo} disabled={!canRedo} />
          <ToolbarDivider />
          <ToolbarButton icon={ZoomOut} label="Zoom Out" onClick={onZoomOut} />
          <ToolbarButton icon={ZoomIn} label="Zoom In" onClick={onZoomIn} />
          <ToolbarButton icon={Maximize2} label="Fit View" onClick={onFitView} />
          <ToolbarDivider />
          <ToolbarButton icon={LayoutGrid} label="Toggle Grid" onClick={() => { }} />
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-2">
          {onViewHistory && <ToolbarButton icon={History} label="History" onClick={onViewHistory} />}
          {onDuplicate && <ToolbarButton icon={Copy} label="Duplicate" onClick={onDuplicate} />}
          <ToolbarButton icon={Settings} label="Settings" onClick={() => { }} />
          <ToolbarButton icon={Trash2} label="Delete" onClick={onDelete} variant="danger" />

          <ToolbarDivider />

          {workflowStatus === 'active' ? (
            <button onClick={onToggleStatus} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30 transition-colors text-sm font-medium">
              <Pause className="w-4 h-4" />
              Pause
            </button>
          ) : (
            <button onClick={onToggleStatus} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors text-sm font-medium">
              <Play className="w-4 h-4" />
              Activate
            </button>
          )}

          <button onClick={onRun} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors text-sm font-medium whitespace-nowrap">
            <Play className="w-4 h-4" />
            Test Run
          </button>

          <button
            onClick={onSave}
            disabled={isSaving || !hasChanges}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {guideOpen && <WorkflowGuide onClose={() => setGuideOpen(false)} />}
    </>
  );
};

export default WorkflowToolbar;
