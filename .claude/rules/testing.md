# Testing Strategy

## Three-Tier Approach

### 1. Unit Tests (`src/__tests__/`)
Fast template function validation.

```typescript
describe('generateMainPy', () => {
  it('should generate valid Python syntax', () => {
    const result = generateMainPy(mockConfig);
    expect(result).toContain('from fastapi import FastAPI');
  });
});
```

### 2. Integration Tests (`src/__tests__/integration/`)
Full generator tests with real file system.

```typescript
describe('UIPackageGenerator', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await createTempDir();
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
  });

  it('generates valid React project', async () => {
    await generator.generate();
    await assertFileExists(path.join(tempDir, 'packages/ui/package.json'));
  });
});
```

### 3. E2E Tests (`src/__tests__/e2e/`)
Full CLI execution with real toolchains.

```typescript
it('generates project that passes all checks', async () => {
  execSync(`node cli.js create test-app --all-features`);
  execSync('pnpm install', { cwd: projectDir });
  execSync('pnpm lint', { cwd: projectDir });
});
```

## Test Helpers

Located in `src/__tests__/utils/test-helpers.ts`:

```typescript
createTempDir()           // Create isolated temp directory
cleanupTempDir(dir)       // Clean up after tests
assertFileExists(path)    // Verify file was generated
assertFileContains(path, strings)  // Check file content
validatePythonSyntax(path)  // Validate Python files
getDefaultTestConfig()    // Standard ProjectConfig for tests
```

## Running Tests

```bash
pnpm test              # All unit tests
pnpm test:watch        # Watch mode
pnpm test -- --grep "UIPackageGenerator"  # Filter tests
```
