<template>
  <div class="mx-auto flex h-full w-full flex-col p-2 lg:w-4/5">
    <Header />
    <RouterView class="flex-1" />
  </div>
</template>

<script setup>
import Header from "../../components/Header.vue";
</script>

<style scoped></style>
