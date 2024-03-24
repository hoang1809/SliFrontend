module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      tablet: '600px',
      // => @media (min-width: 600px) { ... }

      laptop: '1240px',
      // => @media (min-width: 1240px) { ... }

      desktop: '1440px',
      // => @media (min-width: 1440px) { ... }
      hd: '1600px',
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-blur-color": "var(--primary-blur-color)",
        "primary-disabled-color": "var(--primary-disabled-color)",

        "secondary-color": "var(--secondary-color)",
        "white-color": "var(--white-color)",
        "white-blur-color": "var(--white-blur-color)",
        "grey-clor": "var(--grey-clor)",
        "cancel-color": "var(--cancel-color)",
        "background-color": "var(--background-color)"
      },
    },
    backgroundImage: {
      'bg-img' : "url('/assets/images/bg-3.png')",
    }
  },
  // plugins: [require('@tailwindcss/line-clamp')],
};
