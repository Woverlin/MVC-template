import express from 'express';
import userController from '../../controllers/user/userController';
import { signInSchema } from '../../utils/validations/userValidation';
import validateRequest from '../../utils/validateRequest';

const userRouter = express.Router();

userRouter.post("/create", validateRequest(signInSchema, "body"), userController.add);
// userRouter.route('/list').post(userController.read);
// userRouter.route('/:id').get(userController.getById);
// userRouter.route('/update/:id').put(userController.update);
// userRouter.route('/delete/:id').delete(userController.remove);

export default userRouter;