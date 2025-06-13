# カジカシ(クライアント)
アプリURL；https://kajikashi.onrender.com/

現状、Expo Goを使ったアプリ配信となっています。
お手数ですが、GooglePley ,AppStoreからExpo Goをインストールしていただきアプリ内でQRコードを読み取ってください。
- [GooglPlay](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)
- [AppStore](https://itunes.apple.com/app/apple-store/id982107779)

いつかアプリ単体でストア配信できたらいいな・・・

バックエンド側リポジトリ:https://github.com/naoto-nakamura-ac/kajikashi.git
- バックエンド側アプリの構築はこちらのリポジトリを参考にしてください
# サービス概要
家族の中でお互いの家事を見える化しスコアとして算出するアプリです。
少しでも夫婦、家族間ですれ違いがなくなることを祈ってます。

# 使用技術
## Backend
- Kotlin
- SpringBoot
## FrontEnd
- ReactNative
- Gluestack-UI
- Expo
## Enviroment
- Render (API Server)
- Expo GO (MobileApp Deploy)
## DataBase
- Postgresql 14
# Setup
1. リポジトリをローカル環境にCloneする
    ```
    https://github.com/naoto-nakamura-ac/kajikashiClient.git
    ```
   - IntelliJ,Node.jsはインストール、セットアップ済み前提
2. 依存関係をインストールする
   ```
   npm install
   ```
3. CLIツールをインストールする
   ```
   npm install eas-cli 
   ```
- Expo起動したり、Publishするのに必要
4. Expoをローカル環境で起動する
   ```
   npx expo start
   // キャッシュをクリアしたい場合
   npx expo start --clear
   ```
   - コンソールに出てくるQRコードを実機のExpoGoアプリで読み込めば実機でテストできる
5. Expo クラウドにPublishする
   ```
   $ eas update --branch main --message ""     
   ```

