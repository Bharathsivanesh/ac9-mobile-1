import React, { useState } from 'react';
import { Trophy, Camera, Plus, Clock, Users, Star, Award, Target, Zap, Heart, Upload, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { MockApi } from '../services/mockApi';

const Trivia = () => {
  const [activeTab, setActiveTab] = useState<'trivia' | 'photo'>('trivia');
  const [showCreateTrivia, setShowCreateTrivia] = useState(false);
  const [showCreatePhoto, setShowCreatePhoto] = useState(false);
  const [showSubmitPhoto, setShowSubmitPhoto] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [showTakeTrivia, setShowTakeTrivia] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [triviaComplete, setTriviaComplete] = useState(false);
  const [triviaQuestions, setTriviaQuestions] = useState<any[]>([]);
  const [photoChallenges, setPhotoChallenges] = useState<any[]>([]);
  const [photoSubmissions, setPhotoSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTrivia, setNewTrivia] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: 'General',
    difficulty: 'medium' as const
  });

  const [newPhotoChallenge, setNewPhotoChallenge] = useState({
    title: '',
    description: '',
    theme: '',
    deadline: ''
  });

  const [photoSubmission, setPhotoSubmission] = useState({
    image: null as File | null,
    caption: ''
  });

  React.useEffect(() => {
    const loadTriviaData = async () => {
      try {
        const [questions, challenges, submissions] = await Promise.all([
          MockApi.getTriviaQuestions(),
          MockApi.getPhotoChallenges(),
          MockApi.getPhotoSubmissions()
        ]);

        setTriviaQuestions(questions);
        setPhotoChallenges(challenges);
        setPhotoSubmissions(submissions);
      } catch (error) {
        console.error('Failed to load trivia data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTriviaData();
  }, []);

  const categories = ['General', 'Company', 'Tech', 'HR', 'Fun'];
  const themes = ['Workspace', 'Food & Drink', 'Team Spirit', 'Creativity', 'Nature', 'Pets'];

  const handleCreateTrivia = async () => {
    if (newTrivia.question && newTrivia.options.every(opt => opt.trim())) {
      try {
        const newQuestion = await MockApi.createTriviaQuestion({
          ...newTrivia,
          createdBy: 'Current User'
        });
        
        setTriviaQuestions([...triviaQuestions, newQuestion]);
        setShowCreateTrivia(false);
        setNewTrivia({
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          category: 'General',
          difficulty: 'medium'
        });
      } catch (error) {
        console.error('Failed to create trivia question:', error);
      }
    }
  };

  const handleCreatePhotoChallenge = async () => {
    if (newPhotoChallenge.title && newPhotoChallenge.description && newPhotoChallenge.deadline) {
      try {
        const newChallenge = await MockApi.createPhotoChallenge({
          ...newPhotoChallenge,
          createdBy: 'Current User'
        });
        
        setPhotoChallenges([...photoChallenges, newChallenge]);
        setShowCreatePhoto(false);
        setNewPhotoChallenge({
          title: '',
          description: '',
          theme: '',
          deadline: ''
        });
      } catch (error) {
        console.error('Failed to create photo challenge:', error);
      }
    }
  };

  const handlePhotoSubmit = (challengeId: string) => {
    setSelectedChallenge(photoChallenges.find(c => c.id === challengeId));
    setShowSubmitPhoto(true);
  };

  const handleSubmitPhoto = async () => {
    if (photoSubmission.image && photoSubmission.caption.trim()) {
      try {
        const newSubmission = await MockApi.submitPhoto({
          challengeId: selectedChallenge.id,
          userId: '1', // Current user ID
          userName: 'Current User',
          userAvatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
          image: URL.createObjectURL(photoSubmission.image),
          caption: photoSubmission.caption
        });
        
        setPhotoSubmissions([...photoSubmissions, newSubmission]);
        setShowSubmitPhoto(false);
        setPhotoSubmission({ image: null, caption: '' });
        setSelectedChallenge(null);
      } catch (error) {
        console.error('Failed to submit photo:', error);
      }
    }
  };

  const handleViewSubmissions = (challenge: any) => {
    setSelectedChallenge(challenge);
    setShowSubmissions(true);
  };

  const handleLikeSubmission = async (submissionId: string) => {
    try {
      await MockApi.likePhotoSubmission(submissionId);
      // Update local state to reflect the like
      setPhotoSubmissions(prev => 
        prev.map(sub => 
          sub.id === submissionId 
            ? { ...sub, likes: sub.likes + (sub.isLiked ? -1 : 1), isLiked: !sub.isLiked }
            : sub
        )
      );
    } catch (error) {
      console.error('Failed to like submission:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoSubmission({ ...photoSubmission, image: file });
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer !== null) {
      try {
        const result = await MockApi.submitTriviaAnswer(
          triviaQuestions[currentQuestion].id, 
          selectedAnswer
        );
        
        if (result.correct) {
          setScore(score + 1);
        }
        
        if (currentQuestion < triviaQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setTriviaComplete(true);
        }
      } catch (error) {
        console.error('Failed to submit answer:', error);
      }
    }
  };

  const resetTrivia = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTriviaComplete(false);
    setShowTakeTrivia(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-amber-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-64 left-20 w-12 h-12 bg-orange-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-8 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-12 w-14 h-14 bg-amber-300/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 right-4 w-8 h-8 border-2 border-yellow-300/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-32 left-6 w-6 h-6 border-2 border-amber-400/30 rotate-12 animate-spin" style={{ animationDuration: '12s' }}></div>
        
        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100/50 to-transparent">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(251, 191, 36, 0.1)"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Daily Challenges</h1>
        <p className="text-gray-600 mt-1">Test your knowledge & creativity</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
        <button
          onClick={() => setActiveTab('trivia')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'trivia' 
              ? 'bg-white text-yellow-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Trophy size={18} />
          <span>Trivia</span>
        </button>
        <button
          onClick={() => setActiveTab('photo')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'photo' 
              ? 'bg-white text-yellow-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Camera size={18} />
          <span>Photo Challenge</span>
        </button>
      </div>

      {/* Trivia Tab */}
      {activeTab === 'trivia' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
              <Trophy className="text-yellow-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-yellow-600">47</p>
              <p className="text-sm text-gray-600">Questions Answered</p>
            </div>
            <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
              <Target className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-600">Avg Score</p>
            </div>
            <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 text-center shadow-lg">
              <Trophy className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowTakeTrivia(true)}
              className="flex items-center justify-center space-x-2 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Trophy size={18} />
              <span>Take Daily Trivia</span>
            </button>
            <button
              onClick={() => setShowCreateTrivia(true)}
              className="flex items-center justify-center space-x-2 bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Plus size={18} />
              <span>Create Question</span>
            </button>
          </div>

          {/* Recent Questions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
            <div className="space-y-3">
              {triviaQuestions.map((question) => (
                <div key={question.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 flex-1">{question.question}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>By {question.createdBy}</span>
                    <span>{question.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Photo Challenge Tab */}
      {activeTab === 'photo' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-pink-50/80 backdrop-blur-sm rounded-xl border border-pink-200 text-center shadow-lg">
              <Camera className="text-pink-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-pink-600">5</p>
              <p className="text-sm text-gray-600">Photos Submitted</p>
            </div>
            <div className="p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-200 text-center shadow-lg">
              <Heart className="text-purple-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-purple-600">234</p>
              <p className="text-sm text-gray-600">Likes Received</p>
            </div>
            <div className="p-4 bg-indigo-50/80 backdrop-blur-sm rounded-xl border border-indigo-200 text-center shadow-lg">
              <Award className="text-indigo-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-indigo-600">2</p>
              <p className="text-sm text-gray-600">Challenges Won</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowCreatePhoto(true)}
            className="w-full flex items-center justify-center space-x-2 bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors"
          >
            <Plus size={18} />
            <span>Create Photo Challenge</span>
          </button>

          {/* Active Challenges */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Challenges</h2>
            <div className="space-y-4">
              {photoChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-lg">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{challenge.submissions}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={14} />
                          <span>{challenge.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>Ends {new Date(challenge.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handlePhotoSubmit(challenge.id)}
                        className="flex-1 bg-pink-600 text-white py-2 px-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Upload size={16} />
                        <span>Submit</span>
                      </button>
                      <button
                        onClick={() => handleViewSubmissions(challenge)}
                        className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Camera size={16} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Take Trivia Modal */}
      {showTakeTrivia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            {!triviaComplete ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Daily Trivia</h2>
                  <span className="text-sm text-gray-600">
                    {currentQuestion + 1} / {triviaQuestions.length}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {triviaQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {triviaQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-3 text-left rounded-lg border transition-colors ${
                          selectedAnswer === index
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={resetTrivia}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestion < triviaQuestions.length - 1 ? 'Next' : 'Finish'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Trophy className="text-yellow-600 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                <p className="text-lg text-gray-600 mb-4">
                  You scored {score} out of {triviaQuestions.length}
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={resetTrivia}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setScore(0);
                      setTriviaComplete(false);
                    }}
                    className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Trivia Modal */}
      {showCreateTrivia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Trivia Question</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  value={newTrivia.question}
                  onChange={(e) => setNewTrivia({ ...newTrivia, question: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter your trivia question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                {newTrivia.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newTrivia.correctAnswer === index}
                      onChange={() => setNewTrivia({ ...newTrivia, correctAnswer: index })}
                      className="text-yellow-600"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newTrivia.options];
                        newOptions[index] = e.target.value;
                        setNewTrivia({ ...newTrivia, options: newOptions });
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTrivia.category}
                    onChange={(e) => setNewTrivia({ ...newTrivia, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={newTrivia.difficulty}
                    onChange={(e) => setNewTrivia({ ...newTrivia, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateTrivia(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTrivia}
                  className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Create Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Photo Challenge Modal */}
      {showCreatePhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Photo Challenge</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Title</label>
                <input
                  type="text"
                  value={newPhotoChallenge.title}
                  onChange={(e) => setNewPhotoChallenge({ ...newPhotoChallenge, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., Cozy Corner Challenge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newPhotoChallenge.description}
                  onChange={(e) => setNewPhotoChallenge({ ...newPhotoChallenge, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Describe what participants should photograph..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={newPhotoChallenge.theme}
                  onChange={(e) => setNewPhotoChallenge({ ...newPhotoChallenge, theme: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select a theme</option>
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newPhotoChallenge.deadline}
                  onChange={(e) => setNewPhotoChallenge({ ...newPhotoChallenge, deadline: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreatePhoto(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePhotoChallenge}
                  className="flex-1 py-3 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Create Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Photo Modal */}
      {showSubmitPhoto && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submit to "{selectedChallenge.title}"</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  {photoSubmission.image ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(photoSubmission.image)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600">{photoSubmission.image.name}</p>
                      <button
                        onClick={() => setPhotoSubmission({ ...photoSubmission, image: null })}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-600">Click to upload photo</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <textarea
                  value={photoSubmission.caption}
                  onChange={(e) => setPhotoSubmission({ ...photoSubmission, caption: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Tell us about your photo..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowSubmitPhoto(false);
                    setPhotoSubmission({ image: null, caption: '' });
                    setSelectedChallenge(null);
                  }}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPhoto}
                  disabled={!photoSubmission.image || !photoSubmission.caption.trim()}
                  className="flex-1 py-3 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Submissions Modal */}
      {showSubmissions && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">"{selectedChallenge.title}" Submissions</h2>
              <button
                onClick={() => setShowSubmissions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {photoSubmissions
                .filter(submission => submission.challengeId === selectedChallenge.id)
                .map((submission) => (
                  <div key={submission.id} className="bg-gray-50 rounded-xl p-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={submission.userAvatar}
                        alt={submission.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{submission.userName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Photo */}
                    <img
                      src={submission.image}
                      alt="Submission"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />

                    {/* Caption */}
                    <p className="text-sm text-gray-700 mb-3">{submission.caption}</p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLikeSubmission(submission.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            submission.isLiked 
                              ? 'text-red-600' 
                              : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <Heart 
                            size={16} 
                            className={submission.isLiked ? 'fill-current' : ''} 
                          />
                          <span className="text-sm">{submission.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle size={16} />
                          <span className="text-sm">{submission.comments}</span>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              
              {photoSubmissions.filter(s => s.challengeId === selectedChallenge.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Camera size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No submissions yet</p>
                  <p className="text-sm">Be the first to submit!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Trivia;