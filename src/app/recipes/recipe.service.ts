import{ Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import{ShoppingListService} from '../shopping-list/shopping-list.service'; 
import{Recipe} from './recipe.model';

@Injectable()
export class RecipeService{

  recipesChanged =new Subject<Recipe[]>()


  private recipes: Recipe[]=[];
  //   private recipes: Recipe[] =[
  //  new Recipe('Tacos Árabes','This is simply a test','https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F03%2F19%2Fbirria-tacos-FT-RECIPE0420-1.jpg',[
  //          new Ingredient('Beer',1),
  //          new Ingredient('Salad',1)
  //  ]),
  //   new Recipe('Poached eggs and waffles brunch','This is simply a test','https://simply-delicious-food.com/wp-content/uploads/2018/10/breakfast-board-2.jpg',[
  //   new Ingredient('Waffles',4),
  //   new Ingredient('Back-coffee',1)
  //  ])
  // ];


constructor(private slService: ShoppingListService){}

setRecipes(recipes:Recipe[]){
  this.recipes=recipes;
  this.recipesChanged.next(this.recipes.slice())
}


  getRecipes(){
      return this.recipes.slice();
  }

  getRecipe(id:number){
    return this.recipes[id];
  }

addIngredientsToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients);
}

addRecipe(recipe:Recipe){                           // on this line yuo are ecpexting a recipe to be recieved and once you recive u will push it on that array recipes as a addrecipe.
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice());    // emits a copy of updated recipe.
}

updateRecipe(index:number,newRecipe:Recipe){                      
this.recipes[index]=newRecipe; 
this.recipesChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipesChanged.next(this.recipes.slice());
}



}


