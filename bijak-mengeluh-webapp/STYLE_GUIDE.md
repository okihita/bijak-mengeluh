# Bijak Mengeluh - Unified Style Guide

**Version:** 1.0  
**Last Updated:** Nov 14, 2025

This document defines the unified coding style, naming conventions, and architectural patterns for both frontend and backend repositories.

---

## Project Naming

### Repository Names
- **Frontend:** `bijak-mengeluh-frontend` (currently: aic-complaint-app)
- **Backend:** `bijak-mengeluh-backend` (currently: bijak-mengeluh-ai-backend)

### Consistent Terminology

| Concept | Unified Term | Frontend | Backend |
|---------|--------------|----------|---------|
| User input | `complaint` | complaint | prompt |
| AI output | `generatedComplaint` | generated_text | generated_text |
| Government agency | `ministry` | contact | ministry |
| Confidence level | `matchScore` | score | score |
| Social media | `socialHandle` | handle | handle |
| Explanation | `rationale` | rationale | rationale |

---

## Naming Conventions

### Frontend (TypeScript/React)

#### Files
- **Components:** PascalCase - `ComplaintForm.tsx`
- **Pages:** kebab-case - `complaint-history.tsx`
- **Utilities:** camelCase - `complaintScorer.ts`
- **Types:** PascalCase - `ComplaintTypes.ts`

#### Code
- **Components:** PascalCase - `ComplaintForm`
- **Functions:** camelCase - `generateComplaint()`
- **Variables:** camelCase - `userComplaint`
- **Constants:** UPPER_SNAKE_CASE - `MAX_COMPLAINT_LENGTH`
- **Types/Interfaces:** PascalCase - `ComplaintData`
- **Props:** PascalCase with Props suffix - `ComplaintFormProps`

#### API Naming
```typescript
// Request
{
  complaint: string,
  tone: "formal" | "funny" | "angry"
}

// Response
{
  generatedComplaint: string,
  suggestedMinistries: Ministry[],
  rationale: string,
  socialHandle: SocialHandleInfo
}
```

### Backend (Python)

#### Files
- **Handlers:** snake_case - `complaint_handler.py`
- **Services:** snake_case - `complaint_service.py`
- **Models:** snake_case - `complaint_model.py`
- **Config:** snake_case - `complaint_config.py`

#### Code
- **Functions:** snake_case - `generate_complaint()`
- **Variables:** snake_case - `user_complaint`
- **Constants:** UPPER_SNAKE_CASE - `MAX_COMPLAINT_LENGTH`
- **Classes:** PascalCase - `ComplaintService`
- **Private methods:** _snake_case - `_validate_complaint()`

#### API Naming
```python
# Request
{
    "complaint": str,
    "tone": str  # "formal" | "funny" | "angry"
}

# Response
{
    "generated_complaint": str,
    "suggested_ministries": List[Ministry],
    "rationale": str,
    "social_handle": SocialHandleInfo
}
```

---

## Directory Structure

### Frontend
```
bijak-mengeluh-frontend/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── complaint/          # Complaint pages
│   │   └── history/            # History pages
│   ├── components/
│   │   ├── complaint/          # Complaint-specific components
│   │   ├── ministry/           # Ministry-related components
│   │   └── ui/                 # Generic UI components
│   ├── lib/
│   │   ├── api/                # API client
│   │   ├── complaint/          # Complaint utilities
│   │   └── utils/              # Generic utilities
│   └── types/
│       └── complaint.ts        # Complaint-related types
└── docs/                       # Documentation
```

### Backend
```
bijak-mengeluh-backend/
├── src/
│   ├── handlers/               # Lambda handlers
│   │   └── complaint_handler.py
│   ├── services/               # Business logic
│   │   ├── complaint_service.py
│   │   ├── ministry_service.py
│   │   └── social_service.py
│   ├── models/                 # Data models
│   │   └── complaint_model.py
│   ├── config/                 # Configuration
│   │   ├── complaint_prompts.py
│   │   └── settings.py
│   └── utils/                  # Utilities
└── docs/                       # Documentation
```

---

## Code Style

### Frontend (TypeScript)

