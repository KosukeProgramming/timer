// HTMLの表示領域の取得
const timer = document.getElementById("timer");
// 分、秒ボタンを取得
const sec = document.getElementById("sec");
const min = document.getElementById("min");
// 時間を加算するための変数
let timeToCountDown = 0;
// スタートボタンを取得
const start = document.getElementById("start");
// 開始or終了のフラグ
let isRunning = false;
// スタートボタンを押した時間
let startTime;
// 残り時間
let timeLeft;

// ミリ秒を分と秒に直して表示する関数
function updateTimer(milliSecond) {
    let d = new Date(milliSecond);
    let m = d.getMinutes();
    let s = d.getSeconds();
    // 表示用に整形
    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);
    // HTMLで表示する
    timer.textContent = `${m}:${s}`;
}

// 秒ボタンが押されたら設定時間に加算
sec.addEventListener("click", function () {
    // 1秒は1000msなので1000を加算

    timeToCountDown += 1000;
    // 画面に表示する
    updateTimer(timeToCountDown);
});

// 分ボタンが押されたら設定時間に加算
min.addEventListener("click", function () {
    // 1分は60000msなので1000を加算

    timeToCountDown += 60000;

    // 画面に表示する
    updateTimer(timeToCountDown);
});

// スタートボタンが押された時の処理
start.addEventListener("click", function () {
    if (isRunning === false) {
        isRunning = true;

        // 表記をストップに変える
        start.textContent = "ストップ";

        startTime = Date.now();

        countDown();
    } else {
        isRunning = false;

        // 表記をスタートに戻す
        start.textContent = "スタート";

        // timeLeftで更新する
        timeToCountDown = timeLeft;

        // カウントを止めたいのでclearTimeoutする
        clearTimeout(timerId);
    }
});

// リセットボタンが押された時の処理
reset.addEventListener('click', function() {
    isRunning = false;

    // 表記をスタートに戻す
    start.textContent = "スタート";

    // timeLeftで0にする
    timeToCountDown = 0;

    // 表示をリセットする
    timer.textContent = '00:00';

    // カウントを止めたいのでclearTimeoutする
    clearTimeout(timerId);
})

// カウントダウンを行う関数
function countDown() {
    timerId = setTimeout(function () {
        // 残り時間 = 設定時間 - (現在時刻 - スタートボタンを押した時間)
        timeLeft = timeToCountDown - (Date.now() - startTime);

        // 残り時間が0になった時の処理
        if (timeLeft < 0) {
            isRunning = false;
            start.textContent = "スタート";
            clearTimeout(timerId);
            timeLeft = 0;

            // 設定時間の初期化
            timeToCountDown = 0;

            // updateTimer(timeLeft);
            updateTimer(timeLeft);

            return;
        }

        // countDownを再起的に呼び出す
        updateTimer(timeLeft);
        countDown();
    }, 10);
}
