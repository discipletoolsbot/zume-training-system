console.log('User Profile')
console.log(zumeForms.user_profile)
console.log(zumeForms.plans)

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

  if ( window.is_profile_complete()  ) {
    jQuery('.cta_set_profile').text('Done')
    return
  }

  title.append('Set Profile<hr>')

  html += `<div class="grid-x grid-padding-x">`

  if ( ! zumeForms.user_profile.name ) {
    html += `<div class="cell">Need Name</div>`
  }
  if ( ! zumeForms.user_profile.email ) {
    html += `<div class="cell">Need Email</div>`
  }
  if ( ! zumeForms.user_profile.phone ) {
    html += `<div class="cell">Need Phone</div>`
  }
  if ( ! zumeForms.user_profile.location || zumeForms.user_profile.location.source === "ip" ) {
    html += `<div class="cell">Need Location</div>`
  }
  html += `<div class="cell"><a href="/profile">Go to Profile</a></div>`

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

  if ( zumeForms.user_profile.coaching_contact_id ) {
    jQuery('.cta_get_a_coach').text('Done')
    return
  }

  title.append('Get a Coach<hr>')

  if ( window.is_profile_complete() ) {
    makeRequest('POST', 'get_a_coach', {}, 'zume_system/v1/' ).done( function( data ) {
      location.reload()
    })
  }
  else {
    content.append('Please complete your profile first.')
    jQuery('#modal-large').foundation('open')
  }
}
window.cta_make_a_plan = () => {
  console.log('cta_make_a_plan')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Make a Plan<hr>')

  content.html(`
  <div class="grid-x grid-padding-x">
    <div class="cell">
    Choose a start date:
        <input type="date" id="start_date" class="" value="" />
        <button class="button" id="install_10_sessions">Add 10 Sessions</button>
        <button class="button" id="install_20_sessions">Add 20 Sessions</button>
    </div>
  </div>
  `)

  let start_date = jQuery('#start_date')
  jQuery('#install_10_sessions').click(function() {
    let date = Math.floor(new Date(start_date.val()).getTime() / 1000)
    let fields = {
      'title': zumeForms.user_profile.name + ' Plan',
      'assigned_to': zumeForms.user_profile.user_id,
      'participants': {
        values: [
          { "value": zumeForms.user_profile.contact_id }
        ],
      },
      'set_a_01': date + (0 * 604800 ),
      'set_a_02': date + (1 * 604800 ),
      'set_a_03': date + (2 * 604800 ),
      'set_a_04': date + (3 * 604800 ),
      'set_a_05': date + (4 * 604800 ),
      'set_a_06': date + (5 * 604800 ),
      'set_a_07': date + (6 * 604800 ),
      'set_a_08': date + (7 * 604800 ),
      'set_a_09': date + (8 * 604800 ),
      'set_a_10': date + (9 * 604800 ),
    };
    makeRequest('POST', 'zume_plans', fields, 'dt-posts/v2' ).done( function( data ) {
      location.reload()
    })
  })
  jQuery('#install_20_sessions').click(function(){
    console.log('install 20 sessions');
    let date = Math.floor(new Date(start_date.val()).getTime() / 1000)
    let fields = {
      'title': zumeForms.user_profile.name + ' Plan',
      'assigned_to': zumeForms.user_profile.user_id,
      'participants': {
         values: [
              { "value": zumeForms.user_profile.contact_id }
         ],
      },
      'set_b_01': date + ( 0 * 604800 ),
      'set_b_02': date + ( 1 * 604800 ),
      'set_b_03': date + ( 2 * 604800 ),
      'set_b_04': date + ( 3 * 604800 ),
      'set_b_05': date + ( 4 * 604800 ),
      'set_b_06': date + ( 5 * 604800 ),
      'set_b_07': date + ( 6 * 604800 ),
      'set_b_08': date + ( 7 * 604800 ),
      'set_b_09': date + ( 8 * 604800 ),
      'set_b_10': date + ( 9 * 604800 ),
      'set_b_11': date + ( 10 * 604800 ),
      'set_b_12': date + ( 11 * 604800 ),
      'set_b_13': date + ( 12 * 604800 ),
      'set_b_14': date + ( 13 * 604800 ),
      'set_b_15': date + ( 14 * 604800 ),
      'set_b_16': date + ( 15 * 604800 ),
      'set_b_17': date + ( 16 * 604800 ),
      'set_b_18': date + ( 17 * 604800 ),
      'set_b_19': date + ( 18 * 604800 ),
      'set_b_20': date + ( 19 * 604800 ),
    };
    makeRequest('POST', 'zume_plans', fields, 'dt-posts/v2' ).done( function( data ) {
      location.reload()
    })
  });

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

window.is_profile_complete = () => {
  if ( ! zumeForms.user_profile.name ) {
    return false
  }
  if ( ! zumeForms.user_profile.email ) {
    return false
  }
  if ( ! zumeForms.user_profile.phone ) {
    return false
  }
  if ( ! zumeForms.user_profile.location || zumeForms.user_profile.location.source === "ip" ) {
    return false
  }
  return true
}
