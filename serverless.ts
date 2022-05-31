import type { AWS } from '@serverless/typescript';

import book from '@functions/book';

const serverlessConfiguration: AWS = {
  service: 'serverless-offline-bug',
  frameworkVersion: '3',
  plugins: ['serverless-plugin-typescript', 'serverless-tscpaths', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { book },
  package: { individually: false },
  custom: {
  },
};

module.exports = serverlessConfiguration;
