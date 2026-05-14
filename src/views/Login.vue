<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    
    <div class="login-card">
      <div class="card-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
            <path d="M2 12h20"/>
          </svg>
        </div>
        <h1>地理思维进阶导航系统</h1>
        <p>Geography Thinking Navigator</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
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
          <label>密码</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码"
              class="form-input"
              required
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

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe"/>
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-link" @click.prevent="goToRegister">忘记密码?</a>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">登录中...</span>
          <span v-else>登录</span>
        </button>
      </form>

      <div class="register-link">
        <span>还没有账号？</span>
        <button type="button" class="register-btn" @click="goToRegister">立即注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

function handleLogin() {
  loading.value = true
  
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[username.value] && users[username.value].password === password.value) {
      localStorage.setItem('currentUser', username.value)
      router.push('/')
    } else {
      alert('用户名或密码错误')
      loading.value = false
    }
  }, 1000)
}

function goToRegister() {
  router.push('/register')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-dark-900) 0%, var(--bg-dark-800) 50%, var(--bg-dark-700) 100%);
  position: relative;
  overflow: hidden;
}

.login-bg {
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
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--secondary-500), #ec4899);
  bottom: -50px;
  right: -50px;
  animation-delay: -3s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #06b6d4, var(--primary-500));
  top: 50%;
  right: 10%;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.login-card {
  width: 100%;
  max-width: 420px;
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
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: var(--shadow-glow);
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  border-color: var(--primary-500);
  background: rgba(99, 102, 241, 0.1);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-500);
}

.forgot-link {
  color: var(--primary-400);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.forgot-link:hover {
  color: var(--primary-300);
}

.login-btn {
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-link {
  margin-top: 1.75rem;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.register-link span {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.register-btn {
  background: none;
  border: none;
  color: var(--primary-400);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.register-btn:hover {
  color: var(--primary-300);
}

@media (max-width: 480px) {
  .login-card {
    margin: 1.5rem;
    padding: 2rem;
  }
}
</style>