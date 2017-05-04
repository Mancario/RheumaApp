import { Injectable } from '@angular/core';
import { HAQSheet } from "./e-haq-service"


@Injectable()
export class HaqSheetForm {
    public sheet =
     {
      "pages": [
        {
        "index": 0,
        "categories": [
         {
           "categoryId": "ANZIEHEN_KOERPERFLEGE",
           "difficulties": [
             {
               "questionId": "DIFF_SELBST_ANZIEHEN"
             },
             {
               "questionId": "DIFF_HAARE_WASCHEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_ANZIEHEN_KOERPERPFLEGE"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_ZUM_ANZIEHEN"
             }
           ]
         },
         {
           "categoryId": "AUFSTEHEN",
           "difficulties": [
             {
               "questionId": "DIFF_STUHL_AUFSTEHEN"
             },
             {
               "questionId": "DIFF_BETT_LEGEN_AUFSTEHEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_AUFSTEHEN"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_ANGEPASSTER_STUHL"
             }
           ]
         },
         {
           "categoryId": "ESSEN",
           "difficulties": [
             {
               "questionId": "DIFF_FLEISCH_SCHNEIDEN"
             },
             {
               "questionId": "DIFF_TASSE_GLAS_MUND"
             },
             {
               "questionId": "DIFF_MILCHKARTON_OEFFNEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_ESSEN"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_ANGEPASST"
             }
           ]
         },
         {
           "categoryId": "GEHEN",
           "difficulties": [
             {
               "questionId": "DIFF_GEHEN_AUF_EBENEM_UNTERGRUND"
             },
             {
               "questionId": "DIFF_FUENF_TREPPENSTUFEN_HOCHGEHEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_GEHEN"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_GEHSTOCK"
             },
             {
               "questionId": "HILFSMITTEL_GEHHILFE_ROLLATOR"
             },
             {
               "questionId": "HILFSMITTEL_KRUECKEN"
             },
             {
               "questionId": "HILFSMITTEL_ROLLSTUHL"
             }
           ]
         }
        ]
        },
        {
        "index": 1,
        "categories": [
         {
           "categoryId": "HYGIENE",
           "difficulties": [
             {
               "questionId": "DIFF_WASCHEN_ABTROCKNEN"
             },
             {
               "questionId": "DIFF_VOLLBAD_NEHMEN"
             },
             {
               "questionId": "DIFF_TOILETTE_SETZEN_AUFSTEHEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_HYGIENE"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_TOILETTENSITZ"
             },
             {
               "questionId": "HILFSMITTEL_BADEWANNENSITZ"
             },
             {
               "questionId": "HILFSMITTEL_BADEWANNENHANDGRIFF"
             },
             {
               "questionId": "HILFSMITTEL_LANGER_HANDGRIFF_BADEZIMMER"
             }
           ]
         },
         {
           "categoryId": "NACH_ETWAS_GREIFEN",
           "difficulties": [
             {
               "questionId": "DIFF_SCHWEREN_GEGENSTAND_AUFHEBEN"
             },
             {
               "questionId": "DIFF_BUECKEN_KLEIDUNGSSTUECK_AUFHEBEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_NACH_ETWAS_GREIFEN"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_LANGER_HANDGRIFF_GREIFHILFE"
             }
           ]
         },
         {
           "categoryId": "GREIFEN_UND_OEFFNEN",
           "difficulties": [
             {
               "questionId": "DIFF_AUTOTUER_OEFFNEN"
             },
             {
               "questionId": "DIFF_KONSERVENGLAESER_OEFFNEN"
             },
             {
               "questionId": "DIFF_WASSERHAEHNE_AUF_ZUDREHEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_GREIFEN_UND_OEFFNEN"
             }
           ],
           "tools": [
             {
               "questionId": "HILFSMITTEL_OEFFNER_SCHRAUBVERSCHLUESSE"
             }
           ]
         },
         {
           "categoryId": "ANDERE_TAETIGKEITEN",
           "difficulties": [
             {
               "questionId": "DIFF_BESORGUNGEN_MACHEN_EINKAUFEN"
             },
             {
               "questionId": "DIFF_AUTO_EIN_AUSSTEIGEN"
             },
             {
               "questionId": "DIFF_HAUSARBEITEN_GARTENARBEITEN"
             }
           ],
           "help": [
             {
               "questionId": "HILFE_BESORGUNGEN_HAUSARBEITEN"
             }
           ],
           "tools": []
         }
        ]
        }
        ]
        }






}
