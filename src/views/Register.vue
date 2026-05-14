<template>
  <div class="register-container">
    <div class="register-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    
    <div class="register-card">
      <div class="card-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7.5 19.5a2.121 2.121 0 0 1-3-3z"/>
          </svg>
        </div>
        <h1>创建账号</h1>
        <p>加入地理思维进阶导航系统</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label>用户名</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input 
              v-model="username" 
              type="text" 
              placeholder="请输入用户名"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label>邮箱</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input 
              v-model="email" 
              type="email" 
              placeholder="请输入邮箱"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label>密码</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码（至少6位）"
              class="form-input"
              required
              minlength="6"
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <path d="M12 4l-1.41 1.41"/>
                <path d="M15.58 15.58L12 19"/>
                <path d="M12 12l3.59 3.59"/>
                <path d="M8.41 8.41L12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>确认密码</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <input 
              v-model="confirmPassword" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请再次输入密码"
              class="form-input"
              required
            />
          </div>
        </div>

        <label class="checkbox-label full-width">
          <input type="checkbox" v-model="agreeTerms" required/>
          <span>我已阅读并同意<a href="#" class="terms-link">用户协议</a>和<a href="#" class="terms-link">隐私政策</a></span>
        </label>

        <button type="submit" class="register-btn" :disabled="loading || !isValid">
          <span v-if="loading">注册中...</span>
          <span v-else>注册</span>
        </button>
      </form>

      <div class="login-link">
        <span>已有账号？</span>
        <button type="button" class="login-btn" @click="goToLogin">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const agreeTerms = ref(false)
const loading = ref(false)

const isValid = computed(() => {
  return password.value === confirmPassword.value && password.value.length >= 6
})

function handleRegister() {
  if (!isValid.value) {
    alert('密码不一致或长度不足6位')
    return
  }

  loading.value = true
  
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    
    if (users[username.value]) {
      alert('用户名已存在')
      loading.value = false
      return
    }

    users[username.value] = {
      username: username.value,
      email: email.value,
      password: password.value,
      createdAt: new Date().toLocaleDateString()
    }

    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', username.value)
    
    alert('注册成功！')
    router.push('/')
  }, 1000)
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-dark-900) 0%, var(--bg-dark-800) 50%, var(--bg-dark-700) 100%);
  position: relative;
  overflow: hidden;
}

.register-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #ec4899, var(--secondary-500));
  top: -80px;
  right: -80px;
  animation-delay: 0s;
}

.orb-2 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, var(--primary-500), #06b6d4);
  bottom: -40px;
  left: -40px;
  animation-delay: -4s;
}

.orb-3 {
  width: 220px;
  height: 220px;
  background: linear-gradient(135deg, #10b981, var(--primary-500));
  top: 40%;
  left: 15%;
  animation-delay: -6s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.register-card {
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 32px;
  padding: 3rem;
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-xl);
  position: relative;
  z-index: 10;
}

.card-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--secondary-500), #ec4899);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
}

.logo svg {
  width: 40px;
  height: 40px;
}

.card-header h1 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.6rem;
}

.card-header p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-group label {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper svg:first-child {
  position: absolute;
  left: 1rem;
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.form-input {
  width: 100%;
  padding: 1rem 3.5rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-normal);
}

.form-input:focus {
  outline: none;
  border-color: var(--secondary-500);
  background: rgba(139, 92, 246, 0.1);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all var(--transition-fast);
}

.toggle-password:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.08);
}

.toggle-password svg {
  width: 18px;
  height: 18px;
}

.checkbox-label.full-width {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
}

.checkbox-label.full-width input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 18px;
  height: 18px;
  accent-color: var(--secondary-500);
}

.terms-link {
  color: var(--secondary-400);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.terms-link:hover {
  color: var(--secondary-300);
}

.register-btn {
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(135deg, var(--secondary-500), #ec4899);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  margin-top: 0.5rem;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  margin-top: 1.75rem;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.login-link span {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.login-btn {
  background: none;
  border: none;
  color: var(--secondary-400);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.login-btn:hover {
  color: var(--secondary-300);
}

@media (max-width: 480px) {
  .register-card {
    margin: 1.5rem;
    padding: 2rem;
  }
}
</style>