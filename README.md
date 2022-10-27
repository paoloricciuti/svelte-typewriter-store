# svelte-typewriter-store

The simplest way to get a rotating typewriter effect in svelte.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/svelte-typewriter-store)

![npm](https://img.shields.io/npm/v/svelte-typewriter-store)

![npm](https://img.shields.io/npm/dt/svelte-typewriter-store)

![GitHub last commit](https://img.shields.io/github/last-commit/paoloricciuti/svelte-typewriter-store)

## Contributing

Contributions are always welcome!

For the moment there's no code of conduct neither a contributing guideline but if you found a problem or have an idea feel free to [open an issue](https://github.com/paoloricciuti/svelte-typewriter-store/issues/new)

If you want the fastest way to open a PR try out Codeflow

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/paoloricciuti/svelte-typewriter-store/)

## Authors

- [@paoloricciuti](https://www.github.com/paoloricciuti)

## Installation

Install svelte-typewriter-store with npm

```bash
  npm install svelte-typewriter-store@latest -D
```

## Usage/Examples

Simply import the typewriter function from the package and create a readable store like this

```svelte
<script>
	import { typewriter } from "svelte-typewriter-store";
    //the list of words you want to cycle through
	const words = ["one", "two", "three"];
    //the typing speed
	const speed = 100;
    //how much you want to wait between words
	const wordWait = 1500;
	let wordStore = typewriter(words, speed, wordWait);
</script>

<button on:click={async ()=>{
    //you can add new words with 
	const [word] = await fetch("https://random-word-api.herokuapp.com/word")
		.then(res => res.json());
	wordStore.add(word)
}}>
	Add word
</button>

<button on:click={async ()=>{
    //you can remove a word
	wordStore.remove(0);
}}>
	Remove first word
</button>

<button on:click={async ()=>{
    //you can filter a word
	wordStore.filter((word)=> word.length > 5);
}}>
	Filter length > 5
</button>

<h1>
    <!-- Simply print the store to get the effect -->
	The current word is: {$wordStore}
</h1>
```