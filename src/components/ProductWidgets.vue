<template>
  <div class="flex flex-col justify-center w-full max-w-[331px] lg:max-h-[419px] lg:max-w-[851px] bg-gray-200 py-12 lg:pb-24 px-8 rounded-md shadow-2xl">
    <h1 class="w-full text-3xl text-left font-bold mb-3 border-b-2 border-b-gray-300 pb-2 font-body self-start">Per Product Widgets</h1>
    <div class="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-4 self-center w-full justify-center justify-items-center">
      <div v-for="widget in widgets" :key="widget.id" class="flex flex-col items-start justify-center w-full max-w-[221px]">
        <!-- Color Banner -->
        <div :style="{ backgroundColor: widget.selectedColor, color: getTextColor(widget.selectedColor)}" class="color-banner flex items-center justify-start gap-[20px] w-full h-24 rounded-md mb-4 px-5 transition-all duration-500">
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
          <div class="flex items-center relative h-[20px]">
            <label class="control control-checkbox group h-full">
              <input type="checkbox" v-model="widget.linked" class="hidden" :checked="widget.linked" />
                <div class="control_indicator z-10 relative"></div>
                <div class="w-[20px] h-[20px] top-[3px] left-[10px] absolute inset-0 rounded-full group-hover:ring-[10px] group-hover:ring-[#AFC6BD]/50 duration-300"></div>

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
            <input :id="widget.id" type="checkbox" :checked="widget.active" class="hover:after:ring-[8px] hover:after:ring-[#AFC6BD]/50" />
          </label>
        </div>

      </div>
    </div>
  </div>
</template>

<script src="../assets/js/product-widget.js"></script>
