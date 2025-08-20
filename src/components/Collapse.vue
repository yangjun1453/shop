<template>
  <div v-for="(category, index) in categories" :key="category.title">
    <div
      class="flex h-12 cursor-pointer items-center justify-between gap-2 select-none"
      @click="toggle(index)"
      role="button"
      :aria-expanded="openIndexes.includes(index)"
    >
      <p>{{ category.title }}</p>
      <PhCaretRight
        :size="24"
        :class="[
          openIndexes.includes(index) ? 'rotate-90' : 'rotate-0',
          'shrink-0 transition-transform duration-200',
        ]"
      />
    </div>

    <div
      class="grid [transition-property:grid-template-rows,opacity] duration-300 ease-out"
      :class="
        openIndexes.includes(index)
          ? 'grid-rows-[1fr] opacity-100'
          : 'grid-rows-[0fr] opacity-0'
      "
    >
      <div class="overflow-hidden pt-2">
        <!-- Buttons type (Size) -->
        <div v-if="category.type === 'buttons'" class="flex flex-wrap gap-2">
          <button
            v-for="option in category.options"
            :key="option"
            class="btn"
            :class="
              (selectedFilters[category.key] || []).includes(option)
                ? 'btn-active'
                : ''
            "
            @click="
              updateSelectedFilters({ key: category.key, option: option })
            "
          >
            {{ option }}
          </button>
        </div>

        <!-- Checkboxes type (Availability, Category, Collections, Tags) -->
        <div v-else-if="category.type === 'checkboxes'" class="space-y-2">
          <Checkbox
            v-for="option in category.options"
            :key="option"
            :option="option"
            :filterKey="category.key"
            :checked="(selectedFilters[category.key] || []).includes(option)"
            @change="updateSelectedFilters"
          />
        </div>

        <!-- Color picker type (Colors) -->
        <div
          v-else-if="category.type === 'color-picker'"
          class="flex flex-wrap gap-2"
        >
          <div
            v-for="color in category.options"
            :key="color"
            @click="updateSelectedFilters({ key: category.key, option: color })"
            class="h-8 w-8 cursor-pointer rounded-full border-2 hover:border-gray-500"
            :class="[
              getColorClass(color),
              (selectedFilters[category.key] || []).includes(color)
                ? 'scale-110 border-4 border-gray-300'
                : 'border-gray-300',
            ]"
            :title="color"
          ></div>
        </div>

        <!-- Range slider type (Price Range) -->
        <div v-else-if="category.type === 'range-slider'">
          <div class="mb-2 flex justify-between text-sm text-gray-600">
            <span
              >{{ category.options.currency }}{{ category.options.min }}</span
            >
            <span
              >{{ category.options.currency }}{{ category.options.max }}</span
            >
          </div>
          <input
            type="range"
            min="0"
            :max="category.options.max"
            value="40"
            class="range range-primary"
            @input="updateMaxPrice($event.target.value)"
          />
          <span class="text-sm">{{ selectedFilters.price }}</span>
        </div>

        <!-- Star rating type (Ratings) -->
        <div v-else-if="category.type === 'star-rating'" class="space-y-2">
          <div
            v-for="rating in category.options"
            :key="rating"
            class="flex cursor-pointer items-center rounded p-1 hover:bg-gray-50"
          >
            <input type="radio" :name="`rating-${index}`" class="mr-2" />
            <span class="mr-2 text-yellow-400">★★★★★</span>
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
import { ref } from "vue";
import Checkbox from "./Checkbox.vue";
import { PhCaretRight } from "@phosphor-icons/vue";
const openIndexes = ref([]);

const props = defineProps({
  categories: { type: Array, required: true },
  selectedFilters: { type: Object, required: true },
});

const emit = defineEmits(["update:selectedFilters"]);

const toggle = (index) => {
  if (openIndexes.value.includes(index)) {
    openIndexes.value = openIndexes.value.filter((item) => item !== index);
  } else {
    openIndexes.value.push(index);
  }
};

const getColorClass = (color) => {
  const colorMap = {
    black: "bg-black",
    white: "bg-white",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    pink: "bg-pink-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
    brown: "bg-amber-700",
  };
  return colorMap[color] || "bg-gray-300";
};
const updateSelectedFilters = ({ key, option }) => {
  console.log(key, option);
  const current = props.selectedFilters[key] || [];
  const updated = current.includes(option)
    ? current.filter((o) => o !== option)
    : [...current, option];
  emit("update:selectedFilters", { ...props.selectedFilters, [key]: updated });
};
const updateMaxPrice = (value) => {
  emit("update:selectedFilters", {
    ...props.selectedFilters,
    price: value,
  });
  console.log(props.selectedFilters);
};
</script>

<style scoped></style>
