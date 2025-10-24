# Profile Module

Modern profile settings implementation following Vercel-inspired design patterns.

## Features

### 1. Profile Management

- View and edit personal information (first name, last name, job title)
- Upload profile image with preview
- Update Calendly scheduling link
- Real-time validation with Zod schemas

### 2. Password Management

- Change password with current password verification
- Password strength requirements (minimum 8 characters)
- Confirmation field to prevent typos

### 3. Assigned Jobs

- View all active jobs assigned to the user
- Quick navigation to job details
- Empty state with call-to-action

### 4. Header Integration

- Avatar displays profile image from API
- Shows full name when available
- Fallback to email initials
- Quick access to profile page

## Architecture

### Service Layer

**Location:** `server/services/profile/index.ts`

Handles all API communication:

- `getProfile()` - Fetch user profile
- `getAssignedJobs()` - Get assigned jobs list
- `updateProfile()` - Update profile information
- `uploadProfileImage()` - Upload profile picture
- `changePassword()` - Change user password

### tRPC Router

**Location:** `server/api/routers/profile.ts`

Type-safe API endpoints:

- `profile.getProfile` - Query user profile
- `profile.getAssignedJobs` - Query assigned jobs
- `profile.updateProfile` - Mutation to update profile
- `profile.changePassword` - Mutation to change password

### Custom Hooks

**Location:** `modules/profile/hooks/`

Business logic abstraction:

- `useProfile()` - Fetch and cache profile data
- `useAssignedJobs()` - Fetch assigned jobs
- `useUpdateProfile()` - Update profile with optimistic updates
- `useUploadImage()` - Handle image upload (FormData)
- `useChangePassword()` - Change password with validation

### Components

**Location:** `modules/profile/components/`

Modular UI components:

- `ProfileHeader` - User info card with avatar and metadata
- `ProfileForm` - Editable profile information form
- `AssignedJobsSection` - List of assigned jobs
- `ChangePasswordForm` - Password change form
- `QuickActions` - Sidebar navigation shortcuts

## API Endpoints

### GET /recruiting/profile

Fetch user profile information

**Response:**

```json
{
  "id": 16,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "job_title": "Senior Recruiter",
  "role": "member",
  "calendly_link": "https://calendly.com/...",
  "profile_image_url": "https://...",
  "org_id": 0,
  "created_at": "2025-10-14T11:02:56.637217"
}
```

### GET /recruiting/profile/assigned-jobs

Fetch jobs assigned to the user

**Response:**

```json
[
  {
    "job_id": 123,
    "title": "Senior Software Engineer",
    "status": "active",
    "date_created": "2025-10-15T10:30:00",
    "company": {
      "id": "456",
      "name": "Tech Company Inc",
      "state": "CA",
      "postal_code": "94105"
    }
  }
]
```

### PUT /recruiting/profile

Update user profile

**Payload:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "job_title": "Senior Recruiter",
  "calendly_link": "https://calendly.com/...",
  "profile_image_url": "https://..."
}
```

### POST /recruiting/profile/upload-image

Upload profile image

**Payload:** FormData with `file` field

**Response:**

```json
{
  "message": "Profile image uploaded successfully",
  "image_url": "https://..."
}
```

### POST /recruiting/profile/change-password

Change user password

**Payload:**

```json
{
  "current_password": "oldpass",
  "new_password": "newpass"
}
```

## Usage

### Access Profile Page

Navigate to `/profile` or click "My Profile" in the header dropdown.

### Update Profile

1. Click "Edit Profile Information" in Quick Actions
2. Modify fields as needed
3. Click "Save Changes"

### Upload Avatar

1. Click "Upload Photo" button
2. Select an image (JPG, PNG, GIF, max 5MB)
3. Image uploads automatically and updates profile

### Change Password

1. Click "Change Password" in Quick Actions
2. Enter current password
3. Enter new password (min 8 characters)
4. Confirm new password
5. Click "Change Password"

## Design Principles

### Modern UI

- Clean, minimal design inspired by Vercel
- Proper spacing and typography hierarchy
- Smooth transitions and hover states
- Responsive layout (mobile-first)

### Accessibility

- Keyboard navigation support
- ARIA labels on all interactive elements
- Focus management
- Screen reader friendly

### Performance

- Optimistic updates for better UX
- Image preview before upload
- Debounced form validation
- Efficient re-rendering with React Query cache

### Error Handling

- Toast notifications for success/error
- Inline form validation
- Graceful fallbacks for missing data
- Loading states for async operations

## File Structure

```
modules/profile/
├── components/
│   ├── assigned-jobs-section.tsx
│   ├── change-password-form.tsx
│   ├── profile-form.tsx
│   ├── profile-header.tsx
│   ├── quick-actions.tsx
│   └── index.ts
├── hooks/
│   ├── use-assigned-jobs.ts
│   ├── use-change-password.ts
│   ├── use-profile.ts
│   ├── use-update-profile.ts
│   └── use-upload-image.ts
├── schemas/
│   └── index.ts
├── types/
│   └── index.ts
├── index.ts
└── README.md

server/services/profile/
└── index.ts

server/api/routers/
└── profile.ts

app/(protected)/profile/
└── page.tsx
```

## Future Enhancements

- [ ] Email change with verification
- [ ] Two-factor authentication
- [ ] Activity log
- [ ] Notification preferences
- [ ] Team management (for admins)
- [ ] Export profile data
- [ ] Delete account option
