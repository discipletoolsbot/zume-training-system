export const ZumeWizards = {
    makeAPlan: 'getting-started',
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
}
export const ZumeWizardStepsConnectedFields = {
    [ZumeWizardSteps.updateName]: {
        field: 'name',
        testExistance: () => false
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