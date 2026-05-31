import type { Intensity, StatKey } from "@/lib/cleaner/types";
import { defaultLocale, type Locale } from "./config";

export type ScenarioText = { name: string; description: string };

export type Dictionary = {
  meta: { title: string; description: string };
  skipLink: string;
  utility: [string, string, string];
  nav: { home: string; cleaner: string; samples: string; report: string; loadSample: string };
  hero: { brand: string; title: string; copy: string; proof: [string, string, string] };
  samples: { fastStart: string; tryLabel: string; scenarios: Record<string, ScenarioText> };
  workflow: {
    paste: { title: string; desc: string };
    clean: { title: string; desc: string };
    copy: { title: string; desc: string };
  };
  toolbar: {
    controls: string;
    source: string;
    intensityLegend: string;
    intensities: Record<Intensity, string>;
    outputActions: string;
    clean: string;
    copyOutput: string;
    downloadMd: string;
    reset: string;
    localOnly: string;
  };
  editors: {
    rawLabel: string;
    rawHelper: string;
    rawPlaceholder: string;
    cleanedLabel: string;
    cleanedHelper: string;
    cleanedPlaceholder: string;
    chars: string;
  };
  status: {
    initial: string;
    cleaned: string;
    nothing: string;
    copied: string;
    downloaded: string;
    sampleLoaded: string;
    /** Template with {name} placeholder. */
    scenarioLoaded: string;
  };
  summary: {
    signal: string;
    title: string;
    reviewReady: string;
    awaiting: string;
    removed: string;
    stats: Record<StatKey, string>;
    copyDelta: string;
    /** Template with {pct} placeholder. */
    shorter: string;
    noInput: string;
    appliedRules: string;
    noRules: string;
  };
  helpBand: { eyebrow: string; title: string; tabs: [string, string, string] };
  language: { label: string };
  tools: {
    analysisTitle: string;
    aiScore: string;
    levels: { low: string; medium: string; high: string };
    wordsAnalyzed: string;
    tellsTitle: string;
    noTells: string;
    disclaimer: string;
    estTokens: string;
    tokensNote: string;
    shareButton: string;
    downloadCard: string;
    copyLink: string;
    linkCopied: string;
    cardTagline: string;
    liveClean: string;
    inlineDiff: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "Browser-local Markdown cleanup for AI chatbot citations and source artifacts."
  },
  skipLink: "Skip to cleaner",
  utility: ["Browser-local", "No account required", "Markdown in, Markdown out"],
  nav: { home: "Citation Cleaner home", cleaner: "Cleaner", samples: "Samples", report: "Report", loadSample: "Load sample" },
  hero: {
    brand: "Citation Cleaner",
    title: "Make AI copy publishable.",
    copy: "Strip citations, source trails, and tracking clutter from chatbot Markdown locally.",
    proof: ["0 uploads", "Deterministic rules", "Markdown-safe"]
  },
  samples: {
    fastStart: "Fast start",
    tryLabel: "Try",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "Numbered source list, citation markers, and pasted research links."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "Search-result labels, learn-more rows, and overview boilerplate."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "Inline numeric citations, footnote definitions, and tracking links."
      }
    }
  },
  workflow: {
    paste: { title: "Paste", desc: "Keep code and links intact." },
    clean: { title: "Clean", desc: "Remove the artifacts users notice first." },
    copy: { title: "Copy", desc: "Leave with publish-ready Markdown." }
  },
  toolbar: {
    controls: "Cleaner controls",
    source: "Source",
    intensityLegend: "Cleanup intensity",
    intensities: { safe: "Safe", balanced: "Balanced", aggressive: "Aggressive" },
    outputActions: "Output actions",
    clean: "Clean",
    copyOutput: "Copy output",
    downloadMd: "Download .md",
    reset: "Reset",
    localOnly: "Local only"
  },
  editors: {
    rawLabel: "Raw Markdown",
    rawHelper: "Paste from ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi, or AI Overview.",
    rawPlaceholder: "Paste AI-copied Markdown here...",
    cleanedLabel: "Cleaned Markdown",
    cleanedHelper: "Review the deterministic output before copying or downloading.",
    cleanedPlaceholder: "Cleaned Markdown will appear here.",
    chars: "chars"
  },
  status: {
    initial: "Paste AI Markdown, clean locally, copy the publishable version.",
    cleaned: "Cleaned locally. Review the output before publishing.",
    nothing: "Nothing to clean yet.",
    copied: "Cleaned Markdown copied to clipboard.",
    downloaded: "Downloaded cleaned-markdown.md.",
    sampleLoaded: "Sample loaded and cleaned locally.",
    scenarioLoaded: "{name} loaded. The output is ready to review."
  },
  summary: {
    signal: "Signal",
    title: "Cleanup report",
    reviewReady: "Review-ready",
    awaiting: "Awaiting paste",
    removed: "matched artifacts removed",
    stats: {
      citations: "citations",
      footnotes: "footnotes",
      sourceBlocks: "source blocks",
      boilerplate: "boilerplate",
      trackingLinks: "tracking links",
      blankLines: "blank lines"
    },
    copyDelta: "Copy delta",
    shorter: "{pct}% shorter",
    noInput: "No input",
    appliedRules: "Applied rules",
    noRules: "No rules applied yet."
  },
  helpBand: {
    eyebrow: "Local workflow",
    title: "Clean copy without uploading the draft.",
    tabs: ["Private", "Deterministic", "Exportable"]
  },
  language: { label: "Change language" },
  tools: {
    analysisTitle: "Writing analysis",
    aiScore: "AI-ness score",
    levels: { low: "Human-like", medium: "Mixed signals", high: "Reads very AI" },
    wordsAnalyzed: "words analyzed",
    tellsTitle: "Detected tells",
    noTells: "No obvious AI tells found.",
    disclaimer: "Heuristic check, tuned for English text.",
    estTokens: "Est. tokens",
    tokensNote: "Approximate — not billing-accurate.",
    shareButton: "Share result",
    downloadCard: "Download card",
    copyLink: "Copy link",
    linkCopied: "Share link copied to clipboard.",
    cardTagline: "Cleaned with Citation Cleaner",
    liveClean: "Live clean",
    inlineDiff: "Inline diff"
  }
};

