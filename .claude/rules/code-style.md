# Code Style & Conventions

## TypeScript

- **Strict mode enabled** - No implicit any, strict null checks
- **Interfaces over types** for object shapes
- **No `any`** - Use `unknown` and narrow, or proper generics
- **Path aliases** - Always use `@/` imports, not relative paths

```typescript
// Good
import { ProjectConfig } from '@/types/features.js';

// Bad
import { ProjectConfig } from '../../../types/features.js';
```

## File Operations

```typescript
// Always use fs.outputFile (creates directories automatically)
await fs.outputFile(filePath, content);

// Always use path.join for cross-platform paths
const file = path.join(packageDir, 'src', 'main.py');

// Don't use fs.writeFile (doesn't create directories)
// Don't concatenate paths with strings
```

## Template Functions

```typescript
export function generateConfig(config: ProjectConfig): string {
  const { name, features } = config;

  return `
# ${name} Configuration
${features.api ? 'API_ENABLED=true' : ''}
  `.trim();
}
```

- Return trimmed strings
- Use template literals with conditional logic
- Accept `ProjectConfig` as parameter
- Export from package's `templates/index.ts`

## Generators

```typescript
export class PackageGenerator {
  constructor(
    private config: ProjectConfig,
    private outputDir: string
  ) {}

  async generate(): Promise<void> {
    const pkgDir = path.join(this.outputDir, 'packages', 'mypackage');
    await fs.outputFile(
      path.join(pkgDir, 'config.json'),
      generateConfig(this.config)
    );
  }
}
```

## Git Commits

Use Conventional Commits:
- `feat:` new features
- `fix:` bug fixes
- `refactor:` code changes that don't add features or fix bugs
- `test:` adding or updating tests
- `docs:` documentation changes
- `chore:` maintenance tasks
