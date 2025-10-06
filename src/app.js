import Game from './game';
import View from './view';

export function initGame(container) {
    const view = new View(container);
    view.renderBoard();
    const game = new Game(view);
    game.start();
}