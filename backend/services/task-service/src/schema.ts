import {z} from "zod";

export const createTaskSchema=z.object({

    projectId:z.string().uuid(),
    title:z.string().min(3),
    ownerId:z.string().uuid(),
    deadline:z.string().optional(),

});

export const updateStatusScehma=z.object({
    status:z.enum(["IN_PROGRESS","COMPLETED"]);
});