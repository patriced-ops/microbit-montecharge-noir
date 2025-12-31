/******************************
 * VOCABULAIRE PÉDAGOGIQUE
 ******************************/

enum OuiNon {
    //% block="OUI"
    OUI = 1,
    //% block="NON"
    NON = 0
}

enum CapteurMonteCharge {
    //% block="fin de course haut"
    FinCourseHaut,
    //% block="fin de course milieu"
    FinCourseMilieu,
    //% block="fin de course bas"
    FinCourseBas,
    //% block="bouton appel haut"
    BoutonHaut,
    //% block="bouton appel milieu"
    BoutonMilieu,
    //% block="bouton appel bas"
    BoutonBas
}

enum ActionMonteCharge {
    //% block="monter"
    Monter,
    //% block="descendre"
    Descendre,
    //% block="arrêter"
    Arreter
}

/******************************
 * MAPPING MATÉRIEL (INTERNE)
 ******************************/

function pinCapteur(capteur: CapteurMonteCharge): DigitalPin {
    switch (capteur) {
        case CapteurMonteCharge.FinCourseHaut: return DigitalPin.P8
        case CapteurMonteCharge.FinCourseMilieu: return DigitalPin.P1
        case CapteurMonteCharge.FinCourseBas: return DigitalPin.P15
        case CapteurMonteCharge.BoutonHaut: return DigitalPin.P13
        case CapteurMonteCharge.BoutonMilieu: return DigitalPin.P16
        case CapteurMonteCharge.BoutonBas: return DigitalPin.P2
    }
}

function pinMonter(): DigitalPin {
    return DigitalPin.P0
}

function pinDescendre(): DigitalPin {
    return DigitalPin.P14
}

/******************************
 * BLOCS MAKECODE (ÉLÈVES)
 ******************************/

/**
 * Extension pédagogique pour monte-charge (noir)
 */
//% color=#000000 weight=100 icon="\uf0d1"
namespace montecharge {

    /**
     * Indique si un capteur est activé
     */
    //% block="capteur %capteur activé"
    export function capteurActif(capteur: CapteurMonteCharge): OuiNon {
        return pins.digitalReadPin(pinCapteur(capteur)) == 1
            ? OuiNon.OUI
            : OuiNon.NON
    }

    /**
     * Version logique pour les conditions "si"
     */
    //% block="capteur %capteur est activé"
    export function capteur(capteur: CapteurMonteCharge): boolean {
        return pins.digitalReadPin(pinCapteur(capteur)) == 1
    }

    /**
     * Commande le moteur du monte-charge
     */
    //% block="moteur monte-charge : %action"
    export function moteur(action: ActionMonteCharge): void {
        switch (action) {
            case ActionMonteCharge.Monter:
                pins.digitalWritePin(pinMonter(), 1)
                pins.digitalWritePin(pinDescendre(), 0)
                break

            case ActionMonteCharge.Descendre:
                pins.digitalWritePin(pinMonter(), 0)
                pins.digitalWritePin(pinDescendre(), 1)
                break

            case ActionMonteCharge.Arreter:
                pins.digitalWritePin(pinMonter(), 0)
                pins.digitalWritePin(pinDescendre(), 0)
                break
        }
    }
}
