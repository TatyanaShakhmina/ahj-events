import './style.css';
import { initGame } from './app';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('game-container');
    initGame(container);
});
