<?php

namespace FK;

/**
 * メール送信設定
 * -------------------------------------------------------------------------------------------------
 */

// # - お客様へ
$Config['mails'][] = [
	'template'         => 'mail_to_user.php',
	'subject'          => 'お問い合せありがとうございました。',
	'from'             => '事務局 <myuna0023@gmail.com>',
	'to'               => '{$onamae} 様 <{$email}>',
	'bcc'              => null,
	'reply_to'         => null,
	'is_html'          => false,
	'is_utf8'          => false,
	'attach_upfile'    => false,
// 	# - SMTP送信設定
// 	// 'smtp_auth'        => true,
// 	// 'smtp_host'        => 'smtp.xxxxx',
// 	// 'smtp_port'        => 587,
// 	// 'smtp_user'        => 'xxxxxxxx',
// 	// 'smtp_pass'        => 'xxxxxxxx',
// 	// 'smtp_secure'      => 'tls', # null | 'tls' | 'ssl'
// ];

// # - 事務局へ
$Config['mails'][] = [
	'template'         => 'mail_to_admin.php',
	'subject'          => 'お問い合せがありました。',
	'from'             => '{$onamae} 様 <{$email}>',
	'to'               => '事務局 <myuna0023@gmail.com>',
	'bcc'              => null,
	'reply_to'         => null,
	'is_html'          => false,
	'is_utf8'          => false,
	'attach_upfile'    => true,
// 	# - SMTP送信設定
// 	// 'smtp_auth'        => true,
// 	// 'smtp_host'        => 'smtp.xxxxx',
// 	// 'smtp_port'        => 587,
// 	// 'smtp_user'        => 'xxxxxxxx',
// 	// 'smtp_pass'        => 'xxxxxxxx',
// 	// 'smtp_secure'      => 'tls', # null | 'tls' | 'ssl'
// ];

/**
 * バリデート設定
 * -------------------------------------------------------------------------------------------------
 */
$Config['validate'] = [

	# - 各要素のバリデート
	'list' => [
		'support'     => REQ() -> ERRORSET('いずれか選択してください。'),
		'kansou'      => REQ() -> LENGTH(5000),
		'shimei'      => REQ() -> LENGTH(20),
		'kana'        => REQ() -> LENGTH(20) -> KATA(),
		'agree'       => REQ() -> ERRORSET('先に進むには必ず同意してください。'),
	],

	# - 全ての要素に最初に実行する共通メソッド
	'before' => CONV('KV'), // 標準で半角カナ→全角カナ

	# - 全ての要素の最後に実行する共通メソッド
	'after'  => LENGTH(100), // 標準で最大100文字迄
];

/**
 * CSV出力設定
 * -------------------------------------------------------------------------------------------------
 */
// $Config['csv'] = [
// 	# - 保存CSVファイル名
// 	'file' => '../csv/'.(run_date('Y-m')).'.csv.cgi',
// 	# - 保存先のディレクトリに.htaccessが無ければアクセス禁止のhtaccessを新規作成する。
// 	'dir_deny' => true,
// 	# - CSVの内容定義
// 	'list' => [
// 		'送信日付'           => '{$__DATE__}', # または run_date('Y-m-d') 等
// 		'送信時間'           => '{$__TIME__}', # または run_date('H:i:s') 等
// 	],
// ];

/**
 * 送信カウント設定
 * -------------------------------------------------------------------------------------------------
 */
// $Config['count'] = [
// 	# - 送信カウント値保存ファイル
// 	'file' => '../count/count.cgi',
// 	# - 保存先のディレクトリに.htaccessが無ければアクセス禁止のhtaccessを新規作成する。
// 	'dir_deny' => true,
// ];

/**
 * オプションURL指定
 * -------------------------------------------------------------------------------------------------
 */
# - 再入力用URL（JSが無効な場合など、入力値がエラーなのに送信プログラムに来た場合に強制移動するURL）
$Config['reinput_url'] = './';

# - 強制完了画面URL（メール配信後、通常は環境変数REQUEST_URIにジャンプしますが、 REQUEST_URIがうまく取得できない場合や完了画面を別のURLにしたい場合に指定して下さい。）
// $Config['finish_url'] = './thanks.php';

/**
 * 各種文字エンコード設定
 * -------------------------------------------------------------------
 * 参照：http://php.net/manual/ja/mbstring.supported-encodings.php
 * ※config.phpや、システムPJPファイルの文字エンコードはUTF-8から変更しないでください。
 */
$Config['charset'] = [
	# - フォームPHPファイルの文字エンコード（標準は 'UTF-8'）
	'form_template' => 'UTF-8',
	# - メールテンプレートPHPファイルの文字エンコード（標準は 'UTF-8'）
	'mail_template' => 'UTF-8',
	# - CSVファイルの出力文字エンコード（標準は 'SJIS-win'）
	'csv_output'    => 'SJIS-win',
];

/**
 * 未入力時の表示文字設定
 * -------------------------------------------------------------------------------------------------
 * - HTML可
 * ※メール文中ではHTMLタグは除去されます。CSVの際は空欄になります。
 */
// $Config['empty_label'] = '<span class="fk-empty-label">（未入力）</span>';

/**
 * セキュリティ設定
 * -------------------------------------------------------------------------------------------------
 */
$Config['security'] = [

	// trueの場合、SSLでアクセスされている場合にのみCookieを発行します。SSL未対応のドメインの場合はfalseにしてください。
	'ssl_cookie' => false,

	// trueの場合、自動的・強制的に http→https にジャンプします。SSL未対応のドメインの場合はfalseにしてください。
	'ssl_redirect' => false,

	// trueの場合、Pragma, Cache-Control, Expires を出力しローカルキャッシュを無効にします。trueを推奨します。
	'no_cache_headers' => true,

	// trueの場合、X-XSS-Protection, X-Frame-Options, X-Content-Type-Options 全て出力しセキュアにします。trueを推奨しますが、サーバ側でも出力されている場合は重複の警告が出る場合もありますので、その際は個別指定して下さい。
	'security_headers' => true,
	// 'security_header_xss_protection' => true,
	// 'security_header_frame_options' => true,
	// 'security_header_content_type_options' => true,

	// CSRF対策を有効にする場合はキー名を入力してください。入力画面で必要な情報がセットされ、送信時に値が検証されるようになります。
	'csrf' => 'fk-csrf-token',

	// ブラウザのユーザーエージェントに指定文字が入っている場合は送信しません。正規表現で指定してください。（ボット対策等）
	'ua_deny_regex' => '/robot/i',

	// 入力データにマルチバイト文字（全角、日本語、記号など）が一つもない場合は送信しないようにします。（海外SPAM対策）
	// 'need_multibyte' => true,

	// 指定のIPの場合は送信しないようにします。（送信時にエラー画面が表示されます）
	// 'deny_ips' => [
	// 	'127.0.0.1',
	// 	'192.168.0.1',
	// ],

	// 指定の秒数を待たないと同一IPから再度送信できないようにします。再送可能になる待ち秒数を指定して下さい。（連続送信スパム対策）
	// ※同サーバに複数FormKitを設置している場合でも、同じIPログファイルを参照します。
	// 'sendable_latency_sec' => 30,
];
