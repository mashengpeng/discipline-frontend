module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'md': '900px',
                'xl': '1200px'
            },
        },
    },
    plugins: [
        // function ({addBase}) {
        //     addBase({
        //         ".el-button": {
        //             "background-color": "var(--el-button-bg-color,var(--el-color-white))"
        //         }
        //     });
        // }
    ]
}
