import emoji from "node-emoji";

export const logInfo = (msg: string) => {
  console.info(`${emoji.get("bar_chart")} ${msg}`);
};

export const logWarn = (msg: string) => {
  console.info(`${emoji.get("cop")} ${msg}`);
};

export const logSuccess = (msg: string) => {
  console.log(`${emoji.get("ship")} ${msg}`);
};

export const logError = (msg: string) => {
  console.error(`${emoji.get("exclamation")} ${msg}`);
};

export const logFinished = (msg: string) => {
  console.log(`${emoji.get("rocket")} ${msg}`);
};
