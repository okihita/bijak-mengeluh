export const generateShareImage = async (
  text: string,
  ministry?: string
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      
      // Create isolated iframe
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
      
      const escapedMinistry = ministry
        ?.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      // Instagram Story format: 1080x1920 (9:16)
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          </style>
        </head>
        <body>
          <div style="width: 1080px; height: 1920px; background: linear-gradient(180deg, #dc2626 0%, #7f1d1d 100%); display: flex; flex-direction: column; padding: 80px 60px; position: relative;">
            
            <!-- Top Badge -->
            <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 100px; padding: 16px 32px; display: inline-block; align-self: flex-start; margin-bottom: 60px;">
              <div style="font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">
                📢 SURAT KELUHAN
              </div>
            </div>

            <!-- Main Content Card -->
            <div style="background: #ffffff; border-radius: 32px; padding: 60px; flex: 1; display: flex; flex-direction: column; box-shadow: 0 30px 60px rgba(0,0,0,0.3);">
              
              <!-- Quote Icon -->
              <div style="font-size: 80px; line-height: 1; color: #dc2626; margin-bottom: 30px; opacity: 0.3;">
                "
              </div>

              <!-- Complaint Text -->
              <div style="font-size: 32px; line-height: 1.6; color: #1f2937; margin-bottom: auto; font-weight: 500;">
                ${escapedText.length > 280 ? escapedText.substring(0, 280) + "..." : escapedText}
              </div>

              <!-- Ministry Tag -->
              ${escapedMinistry ? `
              <div style="margin-top: 40px; padding: 20px 30px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 20px; border-left: 6px solid #dc2626;">
                <div style="font-size: 18px; color: #991b1b; font-weight: 600; margin-bottom: 4px;">
                  Ditujukan ke:
                </div>
                <div style="font-size: 24px; color: #7f1d1d; font-weight: 700;">
                  ${escapedMinistry}
                </div>
              </div>
              ` : ''}
            </div>

            <!-- Bottom Branding -->
            <div style="margin-top: 50px; text-align: center;">
              <div style="background: rgba(255,255,255,0.95); border-radius: 100px; padding: 24px 48px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="font-size: 28px; font-weight: 800; color: #dc2626; letter-spacing: -0.5px;">
                  bijakmengeluh.id
                </div>
                <div style="font-size: 18px; color: #6b7280; margin-top: 4px; font-weight: 500;">
                  Bijak sana, bijak sini, bijak di mana-mana!
                </div>
              </div>
            </div>

          </div>
        </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for rendering
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
