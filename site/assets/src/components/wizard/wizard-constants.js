export const Wizards = {
    gettingStarted: 'getting-started',
    makeAGroup: 'make-a-group',
    makeFirstGroup: 'make-first-group',
    makeMoreGroups: 'make-more-groups',
    getACoach: 'get-a-coach',
    joinATraining: 'join-a-training',
    connectWithFriend: 'connect-with-friend',
    joinFriendsPlan: 'join-friends-training',
    checkin: 'checkin',
    setProfile: 'set-profile',
    joinCommunity: 'join-the-community',
    inviteFriends: 'invite'
}
export const Modules = {
    completeProfile: 'completeProfile',
    makePlan: 'makePlan',
    inviteFriends: 'inviteFriends',
    getACoach: 'getACoach',
    joinTraining: 'joinTraining',
    connectFriend: 'connectFriend',
    joinFriendsTraining: 'joinFriendsTraining',
    checkin: 'checkin',
    planDecision: 'planDecision',
    joinCommunity: 'joinCommunity',
}
const makeAPlanSteps = {
    planDecision: 'plan-decision',
    howManySessions: 'how-many-sessions',
    scheduleDecision: 'schedule-decision',
    howOften: 'how-often',
    startDate: 'what-start-date',
    timeNote: 'time-note',
    location: 'what-location',
    review: 'review-steps',
    name: 'group-name',
}
export const Steps = {
    updateName: 'update-your-name',
    updateLocation: 'update-your-location',
    updatePhone: 'update-your-phone',
    inviteFriends: 'invite-friends',
    contactPreferences: 'contact-preferences',
    languagePreferences: 'preferred-language',
    howCanWeServe: 'how-can-we-serve',
    connectingToCoach: 'connecting-to-coach',
    joinTraining: 'public-training',
    connectToFriend: 'connect-friend',
    joinFriendsPlan: 'friend-training',
    checkinSubmit: 'checkin-submit',
    joinCommunity: 'join-community',
    ...makeAPlanSteps,
}
export const ConnectedFields = {
    [Steps.updateName]: {
        field: 'name',
        testExistance: (field, profile) => profile.has_set_name
    },
    [Steps.updateLocation]: {
        field: 'location',
        testExistance: (field) => {
            if (field.source && field.source === 'ip') {
                return false
            }
            return true
        }
    },
    [Steps.updatePhone]: {
        field: 'phone',
        testExistance: (phone) => !!phone
    },
}