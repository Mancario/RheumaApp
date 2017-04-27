import { Injectable } from '@angular/core';
import { HAQEntryAnswer } from "../e-haq/e-haq-service"


@Injectable()
export class HaqAnswerForm {
    private edit = false;
    private date = null; 
   private answer = {
            DIFF_SELBST_ANZIEHEN: null,
            DIFF_HAARE_WASCHEN: null,
            HILFSMITTEL_ZUM_ANZIEHEN: null,
            HILFE_ANZIEHEN_KOERPERPFLEGE: null,

            DIFF_STUHL_AUFSTEHEN: null,
            DIFF_BETT_LEGEN_AUFSTEHEN: null,
            HILFSMITTEL_ANGEPASSTER_STUHL: null,
            HILFE_AUFSTEHEN: null,

            // ESSEN
            DIFF_FLEISCH_SCHNEIDEN: null,
            DIFF_TASSE_GLAS_MUND: null,
            DIFF_MILCHKARTON_OEFFNEN: null,
            HILFSMITTEL_ANGEPASST: null,
            HILFE_ESSEN: null,

            // GEHEN
            DIFF_GEHEN_AUF_EBENEM_UNTERGRUND: null,
            DIFF_FUENF_TREPPENSTUFEN_HOCHGEHEN: null,
            HILFSMITTEL_GEHSTOCK: null,
            HILFSMITTEL_GEHHILFE_ROLLATOR: null,
            HILFSMITTEL_KRUECKEN: null,
            HILFSMITTEL_ROLLSTUHL: null,
            HILFE_GEHEN: null,

            // hygiene
            DIFF_WASCHEN_ABTROCKNEN: null,
            DIFF_VOLLBAD_NEHMEN: null,
            DIFF_TOILETTE_SETZEN_AUFSTEHEN: null,
            HILFSMITTEL_TOILETTENSITZ: null,
            HILFSMITTEL_BADEWANNENSITZ: null,
            HILFSMITTEL_BADEWANNENHANDGRIFF: null,
            HILFSMITTEL_LANGER_HANDGRIFF_BADEZIMMER: null,
            HILFE_HYGIENE: null,

            // Nach etwas greifen
            DIFF_SCHWEREN_GEGENSTAND_AUFHEBEN: null,
            DIFF_BUECKEN_KLEIDUNGSSTUECK_AUFHEBEN: null,
            HILFSMITTEL_LANGER_HANDGRIFF_GREIFHILFE: null,
            HILFE_NACH_ETWAS_GREIFEN: null,

            // GREIFEN_UND_OEFFNEN
            DIFF_AUTOTUER_OEFFNEN: null,
            DIFF_KONSERVENGLAESER_OEFFNEN: null,
            DIFF_WASSERHAEHNE_AUF_ZUDREHEN: null,
            HILFSMITTEL_OEFFNER_SCHRAUBVERSCHLUESSE: null,
            HILFE_GREIFEN_UND_OEFFNEN: null,

            // ANDERE_TAETIGKEITEN
            DIFF_BESORGUNGEN_MACHEN_EINKAUFEN: null,
            DIFF_AUTO_EIN_AUSSTEIGEN: null,
            DIFF_HAUSARBEITEN_GARTENARBEITEN: null,
            HILFE_BESORGUNGEN_HAUSARBEITEN: null,
        }
    private answerCopy;
    private list;

    public constructor() {
        this.answerCopy = this.answer;
    }

    public getDate(): any{
        return this.date; 
    }
    public isEdit(): any{
        return this.edit; 
    }



    public getMappingList(): any {
        return this.answer;
    }

    public getEditList(): any {
        return this.list;
    }
    public setList(answers: Array<HAQEntryAnswer>, date: any) {
        this.date = date; 
        this.list = answers;
        this.edit = true;

        answers.forEach(element => {
            var string = element.questionId;
            this.answer[string] = element.answer;
        });
         

    }
    public exit() {
        this.edit = false;
        this.list = null;
        this.date = null; 
    }

    public newList() {
        this.answer = {
            DIFF_SELBST_ANZIEHEN: null,
            DIFF_HAARE_WASCHEN: null,
            HILFSMITTEL_ZUM_ANZIEHEN: null,
            HILFE_ANZIEHEN_KOERPERPFLEGE: null,

            DIFF_STUHL_AUFSTEHEN: null,
            DIFF_BETT_LEGEN_AUFSTEHEN: null,
            HILFSMITTEL_ANGEPASSTER_STUHL: null,
            HILFE_AUFSTEHEN: null,

            // ESSEN
            DIFF_FLEISCH_SCHNEIDEN: null,
            DIFF_TASSE_GLAS_MUND: null,
            DIFF_MILCHKARTON_OEFFNEN: null,
            HILFSMITTEL_ANGEPASST: null,
            HILFE_ESSEN: null,

            // GEHEN
            DIFF_GEHEN_AUF_EBENEM_UNTERGRUND: null,
            DIFF_FUENF_TREPPENSTUFEN_HOCHGEHEN: null,
            HILFSMITTEL_GEHSTOCK: null,
            HILFSMITTEL_GEHHILFE_ROLLATOR: null,
            HILFSMITTEL_KRUECKEN: null,
            HILFSMITTEL_ROLLSTUHL: null,
            HILFE_GEHEN: null,

            // hygiene
            DIFF_WASCHEN_ABTROCKNEN: null,
            DIFF_VOLLBAD_NEHMEN: null,
            DIFF_TOILETTE_SETZEN_AUFSTEHEN: null,
            HILFSMITTEL_TOILETTENSITZ: null,
            HILFSMITTEL_BADEWANNENSITZ: null,
            HILFSMITTEL_BADEWANNENHANDGRIFF: null,
            HILFSMITTEL_LANGER_HANDGRIFF_BADEZIMMER: null,
            HILFE_HYGIENE: null,

            // Nach etwas greifen
            DIFF_SCHWEREN_GEGENSTAND_AUFHEBEN: null,
            DIFF_BUECKEN_KLEIDUNGSSTUECK_AUFHEBEN: null,
            HILFSMITTEL_LANGER_HANDGRIFF_GREIFHILFE: null,
            HILFE_NACH_ETWAS_GREIFEN: null,

            // GREIFEN_UND_OEFFNEN
            DIFF_AUTOTUER_OEFFNEN: null,
            DIFF_KONSERVENGLAESER_OEFFNEN: null,
            DIFF_WASSERHAEHNE_AUF_ZUDREHEN: null,
            HILFSMITTEL_OEFFNER_SCHRAUBVERSCHLUESSE: null,
            HILFE_GREIFEN_UND_OEFFNEN: null,

            // ANDERE_TAETIGKEITEN
            DIFF_BESORGUNGEN_MACHEN_EINKAUFEN: null,
            DIFF_AUTO_EIN_AUSSTEIGEN: null,
            DIFF_HAUSARBEITEN_GARTENARBEITEN: null,
            HILFE_BESORGUNGEN_HAUSARBEITEN: null,
        }
    }





}