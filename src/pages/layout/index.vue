<template>
    <div class=" lg:w-4/5 w-full h-full mx-auto p-2">
        <Header />



        <RouterView />
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
</script>

<style scoped></style>