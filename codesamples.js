function createInvoice (product) {
  return {
      provider_token: '9479142a-1a3f-4579-8259-bdff895f5188',
      start_parameter: 'foo',
      title: product.name,
      description: product.description,
      currency: 'KZT',
      photo_url: product.photoUrl,
      is_flexible: false,
      need_shipping_address: false,
      prices: [{ label: product.name, amount: Math.trunc(product.price * 100) }],
      payload: {}
  }
}

// Start command
slimbot.command('start', ({ reply }) => reply('Welcome, nice to meet you! I can sell you various products. Just ask.'))

// Show offer
slimbot.hears(/^what.*/i, ({ replyWithMarkdown }) => replyWithMarkdown(`
You want to know what I have to offer? Sure!
${products.reduce((acc, p) => {
  return (acc += `*${p.name}* - ${p.price} €\n`)
  }, '')}    
What do you want?`,
  Markup.keyboard(products.map(p => p.name)).oneTime().resize().extra()
))

// Order product
products.forEach(p => {
  slimbot.hears(p.name, (data) => {
      console.log(`${ctx.from.first_name} is about to buy a ${p.name}.`);
      data.sendInvoice(createInvoice(p))
  })
})

// Handle payment callbacks
slimbot.on('pre_checkout_query', ({ answerPreCheckoutQuery }) => answerPreCheckoutQuery(true))
slimbot.on('successful_payment', (ctx) => {
  console.log(`${ctx.from.first_name} (${ctx.from.username}) just payed ${ctx.message.successful_payment.total_amount / 100} €.`)
})


++++++++++++++++++++++++++++++++++++++++++++++++++++++++


slimbot.on(/pay/i, function (message) {
    var iKeys = [];
    iKeys.push([{
      text: "2 €",
      callback_data: "pay:2.00"
    },{
      text: "10 €",
      callback_data: "pay:10.00"
    }]);
  
    slimbot.sendMessage(message.chat.id, "Select an amount to pay", {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: iKeys
      }
    });
  });
  
  slimbot.on('callback_query', function (message) {
    var StripeToken = "9479142a-1a3f-4579-8259-bdff895f5188";
    var func = text.split(":")[0];
    var param = text.split(":")[1];
    if (func == "pay") {
      var payload = player_id + Date.now() + param;	// you can use your own payload
      var prices = [{
        label: "Donation",
        amount: parseInt(param.replace(".", ""))	// if you have a decimal price with . instead of ,
      }];
      slimbot.sendInvoice(message.from.id, "Donation", "Donation of " + param + "€", payload, StripeToken, "pay", "EUR", prices);	// send invoice button to user
      // remember to save payload and user data in db, it will be useful later
      // usually i save Payload and Status = WAIT
    }
  });
  
  slimbot.on('message', function (message) {
    if (message.successful_payment != undefined) {
      var savedPayload = "yyy";	// get from db
      var savedStatus = "zzz";	// get from db, this should be "WAIT"
      if ((savedPayload != message.successful_payment.invoice_payload) || (savedStatus != "WAIT")) {	// match saved data to payment data received
        slimbot.sendMessage(message.chat.id, "Payment verification failed");
        return;
      }
      
      // payment successfull
      slimbot.sendMessage(message.chat.id, "Payment complete!");
    }
  });