// parameters to look at a single picture in S3 for labels
var detectLabelParams = {
  Image: {
    S3Object: {
      Bucket: yourS3Bucket,
      Name: yourImageForLabelsName
    }
  },
  MaxLabels: 10,
  MinConfidence: 70
};

// look at a picture and show labels with confidence
function detectPictureLabels() {
  rekognition.detectLabels(detectLabelParams, function(err, data) {
   if (err)
   {
     console.log(err, err.stack); // an error occurred
   }
   else
   {
     // show the picture from S3 that you use to detect labels
     document.getElementById("imageForLabelsName").src = "https://s3.amazonaws.com/" + detectLabelParams.Image.S3Object.Bucket + "/" + detectLabelParams.Image.S3Object.Name;
     console.log(data);           // successful response
     // grab the labels and start the results
     var labels = data.Labels;
     var labelResults = "<ul>";
     // iterate over each label for MaxLabels value in detectLabelParams
     for(var i = 0; i < labels.length; i++)
     {
       labelResults += "<li>" + labels[i].Name + " - " + String(labels[i].Confidence).slice(0,5) + "%</li>";
       console.log(labels[i].Name);
       console.log(labels[i].Confidence);
     }
     labelResults += "</ul>";
     document.getElementById("Labelresults").innerHTML = labelResults;
   }
  });
}