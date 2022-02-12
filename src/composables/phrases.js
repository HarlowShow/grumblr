import { useStore } from 'vuex'

export default function speakPhrases() {

    const store = useStore()
    const activePronouns = {...store.state.chosenPronouns};
    const activePersonmate = store.state.chosenPersonmate;
    const activeGripe = store.state.chosenGripe;

    const phrases = [

        {
            position: "op1",
            status: false,
            phrase: "Hey shithead, ",
            tone: "angry",

        },

         {
            position: "op1",
            status: false,
            phrase: "Hey asshole, ",
            tone: "angry",

        },

         {
            position: "op1",
            status: false,
            phrase: "Hey twatface, ",
            tone: "angry",

        },

        {
            position: "op1",
            status: false,
            phrase: "So sorry to bother you, but ",
            tone: "polite",

        },

         {
            position: "op1",
            status: false,
            phrase: `${activePronouns.subjectPCap} hope you don't mind ${activePronouns.objectP}  saying this, but `,
            tone: "polite",

        },

         {
            position: "op1",
            status: false,
            phrase: `How are you? ${activePronouns.subjectPCap} hope you're well. ${activePronouns.subjectPCap} couldn't help but notice that `,
            tone: "polite",

        },
        
        {
            position: "op1",
            status: false,
            phrase: "So... ",
            tone: "paggro",

        },

         {
            position: "op1",
            status: false,
            phrase: "Hmmmm... ",
            tone: "paggro",

        },

         {
            position: "op1",
            status: false,
            phrase: "Oh dear... ",
            tone: "paggro",

        },

        {
            position: "op1",
            status: false,
            phrase: "Ahoy there, ",
            tone: "pirate",

        },

        {
            position: "op1",
            status: false,
            phrase: "Fire in the hole! Fer ",
            tone: "pirate",

        },

        {
            position: "op1",
            status: false,
            phrase: "Aye aye, ",
            tone: "pirate",

        },

        {
            position: "op2",
            status: false,
            phrase: "in your latest dick move ",
            tone: "angry",

        },

         {
            position: "op2",
            status: false,
            phrase: `${activePronouns.subjectP} ${activePronouns.toBePresent} PISSED that`,
            tone: "angry",

        },

        {
            position: "op2",
            status: false,
            phrase: `${activePronouns.subjectP} ${activePronouns.toBePresent} RAGING because`,
            tone: "angry",

        },

         {
            position: "op2",
            status: false,
            phrase: "it looks like ",
            tone: "polite",

        },

           {
            position: "op2",
            status: false,
            phrase: "it seems to be the case that ",
            tone: "polite",

        },

           {
            position: "op2",
            status: false,
            phrase: "it may be that ",
            tone: "polite",

        },

        {
            position: "op2",
            status: false,
            phrase: "whoopsie daisy! Looks like ",
            tone: "paggro",

        },

          {
            position: "op2",
            status: false,
            phrase: "we seem to have a teeny tiny problem on our hands... ",
            tone: "paggro",

        },

          {
            position: "op2",
            status: false,
            phrase: `${activePronouns.subjectP} had the unfortunate privilege of noticing that `,
            tone: "paggro",

        },

        {
            position: "op2",
            status: false,
            phrase: "the fair winds be whisperin' that ",
            tone: "pirate",

        },

         {
            position: "op2",
            status: false,
            phrase: "the salty brines be singin' that ",
            tone: "pirate",

        },

         {
            position: "op2",
            status: false,
            phrase: "the high seas be singin' that ",
            tone: "pirate",

        },

        {
            position: "of1",
            status: false,
            phrase: "Fuck you! ",
            tone: "angry",

        },

        {
            position: "of1",
            status: false,
            phrase: "You REALLY had to go there, didn't you? ",
            tone: "angry",

        },

        {
            position: "of1",
            status: false,
            phrase: `${activePronouns.subjectPCap} can't believe you've done  `,
            tone: "angry",

        },

         {
            position: "of1",
            status: false,
            phrase: `${activePronouns.subjectPCap} really hope you don't mind ${activePronouns.objectP} bringing this up. `,
            tone: "polite",

        },

        {
            position: "of1",
            status: false,
            phrase: `Please don't think ill of ${activePronouns.objectP} for mentioning  `,
            tone: "polite",

        },

        {
            position: "of1",
            status: false,
            phrase: `I hope you don't think ${activePronouns.objectP} rude for bringing this up. `,
            tone: "polite",

        },

        {
            position: "of1",
            status: false,
            phrase: `Thanks SO much for reminding ${activePronouns.objectP} what a responsible adult looks like. `,
            tone: "paggro",

        },

         {
            position: "of1",
            status: false,
            phrase: `It was really so kind of you to demonstrate what it means to be a great ${activePersonmate}. `,
            tone: "paggro",

        },

         {
            position: "of1",
            status: false,
            phrase: `Please don't get ${activePronouns.objectP} wrong, ${activePronouns.toBeContracted} sooooo glad to have you as ${activePronouns.posessiveDeterminerP} ${activePersonmate}. `,
            tone: "paggro",

        },

         {
            position: "of1",
            status: false,
            phrase: "Too much grog was it? ",
            tone: "pirate",

        },

         {
            position: "of1",
            status: false,
            phrase: `Perhaps ye be runnin' the rig with ${activePronouns.objectP}? `,
            tone: "pirate",

        },

        {
            position: "of1",
            status: false,
            phrase: `Perhaps ye be hornswagglin' ${activePronouns.objectP}? `,
            tone: "pirate",

        },

        {
            position: "of2",
            status: false,
            phrase: "PRICK. ",
            tone: "angry",

        },

        {
            position: "of2",
            status: false,
            phrase: "DOUCHE. ",
            tone: "angry",

        },

        {
            position: "of2",
            status: false,
            phrase: "Un-fucking-believable. ",
            tone: "angry",

        },

        {
            position: "of2",
            status: false,
            phrase: `(If this is an incorrect assumption on ${activePronouns.posessiveDeterminerP} part ${activePronouns.toBeContracted} truly sorry.) `,
            tone: "polite",

        },

        {
            position: "of2",
            status: false,
            phrase: `(If ${activePronouns.toBeContracted} mistaken please know that ${activePronouns.toBeContracted} truly sorry.) `,
            tone: "polite",

        },

         {
            position: "of2",
            status: false,
            phrase: `(${activePronouns.toBeContracted} so sorry for even mentioning this - ${activePronouns.toBeContracted} sure you're busy.) `,
            tone: "polite",

        },

        {
            position: "of2",
            status: false,
            phrase: ":) ",
            tone: "paggro",

        },

        {
            position: "of2",
            status: false,
            phrase: ">:) ",
            tone: "paggro",

        },

        {
            position: "of2",
            status: false,
            phrase: "☺ ",
            tone: "paggro",

        },

        {
            position: "of2",
            status: false,
            phrase: "Ye scurvy dog! ",
            tone: "pirate",

        },

         {
            position: "of2",
            status: false,
            phrase: "Thar she blows! ",
            tone: "pirate",

        },

         {
            position: "of2",
            status: false,
            phrase: "Aaaaaarrrggghhhhhhhh. ",
            tone: "pirate",

        },

        {
            position: "co0",
            status: false,
            phrase: "Along with the rest of your bullshit, ",
            tone: "angry",

        },

        {
            position: "co0",
            status: false,
            phrase:  `As if having you for a ${activePersonmate} wasn't bad enough, `,
            tone: "angry",

        },

        {
            position: "co0",
            status: false,
            phrase: `${activePronouns.subjectPCap} always knew you were a bit of a bellend, but `,
            tone: "angry",

        },

        {
            position: "co0",
            status: false,
            phrase: `While ${activePronouns.toBeContracted} sure you didn't mean anything by it, `,
            tone: "polite",

        },

        {
            position: "co0",
            status: false,
            phrase: `${activePronouns.toBeContractedCap} not annoyed at you at all, it's just that `,
            tone: "polite",

        },

         {
            position: "co0",
            status: false,
            phrase: `${activePronouns.subjectPCap} know that personal responsibility isn't really your thing, but `,
            tone: "paggro",

        },

        {
            position: "co0",
            status: false,
            phrase: `${activePronouns.subjectPCap} can see that you're suuuuper busy with all sorts of very important things, but `,
            tone: "paggro",

        },

        {
            position: "co0",
            status: false,
            phrase: `Now ${activePronouns.subjectP} know that basic common decency doesn't come naturally to everyone, but `,
            tone: "paggro",

        },

       {
            position: "co0",
            status: false,
            phrase: `${activePronouns.subjectPCap}  grant ye that a landlubber's life aint easy, but `,
            tone: "pirate",

        }, 

        {
            position: "co0",
            status: false,
            phrase: `${activePronouns.subjectPCap} may be old salt, but `,
            tone: "pirate",

        }, 

        {
            position: "co0",
            status: false,
            phrase: `Aye, ${activePronouns.toBePastContracted} got little expertise 'sides swashbucklin', but ${activePronouns.subjectP} know well enough that `,
            tone: "pirate",

        }, 

        {
            position: "co2",
            status: false,
            phrase: "is too much. YOU'VE REACHED THE END OF THE LINE, BUD. ",
            tone: "angry",

        },

        {
            position: "co2",
            status: false,
            phrase: "is enough to drive ANYONE insane. ",
            tone: "angry",

        },

        {
            position: "co2",
            status: false,
            phrase: `is NOT OKAY for ${activePronouns.objectP}. `,
            tone: "angry",

        },

        {
            position: "co2",
            status: false,
            phrase: "can sometimes be rather inconvenient. ",
            tone: "polite",

        },

        {
            position: "co2",
            status: false,
            phrase: "can be a tad inconvenient. ",
            tone: "polite",

        },

        {
            position: "co2",
            status: false,
            phrase: "is quite inconvenient. ",
            tone: "polite",
        },

        {
            position: "co2",
            status: false,
            phrase: "is... well... **SIGH** ",
            tone: "paggro",
        },

        {
            position: "co2",
            status: false,
            phrase: `is SO much fun for ${activePronouns.objectP} (not!) `,
            tone: "paggro",
        },

        {
            position: "co2",
            status: false,
            phrase: `is not ${activePronouns.posessiveDeterminerP} idea of a fun time, mmkay? `,
            tone: "paggro",
        },

        {
            position: "co2",
            status: false,
            phrase: "would have even the finest seadog hangin' their jib. ",
            tone: "pirate",
        },

        {
            position: "co2",
            status: false,
            phrase: "would have Davy Jones himself quiverin' in his boots. ",
            tone: "pirate",
        },

        {
            position: "co2",
            status: false,
            phrase: `is not what ${activePronouns.pirateTitle} dreamed of in a livin' arrangement. `,
            tone: "pirate",
        },

        {
            position: "pl0",
            status: false,
            phrase: "For pity's sake, ",
            tone: "angry",

        },

        {
            position: "pl0",
            status: false,
            phrase: "PHEW. Ok. So ",
            tone: "angry",

        },

         {
            position: "pl0",
            status: false,
            phrase: "If it's not too much trouble, ",
            tone: "polite",

        },

        {
            position: "pl0",
            status: false,
            phrase: "If it's not too much bother, ",
            tone: "polite",

        },

        {
            position: "pl0",
            status: false,
            phrase: `If you don't mind ${activePronouns.objectP} saying so, `,
            tone: "polite",

        },

        {
            position: "pl0",
            status: false,
            phrase: "So if it's not TOO challenging for you, ",
            tone: "paggro",

        },

        {
            position: "pl0",
            status: false,
            phrase: `While ${activePronouns.toBeContracted} sure you have FAR more important things to do (GREAT choice of socks today by the way), `,
            tone: "paggro",

        },

        {
            position: "pl0",
            status: false,
            phrase: "So if it's not beyond your capabilities, ",
            tone: "paggro",

        },

        {
            position: "pl0",
            status: false,
            phrase: "If ye consider yerself a worthy seadog, ",
            tone: "pirate",

        },

         {
            position: "pl0",
            status: false,
            phrase: "As long as ye be open to parley, ",
            tone: "pirate",

        },

        {
            position: "pl0",
            status: false,
            phrase: "Aye me hearty, ",
            tone: "pirate",

        },

        {
            position: "pl1",
            status: false,
            phrase: `please have mercy on ${activePronouns.objectP} and `,
            tone: "angry",

        },

        {
            position: "pl1",
            status: false,
            phrase: `please help restore ${activePronouns.objectP} sanity and `,
            tone: "angry",

        },

        {
            position: "pl1",
            status: false,
            phrase: "please get your shit together and ",
            tone: "angry",

        },

        {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} would really appreciate it if you could `,
            tone: "polite",

        },

        {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} would be very grateful if you could `,
            tone: "polite",

        },

        {
            position: "pl1",
            status: false,
            phrase: `you'd be doing ${activePronouns.objectP} a huge favour if you could `,
            tone: "polite",

        },

        {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} have a TEENY WEENY favour to ask... `,
            tone: "paggro",

        },

        {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} would sooooooo grateful (and impressed!) if you could `,
            tone: "paggro",

        },

        {
            position: "pl1",
            status: false,
            phrase: "it would be so. very. amazing. if you could ",
            tone: "paggro",

        },

        {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} suggest ye' leave yer bilge-suckin' ways behind and `,
            tone: "pirate",

        },

         {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} reckon ye'd better heave ho and `,
            tone: "pirate",

        },

         {
            position: "pl1",
            status: false,
            phrase: `${activePronouns.subjectPCap} be asking ye' to batten down the hatches and `,
            tone: "pirate",

        },

        {
            position: "pl2",
            status: false,
            phrase: "stop being such a prat, yeah? Bloody hell. ",
            tone: "angry",

        },
        
        {
            position: "pl2",
            status: false,
            phrase: "be less crap next time. Got it? ",
            tone: "angry",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "stop inflicting your awfulness on the rest of us. Alright mate? ",
            tone: "angry",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "keep an eye on this in the future. Thanks so much. ",
            tone: "polite",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "try to stay on top of this in the future. Thanks a lot. Have a great day! ",
            tone: "polite",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "be a bit more vigilant next time. Thanks so much. ",
            tone: "polite",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "be a decent human being next time, yeah? Ta XOXOXOXO ",
            tone: "paggro",

        }, 

         {
            position: "pl2",
            status: false,
            phrase: "be more considerate next time, k? :) ",
            tone: "paggro",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "kindly think of other people next time. THANKS. ",
            tone: "paggro",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: `spare a thought fer ${activePronouns.pirateTitle} in the future. Savvy? `,
            tone: "pirate",

        },

        {
            position: "pl2",
            status: false,
            phrase: "straighten yer' sea legs next time. Avast! ",
            tone: "pirate",

        }, 

        {
            position: "pl2",
            status: false,
            phrase: "quit being such a son of a biscuit eater! Oh aye. ",
            tone: "pirate",

        },
    ];

    return {
        phrases,
        activeGripe: activeGripe.value,
        activePersonmate: activePersonmate.value,
        activePronouns: activePronouns.value
    }
}