#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

// ============================================================================
// COMPLETE AWO MISSING FILES GENERATOR - ALL 140+ FILES
// ============================================================================

// All missing files extracted from your Mintlify validation
const missingFiles = [
  // Getting Started
  'platform-overview',
  'target-users',
  'key-features',
  'market-context',
  
  // Quick Setup
  'quick-setup/development-environment',
  'quick-setup/api-setup',
  'quick-setup/mobile-app-setup',
  'quick-setup/database-configuration',
  'quick-setup/first-integration',
  
  // Architecture
  'architecture/system-overview',
  'architecture/technology-stack',
  'architecture/component-architecture',
  'architecture/data-flow',
  'architecture/security-architecture',
  'architecture/scalability-design',
  'architecture/technical-decisions',
  
  // Data Models
  'data-models/database-schema',
  'data-models/user-models',
  'data-models/financial-models',
  'data-models/chama-models',
  'data-models/investment-models',
  'data-models/compliance-models',
  'data-models/relationships',
  
  // Core Features
  'core-features/authentication',
  'core-features/user-management',
  'core-features/awo-wallet',
  'core-features/diva-scoring',
  'core-features/rtsm-assessment',
  'core-features/basic-chama',
  'core-features/mobile-money',
  'core-features/transaction-history',
  
  // Advanced Features
  'advanced-features/investment-platform',
  'advanced-features/sme-marketplace',
  'advanced-features/portfolio-management',
  'advanced-features/advanced-chama',
  'advanced-features/wealth-coaching',
  'advanced-features/youth-accounts',
  'advanced-features/cross-border-payments',
  'advanced-features/ussd-banking',
  'advanced-features/whatsapp-banking',
  'advanced-features/agent-networks',
  
  // Development
  'development/environment-setup',
  'development/project-structure',
  'development/development-workflow',
  'development/code-style',
  'development/component-patterns',
  'development/state-management',
  'development/real-time-features',
  'development/performance-optimization',
  'development/debugging',
  
  // Testing
  'testing/testing-strategy',
  'testing/unit-testing',
  'testing/integration-testing',
  'testing/e2e-testing',
  'testing/financial-testing',
  'testing/performance-testing',
  'testing/mobile-testing',
  'testing/compliance-testing',
  
  // API Reference - Auth
  'api-reference/auth/mfa',
  'api-reference/auth/logout',
  
  // API Reference - Users
  'api-reference/users/preferences',
  'api-reference/users/contacts',
  'api-reference/users/devices',
  
  // API Reference - Financial
  'api-reference/financial/balance-inquiries',
  'api-reference/financial/transaction-sync',
  
  // API Reference - DIVA Score
  'api-reference/diva-score/rtsm-assessment',
  
  // API Reference - Chamas
  'api-reference/chamas/governance',
  'api-reference/chamas/reporting',
  
  // API Reference - Savings
  'api-reference/savings/auto-savings',
  
  // API Reference - Investments
  'api-reference/investments/sme-marketplace',
  'api-reference/investments/performance',
  
  // API Reference - Payments
  'api-reference/payments/mobile-money',
  'api-reference/payments/cross-border',
  
  // API Reference - Coaching
  'api-reference/coaching/coach-discovery',
  'api-reference/coaching/session-management',
  'api-reference/coaching/content-library',
  'api-reference/coaching/progress-tracking',
  
  // API Reference - Notifications
  'api-reference/notifications/push-notifications',
  'api-reference/notifications/sms-email',
  'api-reference/notifications/real-time-updates',
  'api-reference/notifications/preferences',
  
  // API Reference - Webhooks
  'api-reference/webhooks/payment-events',
  'api-reference/webhooks/score-events',
  
  // Integration Guides
  'integration/open-banking',
  'integration/stitch-integration',
  'integration/mono-integration',
  'integration/flutterwave-setup',
  'integration/mobile-money',
  'integration/kyc-integration',
  'integration/sms-email-setup',
  'integration/push-notifications',
  'integration/whatsapp-banking',
  
  // Security
  'security/overview',
  'security/authentication-security',
  'security/data-security',
  'security/api-security',
  'security/financial-security',
  'security/threat-model',
  'security/incident-response',
  
  // Security Best Practices
  'security-practices/development-guidelines',
  'security-practices/infrastructure-security',
  'security-practices/operational-security',
  'security-practices/code-review',
  'security-practices/compliance-practices',
  
  // Deployment
  'deployment/overview',
  'deployment/environment-setup',
  'deployment/backend-deployment',
  'deployment/mobile-deployment',
  'deployment/database-deployment',
  'deployment/monitoring-setup',
  
  // Infrastructure
  'infrastructure/overview',
  'infrastructure/database-infrastructure',
  'infrastructure/application-infrastructure',
  'infrastructure/devops-cicd',
  'infrastructure/security-infrastructure',
  'infrastructure/monitoring-logging',
  
  // Guides
  'guides/portfolio-setup',
  'guides/wealth-coaching-setup',
  'guides/youth-accounts',
  'guides/migration-guides',
  
  // Business
  'business/market-analysis',
  'business/product-strategy',
  'business/business-model',
  'business/success-metrics',
  'business/risk-assessment',
  'business/partnership-opportunities',
  'business/roi-analysis',
  
  // Compliance
  'compliance/regulatory-framework',
  'compliance/data-protection',
  'compliance/financial-compliance',
  'compliance/operational-compliance',
  'compliance/sadc-requirements',
  'compliance/audit-procedures',
  
  // Resources
  'resources/code-samples',
  'resources/sdks-libraries',
  'resources/tools-utilities',
  'resources/database-schema',
  'resources/configuration-templates',
  'resources/error-codes',
  'resources/external-resources'
];

