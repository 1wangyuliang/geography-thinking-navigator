<template>
  <div class="generate-container">
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
        <span class="nav-title">⚙️ AI生成配置</span>
      </div>
      <div class="nav-right"></div>
    </nav>

    <div class="generate-content">
      <div class="steps-progress">
        <div 
          v-for="step in steps" 
          :key="step.id"
          class="step-indicator"
          :class="{ active: currentStep === step.id, done: currentStep > step.id }"
        >
          <div class="step-circle">
            <span v-if="currentStep > step.id">✓</span>
            <span v-else>{{ step.id }}</span>
          </div>
          <span class="step-label">{{ step.label }}</span>
        </div>
      </div>

      <div class="step-panel">
        <div v-if="currentStep === 1" class="panel-content">
          <div class="panel-header">
            <h2>📝 课题基本信息</h2>
            <p class="panel-desc">设置课题名称、核心知识点和教学情境主线</p>
          </div>

          <form class="form-grid">
            <div class="form-item">
              <label>课题名称</label>
              <input 
                v-model="form.topic" 
                type="text" 
                placeholder="如：自然环境的整体性"
                class="form-input"
              />
            </div>

            <div class="form-item">
              <label>核心知识点</label>
              <input 
                v-model="form.knowledgePoints" 
                type="text" 
                placeholder="用逗号分隔，如：五要素,要素相互作用"
                class="form-input"
              />
            </div>

            <div class="form-item full-width">
              <label>四情境递进主线</label>
              <textarea 
                v-model="form.situations" 
                rows="3"
                placeholder="如：校园微生境观测→浇水冲沟事件→崩岗侵蚀案例→崩岗治理措施"
                class="form-textarea"
              ></textarea>
            </div>

            <div class="form-item">
              <label>选择预置模板</label>
              <select v-model="form.template" class="form-select">
                <option value="ziranhuanjing">自然环境的整体性（默认）</option>
                <option value="qixuan">气旋与反气旋</option>
                <option value="shuixunhuan">水循环</option>
                <option value="custom">自定义（空白模板）</option>
              </select>
            </div>
          </form>

          <div class="form-actions">
            <button class="next-button" @click="nextStep">下一步 →</button>
          </div>
        </div>

        <div v-if="currentStep === 2" class="panel-content">
          <div class="panel-header">
            <h2>📚 关键词库配置</h2>
            <p class="panel-desc">配置五类关键词，用于勋章自动判定</p>
          </div>

          <div class="keyword-sections">
            <div class="keyword-section">
              <h3>🌍 要素词</h3>
              <div class="keyword-tags">
                <span 
                  v-for="(word, index) in keywords.elements" 
                  :key="index"
                  class="keyword-tag"
                  :class="{ selected: selectedKeywords.elements.includes(word) }"
                  @click="toggleKeyword('elements', word)"
                >{{ word }}</span>
              </div>
              <div class="keyword-input-group">
                <input 
                  v-model="newElement" 
                  type="text" 
                  placeholder="添加新要素词"
                  class="keyword-input"
                  @keyup.enter="addKeyword('elements', newElement)"
                />
                <button class="add-btn" @click="addKeyword('elements', newElement)">+</button>
              </div>
            </div>

            <div class="keyword-section">
              <h3>📊 属性描述词</h3>
              <div class="keyword-tags">
                <span 
                  v-for="(word, index) in keywords.properties" 
                  :key="index"
                  class="keyword-tag"
                  :class="{ selected: selectedKeywords.properties.includes(word) }"
                  @click="toggleKeyword('properties', word)"
                >{{ word }}</span>
              </div>
              <div class="keyword-input-group">
                <input 
                  v-model="newProperty" 
                  type="text" 
                  placeholder="添加新属性词"
                  class="keyword-input"
                  @keyup.enter="addKeyword('properties', newProperty)"
                />
                <button class="add-btn" @click="addKeyword('properties', newProperty)">+</button>
              </div>
            </div>

            <div class="keyword-section">
              <h3>🔗 逻辑连接词</h3>
              <div class="keyword-tags">
                <span 
                  v-for="(word, index) in keywords.logics" 
                  :key="index"
                  class="keyword-tag"
                  :class="{ selected: selectedKeywords.logics.includes(word) }"
                  @click="toggleKeyword('logics', word)"
                >{{ word }}</span>
              </div>
              <div class="keyword-input-group">
                <input 
                  v-model="newLogic" 
                  type="text" 
                  placeholder="添加新逻辑词"
                  class="keyword-input"
                  @keyup.enter="addKeyword('logics', newLogic)"
                />
                <button class="add-btn" @click="addKeyword('logics', newLogic)">+</button>
              </div>
            </div>

            <div class="keyword-section">
              <h3>🎯 高阶逻辑词</h3>
              <div class="keyword-tags">
                <span 
                  v-for="(word, index) in keywords.higherLogics" 
                  :key="index"
                  class="keyword-tag"
                  :class="{ selected: selectedKeywords.higherLogics.includes(word) }"
                  @click="toggleKeyword('higherLogics', word)"
                >{{ word }}</span>
              </div>
              <div class="keyword-input-group">
                <input 
                  v-model="newHigherLogic" 
                  type="text" 
                  placeholder="添加新高阶逻辑词"
                  class="keyword-input"
                  @keyup.enter="addKeyword('higherLogics', newHigherLogic)"
                />
                <button class="add-btn" @click="addKeyword('higherLogics', newHigherLogic)">+</button>
              </div>
            </div>

            <div class="keyword-section">
              <h3>💡 评价词</h3>
              <div class="keyword-tags">
                <span 
                  v-for="(word, index) in keywords.evaluation" 
                  :key="index"
                  class="keyword-tag"
                  :class="{ selected: selectedKeywords.evaluation.includes(word) }"
                  @click="toggleKeyword('evaluation', word)"
                >{{ word }}</span>
              </div>
              <div class="keyword-input-group">
                <input 
                  v-model="newEvaluation" 
                  type="text" 
                  placeholder="添加新评价词"
                  class="keyword-input"
                  @keyup.enter="addKeyword('evaluation', newEvaluation)"
                />
                <button class="add-btn" @click="addKeyword('evaluation', newEvaluation)">+</button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button class="prev-button" @click="prevStep">← 上一步</button>
            <button class="next-button" @click="nextStep">下一步 →</button>
          </div>
        </div>

        <div v-if="currentStep === 3" class="panel-content">
          <div class="panel-header">
            <h2>👥 学生配置</h2>
            <p class="panel-desc">设置学生数量、SOLO层级分布和代表类型</p>
          </div>

          <div class="form-grid">
            <div class="form-item">
              <label>学生数量</label>
              <div class="number-input-group">
                <button class="number-btn" @click="adjustStudentCount(-1)">-</button>
                <input 
                  v-model.number="form.studentCount" 
                  type="number" 
                  min="4" 
                  max="8"
                  class="number-input"
                />
                <button class="number-btn" @click="adjustStudentCount(1)">+</button>
              </div>
            </div>

            <div class="form-item full-width">
              <label>期望SOLO层级分布</label>
              <div class="distribution-list">
                <div class="distribution-item">
                  <span class="dist-label">🌱 自然观察者</span>
                  <div class="dist-slider">
                    <input 
                      v-model.number="form.distribution.U" 
                      type="range" 
                      min="0" 
                      max="100"
                      class="slider"
                    />
                    <span class="dist-value">{{ form.distribution.U }}%</span>
                  </div>
                </div>
                <div class="distribution-item">
                  <span class="dist-label">🌿 要素猎人</span>
                  <div class="dist-slider">
                    <input 
                      v-model.number="form.distribution.M" 
                      type="range" 
                      min="0" 
                      max="100"
                      class="slider"
                    />
                    <span class="dist-value">{{ form.distribution.M }}%</span>
                  </div>
                </div>
                <div class="distribution-item">
                  <span class="dist-label">🌳 关联侦探</span>
                  <div class="dist-slider">
                    <input 
                      v-model.number="form.distribution.R" 
                      type="range" 
                      min="0" 
                      max="100"
                      class="slider"
                    />
                    <span class="dist-value">{{ form.distribution.R }}%</span>
                  </div>
                </div>
                <div class="distribution-item">
                  <span class="dist-label">🏅 系统架构师</span>
                  <div class="dist-slider">
                    <input 
                      v-model.number="form.distribution.A" 
                      type="range" 
                      min="0" 
                      max="100"
                      class="slider"
                    />
                    <span class="dist-value">{{ form.distribution.A }}%</span>
                  </div>
                </div>
                <div class="distribution-item">
                  <span class="dist-label">👑 全球顾问</span>
                  <div class="dist-slider">
                    <input 
                      v-model.number="form.distribution.E" 
                      type="range" 
                      min="0" 
                      max="100"
                      class="slider"
                    />
                    <span class="dist-value">{{ form.distribution.E }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-item full-width">
              <label>选择学生代表类型</label>
              <div class="type-checkboxes">
                <label 
                  v-for="type in studentTypes" 
                  :key="type.value"
                  class="type-checkbox"
                >
                  <input 
                    type="checkbox" 
                    v-model="form.selectedTypes" 
                    :value="type.value"
                  />
                  <span>{{ type.label }}</span>
                </label>
              </div>
            </div>

            <div class="form-item full-width">
              <label>预览将生成的学生</label>
              <div class="preview-grid">
                <div 
                  v-for="(student, index) in previewStudents" 
                  :key="index"
                  class="preview-card"
                >
                  <span class="preview-badge">{{ student.badge }}</span>
                  <span class="preview-name">{{ student.name }}</span>
                  <span class="preview-type">{{ student.type }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button class="prev-button" @click="prevStep">← 上一步</button>
            <button class="generate-button" @click="generateData">🚀 生成数据</button>
          </div>
        </div>

        <div v-if="currentStep === 4" class="success-panel">
          <div class="success-icon">🎉</div>
          <h2>生成成功！</h2>
          <p>教学数据已生成并保存</p>
          <button class="home-button" @click="goToHome">前往首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getKeywords, saveKeywords, saveTasks, saveStudents } from '../utils/storage'

const router = useRouter()
const currentStep = ref(1)
const steps = [
  { id: 1, label: '课题信息' },
  { id: 2, label: '关键词库' },
  { id: 3, label: '学生配置' },
  { id: 4, label: '完成' }
]

const form = reactive({
  topic: '',
  knowledgePoints: '',
  situations: '',
  template: 'ziranhuanjing',
  studentCount: 6,
  distribution: { U: 10, M: 20, R: 40, A: 20, E: 10 },
  selectedTypes: ['multi', 'relational', 'extended']
})

const studentTypes = [
  { value: 'multi', label: '多点结构代表' },
  { value: 'relational', label: '关联结构代表' },
  { value: 'extended', label: '拓展抽象代表' },
  { value: 'u2m', label: '过渡型（单点→多点）' },
  { value: 'm2r', label: '过渡型（多点→关联）' },
  { value: 'r2e', label: '过渡型（关联→拓展）' },
  { value: 'custom', label: '自定义学生' }
]

const keywords = reactive({
  elements: [],
  properties: [],
  logics: [],
  higherLogics: [],
  evaluation: []
})

const selectedKeywords = reactive({
  elements: [],
  properties: [],
  logics: [],
  higherLogics: [],
  evaluation: []
})

const newElement = ref('')
const newProperty = ref('')
const newLogic = ref('')
const newHigherLogic = ref('')
const newEvaluation = ref('')

const previewStudents = computed(() => {
  const students = []
  const badgeOrder = ['🌱 自然观察者', '🌿 要素猎人', '🌳 关联侦探', '🏅 系统架构师', '👑 全球顾问']
  const typeMap = {
    multi: { badge: badgeOrder[2], type: '多点结构' },
    relational: { badge: badgeOrder[3], type: '关联结构' },
    extended: { badge: badgeOrder[4], type: '拓展抽象' },
    u2m: { badge: badgeOrder[1], type: '单点→多点' },
    m2r: { badge: badgeOrder[2], type: '多点→关联' },
    r2e: { badge: badgeOrder[3], type: '关联→拓展' },
    custom: { badge: badgeOrder[2], type: '自定义' }
  }
  
  for (let i = 0; i < form.studentCount; i++) {
    const typeIndex = i % form.selectedTypes.length
    const selectedType = form.selectedTypes[typeIndex]
    const config = typeMap[selectedType]
    
    students.push({
      name: `学生${String.fromCharCode(65 + i)}`,
      badge: config.badge,
      type: config.type
    })
  }
  return students
})

onMounted(() => {
  const defaultKeywords = getKeywords()
  keywords.elements = defaultKeywords.elements || defaultKeywords.要素词 || []
  keywords.properties = defaultKeywords.properties || defaultKeywords.属性词 || []
  keywords.logics = defaultKeywords.logics || defaultKeywords.逻辑词 || []
  keywords.higherLogics = defaultKeywords.higherLogics || defaultKeywords.高阶逻辑词 || []
  keywords.evaluation = defaultKeywords.evaluation || defaultKeywords.评价词 || []
  
  selectedKeywords.elements = [...keywords.elements]
  selectedKeywords.properties = [...keywords.properties]
  selectedKeywords.logics = [...keywords.logics]
  selectedKeywords.higherLogics = [...keywords.higherLogics]
  selectedKeywords.evaluation = [...keywords.evaluation]
})

function goBack() {
  router.push('/')
}

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function adjustStudentCount(delta) {
  form.studentCount = Math.min(8, Math.max(4, form.studentCount + delta))
}

function toggleKeyword(category, word) {
  const index = selectedKeywords[category].indexOf(word)
  if (index > -1) {
    selectedKeywords[category].splice(index, 1)
  } else {
    selectedKeywords[category].push(word)
  }
}

function addKeyword(category, word) {
  if (word.trim() && !keywords[category].includes(word.trim())) {
    keywords[category].push(word.trim())
    selectedKeywords[category].push(word.trim())
    if (category === 'elements') newElement.value = ''
    else if (category === 'properties') newProperty.value = ''
    else if (category === 'logics') newLogic.value = ''
    else if (category === 'higherLogics') newHigherLogic.value = ''
    else if (category === 'evaluation') newEvaluation.value = ''
  }
}

function generateData() {
  const keywordsData = {
    topic: form.topic || '地理课题',
    elements: selectedKeywords.elements,
    properties: selectedKeywords.properties,
    logics: selectedKeywords.logics,
    higherLogics: selectedKeywords.higherLogics,
    evaluation: selectedKeywords.evaluation
  }
  saveKeywords(keywordsData)
  
  const tasksData = generateTasks()
  saveTasks(tasksData)
  
  const studentsData = generateStudents()
  saveStudents(studentsData)
  
  currentStep.value = 4
}

function generateTasks() {
  const situations = form.situations.split('→').map(s => s.trim()).filter(s => s)
  return {
    "课题": form.topic || '地理课题',
    "情境1_浇水冲沟": {
      "序号": 1,
      "阶段": "课前→课中过渡",
      "背景": situations[0] || "课前观测数据显示不同样方的环境差异，浇水后出现冲沟现象。",
      "子任务": [
        {"编号": 1, "内容": "比对两样方的气温、湿度、土壤干湿及特殊现象记录", "类型": "文本描述"},
        {"编号": 2, "内容": "描述冲沟出现的位置和形态特征", "类型": "文本描述"},
        {"编号": 3, "内容": "列举受浇水影响发生变化的要素种类", "类型": "文本列举"},
        {"编号": 4, "内容": "用'______影响______'的句式，说出至少一组因果猜测", "类型": "因果描述"}
      ],
      "期望SOLO": "多点→关联"
    },
    "情境2_校园到赣县": {
      "序号": 2,
      "阶段": "课中建构",
      "背景": situations[1] || "研究区域存在特殊地貌现象，需要对比分析。",
      "子任务": [
        {"编号": 1, "内容": "提取研究区的气候、地质地貌、水文、土壤、植被五要素特征", "类型": "结构化填写"},
        {"编号": 2, "内容": "对比不同区域在要素特征上的主要差异（至少3个维度）", "类型": "对比描述"},
        {"编号": 3, "内容": "归纳同一描述框架在不同尺度上的通用性：共同逻辑是______改变→______变化→______响应", "类型": "填空+阐述"}
      ],
      "期望SOLO": "关联巩固→拓展萌芽"
    },
    "情境3_发育追踪": {
      "序号": 3,
      "阶段": "课中深度",
      "背景": situations[2] || "地貌发育经历多个阶段，需要分析要素间的相互作用。",
      "子任务": [
        {"编号": 1, "内容": "用'→'符号画出任意两个要素间的直接关联", "类型": "因果箭头描述"},
        {"编号": 2, "内容": "串联三个要素形成一条传导链", "类型": "因果链描述"},
        {"编号": 3, "内容": "补全四个或五个要素间的交叉箭头，形成因果网络", "类型": "因果网络描述"},
        {"编号": 4, "内容": "寻找可能存在的恶性反馈环节，用'→...→回到起点'的格式描述", "类型": "反馈环描述"}
      ],
      "期望SOLO": "关联→拓展抽象"
    },
    "情境4_治理措施": {
      "序号": 4,
      "阶段": "课中后段+课后",
      "背景": situations[3] || "区域治理采取多种模式，需要分析正反效应。",
      "子任务": [
        {"编号": 1, "内容": "用'→'画出治理恢复因果链（蓝色逻辑）", "类型": "因果链描述"},
        {"编号": 2, "内容": "画出治理可能引发的负面效应链（红色逻辑）", "类型": "因果链描述"},
        {"编号": 3, "内容": "口头阐述同一治理措施对上游和下游可能产生的不同影响", "类型": "辩证阐述"},
        {"编号": 4, "内容": "提出一条治理顺序建议，说明理由", "类型": "建议阐述"}
      ],
      "期望SOLO": "拓展抽象巩固"
    }
  }
}

function generateStudents() {
  const result = {}
  const badgeOrder = ['🌱 自然观察者', '🌿 要素猎人', '🌳 关联侦探', '🏅 系统架构师', '👑 全球顾问']
  const typeMap = {
    multi: { badge: badgeOrder[2], type: '多点结构代表' },
    relational: { badge: badgeOrder[3], type: '关联结构代表' },
    extended: { badge: badgeOrder[4], type: '拓展抽象代表' },
    u2m: { badge: badgeOrder[1], type: '单点→多点过渡' },
    m2r: { badge: badgeOrder[2], type: '多点→关联过渡' },
    r2e: { badge: badgeOrder[3], type: '关联→拓展过渡' },
    custom: { badge: badgeOrder[2], type: '自定义学生' }
  }
  
  for (let i = 0; i < form.studentCount; i++) {
    const typeIndex = i % form.selectedTypes.length
    const selectedType = form.selectedTypes[typeIndex]
    const config = typeMap[selectedType]
    const studentKey = `student${String.fromCharCode(65 + i)}`
    
    result[studentKey] = {
      name: `学生${String.fromCharCode(65 + i)}`,
      type: config.type,
      badge: config.badge,
      badgeHistory: generateBadgeHistory(config.badge),
      answers: generateAnswers(selectedType),
      marks: generateMarks(selectedType)
    }
  }
  return result
}

function generateBadgeHistory(finalBadge) {
  const badgeOrder = ['🌱 自然观察者', '🌿 要素猎人', '🌳 关联侦探', '🏅 系统架构师', '👑 全球顾问']
  const index = badgeOrder.indexOf(finalBadge)
  const history = []
  for (let i = 0; i <= index; i++) {
    history.push({
      badge: badgeOrder[i],
      time: `2024-01-${String(10 + i).padStart(2, '0')}`
    })
  }
  return history
}

function generateAnswers(type) {
  const baseAnswers = {
    's1_q1': '观察到不同区域的环境差异',
    's1_q4': '存在要素间的相互影响',
    's2_frame': '气候、地质、水文、土壤、植被等要素',
    's2_compare': '不同尺度存在差异',
    's2_common': '变化导致响应',
    's3_arrows': 'A→B',
    's3_feedback': '反馈机制分析',
    's4_blue': '积极效应',
    's4_red': '潜在问题',
    's4_talk': '综合分析'
  }
  
  if (type === 'extended') {
    return {
      ...baseAnswers,
      's1_q1': 'A点树荫导致地温低、蒸发弱、湿度高形成良性循环；D点裸土暴晒导致地温高、蒸发强、湿度低形成恶性循环',
      's1_q4': '如果持续高温少雨，裸土区可能出现更大冲沟；建议在裸土区覆盖植被减少蒸发',
      's3_feedback': '崩塌→出露更多砂层→更易渗水→进一步淘蚀→回到崩塌（恶性反馈环）',
      's4_talk': '治理要兼顾短期效益与长期可持续性，上游治理与下游影响，工程措施与生态修复'
    }
  }
  
  if (type === 'relational' || type === 'r2e') {
    return {
      ...baseAnswers,
      's1_q1': 'A树荫覆盖→地温低→蒸发弱→湿度高；D裸土暴晒→地温高→蒸发强→湿度低',
      's1_q4': '浇水→土壤湿度骤增→水分入渗→表层土松散→径流带走表土→冲沟形成',
      's3_arrows': '暴雨→地表径流→细沟下切→切穿黏土层→出露砂层→水分渗入→抗剪能力骤降→崩塌',
      's3_feedback': '崩塌→出露更多砂层→更易渗水→进一步淘蚀→回到崩塌'
    }
  }
  
  return baseAnswers
}

function generateMarks(type) {
  if (type === 'extended') return { s1: 'R', s2: 'E', s3: 'E', s4: 'E' }
  if (type === 'relational' || type === 'r2e') return { s1: 'R', s2: 'R', s3: 'E', s4: 'E' }
  if (type === 'multi' || type === 'm2r') return { s1: 'M', s2: 'M', s3: 'R', s4: 'R' }
  if (type === 'u2m') return { s1: 'U', s2: 'M', s3: 'M', s4: 'M' }
  return { s1: 'M', s2: 'M', s3: 'R', s4: 'R' }
}

function goToHome() {
  router.push('/')
}
</script>

<style scoped>
.generate-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.back-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.3);
}

