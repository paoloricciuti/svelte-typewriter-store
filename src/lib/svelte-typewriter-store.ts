import { writable } from "svelte/store";

type ListenersKeys = "letter:add" | "letter:remove" | "word";

type Listeners = Map<ListenersKeys, Set<(updated: string) => void>>;

export function typewriter(words: string[] = [], ms: number = 100, interWordsMs: number = 1500) {
    const { subscribe, set } = writable("", () => {
        return () => {
            // Runs when the store has no more subscribers
            clearTimeout(timeoutID);
            listeners.clear();
        };
    });
    let currentWord = words[0];
    let currentIndex = 0;
    let currentWordIndex = 0;
    let direction = 1;
    let listeners: Listeners = new Map([["letter:add", new Set()], ["letter:remove", new Set()], ["word", new Set()]]);
    let timeoutID: ReturnType<typeof setTimeout>;

    const timeOutFunction = () => {
        clearTimeout(timeoutID);
        set(currentWord.slice(0, currentIndex));
        let waiting = ms;
        if (currentIndex === currentWord.length) {
            listeners.get("word")!.forEach(cb => cb(currentWord));
            direction = -1;
            waiting = interWordsMs;
        } else {
            if (direction === 1) {
                listeners.get("letter:add")!.forEach(cb => cb(currentWord[currentIndex]));
            } else {
                listeners.get("letter:remove")!.forEach(cb => cb(currentWord[currentIndex]));
            }
        }
        currentIndex += direction;
        if (currentIndex === -1) {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            currentWord = words[currentWordIndex];
            currentIndex = 0;
            direction = 1;
        }
        if (currentWord) {
            timeoutID = setTimeout(timeOutFunction, waiting);
        }
    };
    if (currentWord) {
        timeoutID = setTimeout(timeOutFunction, ms);
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
        on(listener: ListenersKeys, cb: (updated: string) => void) {
            listeners.get(listener)?.add(cb);
        },
        off(listener: ListenersKeys, cb: (updated: string) => void) {
            listeners.get(listener)?.delete(cb);
        }
    };
}