#### Component Structure
```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types
type ComplaintFormProps = {
  onSubmit: (complaint: string) => void;
  isLoading: boolean;
};

// 3. Component
export function ComplaintForm({ onSubmit, isLoading }: ComplaintFormProps) {
  // 3.1 State
  const [complaint, setComplaint] = useState("");
  
  // 3.2 Handlers
  const handleSubmit = () => {
    onSubmit(complaint);
  };
  
  // 3.3 Render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}
```

#### Function Naming
```typescript
// Event handlers: handle + Action
const handleSubmit = () => {};
const handleComplaintChange = () => {};

// Utilities: verb + Noun
const validateComplaint = () => {};
const formatMinistry = () => {};

// Getters: get + Noun
const getComplaintScore = () => {};
const getMinistryName = () => {};
```

### Backend (Python)

#### Function Structure
```python
def process_complaint(complaint: str, tone: str) -> ComplaintResult:
    """
    Process a user complaint and generate response.
    
    Args:
        complaint: The user's complaint text
        tone: The tone of the response (formal/funny/angry)
        
    Returns:
        ComplaintResult with generated text and ministries
    """
    # 1. Validate input
    if not complaint:
        raise ValueError("Complaint cannot be empty")
    
    # 2. Process
    result = _generate_complaint_text(complaint, tone)
    
    # 3. Return
    return result
```

#### Function Naming
```python
# Public functions: verb_noun
def generate_complaint(text: str) -> str:
    pass

def find_ministries(embedding: List[float]) -> List[Ministry]:
    pass

# Private functions: _verb_noun
def _validate_input(text: str) -> bool:
    pass

def _format_response(data: dict) -> dict:
    pass
```

---

## API Contract

### Endpoint Naming
```
POST /api/complaint/generate
POST /api/complaint/analyze
GET  /api/ministry/{id}
GET  /api/ministry/search
```

### Request/Response Format

#### Generate Complaint
```json
// Request
{
  "complaint": "string (min 20 chars)",
  "tone": "formal" | "funny" | "angry",
  "metadata": {
    "userId": "string (optional)",
    "timestamp": "ISO 8601"
  }
}

// Response
{
  "success": true,
  "data": {
    "generatedComplaint": "string",
    "suggestedMinistries": [
      {
        "id": "string",
        "name": "string",
        "matchScore": 0.95,
        "description": "string"
      }
    ],
    "rationale": "string",
    "socialHandle": {
      "platform": "twitter",
      "handle": "@ministry",
      "verified": true
    }
  },
  "metadata": {
    "processingTime": 4.2,
    "modelVersion": "1.0"
  }
}
```

---

## Error Handling

### Frontend
```typescript
// Error types
type ComplaintError = {
  code: string;
  message: string;
  details?: unknown;
};

// Error handling
try {
  await generateComplaint(text);
} catch (error) {
  if (error instanceof ComplaintError) {
    showError(error.message);
  }
}
```

### Backend
```python
# Error classes
class ComplaintError(Exception):
    """Base exception for complaint processing"""
    pass

class InvalidComplaintError(ComplaintError):
    """Raised when complaint is invalid"""
    pass

# Error handling
try:
    result = generate_complaint(text)
except InvalidComplaintError as e:
    logger.error(f"Invalid complaint: {e}")
    return error_response("INVALID_COMPLAINT", str(e))
```

---

## Logging

### Frontend
```typescript
// Use consistent log format
console.log("[Complaint] Generating complaint...");
console.error("[Complaint] Failed to generate:", error);
console.info("[Ministry] Found 3 matches");
```

### Backend
```python
# Use structured logging
logger.info("Generating complaint", extra={
    "complaint_length": len(text),
    "tone": tone
})

logger.error("Failed to generate complaint", extra={
    "error": str(e),
    "complaint_id": complaint_id
})
```

---

## Comments & Documentation

### Frontend
```typescript
/**
 * Generates a formal complaint from user input
 * 
 * @param complaint - The user's complaint text
 * @param tone - The desired tone (formal/funny/angry)
 * @returns Promise with generated complaint
 * 
 * @example
 * const result = await generateComplaint("Road is broken", "formal");
 */
export async function generateComplaint(
  complaint: string,
  tone: Tone
): Promise<ComplaintResult> {
  // Implementation
}
```

