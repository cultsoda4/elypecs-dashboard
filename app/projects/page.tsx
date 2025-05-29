"use client"

import type React from "react"
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
  Eye,
  Target,
  Calendar,
  Layers,
  User,
  Tag,
  LinkIcon,
  ArrowLeft,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Sample data for projects
const sampleProjects = [
  {
    id: 1,
    name: "삼성전자 갤럭시 체험관",
    description: "갤럭시 신제품 체험을 위한 XR 전시관",
    createdAt: "2024-01-05",
    manager: "김담당자",
    category: "전시",
    status: true,
    tourCount: 3,
    totalVisitors: 4582,
    tours: [
      {
        id: 101,
        name: "갤럭시 S24 체험존",
        url: "https://xr.samsung.com/galaxy-s24",
        createdAt: "2024-01-10",
        status: true,
        visitors: 2145,
      },
      {
        id: 102,
        name: "갤럭시 폴드 체험존",
        url: "https://xr.samsung.com/galaxy-fold",
        createdAt: "2024-01-12",
        status: true,
        visitors: 1876,
      },
      {
        id: 103,
        name: "갤럭시 워치 체험존",
        url: "https://xr.samsung.com/galaxy-watch",
        createdAt: "2024-01-15",
        status: false,
        visitors: 561,
      },
    ],
    stats: {
      avgSessionTime: "4분 12초",
      conversionRate: "12.8%",
    },
  },
  {
    id: 2,
    name: "현대건설 힐스테이트 모델하우스",
    description: "힐스테이트 아파트 VR 모델하우스",
    createdAt: "2024-01-12",
    manager: "박매니저",
    category: "부동산",
    status: true,
    tourCount: 2,
    totalVisitors: 3245,
    tours: [
      {
        id: 201,
        name: "84A 타입 모델하우스",
        url: "https://xr.hillstate.com/84a",
        createdAt: "2024-01-15",
        status: true,
        visitors: 1845,
      },
      {
        id: 202,
        name: "59B 타입 모델하우스",
        url: "https://xr.hillstate.com/59b",
        createdAt: "2024-01-15",
        status: true,
        visitors: 1400,
      },
    ],
    stats: {
      avgSessionTime: "5분 45초",
      conversionRate: "18.2%",
    },
  },
  {
    id: 3,
    name: "롯데백화점 팝업스토어",
    description: "롯데백화점 VR 팝업스토어 체험",
    createdAt: "2024-01-20",
    manager: "이담당자",
    category: "리테일",
    status: false,
    tourCount: 1,
    totalVisitors: 876,
    tours: [
      {
        id: 301,
        name: "명품관 팝업스토어",
        url: "https://xr.lotte.com/popup",
        createdAt: "2024-01-20",
        status: false,
        visitors: 876,
      },
    ],
    stats: {
      avgSessionTime: "3분 22초",
      conversionRate: "8.5%",
    },
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  // Project state
  const [projects, setProjects] = useState(sampleProjects)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  // Modal states
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const [newTourModalOpen, setNewTourModalOpen] = useState(false)

  // Form states
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    manager: "김담당자",
    category: "",
  })

  const [newTour, setNewTour] = useState({
    name: "",
    url: "",
    description: "",
    category: "",
    visitorGoal: "",
    conversionGoal: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleLogout = () => {
    router.push("/")
  }

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  const getSelectedProject = () => {
    return projects.find((project) => project.id === selectedProject) || null
  }

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors: Record<string, string> = {}
    if (!newProject.name.trim()) {
      errors.name = "프로젝트명을 입력해주세요"
    }
    if (!newProject.category) {
      errors.category = "카테고리를 선택해주세요"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Create new project
    const newId = Math.max(...projects.map((p) => p.id)) + 1
    const createdProject = {
      id: newId,
      name: newProject.name,
      description: newProject.description,
      createdAt: new Date().toISOString().split("T")[0],
      manager: newProject.manager,
      category: newProject.category,
      status: true,
      tourCount: 0,
      totalVisitors: 0,
      tours: [],
      stats: {
        avgSessionTime: "0분 0초",
        conversionRate: "0%",
      },
    }

    setProjects([...projects, createdProject])
    setNewProjectModalOpen(false)
    setNewProject({
      name: "",
      description: "",
      manager: "김담당자",
      category: "",
    })
    setFormErrors({})
  }

  const handleCreateTour = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors: Record<string, string> = {}
    if (!newTour.name.trim()) {
      errors.tourName = "투어명을 입력해주세요"
    }
    if (!newTour.url.trim()) {
      errors.tourUrl = "URL을 입력해주세요"
    } else if (!/^https?:\/\/.+/.test(newTour.url)) {
      errors.tourUrl = "유효한 URL을 입력해주세요 (http:// 또는 https://로 시작)"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Add tour to selected project
    if (selectedProject) {
      const updatedProjects = projects.map((project) => {
        if (project.id === selectedProject) {
          const newTourId =
            project.tours.length > 0 ? Math.max(...project.tours.map((t) => t.id)) + 1 : project.id * 100 + 1

          const newTourObj = {
            id: newTourId,
            name: newTour.name,
            url: newTour.url,
            createdAt: new Date().toISOString().split("T")[0],
            status: true,
            visitors: 0,
          }

          return {
            ...project,
            tourCount: project.tourCount + 1,
            tours: [...project.tours, newTourObj],
          }
        }
        return project
      })

      setProjects(updatedProjects)
      setNewTourModalOpen(false)
      setNewTour({
        name: "",
        url: "",
        description: "",
        category: "",
        visitorGoal: "",
        conversionGoal: "",
      })
      setFormErrors({})
    }
  }

  const toggleProjectStatus = (projectId: number) => {
    setProjects(
      projects.map((project) => (project.id === projectId ? { ...project, status: !project.status } : project)),
    )
  }

  const toggleTourStatus = (tourId: number) => {
    if (!selectedProject) return

    setProjects(
      projects.map((project) => {
        if (project.id === selectedProject) {
          return {
            ...project,
            tours: project.tours.map((tour) => (tour.id === tourId ? { ...tour, status: !tour.status } : tour)),
          }
        }
        return project
      }),
    )
  }

  const deleteProject = (projectId: number) => {
    if (confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      setProjects(projects.filter((project) => project.id !== projectId))
    }
  }

  const deleteTour = (tourId: number) => {
    if (!selectedProject) return

    if (confirm("정말로 이 투어를 삭제하시겠습니까?")) {
      setProjects(
        projects.map((project) => {
          if (project.id === selectedProject) {
            const updatedTours = project.tours.filter((tour) => tour.id !== tourId)
            return {
              ...project,
              tourCount: updatedTours.length,
              tours: updatedTours,
            }
          }
          return project
        }),
      )
    }
  }

  const menuItems = [
    {
      id: "dashboard",
      title: "대시보드",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      id: "projects",
      title: "프로젝트 관리",
      icon: Layers,
      active: true,
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
      href: "/reports",
    },
    {
      id: "settings",
      title: "설정",
      icon: Settings,
      href: "/settings",
    },
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
              <span className="text-white">프로젝트 관리</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              {selectedProject ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-slate-400 hover:text-white transition-colors rounded-full bg-slate-800/50"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{getSelectedProject()?.name}</h1>
                    <p className="text-slate-400">{getSelectedProject()?.description}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">프로젝트 관리</h1>
                  <p className="text-slate-400">XR 마케팅 프로젝트를 관리하세요</p>
                </div>
              )}
            </div>

            {!selectedProject ? (
              <button
                onClick={() => setNewProjectModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />새 프로젝트 생성
              </button>
            ) : (
              <button
                onClick={() => setNewTourModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />새 XR 투어 추가
              </button>
            )}
          </div>

          {/* Project List View */}
          {!selectedProject && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleProjectStatus(project.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          project.status ? "bg-blue-600" : "bg-slate-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            project.status ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">생성일: {project.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm">XR 투어: {project.tourCount}개</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">총 방문자: {project.totalVisitors.toLocaleString()}명</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <User className="w-4 h-4" />
                      <span className="text-sm">담당자: {project.manager}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm">카테고리: {project.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white transition-colors" title="수정">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => setSelectedProject(project.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      상세보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Detail View */}
          {selectedProject && getSelectedProject() && (
            <div className="space-y-8">
              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-sm">총 투어 수</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">{getSelectedProject()?.tourCount}개</p>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-sm">전체 방문자 수</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {getSelectedProject()?.totalVisitors.toLocaleString()}명
                  </p>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-sm">평균 체류시간</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">{getSelectedProject()?.stats.avgSessionTime}</p>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-sm">전환율</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">{getSelectedProject()?.stats.conversionRate}</p>
                </div>
              </div>

              {/* XR Tour Management */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">XR 투어 관리</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">투어명</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">URL</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">생성일</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">상태</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">방문자수</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSelectedProject()?.tours.map((tour) => (
                        <tr key={tour.id} className="border-b border-slate-700/30">
                          <td className="py-3 px-4 text-white">{tour.name}</td>
                          <td className="py-3 px-4 text-blue-400 hover:text-blue-300 transition-colors">
                            <a
                              href={tour.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <LinkIcon className="w-3 h-3" />
                              <span className="truncate max-w-[150px]">{tour.url}</span>
                            </a>
                          </td>
                          <td className="py-3 px-4 text-slate-400">{tour.createdAt}</td>
                          <td className="py-3 px-4">
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
                          </td>
                          <td className="py-3 px-4 text-slate-300">{tour.visitors.toLocaleString()}명</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 text-slate-400 hover:text-white transition-colors" title="수정">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTour(tour.id)}
                                className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {getSelectedProject()?.tours.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">등록된 XR 투어가 없습니다.</p>
                    <button
                      onClick={() => setNewTourModalOpen(true)}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                      <Plus className="w-4 h-4" />새 XR 투어 추가
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* New Project Modal */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setNewProjectModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-6">새 프로젝트 생성</h2>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  프로젝트명 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    formErrors.name ? "border-red-400" : "border-slate-600"
                  } rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors`}
                  placeholder="프로젝트명을 입력하세요"
                />
                {formErrors.name && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">프로젝트 설명</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="프로젝트에 대한 설명을 입력하세요"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">담당자</label>
                <input
                  type="text"
                  value={newProject.manager}
                  onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="담당자 이름"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  카테고리 <span className="text-red-400">*</span>
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    formErrors.category ? "border-red-400" : "border-slate-600"
                  } rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors`}
                >
                  <option value="" disabled>
                    카테고리 선택
                  </option>
                  <option value="부동산">부동산</option>
                  <option value="리테일">리테일</option>
                  <option value="전시">전시</option>
                  <option value="제조업">제조업</option>
                  <option value="기타">기타</option>
                </select>
                {formErrors.category && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.category}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  생성하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Tour Modal */}
      {newTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setNewTourModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-6">새 XR 투어 등록</h2>

            <form onSubmit={handleCreateTour} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  투어명 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTour.name}
                  onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    formErrors.tourName ? "border-red-400" : "border-slate-600"
                  } rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors`}
                  placeholder="투어명을 입력하세요"
                />
                {formErrors.tourName && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.tourName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  XR 투어 URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTour.url}
                  onChange={(e) => setNewTour({ ...newTour, url: e.target.value })}
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    formErrors.tourUrl ? "border-red-400" : "border-slate-600"
                  } rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors`}
                  placeholder="https://"
                />
                {formErrors.tourUrl && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.tourUrl}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">설명</label>
                <textarea
                  value={newTour.description}
                  onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="투어에 대한 설명을 입력하세요"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">카테고리/태그</label>
                <input
                  type="text"
                  value={newTour.category}
                  onChange={(e) => setNewTour({ ...newTour, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="카테고리 또는 태그 (쉼표로 구분)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">일일 방문자 목표</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={newTour.visitorGoal}
                      onChange={(e) => setNewTour({ ...newTour, visitorGoal: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="100"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                      명
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">전환율 목표</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={newTour.conversionGoal}
                      onChange={(e) => setNewTour({ ...newTour, conversionGoal: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="10"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setNewTourModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
