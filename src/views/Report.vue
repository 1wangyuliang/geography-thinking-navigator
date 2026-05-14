<template>
  <div class="report-container">
    <nav class="navbar">
      <div class="nav-left">
        <button class="back-btn" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>返回首页</span>
        </button>
      </div>
      <div class="nav-center">
        <span class="nav-title">📊 终结性评价报告</span>
      </div>
      <div class="nav-right">
        <span class="student-count">共 {{ studentCount }} 名学生</span>
      </div>
    </nav>

    <div class="report-content">
      <section class="summary-section">
        <h2>📈 整体概览</h2>
        <div class="summary-grid">
          <div class="summary-card">
            <div class="card-icon">👥</div>
            <div class="card-value">{{ studentCount }}</div>
            <div class="card-label">学生总数</div>
          </div>
          <div class="summary-card gold">
            <div class="card-icon">👑</div>
            <div class="card-value">{{ globalAdvisors }}</div>
            <div class="card-label">全球顾问</div>
          </div>
          <div class="summary-card silver">
            <div class="card-icon">🏅</div>
            <div class="card-value">{{ architects }}</div>
            <div class="card-label">系统架构师</div>
          </div>
          <div class="summary-card green">
            <div class="card-icon">🌳</div>
            <div class="card-value">{{ detectives }}</div>
            <div class="card-label">关联侦探</div>
          </div>
        </div>
      </section>

      <section class="students-section">
        <h2>🎓 学生详情</h2>
        <div class="students-list">
          <div 
            v-for="(student, studentId) in students" 
            :key="studentId"
            class="student-card"
          >
            <div class="card-header">
              <div class="badge-section">
                <span class="badge-emoji">{{ student.badge }}</span>
                <div class="badge-progress">
                  <div 
                    class="progress-fill" 
                    :style="{ width: getProgress(student.badge) + '%' }"
                  ></div>
                </div>
                <span class="progress-label">{{ getProgress(student.badge).toFixed(0) }}%</span>
              </div>
              <div class="info-section">
                <h3>{{ student.name }}</h3>
                <p class="student-type">{{ student.type }}</p>
              </div>
              <div class="marks-section">
                <span 
                  v-for="(mark, key) in student.marks" 
                  :key="key"
                  class="mark-tag"
                  :class="getMarkClass(mark)"
                >
                  {{ mark }}
                </span>
              </div>
            </div>

            <div class="card-body">
              <div class="history-section">
                <h4>🏆 勋章进阶历史</h4>
                <div class="timeline">
                  <div 
                    v-for="(history, index) in student.badgeHistory" 
                    :key="index"
                    class="timeline-item"
                  >
                    <span class="timeline-badge">{{ history.badge }}</span>
                    <span class="timeline-date">{{ history.time }}</span>
                    <div v-if="index < student.badgeHistory.length - 1" class="timeline-line"></div>
                  </div>
                </div>
              </div>

              <div class="answers-section">
                <h4>📝 各情境回答摘要</h4>
                <div class="answers-list">
                  <div 
                    v-for="(answer, key) in student.answers" 
                    :key="key"
                    class="answer-item"
                  >
                    <span class="answer-key">{{ key }}</span>
                    <p class="answer-text">{{ truncate(answer, 60) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="legend-section">
        <h3>📖 SOLO层级说明</h3>
        <div class="legend-grid">
          <div class="legend-item">
            <span class="legend-tag U">U</span>
            <div class="legend-info">
              <span class="legend-title">单点结构</span>
              <span class="legend-desc">只能处理单一信息</span>
            </div>
          </div>
          <div class="legend-item">
            <span class="legend-tag M">M</span>
            <div class="legend-info">
              <span class="legend-title">多点结构</span>
              <span class="legend-desc">能罗列多个要素</span>
            </div>
          </div>
          <div class="legend-item">
            <span class="legend-tag R">R</span>
            <div class="legend-info">
              <span class="legend-title">关联结构</span>
              <span class="legend-desc">能建立因果链</span>
            </div>
          </div>
          <div class="legend-item">
            <span class="legend-tag E">E</span>
            <div class="legend-info">
              <span class="legend-title">拓展抽象</span>
              <span class="legend-desc">能识别反馈与辩证</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>地理思维进阶导航系统 © 2024</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStudents, BADGE_ORDER } from '../utils/storage'

const router = useRouter()
const students = ref({})

onMounted(() => {
  students.value = getStudents()
})

const studentCount = computed(() => Object.keys(students.value).length)
const globalAdvisors = computed(() => countBadge('👑 全球顾问'))
const architects = computed(() => countBadge('🏅 系统架构师'))
const detectives = computed(() => countBadge('🌳 关联侦探'))

function countBadge(badge) {
  return Object.values(students.value).filter(s => s.badge === badge).length
}

function goBack() {
  router.push('/')
}

function getProgress(badge) {
  const index = BADGE_ORDER.indexOf(badge)
  return ((index + 1) / BADGE_ORDER.length) * 100
}

function getMarkClass(mark) {
  const classes = {
    'U': 'mark-u',
    'M': 'mark-m',
    'R': 'mark-r',
    'E': 'mark-e'
  }
  return classes[mark] || ''
}

function truncate(text, length) {
  if (!text) return '-'
  return text.length > length ? text.substring(0, length) + '...' : text
}
</script>

<style scoped>
.report-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-dark-900) 0%, var(--bg-dark-800) 30%, var(--bg-dark-700) 60%, var(--bg-dark-800) 100%);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-bottom: 1px solid var(--border-subtle);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-light);
  border-radius: 28px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.back-btn:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: var(--border-primary);
}

