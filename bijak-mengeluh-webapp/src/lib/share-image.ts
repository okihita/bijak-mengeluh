export const generateShareImage = async (
  text: string,
  agency?: string
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position: absolute; left: -10000px; width: 1080px; height: 1920px;';
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error("Cannot access iframe document");

      const escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      
      const escapedAgency = agency
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
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; }
          </style>
        </head>
        <body>
          <div style="width: 1080px; height: 1920px; background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%); display: flex; flex-direction: column; padding: 100px 80px 120px 80px; position: relative;">
            
            <!-- Top Badge -->
            <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(20px); border-radius: 999px; padding: 20px 40px; display: inline-flex; align-items: center; justify-content: center; align-self: flex-start; margin-bottom: 80px; border: 2px solid rgba(255, 255, 255, 0.2);">
              <span style="font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">
                📢 Surat Keluhan
              </span>
            </div>

            <!-- Main Content Card -->
            <div style="background: #ffffff; border-radius: 40px; padding: 80px 70px; flex: 1; display: flex; flex-direction: column; box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4); position: relative;">
              
              <!-- Quote Icon -->
              <div style="position: absolute; top: 40px; left: 50px; font-size: 120px; line-height: 1; color: #dc2626; opacity: 0.15; font-weight: 700;">
                "
              </div>

              <!-- Complaint Text -->
              <div style="font-size: 36px; line-height: 1.5; color: #1f2937; margin-bottom: auto; font-weight: 600; letter-spacing: -0.5px; position: relative; z-index: 1;">
                ${escapedText.length > 260 ? escapedText.substring(0, 260) + "..." : escapedText}
              </div>

              <!-- Agency Tag -->
              ${escapedAgency ? `
              <div style="margin-top: 60px; padding: 28px 36px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 24px; border-left: 8px solid #dc2626; position: relative; z-index: 1;">
                <div style="font-size: 20px; color: #991b1b; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Ditujukan ke
                </div>
                <div style="font-size: 28px; color: #7f1d1d; font-weight: 800; letter-spacing: -0.5px;">
                  ${escapedAgency}
                </div>
              </div>
              ` : ''}
            </div>

            <!-- Bottom Branding -->
            <div style="margin-top: 80px; text-align: center; display: flex; justify-content: center;">
              <div style="background: rgba(255, 255, 255, 0.98); border-radius: 999px; padding: 32px 60px; display: inline-block; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); border: 3px solid rgba(255, 255, 255, 0.5);">
                <div style="font-size: 32px; font-weight: 900; color: #dc2626; letter-spacing: -1px; margin-bottom: 6px;">
                  bijakmengeluh.id
                </div>
                <div style="font-size: 18px; color: #6b7280; font-weight: 600; letter-spacing: 0.3px;">
                  Bijak sana, bijak sini, bijak di mana-mana!
                </div>
              </div>
            </div>

          </div>
        </body>
        </html>
      `);
      iframeDoc.close();

      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 1080,
        height: 1920,
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
      document.querySelectorAll('iframe[style*="left: -10000px"]').forEach(el => el.remove());
      reject(error);
    }
  });
};
