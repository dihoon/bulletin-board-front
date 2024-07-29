import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
      screens: {
        DEFAULT: '1128px',
      },
    },
    extend: {
      screens: {
        sm: '350px',
        md: '768px',
        lg: '1072px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'background-image': "url('/images/tree.jpg')",
      },
      fontSize: {
        '60': '60px',
      },
      colors: {
        green: '#298e12',
        'light-green': '#90EE90A0',
        'white-opaque': 'rgba(255,255,255, 0.24)',
      },
    },
  },
  plugins: [],
};
export default config;
