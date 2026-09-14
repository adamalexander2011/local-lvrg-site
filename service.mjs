export const services = {
  website: {
    number:'01', label:'WEBSITE CHAT', title:'They’re on your site.\nKeep them talking.',
    body:'Someone’s on your site with a question. We answer in the chat and help them take the next step. We can also follow up on website forms once connected.',
    incoming:'Hi! Can I get an estimate?', reply:'Absolutely. What do you need help with, and where is the job?',
    result:'Get the details. Help them move forward.', foot:'They have a question. Keep the conversation going.', selected:'Website messages', email:'website messages'
  },
  sms: {
    number:'02', label:'TEXT MESSAGES', title:'They text.\nWe text back.',
    body:'A text comes in while you’re busy. We reply, answer the routine questions and help them book using your rules. Follow-up is handled where permission allows.',
    incoming:'Hey, just checking on that estimate.', reply:'Sure. What would you like to know about it?',
    result:'Keep the conversation moving.', foot:'SMS follow-up, without a phone call.', selected:'Text messages', email:'SMS conversations'
  },
  facebook: {
    number:'03', label:'FACEBOOK MESSENGER', title:'They message your Page.\nWe reply.',
    body:'Someone sees your post and asks about your service. We handle the messages on your connected business Page and help them take the next step, within Facebook’s rules.',
    incoming:'Saw your post. How do I get started?', reply:'What do you need help with?',
    result:'Turn the question into a next step.', foot:'For messages to your connected business Page.', selected:'Facebook Messenger', email:'Facebook Messenger'
  },
  instagram: {
    number:'04', label:'INSTAGRAM DMs', title:'They like your work.\nNow they’ve got a question.',
    body:'Don’t leave the next question sitting in your DMs. We handle messages on your connected business account and help people move forward, within Instagram’s rules.',
    incoming:'Love the work. Do you cover my area?', reply:'What city or ZIP code is the job in?',
    result:'Check the fit. Help them move forward.', foot:'Business DMs handled in writing.', selected:'Instagram DMs', email:'Instagram DMs'
  },
  whatsapp: {
    number:'05', label:'WHATSAPP', title:'They use WhatsApp?\nMeet them there.',
    body:'If your customers use WhatsApp, we can handle conversations through a supported WhatsApp Business connection. We check permissions and message types during setup.',
    incoming:'Can I book an appointment here?', reply:'Yes, I can help with the next step. Which service do you need?',
    result:'Use your process. Handle it in writing.', foot:'WhatsApp Business connection required.', selected:'WhatsApp conversations', email:'WhatsApp conversations'
  },
  email: {
    number:'06', label:'EMAIL', title:'Another email to answer.\nWe’ve got the routine ones.',
    body:'A question lands in your inbox. We answer and follow up through a supported email connection, using your business details. Anything that needs your judgment comes back to you.',
    incoming:'I have a few questions before I book.', reply:'Sure. What would you like to know?',
    result:'Useful answers. Clear next steps.', foot:'Email is written follow-up too.', selected:'Email messages', email:'email messages'
  }
};
export function validChoice(value){return Object.hasOwn(services,value)?value:'website'}
export function emailFor(choice){
  const service=services[validChoice(choice)];
  const subject='Question about '+service.email;
  const body='Hi Adam,\n\nI saw the $297 monthly service with the $500 setup waived. I’d like to ask about '+service.email+' for my business, [business name]. My website is [website].\n\nHere’s what I’d like to know: [your question].\n\nThanks!';
  return 'mailto:hello@locallvrg.co?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}
