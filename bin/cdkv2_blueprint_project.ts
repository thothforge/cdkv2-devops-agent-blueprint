#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { FoundationStack } from '../lib/stacks/foundation/foundation-stack';
import { DevOpsAgentStack, DevOpsAgentConfig } from '../lib/stacks/agent/devops-agent-stack';
import { loadConfig } from '../project_configs/config-loader';

const app = new cdk.App();
const config = loadConfig();

const environment = app.node.tryGetContext('env') || process.env.ENV || 'dev';
const envConfig = config.environments[environment];

if (!envConfig) {
  throw new Error(`Unknown environment: ${environment}. Available: ${Object.keys(config.environments).join(', ')}`);
}

const stackProps: cdk.StackProps = {
  env: { account: envConfig.account, region: envConfig.region },
  tags: { ...config.tags, Environment: environment },
};

// Foundation layer
new FoundationStack(app, `${config.project_name}-Foundation-${environment}`, {
  ...stackProps,
  projectName: config.project_name,
  environment,
});

// Agent layer (only if devops_agent config is present)
if (config.devops_agent) {
  const agentConfig: DevOpsAgentConfig = {
    spaceName: config.devops_agent.space_name,
    spaceDescription: config.devops_agent.space_description,
    monitoredAccounts: config.devops_agent.monitored_accounts?.map((a) => ({
      accountId: a.account_id,
      roleArn: a.role_arn,
      regions: a.regions,
    })),
    mcpServers: config.devops_agent.mcp_servers?.map((m) => ({
      serviceType: m.service_type,
      name: m.name,
      targetUrl: m.target_url,
      privateConnectionName: m.private_connection_name,
    })),
    privateConnection: config.devops_agent.private_connection
      ? {
          name: config.devops_agent.private_connection.name,
          hostAddress: config.devops_agent.private_connection.host_address,
          vpcId: config.devops_agent.private_connection.vpc_id,
          subnetIds: config.devops_agent.private_connection.subnet_ids,
          securityGroupIds: config.devops_agent.private_connection.security_group_ids,
        }
      : undefined,
    useIdentityCenter: config.devops_agent.use_identity_center,
    identityCenterInstanceArn: config.devops_agent.identity_center_instance_arn,
  };

  new DevOpsAgentStack(app, `${config.project_name}-Agent-${environment}`, {
    ...stackProps,
    projectName: config.project_name,
    environment,
    agentTags: config.agent_tags,
    agentConfig,
  });
}

// cdk-nag v3: instantiate with scope directly (no Aspects.of().add())
new AwsSolutionsChecks(app, { verbose: true });
