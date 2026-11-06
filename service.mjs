export const services = {
  website: {
    number:'01', label:'WEBSITE CHAT', title:'They’re on your site.\nKeep them talking.',
    body:'Your visitor has a question. You’re busy doing the actual work. Your AI sales employee handles the chat and helps with the next step. Website form follow-up can be added once connected.',
    incoming:'Hi! Can I get an estimate?', reply:'Absolutely. What do you need help with, and where is the job?',
    result:'Get the details. Help them move forward.', foot:'They have a question. Keep the conversation going.', selected:'Website messages', email:'website messages'
  },
  sms: {
    number:'02', label:'TEXT MESSAGES', title:'Your customer texts.\nYour reply is handled.',
    body:'You’ve got work to do. Your customer’s text still needs an answer. Your AI sales employee handles routine questions and helps with booking, using your rules. Follow-up stays within the permissions you have.',
    incoming:'Hey, just checking on that estimate.', reply:'Sure. What would you like to know about it?',
    result:'Keep the conversation moving.', foot:'SMS follow-up, without a phone call.', selected:'Text messages', email:'SMS conversations'
  },
  facebook: {
    number:'03', label:'FACEBOOK MESSENGER', title:'Your Page gets a message.\nYour customer gets a reply.',
    body:'Your post got their attention. Now they’ve got questions. Your AI sales employee handles messages on your connected business Page and helps with the next step, within Facebook’s rules.',
    incoming:'Saw your post. How do I get started?', reply:'What do you need help with?',
    result:'Turn the question into a next step.', foot:'For messages to your connected business Page.', selected:'Facebook Messenger', email:'Facebook Messenger'
  },
  instagram: {
    number:'04', label:'INSTAGRAM DMs', title:'They like your work.\nNow they’ve got a question.',
    body:'You shouldn’t have to keep checking your DMs between jobs. Your AI sales employee handles messages on your connected business account and helps customers take the next step, within Instagram’s rules.',
    incoming:'Love the work. Do you cover my area?', reply:'What city or ZIP code is the job in?',
    result:'Check the fit. Help them move forward.', foot:'Business DMs handled in writing.', selected:'Instagram DMs', email:'Instagram DMs'
  },
  whatsapp: {
    number:'05', label:'WHATSAPP', title:'They use WhatsApp?\nMeet them there.',
    body:'Your customers use WhatsApp? Your routine questions and follow-up can be handled there through a supported WhatsApp Business connection. Your permissions and message types get checked during setup.',
    incoming:'Can I book an appointment here?', reply:'Yes, I can help with the next step. Which service do you need?',
    result:'Use your process. Handle it in writing.', foot:'WhatsApp Business connection required.', selected:'WhatsApp conversations', email:'WhatsApp conversations'
  },
  email: {
    number:'06', label:'EMAIL', title:'Your inbox keeps filling.\nYour routine replies are handled.',
    body:'Another email to answer after a full day’s work. Your AI sales employee handles routine replies and follow-up through a supported connection, using your approved information. Anything that needs your judgment comes back to you.',
    incoming:'I have a few questions before I book.', reply:'Sure. What would you like to know?',
    result:'Useful answers. Clear next steps.', foot:'Email is written follow-up too.', selected:'Email messages', email:'email messages'
  }
};
export function validChoice(value){return Object.hasOwn(services,value)?value:'website'}
export function emailFor(choice){
  const service=services[validChoice(choice)];
  const subject='Question about '+service.email;
  const body='Hi Adam,\n\nI’d like to ask about '+service.email+' for my business, [business name]. My website is [website].\n\nHere’s what I’d like to know: [your question].\n\nThanks!';
  return 'mailto:Adam@localLVRG.co?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}
