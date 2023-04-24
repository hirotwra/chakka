# README
### 概要説明
『Chakka!』は毎日の自主学習の記録を管理する日誌と、継続するモチベーション与えるゲーミフィケーションの要素を組み合わせたアプリケーションです。  
ユーザーが継続して学習記録をつけるたび、その努力を「経験値」「レベル」といった数値で可視化し、また他ユーザーと競い合う「スコア」などを与えます。  
これらのゲーム的な要素とReactを用いたSPA設計により、ユーザーのやる気に火を点け、かつそれが削がれてしまうことのないストレスフリーなアプリケーションであることを目標としています。   

本番環境: http://43.207.17.90  

以下のwikiで詳細な仕様について説明を記載しています  
wiki: https://github.com/HiroyasuTawara/chakka/wiki

### 操作説明  
Chakka!の基本的な機能について説明します。  
1.	学習を開始する  
ログイン直後に表示されるメインタブでは「ワーク開始」を押すことで学習記録を入力するフォームへ移動することができます。
	- この画面は「ワーク中」「ワーク完了」「確認」のステップ式のフォームとなっています。
	- ワーク中はその日に「やったこと」「わかったこと」を入力します。
	- ワーク完了時には「次やること」の予定・目標を立てます。
	- 各フォームを埋めて、「完了」ボタンを押すと、ワーク完了です！  
  
2.	レベルアップ  
ワーク達成時に与えられる経験値を集めることで、ユーザーステータスに設定されたレベルが上昇します。
	- ユーザーは各自に経験値という数値を持ち、累積経験値が一定の値を超えるごとにレベルアップします。
	- レベルアップ時、その数値に応じて後述する「スコア」を得ます。  
  
3.	スコア  
経験値とは別にユーザーステータスに設定された得点です。一定の条件で増減し、他のユーザーとその寡多を競うことができます。
	- 毎朝4時、全てのユーザーを対象にスコア増減のチェックが行われます。
	- 最近ワークを達成したユーザーにはスコアの加点が、しばらく達成していないユーザーはスコアの減点がなされます。
	- また、レベルアップを達成したユーザーは、その値に応じてボーナスのスコアが与えられます。
	- サイドメニューから表示できる「ランキング」ページでは、ユーザーがスコアの降順に表示されます。  

### 開発言語・ライブラリ・及びツールなど
- Ruby3.0.1
- Rails6.1.7
- PostgreSQL 14.7
- react 18.2.0
  
### サーバー構成
- 仮想サーバ：AmazonEC2 Instance-Amazon Linux t2.micro
- Webサーバ: Nginx
- アプリケーションサーバ: Unicorn
- RDB: PostgreSQL
- 構成図: https://cacoo.com/diagrams/DQiGSgsB60q9gKJl/203D5

### ローカル実行手順
$ git clone git@github.com:HiroyasuTawara/chakka.git  
$ cd chakka  
$ bundle install  
$ rails db:create && rails db:migrate  
$ rails s  

### 仕様書
テーブル定義書: https://docs.google.com/spreadsheets/d/1oFG_5OyEvwJp91MWuIzO0uX2eOuSqk97UnWiLhEpstw/edit
ワイヤーフレーム: https://cacoo.com/diagrams/1RecQjvYicPmsCDN/6B6EA

___
### 旧仕様書
『Chakka!』は、開発者である俵裕泰が2022年12月に、プログラミングスクールの課題として制作したアプリケーションをベースとし、改修・機能追加を行う形で開発されています。 比較の為、当時の仕様書を以下に記載します。

カタログ設計
https://docs.google.com/spreadsheets/d/1jghtoPsKXmayThhLKul3k8Bv7itkU7bpHOJKBp1qqzk/edit?usp=sharing

テーブル定義書
https://docs.google.com/spreadsheets/d/1jghtoPsKXmayThhLKul3k8Bv7itkU7bpHOJKBp1qqzk/edit?usp=sharing

ワイヤーフレーム
https://cacoo.com/diagrams/GWUWKuCczVbAvpqU/040FC

ER図


画面遷移図


### 開発言語  
- Ruby3.0.1  
- Rails6.1.7  
  
### 就業Termの技術  
 - devise
 - AWS  
 
### カリキュラム外の技術 
 - React.jsを用いたフロントエンド(SPA)の実装    
 
### 実行手順  
 ```
 $ git clone git@github.com:HiroyasuTawara/chakka.git  
 $ cd chakka  
 $ bundle install  
 $ rails db:create && rails db:migrate  
 $ rails s  
 ```
### カタログ設計  
https://docs.google.com/spreadsheets/d/1jghtoPsKXmayThhLKul3k8Bv7itkU7bpHOJKBp1qqzk/edit?usp=sharing  

### テーブル定義書  
https://docs.google.com/spreadsheets/d/1jghtoPsKXmayThhLKul3k8Bv7itkU7bpHOJKBp1qqzk/edit?usp=sharing  

### ワイヤーフレーム  
https://cacoo.com/diagrams/GWUWKuCczVbAvpqU/040FC  

### ER図  
![ER1](https://user-images.githubusercontent.com/45650777/207203742-cdaf51b8-a37b-4c6e-a147-9a555f22a132.png)  
   
### 画面遷移図  
![画面遷移](https://user-images.githubusercontent.com/45650777/207204137-6257ebaf-c0c7-4f67-b2fc-7772c9b716e7.png)
