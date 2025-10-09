import goblinImage from "./images/goblin.png";

const gridSize = 16;

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
        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.container.append(cell);
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
        this.container.append(score);

        // Отрисовка пропусков
        const miss = document.createElement('div');
        miss.classList.add('miss');
        miss.id = 'miss';
        miss.textContent = 'Misses: 0';
        this.container.append(miss);

        // Создаём модальное окно
        this.createModal();
    }

    // Создаем модальное окно
    createModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Игра окончена!</h2>
                <p class="modal-score"></p>
                <button class="modal-button">Начать заново</button>
            </div>
        `;
        document.body.append(modal);
        this.modal = modal;
    }

    // Создаем гоблина
    createGoblin() {
        const img = document.createElement('img');
        img.src = goblinImage;
        img.alt = 'Goblin';
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

        this.cells[index].append(this.goblin);
        return index;
    }

    // Удаляем гоблина
    removeGoblin() {
        if (this.goblin.parentElement) {
            this.goblin.remove();
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
    showGameOver(score, onRestart) {
        const modalScore = this.modal.querySelector('.modal-score');
        const modalButton = this.modal.querySelector('.modal-button');

        modalScore.textContent = `Ваш счёт: ${score}`;
        this.modal.classList.add('modal-visible');

        // Обработчик кнопки перезапуска
        modalButton.onclick = () => {
            this.modal.classList.remove('modal-visible');
            if (onRestart) onRestart();
        };
    }

    // Сохраняем переданную функцию из Game в поле onClick
    setClickHandler(handler) {
        this.onClick = handler;
    }
}