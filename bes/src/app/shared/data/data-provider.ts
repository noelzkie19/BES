import states from './json/states.json'
import addressType from './json/addressType.json'
import clientType from './json/clientType.json'
import natureOfConference from './json/natureOfConference.json'
import determineCause from './json/determineCause.json'
import correctiveAction from './json/correctiveAction.json'
import ncRecorderBy from './json/NCrecordedBy.json'
import reviewOfCorrectiveAction from './json/reviewOfCorrectiveAction.json'

const dataProvider = {
    states: states,
    addressType: addressType,
    clientType: clientType,
    natureOfConference: natureOfConference,
    determineCause: determineCause,
    correctiveAction: correctiveAction,
    reviewOfCorrectiveAction: reviewOfCorrectiveAction,
    ncRecorderBy: ncRecorderBy
}

export { dataProvider }
