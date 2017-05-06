

class Cell {
	constructor(fieldElement) {
		this.element = createAndAppend({
			className: 'cell',
			parentElement: fieldElement
		});



		if (Math.random() > 0.8) {
			this.spawn();
		}
	}

	get value() {
		return this._value || 0;
	}

	set value(value) {
		this._value = value;

		this.element.innerHTML = value == 0 ? '' : value;
		this.element.setAttribute('data-ship', value);
	}

	clear() {
		this.value = '';
	}

	merge(cell) {
		this.value += cell.value;
		cell.clear();
	}

	isSameTo(cell) {
		return this.value == cell.value;
	}

	spawn() {
		this.value = Math.random() > 0.5 ? 4 : 2;
	}

	get isEmpty() {
		return this.value == 0;
	}
}