.nav-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.student-count {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.report-content {
  padding: 3rem 5%;
  max-width: 1200px;
  margin: 0 auto;
}

.summary-section h2,
.students-section h2 {
  color: var(--text-primary);
  margin-bottom: 1.75rem;
  text-align: center;
  font-size: 1.8rem;
  background: linear-gradient(90deg, var(--primary-400), var(--secondary-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  text-align: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-normal);
}

.summary-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.06);
}

.summary-card.gold { 
  background: linear-gradient(135deg, rgba(255, 248, 225, 0.08), rgba(255, 236, 179, 0.04)); 
  border-color: rgba(251, 191, 36, 0.25);
}
.summary-card.silver { 
  background: linear-gradient(135deg, rgba(245, 245, 245, 0.08), rgba(224, 224, 224, 0.04)); 
  border-color: rgba(192, 192, 192, 0.25);
}
.summary-card.green { 
  background: linear-gradient(135deg, rgba(232, 245, 233, 0.08), rgba(200, 230, 201, 0.04)); 
  border-color: rgba(74, 222, 128, 0.25);
}

.card-icon {
  font-size: 2.8rem;
  margin-bottom: 0.75rem;
}

.card-value {
  font-size: 2.2rem;
  font-weight: bold;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.card-label {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.students-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.student-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  flex-wrap: wrap;
  gap: 1.5rem;
}

.badge-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge-emoji {
  font-size: 3.5rem;
}

.badge-progress {
  width: 100px;
  height: 7px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.75rem 0 0.4rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
}

.info-section {
  text-align: center;
}

.info-section h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.3rem;
}

.student-type {
  margin: 0;
  color: var(--secondary-300);
  font-size: 0.95rem;
}

.marks-section {
  display: flex;
  gap: 0.75rem;
}

.mark-tag {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
  color: white;
  font-size: 1.15rem;
  transition: all var(--transition-normal);
}

.mark-tag:hover {
  transform: scale(1.12);
}

.mark-u { background: linear-gradient(135deg, #9ca3af, #6b7280); }
.mark-m { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
.mark-r { background: linear-gradient(135deg, #60a5fa, #3b82f6); }
.mark-e { background: linear-gradient(135deg, #4ade80, #22c55e); }

.card-body {
  padding: 2rem;
}

.history-section {
  margin-bottom: 2rem;
}

.history-section h4,
.answers-section h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.timeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 18px;
  border: 1px solid var(--border-subtle);
}

.timeline-badge {
  font-size: 1.5rem;
}

.timeline-date {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.timeline-line {
  width: 20px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  margin: 0 0.4rem;
}

.answers-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.answer-item {
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
}

.answer-key {
  font-size: 0.85rem;
  color: var(--secondary-400);
  font-weight: 600;
}

.answer-text {
  margin: 0.5rem 0 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.legend-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  margin-bottom: 3rem;
}

.legend-section h3 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
  text-align: center;
  font-size: 1.35rem;
}

.legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
}

.legend-tag {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  font-size: 1.1rem;
}

.legend-tag.U { background: linear-gradient(135deg, #9ca3af, #6b7280); }
.legend-tag.M { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
.legend-tag.R { background: linear-gradient(135deg, #60a5fa, #3b82f6); }
.legend-tag.E { background: linear-gradient(135deg, #4ade80, #22c55e); }

.legend-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.legend-title {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
}

.legend-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer {
  text-align: center;
  padding: 3rem;
  border-top: 1px solid var(--border-subtle);
}

.footer p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.95rem 1.5rem;
  }
  
  .report-content {
    padding: 2rem 1.5rem;
  }
  
  .card-header {
    justify-content: center;
  }
  
  .marks-section {
    order: 3;
    width: 100%;
    justify-content: center;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .timeline-item {
    width: 100%;
    justify-content: space-between;
  }
  
  .timeline-line {
    display: none;
  }
}
</style>