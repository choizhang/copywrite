'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';

    // let result = await this.app.mysql.get("5g_outlet",{id:1})
    // console.log('result', result)
    // await this.ctx.render('home')
  }

  async add() {
    console.log(this.ctx.request.body)
  }
}

module.exports = HomeController;