const es: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "Limpieza de Markdown en el navegador para citas y rastros de fuentes de chatbots de IA."
  },
  skipLink: "Saltar al limpiador",
  utility: ["En el navegador", "Sin cuenta", "Markdown entra, Markdown sale"],
  nav: { home: "Inicio de Citation Cleaner", cleaner: "Limpiador", samples: "Ejemplos", report: "Informe", loadSample: "Cargar ejemplo" },
  hero: {
    brand: "Citation Cleaner",
    title: "Haz publicable el texto de IA.",
    copy: "Elimina citas, rastros de fuentes y elementos de seguimiento del Markdown de chatbots, de forma local.",
    proof: ["0 subidas", "Reglas deterministas", "Compatible con Markdown"]
  },
  samples: {
    fastStart: "Inicio rápido",
    tryLabel: "Probar",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "Lista de fuentes numerada, marcadores de cita y enlaces de investigación pegados."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "Etiquetas de resultados, filas de «más información» y texto repetitivo del resumen."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "Citas numéricas en línea, definiciones de notas al pie y enlaces de seguimiento."
      }
    }
  },
  workflow: {
    paste: { title: "Pegar", desc: "Mantén el código y los enlaces intactos." },
    clean: { title: "Limpiar", desc: "Elimina los artefactos que los lectores notan primero." },
    copy: { title: "Copiar", desc: "Sal con Markdown listo para publicar." }
  },
  toolbar: {
    controls: "Controles del limpiador",
    source: "Fuente",
    intensityLegend: "Intensidad de limpieza",
    intensities: { safe: "Suave", balanced: "Equilibrada", aggressive: "Agresiva" },
    outputActions: "Acciones de salida",
    clean: "Limpiar",
    copyOutput: "Copiar salida",
    downloadMd: "Descargar .md",
    reset: "Restablecer",
    localOnly: "Solo local"
  },
  editors: {
    rawLabel: "Markdown sin procesar",
    rawHelper: "Pega desde ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi o AI Overview.",
    rawPlaceholder: "Pega aquí el Markdown copiado de la IA...",
    cleanedLabel: "Markdown limpio",
    cleanedHelper: "Revisa la salida determinista antes de copiar o descargar.",
    cleanedPlaceholder: "El Markdown limpio aparecerá aquí.",
    chars: "caracteres"
  },
  status: {
    initial: "Pega Markdown de IA, límpialo localmente y copia la versión publicable.",
    cleaned: "Limpiado localmente. Revisa la salida antes de publicar.",
    nothing: "Aún no hay nada que limpiar.",
    copied: "Markdown limpio copiado al portapapeles.",
    downloaded: "Se descargó cleaned-markdown.md.",
    sampleLoaded: "Ejemplo cargado y limpiado localmente.",
    scenarioLoaded: "{name} cargado. La salida está lista para revisar."
  },
  summary: {
    signal: "Señal",
    title: "Informe de limpieza",
    reviewReady: "Listo para revisar",
    awaiting: "Esperando texto",
    removed: "artefactos coincidentes eliminados",
    stats: {
      citations: "citas",
      footnotes: "notas al pie",
      sourceBlocks: "bloques de fuentes",
      boilerplate: "texto repetitivo",
      trackingLinks: "enlaces de seguimiento",
      blankLines: "líneas en blanco"
    },
    copyDelta: "Diferencia de texto",
    shorter: "{pct}% más corto",
    noInput: "Sin entrada",
    appliedRules: "Reglas aplicadas",
    noRules: "Aún no se aplicaron reglas."
  },
  helpBand: {
    eyebrow: "Flujo local",
    title: "Limpia el texto sin subir el borrador.",
    tabs: ["Privado", "Determinista", "Exportable"]
  },
  language: { label: "Cambiar idioma" },
  tools: {
    analysisTitle: "Análisis de escritura",
    aiScore: "Puntuación de «IA»",
    levels: { low: "Parece humano", medium: "Señales mixtas", high: "Suena muy a IA" },
    wordsAnalyzed: "palabras analizadas",
    tellsTitle: "Indicios detectados",
    noTells: "No se detectaron indicios claros de IA.",
    disclaimer: "Comprobación heurística, ajustada para texto en inglés.",
    estTokens: "Tokens aprox.",
    tokensNote: "Aproximado — no exacto para facturación.",
    shareButton: "Compartir resultado",
    downloadCard: "Descargar tarjeta",
    copyLink: "Copiar enlace",
    linkCopied: "Enlace para compartir copiado al portapapeles.",
    cardTagline: "Limpiado con Citation Cleaner",
    liveClean: "Limpieza en vivo",
    inlineDiff: "Diferencias en línea"
  }
};

