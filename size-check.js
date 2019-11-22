const fs = require("fs");

const bundleSizeLimits = require("./bundle-size-limits.json");

let errors = false;
for (const platform in bundleSizeLimits) {
  const bundleSuffix = (platform === "ios" || platform === "macos") ? "jsbundle": "bundle";
  const bundleName = `foundation.${platform}.${bundleSuffix}`;
  const bundleSize = fs.statSync(`./bundles/${platform}/ship/${bundleName}`).size / 1024;
  const percentage = bundleSize / bundleSizeLimits[platform];

  if (percentage > 1) {
    console.error(`Bundle size check: ${platform} bundle (${bundleSize.toFixed(2)} KB) exceeds size limit ${bundleSizeLimits[platform]} KB by ${((percentage - 1) * 100).toFixed(2)}%.`);
    errors = true;
  } else {
    console.log(`Bundle size check: ${platform} bundle (${bundleSize.toFixed(2)} KB) is below size limit ${bundleSizeLimits[platform]} KB.`);
  }
}

if (errors) {
  process.exit(1);
}