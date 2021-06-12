const toHex = (text: string): string => {
    let hash = 0;
    if (!text.length) return "#000";
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 255;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

const generateRandomString = (length: number = 8) => Math.random().toString(36).substring(length)

export {toHex, generateRandomString}