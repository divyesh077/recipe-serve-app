const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fileUpload = require('express-fileupload');

const Recipe = require('./data/recipes/recipes');
const Ingredients = require('./data/ingredients/ingredients');

const recipeObj = new Recipe();
const ingredientObj = new Ingredients();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());
app.use(fileUpload());


app.get("/", (req, res) => {
    res.send('Hello World')
})

app.post("/upload", (req, res, next) => {
    res.status(200).json({
        data: req.files
    })
})
app.get("/recipes", (req, res) => {
    const recipes = recipeObj.getRecipes();
    if (recipes) {
        res.json(recipes);
    }
    else {
        res.json({msg:"reipes is not availble."})
    }
    
})
app.get("/recipes/:id", (req, res) => {
    const id = req.params.id ;
    const recipe = recipeObj.getRecipe(id);
    if (recipe) {
       res.json(recipe); 
    }
    else {
        res.json({msg:"reipe is not availble."})
    }
    
})
app.post("/recipes", (req, res) => {
    recipeObj.addRecipe(req.body)
    res.json({
        message:"Recipe Add to db."
    })
})
app.patch("/recipes/:id", (req, res) => {
    const id = req.params.id;
    const updatedRecipe = recipeObj.updateRecipe(id,req.body)
    res.json(updatedRecipe);
})
app.delete("/recipes", (req, res) => {
    recipeObj.deleteRecipes();
    res.json({
        msg:"recipes deleted."
    })
})
app.delete("/recipes/:id", (req, res) => {
    const id = req.params.id;
    recipeObj.deleteRecipe(id);
    res.json({
        msg:`recipe with id ${id} is deleted.`
    })
})

app.get("/ingredients", (req, res) => {
    const ingredients = ingredientObj.getIngredients();
    if (ingredients) {
        res.json(ingredients)
    }
    else {
        res.json({msg:"ingredients is not availble."})
    }
})

app.get("/ingredients/:id", (req, res) => {
    const id = req.params.id ;
    const ingredient = ingredientObj.getIngredient(id);
    if (ingredient) {
        res.json(ingredient)
    }
    else {
        res.json(null)
    }
})
app.post("/ingredients", (req, res) => {
    const {
        id,
        name,
        amount
    } = req.body;

    const ingredient = { id: id, name: name, amount, amount };
    const newIngredient = ingredientObj.addIngredient(ingredient);
    if (newIngredient) {
        res.json(newIngredient);
    }
    else {
        res.json({
            code: "NOT_ADDED",
            message:"Ingredient is not added!!!"
        })
    }
})
app.put("/ingredients/:id", (req, res) => {
    const { id, name, amount } = req.body;
    const ingredient = {id,name,amount}
    const updatedIngredient = ingredientObj.updateIngredient(req.params.id, ingredient);
    if (updatedIngredient) {
        res.json(updatedIngredient);
    }
    else {
        res.json(null);
        // res.json({
        //     code: "NOT_UPDETED",
        //     message:"Ingredient is not updated!!!"
        // })
    }
    
})
app.delete("/ingredients/:id", (req, res) => {
    const ingredientDeleted = ingredientObj.deleteIngredient(req.params.id);
    if (ingredientDeleted) {
        res.json({ingredientDeleted});
    }
    else {
        res.json(null);
        // res.json({
        //     code: "NOT_DELETED",
        //     message:"Ingredient is not deleted!!!"
        // })
    }
    
})
app.delete("/ingredients", (req, res) => {
    ingredientObj.deleteIngredinets();
    res.json('ingredients deleted');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server has started at PORT ${PORT}`)
})