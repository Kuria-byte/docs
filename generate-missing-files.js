#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

// ============================================================================
// SIMPLE MISSING FILES GENERATOR - MINIMAL BOILERPLATE
// ============================================================================

// Missing files from your paste.txt
const missingFiles = [
  'api-reference/chamas/details',
  'api-reference/chamas/contribute', 
  'api-reference/chamas/members',
  'api-reference/savings/create-goal',
  'api-reference/savings/update-goal',
  'api-reference/savings/progress',
  'api-reference/payments/initiate',
  'api-reference/payments/status',
  'api-reference/payments/history',
  'api-reference/webhooks/overview',
  'api-reference/webhooks/events',
  'api-reference/webhooks/verification',
  'guides/chama-management',
  'guides/bank-integration',
  'guides/payment-processing',
  'guides/mobile-app-setup',
  'guides/web-app-setup',
  'guides/testing-strategies',
  'guides/deployment',
  'guides/monitoring',
  'guides/troubleshooting',
  'guides/best-practices',
  'sdks/overview',
  'sdks/javascript/installation',
  'sdks/javascript/quickstart',
  'sdks/javascript/api-reference',
  'sdks/react-native/installation',
  'sdks/react-native/quickstart',
  'sdks/react-native/components',
  'sdks/python/installation',
  'sdks/python/quickstart',
  'sdks/python/api-reference',
  'resources/examples',
  'resources/postman-collection',
  'resources/openapi-spec',
  'resources/status-codes',
  'resources/rate-limits',
  'resources/webhooks-reference',
  'resources/glossary',
  'resources/changelog'
];

// Simple templates
const templates = {
  api: (title) => `---
title: "${title}"
description: "${title} endpoint documentation"
---

# ${title}

## Overview

This endpoint documentation is coming soon.

<Info>
This page is under development. Please check back later for complete documentation.
</Info>

## Authentication

This endpoint requires authentication.

\`\`\`bash
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`

## Request

\`\`\`bash
curl -X GET "https://api.awo-platform.com/v1/endpoint" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

## Response

\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`
`,

  guide: (title) => `---
title: "${title}"
description: "${title} implementation guide"
---

# ${title}

## Overview

This guide documentation is coming soon.

<Info>
This page is under development. Please check back later for complete implementation guide.
</Info>

## Getting Started

Step-by-step instructions will be added here.

## Examples

Code examples and best practices will be provided.

## Next Steps

<Card title="Related Documentation" href="/api-reference/introduction">
  Explore other sections of our documentation
</Card>
`,

  sdk: (title) => `---
title: "${title}"
description: "${title} SDK documentation"
---

# ${title}

## Overview

SDK documentation is coming soon.

<Info>
This page is under development. Please check back later for complete SDK documentation.
</Info>

## Installation

Installation instructions will be added here.

## Quick Start

\`\`\`bash
# Installation command
npm install @awo-platform/sdk
\`\`\`

## Examples

Code examples will be provided.
`,

  resource: (title) => `---
title: "${title}"
description: "${title} reference documentation"
---

# ${title}

## Overview

This resource documentation is coming soon.

<Info>
This page is under development. Please check back later for complete reference material.
</Info>

## Content

Reference content will be added here.

## Related Resources

Additional resources and links will be provided.
`
};

// Helper functions
function getFileType(filePath) {
  if (filePath.startsWith('api-reference/')) return 'api';
  if (filePath.startsWith('guides/')) return 'guide';
  if (filePath.startsWith('sdks/')) return 'sdk';
  if (filePath.startsWith('resources/')) return 'resource';
  return 'guide'; // default
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
  console.log('🚀 AWO Missing Files Generator');
  console.log(`📄 Creating ${missingFiles.length} missing files...\n`);
  
  let created = 0;
  let skipped = 0;
  
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
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Files created: ${created}`);
  console.log(`⏭️  Files skipped: ${skipped}`);
  console.log(`📝 Total files: ${missingFiles.length}`);
  
  if (created > 0) {
    console.log('\n🎉 Files created successfully!');
    console.log('💡 Next steps:');
    console.log('   1. Run: mintlify dev');
    console.log('   2. Replace placeholder content with actual documentation');
    console.log('   3. Test your documentation build');
  }
}

// Handle arguments
if (process.argv.includes('--help')) {
  console.log(`
🚀 AWO Missing Files Generator

Creates all missing MDX files with minimal boilerplate content.

Usage:
  node generate-missing-files.js

Features:
  - Creates all 40+ missing files from docs.json
  - Minimal boilerplate content
  - Proper directory structure
  - Skips existing files
  - Ready for customization

Output:
  All missing files will be created in the current directory.
  `);
  process.exit(0);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}