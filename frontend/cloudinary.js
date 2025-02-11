import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/base';

const cld = new Cloudinary({
  cloud: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  },
});

const myImage = cld.image('sample.jpg'); // Your Cloudinary image ID

return <AdvancedImage cldImg={myImage} />;
