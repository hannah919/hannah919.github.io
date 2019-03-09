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
var id = 0;
var length = 0;


//处理来自服务器的数据
request.onload = function() {
    let characterText = request.response;
    characterObjs = JSON.parse(characterText);
    length = characterObjs.characters.length;

};

var nextButton = document.getElementById('nextButton');
var prevButton = document.getElementById('prevButton');
var displayContent = document.getElementById('displayContent');


nextButton.addEventListener('click', () => {
  console.log("click next");
  id = Math.round(Math.random()*length);
  displayCharacter.style.fontSize="400px";
  displayCharacter.innerHTML=characterObjs.characters[id].name;
  displayWords.innerHTML=characterObjs.characters[id].words;
  displayWords.style.fontSize="100px";
});

prevButton.addEventListener('click', () => {
  console.log("click prev");
});
