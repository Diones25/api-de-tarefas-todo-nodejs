import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();

    res.json({list});
}

export const add = async (req: Request, res: Response) => {
    let title = req.body.title;

    if(title){

        let newTodo = await Todo.create({
            title: title,
            done: req.body.done ? true : false
        });

        res.status(201);
        res.json({newTodo});

    }
    else{
        res.json({erro: "Dados não envidados"});
    }
}

export const update = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if(todo){

        if(req.body.title){
            todo.title = req.body.title;
        }

        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    todo.done = true;
                break;

                case 'false':
                case '0':
                    todo.done = false;
                break;
            }
        }

        await todo.save();
        res.json({item: todo});

    }
    else{
        res.json({erro: "Item não encontrado"});
    }
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if(todo){
        await todo.destroy();
        res.json({ success: "Item removido com sucesso" });
    }
    else{
        res.json({ warning: "Item não encontrado!" });
    }
}