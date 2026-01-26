import { AgentTemplateParams } from '../generator.js';

export const generateClaudeMd = (params: AgentTemplateParams): string => {
  const { config, features } = params;

  const validationCommands = ['make lint', 'make test', 'pnpm type-check'];

  const packageDesc = [];
  if (features.ui) packageDesc.push('React frontend');
  if (features.api) packageDesc.push('FastAPI backend');
  if (features.db) packageDesc.push('PostgreSQL database');

  return `# Claude Code Guidelines

## Quick Reference

**Project**: ${config.name} - Turborepo monorepo with ${packageDesc.join(', ')}

**Validation commands** (never run dev servers):
\`\`\`bash
${validationCommands.join('\n')}
\`\`\`

## Architecture

- \`packages/\` - Monorepo packages${features.ui ? ' (ui, ' : ' ('}${features.api ? 'api, ' : ''}${features.db ? 'db, ' : ''}configs)
- \`deploy/helm/\` - Kubernetes deployment
- \`compose.yml\` - Local dev containers
- \`Makefile\` - Common commands

## Key Patterns

${features.ui ? '- **Frontend**: React 19 + Vite + TanStack Router/Query + Tailwind\n' : ''}${features.api ? '- **Backend**: FastAPI + Pydantic v2 + async/await\n' : ''}${features.db ? '- **Database**: SQLAlchemy 2.0 async + Alembic migrations\n' : ''}- **Commits**: Conventional commits (feat:, fix:, etc.)

## Rules

See \`.claude/rules/\` for detailed guides on architecture, API, UI, database, and testing.
`;
};
