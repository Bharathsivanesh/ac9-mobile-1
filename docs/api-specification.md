# Company Hub API Specification

## Overview

This document outlines the REST API endpoints for the Company Hub application, covering authentication, user management, attendance tracking, leave management, complaints, notifications, trivia, photo challenges, statistics, integrations, and developer platform features.

**Base URL:** `https://api.company-hub.com/v1`

**Authentication:** Bearer Token (JWT)

**Content-Type:** `application/json`

---

## Authentication

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@company.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "department": "string",
      "role": "string",
      "crew": "string",
      "profilePicture": "string",
      "isCheckedIn": boolean,
      "lastCheckIn": "ISO 8601 string",
      "checkInMethod": "location | wifi",
      "checkInTime": "string"
    },
    "token": "JWT token string"
  }
}
```

### POST /auth/logout
Logout current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST /auth/refresh
Refresh JWT token.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new JWT token string"
  }
}
```

---

## User Management

### GET /users/me
Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "department": "string",
    "role": "string",
    "crew": "string",
    "profilePicture": "string",
    "isCheckedIn": boolean,
    "lastCheckIn": "ISO 8601 string",
    "checkInMethod": "location | wifi",
    "checkInTime": "string"
  }
}
```

### PUT /users/me
Update current user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "string",
  "department": "string",
  "role": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "department": "string",
    "role": "string",
    "crew": "string",
    "profilePicture": "string",
    "isCheckedIn": boolean,
    "lastCheckIn": "ISO 8601 string",
    "checkInMethod": "location | wifi",
    "checkInTime": "string"
  }
}
```

### GET /users
Get all users (for leaderboard).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 50)
- `department`: string (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "string",
        "name": "string",
        "avatar": "string",
        "department": "string",
        "role": "string",
        "isCheckedIn": boolean,
        "lastCheckIn": "ISO 8601 string",
        "checkInTime": "string",
        "stats": {
          "triviaStreak": number,
          "triviaAccuracy": number,
          "questionsAnswered": number,
          "photoSubmissions": number,
          "photoLikes": number,
          "attendanceRate": number,
          "coffeeBreaks": number,
          "helpfulVotes": number,
          "forumPosts": number
        },
        "badges": ["string"],
        "rank": number
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

---

## Attendance Management

### POST /attendance/checkin
Check in user.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "method": "location | wifi",
  "location": {
    "latitude": number,
    "longitude": number
  },
  "wifiSSID": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "timestamp": "ISO 8601 string",
    "method": "location | wifi"
  }
}
```

### POST /attendance/checkout
Check out user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "timestamp": "ISO 8601 string"
  }
}
```

### GET /attendance/history
Get user attendance history.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: ISO 8601 string (optional)
- `endDate`: ISO 8601 string (optional)
- `limit`: number (default: 365)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "YYYY-MM-DD",
      "level": number,
      "hours": number,
      "isWeekend": boolean,
      "checkInTime": "ISO 8601 string",
      "checkOutTime": "ISO 8601 string"
    }
  ]
}
```

---

## Leave Management

### GET /leaves
Get user leaves.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: "pending | approved | rejected" (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "leaves": [
      {
        "id": "string",
        "type": "string",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "reason": "string",
        "status": "pending | approved | rejected",
        "appliedDate": "ISO 8601 string",
        "reviewedBy": "string",
        "reviewedAt": "ISO 8601 string",
        "comments": "string"
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

### POST /leaves
Create leave request.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "string",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "reason": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "type": "string",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "reason": "string",
    "status": "pending",
    "appliedDate": "ISO 8601 string"
  }
}
```

### PUT /leaves/:id
Update leave request (user can only update pending leaves).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "string",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "reason": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "type": "string",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "reason": "string",
    "status": "pending",
    "appliedDate": "ISO 8601 string"
  }
}
```

### DELETE /leaves/:id
Cancel leave request (user can only cancel pending leaves).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Leave request cancelled successfully"
}
```

---

## Complaints Management

