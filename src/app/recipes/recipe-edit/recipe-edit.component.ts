import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
editMode = false;
recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) {   }

  ngOnInit(): void {
  this.route.params.subscribe(
  (params:Params)=>{
    this.id= +params['id'];
    this.editMode = params['id'] != null;
    console.log(this.editMode); 
    this.initForm();                                    // we call it here because that where the routeparams change because that indicates that we reoladed the page.
  }
);
  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }

  onSubmit(){
  // const newRecipe=new Recipe(
  //   this.recipeForm.value['name'],
  //   this.recipeForm.value['description'],
  //   this.recipeForm.value['imagePath'],
  //   this.recipeForm.value['ingredients'])
   if(this.editMode){
    this.recipeService.updateRecipe(this.id,this.recipeForm.value)
  }else{
    this.recipeService.addRecipe(this.recipeForm.value);
  }
  this.onCancel();
  }

  private initForm(){
       let recipeName="";
       let recipeImagePath="";
       let recipeDescription="";
       let recipeIngredients=new FormArray([]);

       if(this.editMode){
         const recipe=this.recipeService.getRecipe(this.id);
         recipeDescription=recipe.description;
         recipeImagePath=recipe.imagePath;
         recipeName=recipe.name;    
          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name':new FormControl(ingredient.name,Validators.required),
                  'amount': new FormControl(ingredient.amount,[
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          } 
         }                                            //access the name of the recipe and assign it here (i.e recipeName)
       
     
       this.recipeForm =new FormGroup({
         'name':new FormControl(recipeName,Validators.required),
         'description':new FormControl(recipeDescription,Validators.required),      // If we are in edit mode it will  assign the name of recipe we are currently editing or it will be assigned null if we are not in edit mode.
         'imagePath':new FormControl(recipeImagePath,Validators.required),
         'ingredients':recipeIngredients
       })
      
  }
  getControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
  this.router.navigate(['../'],{relativeTo: this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
}
  


