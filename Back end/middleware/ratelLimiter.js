import ratelimit from "../src/config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit"); //per user

    if (!success) {
      return res.status(429).json({ message: "Too many attempt" });
    }

    next();
  } catch (error) {
    console.log("rate limit error", error);

    next(error);
  }
};
export default rateLimiter;
