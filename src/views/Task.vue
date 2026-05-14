<template>
  <div class="task-container">
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
        <span class="nav-title">📝 任务提交</span>
      </div>
      <div class="nav-right">
        <span class="task-badge">{{ student?.badge }}</span>
      </div>
    </nav>

    <div class="task-content" v-if="student && task">
      <div class="header-card">
        <div class="student-section">
          <span class="student-badge-large">{{ student.badge }}</span>
          <div class="student-info">
            <h2>{{ student.name }}</h2>
            <span class="student-tag">{{ student.type }}</span>
          </div>
        </div>
        <div class="situation-section">
          <div class="situation-badge">
            <span class="badge-num">{{ task.序号 }}</span>
            <span class="badge-text">{{ situationId }}</span>
          </div>
          <span class="situation-phase">{{ task.阶段 }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="card-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <div class="card-body">
          <h3>情境背景</h3>
          <p>{{ task.背景 }}</p>
        </div>
      </div>

      <div class="subtasks-section">
        <div class="section-header">
          <h3>📋 子任务列表</h3>
          <span class="subtask-count">共 {{ task.子任务?.length }} 个任务</span>
        </div>
        <div class="subtasks-list">
          <div 
            v-for="subtask in task.子任务" 
            :key="subtask.编号"
            class="subtask-card"
            :class="{ active: selectedSubtask === subtask.编号 }"
            @click="selectSubtask(subtask.编号)"
          >
            <div class="subtask-header">
              <div class="subtask-number">
                <span>{{ subtask.编号 }}</span>
              </div>
              <span class="subtask-type-tag">{{ subtask.类型 }}</span>
            </div>
            <p class="subtask-content">{{ subtask.内容 }}</p>
            <div class="subtask-decoration"></div>
          </div>
        </div>
      </div>

      <div class="answer-section">
        <div class="section-header">
          <h3>✍️ 你的回答</h3>
        </div>
        <div class="answer-card">
          <textarea 
            v-model="answerText"
            placeholder="请在此输入你的回答..."
            rows="8"
            class="answer-textarea"
          ></textarea>
          <div class="answer-footer">
            <div class="word-counter">
              <span class="word-count">{{ answerText.length }}</span>
              <span class="word-label">字</span>
            </div>
            <button 
              class="submit-btn" 
              @click="submitAnswer" 
              :disabled="!answerText.trim()"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-4-4m0 0L7 8m4-4v12"/>
              </svg>
              <span>提交回答</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="feedback" class="feedback-section" :class="{ success: feedback.upgraded }">
        <div class="feedback-card">
          <div class="feedback-header">
            <span class="feedback-icon">{{ feedback.upgraded ? '🎉' : '📊' }}</span>
            <div class="feedback-title">
              <h3>{{ feedback.upgraded ? '勋章升级！' : '评价结果' }}</h3>
            </div>
          </div>
          <div class="badge-transition">
            <div v-if="feedback.oldBadge" class="badge-item old">
              <span class="badge-emoji">{{ feedback.oldBadge }}</span>
              <span class="badge-label">原勋章</span>
            </div>
            <div v-if="feedback.upgraded" class="transition-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="badge-item new">
              <span class="badge-emoji">{{ feedback.newBadge }}</span>
              <span class="badge-label">当前勋章</span>
            </div>
          </div>
          <div class="feedback-message">
            <p v-if="feedback.upgraded" class="upgrade-text">
              恭喜！你的思维层级提升到了新高度！继续挑战更高等级！
            </p>
            <p v-else class="info-text">
              当前勋章未变化，继续努力提升思维层级！
            </p>
          </div>
          <div class="badge-desc">
            <span class="desc-text">{{ getBadgeTitle(feedback.newBadge) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-section">
      <div class="loading-card">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getStudents, getTasks, getKeywords, saveStudents, evaluateBadge, isBadgeHigher, BADGE_ORDER } from '../utils/storage'

const router = useRouter()
const route = useRoute()
const students = ref({})
const tasks = ref({})
const keywords = ref({})
const student = ref(null)
const task = ref(null)
const studentId = ref('')
const situationId = ref('')
const selectedSubtask = ref(null)
const answerText = ref('')
const feedback = ref(null)

const badgeTitles = {
  '🌱 自然观察者': '入门阶段 - 只能处理单一信息',
  '🌿 要素猎人': '要素识别 - 能罗列多个要素',
  '🌳 关联侦探': '因果关联 - 能建立因果链',
  '🏅 系统架构师': '系统思维 - 能识别系统结构',
  '👑 全球顾问': '拓展抽象 - 能识别反馈与辩证'
}

onMounted(() => {
  studentId.value = route.query.studentId || ''
  situationId.value = route.query.situationId || ''
  loadData()
})

function loadData() {
  students.value = getStudents()
  tasks.value = getTasks()
  keywords.value = getKeywords()
  
  if (studentId.value && students.value[studentId.value]) {
    student.value = students.value[studentId.value]
  }
  
  if (situationId.value) {
    task.value = tasks.value[situationId.value]
  }
  
  if (task.value?.子任务?.length) {
    selectedSubtask.value = task.value.子任务[0].编号
  }
}

function goBack() {
  router.push('/')
}

function selectSubtask(num) {
  selectedSubtask.value = num
}

function submitAnswer() {
  if (!answerText.value.trim()) return
  
  const newBadge = evaluateBadge(answerText.value, keywords.value)
  const oldBadge = student.value.badge
  const upgraded = isBadgeHigher(newBadge, oldBadge)
  
  feedback.value = {
    newBadge,
    oldBadge: upgraded ? oldBadge : null,
    upgraded
  }
  
  if (upgraded) {
    student.value.badge = newBadge
    student.value.badgeHistory.push({
      badge: newBadge,
      time: new Date().toLocaleDateString()
    })
  }
  
  const answerKey = `${situationId.value.split('_')[0]}_q${selectedSubtask.value}`
  student.value.answers = student.value.answers || {}
  student.value.answers[answerKey] = answerText.value
  
  saveStudents(students.value)
  
  answerText.value = ''
}

function getBadgeTitle(badge) {
  return badgeTitles[badge] || ''
}
</script>

<style scoped>
.task-container {
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

.task-badge {
  font-size: 2.4rem;
}

.task-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  flex-wrap: wrap;
  gap: 2rem;
}

.student-section {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.student-badge-large {
  font-size: 5.5rem;
}

.student-info h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.6rem;
}

.student-tag {
  padding: 0.55rem 1.25rem;
  background: rgba(139, 92, 246, 0.2);
  color: var(--secondary-300);
  border-radius: 20px;
  font-size: 0.92rem;
  font-weight: 500;
}

.situation-section {
  text-align: right;
}

.situation-badge {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 2rem;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: white;
  border-radius: 32px;
  margin-bottom: 0.75rem;
  box-shadow: 0 12px 35px rgba(99, 102, 241, 0.45);
}

.badge-num {
  font-size: 1.65rem;
  font-weight: bold;
}

.badge-text {
  font-size: 1.05rem;
}

.situation-phase {
  color: var(--text-secondary);
  font-size: 1rem;
}

.info-card {
  display: flex;
  gap: 1.75rem;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
}

.card-icon-wrapper {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.28), rgba(139, 92, 246, 0.28));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon-wrapper svg {
  width: 32px;
  height: 32px;
  color: var(--secondary-300);
}

.card-body h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.35rem;
}

