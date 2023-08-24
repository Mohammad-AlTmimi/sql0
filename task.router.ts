import express from 'express';
import data from '../data/MOCK_DATA.js';
import Task from '../types/task.js';
import { v4 } from 'uuid';
import { taskValidationMiddleware } from '../middlewares/task.js';
import { ToDo } from '../entity/Todo.js';
import { todo } from 'node:test';
import { In, Like, MoreThan, OrderedBulkOperation } from 'typeorm';
import { Tag } from '../entity/Tag.js'

const router = express.Router();

router.get('/', async (req: Task.Request, res: Task.Response) => {
  // console.log(res.locals.user);
  // console.log("From get / task handler: " + res.locals.logMessage);

  // const filteredItems = data.slice((page - 1) * pageSize, page * pageSize);
  // res.send({
  //   page,
  //   pageSize,
  //   total: data.length,
  //   items: filteredItems
  // });
  try{
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '15');
  
    const [items , total] = await ToDo.findAndCount({
      skip: pageSize * (page - 1),
      take: pageSize,
      order: {
        createDate: 'ASC'
      },
      where: {
        
      },
      select: {
        id: true,
        description: true,
        title: true,
        status: false,
        createDate: true
      },
      // loadRelationIds: true,
      // relations: ['user']
    })
    res.send({
      page: 0,
      pageSize: items.length,
      total,
      items
    })
  } catch(err){
    console.log(err)
    res.status(500).send(`some error has appear ${err}`);
  }
});

router.get('/:id', async (req : Task.Request, res : Task.Response) => {
  const id = (req.params.id);
  const task = await ToDo.findOne({
    where: {id},
    relations: ['user']
  })
  //const task = await ToDo.findOneBy({id : id})
  if(task){
    res.status(200).send({
      page: 0,
          pageSize: 1,
          total : 1,
          items: task
    });
    return ;
  }
  res.status(404).send('Task is not found ');
  
});

router.get('/recent' , async (req: Task.Request, res: Task.Response) =>{
    try{
      console.log("HI")
        // const d = new Date();
        // d.setHours = (d.getHours - 24)
        const page = parseInt(req.query.page || '1');
        const pageSize = parseInt(req.query.pageSize || '10');
        const [items , total] = await ToDo.findAndCount({
            where:{
              createDate: MoreThan(new Date('2023-08-14T16:17:13.408Z'))
            },
            order:{
              createDate: 'ASC'
            }
        })
        res.send({
          page: 0,
          pageSize: items.length,
          total,
          items
        })

    }catch{
        res.status(500).send("some thing went wrong")
    }
    console.log("HI")
})

router.get('/search' , async(req :Task.Request , res: Task.Response) =>{
    const term = req.params.term;
    try{
        const [item , total] = await ToDo.findAndCount({
          where:[ // Its or operation
            {title: Like(`%${term}%`)},
            {description: Like(`%${term}%`)}
          ]
        })
        res.status(200).send({
          page: 0,
          pageSize: item.length,
          total,
          items: item
        })
        
      }
    catch{

    }
})

router.post('/', async (req: Task.Request, res: Task.Response) => {
  // const newTask: Task.Item = {
  //   id: v4(),
  //   status: 'new',
  //   title: req.body.title,
  //   description: req.body.description,
  //   userId: req.body.userId,
  //   index: data.length
  // };
  try{
  const newTask = new ToDo();
  newTask.title = req.body.title;
  newTask.description = req.body.description;
  newTask.user = req.body.userId;
  const userTags = req.body.tags || [];
  const tags= await Tag.find({
      where:{
        id: In(userTags)
      }
  })
  newTask.Tags = tags;
  newTask.save().then((response) =>{
    res.status(201).send(`Task Created !! ${response}`);
  }).catch((err) =>{
    console.log("SomeThing went Wrong" , err)
  })

  data.unshift(newTask);
  res.status(201).send('Task Created');
  }catch(err){
    res.status(400).send("Holly Shit" + err)
  }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await ToDo.findOneBy({ id });  
    if(task){
      task.status = 'done';
      task.save();
      res.status(200).send('Task is updated');
    }
    else{res.status(404).send("Task not found")}
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
    const task = await ToDo.findOneBy({ id });  
    if(task){
      task.remove();
      task.save();
      res.status(200).send('Task is deleted');
    }
    else{res.status(404).send("Task not found")}
});
export default router;