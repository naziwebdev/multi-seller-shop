const configs = require("./configs");
const { Redis } = require("ioredis");

const redis = new Redis(configs.redis.uri);

module.exports = redis;
