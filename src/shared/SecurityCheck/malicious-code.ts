const knowFeatures = ["sendAllMoney"];

export async function checkTransaction(tx: any, env: any) {
  if (!env.windowKeys) return null;
  let encodeFunctionCount = 0;
  let allKeys = env.windowKeys.keys;
  allKeys.forEach((_: any) => {
    const key = _.key;
    // start with _0x
    if (key.indexOf("_0x") === 0) {
      encodeFunctionCount++;
    }
  });
  const encodeFunPercent = (encodeFunctionCount / allKeys.length) * 100;
  const hitFeatures = allKeys.filter((c: any) => knowFeatures.includes(c.key));
  const skipRamp = document.body ? document.body.innerHTML.includes("rampp.xyz") : false;;
  if ((encodeFunPercent > 30 || hitFeatures.length) && !skipRamp) {
    return {
      status: 1,
      type: "maliciousCodeFeature",
      name: "Malicious Code Check",
      message: "Malicious code found",
      state: "HIT",
      allKeys,
      hitFeatures,
      percent: encodeFunPercent,
    };
  }
  return {
    status: 0,
    type: "maliciousCodeFeature",
    name: "Malicious Code Check",
    message: "No malicious code found",
    allKeys,
    hitFeatures,
    percent: encodeFunPercent,
  };
}
