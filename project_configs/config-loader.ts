import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface EnvironmentConfig {
  account: string;
  region: string;
}

export interface DevOpsAgentYamlConfig {
  space_name: string;
  space_description?: string;
  monitored_accounts?: {
    account_id: string;
    role_arn: string;
    regions?: string[];
  }[];
  mcp_servers?: {
    service_type: 'mcpserver' | 'mcpserversplunk' | 'mcpservernewrelic' | 'mcpservergrafana' | 'mcpserversigv4';
    name: string;
    target_url: string;
    private_connection_name?: string;
  }[];
  private_connection?: {
    name: string;
    host_address: string;
    vpc_id: string;
    subnet_ids: string[];
    security_group_ids: string[];
  };
  use_identity_center?: boolean;
  identity_center_instance_arn?: string;
}

export interface ProjectConfig {
  project_name: string;
  environments: Record<string, EnvironmentConfig>;
  tags: Record<string, string>;
  devops_agent?: DevOpsAgentYamlConfig;
}

export function loadConfig(): ProjectConfig {
  const configPath = path.join(__dirname, 'environment_options.yaml');
  return yaml.load(fs.readFileSync(configPath, 'utf8')) as ProjectConfig;
}
