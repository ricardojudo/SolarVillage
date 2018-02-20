export class User{
    name:string
    password:string
    kieServerHost:string
    kieContainerName:string


    getCredentials(){
        return `${this.name}:${this.password}`
    }
}