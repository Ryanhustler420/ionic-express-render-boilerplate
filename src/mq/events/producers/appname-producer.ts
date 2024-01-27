import * as amqp from "amqplib";
import {
  Subjects,
  ProducerBase,
  LiveUserCreatedEvent,
  AppnameUserCreatedEvent,
} from "@com.xcodeclazz/mq";

export async function sendToAll(c: amqp.Connection, d: AppnameUserCreatedEvent["data"]) {
  try {
    new LiveUserCreatedProducer(c).send_to_queue(d);
    // new PaymentUserCreatedProducer(c).send_to_queue(d);
  } catch(error) {
    // @ts-ignore
    console.log(error?.message);
  }
}

// export class PaymentUserCreatedProducer extends ProducerBase<PaymentUserCreatedEvent> {
//   protected subject: Subjects.USER_CREATED_TO_PAYMENT = Subjects.USER_CREATED_TO_PAYMENT;
// }

export class LiveUserCreatedProducer extends ProducerBase<LiveUserCreatedEvent> {
  protected subject: Subjects.USER_CREATED_TO_LIVE = Subjects.USER_CREATED_TO_LIVE;
}
