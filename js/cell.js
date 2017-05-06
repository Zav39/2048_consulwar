

class Cell {
	constructor(fieldElement, game) {
		this.game = game;

		this.fieldElement = fieldElement;

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
		if (this.value) {
			this.game.addRating(this.value + cell.value);
		}
		
		new AnimateCell(cell, this);

		this.value += cell.value;

		this.hightlight();

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

	hightlight() {
		this.element.className = 'cell hightlight';

		let hightlightTime = 200;
		let hightlightStartTime = new Date();
		this.hightlightStartTime = hightlightStartTime;

		setTimeout(function() {
			if (hightlightStartTime == this.hightlightStartTime) {
				this.element.className = 'cell';
			} 
		}.bind(this), hightlightTime);
	}
}


class AnimateCell {
	constructor(fromCell, toCell) {
		this.element = createAndAppend({className: 'cell animate'});
		this.element.setAttribute('data-ship', fromCell.element.getAttribute('data-ship'));

		this.element.style.top = fromCell.element.offsetTop + 'px';
		this.element.style.left = fromCell.element.offsetLeft + 'px';

		fromCell.fieldElement.appendChild(this.element);

		this.element.style.top = toCell.element.offsetTop + 'px';
		this.element.style.left = toCell.element.offsetLeft + 'px';
		
		setTimeout(function() {
			fromCell.fieldElement.removeChild(this.element);
		}.bind(this), 1000)
	}
}