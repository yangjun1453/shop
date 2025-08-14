<template>
    <RouterLink :to="{ name: 'ProductDetail', params: { id: product.id } }" class="h-full block  w-full">

        <div class="card bg-base-100  shadow-sm  md:card-md  card-sm h-full">
            <figure class="aspect-[4/5] w-full">
                <img :src="product.images?.[0]" alt="Shoes" class="w-full h-full object-cover" loading="lazy"
                    decoding="async" />
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