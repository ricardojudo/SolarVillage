export class User{
    name:string
    password:string


    getCredencials(){
        return `${this.name}:${this.password}`
    }
}