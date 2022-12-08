export function describe(jsHandle) {
  return jsHandle.executionContext().evaluate((obj) => {
    // serialize |obj| however you want
    return `${JSON.stringify(obj)}`;
  }, jsHandle);
}
