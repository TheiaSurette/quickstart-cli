# Extending the CLI

## Adding a New Package Generator

### 1. Create Directory Structure

```
src/generators/packages/mypackage/
├── generator.ts          # Main generator class
└── templates/
    ├── index.ts          # Export all templates
    └── config.ts         # Template functions
```

### 2. Create Template Functions

```typescript
// templates/config.ts
import { ProjectConfig } from '@/types/features.js';

export function generatePackageJson(config: ProjectConfig): string {
  return JSON.stringify({
    name: `@${config.name}/mypackage`,
    version: '0.0.0',
    // ...
  }, null, 2);
}
```

### 3. Create Generator Class

```typescript
// generator.ts
import * as fs from 'fs-extra';
import * as path from 'path';
import { ProjectConfig } from '@/types/features.js';
import { generatePackageJson } from './templates/index.js';

export class MyPackageGenerator {
  private packageDir: string;

  constructor(
    private config: ProjectConfig,
    outputDir: string
  ) {
    this.packageDir = path.join(outputDir, 'packages', 'mypackage');
  }

  async generate(): Promise<void> {
    await fs.outputFile(
      path.join(this.packageDir, 'package.json'),
      generatePackageJson(this.config)
    );
  }
}
```

### 4. Register in Main Generator

Update `src/generators/index.ts` to call your generator:

```typescript
if (this.config.features.mypackage) {
  yield { step: 'mypackage', message: 'Setting up mypackage...' };
  await new MyPackageGenerator(this.config, this.outputDir).generate();
}
```

### 5. Update Types

Add feature flag to `src/types/features.ts`:

```typescript
interface ProjectFeatures {
  ui: boolean;
  api: boolean;
  db: boolean;
  mypackage: boolean;  // Add this
}
```

### 6. Add Tests

Create `src/__tests__/generators/mypackage.test.ts` with unit tests for templates.