### GET /complaints
Get user complaints.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: "submitted | in-progress | resolved" (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "complaints": [
      {
        "id": "string",
        "type": "string",
        "description": "string",
        "status": "submitted | in-progress | resolved",
        "submittedDate": "ISO 8601 string",
        "image": "string",
        "response": "string",
        "resolvedDate": "ISO 8601 string"
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

### POST /complaints
Create complaint.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "string",
  "description": "string",
  "image": "base64 string or file upload"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "type": "string",
    "description": "string",
    "status": "submitted",
    "submittedDate": "ISO 8601 string",
    "image": "string"
  }
}
```

---

## Notifications

### GET /notifications
Get user notifications.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `read`: boolean (optional)
- `type`: "info | warning | error | success" (optional)
- `page`: number (default: 1)
- `limit`: number (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "string",
        "type": "info | warning | error | success",
        "message": "string",
        "timestamp": "ISO 8601 string",
        "read": boolean,
        "actionUrl": "string"
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

### PUT /notifications/:id/read
Mark notification as read.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### PUT /notifications/read-all
Mark all notifications as read.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## Trivia System

### GET /trivia/questions
Get trivia questions.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category`: string (optional)
- `difficulty`: "easy | medium | hard" (optional)
- `limit`: number (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "question": "string",
      "options": ["string"],
      "correctAnswer": number,
      "category": "string",
      "difficulty": "easy | medium | hard",
      "createdBy": "string",
      "createdAt": "ISO 8601 string"
    }
  ]
}
```

### POST /trivia/questions
Create trivia question.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "question": "string",
  "options": ["string"],
  "correctAnswer": number,
  "category": "string",
  "difficulty": "easy | medium | hard"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "question": "string",
    "options": ["string"],
    "correctAnswer": number,
    "category": "string",
    "difficulty": "easy | medium | hard",
    "createdBy": "string",
    "createdAt": "ISO 8601 string"
  }
}
```

### POST /trivia/answers
Submit trivia answer.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "questionId": "string",
  "answer": number
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "correct": boolean,
    "correctAnswer": number,
    "points": number,
    "streak": number
  }
}
```

---

## Photo Challenges

### GET /photo-challenges
Get photo challenges.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: "active | completed | upcoming" (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "challenges": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "theme": "string",
        "submissions": number,
        "likes": number,
        "deadline": "ISO 8601 string",
        "createdBy": "string",
        "image": "string",
        "status": "active | completed | upcoming"
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

### POST /photo-challenges
Create photo challenge.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "theme": "string",
  "deadline": "ISO 8601 string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "theme": "string",
    "submissions": 0,
    "likes": 0,
    "deadline": "ISO 8601 string",
    "createdBy": "string",
    "status": "active"
  }
}
```

### GET /photo-challenges/:id/submissions
Get photo submissions for a challenge.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `sortBy`: "newest | oldest | likes" (default: "newest")

**Response:**
```json
{
  "success": true,
  "data": {
    "submissions": [
      {
        "id": "string",
        "challengeId": "string",
        "userId": "string",
        "userName": "string",
        "userAvatar": "string",
        "image": "string",
        "caption": "string",
        "likes": number,
        "comments": number,
        "submittedAt": "ISO 8601 string",
        "isLiked": boolean
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

### POST /photo-challenges/:id/submissions
Submit photo to challenge.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "image": "base64 string or file upload",
  "caption": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "challengeId": "string",
    "userId": "string",
    "userName": "string",
    "userAvatar": "string",
    "image": "string",
    "caption": "string",
    "likes": 0,
    "comments": 0,
    "submittedAt": "ISO 8601 string",
    "isLiked": false
  }
}
```

