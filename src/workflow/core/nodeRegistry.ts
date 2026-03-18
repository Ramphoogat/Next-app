import nodesData from '@/workflow/data/nodes.json';
import categoriesData from '@/workflow/data/categories.json';

export interface NodeCategory {
  id: string;
  name: string;
  description: string;
}

export interface NodeParameterOption {
  value: string;
  label: string;
}

export interface NodeParameter {
  id: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiSelect' | 'json' | 'object' | 'array' | 'credentials';
  required: boolean;
  group: 'Connection' | 'Basic' | 'Advanced' | 'Authentication' | 'Trigger' | 'Payload' | 'Filtering' | 'Output' | 'Other';
  description: string;
  default: unknown;
  options?: NodeParameterOption[];
  dependsOn?: {
    field: string;
    valueIn: unknown[];
  };
}

export interface NodeDefinition {
  id: string;
  name: string;
  categoryId: string;
  triggers: string[];
  actions: string[];
  icon: string;
  parameters: NodeParameter[];
}

export class NodeRegistry {
  private static nodes: NodeDefinition[] = nodesData as NodeDefinition[];
  private static categories: NodeCategory[] = categoriesData as NodeCategory[];

  /**
   * Get all available nodes
   */
  static getAllNodes(): NodeDefinition[] {
    return this.nodes;
  }

  /**
   * Get all defined categories
   */
  static getAllCategories(): NodeCategory[] {
    return this.categories;
  }

  /**
   * Get a node by its ID
   * @param id The node ID (e.g., "slack", "http_request")
   */
  static getNodeById(id: string): NodeDefinition | undefined {
    return this.nodes.find(node => node.id === id);
  }

  /**
   * Get a category by its ID
   * @param id The category ID (e.g., "core", "marketing")
   */
  static getCategoryById(id: string): NodeCategory | undefined {
    return this.categories.find(category => category.id === id);
  }

  /**
   * Get all nodes within a specific category
   * @param categoryId The category ID
   */
  static getNodesByCategory(categoryId: string): NodeDefinition[] {
    return this.nodes.filter(node => node.categoryId === categoryId);
  }

  /**
   * Search nodes by name or ID
   * @param query The search query string
   */
  static searchNodes(query: string): NodeDefinition[] {
    const lowerQuery = query.toLowerCase();
    return this.nodes.filter(
      node => 
        node.name.toLowerCase().includes(lowerQuery) || 
        node.id.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get all nodes that have triggers
   */
  static getTriggerNodes(): NodeDefinition[] {
    return this.nodes.filter(node => node.triggers.length > 0);
  }

  /**
   * Get all nodes that have actions
   */
  static getActionNodes(): NodeDefinition[] {
    return this.nodes.filter(node => node.actions.length > 0);
  }
}
