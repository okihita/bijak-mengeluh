export const generateShareImage = async (
  text: string,
  ministry?: string
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import("html2canvas")).default;
      
      const container = document.createElement("div");
      container.style.cssText = `
        width: 1080px;
        padding: 80px;
        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        position: absolute;
        left: -10000px;
        top: 0;
      `;

      const escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      
      const escapedMinistry = ministry
        ?.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      container.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 60px;">
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

      // Wait for fonts to load
      await document.fonts.ready;

      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      document.body.removeChild(container);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png", 1.0);
    } catch (error) {
      reject(error);
    }
  });
};
