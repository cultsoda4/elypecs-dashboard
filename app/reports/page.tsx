"use client"

import { useState } from "react"
import {
  Bell,
  ChevronRight,
  BarChart3,
  Users,
  TrendingUp,
  Eye,
  Settings,
  FileText,
  Menu,
  X,
  ArrowUp,
  ArrowDown,
  Clock,
  Target,
  LogOut,
  Globe,
  Filter,
  Download,
  MoreVertical,
  Layers,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts"

// Sample data
const sampleProjects = [
  {
    id: 1,
    name: "삼성전자 갤럭시 체험관",
    description: "갤럭시 신제품 체험을 위한 XR 전시관",
    tours: [
      { id: 101, name: "갤럭시 S24 체험존", visitors: 2145, conversionRate: 15.2 },
      { id: 102, name: "갤럭시 폴드 체험존", visitors: 1876, conversionRate: 12.8 },
      { id: 103, name: "갤럭시 워치 체험존", visitors: 561, conversionRate: 8.5 },
    ],
  },
  {
    id: 2,
    name: "현대건설 힐스테이트 모델하우스",
    description: "힐스테이트 아파트 VR 모델하우스",
    tours: [
      { id: 201, name: "84A 타입 모델하우스", visitors: 1845, conversionRate: 22.1 },
      { id: 202, name: "59B 타입 모델하우스", visitors: 1400, conversionRate: 18.7 },
    ],
  },
  {
    id: 3,
    name: "롯데백화점 팝업스토어",
    description: "롯데백화점 VR 팝업스토어 체험",
    tours: [{ id: 301, name: "명품관 팝업스토어", visitors: 876, conversionRate: 8.5 }],
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [dashboardMode, setDashboardMode] = useState<"all" | "single" | "compare">("all")

  // 기간 선택 상태 추가
  const [dateRange, setDateRange] = useState<string>("today")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  // 알림 모달 상태 추가
  const [showNotifications, setShowNotifications] = useState(false)

  // 알림 데이터 추가
  const notifications = [
    {
      id: 1,
      title: "사용자가 어제보다 30% 늘었습니다",
      message: "오늘 방문자 수가 1,247명으로 어제 대비 30% 증가했습니다.",
      time: "5분 전",
      type: "increase",
      read: false,
    },
    {
      id: 2,
      title: "인기 씬이 새로 갱신되었습니다",
      message: "제품 A 전시관이 새로운 인기 씬 1위로 선정되었습니다.",
      time: "1시간 전",
      type: "update",
      read: false,
    },
    {
      id: 3,
      title: "전환율이 목표치를 달성했습니다",
      message: "삼성전자 갤럭시 체험관의 전환율이 15%를 달성했습니다.",
      time: "3시간 전",
      type: "achievement",
      read: true,
    },
  ]

  const handleLogout = () => {
    router.push("/")
  }

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  // Chart Data
  const funnelData = [
    { name: "콘텐츠 진입", value: 1247, percentage: 100, fill: "#673ab7" },
    { name: "씬 체험", value: 1122, percentage: 90, fill: "#7c4dff" },
    { name: "마커 상호작용", value: 748, percentage: 60, fill: "#9c27b0" },
    { name: "CTA 클릭", value: 374, percentage: 30, fill: "#e91e63" },
    { name: "최종 전환", value: 125, percentage: 10, fill: "#f44336" },
  ]

  const visitorTrendData = [
    { day: "Day 1", visitors: 892, date: "12/01" },
    { day: "Day 2", visitors: 1045, date: "12/02" },
    { day: "Day 3", visitors: 978, date: "12/03" },
    { day: "Day 4", visitors: 1156, date: "12/04" },
    { day: "Day 5", visitors: 1089, date: "12/05" },
    { day: "Day 6", visitors: 1203, date: "12/06" },
    { day: "Day 7", visitors: 1247, date: "12/07" },
  ]

  const popularScenesData = [
    { name: "제품 A 전시관", visitors: 456 },
    { name: "브랜드 스토리", visitors: 389 },
    { name: "기술 데모", visitors: 342 },
    { name: "고객 후기", visitors: 298 },
    { name: "문의하기", visitors: 267 },
  ]

  const deviceData = [
    { name: "Mobile", value: 60, color: "#673ab7" },
    { name: "Desktop", value: 35, color: "#7c4dff" },
    { name: "Tablet", value: 5, color: "#9c27b0" },
  ]

  const geographicData = [
    { region: "서울", percentage: 35.2, visitors: 439 },
    { region: "경기", percentage: 22.8, visitors: 284 },
    { region: "부산", percentage: 12.4, visitors: 155 },
    { region: "대구", percentage: 8.9, visitors: 111 },
    { region: "기타", percentage: 20.7, visitors: 258 },
  ]

  const recentActivities = [
    {
      time: "2분 전",
      action: "새로운 사용자가 VR 체험을 시작했습니다",
      details: "제품 A 전시관",
      type: "start",
    },
    {
      time: "5분 전",
      action: "전환이 발생했습니다",
      details: "문의하기 → 상담 신청",
      type: "conversion",
    },
    {
      time: "8분 전",
      action: "높은 참여도 세션이 감지되었습니다",
      details: "8분 32초 체험 시간",
      type: "engagement",
    },
    {
      time: "12분 전",
      action: "마커 상호작용이 발생했습니다",
      details: "기술 데모 섹션",
      type: "interaction",
    },
  ]

  const kpiData = [
    {
      title: "실시간 사용자",
      value: "47",
      change: "+12%",
      changeType: "increase" as const,
      subtitle: "어제 대비",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      bgColor: "bg-blue-500",
    },
    {
      title: "오늘 방문자",
      value: "1,247",
      change: "+23%",
      changeType: "increase" as const,
      subtitle: "어제 대비",
      icon: Eye,
      color: "bg-green-50 text-green-600",
      bgColor: "bg-green-500",
    },
    {
      title: "평균 세션 시간",
      value: "4분 32초",
      change: "+8%",
      changeType: "increase" as const,
      subtitle: "지난주 대비",
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
      bgColor: "bg-orange-500",
    },
    {
      title: "전환율",
      value: "12.8%",
      change: "-2%",
      changeType: "decrease" as const,
      subtitle: "지난주 대비",
      icon: Target,
      color: "bg-purple-50 text-purple-600",
      bgColor: "bg-purple-500",
    },
  ]

  const menuItems = [
    {
      id: "dashboard",
      title: "대시보드",
      icon: BarChart3,
      active: true,
    },
    {
      id: "projects",
      title: "프로젝트 관리",
      icon: Layers,
      href: "/projects",
    },
    {
      id: "performance",
      title: "성과 분석",
      icon: TrendingUp,
      submenu: [
        { id: "visitor-analysis", title: "방문자 분석" },
        { id: "content-experience", title: "콘텐츠 체험 분석" },
        { id: "interaction-analysis", title: "상호작용 분석" },
      ],
    },
    {
      id: "conversion",
      title: "전환 성과",
      icon: Target,
    },
    {
      id: "user-behavior",
      title: "사용자 행동 인사이트",
      icon: Users,
    },
    {
      id: "reports",
      title: "리포트",
      icon: FileText
      href: "/reports",
    },
    {
      id: "settings",
      title: "설정",
      icon: Settings,
      href: "/settings",
    },
  ]

  // Custom Tooltip Components
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-gray-600 text-sm">{`${label}`}</p>
          <p className="text-purple-600 font-semibold">{`방문자: ${payload[0].value.toLocaleString()}명`}</p>
        </div>
      )
    }
    return null
  }

  const FunnelTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-gray-600 text-sm">{data.name}</p>
          <p className="text-purple-600 font-semibold">{`${data.value.toLocaleString()}명 (${data.percentage}%)`}</p>
        </div>
      )
    }
    return null
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "start":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case "conversion":
        return <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
      case "engagement":
        return <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
      case "interaction":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">E</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800 tracking-wider">ELYPECS</h1>
                <span className="text-gray-500 text-sm hidden sm:block">XR 마케팅 솔루션</span>
              </div>

              {/* Project Selector */}
              <div className="relative ml-6">
                <select
                  value={selectedProject}
                  onChange={(e) => {
                    const value = e.target.value
                    setSelectedProject(value)
                    if (value === "all") setDashboardMode("all")
                    else if (value === "compare") setDashboardMode("compare")
                    else setDashboardMode("single")
                  }}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[200px]"
                >
                  <option value="all">전체 프로젝트</option>
                  {sampleProjects.map((project) => (
                    <option key={project.id} value={project.id.toString()}>
                      {project.name}
                    </option>
                  ))}
                  <option value="compare">프로젝트별 비교</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Notification Modal */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">알림</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === "increase"
                                ? "bg-green-500"
                                : notification.type === "update"
                                  ? "bg-blue-500"
                                  : "bg-purple-500"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="text-sm text-purple-600 hover:text-purple-700">모든 알림 보기</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">김</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-800 text-sm font-medium">김담당자</p>
                <p className="text-gray-500 text-xs">삼성전자</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Overlay */}
      {showNotifications && <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.href) {
                    router.push(item.href)
                  } else if (item.submenu) {
                    toggleSubmenu(item.id)
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.submenu && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMenu === item.id ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedMenu === item.id && (
                <div className="mt-2 ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-20">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">대시보드</h1>
                <p className="text-gray-600">
                  {dashboardMode === "all"
                    ? "전체 프로젝트의 실시간 성과를 확인하세요"
                    : dashboardMode === "single"
                      ? `${sampleProjects.find((p) => p.id.toString() === selectedProject)?.name}의 실시간 성과를 확인하세요`
                      : "프로젝트별 성과를 비교해보세요"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Date Range Selector */}
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => {
                      setDateRange(e.target.value)
                      if (e.target.value !== "custom") {
                        setShowDatePicker(false)
                      } else {
                        setShowDatePicker(true)
                      }
                    }}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="today">어제</option>
                    <option value="7days">지난 7일</option>
                    <option value="30days">지난 30일</option>
                    <option value="custom">기간 입력</option>
                  </select>

                  {/* Custom Date Picker */}
                  {showDatePicker && (
                    <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-80">
                      <h4 className="text-sm font-medium text-gray-800 mb-3">기간 선택</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">시작일</label>
                          <input
                            type="date"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">종료일</label>
                          <input
                            type="date"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => setShowDatePicker(false)}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => setShowDatePicker(false)}
                          className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                        >
                          적용
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  필터
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Download className="w-4 h-4" />
                  내보내기
                </button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${kpi.color}`}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">{kpi.value}</h3>
                  <p className="text-gray-600 text-sm font-medium">{kpi.title}</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                        kpi.changeType === "increase" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                      }`}
                    >
                      {kpi.changeType === "increase" ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      {kpi.change}
                    </div>
                    <span className="text-gray-500 text-xs">{kpi.subtitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Conversion Funnel Chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">전환 퍼널</h2>
                  <p className="text-gray-500 text-sm">사용자 여정별 전환율</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                    <Tooltip content={<FunnelTooltip />} />
                    <Bar dataKey="value" fill="#673ab7" radius={[0, 4, 4, 0]}>
                      <LabelList
                        dataKey="percentage"
                        position="right"
                        fill="#374151"
                        formatter={(value: number) => `${value}%`}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 7-Day Visitor Trend */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">7일간 방문자 추이</h2>
                  <p className="text-gray-500 text-sm">일별 방문자 변화</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorTrendData}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#673ab7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#673ab7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#673ab7"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Top 5 Popular Scenes */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">인기 씬 TOP 5</h2>
                  <p className="text-gray-500 text-sm">가장 많이 방문한 씬</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={popularScenesData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" stroke="#6b7280" width={80} />
                    <Tooltip
                      content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                              <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
                              <p className="text-purple-600 font-semibold">{`${payload[0].value}명`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="visitors" fill="#673ab7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Distribution */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">디바이스 분포</h2>
                  <p className="text-gray-500 text-sm">접속 디바이스별 비율</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                              <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
                              <p className="text-purple-600 font-semibold">{`${payload[0].value}%`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                      <span className="text-gray-700 text-sm font-medium">{device.name}</span>
                    </div>
                    <span className="text-gray-800 font-semibold">{device.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">지역별 분포</h2>
                  <p className="text-gray-500 text-sm">방문자 지역 분석</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {geographicData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700 font-medium">{region.region}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800 font-semibold">{region.percentage}%</p>
                      <p className="text-gray-500 text-xs">{region.visitors}명</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project-Specific Widgets */}
          {dashboardMode === "single" && (
            <div className="space-y-8">
              {/* XR TOUR별 성과 섹션 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">XR TOUR별 성과</h2>
                    <p className="text-gray-500 text-sm">개별 투어 성과 분석</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* XR TOUR 성과 비교 */}
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-4">투어별 방문자 수</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sampleProjects.find((p) => p.id.toString() === selectedProject)?.tours || []}
                          layout="horizontal"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                          <XAxis type="number" stroke="#6b7280" />
                          <YAxis dataKey="name" type="category" stroke="#6b7280" width={120} />
                          <Tooltip
                            content={({ active, payload }: any) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                                    <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
                                    <p className="text-purple-600 font-semibold">{`${payload[0].value.toLocaleString()}명`}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Bar dataKey="visitors" fill="#673ab7" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 투어별 전환율 비교 */}
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-4">투어별 전환율</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sampleProjects.find((p) => p.id.toString() === selectedProject)?.tours || []}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                          <XAxis dataKey="name" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                          <YAxis stroke="#6b7280" />
                          <Tooltip
                            content={({ active, payload }: any) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                                    <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
                                    <p className="text-green-600 font-semibold">{`${payload[0].value}%`}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Bar dataKey="conversionRate" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Comparison View */}
          {dashboardMode === "compare" && (
            <div className="space-y-8">
              {/* Project Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{project.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">투어 수:</span>
                        <span className="text-gray-800 font-semibold">{project.tours.length}개</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">총 방문자:</span>
                        <span className="text-gray-800 font-semibold">
                          {project.tours.reduce((sum, tour) => sum + tour.visitors, 0).toLocaleString()}명
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">평균 전환율:</span>
                        <span className="text-gray-800 font-semibold">
                          {(
                            project.tours.reduce((sum, tour) => sum + tour.conversionRate, 0) / project.tours.length
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparative Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* 프로젝트별 방문자 비교 */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">프로젝트별 총 방문자</h2>
                      <p className="text-gray-500 text-sm">프로젝트 방문자 비교</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sampleProjects.map((project) => ({
                          name: project.name.split(" ")[0] + "...",
                          visitors: project.tours.reduce((sum, tour) => sum + tour.visitors, 0),
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          content={({ active, payload }: any) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                                  <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
                                  <p className="text-purple-600 font-semibold">{`${payload[0].value.toLocaleString()}명`}</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="visitors" fill="#673ab7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 프로젝트별 평균 전환율 비교 */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">프로젝트별 평균 전환율</h2>
                      <p className="text-gray-500 text-sm">프로젝트 전환율 비교</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sampleProjects.map((project) => ({
                          name: project.name.split(" ")[0] + "...",
                          conversionRate:
                            project.tours.reduce((sum, tour) => sum + tour.conversionRate, 0) / project.tours.length,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          content={({ active, payload }: any) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                                  <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
                                  <p className="text-green-600 font-semibold">{`${payload[0].value.toFixed(1)}%`}</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="conversionRate" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">실시간 활동</h2>
                <p className="text-gray-500 text-sm">최근 사용자 활동 내역</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="mt-2 flex-shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.details}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
