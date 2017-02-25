// hard coded variables for S3 bucket and pictures
// make sure pictures are set to public
const yourS3Bucket           = 'jj-rek2';
const yourSourceImageName    = 'joe1.jpg';
const yourTargetImageName    = 'joe2.jpg';
const yourImageForLabelsName = 'picture.jpg';


// Connect to AWS
var params = {
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
 
 // set up rekognition credentials
 var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27',
                                        accessKeyId: myAccessKeyId,
                                        secretAccessKey: mySecretAccessKey, // these variables come from secrets.js
                                        region: myRegion
                                      });
 
 // compare faces

 function compareFaces() {

   rekognition.compareFaces(params, function(err, data) {
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
       document.getElementById("results").innerHTML = "Results = "+data.FaceMatches[0].Similarity+' Similarity';
       // show the source and target images
       // make sure pictures are set to public
       document.getElementById("sourceImage").src = "https://s3.amazonaws.com/" + params.SourceImage.S3Object.Bucket + "/" + params.SourceImage.S3Object.Name;
       document.getElementById("targetImage").src = "https://s3.amazonaws.com/" + params.TargetImage.S3Object.Bucket + "/" + params.TargetImage.S3Object.Name;
     }
   });

  };

// could be used for detect faces rekognition function
// not yet working 
/*
 var secondParams = {
  Image: {
   S3Object: {
     Bucket: yourS3Bucket,
     Name: yourSourceImageName
   }
  }
 };
 
 rekognition.detectFaces(secondParams, function(err, data) {
   if (err)
   {
     console.log(err, err.stack); // an error occurred
   }
   else
   {
     console.log(data);           // successful response
   }
 });
*/

// could be used for detect labels rekognition function 
// not yet working

/*  
var thirdParams = {
  Image: {
    S3Object: {
      Bucket: yourS3Bucket,
      Name: yourImageForLabelsName
    }
  },
  MaxLabels: 123,
  MinConfidence: 70
};
*/ 

 // rekognition.detectLabels(secondParams, function(err, data) {
 //   if (err)
 //   {
 //     console.log(err, err.stack); // an error occurred
 //   }
 //   else
 //   {
 //     console.log(data);           // successful response
 //     var test = data.Labels;
 //     var string = '';
 //     for(var i=0; i< test.length; i++)
 //     {
 //       string += test[i].Confidence+" "+test[i].Name+"<br>";
 //       console.log(test[i].Confidence);
 //       console.log(test[i].Name);
 //     }
 //     document.getElementById("Labelresults").innerHTML = string;
 //   }
 // });



// Capture Image, currently this isn't saving the image
// the intent here is to use the camera to take a picture of yourself
// then compare to an image S3
// like a face validation :) 

(function()
{
  var streaming = false,
    video = document.querySelector('#video'),
    canvas = document.querySelector('#canvas'),
    buttoncontent = document.querySelector('#buttoncontent'),
    photo = document.querySelector('#photo'),
    startbutton = document.querySelector('#startbutton'),
    width = 320,
    height = 0;

  navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  navigator.getMedia({
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    video.style.display = "none";
    canvas.style.display = "block";
    startbutton.innerText= "RETAKE";
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  startbutton.addEventListener('click', function(ev) {
    if(startbutton.innerText==="CAPTURE")
    {
        takepicture();
    }
    else
    {
        video.style.display = "block";
        canvas.style.display = "none";
      startbutton.innerText= "CAPTURE";
    }
    ev.preventDefault();
  }, false);

})();