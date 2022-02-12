import { ref } from 'vue'

export default function usePronouns(){


    const pronoun = ref('')
  

    const setPronouns = function(pronoun) {
        console.log('set pronoun function happening with pronoun: ' + pronoun)
        if(pronoun === "me") {

        this.$store.state.chosenPronouns = {
        subjectP: "I",
        subjectPCap: "I",
        objectP: "me",
        objectPCap: "Me",
        posessiveDeterminerP: "my",
        posessiveDeterminerPCap: "My",
        possessiveP: "mine",
        possessivePCap: "Mine",
        reflexiveP: "myself", 
        reflexivePCap: "Myself", 
        toBePresent: "am",
        toBePast: "was",
        toBeContracted: "I'm",
        toBeContractedCap: "I'm",
        toBePastContracted: "I've",
        toBePastContractedCap: "I've",
        pirateTitle: "this old cap'n",
        pirateTitleCap: "This old cap'n"

       
        }
            } else if (pronoun === "we") {
        
        this.$store.state.chosenPronouns = {
        subjectP: "we",
        subjectPCap: "We",
        objectP: "us",
        objectPCap: "Us",
        posessiveDeterminerP: "our",
        posessiveDeterminerPCap: "Our",
        possessiveP: "ours",
        possessivePCap: "Ours",
        reflexiveP: "ourselves",
        reflexivePCap: "Ourselves",
        toBePresent: "are",
        toBePast: "were",
        toBeContracted: "we're",
        toBeContractedCap: "We're",
        toBePastContracted: "we've",
        toBePastContractedCap: "We've",
        pirateTitle: "these fine crewmates",
        pirateTitleCap: "These fine crewmates"
        };
   
    } else {
        console.log("no pronouns chosen");
    }
        
    }

    return {
    
        pronoun,
        setPronouns
    }

}