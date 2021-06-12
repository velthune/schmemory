const leadingZeros = (number: number, places: number = 2) => {
    if (number < 0) {
        return "-" + String(Math.abs(number)).padStart(places, "0");
    }
    return String(number).padStart(places, "0");
}

export {leadingZeros}