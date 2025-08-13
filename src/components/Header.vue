<template>
    <!-- Responsive top margin: smaller on mobile, scales up to 61px at xl (1280px) -->
    <div class="flex justify-between items-center mt-5 text-xl">
        <div>
            <ul class="flex space-x-8">
                <RouterLink to="/">Home</RouterLink>
                <li>Collections</li>
                <li>New</li>
            </ul>
        </div>


        <div class="flex items-center">
            <PhHeart :size="24" class="" />
            <div class="flex items-center">
                <p class="px-4 py-3 bg-black text-white rounded-3xl"> cart</p>
                <PhShoppingBag :size="24" />
            </div>

            <PhUser :size="24" />
        </div>
    </div>

</template>

<script setup>
import { PhShoppingBag, PhUser, PhHeart } from '@phosphor-icons/vue';
</script>

<style scoped></style>