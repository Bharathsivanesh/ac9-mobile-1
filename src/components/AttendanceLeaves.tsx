import React, { useState } from "react";
import {
  Clock,
  Calendar,
  Plus,
  CheckCircle,
  XCircle,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { MockApi } from "../services/mockApi";

const AttendanceLeaves = () => {
  const { state, dispatch } = useAppContext();
  const { user, leaves } = state;
  const [activeTab, setActiveTab] = useState<"attendance" | "leaves">(
    "attendance"
  );
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadAttendanceData = async () => {
      try {
        const data = await MockApi.getAttendanceHistory(user.id);
        setAttendanceData(data);
      } catch (error) {
        console.error("Failed to load attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendanceData();
  }, [user.id]);
  const leaveTypes = [
    "Annual Leave",
    "Sick Leave",
    "Personal Leave",
    "Emergency Leave",
  ];

  const handleCheckIn = async () => {
    try {
      await MockApi.checkIn("location");
      dispatch({ type: "CHECK_IN", method: "location" });
    } catch (error) {
      console.error("Failed to check in:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await MockApi.checkOut();
      dispatch({ type: "CHECK_OUT" });
    } catch (error) {
      console.error("Failed to check out:", error);
    }
  };

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.startDate && formData.endDate && formData.reason) {
      try {
        await MockApi.createLeave(formData);
        dispatch({ type: "ADD_LEAVE", leave: formData });
        setFormData({
          type: "Annual Leave",
          startDate: "",
          endDate: "",
          reason: "",
        });
        setShowLeaveForm(false);
      } catch (error) {
        console.error("Failed to submit leave:", error);
      }
    }
  };

  // Group data by weeks
  const groupByWeeks = (data: any[]) => {
    const weeks = [];
    for (let i = 0; i < data.length; i += 7) {
      weeks.push(data.slice(i, i + 7));
    }
    return weeks;
  };

  const weeks = groupByWeeks(attendanceData);

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100";
      case 1:
        return "bg-yellow-300";
      case 2:
        return "bg-yellow-300";
      case 3:
        return "bg-yellow-300";
      case 4:
        return "bg-yellow-300";
      default:
        return "bg-gray-100";
    }
  };

  const getContributionTooltip = (day: any) => {
    if (day.isWeekend) return "Weekend";
    if (day.level === 0) return `${day.date}: No attendance`;
    return `${day.date}: ${day.hours} hours`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-600" size={16} />;
      case "rejected":
        return <XCircle className="text-red-600" size={16} />;
      default:
        return <Clock className="text-yellow-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  // Calculate stats
  const totalDays = attendanceData.filter(
    (d) => !d.isWeekend && d.date <= new Date().toISOString().split("T")[0]
  ).length;
  const presentDays = attendanceData.filter((d) => d.level > 0).length;
  const attendanceRate =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = attendanceData.length - 1; i >= 0; i--) {
      const day = attendanceData[i];
      if (day.isWeekend || day.date > new Date().toISOString().split("T")[0])
        continue;
      if (day.level > 0) streak++;
      else break;
    }
    return streak;
  })();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
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
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Time & Attendance
          </h1>
          <p className="text-gray-600 mt-1">
            Track your presence and manage leaves
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === "attendance"
                ? "bg-white text-yellow-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Clock size={18} />
            <span>Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab("leaves")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === "leaves"
                ? "bg-white text-yellow-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Calendar size={18} />
            <span>Leaves</span>
          </button>
        </div>

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            {/* Quick Action */}
            <div className="text-center">
              <button
                onClick={user.isCheckedIn ? handleCheckOut : handleCheckIn}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all shadow-lg ${
                  user.isCheckedIn
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-yellow-600 hover:bg-yellow-700 text-white hover:scale-105"
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Clock size={24} />
                  <span>{user.isCheckedIn ? "Check Out" : "Check In"}</span>
                </div>
                {user.lastCheckIn && user.isCheckedIn && (
                  <p className="text-sm opacity-90 mt-1">
                    Since{" "}
                    {new Date(user.lastCheckIn).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
                <TrendingUp className="text-green-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-gray-900">
                  {attendanceRate}%
                </p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
                <Calendar className="text-purple-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-gray-900">
                  {presentDays}
                </p>
                <p className="text-sm text-gray-600">Days Present</p>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
                <Clock className="text-blue-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-gray-900">8.2</p>
                <p className="text-sm text-gray-600">Avg Hours</p>
              </div>
            </div>

            {/* GitHub-style Contributions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Attendance Pattern
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Less</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                    <div className="w-3 h-3 bg-yellow-300 rounded-sm"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>

              {/* Contribution Grid */}
              <div className="overflow-x-auto">
                <div className="flex space-x-1 min-w-max">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col space-y-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm transition-all hover:scale-110 cursor-pointer ${getContributionColor(
                            day.level
                          )} ${day.isToday ? "ring-2 ring-yellow-600" : ""}`}
                          title={getContributionTooltip(day)}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>{presentDays} days of attendance in the last year</p>
              </div>
            </div>

            {/* Month Labels */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-4 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-3">
                This Month Summary
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Working Days:</span>
                  <span className="font-medium">22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Present:</span>
                  <span className="font-medium text-green-600">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Late Arrivals:</span>
                  <span className="font-medium text-yellow-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Early Leaves:</span>
                  <span className="font-medium text-orange-600">1</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaves Tab */}
        {activeTab === "leaves" && (
          <div className="space-y-6">
            {/* Header with Apply Button */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Leave Management
                </h2>
                <p className="text-sm text-gray-600">
                  Apply and track your leave requests
                </p>
              </div>
              <button
                onClick={() => setShowLeaveForm(true)}
                className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors shadow-lg"
              >
                <Plus size={18} />
                <span>Apply</span>
              </button>
            </div>

            {/* Leave Balance Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 text-center shadow-lg">
                <p className="text-2xl font-bold text-blue-600">5</p>
                <p className="text-sm text-gray-600">Used</p>
              </div>
              <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
                <p className="text-2xl font-bold text-yellow-600">1</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>

            {/* Leave Requests */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Requests
              </h3>
              <div className="space-y-3">
                {leaves.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                    <Calendar
                      size={48}
                      className="mx-auto mb-4 text-gray-300"
                    />
                    <p className="text-lg font-medium">No leave requests</p>
                    <p className="text-sm">
                      Click "Apply" to submit your first request
                    </p>
                  </div>
                ) : (
                  leaves.map((leave) => (
                    <div
                      key={leave.id}
                      className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {leave.type}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(leave.startDate).toLocaleDateString()} -{" "}
                            {new Date(leave.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            {leave.reason}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(leave.status)}
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              leave.status
                            )}`}
                          >
                            {leave.status.charAt(0).toUpperCase() +
                              leave.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <span>
                          Applied:{" "}
                          {new Date(leave.appliedDate).toLocaleDateString()}
                        </span>
                        <span>
                          {Math.ceil(
                            (new Date(leave.endDate).getTime() -
                              new Date(leave.startDate).getTime()) /
                              (1000 * 60 * 60 * 24) +
                              1
                          )}{" "}
                          day(s)
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Leave Form Modal */}
        {showLeaveForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Apply for Leave
              </h2>

              <form onSubmit={handleSubmitLeave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Please provide a reason for your leave..."
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLeaveForm(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceLeaves;
