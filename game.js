const boardElement = document.querySelector('.board');

// 8x8のオセロ盤を生成
for (let i = 0; i < 64; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i; // 各セルにインデックスを追加
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

    // ひっくり返す処理を実行
    flipStones(cell.dataset.index, currentPlayer);

    // プレイヤーを切り替える
    currentPlayer = (currentPlayer === 'black') ? 'white' : 'black';
});

// ひっくり返す処理
function flipStones(index, color) {
    const opponentColor = (color === 'black') ? 'white' : 'black';
    const directions = [
        { x: 1, y: 0 },   // 右
        { x: 1, y: 1 },   // 右下
        { x: 0, y: 1 },   // 下
        { x: -1, y: 1 },  // 左下
        { x: -1, y: 0 },  // 左
        { x: -1, y: -1 }, // 左上
        { x: 0, y: -1 },  // 上
        { x: 1, y: -1 }   // 右上
    ];

    const startX = Math.floor(index % 8);
    const startY = Math.floor(index / 8);

    // 各方向をチェック
    directions.forEach(direction => {
        let x = startX + direction.x;
        let y = startY + direction.y;
        let toFlip = [];

        // 方向に沿って石を探索
        while (isValidPosition(x, y)) {
            const cell = document.querySelector(`.cell[data-index="${y * 8 + x}"]`);
            if (cell.children.length === 0) break; // 空のセルに到達
            if (cell.firstChild.classList.contains(opponentColor)) {
                toFlip.push(cell);
            } else if (cell.firstChild.classList.contains(color)) {
                // 自分の色の石があった場合、挟めるのでひっくり返す
                toFlip.forEach(flippedCell => {
                    flipCell(flippedCell, color);
                });
                break;
            } else {
                break; // それ以外の場合は終了
            }
            x += direction.x;
            y += direction.y;
        }
    });
}

// 有効な位置かどうかを確認
function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

// セルをひっくり返す
function flipCell(cell, color) {
    const stone = document.createElement('div');
    stone.classList.add(color);
    cell.innerHTML = ''; // 現在の石を削除
    cell.appendChild(stone); // 新しい色の石を追加
}
