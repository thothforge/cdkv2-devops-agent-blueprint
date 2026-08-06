import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface PlatformStackProps extends cdk.StackProps {
  projectName: string;
  environment: string;
}

/**
 * Platform layer: networking, compute, and shared services.
 * Add VPC, ECS clusters, API Gateways, etc. here.
 */
export class PlatformStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PlatformStackProps) {
    super(scope, id, props);

    // TODO: Add platform resources
    // Examples:
    // - VPC with public/private subnets
    // - ECS Cluster
    // - API Gateway
    // - Shared ALB
  }
}
