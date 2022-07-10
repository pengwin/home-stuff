import { createSignal, Setter } from 'solid-js';

function flipCase(text: string, setText: Setter<string>) {
  if (text[0] == text[0].toLowerCase()) {
    setText(text.toUpperCase());
  } else if (text[0] == text[0].toUpperCase()) {
    setText(text.toLowerCase());
  } else {
    setText(text);
  }
}


export default (p: { text: string }) => {
  const [text, setText] = createSignal(p.text);
  return <h1>
    <p>{text()}</p>
    <button onClick={e => flipCase(text(), setText)}>Flip</button>
  </h1>;
};
