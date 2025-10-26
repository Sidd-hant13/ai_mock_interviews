# PrepWise — AI Mock Interview Platform

PrepWise is an AI-powered mock interview platform that lets you generate tailored interview question sets and practice them through a real-time voice conversation with an AI interviewer. It stores sessions and enables a seamless preparation workflow with authentication, interview generation, and voice practice.

- **Framework**: Next.js App Router (TypeScript)
- **Realtime Voice**: Vapi Web SDK
- **AI Models**: Google Gemini via AI SDK
- **Auth & Database**: Firebase Auth + Firestore (Admin SDK on server, Web SDK on client)
- **UI**: Tailwind CSS v4, shadcn/ui, lucide-react


## Table of Contents
- **Overview**
- **Key Features**
- **Architecture**
- **Tech Stack**
- **Project Structure**
- **Environment Variables**
- **Local Setup**
- **Available Scripts**
- **Core Flows**
- **API Routes**
- **Data Models**
- **Styling & UI**
- **Quality & Tooling**
- **Deployment**
- **Troubleshooting**
- **Roadmap**


## Overview
PrepWise helps candidates get interview-ready using an AI interviewer that asks you questions tailored to your role, experience level, and tech stack. You can:

- **Generate** interview question sets with AI.
- **Practice** them in a voice call with a realistic AI interviewer.
- **View** recent interviews and pick from the latest finalized sets.


## Key Features
- **AI-generated interviews** using Google Gemini via the AI SDK.
- **Voice interview experience** using Vapi’s web SDK, including real-time transcriptions and speaking status.
- **Authentication** with Firebase Auth (client) and session cookies via Firebase Admin.
- **Persistence** of interviews in Firestore with metadata and cover images.
- **Role-based prompts** and configurable question amounts/tech stacks.
- **Modern UI** with Tailwind v4 and shadcn/ui components.


## Architecture
- **App Router** with segmented layouts:
  - `(auth)` segment for auth pages, guarded to redirect authenticated users to `/`.
  - `(root)` segment for the main app, guarded to require authentication.
- **Server Actions** (in `lib/actions`) use Firebase Admin for secure data access and session handling.
- **Client Components** for interactive pieces like the voice `Agent` and forms.
- **API Routes** (under `app/api`) for server-side AI generation and Firestore writes.


## Tech Stack
- **Runtime**: Next.js 15 (App Router), React 19, TypeScript
- **Auth/DB**: Firebase Auth (client), Firebase Admin + Firestore (server)
- **AI**: AI SDK (`ai`) + `@ai-sdk/google` (Gemini)
- **Voice**: `@vapi-ai/web`
- **UI**: Tailwind CSS v4, shadcn/ui, lucide-react, sonner (toasts)
- **Validation**: Zod + @hookform/resolvers + react-hook-form
- **Tooling**: ESLint 9, TypeScript 5


## Project Structure
```
app/
  (auth)/
    layout.tsx          # Redirects authenticated users to '/'
    sign-in/page.tsx    # Sign in page
    sign-up/page.tsx    # Sign up page
  (root)/
    layout.tsx          # Auth-protected layout and nav
    page.tsx            # Dashboard: CTA, Your Interviews, Latest Interviews
    interview/
      page.tsx          # AI flow to generate interview via voice
      [id]/page.tsx     # Take a specific interview (voice)
  api/
    vapi/generate/route.ts  # POST to create interview questions via Gemini and save to Firestore

components/
  Agent.tsx            # Voice interviewer UI + Vapi call state
  AuthForm.tsx         # Sign-in/Sign-up form
  InterviewCard.tsx    # Card UI for interviews
  ui/*                 # shadcn/ui components

firebase/
  admin.ts             # Firebase Admin initialization (server)
  client.ts            # Firebase Web initialization (client)

lib/
  actions/
    auth.action.ts     # signUp, signIn, getCurrentUser, isAuthenticated
    general.action.ts  # interview queries (by user, latest, by id)
  utils.ts             # helpers (e.g., getRandomInterviewCover)
  vapi.sdk.ts          # Vapi SDK wrapper

constants/
  index.ts             # Vapi assistant config, schemas, assets

types/
  *.d.ts               # Shared types (Interview, Vapi, etc.)
```


## Environment Variables
Create `.env.local` with the following keys. Do not commit secrets.

- `NEXT_PUBLIC_VAPI_WEB_TOKEN` — Public token for Vapi Web SDK.
- `GOOGLE_API_KEY` — API key for Google Gemini models used by `@ai-sdk/google`.
- `FIREBASE_PROJECT_ID` — Firebase Admin project ID.
- `FIREBASE_CLIENT_EMAIL` — Firebase Admin client email.
- `FIREBASE_PRIVATE_KEY` — Firebase Admin private key (escape newlines as \n in .env files).