const fr: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "Nettoyage de Markdown dans le navigateur pour les citations et traces de sources des chatbots IA."
  },
  skipLink: "Aller au nettoyeur",
  utility: ["Dans le navigateur", "Sans compte", "Markdown entrant, Markdown sortant"],
  nav: { home: "Accueil de Citation Cleaner", cleaner: "Nettoyeur", samples: "Exemples", report: "Rapport", loadSample: "Charger un exemple" },
  hero: {
    brand: "Citation Cleaner",
    title: "Rendez le texte IA publiable.",
    copy: "Supprimez localement citations, traces de sources et éléments de suivi du Markdown des chatbots.",
    proof: ["0 envoi", "Règles déterministes", "Compatible Markdown"]
  },
  samples: {
    fastStart: "Démarrage rapide",
    tryLabel: "Essayer",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "Liste de sources numérotée, marqueurs de citation et liens de recherche collés."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "Étiquettes de résultats, lignes « en savoir plus » et texte générique du résumé."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "Citations numériques en ligne, définitions de notes de bas de page et liens de suivi."
      }
    }
  },
  workflow: {
    paste: { title: "Coller", desc: "Conservez le code et les liens intacts." },
    clean: { title: "Nettoyer", desc: "Supprimez les artefacts que les lecteurs remarquent en premier." },
    copy: { title: "Copier", desc: "Repartez avec un Markdown prêt à publier." }
  },
  toolbar: {
    controls: "Contrôles du nettoyeur",
    source: "Source",
    intensityLegend: "Intensité du nettoyage",
    intensities: { safe: "Prudente", balanced: "Équilibrée", aggressive: "Agressive" },
    outputActions: "Actions de sortie",
    clean: "Nettoyer",
    copyOutput: "Copier la sortie",
    downloadMd: "Télécharger .md",
    reset: "Réinitialiser",
    localOnly: "Local uniquement"
  },
  editors: {
    rawLabel: "Markdown brut",
    rawHelper: "Collez depuis ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi ou AI Overview.",
    rawPlaceholder: "Collez ici le Markdown copié de l'IA...",
    cleanedLabel: "Markdown nettoyé",
    cleanedHelper: "Vérifiez la sortie déterministe avant de copier ou télécharger.",
    cleanedPlaceholder: "Le Markdown nettoyé apparaîtra ici.",
    chars: "caractères"
  },
  status: {
    initial: "Collez du Markdown IA, nettoyez localement, copiez la version publiable.",
    cleaned: "Nettoyé localement. Vérifiez la sortie avant de publier.",
    nothing: "Rien à nettoyer pour l'instant.",
    copied: "Markdown nettoyé copié dans le presse-papiers.",
    downloaded: "cleaned-markdown.md téléchargé.",
    sampleLoaded: "Exemple chargé et nettoyé localement.",
    scenarioLoaded: "{name} chargé. La sortie est prête à être vérifiée."
  },
  summary: {
    signal: "Signal",
    title: "Rapport de nettoyage",
    reviewReady: "Prêt à vérifier",
    awaiting: "En attente de texte",
    removed: "artefacts correspondants supprimés",
    stats: {
      citations: "citations",
      footnotes: "notes de bas de page",
      sourceBlocks: "blocs de sources",
      boilerplate: "texte générique",
      trackingLinks: "liens de suivi",
      blankLines: "lignes vides"
    },
    copyDelta: "Écart de texte",
    shorter: "{pct}% plus court",
    noInput: "Aucune entrée",
    appliedRules: "Règles appliquées",
    noRules: "Aucune règle appliquée pour l'instant."
  },
  helpBand: {
    eyebrow: "Flux local",
    title: "Nettoyez le texte sans téléverser le brouillon.",
    tabs: ["Privé", "Déterministe", "Exportable"]
  },
  language: { label: "Changer de langue" },
  tools: {
    analysisTitle: "Analyse de l'écriture",
    aiScore: "Score « IA »",
    levels: { low: "Style humain", medium: "Signaux mixtes", high: "Très IA" },
    wordsAnalyzed: "mots analysés",
    tellsTitle: "Indices détectés",
    noTells: "Aucun indice évident d'IA détecté.",
    disclaimer: "Analyse heuristique, optimisée pour l'anglais.",
    estTokens: "Tokens estimés",
    tokensNote: "Approximatif — non exact pour la facturation.",
    shareButton: "Partager le résultat",
    downloadCard: "Télécharger la carte",
    copyLink: "Copier le lien",
    linkCopied: "Lien de partage copié dans le presse-papiers.",
    cardTagline: "Nettoyé avec Citation Cleaner",
    liveClean: "Nettoyage en direct",
    inlineDiff: "Diff en ligne"
  }
};

