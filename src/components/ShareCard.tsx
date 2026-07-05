"use client";

import { ClipboardText, DownloadSimple, ShareNetwork } from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/dictionaries";

type ShareCardProps = {
  tools: Dictionary["tools"];
  tagline: string;
  totalRemoved: number;
  removedLabel: string;
  shorterText: string;
  aiScoreLabel: string;
  aiScore: number;
  onStatus: (message: string) => void;
};

const WIDTH = 1200;
const HEIGHT = 630;
const DOMAIN = "cleaner.tenten.dev";

function renderCard(props: ShareCardProps): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  // Deep navy ground with a soft aurora glow — matches the app's identity.
  ctx.fillStyle = "#041e49";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const glow = ctx.createRadialGradient(WIDTH - 160, 90, 0, WIDTH - 160, 90, 480);
  glow.addColorStop(0, "rgba(139, 123, 240, 0.45)");
  glow.addColorStop(1, "rgba(139, 123, 240, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Aurora strip across the top.
  const aurora = ctx.createLinearGradient(0, 0, WIDTH, 0);
  aurora.addColorStop(0, "#1b6ef3");
  aurora.addColorStop(0.35, "#3f8cf5");
  aurora.addColorStop(0.7, "#8b7bf0");
  aurora.addColorStop(1, "#c86bd8");
  ctx.fillStyle = aurora;
  ctx.fillRect(0, 0, WIDTH, 8);

  const family = "Arial, system-ui, sans-serif";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#8ab4f8";
  ctx.font = `700 30px ${family}`;
  ctx.fillText(props.tagline, 80, 130);

  ctx.fillStyle = "#ffffff";
  ctx.font = `600 220px ${family}`;
  ctx.fillText(String(props.totalRemoved), 76, 360);

  ctx.fillStyle = "rgba(255, 255, 255, 0.66)";
  ctx.font = `400 40px ${family}`;
  ctx.fillText(props.removedLabel, 80, 420);

  ctx.fillStyle = "#e8eaed";
  ctx.font = `600 44px ${family}`;
  ctx.fillText(props.shorterText, 80, 500);
  ctx.fillStyle = "#b69df8";
  ctx.fillText(`${props.aiScoreLabel}: ${props.aiScore}`, 80, 560);

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.font = `700 28px ${family}`;
  ctx.fillText(DOMAIN, 80, 610);

  return canvas;
}

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

export function ShareCard(props: ShareCardProps) {
  const { tools, onStatus } = props;

  async function handleDownload() {
    const canvas = renderCard(props);
    const blob = await toBlob(canvas);
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "citation-cleaner-result.png";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleShare() {
    const shareUrl = window.location.href;
    const text = `${props.tagline} — ${props.totalRemoved} ${props.removedLabel}, ${props.shorterText}`;
    const canvas = renderCard(props);
    const blob = await toBlob(canvas);
    const file = blob ? new File([blob], "citation-cleaner-result.png", { type: "image/png" }) : null;

    if (navigator.share) {
      try {
        if (file && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: props.tagline, text, url: shareUrl, files: [file] });
        } else {
          await navigator.share({ title: props.tagline, text, url: shareUrl });
        }
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard.
      }
    }

    await navigator.clipboard?.writeText(shareUrl);
    onStatus(tools.linkCopied);
  }

  async function handleCopyLink() {
    await navigator.clipboard?.writeText(window.location.href);
    onStatus(tools.linkCopied);
  }

  return (
    <div className="share-card" aria-label={tools.shareButton}>
      <button type="button" className="primary-action" onClick={handleShare}>
        <ShareNetwork aria-hidden="true" size={18} weight="bold" />
        {tools.shareButton}
      </button>
      <button type="button" onClick={handleDownload}>
        <DownloadSimple aria-hidden="true" size={18} weight="bold" />
        {tools.downloadCard}
      </button>
      <button type="button" onClick={handleCopyLink}>
        <ClipboardText aria-hidden="true" size={18} weight="bold" />
        {tools.copyLink}
      </button>
    </div>
  );
}
