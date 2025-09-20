// Mock API service that simulates backend API calls
// This file centralizes all mock data and provides async functions
// that can be easily replaced with real API calls later

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  crew?: string;
  profilePicture: string;
  isCheckedIn: boolean;
  lastCheckIn?: string;
  checkInMethod?: 'location' | 'wifi';
  checkInTime?: string;
}

export interface Leave {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface Complaint {
  id: string;
  type: string;
  description: string;
  status: 'submitted' | 'in-progress' | 'resolved';
  submittedDate: string;
  image?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdBy: string;
  createdAt: string;
}

export interface PhotoChallenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  submissions: number;
  likes: number;
  deadline: string;
  createdBy: string;
  image?: string;
}

export interface PhotoSubmission {
  id: string;
  challengeId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  submittedAt: string;
  isLiked: boolean;
}

// DevPlatform types (moved from separate file)
export interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  branch: string;
  commit: string;
  author: string;
  duration: string;
  timestamp: string;
  environment: 'development' | 'staging' | 'production';
}

export interface Service {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  version: string;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
}

export interface Environment {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'deploying';
  url: string;
  version: string;
  lastDeployed: string;
  deployedBy: string;
}

export interface SystemHealth {
  overallStatus: 'healthy' | 'warning' | 'critical';
  uptime: string;
  responseTime: string;
  requestsPerMinute: number;
  errorRate: string;
  throughput: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

export interface UserStats {
  id: string;
  name: string;
  avatar: string;
  department: string;
  role: string;
  isCheckedIn: boolean;
  lastCheckIn?: string;
  checkInTime?: string;
  stats: {
    triviaStreak: number;
    triviaAccuracy: number;
    questionsAnswered: number;
    photoSubmissions: number;
    photoLikes: number;
    attendanceRate: number;
    coffeeBreaks: number;
    helpfulVotes: number;
    forumPosts: number;
  };
  badges: string[];
  rank: number;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    department: 'Engineering',
    role: 'Senior Frontend Developer',
    crew: 'Alpha',
    profilePicture: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    isCheckedIn: false,
  },
  {
    id: '2',
    name: 'Mike Chen1',
    email: 'mike@company.com',
    department: 'Design',
    role: 'UI/UX Designer',
    crew: 'Beta',
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    isCheckedIn: false,
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    crew: 'Gamma',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    isCheckedIn: false,
  }
];

const mockLeaves: Leave[] = [
  {
    id: '1',
    type: 'Annual Leave',
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    reason: 'Family vacation',
    status: 'approved',
    appliedDate: '2025-01-10',
  },
  {
    id: '2',
    type: 'Sick Leave',
    startDate: '2025-01-15',
    endDate: '2025-01-15',
    reason: 'Medical appointment',
    status: 'pending',
    appliedDate: '2025-01-12',
  },
];

const mockComplaints: Complaint[] = [
  {
    id: '1',
    type: 'Food Quality1',
    description: 'The lunch menu needs more vegetarian options',
    status: 'in-progress',
    submittedDate: '2025-01-10',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'Your leave request has been approved',
    timestamp: '2025-01-12T10:30:00Z',
  },
  {
    id: '2',
    type: 'warning',
    message: 'Remember to check in for today',
    timestamp: '2025-01-12T09:00:00Z',
  },
  {
    id: '3',
    type: 'success',
    message: 'Your complaint has been resolved',
    timestamp: '2025-01-11T16:45:00Z',
  },
  {
    id: '4',
    type: 'info',
    message: 'New company policy update available',
    timestamp: '2025-01-11T14:20:00Z',
  },
  {
    id: '5',
    type: 'warning',
    message: 'Upcoming deadline for quarterly review',
    timestamp: '2025-01-11T11:15:00Z',
  },
  {
    id: '6',
    type: 'info',
    message: 'Team meeting scheduled for tomorrow',
    timestamp: '2025-01-10T18:30:00Z',
  },
  {
    id: '7',
    type: 'success',
    message: 'Your GitHub integration is now active',
    timestamp: '2025-01-10T15:22:00Z',
  },
];

