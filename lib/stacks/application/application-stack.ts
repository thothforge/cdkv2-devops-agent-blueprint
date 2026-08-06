import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface ApplicationStackProps extends cdk.StackProps {
  projectName: string;
  environment: string;
}

/**
 * Application layer: workload-specific resources.
 * Add Lambda functions, DynamoDB tables, SQS queues, etc. here.
 */
export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApplicationStackProps) {
    super(scope, id, props);

    // TODO: Add application resources
    // Examples:
    // - Lambda functions (use NodejsFunction for bundling)
    // - DynamoDB tables
    // - SQS queues
    // - EventBridge rules
  }
}
