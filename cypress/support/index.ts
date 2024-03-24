declare namespace Cypress{
    interface Chainable{
        openHomePage:()=>void;
        generateString:(length:number)=>string;
        generatePhoneNumber:(length:number)=>string;
    }
}