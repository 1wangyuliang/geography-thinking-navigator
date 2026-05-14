<template>
  <div class="home-container">
    <nav class="navbar">
      <div class="nav-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
            <path d="M2 12h20"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">地理思维进阶导航系统</span>
          <span class="brand-subtitle">Geography Thinking Navigator</span>
        </div>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>首页</span>
        </router-link>
        <router-link to="/report" class="nav-link" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          <span>终结性报告</span>
        </router-link>
        <router-link to="/generate" class="nav-link" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7.5 19.5a2.121 2.121 0 0 1-3-3z"/>
          </svg>
          <span>AI生成配置</span>
        </router-link>
        <button class="logout-btn" @click="logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <path d="M21 12l-7 7-7-7"/>
          </svg>
          <span>登出</span>
        </button>
      </div>
      <div class="nav-date">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <div class="date-info">
          <span class="date-text">{{ currentDate }}</span>
          <span class="time-text">{{ currentTime }}</span>
        </div>
      </div>
    </nav>

    <header class="hero-section">
      <div class="hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="hero-content">
        <div class="badge-carousel">
          <span 
            v-for="(badge, index) in badges" 
            :key="index" 
            class="badge-item"
            :style="{ animationDelay: index * 0.15 + 's' }"
          >
            <span class="badge-emoji">{{ badge.emoji }}</span>
            <span class="badge-name">{{ badge.title }}</span>
          </span>
        </div>
        <h1 class="hero-title">地理思维进阶导航系统</h1>
        <p class="hero-subtitle">——以自然环境的整体性为例</p>
        <p class="hero-description">
          学生提交文本答案，系统自动判定SOLO思维层级并点亮对应勋章
        </p>
        <div class="hero-stats">
          <div class="stat-card">
            <span class="stat-icon">👥</span>
            <span class="stat-value">{{ studentCount }}</span>
            <span class="stat-label">学生</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">📚</span>
            <span class="stat-value">4</span>
            <span class="stat-label">教学情境</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🏆</span>
            <span class="stat-value">5</span>
            <span class="stat-label">思维层级</span>
          </div>
        </div>
      </div>
    </header>

    <section class="situations-section">
      <div class="section-header">
        <h2>📚 四个递进教学情境</h2>
        <p class="section-desc">从课前到课后，逐步提升思维层级</p>
      </div>
      <div class="situations-container">
        <div class="track-container">
          <div class="track-line">
            <div class="track-progress" :style="{ width: trackProgress + '%' }"></div>
          </div>
          <div class="track-markers">
            <div 
              v-for="(task, key, index) in situations" 
              :key="key"
              class="track-marker"
              :class="{ active: selectedSituation === key }"
              :style="{ left: ((index + 1) / Object.keys(situations).length * 100) + '%' }"
            ></div>
          </div>
        </div>
        <div class="situations-grid">
          <div 
            v-for="(task, key, index) in situations" 
            :key="key" 
            class="situation-card"
            :class="{ selected: selectedSituation === key }"
            @click="selectSituation(key)"
          >
            <div class="situation-icon">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="situation-content">
              <h3>{{ key.replace('情境', '情境 ') }}</h3>
              <span class="phase-tag">{{ task.阶段 }}</span>
              <p class="solo-expect">期望SOLO: {{ task.期望SOLO }}</p>
            </div>
            <div class="situation-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="students-section">
      <div class="section-header">
        <h2>🏅 学生勋章墙</h2>
        <p class="section-desc">点击选择学生，查看当前思维层级</p>
      </div>
      <div class="students-grid">
        <div 
          v-for="(student, studentId) in students" 
          :key="studentId"
          class="student-card"
          :class="{ selected: selectedStudent === studentId }"
          @click="selectStudent(studentId)"
        >
          <div class="card-glow"></div>
          <div class="student-badge">
            <span>{{ student.badge }}</span>
            <div class="badge-shine"></div>
          </div>
          <h3 class="student-name">{{ student.name }}</h3>
          <span class="student-type">{{ student.type }}</span>
          <div class="progress-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: getProgress(student.badge) + '%' }"
              ></div>
            </div>
            <span class="progress-text">{{ getProgress(student.badge).toFixed(0) }}%</span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="selectedStudent && selectedSituation" class="action-section">
      <div class="action-card">
        <div class="action-flow">
          <div class="flow-item">
            <span class="flow-badge student">{{ students[selectedStudent]?.badge }}</span>
            <span class="flow-label">{{ students[selectedStudent]?.name }}</span>
          </div>
          <div class="flow-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div class="flow-item">
            <span class="flow-badge situation">{{ selectedSituation }}</span>
          </div>
        </div>
        <button class="action-btn" @click="startTask">
          <span>进入任务</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <p>地理思维进阶导航系统 © 2024</p>
        <span class="footer-version">v1.0.0</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStudents, getTasks, BADGE_ORDER } from '../utils/storage'

