export const services = {
  website: {
    number:'01', label:'WEBSITE CHAT', title:'They’re on your site.\nKeep them talking.',
    body:'Answer questions in your website chat and help visitors take the next step. Website form inquiries can also feed your follow-up once connected.',
    incoming:'Hi! Can I get an estimate?', reply:'Absolutely. What do you need help with, and where is the job?',
    result:'Get the details. Offer the next step.', foot:'Your website. A conversation that goes somewhere.', selected:'Website inquiries', email:'website inquiries'
  },
  sms: {
    number:'02', label:'TEXT MESSAGES', title:'They text.\nWe text back.',
    body:'Handle incoming texts, follow up with eligible leads and arrange appointments or estimates using your business facts and booking rules.',
    incoming:'Hey, just checking on that estimate.', reply:'Happy to help. What questions can I answer before we work out the next step?',
    result:'Keep the conversation moving.', foot:'SMS follow-up, without a phone call.', selected:'Text messages', email:'SMS conversations'
  },
  facebook: {
    number:'03', label:'FACEBOOK MESSENGER', title:'A message to your Page.\nA useful reply.',
    body:'Reply to people messaging your connected Facebook Page. Answer routine questions and guide them toward booking, within the channel’s messaging rules.',
    incoming:'Saw your post. How do I get started?', reply:'Glad you reached out. What are you looking for help with?',
    result:'Turn the question into a next step.', foot:'For messages to your connected business Page.', selected:'Facebook Messenger', email:'Facebook Messenger'
  },
  instagram: {
    number:'04', label:'INSTAGRAM DMs', title:'Interest in the DMs.\nKeep it moving.',
    body:'Handle incoming DMs on your connected Instagram business account. Help prospects get answers and a clear next step, within Instagram’s messaging rules.',
    incoming:'Love the work. Do you cover my area?', reply:'Thanks for reaching out. What city or ZIP code are you in?',
    result:'Check the fit. Help them move forward.', foot:'Business DMs handled in writing.', selected:'Instagram DMs', email:'Instagram DMs'
  },
  whatsapp: {
    number:'05', label:'WHATSAPP', title:'They use WhatsApp?\nMeet them there.',
    body:'Handle conversations through your connected WhatsApp Business account. Setup, permissions and message types are checked before activation.',
    incoming:'Can I book an appointment here?', reply:'Yes, I can help with the next step. Which service do you need?',
    result:'Use your process. Handle it in writing.', foot:'WhatsApp Business connection required.', selected:'WhatsApp conversations', email:'WhatsApp conversations'
  },
  email: {
    number:'06', label:'EMAIL', title:'An inquiry in the inbox.\nKeep it moving.',
    body:'Answer and follow up on inquiries through a supported email connection. Your facts, your tone and your rules still guide the conversation.',
    incoming:'I have a few questions before I book.', reply:'Of course. Send them over and I’ll help you work out the next step.',
    result:'Useful answers. Clear next steps.', foot:'Email is written follow-up too.', selected:'Email inquiries', email:'email inquiries'
  }
};
export function validChoice(value){return Object.hasOwn(services,value)?value:'website'}
export function emailFor(choice){
  const service=services[validChoice(choice)];
  const subject='Question about '+service.email;
  const body='Hi Adam,\n\nI’d like to ask about '+service.email+' for my business.\n\nMy business:\nMy website:\nChannels I use:\n\nI saw the conversational messaging service for $297/month with the $500 setup waived. I understand it covers supported connected messaging channels and does not include voice calls.\n\nMy question:\n\nThanks!';
  return 'mailto:hello@locallvrg.co?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}
