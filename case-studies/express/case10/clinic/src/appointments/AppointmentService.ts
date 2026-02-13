import {Service,Inject} from "typedi";
import {NotificationService} from "../notifications/NotificationService";
import {SMSService} from "../notifications/SMSService";
import {BillingService} from "../billing/BillingService";
import {StripeBillingService} from "../billing/StripeBillingService";

@Service()
export class AppointmentService
{
constructor(
@Inject(()=>SMSService) private notifier:NotificationService,
@Inject(()=>StripeBillingService) private billing:BillingService,
){}

bookAppointment(patient:string,time:string,amount:number)
{
this.billing.charge(patient,amount);
this.notifier.send(patient,`Appointment Confirmed for ${time}`);
return {status:"confirmed",patient,time};
}

}