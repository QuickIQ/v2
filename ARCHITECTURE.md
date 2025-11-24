# QuickIQ – Clean Architecture

This document defines the **Clean Architecture** for the QuickIQ platform.  
All new code MUST follow these rules.

QuickIQ is a test engine + payment platform, not just a landing page.  
The goal is to keep:

- Business rules independent from frameworks (React, Express, Stripe, Postgres)
- Application logic independent from UI, HTTP and database details
- Code testable, replaceable, and scalable as we add more tests, languages and flows

---

## 1. Layered Architecture

We use a layered “onion-style” architecture.

From inner to outer:

1. **Domain Layer**
2. **Application Layer (Use Cases)**
3. **Infrastructure Layer**
4. **Presentation Layers**
   - Backend presentation: HTTP controllers / routes
   - Frontend presentation: React UI

### 1.1 Dependency Rule

- Outer layers may depend on inner layers.
- Inner layers MUST NOT depend on outer layers.

Concretely:

- **Domain** depends on nobody.
- **Application** depends only on Domain and abstract ports/interfaces.
- **Infrastructure** depends on Application and Domain.
- **Backend presentation (Express)** depends on Application.
- **Frontend (React)** talks to backend via HTTP only, never imports backend code.

No imports are allowed from:

- `infrastructure` → into `domain`
- `express`, `pg`, `stripe`, `axios`, `react` → into `domain` or `application`

---

## 2. Repository Layout

The project is split into two main apps:

- `/frontend` – React 18 + TypeScript + Vite
- `/backend` – Node.js + Express + TypeScript + PostgreSQL

### 2.1 Frontend Structure

`/frontend/src`:

- `app/` or `routes/`
  - Route-level pages (landing, test flow pages, results, etc.)
- `features/`
  - `tests/`
    - `pages/` – test landing, questions, results UIs
    - `components/` – test-specific UI components
    - `api/` – typed clients for `/api/tests/...`
  - `payments/`
    - Pages and hooks for Stripe payment flows
  - `auth/` (optional, if/when added)
- `components/ui/`
  - Reusable, generic UI components (buttons, cards, modals, tooltips, loaders)
- `lib/`
  - `apiClient.ts` – Axios wrapper
  - `i18n/` – i18next setup and language loaders
  - generic helpers
- `config/`
  - frontend configuration and constants
- `styles/`
  - global styles, design tokens (if not handled via Tailwind)

**Frontend rule:**  
No “business logic” beyond what is needed for UI behavior.  
All domain and scoring rules come from backend responses.

---

### 2.2 Backend Structure

`/backend/src`:

- `domain/`
- `application/`
- `infrastructure/`
- `presentation/` (HTTP API via Express)
- `server.ts` (bootstrap)

#### 2.2.1 `domain/`

Pure business logic, no framework imports.

- `entities/`
  - `Test.ts`
  - `Question.ts`
  - `ResultTier.ts`
  - `TestSession.ts`
  - `Translation.ts`
- `value-objects/`
  - `TestSlug.ts`
  - `LanguageCode.ts`
  - `Money.ts`
  - `Score.ts`
- `repositories/` (interfaces only)
  - `ITestRepository.ts`
  - `IQuestionRepository.ts`
  - `IResultRepository.ts`
  - `ITestSessionRepository.ts`
  - `ITranslationRepository.ts`
- `services/`
  - `ScoringService.ts` (orchestrates scoring strategies)
  - `StandardScoringStrategy.ts`
  - `IQScoringStrategy.ts`
  - `PersonalityScoringStrategy.ts`

**Domain rules:**

- No `express`, `pg`, `stripe`, `axios` imports.
- No HTTP, no logging, no request/response objects.
- Only business logic and types.

---

#### 2.2.2 `application/` (Use Cases)

Application layer coordinates use-cases. It knows:

- which repositories to call,
- which domain services/strategies to use,
- what input/output DTOs look like.

Structure:

- `use-cases/`
  - `StartTestUseCase.ts`
  - `GetQuestionsUseCase.ts`
  - `SubmitAnswersUseCase.ts`
  - `CalculateResultUseCase.ts`
  - `CreatePaymentIntentUseCase.ts`
  - `ConfirmPaymentUseCase.ts`
  - `ListTestsUseCase.ts`
