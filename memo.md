# 
dockerの拡張機能を入れる

右クリックで`attach shell`
dockerに入る
`docker exec -it epic_chatterjee sh`

1個のイメージから複数のコンテナを立てれる

一時停止：`docker stop コンテナ名`
削除：`remove`

--- 

`docker run -d -p 80:80 python:alpine`
pythonのインストールされたコンテナ

## Dockerfile
オリジナルのイメージを作る

## Dockerfileからイメージを作る
Dockerfileがあるディレクトリで
`docker image build -t epc .`

buildしてrun
runの方法：`docker run コンテナ名`　or `右クリック`
-p ローカルポート番号:コンテナポート番号 
  コンテナのポート番号をローカルのポート番号につなげる

`alpine` 最小単位

ビルド時 `RUN`
コンテナ起動時 `CMD`

## コンテナは消すもの、コンテナが消えてはならない設計はしない


## ボリューム

ローカルのappとコンテナのappを同期する
`docker run -p [hostポート]:[コンテナポート] -v ${PWD}/app:/app -d {イメージ名}`
-v （volume）

`PWD`：カレントディレクトリまでのパス

---
# docker-compose
yml（ヤムル、ヤメル）情報記述方式

## Docker のメリット
- 環境に依存しない
- トラフィックを分けるのが容易
- 立ち上げるスピードが早い
- セキュリティには問題？

docker-compose単体の場合と  
Dockerfiletと併用する場合がある。

docker-compose.ymlのある階層で,
`docker-compose build`  
- ビルドしなくてよい
  - ymlの変更はビルドしなくてよい
  - app.py　の変更はビルドしなくてよい

- ビルド必要
  - Dockerfileの変更はビルドが必要
  - ライブラリのインストールはDockerfileでやっているので、使用ライブラリを追加するときはビルドが必要

起動
`docker-compose up`　-d でバックグラウンド  
`docker-compose down`　消す

ファイル作ってそれぞれにDockerfile


databaseには大体 if not exist

```
データベースの入り方、確認
コンテナを消してもデータが保存される
dockerプラグインのmysql右クリック-> `Attach shell`  
`mysql --user root --password`   
`use epc_db`  
`select * from test_table`
```

## docker-compose
コンテナ同士を接続してネットワークを構築  

---
docker-compose upだけだとエラー  
別々にup （mysqlからならエラーにならない）  
docker-compose up -d mysql  
docker-compose up -d flask  
flaskがmysqlを見ているから  

---


## depends_on（docker-compose.yml）
- 記述してあるコンテナが立ち上がってから起動
- アプリが起動しているかどうかは保証しないため、起動に時間が- かかるアプリだと動かない場合も
- その場合はhealthcheckでアプリが起動しているかを確認

※高度
本番環境、実験環境、共通
3つのdocker-compose.ymlを作って
本番：本番環境+共通
実験：実験環境+共通