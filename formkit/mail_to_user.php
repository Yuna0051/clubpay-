
この度はお申し込みをいただきましてありがとうございます。
以下、入力された内容の控えとなります。

送信日時：<?= $__DATEJP__ ?> <?= $__TIMEJP__ ?>

---------------------------------------

■ 商品選択
<?= $support->join('、') ?>

■ お名前
<?= $shimei ?>

■ お名前（ふりがな）
<?= $kana ?>

■ メールアドレス
<?= $email ?>

■ お電話番号
<?= $tel ?>

■ご住所
〒 <?= $zip ?>
<?= $pref ?> <?= $address1->empty_label() ?> <?= $address2->empty_label() ?>

■生年月日
<?= $birth_year ?>年 <?= $birth_month ?>月 <?= $birth_day ?>日

---------------------------------------

以上です。
