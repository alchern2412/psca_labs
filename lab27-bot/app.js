// ProcessingInstruction.env.NTBA_FIX_319 = 1

const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '927632719:AAG3BOInkStttQt8F6BjCevCqo1NkZ0p_PM'

const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on('message', msg => {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, `echo ${msg.text}`)
})