// Enhanced templates with AWO-specific content
const templates = {
  'getting-started': (title) => `---
title: "${title}"
description: "${title} for AWO Platform"
---

# ${title}

## Overview

<Info>
This section provides essential information about the AWO Platform for financial inclusion in the SADC region.
</Info>

## Key Points

Content for ${title.toLowerCase()} will be added here.

## Next Steps

<CardGroup cols={2}>
  <Card title="Quick Setup" icon="rocket" href="/quick-setup/development-environment">
    Get started with AWO development environment
  </Card>
  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Explore AWO API documentation
  </Card>
</CardGroup>
`,

  'quick-setup': (title) => `---
title: "${title}"
description: "Step-by-step ${title.toLowerCase()} guide for AWO Platform"
---

# ${title}

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Git configured
- Access to AWO development resources

<Info>
This guide will help you set up ${title.toLowerCase()} quickly and efficiently.
</Info>

## Step-by-Step Instructions

<Steps>
  <Step title="Initial Setup">
    Setup instructions will be added here
  </Step>
  <Step title="Configuration">
    Configuration details will be provided
  </Step>
  <Step title="Verification">
    Verification steps will be included
  </Step>
</Steps>

## Troubleshooting

Common issues and solutions will be documented here.

## Next Steps

<Card title="Continue Setup" href="/quick-setup/api-setup">
  Proceed to the next setup step
</Card>
`,

  'architecture': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} documentation"
---

# ${title}

## Overview

<Info>
This section covers the ${title.toLowerCase()} of the AWO Platform, designed for financial inclusion across the SADC region.
</Info>

## Architecture Components

Detailed architecture information will be provided here.

## Key Decisions

<CardGroup cols={2}>
  <Card title="Technology Stack" icon="layers">
    React Native, Express.js, PostgreSQL
  </Card>
  <Card title="Design Principles" icon="compass">
    Scalability, Security, Simplicity
  </Card>
</CardGroup>

## Implementation Details

Technical implementation details will be documented here.

## Related Documentation

<Card title="System Overview" href="/architecture/system-overview">
  Explore the complete system architecture