- `dto/`
  - request/response DTOs for each use case
- `ports/`
  - `IPaymentProvider.ts` (Stripe adapter implements this)
  - `IEmailService.ts` (optional)
  - `ILogService.ts` (optional)

**Application rules:**

- No Express/HTTP objects.
- No direct database queries.
- No Stripe SDK imports.
- Talks to Domain entities and repositories via interfaces.
- Talks to external systems through ports (interfaces).

Example:

```ts
interface StartTestRequest {
  testSlug: string;
  languageCode: string;
}

interface StartTestResponse {
  testId: string;
  name: string;
  slug: string;
  isPremium: boolean;
}

class StartTestUseCase {
  constructor(
    private readonly tests: ITestRepository,
  ) {}

  async execute(req: StartTestRequest): Promise<StartTestResponse> {
    const test = await this.tests.findBySlug(req.testSlug);
    // domain logic here
    return {
      testId: test.id.value,
      name: test.name,
      slug: test.slug.value,
      isPremium: test.isPremium,
    };
  }
}

2.2.3 infrastructure/
Concrete implementations for ports & repositories.
	•	db/
		•	PostgresTestRepository.ts
		•	PostgresQuestionRepository.ts
		•	PostgresResultRepository.ts
		•	PostgresTestSessionRepository.ts
		•	PostgresTranslationRepository.ts
		•	migrations / SQL helpers
	•	payments/
		•	StripePaymentProvider.ts
	•	logging/
		•	WinstonLogService.ts or similar
	•	config/
		•	env.ts – env var loader & validation
		•	logger.ts – configured logger instance

**Infrastructure rules:**
	•	Can import from domain and application.
	•	Can use pg, stripe, logging libs, etc.
	•	Must not contain business rules-only logic; any such logic belongs in Domain or Application.

---

2.2.4 presentation/ (Backend HTTP)
Express-specific adapters. Thin layer.
	•	routes/
		•	testRoutes.ts
		•	paymentRoutes.ts
		•	translationRoutes.ts
	•	controllers/
		•	TestController.ts
		•	PaymentController.ts
	•	middlewares/
		•	errorHandler.ts
		•	requestLogger.ts
		•	authMiddleware.ts (if/when needed)

**Controller responsibilities:**
	•	Parse HTTP request -> use case request DTO.
	•	Call appropriate use case.
	•	Map use case response DTO -> HTTP response (status + JSON).
	•	Do NOT contain business logic or DB calls.

---

3. Domain Model

### 3.1 Entities

**Test**
	•	id  
	•	slug  
	•	name  
	•	category  
	•	testType: 'standard' | 'iq' | 'personality' | 'custom'  
	•	isPremium  
	•	priceCents  
	•	defaultLanguage  

**Question**
	•	id  
	•	testId  
	•	order  
	•	textKey  
	•	options (structured data, not UI text)  
		•	Standard & IQ: `{ key: string; points: number }[]`  
		•	Personality: includes mapping to dimension via `scoringRule`

**ResultTier**
	•	id  
	•	testId  
	•	minScore  
	•	maxScore  
	•	tier: 'excellent' | 'good' | 'under_development'  
	•	resultTextKey  

**TestSession**
	•	id  
	•	testId  
	•	email (optional if anonymous)  
	•	answers (JSONB)  
	•	rawScore  
	•	iqScore (if applicable)  
	•	resultTierId  
	•	paymentStatus: 'not_required' | 'pending' | 'paid' | 'failed'  
	•	paymentIntentId (if premium)

**Translation**
	•	key  
	•	languageCode  
	•	value  

Entities are plain TypeScript classes or types with behavior where needed.

---

4. Database Schema (Logical View)

Backed by PostgreSQL, connected via `pg` in Infrastructure Layer.

Core tables (logical):
	•	tests  
	•	questions  
	•	results  
	•	translations  
	•	test_sessions  

Repositories map rows ↔ domain entities.

---

5. Test Flow (Logical Architecture)

The standard test flow is:

	1.	Landing Page  
	2.	Social Proof Page  
	3.	Questions Page (20 questions, 5 options each)  
	4.	Email Capture Page  
	5.	Calculating Page (submits answers)  
	6.	Payment Page (if premium) OR Results Page (if free)  
	7.	Results Page (3 variations based on tier)  

Frontend implements the flow using React Router.  
Backend provides data via use-case driven endpoints:

	•	GET /api/tests  
	•	GET /api/tests/:slug  
	•	GET /api/tests/:slug/questions  
	•	POST /api/tests/:slug/submit  
	•	GET /api/tests/sessions/:sessionId/result  

Each endpoint calls the corresponding use case.

---

6. Scoring Logic

Scoring is part of the **Domain Layer**, orchestrated via `ScoringService`.

### 6.1 Standard Tests
	•	Sum of points for selected options.  
	•	Map total to ResultTier by `[min_score, max_score]`.  

### 6.2 IQ Tests

Raw score → IQ score conversion:

percentage = (rawScore / maxPossibleScore) * 100;
iqScore = 70 + (percentage / 100) * 75; // approx range 70–145

### 6.3 Personality Tests (MBTI-style)
	•	Track dimensions: E/I, S/N, T/F, J/P  
	•	Each option maps to a dimension via scoringRule  
	•	Final type = highest dimension in each pair (e.g., INTJ)  

**Rule:**  
New scoring types MUST be implemented as **new strategies** in Domain,  
NOT as if/else chains in controllers.

---

7. Localization Strategy (Clean)

	•	Frontend: i18next JSON files for static UI text.  
	•	Backend: `translations` table for dynamic content (questions, results).  
	•	Domain uses translation keys (`question.1.text`, etc.) — **never raw strings**.  
	•	Application resolves which language’s values to return.  
	•	Infrastructure fetches actual translation values from DB.  

**Adding a new language:**
	1.	Add locale JSON in `frontend/src/i18n/locales/<lang>.json`  
	2.	Insert DB rows into `translations`  
	3.	Register language in i18next + backend config  

---

8. Payment Flow (Clean)

1. Frontend submits answers → **SubmitAnswersUseCase**  
   - Creates `TestSession`  
   - If premium → `paymentStatus = 'pending'`

2. Frontend requests payment → **CreatePaymentIntentUseCase**  
   - Calls `IPaymentProvider` port  
   - Stripe adapter handles actual API call  

3. Stripe returns client secret → frontend collects payment  

4. Stripe webhook → **ConfirmPaymentUseCase**  
   - Updates TestSession → `paid` or `failed`  

5. Frontend checks `/api/payments/status/:sessionId`  

6. If paid or not required → **CalculateResultUseCase** returns final result DTO  

**Domain/Application NEVER import Stripe SDK.**

---

9. Cross-Cutting Concerns

### 9.1 Error Handling

	•	Application layer throws domain/application-specific errors.  
	•	Infrastructure maps to HTTP codes:  
		- 400 validation  
		- 404 not found  
		- 403 permission  
		- 500 unexpected  

### 9.2 Security

	•	Env vars for secrets  
	•	Stripe signature verification  
	•	CORS restricted  
	•	Parameterized SQL queries  
	•	Basic rate limiting for payments & webhooks  

### 9.3 Logging

	•	Structured logger in Infrastructure  
	•	Controllers log request/response (no sensitive data)  
	•	Use-cases may log domain events via `ILogService` port  

### 9.4 Testing Strategy

- **Unit tests**: scoring, use cases  
- **Integration tests**: repositories, Stripe provider  
- **E2E tests**: full test flow + payment flow  

---

10. Adding a New Test (Clean Architecture Style)

1. **Data**
	•	Add row in `tests`  
	•	Add question rows  
	•	Add result tier rows  
	•	Add translation keys  

2. **Domain**
	•	If scoring strategy exists → reuse  
	•	If new logic → create new strategy in `domain/services`  

3. **Application**
	•	If flow same → reuse existing use cases  
	•	If flow custom → new use cases  

4. **Frontend**
	•	Add card on landing  
	•	Use generic test flow pages  
	•	No business logic  

---

11. PR / Change Checklist

Before merging any new code:

	•	Does this respect the dependency rule?  
	•	Business logic inside Domain or Application?  
	•	Repositories defined as interfaces in domain/repositories?  
	•	External integrations via ports?  
	•	Controllers thin and clean?  
	•	No hard-coded text (use i18n keys)?  
	•	Error handling conventions followed?  

If **any** answer = “no”, refactor before merging.

