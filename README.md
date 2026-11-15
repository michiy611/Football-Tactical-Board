# Tactical Board Generater
サッカーの試合映像から、作戦ボード好きなシーンを再現する。

# DEMO

[DEMO Movie](https://youtu.be/C0vk0hYURZQ)

# Features

チームスポーツをしたことがある人は分かると思います。
作戦ボードに磁石を並べる作業って意外と時間かかりませんか？

そんな悩みを解決するアプリケーションを作りました。


画像処理部分のみ（https://github.com/michiy611/Football-Hawk-Eye-View）

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


# Requirements

- Python 3.9
- CPU で動作します（GPU は不要）
- Node.js は不要です（ビルド済みのフロントエンド `Vue/dist` を Flask が配信します）

# Installation

### 1. リポジトリを取得

```bash
git clone https://github.com/michiy611/Football-Tactical-Board.git
cd Football-Tactical-Board/Flask
```

### 2. 学習済みモデルを配置

[Releases](https://github.com/michiy611/Football-Tactical-Board/releases) から重みファイルをダウンロードし、`Flask/weights/` に以下の構成で配置します。

```
Flask/weights/
├── best.pt                     # YOLOv5（選手・ボール検出）
├── deep_network.pth            # カメラ姿勢推定用の特徴抽出ネットワーク
├── data/
│   ├── worldcup2014.mat
│   └── deep/feature_camera_91k.mat
└── pytorch-two-GAN-models/
    └── soccer_seg_detection_pix2pix/
        ├── detec_latest_net_G.pth
        └── seg_latest_net_G.pth
```

### 3. ライブラリをインストール

```bash
python -m venv .venv
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1
# macOS / Linux
source .venv/bin/activate

pip install torch==2.8.0 torchvision==0.23.0 --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
```

# Usage

```bash
# Windows (PowerShell)
$env:TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD = "1"
# macOS / Linux
export TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1

python app.py
```

ブラウザで http://127.0.0.1:5000 を開きます。

> `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD` は、PyTorch 2.6 以降で `torch.load` の既定動作が変わったため、2023 年に保存したモデルを読み込むために必要です。
>
> 初回起動時は `torch.hub` が YOLOv5 のコードを GitHub から取得するため、インターネット接続が必要です。

# Credits

本プロジェクトは以下のオープンソースを利用しています。

- [ultralytics/yolov5](https://github.com/ultralytics/yolov5) (GPL-3.0) — 物体検出（`Flask/yolov5/`）
- [lood339/pytorch-two-GAN](https://github.com/lood339/pytorch-two-GAN) — フィールドの領域分割・ライン検出（`Flask/perspective_transform/`）
- [lood339/SCCvSD](https://github.com/lood339/SCCvSD) — Sports Camera Calibration via Synthetic Data（カメラ姿勢の推定・ホモグラフィ）