const router = useRouter()
const students = ref({})
const tasks = ref({})
const selectedStudent = ref('')
const selectedSituation = ref('')
const currentDate = ref('')
const currentTime = ref('')

const badges = [
  { emoji: '🌱', title: '自然观察者' },
  { emoji: '🌿', title: '要素猎人' },
  { emoji: '🌳', title: '关联侦探' },
  { emoji: '🏅', title: '系统架构师' },
  { emoji: '👑', title: '全球顾问' }
]

const situations = computed(() => {
  const result = {}
  Object.keys(tasks.value).forEach(key => {
    if (key.includes('情境')) {
      result[key] = tasks.value[key]
    }
  })
  return result
})

const studentCount = computed(() => Object.keys(students.value).length)

const trackProgress = computed(() => {
  if (!selectedSituation.value) return 0
  const keys = Object.keys(situations.value)
  const index = keys.indexOf(selectedSituation.value)
  return ((index + 1) / keys.length) * 100
})

function updateDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[now.getDay()]
  
  currentDate.value = `${year}年${month}月${day}日 ${weekDay}`
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

onMounted(() => {
  students.value = getStudents()
  tasks.value = getTasks()
  updateDateTime()
  setInterval(updateDateTime, 1000)
})

function getProgress(badge) {
  const index = BADGE_ORDER.indexOf(badge)
  return ((index + 1) / BADGE_ORDER.length) * 100
}

function selectStudent(studentId) {
  selectedStudent.value = studentId
}

function selectSituation(situationId) {
  selectedSituation.value = situationId
}

function startTask() {
  if (selectedStudent.value && selectedSituation.value) {
    router.push({ 
      path: '/task', 
      query: { 
        studentId: selectedStudent.value, 
        situationId: selectedSituation.value 
      }
    })
  }
}

function logout() {
  localStorage.removeItem('currentUser')
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-dark-900) 0%, var(--bg-dark-800) 30%, var(--bg-dark-700) 60%, var(--bg-dark-800) 100%);
  position: relative;
  overflow-x: hidden;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  gap: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-subtle);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.brand-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500), var(--secondary-400));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  transition: all var(--transition-normal);
}

.brand-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.brand-icon:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.55);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 600;
  background: linear-gradient(90deg, var(--primary-200), var(--secondary-200), var(--primary-100));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle {
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 1.2px;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 28px;
  transition: all var(--transition-normal);
  font-weight: 500;
  font-size: 0.92rem;
}

.nav-link svg {
  width: 18px;
  height: 18px;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(99, 102, 241, 0.15);
  color: var(--text-primary);
}

.nav-link.active {
  box-shadow: 0 4px 25px rgba(99, 102, 241, 0.25);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 28px;
  transition: all var(--transition-normal);
  font-weight: 500;
  font-size: 0.92rem;
  cursor: pointer;
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}

.logout-btn:hover {
  background: rgba(248, 113, 113, 0.18);
  border-color: rgba(248, 113, 113, 0.4);
  transform: translateY(-2px);
}

.nav-date {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
}

.nav-date svg {
  width: 20px;
  height: 20px;
  color: var(--primary-400);
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.date-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.time-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 600;
  font-family: 'Monaco', 'Consolas', monospace;
}

.hero-section {
  padding: 6rem 5% 5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
}

.orb-1 {
  width: 580px;
  height: 580px;
  top: -250px;
  right: -180px;
  animation: floatOrb 14s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -80px;
  left: -150px;
  animation: floatOrb 16s ease-in-out infinite 5s;
}

.orb-3 {
  width: 280px;
  height: 280px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: floatOrb 10s ease-in-out infinite 2.5s;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(139, 92, 246, 0.06);
}

.ring-1 {
  width: 700px;
  height: 700px;
  top: -300px;
  right: -250px;
  animation: rotate 65s linear infinite;
}

