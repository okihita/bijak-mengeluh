# Test Suite Documentation

## Overview

Comprehensive test suite covering component functionality and UX compliance based on industry standards (Microsoft HAI Guidelines, Nielsen Heuristics, WCAG 2.1).

## Structure

```
__tests__/
├── components/          # Component unit tests
│   ├── header.test.tsx
│   ├── complaint-form.test.tsx
│   ├── generated-complaint.test.tsx
│   └── bottom-navigation.test.tsx
├── ux-compliance/       # UX guideline compliance tests
│   ├── accessibility.test.tsx
│   ├── user-control.test.tsx
│   ├── error-recovery.test.tsx
│   ├── explainability.test.tsx
│   ├── context-memory.test.tsx
│   └── feedback.test.tsx
├── integration/         # End-to-end flow tests
│   └── user-flow.test.tsx
└── README.md           # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode (for development)
npm run test:watch

# Coverage report
npm run test:coverage

# Run specific test file
npm test -- header.test.tsx

# Run specific test suite
npm test -- --testNamePattern="Accessibility"
```

## Test Categories

### 1. Component Tests (30 tests)
Unit tests for individual React components.

**Coverage:**
- Rendering behavior
- Props handling
- User interactions
- State management

### 2. UX Compliance Tests (32 tests)
Tests ensuring adherence to UX guidelines.

**Coverage:**
- Accessibility (WCAG 2.1 AA)
- User control and freedom
- Error recovery
- AI explainability
- Context persistence
- Feedback mechanisms

### 3. Integration Tests (3 tests)
End-to-end user flow tests.

**Coverage:**
- Happy path flows
- Error handling flows
- Keyboard-only navigation

## Writing New Tests

### Best Practices

1. **Use descriptive test names**
   ```typescript
   it('shows error message in Indonesian when network fails', () => {
     // test code
   });
   ```

2. **Follow AAA pattern** (Arrange, Act, Assert)
   ```typescript
   it('calls handler when button clicked', async () => {
     // Arrange
     const mockHandler = jest.fn();
     render(<Component onSubmit={mockHandler} />);
     
     // Act
     await user.click(screen.getByRole('button'));
     
     // Assert
     expect(mockHandler).toHaveBeenCalled();
   });
   ```

3. **Test user behavior, not implementation**
   ```typescript
   // ✅ Good - tests what user sees
   expect(screen.getByText('Success!')).toBeInTheDocument();
   
   // ❌ Bad - tests implementation detail
   expect(component.state.isSuccess).toBe(true);
   ```

4. **Use accessible queries**
   ```typescript
   // ✅ Preferred
   screen.getByRole('button', { name: 'Submit' })
   screen.getByLabelText('Email')
   
   // ⚠️ Use sparingly
   screen.getByTestId('submit-button')
   ```

5. **Mock external dependencies**
   ```typescript
   jest.mock('next/navigation', () => ({
     usePathname: () => '/',
   }));
   ```

### UX Compliance Checklist

When adding new features, ensure tests cover:

- [ ] Keyboard navigation works
- [ ] ARIA labels are present
- [ ] Error messages are in Indonesian
- [ ] User can undo/cancel actions
- [ ] Loading states are visible
- [ ] Feedback is acknowledged
- [ ] Context is preserved

## Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Statements | >80% | ~40% |
| Branches | >70% | ~40% |
| Functions | >80% | ~35% |
| Lines | >80% | ~40% |

## Continuous Improvement

### Adding Tests
1. Write test first (TDD)
2. Implement feature
3. Ensure test passes
4. Refactor if needed

### Maintaining Tests
1. Update tests when requirements change
2. Remove obsolete tests
3. Keep tests fast (<2s total)
4. Fix flaky tests immediately

## Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Microsoft HAI Guidelines](https://www.microsoft.com/en-us/haxtoolkit/)

## Troubleshooting

### Common Issues

**Tests timeout:**
```typescript
// Increase timeout for slow operations
it('loads data', async () => {
  // ...
}, 10000); // 10 second timeout
```

**Mock not working:**
```typescript
// Ensure mock is before imports
jest.mock('./module');
import { Component } from './component';
```

**Async issues:**
```typescript
// Use waitFor for async updates
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

---

**Maintained by:** Development Team  
**Last Updated:** 2025-01-15
