<template>
    <div class="flex mt-20 gap-10    justify-center items-center" v-if="product">
        <!-- 图片区域 -->
        <div>
            <img :src="product.images?.[0]" class="w-100  object-cover" alt="">
        </div>

        <!-- 详情信息 -->
        <div class="flex flex-col gap-2">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p>${{ product.price }}</p>
            <div class="flex gap-2">
                <button v-for="size in product.size" class="btn btn-xs sm:btn-sm  md:btn-md lg:btn-lg xl:btn-xl">{{ size
                    }}</button>
            </div>

            <div class="flex gap-2">
                <div v-for="item in product.color" :style="{ backgroundColor: item }" class="w-10 h-10 rounded-full">


                </div>
            </div>
            <div>
                <div class="rating rating-lg rating-half">
                    <input type="radio" name="rating-11" class="rating-hidden" />
                    <input v-for="star in stars" type="radio" name="rating-11" class="mask mask-star-2 bg-green-500"
                        :class="star.half ? 'mask-half-1' : 'mask-half-2'" :checked="star.value === starCount" />

                </div>
            </div>
        </div>

    </div>
    <div v-else>
        <span class="loading loading-spinner loading-xl"></span>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient'
import { computed } from 'vue'
const route = useRoute()
const product = ref(null)

onMounted(async () => {
    const { data, error } = await supabase.from('products').select().eq('id', route.params.id).single()
    if (!error) product.value = data
})


const starCount = computed(() => {
    if (!product.value) return 0
    return (Math.round(product.value.rating * 2) / 2)
})
const stars = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1) * 0.5,
    half: (i + 1) % 2 !== 0 // 奇数是半星
}))
</script>