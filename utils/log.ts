import * as emoji from "node-emoji"


export const logSuccess = (msg: string) => {
    console.log(`${emoji.get("ship")} ${msg}`)
}

export const logError = (msg: string) => {
    console.error(`${emoji.get("exclamation")} ${msg}`)
}