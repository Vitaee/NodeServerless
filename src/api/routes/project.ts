import { Response, Router , Request} from "express";
import { Projects, Users } from '../../db/dbinstance';
import { auth, CustomRequest } from "../../middlewares/checkJwt";
import { createProject } from "../controllers/projects/projectCreate";

const projectsRouter: Router = Router();

projectsRouter.get('/:id', auth, async (req: Request, res: Response): Promise<Response> => {
    const { project_id } = req.params;
    const data = (req as CustomRequest).token;

    const user = await Users.findOne( { where: {email: data['email']} } );

    const toProject = await Projects.findOne( {where: {ownerId: user.getDataValue('id')}} );
    
    return toProject ? res.status(200).send( { data: toProject  } ) : res.status(404).send( { data: 'Project does not exists'  } ); 
});

projectsRouter.put('/update/:id', auth,  async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.body

    const data = (req as CustomRequest).token;

    const user = await Users.findOne( { where: {email: data['email']} } );

    const updateProject = await Projects.update({ name: name }, {
        where: {
          ownerId: user.getDataValue('id')
        }
      });

    return updateProject ? res.status(200).send({data:'Project name updated'}) : res.status(500).send({data: 'Error during updating project name'})
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