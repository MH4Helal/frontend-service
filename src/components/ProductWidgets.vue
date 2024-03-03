<template>
  <div class="flex flex-col justify-center w-full h-full max-w-[331px] md:max-h-[419px] lg:max-w-[851px] bg-gray-200 py-12 lg:pb-24 px-8 rounded-md shadow-2xl">
    <h1 class="w-full text-3xl text-left font-bold mb-3 border-b-2 border-b-gray-300 pb-2 font-body self-start">Per Product Widgets</h1>
    <div class="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-4 self-center w-full">
      <div v-for="widget in widgets" :key="widget.id" class="flex flex-col items-start justify-center w-full">
        <!-- Color Banner -->
        <div id="color-banner" 
          :style="{ backgroundColor: widget.selectedColor, color: getTextColor(widget.selectedColor), transition: isAnimating ? 'background-color 0.5s ease, color 0.5s ease' : '' }" 
          class="flex items-center justify-center gap-[10px] w-full h-24 rounded-md mb-4 px-5">
          <img :src="require('@/assets/' + getLogoColor(widget.selectedColor))" alt="Logo" class="w-[40px] h-[40px]">
          <div class="flex flex-col items-start justify-center">
            <p class="text-[12.41px]">This product {{ widget.action }}</p>
            <p class="text-[17.86px] font-bold">{{ widget.amount }} {{ widget.type }}</p>
          </div>
        </div>

        <!-- Widget menu -->
        <div class="flex w-full justify-between items-center mt-4">
          <div class="flex items-center relative">
            <p class="text-sm text-[#3B755F] relative">Link to public profile
              <span class="tooltip-icon" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">ⓘ
                <div class="tooltip" v-if="showTooltip">
                  <p>This is a tooltip</p>
                </div>
              </span>
            </p>
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
            <div v-for="(color, index) in colors" :key="index" :class="{ 'color-box': true, 'selected': widget.selectedColor === translateToHex(color) }" :style="{ backgroundColor: translateToHex(color) }" @click="selectColor(widget, color)" @mouseover="hoverColor(translateToHex(color))" @mouseleave="unhoverColor(translateToHex(color))"></div>
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
      isAnimating: false, // Flag to track animation state
      showTooltip: false, // Flag to control tooltip visibility
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
    getTextColor(color) {
      if (['#2E3A8C', '#3B755F', '#212121'].includes(color)) {
        return '#FFFFFF';
      } else if (['#FFFFFF', '#F2EBDB'].includes(color)) {
        return '#3B755F';
      } else {
        return '#FFFFFF'; // Default text color
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
    selectColor(widget, color) {
      if (!this.isAnimating) {
        widget.selectedColor = this.translateToHex(color);
      }
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
.control {
    font-family: arial;
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 5px;
    padding-top: 3px;
    cursor: pointer;
    font-size: 16px;
}
    .control input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
.control_indicator {
    position: absolute;
    top: -5px;
    left: 10px;
    height: 20px;
    width: 20px;
    background: #e6e6e6;
    border: 2px solid #000000;
    border-radius: 2px;
}
.control:hover input ~ .control_indicator,
.control input:focus ~ .control_indicator {
    background: #afc6bd;
}

.control input:checked ~ .control_indicator {
    background: #3B755F;
    border: none;
}
.control:hover input:not([disabled]):checked ~ .control_indicator,
.control input:checked:focus ~ .control_indicator {
    background: #3B755F ;
    border: none;
}
.control_indicator:after {
    box-sizing: unset;
    content: '';
    position: absolute;
    display: none;
}
.control input:checked ~ .control_indicator:after {
    display: block;
}
.control-checkbox .control_indicator:after {
    left: 8px;
    top: 4px;
    width: 3px;
    height: 8px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}
.control-checkbox input:disabled ~ .control_indicator:after {
    border-color: #7b7b7b;
}
.control-checkbox .control_indicator::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 4.5rem;
    height: 4.5rem;
    margin-left: -1.8rem;
    margin-top: -1.6rem;
    background: #afc6bd;
    border-radius: 3rem;
    opacity: 0.6;
    z-index: 99999;
    transform: scale(0);
}
@keyframes s-ripple {
    0% {
        transform: scale(0);
    }
    20% {
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}
@keyframes s-ripple-dup {
   0% {
       transform: scale(0);
    }
   30% {
        transform: scale(1);
    }
    60% {
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}
.control-checkbox input + .control_indicator::before {
    animation: s-ripple 250ms ease-out;
}
.control-checkbox input:checked + .control_indicator::before {
    animation-name: s-ripple-dup;
}
</style>
