import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'haqify'
})
// The work of the pipe is handled in the tranform method with our pipe's class
export class HaqifyPipe implements PipeTransform {
    private _map = {
        "ANZIEHEN_KOERPERFLEGE": "Anziehen & Körperpflege",
        "DIFF_SELBST_ANZIEHEN": "sich selbst anziehen, einschließlich Schuhe binden und Knöpfe schließen?",
        "DIFF_HAARE_WASCHEN": "sich die Haare waschen?",
        "HILFSMITTEL_ZUM_ANZIEHEN": "Hilfsmittel zum Anziehen (Knopföffner, Schlitten für Reißverschlüsse, langer Schuhlöffel usw.)",
        "HILFE_ANZIEHEN_KOERPERPFLEGE": "Anziehen & Körperpflege",

        "AUFSTEHEN": "Aufstehen",
        "DIFF_STUHL_AUFSTEHEN": "von einem Stuhl ohne Armlehne aufstehen?",
        "DIFF_BETT_LEGEN_AUFSTEHEN": "sich ins Bett legen und aufstehen?",
        "HILFSMITTEL_ANGEPASSTER_STUHL": "Speziell angepasster Stuhl",
        "HILFE_AUFSTEHEN": "Aufstehen",

        "ESSEN": "Essen",
        "DIFF_FLEISCH_SCHNEIDEN": "Fleisch schneiden?",
        "DIFF_TASSE_GLAS_MUND": "eine volle Tasse oder ein volles Glas zum Mund führen?",
        "DIFF_MILCHKARTON_OEFFNEN": "einen neuen Milchkarton (TetraPak) öffnen?",
        "HILFSMITTEL_ANGEPASST": "Speziell angepasste Hilfsmittel (z.B. zum Essen und Kochen)?",
        "HILFE_ESSEN": "Essen",

        "GEHEN": "Gehen",
        "DIFF_GEHEN_AUF_EBENEM_UNTERGRUND": "draußen auf ebenem Untergrund gehen?",
        "DIFF_FUENF_TREPPENSTUFEN_HOCHGEHEN": "fünf Treppenstufen hochgehen?",
        "HILFSMITTEL_GEHSTOCK": "Gehstock",
        "HILFSMITTEL_GEHHILFE_ROLLATOR": "Gehhilfe (Rollator)",
        "HILFSMITTEL_KRUECKEN": "Krücken",
        "HILFSMITTEL_ROLLSTUHL": "Rollstuhl",
        "HILFE_GEHEN": "Gehen",

        "HYGIENE": "Hygiene",
        "DIFF_WASCHEN_ABTROCKNEN": "sich ganz waschen und abtrocknen?",
        "DIFF_VOLLBAD_NEHMEN": "ein Vollbad nehmen?",
        "DIFF_TOILETTE_SETZEN_AUFSTEHEN": "sich auf die Toilette setzen und wieder aufstehen?",
        "HILFSMITTEL_TOILETTENSITZ": "Erhöhter Toilettensitz",
        "HILFSMITTEL_BADEWANNENSITZ": "Badewannensitz",
        "HILFSMITTEL_BADEWANNENHANDGRIFF": "Badewannenhandgriff",
        "HILFSMITTEL_LANGER_HANDGRIFF_BADEZIMMER": "Hilfsmittel mit langem Handgriff für das Badezimmer (z.B. eine Bürste)",
        "HILFE_HYGIENE": "Hygiene",

        "NACH_ETWAS_GREIFEN": "Nach etwas greifen",
        "DIFF_SCHWEREN_GEGENSTAND_AUFHEBEN":
            "einen etwa 2 kg schweren Gegenstand von einer Stelle über Kopfhöhe herunterheben (z.B. eine große Tüte Zucker)?",
        "DIFF_BUECKEN_KLEIDUNGSSTUECK_AUFHEBEN": "sich bücken, um ein Kleidungsstück vom Fußboden aufzuheben?",
        "HILFSMITTEL_LANGER_HANDGRIFF_GREIFHILFE": "Greifhilfen mit langem Handgriff",
        "HILFE_NACH_ETWAS_GREIFEN": "Nach etwas greifen",

        "GREIFEN_UND_OEFFNEN": "Greifen und öffnen",
        "DIFF_AUTOTUER_OEFFNEN": "Autotüren öffnen?",
        "DIFF_KONSERVENGLAESER_OEFFNEN": "Konservengläser öffnen, die schon einmal offen waren?",
        "DIFF_WASSERHAEHNE_AUF_ZUDREHEN": "Wasserhähne auf- und zudrehen?",
        "HILFSMITTEL_OEFFNER_SCHRAUBVERSCHLUESSE": "Öffner für Schraubverschlüsse (für Gläser, die schon einmal offen waren)",
        "HILFE_GREIFEN_UND_OEFFNEN": "Greifen und Öffnen von Gegenständen",

        "ANDERE_TAETIGKEITEN": "Andere Tätigkeiten",
        "DIFF_BESORGUNGEN_MACHEN_EINKAUFEN": "Besorgungen machen und einkaufen?",
        "DIFF_AUTO_EIN_AUSSTEIGEN": "in ein Auto ein- und aussteigen?",
        "DIFF_HAUSARBEITEN_GARTENARBEITEN": "Hausarbeiten oder Gartenarbeiten erledigen (z.B. Staubsaugen oder Unkraut jäten)?",
        "HILFE_BESORGUNGEN_HAUSARBEITEN": "Besorgungen und Hausarbeiten",
    };

    public transform(value: string, args: any[]) {
        var res = this._map[value];
        return res ? res : value;
    }

}
