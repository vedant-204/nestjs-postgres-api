import { Request } from 'express';
import user from '../users/users.entity';
 
interface RequestWithUser extends Request {
  user: user;
}
 
export default RequestWithUser;