const de: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "Markdown-Bereinigung im Browser für Zitate und Quellenspuren von KI-Chatbots."
  },
  skipLink: "Zum Bereiniger springen",
  utility: ["Im Browser", "Kein Konto nötig", "Markdown rein, Markdown raus"],
  nav: { home: "Citation Cleaner Startseite", cleaner: "Bereiniger", samples: "Beispiele", report: "Bericht", loadSample: "Beispiel laden" },
  hero: {
    brand: "Citation Cleaner",
    title: "Mach KI-Texte veröffentlichungsreif.",
    copy: "Entferne Zitate, Quellenspuren und Tracking-Ballast aus Chatbot-Markdown – lokal.",
    proof: ["0 Uploads", "Deterministische Regeln", "Markdown-sicher"]
  },
  samples: {
    fastStart: "Schnellstart",
    tryLabel: "Ausprobieren",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "Nummerierte Quellenliste, Zitatmarkierungen und eingefügte Recherchelinks."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "Suchergebnis-Labels, „Mehr erfahren“-Zeilen und Übersichts-Floskeln."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "Numerische Inline-Zitate, Fußnotendefinitionen und Tracking-Links."
      }
    }
  },
  workflow: {
    paste: { title: "Einfügen", desc: "Code und Links bleiben unverändert." },
    clean: { title: "Bereinigen", desc: "Entferne die Artefakte, die Lesern zuerst auffallen." },
    copy: { title: "Kopieren", desc: "Geh mit veröffentlichungsreifem Markdown." }
  },
  toolbar: {
    controls: "Bereiniger-Steuerung",
    source: "Quelle",
    intensityLegend: "Bereinigungsstärke",
    intensities: { safe: "Sicher", balanced: "Ausgewogen", aggressive: "Aggressiv" },
    outputActions: "Ausgabeaktionen",
    clean: "Bereinigen",
    copyOutput: "Ausgabe kopieren",
    downloadMd: ".md herunterladen",
    reset: "Zurücksetzen",
    localOnly: "Nur lokal"
  },
  editors: {
    rawLabel: "Roh-Markdown",
    rawHelper: "Aus ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi oder AI Overview einfügen.",
    rawPlaceholder: "Hier das von der KI kopierte Markdown einfügen...",
    cleanedLabel: "Bereinigtes Markdown",
    cleanedHelper: "Prüfe die deterministische Ausgabe vor dem Kopieren oder Herunterladen.",
    cleanedPlaceholder: "Hier erscheint das bereinigte Markdown.",
    chars: "Zeichen"
  },
  status: {
    initial: "KI-Markdown einfügen, lokal bereinigen, veröffentlichungsreife Version kopieren.",
    cleaned: "Lokal bereinigt. Prüfe die Ausgabe vor dem Veröffentlichen.",
    nothing: "Noch nichts zu bereinigen.",
    copied: "Bereinigtes Markdown in die Zwischenablage kopiert.",
    downloaded: "cleaned-markdown.md heruntergeladen.",
    sampleLoaded: "Beispiel geladen und lokal bereinigt.",
    scenarioLoaded: "{name} geladen. Die Ausgabe kann geprüft werden."
  },
  summary: {
    signal: "Signal",
    title: "Bereinigungsbericht",
    reviewReady: "Prüfbereit",
    awaiting: "Warte auf Eingabe",
    removed: "passende Artefakte entfernt",
    stats: {
      citations: "Zitate",
      footnotes: "Fußnoten",
      sourceBlocks: "Quellenblöcke",
      boilerplate: "Floskeln",
      trackingLinks: "Tracking-Links",
      blankLines: "Leerzeilen"
    },
    copyDelta: "Text-Differenz",
    shorter: "{pct}% kürzer",
    noInput: "Keine Eingabe",
    appliedRules: "Angewandte Regeln",
    noRules: "Noch keine Regeln angewandt."
  },
  helpBand: {
    eyebrow: "Lokaler Ablauf",
    title: "Text bereinigen, ohne den Entwurf hochzuladen.",
    tabs: ["Privat", "Deterministisch", "Exportierbar"]
  },
  language: { label: "Sprache ändern" },
  tools: {
    analysisTitle: "Text-Analyse",
    aiScore: "KI-Wert",
    levels: { low: "Menschlich", medium: "Gemischte Signale", high: "Sehr KI" },
    wordsAnalyzed: "analysierte Wörter",
    tellsTitle: "Erkannte Merkmale",
    noTells: "Keine offensichtlichen KI-Merkmale gefunden.",
    disclaimer: "Heuristische Prüfung, auf englischen Text abgestimmt.",
    estTokens: "Geschätzte Tokens",
    tokensNote: "Ungefähr — nicht abrechnungsgenau.",
    shareButton: "Ergebnis teilen",
    downloadCard: "Karte herunterladen",
    copyLink: "Link kopieren",
    linkCopied: "Freigabelink in die Zwischenablage kopiert.",
    cardTagline: "Bereinigt mit Citation Cleaner",
    liveClean: "Live-Bereinigung",
    inlineDiff: "Inline-Diff"
  }
};

