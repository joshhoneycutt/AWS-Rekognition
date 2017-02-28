// hard coded variables for S3 bucket and pictures
// make sure pictures are set to public
const yourS3Bucket           = 'jj-rek2';
const yourSourceImageName    = 'joe1.jpg';
const yourTargetImageName    = 'joe2.jpg';
const yourImageForLabelsName = 'picture.jpg';

// set up rekognition credentials
// these variables come from secrets.js
const rekognition = new AWS.Rekognition({
  apiVersion: '2016-06-27',
  accessKeyId: myAccessKeyId,
  secretAccessKey: mySecretAccessKey,
  region: myRegion
});
