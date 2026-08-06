import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SampleBucket } from '../../constructs/sample-bucket';

export interface FoundationStackProps extends cdk.StackProps {
  projectName: string;
  environment: string;
}

export class FoundationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FoundationStackProps) {
    super(scope, id, props);

    new SampleBucket(this, 'ArtifactsBucket', {
      environment: props.environment,
    });
  }
}
