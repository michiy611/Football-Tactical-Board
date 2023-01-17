# アプリの開発録

## Vue + Flask 環境の構築

https://qiita.com/Yoshipy/items/efbe34d9f28ac16f44ad
エラー解決  
http://blog.livedoor.jp/tamanooboshi/archives/30603777.html

Vue.js+Flaskで画像のアップロード機能
https://qiita.com/rockguitar67/items/f8edc33dd221d8f4e965

デザイナーが Vue.js で作る、ローカル動画ファイルのプレビュー画面
https://blog.vivita.io/entry/2019/04/08/070000




流れ

動画をアップロード
pythonで動画からCSVファイルを生成
形式
frame : {cls : gk_home, gk_home, fp_home, fp_away, referee} {pos : x_pos, ypos}

Frame,Time [s],Player25,,　　　Player15,,Player16,,Player17,,Player18,,Player19,,Player20,,Player21,,Player22,,Player23,,Player24,,Player26,,Player27,,Player28,,Ball,
1, 　　0.04,　　0.90509,0.47462,0.58393,0.20794,0.67658,0.4671,0.6731,0.76476,0.40783,0.61525,0.45472,0.38709,0.5596,0.67775,0.55243,0.43269,0.50067,0.94322,0.43693,0.05002,0.37833,0.27383,NaN,NaN,NaN,NaN,NaN,NaN,0.45472,0.38709
フレームの表示