const ja: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "AIチャットボットの引用やソース痕跡をブラウザー内で除去する Markdown クリーナー。"
  },
  skipLink: "クリーナーへ移動",
  utility: ["ブラウザー内処理", "アカウント不要", "Markdown 入力・Markdown 出力"],
  nav: { home: "Citation Cleaner ホーム", cleaner: "クリーナー", samples: "サンプル", report: "レポート", loadSample: "サンプルを読み込む" },
  hero: {
    brand: "Citation Cleaner",
    title: "AIの文章を公開できる形に。",
    copy: "チャットボットの Markdown から引用・ソース痕跡・トラッキングの雑音をローカルで除去します。",
    proof: ["アップロード0件", "決定論的なルール", "Markdown 安全"]
  },
  samples: {
    fastStart: "クイックスタート",
    tryLabel: "試す",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "番号付きソース一覧、引用マーカー、貼り付けた調査リンク。"
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "検索結果ラベル、「詳細」行、概要の定型文。"
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "インラインの数字引用、脚注定義、トラッキングリンク。"
      }
    }
  },
  workflow: {
    paste: { title: "貼り付け", desc: "コードとリンクはそのまま保持。" },
    clean: { title: "クリーン", desc: "読者が最初に気づく要素を除去。" },
    copy: { title: "コピー", desc: "公開できる Markdown を持ち帰る。" }
  },
  toolbar: {
    controls: "クリーナー設定",
    source: "ソース",
    intensityLegend: "クリーニング強度",
    intensities: { safe: "安全", balanced: "バランス", aggressive: "強力" },
    outputActions: "出力アクション",
    clean: "クリーン",
    copyOutput: "出力をコピー",
    downloadMd: ".md をダウンロード",
    reset: "リセット",
    localOnly: "ローカルのみ"
  },
  editors: {
    rawLabel: "元の Markdown",
    rawHelper: "ChatGPT、Claude、Gemini、Perplexity、DeepSeek、Kimi、AI Overview から貼り付け。",
    rawPlaceholder: "AI からコピーした Markdown をここに貼り付け...",
    cleanedLabel: "クリーンな Markdown",
    cleanedHelper: "コピーやダウンロードの前に、決定論的な出力を確認してください。",
    cleanedPlaceholder: "クリーンな Markdown がここに表示されます。",
    chars: "文字"
  },
  status: {
    initial: "AI の Markdown を貼り付け、ローカルでクリーンにして、公開版をコピー。",
    cleaned: "ローカルでクリーンにしました。公開前に出力を確認してください。",
    nothing: "まだクリーンにするものがありません。",
    copied: "クリーンな Markdown をクリップボードにコピーしました。",
    downloaded: "cleaned-markdown.md をダウンロードしました。",
    sampleLoaded: "サンプルを読み込み、ローカルでクリーンにしました。",
    scenarioLoaded: "{name} を読み込みました。出力を確認できます。"
  },
  summary: {
    signal: "シグナル",
    title: "クリーンアップ レポート",
    reviewReady: "確認準備完了",
    awaiting: "貼り付け待ち",
    removed: "件の一致した要素を除去",
    stats: {
      citations: "引用",
      footnotes: "脚注",
      sourceBlocks: "ソースブロック",
      boilerplate: "定型文",
      trackingLinks: "トラッキングリンク",
      blankLines: "空行"
    },
    copyDelta: "文章の差分",
    shorter: "{pct}% 短縮",
    noInput: "入力なし",
    appliedRules: "適用したルール",
    noRules: "まだルールは適用されていません。"
  },
  helpBand: {
    eyebrow: "ローカル ワークフロー",
    title: "下書きをアップロードせずに文章をクリーンに。",
    tabs: ["プライベート", "決定論的", "エクスポート可能"]
  },
  language: { label: "言語を変更" },
  tools: {
    analysisTitle: "文章分析",
    aiScore: "AI度スコア",
    levels: { low: "人間らしい", medium: "混在", high: "かなりAI" },
    wordsAnalyzed: "語を分析",
    tellsTitle: "検出された特徴",
    noTells: "明らかなAIの特徴は見つかりませんでした。",
    disclaimer: "ヒューリスティック判定。英語テキスト向けに調整。",
    estTokens: "推定トークン",
    tokensNote: "概算です。請求額とは異なります。",
    shareButton: "結果を共有",
    downloadCard: "カードをダウンロード",
    copyLink: "リンクをコピー",
    linkCopied: "共有リンクをクリップボードにコピーしました。",
    cardTagline: "Citation Cleaner でクリーン",
    liveClean: "リアルタイム整形",
    inlineDiff: "インライン差分"
  }
};

const zh: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "在瀏覽器本機清除 AI 聊天機器人引用與來源痕跡的 Markdown 工具。"
  },
  skipLink: "跳至清理工具",
  utility: ["瀏覽器本機", "免註冊", "Markdown 進、Markdown 出"],
  nav: { home: "Citation Cleaner 首頁", cleaner: "清理工具", samples: "範例", report: "報告", loadSample: "載入範例" },
  hero: {
    brand: "Citation Cleaner",
    title: "讓 AI 文字可直接發佈。",
    copy: "在本機清除聊天機器人 Markdown 中的引用、來源痕跡與追蹤雜訊。",
    proof: ["0 次上傳", "確定性規則", "Markdown 安全"]
  },
  samples: {
    fastStart: "快速開始",
    tryLabel: "試試",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "編號來源清單、引用標記與貼上的研究連結。"
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "搜尋結果標籤、「瞭解詳情」列與概覽樣板文字。"
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "行內數字引用、註腳定義與追蹤連結。"
      }
    }
  },
  workflow: {
    paste: { title: "貼上", desc: "保留程式碼與連結不變。" },
    clean: { title: "清理", desc: "移除讀者最先注意到的痕跡。" },
    copy: { title: "複製", desc: "帶走可直接發佈的 Markdown。" }
  },
  toolbar: {
    controls: "清理工具控制項",
    source: "來源",
    intensityLegend: "清理強度",
    intensities: { safe: "安全", balanced: "平衡", aggressive: "積極" },
    outputActions: "輸出動作",
    clean: "清理",
    copyOutput: "複製輸出",
    downloadMd: "下載 .md",
    reset: "重設",
    localOnly: "僅限本機"
  },
  editors: {
    rawLabel: "原始 Markdown",
    rawHelper: "從 ChatGPT、Claude、Gemini、Perplexity、DeepSeek、Kimi 或 AI Overview 貼上。",
    rawPlaceholder: "在此貼上從 AI 複製的 Markdown...",
    cleanedLabel: "清理後的 Markdown",
    cleanedHelper: "複製或下載前，請先檢視確定性輸出。",
    cleanedPlaceholder: "清理後的 Markdown 會顯示在這裡。",
    chars: "字元"
  },
  status: {
    initial: "貼上 AI Markdown，在本機清理，複製可發佈的版本。",
    cleaned: "已在本機清理。發佈前請檢視輸出。",
    nothing: "目前沒有可清理的內容。",
    copied: "已將清理後的 Markdown 複製到剪貼簿。",
    downloaded: "已下載 cleaned-markdown.md。",
    sampleLoaded: "已載入範例並在本機清理。",
    scenarioLoaded: "已載入「{name}」。輸出已可檢視。"
  },
  summary: {
    signal: "訊號",
    title: "清理報告",
    reviewReady: "可供檢視",
    awaiting: "等待貼上",
    removed: "個符合的痕跡已移除",
    stats: {
      citations: "引用",
      footnotes: "註腳",
      sourceBlocks: "來源區塊",
      boilerplate: "樣板文字",
      trackingLinks: "追蹤連結",
      blankLines: "空白行"
    },
    copyDelta: "文字差異",
    shorter: "縮短 {pct}%",
    noInput: "無輸入",
    appliedRules: "已套用規則",
    noRules: "尚未套用任何規則。"
  },
  helpBand: {
    eyebrow: "本機工作流程",
    title: "清理文字，無需上傳草稿。",
    tabs: ["私密", "確定性", "可匯出"]
  },
  language: { label: "變更語言" },
  tools: {
    analysisTitle: "文字分析",
    aiScore: "AI 程度評分",
    levels: { low: "像真人", medium: "混合訊號", high: "非常像 AI" },
    wordsAnalyzed: "個字已分析",
    tellsTitle: "偵測到的特徵",
    noTells: "未發現明顯的 AI 特徵。",
    disclaimer: "啟發式檢測，針對英文文字調整。",
    estTokens: "預估 token",
    tokensNote: "概略值，非帳單精確值。",
    shareButton: "分享結果",
    downloadCard: "下載卡片",
    copyLink: "複製連結",
    linkCopied: "已將分享連結複製到剪貼簿。",
    cardTagline: "由 Citation Cleaner 清理",
    liveClean: "即時清理",
    inlineDiff: "行內差異"
  }
};

