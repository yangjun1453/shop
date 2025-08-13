<template>
    <div v-for="(category, index) in categories" :key="category.title">
        <div class="flex items-center justify-between h-12 cursor-pointer select-none gap-2 " @click="toggle(index)"
            role="button" :aria-expanded="openIndexes.includes(index)">
            <p>{{ category.title }}</p>
            <PhCaretRight :size="24"
                :class="[openIndexes.includes(index) ? 'rotate-90' : 'rotate-0', 'transition-transform duration-200 shrink-0']" />
        </div>

        <div class="grid duration-300 ease-out [transition-property:grid-template-rows,opacity]"
            :class="openIndexes.includes(index) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <div class="overflow-hidden pt-2">
                <!-- Buttons type (Size) -->
                <div v-if="category.type === 'buttons'" class="flex flex-wrap gap-2">
                    <button v-for="option in category.options" :key="option"
                        class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
                        {{ option }}
                    </button>
                </div>

                <!-- Checkboxes type (Availability, Category, Collections, Tags) -->
                <div v-else-if="category.type === 'checkboxes'" class="space-y-2">
                    <Checkbox v-for="option in category.options" :key="option" :option="option" />
                </div>

                <!-- Color picker type (Colors) -->
                <div v-else-if="category.type === 'color-picker'" class="flex flex-wrap gap-2">
                    <div v-for="color in category.options" :key="color"
                        class="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-500"
                        :class="getColorClass(color)" :title="color"></div>
                </div>

                <!-- Range slider type (Price Range) -->
                <div v-else-if="category.type === 'range-slider'">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{{ category.options.currency }}{{ category.options.min }}</span>
                        <span>{{ category.options.currency }}{{ category.options.max }}</span>
                    </div>
                    <input type="range" :min="category.options.min" :max="category.options.max"
                        :step="category.options.step" class="w-full" />
                </div>

                <!-- Star rating type (Ratings) -->
                <div v-else-if="category.type === 'star-rating'" class="space-y-2">
                    <div v-for="rating in category.options" :key="rating"
                        class="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input type="radio" :name="`rating-${index}`" class="mr-2" />
                        <span class="text-yellow-400 mr-2">★★★★★</span>
                        <span class="text-sm">{{ rating }}</span>
                    </div>
                </div>

                <!-- Fallback for unknown types -->
                <div v-else class="text-gray-500">
                    <slot></slot>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';
import { PhCaretRight } from '@phosphor-icons/vue';
const openIndexes = ref([])
defineProps(['categories'])

const toggle = (index) => {
    if (openIndexes.value.includes(index)) {
        openIndexes.value = openIndexes.value.filter(item => item !== index)
    } else {
        openIndexes.value.push(index)
    }
}

const getColorClass = (color) => {
    const colorMap = {
        'Black': 'bg-black',
        'White': 'bg-white',
        'Red': 'bg-red-500',
        'Blue': 'bg-blue-500',
        'Green': 'bg-green-500',
        'Yellow': 'bg-yellow-500',
        'Pink': 'bg-pink-500',
        'Purple': 'bg-purple-500',
        'Gray': 'bg-gray-500',
        'Brown': 'bg-amber-700'
    }
    return colorMap[color] || 'bg-gray-300'
}
</script>

<style scoped></style>