<template>
    <div>
      <!-- Display product widgets here -->
      <div v-for="widget in widgets" :key="widget.id">
        <!-- Display widget details -->
        <p>{{ widget.id }} - {{ widget.type }} - {{ widget.amount }}</p>
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
  