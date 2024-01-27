import * as amqp from "amqplib/callback_api";
import {
  Subjects,
  ConsumerBase,
  AppnameUserCreatedEvent,
} from "@com.xcodeclazz/mq";

export class AppnameUserCreatedConsumer extends ConsumerBase<AppnameUserCreatedEvent> {
  protected subject: Subjects.USER_CREATED_TO_APPNAME = Subjects.USER_CREATED_TO_APPNAME;
  protected onParsedData(queue: string, message: amqp.ConsumeMessage | null, data: AppnameUserCreatedEvent["data"]): void {
    // console.log("appname", queue, message?.content.toString(), data);
  }
}
