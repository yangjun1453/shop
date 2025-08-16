<template>
  <div class="flex gap-10  justify-between  mt-20 ">

    <div class="text-xl flex-1 p-1 ">
      <Collapse :categories="categories" v-model:selectedFilters="selectedFilters" />
    </div>
    <!-- 右边内容 -->
    <div class="mr-2 flex-3">
      <div>
        <nav aria-label="breadcrumb" class=" text-gray-800">
          <ol class="flex h-8 space-x-2 text-gray-800">
            <li class="flex items-center">
              <a rel="noopener noreferrer" href="#" title="Back to homepage"
                class="flex items-center hover:underline">Home</a>
            </li>
            <li class="flex items-center space-x-1">
              <span class="text-gray-600">/</span>
              <a rel="noopener noreferrer" href="#" class="flex items-center px-1 capitalize hover:underline">Parent</a>
            </li>
            <li class="flex items-center space-x-1">
              <span class="text-gray-600">/</span>
              <a rel="noopener noreferrer" href="#" class="flex items-center px-1 capitalize hover:underline">Parent</a>
            </li>
            <li class="flex items-center space-x-1">
              <span class="text-gray-600">/</span>
              <a rel="noopener noreferrer" href="#"
                class="flex items-center px-1 capitalize hover:no-underline cursor-default">Current</a>
            </li>
          </ol>
        </nav>
      </div>
      <p> Products </p>

      <div class="flex">

        <div>
          <fieldset class="w-full space-y-1 text-gray-800">
            <label for="Search" class="hidden">Search</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="button" title="search" class="p-1 focus:outline-none focus:ring">
                  <svg fill="currentColor" viewBox="0 0 512 512" class="w-4 h-4 text-gray-800">
                    <path
                      d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z">
                    </path>
                  </svg>
                </button>
              </span>
              <input type="search" name="Search" placeholder="Search..."
                class="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-emerald-600">
            </div>
          </fieldset>
        </div>
        <div class="grid grid-cols-5 text-center gap-2">
          <p class="border px-2">NEW</p>
          <p class="border px-2">SHIRTs</p>
          <p class="border px-2">POLO SHIRTS</p>
          <p class="border px-2">T-SHIRTS</p>
          <p class="border px-2">JUMPSUITS</p>
          <p class="border px-2">JACKETs</p>
          <p class="border px-2">JUMPSUITS</p>
          <p class="border  px-2">JACKETs</p>
          <p class="border px-2">NEW</p>
          <p class="border px-2">SHIRTs</p>


        </div>

      </div>

      <div v-if="products.length" class="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 lg:justify-items-center gap-5 max-h-[70vh] overflow-y-auto pr-2 mt-5 pb-2 
        ">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />


      </div>
      <div v-else>
        <span class="loading loading-spinner loading-xl"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../../components/ProductCard.vue';
import Collapse from '../../components/Collapse.vue';
import { supabase } from '../../lib/supabaseClient'
import { onMounted, ref, computed } from 'vue';

const products = ref([])

async function getProducts() {
  const { data } = await supabase.from('products').select()
  products.value = data
}

const categories = [
  {
    key: 'size',
    title: 'Size',
    type: 'buttons',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    key: 'availability',
    title: 'Availability',
    type: 'checkboxes',
    options: ['In Stock', 'Pre-order', 'Out of Stock']
  },
  {
    key: 'category',
    title: 'Category',
    type: 'checkboxes',
    options: ['T-shirt', 'Hoodie', 'Dress', 'Shoes', 'Accessories', 'Jacket', 'Sweaters']
  },
  {
    key: 'colors',
    title: 'Colors',
    type: 'color-picker',
    options: ['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'gray', 'brown']
  },
  {
    key: 'price',
    title: 'Price Range',
    type: 'range-slider',
    options: { min: 0, max: 500, step: 10, currency: '$' }
  },
  {
    key: 'collection',
    title: 'Collections',
    type: 'checkboxes',
    options: ['Summer 2024', 'Winter Collection', 'Casual Wear', 'Formal Wear', 'Sports', 'Limited Edition']
  },
  {
    key: 'tags',
    title: 'Tags',
    type: 'checkboxes',
    options: ['New Arrival', 'Best Seller', 'On Sale', 'Trending', 'Eco-Friendly', 'Premium Quality']
  },
  {
    key: 'ratings',
    title: 'Ratings',
    type: 'star-rating',
    options: ['5 Stars', '4 Stars & Up', '3 Stars & Up', '2 Stars & Up', '1 Star & Up']
  }
]

onMounted(() => {
  getProducts()
})


const selectedFilters = ref({
  size: [],
  availability: [],
  category: [],
  colors: [],
  price: null,
  collection: [],
  tags: [],
  ratings: null
})

const filterKeys = categories.filter(c => c.type === 'checkboxes' || c.type === 'buttons' || c.type === 'color-picker').map(c => c.key)




const filteredProducts = computed(() => {
  let list = products.value

  for (let key of filterKeys) {

    let selectedArr = selectedFilters.value[key]
    if (!selectedArr.length) continue
    list = list.filter(p => {
      if (typeof p[key] === 'string' || typeof p[key] === 'number') {
        return selectedArr.includes(String(p[key])) || selectedArr.includes(p[key])

      }


      if (Array.isArray(p[key])) {
        return p[key].some(item => selectedArr.includes(item))
      }

      return false


    }


    )



  }



  const maxPrice = selectedFilters.value.price
  if (maxPrice) {
    list = list.filter(p => Number(p.price) < Number(maxPrice))
  }
  return list




})
</script>

<style scoped></style>