let requestURL = 'single_character/single_character.json';
//创建一个HTTP请求对象
let request = new XMLHttpRequest();
//使用open（）打开一个新请求
request.open('GET', requestURL);
//设置XHR访问JSON格式数据，然后发送请求
// request.responseType = 'json';
//设置XHR访问text格式数据
request.responseType = 'text';
request.send();

var characterObjs;
var displayCharacter = document.getElementById("displayCharacter");
//.innerHTML=characterObjs.characters[0].name;
var displayWords = document.getElementById("displayWords");

//.innerHTML=characterObjs.characters[0].words;
var currID = 0;
var prevID = 0;
var length = 0;


//处理来自服务器的数据
request.onload = function() {
    let characterText = request.response;
    characterObjs = JSON.parse(characterText);
    length = characterObjs.characters.length;

};

var nextButton = document.getElementById('nextButton');
var prevButton = document.getElementById('prevButton');
var ttsButton = document.getElementById('tts');
var playButton = document.getElementById('play');
var displayContent = document.getElementById('displayContent');
var characterLevel = document.getElementById("characters_level");
nextButton.style.fontSize="80px";
prevButton.style.fontSize="80px";
playButton.style.fontSize="80px";
characterLevel.style.fontSize="80px";

nextButton.addEventListener('click', () => {
  console.log("click next");
  prevID = currID;
  currID = Math.round(Math.random()*length);
  displayCharacter.style.fontSize="400px";
  displayCharacter.innerHTML=characterObjs.characters[currID].name;
  displayWords.innerHTML=characterObjs.characters[currID].words;
  characterLevel.innerHTML=characterObjs.characters[currID].level;
  displayWords.style.fontSize="100px";
  //cancel();
  console.log("prepare tts");
  tts();
});

prevButton.addEventListener('click', () => {
  console.log("click prev");
  displayCharacter.style.fontSize="400px";
  displayCharacter.innerHTML=characterObjs.characters[prevID].name;
  displayWords.innerHTML=characterObjs.characters[prevID].words;
  displayWords.style.fontSize="100px";
  //cancel();
  console.log("prepare tts");
  tts();
});

playButton.addEventListener('click', () => {
  displayCharacter.style.fontSize="400px";
  console.log("click play");
  if (audio === null) {
    alert('请先点击合成')
  } else {
    audio.play();
  }
});

// 合成按钮
function tts() {
  //let text = document.getElementById('text').value;
  playButton.innerText = '准备中';

  // 调用语音合成接口
  // 参数含义请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
  audio = btts({
    tex: characterObjs.characters[currID].name,
    tok: '24.80d6637161724cdf5e4ea81fe494e23b.2592000.1565179850.282335-16738174',
    spd: 1,
    pit: 5,
    vol: 15,
    per: 4
  }, {
    volume: 0.5,
    autoDestory: true,
    timeout: 10000,
    hidden: true,
    onInit: function (htmlAudioElement) {

    },
    onSuccess: function(htmlAudioElement) {
        audio = htmlAudioElement;
        playButton.innerText = '播放';
    },
    onError: function(text) {
        alert(text)
    },
    onTimeout: function () {
        alert('timeout')
    }
  });
}

// 取消按钮
function cancel() {
  if (audio === null) {
    alert('请先点击合成')
  } else {
    audio.pause();
    document.body.removeChild(audio);
    audio = null;
    playBtn.innerText = '准备中';
  }
}


