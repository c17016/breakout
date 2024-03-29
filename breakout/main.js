const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 5;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 20;

const input = new Input();
const ball = new Ball(400, 400, 10, 'red');
const paddle = new Paddle(400, 550, 80, 10, 'deepskyblue');
const blocks = [];

var  score = 0;

// ブロックの並び
for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 9; j++) {
        blocks.push(new Block(80 + (j * 80),60 + (i * 50),BLOCK_WIDTH,BLOCK_HEIGHT,"lime"));
    }
}

//blocks.push(new Block(400, 50, BLOCK_WIDTH, BLOCK_HEIGHT, "lime"));

window.setInterval(game_tick, SPF);

function game_tick() {
    //console.log(blocks.score);
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }

    // ボールの移動
    ball.move();

    // ボールとブロックの当たり判定
    paddle.collide(ball);
    // ボールとブロックの当たり判定
    blocks_collide();

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks.forEach((block) => block.draw(ctx));

    // スコア描画
    ctx.fillStyle = 'lime';
    ctx.font = '20px "Arial Black"';
    ctx.fillText('score : ' + /*blocks.*/score, 10, 580);
}

function blocks_collide() {
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] && blocks[i].collide(ball)) {
            blocks.splice(i, 1);

            // スコアの加算
            this.score++;
        }
    }

    // クリア判定
    if (blocks.length <= 0) {
        alert("GAME CLEAR\n＊あなたのスコア＊：" + score + " 点");
        document.location.reload();
    }
}