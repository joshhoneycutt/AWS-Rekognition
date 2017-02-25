// Connect to AWS
var params = {
  SimilarityThreshold: 90,
  SourceImage: {
   S3Object: {
    Bucket: "jj-rek2",
    Name: "joe1.jpg"
   }
  },
  TargetImage: {
   S3Object: {
     Bucket: "jj-rek2",
     Name: "joe3.png"
   }
  }
 };
 var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27',
                                        accessKeyId: myAccessKeyId,
                                        secretAccessKey: mySecretAccessKey, // these variables come from secrets.js
                                        region: myRegion
                                      });
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
     document.getElementById("results").innerHTML = "Results = "+data.FaceMatches[0].Similarity+' Similarity';
   }
 });

/* Not currently using
 var secondParams = {
  Image: {
   S3Object: {
     Bucket: "YOUR S3 BUCKET NAME",
     Name: "YOUR PHOTO NAME"
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

 var thirdParams = {
  Image: {
   S3Object: {
     Bucket: "jj-rek2",
     Name: "picture.jpg"
   }
  },
  MaxLabels: 123,
  MinConfidence: 70
 };
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
(function()
{
  var streaming = false,
    video = document.querySelector('#video'),
    canvas = document.querySelector('#canvas'),
    buttoncontent = document.querySelector('#buttoncontent'),
    photo = document.querySelector('#photo'),
    startbutton = document.querySelector('#startbutton'),
    width = 640,
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