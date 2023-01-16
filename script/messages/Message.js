import * as core from "../core.js";

/**
 * How important the message is
 * @param {String} HIGH - gets sent right away
 * @param {String} NORMAL - it gets put in the normal message queue
 */
export const MessagePriority = {
  HIGH: "HIGHT",
  NORMAL: "NORMAl",
};

/**
 * Message template,
 */
export class Message {
  /**
   * @param {String} code - Name of the message (should be unique).
   * @param {any} sender - Who sends the message (like a class "this").
   * @param {any?} context - [OPTIONAL] Sends context across files, might be used in some cases.
   * @param {MessagePriority} priority - How important the actual message is. (HIGH / NORMAL)
   */
  constructor(code, sender, context, priority = MessagePriority.NORMAL) {
    this.code = code;
    this.context = context;
    this.sender = sender;
    this.priority = priority;
  }

  /**
   * CONVENIENCE METHOD; Sends a normal priority message to the MessageBus (MessagePriority.NORMAL)
   * @param {String} code - Name of the message (should be unique).
   * @param {any} sender - Who sends the message (like a class "this").
   * @param {any?} context - [OPTIONAL] Sends context across files, might be used in some cases.
   */
  static Send(code, sender, context) {
    core.MessageBus.Post(
      new Message(code, sender, context, MessagePriority.NORMAL)
    );
  }

  /**
   * CONVENIENCE METHOD; Sends a high message priority to the MessageBus (MessagePriority.HIGH)
   * @param {String} code - Name of the message (should be unique).
   * @param {any} sender - Who sends the message (like a class "this").
   * @param {any?} context - [OPTIONAL] Sends context across files, might be used in some cases.
   */
  static SendPriority(code, sender, context) {
    core.MessageBus.Post(
      new Message(code, sender, context, MessagePriority.HIGH)
    );
  }

  /**
   * CONVENIENCE METHOD: Subscribes the message
   * @param {String} code - Name of the message (should be unique).
   * @param {core.IMessageHandler} handler - Handler for the message, must have the OnMessage method (takes as argument "message")
   */
  static Subscribe(code, handler) {
    core.MessageBus.AddSubscription(code, handler);
  }

  /**
   * CONVENIENCE METHOD: Removes the message
   * @param {String} code - Name of the message that should be removed.
   * @param {core.IMessageHandler} handler - Handler for the message.
   */
  static Unsubscribe(code, handler) {
    core.MessageBus.RemoveSubscription(code, handler);
  }
}
