import express from 'express';
import crypto from 'crypto';

const router = express.Router();

router.get('/get-signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'real_estate'; // same folder used in your upload

  const signature = crypto
    .createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
    .digest('hex');

  res.json({ timestamp, signature });
});

export default router;
