// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function msToTime(duration: any) {
	const milliseconds: number | string = Math.floor((duration % 1000) / 100);
	let seconds: number | string = Math.floor((duration / 1000) % 60);
	let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
	let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	return `${hours}hrs : ${minutes}mins : ${seconds}secs : ${milliseconds}ms`;
}