</Card>
`,

  'data-models': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} schema and relationships"
---

# ${title}

## Overview

<Info>
This section documents the ${title.toLowerCase()} used in the AWO Platform for financial services.
</Info>

## Schema Definition

Database schema and model definitions will be provided here.

\`\`\`sql
-- Schema example will be added
CREATE TABLE example (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Relationships

Entity relationships and data flow will be documented here.

## Usage Examples

<CodeGroup>
\`\`\`typescript TypeScript
// TypeScript interface example
interface ExampleModel {
  id: number;
  createdAt: Date;
}
\`\`\`

\`\`\`sql SQL Query
-- SQL query example
SELECT * FROM example WHERE id = $1;
\`\`\`
</CodeGroup>

## Best Practices

Data modeling best practices will be included here.
`,

  'core-features': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} core functionality"
---

# ${title}

## Overview

<Info>
${title} is a core feature of the AWO Platform, designed to support financial inclusion for African women.
</Info>

## Key Features

Core functionality will be documented here.

## Implementation

<Steps>
  <Step title="Setup">
    Initial setup and configuration
  </Step>
  <Step title="Integration">
    Integration with other AWO services
  </Step>
  <Step title="Testing">
    Testing and validation procedures
  </Step>
</Steps>

## API Integration

\`\`\`typescript
// Example API integration
const response = await awo.${title.toLowerCase().replace(/\s+/g, '')}.method();
\`\`\`

## Best Practices

Implementation best practices will be provided here.

## Related Features

<CardGroup cols={2}>
  <Card title="DIVA Scoring" href="/core-features/diva-scoring">
    Financial health assessment system
  </Card>
  <Card title="Chama Management" href="/core-features/basic-chama">
    Digital savings group platform
  </Card>
</CardGroup>
`,

  'advanced-features': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} advanced functionality"
---

# ${title}

## Overview

<Info>
${title} is an advanced feature of the AWO Platform, providing sophisticated financial services for experienced users.
</Info>

## Advanced Capabilities

Advanced functionality will be documented here.

## Configuration

<Accordion title="Advanced Configuration Options">
Configuration details for ${title.toLowerCase()} will be provided here.
</Accordion>

## Implementation Guide

Detailed implementation steps will be included here.

## Performance Considerations

Performance optimization tips will be documented here.

## Enterprise Features

<CardGroup cols={2}>
  <Card title="SME Marketplace" href="/advanced-features/sme-marketplace">
    Business investment opportunities
  </Card>
  <Card title="Wealth Coaching" href="/advanced-features/wealth-coaching">
    Professional financial advisory
  </Card>
</CardGroup>
`,

  'development': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} development guide"
---

# ${title}

## Overview

<Info>
This guide covers ${title.toLowerCase()} for AWO Platform development.
</Info>

## Development Setup

Development setup instructions will be provided here.

## Code Examples

\`\`\`typescript
// Development example
import { AWOPlatform } from '@awo-platform/core';

const awo = new AWOPlatform({
  apiKey: process.env.AWO_API_KEY
});
\`\`\`

## Best Practices

Development best practices will be documented here.

## Tools and Resources

<CardGroup cols={2}>
  <Card title="API Reference" href="/api-reference/introduction">
    Complete API documentation
  </Card>
  <Card title="Testing Guide" href="/testing/testing-strategy">
    Testing strategies and tools
  </Card>
</CardGroup>
`,

  'testing': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} testing guide"
---

# ${title}

## Overview

<Info>
This guide covers ${title.toLowerCase()} for the AWO Platform financial services.
</Info>

## Testing Strategy

Testing approach and methodologies will be documented here.

## Test Implementation

\`\`\`typescript
// Test example
describe('${title}', () => {
  it('should pass validation', () => {
    // Test implementation
  });
});
\`\`\`

## Test Coverage

Coverage requirements and measurement will be detailed here.

## Continuous Testing

<CardGroup cols={2}>
  <Card title="Unit Testing" href="/testing/unit-testing">
    Component and service testing
  </Card>
  <Card title="Integration Testing" href="/testing/integration-testing">
    End-to-end system testing
  </Card>
</CardGroup>
`,

  'api-reference': (title) => `---
title: "${title}"
description: "AWO Platform ${title} API endpoint"
---

# ${title}

## Overview

<Info>
This endpoint provides ${title.toLowerCase()} functionality for the AWO Platform.
</Info>

## Authentication

All API requests require authentication:

\`\`\`bash
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`

