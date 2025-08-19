<!-- src/views/Profile.vue -->
<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="card bg-base-100 shadow-xl w-96 p-6">
            <h2 class="text-2xl font-bold mb-4">个人资料</h2>

            <div v-if="user" class="space-y-3">
                <p><strong>邮箱:</strong> {{ user.email }}</p>
                <p><strong>用户ID:</strong> {{ user.id }}</p>
                <p><strong>创建时间:</strong> {{ new Date(user.created_at).toLocaleString() }}</p>
                <p><strong>已验证:</strong> {{ user.email_confirmed_at ? '是' : '否' }}</p>
            </div>

            <div v-else>
                <p>加载中...</p>
            </div>

            <button @click="signOut" class="btn btn-outline mt-4">退出登录</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

// 获取用户信息
const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        router.push('/login') // 未登录则跳转
        return
    }
    user.value = data.user
}

// 退出登录
const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}

onMounted(() => {
    fetchUser()
})
</script>