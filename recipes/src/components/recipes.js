import React, {Component } from 'react';
import {Button, Container, Modal, ModalTitle, ModalHeader, ModalBody, Form} from "react-bootstrap"
import {variables} from './variables';
import 'bootstrap/dist/css/bootstrap.min.css'



export class Recipes extends Component{

    constructor(props){
        super(props);

        this.state={
            recipes:[],
            RecipeId: 0,
            name: "",
            ingredients: "",
            instructions: "",
            servingSize: "",
            category: "",
            notes: "",
            dateAdded: "",
            dateModified: "",
            show: false,
            modalTitle:""

        }
    }

    refreshList(){
        fetch(variables.API_URL+'recipes')
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            this.setState({recipes:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    AddRecipe = () => {
        this.setState({
            modalTitle:"Add a New Recipe...",
            show: true,
        });
    }

    EditRecipe = (r) => {
        this.setState({
            modalTitle:"Edit a Recipe...",
            show: true,
            RecipeId:r.RecipeId,
            name: r.Name,
            ingredients: r.Ingredients,
            instructions: r.Instructions,
            servingSize: r.serving_size,
            category: r.category,
            notes: r.notes,
            dateAdded: r.dateAdded,
            dateModified: r.dateModified
        });
        
    }

    DeleteRecipe = (id) => {
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'recipes/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
            }
    }

    SaveRecipe = () => {
        fetch(variables.API_URL+'recipes',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RecipeId:this.state.RecipeId,
                Name: this.state.name,
                Ingredients: this.state.ingredients,
                Instructions: this.state.instructions,
                serving_size: this.state.servingSize,
                category: this.state.category,
                notes: this.state.notes,
                dateAdded: this.state.dateAdded,
                dateModified: this.state.dateModified
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })

        // increment counter of recipeId and close modal window
        this.setState({
            RecipeId: this.state.RecipeId + 1,
            show:false,
        })
    }

    UpdateRecipe = () =>{
        fetch(variables.API_URL+'recipes',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RecipeId:this.state.RecipeId,
                Name: this.state.name,
                Ingredients: this.state.ingredients,
                Instructions: this.state.instructions,
                serving_size: this.state.servingSize,
                category: this.state.category,
                notes: this.state.notes,
                dateAdded: this.state.dateAdded,
                dateModified: this.state.dateModified
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })

        this.setState({
            show:false,
        })
    }

    render(){
        const {
            recipes,
            modalTitle,
            RecipeId,
            name,
            ingredients,
            instructions,
            servingSize,
            category,
            notes,
            dateAdded,
            dateModified
        }=this.state;
        return (
        <Container fluid>
        <div>
        <h1 style={{textAlign:"center"}}>Welcome to my React Recipes App</h1>

            <Button onClick={this.AddRecipe} class="btn btn-primary btn-lg">Add</Button>

        <Modal size="lg" show={this.state.show} onHide={() => this.setState({show: false })}>
        <ModalHeader closeButton>
          <ModalTitle>{modalTitle}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
          <Form.Group className="mb-3" controlId="recipeNameTextBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Recipe Name Here"
                value={name}
                onChange={e => this.setState({name: e.target.value })}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeIngredientsTextBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Recipe Ingredients Here"
                value={ingredients}
                onChange={e => this.setState({ingredients: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeInstructionsTextBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Recipe Instructions Here"
                value={instructions}
                onChange={e => this.setState({instructions: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeServingSizeTextBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Recipe Serving Size Here"
                value={servingSize}
                onChange={e => this.setState({servingSize: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeCategoryBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Recipe Category Here"
                value={category}
                onChange={e => this.setState({category: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeNotesTextBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Recipe Notes Here"
                value={notes}
                onChange={e => this.setState({notes: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeDateAddedTextBox">
                <Form.Control
                type="textarea"
                placeholder="Insert Date Added (YYYY-MM-DD)"
                value={dateAdded}
                onChange={e => this.setState({dateAdded: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipeDateModifiedTextBox">
              <Form.Control
                type="textarea"
                placeholder="Insert Date Modified (YYYY-MM-DD)"
                value={dateModified}
                onChange={e => this.setState({dateModified: e.target.value })}
              />
            </Form.Group>
            <Button variant="secondary" onClick={() => this.setState({show: false })}>
            Close
          </Button>
            {RecipeId == 0 ?
            <Button variant="primary" onClick={this.SaveRecipe}>
            Save Changes
            </Button>
            :null}

            {RecipeId != 0 ?
            <Button variant="primary" onClick={this.UpdateRecipe}>
            Edit Changes
            </Button>
            :null}      
          
          </Form>
        </ModalBody>
      </Modal>
            
            
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>
                            RecipeId
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Ingredients
                        </th>
                        <th>
                            Instructions
                        </th>
                        <th>
                            Serving Size
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Notes
                        </th>
                        <th>
                            Date Added
                        </th>
                        <th>
                            Date Modified
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(r =>
                    <tr key={r.RecipeId}>
                        <td> {r.RecipeId}</td>
                        <td>{r.Name}</td>
                        <td>{r.Ingredients}</td>
                        <td>{r.Instructions}</td>
                        <td>{r.serving_size}</td>
                        <td>{r.category}</td>
                        <td>{r.notes}</td>
                        <td>{r.dateAdded}</td>
                        <td>{r.dateModified}</td>
                        <Button type="button" onClick={() => this.EditRecipe(r)} className='btn btn-light mr-1'> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        </Button>
                        <Button type="button" onClick={() => this.DeleteRecipe(r.RecipeId)} className='btn btn-light mr-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg> 
                        </Button>
                    </tr> 
                        )}
                </tbody>

            </table>
            
        </div>
        </Container>
    )}
}

export default Recipes
