export function getFileSizeFromBase64(base64Blob, unit = "MB") {
    if (!(base64Blob instanceof Buffer)) {
        throw new Error("Invalid input: base64Blob must be a Buffer");
    }

    const sizeInBytes = base64Blob.length;

    switch (unit) {
        case "bytes":
            return sizeInBytes;
        case "KB":
            return sizeInBytes / 1024;
        case "MB":
            return sizeInBytes / (1024 * 1024);
        default:
            throw new Error('Invalid unit. Use "bytes", "KB", or "MB".');
    }
}

export function sumFileSize(files) {
    let total = 0;
    for (let i = 0; i < files.length; i++) {
        total += getFileSizeFromBase64(files[i].pdf_blob);
    }
    return total;
}
