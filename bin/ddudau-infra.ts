#!/usr/bin/env node
import 'source-map-support/register';
import { DdudauInfraStack } from '../lib/ddudau-infra-stack';
import { identifyResource } from '../lib/config-util';
import { App } from 'aws-cdk-lib';

const app = new App();
const accountId = '585331535030';
const region = 'eu-central-1';

const staticSiteResourcePrefix = 'ddudau-web-static';
const STATIC_SITE_BUCKET_NAME_OUTPUT_ID = identifyResource(staticSiteResourcePrefix, 'bucket-name');
const STATIC_SITE_DISTRIBUTION_ID_OUTPUT_ID = identifyResource(staticSiteResourcePrefix, 'distribution-id');

new DdudauInfraStack(app, 'DdudauInfraStack', {
  env: {
    account: accountId,
    region: region,
  },
  resourcePrefix: staticSiteResourcePrefix,
  hostedZoneName: 'ddudau.link',
  domainName: 'ddudau.link',
  includeWWW: true,
  siteSourcePath: '../dist',
  staticSiteBucketNameOutputId: STATIC_SITE_BUCKET_NAME_OUTPUT_ID,
  staticSiteDistributionIdOutputId: STATIC_SITE_DISTRIBUTION_ID_OUTPUT_ID
});