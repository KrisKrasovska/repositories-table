export type BeanType = {
  beanId: string
  flavorName: string
  imageUrl: string
  description: string
}
export type BeanCard = {
  beanId: string
  groupName: string[]
  ingredients: string[]
  flavorName: string
  description: string
  colorGroup: string
  backgroundColor: string
  imageUrl: string
  glutenFree: boolean
  sugarFree: boolean
  seasonal: boolean
  kosher: boolean
}

export type FactsType = {
  factId: string
  title: string
  description: string
}

export type CombinationType = {
  combinationId: number
  name: string
  tag: string[]
}

export type MileStone = {
  mileStoneId: number
  year: number
  description: string
}

export type RecipeType = {
  recipeId: number
  name: string
  description: string
  prepTime: string
  cookTime: string
  totalTime: string
  makingAmount: string
  imageUrl: string
  ingredients: string[]
  additions1: string[]
  additions2: string[]
  additions3: string[]
  directions: string[]
  tips: string[]
}
