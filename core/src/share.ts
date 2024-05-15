import { getMoveCount } from "core";

export function share() {
	const date = new Date();
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const formattedDate = `${year}/${month}/${day}`;
	let text = `Unsplit ${formattedDate}`;
	text += `\n\nPuzzle réussi en ${ getMoveCount() } mouvements.`
	text += `\n\nhttps://ferdodo.github.io/unsplit`;
	navigator.clipboard.writeText(text);
}