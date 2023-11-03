import { Kafka, logLevel } from "kafkajs";

// Singleton Class<KAFKA>
class KafkaWrapper {
  private _kafka?: Kafka;

  get kafka() {
    if (!this._kafka) throw new Error("Cannot access KAFKA before connecting");
    return this._kafka;
  }

  init(clientId: string, brokers: string[]) {
    this._kafka = new Kafka({
      logLevel: logLevel.ERROR,
      clientId: clientId,
      brokers: brokers,
      connectionTimeout: 10000,
      enforceRequestTimeout: false,
    });
  }
}

export const kafkaWrapper = new KafkaWrapper();
