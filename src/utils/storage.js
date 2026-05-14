import keywordsData from '../../data/keywords.json'
import tasksData from '../../data/tasks.json'
import studentsData from '../../data/students.json'

const STORAGE_KEYS = {
  KEYWORDS: 'geo_keywords',
  TASKS: 'geo_tasks',
  STUDENTS: 'geo_students'
}

export function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.KEYWORDS)) {
    localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(keywordsData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasksData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(studentsData))
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify({
      admin: {
        username: 'admin',
        email: 'admin@example.com',
        password: '123456',
        createdAt: new Date().toLocaleDateString()
      },
      teacher: {
        username: 'teacher',
        email: 'teacher@example.com',
        password: '123456',
        createdAt: new Date().toLocaleDateString()
      }
    }))
  }
}

export function getKeywords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.KEYWORDS) || JSON.stringify(keywordsData))
}

export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || JSON.stringify(tasksData))
}

export function getStudents() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || JSON.stringify(studentsData))
}

export function saveKeywords(data) {
  localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(data))
}

export function saveTasks(data) {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(data))
}

export function saveStudents(data) {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(data))
}

export const BADGE_ORDER = ['🌱 自然观察者', '🌿 要素猎人', '🌳 关联侦探', '🏅 系统架构师', '👑 全球顾问']

export function evaluateBadge(text, keywords) {
  const count = (wordList) => wordList.filter(w => text.includes(w)).length
  const e = count(keywords.elements || keywords.要素词 || [])
  const p = count(keywords.properties || keywords.属性词 || [])
  const l = count(keywords.logics || keywords.逻辑词 || [])
  const hl = count(keywords.higherLogics || keywords.高阶逻辑词 || [])
  const ev = count(keywords.evaluation || keywords.评价词 || [])
  const hasCycle = text.includes('回到') || text.includes('循环') || text.includes('反馈环') || text.includes('闭环') || text.includes('反馈')

  if (e >= 1 && p >= 1) {
    if (e >= 2 && l >= 1) {
      if (e >= 3 && l >= 2 && hasCycle) {
        if (ev >= 1) return BADGE_ORDER[4]
        return BADGE_ORDER[3]
      }
      return BADGE_ORDER[2]
    }
    return BADGE_ORDER[1]
  }
  return BADGE_ORDER[0]
}

export function getBadgeLevel(badge) {
  return BADGE_ORDER.indexOf(badge)
}

export function isBadgeHigher(newBadge, oldBadge) {
  return BADGE_ORDER.indexOf(newBadge) > BADGE_ORDER.indexOf(oldBadge)
}