Notes:
- The Firebase client SDK in `firebase/client.ts` uses an inline config for the web app initialization. Ensure the values match your Firebase project.
- Server-side Firebase Admin is used in server actions and API routes. Never expose Admin credentials on the client.


## Local Setup
1) Install dependencies
```bash
npm install
```

2) Configure environment
```bash
cp .env.local.example .env.local  # if you create an example file
# then fill NEXT_PUBLIC_VAPI_WEB_TOKEN, GOOGLE_API_KEY, and Firebase Admin keys
```

3) Run the dev server
```bash
npm run dev
# http://localhost:3000
```


## Available Scripts
- `npm run dev` — Start Next.js dev server (Turbopack).
- `npm run build` — Build for production.
- `npm run start` — Start production server.
- `npm run lint` — Lint with ESLint.


## Core Flows
- **Authentication**
  - Sign up via `AuthForm` creates Firebase Auth user, then `signUp` server action stores profile in Firestore.
  - Sign in via `AuthForm` obtains an ID token, then `signIn` server action sets a session cookie using Firebase Admin.
  - Guards:
    - `(auth)` layout redirects authenticated users to `/`.
    - `(root)` layout redirects unauthenticated users to `/sign-in`.

- **Generate Interview**
  - `app/(root)/interview/page.tsx` shows an `Agent` in `generate` mode.
  - The client speaks with the AI to collect role/level/techstack/amount, then calls `POST /api/vapi/generate`.
  - The API uses Gemini to generate questions and saves an Interview document in Firestore.

- **Take Interview**
  - `app/(root)/interview/[id]/page.tsx` loads a specific interview’s questions and starts a Vapi call with those questions.
  - During the call, transcripts stream into `Agent` state for a live experience.


## API Routes
- `GET /api/vapi/generate` — Health check.
- `POST /api/vapi/generate` — Generate interview questions and persist in Firestore.
  - Body:
    ```json
    {
      "type": "Technical|Behavioural|Mixed",
      "role": "Frontend Developer",
      "level": "Junior|Mid|Senior",
      "techstack": "react,nextjs,typescript",
      "amount": 10,
      "userid": "<firebase-uid>"
    }
    ```
  - Returns: `{ success: boolean }` or error payload.


## Data Models
Interview (Firestore `interviews` collection):
```ts
type Interview = {
  id: string;              // doc id
  userId: string;          // owner
  role: string;            // job role
  type: string;            // Technical | Behavioural | Mixed
  techstack: string[];     // parsed from comma-separated input
  level: string;           // experience level
  questions: string[];     // generated question list
  coverImage?: string;     // random cover from assets
  finalized: boolean;      // true when ready
  createdAt: string;       // ISO timestamp
}
```


## Styling & UI
- **Tailwind CSS v4** with a custom theme and utility classes defined in `app/globals.css`.
- **shadcn/ui** components configured via `components.json`.
- **lucide-react** for icons, **sonner** for toasts.


## Quality & Tooling
- **TypeScript** strict mode enabled.
- **ESLint 9** with Next.js config. Note: `next.config.ts` is configured to ignore ESLint and TS build errors during production builds. Adjust for stricter CI as needed.


## Deployment
- Any Node-compatible host that supports Next.js can deploy this app.
- Common options: **Vercel**, **Netlify**, or a self-hosted Node server.
- Ensure environment variables are set in the host.
- For Vercel/Netlify, define `NEXT_PUBLIC_VAPI_WEB_TOKEN`, `GOOGLE_API_KEY`, `FIREBASE_*` in project settings.


## Troubleshooting
- **401/Redirect loops**: Verify Firebase Admin env vars and session cookie domain/samesite settings. Check `auth.action.ts`.
- **AI generation fails**: Ensure `GOOGLE_API_KEY` is present and the Gemini model name is correct (`gemini-2.0-flash-001`).
- **No audio / voice issues**: Confirm `NEXT_PUBLIC_VAPI_WEB_TOKEN` and browser microphone permissions.
- **Firestore permission errors**: Server should write via Admin SDK; client should not require additional rules for Admin writes.


## Roadmap
- Feedback generation and scoring based on interview transcripts.
- Interview history details page with playback/transcripts.
- Sharable interview sets and collaboration features.
- Role/industry-specific templates and rubrics.


---

Made with ❤️ using Next.js, Firebase, Gemini, and Vapi.
