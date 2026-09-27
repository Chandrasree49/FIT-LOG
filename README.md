add# FitLog

FitLog is a modern workout library and planning app that helps users browse exercises, view detailed workout information, and build a personalized workout plan.

 Technologies Used

- **Next.js** — React framework for building the application
- **React** — Component-based user interface
- **TypeScript** — Type-safe JavaScript development
- **Tailwind CSS** — Responsive and modern UI styling
- **React Toastify** — Toast notifications for user actions
- **Vercel** — Deployment and hosting
- **FitLog API** — Provides workout and exercise data

 Key Features

1. Workout Library
Browse a collection of workouts with information such as:
- Workout name
- Muscle groups
- Equipment
- Duration
- Calories burned
- Rating

### 2. Workout Details
View detailed information for each exercise, including:
- Description
- Equipment
- Difficulty
- Sets and reps
- Duration
- Calories
- Rating
- Step-by-step instructions

 3. My Plan
Create a personal workout plan with a maximum of five exercises for the day. Users can:
- Add workouts to today's plan
- Remove workouts
- Mark workouts as completed
- View workout details
- Track total exercises, minutes, and calories

4. Save Workouts
Save exercises for later and access them through the **Saved** section. Saved workouts are stored locally so they remain available after refreshing the page.
 5. Responsive Dark/Neon Design
FitLog uses a dark interface with neon green accents and responsive layouts designed to work across desktop, tablet, and mobile devices.
6. Project Structure

```text
app/
├── components/
│   ├── Banner.tsx
│   ├── Library.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PlanContext.tsx
│   └── WorkoutActions.tsx
├── Workouts/
│   └── [id]/
│       └── page.tsx
├── my-plan/
│   └── page.tsx
├── page.tsx
├── layout.tsx
└── not-found.tsx