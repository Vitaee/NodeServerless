import { Response, Router , Request} from "express";
import { Users } from '../../db/dbinstance';
import { isMailExist } from '../../middlewares/checkemail';
const usersRouter = Router();

usersRouter.get('/:id',  async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;

    const toUser = await Users.findByPk(id, {
        include: [Users.associations.projects],
        rejectOnEmpty: false
    });

    
    const user = toUser ? toUser : "User does not exist" 

    return res.status(200).send( { data: user  } );
});

usersRouter.put('/update/:id', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200);
});

usersRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200);
});

usersRouter.post('/register', isMailExist,  async (req: Request, res:Response): Promise<Response> => {
    const newUserPayload = req.body;

    try {
        const newUser = await Users.create(newUserPayload, { fields: ['email', 'password'] });
        return res.status(201).send({ data: newUser });

    } catch (err: any){
        return res.status(500).send({ error: err.message })
    };
});

usersRouter.post('/login', async (req: Request, res:Response): Promise<Response> => {
    return res.status(200);
});

export default usersRouter;