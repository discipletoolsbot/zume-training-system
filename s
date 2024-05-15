[1mdiff --git a/site/assets/dist/assets/main-bundle.js b/site/assets/dist/assets/main-bundle.js[m
[1mindex 50f80c7..0f8c802 100644[m
[1m--- a/site/assets/dist/assets/main-bundle.js[m
[1m+++ b/site/assets/dist/assets/main-bundle.js[m
[36m@@ -1 +1 @@[m
[31m-Contents hidden from diff /tmp/MdouHf_main-bundle.js[m
[32m+[m[32mContents hidden from diff site/assets/dist/assets/main-bundle.js[m
[1mdiff --git a/site/assets/dist/assets/main-bundle.js.map b/site/assets/dist/assets/main-bundle.js.map[m
[1mindex 37152cb..8d9dc5f 100644[m
[1m--- a/site/assets/dist/assets/main-bundle.js.map[m
[1m+++ b/site/assets/dist/assets/main-bundle.js.map[m
[36m@@ -1 +1 @@[m
[31m-Contents hidden from diff /tmp/UDRt0f_main-bundle.js.map[m
[32m+[m[32mContents hidden from diff site/assets/dist/assets/main-bundle.js.map[m
[1mdiff --git a/site/assets/src/components/wizard/wizard-constants.js b/site/assets/src/components/wizard/wizard-constants.js[m
[1mindex 9da13e2..9f3b2dc 100644[m
[1m--- a/site/assets/src/components/wizard/wizard-constants.js[m
[1m+++ b/site/assets/src/components/wizard/wizard-constants.js[m
[36m@@ -1,6 +1,8 @@[m
 export const Wizards = {[m
     gettingStarted: 'getting-started',[m
     makeAGroup: 'make-a-group',[m
[32m+[m[32m    makeFirstGroup: 'make-first-group',[m
[32m+[m[32m    makeMoreGroups: 'make-more-groups',[m
     getACoach: 'get-a-coach',[m
     joinATraining: 'join-a-training',[m
     connectWithFriend: 'connect-with-friend',[m
[1mdiff --git a/site/assets/src/components/wizard/wizard-definitions.js b/site/assets/src/components/wizard/wizard-definitions.js[m
[1mindex 552403a..c56b264 100644[m
[1m--- a/site/assets/src/components/wizard/wizard-definitions.js[m
[1m+++ b/site/assets/src/components/wizard/wizard-definitions.js[m
[36m@@ -20,7 +20,16 @@[m [mexport const wizardDefinitions = {[m
             Steps.updateLocation,[m
         ], true),[m
     },[m
[31m-    [Wizards.makeAGroup]: {[m
[32m+[m[32m    [Wizards.makeFirstGroup]: {[m
[32m+[m[32m        [Modules.makePlan]: makeModule([[m
[32m+[m[32m            Steps.location,[m
[32m+[m[32m            Steps.howManySessions,[m
[32m+[m[32m            Steps.howOften,[m
[32m+[m[32m            Steps.startDate,[m
[32m+[m[32m            Steps.review,[m
[32m+[m[32m        ], true),[m
[32m+[m[32m    },[m
[32m+[m[32m    [Wizards.makeMoreGroups]: {[m
         [Modules.makePlan]: makeModule([[m
             Steps.name,[m
             Steps.location,[m
[1mdiff --git a/site/assets/src/components/wizard/zume-wizard.js b/site/assets/src/components/wizard/zume-wizard.js[m
[1mindex 760a030..37f5574 100644[m
[1m--- a/site/assets/src/components/wizard/zume-wizard.js[m
[1m+++ b/site/assets/src/components/wizard/zume-wizard.js[m
[36m@@ -57,6 +57,7 @@[m [mexport class Wizard extends LitElement {[m
     }[m
     connectedCallback() {[m
         super.connectedCallback()[m
[32m+[m[32m        this.wizard = new WizardModuleManager( this.user )[m
         window.addEventListener('popstate', this._handleHistoryPopState)[m
         window.addEventListener('wizard:load', this._handleLoadWizard)[m
         window.addEventListener('wizard:goto-step', this._handleGotoStep)[m
[36m@@ -70,7 +71,6 @@[m [mexport class Wizard extends LitElement {[m
     }[m
 [m
     firstUpdated() {[m
[31m-        this.loadWizard()[m
         this._handleHistoryPopState( true )[m
 [m
         if (this.translations) {[m
[36m@@ -81,16 +81,30 @@[m [mexport class Wizard extends LitElement {[m
     willUpdate(properties) {[m
         if (properties.has('type') && this.type === '') {[m
             this.resetWizard()[m
[32m+[m[32m            return[m
         }[m
         if (properties.has('type') && this.type !== '') {[m
[31m-            this.loadWizard()[m
[32m+[m[32m            this.loadWizard(this.type)[m
[32m+[m[32m            return[m
         }[m
     }[m
 [m
[31m-    loadWizard() {[m
[31m-        this.wizard = new WizardModuleManager( this.user )[m
[31m-        this.steps = this.wizard.getSteps(this.type)[m
[31m-        this._gotoStep(0)[m
[32m+[m[32m    loadWizard(wizard) {[m
[32m+[m[32m        let wizardToLoad = wizard[m
[32m+[m[32m        if (wizard === Wizards.makeAGroup) {[m
[32m+[m[32m            if (jsObject.has_training_group) {[m
[32m+[m[32m                wizardToLoad = Wizards.makeMoreGroups[m
[32m+[m[32m            } else {[m
[32m+[m[32m                wizardToLoad = Wizards.makeFirstGroup[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        if (Object.values(Wizards).includes(wizardToLoad)) {[m
[32m+[m[32m            this.steps = this.wizard.getSteps( wizardToLoad )[m
[32m+[m[32m            this._gotoStep(0)[m
[32m+[m[32m        } else {[m
[32m+[m[32m            this._onSkip()[m
[32m+[m[32m        }[m
     }[m
 [m
     resetWizard() {[m
[36m@@ -440,12 +454,8 @@[m [mexport class Wizard extends LitElement {[m
     _handleLoadWizard(event) {[m
         const { wizard } = event.detail[m
 [m
[31m-        if (Object.values(Wizards).includes(wizard)) {[m
[31m-            this.steps = this.wizard.getSteps( wizard )[m
[31m-            this._gotoStep(0)[m
[31m-        } else {[m
[31m-            this._onSkip()[m
[31m-        }[m
[32m+[m[32m        this.loadWizard(wizard)[m
[32m+[m
     }[m
 [m
     _handleLoading(event) {[m
[1mdiff --git a/site/dashboard/wizard.php b/site/dashboard/wizard.php[m
[1mindex adc0cec..649bbd2 100644[m
[1m--- a/site/dashboard/wizard.php[m
[1m+++ b/site/dashboard/wizard.php[m
[36m@@ -90,6 +90,7 @@[m [mclass Zume_Training_Wizard extends Zume_Magic_Page[m
                 'translations' => $this->translations(),[m
                 'map_key' => DT_Mapbox_API::get_key(),[m
                 'profile' => $zume_user_profile,[m
[32m+[m[32m                'has_training_group' => !empty( zume_get_user_plans( get_current_user_id() ) ),[m
                 'privacy_url' => zume_privacy_url(),[m
                 'mapbox_selected_id' => 'current',[m
                 'checkin_dashboard_url' => zume_checkin_dashboard_url(),[m
