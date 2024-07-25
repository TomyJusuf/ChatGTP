const gptAnswerContainer = document.getElementById('outputAnswer');
const API_KEY = '.........'; // token is already expired
const MODEL_NAME = 'gpt-3.5-turbo';
const MAX_TOKENS = 1000;
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function fetchGPTResponse(payload) {
  const response = await fetch(endpoint, payload);
  console.log(response);
  if (response.status !== 200) {
    throw new Error(`Failed with status ${response.status}`);
  }

  const data = await response.json();
 
  const message = data.choices[0].message.content;

  gptAnswerContainer.innerHTML = message;
   return message;
}

async function explainCode() {

  let code = document.getElementById('inputCode').value;
  let codePrompt =
    'You will be provided with a piece of code, and your task is to explain it in a concise way. ' +
    code;

  //TODO: create the payload according to the given API
  let payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: codePrompt }],
    temperature: 0.7,
  };

  let fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetchGPTResponse(fetchOptions);
}
explainCode();
function clearCode() {
  let output = document.getElementById('outputAnswer');
  output.innerHTML = '';
  let input = document.getElementById('inputCode');
  input.value = '';
}

var btnExplainCode = document.getElementById('explainCode');
btnExplainCode.addEventListener('click', explainCode);

var btnClearCode = document.getElementById('clearCode');
btnClearCode.addEventListener('click', clearCode);
