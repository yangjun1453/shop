<template>
  <div class="mt-20 flex items-center justify-center gap-10" v-if="product">
    <!-- 图片区域 -->
    <div class="flex gap-2">
      <img
        :src="product.images[bigPhotoIndex]"
        class="w-100 object-cover"
        alt=""
      />
      <div class="flex w-20 flex-col">
        <img
          v-for="(img, index) in product.images.slice(1)"
          :src="img"
          :key="index"
          class="w-100 flex-1 object-cover"
          alt=""
          @click="checkPhoto(index + 1)"
        />
      </div>
    </div>

    <!-- 详情信息 -->
    <div class="flex flex-col gap-2">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>${{ product.price }}</p>
      <div class="flex gap-2">
        <button
          v-for="size in product.size"
          :key="size"
          :class="[
            'btn',
            selectedSize === size ? 'btn-primary' : 'btn-outline',
          ]"
          @click="selectedSize = size"
        >
          {{ size }}
        </button>
      </div>

      <div class="flex gap-2">
        <div
          v-for="color in product.colors"
          :key="color"
          :style="{ backgroundColor: color }"
          :class="[
            'h-10 w-10 rounded-full',
            selectedColor === color ? 'ring-primary ring' : '',
          ]"
          @click="selectedColor = color"
        ></div>
      </div>
      <div>
        <div class="rating rating-lg rating-half">
          <input type="radio" name="rating-11" class="rating-hidden" />
          <input
            v-for="star in stars"
            type="radio"
            name="rating-11"
            class="mask mask-star-2 bg-green-500"
            :class="star.half ? 'mask-half-1' : 'mask-half-2'"
            :checked="star.value === starCount"
          />
        </div>
      </div>
      <button class="btn btn-primary" @click="handleAddToCart">
        Add to Cart
      </button>
    </div>
  </div>
  <div v-else>
    <span class="loading loading-spinner loading-xl"></span>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { supabase } from "../../lib/supabaseClient";
import { computed } from "vue";
import { addToCart } from "../../api";
const selectedSize = ref("");
const selectedColor = ref("");
const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", route.params.id)
    .single();
  if (!error) product.value = data;
  console.log(product.value);
});

const starCount = computed(() => {
  if (!product.value) return 0;
  return Math.round(product.value.rating * 2) / 2;
});
const stars = Array.from({ length: 10 }, (_, i) => ({
  value: (i + 1) * 0.5,
  half: (i + 1) % 2 !== 0, // 奇数是半星
}));

const bigPhotoIndex = ref(0);
const checkPhoto = (v) => {
  bigPhotoIndex.value = v;
};
const handleAddToCart = async () => {
  try {
    // 检查是否选择了 size/color
    if (!selectedSize.value) {
      alert("请选择尺码");
      return;
    }
    if (!selectedColor.value) {
      alert("请选择颜色");
      return;
    }

    // 调用 API
    await addToCart(
      product.value.id,
      selectedSize.value,
      selectedColor.value,
      1,
    );

    alert("已加入购物车！");
  } catch (err) {
    alert(err.message || "加入购物车失败");
  }
};
</script>
