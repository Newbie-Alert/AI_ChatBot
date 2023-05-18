var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var request = require('request');
var { OpenAIApi, Configuration } = require('openai');

let config = new Configuration({
  apiKey: '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',
});
let openai = new OpenAIApi(config);



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

var client_id = 'A61JT3mxZfM9dJ6W4nZ2';
var client_secret = 'nc9m4kO3qk';

app.get('/translate', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

  var options = {
    url: api_url,
    form: { 'source': 'ko', 'target': 'en', 'text': query },
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
  };

  request.post(options, function (error, response, body) {
    var translated = JSON.parse(body).message?.result.translatedText;

    openai.createCompletion({
      model: "text-davinci-003",
      prompt: translated,
      temperature: 0.9,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((result) => {
      console.log('ai 응답', result.data.choices[0].text);

      var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
      var query = result.data.choices[0].text;
      var options = {
        url: api_url,
        form: { 'source': 'en', 'target': 'ko', 'text': query },
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
      };
      request.post(options, function (error, response, body) {
        console.log(body);
        res.status(200).json(body);
      });
    }).catch((error) => {
      console.log('openai error', error)
    })
  });
});


app.listen(3000, function () {
  console.log('http://localhost:3000/ app listening on port 3000!');
});