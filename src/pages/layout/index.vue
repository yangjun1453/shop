<template>
    <div class=" lg:w-4/5 w-full h-full mx-auto p-2 flex flex-col">
        <Header />



        <RouterView  class="flex-1"/>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
</script>

<style scoped></style>