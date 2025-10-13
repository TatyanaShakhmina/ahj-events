const maxMisses = 5;

export default class Game {
    constructor(view) {
        this.view = view;
        this.activeIndex = null;
        this.score = 0;
        this.misses = 0;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(() => this.nextGoblin(), 1000);
        this.view.setClickHandler((index) => this.hit(index));
    }

    stop() {
        clearInterval(this.timer);
        this.view.showGameOver(this.score, () => this.restart());
    }

    restart() {
        // Сбрасываем состояние игры
        this.activeIndex = null;
        this.score = 0;
        this.misses = 0;

        // Обновляем отображение
        this.view.updateScore(this.score);
        this.view.updateMisses(this.misses);
        this.view.removeGoblin();

        // Запускаем игру заново
        this.start();
    }

    nextGoblin() {
        // Увеличиваем промахи, если гоблин был активен и по нему не кликнули
        if (this.activeIndex !== null) {
            this.misses++;
            this.view.updateMisses(this.misses);
        }

        // Проверяем условие проигрыша
        if (this.misses >= maxMisses) {
            this.stop();
            return;
        }

        this.activeIndex =  this.view.moveGoblin(this.activeIndex);
    }

    hit(index) {
        if (index === this.activeIndex) {
            this.score++;
            this.view.updateScore(this.score);
            this.activeIndex = this.view.moveGoblin(this.activeIndex);
            clearInterval(this.timer);
            this.timer = setInterval(() => this.nextGoblin(), 1000);
        }
    }
}