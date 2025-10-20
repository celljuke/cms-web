# Recruiting Module

A modern, feature-rich recruiting dashboard for managing job postings and tracking candidates.

## Features

### 🎨 Modern UI Design

- **Stats Dashboard**: Quick overview with Total Jobs, Active Jobs, Candidates, and Recent Activity
- **Job Cards**: Beautiful card-based list view with hover effects and smooth transitions
- **Dark Mode Support**: Fully themed components that work in both light and dark modes
- **Responsive Layout**: Mobile-first design that works on all screen sizes

### 🔍 Search & Filters

- **Real-time Search**: Search by job title, location, or job ID
- **Status Filtering**: Filter jobs by Active, OnHold, Closed, or Inactive status
- **Smart Sorting**: Sort jobs by date, title, or status

### ⚡ Performance

- **Skeleton Loaders**: Fancy animated loading states with custom SVG animations
- **tRPC Integration**: End-to-end type-safe API calls
- **Simulated Delay**: 2-second artificial delay to demonstrate loading UX (configurable)
- **Optimized Rendering**: Smart filtering and memoization

### 🎭 Loading Experience

- Animated spinner with gradient progress bar
- "Connecting to ATS" message
- "Pulling your job data..." status text
- Shimmer effect on skeleton cards
- Smooth fade-in transitions

## Components

### `RecruitingDashboard`

Main dashboard component with tabs, stats, filters, and job list.

### `JobCard`

Individual job card displaying:

- Job title and ID
- Location and salary
- Status badge
- Assigned user avatar
- Description preview
- Action buttons (view, edit, pause)

### `JobsSkeleton`

Animated loading state component with:

- Custom SVG spinner
- Progress bar with shimmer effect
- 5 skeleton job cards

### `JobFilters`

Search and filter controls:

- Search input with icon
- Status dropdown filter
- Sort dropdown

## Types

### `Job`

Main job interface with all job properties from the ATS.

### `AssignedUser`

User assignment information (id, name, email).

## Usage

```tsx
import { RecruitingDashboard } from "@/modules/recruiting";

export default function RecruitingPage() {
  return <RecruitingDashboard />;
}
```

## API Integration

The module uses tRPC for data fetching:

```ts
// Automatic type-safe query
const { data: jobs, isLoading } = trpc.recruiting.getJobs.useQuery();
```

## Customization

### Loading Delay

Adjust the artificial delay in `recruiting-dashboard.tsx`:

```ts
setTimeout(() => {
  setIsLoading(false);
}, 2000); // Change to desired delay in milliseconds
```

### Card Actions

Customize action buttons in `job-card.tsx`:

```tsx
<Button variant="ghost" size="icon" onClick={handleView}>
  <ExternalLink className="h-4 w-4" />
</Button>
```

## Future Enhancements

- [ ] Candidate management tab
- [ ] Bulk actions for jobs
- [ ] Advanced filtering (date range, salary range)
- [ ] Pagination for large datasets
- [ ] Export functionality
- [ ] Job analytics and insights
