import { Controller, Get, Provide } from '@midwayjs/core';

@Provide()
@Controller()
export class HomeController {
  @Get('/locals')
  async render(ctx) {
    return await ctx.render('locals.xtpl', {
      data: 'world',
    });
  }
}
