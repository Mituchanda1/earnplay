# Nginx Configuration for findejob.com

To fix the **404 error** on your live site, you need to configure Nginx to forward API requests to your Node.js server (running on port 3000) and serve the frontend files correctly.

Add this to your Nginx site configuration (usually in `/etc/nginx/sites-available/default`):

```nginx
server {
    listen 80;
    server_name findejob.com; # Your domain

    # Frontend Static Files
    location / {
        # Path to your project's dist folder
        root /var/www/findejob/dist; 
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API Proxy (Forward to Node.js server)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Real IP handling
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optional: Health check path
    location /healthz {
        proxy_pass http://localhost:3000/healthz;
    }
}
```

### Why you were getting 404:
1. **Frontend Routing**: Single Page Applications (React/Vite) need `try_files $uri $uri/ /index.html;` so that when you refresh a page like `/profile`, Nginx serves `index.html` instead of looking for a folder named `/profile`.
2. **API Path**: Nginx wasn't configured to forward `/api` requests to port 3000, so it tried to look for an actual folder named `/api` on your disk, which doesn't exist.
