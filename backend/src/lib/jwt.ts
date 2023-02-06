import jwt from 'jsonwebtoken';

export const createToken = async (id: string) => {
  const token = await jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
      issuer: 'issuer',
    },
  );
  return token;
};

export const verifyToken = async (token: string) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded as jwt.JwtPayload;
};
