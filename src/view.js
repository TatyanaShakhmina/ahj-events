import goblinImage from "./images/goblin.png";


export default class View {
    constructor(container) {
        this.container = container;
        this.cells = [];
        this.goblin = this.createGoblin();
        this.onClick = null;
    }

    renderBoard() {
        this.container.innerHTML = '';

        // Отрисовка поля
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.container.appendChild(cell);
            this.cells.push(cell);
        }

        // Устанавливаем обработчик клика
        this.container.addEventListener('click', (e) => {
            if (!this.onClick) return;
            const cell = e.target.closest('.cell');
            // Вызываем сохраненную функцию (hit) в onClick
            if (cell) this.onClick(Number(cell.dataset.index));
        });

        // Отрисовка счета
        const score = document.createElement('div');
        score.classList.add('score');
        score.id = 'score';
        score.textContent = 'Score: 0';
        this.container.appendChild(score);

        // Отрисовка пропусков
        const miss = document.createElement('div');
        miss.classList.add('miss');
        miss.id = 'miss';
        miss.textContent = 'Misses: 0';
        this.container.appendChild(miss);
    }

    // Создаем гоблина
    createGoblin() {
        const img = document.createElement('img');
        img.src = goblinImage;
        img.classList.add('goblin');
        return img;
    }

    // Перемещаем гоблина в новую случайную ячейку
    moveGoblin(prevIndex) {
        // Удаляем гоблина из предыдущей ячейки (если он там был)
        if (typeof prevIndex === 'number') {
            this.removeGoblin();
        }

        // Выбираем другую случайную ячейку
        let index;
        do {
            index = Math.floor(Math.random() * this.cells.length);
        } while (index === prevIndex);

        this.cells[index].appendChild(this.goblin);
        return index;
    }

    // Удаляем гоблина
    removeGoblin() {
        if (this.goblin.parentElement) {
            this.goblin.parentElement.removeChild(this.goblin);
        }
    }

    // Обновляем счет
    updateScore(score) {
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    // Обновляем пропуски
    updateMisses(misses) {
        document.getElementById('miss').textContent = `Misses: ${misses}`;
    }

    // Окончание игры
    showGameOver(score) {
        alert(`Игра окончена. Ваш счёт: ${score}`);
    }

    // Сохраняем переданную функцию из Game в поле onClick
    setClickHandler(handler) {
        this.onClick = handler;
    }
}