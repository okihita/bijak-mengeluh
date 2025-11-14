export const generateShareImage = async (
  text: string,
  ministry?: string
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      
      // Create isolated iframe to avoid CSS inheritance
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position: absolute; left: -10000px; width: 1080px; height: 2000px;';
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error("Cannot access iframe document");

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

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div style="width: 1080px; padding: 80px; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);">
            <div style="background: #ffffff; border-radius: 24px; padding: 60px;">
              <div style="font-size: 32px; font-weight: 700; color: #1f2937; margin-bottom: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                📝 Surat Keluhan
              </div>
              <div style="font-size: 24px; line-height: 1.8; color: #374151; white-space: pre-wrap; word-wrap: break-word; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                ${escapedText.length > 400 ? escapedText.substring(0, 400) + "..." : escapedText}
              </div>
              ${escapedMinistry ? `<div style="margin-top: 40px; padding: 20px; background: #f3f4f6; border-radius: 12px; font-size: 20px; color: #6b7280; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">📍 ${escapedMinistry}</div>` : ""}
              <div style="margin-top: 60px; padding-top: 40px; border-top: 2px solid #e5e7eb; font-size: 20px; color: #9ca3af; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                bijakmengeluh.id
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      document.body.removeChild(iframe);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png", 1.0);
    } catch (error) {
      // Cleanup
      document.querySelectorAll('iframe[style*="left: -10000px"]').forEach(el => el.remove());
      reject(error);
    }
  });
};
