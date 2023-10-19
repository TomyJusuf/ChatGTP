const gptAnswerContainer = document.getElementById('outputAnswer');
const API_KEY = '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';
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
  console.log(data);
  const message = data.choices[0].message.content;
  console.log(message);
  gptAnswerContainer.innerHTML = message;
  // return message;
}

async function explainCode() {
  //theCode
  let code = document.getElementById('inputCode').value;
  let codePrompt =
    'You will be provided with a piece of code, and your task is to explain it in a concise way. ' +
    code;

  //missing information
  //TODO: create the payload according to the given api
  let payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: codePrompt }],
    temperature: 0.7,
  };

  let fetchOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  // fetchGPTResponse(fetchOptions).then((data) => {
  //   gptAnswerContainer.innerHTML = data;
  //   console.log(data);
  // });
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
