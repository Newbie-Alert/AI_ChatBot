import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai';
const chatInput = document.querySelector('.chat-input');
const chatBtn = document.querySelector('.chat-button');
const form = document.querySelector('.chat-form');
const chatAi = document.querySelector('.chat-ai');
const chatMe = document.querySelector('.chat-me');
const container = document.querySelector('.container');
const KEY = API_KEY.key;

chatBtn.addEventListener('click', function (e) {
  e.preventDefault();
  container.innerHTML += `
    <div class="chat-me">${chatInput.value}</div>
  `


  const configuration = new Configuration({
    apiKey: KEY,
  });
  const openai = new OpenAIApi(configuration);

  openai.createCompletion({
    model: "text-davinci-003",
    prompt: chatInput.value,
    temperature: 0.8,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }).then((result) => {
    console.log(result.data);
    container.innerHTML += `
    <div class="chat-ai">${result.data.choices[0].text}</div>
  `
  })
  chatInput.value = ``;
})

