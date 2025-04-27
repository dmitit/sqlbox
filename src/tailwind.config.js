const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      // ...
      // make sure it's pointing to the ROOT node_module
      '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {},
   darkMode: 'class',
   plugins: [
      heroui({
         themes: {
            light: {
               colors: {
                  primary: {
                     100: '#D6FCDF',
                     200: '#AFFAC8',
                     300: '#84F1B4',
                     400: '#63E4A8',
                     500: '#34D399',
                     600: '#26B58F',
                     700: '#1A9782',
                     800: '#107A73',
                     900: '#096265',
                     DEFAULT: '#34D399',
                  },
               },
            },
         },
      }),
   ],
};
