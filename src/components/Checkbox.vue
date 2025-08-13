<template>
    <div>


        <label class="label">
            <input type="checkbox" checked="checked" class="checkbox" />
            {{ option }}
        </label>

    </div>
</template>

<script setup>
const props = defineProps(['option'])

</script>

<style scoped></style>