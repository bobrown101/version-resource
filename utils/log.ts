import * as emoji from "node-emoji"

export const logWarn = (msg: string) => {
    console.info(`${emoji.get("man-tipping-hand")} ${msg}`)
}

export const logSuccess = (msg: string) => {
    console.log(`${emoji.get("ship")} ${msg}`)
}

export const logError = (msg: string) => {
    console.error(`${emoji.get("exclamation")} ${msg}`)
}