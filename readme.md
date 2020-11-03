ほげほげ
======================

## ビルド準備

#### 設定ファイル

- .firebaserc 
- config/base/firebaseServiceAccountKey.ts
- config/base/firebaseWebAppConfig.ts
- config/base/googleMaps.ts

#### docker開発環境の準備と開始

dockerはシェルスクリプトにより管理されます。
下記のシェルスクリプトコマンドを実行して開発環境を準備します。
時間がかかります。

```bash
cd ${FUHAHAROOT}
sh docker.sh first
```

下記のシェルスクリプトコマンドを実行すれば準備した開発環境を立ち上げることができます。

```bash
cd ${FUHAHAROOT}
sh docker.sh start
```

下記のシェルスクリプトコマンドを用いて適切なアカウントでfirebaseにログインしてください。
一度ログインしてしまえばずっとログインしっぱなしになります。

```bash
cd ${FUHAHAROOT}
sh docker.sh login
```

#### docker開発環境の停止と削除

下記のシェルスクリプトコマンドを実行すれば立ち上げた開発環境を止めることができます。

```bash
cd ${FUHAHAROOT}
sh docker.sh stop
```

下記のシェルスクリプトコマンドを実行すれば開発環境を取り除いて綺麗な状態にすることができます。

```bash
cd ${FUHAHAROOT}
sh docker.sh last
```

## ビルド実行

#### とりあえず動作確認のビルド

下記のシェルスクリプトコマンドを実行すれば、ビルドしたのちに、エミュレータが立ち上がります。

```bash
cd ${FUHAHAROOT}
sh docker.sh second
```

#### 開発用のビルド

サーバ側の処理を行うためにエミュレータを立ち上げます。

```bash
cd ${FUHAHAROOT}
sh docker.sh srv
```

クライアント側はビルドで時間をかけすぎないように、エミュレータを使わずにwebpackでビルドをします。

```bash
cd ${FUHAHAROOT}/hosting
npm install
npm run watch -- --port 8888
```

## ライセンス

MIT
