export function getFileSizeFromBase64(base64String) {
    const base64WithoutPrefix = base64String.split(",").pop() || base64String;
    const padding = (base64WithoutPrefix.match(/=/g) || []).length;
    const sizeInBytes = (base64WithoutPrefix.length * 3) / 4 - padding;
    return Math.ceil(sizeInBytes / (1024 * 1024)); // Convert to MB
}

export function sumFileSize(files) {
    let total = 0;
    for (let i = 0; i < files.length; i++) {
        total += getFileSizeFromBase64(files[i].pdf_blob);
    }
    return total;
}
