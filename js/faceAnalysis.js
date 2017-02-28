// params for face analysis
 var faceAnalysisParams = {
  Image: {
   S3Object: {
     Bucket: yourS3Bucket,
     Name: yourSourceImageName
   }
  },
  Attributes: [
    'ALL',
    /* more items */
  ]
 };

//get data about a single face picture
function analyzeFace() {
  rekognition.detectFaces(faceAnalysisParams, function(err, data) {
    if (err)
    {
      console.log(err, err.stack); // an error occurred
    }
    else
    {
      // show the picture from S3 that you use to detect labels
      document.getElementById("sourceImageForAnalysis").src = "https://s3.amazonaws.com/" + faceAnalysisParams.Image.S3Object.Bucket + "/" + faceAnalysisParams.Image.S3Object.Name;
      console.log(data);           // successful response
      console.log(data.FaceDetails[0].Emotions);
      // grab the emotions from the face
      var emotions = data.FaceDetails[0].Emotions;
      var faceDetailsResults = "<ul>";
      for (var i = 0; i < emotions.length; i++) {
        console.log(emotions[i].Type)
        faceDetailsResults += "<li>" + emotions[i].Type + " - " + String(emotions[i].Confidence).slice(0,5) + "%</li>";
      }
      faceDetailsResults += "</ul>";
      document.getElementById("analyzeFaceResults").innerHTML = faceDetailsResults;
    }
  });
};