### Backend
```python
def generate_complaint(complaint: str, tone: str) -> str:
    """
    Generate a formal complaint from user input.
    
    Args:
        complaint: The user's complaint text
        tone: The desired tone (formal/funny/angry)
        
    Returns:
        Generated complaint text
        
    Raises:
        InvalidComplaintError: If complaint is too short
        
    Example:
        >>> generate_complaint("Road is broken", "formal")
        "Mohon perhatiannya untuk jalan yang rusak..."
    """
    pass
```

---

## Testing

### Frontend
```typescript
// Test file: ComplaintForm.test.tsx
describe("ComplaintForm", () => {
  it("should validate complaint length", () => {
    // Test
  });
  
  it("should submit complaint with correct tone", () => {
    // Test
  });
});
```

### Backend
```python
# Test file: test_complaint_handler.py
class TestComplaintHandler:
    def test_validate_complaint_length(self):
        """Test complaint length validation"""
        pass
    
    def test_generate_with_tone(self):
        """Test complaint generation with different tones"""
        pass
```

---

## Git Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

### Examples
```
feat(complaint): add tone selector for complaint generation

- Add formal, funny, and angry tone options
- Update API to accept tone parameter
- Add tone-specific prompts in backend

Closes #123

---

fix(ministry): fix overflow in ministry name display

- Add line-clamp-2 to ministry names
- Add tooltip for full name on hover
- Improve card layout for long names
```

---

## Environment Variables

### Naming Convention
```bash
# Format: BIJAKMENGELUH_<COMPONENT>_<NAME>

# Frontend
BIJAKMENGELUH_API_URL=https://brain.bijakmengeluh.id
BIJAKMENGELUH_API_TIMEOUT=30000

# Backend
BIJAKMENGELUH_BEDROCK_MODEL=claude-3-haiku
BIJAKMENGELUH_PINECONE_INDEX=ministries
```

---

## Constants

### Frontend
```typescript
// src/lib/complaint/constants.ts
export const COMPLAINT_CONFIG = {
  MIN_LENGTH: 20,
  MAX_LENGTH: 1000,
  TONES: ["formal", "funny", "angry"] as const,
  DEFAULT_TONE: "formal" as const,
} as const;
```

### Backend
```python
# src/config/complaint_config.py
COMPLAINT_CONFIG = {
    "MIN_LENGTH": 20,
    "MAX_LENGTH": 1000,
    "TONES": ["formal", "funny", "angry"],
    "DEFAULT_TONE": "formal",
}
```

---

## Documentation

### README Structure (Both Repos)
```markdown
# Bijak Mengeluh [Frontend/Backend]

## Overview
Brief description

## Features
- Feature 1
- Feature 2

## Getting Started
Installation and setup

## Architecture
High-level architecture

## API Documentation
API endpoints and contracts

## Development
Development workflow

## Deployment
Deployment instructions

## Contributing
Contribution guidelines
```

---

## Checklist for New Features

### Frontend
- [ ] Follow TypeScript naming conventions
- [ ] Add proper types/interfaces
- [ ] Include error handling
- [ ] Add loading states
- [ ] Test on mobile
- [ ] Check accessibility
- [ ] Update documentation

### Backend
- [ ] Follow Python naming conventions
- [ ] Add type hints
- [ ] Include error handling
- [ ] Add logging
- [ ] Write tests
- [ ] Update API docs
- [ ] Update documentation

---

## Version Control

### Branch Naming
```
feature/complaint-tone-selector
fix/ministry-name-overflow
docs/update-api-documentation
refactor/complaint-service
```

### Tag Naming
```
v1.0.0-frontend
v1.0.0-backend
```

---

## Enforcement

### Frontend
- ESLint configuration
- Prettier for formatting
- TypeScript strict mode
- Pre-commit hooks

### Backend
- Pylint/Flake8 for linting
- Black for formatting
- Type checking with mypy
- Pre-commit hooks

---

**Maintained by:** Development Team  
**Review Cycle:** Quarterly  
**Next Review:** Feb 2026
