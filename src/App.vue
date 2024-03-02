<template>
  <div id="app" class="bg-white min-h-screen flex justify-center items-center">
    <ProductWidgets />
  </div>
</template>

<script>
import ProductWidgets from './components/ProductWidgets.vue';
import './index.css'

export default {
  name: 'App',
  components: {
    ProductWidgets
  }
}
</script>
