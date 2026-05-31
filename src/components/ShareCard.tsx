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

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Accent chevron strip on the right.
  ctx.fillStyle = "#024ad8";
  ctx.beginPath();
  ctx.moveTo(WIDTH - 220, 0);
  ctx.lineTo(WIDTH, 0);
  ctx.lineTo(WIDTH - 120, HEIGHT);
  ctx.lineTo(WIDTH - 340, HEIGHT);
  ctx.closePath();
  ctx.fill();

  const family = "Arial, system-ui, sans-serif";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#296ef9";
  ctx.font = `700 30px ${family}`;
  ctx.fillText(props.tagline, 80, 130);

  ctx.fillStyle = "#ffffff";
  ctx.font = `700 220px ${family}`;
  ctx.fillText(String(props.totalRemoved), 76, 360);

  ctx.fillStyle = "#c2c2c2";
  ctx.font = `400 40px ${family}`;
  ctx.fillText(props.removedLabel, 80, 420);

  ctx.fillStyle = "#ffffff";
  ctx.font = `600 44px ${family}`;
  ctx.fillText(props.shorterText, 80, 500);
  ctx.fillStyle = "#c8f04a";
  ctx.fillText(`${props.aiScoreLabel}: ${props.aiScore}`, 80, 560);

  ctx.fillStyle = "#ffffff";
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
