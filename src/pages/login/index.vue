<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col  space-y-4 w-80 ">
            <h1>Login</h1>
            <div role="alert" class="alert alert-success" v-if="successMsg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ successMsg }}</span>
            </div>
            <div>
                <label class="input ">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                            stroke="currentColor">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input type="email" placeholder="mail@site.com" v-model="email" />
                </label>
                <div role="alert" class="alert alert-error mt-2" v-if="emailError">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ emailError }}</span>
                </div>
            </div>

            <div>

                <label class="input ">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                            stroke="currentColor">
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z">
                            </path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input type="password" placeholder="Password" v-model="password" />

                </label>
                <div role="alert" class="alert alert-error mt-2   " v-if="passwordError">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ passwordError }}</span>
                </div>
            </div>
            <button class="btn btn-neutral" @click="handleLoginClick" :disabled="loading">


                登录


            </button>
            <p class="text-xs self-end">还没有账号？点击<router-link to="/register" class=" underline">注册</router-link></p>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../lib/supabaseClient';
const router = useRouter()
const email = ref('')
const password = ref('')


const emailError = ref('')
const passwordError = ref('')
const successMsg = ref('')
const loading = ref(false)



const handleLoginClick = async () => {
    emailError.value = ''
    passwordError.value = ''
    if (!email.value) {
        emailError.value = '请填写邮箱'
        return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = '邮箱格式不正确'
        return
    }
    if (!password.value) {
        passwordError.value = '请填写密码'
        return
    }
    loading.value = true
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,


        }

        )

        if (error) {
            passwordError.value = error.message
        } else {
            successMsg.value = '登录成功'
            setTimeout(() => {
                router.push('/profile')
            }, 2000)
        }
    }
    catch (err) {

        passwordError.value = err.message || '登录失败，请重试'

    }
    finally {
        loading.value = false
    }

}
</script>

<style scoped></style>