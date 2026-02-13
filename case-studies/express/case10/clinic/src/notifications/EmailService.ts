import {NotificationService} from "./NotificationService";
import {Service} from "typedi";

@Service()
export class EmailService implements NotificationService
{
async send(to:string,message:string):Promise<void>
{
console.log(`Email sent to ${to}:${message}`);
}
}