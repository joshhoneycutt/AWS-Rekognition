// Hard coded variables for S3 bucket and pictures.
// Your pictures must be set to public.
const yourS3Bucket           = 'YOUR_S3_BUCKET';
const yourSourceImageName    = 'YOUR_FIRST_FACE_IMAGE.jpg';
const yourTargetImageName    = 'YOUR_SECOND_FACE_IMAGE.jpg';
const yourImageForLabelsName = 'YOUR_PICTURE_FOR_LABELS.jpg';
const yourImageForFaceAnalysis = 'YOUR_PICTURE_FOR_FACE_ANALYSIS.jpg';

// set up rekognition credentials
// these variables come from secrets.js
const rekognition = new AWS.Rekognition({
  //apiVersion: '2016-06-27',
  accessKeyId: myAccessKeyId, /*YOUR ACCESS KEY ID FROM Secrets.js */
  secretAccessKey: mySecretAccessKey, /* YOUR SECRET ACCESS KEY FROM Secrets.js */
  region: myRegion /* YOUR REGION FROM Secrets.js */
});
