<template>
    <!-- Responsive top margin: smaller on mobile, scales up to 61px at xl (1280px) -->
    <div class="flex justify-between items-center pt-5 text-xl">
        <div>
            <ul class="flex space-x-8">
                <RouterLink to="/">Home</RouterLink>
                <li>Collections</li>
                <li>New</li>
            </ul>
        </div>


        <div class="flex items-center gap-20">
            <div class="p-4  -rotate-45 bg-black rounded-full cursor-pointer hover:bg-[#495057]">
                <PhHeart :size="24" class="" color="#f8f9fa" />
            </div>

            <div class="flex items-center ">
                <p class="px-5 py-4 bg-black text-white rounded-3xl cursor-pointer hover:bg-[#495057] z-10"
                    @click="router.push('/cart')"> cart</p>
                <div class="p-2 ml-[-3px] border-black border-10 rounded-full cursor-pointer hover:border-[#495057]">
                    <PhShoppingBag :size="24" />
                </div>
            </div>
            <div class="p-4   bg-black rounded-full cursor-pointer hover:bg-[#495057]" @click="router.push('/profile')">
                <PhUser :size="24" color="#f8f9fa" />
            </div>

        </div>
    </div>

</template>

<script setup>
import { PhShoppingBag, PhUser, PhHeart } from '@phosphor-icons/vue';
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style scoped></style>