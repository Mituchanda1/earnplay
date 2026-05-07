
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/db-status',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
