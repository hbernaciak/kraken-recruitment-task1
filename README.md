# Kraken recruitment task - Document uploader

## Requirements

    composer
    php 7.1
    mysql
    npm 5.6^


## Install

    cp .env_example .env 
    composer install
    php artisan key:generate
    npm install
    npm run dev
    php artisan serve --host=localhost --port=8000

## Usage

Due to hardcoded host in front-end you need to run project at:
```
http://localhost:8000
````

## Some explanations

1. Browser fingerprint was implemented to separate user's documents without any Auth system or JWT - but it can cause some lags on front-end loading - it is just a demo
2. File uploading is validating on server-side
3. Possible attacks blocked: 
    - blacklisted file formats, 
    - double-format attack, 
    - remote executing by known path & filename
4. API error human responses are display in console log / @todo flash messages