const ko: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "AI 챗봇의 인용과 출처 흔적을 브라우저에서 제거하는 Markdown 클리너."
  },
  skipLink: "클리너로 건너뛰기",
  utility: ["브라우저 로컬", "계정 불필요", "Markdown 입력, Markdown 출력"],
  nav: { home: "Citation Cleaner 홈", cleaner: "클리너", samples: "샘플", report: "리포트", loadSample: "샘플 불러오기" },
  hero: {
    brand: "Citation Cleaner",
    title: "AI 문장을 게시 가능하게.",
    copy: "챗봇 Markdown에서 인용, 출처 흔적, 추적 요소를 로컬에서 제거하세요.",
    proof: ["업로드 0건", "결정론적 규칙", "Markdown 안전"]
  },
  samples: {
    fastStart: "빠른 시작",
    tryLabel: "사용해 보기",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "번호 매긴 출처 목록, 인용 표시, 붙여넣은 리서치 링크."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "검색 결과 라벨, '자세히 보기' 행, 개요 상용구."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "인라인 숫자 인용, 각주 정의, 추적 링크."
      }
    }
  },
  workflow: {
    paste: { title: "붙여넣기", desc: "코드와 링크는 그대로 유지." },
    clean: { title: "클린", desc: "독자가 가장 먼저 눈치채는 요소를 제거." },
    copy: { title: "복사", desc: "게시 준비된 Markdown을 가져가세요." }
  },
  toolbar: {
    controls: "클리너 컨트롤",
    source: "출처",
    intensityLegend: "정리 강도",
    intensities: { safe: "안전", balanced: "균형", aggressive: "적극" },
    outputActions: "출력 작업",
    clean: "클린",
    copyOutput: "출력 복사",
    downloadMd: ".md 다운로드",
    reset: "초기화",
    localOnly: "로컬 전용"
  },
  editors: {
    rawLabel: "원본 Markdown",
    rawHelper: "ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi 또는 AI Overview에서 붙여넣기.",
    rawPlaceholder: "AI에서 복사한 Markdown을 여기에 붙여넣으세요...",
    cleanedLabel: "정리된 Markdown",
    cleanedHelper: "복사하거나 다운로드하기 전에 결정론적 출력을 확인하세요.",
    cleanedPlaceholder: "정리된 Markdown이 여기에 표시됩니다.",
    chars: "자"
  },
  status: {
    initial: "AI Markdown을 붙여넣고, 로컬에서 정리한 뒤, 게시용 버전을 복사하세요.",
    cleaned: "로컬에서 정리했습니다. 게시 전에 출력을 확인하세요.",
    nothing: "아직 정리할 내용이 없습니다.",
    copied: "정리된 Markdown을 클립보드에 복사했습니다.",
    downloaded: "cleaned-markdown.md를 다운로드했습니다.",
    sampleLoaded: "샘플을 불러와 로컬에서 정리했습니다.",
    scenarioLoaded: "{name}을(를) 불러왔습니다. 출력을 확인할 수 있습니다."
  },
  summary: {
    signal: "시그널",
    title: "정리 리포트",
    reviewReady: "검토 준비됨",
    awaiting: "붙여넣기 대기",
    removed: "개의 일치 항목 제거됨",
    stats: {
      citations: "인용",
      footnotes: "각주",
      sourceBlocks: "출처 블록",
      boilerplate: "상용구",
      trackingLinks: "추적 링크",
      blankLines: "빈 줄"
    },
    copyDelta: "텍스트 변화",
    shorter: "{pct}% 짧아짐",
    noInput: "입력 없음",
    appliedRules: "적용된 규칙",
    noRules: "아직 적용된 규칙이 없습니다."
  },
  helpBand: {
    eyebrow: "로컬 워크플로",
    title: "초안을 업로드하지 않고 문장을 정리하세요.",
    tabs: ["비공개", "결정론적", "내보내기 가능"]
  },
  language: { label: "언어 변경" },
  tools: {
    analysisTitle: "문장 분석",
    aiScore: "AI 정도 점수",
    levels: { low: "사람 같음", medium: "혼합 신호", high: "매우 AI 같음" },
    wordsAnalyzed: "개 단어 분석",
    tellsTitle: "감지된 특징",
    noTells: "뚜렷한 AI 특징을 찾지 못했습니다.",
    disclaimer: "휴리스틱 검사, 영어 텍스트에 맞춰 조정됨.",
    estTokens: "예상 토큰",
    tokensNote: "근사치이며 청구 기준이 아닙니다.",
    shareButton: "결과 공유",
    downloadCard: "카드 다운로드",
    copyLink: "링크 복사",
    linkCopied: "공유 링크를 클립보드에 복사했습니다.",
    cardTagline: "Citation Cleaner로 정리함",
    liveClean: "실시간 정리",
    inlineDiff: "인라인 차이"
  }
};

