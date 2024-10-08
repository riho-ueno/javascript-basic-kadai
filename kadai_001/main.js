// 打つ前の文字を空欄にしとく 
// 入力前テキスト
let untyped = '';
// 入力済みテキスト
let typed = '';
// 最初のscoreは0
let score = 0;



// 必要なHTML要素の取得
// 打つ前の文字の箇所をuntypedfield
const untypedfield =document.getElementById('untyped');
// 打った後の箇所をtypefield
const typedfield = document.getElementById('js-typed');
// 打った後と打つ前の箇所をwrap
const wrap = document.getElementById('js-wrap');
// 
const start = document.getElementById('start');

const count = document.getElementById('js-count');

const point = document.getElementById('point');


// 複数のテキストを格納する配列
 const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  // Math.floor()メソッドは小数点以下を切り捨てるメソッド
  // Math.random()メソッドは「0以上1未満の小数点以下の値」をランダムに取得するメソッド
  // ＊は掛け算
  // textListsはテキスト配列だね
  // .length　は配列の要素数
  // 例えば0から５までのランダムの数にしたいなら、Math.random() * 6

  // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

  // テキスト配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);

  // 打つ前の文字の最初に表示されるのはtextListsの〇番目にする
  // untyped = textLists[0];

  // テキスト配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
  
  // 打つ前のフィールドに、textContentプロパティを使ってテキスト表示させる。untyped=はテキスト配列の〇番目
    untypedfield.textContent = untyped;
};

  // 関数を呼び出すために、これ書かないといけない。
  // createText();

  // キー入力の判定で、どのキーを押したのかは.keyプロパティに元々入っているよ。（.lengthが要素数取得できるのと一緒）
  const keyPress = e => {


  // 誤タイプの場合
  // もし、押したキーイベントが、入力前の一文字目と一緒ではなかったら、
  if(e.key !== untyped.substring(0,1)){
    // classList.add()メソッドでclass属性（mistyped）を追加し、背景色を変更する
    wrap.classList.add('mistyped')

    // 100s後に背景色を元に戻す。
    // setTimeout()メソッド：一定時間後に一度だけ特定の処理を行う
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    },100);
    return;
  }


  // 正タイプの場合
  // スコアのインクリメント
  score++;

  // typed（入力後）に、untyped（入力前）のsubstring(開始インデックス,終了インデックス）メソッドで、０番目から１番目までを抽出する
  typed += untyped.substring(0,1);
  // untyped（入力前）に、untyped（入力前）のsubstring(開始インデックス)で終了インデックスがない時は開始インデックスからそれ以降の文字を抽出する
  untyped = untyped.substring(1);
  // 代入する
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

   // テキストがなくなったら新しいテキストを表示
   if(untyped === '') {
    createText();
  }
  point.textContent = score;
};


  

// タイピングスキルのランクを判定
const rankCheck = score => {

// スコアの値を返す
// 「テンプレートリテラル」とは、バッククォート「`」で文字列を囲むJavaScriptの機能
//文字列内に${変数名}と記述することで、文字列内に変数を埋め込むことができる。
// 注意！＄（）ではなく、${}である。
// return `${score}文字打てました!`; 

// テキストを格納する変数を作る
let text = '';

// スコアに応じて異なるメッセージを変数textに格納する
if(score < 100){
  // 「\」バックスラッシュは　オプションキー　+　「￥」
  // \nは、改行
  text =`あなたのランクはCです\nBランクまであと${100 - score}文字です。`
} else if(score < 200) {
  text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
} else if(score < 300) {
  text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
} else if(score >= 300) {
  text = `あなたのランクはSです。\nおめでとうございます!`;    
}
// confirm()メソッドで作成したダイアログは、「OK」ボタンをクリックすると戻り値としてtrueを取得
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};



// ゲームを終了
  const gameOver = id => {
    //  clearInterval()メソッドの引数にsetInterval()メソッドの戻り値（id）を渡すことで、タイマーを止めることができる。
    clearInterval(id);
    // confirm()メソッドはダイアログを表示する。
    // rankCheck関数は、タイピングスキルのランクを判定する関数。
    // 定数にすると同時に実行
    const result = confirm(rankCheck(score));

    // ダイアログのokボタンをクリックされたらリロードする
    // confirm()メソッドで作成したダイアログは、「OK」ボタンをクリックすると戻り値としてtrueを取得
    if (result == true){
      // 現在のページのURLを再読み込みすることができる。
      window.location.reload();
    }
  };




// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  // setInterval()は、5秒間隔や10秒間隔など一定の間隔で処理を実行し続けるメソッド
  const id = setInterval(() => {
    
    // カウントダウンする
    time--;
    count.textContent = time;

    // clearInterval()メソッドの引数にsetInterval()メソッドの戻り値（id）を渡すことで、タイマーを止めることができる。
    if(time <= 0){
      gameOver(id);
    }
  }, 1000);
};




// // キーを押した時、（keypressイベント）に、関数keyPressを実行する.この時勝手にプログラムで、引数を渡さなくてもaddEventListener（）によって実行される処理を引数として関数に渡しているよ。
// document.addEventListener('keypress',keyPress);
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する。createText関数を呼び出す。
  createText();

  // 「スタートボタン」を押したら非表示にする。style.displayはStyleオブジェクトのdisplayプロパティです。
  // Styleオブジェクトとは、要素のスタイルを自由自在に変更する為に使われるものです。例えば、要素の高さや幅、色や背景の指定など、様々な工夫を加えることが出来ます。
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

// もともと表示するテキストを、.textContentプロバティで表示
untypedfield.textContent = 'スタートボタンで開始';