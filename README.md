# Tactical Board Generater
サッカーの試合映像から、作戦ボード好きなシーンを再現する。

# DEMO

[DEMO Movie](https://youtu.be/C0vk0hYURZQ)

# Features

チームスポーツをしたことがある人は分かると思います。（多分）  
作戦ボードに磁石を並べる作業って意外と時間かかりませんか？

そんな悩みを解決するアプリケーションを作りました。

# Machine Learning
## Yoloによる、人物・ボールの検出  
yoloを用いて学習を行い、モデルを作成する

使用modelの評価
|  Class| Images|Instances|Precision| Recall|  mAP50| mAP50-95|
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|    all|    200|   3021|  0.968|  0.925|  0.949|  0.717|
| player|    200|   2835|  0.987|  0.985|  0.994|  0.854|
|   ball|    200|    186|  0.949|  0.866|  0.904|   0.58|


## Kmeansによる、ユニフォームの色を分類
チーム判別のために、プレイヤーを検出した場合は、矩形内の色情報をK-Means法を用いて8種類に分類

## ホモグラフィ変換
3. Perspective Transfom モジュールを使用して、ホモグラフィ行列を生成


# Installation

Requirementで列挙したライブラリなどのインストール方法を説明する

```bash
pip install requirements.txt
```

# Usage
```bash
git clone https://github.com/michiy611/Football-Tactical-Board.git
cd Flask
flask run
```
