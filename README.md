# Frontend-service

Frontend widgets build for Greenspark


## Project setup
Run:
```
npm install
```

### Compile and hot-reload for development
```
npm run serve --watch
```

### Compile and minify for production
```
npm run build
```

### Lint and fix files
```
npm run lint
```
# 
Brief summary:

I started this build using a basic vueJS setup, i found this to be the easiest way to get a basic backend built to show the frontend changes and pull from the api, using axios i did just that. Since the api call is so simple it was quite easy to pull from the endpoint. 

I decided to build the widgets as a component to make it easier to diagnose if issues came up. All 'App.vue' does is just display the background and pull the component. The component also has its own assets, therefore the scripting and images are bundled into their own folder that the component pulls from.

For CSS processing and making my life easier, i decided to use TailwindCSS, it's a preprocessor that i am very familiar with and makes building basic (and not so basic) frontend a breeze. I alternated between tailwind and regular css for certain aspects as i couldn't get tailwind working briefly. 

I had issues accessing exact spacings and proper sizings as i couldnt access the figma Dev section of the design, but i managed to find most of the sizes out eventually.

In general, the frontend, animation and api work was pretty straigntforward. Like every build i had my hiccups, but resolving them wasnt too big of a problem.

Hope it meets your standards and i look forward to any feedback you provide.

# 

MIT License

Copyright (c) 2024 Mohamed Helal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


