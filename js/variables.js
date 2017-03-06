// Hard coded variables for S3 bucket and pictures.
// Your pictures must be set to public.
const yourS3Bucket           = 'YOUR_S3_BUCKET';
const yourSourceImageName    = 'YOUR_SOURCE_IMAGE_NAME';
const yourTargetImageName    = 'YOUR_SECOND_FACE_IMAGE.jpg';
const yourImageForLabelsName = 'YOUR_PICTURE_FOR_LABELS.jpg';
const yourRegion = 'us-west-2';

// set up rekognition credentials
// these variables come from secrets.js
const rekognition = new AWS.Rekognition({
  //apiVersion: '2016-06-27',
  accessKeyId: 'YOUR_ID',
  secretAccessKey: 'YOUR_KEY',
  region: 'us-west-2'
});
