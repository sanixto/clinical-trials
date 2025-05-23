export const theme = {
    extend: {
        keyframes: {
            slideDown: {
                from: { height: "0px" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            slideUp: {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0px" },
            },
        },
        animation: {
            slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
            slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        },
    },
};
export const plugins = [];
