export function toMinutes(timeInSeconds: number) {
	timeInSeconds = timeInSeconds || 0

	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.floor(timeInSeconds % 60)
		.toString()
		.padStart(2, '0');

	return `${minutes}:${seconds}`;
}
