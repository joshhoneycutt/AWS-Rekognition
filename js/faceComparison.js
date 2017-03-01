// parameters for face comparison
var compareFaceParams = {
  SimilarityThreshold: 90,
  SourceImage: {
   S3Object: {
    Bucket: yourS3Bucket,
    Name: yourSourceImageName
   }
  },
  TargetImage: {
   S3Object: {
     Bucket: yourS3Bucket,
     Name: yourTargetImageName
   }
  }
 };

// compare two face images
function compareFaces() {
   rekognition.compareFaces(compareFaceParams, function(err, data) {
   if (err)
   {
     console.log(err, err.stack); // an error occurred
   }
   else
   {
     console.log(data);           // successful response
     console.log(data.FaceMatches);
     console.log(data.FaceMatches[0].Similarity);
     // display the face match similarity
     document.getElementById("results").innerHTML = "Results = "+data.FaceMatches[0].Similarity+'% Similar';
     // show the source and target images
     // make sure pictures are set to public
     // check to see what region we are in, if we are not in 'us-east-1' then set region in URL generation
     var region = '';
     if(myRegion != 'us-east-1')
     {
       region = "-"+myRegion;
     }
     document.getElementById("sourceImage").src = "https://s3"+region+".amazonaws.com/" + compareFaceParams.SourceImage.S3Object.Bucket + "/" + compareFaceParams.SourceImage.S3Object.Name;
     document.getElementById("targetImage").src = "https://s3"+region+".amazonaws.com/" + compareFaceParams.TargetImage.S3Object.Bucket + "/" + compareFaceParams.TargetImage.S3Object.Name;
   }
 });

};
