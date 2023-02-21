class Ingredient{
    constructor() {
        this.ingredients = [
            {
                id: "1",
                name:'bread',
                amount:5
            },
            {
                id: "2",
                name:'apple',
                amount:10
            },
            {
                id: "3",
                name:'milk',
                amount:2
            },
            {
                id: "4",
                name:'toast',
                amount:15
            },
            {
                id: "5",
                name:'tomato',
                amount:3
            }
        ]
    }
    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
        return ingredient.id;
    }
    getIngredients() {
        return this.ingredients;
    }
    getIngredient(id) {
        //console.log(id);
        const ingredient = this.ingredients.find((ingredient) => {
            return ingredient.id === id;
        })
        return ingredient;
    }
    updateIngredient(id, newIngredient) {
        const ingredient = this.getIngredient(id);
        if (ingredient) {
            ingredient.name = newIngredient.name;
            ingredient.amount = newIngredient.amount;
            return ingredient;
        }
        return null;
    }
    deleteIngredient(id) {
       const ingredient = this.getIngredient(id);
        if (ingredient) {
            const idx = this.ingredients.indexOf(ingredient);
            if (idx > -1) {
                this.ingredients.splice(idx, 1);
                return ingredient;
            }
        } 
        return null;
    }
    deleteIngredinets() {
        this.ingredients.splice();
    }
}
    
module.exports = Ingredient;