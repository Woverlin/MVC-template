import express from 'express';
import userController from '../../controllers/user/userController';

const userRouter = express.Router();

userRouter.route('/create').post(userController.add);
// userRouter.route('/list').post(userController.read);
// userRouter.route('/:id').get(userController.getById);
// userRouter.route('/update/:id').put(userController.update);
// userRouter.route('/delete/:id').delete(userController.remove);

export default userRouter;