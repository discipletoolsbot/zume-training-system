console.log('User Profile')
console.log(zumeForms.user_profile)

// listeners
jQuery(document).ready(function() {
  jQuery('.cta_set_profile').click(function() {
    window.cta_set_profile()
  })
  jQuery('.cta_get_a_coach').click(function() {
    window.cta_get_a_coach()
  })
  jQuery('.cta_make_a_plan').click(function() {
    window.cta_make_a_plan()
  })
  jQuery('.cta_invite_friends').click(function() {
    window.cta_invite_friends()
  })
  jQuery('.cta_join_training').click(function() {
    window.cta_join_training()
  })
})

window.cta_set_profile = () => {
  console.log('cta_set_profile')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  let html = ``
  title.empty()
  content.empty()

  title.append('Set Profile<hr>')

  html += `<div class="grid-x grid-padding-x">`

  if ( zumeForms.user_profile.name ) {

  }
  if ( zumeForms.user_profile.email ) {

  }
  if ( zumeForms.user_profile.phone ) {

  }
  if ( zumeForms.user_profile.location ) {

  }

  html += `<div class="cell"></div>`

  html += `</div>`

  content.html(html)

  jQuery('#modal-large').foundation('open')
}
window.cta_get_a_coach = () => {
  console.log('cta_get_a_coach')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Get a Coach')

  jQuery(document).ready(function(){
    jQuery('#get_a_coach').on('click', function(){
      makeRequest('POST', 'get_a_coach', { user_id: user_profile.user_id }, 'zume_system/v1/' ).done( function( data ) {
        location.reload()
      })
    })
  });

  jQuery('#modal-large').foundation('open')
}
window.cta_make_a_plan = () => {
  console.log('cta_make_a_plan')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Make a Plan')

  jQuery('#modal-large').foundation('open')
}
window.cta_invite_friends = () => {
  console.log('cta_invite_friends')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Invite Friends')

  jQuery('#modal-large').foundation('open')
}
window.cta_join_training = () => {
  console.log('cta_join_training')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Join Online Training')


  jQuery('#modal-large').foundation('open')
}
