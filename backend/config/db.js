const mongoose = require('mongoose');
const dns = require('dns');

// Force Node to use Google DNS, bypassing local strict ISP blocks on mongodb SRV resolutions
dns.setServers(['8.8.8.8', '8.8.4.4']);


/**
 * Connect to MongoDB using the URI in .env
 * Exits the process if the connection fails.
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌  MONGO_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log(`✅  MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
