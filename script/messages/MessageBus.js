import * as core from "../core.js";
/**
 * Simple template for a handler
 * Has a OnMessage function
 */
export class IMessageHandler {
  /**
   * @param {core.Message} message - The message that gets sent
   */
  OnMessage(message) {}
}

/** */
export class MessageSubscriptionNode {
  /**
   *
   * @param {core.Message} message
   * @param {core.IMessageHandler} handler
   */
  constructor(message, handler) {
    this.message = message;
    this.handler = handler;
  }
}

/**
 * Transfers data from a location to another
 * STATIC
 */
export class MessageBus {
  /**
   * @param {object} MessageBus.subscriptions - Looks like this {[code: string]: IMessageHandler}
   */
  static subscriptions = {};
  static normalQueueMessagePerUpdate = 10;
  static normalMessageQueue = [];

  /**
   * Add a subscription to the MessageBus.subscriptions object / Checks for duplicates [if found it prints to the console].
   *
   * @param {String} code - Name of the message to be registered by.
   * @param {core.IMessageHandler} handler - Handler for the message, has a OnMessage function which is important
   */
  static AddSubscription(code, handler) {
    const subscriptions = MessageBus.subscriptions; //Small util

    //Check for duplicates
    if (subscriptions[code] === undefined) {
      subscriptions[code] = [];
    }

    if (subscriptions[code].indexOf(handler) !== -1) {
      console.warn(
        `Unable to add a duplicate handler to code: ${code}. No subscription added`
      );
    } else {
      subscriptions[code].push(handler);
    }
  }

  /**
   * @param {String} code - Name of the message to be removed.
   * @param {core.IMessageHandler} handler - Handler for the message.
   */
  static RemoveSubscription(code, handler) {
    const subscriptions = MessageBus.subscriptions; //Small util
    const nodeIndex = subscriptions[code].indexOf(handler);

    //Check if the subscription exists
    if (subscriptions[code] === undefined) {
      console.warn(
        `Cannot unsubscribe handler with code: ${code}, the handler isn't subscribed`
      );

      return;
    }

    if (nodeIndex !== -1) {
      subscriptions[code].splice(nodeIndex, 1);
    }
  }

  /**
   * Posts a message to the normal queue with a normal priority (MessagePriority.NORMAL)
   *
   * @param {core.Message} message
   */
  static Post(message) {
    //DEBUG Info
    // console.log("Posted a message: ", message);

    const handlers = MessageBus.subscriptions[message.code];

    if (handlers === undefined) return;

    for (const h of handlers) {
      // console.log("Current handler: ", h);

      if (message.priority === core.MessagePriority.HIGH) {
        h.OnMessage(message);
      } else {
        MessageBus.normalMessageQueue.push(
          new core.MessageSubscriptionNode(message, h)
        );
      }
    }
  }

  /**
   * Updates.
   *
   * @param {Number} time
   */
  static Update(time = 0) {
    //No message no method
    if (MessageBus.normalMessageQueue.length === 0) return;

    const messageLimit = Math.min(
      MessageBus.normalQueueMessagePerUpdate,
      MessageBus.normalMessageQueue.length
    );

    for (let i = 0; i < messageLimit; i++) {
      const node = MessageBus.normalMessageQueue.pop();

      node.handler.OnMessage(node.message);
    }
  }
}
