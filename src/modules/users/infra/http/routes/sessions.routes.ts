import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  response.status(200).json({ user, token });
});

export default sessionsRouter;