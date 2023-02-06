if [ "$1" = "dev" ]
then
  MODE=dev
  DOMAIN=localhost
elif [ "$1" = "prod" ]
then
  MODE=prod
  DOMAIN=localhost
else
  MODE=dev
  DOMAIN=localhost
fi

export MODE=$MODE
export DOMAIN=$DOMAIN

docker-compose down --remove-orphans
docker-compose up -d --build
docker container ls
docker-compose logs -f frontend