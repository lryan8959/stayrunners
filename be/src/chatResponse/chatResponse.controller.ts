import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatResponseService } from './chatResponse.service';

@Controller('chatResponse')
export class WebhookController {
  constructor(private readonly chatResponseService: ChatResponseService) {}

  @Post()
  handleWebhook(@Body() requestBody: any): any {
    // Parse request body
    const intent = requestBody.queryResult.intent.displayName;

    if (intent === 'customer.price') {
      // Handle default welcome intent
      const response = {
        fulfillmentText: 'I am offering $60. Would you be willing to accept this price?'
        // fulfillmentMessages: [
        //   {
        //     text: {
        //       text: [
        //         'Welcome to our chatbot! How can I assist you today??'
        //       ]
        //     }
        //   }
        // ]
      };
   
      return response;
    } else if (intent === 'localhost.price') {
      // Handle other intents
      // Process intent and parameters
      // Perform necessary actions based on the intent and parameters

      // Construct response
      const response = {
        fulfillmentText: 'I can paying $45. Would you be willing to accept this price?'
      };

      // Send response to Dialogflow
      return response;
    }
  }
}
