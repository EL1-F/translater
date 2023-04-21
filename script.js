const fromLang = document.getElementById('from-lang');
const toLang = document.getElementById('to-lang');
const fromText = document.getElementById('from-text');
const toText = document.getElementById('to-text');
const btn =document.getElementById('btnTranslate');
const exchangeIcon = document.querySelector('.exchange');
const icons = document.querySelectorAll(".icons");

for (let lang in languages) {

    let option = `<option value ="${lang}">${languages[lang]}</option>`;
    //console.log(lang);
    fromLang.insertAdjacentHTML("beforeend",option);
    toLang.insertAdjacentHTML("beforeend",option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
};

btn.addEventListener('click',()=>{
    let fromvalue = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    const url =`https://api.mymemory.translated.net/get?q=${fromvalue}&langpair=${from}|${to}`;

    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            toText.value = data.responseData.translatedText;
        });
});

exchangeIcon.addEventListener('click',(e)=>{

    let from = fromLang.value;
    let to = toLang.value;

    let fromValue = fromText.value;
    let toValue = toText.value;
    
    fromLang.value= to;
    toLang.value = from;

    toText.value=fromValue;
    fromText.value=toValue;

    
});

for (let icon of icons) {
    icon.addEventListener('click',(e)=>{
        if (e.target.classList.contains("fa-copy")) {
            if (e.target.id=="from") {
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;

            if (e.target.id=="from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            } else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }

            speechSynthesis.speak(utterance);
        }
    });
}