const mockTriviaQuestions: TriviaQuestion[] = [
  {
    id: '1',
    question: 'What year was our company founded?',
    options: ['2018', '2019', '2020', '2021'],
    correctAnswer: 1,
    category: 'Company',
    difficulty: 'easy',
    createdBy: 'HR Team',
    createdAt: '2025-01-10'
  },
  {
    id: '2',
    question: 'Which programming language is known as the "language of the web"?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    correctAnswer: 1,
    category: 'Tech',
    difficulty: 'easy',
    createdBy: 'Dev Team',
    createdAt: '2025-01-11'
  },
  {
    id: '3',
    question: 'What is the maximum number of vacation days per year?',
    options: ['20', '25', '30', '35'],
    correctAnswer: 1,
    category: 'HR',
    difficulty: 'medium',
    createdBy: 'Sarah Johnson',
    createdAt: '2025-01-12'
  }
];

const mockPhotoChallenges: PhotoChallenge[] = [
  {
    id: '1',
    title: 'Workspace Wednesday',
    description: 'Show us your creative workspace setup!',
    theme: 'Workspace',
    submissions: 23,
    likes: 156,
    deadline: '2025-01-15',
    createdBy: 'Design Team',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Coffee Art Challenge',
    description: 'Capture your most artistic coffee moment',
    theme: 'Food & Drink',
    submissions: 18,
    likes: 89,
    deadline: '2025-01-20',
    createdBy: 'Marketing Team',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const mockPhotoSubmissions: PhotoSubmission[] = [
  {
    id: '1',
    challengeId: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'My cozy corner with plants and natural light! Perfect for morning coffee ☕',
    likes: 24,
    comments: 8,
    submittedAt: '2025-01-12T10:30:00Z',
    isLiked: false
  },
  {
    id: '2',
    challengeId: '1',
    userId: '2',
    userName: 'Mike Chen',
    userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Minimalist setup with dual monitors. Clean and productive! 💻',
    likes: 18,
    comments: 5,
    submittedAt: '2025-01-12T14:15:00Z',
    isLiked: true
  },
  {
    id: '3',
    challengeId: '2',
    userId: '3',
    userName: 'Emma Davis',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Latte art attempt #47... getting better! ☕✨',
    likes: 31,
    comments: 12,
    submittedAt: '2025-01-11T16:45:00Z',
    isLiked: false
  }
];

const mockUserStats: UserStats[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: 'Engineering',
    role: 'Senior Frontend Developer',
    isCheckedIn: true,
    lastCheckIn: '2025-01-13T08:30:00Z',
    checkInTime: '8:30 AM',
    stats: {
      triviaStreak: 12,
      triviaAccuracy: 85,
      questionsAnswered: 47,
      photoSubmissions: 5,
      photoLikes: 234,
      attendanceRate: 96,
      coffeeBreaks: 23,
      helpfulVotes: 47,
      forumPosts: 156
    },
    badges: ['Perfect Week', 'Trivia Master', 'Social Butterfly'],
    rank: 3
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: 'Design',
    role: 'UI/UX Designer',
    isCheckedIn: true,
    lastCheckIn: '2025-01-13T09:15:00Z',
    checkInTime: '9:15 AM',
    stats: {
      triviaStreak: 18,
      triviaAccuracy: 92,
      questionsAnswered: 63,
      photoSubmissions: 12,
      photoLikes: 456,
      attendanceRate: 94,
      coffeeBreaks: 31,
      helpfulVotes: 89,
      forumPosts: 203
    },
    badges: ['Photo Champion', 'Streak Legend', 'Design Guru'],
    rank: 1
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: 'Marketing',
    role: 'Marketing Manager',
    isCheckedIn: false,
    lastCheckIn: '2025-01-12T17:45:00Z',
    stats: {
      triviaStreak: 15,
      triviaAccuracy: 88,
      questionsAnswered: 52,
      photoSubmissions: 8,
      photoLikes: 342,
      attendanceRate: 98,
      coffeeBreaks: 19,
      helpfulVotes: 67,
      forumPosts: 124
    },
    badges: ['Attendance Star', 'Coffee Connoisseur', 'Team Player'],
    rank: 2
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: 'Engineering',
    role: 'Backend Developer',
    isCheckedIn: true,
    lastCheckIn: '2025-01-13T08:45:00Z',
    checkInTime: '8:45 AM',
    stats: {
      triviaStreak: 8,
      triviaAccuracy: 79,
      questionsAnswered: 34,
      photoSubmissions: 3,
      photoLikes: 89,
      attendanceRate: 91,
      coffeeBreaks: 15,
      helpfulVotes: 23,
      forumPosts: 67
    },
    badges: ['Code Warrior', 'Early Bird'],
    rank: 5
  },
  {
    id: '5',
    name: 'Lisa Park',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    department: 'HR',
    role: 'HR Specialist',
    isCheckedIn: true,
    lastCheckIn: '2025-01-13T09:00:00Z',
    checkInTime: '9:00 AM',
    stats: {
      triviaStreak: 11,
      triviaAccuracy: 83,
      questionsAnswered: 41,
      photoSubmissions: 7,
      photoLikes: 178,
      attendanceRate: 95,
      coffeeBreaks: 27,
      helpfulVotes: 56,
      forumPosts: 98
    },
    badges: ['People Person', 'Consistent Performer'],
    rank: 4
  }
];

// Utility function to simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Functions
export class MockApi {
  // Authentication
  static async login(email: string, password: string): Promise<User> {
    await delay(1000);
    
    // Find user by email or return first user as default
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    return { ...user };
  }

  // User Management
  static async getCurrentUser(): Promise<User> {
    await delay(300);
    return { ...mockUsers[0] };
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
    return { ...user, ...updates };
  }

  static async getAllUsers(): Promise<UserStats[]> {
    await delay(400);
    return [...mockUserStats];
  }

  // Attendance
  static async checkIn(method: 'location' | 'wifi'): Promise<{ success: boolean; timestamp: string }> {
    await delay(800);
    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  }

  static async checkOut(): Promise<{ success: boolean; timestamp: string }> {
    await delay(600);
    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  }

  static async getAttendanceHistory(userId: string): Promise<any[]> {
    await delay(700);
    // Generate mock attendance data for the last 365 days
    const data = [];
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let level = 0;
      if (!isWeekend) {
        const random = Math.random();
        if (random > 0.9) level = 0; // Absent
        else if (random > 0.7) level = 1; // Late/Early leave
        else if (random > 0.4) level = 2; // Normal hours
        else if (random > 0.2) level = 3; // Good hours
        else level = 4; // Excellent hours
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        level,
        hours: level === 0 ? 0 : level * 2 + 4,
        isWeekend
      });
    }
    
    return data.reverse();
  }

  // Leave Management
  static async getLeaves(userId: string): Promise<Leave[]> {
    await delay(400);
    return [...mockLeaves];
  }

  static async createLeave(leaveData: Omit<Leave, 'id' | 'appliedDate' | 'status'>): Promise<Leave> {
    await delay(800);
    const newLeave: Leave = {
      ...leaveData,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString(),
      status: 'pending'
    };
    return newLeave;
  }

  // Complaints
  static async getComplaints(userId: string): Promise<Complaint[]> {
    await delay(350);
    return [...mockComplaints];
  }

  static async createComplaint(complaintData: Omit<Complaint, 'id' | 'submittedDate' | 'status'>): Promise<Complaint> {
    await delay(900);
    const newComplaint: Complaint = {
      ...complaintData,
      id: Date.now().toString(),
      submittedDate: new Date().toISOString(),
      status: 'submitted'
    };
    return newComplaint;
  }

  // Notifications
  static async getNotifications(userId: string): Promise<Notification[]> {
    await delay(300);
    return [...mockNotifications];
  }

  static async markNotificationAsRead(notificationId: string): Promise<{ success: boolean }> {
    await delay(200);
    return { success: true };
  }

  // Trivia
  static async getTriviaQuestions(): Promise<TriviaQuestion[]> {
    await delay(400);
    return [...mockTriviaQuestions];
  }

  static async createTriviaQuestion(questionData: Omit<TriviaQuestion, 'id' | 'createdAt'>): Promise<TriviaQuestion> {
    await delay(600);
    const newQuestion: TriviaQuestion = {
      ...questionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    return newQuestion;
  }

  static async submitTriviaAnswer(questionId: string, answer: number): Promise<{ correct: boolean; correctAnswer: number }> {
    await delay(300);
    const question = mockTriviaQuestions.find(q => q.id === questionId);
    return {
      correct: question ? answer === question.correctAnswer : false,
      correctAnswer: question?.correctAnswer || 0
    };
  }

  // Photo Challenges
  static async getPhotoChallenges(): Promise<PhotoChallenge[]> {
    await delay(450);
    return [...mockPhotoChallenges];
  }

  static async createPhotoChallenge(challengeData: Omit<PhotoChallenge, 'id' | 'submissions' | 'likes'>): Promise<PhotoChallenge> {
    await delay(700);
    const newChallenge: PhotoChallenge = {
      ...challengeData,
      id: Date.now().toString(),
      submissions: 0,
      likes: 0
    };
    return newChallenge;
  }

  static async getPhotoSubmissions(challengeId?: string): Promise<PhotoSubmission[]> {
    await delay(500);
    if (challengeId) {
      return mockPhotoSubmissions.filter(s => s.challengeId === challengeId);
    }
    return [...mockPhotoSubmissions];
  }

  static async submitPhoto(submissionData: Omit<PhotoSubmission, 'id' | 'submittedAt' | 'likes' | 'comments' | 'isLiked'>): Promise<PhotoSubmission> {
    await delay(1200);
    const newSubmission: PhotoSubmission = {
      ...submissionData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false
    };
    return newSubmission;
  }

  static async likePhotoSubmission(submissionId: string): Promise<{ success: boolean }> {
    await delay(300);
    return { success: true };
  }

  // Statistics
  static async getUserStats(userId: string): Promise<any> {
    await delay(600);
    return {
      triviaStats: {
        questionsAnswered: 47,
        correctAnswers: 39,
        currentStreak: 12,
        accuracy: Math.round((39 / 47) * 100)
      },
      attendanceStats: {
        totalDays: 220,
        presentDays: 212,
        attendanceRate: 96,
        currentStreak: 8
      },
      photoStats: {
        submissions: 5,
        likes: 234,
        challenges: 2
      }
    };
  }

  static async getLeaderboardData(category: string): Promise<UserStats[]> {
    await delay(500);
    return [...mockUserStats].sort((a, b) => {
      switch (category) {
        case 'trivia':
          return b.stats.triviaStreak - a.stats.triviaStreak;
        case 'photo':
          return b.stats.photoLikes - a.stats.photoLikes;
        case 'attendance':
          return b.stats.attendanceRate - a.stats.attendanceRate;
        case 'social':
          return b.stats.helpfulVotes - a.stats.helpfulVotes;
        default:
          return 0;
      }
    });
  }

  // Integrations
  static async getIntegrations(userId: string): Promise<{ slack: boolean; github: boolean; googleCalendar: boolean }> {
    await delay(300);
    return {
      slack: true,
      github: false,
      googleCalendar: true
    };
  }

  static async toggleIntegration(service: string, enabled: boolean): Promise<{ success: boolean }> {
    await delay(500);
    return { success: true };
  }

  // Settings
  static async getUserSettings(userId: string): Promise<any> {
    await delay(250);
    return {
      notifications: {
        attendance: true,
        leaves: true,
        breaks: false,
        production: true,
        github: false
      },
      preferences: {
        darkMode: false,
        autoCheckIn: true,
        wifiOnly: false,
        language: 'English'
      }
    };
  }

  static async updateUserSettings(userId: string, settings: any): Promise<{ success: boolean }> {
    await delay(400);
    return { success: true };
  }
}