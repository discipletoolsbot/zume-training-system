import {
    Wizards,
    Modules,
    Steps,
} from "./wizard-constants";

export const wizardDefinitions = {
    [Wizards.gettingStarted]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], false),
        [Modules.planDecision]: makeModule([
            Steps.planDecision
        ], false),
    },
    [Wizards.setProfile]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], true),
    },
    [Wizards.makeFirstGroup]: {
        [Modules.makePlan]: makeModule([
            Steps.howManySessions,
            Steps.scheduleDecision,
            Steps.howOften,
            Steps.startDate,
            Steps.location,
            Steps.review,
        ], true),
    },
    [Wizards.makeMoreGroups]: {
        [Modules.makePlan]: makeModule([
            Steps.howManySessions,
            Steps.scheduleDecision,
            Steps.howOften,
            Steps.startDate,
            Steps.location,
            Steps.name,
            Steps.review,
        ], true),
    },
    [Wizards.inviteFriends]: {
        [Modules.inviteFriends]: makeModule([
            Steps.inviteFriends,
        ], true)
    },
    [Wizards.getACoach]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
            Steps.updatePhone,
        ]),
        [Modules.getACoach]: makeModule([
            Steps.contactPreferences,
            Steps.languagePreferences,
            Steps.howCanWeServe,
            Steps.connectingToCoach,
        ], true),
    },
    [Wizards.joinATraining]: {
        [Modules.joinTraining]: makeModule([
            Steps.joinTrainingSelection,
            Steps.updateName,
            Steps.updateLocation,
            Steps.contactPreferences,
            Steps.updatePhone,
            Steps.joinTraining,
        ]),
    },
    [Wizards.connectWithFriend]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], true),
        [Modules.connectFriend]: makeModule([
            Steps.connectToFriend,
        ])
    },
    [Wizards.joinFriendsPlan]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], true),
        [Modules.joinFriendsTraining]: makeModule([
            Steps.joinFriendsPlan,
        ])
    },
    [Wizards.joinCommunity]: {
        [Modules.joinCommunity]: makeModule([
            Steps.joinCommunityExplanation,
            Steps.contactPreferences,
            Steps.updatePhone,
            Steps.updateLocation,
            Steps.joinCommunity
        ], true),
    },
    [Wizards.joinCommunityFromVision]: {
        [Modules.joinCommunityFromVision]: makeModule([
            Steps.joinCommunityExplanation,
            Steps.updateName,
            Steps.updateLocation,
            Steps.contactPreferences,
            Steps.updatePhone,
            Steps.languagePreferences,
            Steps.joinCommunity,
        ], true),
    },
    [Wizards.checkin]: {
        [Modules.checkin]: makeModule([
            Steps.checkinSubmit,
        ], true)
    },
}

function makeModule( stepNames = [], skippable = false ) {

    const module = {
        steps: [],
        skippable,
    }

    stepNames.forEach(stepName => {
        if ( !Object.values(Steps).includes(stepName) ) {
            return
        }
        module.steps.push(stepName)
    });

    return module
}
