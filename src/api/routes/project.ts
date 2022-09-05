import { Response, Router , Request} from "express";
import { Projects, Users } from '../../db/dbinstance';
import { auth, CustomRequest } from "../../middlewares/checkJwt";
import { createProject } from "../controllers/projects/projectCreate";
import { deleteProject } from "../controllers/projects/projectDelete";
import { getProjectById } from "../controllers/projects/projectGetById";
import { updateProject } from "../controllers/projects/projectUpdate";

const projectsRouter: Router = Router();

projectsRouter.get('/:id', auth, async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const data = (req as CustomRequest).token;


    const toProject = await getProjectById(data["id"], id)
    
    return toProject ? res.status(200).send( { data: toProject  } ) : res.status(404).send( { data: 'Project does not exists'  } ); 
});

projectsRouter.put('/update/:id', auth,  async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.body
    const { id } = req.params

    const data = (req as CustomRequest).token;

    const updatedProject = await updateProject( data["id"], id, name)

    return updatedProject ? res.status(200).send({data:'Project name updated'}) : res.status(500).send({data: 'Error during updating project name'})
});

projectsRouter.delete('/:id', auth, async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const data = (req as CustomRequest).token;

    const toProject = await deleteProject(data["id"], id);
    
    return toProject ? res.status(200).send( { data: 'Project deleted successfully!'  }  ) : res.status(404).send({data:'Project does not exist!'})
});

projectsRouter.post('/create',  auth,  async (req: Request, res:Response): Promise<Response> => {
    const newProjectPayload = req.body;
    const data = (req as CustomRequest).token;

    try {
        
        const newProject = await createProject( data["id"], newProjectPayload)

        return res.status(201).send({data: newProject})

    } catch (err) {
        return res.status(500).send("Can't create project!")
    }

});


export default projectsRouter;