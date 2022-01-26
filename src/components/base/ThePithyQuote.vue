<template>
    <div>
    <p class="quote">"{{ selectedQuote }}"</p>
    <p>--{{ selectedAttrib }}</p>
    </div>
</template>

<script>
export default {

    mounted() {
                this.scrambleQuotes();
            },

    methods: {

            randomize(ar) {
                ar.sort(() => {return 0.5 - Math.random()});
            },

            scrambleQuotes() {
                this.randomize(this.quotes)
                this.selectedQuote = this.quotes[0].quote;
                this.selectedAttrib = this.quotes[0].attrib;
            }
    },

    data() {
        return {

            selectedQuote: '',
            selectedAttrib: '',

            quotes: [
                {
                    quote: 'Vengeance is Mine; I will repay',
                    attrib: 'Romans 12:19'
                },

                {
                    quote: 'A relationship should be based on communication, not on assumption',
                    attrib: 'marriage.com'
                },

                {
                    quote: 'Love is the absence of judgment.',
                    attrib: 'The 14th Dalau Lama'
                },

                {
                    quote: 'Assumptions are the termites of relationships.',
                    attrib: 'Henry Winkler'
                },

                
                {
                    quote: 'Truth is everybody is going to hurt you: you just gotta find the ones worth suffering for.',
                    attrib: 'Bob Marley'
                },

                {
                    quote: 'In a relationship each person should support the other; they should lift each other up.',
                    attrib: 'Taylor Swift'
                },

                {
                    quote: 'We can improve our relationships with others by leaps and bounds if we become encouragers instead of critics.',
                    attrib: 'Joyce Meyer'
                },

                {
                    quote: 'Learn to be quiet enough to hear the genuine in yourself, so that you can hear it in others.',
                    attrib: 'Marian Wright Edelman'
                },

                {
                    quote: "Don't wait around for other people to be happy for you. Any Happiness you get you've got to make yourself.",
                    attrib: 'Alice Walker'
                },

                {
                    quote: "Surround yourself with only people who are going to lift you higher.",
                    attrib: "Oprah Winfrey"
                },

                {
                    quote: "You've got to learn to leave the table when love's no longer being served.",
                    attrib: "Nina Simone"
                },

                {
                    quote: "When you take care of yourself, you're a better person for others. When you feel good about yourself, you treat others better.",
                    attrib: "Solange"
                },

                {
                    quote: "At the touch of love everyone becomes a poet.",
                    attrib: "Plato"
                },

                {
                    quote: "It is not our purpose to become each other; it is to recognize each other, to learn to see the other and honor him for what he is.",
                    attrib: "Herman Hesse"
                },

                {
                    quote: "Be honest, brutally honest. That is what's going to maintain relationships.",
                    attrib: "Lauryn Hill"
                },

                {
                    quote: "In the end there doesn't have to be anyone who understands you. There just has to be someone who wants to.",
                    attrib: "Robert Brault"
                },

                {
                    quote: "When someone shows you who they are, believe them the first time.",
                    attrib: "Maya Angelou"
                },

                {
                    quote: "Treasure your relationships, not your possessions.",
                    attrib: "Anthony J. D'Angelo"
                },

                {
                    quote: "Sometimes the heart sees what is invisible to the eye.",
                    attrib: "H. Jackson Brown, Jr."
                },

            ]
        }
    }
}
</script>

<style scoped>
    div {
        margin: 0 auto;
        padding: 0.5rem;
        text-align: center;
    }

    .quote {
        font-style: italic;
    }
</style>