## Request

\`\`\`bash
curl -X POST "https://api.awo-platform.com/v1/${title.toLowerCase().replace(/\s+/g, '-')}" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "example": "data"
  }'
\`\`\`

## Response

\`\`\`json
{
  "success": true,
  "data": {
    "id": "example",
    "status": "completed"
  },
  "timestamp": "2025-01-20T10:00:00Z"
}
\`\`\`

## Error Handling

<Accordion title="Common Error Responses">
Error codes and responses will be documented here.
</Accordion>

## Rate Limits

This endpoint has the following rate limits:
- 100 requests per minute per user
- 1000 requests per hour per user

## Related Endpoints

<CardGroup cols={2}>
  <Card title="Authentication" href="/api-reference/auth/login">
    User authentication endpoints
  </Card>
  <Card title="User Management" href="/api-reference/users/profile">
    User profile management
  </Card>
</CardGroup>
`,

  'integration': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} integration guide"
---

# ${title}

## Overview

<Info>
This guide covers ${title.toLowerCase()} integration with the AWO Platform.
</Info>

## Prerequisites

Integration requirements will be listed here.

## Setup Instructions

<Steps>
  <Step title="API Configuration">
    Configure API credentials and endpoints
  </Step>
  <Step title="Webhook Setup">
    Set up webhooks for real-time updates
  </Step>
  <Step title="Testing">
    Test the integration in sandbox environment
  </Step>
</Steps>

## Code Examples

\`\`\`typescript
// Integration example
import { ${title.replace(/\s+/g, '')}Client } from '@awo-platform/integrations';

const client = new ${title.replace(/\s+/g, '')}Client({
  apiKey: process.env.API_KEY,
  environment: 'sandbox'
});
\`\`\`

## Webhooks

Webhook configuration and handling will be documented here.

## Troubleshooting

<Accordion title="Common Integration Issues">
Common problems and solutions will be provided here.
</Accordion>
`,

  'security': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} security documentation"
---

# ${title}

## Overview

<Info>
This section covers ${title.toLowerCase()} for the AWO Platform financial services.
</Info>

## Security Measures

Security implementation details will be documented here.

## Compliance

<CardGroup cols={2}>
  <Card title="GDPR Compliance" icon="shield">
    European data protection compliance
  </Card>
  <Card title="POPIA Compliance" icon="lock">
    South African data protection compliance
  </Card>
</CardGroup>

## Best Practices

Security best practices will be provided here.

## Incident Response

Security incident procedures will be documented here.

## Related Security Topics

<Card title="Security Overview" href="/security/overview">
  Complete security documentation
</Card>
`,

  'deployment': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} deployment guide"
---

# ${title}

## Overview

<Info>
This guide covers ${title.toLowerCase()} for the AWO Platform.
</Info>

## Deployment Steps

<Steps>
  <Step title="Environment Preparation">
    Prepare deployment environment
  </Step>
  <Step title="Configuration">
    Configure deployment settings
  </Step>
  <Step title="Deployment">
    Execute deployment process
  </Step>
  <Step title="Verification">
    Verify successful deployment
  </Step>
</Steps>

## Configuration

Deployment configuration will be documented here.

## Monitoring

Post-deployment monitoring setup will be covered here.

## Rollback Procedures

<Accordion title="Emergency Rollback">
Rollback procedures will be documented here.
</Accordion>
`,

  'infrastructure': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} infrastructure documentation"
---

# ${title}

## Overview

<Info>
This section covers ${title.toLowerCase()} for the AWO Platform infrastructure.
</Info>

## Infrastructure Components

