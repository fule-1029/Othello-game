const boardElement = document.querySelector('.board');

// 8x8のオセロ盤を生成
for (let i = 0; i < 64; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    boardElement.appendChild(cell);
}

let currentPlayer = 'black'; // 現在のプレイヤーの色

// セルをクリックしたときの動作を修正
boardElement.addEventListener('click', (event) => {
    const cell = event.target;
    if (!cell.classList.contains('cell')) return;

    // 石がすでに置かれている場合は何もしない
    if (cell.children.length > 0) return;

    // プレイヤーの石を置く
    const stone = document.createElement('div');
    stone.classList.add(currentPlayer);
    cell.appendChild(stone);

    // プレイヤーを切り替える
    currentPlayer = (currentPlayer === 'black') ? 'white' : 'black';
});
