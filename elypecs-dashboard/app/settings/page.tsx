"use client"

import { useState } from "react"
import {
  Bell,
  ChevronRight,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  FileText,
  Menu,
  X,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  Check,
  Globe,
  Key,
  Target,
  Layers,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>("performance")
  const [activeTab, setActiveTab] = useState("tours")
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: "success" | "error" | null }>({})

  // XR Tours State
  const [tours, setTours] = useState([
    {
      id: 1,
      name: "제품 A 전시관",
      url: "https://xr.samsung.com/product-a",
      status: true,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "브랜드 스토리",
      url: "https://xr.samsung.com/brand-story",
      status: true,
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      name: "기술 데모",
      url: "https://xr.samsung.com/tech-demo",
      status: false,
      lastUpdated: "2024-01-10",
    },
  ])

  // Goals State
  const [goals, setGoals] = useState({
    dailyVisitors: "1500",
    avgSessionTime: "5",
    conversionRate: "15",
    completionRate: "80",
  })

  // Notifications State
  const [notifications, setNotifications] = useState({
    trafficSpike: true,
    goalAchievement: true,
    systemError: true,
    weeklyReport: false,
    emailNotifications: true,
    alertThreshold: "50",
  })

  // Project Settings State
  const [projectSettings, setProjectSettings] = useState({
    defaultProject: "1",
    projectCreationPermission: true,
    dataRetentionPeriod: "365",
    urlValidation: true,
    allowedDomains: "samsung.com, lotte.com, hyundai.com",
    urlCheckInterval: "24",
  })

  // Project-specific notifications
  const [projectNotifications, setProjectNotifications] = useState({
    projectGoalAchievement: true,
    newTourAdded: true,
    performanceDrop: true,
    selectedProjects: ["1", "2"], // Array of project IDs
  })

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    language: "ko",
    timezone: "Asia/Seoul",
    refreshInterval: "30",
    theme: "dark",
  })

  const handleLogout = () => {
    router.push("/")
  }

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  const toggleTourStatus = (tourId: number) => {
    setTours(tours.map((tour) => (tour.id === tourId ? { ...tour, status: !tour.status } : tour)))
  }

  const handleSave = (section: string) => {
    setSaveStatus({ ...saveStatus, [section]: "success" })
    setTimeout(() => {
      setSaveStatus({ ...saveStatus, [section]: null })
    }, 3000)
  }

  const menuItems = [
    {
      id: "dashboard",
      title: "대시보드",
      icon: BarChart3,
      href: "/dashboard",
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
      icon: FileText,
    },
    {
      id: "settings",
      title: "설정",
      icon: Settings,
      active: true,
    },
  ]

  const tabs = [
    { id: "tours", label: "XR 투어 관리", icon: Globe },
    { id: "projects", label: "프로젝트 설정", icon: Layers },
    { id: "goals", label: "목표 설정", icon: Target },
    { id: "notifications", label: "알림 설정", icon: Bell },
    { id: "account", label: "계정 관리", icon: Users },
    { id: "system", label: "시스템 설정", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-wider">ELYPECS</h1>
              <span className="text-slate-400 text-sm hidden sm:block">XR 마케팅 솔루션</span>
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">김</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm font-medium">김담당자</p>
                <p className="text-slate-400 text-xs">삼성전자</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-70 h-screen pt-16 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out ${
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
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
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
                      className="w-full flex items-center px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg transition-colors"
                    >
                      <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
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
      <main className="lg:ml-70 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-slate-400 hover:text-white transition-colors"
              >
                대시보드
              </button>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span className="text-white">설정</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">설정</h1>
            <p className="text-slate-400">ELYPECS XR 마케팅 솔루션 설정을 관리하세요</p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-slate-700">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-400"
                        : "border-transparent text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* XR Tours Management */}
            {activeTab === "tours" && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">XR 투어 관리</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />새 투어 추가
                  </button>
                </div>
                <div className="space-y-4">
                  {tours.map((tour) => (
                    <div key={tour.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{tour.name}</h3>
                        <p className="text-slate-400 text-sm">{tour.url}</p>
                        <p className="text-slate-500 text-xs mt-1">마지막 업데이트: {tour.lastUpdated}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">상태:</span>
                          <button
                            onClick={() => toggleTourStatus(tour.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              tour.status ? "bg-blue-600" : "bg-slate-600"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                tour.status ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Settings */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                {/* Basic Project Settings */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">기본 프로젝트 설정</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">기본 선택 프로젝트</label>
                      <select
                        value={projectSettings.defaultProject}
                        onChange={(e) => setProjectSettings({ ...projectSettings, defaultProject: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="all">전체 프로젝트</option>
                        <option value="1">삼성전자 갤럭시 체험관</option>
                        <option value="2">현대건설 힐스테이트 모델하우스</option>
                        <option value="3">롯데백화점 팝업스토어</option>
                      </select>
                      <p className="text-slate-400 text-xs mt-1">로그인 시 자동으로 선택될 프로젝트입니다</p>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">데이터 보관 기간</label>
                      <div className="relative">
                        <select
                          value={projectSettings.dataRetentionPeriod}
                          onChange={(e) =>
                            setProjectSettings({ ...projectSettings, dataRetentionPeriod: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="90">90일</option>
                          <option value="180">180일</option>
                          <option value="365">1년</option>
                          <option value="730">2년</option>
                          <option value="unlimited">무제한</option>
                        </select>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">프로젝트 데이터 보관 기간을 설정합니다</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div>
                        <span className="text-slate-300 font-medium">프로젝트 생성 권한</span>
                        <p className="text-slate-400 text-sm">새로운 프로젝트 생성을 허용합니다</p>
                      </div>
                      <button
                        onClick={() =>
                          setProjectSettings({
                            ...projectSettings,
                            projectCreationPermission: !projectSettings.projectCreationPermission,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          projectSettings.projectCreationPermission ? "bg-blue-600" : "bg-slate-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            projectSettings.projectCreationPermission ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* XR TOUR URL Validation Settings */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">XR TOUR URL 검증 설정</h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div>
                        <span className="text-slate-300 font-medium">URL 유효성 검사</span>
                        <p className="text-slate-400 text-sm">XR TOUR URL의 유효성을 자동으로 검사합니다</p>
                      </div>
                      <button
                        onClick={() =>
                          setProjectSettings({ ...projectSettings, urlValidation: !projectSettings.urlValidation })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          projectSettings.urlValidation ? "bg-blue-600" : "bg-slate-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            projectSettings.urlValidation ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">허용 도메인 목록</label>
                      <textarea
                        value={projectSettings.allowedDomains}
                        onChange={(e) => setProjectSettings({ ...projectSettings, allowedDomains: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="samsung.com, lotte.com, hyundai.com"
                        rows={3}
                      />
                      <p className="text-slate-400 text-xs mt-1">
                        쉼표로 구분하여 허용할 도메인을 입력하세요 (보안 강화)
                      </p>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">URL 접근성 자동 체크 주기</label>
                      <div className="relative max-w-xs">
                        <select
                          value={projectSettings.urlCheckInterval}
                          onChange={(e) => setProjectSettings({ ...projectSettings, urlCheckInterval: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="1">1시간</option>
                          <option value="6">6시간</option>
                          <option value="12">12시간</option>
                          <option value="24">24시간</option>
                          <option value="168">1주일</option>
                          <option value="disabled">비활성화</option>
                        </select>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">XR TOUR URL의 접근 가능 여부를 자동으로 확인합니다</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSave("projects")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    저장
                  </button>
                  {saveStatus.projects === "success" && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      저장되었습니다
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Goal Settings */}
            {activeTab === "goals" && (
              <div className="space-y-6">
                {/* Project Selection for Goals */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">목표 설정 범위</h2>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">목표를 설정할 프로젝트</label>
                    <select className="w-full max-w-md px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors">
                      <option value="all">전체 프로젝트 (통합 목표)</option>
                      <option value="1">삼성전자 갤럭시 체험관</option>
                      <option value="2">현대건설 힐스테이트 모델하우스</option>
                      <option value="3">롯데백화점 팝업스토어</option>
                    </select>
                    <p className="text-slate-400 text-xs mt-1">
                      개별 프로젝트 또는 전체 프로젝트에 대한 목표를 설정할 수 있습니다
                    </p>
                  </div>
                </div>

                {/* Existing goals content */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">성과 목표</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">일일 방문자 목표</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={goals.dailyVisitors}
                            onChange={(e) => setGoals({ ...goals, dailyVisitors: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="1500"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                            명
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">평균 체류시간 목표</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={goals.avgSessionTime}
                            onChange={(e) => setGoals({ ...goals, avgSessionTime: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="5"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                            분
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">전환율 목표</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={goals.conversionRate}
                            onChange={(e) => setGoals({ ...goals, conversionRate: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="15"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                            %
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">완주율 목표</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={goals.completionRate}
                            onChange={(e) => setGoals({ ...goals, completionRate: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="80"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => handleSave("goals")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      저장
                    </button>
                    {saveStatus.goals === "success" && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <Check className="w-4 h-4" />
                        저장되었습니다
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">알림 설정</h2>
                <div className="space-y-8">
                  {/* General Notifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">일반 알림</h3>
                    {[
                      { key: "trafficSpike", label: "실시간 접속자 급증 알림" },
                      { key: "systemError", label: "시스템 오류 알림" },
                      { key: "weeklyReport", label: "주간 리포트 자동 발송" },
                      { key: "emailNotifications", label: "이메일 알림 활성화" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                        <span className="text-slate-300">{item.label}</span>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key as keyof typeof notifications],
                            })
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? "bg-blue-600" : "bg-slate-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Project-Specific Notifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">프로젝트별 알림</h3>
                    {[
                      { key: "projectGoalAchievement", label: "프로젝트별 목표 달성 알림" },
                      { key: "newTourAdded", label: "새 XR TOUR 추가 시 알림" },
                      { key: "performanceDrop", label: "프로젝트 성과 급락 시 알림" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                        <span className="text-slate-300">{item.label}</span>
                        <button
                          onClick={() =>
                            setProjectNotifications({
                              ...projectNotifications,
                              [item.key]: !projectNotifications[item.key as keyof typeof projectNotifications],
                            })
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            projectNotifications[item.key as keyof typeof projectNotifications]
                              ? "bg-blue-600"
                              : "bg-slate-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              projectNotifications[item.key as keyof typeof projectNotifications]
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}

                    {/* Project Selection for Notifications */}
                    <div className="mt-6">
                      <label className="block text-slate-300 text-sm font-medium mb-3">알림 받을 프로젝트 선택</label>
                      <div className="space-y-2">
                        {[
                          { id: "1", name: "삼성전자 갤럭시 체험관" },
                          { id: "2", name: "현대건설 힐스테이트 모델하우스" },
                          { id: "3", name: "롯데백화점 팝업스토어" },
                        ].map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg"
                          >
                            <span className="text-slate-300">{project.name}</span>
                            <button
                              onClick={() => {
                                const isSelected = projectNotifications.selectedProjects.includes(project.id)
                                const updatedProjects = isSelected
                                  ? projectNotifications.selectedProjects.filter((id) => id !== project.id)
                                  : [...projectNotifications.selectedProjects, project.id]
                                setProjectNotifications({
                                  ...projectNotifications,
                                  selectedProjects: updatedProjects,
                                })
                              }}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                projectNotifications.selectedProjects.includes(project.id)
                                  ? "bg-blue-600"
                                  : "bg-slate-600"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  projectNotifications.selectedProjects.includes(project.id)
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Alert Threshold */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      알림 임계값 (동시 접속자 수)
                    </label>
                    <div className="relative max-w-xs">
                      <input
                        type="number"
                        value={notifications.alertThreshold}
                        onChange={(e) => setNotifications({ ...notifications, alertThreshold: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="50"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                        명
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => handleSave("notifications")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    저장
                  </button>
                  {saveStatus.notifications === "success" && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      저장되었습니다
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Management */}
            {activeTab === "account" && (
              <div className="space-y-6">
                {/* User Profile */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">사용자 프로필</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">이름</label>
                      <input
                        type="text"
                        value="김담당자"
                        disabled
                        className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">이메일</label>
                      <input
                        type="email"
                        value="kim@samsung.com"
                        disabled
                        className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">회사</label>
                      <input
                        type="text"
                        value="삼성전자"
                        disabled
                        className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">직무</label>
                      <input
                        type="text"
                        value="마케팅"
                        disabled
                        className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* API Key Management */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">API 키 관리</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Production API Key</h3>
                        <p className="text-slate-400 text-sm">elypecs_prod_****************************</p>
                        <p className="text-slate-500 text-xs mt-1">생성일: 2024-01-01</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                          <Key className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />새 API 키 생성
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === "system" && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">시스템 설정</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">언어 설정</label>
                    <select
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">시간대 설정</label>
                    <select
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">데이터 새로고침 주기</label>
                    <div className="relative">
                      <select
                        value={systemSettings.refreshInterval}
                        onChange={(e) => setSystemSettings({ ...systemSettings, refreshInterval: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="10">10초</option>
                        <option value="30">30초</option>
                        <option value="60">1분</option>
                        <option value="300">5분</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">테마 설정</label>
                    <select
                      value={systemSettings.theme}
                      onChange={(e) => setSystemSettings({ ...systemSettings, theme: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="dark">다크 테마</option>
                      <option value="light">라이트 테마</option>
                      <option value="auto">시스템 설정 따름</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => handleSave("system")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    저장
                  </button>
                  {saveStatus.system === "success" && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      저장되었습니다
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
