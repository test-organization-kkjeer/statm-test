const fs = require("fs");

const bundleSizeLimits = require("./bundle-size-limits.json");

for (const platform in bundleSizeLimits) {
  const bundleSuffix = (platform === "ios" || platform === "macos") ? "jsbundle": "bundle";
  const bundleName = `foundation.${platform}.${bundleSuffix}`;
  const bundleSize = fs.statSync(`./bundles/${platform}/ship/${bundleName}`).size / 1024;

  if (bundleSizeLimits[platform] <= bundleSize) {
    const newLimit = Math.ceil(bundleSize);
    console.log(`Bumping size limit for ${platform} bundle from ${bundleSizeLimits[platform]} KB to ${newLimit} KB`)
    bundleSizeLimits[platform] = newLimit;
  }
}

fs.writeFileSync("./bundle-size-limits.json", JSON.stringify(bundleSizeLimits), {encoding: "utf8"});
console.log("Bundle size limits adjusted.");