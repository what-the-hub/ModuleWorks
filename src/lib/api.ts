export async function loadData() {
	try {
		const response = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
		return response;
	} catch (error) {
		console.error(error);
	}
}
