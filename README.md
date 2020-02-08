# ShortLink 🔗

## A Url Shortener

URL Shortener service built on the top of **nodejs, expressjs, mongodb, pugjs**.

### Quick Start

```bash
 # Install all the dependencies
  npm install

 # Create a '.env' file just like the .env.example given here, add your mongodb connection string.

  DB_URI = your_url_here

 # Start the server with node
  node index.js
```

### Screenshots

![url shortener home](./static/first.png)

<br>

![url shortener home](./static/stats.png)

### File Structure

```
.
├── LICENSE
├── README.md
├── client
│   ├── assets
│   │   ├── bg.svg
│   │   ├── favicon
│   │   │   └── favicon.ico
│   │   └── fonts
│   │       ├── Apercu\ Medium.woff
│   │       ├── Apercu\ Mono.woff
│   │       └── Apercu_Regular.woff
│   ├── css
│   │   └── style.css
│   ├── index.html
│   └── js
│       └── script.js
├── index.js
├── middleware
│   ├── async.js
│   └── auth.js
├── models
│   ├── admin.js
│   └── urlshorten.js
├── now.json
├── package-lock.json
├── package.json
├── routes
│   ├── custom.js
│   ├── stats.js
│   └── urlShorten.js
├── startup
│   ├── createUser.js
│   ├── db.js
│   └── routes.js
├── static
│   ├── assests
│   │   ├── admin_favicon.ico
│   │   └── bg.svg
│   ├── css
│   │   ├── admin.css
│   │   └── style.css
│   ├── favicon.ico
│   ├── first.png
│   ├── fonts
│   │   └── Inter-Regular.woff
│   ├── stats.png
│   └── urlshort.gif
└── views
    ├── admin.pug
    ├── index.pug
    └── script.js
```

## LICENSE

[MIT](https://github.com/raghav4/ShortLink/blob/master/LICENSE)
