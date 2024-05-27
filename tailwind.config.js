/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {},
        fontFamily: {
            body: ["Noto Sans KR"],
        },
        borderRadius: {
            "primary-button": "5px",
            "tag-button": "17.5px",
        }, 
        fontSize: {
            xs: [
                "12px",
                { lineHeight: "18px", letterSpacing: "0", fontWeight: "400" },
            ],
            sm: [
                "14px",
                { lineHeight: "21px", letterSpacing: "0", fontWeight: "400" },
            ],
            xl: [
                "30px",
                { lineHeight: "45px", letterSpacing: "0", fontWeight: "400" },
            ],
            "2xl": [
                "24px",
                { lineHeight: "36px", letterSpacing: "0", fontWeight: "700" },
            ],
        },
        colors: {
            primary: "#1d2745",
            secondary: "#1de5d4",
            tertiary: "#f1f5f9",
            white: "#ffffff",
            mono100: "#f1f5f9",
            mono200: "#e2e8f0",
            mono300: "#cbd5e1",
            error: "#f56565",
            social: "#3b5998",
            "dark-opacity": "rgba(255, 255, 255, 0.1)",
        },
    },
    plugins: [],
};