Infrastructure details will be documented here.

## Scaling Strategy

Scaling approach and implementation will be covered here.

## Performance Optimization

<CardGroup cols={2}>
  <Card title="Database Optimization" icon="database">
    PostgreSQL performance tuning
  </Card>
  <Card title="API Optimization" icon="zap">
    Express.js performance optimization
  </Card>
</CardGroup>

## Monitoring & Alerts

Monitoring setup and alerting will be documented here.
`,

  'guides': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} implementation guide"
---

# ${title}

## Overview

<Info>
This comprehensive guide covers ${title.toLowerCase()} for the AWO Platform.
</Info>

## Step-by-Step Implementation

<Steps>
  <Step title="Planning">
    Plan your implementation approach
  </Step>
  <Step title="Setup">
    Set up required components
  </Step>
  <Step title="Implementation">
    Implement the feature
  </Step>
  <Step title="Testing">
    Test your implementation
  </Step>
  <Step title="Deployment">
    Deploy to production
  </Step>
</Steps>

## Code Examples

Implementation examples will be provided here.

## Best Practices

Implementation best practices will be documented here.

## Common Pitfalls

<Warning>
Common mistakes and how to avoid them will be listed here.
</Warning>

## Next Steps

<Card title="Related Guides" href="/guides/integration-walkthrough">
  Explore other implementation guides
</Card>
`,

  'business': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} business documentation"
---

# ${title}

## Overview

<Info>
This section provides ${title.toLowerCase()} information for the AWO Platform, focusing on financial inclusion in the SADC region.
</Info>

## Business Context

Business information will be documented here.

## Market Analysis

<CardGroup cols={2}>
  <Card title="SADC Market" icon="globe">
    Southern African Development Community market analysis
  </Card>
  <Card title="Gender Gap" icon="chart-bar">
    $12.6B gender investment gap opportunity
  </Card>
</CardGroup>

## Key Metrics

Business metrics and KPIs will be provided here.

## Strategic Considerations

Strategic business considerations will be documented here.
`,

  'compliance': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} compliance documentation"
---

# ${title}

## Overview

<Info>
This section covers ${title.toLowerCase()} requirements for the AWO Platform across SADC markets.
</Info>

## Regulatory Requirements

Compliance requirements will be documented here.

## Implementation

<Steps>
  <Step title="Assessment">
    Assess compliance requirements
  </Step>
  <Step title="Implementation">
    Implement compliance measures
  </Step>
  <Step title="Monitoring">
    Monitor ongoing compliance
  </Step>
</Steps>

## Documentation

Required documentation and record-keeping will be covered here.

## Audit Procedures

<Card title="Audit Checklist" href="/compliance/audit-procedures">
  Complete audit procedures and checklists
</Card>
`,

  'resources': (title) => `---
title: "${title}"
description: "AWO Platform ${title.toLowerCase()} resources and references"
---

# ${title}

## Overview

<Info>
This section provides ${title.toLowerCase()} for AWO Platform development and integration.
</Info>

## Available Resources

Resource details will be documented here.

## Download Links

Download links and access information will be provided here.

## Usage Examples

<CodeGroup>
\`\`\`bash Terminal
# Example usage
curl -O "https://resources.awo-platform.com/${title.toLowerCase().replace(/\s+/g, '-')}"
\`\`\`

\`\`\`typescript TypeScript
// Integration example
import resource from './${title.toLowerCase().replace(/\s+/g, '-')}';
\`\`\`
</CodeGroup>

## Related Resources

<CardGroup cols={2}>
  <Card title="API Reference" href="/api-reference/introduction">
    Complete API documentation
  </Card>
  <Card title="Code Samples" href="/resources/code-samples">
    Implementation examples
  </Card>
</CardGroup>
`
};

