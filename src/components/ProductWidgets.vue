<template>
  <div class="flex flex-col justify-center w-full max-w-[331px] lg:max-h-[419px] lg:max-w-[851px] bg-gray-200 py-12 lg:pb-24 px-8 rounded-md shadow-2xl">
    <h1 class="w-full text-3xl text-left font-bold mb-3 border-b-2 border-b-gray-300 pb-2 font-body self-start">Per Product Widgets</h1>
    <div class="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-4 self-center w-full">
      <div v-for="widget in widgets" :key="widget.id" class="flex flex-col items-start justify-center w-full">
        <!-- Color Banner -->
        <div :style="{ backgroundColor: widget.selectedColor, color: getTextColor(widget.selectedColor)}" class="color-banner flex items-center justify-center gap-[10px] w-full h-24 rounded-md mb-4 px-5 transition-all duration-500">
          <img :src="require('@/assets/' + getLogoColor(widget.selectedColor))" alt="Logo" class="w-[40px] h-[40px]">
          <div class="flex flex-col items-start justify-center">
            <p class="text-[12.41px]">This product {{ widget.action }}</p>
            <p class="text-[17.86px] font-bold">{{ widget.amount }} {{ widget.type }}</p>
          </div>
        </div>

        <!-- Widget menu -->
        <div class="flex w-full justify-between items-center mt-4">
          <div class="flex items-center relative">
            <div class="text-sm text-[#3B755F] relative">Link to Public Profile
              <div class="absolute -top-[5px] pl-1 cursor-pointer h-100 -right-[25px] w-[25px]"
                @mouseover="showTooltip(widget.id), clearHideTooltipTimeout"
                @mouseleave="startHideTooltipTimeout(widget.id)"
                @click.stop="showTooltip(widget.id), clearHideTooltipTimeout">
                <span class="text-[14px]">ⓘ</span>
              </div>
              <div
              class="tooltip flex flex-col gap-4 absolute bg-white p-5 rounded-sm z-20 w-screen max-w-[248px] transition-opacity duration-[300ms] -left-[30px]"
              :class="{ '!-z-10 opacity-0': !tooltipVisibility[widget.id]}"
              :data-widget="widget.id"  
              @mouseover="clearHideTooltipTimeout" 
              @mouseleave="startHideTooltipTimeout(widget.id)">
                <p class="text-sm text-black">This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.</p>
                <a class="text-[#3B755F] font-bold" href="https://www.google.com" target="_blank" rel="noopener noreferrer">View Public Profile</a>
              </div>
            </div>
          </div>

          <!-- Checkbox with hover effect -->
          <div class="flex items-center relative">
            <label class="control control-checkbox">
              <input type="checkbox" v-model="widget.linked" class="hidden" :checked="widget.linked" />
              <div class="control_indicator"></div>
            </label>
          </div>
        </div>
      
        <!-- Badge color selector -->
        <div class="flex w-full justify-between items-center mt-4">
          <p class="text-sm text-[#3B755F]">Badge colour</p>
          <div class="flex items-center">
            <div v-for="(color, index) in colors" :key="index + color" :class="{ 'color-box': true, 'selected': widget.selectedColor === translateToHex(color) }" :style="{ backgroundColor: translateToHex(color) }" @click="selectColor(widget, color)" @mouseover="hoverColor(translateToHex(color))" @mouseleave="unhoverColor(translateToHex(color))"></div>
          </div>
        </div>

        <!-- Activate badge toggle -->
        <div class="flex w-full justify-between items-center mt-4">
          <p class="text-sm text-[#3B755F]">Activate badge</p>
          <label :for="widget.id" class="h-5 w-10 relative inline-block">
            <input :id="widget.id" type="checkbox" :checked="widget.active" class="hover:after:ring-[6px] hover:after:ring-[#AFC6BD]/50" />
          </label>
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
      tooltipVisibility: {} // Object to track tooltip visibility
    };
  },
  created() {
    this.fetchProductWidgets(); // Call fetchProductWidgets method when component is created
  },
  methods: {
    async fetchProductWidgets() {
      try {
        const response = await axios.get('https://api.mocki.io/v2/016d11e8/product-widgets');
        this.widgets = response.data.map(widget => ({
          ...widget,
          selectedColor: this.translateToHex(widget.selectedColor)
        })); // Update widgets array with fetched data and translate colors
      } catch (error) {
        console.error('Error fetching product widgets:', error);
      }
    },
    getLogoColor(color) {
      if (['#2E3A8C', '#3B755F', '#212121'].includes(color)) {
        return 'logoWhite.svg';
      } else if (['#FFFFFF', '#F2EBDB'].includes(color)) {
        return 'logoGreen.svg';
      } else {
        return 'logoWhite.svg'; // Default logo color
      }
    },
    getTextColor(color) {
      if (['#2E3A8C', '#3B755F', '#212121'].includes(color)) {
        return '#FFFFFF';
      } else if (['#FFFFFF', '#F2EBDB'].includes(color)) {
        return '#3B755F';
      } else {
        return '#FFFFFF'; // Default text color
      }
    },
    selectColor(widget, color) {
      widget.selectedColor = this.translateToHex(color);
    },
    hoverColor(color) {
      const colorBox = document.querySelector(`.color-box[style*="background-color: ${color}"]`);
      if (colorBox) {
        colorBox.style.filter = 'brightness(80%)';
      }
    },
    unhoverColor(color) {
      const colorBox = document.querySelector(`.color-box[style*="background-color: ${color}"]`);
      if (colorBox) {
        colorBox.style.filter = 'none';
      }
    },
    translateToHex(color) {
      switch (color) {
        case 'blue':
          return '#2E3A8C';
        case 'green':
          return '#3B755F';
        case 'black':
          return '#212121';
        case 'white':
          return '#FFFFFF';
        case 'beige':
          return '#F2EBDB';
        default:
          return color;
      }
    },

    showTooltip(widgetId) {
      this.tooltipVisibility[widgetId] = true;
    },

    hideTooltip(widgetId) {
      const tooltip = document.querySelector(`.tooltip[data-widget="${widgetId}"]`);
      if (tooltip) { 
        setTimeout(() => {
          this.tooltipVisibility[widgetId] = false;
        }, 300); 
      }
    },


    startHideTooltipTimeout(widgetId) {
      // Set a timeout to hide the tooltip after a delay
      this.hideTooltipTimeout = setTimeout(() => {
        this.hideTooltip(widgetId);
      }, 100); 
    },
    clearHideTooltipTimeout() {
      // Clear the timeout to prevent hiding the tooltip
      clearTimeout(this.hideTooltipTimeout);
    }
  }
};
</script>
