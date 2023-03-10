import { AtomEffect, atom } from "recoil";

export type ThemeState = "light" | "dark";

const defaultThemeState: ThemeState = "dark";

/**
 * This is our Atom Effect which will behave similarly to React.useEffect with
 * the atom in the dependencies array
 *
 * @param key the value used to store and retrieve data from local storage
 */
const localStorageEffect =
  (key: string): AtomEffect<ThemeState> =>
  ({ setSelf, onSet }) => {
    // Retrieve the value stored at the specified key
    const stored = localStorage.getItem(key);
    // Check if the value exists and is light or dark
    if (stored === "dark" || stored === "light") {
      // If the value is valid, the call the provided function setSelf which initializes the atom value
      setSelf(stored);
    }
    // Creates the callback triggered when the atom is changed
    onSet((value, _, isReset) => {
      if (isReset) {
        // If atom has been reset then remove it from local storage
        localStorage.removeItem(key);
      } else {
        // If value has changed then store the value in local storage
        localStorage.setItem(key, value || _); // the || is a fail-safe if for any reason value is null the value will revert to default
      }
    });
  };

export const themeState = atom<ThemeState>({
  key: "themeState",
  default: defaultThemeState,
  effects: [localStorageEffect("theme-state")],
});
