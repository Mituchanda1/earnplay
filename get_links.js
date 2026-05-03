const https = require('https');
const urls = [
  'https://ibb.co/KcxcNWvT',
  'https://ibb.co/whWXbNqK',
  'https://ibb.co/N6SBY20S',
  'https://ibb.co/TBRjrvy6'
];

urls.forEach(urlString => {
  https.get(urlString, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="(.*?)"/);
      if (match) {
        console.log(match[1]);
      }
    });
  });
});
