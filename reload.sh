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

docker-compose down --remove-orphans # --remove-orphans 정의되지 않은 서비스에 대한 컨테이너 제거
docker-compose up -d --build         # --build 이미지가 없으면 빌드
docker container ls                  # 컨테이너 목록 확인
docker-compose logs -f frontend      # 로그 확인