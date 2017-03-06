// Parameters for face analysis
 var faceAnalysisParams = {
  Image: {
   S3Object: {
     Bucket: "YOUR_BUCKET",
     Name: "YOUR_IMAGE"
   }
  },
  Attributes: [
    'ALL',
  ]
 };

//Get data about a single face picture
function analyzeFace() {
  rekognition.detectFaces(faceAnalysisParams, function(err, data) {
    if (err)
    {
      
      console.log(err, err.stack);

    }
    else
      {
      
      document.getElementById("sourceImageForAnalysis").setAttribute("src", "https://s3-" + yourRegion + ".amazonaws.com/" + faceAnalysisParams.Image.S3Object.Bucket + "/" + faceAnalysisParams.Image.S3Object.Name);

      // Get the emotions from the face
      var emotions = data.FaceDetails[0].Emotions;
      var faceDetailsResults = "<ul>";
      
      //Modify the html data
      for (var i = 0; i < emotions.length; i++) {
        console.log(emotions[i].Type)
        faceDetailsResults += "<li>" + emotions[i].Type + " - " + String(emotions[i].Confidence).slice(0,5) + "%</li>";
      }

      faceDetailsResults += "</ul>";
      document.getElementById("analyzeFaceResults").innerHTML = faceDetailsResults;
      
    }
  });
};
