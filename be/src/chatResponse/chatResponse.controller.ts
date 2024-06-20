import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatResponseService } from './chatResponse.service';

@Controller('chatResponse')
export class WebhookController {
  constructor(private readonly chatResponseService: ChatResponseService) {}

  @Post()
  handleWebhook(@Body() requestBody: any): any {
    // Parse request body
    const intent = requestBody.queryResult.intent.displayName;
    const parameters = requestBody.queryResult.parameters;
    // const output_contexts = requestBody.outputContexts;

    if (intent === 'customer.price') {
      const price = parameters.number;
      console.log(price);

      const response = {
       // fulfillmentText: `I can paying $${price}. Would you be willing to accept this price?`,

        // outputContexts": [
        //     {
        //       name: "projects/lmbtest-9vbo/agent/sessions/f6b5af72-f381-c224-22a2-5b51434a187a/contexts/ongoing-localhost-chat",
        //       ifespanCount: 1,
        //       parameters: {
        //         number: price
        //       }
        //     }
        //   ]
        outputContexts: [
          {
            name: 'projects/lmbtest-9vbo/agent/sessions/f6b5af72-f381-c224-22a2-5b51434a187a/contexts/ongoing-localhost-chat',
            lifespanCount: 1,
            parameters: {
              number: price, // Pass the price as a parameter to the localhost_price context
            },
          },
        ],
      };

      //   const response = {
      //     fulfillmentText: 'I am offering $60. Would you be willing to accept this price?'

      //   };

      return response;
    }
    // else if (intent === 'localhost.price') {

    //   const response = {
    //     fulfillmentText: 'I can paying $45. Would you be willing to accept this price?'
    //   };

    //   return response;
    // }
  }
}
