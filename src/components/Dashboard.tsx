import React from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  AlertTriangle,
  MapPin,
  ChevronDown,
  ChevronUp,
  Trophy,
  Target,
  Camera,
  Star,
  Users,
  Heart,
  Upload,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { MockApi } from "../services/mockApi";

const Dashboard = () => {
  const { state } = useAppContext();
  const [showAllNotifications, setShowAllNotifications] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(
    null
  );
  const [showResult, setShowResult] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [showSubmitPhoto, setShowSubmitPhoto] = React.useState(false);
  const [selectedChallenge, setSelectedChallenge] = React.useState<any>(null);
  const [photoSubmission, setPhotoSubmission] = React.useState({
    image: null as File | null,
    caption: "",
  });
  const [todayTrivia, setTodayTrivia] = React.useState<any>(null);
  const [activeChallenges, setActiveChallenges] = React.useState<any[]>([]);
  const [triviaStats, setTriviaStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const { user, notifications } = state;

  React.useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [triviaQuestions, photoChallenges, userStats] = await Promise.all(
          [
            MockApi.getTriviaQuestions(),
            MockApi.getPhotoChallenges(),
            MockApi.getUserStats(user.id),
          ]
        );

        // Set today's trivia (first question for demo)
        if (triviaQuestions.length > 0) {
          setTodayTrivia(triviaQuestions[0]);
        }

        // Set active photo challenges
        setActiveChallenges(photoChallenges.slice(0, 2));

        // Set trivia stats
        setTriviaStats(userStats.triviaStats);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user.id]);
  const formatTime = (dateString?: string) => {
    if (!dateString) return "--:--";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const upcomingLeaves = state.leaves
    .filter(
      (leave) =>
        new Date(leave.startDate) >= new Date() && leave.status === "approved"
    )
    .slice(0, 2);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return; // Prevent changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return;

    try {
      const result = await MockApi.submitTriviaAnswer(
        todayTrivia.id,
        selectedAnswer
      );
      setIsCorrect(result.correct);
      setShowResult(true);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const resetTrivia = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handlePhotoSubmit = (challenge: any) => {
    setSelectedChallenge(challenge);
    setShowSubmitPhoto(true);
  };

  const handleSubmitPhoto = async () => {
    if (photoSubmission.image && photoSubmission.caption.trim()) {
      try {
        await MockApi.submitPhoto({
          challengeId: selectedChallenge.id,
          userId: user.id,
          userName: user.name,
          userAvatar: user.profilePicture,
          image: URL.createObjectURL(photoSubmission.image),
          caption: photoSubmission.caption,
        });

        setShowSubmitPhoto(false);
        setPhotoSubmission({ image: null, caption: "" });
        setSelectedChallenge(null);
      } catch (error) {
        console.error("Failed to submit photo:", error);
      }
    }
  };
  const [location, setLocation] = React.useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  React.useEffect(() => {
    // Try to get location from React Native WebView
    if ((window as any).userLocation) {
      setLocation((window as any).userLocation);
    }

    // // Also listen for updates from React Native
    window.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.latitude && data.longitude) {
          setLocation({ latitude: data.latitude, longitude: data.longitude });
        }
      } catch (err) {
        console.error("Invalid message from WebView:", err);
        }
    });
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoSubmission({ ...photoSubmission, image: file });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
        <div
          className="absolute top-32 right-16 w-16 h-16 bg-amber-200/40 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-64 left-20 w-12 h-12 bg-orange-200/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-8 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-12 w-14 h-14 bg-amber-300/30 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Geometric Patterns */}
        <div
          className="absolute top-20 right-4 w-8 h-8 border-2 border-yellow-300/40 rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-32 left-6 w-6 h-6 border-2 border-amber-400/30 rotate-12 animate-spin"
          style={{ animationDuration: "12s" }}
        ></div>

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100/50 to-transparent">
          <svg
            className="absolute bottom-0 w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="rgba(251, 191, 36, 0.1)"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Good morning,
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              {user.name.split(" ")[0]} ✨
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur opacity-30 animate-pulse"></div>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="relative w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-5 rounded-2xl backdrop-blur-sm border-2 shadow-lg transition-all duration-300 hover:scale-105 ${
              user.isCheckedIn
                ? "bg-green-100/80 border-green-300 shadow-green-200/50"
                : "bg-white/80 border-gray-200 shadow-gray-200/50"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`p-2 rounded-full ${
                  user.isCheckedIn ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                <Clock
                  className={
                    user.isCheckedIn ? "text-green-700" : "text-gray-500"
                  }
                  size={16}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {user.isCheckedIn ? "Checked In" : "Not Checked In"}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {formatTime(user.lastCheckIn)}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-100/80 to-amber-100/80 backdrop-blur-sm border-2 border-yellow-300 shadow-lg shadow-yellow-200/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-200 rounded-full">
                <Clock className="text-yellow-700" size={16} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Status
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-2">
              {user.isCheckedIn ? "Active" : "Ready"}
            </p>
          </div>
        </div>
        {/* Current Location Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-100/80 to-indigo-100/80 backdrop-blur-sm border-2 border-blue-300 shadow-lg shadow-blue-200/50 transition-all duration-300 hover:scale-105 mt-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-200 rounded-full">
              <MapPin className="text-blue-700" size={16} />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Current Location
            </span>
          </div>

          {location ? (
            <p className="text-sm text-gray-900 mt-2">
              📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Fetching location...</p>
          )}
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              {notifications.length > 3 && (
                <button
                  onClick={() => setShowAllNotifications(!showAllNotifications)}
                  className="flex items-center space-x-1 text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  <span>
                    {showAllNotifications
                      ? "Show Less"
                      : `View All (${notifications.length})`}
                  </span>
                  {showAllNotifications ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {(showAllNotifications
                ? notifications
                : notifications.slice(0, 3)
              ).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-2xl border-l-4 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-102 ${
                    notification.type === "warning"
                      ? "bg-yellow-50/90 border-yellow-400 shadow-yellow-200/50"
                      : "bg-blue-50/90 border-blue-400 shadow-blue-200/50"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div
                      className={`p-1 rounded-full ${
                        notification.type === "warning"
                          ? "bg-yellow-200"
                          : "bg-blue-200"
                      }`}
                    >
                      <AlertTriangle
                        size={16}
                        className={
                          notification.type === "warning"
                            ? "text-yellow-700"
                            : "text-blue-700"
                        }
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-800 flex-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {notifications.length > 5 && showAllNotifications && (
              <div className="p-3 bg-yellow-50/90 backdrop-blur-sm rounded-xl border border-yellow-200 text-center">
                <p className="text-sm text-yellow-800">
                  Showing all {notifications.length} notifications
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Consider marking older notifications as read to keep your
                  dashboard clean
                </p>
              </div>
            )}
          </div>
        )}

        {/* Daily Challenge Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Daily Challenges
            </h2>
            <div className="flex items-center space-x-2">
              <Link
                to="/leaderboard"
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Check-in Status
              </Link>
              <Link
                to="/trivia"
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Daily Trivia */}
          {todayTrivia && (
            <div className="bg-gradient-to-r from-yellow-100/90 to-amber-100/90 backdrop-blur-sm rounded-2xl border-2 border-yellow-300 shadow-lg shadow-yellow-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-600" size={20} />
                  <span className="font-semibold text-gray-900">
                    Today's Trivia
                  </span>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {todayTrivia.difficulty}
                </span>
              </div>

              <h3 className="font-medium text-gray-900 mb-3">
                {todayTrivia.question}
              </h3>

              {!showResult ? (
                <>
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {todayTrivia.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-3 text-left rounded-lg border transition-colors ${
                          selectedAnswer === index
                            ? "border-yellow-500 bg-yellow-200/60"
                            : "border-yellow-200 bg-white/60 hover:bg-yellow-50/60"
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {triviaStats && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Target size={14} />
                          <span>{triviaStats.accuracy}% accuracy</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy size={14} />
                          <span>{triviaStats.currentStreak} day streak</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg mb-4 ${
                      isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span className="text-lg">{isCorrect ? "🎉" : "❌"}</span>
                    <span className="font-medium">
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                  {!isCorrect && (
                    <p className="text-sm text-gray-600 mb-4">
                      The correct answer was:{" "}
                      <strong>
                        {todayTrivia.options[todayTrivia.correctAnswer]}
                      </strong>
                    </p>
                  )}
                  <div className="flex space-x-3">
                    <button
                      onClick={resetTrivia}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Try Again
                    </button>
                    <Link
                      to="/trivia"
                      className="flex-1 px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors text-center"
                    >
                      More Trivia
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Photo Challenges */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Camera className="text-pink-600" size={20} />
              <span>Active Photo Challenges</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {activeChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden shadow-lg"
                >
                  <div className="flex">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {challenge.title}
                        </h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {challenge.description}
                      </p>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Users size={12} />
                            <span>{challenge.submissions}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart size={12} />
                            <span>{challenge.likes}</span>
                          </div>
                        </div>
                        <span>
                          Ends{" "}
                          {new Date(challenge.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePhotoSubmit(challenge)}
                        className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors text-xs font-medium flex items-center justify-center space-x-1"
                      >
                        <Upload size={12} />
                        <span>Submit</span>
                      </button>
                      <Link
                        to="/trivia"
                        className="flex-1 bg-amber-600 text-white py-2 px-3 rounded-lg hover:bg-amber-700 transition-colors text-xs font-medium text-center flex items-center justify-center"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Photo Modal */}
        {showSubmitPhoto && selectedChallenge && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Submit to "{selectedChallenge.title}"
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                      {photoSubmission.image ? (
                        <div className="space-y-2">
                          <img
                            src={URL.createObjectURL(photoSubmission.image)}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <p className="text-sm text-gray-600">
                            {photoSubmission.image.name}
                          </p>
                          <button
                            onClick={() =>
                              setPhotoSubmission({
                                ...photoSubmission,
                                image: null,
                              })
                            }
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload
                            className="mx-auto text-gray-400 mb-2"
                            size={32}
                          />
                          <p className="text-gray-600">Click to upload photo</p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 10MB
                          </p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caption
                    </label>
                    <textarea
                      value={photoSubmission.caption}
                      onChange={(e) =>
                        setPhotoSubmission({
                          ...photoSubmission,
                          caption: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Tell us about your photo..."
                      required
                    />
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex-shrink-0">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowSubmitPhoto(false);
                        setPhotoSubmission({ image: null, caption: "" });
                        setSelectedChallenge(null);
                      }}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitPhoto}
                      disabled={
                        !photoSubmission.image ||
                        !photoSubmission.caption.trim()
                      }
                      className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <Link
              to="/trivia"
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-1"
            >
              <Trophy size={14} />
              <span>Challenges</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/attendance"
              className="group flex items-center space-x-3 p-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <MapPin size={20} />
              </div>
              <span className="font-semibold">Check In</span>
            </Link>
            <Link
              to="/attendance"
              className="group flex items-center space-x-3 p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Calendar size={20} />
              </div>
              <span className="font-semibold">Apply Leave</span>
            </Link>
          </div>
        </div>

        {/* Notifications */}
        {/* Upcoming Leaves */}
        {upcomingLeaves.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Leaves</h2>
            <div className="space-y-2">
              {upcomingLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="p-4 bg-green-50/90 backdrop-blur-sm rounded-2xl border-2 border-green-200 shadow-lg shadow-green-200/50 transition-all duration-300 hover:scale-102"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {leave.type}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        {new Date(leave.startDate).toLocaleDateString()} -{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold bg-green-200 text-green-800 rounded-full shadow-sm">
                      Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's Calendar Preview */}
        <div className="bg-gradient-to-r from-yellow-100/80 to-amber-100/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-yellow-300 shadow-lg shadow-yellow-200/50">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Today's Schedule
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">
                Team Standup - 9:00 AM
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 bg-amber-600 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="text-sm font-medium text-gray-800">
                Project Review - 2:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
