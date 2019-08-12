// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Vdom = require("bucklescript-tea/src-ocaml/vdom.js");
var $$String = require("bs-platform/lib/js/string.js");
var Tea_app = require("bucklescript-tea/src-ocaml/tea_app.js");
var Tea_html = require("bucklescript-tea/src-ocaml/tea_html.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var MasterMind$ReactHooksTemplate = require("./MasterMind.bs.js");

function pegToLetter(param) {
  switch (param) {
    case 0 : 
        return "R";
    case 1 : 
        return "G";
    case 2 : 
        return "B";
    case 3 : 
        return "Y";
    case 4 : 
        return "O";
    case 5 : 
        return "P";
    
  }
}

var InvalidLetter = Caml_exceptions.create("PlayMasterMind-ReactHooksTemplate.InvalidLetter");

function letterToPeg(letter) {
  var upperLetter = $$String.uppercase(letter);
  switch (upperLetter) {
    case "B" : 
        return /* Blue */2;
    case "G" : 
        return /* Green */1;
    case "O" : 
        return /* Orange */4;
    case "P" : 
        return /* Purple */5;
    case "R" : 
        return /* Red */0;
    case "Y" : 
        return /* Yellow */3;
    default:
      throw InvalidLetter;
  }
}

var emptyGuess = /* record */[
  /* one */"",
  /* two */"",
  /* three */"",
  /* four */""
];

function init(param) {
  return /* record */[
          /* secret : :: */[
            /* Red */0,
            /* :: */[
              /* Red */0,
              /* :: */[
                /* Green */1,
                /* :: */[
                  /* Green */1,
                  /* [] */0
                ]
              ]
            ]
          ],
          /* currentGuess */emptyGuess,
          /* pastGuesses : [] */0
        ];
}

function setPeg(currentGuess, index, peg_str) {
  switch (index) {
    case 0 : 
        return /* record */[
                /* one */peg_str,
                /* two */currentGuess[/* two */1],
                /* three */currentGuess[/* three */2],
                /* four */currentGuess[/* four */3]
              ];
    case 1 : 
        return /* record */[
                /* one */currentGuess[/* one */0],
                /* two */peg_str,
                /* three */currentGuess[/* three */2],
                /* four */currentGuess[/* four */3]
              ];
    case 2 : 
        return /* record */[
                /* one */currentGuess[/* one */0],
                /* two */currentGuess[/* two */1],
                /* three */peg_str,
                /* four */currentGuess[/* four */3]
              ];
    case 3 : 
        return /* record */[
                /* one */currentGuess[/* one */0],
                /* two */currentGuess[/* two */1],
                /* three */currentGuess[/* three */2],
                /* four */peg_str
              ];
    default:
      throw InvalidLetter;
  }
}

function handleGuess(model) {
  var guess_000 = letterToPeg(model[/* currentGuess */1][/* one */0]);
  var guess_001 = /* :: */[
    letterToPeg(model[/* currentGuess */1][/* two */1]),
    /* :: */[
      letterToPeg(model[/* currentGuess */1][/* three */2]),
      /* :: */[
        letterToPeg(model[/* currentGuess */1][/* four */3]),
        /* [] */0
      ]
    ]
  ];
  var guess = /* :: */[
    guess_000,
    guess_001
  ];
  var score = MasterMind$ReactHooksTemplate.getScore(guess, model[/* secret */0]);
  return /* record */[
          /* secret */model[/* secret */0],
          /* currentGuess */emptyGuess,
          /* pastGuesses : :: */[
            /* record */[
              /* guess */guess,
              /* score */score
            ],
            model[/* pastGuesses */2]
          ]
        ];
}

function update(model, param) {
  if (param) {
    return /* record */[
            /* secret */model[/* secret */0],
            /* currentGuess */setPeg(model[/* currentGuess */1], param[0], param[1]),
            /* pastGuesses */model[/* pastGuesses */2]
          ];
  } else {
    return handleGuess(model);
  }
}

function view_peginput(peg_str, n) {
  return Tea_html.input$prime(undefined, undefined, /* :: */[
              Tea_html.value(peg_str),
              /* :: */[
                Tea_html.onInput(undefined, (function (str) {
                        return /* SetPeg */[
                                n,
                                str
                              ];
                      })),
                /* :: */[
                  Vdom.attribute("", "maxlength", "1"),
                  /* [] */0
                ]
              ]
            ], /* [] */0);
}

function view_enterguess(model) {
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
              view_peginput(model[/* currentGuess */1][/* one */0], 0),
              /* :: */[
                view_peginput(model[/* currentGuess */1][/* two */1], 1),
                /* :: */[
                  view_peginput(model[/* currentGuess */1][/* three */2], 2),
                  /* :: */[
                    view_peginput(model[/* currentGuess */1][/* four */3], 3),
                    /* :: */[
                      Tea_html.button(undefined, undefined, /* :: */[
                            Tea_html.onClick(/* Guess */0),
                            /* [] */0
                          ], /* :: */[
                            Tea_html.text("Guess"),
                            /* [] */0
                          ]),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]);
}

function view_pastguess(pastGuess) {
  var guess = pastGuess[/* guess */0];
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
              Tea_html.text(pegToLetter(List.nth(guess, 0))),
              /* :: */[
                Tea_html.text(pegToLetter(List.nth(guess, 1))),
                /* :: */[
                  Tea_html.text(pegToLetter(List.nth(guess, 2))),
                  /* :: */[
                    Tea_html.text(pegToLetter(List.nth(guess, 3))),
                    /* :: */[
                      Tea_html.text(" SCORE: "),
                      /* :: */[
                        Tea_html.text("exact: " + String(pastGuess[/* score */1][/* exactMatches */0])),
                        /* :: */[
                          Tea_html.text(" partial: " + String(pastGuess[/* score */1][/* colorMatches */1])),
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

function view_pastguesses(model) {
  return Tea_html.div(undefined, undefined, /* [] */0, List.map(view_pastguess, model[/* pastGuesses */2]));
}

function view(model) {
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
              Tea_html.header(undefined, undefined, /* :: */[
                    Tea_html.style("text-align", "center"),
                    /* [] */0
                  ], /* :: */[
                    Tea_html.h1(undefined, undefined, /* [] */0, /* :: */[
                          Tea_html.text("MasterMind!"),
                          /* [] */0
                        ]),
                    /* [] */0
                  ]),
              /* :: */[
                view_enterguess(model),
                /* :: */[
                  Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
                        Tea_html.text(model[/* currentGuess */1][/* one */0]),
                        /* :: */[
                          Tea_html.text(model[/* currentGuess */1][/* two */1]),
                          /* :: */[
                            Tea_html.text(model[/* currentGuess */1][/* three */2]),
                            /* :: */[
                              Tea_html.text(model[/* currentGuess */1][/* four */3]),
                              /* [] */0
                            ]
                          ]
                        ]
                      ]),
                  /* :: */[
                    view_pastguesses(model),
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

var partial_arg_000 = /* model : record */[
  /* secret : :: */[
    /* Red */0,
    /* :: */[
      /* Red */0,
      /* :: */[
        /* Green */1,
        /* :: */[
          /* Green */1,
          /* [] */0
        ]
      ]
    ]
  ],
  /* currentGuess */emptyGuess,
  /* pastGuesses : [] */0
];

var partial_arg = /* record */[
  partial_arg_000,
  /* update */update,
  /* view */view
];

function main(param, param$1) {
  return Tea_app.beginnerProgram(partial_arg, param, param$1);
}

exports.pegToLetter = pegToLetter;
exports.InvalidLetter = InvalidLetter;
exports.letterToPeg = letterToPeg;
exports.emptyGuess = emptyGuess;
exports.init = init;
exports.setPeg = setPeg;
exports.handleGuess = handleGuess;
exports.update = update;
exports.view_peginput = view_peginput;
exports.view_enterguess = view_enterguess;
exports.view_pastguess = view_pastguess;
exports.view_pastguesses = view_pastguesses;
exports.view = view;
exports.main = main;
/* Tea_html Not a pure module */
