const buildPath = process.env.BUILD_PATH || "dist";
const hostName = process.env.HOST_NAME || "/";

module.exports = {
  buildPath,
  hostName
};