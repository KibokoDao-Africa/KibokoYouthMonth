module.exports = {
  theme: {
      extend: {
          animation: {
              'hue-transition': 'hue-transition 10s infinite ease-in-out',
          },
          keyframes: {
              'hue-transition': {
                  '0%': { backgroundColor: '#667eea' },
                  '50%': { backgroundColor: '#764ba2' },
                  '100%': { backgroundColor: '#f58f29' },
              },
          },
      },
  },
};
