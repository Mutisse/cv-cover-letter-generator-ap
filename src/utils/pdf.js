import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function exportTextToPDF(title, content) {
  const html = `
    <html>
      <body style="font-family: Arial; padding: 32px; line-height: 1.5;">
        <h1>${escapeHtml(title)}</h1>
        <pre style="white-space: pre-wrap; font-family: Arial; font-size: 14px;">${escapeHtml(content)}</pre>
      </body>
    </html>
  `;
  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  }
  return uri;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