const pt: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "Limpeza de Markdown no navegador para citações e rastros de fontes de chatbots de IA."
  },
  skipLink: "Ir para o limpador",
  utility: ["No navegador", "Sem conta", "Markdown entra, Markdown sai"],
  nav: { home: "Início do Citation Cleaner", cleaner: "Limpador", samples: "Exemplos", report: "Relatório", loadSample: "Carregar exemplo" },
  hero: {
    brand: "Citation Cleaner",
    title: "Torne o texto de IA publicável.",
    copy: "Remova citações, rastros de fontes e ruído de rastreamento do Markdown de chatbots, localmente.",
    proof: ["0 envios", "Regras deterministas", "Compatível com Markdown"]
  },
  samples: {
    fastStart: "Início rápido",
    tryLabel: "Testar",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "Lista de fontes numerada, marcadores de citação e links de pesquisa colados."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "Rótulos de resultados, linhas de «saiba mais» e texto padrão de resumo."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "Citações numéricas em linha, definições de notas de rodapé e links de rastreamento."
      }
    }
  },
  workflow: {
    paste: { title: "Colar", desc: "Mantenha código e links intactos." },
    clean: { title: "Limpar", desc: "Remova os artefatos que os leitores notam primeiro." },
    copy: { title: "Copiar", desc: "Saia com Markdown pronto para publicar." }
  },
  toolbar: {
    controls: "Controles do limpador",
    source: "Fonte",
    intensityLegend: "Intensidade da limpeza",
    intensities: { safe: "Segura", balanced: "Equilibrada", aggressive: "Agressiva" },
    outputActions: "Ações de saída",
    clean: "Limpar",
    copyOutput: "Copiar saída",
    downloadMd: "Baixar .md",
    reset: "Redefinir",
    localOnly: "Apenas local"
  },
  editors: {
    rawLabel: "Markdown bruto",
    rawHelper: "Cole do ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi ou AI Overview.",
    rawPlaceholder: "Cole aqui o Markdown copiado da IA...",
    cleanedLabel: "Markdown limpo",
    cleanedHelper: "Revise a saída determinista antes de copiar ou baixar.",
    cleanedPlaceholder: "O Markdown limpo aparecerá aqui.",
    chars: "caracteres"
  },
  status: {
    initial: "Cole o Markdown da IA, limpe localmente e copie a versão publicável.",
    cleaned: "Limpo localmente. Revise a saída antes de publicar.",
    nothing: "Nada para limpar ainda.",
    copied: "Markdown limpo copiado para a área de transferência.",
    downloaded: "cleaned-markdown.md baixado.",
    sampleLoaded: "Exemplo carregado e limpo localmente.",
    scenarioLoaded: "{name} carregado. A saída está pronta para revisão."
  },
  summary: {
    signal: "Sinal",
    title: "Relatório de limpeza",
    reviewReady: "Pronto para revisão",
    awaiting: "Aguardando texto",
    removed: "artefatos correspondentes removidos",
    stats: {
      citations: "citações",
      footnotes: "notas de rodapé",
      sourceBlocks: "blocos de fontes",
      boilerplate: "texto padrão",
      trackingLinks: "links de rastreamento",
      blankLines: "linhas em branco"
    },
    copyDelta: "Diferença de texto",
    shorter: "{pct}% mais curto",
    noInput: "Sem entrada",
    appliedRules: "Regras aplicadas",
    noRules: "Nenhuma regra aplicada ainda."
  },
  helpBand: {
    eyebrow: "Fluxo local",
    title: "Limpe o texto sem enviar o rascunho.",
    tabs: ["Privado", "Determinista", "Exportável"]
  },
  language: { label: "Mudar idioma" },
  tools: {
    analysisTitle: "Análise de escrita",
    aiScore: "Pontuação de «IA»",
    levels: { low: "Parece humano", medium: "Sinais mistos", high: "Muito a IA" },
    wordsAnalyzed: "palavras analisadas",
    tellsTitle: "Indícios detectados",
    noTells: "Nenhum indício claro de IA encontrado.",
    disclaimer: "Verificação heurística, ajustada para texto em inglês.",
    estTokens: "Tokens estimados",
    tokensNote: "Aproximado — não exato para faturação.",
    shareButton: "Partilhar resultado",
    downloadCard: "Baixar cartão",
    copyLink: "Copiar link",
    linkCopied: "Link de partilha copiado para a área de transferência.",
    cardTagline: "Limpo com Citation Cleaner",
    liveClean: "Limpeza ao vivo",
    inlineDiff: "Diff em linha"
  }
};

