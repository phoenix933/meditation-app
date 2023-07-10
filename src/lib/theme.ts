import { storage } from './storage';

const STORAGE_KEY = 'darkMode';
const CSS_CLASS = 'dark';

enum ColorScheme {
	Light = 'light',
	Dark = 'dark'
}

// https://stackoverflow.com/a/73864948/2419808
const getSystemColorScheme = () =>
	window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
		? ColorScheme.Dark
		: ColorScheme.Light;

const systemPrefersDarkMode = () => getSystemColorScheme() === ColorScheme.Dark;

export async function isDarkMode() {
	let darkMode = await storage.getValue(STORAGE_KEY);

	if (darkMode === null) {
		darkMode = systemPrefersDarkMode();
	}

	return darkMode;
}

export async function toggleDarkMode(darkMode: boolean, saveToStorage = true) {
	if (saveToStorage) {
		await storage.setValue(STORAGE_KEY, darkMode);
	}

	document.body.classList.toggle(CSS_CLASS, darkMode);
}
