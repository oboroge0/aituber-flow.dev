export const languages = {
  ja: '日本語',
  en: 'English',
}

export const defaultLang = 'ja'

export const translations = {
  ja: {
    // Navigation
    'nav.github': 'GitHub',
    'nav.tryDemo': 'デモを試す',

    // Hero
    'hero.badge': 'オープンソース',
    'hero.title1': 'AI VTuberを',
    'hero.title2': 'ノードでつくる',
    'hero.description': 'ドラッグ＆ドロップでノードをつなぎ、AIが応答するVTuberを構築。プログラミング不要。',
    'hero.cta': 'デモを試す',
    'hero.github': 'GitHubで見る',

    // Features
    'features.title': '主な機能',
    'features.subtitle': 'AI VTuber配信に必要な機能を搭載',
    'features.workflow.title': 'ビジュアルエディタ',
    'features.workflow.description': 'ノードを配置して接続するだけで、LLM・音声合成・アバターの処理フローを構築できます。',
    'features.platform.title': '配信プラットフォーム連携',
    'features.platform.description': 'YouTube、Twitch、Discordのチャットを取得。OBSとの連携でシーン切り替えも自動化。',
    'features.avatar.title': '音声とアバター',
    'features.avatar.description': 'VOICEVOX、Style-Bert-VITS2による音声合成。VRMアバターのリップシンク・表情制御に対応。',

    // How it works
    'howItWorks.title': '使い方',
    'howItWorks.subtitle': '3ステップで配信準備',
    'howItWorks.step1.title': 'フローを設計',
    'howItWorks.step1.description': 'キャンバスにノードを配置し、処理の流れを定義',
    'howItWorks.step2.title': '各ノードを設定',
    'howItWorks.step2.description': 'LLMモデル、音声、アバターなどを選択して設定',
    'howItWorks.step3.title': '実行',
    'howItWorks.step3.description': 'ワークフローを開始し、AIがリアルタイムで応答',

    // CTA
    'cta.title': 'まずは試してみる',
    'cta.subtitle': 'ブラウザで動作するデモをご用意しています',
    'cta.button': 'デモを開く',

    // Demo
    'demo.title': '動作イメージ',
    'demo.subtitle': 'ノードをつないでAIが応答するまでの流れ',
    'demo.step1': 'チャットを取得',
    'demo.step2': 'AIが考える',
    'demo.step3': '音声で返答',

    // FAQ
    'faq.title': 'よくある質問',
    'faq.q1': 'プログラミングの知識は必要ですか？',
    'faq.a1': 'いいえ、必要ありません。ノードをドラッグ＆ドロップで接続するだけで、AIキャラクターの動作を設計できます。',
    'faq.q2': '無料で使えますか？',
    'faq.a2': 'はい、AITuberFlowはMITライセンスのオープンソースソフトウェアです。自由に使用・改変できます。',
    'faq.q3': 'どんなPCで動きますか？',
    'faq.a3': 'モダンなブラウザ（Chrome、Firefox、Edge等）が動作する環境であれば使用できます。',
    'faq.q4': '対応している配信プラットフォームは？',
    'faq.a4': 'YouTube Live、Twitch、Discordのチャットに対応しています。OBSとの連携も可能です。',

    // Community
    'community.title': 'コミュニティ',
    'community.subtitle': '一緒にAITuberFlowを作りましょう',
    'community.github.title': 'GitHub',
    'community.github.description': 'ソースコードを見る、Issue報告、プルリクエスト',
    'community.discord.title': 'Discord',
    'community.discord.description': '質問、情報交換、開発の相談',
    'community.contribute.title': 'コントリビュート',
    'community.contribute.description': '新機能の提案やバグ修正を歓迎します',

    // Download
    'download.title': 'デスクトップアプリ',
    'download.subtitle': 'インストールしてすぐに使える。ブラウザ不要のスタンドアロン版。',
    'download.version': 'v{version}',
    'download.windows': 'Windows版をダウンロード',
    'download.macArm': 'macOS版をダウンロード (Apple Silicon)',
    'download.macIntel': 'macOS版をダウンロード (Intel)',
    'download.otherPlatforms': 'その他のプラットフォーム',
    'download.allReleases': 'すべてのリリース',
    'download.loading': '読み込み中...',
    'download.webVersion': 'ブラウザ版を使う',
    'download.heroButton': '無料ダウンロード',
    // Download page
    'downloadPage.title': 'AITuberFlowをダウンロード',
    'downloadPage.subtitle': 'Windows・macOS対応。インストールしてすぐにAI VTuber配信を始められます。',
    'downloadPage.choosePlatform': 'プラットフォームを選択',
    'downloadPage.installSteps': 'インストール手順',
    'downloadPage.step1.title': 'ダウンロード',
    'downloadPage.step1.description': 'お使いのOSに合ったインストーラーをダウンロードします。',
    'downloadPage.step2.title': 'インストール',
    'downloadPage.step2.description.win': 'ダウンロードした .exe ファイルを実行し、画面の指示に従ってインストールします。',
    'downloadPage.step2.description.mac': 'ダウンロードした .dmg ファイルを開き、AITuberFlow をアプリケーションフォルダにドラッグします。',
    'downloadPage.step3.title': '起動',
    'downloadPage.step3.description': 'AITuberFlowを起動し、ノードエディタでワークフローを作成して配信を開始しましょう。',
    'downloadPage.sysReq': 'システム要件',
    'downloadPage.sysReq.os': 'OS',
    'downloadPage.sysReq.os.value': 'Windows 10以降 / macOS 12以降',
    'downloadPage.sysReq.memory': 'メモリ',
    'downloadPage.sysReq.memory.value': '8GB以上推奨',
    'downloadPage.sysReq.disk': 'ディスク',
    'downloadPage.sysReq.disk.value': '500MB以上の空き容量',
    'downloadPage.sysReq.other': 'その他',
    'downloadPage.sysReq.other.value': 'インターネット接続（LLM API利用時）',
    'downloadPage.notes.title': 'ご注意',
    'downloadPage.notes.mac': 'macOS: 初回起動時に「開発元が未確認」の警告が出る場合は、システム設定 > プライバシーとセキュリティから「このまま開く」を選択してください。',
    'downloadPage.notes.firewall': 'ファイアウォールの警告が出た場合は「許可」を選択してください（ローカルサーバーの通信に必要です）。',
    'downloadPage.webAlternative': 'ブラウザ版もあります',
    'downloadPage.webAlternativeDesc': 'インストール不要で今すぐ試せるブラウザ版もご利用いただけます。',

    // Footer
    'footer.copyright': '© 2026 AITuberFlow. MITライセンス',
  },
  en: {
    // Navigation
    'nav.github': 'GitHub',
    'nav.tryDemo': 'Try Demo',

    // Hero
    'hero.badge': 'Open Source',
    'hero.title1': 'Build AI VTubers',
    'hero.title2': 'with Nodes',
    'hero.description': 'Connect nodes with drag & drop to create AI-powered VTubers. No coding required.',
    'hero.cta': 'Try Demo',
    'hero.github': 'View on GitHub',

    // Features
    'features.title': 'Features',
    'features.subtitle': 'Everything you need for AI VTuber streaming',
    'features.workflow.title': 'Visual Editor',
    'features.workflow.description': 'Place and connect nodes to build processing flows for LLM, voice synthesis, and avatars.',
    'features.platform.title': 'Platform Integration',
    'features.platform.description': 'Fetch chat from YouTube, Twitch, and Discord. Automate OBS scene switching.',
    'features.avatar.title': 'Voice & Avatar',
    'features.avatar.description': 'Voice synthesis with VOICEVOX and Style-Bert-VITS2. Lip-sync and expression control for VRM avatars.',

    // How it works
    'howItWorks.title': 'How to Use',
    'howItWorks.subtitle': '3 steps to get started',
    'howItWorks.step1.title': 'Design Flow',
    'howItWorks.step1.description': 'Place nodes on the canvas and define the processing flow',
    'howItWorks.step2.title': 'Configure Nodes',
    'howItWorks.step2.description': 'Select and configure LLM model, voice, and avatar settings',
    'howItWorks.step3.title': 'Run',
    'howItWorks.step3.description': 'Start the workflow and let the AI respond in real-time',

    // CTA
    'cta.title': 'Try it out',
    'cta.subtitle': 'A browser-based demo is available',
    'cta.button': 'Open Demo',

    // Demo
    'demo.title': 'How It Looks',
    'demo.subtitle': 'From chat input to AI response',
    'demo.step1': 'Get Chat',
    'demo.step2': 'AI Thinks',
    'demo.step3': 'Voice Reply',

    // FAQ
    'faq.title': 'FAQ',
    'faq.q1': 'Do I need programming skills?',
    'faq.a1': 'No, you don\'t. Just drag and drop nodes to design your AI character\'s behavior.',
    'faq.q2': 'Is it free to use?',
    'faq.a2': 'Yes, AITuberFlow is open-source software under the MIT license. Use and modify freely.',
    'faq.q3': 'What are the system requirements?',
    'faq.a3': 'Any environment with a modern browser (Chrome, Firefox, Edge, etc.) will work.',
    'faq.q4': 'Which streaming platforms are supported?',
    'faq.a4': 'YouTube Live, Twitch, and Discord chat are supported. OBS integration is also available.',

    // Community
    'community.title': 'Community',
    'community.subtitle': 'Let\'s build AITuberFlow together',
    'community.github.title': 'GitHub',
    'community.github.description': 'View source code, report issues, submit PRs',
    'community.discord.title': 'Discord',
    'community.discord.description': 'Ask questions, share info, discuss development',
    'community.contribute.title': 'Contribute',
    'community.contribute.description': 'Feature proposals and bug fixes welcome',

    // Download
    'download.title': 'Desktop App',
    'download.subtitle': 'Install and start using immediately. Standalone version, no browser required.',
    'download.version': 'v{version}',
    'download.windows': 'Download for Windows',
    'download.macArm': 'Download for macOS (Apple Silicon)',
    'download.macIntel': 'Download for macOS (Intel)',
    'download.otherPlatforms': 'Other Platforms',
    'download.allReleases': 'All Releases',
    'download.loading': 'Loading...',
    'download.webVersion': 'Use Web Version',
    'download.heroButton': 'Free Download',
    // Download page
    'downloadPage.title': 'Download AITuberFlow',
    'downloadPage.subtitle': 'Available for Windows and macOS. Install and start AI VTuber streaming right away.',
    'downloadPage.choosePlatform': 'Choose Your Platform',
    'downloadPage.installSteps': 'Installation Steps',
    'downloadPage.step1.title': 'Download',
    'downloadPage.step1.description': 'Download the installer for your operating system.',
    'downloadPage.step2.title': 'Install',
    'downloadPage.step2.description.win': 'Run the downloaded .exe file and follow the on-screen instructions to install.',
    'downloadPage.step2.description.mac': 'Open the downloaded .dmg file and drag AITuberFlow to the Applications folder.',
    'downloadPage.step3.title': 'Launch',
    'downloadPage.step3.description': 'Launch AITuberFlow, create your workflow in the node editor, and start streaming.',
    'downloadPage.sysReq': 'System Requirements',
    'downloadPage.sysReq.os': 'OS',
    'downloadPage.sysReq.os.value': 'Windows 10+ / macOS 12+',
    'downloadPage.sysReq.memory': 'Memory',
    'downloadPage.sysReq.memory.value': '8GB or more recommended',
    'downloadPage.sysReq.disk': 'Disk',
    'downloadPage.sysReq.disk.value': '500MB free space',
    'downloadPage.sysReq.other': 'Other',
    'downloadPage.sysReq.other.value': 'Internet connection (for LLM API)',
    'downloadPage.notes.title': 'Notes',
    'downloadPage.notes.mac': 'macOS: If you see an "unidentified developer" warning on first launch, go to System Settings > Privacy & Security and click "Open Anyway".',
    'downloadPage.notes.firewall': 'If a firewall warning appears, click "Allow" (required for local server communication).',
    'downloadPage.webAlternative': 'Web version available',
    'downloadPage.webAlternativeDesc': 'Try the browser-based version instantly with no installation required.',

    // Footer
    'footer.copyright': '© 2026 AITuberFlow. MIT License',
  },
} as const

export type Lang = keyof typeof translations
export type TranslationKey = keyof typeof translations.ja

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] || translations.ja[key] || key
}
