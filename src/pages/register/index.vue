<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col space-y-4 w-80   ">
      <h1>Sign Up</h1>

      <!-- 提示信息 -->
      <div v-if="successMsg">
        <div role="alert" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ successMsg }}</span>
        </div>
      </div>

      <!-- 邮箱输入 -->
      <div>
        <label class="input">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input type="email" placeholder="mail@site.com" v-model="email" />
        </label>
        <p v-if="emailError">{{ emailError }}</p>
      </div>

      <!-- 验证码输入 -->
      <div v-if="step >= 2">
        <input type="text" placeholder="验证码" class="input" v-model="emailCode" maxlength="6" />
        <div role="alert" class="alert alert-error" v-if="otpError">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ otpError }}</span>
        </div>
      </div>

      <!-- 密码输入 -->
      <div v-if="step === 3">
        <label class="input">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z">
              </path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input type="password" placeholder="Password" minlength="8" v-model="password" />
        </label>
        <p v-if="passwordError">{{ passwordError }}</p>
      </div>

      <!-- 单按钮 -->
      <button class="btn btn-neutral" :disabled="loading" @click="handleAction">
        <span v-if="loading" class="loading loading-spinner loading-md"></span>
        <span v-else>{{ buttonText }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const emailCode = ref('')

const emailError = ref('')
const otpError = ref('')
const passwordError = ref('')

const loading = ref(false)
const successMsg = ref('')

const step = ref(1) // 1: 发验证码, 2: 验证OTP, 3: 设置密码

const buttonText = computed(() => {
  switch (step.value) {
    case 1: return '获取验证码'
    case 2: return '验证并激活'
    case 3: return '设置密码'
  }
})

const handleAction = async () => {
  if (step.value === 1) {
    const ok = await sendOtp()
    if (ok) step.value = 2
  } else if (step.value === 2) {
    const ok = await verifyOtp()
    if (ok) step.value = 3
  } else if (step.value === 3) {
    await setPassword()
  }
}

const sendOtp = async () => {
  emailError.value = ''
  if (!email.value) {
    emailError.value = '请输入邮箱'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = '邮箱格式不正确'
    return false
  }
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) {
      emailError.value = error.message
      return false
    } else {
      successMsg.value = '验证码已发送，请查收'
      setTimeout(() => (successMsg.value = ''), 2000)
      return true
    }
  } finally {
    loading.value = false
  }
}

const verifyOtp = async () => {
  otpError.value = ''
  if (!emailCode.value) {
    otpError.value = '请输入验证码'
    return false
  }
  loading.value = true
  try {
    const { error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: emailCode.value,
      type: 'email'
    })
    if (error) {
      otpError.value = error.message
      return false
    } else {
      successMsg.value = '验证成功！'
      setTimeout(() => (successMsg.value = ''), 2000)
      return true
    }
  } finally {
    loading.value = false
  }
}

const setPassword = async () => {
  passwordError.value = ''
  if (!password.value) {
    passwordError.value = '请输入密码'
    return false
  }
  loading.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: password.value })
    if (error) {
      passwordError.value = error.message
      return false
    } else {
      successMsg.value = '设置密码成功'
      setTimeout(() => {
        successMsg.value = ''
        router.push('/')
      }, 2000)
      return true
    }
  } finally {
    loading.value = false
  }
}
</script>
