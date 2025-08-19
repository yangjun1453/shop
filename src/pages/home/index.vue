<template>
    <div>
        <div class="mt-20 text-3xl">
            <ul>
                <li>MEN</li>
                <li>WOMEN</li>
                <li>KIDS</li>

            </ul>

        </div>
        <div class="mt-4 ">

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
                        class="w-32 py-2 pl-10 text-sm  sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-emerald-600 rounded-3xl">
                </div>
            </fieldset>
        </div>
        <div class="flex mt-30 gap-10 justify-between">

            <div class="flex flex-col justify-between">
                <div>
                    <h2 class="text-5xl">NEW </h2>
                    <h2 class="  text-6xl font-black 
  text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500
  drop-shadow-lg">Mariel es una belleza</h2>
                    <div>
                        <p>
                            Summer

                        </p>
                        <p>2025</p>
                    </div>
                </div>
                <p @click="toProducts" class=" bg-[#D9D9D9] p-4 hover:bg-[#f1f3f5] cursor-pointer rounded-3xl">Go to
                    Shop ----></p>
            </div>

            <div class="flex gap-8 ">
                <!-- 图片 -->


                <img src="/img/cezar-sampaio-MpaWO-UOcV0-unsplash.jpg" alt=" "
                    class=" object-cover w-100 h-90  rounded-3xl ">
                <img src="/img/rishabh-dharmani-qXejYBGqP7Q-unsplash.jpg" alt=""
                    class="w-100 object-cover h-90  object-[50%_30%] rounded-3xl">
            </div>


        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
const toProducts = () => {
    router.push('/products')
}
</script>

<style scoped></style>