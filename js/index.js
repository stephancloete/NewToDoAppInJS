window.addEventListener('load', () => {
	//get tasks from local storage
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTaskForm = document.querySelector('#newTaskForm');

	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

		//Create task object
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

		displayTasks()
	})
	displayTasks()})

function displayTasks () {
	const taskList = document.querySelector('#taskList');

	taskList.innerHTML = '';

	tasks.forEach(task => {
		const taskItem = document.createElement('div');
		taskItem.classList.add('taskItem');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		const date = document.createElement('div');
		const sortBtn = document.querySelector('#sortBtn');


		input.type = 'checkbox';
		input.checked = task.done;
		
		span.classList.add('bubble');
		
		/*if (task.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		} */
		
		content.classList.add('taskContent');
		date.classList.add('taskDate');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
		content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
		date.innerHTML = `<input type="date" value="${task.date}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
		

		label.appendChild(input);
		label.appendChild(span);
		
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		
		taskItem.appendChild(label);
		taskItem.appendChild(content);
		taskItem.appendChild(date);
		taskItem.appendChild(actions);
		

		taskList.appendChild(taskItem);


		if (task.done) {
					taskItem.classList.add('done');
				}
				
				input.addEventListener('change', (e) => {
					task.done = e.target.checked;
					localStorage.setItem('tasks', JSON.stringify(tasks));

					if (task.done) {
						taskItem.classList.add('done');
					} else {
						taskItem.classList.remove('done');
					}

					displayTasks()

				})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			console.log(input);
			input.removeAttribute('readonly');
			input.focus();
			
			/* const dateInput = content.querySelector('date');
			dateInput.removeAttribute('readonly');
			dateInput.focus(); */
			
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				task.content = e.target.value;
				localStorage.setItem('tasks', JSON.stringify(tasks));
				displayTasks()
			})

			/* dateInput.addEventListener('blur', (e) => {
				dateInput.setAttribute('readonly', true);
				task.date = e.target.value;
				localStorage.setItem('tasks', JSON.stringify(tasks));
				displayTasks()
			}) */	
		})

		deleteButton.addEventListener('click', (e) => {
			tasks = tasks.filter(t => t != task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			
			displayTasks()
		})
	})
	
}

//Listen for sort button being clicked
sortBtn.addEventListener('click', (e,)=> {
	//Sort task objects in tasks array alphabetically
	tasks.sort((a, b) => {
		let ca = a.content.toLowerCase(),
			cb = b.content.toLowerCase();
	
		if (ca < cb) {
			return -1;
		}
		if (ca > cb) {
			return 1;
		}
		return 0;
	});

	displayTasks()
})

