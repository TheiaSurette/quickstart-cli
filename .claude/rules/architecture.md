# CLI Architecture

## Overview

This is the **AI QuickStart CLI** - generates production-ready full-stack AI applications. Built with TypeScript + Ink (React for terminals).

## Directory Structure

```
src/
├── commands/              # CLI command definitions (create.tsx, registry.ts)
├── components/            # Ink React UI components (App, ProjectSetupForm, etc.)
├── generators/            # Code generation system
│   ├── index.ts           # Main ProjectGenerator orchestrator
│   ├── versions.ts        # Dependency version pinning
│   ├── utils/             # Name normalization, package manager detection
│   └── packages/          # Per-package generators
│       ├── core/          # Root configs (package.json, turbo.json, Makefile)
│       ├── config/        # Shared ESLint, Prettier, Ruff configs
│       ├── ui/            # React + Vite generator
│       ├── api/           # FastAPI generator
│       ├── db/            # PostgreSQL + SQLAlchemy generator
│       ├── helm/          # Kubernetes Helm charts
│       └── agents/        # AI agent rules (.claude/, .cursor/)
├── types/                 # TypeScript interfaces (ProjectConfig, features)
├── utils/                 # General utilities
└── __tests__/             # Test suites (unit, integration, e2e)
```

## Key Patterns

### Template Functions (Not External Files)
Templates are TypeScript functions that return strings. This gives type safety, IDE support, and conditional logic.

```typescript
// Located in generators/packages/*/templates/
export function generateMainPy(config: ProjectConfig): string {
  return `
from fastapi import FastAPI
${config.features.db ? 'from .database import init_db' : ''}
...
  `.trim();
}
```

### Modular Generators
Each package type has a generator class:

```typescript
export class UIPackageGenerator {
  constructor(private config: ProjectConfig, private outputDir: string) {}
  async generate(): Promise<void> { ... }
}
```

### Async Generator for Progress
Main orchestrator yields progress steps:

```typescript
async* generateProject(): AsyncGenerator<GenerationStep> {
  yield { step: 'ui', message: 'Setting up React frontend...' };
  await new UIPackageGenerator(config, dir).generate();
}
```

## Path Aliases

Use these in imports:
- `@/components/*` → `src/components/`
- `@/generators/*` → `src/generators/`
- `@/types/*` → `src/types/`
- `@/utils/*` → `src/utils/`
- `@/commands/*` → `src/commands/`
