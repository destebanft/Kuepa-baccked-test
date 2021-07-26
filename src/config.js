import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://kueapa-db/data",
  PORT: process.env.PORT || 3000,
  SECRET: '-_)ea&*wb!-9)@=5#-_q7s3upyu(9ttrdija-hpktlcmz0j87b'
};
