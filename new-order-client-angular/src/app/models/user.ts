export class User{
    name:string
    password:string


    getCredentials(){
        return `${this.name}:${this.password}`
    }
}