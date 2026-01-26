# Agent Guidelines

## Project Overview

CLI tool that generates production-ready, full-stack AI applications. Built with TypeScript + Ink (React for terminals).

## Tech Stack

- **Runtime**: Node.js 18+, TypeScript 5.9 (strict mode)
- **CLI Framework**: Ink (React-based terminal UI)
- **Validation**: Zod
- **Testing**: Vitest
- **Build**: tsc (outputs to `lib/`)

## Architecture

```
src/
├── commands/           # CLI command definitions
├── components/         # Ink React UI components
├── generators/         # Code generation system
│   ├── packages/       # Per-package generators (ui/, api/, db/, etc.)
│   └── versions.ts     # Dependency version pinning
├── types/              # TypeScript interfaces
└── __tests__/          # Unit, integration, e2e tests
```

### Key Patterns

- **Template functions**: TypeScript functions returning strings (not external template files)
- **Modular generators**: Each package has a `Generator` class with `generate(): Promise<void>`
- **Path aliases**: `@/components/*`, `@/generators/*`, `@/types/*`, `@/utils/*`, `@/commands/*`
- **Async generators**: Main orchestrator yields progress steps

## Commands

**Never run dev servers or production builds.** Assume a dev server is running. Use these for validation:

```bash
pnpm test              # Run unit tests
pnpm test:watch        # Watch mode
pnpm build             # Type check via tsc (outputs to lib/)
```

## Testing Strategy

Three-tier approach:
1. **Unit** (`src/__tests__/`): Template function validation
2. **Integration** (`src/__tests__/integration/`): Full generator tests with temp directories
3. **E2E** (`src/__tests__/e2e/`): CLI execution with real toolchains

Test helpers in `src/__tests__/utils/test-helpers.ts`.

## Conventions

- TypeScript strict mode, no `any` types
- Use `fs.outputFile` (creates directories) not `fs.writeFile`
- Use `path.join` for all paths
- Conventional commits for git messages
- Keep template functions type-safe with `ProjectConfig`

## Detailed Rules

See `.cursor/rules/` for comprehensive guides on specific topics:
- `cli-architecture.mdc` - Full architecture details
- `template-generation.mdc` - Template patterns
- `testing-standards.mdc` - Testing patterns
- `typescript-standards.mdc` - Code style
