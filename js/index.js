window.addEventListener('load', () => {
	//get tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTaskForm = document.querySelector('#newTaskForm');

	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

		const task = {
			content: e.target.elements.taskInput.value,
			date: e.target.elements.dueDate.value,
			done: false,
            createdAt: new Date().getTime()
		}

		//store new tasks to tasks array
        tasks.push(task);

        //store taskarray to local storage
		localStorage.setItem('tasks', JSON.stringify(tasks));

		// Reset the form
		e.target.reset();

		//DisplayTodos()
	})
	//DisplayTodos()
})