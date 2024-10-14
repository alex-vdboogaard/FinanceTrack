export default function getColorShades(num) {
    const predefinedColors = [
        "#0B1326",
        "#F79E1B",
        "#D85539",
        "#293A65",
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "#ffa600"
    ];
    return predefinedColors.slice(0, num);
}

