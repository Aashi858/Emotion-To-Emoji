Webcam.set({
    width : 350,
    height : 240,
    image_format : "png",
    png_quality : 90
});
camera = document.getElementById("webcam");
Webcam.attach(camera);

function captureImage(){
    Webcam.snap(function(data_url){
        document.getElementById("snapshot").innerHTML = "<img id = 'captured_image' src =" + data_url + ">";
    })
}

console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jnajh6cq_/model.json",model_loaded);
function model_loaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function predict(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
   if (error) {
       console.error(error);
   } else {
       console.log(results);
       document.getElementById("emotion_1").innerHTML = results[0].label;
       document.getElementById("emotion_2").innerHTML = results[1].label;
       prediction_1 = results[0].label;
       prediction_2 = results[1].label;
       speak();
     if(results[0].label == "Happy"){
          document.getElementById("emotion_image1").innerHTML = "&#128512";
          console.log("happy1");
    }
    if(results[0].label == "Sad"){
        document.getElementById("emotion_image1").innerHTML = "&#128546;";
        console.log("sad1");
    }
    if(results[0].label == "Angry"){
       document.getElementById("emotion_image1").innerHTML = "&#128544;";
       console.log("angry1");
    }
    if(results[1].label == "Happy"){
        document.getElementById("emotion_image2").innerHTML = "&#128512";
        console.log("happy2");
    }
    if(results[1].label == "Sad"){
        document.getElementById("emotion_image2").innerHTML = "&#128546;";
        console.log("sad2");
    }
    if(results[1].label == "Angry"){
        document.getElementById("emotion_image2").innerHTML = "&#128544;";
        console.log("angry2");
    }
  }
}