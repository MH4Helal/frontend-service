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