.card-body p {
  margin: 0;
  line-height: 1.8;
  color: var(--text-secondary);
  font-size: 1.05rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.4rem;
}

.subtask-count {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.subtasks-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.subtask-card {
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 26px;
  cursor: pointer;
  transition: all var(--transition-normal);
  border-left: 5px solid var(--border-subtle);
  overflow: hidden;
}

.subtask-card:hover,
.subtask-card.active {
  background: rgba(99, 102, 241, 0.12);
  border-left-color: var(--primary-500);
  transform: translateX(12px);
}

.subtask-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.subtask-number {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.35rem;
}

.subtask-type-tag {
  padding: 0.6rem 1.4rem;
  background: rgba(139, 92, 246, 0.2);
  color: var(--secondary-300);
  border-radius: 24px;
  font-size: 0.88rem;
}

.subtask-content {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
}

.subtask-decoration {
  position: absolute;
  top: -35%;
  right: -35%;
  width: 160%;
  height: 160%;
  background: radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.subtask-card:hover .subtask-decoration,
.subtask-card.active .subtask-decoration {
  opacity: 1;
}

.answer-card {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
}

.answer-textarea {
  width: 100%;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  font-size: 1.05rem;
  color: var(--text-primary);
  resize: vertical;
  transition: all var(--transition-normal);
  box-sizing: border-box;
  min-height: 200px;
  line-height: 1.7;
}

.answer-textarea::placeholder {
  color: var(--text-disabled);
}

.answer-textarea:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}

.answer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.word-counter {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.word-count {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.word-label {
  color: var(--text-muted);
  font-size: 1rem;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.25rem 3rem;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: white;
  border: none;
  border-radius: 38px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: 0 14px 40px rgba(99, 102, 241, 0.5);
}

.submit-btn svg {
  width: 22px;
  height: 22px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 18px 50px rgba(99, 102, 241, 0.65);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback-card {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  animation: fadeSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-section.success .feedback-card {
  background: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.28);
}

.feedback-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.feedback-icon {
  font-size: 4.2rem;
}

.feedback-title h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.65rem;
}

.badge-transition {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge-item .badge-emoji {
  font-size: 4.5rem;
  display: block;
  margin-bottom: 0.75rem;
}

.badge-item.new .badge-emoji {
  animation: badgeBounce 0.8s ease infinite alternate;
}

@keyframes badgeBounce {
  from { transform: translateY(0); }
  to { transform: translateY(-12px); }
}

.badge-label {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.badge-item.old .badge-emoji {
  opacity: 0.55;
  filter: grayscale(30%);
}

.transition-arrow svg {
  width: 45px;
  height: 45px;
  color: var(--success-500);
}

.feedback-message {
  margin-bottom: 1.5rem;
}

.upgrade-text {
  color: var(--success-400);
  font-weight: 500;
  margin: 0;
  font-size: 1.25rem;
}

.info-text {
  color: var(--text-secondary);
  margin: 0;
  font-size: 1.05rem;
}

.badge-desc {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-subtle);
}

.desc-text {
  font-size: 1rem;
  color: var(--text-secondary);
}

.loading-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.loading-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

.loading-spinner {
  width: 85px;
  height: 85px;
  border: 4px solid rgba(255, 255, 255, 0.06);
  border-top: 4px solid var(--primary-500);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-card p {
  color: var(--text-muted);
  font-size: 1.15rem;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.95rem 1.5rem;
  }
  
  .task-content {
    padding: 2.25rem 1.5rem;
    gap: 2rem;
  }
  
  .header-card {
    padding: 2rem;
    justify-content: center;
  }
  
  .student-badge-large {
    font-size: 4.5rem;
  }
  
  .situation-section {
    text-align: center;
  }
  
  .situation-badge {
    padding: 0.9rem 1.6rem;
  }
  
  .info-card {
    flex-direction: column;
    gap: 1.25rem;
    padding: 2rem;
  }
  
  .card-icon-wrapper {
    width: 62px;
    height: 62px;
  }
  
  .badge-transition {
    gap: 1.5rem;
  }
  
  .badge-item .badge-emoji {
    font-size: 3.2rem;
  }
  
  .transition-arrow svg {
    width: 32px;
    height: 32px;
  }
  
  .answer-footer {
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
  }
  
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>