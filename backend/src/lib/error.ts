const ERROR = {
  // ------------------------------------ //
  UNAUTHORIZED_USER: '유효하지 않은 idToken값 입니다',
  NOT_CREATE_USER: '유저 정보가 정상적으로 저장되지 않았습니다',
  NOT_READ_USER: '유저 정보를 찾을 수 없습니다',
  NOT_DELETE_USER: '유저 정보를 삭제하는 과정에서 에러가 발생하였습니다',
  NOT_UPDATE_USER: '유저 정보를 수정하는 과정에서 에러가 발생하였습니다',
  // ------------------------------------ //
  NOT_CREATE_POST: '게시글이 정상적으로 저장되지 않았습니다',
  NOT_READ_POST: '게시글을 찾을 수 없습니다',
  NOT_UPDATE_POST: '게시글을 수정하는 과정에서 에러가 발생하였습니다',
  NOT_DELETE_POST: '게시글을 삭제하는 과정에서 에러가 발생하였습니다',
  // ------------------------------------ //
  NOT_UPLOAD_S3: '이미지가 S3에 정상적으로 업로드되지 못하였습니다',
  // ------------------------------------ //
  NOT_READ_COUPON: '쿠폰을 찾을 수 없습니다',
  NOT_VERIFIED_COUPON: '쿠폰이 유효하지 않습니다',
};

export default ERROR;
