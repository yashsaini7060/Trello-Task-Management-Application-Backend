import { Schema, model} from 'mongoose';


const taskSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  status: { 
    type: String, 
    required: true,
  },
  priority:  {
    type: String,
  },
  deadline: String,
  userId: {type: String, required: true },
});


const Task = model('Task', taskSchema);

export default Task;