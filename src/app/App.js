import React, {Component} from 'react';
class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data=> {
                M.toast({html: 'Task added successfully'});
                this.setState({title: '', description: '', _id: ''});
                this.fetchTasks()
            })
        }else{
            fetch('/api/tasks', {
                method: 'POST', 
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Task added successfully'});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        console.log('Inic')
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
            });
    }

    deleteTask(_id){
        if(confirm('Are you sure you want to delete this task')){
            fetch(`/api/tasks/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.fetchTasks();
                })
        }
    }

    editTask(_id){
        fetch(`/api/tasks/${_id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            <div>
                <nav className='deep-purple lighten-2'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>To do list</a>
                        <div className='container'>
                            <a>Hola</a>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' onChange={this.handleChange} value={this.state.title} type='text' placeholder='To do Title'/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description' onChange={this.handleChange} value={this.state.description} placeholder='To do Description' className='materialize-textarea'></textarea>
                                            </div>
                                        </div>
                                        <button className='btn deep-purple lighten-2'>Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map((task) => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td className='row' style={{display: 'flex', gap: '0.5vw'}}>
                                                    <button className='btn deep-purple lighten-2' onClick={() => this.deleteTask(task._id)}>
                                                        <i className='material-icons'>delete</i>
                                                    </button>
                                                    <button className='btn deep-purple lighten-2' onClick={() => this.editTask(task._id)}>
                                                        <i className='material-icons'>edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                            )
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;