<template>
  <div class="flex flex-col justify-center w-full h-full max-w-[331px] md:max-h-[419px] lg:max-w-[851px] bg-gray-200 py-12 lg:pb-24 px-8 rounded-md shadow-2xl">
    <h1 class="w-full text-3xl text-left font-bold mb-3 border-b-2 border-b-gray-300 pb-2 font-body self-start">Per Product Widgets</h1>
    <div class="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-4 self-center w-full">
      <div v-for="widget in widgets" :key="widget.id" class="flex flex-col items-start justify-center w-full max-w-[221px]">
        <div id="color-banner" :style="{ backgroundColor: widget.selectedColor, color: getTextColor(widget.selectedColor) }" @click="selectColor(widget.selectedColor)" 
        class="flex items-center justify-center w-full h-24 rounded-md mb-4">
          <img :src="'../assets/' + getLogoColor(widget.selectedColor)" alt="Logo" class="w-8 h-8">
          <div class="flex flex-col items-start justify-center">
            <p class="text-[12.41px]">This product {{ widget.action }}</p>
            <p class="text-[17.86px] font-bold">{{ widget.amount }} {{ widget.type }}</p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <p class="text-sm">Badge color</p>
          <div class="flex items-center">
            <div v-for="(color, index) in colors" :key="index" :class="{ 'color-box': true, 'selected': widget.selectedColor === color }" :style="{ backgroundColor: color }" @click="selectColor(widget, color)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      widgets: [], // Initialize widgets array to store fetched data
      colors: ['blue', 'green', 'black', 'white', 'beige'], // Array of available colors
      isAnimating: false // Flag to track animation state
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
    },
    getTextColor(color) {
      if (['blue', 'green', 'black'].includes(color)) {
        return 'white';
      } else if (['white', 'beige'].includes(color)) {
        return 'green';
      } else {
        return 'white'; // Default text color
      }
    },
    getLogoColor(color) {
      if (['blue', 'green', 'black'].includes(color)) {
        return 'logoWhite.svg';
      } else if (['white', 'beige'].includes(color)) {
        return 'logoGreen.svg';
      } else {
        return 'logoWhite.svg'; // Default logo color
      }
      
    },
    selectColor(color) {
      if (!this.isAnimating) {
        this.isAnimating = true;
        const banner = document.getElementById('color-banner');
        banner.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        banner.style.backgroundColor = color;
        banner.style.color = this.getTextColor(color);
        setTimeout(() => {
          this.isAnimating = false;
        }, 500);
      }
    },
    hoverColor(color) {
      const colorBox = document.querySelector(`.color-box[style*="background-color: ${color}"]`);
      colorBox.style.filter = 'brightness(80%)';
    },
    unhoverColor(color) {
      const colorBox = document.querySelector(`.color-box[style*="background-color: ${color}"]`);
      colorBox.style.filter = 'none';
    }
  }
};
</script>

<style scoped>
.color-box {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-left: 10px;
}

.color-box:hover {
  filter: brightness(80%);
}

.selected {
  border: 2px solid #B0B0B0; /* Apply gray-500 color to the border of the selected color box */
  box-sizing: border-box;
}
</style>
