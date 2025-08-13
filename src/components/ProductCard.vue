<template>
    <RouterLink :to="{ name: 'ProductDetail', params: { id: product.id } }" class="h-full">

        <div class="card bg-base-100 w-70 shadow-sm card-lg h-full">
            <figure>
                <img :src="product.images?.[0]" alt="Shoes" class="w-full h-98 object-cover" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    {{ product.name }}
                    <div class="badge badge-secondary">{{ product.tags[0] }}</div>
                </h2>
                <p>{{ product.description }}</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">{{ product.category }}</div>
                    <div class="badge badge-outline">${{ product.price }}</div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
defineProps(['product'])
</script>

<style scoped></style>