/**
 * Demo API - localStorage-based mock API for static demo deployment
 * Used when NEXT_PUBLIC_DEMO_MODE=true or on app.aituber-flow.dev
 */

import { Workflow, ApiResponse } from './types';
import { DEMO_WORKFLOW_ID } from './demoRoutes';

const STORAGE_KEYS = {
  WORKFLOW: 'aituber_demo_workflow',
  MODELS: 'aituber_demo_models',
  ANIMATIONS: 'aituber_demo_animations',
} as const;

const DEMO_WORKFLOW_BASE: Omit<Workflow, 'createdAt' | 'updatedAt'> = {
  id: DEMO_WORKFLOW_ID,
  name: 'Demo Workflow',
  description: 'Welcome to AITuberFlow! This is a demo workflow.',
  nodes: [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 100, y: 200 },
      config: { label: 'Start' },
    },
    {
      id: 'llm-1',
      type: 'openai-chat',
      position: { x: 350, y: 200 },
      config: {
        label: 'AI Response',
        model: 'gpt-4o-mini',
        systemPrompt: 'You are a friendly AI VTuber assistant.',
      },
    },
    {
      id: 'tts-1',
      type: 'voicevox',
      position: { x: 600, y: 200 },
      config: {
        label: 'Voice Synthesis',
        speaker: 1,
        speed: 1.0,
      },
    },
  ],
  connections: [
    { id: 'e1', from: { nodeId: 'start-1', port: 'output' }, to: { nodeId: 'llm-1', port: 'input' } },
    { id: 'e2', from: { nodeId: 'llm-1', port: 'output' }, to: { nodeId: 'tts-1', port: 'input' } },
  ],
  character: {
    name: 'AI Assistant',
    personality: 'Friendly and helpful',
  },
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

function createDefaultDemoWorkflow(): Workflow {
  const now = new Date().toISOString();
  return {
    ...JSON.parse(JSON.stringify(DEMO_WORKFLOW_BASE)),
    createdAt: now,
    updatedAt: now,
  };
}

function getStoredWorkflow(): Workflow {
  const stored = getFromStorage<Workflow | null>(STORAGE_KEYS.WORKFLOW, null);
  if (!stored || typeof stored !== 'object') {
    const initial = createDefaultDemoWorkflow();
    setToStorage(STORAGE_KEYS.WORKFLOW, initial);
    return initial;
  }

  return {
    ...createDefaultDemoWorkflow(),
    ...stored,
    id: DEMO_WORKFLOW_ID,
    nodes: Array.isArray(stored.nodes) ? stored.nodes : [],
    connections: Array.isArray(stored.connections) ? stored.connections : [],
    character: stored.character || { name: 'AI Assistant', personality: 'Friendly and helpful' },
    updatedAt: stored.updatedAt || new Date().toISOString(),
  };
}

function setStoredWorkflow(workflow: Workflow): void {
  setToStorage(STORAGE_KEYS.WORKFLOW, {
    ...workflow,
    id: DEMO_WORKFLOW_ID,
  });
}

// Demo plugin definition
interface DemoNodeDefinition {
  type: string;
  label: string;
  category: string;
  inputs: string[];
  outputs: string[];
  configFields: Array<{
    name: string;
    type: string;
    label: string;
    default?: any;
  }>;
}

interface DemoPluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  nodes: DemoNodeDefinition[];
}

// Demo plugins data
const DEMO_PLUGINS: DemoPluginManifest[] = [
  {
    id: 'core',
    name: 'Core Nodes',
    version: '1.0.0',
    description: 'Built-in core nodes for workflow control',
    author: 'AITuberFlow',
    nodes: [
      {
        type: 'start',
        label: 'Start',
        category: 'Control Flow',
        inputs: [],
        outputs: ['trigger'],
        configFields: [],
      },
      {
        type: 'manual-trigger',
        label: 'Manual Trigger',
        category: 'Control Flow',
        inputs: [],
        outputs: ['trigger'],
        configFields: [],
      },
    ],
  },
  {
    id: 'llm',
    name: 'LLM Nodes',
    version: '1.0.0',
    description: 'Large Language Model integration nodes',
    author: 'AITuberFlow',
    nodes: [
      {
        type: 'openai-chat',
        label: 'OpenAI Chat',
        category: 'LLM',
        inputs: ['prompt'],
        outputs: ['response'],
        configFields: [
          { name: 'model', type: 'select', label: 'Model', default: 'gpt-4o-mini' },
          { name: 'systemPrompt', type: 'textarea', label: 'System Prompt', default: '' },
        ],
      },
    ],
  },
  {
    id: 'tts',
    name: 'TTS Nodes',
    version: '1.0.0',
    description: 'Text-to-Speech nodes',
    author: 'AITuberFlow',
    nodes: [
      {
        type: 'voicevox',
        label: 'VOICEVOX',
        category: 'TTS',
        inputs: ['text'],
        outputs: ['audio'],
        configFields: [
          { name: 'speaker', type: 'number', label: 'Speaker ID', default: 1 },
          { name: 'speed', type: 'number', label: 'Speed', default: 1.0 },
        ],
      },
    ],
  },
];

