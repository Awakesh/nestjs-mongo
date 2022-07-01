import { User } from "src/users/schemas/user.schema"

export const userStub = ():User => {
  return {
    userId:'123',
    email:'awakeshkumarsingh@gmail.com',
    age:25,
    favoriteFoods:['apple','pizza']
  }
}
export const updateData = ():User =>{
  return {
    userId:'123',
    email:'awakeshkumarddddddddsingh@gmail.com',
    age:257,
    favoriteFoods:['apple','pizza']
  }
}
