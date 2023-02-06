docker build -t backend .
docker run --rm -t -p 3001:3001\
  backend\
  npm run $1