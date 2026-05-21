import preset from '../../../../vendor/filament/filament/tailwind.config.preset'

export default {
    presets: [preset],

    content: [
        './app/Filament/**/*.php',
        './resources/views/**/*.blade.php',
        './resources/css/**/*.css',
        './vendor/filament/**/*.blade.php',
    ],

    theme: {
        extend: {
            colors: {
                primary: '#1577ce',
                secondary: '#ff8905',

                brand: {
                    blue: '#1577ce',
                    orange: '#ff8905',
                    navy: '#0f172a',
                    gray: '#475569',
                    light: '#f8fafc',
                    border: '#e2e8f0',
                },
            },

            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },

            borderRadius: {
                xl: '1rem',
                '2xl': '1.5rem',
            },

            boxShadow: {
                soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
            },
        },
    },
}