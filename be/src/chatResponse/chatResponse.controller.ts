import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatResponseService } from './chatResponse.service';

@Controller('chatResponse')
export class WebhookController {
  constructor(private readonly chatResponseService: ChatResponseService) {}

  @Post()
  handleWebhook(@Body() requestBody: any): any {
    // Parse request body
    const intent = requestBody.queryResult.intent.displayName;

    if (intent === 'Default Welcome Intent') {
      // Handle default welcome intent
      const response = {
        fulfillmentText: 'Welcome to our chatbot! How can I assist you today?',
      };
      return response;
    } else {
      // Handle other intents
      // Process intent and parameters
      // Perform necessary actions based on the intent and parameters

      // Construct response
      const response = {
        fulfillmentText: 'This is a sample response from NestJS backend.',
      };

      // Send response to Dialogflow
      return response;
    }
  }
}
