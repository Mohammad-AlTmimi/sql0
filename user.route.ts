import express from 'express';
import { User } from '../entity/User.js';
import { Profile } from '../entity/Profile.js'
import { Tag } from '../entity/Tag.js'
import { ToDo } from '../entity/Todo.js'
import { todo } from 'node:test';
import db from '../entity/index.js'

const router = express.Router();

router.get('/', (req, res) => {
  console.log(res.locals.user);
  res.send('All Users');
});

router.get('/:id', (req, res) => {
  res.send('User by ID');
});

router.post('/', async (req, res) => {
  try {
    const user = new User();
    const profile = new Profile();
    profile.bio = 'Hello, Welcome to my Profile!';
    profile.imageURL = 'https://img.freepik.com/free-icon/user_318-563642.jpg';
    user.userName = req.body.userName;
    user.Profile = profile;
    db.DS.dataSource.transaction(async (transactionManager) => {
      await transactionManager.save(profile);
      await transactionManager.save(user);
    }).then(() => {
      res.send('User Created');
    }).catch(error => {
      res.status(500).send("Something went wrong: " + error);
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong, " + error);
  }
});

router.put('/:id', (req, res) => {
  res.send('User Updated');
});

router.delete('/:id', async (req, res) => {
    try{
      const id = Number(req.params.id);
      const task = await User.findOneBy({ id }); 
      if(task){
        await task.remove();
        // await task.save();
        res.status(200).send("Is deleted ")
        return ;
      }
      res.send("ID not found")

    } catch( err ){
        res.status(404).send(err)
    }
});

export default router;