.ring-2 {
  width: 480px;
  height: 480px;
  bottom: -200px;
  left: -200px;
  animation: rotate 55s linear infinite reverse;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(25px, -15px) scale(1.03); }
  50% { transform: translate(-15px, -25px) scale(0.97); }
  75% { transform: translate(-25px, 15px) scale(1.02); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.badge-carousel {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: badgeFloat 1.8s ease-in-out infinite;
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.badge-emoji {
  font-size: 3.5rem;
}

.badge-name {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.hero-title {
  font-size: 4rem;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-100) 30%, var(--secondary-100) 60%, var(--primary-200) 80%, var(--text-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  text-shadow: 0 0 120px rgba(99, 102, 241, 0.3);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-subtitle {
  font-size: 1.35rem;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 1.75rem;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 750px;
  margin: 0 auto 3.5rem;
  line-height: 1.8;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2.25rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-card {
  flex: 1;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-normal);
}

.stat-card:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--border-primary);
  transform: translateY(-8px);
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 2.4rem;
  font-weight: bold;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.92rem;
  color: var(--text-muted);
}

.situations-section,
.students-section {
  padding: 5rem 5%;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-header h2 {
  font-size: 2.3rem;
  background: linear-gradient(90deg, var(--primary-400), var(--secondary-400), var(--secondary-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
}

.section-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.situations-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.track-container {
  position: absolute;
  top: 55px;
  left: 5%;
  right: 5%;
  height: 4px;
}

.track-line {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}

.track-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 18px rgba(99, 102, 241, 0.6);
}

.track-markers {
  position: absolute;
  top: -6px;
  left: 0;
  right: 0;
}

.track-marker {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(-50%);
  transition: all var(--transition-normal);
}

.track-marker.active {
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.7);
  transform: translateX(-50%) scale(1.4);
}

.situations-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-top: 1rem;
}

.situation-card {
  position: relative;
  padding: 2rem 1.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all var(--transition-slow);
  text-align: center;
  overflow: hidden;
}

.situation-card:hover,
.situation-card.selected {
  transform: translateY(-15px);
  background: rgba(99, 102, 241, 0.12);
  border-color: var(--border-primary);
}

.situation-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
  transition: all var(--transition-normal);
}

.situation-card:hover .situation-icon,
.situation-card.selected .situation-icon {
  transform: scale(1.12);
  box-shadow: 0 18px 50px rgba(99, 102, 241, 0.55);
}

.situation-content h3 {
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  font-size: 1.2rem;
}

.phase-tag {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(139, 92, 246, 0.2);
  color: var(--secondary-300);
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
}

.solo-expect {
  color: var(--text-muted);
  margin: 1rem 0 0 0;
  font-size: 0.85rem;
}

.situation-glow {
  position: absolute;
  top: -45%;
  right: -45%;
  width: 180%;
  height: 180%;
  background: radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.situation-card:hover .situation-glow,
.situation-card.selected .situation-glow {
  opacity: 1;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.student-card {
  position: relative;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all var(--transition-slow);
  text-align: center;
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -55%;
  left: -55%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.22) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--transition-slow);
}

.student-card:hover .card-glow,
.student-card.selected .card-glow {
  opacity: 1;
}

.student-card:hover,
.student-card.selected {
  transform: translateY(-18px);
  border-color: var(--border-primary);
  box-shadow: 0 30px 70px rgba(99, 102, 241, 0.18);
}

.student-badge {
  position: relative;
  margin-bottom: 1.5rem;
}

.student-badge span {
  font-size: 5rem;
  display: block;
  animation: badgeFloat 3.5s ease-in-out infinite;
}

.badge-shine {
  position: absolute;
  top: 12%;
  right: 22%;
  width: 12%;
  height: 12%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  filter: blur(4px);
}

.student-name {
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.student-type {
  display: inline-block;
  color: var(--secondary-300);
  font-size: 0.92rem;
}

.progress-container {
  margin-top: 1.75rem;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-text {
  display: block;
  text-align: right;
  margin-top: 0.5rem;
  font-size: 0.88rem;
  font-weight: 600;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.action-section {
  padding: 4rem;
  display: flex;
  justify-content: center;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  padding: 2.5rem 3.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 36px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  max-width: 700px;
  width: 90%;
}

.action-flow {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.flow-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.flow-badge.student {
  font-size: 2.4rem;
}

.flow-badge.situation {
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
  border-radius: 28px;
  color: var(--secondary-300);
  font-weight: 600;
}

.flow-label {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.flow-arrow svg {
  width: 30px;
  height: 30px;
  color: var(--primary-400);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3rem;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: white;
  border: none;
  border-radius: 38px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: 0 14px 40px rgba(99, 102, 241, 0.5);
}

.action-btn:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.65);
}

.action-btn svg {
  width: 22px;
  height: 22px;
}

.footer {
  text-align: center;
  padding: 3.5rem;
  border-top: 1px solid var(--border-subtle);
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
}

.footer p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
}

.footer-version {
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 18px;
  color: var(--text-muted);
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .situations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .track-container {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.9rem 1.5rem;
  }
  
  .nav-links {
    gap: 0.4rem;
  }
  
  .nav-link {
    padding: 0.75rem 1.1rem;
    font-size: 0.85rem;
  }
  
  .nav-link span {
    display: none;
  }
  
  .brand-icon {
    width: 48px;
    height: 48px;
  }
  
  .brand-title {
    font-size: 1rem;
  }
  
  .hero-title {
    font-size: 2.6rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .badge-emoji {
    font-size: 2.4rem;
  }
  
  .hero-stats {
    gap: 1.25rem;
  }
  
  .stat-card {
    padding: 1.5rem 1rem;
  }
  
  .stat-value {
    font-size: 1.8rem;
  }
  
  .situations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .action-card {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }
  
  .action-flow {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .situations-section,
  .students-section {
    padding: 3.5rem 1.5rem;
  }
  
  .hero-section {
    padding: 4.5rem 1.5rem 4rem;
  }
}
</style>