import * as amqp from 'amqplib';

class RabbitMqWrapper {
    private _connection: amqp.Connection | null = null;

    get conn() {
      if (!this._connection) throw new Error("Cannot access MQ before connecting");
      return this._connection;
    }

    async connect(url: string) {
      try {
        this._connection = await amqp.connect(url);
        console.log("Connected @", new Date());

        if (this.conn) {
            // todo: send alert, connected
            // listeners
        }

        this._connection.on("close", () => {
            // todo: send alert
            console.error('Connection to RabbitMQ closed. Reconnecting...', new Date());
            setTimeout(() => this.connect(url), 10000);
        });
      } catch (error) {
        // @ts-ignore
        console.error(error?.message, new Date());
        setTimeout(() => this.connect(url), 10000);
      }
    }
}

export const rabbitMqWrapper = new RabbitMqWrapper();