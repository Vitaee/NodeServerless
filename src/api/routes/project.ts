import { Response, Router , Request} from "express";
import { Users } from '../../db/dbinstance';
import { auth, CustomRequest } from "../../middlewares/checkJwt";
import { createProject } from "../controllers/projects/projectCreate";

const projectsRouter: Router = Router();

projectsRouter.get('/:id', auth, async (req: Request, res: Response): Promise<Response> => {
    return res.status(200)
});

projectsRouter.put('/update/:id', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200);
});

projectsRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200);
});

projectsRouter.post('/create',  auth,  async (req: Request, res:Response): Promise<Response> => {
    const newProjectPayload = req.body;
    const data = (req as CustomRequest).token;

    try {
        const user = await Users.findOne( { where: {email: data['email']} } );
        
        const newProject = await createProject( user.getDataValue('id'), newProjectPayload)

        return res.status(201).send({data: newProject})

    } catch (err) {
        console.log(err)
        
        return res.status(500).send("Can't create project!")
    }

});


export default projectsRouter;