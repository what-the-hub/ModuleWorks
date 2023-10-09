export async function loadData() {
	try {
		const response = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
		return response.slice(0, 10); // get just 10 first items
	} catch (error) {
		console.error(error);
	}
}
