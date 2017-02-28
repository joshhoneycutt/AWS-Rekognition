// hard coded variables for S3 bucket and pictures
// make sure pictures are set to public
const yourS3Bucket           = 'YOUR_S3_BUCKET';
const yourSourceImageName    = 'YOUR_FIRST_FACE_IMAGE.jpg';
const yourTargetImageName    = 'YOUR_SECOND_FACE_IMAGE.jpg';
const yourImageForLabelsName = 'YOUR_PICTURE_FOR_LABELS.jpg';

// set up rekognition credentials
// these variables come from secrets.js
const rekognition = new AWS.Rekognition({
  apiVersion: '2016-06-27',
  accessKeyId: myAccessKeyId,
  secretAccessKey: mySecretAccessKey,
  region: myRegion
});