.nav-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.generate-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.steps-progress {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-circle {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.step-indicator.active .step-circle {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.step-indicator.done .step-circle {
  background: #22c55e;
  color: white;
}

.step-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.step-panel {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-header {
  text-align: center;
  margin-bottom: 30px;
}

.panel-header h2 {
  margin: 0 0 10px 0;
  color: #ffffff;
}

.panel-desc {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.form-item.full-width {
  grid-column: 1 / -1;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}

.form-select option {
  background: #1a1a2e;
  color: #ffffff;
}

.number-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.number-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.number-btn:hover {
  background: rgba(99, 102, 241, 0.2);
}

.number-input {
  flex: 1;
  text-align: center;
}

.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.distribution-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.dist-label {
  width: 140px;
  color: rgba(255, 255, 255, 0.8);
}

.dist-slider {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider {
  flex: 1;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  cursor: pointer;
}

.dist-value {
  width: 50px;
  text-align: right;
  font-weight: bold;
  color: #8b5cf6;
}

.type-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.type-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-checkbox:hover {
  background: rgba(99, 102, 241, 0.1);
}

.type-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
}

.type-checkbox span {
  color: rgba(255, 255, 255, 0.8);
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.preview-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-badge {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.preview-name {
  font-weight: bold;
  color: #ffffff;
}

.preview-type {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.keyword-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.keyword-section h3 {
  margin: 0 0 15px 0;
  color: #ffffff;
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.keyword-tag {
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
}

.keyword-tag:hover,
.keyword-tag.selected {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-color: transparent;
}

.keyword-input-group {
  display: flex;
  gap: 10px;
}

.keyword-input {
  flex: 1;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #ffffff;
}

.keyword-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.add-btn {
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 35px;
}

.next-button,
.prev-button,
.generate-button,
.home-button {
  padding: 15px 35px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button,
.generate-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.next-button:hover,
.generate-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(99, 102, 241, 0.5);
}

.prev-button {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.prev-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.success-panel {
  text-align: center;
  padding: 60px 20px;
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 20px;
}

.success-panel h2 {
  margin: 0 0 10px 0;
  color: #ffffff;
}

.success-panel p {
  margin: 0 0 30px 0;
  color: rgba(255, 255, 255, 0.6);
}

.home-button {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(34, 197, 94, 0.5);
}

@media (max-width: 768px) {
  .navbar {
    padding: 12px 15px;
  }
  
  .steps-progress {
    gap: 15px;
  }
  
  .step-circle {
    width: 40px;
    height: 40px;
  }
  
  .step-panel {
    padding: 25px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .next-button,
  .prev-button,
  .generate-button {
    width: 100%;
    text-align: center;
  }
}
</style>