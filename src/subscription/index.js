import { PubSub } from "apollo-server"; //using apollo pubsub, other pubsubs can be used.
import * as MESSAGE_EVENTS from './messages';

export const  EVENTS = {
    MESSAGE: MESSAGE_EVENTS
}

export default new PubSub();