### POST /photo-submissions/:id/like
Like/unlike photo submission.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "liked": boolean,
    "totalLikes": number
  }
}
```

---

## Statistics

### GET /statistics/user
Get user statistics.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `period`: "week | month | quarter | year" (default: "month")

**Response:**
```json
{
  "success": true,
  "data": {
    "triviaStats": {
      "questionsAnswered": number,
      "correctAnswers": number,
      "currentStreak": number,
      "accuracy": number
    },
    "attendanceStats": {
      "totalDays": number,
      "presentDays": number,
      "attendanceRate": number,
      "currentStreak": number
    },
    "photoStats": {
      "submissions": number,
      "likes": number,
      "challenges": number
    },
    "socialStats": {
      "helpfulVotes": number,
      "forumPosts": number,
      "coffeeBreaks": number
    }
  }
}
```

### GET /statistics/leaderboard
Get leaderboard data.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category`: "trivia | photo | attendance | social" (default: "trivia")
- `period`: "week | month | quarter | year" (default: "month")
- `limit`: number (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "avatar": "string",
      "department": "string",
      "role": "string",
      "isCheckedIn": boolean,
      "lastCheckIn": "ISO 8601 string",
      "checkInTime": "string",
      "stats": {
        "triviaStreak": number,
        "triviaAccuracy": number,
        "questionsAnswered": number,
        "photoSubmissions": number,
        "photoLikes": number,
        "attendanceRate": number,
        "coffeeBreaks": number,
        "helpfulVotes": number,
        "forumPosts": number
      },
      "badges": ["string"],
      "rank": number
    }
  ]
}
```

---

## Integrations

### GET /integrations
Get user integrations.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "slack": boolean,
    "github": boolean,
    "googleCalendar": boolean
  }
}
```

### PUT /integrations/:service
Toggle integration.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "enabled": boolean
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "service": "string",
    "enabled": boolean
  }
}
```

---

## Settings

### GET /settings
Get user settings.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": {
      "attendance": boolean,
      "leaves": boolean,
      "breaks": boolean,
      "production": boolean,
      "github": boolean
    },
    "preferences": {
      "darkMode": boolean,
      "autoCheckIn": boolean,
      "wifiOnly": boolean,
      "language": "string"
    }
  }
}
```

### PUT /settings
Update user settings.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "notifications": {
    "attendance": boolean,
    "leaves": boolean,
    "breaks": boolean,
    "production": boolean,
    "github": boolean
  },
  "preferences": {
    "darkMode": boolean,
    "autoCheckIn": boolean,
    "wifiOnly": boolean,
    "language": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": {
      "attendance": boolean,
      "leaves": boolean,
      "breaks": boolean,
      "production": boolean,
      "github": boolean
    },
    "preferences": {
      "darkMode": boolean,
      "autoCheckIn": boolean,
      "wifiOnly": boolean,
      "language": "string"
    }
  }
}
```

---

## Developer Platform APIs

### GET /devops/pipelines
Get CI/CD pipelines.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: "success | running | failed | pending" (optional)
- `environment`: "development | staging | production" (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "pipelines": [
      {
        "id": "string",
        "name": "string",
        "status": "success | running | failed | pending",
        "branch": "string",
        "commit": "string",
        "author": "string",
        "duration": "string",
        "timestamp": "ISO 8601 string",
        "environment": "development | staging | production"
      }
    ],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

### POST /devops/pipelines/:id/retry
Retry failed pipeline.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Pipeline retry initiated",
  "data": {
    "pipelineId": "string"
  }
}
```

### POST /devops/pipelines/trigger
Trigger new pipeline.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "branch": "string",
  "environment": "development | staging | production"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pipelineId": "string"
  }
}
```

### GET /devops/services
Get service status.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "status": "healthy | warning | critical",
      "uptime": "string",
      "version": "string",
      "cpu": number,
      "memory": number,
      "requests": number,
      "errors": number
    }
  ]
}
```

### POST /devops/services/:id/restart
Restart service.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Service restart initiated"
}
```

### GET /devops/environments
Get deployment environments.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "status": "active | inactive | deploying",
      "url": "string",
      "version": "string",
      "lastDeployed": "ISO 8601 string",
      "deployedBy": "string"
    }
  ]
}
```

### POST /devops/environments/:id/deploy
Deploy to environment.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "branch": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "deploymentId": "string"
  }
}
```

### GET /devops/monitoring/health
Get system health.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "overallStatus": "healthy | warning | critical",
    "uptime": "string",
    "responseTime": "string",
    "requestsPerMinute": number,
    "errorRate": "string",
    "throughput": "string"
  }
}
```

