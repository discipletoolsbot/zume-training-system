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
  jQuery('.cta_join_a_training').click(function() {
    window.cta_join_a_training()
  })
  jQuery('.cta_make_a_plan').click(function() {
    window.cta_make_a_plan()
  })
  jQuery('.cta_invite_friends').click(function() {
    window.cta_invite_friends()
  })
  jQuery('.cta_work_the_plan').click(function() {
    window.cta_work_the_plan()
  })
  jQuery('.cta_post_training_plan').click(function() {
    window.cta_post_training_plan()
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
window.cta_join_a_training = () => {
  console.log('cta_join_a_training')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Join an Online Training')

  makeRequest('POST', 'public_plans', {}, 'zume_system/v1' ).done( function( data ) {
    console.log(data)
    let html = `<div class="grid-x grid-padding-x">`
    for ( let i = 0; i < data.posts.length; i++ ) {
      let plan = data.posts[i]
      html += `<div class="cell small-12 medium-6 large-4">
        <div class="card">
          <div class="card-divider">
            ${plan.post_title}
          </div>
          <div class="card-section">
                <button type="button" class="button join_training_button" value="${plan.join_key}">Join</button> <span class="loading-spinner"></span><br>
               ${plan.time_of_day_note}<br>
                ${plan.location_note}<br>
                ${plan.timezone_note}<br>`

          jQuery.each( plan, function( key, value ) {
            if ( key.startsWith('set_') ) {
              html += `<div>${value.formatted}</div>`
            }
          })

      html += `</div>
          </div>
        </div>`
    }
    html += `</div>`
    content.html(html)

    jQuery('.join_training_button').click(function() {
      console.log('join_training_button')
      jQuery('.loading-spinner').addClass('active')
      let key = jQuery(this).val()
      makeRequest('POST', 'join_plan', {key: key}, 'zume_system/v1' ).done( function( data ) {
        jQuery('.join_training_button').text('Joined')
      })
      makeRequest('POST', 'log', { type: 'system', subtype: 'joined_online_training' }, 'zume_system/v1' ).done( function( data ) {
        console.log(data)
      })

    })
  })



  jQuery('#modal-large').foundation('open')
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
      'visibility': 'private',
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
      'visibility': 'private',
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

  content.append(`
    <div class="grid-x grid-padding-y">
      <div class="cell">
      <input type="text" placeholder="Add friend code of friend in the system" />
      <button class="button connect_friend" value="code">Connect by Code</button>
      </div>
    </div>
  `)

  jQuery('.connect_friend').click(function() {
    console.log('connect_friend')
    let value = jQuery(this).prev().val()

    makeRequest('POST', 'friends/connect', { "value": value }, 'zume_system/v1' ).done( function( data ) {
      console.log(data)
    })
  })

  jQuery('#modal-large').foundation('open')
}
window.cta_work_the_plan = () => {
  console.log('cta_work_the_plan')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Work the Plan<hr>')

  // post list
  makeRequest('POST', 'zume_plans/list', {"fields":[{"participants":[ zumeForms.user_profile.contact_id ]}],"sort":"name","offset":0}, 'dt-posts/v2' ).done( function( data ) {
    console.log(data)
    if (data.posts.length == 0) {
      console.log(data)
      return
    }
    let html = ''
    jQuery.each(data.posts, function (key, plan) {
      html += `
        <div class="grid-x grid-padding-x">
          <div class="cell">
            <h5>${plan.post_title}</h5>
          </div>
        `
      jQuery.each(plan, function (key, value) {
        if (key.startsWith('set_')) {
          html += `
            <div class="cell" style="margin-bottom:5px;">
              ${key} | ${value.formatted} <button class="button working ${key}" value="${key}">Mark Complete</button>
            </div>`
        }
      })
      html += `</div>`
    })
    content.append(html)

    // check off completed
    makeRequest('GET', 'log', {}, 'zume_system/v1' ).done( function( data ) {
      console.log(data)
      jQuery.each(data, function (key, value) {
        jQuery(`.${value.subtype}`).addClass('hollow')
      })
    })

    // mark complete
    jQuery('.button.working').click(function() {
      let key = jQuery(this).val()
      jQuery(this).addClass('hollow')
      makeRequest('POST', 'log', { type: 'training', subtype: key }, 'zume_system/v1' ).done( function( data ) {
        console.log(data)
      })
    })

  })

  jQuery('#modal-large').foundation('open')
}
window.cta_post_training_plan = () => {
  console.log('cta_post_training_plan')
  let title = jQuery('#modal-large-title')
  let content = jQuery('#modal-large-content')
  title.empty()
  content.empty()

  title.append('Post Training Plan')

  content.append(`
    <div class="grid-x grid-padding-x">
        <div class="cell"><hr></div>
        <div class="cell">
          <label for="plan_name">I will share My Story [Testimony] and God’s Story [the Gospel] with the following individuals:</label>
          <input type="text" name="" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will invite the following people to begin an Accountability Group with me:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will challenge the following people to begin their own Accountability Groups and train them how to do it:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will invite the following people to begin a 3/3 Group with me:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will challenge the following people to begin their own 3/3 Groups and train them how to do it:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will invite the following people to participate in a 3/3 Hope or Discover Group [see Appendix of Zúme Guidebook]</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will invite the following people to participate in Prayer Walking with me:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will Prayer Walk once every [days / weeks / months].</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will equip the following people to share their story and God’s Story and make a List of 100 of the people in their relational network:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will challenge the following people to use the Prayer Cycle tool on a periodic basis:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will use the Prayer Cycle tool once every [days / weeks / months].</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will invite the following people to be part of a Leadership Cell that I will lead:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">I will encourage the following people to go through this Zúme Training course:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <label for="plan_name">Other commitments:</label>
          <input type="text" class="post-training-plan" />
        </div>
        <div class="cell">
          <button class="button plan-save-button">Save</button>
        </div>
    </div>
    `)

  jQuery('.plan-save-button').click(function() {
    jQuery('.post-training-plan').each(function(value) {
      if ( jQuery(this).val() ) {
        console.log('Question: ' + jQuery(this).prev().text() + ' Answer: ' + jQuery(this).val())

        var date = new Date(); // Now
        date.setDate(date.getDate() + 30);

        makeRequest('POST', 'add_commitment', {
          "user_id": zumeForms.user_profile.user_id,
          "post_id": zumeForms.user_profile.contact_id,
          "meta_key": "tasks",
          "note": 'Question: ' + jQuery(this).prev().text() + ' Answer: ' + jQuery(this).val(),
          "date": date,
          "category": "custom"
        }, 'zume_system/v1' ).done( function( data ) {
          console.log(data)
        })
      }
    })
  })


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
