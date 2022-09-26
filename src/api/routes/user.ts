import { Response, Router , Request} from "express";
import { Users } from '../../db/dbinstance';
import { auth, CustomRequest } from "../../middlewares/checkJwt";
import { createUser } from "../controllers/user/userCreate";
import { getUserById } from "../controllers/user/userGetById";
import { loginUser } from "../controllers/user/userLogin";
import { updateUser } from "../controllers/user/userUpdate";
const usersRouter: Router = Router();

usersRouter.get('/', auth, async (req: Request, res: Response): Promise<Response> => {
    
    const id  = (req as CustomRequest).token["id"];
    const toUser = await getUserById(id);
    
    const user = toUser ? toUser : "User does not exist" 

    return res.status(200).send( { data: user  } );
});

usersRouter.put('/update/', auth,  async (req: Request, res: Response): Promise<Response> => {
    const { username } = req.body;
    const id = (req as CustomRequest).token["id"];

    const updatedUser =  await updateUser(username, id);

    return updatedUser ? res.status(200).send({ data: "Your username updated!"}) : res.status(500).send({ data: "Eror during updating user!"})
});


usersRouter.post('/register',  async (req: Request, res:Response): Promise<Response> => {
    const newUserPayload = req.body;
    
    try {
        const newUser = await createUser(newUserPayload);
        return res.status(201).send({ data: newUser });

    } catch (err: any){
        return res.status(500).send({ error: err.message })
    };
});

usersRouter.post('/login', async (req: Request, res:Response): Promise<Response> => {

    try {
        const data = await loginUser(req.body);
        return res.status(200).send({data:data});
    } catch (err) {
        return res.status(500).send({ data: err.message });
    }

});

export default usersRouter;