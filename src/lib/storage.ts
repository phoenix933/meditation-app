import { Preferences } from '@capacitor/preferences';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setValue(key: string, value: any) {
	return Preferences.set({
		key,
		value: JSON.stringify(value)
	});
}

async function getValue(key: string) {
	const result = await Preferences.get({ key });

	return JSON.parse(result?.value);
}

export const storage = {
	getValue,
	setValue,
	clear: Preferences.clear
};
