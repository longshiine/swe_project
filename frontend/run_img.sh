docker build -t frontend .
docker run --rm -t -p 3000:3000\
  frontend\
  npm run $1