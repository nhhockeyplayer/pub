/* COPYRIGHT 2014 DEKA RESEARCH AND DEVELOPMENT CORPORATION
 *
 * Contains confidential and proprietary information which
 * may not be copied, disclosed or used by others except as expressly
 * authorized in writing by DEKA Research & Development Corporation.
 *
 * @file
 * @critical Major Multi-Point
 *
 * Contains MML Mock Service application
 *
 * Question: "What is the mock component and service used for?"
 *
 * The mock component is a collection of services used to store the
 * mock data with simple getters and setters used by hsm-dalmgr.mocks module.
 *
 * mock.mml.js creates a list of medications
 * and a list of formulary to be used by the mml module.
 */

'use strict';

angular.module('mock.mml', [])
    .factory('MmlServerDataModel', function () {
        var _this = this;

        _this.formulary =  [
            {
                traceUUID: 'aUUID',
                drugCode: 'Aba1_US',
                genericName: 'Abatacept',
                pumpDisplayName: 'Abatacept',
                active: 'Y',
                generalComment: 'A comment',
                alternateNames: [
                    'Orencia'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Abc2_US',
                genericName: 'Abciximab',
                pumpDisplayName: 'Abciximab ',
                alternateNames: [
                    'Reopro'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ace3_US',
                genericName: 'Acetaminophen',
                pumpDisplayName: 'Acetaminophen',
                alternateNames: [
                    'Ofirmev'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ace5_US',
                genericName: 'Acetylcysteine',
                pumpDisplayName: 'Acetylcysteine ',
                alternateNames: [
                    'Acetadote'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Acy6_US',
                genericName: 'Acyclovir Sodium',
                pumpDisplayName: 'Acyclovir',
                alternateNames: [
                    'Zovirax'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Alb8_US',
                genericName: 'Albumin Human',
                pumpDisplayName: 'Albumin',
                alternateNames: [
                    'Albumin'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ald9_US',
                genericName: 'Aldesleukin',
                pumpDisplayName: 'Aldesleukin ',
                alternateNames: [
                    'Proleukin'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Alp10_US',
                genericName: 'Alprostadil',
                pumpDisplayName: 'Alprostadil',
                alternateNames: [
                    'Prostin VR'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Alt11_US',
                genericName: 'Alteplase',
                pumpDisplayName: 'Alteplase ',
                alternateNames: [
                    'Activase'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ami12_US',
                genericName: 'Amifostine',
                pumpDisplayName: 'Amifostine ',
                alternateNames: [
                    'Ethyol'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ami13_US',
                genericName: 'Amikacin Sulfate',
                pumpDisplayName: 'Amikacin ',
                alternateNames: [
                    'Amikin'
                ],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ami14_US',
                genericName: 'Aminocaproic Acid',
                pumpDisplayName: 'Aminocaproic Acid ',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ami15_US',
                genericName: 'Aminophylline',
                pumpDisplayName: 'Aminophylline',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ami16_US',
                genericName: 'Amiodarone Hydrochloride',
                pumpDisplayName: 'Amiodarone ',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Amp17_US',
                genericName: 'Amphotericin B',
                pumpDisplayName: 'Amphotericin B ',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Amp18_US',
                genericName: 'Amphotericin B Lipid Complex',
                pumpDisplayName: 'Amphotericin B lipid complex',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Amp19_US',
                genericName: 'Amphotericin B Libosomal',
                pumpDisplayName: 'Amphotericin B Liposomal',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Amp20_US',
                genericName: 'Ampicillin Sodium',
                pumpDisplayName: 'Ampicillin',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ani22_US',
                genericName: 'Anidulafungin',
                pumpDisplayName: 'Anidulafungin ',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ant23_US',
                genericName: 'Antithrombin III',
                pumpDisplayName: 'Anti-thrombin III',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            },
            {
                drugCode: 'Ant24_US',
                genericName: 'Antithymocyte Globulin (Rabbit)',
                pumpDisplayName: 'Anti-thymocyte globulin',
                alternateNames: [],
                commonConcentrations: {
                    syringe: {
                        intermittent: [
                            'ml/hr'
                        ],
                        continuous: [
                            'ml/hr'
                        ]
                    },
                    lvp: {
                        intermittent: [
                            'g'
                        ],
                        continuous: [
                            'mg'
                        ]
                    }
                },
                commonDoseModes: {
                    syringe: [
                        'ml/hr'
                    ],
                    lvp: [
                        'mg'
                    ]
                }
            }
        ];

        _this.medCategories = [
            {
                name: 'Anesthesia',
                id: 1
            },
            {
                name: 'Antibiotics',
                id: 2
            },
            {
                name: 'Blood/Blood Products',
                id: 3
            },
            {
                name: 'Cardiovascular',
                id: 4
            },
            {
                name: 'Cerebrovascular',
                id: 5
            },
            {
                name: 'IV Fluids',
                id: 6
            },
            {
                name: 'Nutrition',
                id: 7
            },
            {
                name: 'Parenteral Nutrition',
                id: 8
            }
//            Duplicates for testing 24 + categories
            // {
            //     name: 'Anesthesia',
            //     id: 9
            // },
            // {
            //     name: 'Antibiotics',
            //     id: 10
            // },
            // {
            //     name: 'Blood/Blood Products',
            //     id: 11
            // },
            // {
            //     name: 'Cardiovascular',
            //     id: 12
            // },
            // {
            //     name: 'Cerebrovascular',
            //     id: 13
            // },
            // {
            //     name: 'IV Fluids',
            //     id: 14
            // },
            // {
            //     name: 'Nutrition',
            //     id: 15
            // },
            // {
            //     name: 'Parenteral Nutrition',
            //     id: 16
            // },
            // {
            //     name: 'Nutrition',
            //     id: 17
            // },
            // {
            //     name: 'Parenteral Nutrition',
            //     id: 18
            // },
            //             {
            //     name: 'Anesthesia',
            //     id: 19
            // },
            // {
            //     name: 'Antibiotics',
            //     id: 20
            // },
            // {
            //     name: 'Blood/Blood Products',
            //     id: 21
            // },
            // {
            //     name: 'Cardiovascular',
            //     id: 22
            // },
            // {
            //     name: 'Cerebrovascular',
            //     id: 23
            // },
            // {
            //     name: 'IV Fluids',
            //     id: 24
            // }
        ];

        _this.medications = [
            {
                id: 3812,
                genericName: 'Alteplase',
                pumpDisplayName: 'Alteplase ',
                highAlert: 'Y',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Alt11_US',
                altName2: null,
                altName1: 'Activase new',
                altNameId1: 2609,
                altNameId2: null,
                aliases: [
                    {
                        id: 2609,
                        alias: 'Activase new'
                    }
                ],
                categories: [
                    {
                        id: 4,
                        name: 'Cardiovascular'
                    }
                ]
            },
            {
                id: 3859,
                genericName: 'Normal Saline',
                pumpDisplayName: 'Normal Saline',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: null,
                altName2: null,
                altName1: 'Sodium Chloride 0.9%',
                altNameId1: 2632,
                altNameId2: null,
                aliases: [
                    {
                        id: 2632,
                        alias: 'Sodium Chloride 0.9%'
                    }
                ],
                categories: [
                    {
                        id: 6,
                        name: 'IV Fluids'
                    }
                ]
            },
            {
                id: 3875,
                genericName: 'Cefazolin Sodium',
                pumpDisplayName: 'ceFAZolin',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Cef50_US',
                altName2: 'Kefzol',
                altName1: 'Ancef',
                altNameId1: 2650,
                altNameId2: 2649,
                aliases: [
                    {
                        id: 2650,
                        alias: 'Ancef'
                    },
                    {
                        id: 2649,
                        alias: 'Kefzol'
                    }
                ],
                categories: [
                    {
                        id: 2,
                        name: 'Antibiotics'
                    }
                ]
            },
            {
                id: 3886,
                genericName: 'Nitroprusside',
                pumpDisplayName: 'Nitroprusside',
                highAlert: 'Y',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: null,
                altName2: null,
                altName1: 'Nipride',
                altNameId1: 2651,
                altNameId2: null,
                aliases: [
                    {
                        id: 2651,
                        alias: 'Nipride'
                    }
                ],
                categories: [
                    {
                        id: 4,
                        name: 'Cardiovascular'
                    }
                ]
            },
            {
                id: 3891,
                genericName: 'Sodium Chloride 0.9%',
                pumpDisplayName: 'Sodium Chloride 0.9%',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: null,
                altName2: null,
                altName1: 'Normal Saline',
                altNameId1: 2652,
                altNameId2: null,
                aliases: [
                    {
                        id: 2652,
                        alias: 'Normal Saline'
                    }
                ],
                categories: [
                    {
                        id: 6,
                        name: 'IV Fluids'
                    }
                ]
            },
            {
                id: 3830,
                genericName: 'Amiodarone Hydrochloride',
                pumpDisplayName: 'Amiodarone ',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Ami16_US',
                altName2: 'Nexterone',
                altName1: 'Cordarone',
                altNameId1: 2630,
                altNameId2: 2629,
                aliases: [
                    {
                        id: 2629,
                        alias: 'Nexterone'
                    },
                    {
                        id: 2630,
                        alias: 'Cordarone'
                    }
                ],
                categories: [
                    {
                        id: 4,
                        name: 'Cardiovascular'
                    }
                ]
            },
            {
                id: 3887,
                genericName: 'Norepinephrine Bitartrate',
                pumpDisplayName: 'Norepinephrine',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Nor198_US',
                altName2: null,
                altName1: 'Levophed',
                altNameId1: 2653,
                altNameId2: null,
                aliases: [
                    {
                        id: 2653,
                        alias: 'Levophed'
                    }
                ],
                categories: [
                    {
                        id: 4,
                        name: 'Cardiovascular'
                    }
                ]
            },
            {
                id: 3896,
                genericName: 'Epoprostenol Sodium',
                pumpDisplayName: 'Epoprostenol',
                highAlert: 'Y',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Epo107_US',
                altName2: null,
                altName1: 'Flolan',
                altNameId1: 2654,
                altNameId2: null,
                aliases: [
                    {
                        id: 2654,
                        alias: 'Flolan'
                    }
                ],
                categories: [
                    {
                        id: 4,
                        name: 'Cardiovascular'
                    }
                ]
            },
            {
                id: 3850,
                genericName: 'Midazolam Hydrochloride',
                pumpDisplayName: 'Midazolam',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Mid183_US',
                altName2: null,
                altName1: 'Versed',
                altNameId1: 2655,
                altNameId2: null,
                aliases: [
                    {
                        id: 2655,
                        alias: 'Versed'
                    }
                ],
                categories: []
            },
            {
                id: 3834,
                genericName: 'Dexmedetomidine Hydrochloride',
                pumpDisplayName: 'Dexmedetomidine ',
                highAlert: 'Y',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: 'Dex88_US',
                altName2: null,
                altName1: 'Precedex',
                altNameId1: 2656,
                altNameId2: null,
                aliases: [
                    {
                        id: 2656,
                        alias: 'Precedex'
                    }
                ],
                categories: []
            },
            {
                id: 4011,
                genericName: 'Alteplase1',
                pumpDisplayName: 'Alteplase1 ',
                highAlert: 'Y',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: 'A',
                drugCode: '0',
                altName2: 'Activase2',
                altName1: 'Activase1',
                altNameId1: 2761,
                altNameId2: 2762,
                aliases: [
                    {
                        id: 2762,
                        alias: 'Activase2'
                    },
                    {
                        id: 2761,
                        alias: 'Activase1'
                    }
                ],
                categories: [
                    {
                        id: 4,
                        name: 'Cardiovascular'
                    }
                ]
            },
            {
                id: 4009,
                genericName: 'Piperacillin Sodium-Tazobactam Sodium',
                pumpDisplayName: 'Piperacillin/Tazobactam',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: null,
                drugCode: 'Pip221_US',
                altName2: null,
                altName1: 'Zosyn',
                altNameId1: 2760,
                altNameId2: null,
                aliases: [
                    {
                        id: 2760,
                        alias: 'Zosyn'
                    }
                ],
                categories: []
            },
            {
                id: 4129,
                genericName: 'Voriconazole',
                pumpDisplayName: 'Voriconazole',
                highAlert: 'N',
                cqiCompliant: 'Y',
                commonDoseModes: null,
                active: 'Y',
                status: null,
                drugCode: 'Vor269_US',
                altName2: null,
                altName1: 'Vfend',
                altNameId1: 2855,
                altNameId2: null,
                aliases: [
                    {
                        id: 2855,
                        alias: 'Vfend'
                    }
                ],
                categories: []
            }
        ];

        _this.wrapResponse = function (data) {
            if (data) {
                return {
                    success: true,
                    responseData: data
                };
            } else {
                return {
                    success: false,
                    responseData: null
                };
            }
        };

        var obj = {
            getFormulary: function () {
                return _this.wrapResponse(_this.formulary);
            },
            getMedCategories: function () {
                return _this.wrapResponse(_this.medCategories);
            },
            getMedications: function () {
                return _this.wrapResponse(_this.medications);
            }
        };

        return obj;
    });
