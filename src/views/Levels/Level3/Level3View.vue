<template>
  <base-level 
  :level_id="level_id" 
  :level_name="level_name" 
  :level_data="gameData"
  ref="base">
  </base-level>
</template>

<script>
import BaseLevel from '../../../components/BaseLevel.vue'

export default {
  components: {BaseLevel },
  name: 'Level3View',
  data() {
    return {
      level_id: 3,
      level_name: "The Dark Side of Social Media",
      gameData: {
        steps: [
            {
                id: 1,
                assistant: {
                    text: "Social media would not be social if there would not been any other humans.\nIn many social media platttforms you can connect with other people and become friends.\n\nBut be careful, not everybody is your friend. Some people just want to get your personal information.",
                    action: {
                        text: "Tell me something about it.",
                        func: 2
                    },
                },
            },
            {
                id: 2,
                assistant: {
                    text: "As always, I have prepared a little task for you where you can practice what you have learned.",
                    action:{
                        text: "Continue",
                        func: 3
                    },
                }, 
                mode: 'html',
                  modeDetails: {
                      data: {
                        path: 'views/Levels/Level3/data1.html'
                      }
                }
            },
            {
                id: 3,
                assistant: {
                    text: "Ah look. You have got a friend request from your pal Josh. What do you think? Should we acceot it?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz1',
                    data: {
                        question: "Should you accept this friend request?",
                        answers: [
                        {id: 0, text: "Yes.", correct: true},
                        {id: 1, text: "No.", correct: false},
                        ]
                    },
                    content: {
                        component: 'friend-request',
                        name: "Josh Maier",
                        avatar: "https://i.pinimg.com/originals/05/c9/d0/05c9d08e8b49371122b9d8d9a450b096.jpg",
                        mutal: 24
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. Josh is a good friend. And you have lots of mutal friends. We should accept his friend request.",
                            action: {
                                text: "Continue",
                                func: 4
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. Josh is a good friend. And you have lots of mutal friends. We should accept his friend request.",
                            action: {
                                text: "Continue",
                                func: 4
                            },
                        },
                    }
                }
            },
            {
                id: 4,
                assistant: {
                    text: "You have got a friend request from your a woman called Maria. What do you think? Should we acceot it?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz2',
                    data: {
                        question: "Should you accept this friend request?",
                        answers: [
                        {id: 0, text: "Yes.", correct: false},
                        {id: 1, text: "No.", correct: true},
                        ]
                    },
                    content: {
                        component: 'friend-request',
                        name: "Maria Müller",
                        avatar: "https://media.istockphoto.com/photos/crazy-senior-woman-kissing-picture-id155282054?k=20&m=155282054&s=612x612&w=0&h=9tpmIu5GfsKZm5iZorQ4w5khJlK9DMpOoubkPPO8yA4=",
                        mutal: 0
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. This is very strange. You don't have any common friends. You probably don't know her. We should delete this friend request.",
                            action: {
                                text: "Continue",
                                func: 5
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. This is very strange. You don't have any common friends. You probably don't know her. We should delete this friend request.",
                            action: {
                                text: "Continue",
                                func: 5
                            },
                        },
                    }
                }
            },
            {
                id: 5,
                assistant: {
                    text: "You have got a friend request from your a guy with a picture of a cartoon. What do you think? Should we accept it?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz3',
                    data: {
                        question: "What should you do?",
                        answers: [
                        {id: 0, text: "Accept it.", correct: false},
                        {id: 1, text: "Better delete this request.", correct: true},
                        {id: 2, text: "Ask your mutal friend who this is.", correct: true},
                        ]
                    },
                    content: {
                        component: 'friend-request',
                        name: "Markus Pokefan",
                        avatar: "https://www.bravo.de/assets/field/image/pikachu_bts.jpg",
                        mutal: 1
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. You only have one common friend, but the fact that he is using a photo of a cartoon is strage. Before accepting this friend requests, you should check the profile of the person in detail.",
                            action: {
                                text: "Continue",
                                func: 6
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. You only have one common friend, but the fact that he is using a photo of a cartoon is strage. Before accepting this friend requests, you should check the profile of the person in detail.",
                            action: {
                                text: "Continue",
                                func: 6
                            },
                        },
                    }
                }
            },
            {
                id: 6,
                assistant: {
                    text: "On social media everyone can send you messages.\nBut be careful with messages, because they could be dangerous.",
                    action: {
                        text: "Continue",
                        func: 7
                    }, 
                },
            },
            {
                id: 7,
                assistant: {
                    text: "As always, I have prepared a little task for you where you can practice what you have learned.",
                    action:{
                        text: "Continue",
                        func: 8
                    },
                }, 
                mode: 'html',
                  modeDetails: {
                      data: {
                        path: 'views/Levels/Level3/data2.html'
                      }
                }
            },
            {
                id: 8,
                assistant: {
                    text: "Just tell me, when ever I should check your work.",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'containergame',
                modeDetails: {
                    ref: 'game1',
                    data: {
                      items: [
                        { name: "I can trust links in messages.", type: 'bad'},
                        { name: "I can trust every message.", type: 'bad'},
                        { name: "Speling mistakes are an indicator for spam messages.", type: 'good'},
                        { name: "I should report suspious messages.", type: 'good'},
                        { name: "I should send personal information to everyone.", type: 'bad'},
                        { name: "If somebody asks for my phone number, I will send it to him.", type: 'bad'},
                        { name: "I should check if I know the sender of the message", type: 'good'},
                        { name: "I should reply to every message", type:'bad'},
                      ],
                      left: "Good",
                      right: "Bad",
                    },
                    unfinished: {
                        assistant: {
                            text: "There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.",
                        },
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "There are still some mistakes. Try again. I am sure you will manage it now.",
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. Everything was correct. Well done.",
                            action: {
                                text: "Continue.",
                                func: 9
                            },
                        },
                    }
                }
            },
            {
                id: 9,
                assistant: {
                    text: "What do you think about this message. What should we do?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz4',
                    data: {
                      question: "What do you think about this message?",
                      answers: [
                        {id: 0, text: "This is a safe message. I can reply.", correct: false},
                        {id: 1, text: "This is probably a scam.", correct: true},
                        {id: 2, text: "I should reply.", correct: false},
                        {id: 3, text: "I should report the sender and block him.", correct: true},
                      ]
                    },
                    content: {
                        component: 'chat',
                        messages: [
                          {id: 1, sender: 'other', text: 'Hey, I am your new friend. I am from Nigeria and I want to send you some money. Can you give me your bank account number?'},
                        ],
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. This is a dangerous message. We should report it.",
                            action: {
                                text: "Continue",
                                func: 10
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. This is a dangerous message. We should report it.",
                            action: {
                                text: "Continue",
                                func: 10
                            },
                        },
                    }
                }
            },
            {
                id: 10,
                assistant: {
                    text: "What do you think about this message. What should we do?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz5',
                    data: {
                      question: "What do you think about this message?",
                      answers: [
                        {id: 0, text: "This is a safe message. I can reply.", correct: false},
                        {id: 1, text: "This is probably a scam.", correct: true},
                        {id: 2, text: "I should reply.", correct: false},
                        {id: 3, text: "I should report the sender and block him.", correct: true},
                      ]
                    },
                    content: {
                        component: 'chat',
                        messages: [
                        {id: 1, sender: 'other', text: 'Hey!'},
                        {id: 2, sender: 'me', text: 'Hello! Who are you?'},
                        {id: 3, sender: 'other', text: 'I am Max. One of your friends told me you like dogs.'},
                        {id: 4, sender: 'other', text: 'Lets meet in the park and I will show you my dog.'},
                      ],
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. This is a dangerous message. We should report it.",
                            action: {
                                text: "Continue",
                                func: 11
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. This is a dangerous message. We should report it.",
                            action: {
                                text: "Continue",
                                func: 11
                            },
                        },
                    }
                }
            },
            {
                id: 11,
                assistant: {
                    text: "What do you think about this message. What should we do?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz6',
                    data: {
                      question: "What do you think about this message?",
                      answers: [
                        {id: 0, text: "This is a safe message. I can reply.", correct: false},
                        {id: 1, text: "This is probably a scam.", correct: true},
                        {id: 2, text: "I should reply.", correct: false},
                        {id: 3, text: "I should report the sender and block him.", correct: true},
                      ]
                    },
                    content: {
                        component: 'chat',
                        messages: [
                          {id: 1, sender: 'other', text: 'Congratulazion! You have won a PS5. Click this link to claim your prize. http://win.cc/ps5'},
                        ],
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. This is a dangerous message. We should report it.",
                            action: {
                                text: "Continue",
                                func: 12
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. This is a dangerous message. We should report it.",
                            action: {
                                text: "Continue",
                                func: 12
                            },
                        },
                    }
                }
            },
            {
                id: 12,
                assistant: {
                    text: "Not everything you see on the internet is true. You should always check the source of the information before you share it.",
                    action:{
                        text: "Continue",
                        func: 13
                    },
                }
            },
            {
                id: 13,
                assistant: {
                    text: "All this should be common sense anyway, right?\n\nBut it doesn't hurt to learn about it.",
                    action:{
                        text: "Continue",
                        func: 14
                    },
                }, 
                mode: 'html',
                  modeDetails: {
                      data: {
                        path: 'views/Levels/Level3/data3.html'
                      }
                }
            },
            {
                id: 14,
                assistant: {
                    text: "Just tell me, when ever I should check your work.",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'containergame',
                modeDetails: {
                    ref: 'game2',
                    data: {
                      items: [
                        { name: "The web adress or site name can help to indicate fake news.", type: 'good'},
                        { name: "Shocking headlines are an indicator for trustworthy news.", type: 'bad' },
                        { name: "Words in ALL CAPS is an indicator for trustworthy news.", type: 'bad' },
                        { name: "Grammatical errors are an indicator for fake news.", type: 'good' },
                        { name: "Sensational images are often used for serious news.", type: 'bad' },
                        { name: "The use of many punctuation character is an indicator for fake news.", type: 'good' },
                        { name: "Unusual web adresses are a sign of fake news.", type: 'good'},
                        { name: "Websites ending with .gov.at are always trustworthy.", type: 'good' },
                        { name: "Websites ending with .at are always trustworthy.", type: 'bad'},
                      ],
                      left: "True",
                      right: "False",
                    },
                    unfinished: {
                        assistant: {
                            text: "There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.",
                        },
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "There are still some mistakes. Try again. I am sure you will manage it now.",
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. Everything was correct. Well done.",
                            action: {
                                text: "Continue.",
                                func: 15
                            },
                        },
                    }
                }
            },
            {
                id: 15,
                assistant: {
                    text: "What do you think about this post?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quizfakenews1',
                    data: {
                      question: "Are there any signs of fake news?",
                      answers: [
                        {id: 0, text: "Shocking and exaggerated headline.", correct: true},
                        {id: 1, text: "Sensational image.", correct: true},
                        {id: 2, text: "Strange web adress or site name.", correct: true},
                        {id: 3, text: "Spelling errors, ALL CAPS or dramatic punctuation.", correct: true},
                        {id: 4, text: "This article probably is fake.", correct: true},
                        {id: 5, text: "This article probably is real.", correct: false},
                      ]
                    },
                    content: {
                        component: 'news-post',
                        author: {
                          name: 'Markus',
                          avatar: 'https://avatars.dicebear.com/api/avataaars/fafada.png'
                        },
                        image: "https://media.istockphoto.com/photos/unbelievable-shocking-news-portrait-of-stunned-brunette-man-keeping-picture-id1198137096?k=20&m=1198137096&s=612x612&w=0&h=yIlPYBxoqqLraJwvRKYMzSI_qbL1y7e4X6LMROZqsIs=",
                        link: "NEWS-CENTR.COM",
                        headline: "Eating BURGERS will KILL YOU!!!!",
                        message: "OMG guys, check this out!!!",
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "You are wrong. This is probaly fake news. To be absolutly sure you have to check the source.",
                            action: {
                                text: "Finish",
                                func: "COMPLETE"
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. This is probaly fake news. To be absolutly sure you have to check the source.",
                            action: {
                                text: "Finish",
                                func: "COMPLETE"
                            },
                        },
                    }
                }
            },
        ]
      }
    }
  },
  mounted() {
    this.$refs.base.nextMove();
  },
}
</script>