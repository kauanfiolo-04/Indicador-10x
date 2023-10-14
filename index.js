import { config } from 'dotenv'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

config()

const bot = new Telegraf(process.env.BOT_TOKEN)
let interaction=0

bot.start(async(ctx)=>{
  interaction=0
  await ctx.telegram.sendMessage(ctx.message.chat.id, `
    <pre>Olá ${ctx.message.chat.username || ctx.message.chat.first_name}!</pre>
    Gostaria de Receber acesso <b>Vitalício</b> do Nosso indicador de sinais?
  `, {parse_mode:'HTML'})

  await ctx.telegram.sendMessage(ctx.message.chat.id, `
    Caso queira reiniciar a interação com o bot envie:<b>/start</b>
  `, {parse_mode:'HTML'})
})

bot.on(message("text"), async(ctx)=>{
  //é a primeira interação?
  if(interaction===0 && ctx.message.text.toUpperCase()==='SIM'){
    await ctx.telegram.sendMessage(ctx.message.chat.id, `
      Para receber o acesso deve se cadastrar neste link:<a href="#">Tigrinho Gaspar</a>
    `, {parse_mode:'HTML'})

    await ctx.telegram.sendMessage(ctx.message.chat.id, `
      <pre>Eae, se cadastrou?</pre>
      <pre>Então envie um sim</pre>
    `, {parse_mode:'HTML'})
    interaction++
  } else if(interaction===1 && ctx.message.text.toUpperCase()==='SIM'){
    await ctx.telegram.sendMessage(ctx.message.chat.id, `
      <pre>Envie o comprovante do deposito feito, por gentileza!</pre>
    `, {parse_mode:'HTML'})
    interaction++
  }
})

bot.on(message("photo"),async(ctx)=>{
  if(interaction===2){
    await ctx.telegram.sendMessage(ctx.message.chat.id, `
        Aqui está seu acesso : <a href="#">sexo</a> basta clicar em se cadastrar gratuitamente e aguardar uma mensagem no e-mail cadastrado com uma senha temporária, na qual vai mudar assim que fizer o primeiro login
    `, {parse_mode:'HTML'})
    interaction++
  }
})

// bot.on('data', async (ctx) => {
//   console.log(ctx.data)

//   // Explicit usage
//   await ctx.telegram.answerCbQuery(ctx.data)

//   await ctx.reply(`batata ${ctx.answerCbQuery.name}`)

//   // Using context shortcut
//   await ctx.answerCbQuery()
// })

// bot.on('inline_query', async (ctx) => {
//   const result = []
//   // Explicit usage
//   await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

//   // Using context shortcut
//   await ctx.answerInlineQuery(result)
// })

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))