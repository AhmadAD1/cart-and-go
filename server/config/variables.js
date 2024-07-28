const jwtSecret = process.env.JWT_SECRET;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const clientUrl = process.env.CLIENT_URL;
const LIMIT = 20;
const PAGINATIONCOUNT = 10;
export {
  jwtSecret,
  bucketName,
  bucketRegion,
  accessKey,
  secretAccessKey,
  LIMIT,
  stripeSecretKey,
  clientUrl,
  PAGINATIONCOUNT,
};