// Demo templates
const DEMO_TEMPLATES = [
  {
    id: 'simple-chat',
    name: 'Simple Chat',
    description: 'Basic chat workflow with LLM and TTS',
    nodeCount: 3,
    connectionCount: 2,
  },
  {
    id: 'youtube-stream',
    name: 'YouTube Stream',
    description: 'Complete setup for YouTube live streaming',
    nodeCount: 8,
    connectionCount: 7,
  },
];

// Demo API Client
class DemoApiClient {
  // Workflow methods
  async listWorkflows(): Promise<ApiResponse<Workflow[]>> {
    await this.delay(100);
    return { data: [getStoredWorkflow()] };
  }

  async getWorkflow(_id: string): Promise<ApiResponse<Workflow>> {
    await this.delay(50);
    return { data: getStoredWorkflow() };
  }

  async createWorkflow(workflow: Partial<Workflow>): Promise<ApiResponse<Workflow>> {
    await this.delay(100);
    const current = getStoredWorkflow();
    const now = new Date().toISOString();
    const created: Workflow = {
      ...current,
      ...workflow,
      id: DEMO_WORKFLOW_ID,
      createdAt: current.createdAt || now,
      updatedAt: now,
    };
    setStoredWorkflow(created);
    return { data: created };
  }

  async updateWorkflow(_id: string, workflow: Partial<Workflow>): Promise<ApiResponse<Workflow>> {
    await this.delay(100);
    const current = getStoredWorkflow();
    const updated: Workflow = {
      ...current,
      ...workflow,
      id: DEMO_WORKFLOW_ID,
      updatedAt: new Date().toISOString(),
    };
    setStoredWorkflow(updated);
    return { data: updated };
  }

  async deleteWorkflow(_id: string): Promise<ApiResponse<void>> {
    await this.delay(100);
    setStoredWorkflow(createDefaultDemoWorkflow());
    return { data: undefined };
  }

  async duplicateWorkflow(_id: string): Promise<ApiResponse<Workflow>> {
    await this.delay(100);
    return { error: 'Demo mode supports a single workflow' };
  }

  async exportWorkflow(_id: string): Promise<ApiResponse<WorkflowExport>> {
    await this.delay(50);
    const workflow = getStoredWorkflow();
    return {
      data: {
        name: workflow.name,
        description: workflow.description,
        nodes: workflow.nodes,
        connections: workflow.connections,
        character: workflow.character,
        exportedAt: new Date().toISOString(),
        version: '1.0',
      },
    };
  }

  async importWorkflow(data: WorkflowExport): Promise<ApiResponse<Workflow>> {
    await this.delay(100);
    const current = getStoredWorkflow();
    const imported: Workflow = {
      ...current,
      name: data.name,
      description: data.description,
      nodes: data.nodes,
      connections: data.connections,
      character: data.character,
      id: DEMO_WORKFLOW_ID,
      updatedAt: new Date().toISOString(),
    };
    setStoredWorkflow(imported);
    return { data: imported };
  }

  // Execution (demo mode - just simulates)
  async startWorkflow(_id: string): Promise<ApiResponse<{ status: string }>> {
    await this.delay(200);
    console.log('[Demo Mode] Workflow execution simulated');
    return { data: { status: 'running' } };
  }

  async stopWorkflow(_id: string): Promise<ApiResponse<{ status: string }>> {
    await this.delay(100);
    return { data: { status: 'stopped' } };
  }

  // Plugins
  async listPlugins(): Promise<ApiResponse<DemoPluginManifest[]>> {
    await this.delay(50);
    return { data: DEMO_PLUGINS };
  }

  async getPlugin(id: string): Promise<ApiResponse<DemoPluginManifest>> {
    await this.delay(50);
    const plugin = DEMO_PLUGINS.find(p => p.id === id);
    if (!plugin) {
      return { error: 'Plugin not found' };
    }
    return { data: plugin };
  }

  // Templates
  async listTemplates(): Promise<ApiResponse<TemplateSummary[]>> {
    await this.delay(50);
    return { data: DEMO_TEMPLATES };
  }

  async getTemplate(id: string): Promise<ApiResponse<Template>> {
    await this.delay(50);
    const summary = DEMO_TEMPLATES.find(t => t.id === id);
    if (!summary) {
      return { error: 'Template not found' };
    }
    const templateWorkflow = createDefaultDemoWorkflow();
    return {
      data: {
        ...summary,
        nodes: templateWorkflow.nodes,
        connections: templateWorkflow.connections,
        character: templateWorkflow.character,
      },
    };
  }

