import {shuffle} from "lodash";

import {generateRandomString} from "./string";

const generateShuffleArray = (size: number) => {
    const layout = Array.from(Array(size).keys())
    let key = generateRandomString()
    return shuffle(layout.map((i: number) => {
        if (i % 2 === 0) key = generateRandomString()
        return key
    }))
}

export {generateShuffleArray}