### GET /devops/monitoring/alerts
Get system alerts.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `type`: "warning | critical | info" (optional)
- `acknowledged`: boolean (optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "type": "warning | critical | info",
      "title": "string",
      "description": "string",
      "timestamp": "ISO 8601 string",
      "acknowledged": boolean
    }
  ]
}
```

### POST /devops/monitoring/alerts/:id/acknowledge
Acknowledge alert.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Alert acknowledged"
}
```

### GET /devops/git/branches
Get available branches.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": ["string"]
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid request data",
    "details": {
      "field": "error description"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 422 Unprocessable Entity
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field": "validation error description"
    }
  }
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": number
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Internal server error"
  }
}
```

---

## Rate Limiting

- **Authentication endpoints:** 5 requests per minute per IP
- **General API endpoints:** 100 requests per minute per user
- **File upload endpoints:** 10 requests per minute per user
- **DevOps endpoints:** 20 requests per minute per user

---

## File Upload Guidelines

### Image Uploads
- **Supported formats:** JPEG, PNG, GIF, WebP
- **Maximum file size:** 10MB
- **Recommended dimensions:** 1920x1080 or smaller
- **Upload method:** Base64 encoding or multipart/form-data

### Profile Pictures
- **Supported formats:** JPEG, PNG
- **Maximum file size:** 5MB
- **Recommended dimensions:** 400x400 (square)
- **Auto-resize:** Images are automatically resized to 400x400

---

## WebSocket Events (Real-time Updates)

### Connection
```javascript
const ws = new WebSocket('wss://api.company-hub.com/ws');
ws.send(JSON.stringify({
  type: 'authenticate',
  token: 'JWT_TOKEN'
}));
```

### Events

#### User Check-in/Check-out
```json
{
  "type": "attendance_update",
  "data": {
    "userId": "string",
    "userName": "string",
    "isCheckedIn": boolean,
    "timestamp": "ISO 8601 string"
  }
}
```

#### New Notification
```json
{
  "type": "notification",
  "data": {
    "id": "string",
    "type": "info | warning | error | success",
    "message": "string",
    "timestamp": "ISO 8601 string"
  }
}
```

#### Pipeline Status Update
```json
{
  "type": "pipeline_update",
  "data": {
    "id": "string",
    "name": "string",
    "status": "success | running | failed | pending",
    "timestamp": "ISO 8601 string"
  }
}
```

#### System Alert
```json
{
  "type": "system_alert",
  "data": {
    "id": "string",
    "type": "warning | critical | info",
    "title": "string",
    "description": "string",
    "timestamp": "ISO 8601 string"
  }
}
```

---

## SDK Examples

### JavaScript/TypeScript
```typescript
import { CompanyHubAPI } from '@company-hub/api-client';

const api = new CompanyHubAPI({
  baseURL: 'https://api.company-hub.com/v1',
  token: 'your-jwt-token'
});

// Check in
await api.attendance.checkIn({
  method: 'location',
  location: { latitude: 40.7128, longitude: -74.0060 }
});

// Get trivia questions
const questions = await api.trivia.getQuestions({
  category: 'Company',
  limit: 5
});

// Submit photo to challenge
await api.photoChallenges.submitPhoto('challenge-id', {
  image: base64Image,
  caption: 'My awesome workspace!'
});
```

### Python
```python
from company_hub_api import CompanyHubAPI

api = CompanyHubAPI(
    base_url='https://api.company-hub.com/v1',
    token='your-jwt-token'
)

# Check in
api.attendance.check_in(
    method='location',
    location={'latitude': 40.7128, 'longitude': -74.0060}
)

# Get user statistics
stats = api.statistics.get_user_stats(period='month')
```

---

## Changelog

### v1.0.0 (2025-01-13)
- Initial API release
- Authentication and user management
- Attendance tracking
- Leave management
- Complaints system
- Trivia and photo challenges
- Statistics and leaderboards
- Integrations
- Developer platform features