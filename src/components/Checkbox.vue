<template>
    <div>


        <label class="label cursor-pointer flex items-center gap-2">
            <input type="checkbox" class="checkbox" @change="emit('change', { key: filterKey, option })"
                :checked="checked" />
            <span>{{ option }}</span>
        </label>

    </div>
</template>

<script setup>
const props = defineProps({
    option: { type: String, required: true },
    checked: { type: Boolean, default: false },
    filterKey: { type: String, required: true }
})



const emit = defineEmits(['change'])




</script>

<style scoped></style>