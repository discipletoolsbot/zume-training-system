export const ZumeWizards = {
    gettingStarted: 'getting-started',
    makeAGroup: 'make-a-group',
    getACoach: 'get-a-coach',
    joinAPlan: 'join-a-training',
    connectWithFriend: 'connect-with-friend',
    joinFriendsPlan: 'join-friends-training',
    checkin: 'checkin',
}
export const ZumeWizardModules = {
    completeProfile: 'completeProfile',
    makePlan: 'makePlan',
    inviteFriends: 'inviteFriends',
    getACoach: 'getACoach',
    joinTraining: 'joinTraining',
    connectFriend: 'connectFriend',
    joinFriendsTraining: 'joinFriendsTraining',
    checkin: 'checkin',
    planDecision: 'planDecision'
}
const makeAPlanSteps = {
    howManySessions: 'how-many-sessions',
    whatTimeOfDay: 'what-time-of-day',
    howOften: 'how-often',
    startDate: 'what-start-date',
}
export const ZumeWizardSteps = {
    updateName: 'update-your-name',
    updateLocation: 'update-your-location',
    updatePhone: 'update-your-phone',
    inviteFriends: 'invite-friends',
    contactPreferences: 'contact-preferences',
    languagePreferences: 'preferred-language',
    howCanWeServe: 'how-can-we-serve',
    connectingToCoach: 'connecting-to-coach',
    joinTraining: 'join-training',
    connectToFriend: 'connect-friend',
    joinFriendsPlan: 'join-friends-training',
    checkinSubmit: 'checkin-submit',
    ...makeAPlanSteps,
}
export const ZumeWizardStepsConnectedFields = {
    [ZumeWizardSteps.updateName]: {
        field: 'name',
        testExistance: (field, profile) => profile.has_set_name
    },
    [ZumeWizardSteps.updateLocation]: {
        field: 'location',
        testExistance: (field) => {
            if (field.source && field.source === 'ip') {
                return false
            }
            return true
        }
    },
    [ZumeWizardSteps.updatePhone]: {
        field: 'phone',
        testExistance: (phone) => !!phone
    },
}