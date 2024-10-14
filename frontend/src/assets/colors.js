export default function getColorShades(num) {
    const predefinedColors = [
        "#0B1326", // Dodger Blue
        "#F79E1B", // Deep Sky Blue
        "#D85539", // Royal Blue
        "#0000FF", // Blue
        "#FF6347", // Tomato
        "#FF7F50", // Coral
        "#FF8C00", // Dark Orange
        "#FFA500", // Orange
        "#FFD700", // Gold
        "#000000", // Black
        "#2F4F4F", // Dark Slate Gray
        "#696969", // Dim Gray
        "#A9A9A9", // Dark Gray
        "#D3D3D3", // Light Gray
    ];
    return predefinedColors.slice(0, num);
}

