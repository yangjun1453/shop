<template>
  <!-- Responsive top margin: smaller on mobile, scales up to 61px at xl (1280px) -->
  <div class="flex items-center justify-between pt-5 text-xl">
    <div>
      <ul class="flex space-x-8">
        <RouterLink to="/">Home</RouterLink>
        <li>Collections</li>
        <li>New</li>
      </ul>
    </div>

    <div class="flex items-center gap-20">
      <div
        class="-rotate-45 cursor-pointer rounded-full bg-black p-4 hover:bg-[#495057]"
      >
        <PhHeart :size="24" class="" color="#f8f9fa" />
      </div>

      <div class="flex items-center">
        <p
          class="z-10 cursor-pointer rounded-3xl bg-black px-5 py-4 text-white hover:bg-[#495057]"
          @click="router.push('/cart')"
        >
          cart
        </p>
        <div
          class="ml-[-3px] cursor-pointer rounded-full border-10 border-black p-2 hover:border-[#495057]"
        >
          <PhShoppingBag :size="24" />
        </div>
      </div>
      <div
        class="cursor-pointer rounded-full bg-black p-4 hover:bg-[#495057]"
        @click="router.push('/profile')"
      >
        <PhUser :size="24" color="#f8f9fa" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhShoppingBag, PhUser, PhHeart } from "@phosphor-icons/vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped></style>
