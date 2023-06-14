## Recursion project5  
MVCモデルを用いてBlackJackを実装しました。

<img width="1680" alt="スクリーンショット 2023-06-14 13 08 52" src="https://github.com/Teradad41/Card_Game/assets/107381511/df12b87e-f32b-42c9-9084-f34caa2cd48b">

## About
ブラックジャックは、トランプのカードを使ったゲームです。カードには 4 つのスート（クラブ、ダイヤモンド、ハート、スペード）と、各スートに 13 のランク（A から K）があります。ゲームは、カジノ（ハウス）とプレイヤーで行われます。各プレイヤーはハウスと対戦し、1 対 1 で勝負します。

## Features
プレイヤーには以下の選択肢があります。
- Surrender　最初に配られた 2 枚のカードで負けを認めることができます。賭けた金額の半分が返ってきます。
- Stand　カードの追加をやめて、現在の手札で勝負します。
- Hit　手札に 1 枚のカードを追加します。合計点数が 21 を超えてしまうとバスト（bust）となり、即座にプレイヤーの負けとなります。
- Double　ベット額を 2 倍にして、もう 1 枚だけカードを引くことができます。このアクションは最初の 2 枚のカードが配られた後にしか行えません。

## Tech Stack
- プログラミング言語：TypeScript, JavaScript
- CSS フレームワーク：Tailwind CSS
- マークアップ言語：HTML, CSS
- パッケージバンドラー：webpack
- コードフォマッター：Prettier
- パッケージ管理システム：npm

## Setup
```zsh
npm install
```
```zsh
npm run start
# or
yarn start
```

## What I learned
- TypeScriptでの開発の経験と、webpackやnpm scriptsなどの環境構築の経験を得ることができた。
- MVCモデルを用いて初めて開発を行ったため、モジュールの分割の仕方などが正しくできているのか分からないが、低結合高凝集を目指して自分なりに実装できた。
- 今まではCSSフレームワークとしてBootstrapを使用していたが、今回からTailwind CSSに切り替えた。今後はTailwind CSSを主に使用していこうと思った。
- OOPを再度勉強して、他のゲームも追加したい。