const ar: Dictionary = {
  meta: {
    title: "Citation Cleaner",
    description: "تنظيف Markdown محليًا في المتصفح من اقتباسات روبوتات الدردشة الذكية وآثار المصادر."
  },
  skipLink: "تخطَّ إلى المنظّف",
  utility: ["داخل المتصفح", "بدون حساب", "Markdown داخل، Markdown خارج"],
  nav: { home: "الصفحة الرئيسية لـ Citation Cleaner", cleaner: "المنظّف", samples: "أمثلة", report: "التقرير", loadSample: "تحميل مثال" },
  hero: {
    brand: "Citation Cleaner",
    title: "اجعل نص الذكاء الاصطناعي جاهزًا للنشر.",
    copy: "أزل الاقتباسات وآثار المصادر وفوضى التتبّع من Markdown روبوتات الدردشة محليًا.",
    proof: ["0 عمليات رفع", "قواعد حتمية", "آمن لـ Markdown"]
  },
  samples: {
    fastStart: "بداية سريعة",
    tryLabel: "جرّب",
    scenarios: {
      "perplexity-source-stack": {
        name: "Perplexity",
        description: "قائمة مصادر مرقّمة وعلامات اقتباس وروابط بحث ملصقة."
      },
      "ai-overview-labels": {
        name: "AI Overview",
        description: "تسميات نتائج البحث وصفوف «مزيد من المعلومات» ونصوص نمطية للملخّص."
      },
      "chatgpt-footnotes": {
        name: "ChatGPT",
        description: "اقتباسات رقمية ضمن النص وتعريفات حواشٍ وروابط تتبّع."
      }
    }
  },
  workflow: {
    paste: { title: "لصق", desc: "حافظ على الشيفرة والروابط دون تغيير." },
    clean: { title: "تنظيف", desc: "أزل العناصر التي يلاحظها القرّاء أولًا." },
    copy: { title: "نسخ", desc: "غادر بـ Markdown جاهز للنشر." }
  },
  toolbar: {
    controls: "عناصر تحكم المنظّف",
    source: "المصدر",
    intensityLegend: "شدة التنظيف",
    intensities: { safe: "آمنة", balanced: "متوازنة", aggressive: "قوية" },
    outputActions: "إجراءات المخرجات",
    clean: "تنظيف",
    copyOutput: "نسخ المخرجات",
    downloadMd: "تنزيل .md",
    reset: "إعادة تعيين",
    localOnly: "محلي فقط"
  },
  editors: {
    rawLabel: "Markdown الخام",
    rawHelper: "الصق من ChatGPT أو Claude أو Gemini أو Perplexity أو DeepSeek أو Kimi أو AI Overview.",
    rawPlaceholder: "الصق هنا Markdown المنسوخ من الذكاء الاصطناعي...",
    cleanedLabel: "Markdown المنظّف",
    cleanedHelper: "راجع المخرجات الحتمية قبل النسخ أو التنزيل.",
    cleanedPlaceholder: "سيظهر Markdown المنظّف هنا.",
    chars: "حرفًا"
  },
  status: {
    initial: "الصق Markdown الذكاء الاصطناعي، ونظّفه محليًا، وانسخ النسخة القابلة للنشر.",
    cleaned: "تم التنظيف محليًا. راجع المخرجات قبل النشر.",
    nothing: "لا يوجد ما يُنظّف بعد.",
    copied: "تم نسخ Markdown المنظّف إلى الحافظة.",
    downloaded: "تم تنزيل cleaned-markdown.md.",
    sampleLoaded: "تم تحميل المثال وتنظيفه محليًا.",
    scenarioLoaded: "تم تحميل {name}. المخرجات جاهزة للمراجعة."
  },
  summary: {
    signal: "إشارة",
    title: "تقرير التنظيف",
    reviewReady: "جاهز للمراجعة",
    awaiting: "بانتظار اللصق",
    removed: "عنصرًا مطابقًا تمت إزالته",
    stats: {
      citations: "اقتباسات",
      footnotes: "حواشٍ",
      sourceBlocks: "كتل مصادر",
      boilerplate: "نصوص نمطية",
      trackingLinks: "روابط تتبّع",
      blankLines: "أسطر فارغة"
    },
    copyDelta: "فرق النص",
    shorter: "أقصر بنسبة {pct}%",
    noInput: "لا مدخلات",
    appliedRules: "القواعد المطبَّقة",
    noRules: "لم تُطبَّق أي قواعد بعد."
  },
  helpBand: {
    eyebrow: "سير عمل محلي",
    title: "نظّف النص دون رفع المسودة.",
    tabs: ["خاص", "حتمي", "قابل للتصدير"]
  },
  language: { label: "تغيير اللغة" },
  tools: {
    analysisTitle: "تحليل الكتابة",
    aiScore: "درجة «الذكاء الاصطناعي»",
    levels: { low: "يشبه البشر", medium: "إشارات متباينة", high: "يبدو ذكاءً اصطناعيًا بشدة" },
    wordsAnalyzed: "كلمة تم تحليلها",
    tellsTitle: "العلامات المكتشفة",
    noTells: "لم يُعثر على علامات واضحة للذكاء الاصطناعي.",
    disclaimer: "فحص استدلالي، مضبوط للنص الإنجليزي.",
    estTokens: "الرموز التقديرية",
    tokensNote: "تقريبي — غير دقيق للفوترة.",
    shareButton: "مشاركة النتيجة",
    downloadCard: "تنزيل البطاقة",
    copyLink: "نسخ الرابط",
    linkCopied: "تم نسخ رابط المشاركة إلى الحافظة.",
    cardTagline: "تم التنظيف باستخدام Citation Cleaner",
    liveClean: "تنظيف فوري",
    inlineDiff: "فرق ضمن النص"
  }
};

const dictionaries: Record<Locale, Dictionary> = { en, es, fr, de, ja, zh, ko, pt, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
