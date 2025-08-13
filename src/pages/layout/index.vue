<template>
    <div class=" w-3/4 h-full mx-auto">
        <Header />



        <RouterView />
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
</script>

<style scoped></style>