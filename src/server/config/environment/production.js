'use strict';

// Production configs
module.exports = {
  ip: process.env.IP || undefined,
  port: process.env.PORT || 8080,
  mongo: {
    uri:    process.env.MONGO_URL || undefined,
    options: {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS
    }
  }
};
