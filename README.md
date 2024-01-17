# Project 5 - Blackjack

## 🌱概要
MVCに従って開発したトランプゲームのブラックジャック

## 🏠URL
https://develop--gorgeous-custard-38daf5.netlify.app

## ✨デモ
<img width="1680" alt="スクリーンショット 2023-06-14 13 08 52" src="https://github.com/Teradad41/Card_Game/assets/107381511/df12b87e-f32b-42c9-9084-f34caa2cd48b">

## 📝説明
ルールは標準的なブラックジャックのルールに従います。

ゲームでは、各プレイヤーはハウスと 1 対 1 で勝負します。

プレイヤーには以下の選択肢があります。
- Surrender　最初に配られた 2 枚のカードで負けを認めることができます。賭けた金額の半分が返ってきます。このアクションは最初の 2 枚のカードが配られた後にしか行えません。
- Stand　カードの追加をやめて、現在の手札で勝負します。
- Hit　手札に 1 枚のカードを追加します。合計点数が 21 を超えてしまうとバスト（bust）となり、即座にプレイヤーの負けとなります。
- Double　ベット額を 2 倍にして、もう 1 枚だけカードを引くことができます。このアクションは最初の 2 枚のカードが配られた後にしか行えません。

## 💾使用技術
<table>
<tr>
  <th>カテゴリ</th>
  <th>技術スタック</th>
</tr>
<tr>
  <td rowspan=5>フロントエンド</td>
  <td>HTML</td>
</tr>
<tr>
  <td>CSS</td>
</tr>
<tr>
  <td>フレームワーク : TailWind CSS</td>
</tr>
<tr>
  <td>TypeScript</td>
</tr>
<tr>
  <td>JavaScript</td>
</tr>
<td rowspan=4>その他</td>
  <td>Git, GitHub</td>
</tr>
<tr>
  <td>パーッケージ管理：npm</td>
</tr>
<tr>
  <td>バンドラー：webpack</td>
</tr>
<tr>
  <td>コードフォーマッター：Prettier</td>
</tr>
</table>

## 📜作成の経緯


## 💻学んだこと
- TypeScriptでの開発の経験と、webpackやnpm scriptsなどの環境構築の経験を得ることができた。
- MVCモデルを用いて初めて開発を行ったため、モジュールの分割の仕方などが正しくできているのか分からないが、低結合高凝集を目指して自分なりに実装できた。
- 今まではCSSフレームワークとしてBootstrapを使用していたが、今回からTailwind CSSに切り替えた。今後はTailwind CSSを主に使用していこうと思った。

## ⭐️こだわった点


## 📮今後実装したいこと
- [ ] 他のゲームの追加
      
## 📑参考
- [TailWind CSS](https://tailwindcss.com)
- [webpack](https://webpack.js.org)
