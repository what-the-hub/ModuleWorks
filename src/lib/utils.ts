export function downloadToDoList(list: IToDo[]): void {
	const textToDownload = convertToDoListToText(list);
	const blob = new Blob([textToDownload], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = 'ToDos.txt';
	document.body.appendChild(a);
	a.click();

	URL.revokeObjectURL(url);
	document.body.removeChild(a);
}

function convertToDoListToText(list: IToDo[]): string {
	let text: string = '';
	list.forEach((item) => {
		text += `${item.id}. ${item.title} \n`;
	});
	return text;
}
