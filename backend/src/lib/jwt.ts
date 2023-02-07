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

// Coupon using JWT
export const createCoupon = async (
  campaign: string,
  index: number,
  created_at: Date,
) => {
  const code = await jwt.sign(
    {
      campaign: campaign,
      index: index,
      created_at: created_at,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '30d',
      issuer: 'bobidi',
    },
  );
  return code;
};

export const verifyCoupon = async (token: string) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded as jwt.JwtPayload;
};
