<template>
  <Collapse :categories="categories" />
</template>

<script setup>
import Collapse from "../../components/Collapse.vue";
const categories = [
  {
    title: "Size",
    type: "buttons",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    title: "Availability",
    type: "checkboxes",
    options: ["In Stock", "Pre-order", "Out of Stock"],
  },
  {
    title: "Category",
    type: "checkboxes",
    options: [
      "T-Shirts",
      "Jeans",
      "Dresses",
      "Shoes",
      "Accessories",
      "Jackets",
      "Sweaters",
    ],
  },
  {
    title: "Colors",
    type: "color-picker",
    options: [
      "Black",
      "White",
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Pink",
      "Purple",
      "Gray",
      "Brown",
    ],
  },
  {
    title: "Price Range",
    type: "range-slider",
    options: { min: 0, max: 500, step: 10, currency: "$" },
  },
  {
    title: "Collections",
    type: "checkboxes",
    options: [
      "Summer 2024",
      "Winter Collection",
      "Casual Wear",
      "Formal Wear",
      "Sports",
      "Limited Edition",
    ],
  },
  {
    title: "Tags",
    type: "checkboxes",
    options: [
      "New Arrival",
      "Best Seller",
      "On Sale",
      "Trending",
      "Eco-Friendly",
      "Premium Quality",
    ],
  },
  {
    title: "Ratings",
    type: "star-rating",
    options: [
      "5 Stars",
      "4 Stars & Up",
      "3 Stars & Up",
      "2 Stars & Up",
      "1 Star & Up",
    ],
  },
];
</script>
