export class User {
    username: string
    assetsFunded: number
    
    constructor(_username: string, _assetFunded: number){
        this.username = _username;
        this.assetsFunded = _assetFunded
    }
    
}