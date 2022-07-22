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


export default (props: { text: string }) => {
  const [text, setText] = createSignal<string>();
  const textGetter = () => text() || props.text;
  return <h1>
    <p>{textGetter()}</p>
    <button class="rounded border-solid border-black border" onClick={() => flipCase(textGetter(), setText)}>
      <i class="i-mdi-account text-base">T</i>
      <span>Flip</span>
    </button>
  </h1>;
};
