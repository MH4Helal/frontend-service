export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Cabin', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }