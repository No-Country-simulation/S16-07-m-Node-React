import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from '../config/environment';
import { UserAttributes } from '../types/user.types';

passport.use(
  'userJWT',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (payload: Partial<UserAttributes>, done: any) => {
      try {
        return done(null, payload.id ? payload.id : false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
)

export default passport