// Parameters for face analysis
 var faceAnalysisParams = {
  Image: {
   S3Object: {
     Bucket: yourS3Bucket,
     Name: yourImageForLabelsName
   }
  },
  Attributes: [
    'ALL',
  ]
 };

// Get data about a single face picture
function analyzeFace() {
  rekognition.detectFaces(faceAnalysisParams, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      // check to see what region we are in, if we are not in 'us-east-1' then set region in URL generation
      var region = '';
      if(myRegion != 'us-east-1') {
        region = "-"+myRegion;
      }

      // Return the image for display to the HTML
      document.getElementById("sourceImageForAnalysis").src = "https://s3"+region+".amazonaws.com/" + faceAnalysisParams.Image.S3Object.Bucket + "/" + faceAnalysisParams.Image.S3Object.Name;

      // Get the emotions from the face
      var emotions = data.FaceDetails[0].Emotions;
      var faceDetailsResults = "<ul>";

      // Modify the html data
      for (var i = 0; i < emotions.length; i++) {
        console.log(emotions[i].Type)
        faceDetailsResults += "<li>" + emotions[i].Type + " - " + String(emotions[i].Confidence).slice(0,5) + "%</li>";
      }
      faceDetailsResults += "</ul>";
      document.getElementById("analyzeFaceResults").innerHTML = faceDetailsResults;
    }
  });
};
