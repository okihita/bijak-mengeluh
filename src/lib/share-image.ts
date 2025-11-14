import html2canvas from "html2canvas";

export const generateShareImage = async (
  text: string,
  ministry?: string
): Promise<Blob> => {
  const container = document.createElement("div");
  container.style.cssText = `
    width: 1080px;
    height: auto;
    padding: 80px;
    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    font-family: system-ui, -apple-system, sans-serif;
    position: fixed;
    left: -9999px;
    top: 0;
  `;

  const escapedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapedMinistry = ministry?.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  container.innerHTML = `
    <div style="background: white; border-radius: 24px; padding: 60px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size: 32px; font-weight: 700; color: #1f2937; margin-bottom: 40px;">
        📝 Surat Keluhan
      </div>
      <div style="font-size: 24px; line-height: 1.8; color: #374151; white-space: pre-wrap; word-wrap: break-word;">
        ${escapedText.length > 400 ? escapedText.substring(0, 400) + "..." : escapedText}
      </div>
      ${escapedMinistry ? `<div style="margin-top: 40px; padding: 20px; background: #f3f4f6; border-radius: 12px; font-size: 20px; color: #6b7280;">📍 ${escapedMinistry}</div>` : ""}
      <div style="margin-top: 60px; padding-top: 40px; border-top: 2px solid #e5e7eb; font-size: 20px; color: #9ca3af; text-align: center;">
        bijakmengeluh.id
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: null,
      logging: false,
      useCORS: true,
    });

    document.body.removeChild(container);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create image blob"));
        }
      }, "image/png", 1.0);
    });
  } catch (error) {
    document.body.removeChild(container);
    throw error;
  }
};
