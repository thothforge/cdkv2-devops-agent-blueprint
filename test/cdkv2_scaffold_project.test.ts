import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { FoundationStack } from '../lib/stacks/foundation/foundation-stack';

test('Foundation Stack creates S3 bucket with encryption', () => {
  const app = new cdk.App();
  const stack = new FoundationStack(app, 'TestFoundation', {
    projectName: 'Test',
    environment: 'dev',
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [
        { ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } },
      ],
    },
  });
});