  // VOICEVOX (demo returns sample data)
  async getVoicevoxSpeakers(): Promise<ApiResponse<{ speakers: VoicevoxSpeaker[] }>> {
    await this.delay(100);
    return {
      data: {
        speakers: [
          { id: 1, name: 'ずんだもん', style: 'ノーマル', label: 'ずんだもん (ノーマル)' },
          { id: 3, name: 'ずんだもん', style: 'あまあま', label: 'ずんだもん (あまあま)' },
          { id: 0, name: '四国めたん', style: 'ノーマル', label: '四国めたん (ノーマル)' },
        ],
      },
    };
  }

  async checkVoicevoxHealth(): Promise<ApiResponse<{ status: string; version?: string }>> {
    await this.delay(50);
    return { data: { status: 'demo', version: 'demo' } };
  }

  // Model management (localStorage-based)
  async uploadModel(file: File): Promise<ApiResponse<ModelUploadResult>> {
    await this.delay(500);
    const models = getFromStorage<ModelInfo[]>(STORAGE_KEYS.MODELS, []);
    const url = URL.createObjectURL(file);
    const newModel: ModelInfo = {
      filename: file.name,
      url,
      size: file.size,
      type: file.name.endsWith('.vrm') ? 'vrm' : 'image',
    };
    models.push(newModel);
    setToStorage(STORAGE_KEYS.MODELS, models);
    return {
      data: {
        success: true,
        filename: file.name,
        url,
        size: file.size,
      },
    };
  }

  async listModels(): Promise<ApiResponse<{ models: ModelInfo[] }>> {
    await this.delay(50);
    const models = getFromStorage<ModelInfo[]>(STORAGE_KEYS.MODELS, []);
    return { data: { models } };
  }

  async deleteModel(filename: string): Promise<ApiResponse<{ success: boolean }>> {
    await this.delay(100);
    const models = getFromStorage<ModelInfo[]>(STORAGE_KEYS.MODELS, []);
    const filtered = models.filter(m => m.filename !== filename);
    setToStorage(STORAGE_KEYS.MODELS, filtered);
    return { data: { success: true } };
  }

  // Animation management
  async uploadAnimation(file: File): Promise<ApiResponse<AnimationUploadResult>> {
    await this.delay(500);
    const animations = getFromStorage<AnimationInfo[]>(STORAGE_KEYS.ANIMATIONS, []);
    const url = URL.createObjectURL(file);
    const newAnimation: AnimationInfo = {
      filename: file.name,
      url,
      size: file.size,
      type: file.name.split('.').pop() || 'unknown',
    };
    animations.push(newAnimation);
    setToStorage(STORAGE_KEYS.ANIMATIONS, animations);
    return {
      data: {
        success: true,
        filename: file.name,
        url,
        size: file.size,
      },
    };
  }

  async listAnimations(): Promise<ApiResponse<{ animations: AnimationInfo[] }>> {
    await this.delay(50);
    const animations = getFromStorage<AnimationInfo[]>(STORAGE_KEYS.ANIMATIONS, []);
    return { data: { animations } };
  }

  async deleteAnimation(filename: string): Promise<ApiResponse<{ success: boolean }>> {
    await this.delay(100);
    const animations = getFromStorage<AnimationInfo[]>(STORAGE_KEYS.ANIMATIONS, []);
    const filtered = animations.filter(a => a.filename !== filename);
    setToStorage(STORAGE_KEYS.ANIMATIONS, filtered);
    return { data: { success: true } };
  }

  // Helper method for simulated delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Type definitions
export interface TemplateSummary {
  id: string;
  name: string;
  description: string;
  nodeCount: number;
  connectionCount: number;
}

export interface WorkflowExport {
  name: string;
  description?: string;
  nodes: any[];
  connections: any[];
  character: {
    name: string;
    personality: string;
  };
  exportedAt?: string;
  version?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  connections: any[];
  character: {
    name: string;
    personality: string;
  };
}

export interface VoicevoxSpeaker {
  id: number;
  name: string;
  style: string;
  label: string;
}

export interface ModelUploadResult {
  success: boolean;
  filename: string;
  url: string;
  size: number;
}

export interface ModelInfo {
  filename: string;
  url: string;
  size: number;
  type: 'vrm' | 'image';
}

export interface AnimationUploadResult {
  success: boolean;
  filename: string;
  url: string;
  size: number;
}

export interface AnimationInfo {
  filename: string;
  url: string;
  size: number;
  type: string;
}

export const demoApi = new DemoApiClient();
export default demoApi;
