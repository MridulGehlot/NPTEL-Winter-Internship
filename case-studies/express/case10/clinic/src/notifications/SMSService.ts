import {NotificationService} from "./NotificationService";
import {Service} from "typedi";

@Service()
export class SMSService implements NotificationService
{
async send(to:string,message:string):Promise<void>
{
console.log(`SMS sent to ${to}:${message}`);
}
}