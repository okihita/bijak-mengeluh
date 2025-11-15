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
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          </style>
        </head>
        <body>
          <div style="width: 1080px; height: 1920px; background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%); display: flex; flex-direction: column; padding: 80px 60px 80px 60px; position: relative;">
            
            <!-- Main Content Card -->
            <div style="background: #ffffff; border-radius: 32px; padding: 64px 56px; flex: 1; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04); position: relative; margin-top: 120px; margin-bottom: 120px;">
              
              <!-- Top Badge -->
              <div style="position: absolute; top: -32px; left: 56px; background: #dc2626; border-radius: 16px; padding: 16px 32px; box-shadow: 0 12px 32px rgba(220, 38, 38, 0.24);">
                <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">
                  📢 KELUHAN
                </span>
              </div>

              <!-- Complaint Text -->
              <div style="font-size: 36px; line-height: 1.4; color: #1a1a1a; margin-top: 48px; margin-bottom: auto; font-weight: 600; letter-spacing: -0.5px;">
                ${escapedText.length > 240 ? escapedText.substring(0, 240) + "..." : escapedText}
              </div>

              <!-- Agency Tag -->
              ${escapedAgency ? `
              <div style="margin-top: 48px; padding: 24px 32px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 20px; border-left: 6px solid #dc2626;">
                <div style="font-size: 18px; color: #991b1b; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">
                  Ditujukan ke
                </div>
                <div style="font-size: 26px; color: #7f1d1d; font-weight: 800; letter-spacing: -0.3px; line-height: 1.3;">
                  ${escapedAgency}
                </div>
              </div>
              ` : ''}
            </div>

            <!-- Bottom Branding -->
            <div style="position: absolute; bottom: 80px; left: 0; right: 0; text-align: center; display: flex; justify-content: center;">
              <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 24px; padding: 24px 48px; display: inline-block; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08); border: 1px solid rgba(0, 0, 0, 0.04);">
                <div style="font-size: 28px; font-weight: 900; color: #dc2626; letter-spacing: -0.5px;">
                  bijakmengeluh.id
                </div>
              </div>
            </div>

          </div>
        </body>
        </html>
      `);
      iframeDoc.close();

      await new Promise(resolve => setTimeout(resolve, 500));

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
