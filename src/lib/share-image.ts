import html2canvas from "html2canvas";

export const generateShareImage = async (
  text: string,
  ministry?: string
): Promise<Blob> => {
  const container = document.createElement("div");
  container.style.cssText = `
    width: 1080px;
    padding: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: system-ui, -apple-system, sans-serif;
    position: fixed;
    left: -9999px;
  `;

  container.innerHTML = `
    <div style="background: white; border-radius: 24px; padding: 60px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size: 32px; font-weight: 700; color: #1f2937; margin-bottom: 40px;">
        📝 Surat Keluhan
      </div>
      <div style="font-size: 24px; line-height: 1.8; color: #374151; white-space: pre-wrap; word-wrap: break-word;">
        ${text.length > 400 ? text.substring(0, 400) + "..." : text}
      </div>
      ${ministry ? `<div style="margin-top: 40px; padding: 20px; background: #f3f4f6; border-radius: 12px; font-size: 20px; color: #6b7280;">📍 ${ministry}</div>` : ""}
      <div style="margin-top: 60px; padding-top: 40px; border-top: 2px solid #e5e7eb; font-size: 20px; color: #9ca3af; text-align: center;">
        bijakmengeluh.id
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    scale: 2,
    backgroundColor: null,
  });

  document.body.removeChild(container);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
};
