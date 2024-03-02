<template>
    <div class="flex flex-col justify-center w-full h-full max-w-[331px] md:max-h-[419px] lg:max-w-[851px] bg-white py-12 lg:pb-24 px-8 rounded-md shadow-2xl">
      <h1 class="w-full text-3xl text-left font-bold mb-3 border-b-2 border-b-gray-300 pb-2 font-body self-start">Per Product Widgets</h1>
      <div class="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-4 self-center w-full">
      <div v-for="widget in widgets" :key="widget.id" class="flex flex-col items-start justify-center w-full max-w-[221px]">
        <p>{{ widget.type }} - {{ widget.amount }}</p>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        widgets: [] // Initialize widgets array to store fetched data
      };
    },
    created() {
      this.fetchProductWidgets(); // Call fetchProductWidgets method when component is created
    },
    methods: {
      async fetchProductWidgets() {
        try {
          const response = await axios.get('https://api.mocki.io/v2/016d11e8/product-widgets');
          this.widgets = response.data; // Update widgets array with fetched data
        } catch (error) {
          console.error('Error fetching product widgets:', error);
        }
      }
    }
  };
  </script>
  