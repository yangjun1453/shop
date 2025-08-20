<template>
  <div class="flex justify-center">
    <div
      class="mt-10 flex max-w-3xl flex-1 flex-col space-y-4 bg-gray-50 p-6 text-gray-800 sm:p-10"
    >
      <h2 class="text-xl font-semibold">Your cart</h2>
      <ul class="flex flex-col divide-y divide-gray-300">
        <li
          class="flex flex-col py-6 sm:flex-row sm:justify-between"
          v-for="item in cartItems"
        >
          <div class="flex w-full space-x-2 sm:space-x-4">
            <img
              class="h-20 w-20 flex-shrink-0 rounded border-transparent bg-gray-500 object-cover outline-none sm:h-32 sm:w-32"
              alt="Polaroid camera"
              :src="item.products.images[0]"
            />
            <div class="flex w-full flex-col justify-between pb-4">
              <div class="flex w-full justify-between space-x-2 pb-2">
                <div class="space-y-1">
                  <h3 class="text-lg leading-snug font-semibold sm:pr-8">
                    {{ item.products.name }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ item.products.tags[0] }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-semibold">
                    ${{ item.products.price }}x{{ item.quantity }}
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ item.size }}
                  </p>
                  <div
                    :style="{ backgroundColor: item.color }"
                    class="h-10 w-10 rounded-4xl shadow-2xl"
                  ></div>
                </div>
              </div>
              <div class="flex divide-x text-sm">
                <button
                  type="button"
                  class="flex items-center space-x-1 px-2 py-1 pl-0"
                  @click="removeItem(item.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="h-4 w-4 fill-current"
                  >
                    <path
                      d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"
                    ></path>
                    <rect width="32" height="200" x="168" y="216"></rect>
                    <rect width="32" height="200" x="240" y="216"></rect>
                    <rect width="32" height="200" x="312" y="216"></rect>
                    <path
                      d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"
                    ></path>
                  </svg>
                  <span>Remove</span>
                </button>
                <button
                  type="button"
                  class="flex items-center space-x-1 px-2 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="h-4 w-4 fill-current"
                  >
                    <path
                      d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"
                    ></path>
                  </svg>
                  <span>Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="space-y-1 text-right">
        <p>
          Total amount:
          <span class="font-semibold">{{ totalPrice }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Not including taxes and shipping costs
        </p>
      </div>
      <div class="flex justify-end space-x-4">
        <button
          @click="router.push('/products')"
          type="button"
          class="rounded-md border border-emerald-600 px-6 py-2"
        >
          Back
          <span class="sr-only sm:not-sr-only">to shop</span>
        </button>
        <button
          type="button"
          class="rounded-md border border-emerald-600 bg-emerald-600 px-6 py-2 text-gray-50"
        >
          <span class="sr-only sm:not-sr-only">Continue to</span>Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { fetchCartItemsWithProduct, removeCartItem } from "../../api";
import { useRouter } from "vue-router";
const router = useRouter();
const cartItems = ref([]);
const totalPrice = computed(() => {
  const total = cartItems.value.reduce((acc, cur) => {
    const price = cur.products?.price || 0;
    const quantity = cur.quantity || 0;
    return acc + quantity * price;
  }, 0);
  return parseFloat(total.toFixed(2)); // 四舍五入到两位小数
});
onMounted(async () => {
  cartItems.value = await fetchCartItemsWithProduct();
  console.log(cartItems);
});

async function removeItem(id) {
  if (!confirm("确定要删除这个商品吗？")) return;

  try {
    await removeCartItem(id);
    // 从本地数据中移除
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
  } catch (err) {
    alert("删除失败：" + err.message);
  }
}
</script>
