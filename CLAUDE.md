# Claude Code Guidelines

## Quick Reference

**Project**: CLI that generates full-stack AI applications (TypeScript + Ink)

**Validation commands** (never run dev servers):
```bash
pnpm test          # Run tests
pnpm build         # Type check
```

## Architecture

- `src/generators/packages/` - Modular code generators (ui, api, db, helm, agents)
- `src/components/` - Ink React CLI components
- `src/commands/` - CLI command definitions
- Template functions return strings, no external template files

## Key Patterns

- TypeScript strict mode, no `any`
- Path aliases: `@/generators/*`, `@/components/*`, `@/types/*`
- Use `fs.outputFile` + `path.join` for file operations
- Three-tier testing: unit → integration → e2e

## Rules

See `.cursor/rules/` for detailed guides on architecture, templates, and testing.
