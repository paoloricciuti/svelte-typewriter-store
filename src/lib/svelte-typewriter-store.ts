import { writable } from "svelte/store";

export function typewriter(words: string[] = [], ms: number = 100, interWordsMs: number = 1500) {
    const { subscribe, set } = writable("");
    let currentWord = words[0];
    let currentIndex = 0;
    let currentWordIndex = 0;
    let direction = 1;
    const timeOutFunction = () => {
        set(currentWord.slice(0, currentIndex));
        let waiting = ms;
        if (currentIndex === currentWord.length) {
            direction = -1;
            waiting = interWordsMs;
        }
        currentIndex += direction;
        if (currentIndex === -1) {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            currentWord = words[currentWordIndex];
            currentIndex = 0;
            direction = 1;
        }
        if (currentWord) {
            setTimeout(timeOutFunction, waiting);
        }
    };
    if (currentWord) {
        setTimeout(timeOutFunction, ms);
    }
    return {
        subscribe,
        add(word: string) {
            words.push(word.toString());
            if (words.length === 1) {
                currentWord = words[0];
                currentWordIndex = 0;
                setTimeout(timeOutFunction, ms);
            }
        },
        remove(index: number) {
            words.splice(index, 1);
        },
        filter(predicate: (value: string, index: number, array: string[]) => boolean) {
            words = words.filter(predicate);
        },
    };
}