// Helper functions
function getFileType(filePath) {
  const segments = filePath.split('/');
  const section = segments[0];
  
  // Map sections to template types
  const sectionMap = {
    'platform-overview': 'getting-started',
    'target-users': 'getting-started',
    'key-features': 'getting-started',
    'market-context': 'getting-started',
    'quick-setup': 'quick-setup',
    'architecture': 'architecture',
    'data-models': 'data-models',
    'core-features': 'core-features',
    'advanced-features': 'advanced-features',
    'development': 'development',
    'testing': 'testing',
    'api-reference': 'api-reference',
    'integration': 'integration',
    'security': 'security',
    'security-practices': 'security',
    'deployment': 'deployment',
    'infrastructure': 'infrastructure',
    'guides': 'guides',
    'business': 'business',
    'compliance': 'compliance',
    'resources': 'resources'
  };
  
  return sectionMap[section] || 'guides';
}

function generateTitle(filePath) {
  const filename = path.basename(filePath);
  return filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function ensureDirectory(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${path.relative(process.cwd(), dirPath)}`);
  }
}

async function createFile(filePath) {
  const fullPath = `${filePath}.mdx`;
  const dirPath = path.dirname(fullPath);
  
  // Skip if file already exists
  if (existsSync(fullPath)) {
    console.log(`⏭️  Skipped: ${fullPath} (already exists)`);
    return false;
  }
  
  // Create directory if needed
  ensureDirectory(dirPath);
  
  // Generate content
  const fileType = getFileType(filePath);
  const title = generateTitle(filePath);
  const content = templates[fileType](title);
  
  // Write file
  await fs.writeFile(fullPath, content, 'utf8');
  console.log(`✅ Created: ${fullPath}`);
  return true;
}

// Main execution
async function main() {
  console.log('🚀 AWO Complete Missing Files Generator');
  console.log(`📄 Creating ${missingFiles.length} missing files...\n`);
  
  let created = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const filePath of missingFiles) {
    try {
      const wasCreated = await createFile(filePath);
      if (wasCreated) {
        created++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`❌ Error creating ${filePath}:`, error.message);
      errors++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Files created: ${created}`);
  console.log(`⏭️  Files skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📝 Total files: ${missingFiles.length}`);
  
  if (created > 0) {
    console.log('\n🎉 Files created successfully!');
    console.log('💡 Next steps:');
    console.log('   1. Run: mintlify dev');
    console.log('   2. Replace placeholder content with actual documentation');
    console.log('   3. Follow Mintlify best practices (no < > in tables, cols={2})');
    console.log('   4. Test your documentation build');
  }
  
  if (errors > 0) {
    console.log('\n⚠️  Some files failed to create. Check the error messages above.');
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🚀 AWO Complete Missing Files Generator

Creates ALL missing MDX files for the AWO Platform documentation.

Usage:
  node generate-all-missing-files.js

Features:
  - Creates 140+ missing files from docs.json validation
  - AWO-specific content templates
  - Proper Mintlify MDX structure
  - Section-specific templates (API, guides, business, etc.)
  - Follows all Mintlify best practices
  - Creates proper directory structure
  - Skips existing files

Templates include:
  ✅ Getting Started pages
  ✅ Quick Setup guides  
  ✅ Architecture documentation
  ✅ Data model schemas
  ✅ Core & Advanced features
  ✅ Development guides
  ✅ Testing strategies
  ✅ Complete API reference
  ✅ Integration guides
  ✅ Security documentation
  ✅ Deployment guides
  ✅ Infrastructure docs
  ✅ Implementation guides
  ✅ Business documentation
  ✅ Compliance requirements
  ✅ Resource references

Output:
  All missing files will be created with appropriate AWO Platform content.
  `);
  process.exit(0);
}

// Dry run option
if (process.argv.includes('--dry-run')) {
  console.log('🔍 Dry run - Files that would be created:');
  missingFiles.forEach((file, index) => {
    const type = getFileType(file);
    console.log(`${index + 1}. ${file}.mdx (${type})`);
  });
  console.log(`\nTotal: ${missingFiles.length} files`);
  process.exit(0);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { createFile, generateTitle, getFileType };