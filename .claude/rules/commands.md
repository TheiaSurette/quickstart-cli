# Commands & Scripts

## Important: No Dev Servers

**Never run dev servers or production builds.** Assume a dev server is already running. Only use validation commands.

## Validation Commands

```bash
pnpm test              # Run unit tests (Vitest)
pnpm test:watch        # Watch mode for development
pnpm test:coverage     # Coverage report
pnpm build             # Type check via tsc → lib/
```

## Development Mode

For manual testing during development:
```bash
pnpm dev               # Run CLI with ts-node (interactive mode)
```

## CLI Flags (for testing)

```bash
# Non-interactive mode with feature flags
pnpm dev create my-app --skip-prompts --all-features
pnpm dev create my-app --api-only
pnpm dev create my-app --ui-only
```

## Build Output

- `lib/` - Compiled JavaScript (from `pnpm build`)
- Entry point: `lib/quickstart-cli.js`
